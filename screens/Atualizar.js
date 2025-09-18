import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

export default function Atualizar({ navigation }) {
  // State para armazenar os dados da balada a ser atualizada
  const [data, setData] = useState(null);

  // State para mensagens de erro
  const [erroMsg, setErroMsg] = useState("");

  // States para os campos de input
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [cidade, setCidade] = useState("");
  const [dataT, setDataT] = useState("");
  const [tipo, setTipo] = useState("");
  const [endereco, setEndereco] = useState("");

  // Configuração do Backend
  const ipLocal = "10.136.38.181"; 
  const porta = "3000";
  const URL_API = `http://${ipLocal}:${porta}`;

  // Função para limpar todos os campos do formulário
  const limparCampos = () => {
    setNome("");
    setCidade("");
    setDataT("");
    setTipo("");
    setEndereco("");
    setData(null);
    setErroMsg("");
  };

  // Função para buscar os dados de uma balada específica pelo ID
  const buscarBalada = async (baladaId) => {
    // Se o campo de ID estiver vazio, limpa os outros campos
    if (!baladaId.trim()) {
      limparCampos();
      return;
    }

    try {
      const response = await fetch(`${URL_API}/balada/${baladaId}`);
      if (response.ok) {
        const dados = await response.json();
        // Preenche os campos com os dados retornados pela API
        setData(dados);
        setNome(dados.nome);
        setCidade(dados.cidade);
        setDataT(dados.data);
        setTipo(dados.tipo);
        setEndereco(dados.endereco);
        setErroMsg(""); // Limpa mensagens de erro anteriores
      } else {
        // Se a balada não for encontrada, limpa os campos e exibe uma mensagem
        limparCampos();
        setErroMsg("Balada não encontrada. Verifique o ID.");
      }
    } catch (error) {
      limparCampos();
      setErroMsg("Erro ao buscar os dados da balada.");
      console.error("Erro em buscarBalada:", error);
    }
  };

  // Efeito que observa mudanças no ID e chama a busca
  useEffect(() => {
    buscarBalada(id);
  }, [id]);

  // Função para enviar a requisição PUT e atualizar os dados
  const metodoPut = async () => {
    try {
      const response = await fetch(`${URL_API}/balada/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        // Corpo da requisição com os dados atualizados dos states
        body: JSON.stringify({
          nome,
          cidade,
          data: dataT,
          tipo,
          endereco,
        }),
      });

      if (response.ok) {
        Alert.alert("Sucesso", "Balada atualizada com sucesso!");
        // Limpa o ID e os outros campos para uma nova atualização
        setId("");
        limparCampos();
      } else {
        const erro = await response.json();
        setErroMsg(erro.message || "Erro ao atualizar a balada.");
      }
    } catch (error) {
      setErroMsg("Ocorreu um erro na comunicação com o servidor.");
      console.error("Erro em metodoPut:", error);
    }
  };

  // Função para validar os campos antes de enviar a atualização
  const validarCamposPut = () => {
    if (!id.trim()) {
      setErroMsg("Digite o ID da balada que deseja atualizar.");
      return;
    }
    // Verifica se os dados da balada foram carregados
    if (!data) {
      setErroMsg("Busque uma balada válida antes de tentar atualizar.");
      return;
    }

    setErroMsg(""); // Limpa a mensagem de erro
    metodoPut(); // Executa a atualização
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Atualizar Balada</Text>
        <Text style={styles.label}>ID da Balada:</Text>
        <TextInput
          placeholder="Digite o ID para buscar"
          value={id}
          onChangeText={setId}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#888"
        />

        {/* Mostra os campos de edição apenas se uma balada for encontrada */}
        {data && (
          <>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
              placeholder="Nome da balada"
              value={nome}
              onChangeText={setNome}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <Text style={styles.label}>Cidade:</Text>
            <TextInput
              placeholder="Cidade onde acontece"
              value={cidade}
              onChangeText={setCidade}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <Text style={styles.label}>Data (DD/MM/AAAA):</Text>
            <TextInput
              placeholder="Data do evento"
              value={dataT}
              onChangeText={setDataT}
              maxLength={10}
              keyboardType="numeric"
              style={styles.input}
              placeholderTextColor="#888"
            />
            <Text style={styles.label}>Tipo:</Text>
            <TextInput
              placeholder="Tipo de evento (ex: Show, Festival)"
              value={tipo}
              onChangeText={setTipo}
              style={styles.input}
              placeholderTextColor="#888"
            />
            <Text style={styles.label}>Endereço:</Text>
            <TextInput
              placeholder="Endereço do local"
              value={endereco}
              onChangeText={setEndereco}
              style={styles.input}
              placeholderTextColor="#888"
            />

            <TouchableOpacity
              style={styles.actionButton}
              onPress={validarCamposPut}
            >
              <Text style={styles.actionButtonText}>Atualizar</Text>
            </TouchableOpacity>
          </>
        )}

        {erroMsg ? <Text style={styles.erroMsg}>{erroMsg}</Text> : null}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#EAEAEA",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  actionButton: {
    backgroundColor: "#6200EE",
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  actionButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  erroMsg: {
    color: "#FF6347", // Tomato Red
    fontSize: 14,
    textAlign: "center",
    marginTop: 15,
    fontWeight: "bold",
  },
});
