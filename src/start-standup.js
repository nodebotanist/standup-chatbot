let standupQueue = require('./standup')

module.exports = async (req, res) => {
    let { zoomApp, zoomError, zoomWebhook,request } = res.locals;

    if (!zoomError) {
        let { type, payload } = zoomWebhook;
        let { toJid, userJid, accountId } = payload;
        let standupId = standupQueue.start()
        try {
          await zoomApp.sendMessage({
            to_jid: toJid,
            account_id: accountId,
            user_jid: userJid,
            is_visible_you: true,
            content: {
              head: {
                type: 'message',
                text: `Standup started!`,
                style: {
                  bold: true
                }
              },
              body: [
                {
                  type: 'message',
                  text: `standup id ${standupId}`
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
}