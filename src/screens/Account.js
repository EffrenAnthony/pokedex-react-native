import {SafeAreaView, Text} from 'react-native';
import React from 'react';

const Account = props => {
  // useEffect(() => {
  //   props.navigation.addListener('focus', () => {
  //     console.log('[in] Account');
  //   });
  //   return () => {
  //     props.navigation.removeListener('focus', () => {
  //       console.log('[out] Account');
  //     });
  //   };
  // }, [props.navigation]);
  return (
    <SafeAreaView>
      <Text>Account</Text>
    </SafeAreaView>
  );
};

export default Account;
