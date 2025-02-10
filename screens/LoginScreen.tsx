import React, { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "react-native-paper";

const LoginScreen = ({ navigation }: any) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { colors } = useTheme();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email e senha são obrigatórios!");
      return;
    }

    try {
      await login(email, password);
      navigation.navigate("Home");
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.header, { color: colors.onSurface }]}>Login</Text>
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.primary, color: colors.onSurface },
        ]}
        placeholder="Email"
        placeholderTextColor={colors.onSurfaceVariant}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={[
          styles.input,
          { borderColor: colors.primary, color: colors.onSurface },
        ]}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor={colors.onSurfaceVariant}
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} color={colors.primary} />
      {error && (
        <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
    borderRadius: 4,
  },
  errorText: {
    marginTop: 10,
    textAlign: "center",
  },
});

export default LoginScreen;
