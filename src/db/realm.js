import Realm from 'realm';

// Contact schema
const ContactSchema = {
  name: 'Contact',
  properties: {
    _id: 'int', // primary key
    name: 'string',
    phone: 'string',
    email: 'string?', // optional
    isSynced: { type: 'bool', default: false },
  },
  primaryKey: '_id',
};

let realm;

// Open Realm
export const openRealm = async () => {
  realm = await Realm.open({
    path: 'contactsRealm.realm',
    schema: [ContactSchema],
    schemaVersion: 1, // optional, but needed if you later add migration
  });
};

// Create a new contact
export const createContactRealm = newData => {
  let newId;
  realm.write(() => {
    const maxId = realm.objects('Contact').max('_id');
    newId = maxId ? maxId + 1 : 1;
    realm.create('Contact', {
      ...newData,
      _id: newId,
      isSynced: false, // always start unsynced
    });
  });
  return newId;
};

// Read all contacts
export const readAllContacts = () => {
  const contacts = realm.objects('Contact');
  return contacts.map(c => ({
    _id: c._id,
    name: c.name,
    phone: c.phone,
    email: c.email,
    isSynced: c.isSynced,
  }));
};

export const updateContactRealm = (_id, newData) => {
  realm.write(() => {
    let contact = realm.objectForPrimaryKey('Contact', _id);
    if (contact) {
      // update fields
      contact.name = newData.name;
      contact.phone = newData.phone;
      contact.email = newData.email;
      contact.isSynced = newData.isSynced;
    }
  });
};
// Delete contact
export const deleteContactRealm = _id => {
  realm.write(() => {
    const contact = realm.objectForPrimaryKey('Contact', _id);
    if (contact) {
      realm.delete(contact);
    }
  });
};
