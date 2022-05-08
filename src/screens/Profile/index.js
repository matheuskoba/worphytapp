import React from "react";
import { Text, Button } from 'react-native';
import { Container } from './styles';
import { useNavigation } from "@react-navigation/native";

import Api from "../../Api";


export default () => {
    const navigation = useNavigation();

    const handleLogoutClick = async () => {
        await Api.LogOut();
        navigation.reset({
            routes:[{name:'Signin'}]
        });
    }

    return(
        <Container>
            <Text>Profile</Text>
            <Button title="Sair" onPress={handleLogoutClick} />
        </Container>
    );
}
