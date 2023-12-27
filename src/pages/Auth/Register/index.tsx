/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Image} from 'react-native';
import React, {useState} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DATA_KEY} from '../../../utils/helper/Constant';
import Toast from 'react-native-toast-message';

const RegisterPage = ({navigation}: any) => {
  const [registerData, setRegisterData] = useState({
    name: '',
    birthDate: new Date(),
    email: '',
    phoneNumber: '',
    password: '',
    loggedIn: false,
  });
  const [openModalDate, setOpenModalDate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSignUp = async (values: any) => {
    try {
      const jsonValue = JSON.stringify(values);
      await AsyncStorage.setItem(USER_DATA_KEY, jsonValue);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Selamat, Anda telah berhasil mendaftar 👋',
      });
      setRegisterData({
        name: '',
        birthDate: new Date(),
        email: '',
        password: '',
        phoneNumber: '',
        loggedIn: false,
      });
      navigation.navigate('Login');
    } catch (error) {
      console.log('file: index.tsx:24 ~ handleSignUp ~ error:', error);
    }
  };
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
              Siap untuk menjelajahi? Daftar di sini.
            </Text>
          </View>
          <View style={{padding: 25, gap: 10}}>
            <TextInput
              mode="outlined"
              label="Nama"
              value={registerData?.name}
              onChangeText={e => setRegisterData(prev => ({...prev, name: e}))}
              selectionColor="#2b7a91"
              activeOutlineColor="#2b7a91"
            />
            <TextInput
              mode="outlined"
              label="Tanggal Lahir"
              value={moment(registerData?.birthDate).format('L')}
              onFocus={() => setOpenModalDate(true)}
              selectionColor="#2b7a91"
              activeOutlineColor="#2b7a91"
            />
            <DatePicker
              modal
              open={openModalDate}
              date={new Date(registerData?.birthDate)}
              mode="date"
              onConfirm={date => {
                setOpenModalDate(false);
                setRegisterData(prev => ({...prev, birthDate: date}));
              }}
              onCancel={() => {
                setOpenModalDate(false);
              }}
            />
            <TextInput
              mode="outlined"
              label="Email"
              value={registerData?.email}
              onChangeText={e => setRegisterData(prev => ({...prev, email: e}))}
              selectionColor="#2b7a91"
              activeOutlineColor="#2b7a91"
            />
            <TextInput
              mode="outlined"
              label="Nomor Handphone"
              value={registerData?.phoneNumber}
              onChangeText={e =>
                setRegisterData(prev => ({...prev, phoneNumber: e}))
              }
              selectionColor="#2b7a91"
              activeOutlineColor="#2b7a91"
            />
            <TextInput
              mode="outlined"
              label="Password"
              value={registerData?.password}
              onChangeText={e =>
                setRegisterData(prev => ({...prev, password: e}))
              }
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
          <View style={{paddingHorizontal: 25, gap: 15}}>
            <Button
              mode="contained"
              buttonColor="#2b7a91"
              onPress={() => handleSignUp(registerData)}>
              Daftar
            </Button>
            <Text style={{textAlign: 'center'}}>
              Sudah memiliki akun? Masuk di sini.
            </Text>
            <Button
              mode="outlined"
              textColor="#2b7a91"
              style={{borderColor: '#2b7a91', borderWidth: 2}}
              onPress={() => navigation.navigate('Login')}>
              Masuk
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterPage;
