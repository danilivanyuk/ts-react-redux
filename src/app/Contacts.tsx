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
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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
    <Container>
      <TextField
        margin="normal"
        fullWidth
        name="Search"
        label="Search"
        type="text"
        onChange={(e) => {
          dispatch(filterContacts(e.target.value));
        }}
      />
      <div>
        {createContactForm ? (
          <ContactForm type="add" handleFormState={handleContactFormState} />
        ) : (
          ""
        )}
      </div>
      <div>
        <Button
          type="submit"
          fullWidth
          variant={createContactForm ? "outlined" : "contained"}
          sx={{ mt: 3, mb: 2 }}
          onClick={() => {
            handleContactFormState();
          }}
        >
          {createContactForm ? "Cancel" : "Add Contact"}
        </Button>
      </div>

      <div>
        <div>
          <Box sx={{ width: "100%" }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650, position: "relative" }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow>
                    {/* <TableCell></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right"></TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object(
                    filteredContacts.length > 0 ? filteredContacts : contacts
                  ).map((contact: any) => (
                    <TableRow
                      key={contact.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <ContactView contact={contact} />
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </div>
      </div>
    </Container>
  );
}
