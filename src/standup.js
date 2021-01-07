const { v4: uuidv4 } = require('uuid');
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
        return standupId
    }
}