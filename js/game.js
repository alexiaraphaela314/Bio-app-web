/* BioMundo 2.0: one focus structure, one task at a time. */
'use strict';
(function(B){
 let g=null;
 const esc=B.escape;
 const isPlaced=()=>g.placed.includes(g.level.structure);
 const complete=()=>g.stage==='quiz'&&g.step===g.level.questions.length-1&&g.answered;
 const checkpoint=()=>B.Progress.draft(g.level.id,g);
 const announce=text=>B.UI.announce(text);
 function focus(selector){
  const e=document.querySelector(selector);if(!e)return;
  e.focus({preventScroll:true});
  const r=e.getBoundingClientRect();if(r.top<0||r.bottom>innerHeight)e.scrollIntoView({block:'nearest',behavior:'instant'});
 }
 function header(){
  const l=g.level,total=1+l.questions.length,n=(isPlaced()?1:0)+(g.stage==='quiz'?g.step+(g.answered?1:0):0);
  return `<section class="panel stage-header"><div class="stage-top"><div><span class="eyebrow">Fase ${l.id} de ${B.levels.length} · Uma estrutura por vez</span><h1>${esc(l.title)}</h1></div><div class="stage-controls"><button class="btn compact ghost" data-action="map">← Mapa</button><button class="btn compact gold" data-action="hint">? Ajuda</button><button class="btn compact ghost" data-action="pause">Ⅱ Pausar</button><button class="btn compact ghost" data-action="listen" ${B.Audio.supported()?'':'disabled'}><span class="listen-label">▷ Ouvir</span></button></div></div><div class="progress-row"><div class="progress-bar" role="progressbar" aria-label="Atividades desta fase" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${n}"><span style="width:${100*n/total}%"></span></div><span class="progress-counter">${n} de ${total} atividades</span></div></section>`;
 }
 function guide(){return `<section class="guide" aria-label="Instrução da Bibi"><img id="guide-mascot" src="assets/mascot/${g.mood}.svg" alt="Bibi, a Célula Exploradora"><div><h2>Bibi, sua guia</h2><p id="guide-text">${esc(g.message)}</p></div></section>`;}
 function feedback(){return `<div class="feedback ${g.feedbackType}" id="activity-feedback"><span aria-hidden="true">${g.feedbackType==='good'?'✓':'✦'}</span><p>${esc(g.feedback)}</p></div>`;}
 function regionHighlight(id){
  if(id==='membrane')return '<svg class="region-highlight" viewBox="0 0 580 560" aria-hidden="true"><path d="M111 64C198 9 319 26 403 85S534 175 523 282 435 499 320 517 97 472 62 365 28 160 111 64Z" fill="none" stroke="currentColor" stroke-width="6" stroke-dasharray="12 8"/></svg>';
  if(id==='wall')return '<svg class="region-highlight" viewBox="0 0 580 560" aria-hidden="true"><rect x="37" y="20" width="505" height="508" rx="91" fill="none" stroke="currentColor" stroke-width="7" stroke-dasharray="12 8"/></svg>';
  if(id==='cytoplasm')return '<svg class="region-highlight" viewBox="0 0 580 560" aria-hidden="true"><ellipse cx="290" cy="280" rx="145" ry="138" fill="#fff7" stroke="currentColor" stroke-width="4" stroke-dasharray="10 7"/></svg>';
  return '';
 }
 function exploration(){
  const l=g.level,id=l.structure,c=B.content[id],placed=isPlaced(),guided=B.Progress.get().settings.complexity==='guided';
  const region=['membrane','cytoplasm','wall'].includes(id);
  const pos=id==='membrane'?[19,50,28,16]:id==='wall'?[21,50,29,16]:id==='cytoplasm'?[50,50,33,25]:B.positions[l.cell][id];
  const slot=`<button class="slot single-slot ${region?'region-slot':''} ${placed?'filled':''} ${g.hint?'hinted':''}" data-slot="${id}" aria-label="${placed?'Rever função de':'Área A para'} ${esc(c.name)}" style="left:${pos[0]}%;top:${pos[1]}%;width:${pos[2]}%;height:${pos[3]}%">${region?'':B.image(id)}<span class="slot-num" aria-hidden="true">${placed?'✓':'A'}</span><span class="slot-name">${placed||guided||g.hint?esc(c.short):'Área A'}</span></button>`;
  return `<div class="play-layout single-explore"><section class="cell-panel" aria-label="Modelo celular com uma estrutura em foco"><div class="model-tools"><p class="model-caption">${esc(B.cellContexts[l.cell].label)}</p><button class="btn compact secondary" data-action="zoom" data-organelle="${id}">⊕ Ampliar figura</button></div><div class="cell-board" aria-label="Localização didática de ${esc(c.name)}"><img class="cell-base" src="assets/cells/${l.cell}-base.svg" alt="Base de um modelo ${l.cell==='plant'?'vegetal, com parede externa e membrana interna':'animal, com membrana e citoplasma'}. Outras estruturas foram omitidas para destacar ${esc(c.name)}." draggable="false">${regionHighlight(id)}${slot}</div><p class="model-omission">Só a estrutura desta fase está em destaque. As demais foram omitidas.</p></section><aside class="panel parts-panel" aria-label="Estrutura da fase"><span class="eyebrow">${placed?'Estrutura localizada':'1. Escolha a peça'}</span><h2>${esc(c.name)}</h2>${placed?`<p class="focus-function">${esc(c.simple)}</p>`:`<p class="intro-small">Selecione a peça e toque na área A. Você também pode arrastar.</p><div class="pieces-grid single-piece"><button class="piece ${g.selected===id?'selected':''}" data-piece="${id}" aria-pressed="${g.selected===id}" aria-label="Selecionar ${esc(c.name)}">${B.image(id)}<span class="piece-name">${esc(c.short)}<small>Toque ou arraste → área A</small></span></button></div>`}<p class="selection-message" id="selection-message">${g.selected?'Peça selecionada. Agora toque na área A.':placed?'Observe a função e continue quando quiser.':'As formas, a letra A e os nomes ajudam a localizar.'}</p>${feedback()}<div class="game-bottom">${placed?'<button class="btn primary" data-action="explore-next">Entender a função →</button>':'<button class="btn compact ghost" data-action="hint">Mostrar pista visual</button>'}</div><button class="text-link" data-action="detail" data-organelle="${id}">Ver no glossário</button></aside></div>`;
 }
 function quiz(){
  const l=g.level,c=B.content[l.structure],q=l.questions[g.step];
  return `<section class="panel question-panel"><div class="question-layout"><div class="question-figure"><div class="question-art">${B.image(l.structure,'',`Ilustração de ${c.name}, estrutura desta fase`)}</div><button class="btn compact ghost" data-action="zoom" data-organelle="${l.structure}">⊕ Ampliar figura</button></div><div class="question-main"><p class="question-counter">${esc(c.name)} · Pergunta ${g.step+1} de ${l.questions.length}</p><h2 id="question-title">${esc(q.prompt)}</h2><div class="answers focus-answers" data-count="${q.options.length}" role="group" aria-labelledby="question-title">${q.options.map((o,i)=>`<button class="answer ${g.answered&&q.answer===o.id?'correct':''} ${g.hint===o.id?'answer-help':''}" data-answer="${o.id}" ${g.answered?'disabled':''}><span class="answer-letter" aria-hidden="true">${g.answered&&q.answer===o.id?'✓':String.fromCharCode(65+i)}</span><span>${esc(o.label)}</span></button>`).join('')}</div></div></div><div class="quiz-feedback">${feedback()}</div>${g.answered?`<div class="quiz-next"><button class="btn primary" data-action="${complete()?'finish':'next-question'}">${complete()?'Concluir fase':'Próxima pergunta'} →</button></div>`:''}<button class="text-link" data-action="detail" data-organelle="${l.structure}">Consultar esta estrutura no glossário</button></section>`;
 }
 function render(selector){
  if(!g)return;
  B.UI.mount(header()+B.UI.cellContext(g.level.cell)+guide()+(g.stage==='explore'?exploration():quiz())+`<p class="science-note">${esc(B.scienceNote)}</p>`,false);
  document.title=`${g.level.title} · Fase ${g.level.id} | BioMundo`;
  if(selector)focus(selector);
 }
 function guideOnly(mood,message){g.mood=mood;g.message=message;const img=document.getElementById('guide-mascot'),txt=document.getElementById('guide-text');if(img)img.src=`assets/mascot/${mood}.svg`;if(txt)txt.textContent=message;}
 B.Game={
 start(id){
  const level=B.level(id);if(!level)return;
  const d=B.Progress.get().drafts[id]||{};
  g={level,placed:[...(d.placed||[])],stage:d.stage||'explore',step:d.step||0,answered:!!d.answered,selected:null,hint:null,mood:'explaining',message:'Uma estrutura por vez. Escolha a peça e depois a área A.',feedback:'Sem pressa. Use Ajuda ou Ampliar figura quando precisar.',feedbackType:'neutral'};
  if(g.stage==='quiz')g.message='Leia a pergunta e escolha uma resposta. Você pode ouvir ou pedir ajuda.';
  if(g.answered){g.feedback=level.questions[g.step].explanation;g.feedbackType='good';g.mood='happy';g.message='Sua resposta foi recuperada. Continue quando estiver pronto.';}
  else if(isPlaced()&&g.stage==='explore'){g.feedback=B.content[level.structure].function;g.feedbackType='good';g.message='A estrutura já está localizada. Vamos entender sua função?';}
  B.Progress.visit(id);checkpoint();render();window.scrollTo(0,0);document.getElementById('app').focus({preventScroll:true});
 },
 current:()=>g,render,
 instruction(){if(!g)return '';const c=B.content[g.level.structure],q=g.stage==='quiz'?g.level.questions[g.step]:null;return `${B.cellContexts[g.level.cell].label}. ${c.name}. ${g.message} ${q?q.prompt+' '+q.options.map((o,i)=>`Opção ${String.fromCharCode(65+i)}: ${o.label}`).join(' '):c.simple} ${g.feedback}`;},
 select(id){
  if(!g||g.stage!=='explore'||id!==g.level.structure||isPlaced())return;
  B.Audio.stop();g.selected=id;g.hint=null;
  document.querySelectorAll('[data-piece]').forEach(e=>{e.classList.toggle('selected',e.dataset.piece===id);e.setAttribute('aria-pressed',String(e.dataset.piece===id));});
  document.querySelectorAll('.hinted').forEach(e=>e.classList.remove('hinted'));
  guideOnly('thinking',`Peça selecionada: ${B.content[id].name}. Agora toque na área A.`);
  const el=document.getElementById('selection-message');if(el)el.textContent='Peça selecionada. Agora toque na área A.';announce(g.message);
 },
 place(id){
  if(!g||g.stage!=='explore'||id!==g.level.structure)return;
  B.Audio.stop();
  if(isPlaced()){guideOnly('explaining',B.content[id].simple);announce(g.message);return;}
  if(!g.selected){guideOnly('explaining','Primeiro selecione a peça. Depois, toque na área A.');announce(g.message);return;}
  if(g.selected!==id)return;
  g.placed=[id];g.selected=null;g.hint=null;g.mood='happy';g.message='Isso! Você localizou a estrutura desta fase.';g.feedback=B.content[id].function;g.feedbackType='good';
  B.Progress.learn(id);B.Progress.activity(g.level.id,'explore');checkpoint();B.Audio.success();render('[data-action="explore-next"]');announce(`${g.message} ${g.feedback}`);
 },
 exploreNext(){
  if(!g||g.stage!=='explore'||!isPlaced())return;
  B.Audio.stop();g.stage='quiz';g.step=0;g.answered=false;g.hint=null;g.mood='explaining';g.message='Agora vamos entender a função. Uma pergunta por vez.';g.feedback='Escolha uma resposta. Você pode consultar a ajuda ou o glossário.';g.feedbackType='neutral';checkpoint();render('[data-answer]');
 },
 answer(id){
  if(!g||g.stage!=='quiz'||g.answered)return;const q=g.level.questions[g.step];if(!q.options.some(o=>o.id===id))return;
  B.Audio.stop();
  if(id!==q.answer){g.feedback='Vamos tentar novamente. Releia a pergunta ou use Ajuda. Não há perda de pontos.';g.feedbackType='neutral';g.mood='encouraging';g.message='Você pode explorar outra resposta, no seu ritmo.';render(`[data-answer="${id}"]`);announce(g.feedback);return;}
  g.answered=true;g.hint=null;g.mood='happy';g.message='Isso! Veja a explicação para sua descoberta.';g.feedback=q.explanation;g.feedbackType='good';
  B.Progress.learn(g.level.structure);B.Progress.activity(g.level.id,q.id);checkpoint();B.Audio.success();render(complete()?'[data-action="finish"]':'[data-action="next-question"]');announce(q.explanation);
 },
 next(){if(!g||g.stage!=='quiz'||!g.answered||complete())return;B.Audio.stop();g.step++;g.answered=false;g.hint=null;g.mood='explaining';g.message='Vamos observar em que células essa estrutura aparece.';g.feedback='Leia ou ouça a pergunta. A ajuda continua disponível.';g.feedbackType='neutral';checkpoint();render('[data-answer]');},
 hint(){
  if(!g)return;B.Audio.stop();
  if(complete()){guideOnly('happy','Você terminou as atividades. Toque em Concluir fase.');announce(g.message);return;}
  if(g.stage==='explore'){
   if(isPlaced()){guideOnly('explaining',B.content[g.level.structure].simple);announce(g.message);return;}
   g.selected=g.level.structure;g.hint=g.level.structure;g.mood='explaining';g.message=B.content[g.level.structure].hint;g.feedback='A peça está selecionada e a área A está destacada com contorno. Toque na área A.';g.feedbackType='neutral';render('[data-slot]');
  }else{const q=g.level.questions[g.step];g.hint=q.answer;g.mood='explaining';g.message=q.explanation;g.feedback='A resposta está destacada com contorno. Escolha quando quiser.';g.feedbackType='neutral';render(`[data-answer="${q.answer}"]`);}
  announce(`${g.message} ${g.feedback}`);
 },
 finish(){if(!g||!complete())return;const id=g.level.id;B.Progress.complete(id);B.Audio.stop();B.UI.navigate(`conclusao-${id}`);},
 restart(){if(!g)return;const id=g.level.id;B.Progress.resetDraft(id);B.UI.navigate(`jogar-${id}`);},
 pause(){if(!g)return;B.Audio.stop();B.Interactions.cancel();checkpoint();B.UI.modal('Uma pausa no seu ritmo',`<img class="modal-art" src="assets/mascot/neutral.svg" alt="Bibi descansando"><p>${B.Progress.available()?'Sua etapa e suas respostas estão salvas neste dispositivo.':'Seu progresso está disponível nesta sessão. O navegador não permitiu salvar no dispositivo.'}</p><div class="button-row"><button class="btn primary" data-action="close-modal">Continuar</button><button class="btn ghost" data-action="restart-confirm">Reiniciar fase</button><button class="btn ghost" data-action="map">Voltar ao mapa</button></div>`);}
 };
})(Bio);
