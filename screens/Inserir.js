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
     if (!nome || !endereco || !data || !tipo) {
      Alert.alert("Erro", "Preencha todos os campos antes de continuar!")
      return
    }
    try {
      const response = await fetch(`${URL_API}/baladas/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          endereco,
          data,
          tipo,
        }),
      })

      const dadosBD = await response.json()
      limparCampos()

      Alert.alert("Sucesso", "Balada cadastrada com sucesso!")
    } catch (error) {
      setErroMsg("Erro ao cadastrar balada! Verifique o console para detalhes.")
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.botaoMen}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBotaoMen}>⬅ Voltar</Text>
      </TouchableOpacity>

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
