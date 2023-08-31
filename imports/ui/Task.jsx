import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  Divider,
  Button,
} from '@mui/material';
import TaskIcon from '@mui/icons-material/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import { MessageModal } from "./MessageModal";

export const Task = ({ task }) => {
  const [deleteConfirmationMsg, setDeleteConfirmationMsg] = useState(false);

  const deleteTask = ({ _id }) => Meteor.call('tasks.remove', _id, task.userId);

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
        <ListItemText primary={task.name} secondary={task._id} />
        {task.private && 
          <LockPersonIcon 
            sx={{
              color: '#1976d2', 
              marginRight: '2%'
            }}
          />
        }
        <RouterLink to={`/TaskData/${task._id}`}>
          <Button
            variant='outlined'
            aria-label='edit'
            edge='end'
            sx={{ borderRadius: 8 }}
          >
            <EditNoteIcon />
          </Button>
        </RouterLink>
        {Meteor.userId() === task.userId && (
          <Button
            variant='outlined'
            aria-label='delete'
            edge='end'
            sx={{ marginLeft: '2%', borderRadius: 8 }}
            onClick={() => {setDeleteConfirmationMsg(true)}}
          >
            <DeleteIcon />
          </Button>
        )}
      </ListItem>
      <Divider variant='middle' />
      {deleteConfirmationMsg && 
        <MessageModal
          title="Atenção"
          message='Tem certeza que quer excluir esta tarefa?'
          isOpen={deleteConfirmationMsg}
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
