import React, { useState } from "react";
// Importa componentes básicos do React Native
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function Deletar({ navigation }) {
  // Armazena id da balada para ser deletada
  const [id, setId] = useState("");
  // Estado para exibir mensagens de erro ou sucesso
  const [erroMsg, setErroMsg] = useState("");
  // Estado para controlar se o botão está carregando
  const [loading, setLoading] = useState(false);

  // Configuração do endereço do backend (API)
  const ipLocal = "10.136.38.181"; 
  const porta = "3000";
  const URL_API = `http://${ipLocal}:${porta}`;

  // Função responsável por deletar uma balada pelo ID informado
  const metodoDelete = async () => {
    setLoading(true); // Ativa o estado de carregamento
    try {
      // Utiliza o delete para remover a balada
      const response = await fetch(`${URL_API}/balada/${id}`, {
        method: "DELETE",
      });
      // Se não houver erro, exibe mensagem de sucesso e limpa o campo de ID
      if (response.ok) { // Se a resposta for OK (sucesso)
        setErroMsg("Deletado com sucesso!"); // Mostra mensagem de sucesso
        setId(""); // Limpa o campo de ID
      } else {
        
        setErroMsg("Balada já foi apagada ou não existe.");
      }
    } catch (error) {
      // Se não for pssivel deletar, mostra mensagem de erro
      setErroMsg("Erro ao conectar com a Banco de Dados da balada.");
    }
    setLoading(false); // Desativa o estado de carregamento
  };

  return (
    // Container principal centralizado
    <View style={styles.container}>
      {/* Título da tela */}
      <Text style={styles.title}>Deletar Balada</Text>
      {/* lugar para digitar o ID da balada */}
      <TextInput
        style={styles.input}
        placeholder="Digite o ID"
        value={id}
        onChangeText={setId}
        keyboardType="numeric" /* somente números são permitidos */
      />
      {/* Botão para confirmar a deleção, com efeito visual e desabilitado durante o carregamento */}
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={metodoDelete}
        activeOpacity={0.6}
        disabled={loading} /* desabilita o botão se estiver carregando */
      >
        {/* Texto do botão muda conforme o estado de carregamento */}
        <Text style={styles.buttonText}>
          {loading ? "Deletando..." : "Confirmar"}
        </Text>
      </TouchableOpacity>
      {/* Mostra uma mensagem de erro ou de sucesso */}
      {erroMsg ? <Text style={styles.msg}>{erroMsg}</Text> : null}
    </View>
  );
}

// Estilos para os componentes visuais
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: "#fff", // Fundo branco
    alignItems: "center", // Centraliza horizontalmente
    justifyContent: "center", // Centraliza verticalmente
    padding: 24, // Espaçamento interno
  },
  title: {
    fontSize: 28, // Tamanho grande para o título
    fontWeight: "bold", // Negrito
    color: "#d32f2f", // Cor vermelha
    marginBottom: 20, // Espaço abaixo do título
  },
  input: {
    width: "80%", // Largura do campo de texto
    height: 40, // Altura do campo
    borderColor: "#d32f2f", // Cor da borda vermelha
    borderWidth: 1, // Espessura da borda
    borderRadius: 8, // Bordas arredondadas
    paddingHorizontal: 10, // Espaço interno lateral
    marginBottom: 20, // Espaço abaixo do campo
    fontSize: 18, // Tamanho da fonte
  },
  button: {
    backgroundColor: "#d32f2f", // Cor de fundo vermelha
    paddingVertical: 12, // Espaço vertical interno
    paddingHorizontal: 32, // Espaço horizontal interno
    borderRadius: 8, // Bordas arredondadas
    alignItems: "center", // Centraliza texto no botão
    marginBottom: 10, // Espaço abaixo do botão
  },
  buttonText: {
    color: "#fff", // Cor do texto branco
    fontSize: 18, // Tamanho d afonte do texto
    fontWeight: "bold", // Negrito
  },
  buttonDisabled: {
    opacity: 0.6, // Opacidade reduzida quando desabilitado
  },
  msg: {
    marginTop: 20, // Espaço acima da mensagem
    fontSize: 16, // Tamanho da fonte
    color: "#d32f2f", // Cor vermelha
    textAlign: "center", // Centraliza
      },
});