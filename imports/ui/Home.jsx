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

  const tasksCounts = {
    total: 0,
    inProgress: 0,
    completed:0
  }

  const getTasksCounts = (tasks, tasksCounts) => {
    tasks.forEach((task) => {
      tasksCounts.total += 1;

      if (task.status === "Em Andamento") {
        tasksCounts.inProgress += 1;
      } else if (task.status === "Concluída") {
        tasksCounts.completed += 1;
      }
    });
  };

  useTracker(() => {
    if (!Meteor.user()) {
      return;
    }

    const handler = Meteor.subscribe("tasks");

    if (handler.ready()) {
      const tasks = TasksCollection.find().fetch();

      if (tasks) {
        getTasksCounts(tasks, tasksCounts);
        setTasksTotal(tasksCounts.total);
        setTasksInProgress(tasksCounts.inProgress);
        setTasksCompleted(tasksCounts.completed);
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
              to='/TasksList'
            >
              Task List
            </Button>
          </Box>
          <Grid
            container
            spacing={4}
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
