import { withStyles } from "@material-ui/core/styles";

export default withStyles(theme => ({
  "@global": {
    ".container": {
      [theme.breakpoints.up(theme.breakpoints.values.md)]: {
        width: theme.breakpoints.values.md,
        margin: "auto"
      }
    }
  }
}))(() => null);
