/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Button, Text, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {USER_DATA_KEY} from '../../../utils/helper/Constant';
import {useDispatch} from 'react-redux';
import {updateAccountSetting} from '../../../utils/redux/setting/settingReducer';
import Toast from 'react-native-toast-message';
import {useFocusEffect} from '@react-navigation/native';

const LoginPage = ({navigation}: any) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [userData, setUserData] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);

  const getUserData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(USER_DATA_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.log('file: index.tsx:24 ~ getUserData ~ error:', error);
    }
  };

  const updateLoggedStatus = (values: any) => {
    const updatedStatus: any = values;
    if (updatedStatus) {
      updatedStatus.loggedIn = true;
      return updatedStatus;
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const userDatas = await getUserData();
      setUserData(userDatas);
    };

    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const userDatas = await getUserData();
        setUserData(userDatas);
      };
      fetchData();
    }, []),
  );

  const handleLogin = async () => {
    if (
      loginData?.email === userData?.email &&
      loginData?.password === userData?.password
    ) {
      try {
        const data = updateLoggedStatus(userData);
        if (data) {
          const jsonValue = JSON.stringify(data);
          await AsyncStorage.setItem(USER_DATA_KEY, jsonValue);
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Successfully Logged In 👋',
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
        text2: 'Wrong email or password',
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
          <Button mode="contained" buttonColor="#2b7a91" onPress={handleLogin}>
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
