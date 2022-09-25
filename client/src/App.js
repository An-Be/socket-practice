import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

function App() {
  const socket = io.connect("http://localhost:3001");

  const [message, setMessage] = useState('');
  const [messageRecieved, setMessageRecieve] = useState('');
  const [room, setRoom] = useState('');


  const sendMessage = () => {
    socket.emit("send_message", {message, room})
  }

  const joinRoom = () => {
    if(room !== ''){
      socket.emit('join_room', room)
    }
  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageRecieve(data.message)
    })
  
  }, [socket])
  
  return (
    <div className="App"> 
    <input placeholder="Room number..." onChange={(e) => {setRoom(e.target.value)}} />
      <button onClick={joinRoom}>Join Room</button> 
      <input placeholder="message..." onChange={(e) => {setMessage(e.target.value)}} />
      <button onClick={sendMessage}>Send Message</button> 
      <h1>Message: </h1>
      {messageRecieved} 
    </div>
  );
}

export default App;
