import React from "react";
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  ListItemAvatar, 
  Avatar,
  Divider } from "@mui/material";
import TaskIcon from '@mui/icons-material/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';


export const MultList = () => {
  return (
    <Box sx={{
      // display: 'flex',
      justifyContent: 'center',
      alignItems: 'normal',
      minHeight: '100vh',
      bgcolor: '#efefef',
    }}>
      <List disablePadding>
        <ListItem>
          <ListItemIcon>
            <ListItemAvatar>
              <Avatar>
                <TaskIcon />
              </Avatar>
            </ListItemAvatar>
          </ListItemIcon>
          <ListItemText primary='Item 1' secondary='Secondary text' />
          <EditNoteIcon edge='end' />
          <DeleteIcon edge='end' />        
        </ListItem>
        <Divider variant="middle"/>
      </List>
    </Box>
  )
}