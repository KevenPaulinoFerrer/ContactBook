import React, { useContext, useState, useEffect, createContext } from 'react';
import {
  createContactRealm,
  readAllContacts,
  updateContactRealm,
  deleteContactRealm,
  openRealm,
} from '../db/realm';

export const ContactsContext = createContext();
export const ContactsProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const initRealm = async () => {
      await openRealm();
      const allContacts = readAllContacts();
      setContacts(allContacts);
    };
    initRealm();
  }, []);

  const addContact = contact => {
    const newId = createContactRealm(contact);
    setContacts(prev => [...prev, { ...contact, id: newId }]);
  };

  const editContact = (id, newData) => {
    updateContactRealm(id, newData);
    setContacts(prev =>
      prev.map(c => (c.id === id ? { ...c, ...newData } : c)),
    );
  };

  const removeContact = id => {
    deleteContactRealm(id);
    setContacts(prev => prev.filter(c => c.id !== id));
  };

  const value = {
    contacts,
    setContacts,
    addContact,
    editContact,
    removeContact,
  };
  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContactsContext = () => useContext(ContactsContext);
