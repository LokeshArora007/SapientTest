import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

export default function Dropdown({ onItemChange }) {
  const classes = useStyles();
  const [sort, setSort] = React.useState("Ascending");

  const handleChange = useCallback(event => {
    setSort(event.target.value);
    onItemChange(event.target.value);
  });

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="sortBy">Sort BY</InputLabel>
        <Select
          labelId="sortBy"
          id="sortBy"
          value={sort}
          onChange={handleChange}
        >
          <MenuItem value="Ascending">Ascending</MenuItem>
          <MenuItem value="Descending">Descending</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
