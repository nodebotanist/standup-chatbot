const { v4: uuidv4 } = require('uuid')
const mongoClient = require('mongodb')
let standups = []

module.exports = {
    standups,
    start: () => {
        let standupId = uuidv4()
        standups.push({
            id: standupId,
            reporters: [],
            reports: [],
            endTime: new Date(), //TODO: add moment to handle datetimes
            reportChannel: {} //TODO: figure out how to send messages to other channels
        })
        mongoClient.connect(process.env.mongodb_uri, function(err, client) {
            console.log("Connected successfully to server")
           
            const db = client.db(process.env.mongodb_db)

            const collection = db.collection('standups')

            collection.insert({
                id: standupId,
                reporters: [],
                reports: [],
                endTime: new Date(), //TODO: add moment to handle datetimes
                reportChannel: {} //TODO: figure out how to send messages to other channels
            }, (err, result) => {
                console.log(err, result)
            })
           
            client.close()
        })
        return standupId
    }
}