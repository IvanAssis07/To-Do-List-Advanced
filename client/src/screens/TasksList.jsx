import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import {
  List,
  Button,
  Stack,
  Box,
  Container,
  Switch,
  FormControlLabel,
  FormGroup,
  FormControl,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TasksCollection } from "../../../api/domains/tasks/TasksCollection";
import { Loading } from "../components/Loading";
import { Task } from "../components/Task";
import { Navbar } from "../components/NavBar";
import SearchIcon from "@mui/icons-material/Search";

export const TasksList = () => {
  const [showCompleted, setShowCompleted] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const handleSwitchChange = () => {
    setShowCompleted(!showCompleted);
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const [isLoading, setIsLoading] = useState(true);

  const { tasks } = useTracker(() => {
    const noTasksAvailable = { tasks: [] };

    if (!Meteor.user()) {
      return noTasksAvailable;
    }

    const handler = Meteor.subscribe("tasks", showCompleted, searchInput);

    if (!handler.ready()) {
      return { ...noTasksAvailable };
    }

    const tasks = TasksCollection.find(
      {},
      {
        sort: { createdAt: -1 },
      }
    ).fetch();

    setIsLoading(false);

    return { tasks };
  }, [showCompleted, searchInput]);

  return (
    <>
      <Navbar />
      <Container>
        <Stack
          direction="column"
          sx={{
            display: "flex",
            minHeight: "100vh",
            textAlign: "center",
          }}
        >
          <Box>
            <RouterLink to="/CreateTask">
              <Button variant="contained" startIcon={<AddIcon />}>
                Create Task
              </Button>
            </RouterLink>
          </Box>
          
          <Grid
            container
            columnSpacing={2}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: 3
            }}  
          >
            <Grid item >
              <FormControl>
                <TextField
                  size="small"
                  variant="outlined"
                  label="Search task by name"
                  onChange={handleSearchChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="start" >
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={<Switch />}
                  onChange={() => handleSwitchChange()}
                  label='Show completed tasks.'
                />
              </FormGroup>
            </Grid>
          </Grid>

          {isLoading && <Loading />}

          <Box marginTop={2}>
            <List disablePadding>
              {tasks.map((task) => (
                <Task key={task._id} task={task} />
              ))}
            </List>
          </Box>
        </Stack>
      </Container>
    </>
  );
};
