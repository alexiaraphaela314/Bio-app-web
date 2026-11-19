# Acessibilidade — BioMundo v2

**Revisão: 18/11/2026.** As escolhas abaixo procuram oferecer diferentes formas de perceber, compreender e operar o jogo. Não pressupõem necessidades iguais para todas as pessoas, inclusive estudantes autistas.

## Uma estrutura de cada vez

Cada uma das 11 fases mantém uma única estrutura em foco: uma observação ou encaixe e duas perguntas apresentadas separadamente. Ajuda e instruções curtas permanecem disponíveis. O tipo celular é identificado por texto, e o feedback combina mensagem e símbolo.

As pistas usam **forma, letra e texto**, além das cores. O jogador não precisa distinguir somente cores para selecionar a resposta. Membrana, parede e citoplasma são observados em sua posição contextual; não são descritos como peças internas intercambiáveis.

## Ambiente visual estável

As cores vivas e o estilo cartoon foram mantidos. O fundo é estático, sem partículas móveis e sem animação decorativa em loop. O modo tranquilo reduz a decoração e os sons automáticos. O modo padrão também mantém o fundo estático.

Há configurações de contraste reforçado e tamanho dos elementos. A preferência `prefers-reduced-motion` do dispositivo tem prioridade. Nenhum movimento é necessário para compreender a tarefa.

## Zoom e glossário

O glossário mostra **uma entrada por vez**, permitindo concentrar a leitura em uma estrutura. Cada entrada reúne nome, imagem, explicação e contexto de ocorrência. O áudio é acionado pelo botão **Ouvir**.

A figura pode ser ampliada entre **100% e 200%**. Os controles textuais permitem ampliar ou reduzir sem depender de gesto de pinça. O zoom da figura não substitui a opção de elementos maiores nem o zoom geral do navegador. A legibilidade e a rolagem no tamanho escolhido precisam ser conferidas no aparelho de uso.

## Alternativas de operação

- **Selecionar e posicionar:** tocar ou clicar na peça e depois no alvo; arrastar é uma alternativa, não uma exigência.
- **Arraste:** Pointer Events atendem mouse, caneta e toque compatíveis.
- **Teclado:** botões HTML permitem navegação por Tab e ativação por Enter ou Espaço.
- **Observação:** contornos e regiões têm ação explícita de exploração, preservando sua localização no modelo.
- **Ajuda e pausa:** disponíveis durante a fase, sem cronômetro ou perda de vidas.

As instruções permanecem escritas. Foco visível, identificação textual dos controles, região de anúncio de feedback e semântica de progresso fazem parte da implementação. Esses recursos não equivalem a uma certificação de compatibilidade com todos os leitores de tela.

## Áudio voluntário e suas limitações

O jogo inteiro pode ser concluído sem som. O som curto de acerto é opcional, e não há som de erro. Ativar narração não inicia a leitura; é necessário tocar em **Ouvir**. A pessoa pode interromper a voz.

A leitura usa `speechSynthesis` e as vozes disponíveis no navegador ou no sistema. **Não há faixas de voz gravadas para os nomes das estruturas.** Uma voz pode ser fornecida por serviço remoto e exigir internet; pronúncia, disponibilidade em português e funcionamento offline variam por dispositivo. O botão e a explicação textual precisam continuar compreensíveis mesmo quando a voz está indisponível.

## Retomada e autonomia

Progresso e preferências são salvos localmente quando o navegador permite. A v2 preserva o histórico e as configurações disponíveis da v1, mantendo as estruturas conhecidas. As perguntas da trilha nova começam sem conclusão automática por equivalência com as fases antigas.

O mapa permite escolher outra fase, repetir e retomar. Não há ranking competitivo, punição por erro, limite de tentativas ou coleta de informações de saúde. As opções podem ser ajustadas individualmente.

## O que foi e não foi validado

Nesta revisão, o navegador de teste não iniciou: o ambiente retornou `EPERM`. Portanto, não se afirma que os controles novos foram exercitados visualmente ou em navegador. Os resultados efetivamente obtidos com testes lógicos e os procedimentos disponíveis estão em [testes.md](testes.md).

Ainda é necessário conferir em uso real: foco e teclado, arraste e dois toques, zoom a 200%, textos em tela pequena, contraste, TalkBack/NVDA/VoiceOver, voz em português, retomada depois de reabrir o navegador e instalação/offline. Não houve avaliação com estudantes ou teste em Android físico nesta revisão. Não se declara conformidade integral WCAG nem efeito terapêutico.
