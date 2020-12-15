import React, { useEffect, useCallback } from 'react';
import { Widget, addResponseMessage, addUserMessage, dropMessages } from 'react-chat-widget';
import { io } from 'socket.io-client';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import 'react-chat-widget/lib/styles.css';

var socket;
const Chat = (props) => {
  const {
    user,
    isLogged,
    addUser,
    isAdmin,
    reciever,
    setReciever,
    removeUser,
    newMessage,
  } = props;

  const savedMessages = useCallback((data) => {
    dropMessages();
    data.messages.forEach(message => {
      if(isAdmin) {
        if(message.user === reciever){
          addResponseMessage(message.message);
        } else {
          addUserMessage(message.message);
        }
      } else {
        if(message.user === reciever){
          addUserMessage(message.message);
        } else {
          addResponseMessage(message.message);
        }
      }
    });
  }, [reciever, isAdmin]);

  useEffect(() => {
    (async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      return result.visitorId;
    })()
      .then(fingerPrint => {
        if(isLogged)
          socket = io('/', {query: 'auth_token=' + user.accessToken});
        else
          socket = io('/', {query: 'finger_print=' + fingerPrint});

        socket.emit('join');

        if(isLogged) {
          if(!isAdmin) {
            setReciever(user.id);
          }
        } else {
          setReciever(fingerPrint);
        };

        socket.on('connect_error', (err) => {
          console.log(err);
        });
        socket.on('user connected', data => {
          addUser(data.user);
        });
        socket.on('user disconnected', (data) => {
          removeUser(data.user);
        });
        socket.on('message notification', (data) => {
          newMessage(data.user);
        });
        socket.on('message', ({ message }) => {
          addResponseMessage(message);
        });
      });
      return () => {
        socket.disconnect();
      };
  }, [isAdmin, isLogged, addUser, removeUser, newMessage, setReciever, user]);

  useEffect(() => {
    try {
      socket.emit('join to reciever', { reciever });
      socket.emit('getMessages', { reciever });
      socket.on('savedMessages', savedMessages);
      return () => {
        socket.off('savedMessages', savedMessages);
      };
  } catch {};
  }, [reciever, savedMessages]);

  const handleNewUserMessage = (message) => {
    socket.emit('sendMessage', { reciever, message });
  };

  return (
    <Widget
      title=''
      subtitle=''
      handleNewUserMessage={handleNewUserMessage}
      showTimeStamp={false}
    />
  );
};

export default Chat;
