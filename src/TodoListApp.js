import React from "react";

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
        <div>
          <AddTodoForm addTodoHandler={this.addTodoHandler}/>
          {
            this.state.todos.map((todo, i) => {
              return (
                <Todo key={"todo-id-"+i.toString() } todo={todo} deleteTodoHandler={this.deleteTodoHandler}/>
              );
            })
          }
        </div>
      )
    }
}

export default TodoListApp;