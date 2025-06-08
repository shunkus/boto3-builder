import { FormControlLabel, IconButton } from "@mui/material";
import FileCopy from "@mui/icons-material/FileCopy";
import { CopyToClipboard } from "react-copy-to-clipboard";

function CopyControlComponent({ textToCopy }) {
  return (
    <FormControlLabel
      control={
        <CopyToClipboard text={textToCopy}>
          <IconButton size="small" onClick={(e) => e.stopPropagation()}>
            <FileCopy fontSize="small" />
          </IconButton>
        </CopyToClipboard>
      }
    />
  );
}

export default CopyControlComponent;
