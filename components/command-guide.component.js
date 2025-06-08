import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

function CommandGuideComponent({ title, description, icon }) {
  const [open, setOpen] = useState(false);
  if (!description) {
    return null;
  }
  return (
    <>
      {!icon && (
        <Button
          variant="outlined"
          color="secondary"
          size="small"
          className="mr-2"
          onClick={() => setOpen(true)}
        >
          {title}
        </Button>
      )}
      {icon && (
        <IconButton size="small" className="mr-2" onClick={() => setOpen(true)}>
          {icon}
        </IconButton>
      )}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        scroll="paper"
        fullScreen
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent className="break-word">
          <ReactMarkdown>{description}</ReactMarkdown>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CommandGuideComponent;
