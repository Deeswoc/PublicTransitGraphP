var http = require('http');
const neo = require('neo4j-driver');
const driver = neo.v1.driver("bolt://localhost", neo.v1.auth.basic("Testing", "12345678"));
const session = driver.session();
const personName = 'Alice';
const resultPromise = session.run(
  'CREATE (a:Person {name: $name}) RETURN a',
  {name: personName}
);

resultPromise.then(result => {
  session.close();

  const singleRecord = result.records[0];
  const node = singleRecord.get(0);

  console.log(node.properties.name);

  // on application exit:
  driver.close();
});