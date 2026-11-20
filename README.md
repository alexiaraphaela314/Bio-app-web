# BioMundo — Aventura das Células

# Integrantes
Aléxia Raphaela - RA: 2025112817
Claudio Hideki - RA: 2025118917

**Versão 2.0.0 | Revisão de 18/11/2026 | Jogo educativo HTML5 em português**

Introdução à biologia celular com Bibi: **11 fases, 33 atividades e uma estrutura por fase**. Cada fase apresenta uma exploração e duas perguntas curtas, uma por tela. O objetivo é reconhecer estruturas, compreender suas funções e distinguir os modelos animal nucleado e vegetal fotossintetizante.

A revisão implementa as melhorias solicitadas: conteúdo científico mais preciso, permeabilidade seletiva explicada após o acerto, glossário com uma entrada por vez, áudio voluntário, zoom de 100% a 200% e fundo estático. Ajuda, pausa, teclado, toque, arraste e retomada continuam disponíveis.

## Abrir no computador

1. Extraia **todo o ZIP**.
2. Abra a pasta `biomundo`.
3. Abra `index.html` no Chrome ou Edge. No Windows, `INICIAR-WINDOWS.bat` oferece essa abertura.
4. Mantenha `assets`, `css` e `js` ao lado de `index.html`; não abra somente o HTML de dentro do ZIP.

A abertura direta não instala uma PWA. A persistência de arquivos `file://` varia conforme o navegador. Para testar com origem local estável, use `SERVIDOR-LOCAL.bat` com Python 3 instalado, ou execute nesta pasta:

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Abra `http://localhost:8000` no navegador. Pare o servidor com Ctrl+C. O jogo não exige build, npm, conta ou banco de dados. Python e Node são ferramentas opcionais de desenvolvimento/teste, não dependências do jogo publicado.

## As 11 fases

| Fase | Estrutura em foco | Modelo apresentado |
| --- | --- | --- |
| 1 | Membrana plasmática | Animal nucleado |
| 2 | Citoplasma | Animal nucleado |
| 3 | Núcleo | Animal nucleado |
| 4 | Mitocôndria | Animal nucleado |
| 5 | Ribossomos | Animal nucleado |
| 6 | Retículo endoplasmático | Animal nucleado |
| 7 | Complexo de Golgi | Animal nucleado |
| 8 | Lisossomos | Animal nucleado |
| 9 | Parede celular | Vegetal fotossintetizante |
| 10 | Cloroplastos | Vegetal fotossintetizante |
| 11 | Vacúolo central | Vegetal fotossintetizante |

As fases são abertas e repetíveis. Cada uma tem **1 exploração + 2 perguntas = 3 atividades**. Membrana, citoplasma e parede são estudados como estruturas; não são apresentados indistintamente como organelas internas.

## Jogar

Selecione a única peça da fase e depois a área A. Arrastar também funciona. Para membrana e parede, o contorno da célula está destacado; para citoplasma, uma área interna representa a região observada. As demais estruturas foram omitidas para reduzir distrações. Isso não significa que a célula real contenha apenas uma estrutura.

Após localizar, pressione **Entender a função**. Responda uma pergunta por vez e leia o feedback antes de avançar. A pergunta sobre membrana explica **permeabilidade seletiva** após o acerto. Erros permitem nova tentativa e não retiram descobertas. Ajuda destaca o alvo ou a resposta e explica o conceito.

No teclado, use Tab para navegar, Enter/Espaço para selecionar e Escape para fechar janelas ou pausar. O atalho **Pular para o conteúdo** preserva a fase. As instruções podem ser ouvidas, e o glossário pode ser consultado durante o jogo.

## Glossário, zoom e tranquilidade

O glossário mostra somente uma entrada detalhada por vez: função, presença nos tipos celulares e aprofundamento opcional. **Ouvir explicação** inicia a leitura por voz; o mesmo botão a interrompe. O áudio nunca começa automaticamente. Os textos permanecem disponíveis quando a voz está ausente.

**Ampliar figura** abre controles de 100%, 125%, 150%, 175% e 200%. Quando a figura ultrapassar a área, é possível explorar com rolagem, toque ou setas. O tamanho dos elementos e o contraste também podem ser ajustados. O zoom de figura é independente da ampliação da página pelo navegador.

O fundo é estático e não há partículas móveis, música contínua ou animação em loop. Movimento e som começam desligados. O modo personalizado permite transições curtas; a preferência `prefers-reduced-motion` do sistema sempre prevalece.

A narração utiliza `speechSynthesis`: a disponibilidade, o idioma, a qualidade e a eventual necessidade de internet dependem do dispositivo. Não há gravações de voz incluídas. Todo o jogo pode ser utilizado sem áudio.

## Retomar o progresso e atualizar a versão anterior

O jogo salva automaticamente a fase, o encaixe, a pergunta atual, as respostas confirmadas, descobertas e preferências em `localStorage`. Para retomar, use o **mesmo navegador e endereço**. Mudar de dispositivo, origem ou pasta pode criar um espaço de progresso separado. O rodapé informa quando o armazenamento não está disponível.

A v2 usa a chave `biomundo:v2:<diretório>`. Se encontrar dados v1 no mesmo endereço, preserva estruturas conhecidas e preferências e guarda uma cópia normalizada do histórico antigo. A chave v1 original fica intacta. Um rascunho antigo aponta a retomada para uma estrutura compatível.

As 8 fases antigas e as 11 novas não são equivalentes. Por isso, as perguntas novas começam sem respostas ou conclusões automáticas. A tela inicial e o mapa identificam o histórico preservado. O reinício de progresso requer confirmação, mantém preferências e impede a reimportação automática dos dados antigos na próxima abertura.

Não há login, analytics ou transmissão do progresso. O serviço opcional de voz é controlado pelo navegador/sistema operacional.

## Validação desta revisão

**47 testes Node passaram, sem falhas.** Os resultados executados estão em `tests/resultados-unitarios.txt` e `docs/testes.md`. Incluem o percurso lógico das 11 fases, correção científica, migração, persistência simulada, navegação, zoom e contratos do cache.

**O navegador de testes não iniciou neste ambiente:** a criação do processo foi bloqueada por `socket() EPERM`. Não houve validação visual da v2, reprodução real de áudio, teste em Android físico, instalação PWA ou recarga offline real. Os testes lógicos usam contratos de DOM, voz e armazenamento explicitamente simulados. O roteiro HTTP está incluído para execução em ambiente permitido; não utiliza um modo alternativo que masque o bloqueio.

As nove capturas antigas foram preservadas em `prints/historico-v1`. Elas documentam a versão anterior e não comprovam a interface desta revisão.

<img width="1127" height="793" alt="image" src="https://github.com/user-attachments/assets/0d34c8b3-f254-4394-bcaf-1c256b2618d3" />

<img width="1162" height="872" alt="image" src="https://github.com/user-attachments/assets/b66ca3a8-7524-4a3f-8117-b17ad2f0efce" />

<img width="1060" height="571" alt="image" src="https://github.com/user-attachments/assets/9aadfc3c-4455-4b7b-a1f1-e96fd46ef501" />

### Repetir os testes

```bash
node --test tests/unit.test.cjs tests/progress.test.cjs
```

Para navegador real em ambiente permitido:

```bash
python -m pip install playwright
python -m playwright install chromium
python tests/browser_test.py
```

O teste real inclui recarga do progresso, teclado/toque, zoom, navegação e cache offline. A aprovação lógica não substitui essa execução.

## Android, publicação e offline

O pacote é HTML5/PWA, **não um APK**. Para Android, utilize hospedagem HTTPS e abra a URL no navegador. `docs/publicacao.md` contém instruções para GitHub Pages. Nenhuma publicação foi realizada.

Manifest, ícones e Service Worker estão incluídos. O cache é isolado pelo caminho do jogo e lista somente recursos de execução. A v2 usa `2.0.0-20261118`. Atualizações aguardam as abas antigas fecharem; o rodapé informa quando existe atualização pronta. A voz pode não funcionar offline.

## Arquivos principais

- `index.html`: entrada do jogo.
- `js/content.js`: explicações e fontes; `js/levels.js`: fases e perguntas.
- `js/game.js`: exploração e atividades; `js/main.js`: telas e navegação.
- `js/progress.js`: progresso e migração; `js/audio.js`: som e voz voluntários.
- `css/focus.css`: layout da revisão, glossário, contexto celular e zoom.
- `docs/`: conteúdo, acessibilidade, Mini-GDD, publicação, testes e relatório.
- `prompts/`: briefing original e registro das decisões da revisão.
- `tools/build_cache.py`: regenera o cache após mudanças de recursos.
- `tools/verificar_pacote.py`: verifica o manifesto de integridade.

## Referências e limites

Os desenhos são recursos didáticos, sem escala real ou lugares fixos universais. O núcleo guarda a maior parte do DNA em células eucarióticas nucleadas; mitocôndrias participam da produção de ATP; ribossomos sintetizam proteínas; a membrana regula trocas. Cloroplastos e parede não são componentes de células humanas. Fontes e qualificações: `docs/fontes.md` e `docs/conteudo-educativo.md`.

Código e textos foram revisados com assistência de IA. A identidade visual colorida e os SVGs originais foram mantidos. Não houve avaliação com estudantes, certificação de acessibilidade ou medição de aprendizagem nesta revisão.
