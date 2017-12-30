import { KeytechSearchPage } from './app.po';

describe('keytech-search App', () => {
  let page: KeytechSearchPage;

  beforeEach(() => {
    page = new KeytechSearchPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('kt works!');
  });
});
