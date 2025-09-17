export default function Menu({ navigation }) {
  const [modalGetCidade, setModalGetCidadeVisivel] = useState(false);

  // Para armazenar os dados do cliente
  const [data, setData] = useState([]);

  // Para armazenar mensagens de erro (controle)
  const [erroMsg, setErroMsg] = useState("");

  // Informações do cliente
  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [dataBalada, setDataBalada] = useState("");
  const [cidade, setCidade] = useState("");

  // Configuração Backend -----------------------------------
  const ipLocal = "10.136.35.49";
  const porta = "3000";
  const URL_API = `http://${ipLocal}:${porta}`;

  //Get Balada por Cidade
  const metodoGetCidade = async () => {
    try {
      const response = await fetch(`${URL_API}/baladas/${cidade}`); // chamada para api
      const dadosBD = await response.json(); // armazena os dados
      console.log(dadosBD); // mostra no console log para o dev

      // Validação para ver se o item retornado não possui mensagem (caracteristica de erro)
      if (!dadosBD.message) {
        // se não tiver, irá validar o data e removera a mensagem de erro

        setErroMsg("");
        setData([dadosBD]);
      } else {
        // Caso tenha, informara que a balada não foi encontrada
        setData(null);
        setErroMsg("Balada não encontrado");
      }
    } catch (error) {
      setErroMsg("Erro ao buscar dados da Balada");
    }
  };

  const validarCampoGetCidade = () => {
    if (!id) {
      setErroMsg("Digite uma Cidade");
      return;
    }
    setErroMsg("");
    metodoGetCidade();
  };

  // Renderização do item
  const renderizarItem = ({ item }) => (
    <View style={styles.cardCliente}>
      <Text style={styles.cardId}>ID: <Text style={styles.cardValue}>{item.id}</Text></Text>
      <Text style={styles.cardLabel}>Nome: <Text style={styles.cardValue}>{item.nome}</Text></Text>
      <Text style={styles.cardLabel}>Tipo: <Text style={styles.cardValue}>{item.tipo}</Text></Text>
      <Text style={styles.cardLabel}>Endereço: <Text style={styles.cardValue}>{item.endereco}</Text></Text>
      <Text style={styles.cardLabel}>Data: <Text style={styles.cardValue}>{item.dataBalada}</Text></Text>
      <Text style={styles.cardLabel}>Cidade: <Text style={styles.cardValue}>{item.cidade}</Text></Text>
    </View>
  );
  return (
    <>
      <SafeArearView>
        <Text> Busca de Baladas</Text>
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
          <View style={styles.modalArea}>
            <Text style={styles.modalTitulo}>Lista de Clientes</Text>
            <View style={styles.rowButtons}>

              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: "#2196F3" }]}
                onPress={validarCampoGetCidade} //Chama a função que valida o campo e procura o cliente pelo ID
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
              data={data} // Dados do cliente 
              keyExtractor={(item, index) => (item.cidade ? item.cidade.toString() : index.toString())}
              //Se tiver o id vai transformar em string para renderizar, se nao tiver vai usar o index como id
              renderItem={renderizarItem} //Vai renderizar o cliente do ID digitado
              style={styles.lista}
              ListEmptyComponent={ //Se a lista estiver vazia mostra a mensagem
              <Text style={{ textAlign: "center", color: "#555", marginTop: 20 }}>Nenhuma balada encontrada.</Text>}
            />
            <TouchableOpacity
              style={styles.fecharButton}
              onPress={() => { setModalGetCidadeVisivel(false); setErroMsg(""); setData([]); setId(""); }} //Fecha o Modal
            >
              <Text style={styles.fecharButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      </SafeArearView>
    </>
  );
}
9;
