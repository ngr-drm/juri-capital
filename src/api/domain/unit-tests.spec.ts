import { formatISO } from 'date-fns';
import { checkTheValidityOfTheProcess, formatDate, formatSearchFilters } from './fixtures';
import { ParamsToFilterProcesses } from './value-objects';
describe('fixtures', () => {
  it('should check if the process registration date in the database has not expired', () => {
    const currentDate = formatISO(new Date(2024, 4, 19));
    const registrationDate = '2024-03-19T00:00:00.000Z';
    const result = checkTheValidityOfTheProcess(currentDate, registrationDate);
    expect(result).toBeTruthy();
  });

  it('should format date sample as expected', () => {
    const sample = '2024-03-19T00:00:00.000Z';
    const result = formatDate(sample);
    expect(result).toEqual('19-03-2024');
  });

  it('should validate search filters', () => {
    expect.assertions(1);
    const params: Partial<ParamsToFilterProcesses> = {
      dataAjuizamento: '28-10-2018',
    };

    const newParams = formatSearchFilters(params);

    expect(newParams.dataAjuizamento).toEqual('2018-10-28');
  });
});
