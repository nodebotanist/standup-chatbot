const standupQueue = require('./standup')

module.exports = (req, res) => {
    let { zoomApp, zoomError, zoomWebhook,request } = res.locals;
  
    if (!zoomError) {
      let { type, payload } = zoomWebhook;
      let { toJid, userJid, accountId } = payload;
      try {
        const standupId = payload.cmd.split(' ')[1]
        standupQueue.close(standupId, async (err, result) => {
            let userMessage = ''
            if(err) {
                userMessage = err
            } else {
                userMessage = result
            }
            await zoomApp.sendMessage({
              to_jid: toJid,
              account_id: accountId,
              user_jid: userJid,
              is_visible_you: true,
              content: {
                head: {
                  type: 'message',
                  text: `Standup Close Result`,
                  style: {
                    bold: true
                  }
                },
                body: [
                  {
                    type: 'message',
                    text: userMessage
                  }
                ]
              }
            });
        })

        res.send('success');
      } catch (e) {
        res.send('fail');
      }
    } else {
      console.log('fail')
      res.send('fail');
    }
  };
  