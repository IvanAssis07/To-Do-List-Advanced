import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import {
  Stack,
  TextField,
  Box,
  Button,
  Typography,
  MenuItem,
} from "@mui/material";
import Select from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Navbar } from "./NavBar";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { TasksCollection } from "../db/TasksCollection";
import { useTracker } from "meteor/react-meteor-data";

export const TaskData = () => {
  const adapter = new AdapterDayjs();
  const { taskId } = useParams();

  const [edit, setEdit] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [taskDeadline, setTaskDeadline] = useState('');
  const [taskCreator, setTaskCreator] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [originStatus, setOriginStatus] = useState('');

  const validTransitions = {
    Cadastrada: ["Cadastrada", "Em Andamento"],
    "Em Andamento": ["Em Andamento", "Concluída", "Cadastrada"],
    Concluída: ["Concluída", "Cadastrada"],
  };

  const availableStatusOptions = validTransitions[taskStatus];

  const handleEditButtonClick = () => {
    setEdit(true);
  };

  const handleCancelButtonClick = () => {
    Meteor.call('tasks.update', {
      name: taskName,
      description: taskDescription,
      deadline: taskDeadline.toDate(),
      status: taskStatus
    });

    setEdit(false);
  };

  const handleSaveButtonClick = () => {
    setEdit(false);
  };

  const handleStatusTransitions = (newStatus) => {
    setTaskStatus(newStatus);
  };

  useTracker(() => {
    if (!Meteor.user()) {
      return;
    }

    const handler = Meteor.subscribe("taskData", taskId);

    if (handler.ready()) {
      const task = TasksCollection.findOne({ _id: taskId });

      if (task) {
        setTaskName(task.name);
        setTaskDescription(task.description);
        setTaskDeadline(task.deadline);
        setTaskStatus(task.status);
        setOriginStatus(task.status);
        setTaskCreator(task.creator);
      }

      setIsLoading(false);
    }
  }, [taskId]);

  return (
    <>
      <Navbar />
      <Stack
        direction="column"
        sx={{
          display: "flex",
          marginTop: "5%",
          minHeight: "100vh",
          textAlign: "center",
        }}
      >
        <Typography variant="h3">Edit task</Typography>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              marginTop: "10%",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Box component="form" autoComplete="off">
            {edit ? (
              <Box paddingX="30%">
                <TextField
                  autoFocus
                  margin="normal"
                  fullWidth
                  id="name"
                  defaultValue={taskName}
                  label="Name"
                  name="name"
                  disabled={!edit}
                  onChange={(e) => setTaskName(e.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="description"
                  defaultValue={taskDescription}
                  label="Description"
                  name="taskDescription"
                  disabled={!edit}
                  onChange={(e) => setTaskDescription(e.target.value)}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="creator"
                  defaultValue={taskCreator}
                  label="Creator"
                  name="creator"
                  disabled={!edit}
                  onChange={(e) => setTaskDeadline(e.target.value)}
                />
                <DatePicker
                  fullWidth
                  sx={{ width: "100%", marginBottom: 2, marginTop: 2 }}
                  disabled={!edit}
                  label="Deadline"
                  value={adapter.date(taskDeadline)}
                  onChange={(deadline) => setTaskDeadline(deadline)}
                />
                <Box>
                  <Select
                    id="status"
                    label="status"
                    onChange={(e) => handleStatusTransitions(e.target.value)}
                    disabled={!edit}
                    value={taskStatus}
                    sx={{ width: "70%", marginRight: "5%" }}
                  >
                    {availableStatusOptions.map((status, index) => (
                      <MenuItem
                        key={index}
                        value={status}
                        disabled={index === 0}
                      >
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button
                    variant="outlined"
                    sx={{ width: "25%", height: "100%" }}
                    onClick={() => handleStatusTransitions(originStatus)}
                  >
                    Reset Status
                  </Button>
                </Box>
                <Box sx={{ marginTop: 2 }}>
                  <Button variant="contained" onClick={handleCancelButtonClick}>
                    Cancel
                  </Button>
                  <Button
                    sx={{ marginLeft: 4 }}
                    variant="contained"
                    onClick={handleSaveButtonClick}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            ) : (
              <>
                <Typography marginY={2} variant="subtitle1">
                  Name: {taskName}
                </Typography>
                <Typography marginY={2} variant="subtitle1">
                  Description: {taskDescription}
                </Typography>
                <Typography marginY={2} variant="subtitle1">
                  Creator: ???
                </Typography>
                <Typography marginY={2} variant="subtitle1">
                  Dealine: {taskDeadline.toLocaleString()}
                </Typography>
                <Typography marginY={2} variant="subtitle1">
                  Status: {taskStatus}
                </Typography>
                <Button variant="contained" onClick={handleEditButtonClick}>
                  Edit
                </Button>
              </>
            )}
          </Box>
        )}
      </Stack>
    </>
  );
};
