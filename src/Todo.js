import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function BasicCard(props) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.description}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Deadline: {props.deadline.toString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => props.deleteTodoHandler(props.id)} size="small">Done</Button>
      </CardActions>
    </Card>
  );
}

export default function Todo(props) {
  return (
    <BasicCard
      id={props.todo.id}
      description={props.todo.description}
      deadline={props.todo.deadline}
      deleteTodoHandler={props.deleteTodoHandler}
    />
  );
}
