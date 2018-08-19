function generatePostgresqlObject() {
  const local = String(process.env.DATABASE_URL).indexOf('localhost') !== -1

  const adapter = 'sails-postgresql';
  const url = local ? undefined : process.env.DATABASE_URL;
  const address = local ? process.env.DATABASE_URL : undefined;
  const ssl = !local;
  const database = local ? 'sails_todo' : undefined;

  const pgObject = { adapter, url, address, ssl, database };
  return pgObject;
}

module.exports.connections = {
  somePostgresqlServer: generatePostgresqlObject(),
};