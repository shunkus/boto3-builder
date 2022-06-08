import React from "react";
import { InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";

function SearchFieldComponent(props) {
  return (
    <TextField
      color="secondary"
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
}

export default SearchFieldComponent;
