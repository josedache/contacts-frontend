import React, { useState } from "react";
import PropTypes from "prop-types";
import { AppBar, Toolbar, Typography, Fab, Hidden } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Contacts from "../Contacts";
import Detail from "../Contacts/Detail";
import CreateEdit from "../Contacts/CreateEdit";
import { Route, withRouter } from "react-router-dom";

function Layout({ classes, location, history }) {
  const [isCreateEditModal, setCreatEditModal] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar className={["container", classes.toolbar].join(" ")}>
          <Typography className={classes.title} variant="h5" noWrap>
            Contacts
          </Typography>
          <Hidden smDown>
            <Fab
              variant="extended"
              aria-label="add"
              onClick={() => setCreatEditModal(true)}
              color="secondary"
            >
              <AddIcon className={classes.extendedIcon} />
              <Typography>Create contact</Typography>
            </Fab>
          </Hidden>
        </Toolbar>
      </AppBar>

      <Route
        exact
        path={Contacts.routeName}
        render={props => (
          <Contacts {...{ ...props, isCreateEditModal, setCreatEditModal }} />
        )}
      />
      <Route path={Detail.routeName} component={Detail} />
      <Route path={CreateEdit.routeName} component={CreateEdit} />

      {!CreateEdit.routeName.includes(location.pathname) && (
        <Hidden smUp>
          <Fab
            color="primary"
            className={classes.fab}
            onClick={() => history.push(CreateEdit.routeName[0])}
          >
            <AddIcon />
          </Fab>
        </Hidden>
      )}
    </>
  );
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withRouter(Layout);
