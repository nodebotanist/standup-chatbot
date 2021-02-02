
module.exports = {
  log:function(info){
    // info.message,info.type
    // console.log(info.type,info.message);
  },
  botCommands: [
    {
      command: 'help',
      callback: require('./src/help.js')
    },
    {
      command:'start',
      callback:require('./src/start-standup')
    },
    {
      command: 'status',
      callback:require('./src/status')
    },
    {
      command: 'close',
      callback:require('./src/close-standup')
    },
    {
      command: 'question',
      callback:require('./src/question.js')
    },
    {
      command: 'channels',
      callback: require('./src/channels')
    },
    {
      callback:require('./src/noCommand.js') // no right command,will call this function
    }
  ],
  botActions: [
    {
      command:'interactive_message_actions',
      callback:(req) => {
        console.log(req.body.payload.original.body)
        console.log(req.body.payload.original.body[0].items[0])
      }
    },
    {
      command:'interactive_message_fields_editable',
      callback:(req, res) => {
        console.log(req.body)
      }
    }
  ],
  apis: [
    { url: '/command', method: 'post', zoomType: 'command' },
    {
      url: '/auth',
      method: 'get',
      callback: require('./src/auth'),
      zoomType: 'auth'
    },
    {
      url:'/test',
      method:'get',
      callback:function(req,res){
        res.send('test success');
      }
    }
  ]
};
