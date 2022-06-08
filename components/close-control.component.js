import { FormControlLabel, IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";

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
