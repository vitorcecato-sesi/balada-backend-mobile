import React, { useState } from "react";
import { Text, Button, View, StyleSheet, TextInput } from "react-native";

export default function Deletar({ navigation }) {
  const [id, setId] = useState("");
  const [erroMsg, setErroMsg] = useState("");

  const metodoDelete = async () => {
    try {
      const response = await fetch(`${URL_API}/clientes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setErroMsg("Deletado com sucesso!");
        setId("");
        // metodoGetAll(); // Descomente se existir
        // limparCampos(); // Descomente se existir
      } else {
        setErroMsg("Erro ao deletar cliente");
      }
    } catch (error) {
      setErroMsg("Erro ao deletar cliente");
    }
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
      <Button title="Confirmar" onPress={metodoDelete} color="#d32f2f" />
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
  msg: {
    marginTop: 20,
    fontSize: 16,
    color: "#d32f2f",
    textAlign: "center",
  },
});