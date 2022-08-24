import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { deleteContact } from "../features/contactsSlice";
import ContactForm from "./ContactForm";
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
    <div key={contact.id}>
      {editContactForm ? (
        <div>
          <ContactForm type="edit" contact={contact} />
          <button
            onClick={() => {
              handleContactEditFormState();
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <div>{contact.id}</div>
          <div>{contact.name}</div>
          <div>{contact.phone}</div>
          <div>
            <button
              onClick={() => {
                handleContactEditFormState();
              }}
            >
              Edit
            </button>
            <button onClick={() => dispatch(deleteContact(contact.id))}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
