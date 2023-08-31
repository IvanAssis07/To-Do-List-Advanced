import { Meteor } from "meteor/meteor";
import React from "react";
import { createRoot } from "react-dom/client";
import { TasksList } from "/imports/ui/TasksList";
import { TaskData } from "../imports/ui/TaskData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { CreateTask } from "../imports/ui/CreateTask";
import { CreateAccount } from "../imports/ui/CreateAccount";
import { Profile } from "../imports/ui/Profile";
import { Home } from "../imports/ui/Home";
import { Login } from "../imports/ui/Login";
import { RequireAuth } from "../imports/ui/RequireAuth";

Meteor.startup(() => {
  const root = createRoot(document.getElementById("react-target"));

  root.render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/TaskData/:taskId"
            element={
              <RequireAuth>
                <TaskData />
              </RequireAuth>
            }
          />
          <Route
            path="/TasksList"
            element={
              <RequireAuth>
                <TasksList />
              </RequireAuth>
            }
          />
          <Route
            path="/CreateTask"
            element={
              <RequireAuth>
                <CreateTask />
              </RequireAuth>
            }
          />
          <Route
            path="/CreateAccount"
            element={
              <RequireAuth>
                <CreateAccount />
              </RequireAuth>
            }
          />
          <Route
            path="/Profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="/Home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
});
