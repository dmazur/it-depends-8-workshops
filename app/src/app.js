const { Client } = require('pg');

(async () => {

  const client = new Client();
  await client.connect();

  console.log('App started');

  const lastDateCheck = new Date();
  setInterval(async () => {
    console.log(`Polling DB, last check on ${lastDateCheck.toISOString()}`);
    const res = await client.query(`
      SELECT li.*, ca.*, cu.* FROM line_items li
      LEFT JOIN campaigns ca ON ca.id = li.campaign
      LEFT JOIN customers cu ON cu.id = ca.customer
      WHERE li.last_change > $1 OR ca.last_change > $1
    `, [lastDateCheck.toISOString()]);
    // console.log(res.rows)
  }, 1000);

})();
