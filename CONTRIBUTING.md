# Contributing

This document contains basic documentation for developing PyACT-R demo.

The application is designed as a web application based on [Angular 20](https://v20.angular.dev). Python code is run in the browser using [Pyodide](https://pyodide.org/). The application does not use a database and does not rely on a backend server.

## Recommended documentation

Below is a list of frameworks and libraries that you will encounter in the project, with a link to their documentation.

- [pyactr](https://github.com/jakdot/pyactr/wiki) - For obvious reasons
- [Angular](https://v20.angular.dev/) - Web application framework
- [Pyodide](https://pyodide.org/en/stable/) - Provides everything to run Python code in the browser.
- [Bootstrap](https://getbootstrap.com/) / [ng-bootstrap](https://ng-bootstrap.github.io/#/home) - Bootstrap is a UI toolkit. It provides the basic styling of the site, many useful CSS classes, and basic interactive UI widgets like dropdowns. Ng-bootstrap provides Bootstrap's interactive widgets as Angular components.
- [RxJS](https://rxjs.dev/) - Utilities to work with asynchronous events and callbacks. This has some overlap with [Angular signals](https://v20.angular.dev/guide/signals), but can be useful when you need more complicated logic. Feel free to use either, or both; whatever works for the job at hand.
- [Jasmine](https://jasmine.github.io/) - Framework to write tests for your code. Angular will generate a basic test when you create a new component/directive/service/etc., but writing extra tests can help make your code more robust.

If you are new to Angular, it's recommended that you follow [Angular's introductory tutorial](https://v20.angular.dev/tutorials/learn-angular). You should also have basic familiarity with pyactr.

As for the other libraries listed here, keep this list in the back of your mind and return to it when you need to.

## Requirements

You need to install the following software:

- Node 22 and yarn. See [download instructions for Node](https://nodejs.org/en/download). Select version 22, and select the option "with yarn".
- [Git](https://git-scm.com/)

Optional:

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

Compile the project:

```sh
ng build
```

This will compile the project for distribution and store it in the `dist/` directory.

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

## Git branches, releases, and deployment

The `develop` branch contains our working version, the `main` branch contains the "current" version of the app.

When you start working on a new feature or bugfix, create a new branch. Start the branch name with `feature/` or `bugfix/`. When the feature is done, create a pull request to merge the changes into the `develop` branch.

### Releasing a new version

Before publishing a new version of the app, create a release. That means you assign a version number to a pinned version of the source code (a git tag), and describe the changes in a release statement.

First, look up the latest version number and the decide the number for the next version. Version numbers consist of 3 counters, like "0.1.2". The first (the major version) will be 0 while we are in early development. As for the next version:
- If this change is only fixing bugs or security issues, improving performance, or making internal changes, it is a *patch*. Increase the third counter, e.g. 0.1.2-> 0.1.3.
- If this changes is adding or changing functionality for end users, increase the second counter and reset the third, e.g. 0.1.2 -> 0.2.0.

Then:
- Create a commit where you update the version number in `package.json`. Push this to the `develop` branch.
- Create a new release in Github. In the repository, select "create a new release". Create a new tag based on `develop` (see below). The name of a release tag should be the version number, e.g. `v0.1.2`. Add a description of the changes.
- Merge the `develop` branch into the `main` branch.
- Wait for the new version to go online. This happens automatically when commits are pushed to the `main` branch, through the [deploy workflow](.github/workflows/deploy.yml).

Should you need to roll back to a previous version, you can create a commit to revert the changes on the `main` branch.
