import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { LoginForm } from "./LoginForm";
import { Task } from "./Task";
import { Navbar } from "./NavBar";
import { List, Button, Stack, Box, Container } from "@mui/material";
import { TasksCollection } from "../db/TasksCollection";
import AddIcon from "@mui/icons-material/Add";
import CircularProgress from "@mui/material/CircularProgress";
import { Link as RouterLink } from "react-router-dom";

export const App = () => {
  const user = useTracker(() => Meteor.user(), []);
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
      {user ? (
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
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "10%",
                    justifyContent: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
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
      ) : (
        <LoginForm />
      )}
    </>
  );
};
