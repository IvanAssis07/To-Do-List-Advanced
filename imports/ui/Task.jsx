import React from 'react';
import { Link as RouterLink } from 'react-router-dom'; 
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
        <RouterLink to={`/TaskData/${task.id}`}>
          <Button 
            variant='outlined' 
            aria-label='edit' 
            edge='end' 
            sx={{ borderRadius: 8 }}
            >
            <EditNoteIcon />
          </Button>
        </RouterLink>
        <Button 
          variant='outlined' 
          aria-label='delete' 
          edge='end' 
          sx={{ marginLeft: '3%', borderRadius: 8 }}
          onClick={() => onDeleteClick(task)}
        >
          <DeleteIcon  /> 
        </Button>
                
      </ListItem>
      <Divider variant='middle'/>
    </>
  )
}