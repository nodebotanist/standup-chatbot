module.exports = async (req, res) => {
    let { zoomApp, zoomError, zoomWebhook, databaseModels } = res.locals;
    if (!zoomError) {
      let { type, command, payload } = zoomWebhook;
      let { toJid, userId, accountId } = payload;
      try {
        await zoomApp.sendMessage({
          to_jid: toJid,
          account_id: accountId,
          content: {
            head: {
                text: "I am a header",
                sub_head: {
                    text: "I am a sub header"
                }
            },
            body: [
            {
                type: "fields",
                items: [
                    {
                    key: "Name",
                    value: " ",
                    editable: true
                    },
                    {
                    key: "Title",
                    value: " ",
                    editable: true
                    },
                    {
                    key: "Company",
                    value: "Zoom",
                    editable: false
                    }
                ]
                },
                {
                    "type": "actions",
                    "items": [
                      {
                        "text": "Complete Standup Report",
                        "value": "complete",
                        "style": "Primary"
                      },
                      {
                        "text": "Update Standup Report",
                        "value": "update",
                        "style": "Default"
                      },
                      {
                        "text": "Skip Standup",
                        "value": "skip",
                        "style": "Danger"
                      }
                    ]
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
  