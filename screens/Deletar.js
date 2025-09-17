import React from "react";
import { Text, Button, View, StyleSheet } from "react-native";

export default function Deletar({ navigation }) {
  const metodoDelete = async () => {
    try {
      // Realiza a chamada
      const response = await fetch(`${URL_API}/balada/${id}`, {
        method: "DELETE",
      });
      // Variável para realizar o armazenamento da resposta (não utilizada)
      const dadosBD = await response.json();
      metodoGetAll(); // Chama para atualizar os ids
      limparCampos(); // Limpa os campos
    } catch (error) {
      setErroMsg("Erro ao deletar balada");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Deletar</Text>
      <Button title="Confirmar" onPress={metodoDelete} color="#d32f2f" />
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
});