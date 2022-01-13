import React, { useContext, useState } from "react";
import styled from "styled-components";

import { FirebaseContext } from '../../context/FirebaseContext'
import { UserContext } from '../../context/UserContext'

import Text from "../../components/Text";

export default SignIn = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const signIn = async () => {
    setLoading(true);
    try {
      await firebase.signIn(email, password);

      const uid = firebase.getCurrentUser().uid;

      const userInfo = await firebase.getUserInfo(uid);

      setUser({
        username: userInfo.username,
        email: userInfo.email,
        uid,
        profilePhotoUrl: userInfo.profilePhotoUrl,
        isLoggedIn: true,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <Container>

      <HeaderGraphic>
        <HeaderImage source={require("../../../assets/logo.png")}
        />
      </HeaderGraphic>

      <Main>
        <Text title semi center>
          Welcome back.
        </Text>
      </Main>

      <Auth>
        <AuthContainer>
          <AuthTitle>Email Address</AuthTitle>
          <AuthField
            autoCapitalize="none"
            autoCompleteType="email"
            autoCorrect={false}
            autoFocus={true}
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

      <SignInContainer onPress={signIn} disabled={loading}>
        {loading ? (
          <Loading />
        ) : (
            <Text bold center color="#ffffff">
              Sign In
            </Text>
          )}

      </SignInContainer>

      <SignUp onPress={() => navigation.navigate("SignUp")}>
        <Text small center>
          New to De-Local?{" "}
          <Text bold color="#8022d9">
            Sign Up
          </Text>
        </Text>

      </SignUp>
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
    flex: 1;
    align-self: center;
`;

const Main = styled.View`
  margin-top: 5px;
`;

const Auth = styled.View`
  margin: 64px 32px 32px;
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

const SignInContainer = styled.TouchableOpacity`
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

const SignUp = styled.TouchableOpacity`
  margin-top: 25px;
  margin-bottom: 150px;
`;

const StatusBar = styled.StatusBar``;
