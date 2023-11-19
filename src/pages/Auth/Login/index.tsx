/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Image} from 'react-native';
import React, {useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';

const LoginPage = ({navigation}: any) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  console.log('file: index.tsx:12 ~ LoginPage ~ loginData:', loginData);
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#ADD8E6'}}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={require('../../../assets/images/icon.png')}
          style={{width: 150, height: 150}}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '80%',
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          backgroundColor: '#ffffff',
          elevation: 10,
        }}>
        <View>
          <Text
            variant="headlineLarge"
            style={{textAlign: 'center', marginTop: 50}}>
            Welcome back!
          </Text>
          <Text
            variant="bodyMedium"
            style={{textAlign: 'center', marginHorizontal: 25, color: 'grey'}}>
            Let's get started! Log in to your account.
          </Text>
        </View>
        <View style={{marginTop: '20%', padding: 25, gap: 15}}>
          <TextInput
            mode="outlined"
            label="Email"
            value={loginData?.email}
            onChangeText={e => setLoginData(prev => ({...prev, email: e}))}
            selectionColor="#ADD8E6"
            activeOutlineColor="#ADD8E6"
          />
          <TextInput
            mode="outlined"
            label="Password"
            value={loginData?.password}
            onChangeText={e => setLoginData(prev => ({...prev, password: e}))}
            selectionColor="#ADD8E6"
            activeOutlineColor="#ADD8E6"
            secureTextEntry={!showPassword}
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => {
                  setShowPassword(!showPassword);
                }}
              />
            }
          />
        </View>
        <View style={{marginTop: '20%', padding: 25, gap: 15}}>
          <Button
            mode="contained"
            buttonColor="#2b7a91"
            onPress={() => navigation.replace('Main')}>
            Sign In
          </Button>
          <Text style={{textAlign: 'center'}}>
            Don't have an account yet? Sign up here
          </Text>
          <Button
            mode="outlined"
            textColor="#2b7a91"
            style={{borderColor: '#2b7a91', borderWidth: 2}}
            onPress={() => navigation.navigate('Register')}>
            Sign Up
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
