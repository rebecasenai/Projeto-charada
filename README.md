# Gerador de Charada😀

Projeto Front-End simples que exibe uma charada aleatória em um card com frente e verso. A pergunta aparece na frente e a resposta no verso, com animação de giro ao clicar.
feito por Rebeca Diniz 
## Tecnologias usadas

- HTML
- CSS (Tailwind CDN)
- JavaScript
- API externa para buscar charadas usando FIREBASE

## Como usar

1. Abra o arquivo `index.html` no navegador.
2. Clique no card para girar e ver a resposta.
3. Clique no botão `Nova Charada` para buscar outra pergunta.

## Como funciona

- O `index.html` contém a estrutura do card e botão.
- O `script.js` faz a requisição `fetch` para a API de charadas.
- O conteúdo retornado é exibido nos elementos `#pergunta` e `#resposta`.
- O card gira com a classe CSS customizada ao clicar.

## Observações

- A aplicação depende da disponibilidade do backend da API.
- Se o backend estiver offline ou protegido, a charada não será carregada.
- Caso queira testar localmente, abra `https://projeto-charada-zeta.vercel.app/` diretamente no navegador ou use um servidor simples.

## Estrutura do projeto

- `index.html` - layout e estilos principais.
- `script.js` - lógica de busca e interação.
- `README.md` - documentação do projeto.

## Melhorias sugeridas

- Adicionar tratamento de erros mais amigável ao usuário.
- Mostrar um loader enquanto a charada carrega.
- Permitir armazenar charadas favoritas.
