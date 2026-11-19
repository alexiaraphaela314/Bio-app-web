# Mini-GDD — BioMundo v2

**BioMundo — Aventura das Células**  
**Revisão: 18/11/2026.** Jogo educativo individual em português, implementado com HTML5, CSS e JavaScript, destinado ao navegador em computador, tablet e celular. O pacote não é um APK.

## 1. Objetivo educacional

Introduzir estruturas celulares e suas funções, com atenção às diferenças entre os modelos animal e vegetal. A trilha foi reorganizada em **11 fases de três atividades**, totalizando **33 atividades**. Uma estrutura é abordada de cada vez. Conclusão indica participação na exploração e nas perguntas; não é certificação de aprendizagem.

## 2. Público e autonomia

Estudantes em introdução à citologia, com possibilidade de mediação por professor ou responsável. Preferências de leitura, som, visão e movimento variam entre pessoas, inclusive entre estudantes autistas. As configurações permitem adaptações sem presumir um perfil único ou finalidade terapêutica.

Não há limite de tempo, vidas, ranking ou penalização por erro. Ajuda, pausa, retomada e repetição permanecem disponíveis. As fases podem ser escolhidas pelo mapa.

## 3. Conceito e direção visual

Bibi, a Célula Exploradora, apresenta a aventura e acompanha as descobertas. O estilo cartoon e as cores vivas são mantidos. As formas são acompanhadas de texto, letras ou contornos; cor sozinha não determina uma resposta.

O fundo é **estático**, sem partículas móveis ou animações decorativas em loop. Bibi dispõe de seis expressões para instrução, escolha, acerto, incentivo, pausa e conclusão. Isso não implica animação contínua. O BioMundo é a identidade fictícia do projeto, sem patrocinador ou campanha comercial definida.

## 4. Estrutura das fases

Cada fase segue a mesma sequência previsível:

1. Introdução com nome da estrutura e identificação do tipo celular.
2. Observação contextual ou encaixe de uma única estrutura.
3. Pergunta curta sobre função.
4. Pergunta curta sobre contexto ou característica.
5. Conclusão com opção de repetir, avançar ou voltar ao mapa.

A exploração conta como uma atividade, e as duas perguntas completam três. Introdução e conclusão não acrescentam atividades. Membrana, citoplasma e parede são observados no contexto correto; não são tratados como organelas internas soltas.

| Fase | Foco | Modelo | Atividades |
| --- | --- | --- | ---: |
| 1 | Membrana plasmática | Animal nucleado | 3 |
| 2 | Citoplasma | Animal nucleado | 3 |
| 3 | Núcleo | Animal nucleado | 3 |
| 4 | Mitocôndria | Animal nucleado | 3 |
| 5 | Ribossomos | Animal nucleado | 3 |
| 6 | Retículo endoplasmático | Animal nucleado | 3 |
| 7 | Complexo de Golgi | Animal nucleado | 3 |
| 8 | Lisossomos | Animal nucleado | 3 |
| 9 | Parede celular | Vegetal fotossintetizante | 3 |
| 10 | Cloroplastos | Vegetal fotossintetizante | 3 |
| 11 | Vacúolo central | Vegetal fotossintetizante | 3 |
| **Total** | **11 estruturas** | **Dois modelos identificados** | **33** |

## 5. Interações e ajuda

Na montagem, há uma única peça e um alvo ativo. O jogador pode arrastar ou selecionar a peça e depois o destino. Botões também são operáveis por teclado. Pistas de forma, letra e texto ajudam a reconhecer o alvo. Na observação contextual, a ação destaca a estrutura no contorno ou na região adequada.

As perguntas usam alternativas de texto sobre funções ou contexto. Uma tentativa diferente gera incentivo e mantém a possibilidade de tentar novamente. A ajuda aponta uma pista; o jogador continua responsável pela ação de concluir. Na fase da membrana, o acerto explica brevemente a permeabilidade seletiva.

## 6. Glossário, áudio e zoom

O glossário apresenta **uma entrada por vez**, com nome, figura, função em linguagem acessível, explicação e contexto celular. O controle **Ouvir** lê o conteúdo por síntese de voz do dispositivo. Habilitar a narração não inicia uma leitura automaticamente; a pessoa pode interrompê-la.

O zoom da figura vai de **100% a 200%**. É independente da configuração de tamanho dos elementos e não substitui o zoom do navegador. A ilustração permanece didática e sem escala real.

Não foram incluídas gravações dos nomes das estruturas. `speechSynthesis` depende das vozes e do navegador do dispositivo, e a voz escolhida pode usar serviço de rede. Todas as instruções e atividades continuam disponíveis por texto, sem áudio.

## 7. Ajustes de acessibilidade

Modo tranquilo, modo padrão e configurações personalizadas contemplam som, narração, contraste, tamanho e apoio visual. O modo tranquilo reduz estímulos e sons automáticos. O padrão continua com fundo estático, sem partículas em movimento. Preferências de redução de movimento do dispositivo têm prioridade. O jogador pode pausar e retomar sem punição.

Detalhes e limites de validação estão em [acessibilidade.md](acessibilidade.md).

## 8. Progresso e migração

O progresso é salvo localmente, quando o armazenamento está disponível, incluindo rascunho da atividade e preferências. Há aviso quando o navegador não permite persistir os dados.

A v2 preserva um **snapshot do progresso v1**, com histórico e configurações, e mantém estruturas já conhecidas. Como o currículo mudou, as novas perguntas não são marcadas como concluídas apenas por correspondência de números de fase. O histórico antigo permanece separado do avanço na nova trilha.

A migração depende de os dados antigos ainda existirem no mesmo contexto de armazenamento. Mudar o endereço, o navegador ou apagar seus dados não transfere automaticamente o progresso.

## 9. Ciência e convenções

O modelo animal é nucleado, não uma representação de toda célula humana. Parede celular e cloroplastos não aparecem como componentes humanos. O modelo vegetal é fotossintetizante; nem toda célula vegetal tem cloroplastos. Cores e encaixes ajudam a exploração, mas não determinam posições ou proporções biológicas universais.

A síntese científica detalhada e suas fontes estão em [conteudo-educativo.md](conteudo-educativo.md) e [fontes.md](fontes.md).

## 10. Validação e entrega

O pacote inclui código e documentação atualizados. A tentativa de iniciar o navegador de validação nesta revisão foi bloqueada por `EPERM`; por isso, **não se afirma execução visual ou de interface no navegador para a v2**. Os testes lógicos executados, seus resultados e as verificações pendentes são registrados em [testes.md](testes.md).

Capturas da v1, quando preservadas, devem estar identificadas como históricas. Elas não representam evidência visual da v2. Permanecem pendentes testes em Android físico, leitores de tela, voz real, instalação e uso offline no dispositivo de destino. Não houve publicação na internet nesta revisão.
