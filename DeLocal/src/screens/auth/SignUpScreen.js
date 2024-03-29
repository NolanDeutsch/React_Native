import React, { useContext, useState } from "react";
import {Platform} from 'react-native'
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";

import {FirebaseContext} from '../../context/FirebaseContext'
import {UserContext} from '../../context/UserContext'

import Text from "../../components/Text";

export default SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState();
    const firebase = useContext(FirebaseContext);
    const [_, setUser] = useContext(UserContext);

    const getPermission = async () => {
        if(Platform.OS !== "web"){
            const {status} = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
            return status;
        }
    };

    const pickImage = async () => {
        try{
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.5
            })

            if (!result.cancelled) {
                setProfilePhoto(result.uri)
            }
        } catch (error){
            console.log("Error @pickImage: ", error);
        }

    };

    const addProfilePhoto = async () => {
        const status = await getPermission();

        if(status !== "granted"){
            alert("We need permission to access your camera roll.");
            return;
        }
        pickImage();
    };

    const signUp = async () => {
        setLoading(true);

        const user = { username, email, password, profilePhoto};

        try {
            const createdUser = await firebase.createUser(user);

            setUser({ ...createdUser, isLoggedIn: true });
            
        } catch (error) {
            console.log("Error @signup: ", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Container>

            <HeaderGraphic>
                <HeaderImage source={require("../../../assets/logo.png")}
                />
            </HeaderGraphic>

            <Main>
                <Text title semi center>
                    Sign up to get started.
                </Text>
            </Main>

            <ProfilePhotoCointainer onPress={addProfilePhoto}>
                {profilePhoto ? (
                    <ProfilePhoto source={{uri: profilePhoto}} />
                ) : (
                    <DefaultProfilePhoto>
                        <AntDesign name="plus" size={24} color="#ffffff" />
                    </DefaultProfilePhoto>
                )}   
            </ProfilePhotoCointainer>

            <Auth>
                <AuthContainer>
                    <AuthTitle>Username</AuthTitle>
                    <AuthField
                        autoCapitalize="none"
                        autoCorrect={false}
                        autoFocus={true}
                        onChangeText={username => setUsername(username.trim())}
                        value={username}
                    />
                </AuthContainer>

                <AuthContainer>
                    <AuthTitle>Email Address</AuthTitle>
                    <AuthField
                        autoCapitalize="none"
                        autoCompleteType="email"
                        autoCorrect={false}
                        keyboardType="email-address"
                        onChangeText={email => setEmail(email.trim())}
                        value={email}
                    />
                </AuthContainer>

                <AuthContainer>
                    <AuthTitle>Password</AuthTitle>
                    <AuthField
                        autoCapitalize="none"
                        autoCompleteType="password"
                        autoCorrect={false}
                        secureTextEntry={true}
                        onChangeText={password => setPassword(password.trim())}
                        value={password}
                    />
                </AuthContainer>
            </Auth>

            <SignUpContainer onPress={signUp} disabled={loading}>
                {loading ? (
                    <Loading />
                ) : (
                        <Text bold center color="#ffffff">
                            Sign Up
                        </Text>
                    )}

            </SignUpContainer>

            <SignIn onPress={() => navigation.navigate("SignIn")}>
                <Text small center>
                    Already have an account?{" "}
                    <Text bold color="#8022d9">
                        Sign In
                    </Text>
                </Text>
            </SignIn>
            <StatusBar barStyle="dark-content" />
        </Container>
    );
};

const Container = styled.View`
    flex: 1;
`;

const HeaderGraphic = styled.View`
    flex: 1;
`;

const HeaderImage = styled.Image`
    width: 100%;
    height: 50px;
    margin-top: 0px;
    flex: 1;
    align-self: center;
`;

const Main = styled.View`
    margin-top: 0px;
`;

const ProfilePhotoCointainer = styled.TouchableOpacity`
    background-color: #e1e2e6;
    width: 80px;
    height: 80px;
    border-radius: 40px;
    align-self: center;
    margin-top: 16px
    overflow: hidden;
`;

const ProfilePhoto = styled.Image`
    flex: 1;
`;

const DefaultProfilePhoto = styled.View`
    align-items: center;
    justify-content: center;
    flex: 1;
`;

const Auth = styled.View`
    margin: 32px 32px 32px;
`;

const AuthContainer = styled.View`
    margin-bottom: 32px;
`;

const AuthTitle = styled(Text)`
    color: #8e93a1;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 300;
`;

const AuthField = styled.TextInput`
    border-bottom-color: #8e93a1;
    border-bottom-width: 0.5px;
    height: 48px;
`;

const SignUpContainer = styled.TouchableOpacity`
    margin: 0 32px;
    height: 48px;
    align-items: center;
    justify-content: center;
    background-color: #8022d9;
    border-radius: 6px;
`;

const Loading = styled.ActivityIndicator.attrs(props => ({
    color: "#ffffff",
    size: "small",
}))``;

const SignIn = styled.TouchableOpacity`
    margin-top: 25px;
    margin-bottom:50px;
`;

const StatusBar = styled.StatusBar``;
