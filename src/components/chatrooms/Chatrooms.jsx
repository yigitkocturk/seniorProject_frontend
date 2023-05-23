import React, { useEffect } from 'react';
import $ from 'jquery';
import SockJS from 'sockjs-client';
import { Client, Stomp } from '@stomp/stompjs';


function Chatrooms() {
    useEffect(() => {
      let stompClient = null;
  
      function sendMessage() {
        const jsonOb = {
          name: localStorage.getItem('userName'),
          content: $('#message-value').val()
        };
  
        stompClient.send('/app/message', { Authorization: localStorage.getItem('tokenKey') }, JSON.stringify(jsonOb));
      }
  
      function connect() {
        const socket = new SockJS('/server1');
        stompClient = Stomp.over(socket);
  
        stompClient.connect(
          {
            Authorization: localStorage.getItem('tokenKey'),
          },
          function(frame) {
            console.log('Connected: ' + frame);
  
            $('#name-from').addClass('d-none');
            $('#chat-room').removeClass('d-none');
  
            // Subscribe
            stompClient.subscribe('/topic/return-to', function(response) {
              showMessage(JSON.parse(response.body));
            });
          }
        );
      }
  
      function showMessage(message) {
        $('#message-container-table').prepend(`<tr><td><b>${message.name} :</b> ${message.content}</td></tr>`);
      }
  
      $(document).ready(function() {
        $('#login').click(function() {
          localStorage.setItem('userName', $('#name-value').val());
          $('#name-title').html(`Welcome, <b>${localStorage.getItem('userName')}</b>`);
          connect();
        });
  
        $('#send-btn').click(function() {
          sendMessage();
        });
  
        $('#logout').click(function() {
          localStorage.removeItem('userName');
          if (stompClient !== null) {
            stompClient.disconnect();
            $('#name-from').removeClass('d-none');
            $('#chat-room').addClass('d-none');
            console.log(stompClient);
          }
        });
      });
    }, []);
  
  return (
    <div>
      <div id="name-from" className="bg-primary d-flex align-items-center">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 offset-md-4">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter your name"
                  id="name-value"
                  autoFocus
                  className="form-control"
                />
                <div className="input-group-append">
                  <button className="btn btn-dark" id="login">
                    Enter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="chat-room" className="d-none">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <div className="card mt-3">
                <div className="card-header">
                  <h3 id="name-title"></h3>
                </div>
                <div className="card-body">
                  <div className="input-group">
                    <input
                      type="text"
                      placeholder="Enter your message"
                      id="message-value"
                      autoFocus
                      className="form-control"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-dark" id="send-btn">
                        Send
                      </button>
                      <button className="btn btn-dark" id="logout">
                        Logout
                      </button>
                    </div>
                  </div>
                  <div className="table-responsive mt-3">
                    <table id="message-container-table"></table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatrooms;
