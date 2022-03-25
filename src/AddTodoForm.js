import React from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

class AddTodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            deadline:    null,
        };

        // handlers from props
        this.addTodoHandler = this.props.addTodoHandler;

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
            id: genRanHex(6),
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
                <Button variant="outlined" size="medium" onClick={this.handleAddTodoButtonClick}>
                    Add Todo
                </Button>
            </div>
        );
    }
}

export default AddTodoForm;
