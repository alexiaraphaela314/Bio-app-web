/* Cada fase apresenta uma estrutura, uma exploração e duas perguntas curtas. */
'use strict';
(function(B){
 const q=(id,prompt,options,answer,explanation)=>({id,prompt,options,answer,explanation});
 const a=(id,label)=>({id,label});
 const phase=(id,structure,cell,label,intro,summary,questions)=>({
  id,structure,kind:'focus',cell,title:B.content[structure].name,label,intro,
  objective:'Explore a estrutura destacada. Depois, responda uma pergunta por vez.',
  summary,pieces:[structure],questions
 });
 B.levels=[
  phase(1,'membrane','animal','O contorno e as trocas',
   'Vamos observar somente a membrana plasmática no modelo de uma célula animal nucleada. Ela envolve a célula e regula as trocas com o ambiente.',
   'Você reconheceu a membrana e descobriu sua permeabilidade seletiva.',[
    q('function','O que a membrana plasmática ajuda a regular?',[
     a('a','A entrada e a saída de substâncias.'),a('b','A produção de todas as proteínas.')
    ],'a','Isso! A membrana tem permeabilidade seletiva: algumas substâncias atravessam com facilidade; outras precisam de proteínas de transporte.'),
    q('context','A membrana deixa todas as substâncias passar do mesmo modo?',[
     a('a','Sim. Tudo atravessa do mesmo modo.'),a('b','Não. A passagem é seletiva.')
    ],'b','A passagem é seletiva. Isso ajuda a regular as trocas entre a célula e o ambiente. Células vegetais também possuem membrana.')
   ]),
  phase(2,'cytoplasm','animal','Uma região cheia de atividades',
   'Observe o citoplasma, a região interna ao redor do núcleo neste modelo animal. Vamos explorar essa região por vez.',
   'Você reconheceu o citoplasma como uma região onde estão estruturas e ocorrem muitas reações.',[
    q('function','Como é o citoplasma deste modelo?',[
     a('a','Uma região completamente vazia.'),a('b','Uma região com citosol e estruturas celulares.')
    ],'b','O citoplasma inclui o citosol e estruturas celulares. Muitas reações acontecem nessa região.'),
    q('context','O citoplasma está presente somente nas células animais?',[
     a('a','Não. Células vegetais também têm citoplasma.'),a('b','Sim. Só existe em células animais.')
    ],'a','Células animais e vegetais possuem citoplasma. Ele é uma região da célula, não uma organela.')
   ]),
  phase(3,'nucleus','animal','Informações da célula',
   'Este modelo representa uma célula animal com núcleo. Vamos explorar como essa estrutura abriga informações genéticas.',
   'Você descobriu que o núcleo guarda a maior parte do DNA em células eucarióticas nucleadas.',[
    q('function','Em células eucarióticas nucleadas, o núcleo guarda…',[
     a('a','A maior parte do DNA.'),a('b','Todo o DNA, sem exceção.')
    ],'a','O núcleo guarda a maior parte do DNA. “A maior parte” não significa todo o DNA da célula.'),
    q('context','O modelo vegetal do jogo também tem núcleo?',[
     a('a','Não. Núcleo só existe em células animais.'),a('b','Sim. Os dois modelos têm núcleo.')
    ],'b','Os dois modelos têm núcleo. Nem toda célula tem um núcleo, por isso o jogo identifica os modelos como nucleados.')
   ]),
  phase(4,'mitochondrion','animal','Energia e ATP',
   'Vamos observar uma mitocôndria. Ela participa da respiração celular e da produção de ATP.',
   'Você relacionou a mitocôndria à respiração celular e à produção de ATP.',[
    q('function','De qual processo a mitocôndria participa?',[
     a('a','Da produção de ATP na respiração celular.'),a('b','Da formação de uma parede externa de celulose.')
    ],'a','As mitocôndrias participam da obtenção de energia utilizável pela célula, na forma de ATP. ATP ajuda na transferência de energia para as atividades celulares.'),
    q('context','As mitocôndrias também aparecem no modelo vegetal?',[
     a('a','Não. Só aparecem no modelo animal.'),a('b','Sim. O modelo vegetal também possui mitocôndrias.')
    ],'b','Células vegetais também realizam respiração celular e possuem mitocôndrias. Essa organela não é exclusiva das células animais.')
   ]),
  phase(5,'ribosome','animal','Produção de proteínas',
   'Observe os ribossomos em um desenho ampliado. Os ribossomos ajudam a produzir proteínas.',
   'Você relacionou os ribossomos à síntese de proteínas.',[
    q('function','O que os ribossomos produzem?',[
     a('a','Uma camada externa de celulose.'),a('b','Proteínas.')
    ],'b','Os ribossomos ajudam a produzir proteínas. Eles unem aminoácidos, seguindo informações de um RNA mensageiro. Esse processo se chama síntese de proteínas.'),
    q('context','Ribossomos também existem em células vegetais?',[
     a('a','Sim. Existem em células animais e vegetais.'),a('b','Não. Existem apenas nas células animais.')
    ],'a','Ribossomos estão presentes em células animais e vegetais. Eles também existem em bactérias e não são envolvidos por membrana.')
   ]),
  phase(6,'reticulum','animal','Uma rede de membranas',
   'Vamos explorar o retículo endoplasmático. Ele tem regiões chamadas rugosa e lisa, com atividades diferentes.',
   'Você conheceu a rede do retículo e as funções de suas regiões rugosa e lisa.',[
    q('function','Uma função do retículo endoplasmático é…',[
     a('a','Participar do processamento de proteínas e da produção de lipídios.'),a('b','Produzir açúcares usando a luz do Sol.')
    ],'a','A região rugosa participa do processamento de proteínas feitas pelos ribossomos associados. A região lisa participa da produção de lipídios.'),
    q('context','Onde o retículo endoplasmático aparece nos modelos do jogo?',[
     a('a','Somente no modelo animal.'),a('b','Nos modelos animal e vegetal.')
    ],'b','O retículo está presente nos dois modelos. Suas regiões rugosa e lisa fazem parte de uma rede de membranas.')
   ]),
  phase(7,'golgi','animal','Preparar e encaminhar',
   'Observe o complexo de Golgi. Essa estrutura participa do processamento e do encaminhamento de substâncias.',
   'Você descobriu como o complexo de Golgi modifica e encaminha proteínas e lipídios.',[
    q('function','Qual tarefa é realizada pelo complexo de Golgi?',[
     a('a','Modificar e encaminhar proteínas e lipídios.'),a('b','Transformar luz solar em açúcares.')
    ],'a','O complexo de Golgi modifica, organiza e encaminha proteínas e lipídios. Vesículas ajudam no transporte desses materiais.'),
    q('context','O complexo de Golgi é exclusivo das células animais?',[
     a('a','Sim. Células vegetais não possuem Golgi.'),a('b','Não. Células vegetais também possuem Golgi.')
    ],'b','O complexo de Golgi está presente nos modelos animal e vegetal. A aparência de “pilha” é uma simplificação do desenho.')
   ]),
  phase(8,'lysosome','animal','Digestão e reciclagem',
   'Neste modelo animal, vamos explorar os lisossomos. Eles contêm enzimas que ajudam a decompor materiais.',
   'Você relacionou lisossomos à digestão e à reciclagem de materiais celulares.',[
    q('function','O que as enzimas dos lisossomos ajudam a fazer?',[
     a('a','Captar luz para produzir açúcares.'),a('b','Digerir e reciclar materiais celulares.')
    ],'b','Os lisossomos contêm enzimas digestivas. Elas decompõem materiais, e a célula pode reaproveitar parte desses componentes.'),
    q('context','Em qual modelo o jogo destaca os lisossomos?',[
     a('a','No modelo de célula animal nucleada.'),a('b','Apenas no modelo vegetal fotossintetizante.')
    ],'a','Aqui, os lisossomos são destacados no modelo animal. Em plantas, vacúolos líticos realizam funções digestivas semelhantes.')
   ]),
  phase(9,'wall','plant','Sustentação e proteção',
   'Agora o tipo celular mudou: este é um modelo vegetal. Vamos observar somente sua parede celular, a camada externa de sustentação.',
   'Você identificou a parede celular no modelo vegetal e viu que ela não faz parte de células humanas.',[
    q('function','Qual é uma função da parede celular vegetal?',[
     a('a','Ajudar na sustentação e na proteção.'),a('b','Guardar todo o DNA da célula.')
    ],'a','A parede celular ajuda na sustentação e na proteção. Fica por fora da membrana e não a substitui.'),
    q('context','Células humanas possuem parede celular?',[
     a('a','Sim. Todas as células humanas têm parede.'),a('b','Não. Células humanas não têm parede celular.')
    ],'b','Células humanas e de outros animais não possuem parede celular. Ela aparece no modelo vegetal; outros grupos de seres vivos também podem ter paredes de composição diferente.')
   ]),
  phase(10,'chloroplast','plant','Luz e fotossíntese',
   'Continuamos no modelo vegetal fotossintetizante. Vamos observar um cloroplasto, organela ligada à fotossíntese.',
   'Você relacionou cloroplastos à fotossíntese e reconheceu que eles não estão em células humanas nem em toda célula vegetal.',[
    q('function','De qual processo os cloroplastos participam?',[
     a('a','Da digestão de materiais celulares.'),a('b','Da fotossíntese, usando energia da luz.')
    ],'b','Os cloroplastos realizam fotossíntese. A energia da luz participa da produção de açúcares a partir de água e dióxido de carbono.'),
    q('context','Qual afirmação sobre os cloroplastos está correta?',[
     a('a','Não existem em células humanas e aparecem em algumas células vegetais.'),a('b','Estão em todas as células humanas e vegetais.')
    ],'a','Células humanas não possuem cloroplastos. Nem toda célula vegetal tem essa organela: muitas células de raízes não têm. Nosso modelo vegetal é fotossintetizante.')
   ]),
  phase(11,'vacuole','plant','Água e armazenamento',
   'Nesta última fase, observe o grande vacúolo central de uma célula vegetal madura. Ele ocupa boa parte do interior do modelo.',
   'Você reconheceu o vacúolo central e suas relações com armazenamento, água e sustentação.',[
    q('function','O grande vacúolo central ajuda a…',[
     a('a','Armazenar substâncias e manter o equilíbrio de água.'),a('b','Sintetizar todas as proteínas da célula.')
    ],'a','O vacúolo central armazena água e outras substâncias. Ele também contribui para a sustentação da célula vegetal.'),
    q('context','O grande vacúolo central vegetal também faz parte de toda célula humana?',[
     a('a','Sim. Toda célula humana possui esse vacúolo.'),a('b','Não. Ele é característico de muitas células vegetais maduras.')
    ],'b','Esse grande vacúolo central é característico de muitas células vegetais maduras. Não é um componente de células humanas.')
   ])
 ];
 B.level=(id)=>B.levels.find(l=>l.id===Number(id));
 B.totalActivities=B.levels.reduce((total,l)=>total+1+l.questions.length,0);
 B.activityKeys=Object.freeze(B.levels.flatMap(l=>[`${l.id}:explore`,...l.questions.map(question=>`${l.id}:${question.id}`)]));
 B.positions={
  animal:{membrane:[50,50,30,25],cytoplasm:[50,50,30,25],nucleus:[50,48,29,29],mitochondrion:[26,31,24,23],golgi:[50,77,24,22],reticulum:[71,35,23,22],ribosome:[71,68,20,20],lysosome:[25,67,20,20]},
  plant:{membrane:[50,50,30,25],cytoplasm:[50,50,30,25],wall:[50,50,30,25],nucleus:[25,28,24,25],mitochondrion:[69,77,23,22],chloroplast:[71,30,23,23],vacuole:[50,55,34,35],ribosome:[25,72,20,20],golgi:[49,23,21,21]}
 };
})(Bio);
