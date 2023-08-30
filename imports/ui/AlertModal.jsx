import React, { useState } from "react";
import { 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle } from "@mui/material";

export const AlertModal = ({title, message, handleConfirmationButton}) => {
  return(
    <>
      <Dialog
        open={true}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{textAlign: 'center'}}
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent sx={{paddingBottom: 1}}>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{paddingBottom: 2} }>
          <Button 
            sx={{
              margin: '0 auto',
            }}
            variant="outlined"
            onClick={() => handleConfirmationButton()} 
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}