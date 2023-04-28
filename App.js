import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as Google from "expo-auth-session/providers/google";

import { useEffect, useState } from 'react';



export default function App() {
  const [accessToken, setAccessToken] = useState();
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "328000035850-2f1pl01hk8m0uilief9i9cgva73pomsf.apps.googleusercontent.com",
    iosClientId: "328000035850-u3ec37ogi9gi085t5bptcotfehtnvooe.apps.googleusercontent.com",
    expoClientId: "328000035850-3a6jl5o3o9nadpa95b9ft2crb8irul7e.apps.googleusercontent.com",
  });

  useEffect(() => {
if (response?.type === "success") {
setAccessToken(response.authentication.accessToken);
}
  }, [response]);

  const getUserData = async () => {
    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    const userInfo = await userInfoResponse.json();
    console.log(userInfo);
  };
  


  return (
    <View style={styles.container}>
      <Button title={accessToken ? "Get User Data": "Login"}
              onPress={accessToken ? getUserData : () => promptAsync({useProxy: true, showInRecents: true})}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
