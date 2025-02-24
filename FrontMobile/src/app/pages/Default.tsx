import { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "@/src/contexts/AuthContext";
import * as SecureStore from 'expo-secure-store';

export default function Default() {
  const authContext = useContext(AuthContext);

  const handleLogout = async () => {
    checkToken();
    authContext.logout();
    checkToken();
  };

    const checkToken = async () => {
        const token = await SecureStore.getItemAsync('token');
        console.log("Token armazenado:", token);
    };
    
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{authContext.user ? authContext.user.name : "Guest"}</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text>Deslogar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
  },
  button: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
