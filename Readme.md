# recs-template-sdk
Recommendations Template SDK


## Install dependencies
We are using yarn to manage node modules.

Install [node](https://nodejs.org/en/download/), then run:
```bash
$ npm install -g yarn
```

```bash
$ yarn install
```

### First-time use

## Setting endpoint url
Update the development and production environment endpoint settings in src/environment.js

## Start the mock backend server if actual backend server is not running locally
## Open a new terminal
```bash
$ cd mock-server
$ yarn install
$ yarn start
```

## Running locally

```bash
$ yarn dev
```
Creates a minified bundle with development mode environment. File will be build/unbxd_recs_template_sdk_dev.js

```bash
$ yarn start
```
Will start the application, which can be viewed on http://localhost:9000

## Build
Runs bundler output to build. This will create a production build
```bash
$ yarn build
```

The build file that has to be used as an external script file will be build/unbxd_recs_template_sdk.js
