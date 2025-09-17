/* Imports para a Navegação */
import { NavigationContainer } from '@react-navigation/native' /* é um "container" que envolve toda a navegação do app */
import { createNativeStackNavigator } from '@react-navigation/native-stack' /* ele cria uma "pilha" de telas (Stack) para navegar entre elas. */

/* Imports das telas do App */

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>

            <Stack.Navigator initialRouteName="Menu">

                <Stack.Screen
                    name="Menu"                 
                    component={Menu}        
                    options={{ title: 'Menu' }} 
                />

                <Stack.Screen
                    name="Buscar"                   
                    component={Buscar}    
                    options={{ title: 'Buscar' }}
                />

                <Stack.Screen
                    name="Inserir"                
                    component={Inserir}     
                    options={{ title: 'Inserir' }}
                />

                <Stack.Screen 
                    name='Atualizar'
                    component={Atualizar}
                    options={{ title: 'Atualizar' }}
                />

                <Stack.Screen 
                    name='Deletar'
                    component={Deletar}
                    options={{ title: 'Deletar' }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}