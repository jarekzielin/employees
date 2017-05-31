import { EmployeePage } from './app.po';

describe('employee App', () => {
  let page: EmployeePage;

  beforeEach(() => {
    page = new EmployeePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
