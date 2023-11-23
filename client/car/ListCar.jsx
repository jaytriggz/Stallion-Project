import React from "react";
import { useState } from "react";

import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import { list } from "./api-car.js";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { remove } from "./api-car.js";
import { Navigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  card: {
    // Define your card styles here
  },
  textField: {
    // Define your text field styles here
  },
  error: {
    // Define your error icon styles here
  },
  submit: {
    // Define your submit button styles here
  },
  title: {
    // Define your title styles here
  },
  root: {
    // Define your root styles here
  },
}));

export default function Cars() {
  const [cars, setCars] = useState([]);
  const [redirectToList, setRedirect] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setCars(data);
      }
    });
    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const deleteCar = (carId) => {
    remove(
      {
        carId: carId,
      }
    ).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        setRedirect(true);
      };
    });
  };

  if (redirectToList) {
    setRedirect(false);
    window.location.reload();
  }

  const classes = useStyles();
  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        All Cars
      </Typography>
      <List dense>
        {cars.map((car, i) => {
          return (
            // <Link component={RouterLink} to={"/car/" + item._id} key={i}>
              <ListItem button key={i}>
              <ListItemText primary={i+1} />
                <ListItemText primary={car.model} />
                <ListItemText primary={car.description} />
                <ListItemText primary={car.year} />
                <ListItemText primary={car.seats} />
                <ListItemText primary={car.transmission} />
                <ListItemText primary={car.fuelType} />
                <ListItemText primary={car.mileage} />
                <ListItemSecondaryAction>
                  <RouterLink to={"/listCar/edit/" + car._id}>
                    <IconButton aria-label="Edit" color="primary">
                      <EditIcon />
                    </IconButton>
                  </RouterLink>
                  <IconButton aria-label="Delete" onClick={() => deleteCar(car._id)} color="secondary">
                    <DeleteForeverIcon />
                  </IconButton>

                </ListItemSecondaryAction>
              </ListItem>
            // </Link>
          );
        })}
      </List>
    </Paper>
  );
}
