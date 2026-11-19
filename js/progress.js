/* Local-only persistence. v1 remains intact when importing the focused curriculum. */
'use strict';
(function(B){
 const scope=location.pathname.replace(/[^/]*$/,'');
 const KEY='biomundo:v2:'+scope,LEGACY_KEY='biomundo:v1:'+scope;
 const defaultSettings=()=>({mode:'standard',sound:false,narration:false,motion:false,contrast:false,size:'normal',complexity:'guided',zoom:100});
 const defaults=()=>({version:2,completed:[],activities:[],known:[],lastLevel:1,drafts:{},settings:defaultSettings(),legacy:null,migration:null});
 const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
 const list=(value,test)=>Array.isArray(value)?[...new Set(value.filter(test))]:[];
 const levelId=v=>Number.isInteger(v)&&B.levels.some(l=>l.id===v);
 const knownId=v=>typeof v==='string'&&Object.hasOwn(B.content,v);
 const validActivities=new Set(B.levels.flatMap(l=>['explore',...(l.questions||[]).map(q=>q.id)].map(id=>`${l.id}:${id}`)));
 const oldLevels={
  1:{questions:['membrane','cytoplasm','nucleus'],focus:['membrane','cytoplasm','nucleus']},
  2:{pieces:['nucleus','mitochondrion','golgi']},
  3:{pieces:['nucleus','mitochondrion','golgi','reticulum','ribosome','lysosome']},
  4:{questions:['atp','protein','recycle','distribution','network'],focus:['mitochondrion','ribosome','lysosome','golgi','reticulum']},
  5:{questions:['wall','photo','water'],focus:['wall','chloroplast','vacuole']},
  6:{pieces:['nucleus','mitochondrion','chloroplast','vacuole','ribosome','golgi']},
  7:{questions:['nucleus','mito','wall','chloro','ribosome','lysosome'],focus:['nucleus','mitochondrion','wall','chloroplast','ribosome','lysosome']},
  8:{questions:['membrane','dna','mito','photo','proteins','positions'],focus:['membrane','nucleus','mitochondrion','chloroplast','ribosome','membrane']}
 };
 const oldActivityIds=new Set(Object.entries(oldLevels).flatMap(([id,l])=>(l.pieces||l.questions).map(part=>`${id}:${part}`)));
 function settings(raw){
  const s=object(raw)?raw:{},d=defaultSettings();
  for(const key of ['sound','narration','motion','contrast'])if(typeof s[key]==='boolean')d[key]=s[key];
  if(['standard','calm','custom'].includes(s.mode))d.mode=s.mode;
  if(['normal','large'].includes(s.size))d.size=s.size;
  if(['guided','explore'].includes(s.complexity))d.complexity=s.complexity;
  if([100,125,150,175,200].includes(s.zoom))d.zoom=s.zoom;
  if(d.mode==='calm'){d.sound=false;d.motion=false;}
  return d;
 }
 function draftFor(level,raw){
  const r=object(raw)?raw:{},placed=list(r.placed,v=>v===level.structure);
  const stage=r.stage==='quiz'&&placed.length===1?'quiz':'explore';
  const validStep=Number.isInteger(r.step)&&r.step>=0&&r.step<(level.questions||[]).length;
  return {placed,stage,step:stage==='quiz'&&validStep?r.step:0,answered:stage==='quiz'&&validStep&&r.answered===true};
 }
 function legacySnapshot(raw){
  if(!object(raw)||raw.version!==1)return null;
  const d={version:1,completed:list(raw.completed,v=>Number.isInteger(v)&&v>=1&&v<=8),activities:list(raw.activities,v=>oldActivityIds.has(v)),known:list(raw.known,knownId),lastLevel:1,drafts:{},settings:settings(raw.settings)};
  if(Number.isInteger(raw.lastLevel)&&raw.lastLevel>=1&&raw.lastLevel<=8)d.lastLevel=raw.lastLevel;
  for(const [id,level] of Object.entries(oldLevels)){
   const r=object(raw.drafts)&&raw.drafts[id];if(!object(r))continue;
   const count=(level.questions||[]).length,validStep=Number.isInteger(r.step)&&r.step>=0&&r.step<count;
   d.drafts[id]={placed:list(r.placed,v=>(level.pieces||[]).includes(v)),step:validStep?r.step:0,answered:validStep&&r.answered===true};
  }
  return d;
 }
 function normalize(raw){
  const d=defaults();if(!object(raw)||raw.version!==2)return d;
  d.completed=list(raw.completed,levelId);
  d.activities=list(raw.activities,v=>validActivities.has(v));
  d.known=list(raw.known,knownId);
  if(levelId(raw.lastLevel))d.lastLevel=raw.lastLevel;
  d.settings=settings(raw.settings);
  if(object(raw.drafts))for(const l of B.levels){
   if(object(raw.drafts[l.id]))d.drafts[l.id]=draftFor(l,raw.drafts[l.id]);
  }
  d.legacy=legacySnapshot(raw.legacy);
  if(d.legacy)d.migration={fromVersion:1,toVersion:2,retainedLegacyKey:LEGACY_KEY};
  return d;
 }
 function migrate(raw){
  const legacy=legacySnapshot(raw),d=defaults();if(!legacy)return d;
  d.legacy=legacy;d.known=[...legacy.known];d.settings={...legacy.settings};
  d.migration={fromVersion:1,toVersion:2,retainedLegacyKey:LEGACY_KEY};
  const old=oldLevels[legacy.lastLevel],resume=legacy.drafts[legacy.lastLevel];
  let focus=(old.pieces||old.focus)[0];
  if(resume){
   focus=old.pieces?(old.pieces.find(id=>!resume.placed.includes(id))||old.pieces[0]):old.focus[Math.min(resume.step+(resume.answered?1:0),old.focus.length-1)];
  }
  const next=B.levels.find(l=>l.structure===focus);if(next)d.lastLevel=next.id;
  // The old exercise remains in legacy. New questions never inherit old completion.
  if(resume&&next)d.drafts[next.id]=draftFor(next,{});
  return d;
 }
 let available=true,state=defaults(),protectedVersion=false;
 try{
  const stored=localStorage.getItem(KEY);
  if(stored!==null){
   let raw=null;try{raw=JSON.parse(stored);}catch(_){/* Recover after retaining the original bytes. */}
   if(object(raw)&&Number.isInteger(raw.version)&&raw.version>2){protectedVersion=true;available=false;}
   else if(object(raw)&&raw.version===2)state=normalize(raw);
   else{
    // A malformed v2 is not an excuse to reimport a previously reset v1.
    if(localStorage.getItem(KEY+':recovery')===null)localStorage.setItem(KEY+':recovery',stored);
   }
  }else{
   const legacy=localStorage.getItem(LEGACY_KEY);
   if(legacy!==null){let raw=null;try{raw=JSON.parse(legacy);}catch(_){/* Leave malformed legacy bytes untouched. */}state=migrate(raw);}
  }
  if(!protectedVersion)localStorage.setItem(KEY,JSON.stringify(state));
 }catch(_){available=false;}
 function save(){
  if(protectedVersion)available=false;
  else try{localStorage.setItem(KEY,JSON.stringify(state));available=true;}catch(_){available=false;}
  document.dispatchEvent(new CustomEvent('biomundo:save',{detail:{available}}));
  return available;
 }
 B.Progress={key:KEY,legacyKey:LEGACY_KEY,normalize,defaults,get:()=>state,available:()=>available,save,
  settings(patch){state.settings=settings({...state.settings,...(object(patch)?patch:{})});save();},
  visit(id){const n=Number(id);if(!levelId(n))return;state.lastLevel=n;save();},
  draft(id,value){const l=B.level(Number(id));if(!l)return;state.drafts[l.id]=draftFor(l,value);save();},
  resetDraft(id){const n=Number(id);if(!levelId(n))return;delete state.drafts[n];save();},
  learn(id){if(knownId(id)&&!state.known.includes(id)){state.known.push(id);save();}},
  activity(level,id){const key=`${level}:${id}`;if(validActivities.has(key)&&!state.activities.includes(key)){state.activities.push(key);save();}},
  complete(id){const n=Number(id);if(!levelId(n))return;if(!state.completed.includes(n))state.completed.push(n);delete state.drafts[n];save();},
  reset(){const preferences={...state.settings};state=defaults();state.settings=preferences;save();}
 };
})(Bio);
