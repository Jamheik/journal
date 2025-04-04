import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SessionContext } from '../../context/SessionProvider';
import RegisterTabView from '../../app/tabs/registerTabView';
import LoginTabView from '../../app/tabs/loginTabView';
import HomeTabView from '../../app/tabs/homeTabView';

const Stack = createStackNavigator();

const Navigation = () => {
  const { isAuthenticated } = useContext(SessionContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="Home" component={HomeTabView} />
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