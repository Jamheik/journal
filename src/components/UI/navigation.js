import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SessionContext } from '../../context/SessionProvider';
import RegisterTabView from '../../app/tabs/registerTabView';
import LoginTabView from '../../app/tabs/loginTabView';
import HomeTabView from '../../app/tabs/homeTabView';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                  <Icon name="logout" size={24} color="#007BFF" />
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