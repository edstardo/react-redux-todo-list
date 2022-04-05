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

    componentDidMount() {
      this.fetchTodos()
    }

    fetchTodos() {
      fetch("http://127.0.0.1:8080/todos")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            todos: result
          });
        },
        (error) => {
          console.log("Error occured while fetching todos: ", error)
        }
      )
    }
  
    addTodoHandler(newTodo) {
      fetch("http://127.0.0.1:8080/todos", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({description: newTodo.description, deadline: newTodo.deadline})
      })
      .then(res => res.json())
      .then(
        (result) => {
          newTodo.id = result.id;
          this.setState( prevState => {
            return {
              todos: [...prevState.todos, newTodo]
            }
          })
        },
        (error) => {
          console.log("Error occured while creating new todo: ", error)
        }
      )
    }

    deleteTodoHandler(todoID) {
      
      fetch("http://127.0.0.1:8080/todos/" + todoID, {
        method: 'DELETE', 
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(
        (result) => {
          var filtered = this.state.todos.filter(function(value, index, arr){ 
            return value.id !== todoID;
          });

          this.setState({
            todos: [...filtered]
          })
        },
        (error) => {
          console.log("Error occured while deleting todo: ", error)
        }
      )
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
                    <Grid key={"todo-id-"+i.toString()} item md={4}>
                      <Todo todo={todo} deleteTodoHandler={this.deleteTodoHandler}/>
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