import React, { useState, useEffect, useCallback } from "react";
import { Hidden, Box, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { FixedSizeList } from "react-window";
import Contact from "./Contact";
import { ContactDetail, CONTACT_DETAIL_ROUTE } from "./ContactDetail";
import ContactBackdrop from "./ContactBackdrop";
import Row from "./Row";
import ContactCreateEdit, { CREATE_ROUTE } from "./ContactCreateEdit";
import { useSingleAppDispatch, useAppState } from "../store/config";
import { apiGetContacts } from "../api/backend";
import { useIsDesktop } from "../utils/hooks";

export const CONTACTS_ROUTE = "/";

export function Contacts(props) {
  const { history } = props;
  const [backdropConfig, setBackDropConfig] = useState(() => ({
    isCreatEdit: false,
    isDetail: false,
    index: 0,
  }));
  const [paging, setPaging] = useState(() => ({ page: 0, size: 400 }));
  const isDesktop = useIsDesktop();
  const contacts = useAppState(({ contacts }) => contacts);
  const storeContacts = useSingleAppDispatch("STORE_CONTACTS");

  useEffect(() => {
    if (!contacts.length) {
      apiGetContacts(paging.page, paging.size)
        .then(({ data }) => storeContacts(data.content))
        .catch((err) => console.log(err));
    }
  });

  const openDetailModal = useCallback((index) => {
    setBackDropConfig({ isCreatEdit: false, isDetail: true, index });
  }, []);

  const openEditModal = useCallback((index) => {
    setBackDropConfig({ isCreatEdit: true, isDetail: false, index });
  }, []);

  const closeModal = useCallback(() => {
    setBackDropConfig({ isCreatEdit: false, isDetail: false, index: -1 });
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      closeModal();
    }
  }, [closeModal, isDesktop]);

  function routeToDetail(index) {
    history.push(CONTACT_DETAIL_ROUTE.replace(":index", index));
  }

  return (
    <Box>
      <Hidden smDown>
        <Row
          name="Name"
          phoneNumber="Phone Number"
          email="Email"
          address="Address"
        />
      </Hidden>

      <FixedSizeList
        // className={classes.root}
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

      <ContactBackdrop open={backdropConfig.isDetail} onClick={closeModal}>
        {backdropConfig.isDetail && (
          <ContactDetail
            contactIndex={backdropConfig.index}
            closeDetailModal={closeModal}
            openEditModal={openEditModal}
          />
        )}
      </ContactBackdrop>

      <ContactBackdrop open={backdropConfig.isCreatEdit}>
        {backdropConfig.isCreatEdit && (
          <ContactCreateEdit
            closeModal={closeModal}
            contactIndex={backdropConfig.index}
          />
        )}
      </ContactBackdrop>

      {!isDesktop && (
        <Box position="absolute" bottom={16} right={16} clone>
          <Fab color="primary" onClick={() => history.push(CREATE_ROUTE)}>
            <AddIcon />
          </Fab>
        </Box>
      )}
    </Box>
  );
}

export default Contacts;
