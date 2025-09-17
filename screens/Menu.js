import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

export default function Menu({ navigation }) {
    const pagina = (p) => {
        switch (p) {
            case "buscar":
                navigation.navigate("Buscar")
            break

            case "inserir":
                navigation.navigate("Inserir")
            break
            
            case "atualizar":
                navigation.navigate("Atualizar")
            break
            
            case "deletar":
                navigation.navigate("Deletar")
            break
            
            default:
            break
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Menu 📌</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.buscar]}
                    onPress={() => pagina("buscar")}
                >
                    <Text style={styles.buttonText}>Buscar 🔎</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.inserir]}
                    onPress={() => pagina("inserir")}
                >
                    <Text style={styles.buttonText}>Inserir 💡</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.atualizar]}
                    onPress={() => pagina("atualizar")}
                >
                    <Text style={styles.buttonText}>Atualizar 🔨</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, styles.deletar]}
                    onPress={() => pagina("deletar")}
                >
                    <Text style={styles.buttonText}>Deletar ⚠</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181A20",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },
    title: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#F7C873",
        marginBottom: 36,
        letterSpacing: 2,
    },
    buttonContainer: {
        width: "100%",
        gap: 18,
    },
    button: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: "center",
        marginVertical: 4,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        width: "100%",
    },
    buttonText: {
        fontSize: 20,
        fontWeight: "600",
        color: "#fff",
        letterSpacing: 1,
    },
    buscar: {
        backgroundColor: "#5CB8E4",
    },
    inserir: {
        backgroundColor: "#7EDA8A",
    },
    atualizar: {
        backgroundColor: "#FFD36E",
    },
    deletar: {
        backgroundColor: "#FF6B6B",
    },
})