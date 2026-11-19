# Registro de produção — BioMundo

## Referências preservadas

O briefing inicial permanece integralmente em [prompt-mestre.md](prompt-mestre.md). A direção visual original pediu um jogo sobre células, bem colorido, e uma imagem de conceito foi aprovada antes da implementação. O primeiro pacote reuniu uma trilha de oito fases.

**Este briefing é histórico. As orientações mais recentes do solicitante, recebidas em 18/11/2026, prevalecem sobre a exigência antiga de oito fases.**

## Revisão de 18/11/2026 — versão 2

O solicitante pediu melhorias educativas e de acessibilidade, preservando exploração por fases, ajuda, pausa, áudio e retomada do progresso. Foram adotadas as seguintes decisões:

1. Reorganizar a trilha em **11 fases**, uma estrutura por fase, para manter a cobertura das 11 estruturas sem apresentar várias ao mesmo tempo.
2. Estruturar cada fase em **uma observação ou encaixe e duas perguntas**, totalizando **33 atividades**. A apresentação e a conclusão não são contadas como atividades.
3. Identificar o tipo celular: modelo animal nucleado nas fases 1–8 e vegetal fotossintetizante nas fases 9–11.
4. Diferenciar estruturas de organelas internas. Membrana, parede e citoplasma recebem observação contextual, sem sugerir que sejam peças internas soltas.
5. Explicar permeabilidade seletiva depois do acerto sobre membrana. Usar “maior parte do DNA” para o núcleo e relacionar mitocôndrias a ATP e ribossomos à síntese de proteínas.
6. Preservar os textos acessíveis solicitados sobre ribossomos e mitocôndrias, com aprofundamento opcional. Não apresentar parede ou cloroplastos como componentes humanos; esclarecer que nem toda célula vegetal tem cloroplastos.
7. Manter cartoon e cores vivas com **fundo estático**, sem partículas móveis ou animação em loop. Usar pistas de forma, letra e texto, além de cores.
8. Apresentar **uma entrada do glossário por vez**, com áudio voluntário e zoom da figura de **100% a 200%**. Manter modo tranquilo e configurações.
9. Usar narração por `speechSynthesis`, dependente das vozes do dispositivo e eventualmente de rede. Não incluir gravações de nomes; o jogo inteiro permanece disponível sem som.
10. Preservar um snapshot dos dados v1 disponíveis, suas configurações, histórico e estruturas conhecidas. Não transformar perguntas antigas em conclusões automáticas das novas fases.
11. Atualizar código e documentação no pacote, mantendo o briefing original como referência e identificando quaisquer capturas antigas como históricas.

## Verificação e entrega

A tentativa de iniciar o navegador de validação nesta revisão foi bloqueada com `EPERM`. Não se afirma execução visual de interface, captura de tela atual ou teste em Android físico. Os resultados lógicos executados e as verificações pendentes estão em [docs/testes.md](../docs/testes.md). Testes e capturas da primeira versão não são apresentados como evidências da v2.

O pacote não foi publicado nesta revisão. Este documento registra instruções e decisões de produção, não raciocínio interno. Nenhum material dos projetos que o solicitante pediu para desconsiderar integra o escopo do BioMundo.
