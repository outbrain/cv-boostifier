export const createDb = (alasql: any, resume: any) => {
  const db = new alasql.Database();
  Object.keys(resume).forEach(table => {
    let sql: string;
    const obj = Array.isArray(resume[table]) ? resume[table][0] : resume[table];
    const fields = obj && Object.keys(obj);
    const dbTableName = table === 'references' ? 'refs' : table;
    if (fields && fields.length) {
      const fieldsStr = fields.map(field => `${field} string`).join(', ');
      sql  = `CREATE TABLE ${dbTableName} (${fieldsStr})`;
    } else {
      sql  = `CREATE TABLE ${dbTableName} (_ string)`;
    }
    db.exec(sql);
    db.tables[dbTableName].data = Array.isArray(resume[table]) ? resume[table] : [resume[table]];
  });

  console.log('DB initialized!');

  return db;
};
