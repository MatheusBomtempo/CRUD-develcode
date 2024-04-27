# CRUD-develcode Spring Boot + React

Este projeto é uma aplicação web que combina Spring Boot para o back-end e React para o front-end. Ele pode ser executado através de uma única porta usando Spring Boot para servir o aplicativo React, ou você pode executar React em uma porta separada, se preferir. 

## Requisitos

- [XAMPP](https://www.apachefriends.org/index.html) ou MySQL Server.
- [JDK 11+](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html).
- [Node.js](https://nodejs.org/).
- [Maven](https://maven.apache.org/) (se você estiver usando Maven para o Spring Boot).

## Configuração do Banco de Dados

1. Inicie XAMPP e certifique-se de que o MySQL está em execução.
2. Crie um novo banco de dados no MySQL com um nome de sua escolha (para evitar conflitos, use o nomme "develcode").
3. Atualize o arquivo de propriedades do projeto Spring Boot (`src/main/resources/application.properties`) com as configurações do banco de dados:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/SEU_BANCO_DE_DADOS
spring.datasource.username=SEU_USUARIO
spring.datasource.password=SUA_SENHA
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

## Executando o Projeto

### Informações iniciais

1. O projeto ja foi buildado dentro de `src/main/resources/static`, sendo assim, ao rodar o arquivo `UsuariosApplication.java` ele automaticammente irá rodar o projeto react buildado.

2. Caso queira rodar separado, exclua os arquivos da pasta `src/main/resources/static` e faça a execucão de ambos separados.

### Usando uma única porta

1. **Execute o projeto Spring Boot:**
    - Na pasta `back/usuarios/src/main/resources/static`, execute o projeto Spring Boot pelo arquivo `UsuariosApplication.java`

O projeto será executado na porta padrão do Spring Boot (geralmente `localhost:8080`).

### Usando portas separadas

1. **Executando o back-end:**
    - Exclua os arquivos da pasta `src/main/resources/static` 
    - Execute pelo arquivo `UsuariosApplication.java`
    - Abra o (`localhost:8080/listar`) e verifique se está tudo correto.

2. **Executando o front-end:**
    - Navegue até a pasta `front`:
        ```bash
        cd ../front
        ```
    - Instale o aplicativo React:
        ```bash
        npm i
        ```
     - Instale o aplicativo React:
        ```bash
        npm start
        ```   

O aplicativo React será executado na porta padrão do React (`localhost:3000`).

## Considerações Finais

-Caso as fotos não estejam realizando upload, cheque se seu banco de dados não esta setando forçadamente o atributo "foto" para `Long` ao invés de `LongBlob`, caso esteja, mude para de volta para LongBlob.

Espero que estas instruções tenham sido úteis para ajudá-lo a configurar e executar este projeto.

## Contato

Se precisar de ajuda adicional, entre em contato pelo [Instagram: @mfbomt](https://www.instagram.com/mfbomt) ou pelo [email: matheusbarbacena@gmail.com](mailto:matheusbarbacena@gmail.com).



