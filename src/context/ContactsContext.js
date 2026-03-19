import React, { useContext, useState, useEffect, createContext } from 'react';
import NetInfo from '@react-native-community/netinfo';
import {
  createContactRealm,
  readAllContacts,
  updateContactRealm,
  deleteContactRealm,
  openRealm,
} from '../db/realm';

export const ContactsContext = createContext();

export const ContactsProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const initRealm = async () => {
      await openRealm();
      const allContacts = readAllContacts();
      setContacts(allContacts);
    };
    initRealm();
  }, []);

  useEffect(() => {
    const checkInitialConnection = async () => {
      const state = await NetInfo.fetch();
      setIsOnline(state.isConnected ?? false);
    };
    checkInitialConnection();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
    });

    return () => unsubscribe();
  }, []);

  const syncContacts = async () => {
    if (!isOnline) return;

    const allContacts = readAllContacts();
    const unsynced = allContacts.filter(c => !c.isSynced);

    for (const contact of unsynced) {
      try {
        updateContactRealm(contact._id, { ...contact, isSynced: true });
        setContacts(prev =>
          prev.map(c => (c._id === contact._id ? { ...c, isSynced: true } : c)),
        );
      } catch (error) {
        console.log('Sync failed for contact:', contact._id, error);
      }
    }
  };

  useEffect(() => {
    syncContacts();
    const intervalId = setInterval(() => {
      syncContacts();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [isOnline]); // re-run when connectivity changes

  const addContact = contact => {
    const newId = createContactRealm(contact);
    setContacts(prev => [...prev, { ...contact, _id: newId, isSynced: false }]);
  };

  const editContact = (_id, newData) => {
    const updatedData = { ...newData, isSynced: false };
    updateContactRealm(_id, updatedData);

    setContacts(prev =>
      prev.map(c => (c._id === _id ? { ...c, ...updatedData } : c)),
    );
  };

  const removeContact = _id => {
    deleteContactRealm(_id);
    setContacts(prev => prev.filter(c => c._id !== _id));
  };

  const value = {
    contacts,
    addContact,
    editContact,
    removeContact,
    isOnline,
    setIsOnline,
  };

  return (
    <ContactsContext.Provider value={value}>
      {children}
    </ContactsContext.Provider>
  );
};

export const useContactsContext = () => useContext(ContactsContext);
