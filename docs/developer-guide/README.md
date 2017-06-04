# Developer Guide

## The Build Environment

You need Nodejs and grunt-cli installed globally to build MolassOS. You can install NodeJs from [their website](https://nodejs.org/en/) but I would highly recommend using HomeBrew to install it.

```bash
> brew update
> brew install node
> node -v
v8.0.0
> npm -v
5.0.1
> npm install -g grunt-cli
```

## Building

The tests do not take long to run so the default task builds and tests the application.

```bash
> pwd
/path/to/your/local/MolassOS/
> npm update 
> npm install grunt 
> grunt
```

[for a more detailed description of the build process](//building-developer-guidebuildingmd.md)

## Unit Tests

Units tests are run using Jasmine. The grunt task 'jasmine' will run all the tests in the test/ folder with the extension .spec.js. The jasmine task is run by default when you build the project because they only take a few seconds to run.

