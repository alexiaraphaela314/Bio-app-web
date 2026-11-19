# PROMPT MESTRE — BIOMUNDO: AVENTURA DAS CÉLULAS
## Desenvolvimento completo de jogo educativo HTML5 para Android

**MISSÃO: PROJETAR, DESENVOLVER, TESTAR, DOCUMENTAR E ENTREGAR UM JOGO EDUCATIVO COMPLETO SOBRE CÉLULAS E ORGANELAS, INCLUINDO ZIP FINAL.**

---

# 1. PAPEL DA INTELIGÊNCIA ARTIFICIAL

Atue como uma equipe multidisciplinar composta por:

- Desenvolvedor sênior de jogos HTML5, CSS3 e JavaScript.
- Game designer especializado em jogos educativos.
- Professor de Biologia com conhecimento em citologia.
- Especialista em acessibilidade digital e neurodiversidade.
- Designer de interfaces para crianças e adolescentes.
- Ilustrador de personagens e elementos científicos.
- Especialista em experiência do usuário (UX).
- Engenheiro de testes.
- Especialista em aplicações Android e Progressive Web Apps (PWA).
- Especialista em publicação pelo GitHub Pages.

Sua responsabilidade é **executar o projeto completo**, produzindo código real, imagens, recursos educativos, documentação e um arquivo ZIP funcional.

Não entregue apenas explicações, exemplos isolados ou planos.

Utilize as ferramentas disponíveis para criar arquivos, executar verificações e validar o jogo.

Não afirme que realizou testes, gerou imagens ou publicou arquivos sem realmente executar essas ações.

---

# 2. VISÃO GERAL

## Nome do jogo

**BioMundo — Aventura das Células**

## Plataforma

- Android, pelo navegador.
- Computadores Windows, Linux e macOS.
- Tablets.
- Possibilidade de instalação como PWA.

## Tecnologias

- HTML5.
- CSS3.
- JavaScript puro.
- Canvas 2D, SVG e imagens locais.
- Web App Manifest.
- Service Worker para funcionamento offline.

Não utilizar banco de dados, login, servidor próprio ou APIs externas obrigatórias.

## Objetivo principal

Ensinar conceitos básicos de citologia de maneira visual, interativa, progressiva e acessível.

O jogador deverá aprender a:

1. Reconhecer uma célula.
2. Diferenciar célula animal e vegetal.
3. Identificar organelas.
4. Associar organelas às suas funções.
5. Posicionar organelas dentro de uma célula.
6. Reconhecer estruturas exclusivas ou características de determinados tipos celulares.
7. Montar células completas.
8. Revisar os conteúdos aprendidos.

---

# 3. PÚBLICO-ALVO E ACESSIBILIDADE

O jogo será desenvolvido com atenção especial a estudantes autistas, sem presumir que todas as pessoas autistas possuem as mesmas necessidades.

Público inicial sugerido: crianças e adolescentes em fase de aprendizagem de Biologia, com opções para adaptar a complexidade.

Não utilizar linguagem infantilizada obrigatoriamente.

## Requisitos

- Interface previsível.
- Poucos elementos simultâneos.
- Botões grandes.
- Instruções curtas.
- Ícones acompanhados de texto.
- Ausência de cronômetro obrigatório.
- Ausência de punições por erro.
- Ausência de vidas limitadas.
- Ausência de ranking competitivo.
- Feedback positivo sem exageros.
- Cores agradáveis e contrastes adequados.
- Animações suaves e opcionais.
- Sons desativáveis.
- Narração opcional.
- Possibilidade de repetir instruções.
- Possibilidade de jogar sem áudio.
- Possibilidade de pausar.
- Progresso salvo automaticamente.

Criar um menu de acessibilidade com:

**Modo tranquilo:** animações reduzidas, sem sons automáticos e interface simplificada.

**Modo padrão:** animações suaves e feedback visual.

**Modo personalizado:** permitir configurar som, narração, movimento, contraste e tamanho dos elementos.

Respeitar a preferência `prefers-reduced-motion` quando disponível.

Não usar somente cores para indicar acertos ou diferenças.

---

# 4. CONCEITO CRIATIVO

O jogador será convidado a explorar um universo microscópico chamado BioMundo.

Um personagem-guia amigável apresentará os conceitos e acompanhará a progressão.

## Mascote

Criar um personagem original chamado **Bibi, a Célula Exploradora**.

Características:

- Formato arredondado.
- Expressões simples e amigáveis.
- Olhos expressivos.
- Identidade visual própria.
- Design consistente.
- Aparência acolhedora sem excesso de detalhes.

Criar pelo menos seis estados visuais:

1. Neutro.
2. Feliz.
3. Explicando.
4. Pensando.
5. Incentivando nova tentativa.
6. Comemorando conclusão.

Os estados deverão ser utilizados efetivamente nas telas.

Não copiar personagens conhecidos.

---

# 5. MECÂNICA PRINCIPAL

A principal atividade será **montar uma célula arrastando organelas para suas posições correspondentes**.

## Exemplo

A tela apresenta uma célula animal simplificada com três espaços destacados.

Abaixo aparecem:

- Núcleo.
- Mitocôndria.
- Complexo de Golgi.

O jogador seleciona uma organela e a posiciona no local indicado.

Quando acerta:

“Isso! O núcleo guarda o material genético da célula.”

Quando tenta uma posição diferente:

“Vamos tentar novamente. Procure o espaço indicado para essa organela.”

Não reproduzir sons negativos ou animações agressivas.

## Acessibilidade motora

Além de arrastar, implementar uma alternativa:

1. Tocar na organela.
2. Tocar no espaço correspondente.

As duas formas devem funcionar.

Não depender exclusivamente de drag-and-drop.

---

# 6. ORGANIZAÇÃO DAS FASES

Criar oito fases educativas.

| Fase | Nome | Objetivo |
|---|---|---|
| 1 | Conhecendo a Célula | Identificar partes básicas |
| 2 | Explorando as Organelas | Reconhecer três organelas |
| 3 | Monte a Célula Animal | Posicionar estruturas |
| 4 | Quem Faz o Quê? | Relacionar funções |
| 5 | Conhecendo a Célula Vegetal | Identificar estruturas vegetais |
| 6 | Monte a Célula Vegetal | Montar célula simplificada |
| 7 | Animal ou Vegetal? | Comparar estruturas |
| 8 | Mestre das Células | Revisar conteúdos |

Cada fase deverá possuir:

- Tela de introdução.
- Instrução curta.
- Atividade interativa.
- Feedback de acerto.
- Ajuda opcional.
- Conclusão.
- Botão para próxima fase.
- Botão para voltar ao mapa.

O jogo deve permitir repetir qualquer fase concluída.

Não bloquear permanentemente o avanço por dificuldades de desempenho.

---

# 7. CONTEÚDO CIENTÍFICO

Utilizar conceitos adequados ao nível introdutório.

Estruturas obrigatórias:

- Membrana plasmática.
- Citoplasma.
- Núcleo.
- Mitocôndria.
- Ribossomos.
- Retículo endoplasmático.
- Complexo de Golgi.
- Lisossomos.
- Parede celular.
- Cloroplastos.
- Vacúolo central.

As explicações deverão ser cientificamente corretas, mas acessíveis.

Exemplos:

**Núcleo:** abriga a maior parte do DNA e participa do controle das atividades celulares.

**Mitocôndria:** participa da respiração celular e da produção de ATP.

**Ribossomos:** produzem proteínas.

**Cloroplastos:** realizam a fotossíntese em células vegetais fotossintetizantes.

**Membrana plasmática:** delimita a célula e controla a passagem de substâncias.

Evitar simplificações que criem conceitos incorretos.

As ilustrações devem ser identificadas como representações didáticas, não imagens em escala real.

Não sugerir que todas as células apresentam todas as organelas ilustradas.

---

# 8. DESIGN DAS CÉLULAS

Criar ilustrações próprias para:

## Célula animal

Representação simplificada com membrana plasmática, citoplasma, núcleo e organelas selecionadas.

## Célula vegetal

Representação com parede celular, membrana plasmática, citoplasma, núcleo, vacúolo central e cloroplastos, entre outras estruturas relevantes.

## Requisitos gráficos

- Formas claramente distinguíveis.
- Contornos legíveis.
- Cores consistentes.
- Identificação textual.
- Áreas interativas suficientemente grandes.
- Elementos proporcionais à interface.
- Organização que evite sobreposição de rótulos.

Não depender somente da cor para identificar organelas.

Criar imagens em SVG ou PNG com fundo transparente quando apropriado.

---

# 9. TELAS DO JOGO

Implementar:

## Tela inicial

- Logotipo BioMundo.
- Mascote Bibi.
- Botão Jogar.
- Botão Aprender.
- Botão Configurações.
- Botão Como Jogar.

## Seleção de fases

Mapa simples com oito etapas.

Mostrar fases concluídas e fase atual.

## Tela de aprendizado

Apresentar organelas com imagem, nome, função e botão para ouvir explicação, se disponível.

## Tela de gameplay

- Célula central.
- Organelas selecionáveis.
- Instrução.
- Botão de ajuda.
- Botão de pausa.
- Botão de voltar.

## Tela de conclusão

- Mensagem positiva.
- Resumo do conteúdo aprendido.
- Botão Próxima Fase.
- Botão Repetir.
- Botão Voltar ao Mapa.

## Configurações

- Áudio.
- Narração.
- Animações.
- Contraste.
- Tamanho dos elementos.
- Redução de estímulos.

---

# 10. SISTEMA DE PROGRESSO

Não utilizar sistema punitivo de pontuação.

Priorizar indicadores de aprendizagem.

Registrar localmente:

- Fases concluídas.
- Atividades realizadas.
- Organelas conhecidas.
- Preferências de acessibilidade.
- Última fase acessada.

Utilizar `localStorage` ou armazenamento local apropriado.

Não coletar dados pessoais.

Não exigir internet para salvar progresso.

Adicionar opção de reiniciar o progresso, com confirmação antes de apagar os dados.

---

# 11. NARRAÇÃO E ÁUDIO

O jogo deve funcionar integralmente sem áudio.

Se houver suporte a narração, implementar botão de reprodução voluntária.

A narração deverá:

- Ser curta.
- Usar linguagem clara.
- Permitir repetição.
- Não iniciar inesperadamente.
- Poder ser interrompida.
- Respeitar a configuração do usuário.

Preferir arquivos locais de áudio quando disponíveis.

A API SpeechSynthesis poderá ser utilizada como recurso complementar, mas não poderá ser a única forma de compreender as instruções, pois sua disponibilidade e suas vozes variam entre dispositivos.

Não declarar suporte offline completo de narração se ele não tiver sido verificado.

---

# 12. ARQUITETURA TÉCNICA

Criar estrutura modular:

```text
biomundo/
├── index.html
├── README.md
├── manifest.webmanifest
├── service-worker.js
├── css/
│   ├── style.css
│   ├── responsive.css
│   └── accessibility.css
├── js/
│   ├── main.js
│   ├── game.js
│   ├── levels.js
│   ├── interactions.js
│   ├── progress.js
│   ├── accessibility.js
│   ├── audio.js
│   └── content.js
├── assets/
│   ├── mascot/
│   ├── cells/
│   ├── organelles/
│   ├── backgrounds/
│   ├── icons/
│   └── audio/
├── docs/
│   ├── mini-gdd.md
│   ├── conteudo-educativo.md
│   ├── acessibilidade.md
│   ├── testes.md
│   ├── relatorio-final.md
│   └── declaracao-ia.md
├── prompts/
│   └── prompt-mestre.md
├── prints/
└── link_do_jogo.txt
```

Criar os arquivos reais, não apenas a árvore ilustrativa.

---

# 13. COMPATIBILIDADE ANDROID

O jogo deverá funcionar no navegador Chrome para Android.

Implementar:

- Layout responsivo.
- Suporte a toque.
- Botões grandes.
- Prevenção de rolagem acidental nas áreas interativas.
- Ajuste a telas verticais.
- Suporte a diferentes resoluções.
- Funcionamento sem teclado.
- Feedback visual ao selecionar elementos.

Priorizar a orientação vertical, mas permitir adaptação à horizontal quando viável.

Não exigir APK para a primeira versão.

---

# 14. PWA E FUNCIONAMENTO OFFLINE

Preparar o BioMundo para instalação como Progressive Web App.

Criar:

- `manifest.webmanifest`.
- Ícones adequados.
- `service-worker.js`.
- Estratégia de cache dos recursos essenciais.

O aplicativo deverá poder ser instalado pela interface do navegador quando os requisitos da plataforma forem atendidos.

A funcionalidade offline deverá ser validada após o primeiro carregamento completo e a instalação/ativação do Service Worker.

Não prometer funcionamento offline em situações ainda não testadas.

Evitar dependências remotas.

---

# 15. DOCUMENTO DE GAME DESIGN

Criar um Mini-GDD contendo nove seções:

1. Identificação do jogo.
2. Objetivo educacional.
3. Público-alvo.
4. Conceito e narrativa.
5. Mecânicas e interações.
6. Regras e progressão.
7. Personagens e elementos visuais.
8. Interface e acessibilidade.
9. Avaliação da aprendizagem e encerramento.

Salvar em `docs/mini-gdd.md`.

---

# 16. TESTES OBRIGATÓRIOS

Validar:

- Abertura da tela inicial.
- Funcionamento dos menus.
- Seleção das fases.
- Interação por toque.
- Interação por mouse.
- Arrastar e soltar.
- Alternativa tocar e selecionar.
- Posicionamento correto das organelas.
- Feedback de acerto.
- Feedback de tentativa incorreta.
- Conclusão de fases.
- Reinício de atividades.
- Salvamento de progresso.
- Recuperação de progresso.
- Preferências de acessibilidade.
- Redução de movimento.
- Áudio opcional.
- Layout em celular.
- Layout em desktop.
- Funcionamento offline quando aplicável.
- Caminhos relativos.
- Ausência de erros de JavaScript.

Realizar testes automatizados quando houver ferramentas disponíveis.

Documentar separadamente os testes executados e os que ainda exigem validação manual em um dispositivo Android real.

---

# 17. DOCUMENTAÇÃO E README

Criar um README profissional com:

- Nome e descrição.
- Objetivo educacional.
- Público-alvo.
- Conteúdo de Biologia.
- Funcionalidades.
- Recursos de acessibilidade.
- Tecnologias.
- Estrutura dos arquivos.
- Como executar.
- Como instalar como PWA.
- Como publicar no GitHub Pages.
- Como testar no Android.
- Limitações.
- Créditos.
- Declaração de uso de IA.
- Link público, quando disponível.

Não inventar link de publicação.

---

# 18. PUBLICAÇÃO NO GITHUB PAGES

Preparar todos os caminhos relativos para hospedagem em subdiretório.

Documentar:

1. Criar repositório GitHub.
2. Enviar os arquivos.
3. Acessar Settings → Pages.
4. Selecionar a branch de publicação.
5. Selecionar `/ (root)`.
6. Aguardar o deploy.
7. Abrir a URL publicada.
8. Testar em computador.
9. Testar no Android.
10. Atualizar o arquivo `link_do_jogo.txt`.

O Service Worker deverá respeitar o escopo do repositório no GitHub Pages.

Não realizar publicação sem autorização explícita.

---

# 19. RELATÓRIO FINAL

Produzir um relatório contendo:

1. Introdução.
2. Justificativa educacional.
3. Objetivos de aprendizagem.
4. Público-alvo e acessibilidade.
5. Conceito do jogo.
6. Fundamentação científica.
7. Mecânicas.
8. Design visual.
9. Desenvolvimento técnico.
10. Estrutura do código.
11. Recursos de acessibilidade.
12. Testes realizados.
13. Resultados.
14. Limitações.
15. Melhorias futuras.
16. Conclusão.

Criar em Markdown e, se houver ferramentas disponíveis, também em PDF.

Não inventar avaliações com estudantes ou resultados de pesquisa com usuários.

---

# 20. ENTREGA DO ZIP

Gerar:

**BIOMUNDO-AVENTURA-DAS-CELULAS-ANDROID-HTML5-COMPLETO.zip**

O pacote deverá incluir:

- Código completo.
- Todas as oito fases.
- Ilustrações das células.
- Ilustrações das organelas.
- Mascote e seus estados.
- Interface responsiva.
- Recursos de acessibilidade.
- Manifest e Service Worker.
- README.
- Mini-GDD.
- Documentação.
- Relatório final.
- Prompts utilizados.
- Checklist de testes.
- Instruções de publicação.

Verificar a integridade do ZIP.

Não incluir senhas, tokens ou arquivos temporários.

Fornecer link real para download.

---

# 21. CRITÉRIOS DE ACEITAÇÃO

O projeto será considerado completo quando:

- [ ] O jogo abrir no navegador.
- [ ] As oito fases estiverem implementadas.
- [ ] As células animal e vegetal estiverem representadas.
- [ ] As organelas forem interativas.
- [ ] O mascote possuir seis estados visuais.
- [ ] Os controles por toque funcionarem.
- [ ] Os controles por mouse funcionarem.
- [ ] As instruções forem claras.
- [ ] O jogo não exigir cronômetro.
- [ ] O feedback não for punitivo.
- [ ] O progresso for salvo.
- [ ] As configurações de acessibilidade funcionarem.
- [ ] O layout se adaptar ao Android.
- [ ] A versão PWA estiver preparada.
- [ ] Os recursos offline forem verificados.
- [ ] O README estiver completo.
- [ ] O Mini-GDD estiver completo.
- [ ] O relatório final estiver disponível.
- [ ] O ZIP estiver íntegro.
- [ ] Os testes forem documentados.

Não marcar um item como concluído sem implementação e evidência suficientes.

---

# 22. ORDEM DE EXECUÇÃO

Execute o projeto nas seguintes etapas:

**ETAPA 1:** Definir a arquitetura e o conteúdo educacional.

**ETAPA 2:** Produzir o Mini-GDD.

**ETAPA 3:** Criar a identidade visual, mascote e ilustrações.

**ETAPA 4:** Implementar a tela inicial e navegação.

**ETAPA 5:** Implementar as oito fases educativas.

**ETAPA 6:** Implementar interações, feedback e progresso.

**ETAPA 7:** Implementar acessibilidade e controles por toque.

**ETAPA 8:** Implementar PWA e cache offline.

**ETAPA 9:** Executar testes e corrigir falhas.

**ETAPA 10:** Produzir documentação e relatório.

**ETAPA 11:** Organizar arquivos e preparar GitHub Pages.

**ETAPA 12:** Gerar, verificar e entregar o ZIP.

Não encerrar a tarefa após o planejamento.

Continue até concluir todas as etapas possíveis.

---

# 23. INSTRUÇÃO FINAL

**DESENVOLVA O JOGO BIOMUNDO — AVENTURA DAS CÉLULAS DO ZERO.**

Não quero apenas ideias.

Não quero trechos isolados de código.

Não quero uma simulação visual sem funcionamento.

Quero um projeto real, executável, educativo e acessível.

Priorize qualidade e funcionamento em vez de complexidade.

Utilize ferramentas de criação de arquivos, execução e testes quando disponíveis.

Se algum recurso não puder ser produzido, identifique a limitação claramente e entregue os componentes concluídos.

O resultado esperado é um **jogo HTML5 completo, com oito fases, sobre células e organelas, jogável em Android e computador, com interface acessível, documentação e ZIP pronto para publicação gratuita no GitHub Pages.**

**INICIE AGORA A IMPLEMENTAÇÃO DO PROJETO.**