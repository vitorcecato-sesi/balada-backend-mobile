import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function Deletar({ navigation }) {
  const [id, setId] = useState("");
  const [erroMsg, setErroMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const metodoDelete = async () => {
    setLoading(true);
    try {
      // Realiza a chamada
      const response = await fetch(`${URL_API}/balada/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setErroMsg("Deletado com sucesso!");
        setId("");
      } else {
        setErroMsg("Erro ao deletar balada");
      }
    } catch (error) {
      setErroMsg("Erro ao deletar balada");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deletar Cliente</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o ID"
        value={id}
        onChangeText={setId}
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={metodoDelete}
        activeOpacity={0.6}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Deletando..." : "Confirmar"}
        </Text>
      </TouchableOpacity>
      {erroMsg ? <Text style={styles.msg}>{erroMsg}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#d32f2f",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    backgroundColor: "#d32f2f",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  msg: {
    marginTop: 20,
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
  },
});