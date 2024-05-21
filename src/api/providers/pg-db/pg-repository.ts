import { ParamsToFilterProcesses, Process } from '../../domain/value-objects';
import { pgPool } from './pg-connector';

export async function register(data: Process) {
  const client = await (await pgPool()).connect();
  const query = {
    text: `INSERT INTO processes("numeroProcesso", "classe", "sistema", "formato", "tribunal", 
    "dataUltimaAtualizacao", "grau", "dataAjuizamento", "movimentacoes", "assuntos") 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    values: [data.numeroProcesso, data.classe, data.sistema, data.formato, data.tribunal, data.dataUltimaAtualizacao, data.grau, data.dataAjuizamento, data.movimentacoes, data.assuntos],
  };
  const queryResult = await client.query(query);
  client.release();
  return queryResult.rows[0];
}

export async function findProcess(process: string) {
  const client = await (await pgPool()).connect();
  const query = {
    text: `SELECT * FROM processes WHERE "numeroProcesso" = $1`,
    values: [process],
  };
  const queryResult = await client.query(query);
  client.release();
  return queryResult.rows[0];
}

export async function filterProcesses(params: Partial<ParamsToFilterProcesses>) {
  const client = await (await pgPool()).connect();
  const query = {
    text: `SELECT * FROM processes 
    WHERE ("classe" = $1::TEXT ) OR ("assuntos" = ARRAY[$2::TEXT])
    OR ("dataAjuizamento" > $3::DATE)
    LIMIT ${params.limit} OFFSET (${params.limit}*${params.page}) - ${params.limit} `,
    values: [params.classe, params.assunto, params.dataAjuizamento],
  };
  const queryResult = await client.query(query);
  client.release();
  return queryResult.rows;
}
