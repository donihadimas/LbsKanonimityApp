import {View, Image} from 'react-native';
import React, {useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';

const RegisterPage = ({navigation}: any) => {
  const [loginData, setLoginData] = useState({
    name: '',
    birthDate: new Date(),
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [openModalDate, setOpenModalDate] = useState(false);
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
        <View style={{justifyContent: 'space-between'}}>
          <View>
            <Text
              variant="headlineLarge"
              style={{textAlign: 'center', marginTop: 50}}>
              Start Your Journey with Us
            </Text>
            <Text
              variant="bodyMedium"
              style={{
                textAlign: 'center',
                marginHorizontal: 25,
                color: 'grey',
              }}>
              Ready to Explore? Register Here.
            </Text>
          </View>
          <View style={{padding: 25, gap: 10}}>
            <TextInput
              mode="outlined"
              label="Name"
              value={loginData?.email}
              onChangeText={e => setLoginData(prev => ({...prev, email: e}))}
              selectionColor="#2b7a91"
              activeOutlineColor="#2b7a91"
            />
            <TextInput
              mode="outlined"
              label="BirthDate"
              value={loginData?.birthDate?.toDateString()}
              onFocus={() => setOpenModalDate(true)}
              selectionColor="#2b7a91"
              activeOutlineColor="#2b7a91"
            />
            <DatePicker
              modal
              open={openModalDate}
              date={new Date(loginData?.birthDate)}
              mode="date"
              onConfirm={date => {
                setOpenModalDate(false);
                setLoginData(prev => ({...prev, birthDate: date}));
              }}
              onCancel={() => {
                setOpenModalDate(false);
              }}
            />
            <TextInput
              mode="outlined"
              label="Email"
              value={loginData?.email}
              onChangeText={e => setLoginData(prev => ({...prev, email: e}))}
              selectionColor="#2b7a91"
              activeOutlineColor="#2b7a91"
            />
            <TextInput
              mode="outlined"
              label="Password"
              value={loginData?.password}
              onChangeText={e => setLoginData(prev => ({...prev, password: e}))}
              selectionColor="#2b7a91"
              activeOutlineColor="#2b7a91"
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
            />
            <TextInput
              mode="outlined"
              label="Confirm Password"
              value={loginData?.confirmPassword}
              onChangeText={e =>
                setLoginData(prev => ({...prev, confirmPassword: e}))
              }
              selectionColor="#2b7a91"
              activeOutlineColor="#2b7a91"
              secureTextEntry
              right={<TextInput.Icon icon="eye" />}
            />
          </View>
          <View style={{paddingHorizontal: 25, gap: 15}}>
            <Button
              mode="contained"
              buttonColor="#2b7a91"
              onPress={() => console.log('Pressed')}>
              Sign Up
            </Button>
            <Text style={{textAlign: 'center'}}>
              already have an account yet? Sign in here
            </Text>
            <Button
              mode="outlined"
              textColor="#2b7a91"
              style={{borderColor: '#2b7a91', borderWidth: 2}}
              onPress={() => navigation.navigate('Login')}>
              Sign In
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterPage;
