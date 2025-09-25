# mkwd13-wdel-ng-net

# Build pizza app! with ANGULAR, .NET8 and POSTGRESQL

## Module plan

1. [Angular] Initializing Angular Project, Creating Components, Routing, Directives, Modules
2. [Angular] Services, Dependency Injection, Lifecycle Methods, Custom Pipes, Custom Directives, Inputs, Outputs
3. [Angular] Forms, Reactive Forms, Form Validation, Observables, Pipes
4. [.NET] Getting familiar with c# .NET, Initializing and setting new Project, explainig design pattern and how it works, basic OOP knowledge, setting up PGAdmin
5. [.NET] Login Register with Identity - explaining services, extension methods, Custom exceptions, JWT, Password Hashing
6. [.NET] Creating Pizza Endpoint - Mappings, Dtos, Automapper
7. [.NET] Creating Order Endpoint - Connecting with pizza
8. [.NET] Finishing Endpoints logic, SOLID, DRY, KISS, organizing program.cs with best practises
9. [Angular] Authentication, Guards, Interceptors
10. [Angular] HTTP Client, RXJS Operators, Error Handling

## FRONTEND PART CONFIG

### Init Angular project

1. Install NodeJS - https://nodejs.org/en/download/ (used only the first time) [LTS version]
   - Install a LTS version of node (preferably v20 or above)
   - Confirm installation by running - `node -v` in terminal.
2. Along with node, npm should be installed. Check if npm is installed by running `npm -v` in terminal. It should return a value (ex.10.14.15).
   - If npm is not installed run the following command in terminal `npm install -g npm@latest` and then check the version by running `npm -v`.
3. Install Angular CLI - `npm install -g @angular/cli` (used only the first time)
   - For our project we will need the latest version of the Angular CLI which is version 20, but since it was released just week ago, we will stick to the stable version 18.
     - Even Major Versions: These were often considered more stable, production-ready releases. They typically focused on refinement, bug fixes, and performance improvements, building upon features introduced in previous versions.
     - Odd Major Versions: These releases sometimes introduced more experimental features, significant architectural changes, or preview versions of upcoming functionalities. They could be seen as stepping stones towards the next stable, even-numbered release, where these features would be refined and stabilized.
   - If you want to specify an exact version, you can add that in the command - `npm install -g @angular/cli@18`
   - Run `ng version` to check if it's installed
4. Create a new folder for the project and open the folder in VS Code
5. Open terminal and create new project - `ng new name-of-the-project`
   1. Would you like to add Angular routing? - Y - we will need this setting to enhance navigation by allowing users to move between different views or pages seamlessly.
   2. Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? - N - SSR means that the server processes your application, generates the HTML for the page, and sends it to the client. SSG means that pages are pre-rendered at build time, allowing them to be served as static HTML.
   3. Which stylesheet format would you like to use? - SCSS - Angular offers different pre-processors and stylesheets to choose from. We will be using SCSS which extends CSS with variables, nested rules, and more powerful mixins
   4. Would you like to share pseudonymous usage data about this project with the Angular Team
      at Google (not important) - N
6. Navigate to newly created folder for project `cd client` - if you used a different name than client, change "client" with the name of the folder that was created while using `ng new <THE_NAME>`
7. Run app `npm start`
8. Open project in browser - http://localhost:4200

### Install Angular Material

1. Install Angular Material - `ng add @angular/material`
2. Choose a prebuilt theme name (ex. the first one), or "custom" for a custom theme (custom requires additional setup with SCSS variables https://material.angular.io/guide/theming)
3. Set up global Angular Material typography styles - Y
4. Include the Angular animations module? - Include and enable animations

### Using Angular CLI

1. Create component - `ng generate component components/<NAME_OF_COMPONENT> --standalone`
2. Create service - `ng generate service services/<NAME_OF_SERVICE>`
3. Create guard - `ng generate guard guards/<NAME_OF_GUARD>`
4. Create pipe - `ng generate pipe pipes/<NAME_OF_PIPE> --standalone`
5. Create directive - `ng generate directive directives/<NAME_OF_DIRECTIVE> --standalone`
6. skip tests (this is added to each of the previous commands to prevent creating unnecessary .spec files) - `--skip-tests`

### Useful links

- https://angular.io/
- https://material.angular.io/
- https://rxjs.dev/api

### Useful VS Code Extensions (Angular related)

- AutoImport https://marketplace.visualstudio.com/items?itemName=steoates.autoimport
- Angular Language Service https://marketplace.visualstudio.com/items?itemName=Angular.ng-template

---

## BACKEND PART CONFIG

1. Install visual studio 2022 - `STEP BY STEP GUIDE => https://learn.microsoft.com/en-us/visualstudio/install/install-visual-studio?view=vs-2022`

2. Install and set up PostgreSQL and PGAdmin4 - `STEP BY STEP GUIDE => https://commandprompt.com/education/how-to-download-and-install-postgresql/`

## Entity Framework commands

1. add-migration initial => (where initial is custom name for the migration, can be anything)
2. update-database => applies the current migration on the database

## TRAINER CONTACT

- Aneta Stankovska - anetastankovskaane@gmail.com
- Todor Pelivanov - tpelivanov@gmail.com
