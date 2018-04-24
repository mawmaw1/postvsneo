const neo4j = require('neo4j-driver').v1;

const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "class"));

var session = driver.session();
console.time("Neo time");
console.log("Starting Neoqueries")
session
    .run('MATCH (n:Person) WHERE id(n) = toInteger(rand() * 500000) RETURN n')
    .then(function (result) {
      runtests(result.records[0]._fields[0].properties.name)
    })
    .catch(function (error) {
      console.log(error);
    });


runtests = (person) => {
    console.log(`Finding endorsements from ${person}`)
    session
    .run('MATCH (n:Person {name : {nameParam}})-[:ENDORSES]->(other_other) RETURN (other_other) ', {nameParam: person})
    .then(function (result) {
      console.log(result.records.length + " Relations on endorsement 1")
      
      
    })
    .catch(function (error) {
      console.log(error);
    });
  
    session
    .run('MATCH (n:Person {name : {nameParam}})-[:ENDORSES]->()-[:ENDORSES]->(other_other) RETURN (other_other) ', {nameParam: person})
    .then(function (result) {
      console.log(result.records.length + " Relations on endorsement 2")
     
      
    })
    .catch(function (error) {
      console.log(error);
    });
    session
    .run('MATCH (n:Person {name : {nameParam}})-[:ENDORSES]->()-[:ENDORSES]->()-[:ENDORSES]->(other_other) RETURN (other_other) ', {nameParam: person})
    .then(function (result) {
      console.log(result.records.length + " Relations on endorsement 3")
  
    })
    .catch(function (error) {
      console.log(error);
    });
    session
    .run('MATCH (n:Person {name : {nameParam}})-[:ENDORSES]->()-[:ENDORSES]->()-[:ENDORSES]->()-[:ENDORSES]->(other_other) RETURN (other_other) ', {nameParam: person})
    .then(function (result) {
      console.log(result.records.length  + " Relations on endorsement 4")
  
    })
    .catch(function (error) {
      console.log(error);
    });

    session
    .run('MATCH (n:Person {name : {nameParam}})-[:ENDORSES]->()-[:ENDORSES]->()-[:ENDORSES]->()-[:ENDORSES]->()-[:ENDORSES]->(other_other) RETURN (other_other) ', {nameParam: person})
    .then(function (result) {
      console.log(result.records.length + " Relations on endorsement 5")
      session.close();
      driver.close();
      console.timeEnd("Neo time")
    })
    .catch(function (error) {
      console.log(error);
    });
  
}

