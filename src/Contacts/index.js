import { withStyles, createStyles } from "@material-ui/core";
import Contacts from "./Contacts";

const style = theme =>
  createStyles({
    root: {
      
    },
    header: {
      // // height: 70,
      // maxWidth: 1000,
      // margin: "auto"
    },
  });

export default withStyles(style, { withTheme: true })(Contacts);
