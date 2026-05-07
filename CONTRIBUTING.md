# Contributing

This document contains basic documentation for developing PyACT-R demo.

The application is designed as a web application based on [Angular 20](https://v20.angular.dev). Python code is run in the browser using [Pyodide](https://pyodide.org/). The application does not use a database and does not rely on a backend server.

## Recommended documentation

Below is a list of frameworks and libraries that you will encounter in the project, with a link to their documentation.

- [pyactr](https://github.com/jakdot/pyactr/wiki) - For obvious reasons
- [Angular](https://v20.angular.dev/) - Web application framework
- [Pyodide](https://pyodide.org/en/stable/) - Provides everything to run Python code in the browser.
- [Bootstrap](https://getbootstrap.com/) / [ng-bootstrap](https://ng-bootstrap.github.io/#/home) - Bootstrap is a UI toolkit. It provides the basic styling of the site, many useful CSS classes, and basic interactive UI widgets like dropdowns. Ng-bootstrap provides Bootstrap's interactive widgets as Angular components.
- [RxJS](https://rxjs.dev/) - Utilities to work with asynchronous events and callbacks. This has some overlap with [Angular signals](https://v20.angular.dev/guide/signals), but can be useful when you need more complicated logic.
- [Jasmine](https://jasmine.github.io/) - Framework to write tests for your code. Angular will generate a basic test when you create a new component/directive/service/etc., but writing extra tests can help make your code more robust.

If you are new to Angular, it's recommended that you follow [Angular's introductory tutorial](https://v20.angular.dev/tutorials/learn-angular). You should also have basic familiarity with pyactr.

As for the other libraries listed here, keep this list in the back of your mind and return to it when you need to.

## Requirements

You need to install the following software:

- Node 22 and yarn. See [download instructions for Node](https://nodejs.org/en/download). Select version 22, and select the option "with yarn".
- [Git](https://git-scm.com/)

Optional:

- Gitflow (command-line interface to streamline creating git branches and releases)
- A Python environment with [pyactr](https://pypi.org/project/pyactr/) installed. This isn't required to work with the application, but you may find it useful to set up a sandbox environment for yourself.

## Running the project

You will need a working internet connection while running the project.

First time after cloning this project, use `yarn` to install dependencies:

```sh
yarn
```

Then start a development server with:

```sh
$ yarn start
```

Once this is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload when you modify the source code.

### Commands for common tasks

Install the pinned package versions:

```sh
$ yarn
```

Run unit tests:

```sh
$ yarn test
```

Build the project:

```sh
ng build
```

This will compile the project and store it in the `dist/` directory.

Scaffold a new component:

```sh
yarn ng generate component component name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
yarn ng generate --help
```

For more information, see:

- [Managing dependencies with Yarn](https://classic.yarnpkg.com/en/docs/managing-dependencies)
- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
