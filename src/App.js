import { useEffect, useState } from 'react';
import { Button, FormControl, InputLabel, Input, FormHelperText } from '@material-ui/core';
import Todo from './Todo';
import './App.css';
import db from './firebase';
import firebase from 'firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // when the app loads , we needs to listen to the database and fetch new todos as they get added/removed
  useEffect(() => {
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})));
    })
  }, []);

  const addTodo = (event) => {
    // on clicking button
    event.preventDefault(); //Prevent from refreshing the page

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    setTodos([...todos, input]);
    setInput(''); //clear input field
  }

  return (
    <div className="App">
      <h1>Hello World</h1>
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Write ToDo</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} id="my-input" aria-describedby="ToDo" />
          <FormHelperText id="my-helper-text">Write Your Task Here.</FormHelperText>
        </FormControl>
        <Button disabled={!input} type='submit' onClick={addTodo} variant="contained" color="primary">
          Add ToDo
        </Button>
        {/* <button type='submit' onClick={addTodo}>Add ToDo</button> */}
      </form>
      <ul>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
