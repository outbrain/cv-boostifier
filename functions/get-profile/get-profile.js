const faunadb = require('faunadb');
const utils = require('../utils');

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_DB_SECRET
});

exports.handler = async (event) => {
  try {
    const { id } = event.queryStringParameters;
    const data = await getData(id);

    return {
      statusCode: 200,
      body: JSON.stringify({ data })
    }
  } catch (err) {
    console.log(err);
    return { statusCode: 500, body: err.toString() }
  }
};

async function getData(id) {
  const { data } = await client.query(q.Get(q.Match(q.Index('resumes_by_id'), encodeURIComponent(id))));
  return {
    data: utils.decrypt(data.encryptedData),
    theme: data.theme
  };
}
