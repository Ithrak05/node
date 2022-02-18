
const socketio = require('socket.io');
var Chatcontroller= require("./app/controller/Chatcontroller");
function launchChat(chat_listen){
    const io = socketio(chat_listen);
  var userConnection=[];
    io.on('connection', socket => {
        // userConnection.push({'id':})
        // socket.on('joinRoom', ({ username, room }) => {
        //   const user = userJoin(socket.id, username, room);
      
        //   socket.join(user.room);
      
          // Welcome current user
          socket.on('message', function(msg){
            console.log(msg,'test');
          });
          socket.on('user_id', function(user_id){
            var user_id_check=userConnection.find( ({ member_id }) => member_id === user_id);
            if(!user_id_check){
              userConnection.push({'id':socket.id,'member_id':user_id});
            }

            console.log(userConnection);
          });
          socket.on('send_message', function(msg){
            // console.log(msg,"testtss");
            console.log(userConnection,'1');
            var isther=userConnection.find( ({ member_id }) => member_id === msg.sender_id);
            if(isther){
              console.log(isther.id);
              io.to(isther.id).emit('r_send_msg',msg);
            }
            var data=Chatcontroller.createConv(msg);
            var isther2=userConnection.find( ({ member_id }) => member_id === msg.receiver_id);
            if(isther2){
              console.log(isther2.id,2);
              io.to(isther2.id).emit('r_send_msg',msg);
            }
              
           
           });

        //   // Broadcast when a user connects
        //   socket.broadcast
        //     .to(user.room)
        //     .emit(
        //       'message',
        //       formatMessage(botName, `${user.username} has joined the chat`)
        //     );
      
        //   // Send users and room info
        //   io.to(user.room).emit('roomUsers', {
        //     room: user.room,
        //     users: getRoomUsers(user.room)
        //   });
        // });
      
        // // Listen for chatMessage
        // socket.on('chatMessage', msg => {
        //   const user = getCurrentUser(socket.id);
      
        //   io.to(user.room).emit('message', formatMessage(user.username, msg));
        // });
      
        // // Runs when client disconnects
        // socket.on('disconnect', () => {
        //   const user = userLeave(socket.id);
      
        //   if (user) {
        //     io.to(user.room).emit(
        //       'message',
        //       formatMessage(botName, `${user.username} has left the chat`)
        //     );
      
        //     // Send users and room info
        //     io.to(user.room).emit('roomUsers', {
        //       room: user.room,
        //       users: getRoomUsers(user.room)
        //     });
        //   }
        // });
      });
}
module.exports = {
    launchChat
};