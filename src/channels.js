let fetch = require('node-fetch')

module.exports = async (req, res) => {
    let { zoomApp, zoomError, zoomWebhook, databaseModels } = res.locals;
    if (!zoomError) {
      let { type, command, payload } = zoomWebhook;
      let { toJid, userId, accountId } = payload;
      try {

        //   fetch(`https://api.zoom.us/v2/chat/users/${userId}/channels`, {
        //     method: 'GET',
        //     headers: {
        //       'Authorization': 'Bearer: ' + token
        //     },
        //   }).then((res) => {
        //     console.log(res)
        //   })

        await zoomApp.sendMessage({
          to_jid: toJid,
          account_id: accountId,
          content: {
            head: {
              type: 'message',
              text: 'Unknown command',
              style: {
                bold: true
              }
            },
            body: [
              {
                type: 'message',
                text: `This is a test message:`
              },
              {
                type: 'message',
                text: 'vote',
                style: {
                  bold: true
                }
              },
              {
                type: 'message',
                text: 'Click a button to vote your Favorite food'
              }
            ]
          }
        });
        res.send('success');
      } catch (e) {
        console.log(e)
        res.send('fail');
      }
    }
    else{
      res.send('fail');
    }
  };
  