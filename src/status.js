const standupQueue = require('./standup')

module.exports = async (req, res) => {
    let { zoomApp, zoomError, zoomWebhook,request } = res.locals;
  
    if (!zoomError) {
      let { type, payload } = zoomWebhook;
      console.log(payload, type)
      let { toJid, userJid, accountId } = payload;
      try {
       standupQueue.status(async function(err, result) {
         if(err) throw err
         console.log('result', result)
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
            body: result
          }
        });
        res.send('success');
       })
      } catch (e) {
        res.send('fail');
      }
    } else {
      res.send('fail');
    }
  };
  