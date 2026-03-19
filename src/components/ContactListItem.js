import { List, Avatar } from 'react-native-paper';
const ContactListItem = ({ contact, onPress }) => {
  const { name, phone, isSynced } = contact;
  return (
    <List.Item
      title={name}
      description={`${phone} • ${isSynced ? 'Synced' : 'Not synced'}`}
      left={() => <Avatar.Text size={40} label={name ? name[0] : '?'} />}
      right={() => (
        <List.Icon
          icon={isSynced ? 'check-circle' : 'cloud-off-outline'}
          color={isSynced ? 'green' : 'red'}
        />
      )}
      onPress={onPress}
    />
  );
};
export default ContactListItem;
