const { Client } = require('pg')


const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    database: 'postgres'
})
client.connect((err) => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log("Starting Postgresqueries")
        console.time("Postgre time");
    }
})


client.query('select * from person ORDER BY random() limit 1', (err, res) => {
    
    runtests(res.rows[0].name)
    //runtests("Elease Sawchuk")
})
runtests = (person) => {
    console.log(`Finding endorsements from ${person}`)
    const value = [person]
    const endorse1 = 'SELECT name,id FROM person WHERE id IN (SELECT id2 FROM relation WHERE relation.id1 IN ( SELECT id FROM person WHERE name = $1))'
    const endorse2 = 'SELECT name,id FROM person WHERE id IN (SELECT id2 FROM relation WHERE relation.id1 IN (SELECT id FROM person WHERE id IN (SELECT id2 FROM relation WHERE relation.id1 IN (SELECT id FROM person WHERE name = $1))))'
    const endorse3 = `SELECT name,id FROM person
    WHERE id IN (
        SELECT id2 FROM relation
        WHERE relation.id1 IN (
            SELECT id FROM person
            WHERE id IN (
                SELECT id2 FROM relation
                WHERE relation.id1 IN (
                    SELECT id FROM person
                    WHERE id IN (
                        SELECT id2 FROM relation
                        WHERE relation.id1 IN (
                            SELECT id FROM person WHERE name = $1
                        )
                    )
                )
            )
        )
    )`
    const endorse4 = `SELECT name,id FROM person
    WHERE id IN (
        SELECT id2 FROM relation
        WHERE relation.id1 IN (
            SELECT id FROM person
            WHERE id IN (
                SELECT id2 FROM relation
                WHERE relation.id1 IN (
                    SELECT id FROM person
                    WHERE id IN (
                        SELECT id2 FROM relation
                        WHERE relation.id1 IN (
                            SELECT id FROM person
                            WHERE id IN (
                                SELECT id2 FROM relation
                                WHERE relation.id1 IN (
                                    SELECT id FROM person WHERE name = $1
                                )
                            )
                        )
                    )
                )
            )
        )
    )`
    const endorse5 = `SELECT name,id FROM person
    WHERE id IN (
        SELECT id2 FROM relation
        WHERE relation.id1 IN (
            SELECT id FROM person
            WHERE id IN (
                SELECT id2 FROM relation
                WHERE relation.id1 IN (
                    SELECT id FROM person
                    WHERE id IN (
                        SELECT id2 FROM relation
                        WHERE relation.id1 IN (
                            SELECT id FROM person
                            WHERE id IN (
                                SELECT id2 FROM relation
                                WHERE relation.id1 IN (
                                    SELECT id FROM person
                                    WHERE id IN (
                                        SELECT id2 FROM relation
                                        WHERE relation.id1 IN (
                                            SELECT id FROM person WHERE name = $1
                                        )
                                    )
                                )
                            )
                        )
                    )
                )
            )
        )
    )`
    client.query(endorse1, value, (err, res) => {
        console.log(res.rows.length  + " Relations on endorsement 1")
    })
    client.query(endorse2, value, (err, res) => {
        console.log(res.rows.length  + " Relations on endorsement 2")

    })
    client.query(endorse3, value, (err, res) => {
        console.log(res.rows.length  + " Relations on endorsement 3")
        
    })
    client.query(endorse4, value, (err, res) => {
        console.log(res.rows.length  + " Relations on endorsement 4")
        
    })
    client.query(endorse5, value, (err, res) => {
        console.log(res.rows.length  + " Relations on endorsement 5")
        console.timeEnd("Postgre time")
        
        client.end()
    })
}






