// Importação de bibliotecas necessárias do React e React Native
import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native"

// Configuração do backend com IP e porta do servidor
const ipLocal = "10.136.38.187" // IP local do servidor
const porta = "3000" // Porta do servidor
const URL_API = `http://${ipLocal}:${porta}` // URL base da API

export default function Inserir({ navigation }) {
  // Declaração de estados para armazenar os valores dos inputs
  const [nome, setNome] = useState("") // Nome da balada
  const [endereco, setEndereco] = useState("") // Endereço da balada
  const [dataBalada, setDataBalada] = useState("") // Data da balada
  const [tipo, setTipo] = useState("") // Tipo da balada
  const [cidade, setCidade] = useState("") // Cidade da balada

  // Função para limpar os campos após o cadastro
  const limparCampos = () => {
    setNome("")
    setEndereco("")
    setDataBalada("")
    setTipo("")
    setCidade("")
  }

  // Função para enviar os dados para o backend via método POST
  const metodoPost = async () => {
    // Verifica se todos os campos estão preenchidos
    if (!nome || !endereco || !dataBalada || !tipo || !cidade) {
      Alert.alert("Erro", "Preencha todos os campos antes de continuar!")
      return
    }

    try {
      // Envia os dados para a API
      const response = await fetch(`${URL_API}/balada/`, { // Endpoint da API para inserir balada
        method: "POST", // Método HTTP para criar um novo recurso
        headers: {
          "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify({ // Converte os dados para JSON
          nome: nome, 
          endereco: endereco,
          data: dataBalada,
          tipo: tipo,
          cidade: cidade,
        }),
      })

      // Verifica se a resposta foi bem-sucedida 
      if (!response.ok) {
        Alert.alert("Erro", "Não foi possível cadastrar a balada.")
        return
      }

      Alert.alert("Sucesso", "Balada cadastrada com sucesso!")
      limparCampos() // Limpa os campos após o sucesso
    } catch (error) {
      // Exibe erro no console e alerta o usuário
      Alert.alert("Erro", "Erro ao cadastrar balada! Verifique o console.")
      console.log(error)
    }
  }

  return (
    <View style={styles.container}> 
      <Text style={styles.titulo}>Cadastrar Balada 🎉</Text>

      <View style={styles.inputWrapper}> 
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome da Balada</Text>
          <TextInput
            style={styles.input} // Estilo do input
            placeholder="Digite o nome da balada" // Placeholder do input
            value={nome} // Valor do input vinculado ao estado 'nome'
            onChangeText={setNome} // Atualiza o estado 'nome' ao digitar
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Tipo da Balada</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite o Tipo da balada"
            value={tipo}
            onChangeText={setTipo}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Endereço</Text>
          <TextInput
            style={styles.input}
            placeholder="Rua Exemplo, 123"
            value={endereco}
            onChangeText={setEndereco}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data</Text>
          <TextInput
            style={styles.input}
            placeholder="(AAAA-MM-DD)"
            value={dataBalada}
            onChangeText={setDataBalada}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Cidade</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite a Cidade"
            value={cidade}
            onChangeText={setCidade}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.botao} onPress={metodoPost}>  {/*Chama a função metodoPost ao pressionar o botão*/} 
        <Text style={styles.textoBotao}>Inserir</Text>
      </TouchableOpacity>
    </View>
  )
}

// Estilos para os componentes da página
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6fa", // Fundo roxo claro
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4a4a4a",
  },
  inputWrapper: {
    width: "90%",
    borderWidth: 2,
    borderColor: "#9b59b6", // Cor da borda englobando os inputs
    borderRadius: 12,
    padding: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 15, // Espaçamento entre os grupos de inputs
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#4a4a4a",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#9b59b6",
    borderRadius: 12,
    padding: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  botao: {
    backgroundColor: "#9b59b6",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    width: "70%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  textoBotao: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
})
