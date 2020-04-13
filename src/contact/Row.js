import React from "react";
import PropTypes from "prop-types";
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Hidden,
  makeStyles,
} from "@material-ui/core";
import { useIsDesktop } from "../utils/hooks";

const useStyle = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up(theme.breakpoints.values.md)]: {
      width: theme.breakpoints.values.md,
      margin: "auto",
    },
  },
  itemText: {
    width: theme.breakpoints.values.md / 4 - 10,
    padding: `0 ${theme.spacing(1)}px`,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  headerNameWidth: {
    width: theme.breakpoints.values.md / 4 + 40,
    padding: `0 ${theme.spacing(1)}px`,
  },
}));

export function Row(props) {
  const { button, onClick, Image, name, email, address, phoneNumber } = props;
  const classes = useStyle();
  const isDesktop = useIsDesktop();
  return (
    <ListItem
      className={classes.root}
      button={button}
      onClick={onClick}
      divider={!Image}
    >
      {Image && (
        <ListItemAvatar>
          <Image />
        </ListItemAvatar>
      )}
      <ListItemText
        className={Image ? classes.itemText : classes.headerNameWidth}
        primary={name}
        secondary={!isDesktop && Image ? phoneNumber : null}
      />
      <Hidden smDown>
        <ListItemText className={classes.itemText} primary={phoneNumber} />
        <ListItemText className={classes.itemText} primary={email} />
        <ListItemText className={classes.itemText} primary={address} />
      </Hidden>
    </ListItem>
  );
}

Row.propTypes = {
  button: false,
  primaryGlyph: "avatar",
};

Row.propTypes = {
  button: PropTypes.bool,
  primaryGlyph: PropTypes.elementType,
  name: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string])
    .isRequired,
  phoneNumber: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string])
    .isRequired,
  email: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  address: PropTypes.oneOfType([PropTypes.elementType, PropTypes.string]),
  image: PropTypes.elementType,
  onClick: PropTypes.func,
};

export default Row;
