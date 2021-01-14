const { v4: uuidv4 } = require('uuid')
const { MongoClient } = require('mongodb')
let standups = []

module.exports = {
    standups,
    start: () => {
        let standupId = uuidv4()
        MongoClient.connect(process.env.mongodb_uri, function(err, client) {
            const db = client.db(process.env.mongodb_db)

            const collection = db.collection('standups')

            collection.insert({
                id: standupId,
                reporters: [],
                reports: [],
                endTime: new Date(), //TODO: add moment to handle datetimes
                reportChannel: {}, //TODO: figure out how to send messages to other channels
                status: 'ACTIVE'
            }, (err, result) => {
                console.log(err, result)
            })
           
            client.close()
        })
        return standupId
    },
    status: (cb) => {
        let messageBody = []

        MongoClient.connect(process.env.mongodb_uri, function(err, client) {
            console.log(err)
            const db = client.db(process.env.mongodb_db)

            const collection = db.collection('standups')

            collection.find().toArray((err, result) => {
                if (err) throw err
                if(result.length === 0){
                    messageBody.push({
                        type: 'message',
                        text: 'No standups are currently running.'
                    })
                } else {
                    result.forEach((standup, index) => {
                        messageBody.push({
                            type: 'message',
                            text: `${standup.id} -- ${standup.status}`
                        })
                    })
                }
                            
                console.log('Message', messageBody)
                cb(null, messageBody)                
            })
           
            client.close()
        })

    },
    close: async function(standupId, cb) {

        MongoClient.connect(process.env.mongodb_uri, function(err, client) {
            console.log(err)
            const db = client.db(process.env.mongodb_db)

            const collection = db.collection('standups')

            const result = collection.deleteOne({
                id: standupId
            }, (err, result) => {
        
                if(result.deletedCount === 1){
                    cb(null, `Closed ${standupId}`)
                } else {
                    cb(`Error closing ${standupId}. Use the status command to see if it still in the list.`)
                }
            })                
           
            client.close()
        })
    }
}