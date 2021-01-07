const standup = require('./standup');
let standupQueue = require('./standup')

module.exports = async (req, res) => {
    let { zoomApp, zoomError, zoomWebhook,request } = res.locals;
  
    if (!zoomError) {
      let { type, payload } = zoomWebhook;
      console.log(payload, type)
      let { toJid, userJid, accountId } = payload;
      try {
        let messageBody = []
        if(standupQueue.standups.length === 0){
            messageBody.push({
                type: 'message',
                text: 'No standups are currently running.'
            })
        } else {
            standupQueue.standups.forEach((standup, index) => {
                messageBody.push({
                    type: 'message',
                    text: `${standup.id} -- ACTIVE`
                })
            })
        }
        await zoomApp.sendMessage({
          to_jid: toJid,
          account_id: accountId,
          user_jid: userJid,
          is_visible_you: true,
          content: {
            head: {
              type: 'message',
              text: `Standup Bot Status`,
              style: {
                bold: true
              }
            },
            body: messageBody
          }
        });
        res.send('success');
      } catch (e) {
        res.send('fail');
      }
    } else {
      res.send('fail');
    }
  };
  