/* BioMundo 2.0: textos originais de introdução à biologia celular, revisados em 18/11/2026.
 * As fontes ao fim deste arquivo foram usadas para conferência de fatos.
 * Cores, escala, quantidade e posições das estruturas são recursos didáticos.
 */
'use strict';
window.Bio = window.Bio || {};
Bio.content = Object.freeze({
 membrane: {
  name:'Membrana plasmática', short:'Membrana', category:'both', color:'#ed69b8',
  function:'Delimita a célula e regula as trocas de substâncias com o ambiente.',
  simple:'A membrana envolve a célula e ajuda a regular o que entra e o que sai.',
  detail:'A membrana apresenta permeabilidade seletiva: algumas substâncias atravessam com facilidade; outras precisam de proteínas de transporte. Ela não deixa tudo passar do mesmo modo.',
  context:'Está presente tanto em células animais, incluindo as humanas, quanto em células vegetais. Na célula vegetal, fica por dentro da parede celular.',
  hint:'Procure o contorno fino que envolve o interior da célula.'
 },
 cytoplasm: {
  name:'Citoplasma', short:'Citoplasma', category:'both', color:'#48b9dd',
  function:'Nos modelos nucleados do jogo, é a região entre a membrana e o núcleo, com citosol e estruturas celulares.',
  simple:'O citoplasma é a região interna ao redor do núcleo. Muitas reações da célula acontecem ali.',
  detail:'O citosol é a parte fluida do citoplasma. Essa região também abriga estruturas celulares; não é apenas um líquido nem um espaço vazio.',
  context:'Células animais e vegetais possuem citoplasma. Ele é uma região da célula, não uma organela.',
  hint:'Observe a área que preenche o interior ao redor das estruturas celulares.'
 },
 nucleus: {
  name:'Núcleo', short:'Núcleo', category:'both', color:'#a447e0',
  function:'Guarda a maior parte do DNA em células eucarióticas nucleadas.',
  simple:'Neste modelo, o núcleo guarda a maior parte do DNA, que contém informações usadas pela célula.',
  detail:'O núcleo é envolvido por uma membrana dupla. Suas informações genéticas participam da regulação das atividades celulares. “A maior parte” não significa todo o DNA: mitocôndrias e cloroplastos têm DNA próprio.',
  context:'Os modelos animal e vegetal deste jogo possuem núcleo. Nem toda célula tem núcleo; por isso, o desenho não representa todos os tipos celulares.',
  hint:'Procure a estrutura arredondada com uma pequena região no interior.'
 },
 mitochondrion: {
  name:'Mitocôndria', short:'Mitocôndria', category:'both', color:'#f5922c',
  function:'Participa da respiração celular e da produção de ATP.',
  simple:'As mitocôndrias participam da obtenção de energia utilizável pela célula, na forma de ATP.',
  detail:'ATP é uma molécula que participa da transferência de energia para atividades celulares. As mitocôndrias transformam energia de substâncias nutritivas; não criam energia do nada nem são o único local de produção de ATP.',
  context:'Mitocôndrias aparecem nos modelos animal e vegetal. Células vegetais também realizam respiração celular.',
  hint:'Observe o formato oval com dobras na membrana interna.'
 },
 ribosome: {
  name:'Ribossomos', short:'Ribossomos', category:'both', color:'#edb936',
  function:'Sintetizam proteínas: unem aminoácidos conforme as informações de um RNA mensageiro.',
  simple:'Os ribossomos ajudam a produzir proteínas.',
  detail:'Produzir proteínas também se chama síntese de proteínas. Ribossomos são formados por RNA e proteínas, possuem duas subunidades e não são envolvidos por membrana.',
  context:'Estão presentes em células animais e vegetais, e também em bactérias. Podem estar livres no citosol ou associados ao retículo endoplasmático rugoso.',
  hint:'O desenho ampliado mostra duas partes encaixadas. Na célula real, são muito pequenos.'
 },
 reticulum: {
  name:'Retículo endoplasmático', short:'Retículo', category:'both', color:'#249bd9',
  function:'Sua região rugosa participa do processamento de proteínas; a lisa participa da síntese de lipídios.',
  simple:'O retículo é uma rede de membranas. Suas regiões ajudam a processar proteínas e a produzir lipídios.',
  detail:'A região rugosa tem ribossomos associados, que sintetizam proteínas. O retículo participa do processamento e transporte dessas proteínas. Sua região lisa não tem ribossomos associados e participa da produção de lipídios.',
  context:'Está presente nos modelos animal e vegetal. “Rugoso” e “liso” são regiões do mesmo sistema de membranas.',
  hint:'Procure a rede de tubos e sacos conectados.'
 },
 golgi: {
  name:'Complexo de Golgi', short:'Golgi', category:'both', color:'#ed5b9b',
  function:'Modifica, organiza e encaminha proteínas e lipídios.',
  simple:'O complexo de Golgi ajuda a preparar e encaminhar substâncias para seus destinos.',
  detail:'Ele é formado por sacos de membrana achatados. Vesículas levam materiais para o Golgi e transportam materiais que saem dele. A comparação com uma central de distribuição é uma analogia, não uma descrição literal.',
  context:'Está presente em células animais e vegetais, incluindo os dois modelos do jogo.',
  hint:'Seu desenho lembra uma pilha de sacos achatados e curvos.'
 },
 lysosome: {
  name:'Lisossomos', short:'Lisossomos', category:'animal', color:'#35b9be',
  function:'Contêm enzimas que digerem materiais e ajudam na reciclagem celular.',
  simple:'Os lisossomos ajudam a digerir e reciclar materiais dentro da célula.',
  detail:'Enzimas são moléculas que facilitam reações. Nos lisossomos, enzimas digestivas ajudam a decompor materiais que podem ser reaproveitados pela célula.',
  context:'São destacados no modelo animal deste jogo. Em plantas, vacúolos líticos realizam funções digestivas semelhantes.',
  hint:'Procure a pequena bolsa arredondada. Os sinais no desenho representam seu conteúdo.'
 },
 wall: {
  name:'Parede celular', short:'Parede celular', category:'plant', color:'#6aac49',
  function:'Camada externa à membrana que ajuda na sustentação e proteção da célula.',
  simple:'A parede celular ajuda a sustentar e proteger a célula vegetal.',
  detail:'Nas plantas, a parede contém celulose. Ela fica por fora da membrana plasmática e não a substitui. A parede é uma estrutura externa, não uma organela interna.',
  context:'Células humanas e de outros animais não possuem parede celular. Ela também existe em fungos e em muitos procariontes, com composição diferente da parede vegetal.',
  hint:'Procure a camada mais espessa, por fora do contorno fino da membrana.'
 },
 chloroplast: {
  name:'Cloroplastos', short:'Cloroplastos', category:'plant', color:'#50ae61',
  function:'Realizam a fotossíntese em células vegetais fotossintetizantes.',
  simple:'Os cloroplastos usam a energia da luz na produção de açúcares pela fotossíntese.',
  detail:'A fotossíntese usa luz, água e dióxido de carbono para produzir compostos orgânicos e libera oxigênio. Os cloroplastos têm estruturas internas chamadas tilacoides e possuem DNA próprio.',
  context:'Células humanas não possuem cloroplastos. Nem toda célula vegetal tem cloroplastos: muitas células de raízes, por exemplo, não têm. Algumas algas também possuem essa organela.',
  hint:'Observe o formato oval com pequenas pilhas de discos no interior.'
 },
 vacuole: {
  name:'Vacúolo central', short:'Vacúolo central', category:'plant', color:'#36bfe5',
  function:'Armazena substâncias e contribui para o equilíbrio de água e a sustentação da célula vegetal.',
  simple:'O vacúolo central guarda água e outras substâncias e ajuda a manter a célula vegetal firme.',
  detail:'Em muitas células vegetais maduras, ocupa grande parte do volume. A pressão do conteúdo celular contra a parede ajuda na sustentação. A membrana do vacúolo é chamada tonoplasto.',
  context:'O grande vacúolo central é característico de muitas células vegetais maduras. Células humanas não têm esse grande vacúolo central vegetal.',
  hint:'Procure a bolsa grande que ocupa boa parte do interior do modelo vegetal.'
 }
});
Bio.cellContexts = Object.freeze({
 animal:{label:'Célula animal nucleada',detail:'Modelo didático de uma célula animal com núcleo. Células humanas são animais e não têm parede celular nem cloroplastos. Este desenho não representa todos os tipos de célula humana.'},
 plant:{label:'Célula vegetal fotossintetizante',detail:'Modelo didático de uma célula vegetal que realiza fotossíntese. Células vegetais também têm membrana, núcleo e mitocôndrias. Nem todas as células vegetais possuem cloroplastos.'}
});
Bio.labels = Object.freeze({animal:'Animal', plant:'Vegetal', both:'As duas', yes:'Sim', no:'Não', some:'Somente algumas'});
Bio.scienceNote='Modelo didático, sem escala real. Cores, quantidade e encaixes são recursos de aprendizagem. As posições das organelas variam; o desenho mostra apenas a estrutura em foco.';
Bio.sources=Object.freeze([
 {title:'OpenStax — Biology 2e, 4.3: Eukaryotic Cells',url:'https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells'},
 {title:'OpenStax — Biology 2e, 4.4: The Endomembrane System and Proteins',url:'https://openstax.org/books/biology-2e/pages/4-4-the-endomembrane-system-and-proteins'},
 {title:'OpenStax — Biology 2e, 5.2: Passive Transport',url:'https://openstax.org/books/biology-2e/pages/5-2-passive-transport'},
 {title:'NHGRI — Deoxyribonucleic Acid (DNA) Fact Sheet',url:'https://www.genome.gov/about-genomics/fact-sheets/Deoxyribonucleic-Acid-Fact-Sheet'},
 {title:'NCBI Bookshelf — Chloroplasts and Other Plastids',url:'https://www.ncbi.nlm.nih.gov/books/NBK9905/'}
]);
Bio.escape = function (s) {return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));};
Bio.image = function(id, cls='', alt='') {return `<img class="${cls}" src="assets/organelles/${id}.svg" alt="${Bio.escape(alt)}" draggable="false">`;};
