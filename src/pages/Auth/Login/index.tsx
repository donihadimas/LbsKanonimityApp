/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DATA_KEY} from '../../../utils/helper/Constant';
import {useDispatch, useSelector} from 'react-redux';
import {
  setAccountSetting,
  updateAccountSetting,
} from '../../../utils/redux/setting/settingReducer';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';
import {updateLoggedStatus} from '../../../utils/helper/AuthHelper';

const LoginPage = ({navigation}: any) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [userData, setUserData] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const applicationSettings = useSelector(
    (state: any) => state.setting.application,
  );
  const account = useSelector((state: any) => state.setting.account);
  const dispatcher = useDispatch();
  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log('file: index.tsx:24 ~ getUserData ~ error:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userDatas = await getUserData();
      if (userDatas && account?.length === 0) {
        dispatcher(setAccountSetting(userDatas));
      }
    };

    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const userDatas = await getUserData();
        if (userDatas && account?.length === 0) {
          dispatcher(setAccountSetting(userDatas));
        }
      };
      fetchData();
    }, []),
  );

  useEffect(() => {
    setUserData(account?.[0]);
  }, [applicationSettings, account]);

  const handleLogin = async () => {
    if (
      loginData?.email === userData?.email &&
      loginData?.password === userData?.password
    ) {
      try {
        const data = updateLoggedStatus(userData, true);
        if (data) {
          dispatcher(setAccountSetting(data));
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem(USER_DATA_KEY, jsonValue);
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Haloo, Anda berhasil Login 👋',
          });
          navigation.replace('Main');
        }
      } catch (error) {
        console.log('file: index.tsx:24 ~ handleSignUp ~ error:', error);
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Email atau Password Salah',
      });
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
        <View>
          <Text
            variant="headlineLarge"
            style={{textAlign: 'center', marginTop: 50}}>
            Welcome back!
          </Text>
          <Text
            variant="bodyMedium"
            style={{textAlign: 'center', marginHorizontal: 25, color: 'grey'}}>
            Ayo mulai! Masuk ke akun Anda.
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
          <Button mode="contained" buttonColor="#2b7a91" onPress={handleLogin}>
            Masuk
          </Button>
          <Text style={{textAlign: 'center'}}>
            Belum punya akun? Daftar di sini.
          </Text>
          <Button
            mode="outlined"
            textColor="#2b7a91"
            style={{borderColor: '#2b7a91', borderWidth: 2}}
            onPress={() => navigation.navigate('Register')}>
            Daftar
          </Button>
        </View>
      </View>
    </View>
  );
};

export default LoginPage;
