// BioMundo 2: curriculum, scientific invariants and offline contracts.
// Run: node --test tests/*.test.cjs. Runtime game has no Node dependency.
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const ROOT = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(ROOT, relative), 'utf8');
const plain = value => JSON.parse(JSON.stringify(value));

function content() {
  const ctx = {console};
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const file of ['content.js', 'levels.js']) {
    vm.runInContext(read(`js/${file}`), ctx, {filename: file});
  }
  return ctx.Bio;
}

function normalizeText(value) {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

test('11 focused phases cover each of the 11 structures exactly once', () => {
  const B = content();
  assert.equal(B.levels.length, 11);
  assert.equal(Object.keys(B.content).length, 11);
  assert.equal(B.totalActivities, 33);
  assert.deepEqual(plain(B.levels.map(l => l.id)), Array.from({length:11}, (_, i) => i + 1));
  assert.deepEqual(new Set(B.levels.map(l => l.structure)), new Set(Object.keys(B.content)));
  for (const l of B.levels) {
    assert.equal(l.kind, 'focus');
    assert.deepEqual(plain(l.pieces), [l.structure]);
    assert.equal(l.questions.length, 2);
    for (const key of ['title', 'label', 'intro', 'objective', 'summary']) {
      assert.ok(typeof l[key] === 'string' && l[key].trim(), `Phase ${l.id}: ${key}`);
    }
  }
});

test('Every question has one correct answer and distinct readable choices', () => {
  const B = content();
  const activities = new Set();
  for (const l of B.levels) {
    activities.add(`${l.id}:explore`);
    assert.equal(new Set(l.questions.map(q => q.id)).size, l.questions.length);
    for (const q of l.questions) {
      assert.ok(q.prompt.trim());
      assert.ok(q.explanation.trim());
      assert.ok(q.options.length >= 2 && q.options.length <= 3);
      assert.equal(new Set(q.options.map(o => o.id)).size, q.options.length);
      assert.equal(q.options.filter(o => o.id === q.answer).length, 1);
      for (const o of q.options) {
        assert.ok(typeof o.label === 'string' && o.label.trim());
      }
      activities.add(`${l.id}:${q.id}`);
    }
  }
  assert.equal(activities.size, B.totalActivities);
});

test('Each phase names a real cellular model and one visible focal structure', () => {
  const B = content();
  for (const l of B.levels) {
    assert.ok(['animal', 'plant'].includes(l.cell));
    assert.ok(B.cellContexts[l.cell].label.trim());
    assert.ok(B.cellContexts[l.cell].detail.trim());
    assert.ok(B.content[l.structure]);
    assert.ok(fs.existsSync(path.join(ROOT, 'assets/organelles', `${l.structure}.svg`)));
    assert.ok(fs.existsSync(path.join(ROOT, 'assets/cells', `${l.cell}-base.svg`)));
    const p = B.positions[l.cell][l.structure];
    assert.equal(p.length, 4);
    assert.ok(p.every(Number.isFinite));
    assert.ok(p[0] >= 0 && p[0] <= 100 && p[1] >= 0 && p[1] <= 100);
    assert.ok(p[2] > 0 && p[2] <= 100 && p[3] > 0 && p[3] <= 100);
  }
});

test('Animal phases and animal illustration cannot acquire chloroplasts or a cell wall', () => {
  const B = content();
  const plantOnly = ['wall', 'chloroplast', 'vacuole'];
  for (const id of plantOnly) assert.equal(B.levels.find(l => l.structure === id).cell, 'plant');
  for (const l of B.levels.filter(l => l.cell === 'animal')) {
    assert.ok(!plantOnly.includes(l.structure));
  }
  for (const asset of ['animal-base.svg', 'animal-complete.svg']) {
    assert.doesNotMatch(read(`assets/cells/${asset}`), /chloroplast|cloroplast|id="wall-/i);
  }
  const context = normalizeText(B.cellContexts.animal.detail);
  assert.match(context, /nao/);
  assert.match(context, /parede/);
  assert.match(context, /cloroplast/);
});

test('Shared structures are not labelled as exclusive to animals', () => {
  const B = content();
  for (const id of ['membrane','cytoplasm','nucleus','mitochondrion','ribosome','reticulum','golgi']) {
    assert.equal(B.content[id].category, 'both', id);
    assert.match(normalizeText(B.content[id].context), /vegeta/, id);
  }
  assert.match(normalizeText(B.cellContexts.plant.label), /fotossint/);
  assert.match(normalizeText(B.content.chloroplast.detail + ' ' + B.content.chloroplast.context), /nem toda|nao.*toda|algumas/);
});

test('Nucleus wording limits the DNA statement to nucleated eukaryotic cells', () => {
  const B = content();
  const text = normalizeText(JSON.stringify(B.content.nucleus));
  assert.match(text, /maior parte/);
  assert.match(text, /dna/);
  assert.match(text, /eucariot/);
  assert.match(text, /nuclead/);
});

test('Mitochondria use ATP wording and ribosomes produce proteins', () => {
  const B = content();
  assert.match(normalizeText(B.content.mitochondrion.function), /atp/);
  assert.match(normalizeText(B.content.mitochondrion.function + ' ' + B.content.mitochondrion.simple), /particip/);
  assert.match(normalizeText(B.content.ribosome.function + ' ' + B.content.ribosome.simple), /proteina/);
  assert.match(normalizeText(B.content.ribosome.function + ' ' + B.content.ribosome.simple), /sintet|produz|produzir|produc/);
});

test('Correct membrane feedback explicitly explains selective permeability', () => {
  const B = content();
  const l = B.levels.find(l => l.structure === 'membrane');
  const feedback = normalizeText(l.questions.map(q => q.explanation).join(' '));
  assert.match(feedback, /permeabilidade seletiva/);
  assert.match(feedback, /entra|saida|sai|passagem|troca/);
  assert.match(normalizeText(B.content.membrane.function), /regula/);
});

test('Glossary contains accessible text, further detail and visual cues for every structure', () => {
  const B = content();
  for (const [id, c] of Object.entries(B.content)) {
    for (const field of ['name','short','function','simple','detail','context','hint']) {
      assert.ok(typeof c[field] === 'string' && c[field].trim(), `${id}.${field}`);
    }
  }
  const note = normalizeText(B.scienceNote);
  assert.match(note, /didat/);
  assert.match(note, /escala/);
  assert.match(note, /posic|lugar/);
});

test('Text escaping protects labels rendered into HTML', () => {
  const B = content();
  assert.equal(B.escape('<tag a="x">&\''), '&lt;tag a=&quot;x&quot;&gt;&amp;&#39;');
});

test('Manifest uses relative scope and real installation icon assets', () => {
  const m = JSON.parse(read('manifest.webmanifest'));
  assert.equal(m.start_url, './');
  assert.equal(m.scope, './');
  assert.equal(m.lang, 'pt-BR');
  assert.ok(m.icons.some(i => i.sizes === '192x192'));
  assert.ok(m.icons.some(i => i.sizes === '512x512' && i.purpose === 'maskable'));
  for (const i of m.icons) assert.ok(fs.existsSync(path.join(ROOT, i.src)));
  assert.doesNotMatch(normalizeText(m.description), /oito fases/);
});

test('Runtime scripts and style links use existing local files, without external dependencies', () => {
  const html = read('index.html');
  for (const match of html.matchAll(/<(?:script|link)\b[^>]*(?:src|href)="([^"]+)"/g)) {
    const ref = match[1];
    assert.doesNotMatch(ref, /^https?:|^\/\//);
    assert.ok(fs.existsSync(path.join(ROOT, ref)), ref);
  }
  assert.doesNotMatch(html, /user-scalable\s*=\s*no|maximum-scale\s*=\s*1(?:[,."\s>])/i);
});

function worker() {
  const listeners = {}, cacheEntries = new Map(), deleted = [], claimed = [], network = [];
  const scope = 'https://example.invalid/repo/';
  let activeName;
  const cache = {
    async addAll(files) {
      for (const f of files) cacheEntries.set(new URL(f,scope).href,{url:new URL(f,scope).href,from:'cache'});
    },
    async match(url) { return cacheEntries.get(String(url)); }
  };
  const caches = {
    async open(name) { activeName = name; return cache; },
    async keys() { return ['unrelated-cache','biomundo:/other/:old','biomundo:/repo/:old',activeName]; },
    async delete(key) { deleted.push(key); return true; }
  };
  const ctx = {
    URL, caches,
    fetch: async req => { network.push(req); return {from:'network'}; },
    self: {registration:{scope},addEventListener(name,fn){listeners[name]=fn;},clients:{async claim(){claimed.push(true);}}}
  };
  vm.createContext(ctx);
  vm.runInContext(read('service-worker.js'),ctx);
  return {listeners,cacheEntries,deleted,claimed,network};
}

async function install(w) {
  let task;
  w.listeners.install({waitUntil(p){task=p;}});
  await task;
}

test('Worker install includes every runtime file and only real package resources (simulated API)', async () => {
  const w = worker();
  await install(w);
  for (const k of w.cacheEntries.keys()) {
    const rel = new URL(k).pathname.slice('/repo/'.length) || 'index.html';
    assert.ok(fs.existsSync(path.join(ROOT, rel)), rel);
  }
  for (const dir of ['css','js','assets/mascot','assets/cells','assets/organelles','assets/backgrounds','assets/icons','assets/audio']) {
    for (const file of fs.readdirSync(path.join(ROOT,dir))) {
      if (/\.(js|css|svg|png|wav|webp)$/.test(file)) {
        assert.ok(w.cacheEntries.has(`https://example.invalid/repo/${dir}/${file}`), `${dir}/${file}`);
      }
    }
  }
});

test('Worker activation deletes only outdated caches for this game path', async () => {
  const w = worker();
  await install(w);
  let task;
  w.listeners.activate({waitUntil(p){task=p;}});
  await task;
  assert.deepEqual(w.deleted, ['biomundo:/repo/:old']);
  assert.equal(w.claimed.length, 1);
});

test('Cached resources need no network in the worker contract simulation', async () => {
  const w = worker();
  await install(w);
  let response;
  w.listeners.fetch({request:{method:'GET',url:'https://example.invalid/repo/assets/organelles/nucleus.svg'},respondWith(p){response=p;}});
  assert.equal((await response).from, 'cache');
  assert.equal(w.network.length, 0);
});

test('Worker ignores external URLs, sibling apps, unknown paths and mutations', () => {
  const w = worker();
  let intercepts = 0;
  const requests = [
    {method:'GET',url:'https://example.invalid/other/index.html'},
    {method:'GET',url:'https://external.invalid/repo/index.html'},
    {method:'POST',url:'https://example.invalid/repo/index.html'},
    {method:'GET',url:'https://example.invalid/repo/unrelated.txt'}
  ];
  for (const request of requests) w.listeners.fetch({request,respondWith(){intercepts++;}});
  assert.equal(intercepts, 0);
});

// These are logic/markup tests with explicit DOM/audio doubles. They do not
// verify browser rendering, pointer events, accessibility APIs or real voices.
function gameHarness(storage = new Map()) {
  const effects = {html:'',route:null,modal:null,announcements:[],successSounds:0,stops:0};
  const element = () => ({
    dataset:{},classList:{toggle(){},remove(){},add(){}},
    focus(){},setAttribute(){},scrollIntoView(){},
    getBoundingClientRect(){return {top:0,bottom:50,width:100,height:50};}
  });
  const elements = new Map();
  const getElement = key => {
    if (!elements.has(key)) elements.set(key,element());
    return elements.get(key);
  };
  const ctx = {
    console,location:{pathname:'/biomundo/index.html'},innerHeight:900,
    document:{
      title:'',querySelector:getElement,querySelectorAll:()=>[],getElementById:getElement,
      dispatchEvent(){}
    },
    CustomEvent:class {constructor(name,options){this.type=name;this.detail=options?.detail;}},
    localStorage:{getItem:key=>storage.has(key)?storage.get(key):null,setItem:(key,value)=>storage.set(key,value)},
    scrollTo(){}
  };
  ctx.window = ctx;
  vm.createContext(ctx);
  for (const file of ['content.js','levels.js','progress.js']) vm.runInContext(read(`js/${file}`),ctx,{filename:file});
  const B = ctx.Bio;
  B.UI = {
    mount(html){effects.html=html;},
    cellContext(cell){return `<section class="cell-context">${B.escape(B.cellContexts[cell].label)}</section>`;},
    announce(text){effects.announcements.push(text);},
    navigate(route){effects.route=route;},
    modal(title,body){effects.modal={title,body};},closeModal(){}
  };
  B.Audio = {supported:()=>true,stop(){effects.stops++;},success(){effects.successSounds++;}};
  B.Interactions = {cancel(){}};
  vm.runInContext(read('js/game.js'),ctx,{filename:'game.js'});
  return {B,effects,storage};
}

test('Game markup exposes exactly one target and one piece in every exploration (simulated DOM)', () => {
  const {B,effects} = gameHarness();
  for (const l of B.levels) {
    B.Game.start(l.id);
    assert.equal((effects.html.match(/data-piece="/g)||[]).length,1);
    assert.equal((effects.html.match(/data-slot="/g)||[]).length,1);
    assert.ok(effects.html.includes(B.cellContexts[l.cell].label));
    assert.ok(effects.html.includes(`data-piece="${l.structure}"`));
    assert.ok(effects.html.includes('data-action="zoom"'));
    if(l.cell==='animal') assert.doesNotMatch(effects.html,/data-(?:piece|slot)="(?:wall|chloroplast)"/);
  }
});

test('Exploration cannot advance by premature or invalid actions (simulated DOM)', () => {
  const {B} = gameHarness();
  B.Game.start(3);
  B.Game.place('nucleus');
  B.Game.exploreNext();
  B.Game.answer('a');
  B.Game.finish();
  assert.equal(B.Game.current().placed.length,0);
  assert.equal(B.Game.current().stage,'explore');
  assert.equal(B.Progress.get().activities.length,0);
  B.Game.select('chloroplast');
  B.Game.place('chloroplast');
  assert.equal(B.Game.current().selected,null);
  B.Game.hint();
  assert.equal(B.Game.current().selected,'nucleus');
  assert.equal(B.Game.current().placed.length,0);
  B.Game.place('nucleus');
  assert.deepEqual(plain(B.Game.current().placed),['nucleus']);
  B.Game.place('nucleus');
  assert.equal(B.Progress.get().activities.length,1);
});

test('All 11 stages complete through game actions, including routing for phases 9-11 (simulated DOM)', () => {
  const {B,effects} = gameHarness();
  for (const l of B.levels) {
    B.Game.start(l.id);
    B.Game.select(l.structure);
    B.Game.place(l.structure);
    B.Game.exploreNext();
    assert.equal(B.Game.current().stage,'quiz');
    for (let step=0;step<l.questions.length;step++) {
      const q=l.questions[step];
      const prior=B.Progress.get().activities.length;
      B.Game.next();
      assert.equal(B.Game.current().step,step);
      B.Game.answer(q.options.find(o=>o.id!==q.answer).id);
      assert.equal(B.Game.current().answered,false);
      assert.equal(B.Progress.get().activities.length,prior);
      B.Game.hint();
      assert.equal(B.Game.current().hint,q.answer);
      assert.equal(B.Game.current().answered,false);
      B.Game.answer(q.answer);
      B.Game.answer(q.answer);
      assert.equal(B.Progress.get().activities.length,prior+1);
      assert.equal(B.Game.current().feedback,q.explanation);
      assert.equal(B.Game.current().answered,true);
      if(step+1<l.questions.length) B.Game.next();
    }
    B.Game.finish();
    assert.equal(effects.route,`conclusao-${l.id}`);
    assert.ok(B.Progress.get().completed.includes(l.id));
    assert.equal(B.Progress.get().drafts[l.id],undefined);
  }
  assert.equal(B.Progress.get().completed.length,11);
  assert.equal(B.Progress.get().activities.length,33);
  assert.equal(B.Progress.get().known.length,11);
  assert.equal(effects.successSounds,33);
});

test('Resuming a saved answered question restores feedback and explicit next action (simulated storage/DOM)', () => {
  const first = gameHarness();
  first.B.Game.start(1);
  first.B.Game.select('membrane');
  first.B.Game.place('membrane');
  first.B.Game.exploreNext();
  first.B.Game.answer(first.B.level(1).questions[0].answer);
  const second = gameHarness(first.storage);
  second.B.Game.start(1);
  assert.equal(second.B.Game.current().stage,'quiz');
  assert.equal(second.B.Game.current().step,0);
  assert.equal(second.B.Game.current().answered,true);
  assert.match(normalizeText(second.B.Game.current().feedback),/permeabilidade seletiva/);
  assert.match(second.effects.html,/data-action="next-question"/);
  assert.equal(second.effects.successSounds,0);
});

test('Pause, repeat and restart preserve completed milestones while managing only the active draft', () => {
  const {B,effects} = gameHarness();
  B.Progress.complete(1);
  B.Game.start(4);
  B.Game.select('mitochondrion');
  B.Game.place('mitochondrion');
  B.Game.pause();
  assert.ok(effects.modal);
  assert.equal(B.Progress.get().drafts[4].placed[0],'mitochondrion');
  B.Game.restart();
  assert.equal(B.Progress.get().drafts[4],undefined);
  assert.deepEqual(plain(B.Progress.get().completed),[1]);
  assert.equal(effects.route,'jogar-4');
  B.Game.start(4);
  assert.equal(B.Game.current().placed.length,0);
  assert.equal(B.Progress.get().completed.length,1);
});

test('Spoken instruction content includes the model, current question choices and explanatory feedback', () => {
  const {B} = gameHarness();
  B.Game.start(11);
  B.Game.select('vacuole');
  B.Game.place('vacuole');
  B.Game.exploreNext();
  const q=B.level(11).questions[0];
  assert.ok(B.Game.instruction().includes(B.cellContexts.plant.label));
  assert.ok(B.Game.instruction().includes(q.prompt));
  for(const o of q.options)assert.ok(B.Game.instruction().includes(o.label));
  B.Game.answer(q.answer);
  assert.ok(B.Game.instruction().includes(q.explanation));
});

// Routing/event integration uses a narrow explicit DOM double. It verifies
// state and rendered markup contracts, never browser layout or focus behavior.
function appHarness(storage = new Map()) {
  const listeners = {document:new Map(),window:new Map()};
  const elements = new Map();
  const emit = (target,type,event={}) => {
    for (const fn of listeners[target].get(type)||[]) fn(event);
  };
  const add = (target,type,fn) => {
    if(!listeners[target].has(type))listeners[target].set(type,[]);
    listeners[target].get(type).push(fn);
  };
  function getElement(key) {
    if(!elements.has(key)) {
      const local = new Map();
      const e = {
        dataset:{},style:{},classList:{toggle(){},add(){},remove(){}},
        innerHTML:'',textContent:'',open:false,disabled:false,hidden:false,
        focus(){},setAttribute(){},scrollIntoView(){},getBoundingClientRect(){return {top:0,bottom:50,width:100,height:50};},
        addEventListener(type,fn){if(!local.has(type))local.set(type,[]);local.get(type).push(fn);},
        showModal(){this.open=true;},close(){this.open=false;for(const fn of local.get('close')||[])fn();}
      };
      elements.set(key,e);
    }
    return elements.get(key);
  }
  let hash='';
  const location = {protocol:'file:',pathname:'/biomundo/index.html',get hash(){return hash;},set hash(value){const n=value.startsWith('#')?value:'#'+value;if(n!==hash){hash=n;emit('window','hashchange');}}};
  const ctx={
    console,location,navigator:{onLine:true},isSecureContext:false,innerHeight:900,
    document:{querySelector:getElement,querySelectorAll:()=>[],getElementById:id=>getElement('#'+id),
      addEventListener:(type,fn)=>add('document',type,fn),dispatchEvent:e=>emit('document',e.type,e),documentElement:{dataset:{}}},
    Event:class{constructor(type){this.type=type;}},CustomEvent:class{constructor(type,init){this.type=type;this.detail=init?.detail;}},
    localStorage:{getItem:key=>storage.has(key)?storage.get(key):null,setItem:(key,value)=>storage.set(key,value)},
    requestAnimationFrame:callback=>callback(),scrollTo(){},
    addEventListener:(type,fn)=>add('window',type,fn)
  };
  ctx.window=ctx;
  vm.createContext(ctx);
  for(const file of ['content.js','levels.js','progress.js'])vm.runInContext(read(`js/${file}`),ctx,{filename:file});
  const B=ctx.Bio;
  B.Audio={supported:()=>true,isSpeaking:()=>false,stop(){},success(){},speak(){}};
  B.Interactions={cancel(){},bind(){}};
  B.Access={apply(){}};
  for(const file of ['game.js','main.js'])vm.runInContext(read(`js/${file}`),ctx,{filename:file});
  function click(action,extra={}){
    const b={disabled:false,dataset:{action,...extra},closest(selector){return selector==='button'?this:null;}};
    emit('document','click',{target:b,preventDefault(){}});
  }
  return {B,location,elements,click,html:()=>getElement('#app').innerHTML};
}

test('Real router accepts phases 9-11 and rejects nonexistent routes (simulated DOM events)', () => {
  const a=appHarness();
  for(const id of [9,10,11]){
    const lastLevel=a.B.Progress.get().lastLevel;
    a.B.UI.navigate(`fase-${id}`);
    assert.equal(a.B.Progress.get().lastLevel,lastLevel,'Browsing an introduction must preserve the resumable game');
    assert.match(a.html(),new RegExp(`Fase ${id} de 11`));
    a.click('start',{id:String(id)});
    assert.equal(a.B.Game.current().level.id,id);
    assert.equal(a.location.hash,`#jogar-${id}`);
  }
  for(const invalid of ['jogar-99','aprender-constructor','aprender-__proto__']) {
    a.B.UI.navigate(invalid);
    assert.match(a.html(),/class="panel hero"/);
  }
});

test('Glossary routing renders one entry, its audio control and its zoom control', () => {
  const a=appHarness();
  a.B.UI.navigate('jogar-3');
  a.click('detail',{organelle:'nucleus'});
  assert.equal(a.location.hash,'#aprender-nucleus');
  assert.equal((a.html().match(/class="glossary-detail"/g)||[]).length,1);
  assert.match(a.html(),/data-action="listen-detail"/);
  assert.match(a.html(),/data-action="zoom"/);
  a.click('glossary-select',{organelle:'chloroplast'});
  assert.equal(a.location.hash,'#aprender-chloroplast');
  assert.equal((a.html().match(/class="glossary-detail"/g)||[]).length,1);
  assert.match(normalizeText(a.html()),/celulas humanas/);
});

test('Returning from settings through the glossary restores the original game route', () => {
  const a=appHarness();
  a.B.UI.navigate('jogar-3');
  a.click('detail',{organelle:'nucleus'});
  a.click('settings');
  assert.equal(a.location.hash,'#ajustes');
  a.click('return');
  assert.equal(a.location.hash,'#aprender-nucleus');
  a.click('return');
  assert.equal(a.location.hash,'#jogar-3');
});

test('Zoom control clamps 100-200 percent and reset is reversible (simulated DOM events)', () => {
  const a=appHarness();
  a.B.UI.navigate('aprender');
  a.click('zoom',{organelle:'membrane'});
  assert.equal(a.elements.get('#modal').open,true);
  assert.equal(a.elements.get('#zoom-image').style.width,'100%');
  for(let i=0;i<5;i++)a.click('zoom-plus');
  assert.equal(a.B.Progress.get().settings.zoom,200);
  assert.equal(a.elements.get('#zoom-image').style.width,'200%');
  a.click('zoom-minus');
  assert.equal(a.B.Progress.get().settings.zoom,175);
  a.click('zoom-reset');
  assert.equal(a.B.Progress.get().settings.zoom,100);
  assert.equal(a.elements.get('#zoom-image').style.width,'100%');
  assert.equal(a.B.Progress.get().activities.length,0);
});

test('Actual audio controller is opt-in, stoppable, race-safe and resilient to missing voices (simulated speech API)', () => {
  function audioHarness(supported=true) {
    const calls=[],events=[],settings={narration:false,sound:false,mode:'standard'};
    const nodes=new Map();
    const node=id=>{if(!nodes.has(id))nodes.set(id,{textContent:''});return nodes.get(id);};
    const synth={speak(u){calls.push(u);},cancel(){},getVoices(){return [{lang:'pt-BR',name:'Voz simulada'}];}};
    const ctx={
      console,Event:class{constructor(type){this.type=type;}},
      document:{getElementById:node,addEventListener(){},dispatchEvent:e=>events.push(e.type)},
      Bio:{Progress:{get:()=>({settings}),settings(patch){Object.assign(settings,patch);}}},
      Audio:class{play(){return Promise.resolve();}pause(){}}
    };
    if(supported){ctx.speechSynthesis=synth;ctx.SpeechSynthesisUtterance=class{constructor(text){this.text=text;}};}
    ctx.window=ctx;
    vm.createContext(ctx);
    vm.runInContext(read('js/audio.js'),ctx,{filename:'audio.js'});
    return {B:ctx.Bio,calls,events,settings,nodes};
  }
  const a=audioHarness();
  assert.equal(a.calls.length,0,'Initialization must not start narration');
  assert.equal(a.settings.narration,false);
  a.B.Audio.speak('Membrana: permeabilidade seletiva.');
  assert.equal(a.calls.length,1);
  assert.equal(a.settings.narration,true);
  assert.equal(a.calls[0].lang,'pt-BR');
  assert.equal(a.B.Audio.isSpeaking(),true);
  a.B.Audio.speak('Second click stops, not replays.');
  assert.equal(a.calls.length,1);
  assert.equal(a.B.Audio.isSpeaking(),false);
  a.B.Audio.speak('Ribossomos sintetizam proteínas.');
  assert.equal(a.calls.length,2);
  a.calls[0].onend();
  assert.equal(a.B.Audio.isSpeaking(),true,'A delayed old event must not stop the new utterance');
  a.calls[1].onerror();
  assert.equal(a.B.Audio.isSpeaking(),false);
  assert.match(normalizeText(a.nodes.get('announcer').textContent),/voz nao esta disponivel/);
  const unavailable=audioHarness(false);
  assert.equal(unavailable.B.Audio.supported(),false);
  unavailable.B.Audio.speak('Texto permanece disponível.');
  assert.equal(unavailable.B.Audio.isSpeaking(),false);
  assert.match(normalizeText(unavailable.nodes.get('announcer').textContent),/nao oferece narracao/);
});
