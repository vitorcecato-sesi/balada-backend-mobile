/* Imports para a Navegação */
import { NavigationContainer } from '@react-navigation/native' /* é um "container" que envolve toda a navegação do app */
import { createNativeStackNavigator } from '@react-navigation/native-stack' /* ele cria uma "pilha" de telas (Stack) para navegar entre elas. */

/* Imports das telas do App */
import Menu from './screens/Menu'
import Buscar from './screens/Buscar'
import Inserir from './screens/Inserir'
import Atualizar from './screens/Atualizar'
import Deletar from './screens/Deletar'

// Cria a pilha de navegação
const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName="Menu">

                <Stack.Screen
                    name="Menu" // Nome da tela             
                    component={Menu} // Componente que será renderizado      
                    options={{ title: 'Menu' }} // Opções de configuração da tela
                />

                <Stack.Screen
                    name="Buscar"   // Nome da tela                   
                    component={Buscar}    // Componente que será renderizado
                    options={{ title: 'Buscar' }}   // Opções de configuração da tela
                />

                <Stack.Screen
                    name="Inserir"  // Nome da tela                
                    component={Inserir}  // Componente que será renderizado     
                    options={{ title: 'Inserir' }}  // Opções de configuração da tela
                />

                <Stack.Screen 
                    name='Atualizar'    // Nome da tela
                    component={Atualizar}   // Componente que será renderizado
                    options={{ title: 'Atualizar' }}    // Opções de configuração da tela
                />

                <Stack.Screen 
                    name='Deletar'  // Nome da tela
                    component={Deletar} // Componente que será renderizado
                    options={{ title: 'Deletar' }}  // Opções de configuração da tela
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}