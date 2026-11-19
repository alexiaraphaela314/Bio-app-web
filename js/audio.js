/* Audio is always voluntary. No narration or music on page load. */
'use strict';
(function(B){
 let sound=null,speaking=false,generation=0;
 const synth=('speechSynthesis' in window)?window.speechSynthesis:null;
 const changed=()=>document.dispatchEvent(new Event('biomundo:audio'));
 const announce=text=>{const el=document.getElementById('announcer');if(el)el.textContent=text;const status=document.getElementById('audio-status');if(status)status.textContent=text;};
 function stop(){generation++;if(synth)try{synth.cancel();}catch(_){}if(sound){sound.pause();sound.currentTime=0;}speaking=false;changed();}
 B.Audio={supported:()=>!!synth&&typeof window.SpeechSynthesisUtterance==='function',isSpeaking:()=>speaking,stop,
 success(){const s=B.Progress.get().settings;if(!s.sound||s.mode==='calm')return;if(!sound)sound=new Audio('assets/audio/success.wav');sound.currentTime=0;sound.volume=.25;sound.play().catch(()=>announce('Som indisponível. Você pode continuar sem áudio.'));},
 speak(text){
  if(speaking){stop();return;}
  if(!B.Audio.supported()){announce('Este navegador não oferece narração. A explicação completa está escrita na tela.');return;}
  if(!B.Progress.get().settings.narration)B.Progress.settings({narration:true});
  stop();const token=generation;
  try{
   const u=new SpeechSynthesisUtterance(text);u.lang='pt-BR';u.rate=.9;
   const voices=synth.getVoices();const voice=voices.find(v=>v.lang.toLowerCase()==='pt-br')||voices.find(v=>v.lang.toLowerCase().startsWith('pt'));if(voice)u.voice=voice;
   u.onend=()=>{if(token!==generation)return;speaking=false;changed();};
   u.onerror=()=>{if(token!==generation)return;speaking=false;announce('A voz não está disponível agora. Você pode ler a explicação completa na tela.');changed();};
   speaking=true;changed();synth.speak(u);
  }catch(_){speaking=false;announce('Não foi possível iniciar a voz. O jogo continua disponível sem áudio.');changed();}
 }
 };
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
})(Bio);
