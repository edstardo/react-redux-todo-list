import React, { useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export default function AddTodoForm(props) {
  const [description, setDescription] = useState(""); 
  const [deadline, setDeadline] = useState(null);

  function handleAddTodoButtonClick() {
    if (!(description && deadline)) {
      return;
    }

    props.addTodoHandler({
      id: genRanHex(6),
      description: description,
      deadline: deadline,
    });

    setDescription("");
    setDeadline(null);
  }

  return (
    <div>
      <TextField
        id="new-todo-description-field"
        label="Todo Description"
        defaultValue=""
        size="small"
        value={description}
        onChange={(event) => (setDescription(event.target.value))}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField size="small" {...props}  />}
          label="Todo Deadline"
          value={deadline}
          onChange={(newValue) => (setDeadline(newValue))}
        />
      </LocalizationProvider>
      <Button variant="outlined" size="medium" onClick={handleAddTodoButtonClick}>
        Add Todo
      </Button>
    </div>
  );
}
