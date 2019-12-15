import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  card: {
    height: 380,
    maxWidth: 360,
    background: "#00000f"
  },
  media: {
    height: 140
  },
  textColor: {
    color: "#ffffff"
  },
  right: {
    color: "#f5980e",
    textAlign: "right"
  }
});

export default function MediaCard(props) {
  const classes = useStyles();
  const cardData = props.data;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <div style={{ position: "relative" }}>
          <CardMedia className={classes.media} image={cardData.image} />
          <div
            style={{
              position: "absolute",
              width: "100%",
              top: 80,
              left: "50%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              transform: "translateX(-50%)"
            }}
          >
            {" "}
            <Typography
              className={classes.textColor}
              gutterBottom
              variant="h5"
              component="h5"
            >
              {cardData.name}
            </Typography>
            <Typography
              className={classes.textColor}
              variant="body2"
              component="span"
            >
              id:{cardData.id} created:{cardData.created}
            </Typography>
          </div>
        </div>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography
                variant="body2"
                className={classes.textColor}
                component="p"
              >
                STATUS:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="body2"
                className={classes.right}
                component="span"
              >
                {cardData.status}
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography
                variant="body2"
                className={classes.textColor}
                component="p"
              >
                SPECIES:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="body2"
                className={classes.right}
                component="span"
              >
                {cardData.species}
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography
                variant="body2"
                className={classes.textColor}
                component="p"
              >
                GENDER:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="body2"
                className={classes.right}
                component="span"
              >
                {cardData.gender}
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography
                variant="body2"
                className={classes.textColor}
                component="p"
              >
                ORIGIN:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="body2"
                className={classes.right}
                component="span"
              >
                {cardData.origin.name}
              </Typography>
            </Grid>
          </Grid>
          <hr />
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Typography
                variant="body2"
                className={classes.textColor}
                component="p"
              >
                LAST LOCATION:
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="body2"
                className={classes.right}
                component="span"
              >
                {cardData.location.name}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
