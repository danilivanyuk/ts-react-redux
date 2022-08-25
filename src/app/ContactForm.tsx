import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../features/hooks";
import { addContact, editContact } from "../features/contactsSlice";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { IContact } from "../models/IContact";

interface IContactForm {
  type: string;
  contact: {
    id: number;
    userId: number;
    name: string;
    phone: string;
  };
  handleFormState: Function;
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
    <div style={{ width: "100%" }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1, width: "100%" }}
      >
        <Grid justifyContent="center" alignItems="center" container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="ContactName"
              label="Name"
              name="ContactName"
              value={newContact.name}
              autoFocus
              onChange={(e) =>
                setNewContact({ ...newContact, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="ContactPhone"
              label="Phone"
              name="ContactPhone"
              value={newContact.phone}
              onKeyPress={(e) => {
                if (!/[0-9]/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              onChange={(e) =>
                setNewContact({ ...newContact, phone: e.target.value })
              }
            />
          </Grid>
        </Grid>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          {type === "edit" ? "Confirm" : "Add Contact"}
        </Button>
        <Button
          fullWidth
          variant="outlined"
          sx={{ mt: 1 }}
          onClick={() => {
            handleFormState();
          }}
        >
          Cancel
        </Button>
      </Box>
    </div>
  );
}
