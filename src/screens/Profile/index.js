import React,{ useState,useEffect } from "react";
import { 
    Container,
    AvatarArea,
    Avatar,
    AvatarChangeText,
    InputArea,
    CustomButton,
    CustomButtonText,
    Button,
    ButtonText,
} from './styles';

import UpdateInput from "../../components/SignInput";

import EmailIcon from '../../assets/email.svg';
import LockIcon from '../../assets/lock.svg';
import PersonIcon from '../../assets/person.svg';

import { useNavigation } from "@react-navigation/native";

import Api from "../../Api";

export default () => {

    const navigation = useNavigation();

    const [nameField, setNameField] = useState(nameField);
    const [emailField, setEmailField] = useState(emailField);
    const [passwordField, setPasswordField] = useState('');
    const [passwordConfirmField, setPasswordConfirmField] = useState('');

    useEffect(()=>{
        const getUserInfo = async () => {
            let json = await Api.getUser();
            if(json.error == ''){
                setNameField(json.data.name);
                setEmailField(json.data.email);
            }else{
                alert('Error: '+json.error);
            }
        }
        getUserInfo();
    }, [])

    const handleUpdateClick = async () => {

        if(nameField != '' || emailField != '' || passwordField != '' || passwordConfirmField != ''){
            if(nameField.length > 0){
                await Api.updateUser({
                    name: nameField
                })
            }else if(emailField.length > 0){
                await Api.updateUser({
                    email: emailField
                })
            }else if(passwordField.length > 0){
                if(passwordField === passwordConfirmField){
                    await Api.updateUser({
                        password: passwordField,
                        password_confirm: passwordConfirmField
                    })
                }else{
                    alert('As senhas não são iguais');
                }
            }
            alert("Dados alterados com sucesso!");
            navigation.reset({
                routes:[{name:'Home'}]
            });
        }else{
            alert('Preencha pelo menos um campo')
        }

       
    }

    const handleLogoutClick = async () => {
        await Api.LogOut();
        navigation.reset({
            routes:[{name:'Signin'}]
        });
    }

    return(
        <Container>
            <AvatarArea>
                <Avatar source={{uri: 'https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png'}} />
                <AvatarChangeText>Alterar foto</AvatarChangeText>
            </AvatarArea>

            <InputArea>
                <UpdateInput 
                    IconSvg={PersonIcon}
                    value={nameField}
                    onChangeText={t=>setNameField(t)}
                />
                <UpdateInput 
                    IconSvg={EmailIcon}
                    value={emailField}
                    onChangeText={t=>setEmailField(t)}
                />
                <UpdateInput 
                    IconSvg={LockIcon}
                    placeholder="Digite uma nova senha"
                    onChangeText={t=>setPasswordField(t)}                
                    password={true}
                />
                <UpdateInput 
                    IconSvg={LockIcon}
                    placeholder="Confirme a senha"
                    onChangeText={t=>setPasswordConfirmField(t)}                    
                    password={true}
                />

                <CustomButton onPress={handleUpdateClick} >
                    <CustomButtonText>Salvar alterações</CustomButtonText>
                </CustomButton>


                <Button onPress={handleLogoutClick}>
                    <ButtonText>Sair da sua conta</ButtonText>
                </Button>
            </InputArea>

        </Container>
    );
}
