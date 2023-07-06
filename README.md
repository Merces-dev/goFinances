# goFinances - Controle de Finanças

O goFinances é um projeto de controle de finanças pessoais desenvolvido com React Native. Ele permite que os usuários acompanhem suas despesas e receitas de forma simples e intuitiva, ajudando a ter uma visão clara de como o dinheiro está sendo gerenciado.

## Funcionalidades

- Registro de despesas e receitas, com informações como descrição, valor e categoria.
- Exibição de um resumo das despesas e receitas totais.
- Listagem das transações realizadas, com filtros por tipo (despesa ou receita) e período.
- Cálculo do saldo atual, levando em consideração todas as transações.
- Gráficos para visualização de dados, auxiliando no controle financeiro.

## Requisitos

- Node.js (versão 16 ou superior)
- React Native CLI
- Yarn (ou NPM)
- Emulador ou dispositivo físico para executar o aplicativo

## Instalação

1. Clone o repositório do goFinances:

```
git clone https://github.com/Merces-dev/goFinances.git
```

2. Instale as dependências do projeto:

```
npm install
```

3. Inicie o servidor de desenvolvimento:

```
expo start
```

## Configuração

Para utilizar todas as funcionalidades do goFinances, você precisará configurar corretamente algumas variáveis de ambiente. Siga as etapas abaixo:

1. Crie um arquivo `.env` na raiz do projeto.
2. Adicione as seguintes variáveis de ambiente ao arquivo `.env`:

```
# Google Credentials

CLIENT_ID=
REDIRECT_URI=
```

3. Certifique-se de que a URL da API de backend esteja correta e que o servidor esteja em execução.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema, bug ou tiver alguma sugestão de melhoria, sinta-se à vontade para abrir uma nova issue ou enviar um pull request. Faremos o possível para revisar e incorporar as contribuições da comunidade.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo `LICENSE` para obter mais informações.

---

Esperamos que você aproveite o goFinances e que ele seja útil no controle das suas finanças pessoais.
