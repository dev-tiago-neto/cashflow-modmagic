# Modulus Magic — Fluxo de Caixa · PWA offline

PDV simples para eventos de impressão 3D. Sem assinatura, sem App Store, sem backend e sem dependências de npm.

## Tecnologia

HTML, CSS, JavaScript sem frameworks, IndexedDB, Web App Manifest e Service Worker. GitHub Pages hospeda todos os arquivos estáticos sem processo de build.

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

