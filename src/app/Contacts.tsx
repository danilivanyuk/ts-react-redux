import React, { useEffect, useState } from "react";
import {
  getUserContacts,
  deleteContact,
  addContact,
  filterContacts,
} from "../features/contactsSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import ContactForm from "./ContactForm";
import ContactView from "./ContactView";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import TableRow from "@mui/material/TableRow";
import { IContact } from "../models/IContact";

interface IContactsComponentArg {
  userId: number;
}

export default function Contacts(parentData: IContactsComponentArg) {
  const [createContactForm, setCreateContactForm] = useState(false);
  const dispatch = useAppDispatch();
  const userId = parentData.userId;
  const { contacts, filteredContacts } = useAppSelector(
    (state) => state.contactsReducer
  );

  useEffect(() => {
    dispatch(getUserContacts(userId));
  }, []);

  const handleContactFormState = () => {
    createContactForm
      ? setCreateContactForm(false)
      : setCreateContactForm(true);
  };

  return (
    <Container>
      <TextField
        margin="normal"
        fullWidth
        name="Search"
        label="Search"
        type="text"
        onChange={(e) => {
          dispatch(filterContacts(e.target.value));
        }}
      />
      <div>
        {createContactForm ? (
          <ContactForm
            type="add"
            handleFormState={handleContactFormState}
            contact={{ id: 0, name: "", phone: "", userId: 0 }}
          />
        ) : (
          ""
        )}
      </div>
      <div>
        <Button
          type="submit"
          fullWidth
          variant={createContactForm ? "outlined" : "contained"}
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {
            handleContactFormState();
          }}
        >
          {createContactForm ? "Cancel" : "Add Contact"}
        </Button>
      </div>

      <div
        style={{
          width: "100% !important",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {Object(filteredContacts.length > 0 ? filteredContacts : contacts).map(
          (contact: IContact) => (
            <TableRow
              key={contact.id}
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                border: 0,
                alignItems: "center",
              }}
            >
              <ContactView contact={contact} />
            </TableRow>
          )
        )}
      </div>
    </Container>
  );
}
