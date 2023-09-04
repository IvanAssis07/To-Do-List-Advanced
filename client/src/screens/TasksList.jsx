import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { ReactiveVar } from "meteor/reactive-var";
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

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <FormControl>
              <TextField
                size="small"
                variant="outlined"
                label="Search task by name"
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 2,
            }}
          >
            <FormGroup>
              <FormControlLabel
                control={<Switch />}
                onChange={() => handleSwitchChange()}
                label={
                  showCompleted
                    ? "Showing completed tasks"
                    : "Click to also show completed tasks"
                }
              />
            </FormGroup>
          </Box>

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
