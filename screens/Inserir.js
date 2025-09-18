import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native"

// Configuração Backend -----------------------------------
const ipLocal = "10.136.38.187"
const porta = "3000"
const URL_API = `http://${ipLocal}:${porta}`

export default function Inserir({ navigation }) {
  const [nome, setNome] = useState("")
  const [endereco, setEndereco] = useState("")
  const [dataBalada, setDataBalada] = useState("") // <- corrigido
  const [tipo, setTipo] = useState("")
  const [cidade, setCidade] = useState("")
  const [listaBaladas, setListaBaladas] = useState([])

  const limparCampos = () => {
    setNome("")
    setEndereco("")
    setDataBalada("") // <- corrigido
    setTipo("")
    setCidade("")
  }

  const metodoPost = async () => {
    if (!nome || !endereco || !dataBalada || !tipo || !cidade) {
      Alert.alert("Erro", "Preencha todos os campos antes de continuar!")
      return
    }

    try {
      const response = await fetch(`${URL_API}/balada/`, { // <- corrigido
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: nome,
          endereco: endereco,
          data: dataBalada, // <- corrigido
          tipo: tipo,
          cidade: cidade,
        }),
      })

      if (!response.ok) {
        Alert.alert("Erro", "Não foi possível cadastrar a balada.")
        return
      }

      const dadosBD = await response.json()

      setListaBaladas([...listaBaladas, dadosBD])

      Alert.alert("Sucesso", "Balada cadastrada com sucesso!")
      limparCampos()
    } catch (error) {
      Alert.alert("Erro", "Erro ao cadastrar balada! Verifique o console.")
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Balada</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome da balada"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o Tipo da balada"
        value={tipo}
        onChangeText={setTipo}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a Data (AAAA-MM-DD)"
        value={dataBalada}
        onChangeText={setDataBalada}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a Cidade"
        value={cidade}
        onChangeText={setCidade}
      />

      <TouchableOpacity style={styles.botao} onPress={metodoPost}>
        <Text style={styles.textoBotao}>Inserir</Text>
      </TouchableOpacity>

      {listaBaladas.length > 0 && (
        <View style={{ marginTop: 20, width: "100%" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>
            Baladas Cadastradas:
          </Text>
          {listaBaladas.map((item, index) => (
            <Text key={index}>
              {item.nome} - {item.endereco} - {item.data} - {item.tipo} - {item.cidade}
            </Text>
          ))}
        </View>
      )}
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
})
