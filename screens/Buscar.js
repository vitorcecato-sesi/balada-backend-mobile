import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  FlatList,
} from "react-native";

export default function Menu({ navigation }) {
  const [modalGetCidade, setModalGetCidadeVisivel] = useState(false);
  const [modalGetData, setModalGetDataVisivel] = useState(false);
  const [modalGetTodas, setModalGetTodasVisivel] = useState(false);

  // Para armazenar os dados da balada
  const [data, setData] = useState([]);

  // Para armazenar mensagens de erro (controle)
  const [erroMsg, setErroMsg] = useState("");

  // Informações da balada (Cidade)
  const [cidade, setCidade] = useState("");

  // Informações da balada (Data)
  const [dataBalada, setDataBalada] = useState("");

  // Configuração Backend -----------------------------------
  const ipLocal = "10.136.38.182";
  const porta = "3000";
  const URL_API = `http://${ipLocal}:${porta}`;

  // Metodo GET para todas as baladas
  const metodoGetTodas = async () => {
    try {
      const response = await fetch(`${URL_API}/balada`); // chamada para api
      const dadosBD = await response.json(); // armazena os dados
      console.log(dadosBD); // mostra no console log para o dev

      // Validação para ver se o item retornado não possui mensagem (caracteristica de erro)
      if (!dadosBD.message) {
        setErroMsg("");
        // Se dadosBD for um array, use direto, senão coloque dentro de array
        setData(Array.isArray(dadosBD) ? dadosBD : [dadosBD]);
      } else {
        setData([]);
        setErroMsg("Baladas não encontradas!");
      }
    } catch (error) {
      setErroMsg("Erro ao buscar dados da Balada.");
    }
  };

  //Metodo Get Balada por Cidade
  const metodoGetCidade = async () => {
    try {
      console.log(cidade.toUpperCase());
      const response = await fetch(
        `${URL_API}/balada/cidade/${cidade.toUpperCase()}`
      ); // chamada para api / UpperCase converte para maiúsculo
      const dadosBD = await response.json(); // armazena os dados
      console.log(dadosBD); // mostra no console log para o dev

      // Validação para ver se o item retornado não possui mensagem (caracteristica de erro)
      if (!dadosBD.message) {
        // se não tiver, irá validar o data e removera a mensagem de erro

        setErroMsg("");
        setData(dadosBD);
      } else {
        // Caso tenha, informara que a balada não foi encontrada
        setData(null);
        setErroMsg("Balada não encontrada");
      }
    } catch (error) {
      setErroMsg("Erro ao buscar dados da Balada");
    }
  };

  //Validação do Campo
  const validarCampoGetCidade = () => {
    if (!cidade) {
      setErroMsg("Digite uma Cidade");
      return;
    }
    setErroMsg("");
    metodoGetCidade(); //Chama o metodo GET por Cidade
  };

  //Metodo Get Balada por DATA
  const metodoGetData = async () => {
    try {
      console.log(cidade.toUpperCase());
      const response = await fetch(
        `${URL_API}/balada/data/${dataBalada}`
      ); // chamada para api / UpperCase converte para maiúsculo
      const dadosBD = await response.json(); // armazena os dados
      console.log(dadosBD); // mostra no console log para o dev

      // Validação para ver se o item retornado não possui mensagem (caracteristica de erro)
      if (!dadosBD.message) {
        // se não tiver, irá validar o data e removera a mensagem de erro

        setErroMsg("");
        setData(dadosBD);
      } else {
        // Caso tenha, informara que a balada não foi encontrada
        setData(null);
        setErroMsg("Balada não encontrada");
      }
    } catch (error) {
      setErroMsg("Erro ao buscar dados da Balada");
    }
  };

  //Validação do Campo
  const validarCampoGetBalada = () => {
    if (!dataBalada) {
      setErroMsg("Digite uma Data");
      return;
    }
    setErroMsg("");
    metodoGetData(); //Chama o metodo GET para buscar a balada pela Data
  };

  // Renderização do item
  const renderizarItem = ({ item }) => (
    <View style={styles.cardCliente}>
      <Text style={styles.cardId}>
        ID: <Text style={styles.cardValue}>{item.id}</Text>
      </Text>
      <Text style={styles.cardLabel}>
        Nome: <Text style={styles.cardValue}>{item.nome}</Text>
      </Text>
      <Text style={styles.cardLabel}>
        Tipo: <Text style={styles.cardValue}>{item.tipo}</Text>
      </Text>
      <Text style={styles.cardLabel}>
        Endereço: <Text style={styles.cardValue}>{item.endereco}</Text>
      </Text>
      <Text style={styles.cardLabel}>
        Data: <Text style={styles.cardValue}>{item.data}</Text>
      </Text>
      <Text style={styles.cardLabel}>
        Cidade: <Text style={styles.cardValue}>{item.cidade}</Text>
      </Text>
    </View>
  );
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.titulo}> Buscas de Baladas </Text>
        <Text style={styles.titulo}> GET </Text>

        {/* Botão para abrir modal Todas as Baladas */}
        <TouchableOpacity
          style={[styles.menuButton, { backgroundColor: "#2196F3" }]}
          onPress={() => setModalGetTodasVisivel(true)}
        >
          <Text style={styles.menuButtonText}> Todas as Baladas </Text>
        </TouchableOpacity>
        {/* Modal para Todas as Baladas */}
        <Modal
          visible={modalGetTodas}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalGetTodasVisivel(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.blocoModal}>
              <Text style={styles.modalTitulo}>Todas as Baladas</Text>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: "#2196F3", marginBottom: 12 },
                ]}
                onPress={metodoGetTodas}
              >
                <Text style={styles.actionButtonText}>Buscar Todos</Text>
              </TouchableOpacity>
              {erroMsg ? <Text style={styles.erroMsg}>{erroMsg}</Text> : null}
              <FlatList
                data={data}
                keyExtractor={(item, index) =>
                  item.id ? item.id.toString() : index.toString()
                }
                renderItem={renderizarItem}
                style={styles.lista}
                ListEmptyComponent={
                  !erroMsg ? (
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#555",
                        marginTop: 20,
                      }}
                    >
                      Nenhuma balada encontrada.
                    </Text>
                  ) : null
                }
              />
              <TouchableOpacity
                style={styles.fecharButton}
                onPress={() => {
                  setModalGetTodasVisivel(false);
                  setErroMsg("");
                  setData([]);
                }}
              >
                <Text style={styles.fecharButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View>
          <TouchableOpacity
            style={[styles.menuButton, { backgroundColor: "#2196F3" }]}
            onPress={() => setModalGetCidadeVisivel(true)} //Abre o Modal
          >
            <Text style={styles.menuButtonText}> Por Cidade</Text>
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
                keyExtractor={(item, index) =>
                  item.id ? item.id.toString() : index.toString()
                }
                //Se tiver o id vai transformar em string para renderizar, se nao tiver vai usar o index como id
                renderItem={renderizarItem} //Vai renderizar o a balada da Cidade digitada
                style={styles.lista}
                ListEmptyComponent={
                  //Se o component estiver vazio
                  !erroMsg ? ( //Se tiver
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#555",
                        marginTop: 20,
                      }}
                    >
                      Nenhuma balada encontrada.
                    </Text>
                  ) : null
                }
              />
              <TouchableOpacity
                style={styles.fecharButton}
                onPress={() => {
                  setModalGetCidadeVisivel(false);
                  setErroMsg("");
                  setData([]);
                  setCidade("");
                }} //Fecha o Modal
              >
                <Text style={styles.fecharButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <View>
          <TouchableOpacity
            style={[styles.menuButton, { backgroundColor: "#2196F3" }]}
            onPress={() => setModalGetDataVisivel(true)}
          >
            <Text style={styles.menuButtonText}> Por Data </Text>
          </TouchableOpacity>
        </View>

        {/* Modal GET */}
        <Modal
          visible={modalGetData}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalGetDataVisivel(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.blocoModal}>
              <Text style={styles.modalTitulo}>Lista de Baladas</Text>
              <View style={styles.rowButtons}>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#2196F3" }]}
                  onPress={validarCampoGetBalada} //Chama a função que valida o campo e procura a balada pela Cidade
                >
                  <Text style={styles.actionButtonText}>Buscar por Data</Text>
                </TouchableOpacity>
              </View>
              <TextInput
                placeholder="AAAA-MM-DD"
                value={dataBalada}
                onChangeText={setDataBalada}
                style={styles.input}
                placeholderTextColor="#888"
              />
              {erroMsg ? <Text style={styles.erroMsg}>{erroMsg}</Text> : null}

              <FlatList
                data={data} // Dados da balada
                keyExtractor={(item, index) =>
                  item.id ? item.id.toString() : index.toString()
                }
                //Se tiver o id vai transformar em string para renderizar, se nao tiver vai usar o index como id
                renderItem={renderizarItem} //Vai renderizar o a balada da Cidade digitada
                style={styles.lista}
                ListEmptyComponent={
                  //Se o component estiver vazio
                  !erroMsg ? (
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#555",
                        marginTop: 20,
                      }}
                    >
                      Nenhuma balada encontrada.
                    </Text>
                  ) : null
                }
              />
              <TouchableOpacity
                style={styles.fecharButton}
                onPress={() => {
                  setModalGetDataVisivel(false);
                  setErroMsg("");
                  setData([]);
                  setDataBalada("");
                }} //Fecha o Modal
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
    backgroundColor: "#fafafa", // fundo quase branco
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "700",
    color: "#222", // cinza escuro
    marginBottom: 28,
    letterSpacing: 0.8,
  },
  menuButton: {
    backgroundColor: "#4a90e2", // azul suave
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 14,
    shadowColor: "#4a90e2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  menuButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 1,
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)", // sombra leve
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  blocoModal: {
    backgroundColor: "#fff",
    width: 320,
    maxHeight: "80%",
    padding: 28,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#222",
    textAlign: "center",
    marginBottom: 22,
    letterSpacing: 0.6,
  },

  rowButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#4a90e2",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#4a90e2",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.7,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginTop: 14,
    marginBottom: 14,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    color: "#333",
    fontWeight: "500",
  },

  lista: {
    marginTop: 12,
  },
  cardCliente: {
    backgroundColor: "#fefefe",
    padding: 16,
    borderRadius: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#e1e4e8",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#444",
    marginBottom: 3,
  },
  cardValue: {
    fontSize: 14,
    fontWeight: "400",
    color: "#666",
  },

  erroMsg: {
    color: "#d32f2f",
    marginBottom: 14,
    textAlign: "center",
    fontWeight: "700",
    fontSize: 15,
  },

  fecharButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 14,
    borderRadius: 14,
    marginTop: 26,
    alignItems: "center",
    shadowColor: "#d32f2f",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 7,
  },
  fecharButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: 0.7,
  },
});
