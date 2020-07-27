# WebdriverIO - Mocha - Chai Page object model Framework

This project is to create a Page Object Model (POM) framework for UI automation using WebdriverIO, Mocha with Chai assertion library. To follow the coding standards, ESLinter is addapted and Continuous Integration is achieved through CircleCI.


[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow.svg)](https://www.ruby-lang.org/en/)
[![StackOverflow](http://img.shields.io/badge/Stack%20Overflow-Ask-blue.svg)]( https://stackoverflow.com/users/10505289/naresh-sekar )
[![Contributions Welcome](https://img.shields.io/badge/Contributions-Welcome-brightgreen.svg)](CONTRIBUTING.md)
[![email me](https://img.shields.io/badge/Contact-Email-green.svg)](mailto:nareshnavinash@gmail.com)

# ![alt text](test/utilities/WebdriverIO-Mocha-Chai.png)


# BUILD STATUS [![CircleCI](https://circleci.com/gh/nareshnavinash/webdriverio-mocha-chai-framework.svg?style=svg)](https://app.circleci.com/pipelines/github/nareshnavinash/webdriverio-mocha-chai-framework/)

## Supports
* Multi browser automation
* Modes of run via CLI command
* Headless run
* Allure reports
* Jenkins Integration
* CircleCI Integration
* Docker Execution
* Failed Screenshots
* Tagging the tests
* Retries of failed tests
* Parallel Run
* ESLinter adapted
* `Node-RSA` Integration to safely check-in passwords to repo with public-private key combinations


## Setup
* Clone this repository
* Navigate to the cloned folder
* Install node and npm using `brew install node`
* Install the dependencies with respect to this project by `npm install`


## To Run the tests

To run the tests with the existing password checked-in to this repo (in `/test/configs/production.js`) one need to have `private.key` file under secret_keys folder. This is to decrypt the encoded password which is implemented using Node-RSA package. Or to simply run the tests in your postman account, replace the username and password values in the `/test/configs/production.js` file.

To run all the tests, one can try
```
npm run test
```
This will run all the tests that matches `/test/*.spec.js`

### Parallel run
If you have multiple specs to run at a time, one can specify the number of threads that can be open in a single run through,
```
threads=2 npm run test
```
In ideal case, one can open upto two browsers in headless mode with 1GB RAM. By default the thread value is set to 1, based on machine capacity one can decide to increase the threads.

### Headless run
To run the tests in headless mode,
```
headless=true npm run test
```
By default headless mode is forced if we run the tests in OS other than MAC and Windows. In Mac and Windows if you need to run the tests in headless mode then you can specify from the commandline as above.

### Multi-Browser run
To run the tests in a specific browser,
```
browser=chrome npm run test
browser=firefox npm run test
```
if no browser option is specified, chrome is forced by default. We can combine all the above modes of run by setting up the environment variable either from command line or while building a docker image.

### Running specific tests
In order to run specific tests,
```
npm run test -- --mochaOpts.grep "sanity"
```
This is achieved by leveraging mocha's CLI option, one can specify any string (in the place of 'sanity') to run that specific tests.

### Tagged run
Mocha doesn't provide any explicit option to specify tags for each tests, we are trying to leverage the above `Mocha's grep` CLI to achieve the tagging functionality. In each test description one has to specify whether the test is sanity or regression or both sanity & regression like,

```
describe('Enter Details in workspace form and cancel -> regression', () => {
    // Test description
}

// or

describe('Create a new Personal Workspace -> regression, sanity', () => {
    // Test description
}
```
So, To run the tests based on the tags, we can directly use `npm run test -- --mochaOpts.grep "sanity"` or `npm run test -- --mochaOpts.grep "regression"`.


## Reports
For better illustration on the testcases, allure report has been integrated. Allure reports can also be integrated with jenkins to get a dashboard view. Failed screenshots will be automatically attached to the allure report. Apart from allure, JSON & Junit reports has been integrated. JUnit report can be used to integrate in CI pipelines such as CircleCI, using which we can give integrated view for the test results. To view the sample CircleCI report one can check [Circle CI Sample Report](https://app.circleci.com/pipelines/github/nareshnavinash/webdriverio-mocha-chai-framework/58/workflows/d79d6d9e-7f83-469e-9d74-64b76a20f624/jobs/59/steps)

### Allure
To open the allure results,
```
npm run report
```
To get this command working, make sure allure commandline is installed in your machine or allure plugin in case of jenkins.

## Retries
By default retry is set to 1 in this framework, upon need one can change this default value by changing `var runTimeRetries = process.env.retry || 1` line in the wdio.conf.js file. WebdriverIO has multiple retry options at each test level that can be seen [here](https://webdriver.io/docs/retry.html)

## Node-RSA

### Why we need public-private key structure in Test automation?
While we are running tests, we need to store the login details for the application and we are going to use CI tools to run the same. This may lead to secuity breach if the credentials are out. So, to mitigate this we are taking public-private key encryption model. 

### How its done?
Apart from the methods that are created in `utilities/utilities.js` file, I have also created individual files that will help us while scripting. For example, lets start from fresh,

#### Generating public & private key files
To get the key files, run `node ./test/utilities/createPublicAndPrivatekey.js`, this will generate the key files and store in `./secret_keys` folder. 

#### Encrypt a password
Now, to encrypt the password, run `npm run create.secret <yourPassword>`, this will generate the encrypted key. Now store this key in your code which is ready to be checked in to the cloud repository.

#### Decrypt a password
In the tests, if you need to use the encrypted password, one can directly use `utilities.readSecrets(<encryptedKey>)`. This method will decrypt the password and return the original value. If normal string is given then the decryption process won't happen and in that case our tests won't fail since we have not encypted the password. After encryption if one has to validate the key run `npm run read.secret <encryptedKey>`.

#### Storing Public and Private Key
Now check-in the public key to your repository and store the private-key in a seperate storage like S3 which you feel is safe and then share the private key only to the trusted members.

#### Integration with CI
Now since the private key is stored with us, if we need to run this in cloud we can either place the private.key file in secret_keys folder manually or we can have the private key as a environment variable `privatekey`. This has been successfully implemented in CircleCI and validated this scenario.

## Linters
ESLint has been integrated with this project structure. This helps in maintaining common code structure when multiple people involved in working with the same base code. To check the linter errors, one can run `npm run lint`. Unlike linters in other languages ESLint provides an option to fix the errors automatically, this can be invoked by using `npm run lint -- --fix`.

## CircleCI Integration
This repo has been integrated with CircleCI to validate the linter check as well as run the tests in both chrome and firefox browser. All the configurations is specified in `circleci/config.yml`. I have taken a small docker image with 2GB RAM to run the tests. This is sufficient to run two parallel executions at a time.

### Issues faced with CircleCI Integration
* There are N number of docker images available for `circleci/node` selecting a single tag which will be sufficient to run all the tests took some time. All the iterations has been done with trial and error method with different docker images and finally settled with `circleci/node:dubnium-buster-browsers-legacy` image.
* In the docker while I run the tests, I found that `setValue()` doesn't clear the existing value and set a new value, but it appends the values to the existing values. Even if we give explicit `clearValue()` the values are not cleared.
* Seems that clearValue() is already reported [here](https://github.com/webdriverio/webdriverio/issues/1140#issuecomment-663979205) and got the workaround and have that method in `page.js` file. This workaround involved in sending backspace keys untill all the texts has been cleared from the text area.

## Jenkins Integration with Docker images
Get any of the linux with node docker image as the slaves in jenkins and use the same for executing the UI automation with this framework (Sample docker image - [Circle CI Node Docker Image with browsers](https://hub.docker.com/layers/circleci/node/dubnium-buster-browsers-legacy/images/sha256-eae98971c3073d77706eac5f04e0a568eac8806187f848043f66f5b9e23f763c?context=explore). From the jenkins bash Execute the following to get the testcases to run,
```
#!/bin/bash -l
npm list
ls
cd <path_to_the_project>
npm install
npm run test <or custom run option>
```

In Jenkins pipeline, try to add the following snippet to execute the tests,
```
pipeline {
    agent { docker { image 'circleci/node:dubnium-buster-browsers-legacy' } }
    stages {
        stage('build') {
            steps {
                sh 'cd project/'
                sh 'npm install'
                sh 'npm run test' # or custom methods
            }
        }
    }
}
```

## Breakdown in to testcases

### Adding page methods to the project

1. Add page specific methods inside the `pages` folder structure. Name the page files with `<spec_name>.pages.js` so that we wont get confused with the file functionality. All the page files extends to the Page class, where we can hold any common methods that are needed across the page files.

```
class Toast extends Page {
  get toastTitle() {return $('.pm-toast-title');}

  isDisplayed() {
    this.toastBody.waitForExist(30000);
    return this.toastBody.isExisting();
  }
}
```

### Adding locator methods to the project 

1. Add locators inside the page file. For static locator one can use the getter method and declare the values as 

```
get toastTitle() {return $('.pm-toast-title');}
```

2. For dynamic locator, we need to declare them as a method and call them within the page functions as,

```
// Declare
newWorkspaceTypeToggle(text) {return $('.pm-toggle-switch__item=' + text);}

// Use
this.newWorkspaceTypeToggle(type).click();
```

### Creating a new spec file in the project

Spec files are generally crafted according to our needs, but few of the common practices are,

* Have a global `describe` in your spec file which describes your spec file as a whole.
* Have a sub `describe` to describe your current test case
* Have multiple `it` inside the describe file, this ensures that proper error message is thrown if the tests are failed
* Have all the assetions with custom message, since `expected: true, actual: false` default messages are not much helpful.
* This will ensure that the allure reports as well will have a proper structure.

## Built With

* [WebdriverIO](https://webdriver.io/) - To support browser actions
* [Mocha](https://mochajs.org/) - Core Test Framework
* [Chai](https://www.chaijs.com/) - Assertion Library
* [Allure](https://www.npmjs.com/package/@wdio/allure-reporter) - For Detailed reporting.

## Contributing

1. Clone the repo!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Create a pull request.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on code of conduct, and the process for submitting pull requests.

## Authors

* **[Naresh Sekar](https://github.com/nareshnavinash)**

## License

This project is licensed under the GNU GPL-3.0 License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* To all the open source contributors whose code has been referred in this project.
