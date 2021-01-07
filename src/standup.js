const { v4: uuidv4 } = require('uuid');
let standups = []

module.exports = {
    standups,
    start: () => {
        let standupId = uuidv4()
        standups.push({
            id: standupId
        })
        return standupId
    }
}