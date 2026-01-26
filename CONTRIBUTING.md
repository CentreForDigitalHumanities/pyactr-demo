# Contributing

This document contains basic documentation for developing PyACT-R demo.

The application is designed as a web application based on [Angular 20](https://v20.angular.dev). Python code is run client-side using [Pyodide](https://pyodide.org/). The application does not use a database and does not rely on a backend server.

Because the project is generated from our team's [Cookiecutter web app](https://github.com/CentreForDigitalHumanities/cookiecutter-webapp-deluxe), it does include a Django backend project, which I have kept because it may be useful for compatability with our existing deployment script. I might remove it in the future.

## Before you start

You need to install the following software:

 - Python >= 3.11
 - virtualenv
 - WSGI-compatible webserver (deployment only)
 - [Visual C++ for Python][1] (Windows only)
 - Node.js >= 20.19
 - Yarn

[1]: https://wiki.python.org/moin/WindowsCompilers

## How it works

This project integrates two isolated subprojects, each inside its own subdirectory with its own code, package dependencies and tests:

 - **backend**: the server side web application based on [Django](https://www.djangoproject.com)
 - **frontend**: the client side web application based on [Angular](https://angular.dev)

As mentioned above, the backend is just for deployment. If you're reading this document, you will probably do all your work on the frontend application.

### Quickstart

First time after cloning this project:

```console
$ python bootstrap.py
```

Running frontend application (hit ctrl-C to stop):

```console
$ yarn start-front
```

### Commands for common tasks

The `package.json` in the project root defines several shortcut commands to help streamline development.

Install the pinned versions of all package dependencies in all subprojects:

```console
$ yarn
```

Run backend and frontend in [production mode][8]:

```console
$ yarn start-p
```

Run *all* tests (mostly useful for continuous integration):

```console
$ yarn test
```

Run an arbitrary command from within the root of a subproject:

```console
$ yarn back  [ARBITRARY BACKEND COMMAND HERE]
$ yarn front [ARBITRARY FRONTEND COMMAND HERE]
```

For example,

```console
$ yarn back less README.md
```

is equivalent to

```console
$ cd backend
$ less README.md
$ cd ..
```

Run `python manage.py` within the `backend` directory:

```console
$ yarn django [SUBCOMMAND] [OPTIONS]
```

`yarn django` is a shorthand for `yarn back python manage.py`.

Manage the frontend package dependencies:

```console
$ yarn fyarn (add|remove|upgrade|...) (PACKAGE ...) [OPTIONS]
```

### Development mode vs production mode

The purpose of development mode is to facilitate live development, as the name implies. The purpose of production mode is to simulate deployment conditions as closely as possible, in order to check whether everything still works under such conditions. A complete overview of the differences is given below.

dimension  |  Development mode  |  Production mode
-----------|--------------------|-----------------
command  |  `yarn start`  |  `yarn start-p`
base address  |  http://localhost:8000  |  http://localhost:4200
backend server (Django)  |  in charge of everything  |  serves backend only
frontend server (angular-cli)  |  serves  |  watch and build
static files  |  served directly by Django's staticfiles app  |  collected by Django, served by gulp-connect
backend `DEBUG` setting  |  `True`  |  `False`
backend `ALLOWED_HOSTS`  |  -  |  restricted to `localhost`
frontend sourcemaps  |  yes  |  no
frontend optimization  |  no  |  yes


## Deployment

Both the backend and frontend applications have a section dedicated to deployment in their own READMEs. You should read these sections entirely before proceeding. All instructions in these sections still apply, though it is good to know that you can use the following shorthand commands from the integrated project root:

```console

# collect static files of both backend and frontend, with overridden settings
$ yarn django collectstatic --settings SETTINGS --pythonpath path/to/SETTINGS.py
```

You should build the frontend before collecting all static files.
