# Publicar e abrir no Android

**Nenhuma publicação foi realizada.** O arquivo `link_do_jogo.txt` deve ser atualizado apenas com a URL real gerada na sua conta.

## GitHub Pages

1. Crie um repositório para o projeto. Para a opção gratuita documentada do GitHub Free, use repositório público e não inclua informações privadas.
2. Extraia o ZIP e envie o **conteúdo de `biomundo`** para a raiz do repositório. `index.html` deve aparecer na raiz ao lado de `assets`, `css` e `js`. Não envie apenas o ZIP. Não é necessário build/npm install.
3. Em **Settings > Pages > Build and deployment**, selecione **Deploy from a branch**, escolha a branch que recebeu os arquivos e **/(root)**. Salve.
4. Aguarde a publicação e abra a URL indicada pelo GitHub. Confira a aba de execuções em caso de falha. Não selecione `/docs`: essa pasta contém apenas a documentação.
5. Teste no computador e depois no Chrome do Android. Registre a URL real em `link_do_jogo.txt`.

Caminhos do jogo, manifest e escopo do Service Worker são relativos, preparados para o subdiretório de um repositório. O jogo não precisa de um domínio próprio. Fontes oficiais: GitHub Docs e MDN, em `fontes.md`.

## Instalar como PWA

Abra a URL HTTPS no Chrome Android, aguarde o primeiro carregamento e procure a opção de instalação no menu do navegador. O texto do menu varia. Dentro do jogo, Instalar jogo só aparece quando `beforeinstallprompt` é oferecido. A instalação real ainda não foi testada.

## Validar offline

Depois de o jogo informar que está pronto para offline, feche e reabra para garantir controle pelo Service Worker. Desative a rede e abra novamente a URL exata do jogo. Teste as onze fases e as imagens. Verifique o rodapé e o console de erros. A voz pode não funcionar offline; ela é opcional. Se houver falha, não distribua como offline homologado. Registre navegador, versão, dispositivo e evidências em `testes.md`.

## Atualizar sem perder o controle da versão

Altere `VERSION` em `tools/build_cache.py` e execute `python tools/build_cache.py`. Publique todos os recursos juntos. A nova versão aguarda as abas antigas fecharem. O `localStorage` não é apagado pela atualização do cache; mudar de URL altera o espaço de progresso. Antes de nova publicação, execute novamente testes e roteiro Android.


## Migração da v1 para a v2

Mantenha a mesma origem e o mesmo caminho para disponibilizar os dados antigos ao novo jogo. Publique o conjunto completo da v2 e feche as abas antigas para ativar o novo cache. A v2 preserva descobertas, preferências e histórico v1; as perguntas novas não recebem conclusões automáticas. Mudar o endereço ou navegador não transporta o progresso. Antes de substituir a pasta local, mantenha uma cópia do pacote anterior.
