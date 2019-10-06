import { withStyles, createStyles } from "@material-ui/core";
import Layout from "./Layout";

const styles = theme =>
  createStyles({
    fab: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    title: {
      flexGrow: 1,
      // display: "none",
      letterSpacing: 2,
      [theme.breakpoints.up("sm")]: {
        display: "block"
      }
    },
    toolbar: {
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    }
  });

export default withStyles(styles)(Layout);
