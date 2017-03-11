import { IhealthccmsPage } from './app.po';

describe('ihealthccms App', function() {
  let page: IhealthccmsPage;

  beforeEach(() => {
    page = new IhealthccmsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
