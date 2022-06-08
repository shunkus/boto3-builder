import { FormControlLabel, IconButton } from "@material-ui/core";
import { FileCopy } from "@material-ui/icons";
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
