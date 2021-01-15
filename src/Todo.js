import { Button, Input, List, ListItem, ListItemText, makeStyles, Modal } from '@material-ui/core'
import React, { useState } from 'react'
import db from './firebase';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function Todo(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState(props.todo.todo)

    const updateTodo = () => {
        // update the todo with new input text
        db.collection('todos').doc(props.todo.id).set({
            todo: input
        }, {merge: true})

        setOpen(false);
    }


    return (
        <>
            <Modal
                open={open}
                onClose={e => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <h1>I am modal</h1>
                    <form>
                    <Input value={input} onChange={event => setInput(event.target.value)}/>
                    <Button type='submit' onClick={updateTodo}>Update Todo</Button>
                    </form>
                </div>
            </Modal>
            <List className="todo-list">
                <ListItem>
                    <ListItemText key={props.todo.id} primary={props.todo.todo} secondary="Some text..." />
                </ListItem>
                <DeleteIcon onClick={event => db.collection('todos').doc(props.todo.id).delete()} />
            <button type="button" onClick={e => setOpen(true)}>
                Edit
            </button>
            </List>
        </>
    )
}

export default Todo
