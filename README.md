# Modulus Magic — Fluxo de Caixa · PWA offline

## Identidade visual (v5)

- **Preto** `#08090C` como cor primária e fundo do aplicativo.
- **Azul oficial** `#2F00FF` como cor secundária, em ações e navegação ativa.
- **Laranja oficial** `#FF4B14` em detalhes, destaques e informações financeiras.
- O visual é o mesmo no iPhone e no Windows. Os arquivos `styles.css`, `index.html`, `manifest.webmanifest` e os ícones foram atualizados.
- O cache do PWA foi incrementado para `modulus-magic-v5`, evitando manter o tema anterior após atualizar a publicação.


PDV simples para eventos de impressão 3D. Sem assinatura, sem App Store, sem backend e sem dependências de npm.

## Publicação gratuita no GitHub Pages

1. Crie uma conta em https://github.com (se ainda não tiver).
2. Crie um repositório **público** chamado `modulus-magic` (o nome pode ser outro, inclusive se você já tiver criado o repositório anterior).
3. Extraia este ZIP. Envie **todos os arquivos e pastas internos**, inclusive `.nojekyll`, `icons`, `index.html`, `app.js`, `auth.js`, `sw.js`, `manifest.webmanifest` e `styles.css` para a **raiz** do repositório. Não envie apenas o arquivo ZIP.
4. Abra **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main → /(root) → Save**.
5. Após a publicação, acesse `https://SEU-USUARIO.github.io/modulus-magic/` (troque o usuário e, se necessário, o nome do repositório). A publicação pode demorar alguns minutos.
6. No iPhone, abra o endereço no Safari → Compartilhar → Adicionar à Tela de Início → Abrir como App → Adicionar.
7. Abra o aplicativo **uma vez com internet** e depois faça um teste em modo avião antes de depender dele no evento.

## Acesso no iPhone e Windows

- A mesma URL funciona no iPhone e nos navegadores do Windows. Em telas amplas, o app mostra uma navegação lateral e tabelas/cartões mais espaçosos.
- A tela inicial pede e-mail e senha (usuário único solicitado). Não há 2FA. Não compartilhe a senha em issues públicas ou commits.
- **Os dados de caixa não sincronizam automaticamente entre dispositivos.** Para ler no Windows as vendas feitas no iPhone, exporte o JSON no iPhone e importe no Windows (a importação substitui os dados locais do Windows).

## Como usar

Na tela inicial, os três atalhos principais são **Vendas**, **Gastos** e **Estoque**. No Windows, os módulos também estão no menu lateral.

1. Em **Estoque**, cadastre nome, preço, custo e estoque inicial.
2. Em **Vendas**, escolha produto, quantidade, pagamento e eventual desconto. Taxa padrão do cartão: 3,5%, ajustável por venda.
3. Em **Gastos**, lance transporte, ingresso, alimentação, etc.
4. No painel, acompanhe receita e resultado estimado (receita após desconto menos taxas de cartão, custos unitários vendidos e despesas lançadas).
5. Em **Backup**, exporte JSON regularmente para **Arquivos / iCloud Drive** e CSV para planilhas.

## Segurança, limitações e precauções

- O código publicado no GitHub Pages é público, mas **vendas e dados financeiros não são enviados ao GitHub**: ficam no IndexedDB do navegador ou app instalado. Não inclua credenciais nem dados privados nos arquivos do repositório.
- Existe uma tela de login com um único usuário predefinido, sem 2FA, sem recuperação de senha e sem CRUD de contas. O acesso é conferido no navegador por um resumo SHA-256 (a senha não fica em texto puro nos arquivos).
- **Este login é somente uma barreira visual, não é segurança real.** O GitHub Pages é estático e qualquer pessoa que saiba usar ferramentas de desenvolvimento pode contornar a tela e alcançar os registros do próprio navegador. Para proteção real seria necessário um provedor de autenticação externo com servidor e políticas de acesso.
- O login vale apenas para a sessão da aba/aplicativo; o usuário precisa entrar de novo quando abrir outra sessão. Não é recomendado registrar dados sensíveis de terceiros.
- IndexedDB não substitui backup. Exporte JSON ao fim de cada período de vendas e guarde uma segunda cópia fora do aparelho.
- A instalação da tela inicial pode manter armazenamento distinto do site aberto pelo navegador. **Escolha um modo e mantenha-o durante o evento.** Para migrar entre modos ou dispositivos, use exportação/importação JSON.
- Não registre simultaneamente em dois dispositivos, pois não há reconciliação automática de vendas.
- A opção **Iniciar novo evento** apaga os dados locais atuais depois de duas confirmações. Faça backup antes.
- O serviço offline depende de o site e os recursos terem sido carregados previamente. Limpar dados do navegador/remover o aplicativo pode apagar o banco local.
- A importação **substitui** os dados atuais (não mescla registros); a exclusão de uma venda devolve quantidade ao estoque se o produto existir.
- O resultado estimado não é contabilidade formal: não considera impostos, custos fixos não lançados, devoluções e outras despesas não registradas.
- O CSV usa `;` como delimitador, com codificação UTF-8 BOM, para melhor compatibilidade com Excel em português.

## Desenvolvimento local

Execute um servidor estático no diretório do projeto, por exemplo:

```bash
python -m http.server 8000
```

Abra `http://localhost:8000`. Para o funcionamento PWA no iPhone, use o GitHub Pages (HTTPS), pois service workers exigem contexto seguro; apenas abrir `index.html` como arquivo não é suficiente.

## Tecnologia

HTML, CSS, JavaScript sem frameworks, IndexedDB, Web App Manifest e Service Worker. GitHub Pages hospeda todos os arquivos estáticos sem processo de build.

## Atualização da versão anterior

Se você já instalou a versão **Caixa Místico 3D**, publique estes novos arquivos **no mesmo repositório e endereço**, substituindo os anteriores. O banco local mantém sua identificação antiga para não apagar os registros existentes. Se optar por um repositório ou domínio novo, os dados do navegador não migram automaticamente: exporte o JSON na versão anterior e importe na nova.
