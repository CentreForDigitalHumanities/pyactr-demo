# Contributing

This document contains basic documentation for developing PyACT-R demo.

The application is designed as a web application based on [Angular 20](https://v20.angular.dev). Python code is run in the browser using [Pyodide](https://pyodide.org/). The application does not use a database and does not rely on a backend server.

## Before you start

You need to install the following software:

- Node 22 and yarn. See [download instructions for Node](https://nodejs.org/en/download). Select version 22, and select the option "with yarn".
- Git and Git-flow

You technically don't need Python to run the project, but it will probably be useful to set up a Python environment where you can experiment with pyactr.

### Quickstart

First time after cloning this project:

```sh
$ python bootstrap.py
```

Running development server (hit ctrl-C to stop):

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
