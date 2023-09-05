import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
  IconButton
} from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { MessageModal } from './MessageModal';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

export const Task = ({ task }) => {
  const [deleteConfirmationMsg, setDeleteConfirmationMsg] = useState(false);

  const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id, task.creatorId);

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
        <ListItemText primary={task.name} secondary={task.creatorName} />
        {(task.status === 'Completed') &&
          <AssignmentTurnedInIcon
            fontSize='small'
            sx={{
              color: '#1976d2', 
              marginRight: '2%'
            }}
          />
        }
        {task.private && 
          <LockPersonIcon 
            fontSize='small'
            sx={{
              color: '#1976d2', 
              marginRight: '2%'
            }}
          />
        }
        <RouterLink to={`/TaskData/${task._id}`}>
          <IconButton
          variant='contained'
            aria-label='edit'
            size='small'
            color="primary"
            edge='end'
            sx={{
              '&:hover, &:active': {
                backgroundColor: 'primary.main',
                color: '#fff'
              },
            }}
          >
            <EditNoteIcon />
          </IconButton>
        </RouterLink>
        {Meteor.userId() === task.creatorId && (
          <IconButton
            color="primary"
            size='small'
            aria-label='delete'
            edge='end'
            sx={{ 
              marginLeft: '%',
              '&:hover, &:active': {
                backgroundColor: 'primary.main',
                color: '#fff'
              },
            }}
            onClick={() => {setDeleteConfirmationMsg(true)}}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </ListItem>
      <Divider variant='middle' />
      {deleteConfirmationMsg && 
        <MessageModal
          title='Atenção'
          message='Tem certeza que quer excluir esta tarefa?'
          hasCancelButton={true}
          handleConfirmationButton={() => {
            deleteTask(task);
            setDeleteConfirmationMsg(false);
          }}   
          handleCancelButton={() => {
            setDeleteConfirmationMsg(false);
          }}
        />
     }
    </>
  );
};
