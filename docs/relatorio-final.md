# BioMundo — Relatório da atualização 2.0.0

**Revisão de 18/11/2026.** Objetivo: introduzir biologia celular com funções reais das estruturas, diferenças entre modelos e menor carga de informação por tela.

## Entrega

O jogo foi reorganizado em **11 fases e 33 atividades**, uma estrutura por fase. Cada fase possui introdução, observação/encaixe de uma estrutura, duas perguntas apresentadas separadamente e conclusão. Todas continuam abertas e repetíveis.

Foram preservados ajuda, pausa, exploração por toque ou arraste, teclado, som opcional e retomada. O glossário apresenta uma entrada detalhada por vez, com leitura voluntária e zoom de figura entre 100% e 200%. A interface mantém as cores e a Bibi; o fundo é estático, sem partículas móveis.

## Precisão científica

Os modelos são identificados como animal nucleado ou vegetal fotossintetizante. Parede celular e cloroplastos não são apresentados como componentes humanos; nem toda célula vegetal possui cloroplastos. O núcleo guarda a maior parte do DNA em células eucarióticas nucleadas; mitocôndrias participam da produção de ATP; ribossomos sintetizam proteínas. A membrana regula trocas, e o feedback após o acerto explica permeabilidade seletiva.

As palavras “estruturas” e “organelas” não são usadas indistintamente: membrana, parede e citoplasma recebem descrições apropriadas. Cores, escala e encaixes são recursos didáticos. Fontes completas em `fontes.md`.

## Progresso

A v2 preserva dados anteriores quando eles estão disponíveis no mesmo navegador/endereço. Mantém estruturas conhecidas, preferências e um histórico normalizado da v1, sem apagar a chave original. As fases novas não recebem conclusões automáticas, pois o percurso foi reorganizado. O novo rascunho salva encaixe, etapa, pergunta e resposta.

## Evidência

**47 testes Node aprovados, zero falhas.** Há 27 testes de currículo, conteúdo, recursos, cache e comportamentos do jogo, navegação/zoom e áudio, além de 20 de progresso/migração. Os testes de DOM, armazenamento, voz e Service Worker usam contratos simulados identificados como tais.

O navegador real não iniciou por bloqueio do ambiente (`socket() EPERM`). Foram registrados 0 testes de navegador aprovados e 1 bloqueio. Layout, áudio real, Android, instalação e offline real permanecem pendentes. As imagens históricas v1 não são evidências da v2. Resultados completos e roteiro em `testes.md`.

## Abrir e atualizar

Extraia todo o ZIP e abra `biomundo/index.html`. No Windows, pode usar `INICIAR-WINDOWS.bat`. Para testar com origem local, use `SERVIDOR-LOCAL.bat` com Python 3. Para Android, publique o conteúdo da pasta em HTTPS conforme `publicacao.md`. Este pacote não é APK. Nenhuma publicação foi executada.

Ao atualizar uma instalação existente, mantenha a origem e o caminho e feche as abas antigas para a nova versão do cache ser ativada. Mudar de endereço, navegador ou dispositivo não transporta o progresso automaticamente.

O pacote inclui o código, ilustrações, documentação atualizada, testes reproduzíveis e manifesto de integridade. O briefing inicial está preservado como referência histórica; as melhorias solicitadas em 18/11/2026 têm precedência.
