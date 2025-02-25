# colombia-agroalimentaria-sostenible-scicap-management

1. [Backend API Tech Stack](#backend-api-tech-stack)
   - [Programming language](#programming-language)
   - [Framework](#framework)
   - [Build tool](#build-tool)
   - [Code Coverage Tool](#code-coverage-tool)
   - [Static Code Analysis](#static-code-analysis)
   - [API Documentation](#api-documentation)

## Backend API Tech Stack

### Programming language

In this project, we use TypeScript as the primary programming language. TypeScript is a superset of JavaScript that adds static typing to the language, providing enhanced tooling, better code organization, and improved maintainability. With TypeScript, we can catch errors early in the development process and write more robust and scalable code.

### Framework

In this project, we leverage NestJS as the chosen framework. NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It utilizes TypeScript to offer a robust development experience, providing features such as dependency injection, modular architecture, and built-in support for HTTP frameworks like Express. NestJS promotes a structured and maintainable codebase, making it an excellent choice for developing complex applications.

### Build tool

For this project, we utilized the TypeScript compiler (`tsc`) as the build tool. `tsc` compiles TypeScript code into JavaScript, allowing us to write code in TypeScript and then compile it into a format that can be executed by Node.js or in the browser. `tsc` offers various configuration options to customize the compilation process according to project requirements, such as specifying target ECMAScript versions, enabling strict type-checking, and managing module resolution. By using tsc, we ensure that our TypeScript code is transformed into efficient and compatible JavaScript for deployment.

### Code Coverage Tool

In this project, we utilize Jest as the code coverage tool. [Jest](https://jestjs.io/) is a delightful JavaScript testing framework with a focus on simplicity and flexibility. It provides built-in support for measuring code coverage, allowing us to assess how much of our code is being tested. Jest generates detailed reports indicating which parts of our codebase are covered by tests and which areas may require additional testing. By leveraging Jest's code coverage functionality, we can ensure that our codebase is thoroughly tested, leading to higher quality software with fewer bugs.

### Static Code Analysis

In this project, we employ [SonarCloud](https://www.sonarsource.com/products/sonarcloud/) along with [ESLint](https://eslint.org/) for static code analysis. SonarCloud is a cloud-based platform that offers powerful static code analysis tools to detect code smells, bugs, security vulnerabilities, and other issues in our codebase. It provides comprehensive reports and actionable insights to help improve code quality and maintainability.

ESLint, on the other hand, is a widely-used JavaScript linter that helps enforce coding standards and best practices. By configuring ESLint rules according to our project requirements, we ensure consistent code style and identify potential errors early in the development process.

Combining SonarCloud and ESLint enables us to perform thorough static code analysis, resulting in cleaner, more maintainable code and enhancing overall software quality..

### API Documentation

In this project, we utilize Swagger, which is compatible with NestJS, for API documentation. Swagger is an open-source framework that simplifies the process of designing, documenting, and testing APIs. With Swagger, we can define our API endpoints, request parameters, response schemas, and more using a standardized format called OpenAPI Specification (OAS).

By integrating Swagger with NestJS, we automatically generate interactive API documentation that allows developers to explore and test our API endpoints directly from their web browsers. This documentation provides valuable insights into the available endpoints, their expected inputs and outputs, and any additional metadata such as authentication requirements.

Using Swagger with NestJS streamlines the API development process and ensures that our APIs are well-documented, making them easier to understand and consume for both internal and external stakeholders.

## Others
