import React, { useEffect, useContext } from "react";
import { Container, LoadingIcon } from './styles';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native'

import { UserContext } from '../../contexts/UserContext';
import Api from "../../Api";

import Logo from '../../assets/Logo';

export default () => {

    const { dispatch: userDispatch } = useContext(UserContext);
    const navigation = useNavigation();

    useEffect(()=>{
        const checkToken = async() => {
            const token = await AsyncStorage.getItem('token');
            if(token){
                let res = await Api.checkToken(token);
                if(res.token){
                    
                    await AsyncStorage.setItem('token', res.token);

                    userDispatch({
                        type: 'setAvatar',
                        payload: {
                            avatar: res.data.avatar
                        }
                    });

                    navigation.reset({
                        routes:[{name:'MainTab'}]
                    });

                }else{
                    navigation.reset({
                        routes:[{name:'Signin'}]
                    });
                }
            }else{
                navigation.reset({
                    routes:[{name:'Signin'}]
                });
            }
        }
        checkToken();
    }, []);

    return(
        <Container>
            <Logo width="100%" height="160" />
            <LoadingIcon size="large" color="#fff" />
        </Container>
    );
}