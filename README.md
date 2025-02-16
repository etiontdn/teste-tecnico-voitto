#### README.md
# App de Cursos e Matrículas

Este aplicativo é um sistema de gerenciamento de cursos e matrículas construído com Next.js e Mantine. Ele permite que os usuários visualizem cursos, gerenciem matrículas e atualizem detalhes do curso.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte instalado:

-   [Node.js](https://nodejs.org/)
-   [npm](https://www.npmjs.com/)

## Instalação

1.  Clone o repositório:

    ```bash
    git clone <url-do-repositório>
    cd <diretório-do-repositório>
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

## Executando o Aplicativo

Para executar o aplicativo, você precisa iniciar o servidor de desenvolvimento Next.js e seu servidor de API local.

1.  **Inicie o servidor de API local:**

    Certifique-se de que seu servidor de API esteja rodando localmente. Este projeto assume que sua API está rodando em `http://localhost:8080`. 

    ```bash
    npm run api
    ```

2.  **Inicie o servidor de desenvolvimento Next.js:**

    Abra um novo terminal, navegue até o diretório do projeto e execute:

    ```bash
    npm run dev
    ```

    Isso iniciará o servidor de desenvolvimento Next.js em `http://localhost:3000`.

## Acessando o Aplicativo

Depois que o servidor de API e o servidor de desenvolvimento Next.js estiverem em execução, você pode acessar o aplicativo no seu navegador da web em `http://localhost:3000`.

## Dependências Principais

-   **Next.js**: Framework React para construir aplicações web.
-   **Mantine**: Biblioteca de UI React para um conjunto rico de componentes acessíveis.
-   **@tabler/icons-react**: Uma biblioteca de ícones SVG de alta qualidade.