const http = require('http');
const url = require('url');
const server = http.createServer();

const messages = [
  { 'id': 1, 'user': 'Bob', 'message': 'Hello there good friend' },
  { 'id': 2, 'user': 'Joe', 'message': 'I like dirt because my name is Joe'},
  { 'id': 3, 'user': 'Billy', 'message': 'I\'m idle'},
]

server.listen(3000, () => {
  console.log('HTTP server is listening on port 3000!')
});

server.on('request', (request, response) => {
  if(request.method === 'GET') {
    getAllMessages(response);
  }

  else if( request.method === 'POST') {
    let newMessage = { 'id': Date.now() };

    request.on('data', (data) => {
      newMessage = Object.assign(newMessage, JSON.parse(data));
    });

    request.on('end', () => {
      addMessage(newMessage, response);
    });
  }
});

const getAllMessages = (response) => {
  response.writeHead(response.statusCode, { 'Content-Type': 'text/plain' });
  response.write(JSON.stringify(messages));
  response.end();
}

const addMessage = (newMsg, response) => {
  messages.push(newMsg);
  response.writeHead(response.statusCode, { 'Content-Type': 'text/plain' });
  const newMessage = messages[messages.length - 1];
  response.write(JSON.stringify(newMessage));
  response.end();
}
