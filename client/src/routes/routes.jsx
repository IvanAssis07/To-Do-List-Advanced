import { Meteor } from "meteor/meteor";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createRoot } from "react-dom/client";
import { TasksList } from "../screens/TasksList";
import { TaskData } from "../screens/TaskData";
import { CreateTask } from "../screens/CreateTask";
import { CreateAccount } from "../screens/CreateAccount";
import { Profile } from "../screens/Profile";
import { Home } from "../screens/Home";
import { Login } from "../screens/Login";
import { RequireAuth } from "../components/RequireAuth";

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
            element={<CreateAccount />}
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
