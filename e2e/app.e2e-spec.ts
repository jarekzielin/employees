import { EmployeePage } from './app.po';

describe('employee App', () => {
  let page: EmployeePage;

  beforeEach(() => {
    page = new EmployeePage();
  });

  it('should display h1 text', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Employees');
  });
});
