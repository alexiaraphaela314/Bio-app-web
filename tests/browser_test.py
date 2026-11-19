"""BioMundo 2 UI regression on a real local HTTP origin.

Usage:
    python tests/browser_test.py --browser /path/to/chromium
    python tests/browser_test.py --capture-dir /absolute/qa/screenshots

Requires Playwright and a browser allowed to start in the environment. Never
changes browser policies and never bypasses navigation blocks with set_content.
A restricted environment is reported as BLOCKED, not as an approved test run.
Voice control is simulated; touch is browser emulation, not physical Android.
"""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from datetime import datetime
from zoneinfo import ZoneInfo
import argparse
import json
import sys
import time
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('--browser', default=None, help='Existing browser executable; omit to use Playwright default.')
parser.add_argument('--capture-dir', default=None, help='Optional QA screenshots destination outside the game package.')
args = parser.parse_args()
results, errors, limitations = [], [], [
    'Audio control uses simulated speech callbacks; actual Portuguese voices and audible sound require device testing.',
    'Touch is browser emulation; Android hardware, screen readers and installation through Android menus require separate validation.'
]
started = time.time()
exit_code = 0
server = None
browser = None
url = None

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass

def check(name, condition=True):
    if not condition:
        raise AssertionError(name)
    results.append({'name': name, 'status': 'PASS'})
    print('PASS', name, flush=True)

def state(page, expression):
    return page.evaluate(expression)

def click(page, selector):
    page.locator(selector).first.click()

def nav(page, route):
    page.evaluate('(route) => Bio.UI.navigate(route)', route)
    page.wait_for_function('(route) => location.hash === "#" + route', arg=route)
    if route.startswith('jogar-'):
        expected = int(route.split('-')[-1])
        page.wait_for_function('(id) => Bio.Game.current()?.level.id === id', arg=expected)
    elif route == 'mapa':
        expect(page.locator('.level-card')).to_have_count(11)
    elif route == 'aprender':
        expect(page.locator('.glossary-detail')).to_have_count(1)
    elif route == 'ajustes':
        expect(page.locator('#set-motion')).to_be_visible()


def attach_errors(page):
    page.on('pageerror', lambda error: errors.append(str(error)))


def load(page):
    attach_errors(page)
    page.goto(url, wait_until='load')
    expect(page.locator('.hero')).to_be_visible()
    page.wait_for_function('Array.from(document.images).every(i => i.complete && i.naturalWidth > 0)')


def capture(page, name):
    if not args.capture_dir:
        return
    target = Path(args.capture_dir).resolve()
    if target.is_relative_to(ROOT):
        raise ValueError('QA screenshots must be outside the deliverable package.')
    target.mkdir(parents=True, exist_ok=True)
    page.screenshot(path=str(target / name), full_page=True)


def explore_by_click(page):
    piece = state(page, 'Bio.Game.current().level.structure')
    click(page, f'[data-piece="{piece}"]')
    click(page, f'[data-slot="{piece}"]')
    expect(page.locator('[data-action="explore-next"]')).to_be_visible()
    return piece


def answer_current(page):
    answer = state(page, 'Bio.Game.current().level.questions[Bio.Game.current().step].answer')
    click(page, f'[data-answer="{answer}"]')
    page.wait_for_function('Bio.Game.current().answered')


def next_to_questions(page):
    click(page, '[data-action="explore-next"]')
    page.wait_for_function('Bio.Game.current().stage === "quiz"')
    expect(page.locator('[data-answer]').first).to_be_visible()


def run_suite(p):
    global browser, server, url
    # Bind a local test server. A denied socket is an environment block.
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT.parent)))
    Thread(target=server.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{server.server_port}/{ROOT.name}/'
    launch = {'headless': True}
    if args.browser:
        launch['executable_path'] = args.browser
    browser = p.chromium.launch(**launch)
    context = browser.new_context(viewport={'width': 1366, 'height': 1000}, reduced_motion='no-preference')
    page = context.new_page()
    load(page)
    check('Initial screen and every initially displayed local image load')
    check('Motion is disabled initially even without a system reduced-motion preference', not state(page, 'Bio.Progress.get().settings.motion'))
    check('No moving background particle elements', page.locator('.ambient').count() == 0)
    capture(page, '01-home.png')
    original_hash = state(page, 'location.hash')
    page.locator('.skip-link').focus()
    page.keyboard.press('Enter')
    expect(page.locator('#app')).to_be_focused()
    check('Skip link moves focus without replacing the game route', state(page, 'location.hash') == original_hash)
    click(page, '[data-action="how"]')
    expect(page.locator('dialog[open]')).to_be_visible()
    check('How-to opens a real modal')
    page.keyboard.press('Escape')
    expect(page.locator('dialog[open]')).to_have_count(0)
    check('Escape closes the instruction modal')
    click(page, '[data-action="map"]')
    expect(page.locator('.level-card')).to_have_count(11)
    check('All 11 stages are available without performance gates', page.locator('.level-card:disabled').count() == 0)

    # Every stage: visible map -> intro -> one target -> two questions -> conclusion.
    for lid in range(1, 12):
        nav(page, 'mapa')
        prior_level = state(page, 'Bio.Progress.get().lastLevel')
        click(page, f'[data-action="intro"][data-id="{lid}"]')
        check(f'Phase {lid}: browsing its introduction does not replace the resumable game', state(page, 'Bio.Progress.get().lastLevel') == prior_level)
        expect(page.locator('.instruction-box')).to_be_visible()
        check(f'Phase {lid}: introduction identifies the cellular model', page.locator('.cell-context').count() >= 1)
        click(page, '[data-action="start"]')
        expect(page.locator('[data-piece]')).to_have_count(1)
        expect(page.locator('[data-slot]')).to_have_count(1)
        check(f'Phase {lid}: only one focal structure is offered', state(page, 'Bio.Game.current().level.structure') == page.locator('[data-piece]').get_attribute('data-piece'))
        if lid <= 8:
            check(f'Phase {lid}: animal model contains no plant-only target', state(page, '!Array.from(document.querySelectorAll("[data-slot],[data-piece]")).some(e=>["wall","chloroplast"].includes(e.dataset.slot || e.dataset.piece))'))
        if lid == 1:
            click(page, '[data-slot]')
            check('Choosing the target before a piece does not falsely complete the exploration', len(state(page, 'Bio.Game.current().placed')) == 0)
            click(page, '[data-action="hint"]')
            check('Help gives a visual cue without auto-completing the exploration', len(state(page, 'Bio.Game.current().placed')) == 0)
        structure = explore_by_click(page)
        check(f'Phase {lid}: exploration records exactly one discovery', state(page, 'Bio.Game.current().placed.length') == 1)
        if lid in (1, 3, 10):
            capture(page, f'phase-{lid}-explored.png')
        next_to_questions(page)
        for step in range(2):
            if lid == 1 and step == 0:
                before = state(page, 'Bio.Progress.get().activities.length')
                wrong = state(page, 'Bio.Game.current().level.questions[0].options.find(o=>o.id!==Bio.Game.current().level.questions[0].answer).id')
                click(page, f'[data-answer="{wrong}"]')
                check('Wrong answer allows a retry without removing discoveries', not state(page, 'Bio.Game.current().answered') and state(page, 'Bio.Progress.get().activities.length') == before)
                click(page, '[data-action="hint"]')
                check('Question hint does not auto-complete the answer', not state(page, 'Bio.Game.current().answered'))
            answer_current(page)
            if lid == 1 and step == 0:
                check('Membrane success feedback explains selective permeability', 'permeabilidade seletiva' in page.locator('#activity-feedback').inner_text().lower())
            if step == 0:
                click(page, '[data-action="next-question"]')
                page.wait_for_function('Bio.Game.current().step === 1 && !Bio.Game.current().answered')
        click(page, '[data-action="finish"]')
        expect(page.locator('.complete-layout')).to_be_visible()
        check(f'Phase {lid}: conclusion is reachable and saved', state(page, f'Bio.Progress.get().completed.includes({lid})'))
        check(f'Phase {lid}: known structure is saved', state(page, f'Bio.Progress.get().known.includes("{structure}")'))
    check('11 phases, 33 unique activities and 11 structures complete', state(page, 'Bio.Progress.get().completed.length===11 && Bio.Progress.get().activities.length===33 && Bio.Progress.get().known.length===11'))
    page.reload()
    expect(page.locator('.complete-layout')).to_be_visible()
    check('Real browser reload preserves completed progress', state(page, 'Bio.Progress.get().completed.length===11'))

    # Replay and resumable per-phase state, real input event paths.
    nav(page, 'jogar-3')
    page.locator('[data-piece="nucleus"]').drag_to(page.locator('[data-slot="nucleus"]'))
    check('Mouse drag places one structure without duplicate activity credit', state(page, 'Bio.Game.current().placed.length===1 && Bio.Progress.get().activities.length===33'))
    click(page, '[data-action="pause"]')
    expect(page.locator('dialog[open]')).to_be_visible()
    check('Pause traps focus inside its modal', state(page, 'document.activeElement.closest("dialog")!==null'))
    page.keyboard.press('Tab')
    check('Tab remains inside pause dialog', state(page, 'document.activeElement.closest("dialog")!==null'))
    click(page, '[data-action="close-modal"]')
    check('Pause preserves current exploration', state(page, 'Bio.Game.current().placed.length===1'))
    next_to_questions(page)
    answer_current(page)
    page.reload()
    expect(page.locator('[data-action="next-question"]')).to_be_visible()
    check('Actual reload restores answered question rather than restarting it', state(page, 'Bio.Game.current().stage==="quiz" && Bio.Game.current().step===0 && Bio.Game.current().answered'))
    nav(page, 'jogar-4')
    page.locator('[data-piece="mitochondrion"]').focus()
    page.keyboard.press('Space')
    page.locator('[data-slot="mitochondrion"]').focus()
    page.keyboard.press('Enter')
    check('Keyboard select and place works independently of dragging', state(page, 'Bio.Game.current().placed.includes("mitochondrion")'))

    click(page, '[data-action="learn"]')
    expect(page.locator('.glossary-detail')).to_have_count(1)
    check('Glossary displays one detailed structure at a time', page.locator('[data-action="glossary-select"]').count() == 11)
    click(page, '[data-action="glossary-select"][data-organelle="chloroplast"]')
    check('Selecting a glossary entry preserves a single detailed view', page.locator('.glossary-detail').count() == 1)
    text = page.locator('.glossary-detail').inner_text().lower()
    check('Chloroplast glossary distinguishes plant cells from human cells', 'veget' in text and ('human' in text or 'animal' in text))

    click(page, '[data-action="settings"]')
    expect(page.locator('#set-motion')).to_be_visible()
    click(page, '[data-action="return"]')
    expect(page.locator('.glossary-detail')).to_be_visible()
    check('Settings return to the same glossary entry', state(page, 'location.hash') == '#aprender-chloroplast')
    click(page, '[data-action="return"]')
    page.wait_for_function('location.hash === "#jogar-4"')
    check('Glossary then returns to the original game', state(page, 'Bio.Game.current().level.id') == 4)
    nav(page, 'aprender')

    # Real zoom size changes, persistence and ability to return to the original size.
    click(page, '.glossary-detail [data-action="zoom"]')
    expect(page.locator('.zoom-dialog')).to_be_visible()
    expect(page.locator('#zoom-image')).to_be_visible()
    width = page.locator('#zoom-image').bounding_box()['width']
    click(page, '[data-action="zoom-plus"]')
    expect(page.locator('#zoom-value')).to_contain_text('125')
    check('Zoom enlarges the illustration', page.locator('#zoom-image').bounding_box()['width'] > width)
    for _ in range(3):
        click(page, '[data-action="zoom-plus"]')
    check('Zoom reaches 200 percent and persists the preference', state(page, 'Bio.Progress.get().settings.zoom') == 200)
    click(page, '[data-action="zoom-reset"]')
    expect(page.locator('#zoom-value')).to_contain_text('100')
    check('Zoom can be reset without changing curriculum progress', state(page, 'Bio.Progress.get().settings.zoom===100 && Bio.Progress.get().completed.length===11'))
    page.keyboard.press('Escape')
    check('Zoom closes and returns focus to an interactive element', state(page, 'document.activeElement.tagName==="BUTTON"'))

    # Use explicit voice callbacks to avoid requiring an installed TTS voice in CI.
    if state(page, '"speechSynthesis" in window'):
        page.evaluate('''() => {
            window.__speechCalls=[]; window.__cancelCalls=0;
            speechSynthesis.speak=u=>{window.__speechCalls.push(u.text)};
            speechSynthesis.cancel=()=>{window.__cancelCalls++};
        }''')
        check('Opening glossary does not narrate automatically', state(page, 'window.__speechCalls.length') == 0)
        click(page, '.glossary-detail [data-action="listen-detail"]')
        check('Glossary voice begins only after explicit request', state(page, 'window.__speechCalls.length') == 1)
        click(page, '.glossary-detail [data-action="listen-detail"]')
        check('Voice can be stopped from the same control', not state(page, 'Bio.Audio.isSpeaking()'))
        nav(page, 'jogar-5')
        calls = state(page, 'window.__speechCalls.length')
        check('Entering a phase never starts narration automatically', calls == 1)
        click(page, '[data-action="listen"]')
        check('Phase instructions support voluntary narration', state(page, 'window.__speechCalls.length') == calls + 1)
        click(page, '[data-action="pause"]')
        check('Pause stops narration', not state(page, 'Bio.Audio.isSpeaking()'))
        click(page, '[data-action="close-modal"]')
    else:
        limitations.append('Browser does not expose speechSynthesis; voice control scenarios were not executed.')

    click(page, '[data-action="settings"]')
    click(page, '[data-action="mode"][data-mode="calm"]')
    check('Calm mode disables motion and sound', state(page, 'document.documentElement.dataset.mode==="calm" && !Bio.Progress.get().settings.motion && !Bio.Progress.get().settings.sound'))
    page.locator('#set-contrast').check()
    page.locator('#set-size').select_option('large')
    check('Custom contrast and size settings are applied', state(page, 'document.documentElement.dataset.contrast==="high" && document.documentElement.dataset.size==="large"'))
    page.emulate_media(reduced_motion='reduce')
    page.locator('#set-motion').check()
    check('System reduced motion overrides opted-in animation', state(page, 'document.documentElement.dataset.motion==="reduced"'))
    nav(page, 'jogar-10')
    for width, height in [(320,740),(360,800),(390,844),(768,1024),(844,390),(1366,1000)]:
        page.set_viewport_size({'width':width,'height':height})
        check(f'No horizontal page overflow at {width}x{height}', state(page, 'document.documentElement.scrollWidth <= innerWidth'))
    page.set_viewport_size({'width':390,'height':844})
    capture(page, 'mobile-focused-phase.png')

    touch_context = browser.new_context(viewport={'width':390,'height':844}, is_mobile=True, has_touch=True, reduced_motion='reduce')
    touch = touch_context.new_page()
    load(touch)
    nav(touch, 'jogar-3')
    touch.locator('[data-piece="nucleus"]').tap()
    touch.locator('[data-slot="nucleus"]').tap()
    check('Touch select then target completes the single exploration', state(touch, 'Bio.Game.current().placed.length') == 1)
    next_to_questions(touch)
    answer_current(touch)
    touch.reload()
    expect(touch.locator('[data-action="next-question"]')).to_be_visible()
    check('Mobile browser context also restores a partial phase after reload', state(touch, 'Bio.Game.current().answered'))

    # The cache check and offline reload are real origin lifecycle tests.
    touch.evaluate('navigator.serviceWorker.ready')
    touch.wait_for_function('navigator.serviceWorker.controller !== null')
    cached = touch.evaluate('''async () => {
        const names=await caches.keys();
        const name=names.find(n=>n.startsWith('biomundo:'));
        return (await (await caches.open(name)).keys()).length;
    }''')
    check('Service worker precaches actual resources on the real test origin', cached > 30)
    touch_context.set_offline(True)
    touch.reload()
    expect(touch.locator('[data-action="next-question"]')).to_be_visible()
    check('Real offline reload renders the saved phase and its local illustration', state(touch, 'Array.from(document.images).every(i=>i.complete && i.naturalWidth > 0)'))
    touch_context.set_offline(False)

    # Browser-level migration from the exact earlier key, under the same path.
    migrated = browser.new_context(viewport={'width':1200,'height':850})
    migrated.add_init_script('''(() => {
        const prefix=location.pathname.replace(/[^/]*$/, '');
        if(!localStorage.getItem('biomundo:v2:'+prefix)){
            localStorage.setItem('biomundo:v1:'+prefix,JSON.stringify({version:1,
              completed:[1,2],activities:['1:nucleus','2:nucleus'],known:['nucleus','membrane'],
              lastLevel:3,drafts:{3:{placed:['nucleus'],step:0,answered:false}},
              settings:{mode:'calm',sound:false,narration:false,motion:false,contrast:true,size:'large',complexity:'guided'}}));
        }
    })();''')
    mp = migrated.new_page()
    load(mp)
    check('Migration preserves learned structures and accessibility preferences', state(mp, 'Bio.Progress.get().known.includes("nucleus") && Bio.Progress.get().settings.contrast && Bio.Progress.get().settings.size==="large"'))
    check('Migration does not falsely complete new curriculum phases', state(mp, 'Bio.Progress.get().completed.length===0'))
    check('Migration leaves the earlier saved record intact', state(mp, 'JSON.parse(localStorage.getItem(Bio.Progress.key.replace(":v2:",":v1:"))).completed.length===2'))
    check('No uncaught JavaScript errors in completed browser scenarios', not errors)

try:
    with sync_playwright() as playwright:
        run_suite(playwright)
except Exception as error:
    text = str(error)
    blocked = any(token in text for token in [
        'ERR_BLOCKED_BY_ADMINISTRATOR','Operation not permitted','Permission denied',
        'socket() failed','Executable doesn\'t exist','BrowserType.launch'
    ])
    status = 'BLOCKED' if blocked else 'FAIL'
    results.append({'name':'Environment or regression interruption','status':status,'message':text})
    if blocked:
        limitations.append('Browser testing was blocked by the execution environment. No workaround or policy change was attempted.')
        exit_code = 2
    else:
        exit_code = 1
    print(status, text, file=sys.stderr, flush=True)
finally:
    if browser:
        try:
            browser.close()
        except Exception:
            pass
    if server:
        server.shutdown()
    report = {
        'version':'2.0.0','date':datetime.now(ZoneInfo('America/Sao_Paulo')).isoformat(),
        'mode':'Real local HTTP; no embedded fallback',
        'duration_seconds':round(time.time()-started,2),
        'passed':sum(r['status']=='PASS' for r in results),
        'failed':sum(r['status']=='FAIL' for r in results),
        'blocked':sum(r['status']=='BLOCKED' for r in results),
        'uncaught_javascript_errors':errors,'limitations':limitations,'tests':results
    }
    (ROOT/'tests/resultados-browser.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print('TOTAL',report['passed'],'passed',report['failed'],'failed',report['blocked'],'blocked',flush=True)
    sys.exit(exit_code)
