import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import TodoCard from "./Todo";

function BasicDateTimePicker() {
    const [value, setValue] = React.useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        label="Todo Deadline"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
      />
    </LocalizationProvider>
  );
}

class NewTodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      deadline:    null,
    };

    // handlers from props
    this.addTodoHandler = this.props.addHandler;

    // own handlers
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
    this.handleAddTodoButtonClick = this.handleAddTodoButtonClick.bind(this);
  }

  handleDescriptionChange(e) {
    this.setState({
      description: e.target.value,
    });
  }

  handleDeadlineChange(newValue) {
    this.setState({
      deadline: newValue,
    });
  }

  handleAddTodoButtonClick() {
    let description = this.state.description;
    let deadline = this.state.deadline;

    if (!(description && deadline)) {
      return;
    }

    this.addTodoHandler({
      description: description,
      deadline: deadline,
    });

    this.setState({
      description: "",
      deadline: null,
    });
  }

  render() {
    return (
      <div>
        <TextField
          id="new-todo-description-field"
          label="Todo Description"
          defaultValue=""
          size="small"
          // helperText="Add new Todo description."
          value={this.state.description}
          onChange={this.handleDescriptionChange}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            renderInput={(props) => <TextField size="small" {...props}  />}
            label="Todo Deadline"
            value={this.state.deadline}
            onChange={this.handleDeadlineChange}
          />
        </LocalizationProvider>
        <Button variant="outlined" size="medium" onClick={this.handleAddTodoButtonClick}>Add Todo</Button>
      </div>
    );
  }
}

class TodoListApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        todos: [],
      };
  
      this.addTodoHandler = this.addTodoHandler.bind(this);
    }
  
    addTodoHandler(newTodo) {
      this.setState(prevState => ({
        todos: [...prevState.todos, newTodo]
      }))
    }
  
    render() {
      return (
        <div>
          <NewTodoForm addHandler={this.addTodoHandler}/>
          {
            this.state.todos.map((todo, i) => {
              return (
                <TodoCard key={"todo-id-"+i.toString() } todo={todo} />
              );
            })
          }
        </div>
      )
    }
}

export default TodoListApp;