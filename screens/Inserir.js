import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native"

  // Configuração Backend -----------------------------------
  const ipLocal = "10.136.38.187"
  const porta = "3000"
  const URL_API = `http://${ipLocal}:${porta}`


export default function Inserir({ navigation }) {
  const [nome, setNome] = useState("")
  const [endereco, setEndereco] = useState("")
  const [data, setData] = useState("")
  const [tipo, setTipo] = useState("")
  

  const limparCampos = () => {
    setNome("")
    setEndereco("")
    setData("")
    setTipo("")
  }

  const metodoPost = async () => {
    try {
      // Aguarda a resposta do fetch (requisição da API)
      const response = await fetch(`${URL_API}/baladas/`, {
        // Escolhe qual método será usado
        method: "POST",
        // Define o tipo de dado que será enviado (padrão JSON)
        headers: {
          "Content-Type": "application/json",
        },
        // Deixa o corpo da requisição com o padrão do itens que existem no banco de dados, transformando em JSON
        body: JSON.stringify({
          nome: nome,
          endereco: endereco,
          data: data,
          tipo: tipo,
        }),
      })
      // Transforma a resposta em JSON
      const dadosBD = await response.json()
      metodoGetAll()
      // Atualiza o estado "data" com os dados recebidos do backend
      setData([dadosBD])
      // Depois de cadastrar, limpa os campos, para caso for usar novamente e não dar duplicidade
      limparCampos()
    } catch (error) {
      // Caso der erro, exibe a mensagem
      setErroMsg("Erro ao cadastrar balada! Verifique o console para detalhes.")
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Balada</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Data"
        value={data}
        onChangeText={setData}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={tipo}
        onChangeText={setTipo}
      />

      <TouchableOpacity style={styles.botao} onPress={metodoPost}>
        <Text style={styles.textoBotao}>Inserir</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center", 
    justifyContent: "center",
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "80%", 
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  botaoMen: {
    backgroundColor: "gray",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    position: "absolute",
    top: 40,
    left: 20,
    width: 80,
  },
  botao: {
    backgroundColor: "#9b59b6", 
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    width: "60%", 
  },
  textoBotao: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textoBotaoMen: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
})
