import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { List, Button, Stack, Box, Container } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { TasksCollection } from "../../../api/domains/tasks/TasksCollection";
import { Loading } from '../components/Loading';
import { Task } from "../components/Task";
import { Navbar } from "../components/NavBar";

export const TasksList = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { tasks } = useTracker(() => {
    const noTasksAvailable = { tasks: [] };

    if (!Meteor.user()) {
      return noTasksAvailable;
    }

    const handler = Meteor.subscribe("tasks");

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
  }, []);

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

          {isLoading && (
            <Loading />
          )}

          <Box marginTop={5}>
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
