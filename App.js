
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import CakeStack from './src/navigation/Cakestack'

const App = () => {

  return (
    <>
       <NavigationContainer>
          <CakeStack/>
        </NavigationContainer>
    </>
  );
};


export default App;
