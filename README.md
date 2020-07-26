# WebdriverIO - Mocha - Chai Page object model Framework

CircleCI Build Status: [![CircleCI](https://circleci.com/gh/nareshnavinash/webdriverio-mocha-chai-framework.svg?style=svg)](https://app.circleci.com/pipelines/github/nareshnavinash/webdriverio-mocha-chai-framework/)


Sanity run:
npm run test -- --mochaOpts.grep "sanity"

Headless run:
headless=true npm run test

Number of parallel runs:
threads=2 npm run test

Firefox run:
browser=firefox npm run test

Firefox headless:
headless=true browser=firefox npm run test

Generate RSA key for your password:
npm run create.secret <your_password>

Decrypt your RSA key:
npm run read.secret <your_RSA_key>

linter validate:
npm run lint

npm run lint -- --fix # auto fix

clearValue() - issue
https://github.com/webdriverio/webdriverio/issues/1140#issuecomment-663979205
