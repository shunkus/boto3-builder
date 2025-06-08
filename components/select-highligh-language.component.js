import { FormControl, MenuItem, Select } from "@material-ui/core";
import { availableLanguages } from "../constants/highlight";

function SelectHighlightLanguageComponent({ language, onChange }) {
  return (
    <FormControl>
      <Select value={language || ""} onChange={onChange}>
        {availableLanguages.map((lang) => (
          <MenuItem key={lang.key} value={lang.value}>
            {lang.key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectHighlightLanguageComponent;
