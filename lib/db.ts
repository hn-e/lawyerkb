import Database from "better-sqlite3";
import path from "path";

const DB_PATH = path.join(
  process.cwd(),
  "node_modules/@ansvar/india-law-mcp/data/database.db"
);

const globalForDb = globalThis as unknown as { _db: Database.Database };

const db = globalForDb._db || new Database(DB_PATH, { readonly: true });

if (process.env.NODE_ENV !== "production") globalForDb._db = db;

export interface LegalDocument {
  id: string;
  title: string;
  short_name: string | null;
  status: string;
  issued_date: string | null;
  in_force_date: string | null;
  url: string | null;
  description: string | null;
}

export interface LegalProvision {
  id: number;
  document_id: string;
  provision_ref: string;
  chapter: string | null;
  section: string;
  title: string | null;
  content: string;
}

export function getActs(search?: string): (LegalDocument & { provision_count: number })[] {
  const sql = `
    SELECT d.*, COUNT(p.id) as provision_count
    FROM legal_documents d
    LEFT JOIN legal_provisions p ON d.id = p.document_id
    ${search ? "WHERE d.title LIKE ? OR d.short_name LIKE ?" : ""}
    GROUP BY d.id
    ORDER BY d.issued_date DESC
  `;
  const params = search ? [`%${search}%`, `%${search}%`] : [];
  return db.prepare(sql).all(...params) as (LegalDocument & { provision_count: number })[];
}

export function getAct(id: string): LegalDocument | undefined {
  return db.prepare("SELECT * FROM legal_documents WHERE id = ?").get(id) as LegalDocument | undefined;
}

export function getProvisions(documentId: string): LegalProvision[] {
  return db
    .prepare("SELECT * FROM legal_provisions WHERE document_id = ? ORDER BY id")
    .all(documentId) as LegalProvision[];
}

export function searchProvisions(query: string, limit = 20) {
  const sql = `
    SELECT p.*, d.title as document_title, d.short_name as document_short_name
    FROM provisions_fts f
    JOIN legal_provisions p ON f.rowid = p.id
    JOIN legal_documents d ON p.document_id = d.id
    WHERE provisions_fts MATCH ?
    ORDER BY bm25(provisions_fts) ASC
    LIMIT ?
  `;
  return db.prepare(sql).all(query, limit);
}