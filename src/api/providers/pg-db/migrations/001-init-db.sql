CREATE TABLE IF NOT EXISTS processes (
  "id" UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  "numeroProcesso" TEXT NOT NULL,
  "classe" TEXT NOT NULL,
  "sistema" TEXT NOT NULL,
  "formato" TEXT NOT NULL,
  "tribunal" TEXT NOT NULL,
  "dataUltimaAtualizacao" DATE NOT NULL,
  "grau" TEXT NOT NULL,
  "dataAjuizamento" DATE NOT NULL,
  "movimentacoes" JSONB[] NOT NULL,
  "assuntos" TEXT[] NOT NULL,
  "createdAt" DATE NOT NULL DEFAULT CURRENT_DATE
)




