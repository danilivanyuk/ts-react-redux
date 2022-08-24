import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { addContact, editContact } from "../features/contactsSlice";

interface IContactForm {
  type: string;
  contact?: any;
  handleFormState?: any;
}

export default function ContactForm(parentData: IContactForm) {
  const { type, contact, handleFormState } = parentData;
  const dispatch = useAppDispatch();

  const [newContact, setNewContact] = useState(
    type === "add"
      ? {
          id: Math.random() * 10,
          userId: useAppSelector((state) => state.userReducer.user[0].id),
          name: "",
          phone: "",
        }
      : contact
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    target.reset();
    if (type === "add") {
      setNewContact({ ...newContact, id: Math.random() * 10 });
      dispatch(addContact(newContact));
    } else {
      dispatch(editContact(newContact));
    }
    handleFormState();
  };

  return (
    <div>
      <form action="#" onSubmit={handleSubmit}>
        <input
          name="ContactName"
          type="text"
          value={newContact.name}
          minLength={2}
          maxLength={15}
          onChange={(e) =>
            setNewContact({ ...newContact, name: e.target.value })
          }
        />

        <input
          name="ContactPhone"
          type="text"
          value={newContact.phone}
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
          <button type="submit">
            {type === "edit" ? "Confirm" : "Add Contact"}
          </button>
        </div>
      </form>
    </div>
  );
}
