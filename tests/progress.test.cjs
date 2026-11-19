/* Persistence regression tests: real curriculum + simulated browser storage contract.
   Run with: node --test tests/progress.test.cjs
   A separate browser suite verifies real origin/reload behavior. */
const test=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const ROOT=path.resolve(__dirname,'..');
const NEW='biomundo:v2:/biomundo/';
const OLD='biomundo:v1:/biomundo/';
const plain=value=>JSON.parse(JSON.stringify(value));
function load({storage=new Map(),pathname='/biomundo/index.html',failRead=false,failWrite=false}={}){
 const control={failRead,failWrite},events=[];
 const c={location:{pathname},document:{dispatchEvent(e){events.push(e);}},CustomEvent:class{constructor(type,data){this.type=type;this.detail=data?.detail;}},localStorage:{
  getItem(k){if(control.failRead)throw Error('Storage blocked');return storage.has(k)?storage.get(k):null;},
  setItem(k,v){if(control.failWrite)throw Error('Quota exceeded');storage.set(k,String(v));}
 }};
 c.window=c;vm.createContext(c);
 for(const name of ['content.js','levels.js','progress.js'])vm.runInContext(fs.readFileSync(path.join(ROOT,'js',name),'utf8'),c,{filename:name});
 return {P:c.Bio.Progress,B:c.Bio,storage,control,events};
}
function oldState(overrides={}){
 return {version:1,completed:[1,2],activities:['1:membrane','1:cytoplasm','1:nucleus','2:nucleus','3:nucleus'],known:['membrane','nucleus'],lastLevel:3,drafts:{3:{placed:['nucleus'],step:0,answered:false}},settings:{mode:'custom',sound:false,narration:true,motion:false,contrast:true,size:'large',complexity:'explore'},...overrides};
}
test('v2 starts quiet with supported zoom and no assumed achievements',()=>{
 const {P,B}=load();assert.equal(B.levels.length,11);assert.equal(P.key,NEW);assert.equal(P.legacyKey,OLD);
 assert.equal(P.get().version,2);assert.equal(P.get().settings.motion,false);assert.equal(P.get().settings.sound,false);assert.equal(P.get().settings.narration,false);assert.equal(P.get().settings.zoom,100);
 assert.equal(P.get().completed.length,0);assert.equal(P.get().legacy,null);assert.equal(P.available(),true);
});
test('reload restores the exact quiz position, answer, preferences and discoveries',()=>{
 const {P,storage}=load();P.learn('mitochondrion');P.activity(4,'explore');P.activity(4,'function');P.visit(4);
 P.draft(4,{placed:['mitochondrion'],stage:'quiz',step:1,answered:true});P.settings({zoom:175,contrast:true});P.complete(1);
 const R=load({storage}).P.get();assert.deepEqual(plain(R.drafts[4]),{placed:['mitochondrion'],stage:'quiz',step:1,answered:true});
 assert.equal(R.lastLevel,4);assert.equal(R.settings.zoom,175);assert.equal(R.settings.contrast,true);assert.deepEqual(plain(R.completed),[1]);assert.deepEqual(plain(R.known),['mitochondrion']);
});
test('directory URL and index.html share the same persistence scope',()=>{
 const {P,storage}=load();P.complete(2);const R=load({storage,pathname:'/biomundo/'}).P;
 assert.equal(R.key,NEW);assert.deepEqual(plain(R.get().completed),[2]);
});
test('v1 migration retains source bytes and the entire normalized legacy history',()=>{
 const original=JSON.stringify(oldState());const storage=new Map([[OLD,original]]);const {P}=load({storage});const s=P.get();
 assert.equal(storage.get(OLD),original);assert.deepEqual(plain(s.legacy.completed),[1,2]);assert.equal(s.legacy.activities.length,5);assert.equal(s.legacy.lastLevel,3);
 assert.deepEqual(plain(s.legacy.drafts[3].placed),['nucleus']);assert.equal(s.legacy.settings.narration,true);
 assert.deepEqual(plain(s.known),['membrane','nucleus']);assert.equal(s.settings.size,'large');assert.equal(s.settings.contrast,true);
 assert.equal(s.completed.length,0);assert.equal(s.activities.length,0);assert.equal(s.lastLevel,4);
 assert.deepEqual(plain(s.drafts[4]),{placed:[],stage:'explore',step:0,answered:false});
 assert.deepEqual(plain(s.migration),{fromVersion:1,toVersion:2,retainedLegacyKey:OLD});
});
test('migration is not re-applied after the new curriculum has progress',()=>{
 const storage=new Map([[OLD,JSON.stringify(oldState())]]);let {P}=load({storage});P.activity(4,'explore');P.learn('mitochondrion');P.draft(4,{placed:['mitochondrion'],stage:'quiz',step:0,answered:true});P.complete(4);
 P=load({storage}).P;assert.deepEqual(plain(P.get().completed),[4]);assert.equal(P.get().activities.length,1);assert.equal(P.get().known.includes('mitochondrion'),true);assert.equal(P.get().legacy.completed.length,2);
});
test('legacy quiz resume maps its focused structure without inventing new answers',()=>{
 const storage=new Map([[OLD,JSON.stringify(oldState({lastLevel:5,drafts:{5:{placed:[],step:1,answered:false}}}))]]);const s=load({storage}).P.get();
 assert.equal(s.lastLevel,10);assert.equal(s.drafts[10].stage,'explore');assert.equal(s.drafts[10].answered,false);assert.equal(s.completed.length,0);
});
test('reset keeps accessibility choices and prevents legacy re-import on reload',()=>{
 const original=JSON.stringify(oldState());const storage=new Map([[OLD,original]]);let {P}=load({storage});P.settings({zoom:200});P.complete(4);P.reset();P=load({storage}).P;
 assert.equal(P.get().legacy,null);assert.equal(P.get().migration,null);assert.equal(P.get().known.length,0);assert.equal(P.get().completed.length,0);assert.equal(P.get().activities.length,0);assert.equal(Object.keys(P.get().drafts).length,0);
 assert.equal(P.get().settings.zoom,200);assert.equal(P.get().settings.contrast,true);assert.equal(storage.get(OLD),original);
});
test('quiz cannot resume before its own focused structure was explored',()=>{
 const {P}=load();P.draft(3,{placed:['chloroplast'],stage:'quiz',step:1,answered:true});
 assert.deepEqual(plain(P.get().drafts[3]),{placed:[],stage:'explore',step:0,answered:false});
 P.draft(3,{placed:['nucleus'],stage:'explore',step:1,answered:true});
 assert.deepEqual(plain(P.get().drafts[3]),{placed:['nucleus'],stage:'explore',step:0,answered:false});
});
test('invalid step or boolean cannot mark a different question as answered',()=>{
 const {P}=load();for(const step of [-1,50,0.5,'1',null]){P.draft(3,{placed:['nucleus'],stage:'quiz',step,answered:true});assert.equal(P.get().drafts[3].step,0);assert.equal(P.get().drafts[3].answered,false);}
 P.draft(3,{placed:['nucleus'],stage:'quiz',step:1,answered:'true'});assert.equal(P.get().drafts[3].answered,false);
});
test('normalization drops invalid, duplicated and unknown entries',()=>{
 const {P}=load();const raw={version:2,completed:[1,1,11,12,'2',null],activities:['1:explore','1:explore','1:membrane','11:context','0:function'],known:['nucleus','nucleus','__proto__','<script>'],lastLevel:99,drafts:{3:{placed:['nucleus','nucleus','vacuole'],stage:'quiz',step:1,answered:true},99:{placed:['nucleus']}},settings:{zoom:300,mode:'bad',size:'huge',sound:'true'}};
 const before=JSON.stringify(raw),s=P.normalize(raw);assert.equal(JSON.stringify(raw),before);
 assert.deepEqual(plain(s.completed),[1,11]);assert.deepEqual(plain(s.activities),['1:explore','11:context']);assert.deepEqual(plain(s.known),['nucleus']);assert.equal(s.lastLevel,1);assert.equal(s.settings.zoom,100);assert.equal(s.settings.sound,false);
 assert.deepEqual(plain(s.drafts[3].placed),['nucleus']);assert.equal(s.drafts[99],undefined);
});
test('legacy history is normalized to the old curriculum, not the new ids',()=>{
 const storage=new Map([[OLD,JSON.stringify(oldState({completed:[1,8,9,'2'],activities:['1:membrane','1:explore','6:chloroplast','11:context'],known:['nucleus','bad'],drafts:{3:{placed:['nucleus','wall','nucleus'],step:99,answered:true},5:{placed:[],step:99,answered:true},11:{placed:['wall']}}}))]]);
 const s=load({storage}).P.get();assert.deepEqual(plain(s.legacy.completed),[1,8]);assert.deepEqual(plain(s.legacy.activities),['1:membrane','6:chloroplast']);assert.deepEqual(plain(s.legacy.known),['nucleus']);assert.deepEqual(plain(s.legacy.drafts[3].placed),['nucleus']);assert.equal(s.legacy.drafts[5].answered,false);assert.equal(s.legacy.drafts[11],undefined);
});
test('calm mode enforces quiet while all supported zoom choices persist',()=>{
 const {P}=load();for(const zoom of [100,125,150,175,200]){P.settings({zoom});assert.equal(P.get().settings.zoom,zoom);}
 P.settings({mode:'calm',sound:true,motion:true});assert.equal(P.get().settings.sound,false);assert.equal(P.get().settings.motion,false);assert.equal(P.get().settings.zoom,200);
});
test('idempotent operations never inflate progress',()=>{
 const {P}=load();for(let i=0;i<5;i++){P.learn('membrane');P.activity(1,'explore');P.complete('1');}assert.equal(P.get().known.length,1);assert.equal(P.get().activities.length,1);assert.equal(P.get().completed.length,1);
});
test('invalid API ids cannot create phantom levels or activities',()=>{
 const {P}=load();for(const id of [0,12,'wrong',-1]){P.visit(id);P.complete(id);P.draft(id,{placed:['nucleus']});P.resetDraft(id);P.activity(id,'explore');}P.learn('unknown');P.activity(1,'unknown');
 assert.equal(P.get().lastLevel,1);assert.equal(P.get().completed.length,0);assert.equal(Object.keys(P.get().drafts).length,0);assert.equal(P.get().known.length,0);assert.equal(P.get().activities.length,0);
});
test('completing and replaying a phase retains achievements and clears only its draft',()=>{
 const {P}=load();P.draft(3,{placed:['nucleus'],stage:'quiz',step:1,answered:true});P.draft(4,{placed:['mitochondrion'],stage:'explore',step:0,answered:false});P.complete(3);
 assert.equal(P.get().drafts[3],undefined);assert.ok(P.get().drafts[4]);P.draft(3,{placed:[],stage:'explore',step:0,answered:false});assert.deepEqual(plain(P.get().completed),[3]);P.resetDraft(3);assert.equal(P.get().drafts[3],undefined);assert.ok(P.get().drafts[4]);
});
test('blocked storage supports an honest session-only game without crashing',()=>{
 const {P,events}=load({failRead:true,failWrite:true});assert.equal(P.available(),false);P.complete(1);P.learn('nucleus');P.draft(3,{placed:['nucleus'],stage:'quiz',step:0,answered:false});assert.equal(P.get().completed.length,1);assert.equal(P.get().known.length,1);assert.equal(P.save(),false);assert.equal(events.at(-1).detail.available,false);
});
test('quota failure does not discard readable progress and can recover',()=>{
 const initial=load();initial.P.complete(1);initial.P.settings({zoom:150});const {P,control}=load({storage:initial.storage,failWrite:true});
 assert.equal(P.get().completed[0],1);assert.equal(P.get().settings.zoom,150);assert.equal(P.available(),false);P.complete(2);control.failWrite=false;assert.equal(P.save(),true);
 assert.deepEqual(plain(load({storage:initial.storage}).P.get().completed),[1,2]);
});
test('malformed v2 is backed up and does not resurrect a reset v1',()=>{
 const storage=new Map([[NEW,'{broken json'],[OLD,JSON.stringify(oldState())]]);const {P}=load({storage});
 assert.equal(P.available(),true);assert.equal(storage.get(NEW+':recovery'),'{broken json');assert.equal(P.get().legacy,null);assert.equal(P.get().known.length,0);assert.equal(JSON.parse(storage.get(NEW)).version,2);
});
test('future storage versions are preserved and never silently overwritten',()=>{
 const raw=JSON.stringify({version:99,completed:[1],unknown:'future data'});const storage=new Map([[NEW,raw]]);const {P}=load({storage});
 assert.equal(P.available(),false);P.complete(2);P.reset();assert.equal(P.save(),false);assert.equal(storage.get(NEW),raw);
});
test('independent directories cannot read or reset each other',()=>{
 const storage=new Map();const a=load({storage,pathname:'/first/'}).P,b=load({storage,pathname:'/second/'}).P;
 a.complete(1);a.settings({zoom:200});b.complete(2);b.reset();const ar=load({storage,pathname:'/first/index.html'}).P,br=load({storage,pathname:'/second/index.html'}).P;
 assert.deepEqual(plain(ar.get().completed),[1]);assert.equal(ar.get().settings.zoom,200);assert.equal(br.get().completed.length,0);assert.equal(br.get().settings.zoom,100);
});
