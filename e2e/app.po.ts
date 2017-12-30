import { browser, element, by } from 'protractor';

export class KeytechSearchPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('kt-root h1')).getText();
  }
}
