import { CampSitePage } from './app.po';

describe('camp-site App', () => {
  let page: CampSitePage;

  beforeEach(() => {
    page = new CampSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
