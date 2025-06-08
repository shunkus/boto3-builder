import { FormControlLabel, IconButton } from "@mui/material";
import Close from "@mui/icons-material/Close";

function CloseControlComponent(props) {
  return (
    <FormControlLabel
      control={
        <IconButton size="small" {...props}>
          <Close fontSize="small" />
        </IconButton>
      }
    />
  );
}

export default CloseControlComponent;
