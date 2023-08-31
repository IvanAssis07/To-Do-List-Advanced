import React from "react";
import { Box, Button } from "@mui/material";

export const EditButtons = ({
  edit,
  handleEditButtonClick,
  handleCancelButtonClick,
  handleSaveButtonClick,
}) => {
  return (
    <>
      {!edit ? (
        <Button
          sx={{ marginTop: 2 }}
          variant="contained"
          onClick={() => handleEditButtonClick()}
        >
          Edit
        </Button>
      ) : (
        <>
          <Box sx={{ marginTop: 2 }}>
            <Button
              variant="contained"
              onClick={() => handleCancelButtonClick()}
            >
              Cancel
            </Button>
            <Button
              sx={{ marginLeft: 4 }}
              variant="contained"
              onClick={() => handleSaveButtonClick()}
            >
              Save
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
