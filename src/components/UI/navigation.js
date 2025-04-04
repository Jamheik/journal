import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SessionContext } from '../../context/SessionProvider';
import RegisterTabView from '../../app/tabs/registerTabView';
import LoginTabView from '../../app/tabs/loginTabView';
import HomeTabView from '../../app/tabs/homeTabView';
import { TouchableOpacity, Text } from 'react-native';

const Stack = createStackNavigator();

const Navigation = () => {
  const { isAuthenticated, handleLogout } = useContext(SessionContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen
            name="Home"
            component={HomeTabView}
            options={{
              headerRight: () => (
                <TouchableOpacity onPress={handleLogout} style={{ marginRight: 25 }}>
                  <Text style={{ color: '#007BFF', fontSize: 16, fontWeight: 'bold' }}>Logout</Text>
                </TouchableOpacity>
              ),
            }}
          />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginTabView} />
            <Stack.Screen name="Register" component={RegisterTabView} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;