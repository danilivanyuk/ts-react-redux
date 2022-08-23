import React, { useEffect } from 'react'
import  { getUserContacts, deleteContact } from '../features/contactsSlice'
import { useAppDispatch, useAppSelector } from '../features/hooks'

interface IContactsComponentArg{
    userId: number
}

export default function Contacts(parentData:IContactsComponentArg) {
    const dispatch = useAppDispatch()
    const userId = parentData.userId
    
    useEffect(()=>{
        dispatch(getUserContacts(userId))
    },[])
    const {contacts} = useAppSelector(state => state.contactsReducer)
    
    return (
        <div>
        <button>Add contact</button>
        <div>{Object(contacts).map((contact:any) => 
        <div key={contact.id}>
            <div>{contact.name}</div>
            <div>{contact.phone}</div>
            <div>
                <button>Edit</button>
                <button onClick={()=> dispatch(deleteContact(contact.id))}>Delete</button>
            </div>
        </div>)}</div>
        </div>
    )
}
