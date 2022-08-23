import React, { useEffect, useState } from "react";
import {
  getUserContacts,
  deleteContact,
  addContact,
} from "../features/contactsSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks";

interface IContactsComponentArg {
  userId: number;
}

export default function Contacts(parentData: IContactsComponentArg) {
  const [createContactForm, setCreateContactForm] = useState(true);
  const dispatch = useAppDispatch();
  const userId = parentData.userId;
  const { contacts } = useAppSelector((state) => state.contactsReducer);
  let newId;
  useEffect(() => {
    dispatch(getUserContacts(userId));
  }, []);

  const handleContactFormState = () => {
    createContactForm
      ? setCreateContactForm(false)
      : setCreateContactForm(true);
  };
  console.log(contacts);

  const [newContactName, setNewContactName] = useState("");
  const [newContactPhone, setNewContactPhone] = useState("");
  const [newContact, setNewContact] = useState({
    // id: Math.floor(Math.random() * (100 - 20 + 1) + 20),
    id: Math.random() * 10,
    userId: userId,
    name: "",
    phone: "",
  });
  console.log(newContact);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    target.reset();
    setNewContact({ ...newContact, id: Math.random() * 10 });
    dispatch(addContact(newContact));
  };

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
          onChange={() => {
            contacts;
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
        {Object(contacts).map((contact: any) => (
          <div key={contact.id}>
            <div>{contact.id}</div>
            <div>{contact.name}</div>
            <div>{contact.phone}</div>
            <div>
              <button>Edit</button>
              <button onClick={() => dispatch(deleteContact(contact.id))}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
