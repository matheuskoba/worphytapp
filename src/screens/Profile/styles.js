import React from "react";
import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: #000;

`;

export const AvatarArea = styled.View`
    align-items: center;
    padding: 20px 0;
    margin-top: 20px;
`;

export const Avatar = styled.Image`
    width: 80px;
    height: 80px;
    border-radius: 50px;
`;

export const AvatarChangeText = styled.Text`
    color: white;
    margin-top: 20px;
`;

export const InputArea = styled.View`
    padding: 0 30px;
`;

export const CustomButton = styled.TouchableOpacity`
    height: 60px;
    background-color: blue;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;
`;

export const CustomButtonText = styled.Text`
    color: #fff;
    font-size: 17px;
`;

export const Button = styled.TouchableOpacity`
    height: 60px;
    background-color: red;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;
`;

export const ButtonText = styled.Text`
    color: white;
    font-size: 17px;
`;