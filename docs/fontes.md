# Fontes e referências — BioMundo v2

**Revisão: 18/11/2026.** As referências abaixo apoiam a conferência de fatos e decisões técnicas. O jogo não as carrega automaticamente; abrir esses links externos exige acesso à internet. A redação das atividades e as ilustrações foram produzidas para o projeto. Não são redistribuídas páginas, figuras ou exercícios dos livros de referência.

## Conteúdo científico

| Fonte | Escopo de conferência | Endereço |
| --- | --- | --- |
| Clark, M. A.; Douglas, M.; Choi, J. *Biology 2e*. OpenStax, seção 4.3: Eukaryotic Cells | Estruturas celulares, ribossomos, mitocôndrias e comparação animal/vegetal | [OpenStax 4.3](https://openstax.org/books/biology-2e/pages/4-3-eukaryotic-cells) |
| Mesmos autores, seção 4.4: The Endomembrane System and Proteins | Retículo, Golgi, lisossomos e transporte de substâncias | [OpenStax 4.4](https://openstax.org/books/biology-2e/pages/4-4-the-endomembrane-system-and-proteins) |
| Mesmos autores, seção 5.2: Passive Transport | Permeabilidade seletiva e passagem de substâncias pela membrana | [OpenStax 5.2](https://openstax.org/books/biology-2e/pages/5-2-passive-transport) |
| National Human Genome Research Institute — Deoxyribonucleic Acid (DNA) Fact Sheet | DNA nuclear e DNA mitocondrial; evitar a afirmação de que todo DNA está no núcleo | [NHGRI — DNA](https://www.genome.gov/about-genomics/fact-sheets/Deoxyribonucleic-Acid-Fact-Sheet) |
| Cooper, G. M. *The Cell: A Molecular Approach*, 2ª ed. — Chloroplasts and Other Plastids. NCBI Bookshelf | Diversidade de plastídios e relação com tecidos vegetais fotossintetizantes e não fotossintetizantes | [NCBI Bookshelf](https://www.ncbi.nlm.nih.gov/books/NBK9905/) |

As referências OpenStax e NHGRI foram consultadas por recuperação web nesta revisão. Para o capítulo do NCBI, a busca recuperou conteúdo indexado, mas a abertura direta apresentou uma barreira de verificação; não se afirma leitura integral pela abertura direta. O material é usado para conferir fatos, sem copiar trechos extensos. A lista programática do jogo está em `js/content.js`, em `Bio.sources`.

## Implementação e publicação

- [MDN — SpeechSynthesisVoice.localService](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice/localService): distingue vozes locais de serviços remotos. Por isso, a narração opcional não é prometida como inteiramente offline.
- [MDN — Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage): armazenamento por origem e limitações, inclusive comportamento variável na abertura direta de arquivos.
- [MDN — Making PWAs installable](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable): requisitos e comportamento de instalação. Ter um manifesto não constitui teste de instalação no dispositivo.
- [GitHub Docs — Configuring a publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site): publicação a partir de branch ou workflow. É uma referência para o responsável; o projeto não foi publicado nesta revisão.

Essas quatro páginas técnicas foram consultadas em 18/11/2026. Referências técnicas complementares preservadas do projeto:

- [MDN — Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).
- [MDN — SpeechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis).

Resultados executados e limitações do ambiente constam em [testes.md](testes.md), que deve ser usado para avaliar a validação da versão entregue.

## Origem e precedência do escopo

O briefing original permanece integralmente em [prompt-mestre.md](../prompts/prompt-mestre.md). Ele é uma referência histórica: **as orientações posteriores do solicitante, recebidas em 18/11/2026, prevalecem sobre a estrutura antiga de oito fases**. A trilha atual tem uma estrutura por fase, 11 fases e 33 atividades.

O quadro Whimsical citado na conversa não foi usado como fonte de conteúdo inacessível. Não se afirma que o quadro completo foi lido. Mensagens de outros projetos que o solicitante mandou desconsiderar não integram o escopo do BioMundo.


## Documentação técnica conferida em 18/11/2026

- MDN, Service Workers: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers — escopo, cache e ciclo de atualização.
- MDN, localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage — armazenamento por origem e limitações de arquivos locais.
- MDN, SpeechSynthesis: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis — vozes disponíveis e controle da leitura.
- GitHub Docs, publicação: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site — seleção de branch e pasta de origem.

As fontes orientam a implementação. Não constituem evidência de que a publicação, a voz ou a instalação tenham sido executadas neste pacote.
