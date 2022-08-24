import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { addContact } from "../features/contactsSlice";

interface IContactForm {
  type: string;
  contact?: any;
}

export default function ContactForm(parentData: IContactForm) {
  const { type, contact } = parentData;
  const dispatch = useAppDispatch();

  const [newContact, setNewContact] = useState({
    id: Math.random() * 10,
    userId: useAppSelector((state) => state.userReducer.user[0].id),
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
      <form action="#" onSubmit={handleSubmit}>
        <input
          name="ContactName"
          type="text"
          value={type === "edit" ? contact.name : ""}
          minLength={2}
          maxLength={15}
          onChange={(e) =>
            setNewContact({ ...newContact, name: e.target.value })
          }
        />

        <input
          name="ContactPhone"
          type="text"
          value={type === "edit" ? contact.phone : ""}
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
            {type === "edit" ? "Confirm" : "Add contact"}
          </button>
        </div>
      </form>
    </div>
  );
}
