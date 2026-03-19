import { FlatList, View, Text } from 'react-native';
import { FAB } from 'react-native-paper';
import ContactListItem from '../components/ContactListItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useContactsContext } from '../context/ContactsContext';

const ContactListScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const { contacts, isOnline } = useContactsContext();

  const renderItem = ({ item }) => (
    <ContactListItem
      contact={item}
      onPress={() => navigation.navigate('ContactView', { contact: item })}
    />
  );

  return (
    <View style={{ flex: 1, padding: 10, marginBottom: insets.bottom }}>
      {/* FlatList to render all contacts */}
      <View
        style={{
          padding: 8,
          backgroundColor: isOnline ? '#4CAF50' : '#F44336',
          alignItems: 'center',
          borderRadius: 6,
          marginBottom: 8,
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>
          {isOnline ? 'Online' : 'Offline'}
        </Text>
      </View>

      <FlatList
        data={contacts.filter(c => c._id !== undefined)}
        keyExtractor={item => item._id.toString()}
        renderItem={renderItem}
        extraData={contacts}
      />
      {/* FAB to add a new contact */}
      <FAB
        icon="plus"
        style={{ position: 'absolute', bottom: 16, right: 16 }}
        onPress={() => navigation.navigate('ContactForm', { contact: {} })}
      />
    </View>
  );
};
export default ContactListScreen;
