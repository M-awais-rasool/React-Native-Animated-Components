import React from 'react';
import {StatusBar} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import AuthStackNavigation from './src/navigation/AuthStackNavigation';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <StatusBar hidden/>
      <SafeAreaProvider>
          <NavigationContainer>
            <AuthStackNavigation />
          </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
