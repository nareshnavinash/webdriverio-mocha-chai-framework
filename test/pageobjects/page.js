/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
module.exports = class Page {
  /**
  * Opens a sub page of the page
  * @param {string} path of the sub page (e.g. /path/to/page.html)
  * @return {string}
  */
  open(path='') {
    return browser.url(config.url + path);
  }

  /**
  * Clears text from the textbox or text area, since clearValue() in webdriverio has an issue while running in docker (debetian OS)
  * @param {string} element element from which the texts has to be removed
  * @return {void} returns nothing
  */
  emptyTextField(element) {
    const valueLength = element.getValue().length;
    const backSpaces = new Array(valueLength).fill('Backspace');
    element.setValue(backSpaces);
  }
};
