import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { deleteContact } from "../features/contactsSlice";
import ContactForm from "./ContactForm";
import TableCell from "@mui/material/TableCell";
import Button from "@mui/material/Button";

interface IContact {
  contact: any;
}

export default function ContactView(parentData: IContact) {
  const { contact } = parentData;

  const [editContactForm, setEditContactForm] = useState(false);
  const dispatch = useAppDispatch();

  const handleContactEditFormState = () => {
    editContactForm ? setEditContactForm(false) : setEditContactForm(true);
  };

  return (
    <>
      {editContactForm ? (
        <ContactForm
          type="edit"
          contact={contact}
          handleFormState={handleContactEditFormState}
        />
      ) : (
        <>
          <TableCell
            component="th"
            scope="row"
            sx={{ border: 0, width: "25%" }}
          >
            {contact.name}
          </TableCell>
          <TableCell align="right" sx={{ border: 0, width: "25%" }}>
            {contact.phone}
          </TableCell>
          <TableCell align="right" sx={{ border: 0, width: "25%" }}>
            <Button
              onClick={() => {
                handleContactEditFormState();
              }}
            >
              Edit
            </Button>
          </TableCell>
          <TableCell align="right" sx={{ border: 0, width: "25%" }}>
            <Button onClick={() => dispatch(deleteContact(contact.id))}>
              Delete
            </Button>
          </TableCell>
        </>
      )}
    </>
  );
}
