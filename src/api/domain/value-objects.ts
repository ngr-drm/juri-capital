export type Court = {
  court: string;
};

export type Process = {
  id?: string;
  numeroProcesso: string;
  classe: string;
  sistema: string;
  formato: string;
  tribunal: string;
  dataUltimaAtualizacao: string;
  grau: string;
  dataAjuizamento: string;
  movimentacoes: Movements[];
  assuntos: string[];
  createdAt?: string;
};

export type Movements = {
  nome: string;
  data: string;
};

export type BodyToRegisterProcess = {
  processo: string;
};

export type ParamsToFilterProcesses = {
  classe: string;
  assunto: string;
  dataAjuizamento: string;
  page: string;
  limit: string;
};
