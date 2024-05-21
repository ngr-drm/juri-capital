import { filterProcesses } from '../providers/pg-db/pg-repository';
import { batchCleaning, formatSearchFilters } from './fixtures';
import { ParamsToFilterProcesses } from './value-objects';

export async function findProcesses(params: Partial<ParamsToFilterProcesses>) {
  try {
    const formatedParams = formatSearchFilters(params);
    const processes = await filterProcesses(formatedParams);
    return batchCleaning(processes);
  } catch (error) {
    throw new Error(`there was a failure in the query -> ${error}`);
  }
}
