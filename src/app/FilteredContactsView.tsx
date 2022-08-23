import React from "react";
import { deleteContact } from "../features/contactsSlice";
import { useAppDispatch, useAppSelector } from "../features/hooks";

interface IFilteredContactsArg {
  filteredContacts: any;
}

export default function FilteredContactsView(parentData: IFilteredContactsArg) {
  const dispatch = useAppDispatch();

  const { filteredContacts } = parentData;
  console.log(filteredContacts);
  return (
    <div>
      {filteredContacts.map((contact: any) => (
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
