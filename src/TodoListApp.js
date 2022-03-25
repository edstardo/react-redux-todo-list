import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Todo from "./Todo";
import AddTodoForm from "./AddTodoForm";

class TodoListApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        todos: [],
      };
  
      this.addTodoHandler = this.addTodoHandler.bind(this);
      this.deleteTodoHandler = this.deleteTodoHandler.bind(this);
    }
  
    addTodoHandler(newTodo) {
      this.setState(prevState => ({
        todos: [...prevState.todos, newTodo]
      }))
    }

    deleteTodoHandler(toID) {
      var filtered = this.state.todos.filter(function(value, index, arr){ 
        return value.id !== toID;
      });

      this.setState({
        todos: [...filtered]
      })
    }
  
    render() {
      return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            <AddTodoForm addTodoHandler={this.addTodoHandler}/>
            <Grid container spacing={2}>
              {
                this.state.todos.map((todo, i) => {
                  return (
                    <Grid item md={4}>
                      <Todo key={"todo-id-"+i.toString() } todo={todo} deleteTodoHandler={this.deleteTodoHandler}/>
                    </Grid>
                  );
                })
              }
            </Grid>
          </Container>
        </React.Fragment>
      )
    }
}

export default TodoListApp;