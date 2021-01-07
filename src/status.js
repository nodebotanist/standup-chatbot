let standupQueue = require('./standup')

module.exports = async (req, res) => {
    let { zoomApp, zoomError, zoomWebhook,request } = res.locals;
  
    if (!zoomError) {
      let { type, payload } = zoomWebhook;
      console.log(payload, type)
      let { toJid, userJid, accountId } = payload;
      try {
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
            body: [
              {
                type: 'message',
                text: 'no standups are currently running',
                style: {
                  bold: true
                }
              }
            ]
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
  