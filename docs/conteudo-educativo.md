# Conteúdo educativo — BioMundo v2

**Revisão: 18/11/2026.** Objetivo: introduzir a biologia celular por meio da exploração de estruturas e de suas funções, com uma estrutura em foco por fase.

A versão 2 possui **11 fases e 33 atividades**. Cada fase apresenta uma observação ou encaixe e duas perguntas, uma por tela. O conteúdo do jogo está em `js/content.js` e `js/levels.js`. As orientações recebidas em 18/11/2026 atualizam o escopo de oito fases descrito no briefing original.

## Modelos e linguagem

O tipo celular deve permanecer explícito na exploração e nas perguntas:

- **Célula animal nucleada:** modelo didático de uma célula animal com núcleo. Células humanas são animais; não possuem parede celular nem cloroplastos. O modelo não representa todos os tipos de célula humana.
- **Célula vegetal fotossintetizante:** modelo de uma célula vegetal que realiza fotossíntese. Nem toda célula vegetal possui cloroplastos. Células vegetais também possuem membrana e realizam respiração celular.

O termo geral é **estrutura celular**. Membrana e parede são envoltórios, e citoplasma é uma região: não devem ser apresentados como organelas internas. Ribossomos são estruturas sem membrana. O desenho cartoon mantém nomes e funções reais; Bibi é uma personagem de orientação, não um modelo anatômico.

## Trilha educativa

| Fase | Estrutura | Modelo | Aprendizagem principal |
| --- | --- | --- | --- |
| 1 | Membrana plasmática | Animal nucleado | Delimitação da célula e permeabilidade seletiva |
| 2 | Citoplasma | Animal nucleado | Região com citosol, estruturas e reações celulares |
| 3 | Núcleo | Animal nucleado | Maior parte do DNA em células eucarióticas nucleadas |
| 4 | Mitocôndria | Animal nucleado | Respiração celular e produção de ATP |
| 5 | Ribossomos | Animal nucleado | Síntese de proteínas |
| 6 | Retículo endoplasmático | Animal nucleado | Processamento de proteínas e produção de lipídios |
| 7 | Complexo de Golgi | Animal nucleado | Modificação e encaminhamento de substâncias |
| 8 | Lisossomos | Animal nucleado | Digestão e reciclagem celular |
| 9 | Parede celular | Vegetal fotossintetizante | Sustentação e proteção externa |
| 10 | Cloroplastos | Vegetal fotossintetizante | Fotossíntese e seus contextos celulares |
| 11 | Vacúolo central | Vegetal fotossintetizante | Armazenamento, água e sustentação |

## Mensagens científicas essenciais

### Membrana plasmática

Delimita a célula e regula as trocas com o ambiente. O acerto deve ser seguido de uma explicação curta: **a membrana tem permeabilidade seletiva; algumas substâncias atravessam com facilidade e outras precisam de proteínas de transporte**. Isso não significa uma escolha consciente da célula. A célula vegetal também possui membrana, internamente à parede.

### Citoplasma

Nos modelos nucleados, é a região entre a membrana e o núcleo, com citosol e estruturas celulares. Muitas reações acontecem ali. Não é um espaço vazio nem somente um líquido. O contorno e a região interna são observados no modelo, sem sugerir que sejam peças soltas dentro da célula.

### Núcleo

**Guarda a maior parte do DNA em células eucarióticas nucleadas.** A expressão evita as generalizações “todo o DNA” e “toda célula tem núcleo”. Mitocôndrias e cloroplastos possuem DNA próprio. A forma arredondada do desenho é uma simplificação.

### Mitocôndria

Participa da respiração celular e da produção de ATP. Texto acessível adotado: **“As mitocôndrias participam da obtenção de energia utilizável pela célula, na forma de ATP.”** O aprofundamento explica que ATP participa da transferência de energia, que energia não é criada do nada e que nem todo ATP é produzido nas mitocôndrias. Células vegetais também possuem mitocôndrias.

### Ribossomos

Texto acessível adotado: **“Os ribossomos ajudam a produzir proteínas.”** O aprofundamento explica que sintetizar proteínas envolve unir aminoácidos seguindo informações de um RNA mensageiro. Ribossomos não possuem membrana e existem em células animais, vegetais e bacterianas.

### Retículo endoplasmático

É uma rede de membranas. A região rugosa tem ribossomos associados e participa do processamento e transporte das proteínas sintetizadas por eles. A região lisa participa da produção de lipídios. Essa distinção evita atribuir toda síntese de proteínas ao retículo isoladamente.

### Complexo de Golgi

Modifica, organiza e encaminha proteínas e lipídios. A comparação com uma central de distribuição é identificada como analogia. Sua função não é a produção de ATP nem a realização de fotossíntese.

### Lisossomos

Contêm enzimas digestivas e ajudam a decompor e reciclar materiais celulares. São destacados no modelo animal. Em plantas, vacúolos líticos desempenham funções digestivas semelhantes; a comparação do jogo não deve virar uma afirmação universal sobre todos os organismos.

### Parede celular

Fica externamente à membrana, participa da sustentação e da proteção e, nas plantas, contém celulose. Não substitui a membrana. Células humanas e de outros animais não possuem parede celular. Fungos e muitos procariontes também possuem paredes, com composições diferentes.

### Cloroplastos

Realizam fotossíntese em células vegetais fotossintetizantes, usando energia luminosa na produção de compostos orgânicos. Não estão presentes em células humanas nem em todas as células vegetais. Muitas células de raízes não possuem cloroplastos; algumas algas possuem essa organela.

### Vacúolo central

Armazena água e outras substâncias e contribui para o equilíbrio de água e a sustentação. O **grande vacúolo central** é característico de muitas células vegetais maduras; não é apresentado como componente de células humanas. Sua membrana é o tonoplasto.

## Apresentação e mediação

A função aparece primeiro em texto curto. O glossário apresenta **uma entrada por vez**, com explicação, contexto, áudio voluntário e zoom da figura de 100% a 200%. Perguntas têm alternativas funcionais em texto, sem uma coleção de organelas concorrentes. As pistas combinam forma, letra e texto; a cor não é a única informação.

Cores, escala, quantidade e encaixes são convenções didáticas. Posições variam entre células. O fundo permanece estático, sem partículas móveis ou animação em loop. Concluir uma fase registra participação nas atividades, não comprova domínio conceitual.

As fontes de conferência estão em [fontes.md](fontes.md). Não se afirma revisão por professor humano nem avaliação com estudantes. A execução técnica e suas limitações estão em [testes.md](testes.md).
