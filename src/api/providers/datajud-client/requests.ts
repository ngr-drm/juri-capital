import { config } from './axios';
import { Body } from './shared';

export async function fetchByNumber(court: string, process: string) {
  const body: Body = {
    query: { match: { numeroProcesso: process } },
  };
  return await config().post(`${court}/_search`, body);
}
