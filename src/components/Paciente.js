import React from "react"
import {
    Text, 
    View,
    StyleSheet,
    Pressable,
    SafeAreaView,
 



} from 'react-native'

import {formatearFecha} from '../helpers'
const Paciente = ({
    item, 
    setModalVisible, 
    pacienteEditar, 
    pacienteEliminar, 
    setModalPaciente,
    setPaciente
}) => {
    
    const {paciente, fecha, id} = item

    return(
        <Pressable
            onLongPress={() => {
                setModalPaciente(true)
                setPaciente(item)
            }}
        >
            <SafeAreaView style = {styles.contenedor}>
                <Text style = {styles.label}>paciente:</Text>
                <Text style = {styles.texto}>{paciente}</Text>
                <Text style = {styles.fecha}>{formatearFecha(fecha)}</Text>
            
                <View style = {styles.contenedorBotones}>
                    <Pressable     
                        style = {[styles.btn, styles.btnEditar]}
                        onLongPress = {() => {
                            setModalVisible(true)
                            pacienteEditar(id)
                        }}
                    >

                        <Text style = {styles.btnTexto}>
                            Editar</Text>
                    </Pressable>

                    <Pressable 
                    style = {[styles.btn, styles.btnEliminar]}
                    onLongPress = {() => pacienteEliminar(id)}
                    >
                        <Text style = {styles.btnTexto}>
                            Eliminar</Text>
                    </Pressable>
                </View>

            </SafeAreaView>
        </Pressable>
    )

    
}

const styles = StyleSheet.create({

    contenedor: {
        backgroundColor: '#FFF',
        padding: 20,
        borderTopColor: '#94a3B8',
        borderWidth: 1,
        marginHorizontal: 20, 
        marginVertical: 5,
        borderRadius: 20,
        
    },

    label: {
        color: '#374141',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: 10,

    },

    texto: {
        color: '#6D28D9',
        fontSize: 20,
        fontWeight: '700',
        marginBottom: 10,
    },

    fecha: {
        color: '#374141',

    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20

    },

    btn: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5,

    },
    
    btnEditar: {
        backgroundColor: '#F59E0B',
    },

    btnEliminar: {
        backgroundColor: '#EF4444',
    },


    btnTexto:{
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 12,
        color: '#FFF'

    },

})

export default Paciente