import React from 'react';
import {  
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  ListItemAvatar, 
  Avatar,
  Divider, 
  Button,
  Link} from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';


export const Task = ({task, onDeleteClick}) => {
  return (
    <>
      <ListItem>
        <ListItemIcon>
          <ListItemAvatar>
            <Avatar>
              <TaskIcon />
            </Avatar>
          </ListItemAvatar>
        </ListItemIcon>
        <ListItemText primary={task.name} secondary={task.creator} />
        {/* <Link to={`/TaskData/${task._id}`}> */}
          <Button 
            variant='outlined' 
            aria-label='edit' 
            edge='end' 
            sx={{ marginX:2, borderRadius: 8 }}
            onClick = {()=> {console.log(task._id)}}
            >
            <EditNoteIcon />
          </Button>
        {/* </Link> */}
        <Button 
          variant='outlined' 
          aria-label='delete' 
          edge='end' 
          sx={{ marginX:2, borderRadius: 8 }}
          onClick={() => onDeleteClick(task)}
        >
          <DeleteIcon  /> 
        </Button>
                
      </ListItem>
      <Divider variant='middle'/>
    </>
  )
}