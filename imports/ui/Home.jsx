import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import { Link as RouterLink } from 'react-router-dom'; 
import {
  Button,
  Box,
  Paper,
  Grid,
  Typography,
  Container,
  Avatar,
} from "@mui/material";
import { Navbar } from "./NavBar";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import { TasksCollection } from "../db/TasksCollection";
import { Loading } from "./Loading";

export const Home = () => {
  const [tasksTotal, setTasksTotal] = useState("");
  const [tasksInProgress, setTasksInProgress] = useState("");
  const [tasksCompleted, setTasksCompleted] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getTasksCounts = (tasks) => {
    let tasksTotal = 0;
    let tasksInProgress = 0;
    let tasksCompleted = 0;

    tasks.forEach((task) => {
      tasksTotal += 1;

      if (task.status === "Em Andamento") {
        tasksInProgress += 1;
      } else if (task.status === "Concluída") {
        tasksCompleted += 1;
      }
    });

    return { tasksTotal, tasksInProgress, tasksCompleted };
  };

  useTracker(() => {
    if (!Meteor.user()) {
      return;
    }

    const handler = Meteor.subscribe("tasks");

    if (handler.ready()) {
      const tasks = TasksCollection.find().fetch();

      if (tasks) {
        const { tasksTotal, tasksInProgress, tasksCompleted } =
          getTasksCounts(tasks);
        setTasksTotal(tasksTotal);
        setTasksInProgress(tasksInProgress);
        setTasksCompleted(tasksCompleted);
        setIsLoading(false);
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <Container>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "5%",
            }}
          >
            <Button
              variant="contained"
              startIcon={<FormatListBulletedIcon />}
              size="large"
              component={RouterLink}
              to='/'
            >
              Task List
            </Button>
          </Box>
          <Grid
            container
            spacing={8}
            sx={{
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={12}
                sx={{
                  maxWidth: "350px",
                  paddingY: 2,
                  backgroundColor: "#1976d2",
                  color: '#fff'
                }}
              >
                <TaskOutlinedIcon sx={{ fontSize: 70}} />
                <Box>
                  <Typography variant="h3">{tasksTotal}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">Registered tasks</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={12}
                sx={{
                  maxWidth: "350px",
                  paddingY: 2,
                  backgroundColor: "#1976d2",
                  color: '#fff'
                }}
              >
                <AutorenewIcon sx={{ fontSize: 70 }} />
                <Box>
                  <Typography variant="h3">{tasksInProgress}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">Tasks in progress</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Paper
                elevation={12}
                sx={{
                  maxWidth: "350px",
                  paddingY: 2,
                  backgroundColor: "#1976d2",
                  color: '#fff'
                }}
              >
                <TaskAltIcon sx={{ fontSize: 70 }} />
                <Box>
                  <Typography variant="h3">{tasksCompleted}</Typography>
                </Box>
                <Box>
                  <Typography variant="h6">Completed tasks</Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
