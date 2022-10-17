import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  Modal,
  FlatList,
  Alert,
} from 'react-native';

import Formulario from './src/components/Formulario'
import Paciente from './src/components/Paciente'
import InformacionPaciente from './src/components/InformacionPaciente';

const App = () => {
  //Los hooks se colocan en la parte superior de los componentes y no despues de un return
  const [modalVisible, setModalVisible] = useState(false)
  const [pacientes, setPacientes] = useState ([])
  const [paciente, setPaciente] = useState ({})
  const [modalPaciente, setModalPaciente] = useState(false)

  const pacienteEditar = id => {
      const pacienteEditar = pacientes.filter(paciente => paciente.id === id)

      setPaciente(pacienteEditar[0])
  }

  const pacienteEliminar = id => {

    Alert.alert(
      '¿Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        {text: 'Cancelar'},
        {text: 'Si, Eliminar', onPress: () => {
          const pacientesActualizados = pacientes.filter(
            pacientesState => pacientesState.id !== id)
            setPacientes(pacientesActualizados)
        }}
      ]
    )

  }

  const cerrarModal = () => {
    setModalVisible(false)
  }
  return (
    <SafeAreaView style = {styles.conteiner}>

      <Text style = {styles.tiulo}>Administrador de citas {''}
          <Text style = {styles.tituloBolt}>Veterinarias</Text>
      </Text>
      <Pressable
        onPress={() => setModalVisible(true)}
        style = {styles.btnNuevacita}
      >
        <Text
          style = {styles.btnTextoNuevacita}
          >Nueva cita</Text>
      </Pressable>

    {pacientes.length === 0 ? 
      <Text style = {styles.noPacientes}>No hay pacientes aún </Text> 
      : <FlatList
        data = {pacientes}
        keyExtractor = {(item) => item.id}
        renderItem = {({item}) => {
          return(
            <Paciente
              item = {item}
              setModalVisible = {setModalVisible}
              pacienteEditar = {pacienteEditar}
              pacienteEliminar = {pacienteEliminar}
              setModalPaciente = {setModalPaciente}
              setPaciente = {setPaciente}
            />
            
          )
        }}
      /> 
    }

    
      {modalVisible && (          
              <Formulario 

              cerrarModal = {cerrarModal}
              pacientes = {pacientes}
              setPacientes = {setPacientes}
              paciente = {paciente}
              setPaciente = {setPaciente}
            />
      )}

      <Modal
        visible = {modalPaciente}
        animationType = 'fade'
      >
        <InformacionPaciente 
          paciente = {paciente}
          setPaciente = {setPaciente}
          setModalPaciente = {setModalPaciente}
        />
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conteiner:{
    backgroundColor: '#F3F4F3',
    flex: 1
  },
  tiulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374187',
    fontWeight: '500',
  },
  tituloBolt: {
    fontWeight: '900',
    color: '#6D28D9',
    marginTop: 10,
  },
  btnNuevacita: {
    backgroundColor: '#6D28D9',
    padding: 15,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,

  },
  btnTextoNuevacita:{
    textAlign: 'center',
    color: '#FFF',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase'

  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',

  },
})

export default App;
