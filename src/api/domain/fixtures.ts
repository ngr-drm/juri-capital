import { Movements, ParamsToFilterProcesses, Process } from './value-objects';
import { differenceInMonths, format } from 'date-fns';

export function normalize(reply: any) {
  const serelizedReply = JSON.parse(JSON.stringify(reply.data));
  if (serelizedReply.hits.hits.length === 0) return;

  const source = serelizedReply.hits.hits[0]['_source'];

  const normalizedReply: Process = {
    numeroProcesso: source.numeroProcesso,
    classe: source.classe.nome,
    sistema: source.sistema.nome,
    formato: source.formato.nome,
    tribunal: source.tribunal,
    dataUltimaAtualizacao: source.dataHoraUltimaAtualizacao,
    grau: source.grau,
    dataAjuizamento: source.dataAjuizamento,
    movimentacoes: source.movimentos,
    assuntos: serializeSubjects(source.assuntos),
  };

  return normalizedReply;
}

export function finalReply(process: Process) {
  process.dataUltimaAtualizacao = formatDate(process.dataUltimaAtualizacao);
  process.dataAjuizamento = formatDate(process.dataAjuizamento);
  process.movimentacoes = serializeMovements(process.movimentacoes);
  return process;
}

export function formatDate(date: string) {
  const ref = new Date(date).toISOString();
  return format(ref.split('Z')[0], 'dd-MM-yyyy');
}

export function checkTheValidityOfTheProcess(currentDate: string, registrationDate: string) {
  const maximumPeriod = 2; // two months;
  const result = differenceInMonths(currentDate, registrationDate);
  return result <= maximumPeriod;
}

export function cleaning(storedProcess: Process) {
  delete storedProcess.id;
  delete storedProcess.createdAt;
  return storedProcess;
}

export function batchCleaning(storedProcesses: Process[]) {
  const processes: Process[] = [];

  storedProcesses.forEach((element) => {
    const process = finalReply(element);
    processes.push(cleaning(process));
  });
  return processes;
}

export function formatSearchFilters(params: Partial<ParamsToFilterProcesses>) {
  if (params.dataAjuizamento) {
    const ref = params.dataAjuizamento.split('-');
    params.dataAjuizamento = `${ref[2]}-${ref[1]}-${ref[0]}`;
  }
  return params;
}

function serializeMovements(data: any[]) {
  const serializedMovements: Movements[] = [];

  data.forEach((element) => {
    serializedMovements.push({ nome: element.nome, data: formatDate(element.dataHora) });
  });

  return serializedMovements;
}

function serializeSubjects(data: any[]) {
  const serializedSubjects: string[] = [];

  data.forEach((element) => {
    serializedSubjects.push(element.nome);
  });
  return serializedSubjects;
}
