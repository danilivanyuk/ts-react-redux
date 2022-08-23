import React, { useEffect, useState } from "react";
import {
  getUserContacts,
  deleteContact,
  addContact,
  filterContacts,
} from "../features/contactsSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import ContactsView from "./ContactsView";
import FilteredContactsView from "./FilteredContactsView";

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
  let newId;
  useEffect(() => {
    dispatch(getUserContacts(userId));
  }, []);

  useEffect(() => {
    dispatch;
  });

  const handleContactFormState = () => {
    createContactForm
      ? setCreateContactForm(false)
      : setCreateContactForm(true);
  };

  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newContact, setNewContact] = useState({
    // id: Math.floor(Math.random() * (100 - 20 + 1) + 20),
    id: Math.random() * 10,
    userId: userId,
    name: "",
    phone: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    target.reset();
    setNewContact({ ...newContact, id: Math.random() * 10 });
    dispatch(addContact(newContact));
  };

  console.log(filteredContacts, filteredContacts.length);

  return (
    <div>
      <div>
        {createContactForm ? (
          <div>
            <form action="#" onSubmit={handleSubmit}>
              <input
                name="ContactName"
                type="text"
                minLength={2}
                maxLength={15}
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
              />

              <input
                name="ContactPhone"
                type="text"
                minLength={10}
                maxLength={11}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                onChange={(e) =>
                  setNewContact({ ...newContact, phone: e.target.value })
                }
              />
              <div>
                <button
                  type="submit"
                  onClick={() => {
                    if (newContact.name !== "" && newContact.phone !== "") {
                      console.log(newContact);
                    }
                  }}
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
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
          <ContactsView contacts={contacts} />
        )}
      </div>
    </div>
  );
}
