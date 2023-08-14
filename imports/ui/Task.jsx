import React from "react";
import {  
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  ListItemAvatar, 
  Avatar,
  Divider,
  Grid, 
  Button,
  Link} from "@mui/material";
import TaskIcon from '@mui/icons-material/Task';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';


export const MultList = ({task}) => {
  return (
    <Grid 
    container
    spacing={2}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'normal',
      minHeight: '100vh',
    }}>
      <Grid item xs={8}>
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
            <Link href='./TaskData'>
              <Button variant='outlined' aria-label="edit" edge='end' sx={{ marginX:2, borderRadius: 8 }}>
                <EditNoteIcon />
              </Button>
            </Link>
            <Button variant='outlined' aria-label="delete" edge='end' sx={{ marginX:2, borderRadius: 8 }}>
              <DeleteIcon  /> 
            </Button>
                   
          </ListItem>
          <Divider variant="middle"/>
        </List>
      </Grid>
    </Grid>
  )
}