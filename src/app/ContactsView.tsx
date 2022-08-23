import React from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { deleteContact } from "../features/contactsSlice";

interface IContactsArg {
  contacts: any;
}

export default function ContactsView(parentData: IContactsArg) {
  console.log(parentData.contacts);
  const { contacts } = parentData;

  const dispatch = useAppDispatch();

  return (
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
  );
}
