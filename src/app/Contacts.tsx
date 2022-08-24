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
import FilteredContactsView from "./FilteredContactsView";

interface IContactsComponentArg {
  userId: number;
}

export default function Contacts(parentData: IContactsComponentArg) {
  const [createContactForm, setCreateContactForm] = useState(false);
  const [editContactForm, setEditContactForm] = useState(false);
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
    <div>
      <div>{createContactForm ? <ContactForm type="add" /> : ""}</div>
      <div>
        <input
          type="text"
          onChange={(e) => {
            dispatch(filterContacts(e.target.value));
          }}
        />
      </div>
      <button
        onClick={() => {
          handleContactFormState();
        }}
      >
        {createContactForm ? "Cancel" : "Add Contact"}
      </button>
      <div>
        {filteredContacts.length > 0 ? (
          <FilteredContactsView filteredContacts={filteredContacts} />
        ) : (
          // <ContactsView contacts={contacts} />
          // {Object(contacts).map()}
          <div>
            {Object(contacts).map((contact: any) => (
              <ContactView contact={contact} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
