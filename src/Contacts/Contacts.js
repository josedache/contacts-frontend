import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Hidden, useMediaQuery } from "@material-ui/core";
import { FixedSizeList } from "react-window";
import Contact from "./Contact";
import Details from "./Detail";
import { connect } from "react-redux";
import { getContact } from "../store/actions";
import ContactModal from "./Modal";
import Row from "./Row";
import CreateEdit from "./CreateEdit";


function Contacts({
  classes,
  contacts,
  history,
  isCreateEditModal,
  setCreatEditModal,
  getContact
}) {
  const [isDetailModal, setDetailModal] = useState(false);
  const [contactIndex, setContactIndex] = useState({});
  const [paging, setPaging] = useState({ page: 0, size: 400 });
  const isDesktop = useMediaQuery(theme =>
    theme.breakpoints.up(theme.breakpoints.values.sm)
  );

  useEffect(() => {
    if (!contacts.length)
      getContact(paging.page, paging.size).catch(err => console.log(err));
  });

  function openDetailModal(index) {
    setContactIndex(index);
    setDetailModal(true);
  }

  function routeToDetail(index) {
    history.push(Details.routeName.replace(":index", index));
  }

  function openEditModal(index) {
    setContactIndex(index);
    setDetailModal(false);
    setCreatEditModal(true);
  }

  function closeCreateEditModal() {
    setContactIndex(-1);
    setCreatEditModal(false);
  }

  return (
    <div>
      <Hidden smDown>
        <Row
          isDesktop={isDesktop}
          name="Name"
          phoneNumber="Phone Number"
          email="Email"
          address="Address"
        />
      </Hidden>

      <FixedSizeList
        className={classes.root}
        height={window.innerHeight - (isDesktop ? 120 : 60)}
        itemCount={contacts.length}
        itemSize={70}
        width="100%"
      >
        {({ index, style }) => (
          <Contact
            style={style}
            isDesktop={isDesktop}
            contactIndex={index}
            data={contacts[index]}
            showDetail={() =>
              isDesktop ? openDetailModal(index) : routeToDetail(index)
            }
          />
        )}
      </FixedSizeList>

      <ContactModal
        open={isDetailModal}
        backdropClick={() => setDetailModal(false)}
      >
        <Details
          contactIndex={contactIndex}
          setDetailModal={setDetailModal}
          openEditModal={openEditModal}
        />
      </ContactModal>

      <ContactModal open={isCreateEditModal}>
        <CreateEdit
          closeCreateEditModal={closeCreateEditModal}
          contactIndex={contactIndex}
        />
      </ContactModal>
    </div>
  );
}

Contacts.propTypes = {
  classes: PropTypes.object.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phoneNumber: PropTypes.string.isRequired,
      email: PropTypes.string,
      address: PropTypes.string,
      imageUrl: PropTypes.string
    })
  )
};

Contacts.routeName = "/";

const mapStateToProps = ({ contacts }) => ({ contacts });
const mapDispatchToProps = {
  getContact
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contacts);
