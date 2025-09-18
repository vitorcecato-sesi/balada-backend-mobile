import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Modal, StyleSheet, TextInput, FlatList } from 'react-native'

export default function Menu({ navigation }) {
  const [modalGetCidade, setModalGetCidadeVisivel] = useState(false);

  // Para armazenar os dados da balada
  const [data, setData] = useState([]);

  // Para armazenar mensagens de erro (controle)
  const [erroMsg, setErroMsg] = useState("");

  // Informações da balada
  const [cidade, setCidade] = useState("");

  // Configuração Backend -----------------------------------
  const ipLocal = "192.168.1.203";
  const porta = "3000";
  const URL_API = `http://${ipLocal}:${porta}`;

  //Metodo Get Balada por Cidade
  const metodoGetCidade = async () => {
    try {
      const response = await fetch(`${URL_API}/balada/cidade/${cidade}`) // chamada para api
      const dadosBD = await response.json() // armazena os dados
      console.log(dadosBD)  // mostra no console log para o dev

      // Validação para ver se o item retornado não possui mensagem (caracteristica de erro)
      if (!dadosBD.message) {
        // se não tiver, irá validar o data e removera a mensagem de erro

        setErroMsg("")
        setData([dadosBD])

      } else {  // Caso tenha, informara que a balada não foi encontrada
        setData(null)
        setErroMsg("Balada não encontrada")
      }
    } catch (error) {
      setErroMsg("Erro ao buscar dados da Balada")
    }
  }

  //Validação do Campo
  const validarCampoGetCidade = () => {
    if (!cidade) {
      setErroMsg("Digite uma Cidade");
      return;
    }
    setErroMsg("");
    metodoGetCidade(); //Chama o metodo GET po Cidade
  };

  // Renderização do item
  const renderizarItem = ({ item }) => (
    <View style={styles.cardCliente}>
      <Text style={styles.cardId}>ID: <Text style={styles.cardValue}>{item.id}</Text></Text>
      <Text style={styles.cardLabel}>Nome: <Text style={styles.cardValue}>{item.nome}</Text></Text>
      <Text style={styles.cardLabel}>Tipo: <Text style={styles.cardValue}>{item.tipo}</Text></Text>
      <Text style={styles.cardLabel}>Endereço: <Text style={styles.cardValue}>{item.endereco}</Text></Text>
      <Text style={styles.cardLabel}>Data: <Text style={styles.cardValue}>{item.data}</Text></Text>
      <Text style={styles.cardLabel}>Cidade: <Text style={styles.cardValue}>{item.cidade}</Text></Text>
    </View>
  );
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}> Busca de Baladas </Text>
        <View>
          <TouchableOpacity
            style={[styles.menuButton, { backgroundColor: "#2196F3" }]}
            onPress={() => setModalGetCidadeVisivel(true)}
          >
            <Text style={styles.menuButtonText}>GET Cidade</Text>
          </TouchableOpacity>
        </View>

        {/* Modal GET */}
        <Modal
          visible={modalGetCidade}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalGetCidadeVisivel(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.blocoModal}>
              <Text style={styles.modalTitulo}>Lista de Baladas</Text>
              <View style={styles.rowButtons}>

                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#2196F3" }]}
                  onPress={validarCampoGetCidade} //Chama a função que valida o campo e procura a balada pela Cidade
                >
                  <Text style={styles.actionButtonText}>Buscar por Cidade</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder="Digite uma cidade"
                value={cidade}
                onChangeText={setCidade}
                style={styles.input}
                placeholderTextColor="#888"
              />
              {erroMsg ? <Text style={styles.erroMsg}>{erroMsg}</Text> : null}

              <FlatList
                data={data} // Dados da balada
                keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
                //Se tiver o id vai transformar em string para renderizar, se nao tiver vai usar o index como id
                renderItem={renderizarItem} //Vai renderizar o a balada da Cidade digitada
                style={styles.lista}
                ListEmptyComponent={ //Se o component estiver vazio
                  !erroMsg ? (
                    <Text style={{ textAlign: "center", color: "#555", marginTop: 20 }}>
                      Nenhuma balada encontrada.
                    </Text>
                  ) : null
                }
              />
              <TouchableOpacity
                style={styles.fecharButton}
                onPress={() => { setModalGetCidadeVisivel(false); setErroMsg(""); setData([]); setCidade(""); }} //Fecha o Modal
              >
                <Text style={styles.fecharButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fa",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold"
  },
  menuButton: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 12,
  },
  menuButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    paddingTop: 100,
  },
  blocoModal: {
    backgroundColor: "white",
    width: 300,
    height: 400,
    padding: 25,
    borderRadius: 10
  },
  modalArea: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    width: "95%",
    maxHeight: "85%",
    elevation: 6,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },

  rowButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 12,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    backgroundColor: "#fafafa",
    color: "#333",
  },

  lista: {
    marginTop: 10,
  },
  cardCliente: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "400",
    color: "#555",
  },

  erroMsg: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },

  fecharButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: "center",
  },
  fecharButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

