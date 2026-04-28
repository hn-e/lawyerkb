const Database = require("better-sqlite3");
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(
  __dirname,
  "../node_modules/@ansvar/india-law-mcp/data/database.db"
);

const DATA_DIR = path.join(__dirname, "../data/acts");

function generate() {
  const db = new Database(DB_PATH, { readonly: true });

  // Get all acts with provision counts
  const acts = db
    .prepare(
      `SELECT d.id, d.title, d.short_name, d.status, d.issued_date, d.in_force_date, d.url, d.description, COUNT(p.id) as provision_count
       FROM legal_documents d
       LEFT JOIN legal_provisions p ON d.id = p.document_id
       GROUP BY d.id
       ORDER BY d.issued_date DESC`
    )
    .all();

  // Write acts list
  const actsList = acts.map((a) => ({
    id: a.id,
    title: a.title,
    shortName: a.short_name,
    status: a.status,
    year: a.issued_date ? parseInt(a.issued_date.substring(0, 4)) : null,
    issuedDate: a.issued_date,
    provisionCount: a.provision_count,
  }));

  fs.writeFileSync(
    path.join(__dirname, "../data/acts-list.json"),
    JSON.stringify(actsList)
  );
  console.log(`Written ${actsList.length} acts to acts-list.json`);

  // Write individual act detail files
  fs.mkdirSync(DATA_DIR, { recursive: true });

  for (const act of acts) {
    const provisions = db
      .prepare(
        "SELECT id, document_id, provision_ref, chapter, section, title, content FROM legal_provisions WHERE document_id = ? ORDER BY id"
      )
      .all(act.id);

    const chapters = provisions.reduce(
      (acc, p) => {
        const ch = p.chapter || "Unchaptered";
        if (!acc[ch]) acc[ch] = [];
        acc[ch].push({
          section: p.section,
          title: p.title,
          provisionRef: p.provision_ref,
        });
        return acc;
      },
      {}
    );

    const detail = {
      id: act.id,
      title: act.title,
      shortName: act.short_name,
      status: act.status,
      issuedDate: act.issued_date,
      inForceDate: act.in_force_date,
      url: act.url,
      description: act.description,
      totalProvisions: provisions.length,
      chapters,
      provisions: provisions.map((p) => ({
        id: p.id,
        section: p.section,
        title: p.title,
        chapter: p.chapter,
        provisionRef: p.provision_ref,
        content: p.content,
      })),
    };

    fs.writeFileSync(
      path.join(DATA_DIR, `${act.id}.json`),
      JSON.stringify(detail)
    );
  }

  console.log(`Written ${acts.length} act detail files to data/acts/`);
  db.close();
}

generate();