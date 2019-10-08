import React from "react";
import PropTypes from "prop-types";

import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Hidden,
  makeStyles
} from "@material-ui/core";

const useStyle = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up(theme.breakpoints.values.md)]: {
      width: theme.breakpoints.values.md,
      margin: "auto"
    }
  },
  itemText: {
    width: theme.breakpoints.values.md / 4 - 10,
    padding: `0 ${theme.spacing(1)}px`,
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  headerNameWidth: {
    width: theme.breakpoints.values.md / 4 + 40,
    padding: `0 ${theme.spacing(1)}px`
  }
}));

function Row(props) {
  const classes = useStyle();
  return (
    <ListItem
      className={classes.root}
      button={props.button}
      onClick={props.onClick}
      divider={!props.image}
    >
      {props.image && (
        <ListItemAvatar>
          <props.image />
        </ListItemAvatar>
      )}
      <ListItemText
        className={props.image ? classes.itemText : classes.headerNameWidth}
        primary={props.name}
        secondary={!props.isDesktop && props.image ? props.phoneNumber : null}
      />
      <Hidden smDown>
        <ListItemText
          className={classes.itemText}
          primary={props.phoneNumber}
        />
        <ListItemText className={classes.itemText} primary={props.email} />
        <ListItemText className={classes.itemText} primary={props.address} />
      </Hidden>
    </ListItem>
  );
}

Row.propTypes = {
  button: false,
  primaryGlyph: "avatar"
};

Row.propTypes = {
  button: PropTypes.bool,
  isDesktop: PropTypes.bool,
  primaryGlyph: PropTypes.elementType,
  name: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string])
    .isRequired,
  phoneNumber: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string])
    .isRequired,
  email: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  address: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  image: PropTypes.elementType,
  onClick: PropTypes.func
};

export default Row;
