const utilities= require("./test/utilities/utilities");
const chai = require('chai');
const allure = require('@wdio/allure-reporter').default;


// Getting config value from the run time
// This is the configuration file where we need to specify the URL against which the tests has to run
// Can use this to run against different environment using the same suite
var file_name = process.env.target || 'production'
const config = require('./test/configs/' + file_name + '.json');
console.log('-'.repeat(50) + 'Taking the following config setup to run' + '-'.repeat(50))
console.log(config)
console.log('-'.repeat(146))


// If the tests are running apart from mac or windows forcing headless mode of run
var headless = process.env.headless || false
if (process.platform != 'darwin' && process.platform != 'win32') {
    headless = true
}


// Retries count
var runTimeRetries = process.env.retry || 0


// Setting browser arguments based on the mode of run
let chrome_browser_args = {}
let firefox_browser_args = {}
if (headless) {
    chrome_browser_args = ['--headless', '--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage', '--window-size=1200,700']
    firefox_browser_args = ["-headless"]
} else {
    chrome_browser_args = ['--disable-dev-shm-usage', '--window-size=1200,700']
    firefox_browser_args = []
}


// Setting browser capabilities based on the user input on broser
// If the brower input is not present, chrome is forced
// If ther browser input has unsupported browser, chrome is forced
var runTimeBrowser = process.env.browser || 'chrome'
var maxBrowserInstance = process.env.threads || 1
let runTimeCapabilities = null
let runTimeServices = null
if (runTimeBrowser == 'chrome') {
    runTimeServices = ['chromedriver']
    runTimeCapabilities = [{
        maxInstances: maxBrowserInstance,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: chrome_browser_args
        }
    }]
} else if (runTimeBrowser == 'firefox') {
    runTimeServices = ['geckodriver']
    runTimeCapabilities = [{
        maxInstances: maxBrowserInstance,
        browserName: 'firefox',
        "moz:firefoxOptions":{
            args: firefox_browser_args
        }
    }]
} else {
    console.log('Browser is undefined, using chrome browser to run the tests')
    runTimeServices = ['chromedriver']
    runTimeCapabilities = [{
        maxInstances: maxBrowserInstance,
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: chrome_browser_args
        }
    }]
}


// Max time for single test case execution
let timeout = process.env.DEBUG ? 99999999 : 120000;
let elementTimeout = 20000;


exports.config = {
    //
    // ====================
    // Runner Configuration
    // ====================
    //
    // WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
    // on a remote machine).
    runner: 'local',
    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //
    specs: [
        './test/specs/**/*.spec.js'
    ],
    // Patterns to exclude.
    exclude: [
        'path/to/excluded/files'
    ],
    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude options in
    // order to group specific specs to a specific capability.
    //
    // First, you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
    // set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property handles how many capabilities
    // from the same test should run tests.
    //
    maxInstances: 10,
    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    // capabilities: [{

    //     // maxInstances can get overwritten per capability. So if you have an in-house Selenium
    //     // grid with only 5 firefox instances available you can make sure that not more than
    //     // 5 instances get started at a time.
    //     maxInstances: 3,
    //     //
    //     browserName: 'chrome',
    //     'goog:chromeOptions': {
    //         args: chrome_browser_args
    //     }
    //     // If outputDir is provided WebdriverIO can capture driver session logs
    //     // it is possible to configure which logTypes to include/exclude.
    //     // excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
    //     // excludeDriverLogs: ['bugreport', 'server'],
    // }],
    capabilities: runTimeCapabilities,
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Set specific log levels per logger
    // loggers:
    // - webdriver, webdriverio
    // - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
    // - @wdio/mocha-framework, @wdio/jasmine-framework
    // - @wdio/local-runner, @wdio/lambda-runner
    // - @wdio/sumologic-reporter
    // - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    // logLevels: {
    //     webdriver: 'info',
    //     '@wdio/applitools-service': 'info'
    // },
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,
    //
    // Set a base URL in order to shorten url command calls. If your `url` parameter starts
    // with `/`, the base url gets prepended, not including the path portion of your baseUrl.
    // If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
    // gets prepended directly.
    // baseUrl: 'http://uitestingplayground.com',
    //
    // Default timeout for all waitFor* commands.
    waitforTimeout: elementTimeout,
    //
    // Default timeout in milliseconds for request
    // if browser driver or grid doesn't send response
    connectionRetryTimeout: 90000,
    //
    // Default request retries count
    connectionRetryCount: 3,
    //
    // Test runner services
    // Services take over a specific job you don't want to take care of. They enhance
    // your test setup with almost no effort. Unlike plugins, they don't add new
    // commands. Instead, they hook themselves up into the test process.
    // services: ['chromedriver',
    //     // ['selenium-standalone', {
    //     //     logPath: 'logs',
    //     //     installArgs: {
    //     //         drivers: {
    //     //             chrome: { version: '79.0.3945.88' },
    //     //             firefox: { version: '0.26.0' }
    //     //         }
    //     //     },
    //     //     args: {
    //     //         drivers: {
    //     //             chrome: { version: '79.0.3945.88' },
    //     //             firefox: { version: '0.26.0' }
    //     //         }
    //     //     },
    //     // }]
    // ],
    services: runTimeServices,
    // Framework you want to run your specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed
    // before running any tests.
    framework: 'mocha',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    specFileRetries: runTimeRetries,
    //
    // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
    // specFileRetriesDeferred: false,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html
    reporters: [
      'spec',
      ['allure', {
        outputDir: 'reports/allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      }],
      ['junit', {
        outputDir: 'reports/junit',
        outputFileFormat: function(options) {
          return 'test-' + runTimeBrowser + '-results.xml'
        }
      }],
        ['json',{
            outputDir: './reports/json'
        }]
    ],

    //
    // Options to be passed to Mocha.
    // See the full list at http://mochajs.org/
    mochaOpts: {
        ui: 'bdd',
        timeout: timeout,
        require: ['@babel/register']
    },
    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
    // it and to build services around it. You can either apply a single function or an array of
    // methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
        utilities.removeDirectory('./reports/allure-results/')
        utilities.removeDirectory('./reports/json/')
        utilities.removeDirectory('./reports/junit/')
        utilities.removeDirectory('./reports/screenshot/')
    },
    /**
     * Gets executed before a worker process is spawned and can be used to initialise specific service
     * for that worker as well as modify runtime environments in an async fashion.
     * @param  {String} cid      capability id (e.g 0-0)
     * @param  {[type]} caps     object containing capabilities for session that will be spawn in the worker
     * @param  {[type]} specs    specs to be run in the worker process
     * @param  {[type]} args     object that will be merged with the main configuration once worker is initialised
     * @param  {[type]} execArgv list of string arguments passed to the worker process
     */
    // onWorkerStart: function (cid, caps, specs, args, execArgv) {
    // },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    // beforeSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before: function (capabilities, specs) {
        global.allure = allure;
        global.chai = chai;
        global.utilities = utilities;
        global.config = config;
        global.assert = chai.assert;
    },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    // beforeCommand: function (commandName, args) {
    // },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    beforeSuite: function (suite) {
        allure.addFeature(suite.name);
    },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) starts.
     */
    beforeTest: function (test, context) {
        allure.addEnvironment("BROWSER", browser.capabilities.browserName);
        allure.addEnvironment("BROWSER_VERSION", browser.capabilities.version);
        allure.addEnvironment("PLATFORM", browser.capabilities.platform);

    },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    // beforeHook: function (test, context) {
    // },
    /**
     * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
     * afterEach in Mocha)
     */
    // afterHook: function (test, context, { error, result, duration, passed, retries }) {
    // },
    /**
     * Function to be executed after a test (in Mocha/Jasmine).
     */
    afterTest: function(test, context, { error, result, duration, passed, retries }) {
        if (error !== undefined) {
            try {
                //TODO: Fix allure reporting on failure
                utilities.takeScreenshot(test.title, true)
            } catch {
                console.log('>> Capture Screenshot Failed!');
            }
        }
    },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    // afterSuite: function (suite) {
    // },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    // afterCommand: function (commandName, args, result, error) {
    // },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // after: function (result, capabilities, specs) {
    // },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    // afterSession: function (config, capabilities, specs) {
    // },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: function(exitCode, config, capabilities, results) {
        try {
            const mergeResults = require('wdio-json-reporter/mergeResults');
            mergeResults('./reports/json', 'wdio-*', 'testResults.json');
        } catch(e) {
            console.log("Errored while merging the json results " + e)
        }
    },
    /**
    * Gets executed when a refresh happens.
    * @param {String} oldSessionId session ID of the old session
    * @param {String} newSessionId session ID of the new session
    */
    //onReload: function(oldSessionId, newSessionId) {
    //}
}