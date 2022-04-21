import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email }


    // POST data to server

    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        const newUsers=[...users,data]
        setUsers(newUsers)
        console.log(data);
      })
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder='Name' required />
        <input type="email" name="email" placeholder='Email' required />
        <input type="submit" value="Add User" />

      </form>
      <h1>Total users : {users.length}</h1>
      {
        users.map(user => <li key={user.id}>ID: {user.id}  Name: {user.name}, Mobile   {user.mobile}</li>)
      }
    </div>
  );
}

export default App;
