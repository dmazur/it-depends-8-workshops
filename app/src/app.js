const { Client } = require('pg');
const kafka = require('kafka-node');
// TODO: put it in the place of the starting point as well
const VeryImportantCampaignUpdateFunction = require('./campaign-manager');

(async () => {

  // const client = new Client();
  // await client.connect();

  // console.log('App started');

  // const lastDateCheck = new Date();
  // setInterval(async () => {
  //   console.log(`Polling DB, last check on ${lastDateCheck.toISOString()}`);
  //   const res = await client.query(`
  //     SELECT li.*, ca.*, cu.* FROM line_items li
  //     LEFT JOIN campaigns ca ON ca.id = li.campaign
  //     LEFT JOIN customers cu ON cu.id = ca.customer
  //     WHERE li.last_change > $1 OR ca.last_change > $1
  //   `, [lastDateCheck.toISOString()]);
  //   // console.log(res.rows)
  // }, 1000);

  const client = new kafka.KafkaClient({kafkaHost: 'kafka:9092'});

  const topics = [
    { topic: 'dbserver1.campaigns.line_items' }
  ];
  
  const options = {
    autoCommit: true,
  };

  const kafkaConsumer = new kafka.Consumer(client, topics, options);

  kafkaConsumer.on('message', async function(message) {
    console.log('Message received:', message);
  });
  console.log('App started');


  // we know when something was removed
  // we get the previous value
  // no time problems / incosistencies
  // no updated_at fields
  // we get the exact time of a change


})();
