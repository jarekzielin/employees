import { Employee } from './employee';

describe('Employee', () => {

  [
    {
      firstName: undefined,
      lastName: undefined,
      expectedFirstName: '',
      expectedLastName: '',
      expectedFullName: ' '
    },
    {
      firstName: 'Luke',
      lastName: 'Skywalker',
      expectedFirstName: 'Luke',
      expectedLastName: 'Skywalker',
      expectedFullName: 'Luke Skywalker'
    },
    {
      firstName: 'Frodo',
      lastName: undefined,
      expectedFirstName: 'Frodo',
      expectedLastName: '',
      expectedFullName: 'Frodo '
    }
  ].forEach((tc, i) => {

    it(`should create new instance of Employee - case ${i}`, () => {

      const employee = new Employee(tc.firstName, tc.lastName);

      expect(employee.firstName).toEqual(tc.expectedFirstName);
      expect(employee.lastName).toEqual(tc.expectedLastName);
      expect(employee.getFullName()).toEqual(tc.expectedFullName);
    });

  });

});
