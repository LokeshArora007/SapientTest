import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "start",
    flexWrap: "wrap",
    margin: theme.spacing(1)
  },
  chip: {
    margin: theme.spacing(0.5)
  }
}));

export default function ChipsArray(props) {
  const classes = useStyles();
  // const [chipData, setChipData] = React.useState(props.chips);
  //console.log(chipData);
  const [chipData, setChipData] = useState(null);

  useEffect(() => {
    setChipData(props.chips);
  }, [props.chips]);

  const handleDelete = chipToDelete => () => {
    setChipData(chips => chips.filter(chip => chip.key !== chipToDelete.key));
  };

  return (
    <>
      <h3>Selected Filters</h3>
      <Paper className={classes.root}>
        {chipData &&
          chipData.map(data => {
            return (
              <Chip
                key={data.key}
                label={data.label}
                onDelete={
                  data.label === "React" ? undefined : handleDelete(data)
                }
                className={classes.chip}
              />
            );
          })}
      </Paper>
    </>
  );
}
