import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ContactListScreen from './screens/ContactListScreen';
import ContactFormScreen from './screens/ContactFormScreen';
import ContactViewScreen from './screens/ContactViewScreen';
import { Provider as PaperProvider } from 'react-native-paper';
import { ContactsProvider } from './context/ContactsContext';
const Stack = createStackNavigator();
export default function App() {
  return (
    <PaperProvider>
      <ContactsProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ContactList">
            <Stack.Screen
              name="ContactList"
              component={ContactListScreen}
              options={{ title: 'Contacts' }}
            />
            <Stack.Screen
              name="ContactView"
              component={ContactViewScreen}
              options={{ title: 'View Contact' }}
            />
            <Stack.Screen
              name="ContactForm"
              component={ContactFormScreen}
              options={{ title: 'Edit Contact' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ContactsProvider>
    </PaperProvider>
  );
}
