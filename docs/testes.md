# Verificação da versão 2.0.0

**Data: 18/11/2026. Escopo: atualização educativa e de acessibilidade do BioMundo.**

## Resultado executado

**47 testes Node aprovados, zero falhas.** O arquivo `tests/resultados-unitarios.txt` contém a saída completa. A suíte reúne:

| Grupo | Quantidade | O que foi verificado |
| --- | ---: | --- |
| Currículo, ciência, recursos e cache | 16 | 11 fases, 33 atividades, uma estrutura por fase, respostas válidas, ressalvas biológicas, recursos locais, manifest e Service Worker simulado |
| Percurso lógico do jogo | 6 | Exploração e perguntas das 11 fases, alvo único, ajuda, conclusão, retomada, pausa e reinício |
| Navegação e zoom | 4 | Rotas 9–11, glossário único, retorno por ajustes, IDs inválidos, preservação de lastLevel e zoom reversível |
| Áudio | 1 | Cenários de opt-in, parada, erro e proteção contra callbacks atrasados |
| Persistência e migração | 20 | Retomada, migração v1, integridade do histórico, dados malformados, bloqueio de armazenamento, quota, isolamento e reinício |
| **Total** | **47** | **Todos aprovados** |

Os testes de interface lógica usam **DOM simulado**, sem renderização CSS. Armazenamento, voz e APIs do Service Worker também são simulados nos testes de contrato. Isso confirma comportamentos lógicos e conteúdo, mas não o layout ou o comportamento real do navegador.

## Tentativa de teste em navegador

O Chromium falhou antes de abrir o jogo, ao iniciar o processo:

```text
socket() failed: Operation not permitted (EPERM)
```

Resultado registrado: **0 testes de navegador aprovados, 0 falhas de produto avaliadas e 1 bloqueio de ambiente**. Consulte `tests/resultados-browser.json` e `tests/resultados-browser.txt`.

Não foram alteradas políticas do ambiente ou usados mecanismos alternativos para contornar o bloqueio. Nenhuma captura da v2 foi produzida. As capturas da v1 estão identificadas como históricas e não foram utilizadas como comprovação da revisão atual.

## Correções identificadas durante a revisão

- Retorno independente de glossário e ajustes, preservando o caminho para a fase em andamento.
- Atalho “Pular para o conteúdo” não muda a rota da fase.
- Consultar uma introdução não substitui a última fase efetivamente iniciada.
- Encaixar ou selecionar interrompe a narração anterior.
- IDs inválidos no glossário não acessam propriedades herdadas nem provocam erro de rota.
- Fases 9, 10 e 11 são aceitas pelo roteador e pela persistência.

## Verificações ainda pendentes

| Área | Estado nesta revisão |
| --- | --- |
| Layout em Chrome/Edge e tamanhos de tela | Pendente em navegador real |
| Toque, arraste e teclado com renderização | Pendente; contratos lógicos verificados |
| Foco e leitores de tela/TalkBack | Pendente em tecnologia assistiva real |
| Voz em português e som de acerto | Pendente; controle de áudio simulado aprovado |
| Progresso após fechar/reabrir o navegador | Pendente real; persistência/migração simuladas aprovadas |
| Atualização do Service Worker e offline | Pendente real; contrato do cache simulado aprovado |
| Instalação PWA e Android físico | Pendente |
| Uso por estudantes e revisão de educador | Não realizados |

## Reproduzir em ambiente permitido

Na pasta `biomundo`:

```bash
node --test tests/unit.test.cjs tests/progress.test.cjs
python -m pip install playwright
python -m playwright install chromium
python tests/browser_test.py
```

Pode-se indicar um navegador instalado com `--browser /caminho/do/chromium`. O roteiro HTTP usa o conteúdo real da pasta e marca impedimentos ambientais como bloqueios. A v2 não contém modo embedded para declarar aprovação visual parcial.

## Roteiro final no dispositivo de destino

1. Abra o jogo por HTTPS ou localhost e registre versão do navegador, sistema e dispositivo.
2. Percorra as 11 fases. Verifique que existe uma peça por fase e que o tipo celular é legível nas introduções, atividades e conclusões.
3. Confira a explicação de permeabilidade seletiva após acertar a pergunta da fase 1.
4. Teste Ajuda, Pausar, repetir, retorno ao mapa e o trajeto jogo → glossário → ajustes → glossário → jogo.
5. Amplie e reduza a figura entre 100% e 200% com teclado e toque. Verifique rolagem e acesso aos botões em 320, 390, 768 e 1440 px, além de orientação horizontal.
6. Faça parte de uma fase, feche/reabra e confirme encaixe, pergunta e resposta. Teste a migração no mesmo endereço de uma instalação v1, sem considerar fases antigas equivalentes às novas.
7. Ouça o glossário, interrompa, troque de entrada e alterne de aba. Confira os textos quando a voz está ausente.
8. Ative modo tranquilo, contraste e tamanho ampliado. Teste preferência de movimento reduzido e TalkBack/leitor de tela.
9. Aguarde o cache, feche/reabra as abas, desligue a rede e recarregue. Teste todos os recursos e registre limitações da voz.
10. Instale a PWA quando oferecida e repita a abertura offline. Só então registre instalação e offline real como aprovados.

## Integridade

O manifesto SHA-256 é gerado após a revisão. `python tools/verificar_pacote.py` confere os arquivos extraídos. O comprovante externo registra CRC e SHA-256 do ZIP final. Integridade do arquivo não substitui os testes de execução no dispositivo.
