import { View } from 'react-native';
import ContactForm from '../components/ContactForm';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContactsContext } from '../context/ContactsContext';
const ContactFormScreen = ({ navigation, route }) => {
  const insets = useSafeAreaInsets();
  const { contact } = route.params;
  const { addContact, editContact } = useContactsContext();

  const onSubmit = newContact => {
    if (contact._id !== undefined) {
      editContact(contact._id, newContact);
    } else {
      addContact(newContact);
    }
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1, padding: 10, marginBottom: insets.bottom }}>
      <ContactForm contact={contact} onSubmit={onSubmit} />
    </View>
  );
};
export default ContactFormScreen;
