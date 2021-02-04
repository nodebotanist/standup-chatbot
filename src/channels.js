module.exports = async (req, res) => {
    let { zoomApp, zoomError, zoomWebhook, databaseModels } = res.locals;
    if (!zoomError) {
      let { type, command, payload } = zoomWebhook;
      let { toJid, userId, accountId } = payload;
      try {
        zoomApp.getClientToken((token) => {
        })
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
        res.send('fail');
      }
    }
    else{
      res.send('fail');
    }
  };
  