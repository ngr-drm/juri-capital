import { formatISO } from 'date-fns';
import { fetchByNumber } from '../providers/datajud-client/requests';
import { findProcess, register } from '../providers/pg-db/pg-repository';
import { checkTheValidityOfTheProcess, normalize, cleaning, finalReply } from './fixtures';

export async function fetchByProcessNumber(court: string, process: string) {
  try {
    const storedProcess = await findProcess(process);
    if (storedProcess) {
      const isValid = checkTheValidityOfTheProcess(formatISO(new Date()), storedProcess.createdAt);
      if (isValid) {
        return cleaning(finalReply(storedProcess));
      }
    }
    const reply = await fetchByNumber(court, process);
    const normalizedReply = normalize(reply);

    if (!normalizedReply) return;

    await register(normalizedReply);

    return finalReply(normalizedReply);
  } catch (error) {
    throw new Error(`one of the providers has failed -> ${error}`);
  }
}
