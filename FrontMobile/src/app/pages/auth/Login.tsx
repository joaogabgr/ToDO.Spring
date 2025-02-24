import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { borderRadius, colors, margin, padding } from "../../../globalCSS";
import axios from "axios";
import { AuthContext } from "@/src/contexts/AuthContext";

export default function Login() {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandle = async () => {
    try {
      console.log("Tentando fazer login com email:", email);
      await authContext.login(email, password);
      console.log("Login bem-sucedido, redirecionando para /pages/Default");
      router.replace('/pages/Default');
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container}>
          <FontAwesomeIcon icon={faUserCircle} style={styles.icon} size={100} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) =>
              setEmail(text)
            }
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            onChangeText={(text) =>
              setPassword(text)
            }
            value={password}
          />
          <TouchableOpacity style={styles.button} onPress={() => loginHandle()}>
            <Text>Entrar</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonBottom} onPress={() => router.push('/pages/auth/Register')}>
          <Text>Criar conta</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  input: {
    width: 200,
    height: 40,
    margin: margin,
    borderWidth: 1,
    padding: padding,
    borderRadius: borderRadius,

  },

  icon: {
    marginBottom: margin,
  },

  buttonBottom: {
    marginBottom: 30,
  },

  button: {
    width: 200,
    height: 40,
    margin: margin,
    padding: padding,
    borderRadius: borderRadius,
    backgroundColor: colors.primary,
    color: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  }
});