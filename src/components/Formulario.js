
import React, {useState, useEffect} from "react";
import {
    Modal,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    TextInput,
    View,
    ScrollView,
    Pressable,
    Alert,
    
} from 'react-native'
import DatePicker from "react-native-date-picker"

const Formulario = ({
    modalVisible, 
    cerrarModal,
    pacientes, 
    setPacientes, 
    paciente: pacienteObj, 
    setPaciente: setPacienteAPP
}) => {

    //pacienteObj  y setPacienteObj debido que la variable paciente ya existe en este 
    const [paciente, setPaciente] = useState('')
    const [id, setId] = useState('')
    const [propetiaro, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fecha, setFecha] = useState(new Date())
    const [sintomas, setSintomas] = useState('')
    
    //Hook useEffect es un callback que se ejecuta cuando un state cambia o cueando el componente esta listo video 104
    useEffect(() => {
        if (Object.keys(pacienteObj).length > 0){
            
            setPaciente (pacienteObj.paciente)
            setId (pacienteObj.id)
            setPropietario (pacienteObj.propetiaro)
            setEmail (pacienteObj.email)
            setTelefono (pacienteObj.telefono)
            setFecha (pacienteObj.fecha)
            setSintomas (pacienteObj.sintomas)
        }

    },[pacienteObj])

    const handleCita = () => {
        //vmaos a validar si todos los datos han sido completados
        if([paciente, propetiaro, email, fecha, sintomas].includes('')){
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios'
            )
            return
        }
        


        const nuevoPaciente = {
            
            paciente,
            propetiaro,
            email,
            telefono,
            fecha,
            sintomas,
        }

            //Revisar si es un registro nuevo o edición

            if (id){
                //Editando
                nuevoPaciente.id = id

                const pacientesActualizados = pacientes.map( pacienteState =>
                    pacienteState.id === nuevoPaciente.id ? nuevoPaciente : pacienteState)

                setPacientes(pacientesActualizados)
                setPacienteAPP({})

            } else {
                //Nuevo registro
                nuevoPaciente.id = Date.now()
                setPacientes ([...pacientes, nuevoPaciente])                
            }

        cerrarModal()
        setId('')
        setPaciente('')
        setPropietario('')
        setEmail('')
        setTelefono('')
        setFecha(new Date())
        setSintomas('')
        
    }
 
    return  (
    <Modal
            animationType='slide'
            visible = {modalVisible} //herencia del prop
        >

            <SafeAreaView style = {styles.contenido}>
                <ScrollView>
                    <Text 
                        style = {styles.titulo}
                    > {pacienteObj.id ? 'Editar' : 'Nueva '} {''}   
                        <Text style = {styles.tituloBold}>Cita</Text>
                    </Text>

                    <Pressable 
                    style ={styles.btnCancelar} 
                    onLongPress={() => {
                        cerrarModal()
                        setPacienteAPP({})
                        setId('')
                        setPaciente('')
                        setPropietario('')
                        setEmail('')
                        setTelefono('')
                        setFecha(new Date())
                        setSintomas('')
                    
                    }} 

                   
                    
                    >
                        <Text style ={styles.btnCancelarTexto}>X Cancelar</Text>
                        
                    </Pressable>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre paciente</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre paciente"
                            placeholderTextColor={'#666'}
                            value = {paciente}
                            onChangeText = {setPaciente}
                        />
                    </View>
                    
                    <View style={styles.campo}>
                        <Text style={styles.label}>Nombre propetiaro</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nombre propetiaro"
                            placeholderTextColor={'#666'}
                            value = {propetiaro}
                            onChangeText = {setPropietario}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Email propetiaro</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email propetiaro"
                            placeholderTextColor={'#666'}
                            keyboardType = 'email-address'
                            value = {email}
                            onChangeText = {setEmail}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Telefono propetiaro</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Telofono propetiaro"
                            placeholderTextColor={'#666'}
                            keyboardType = 'phone-pad'
                            value = {telefono}
                            onChangeText = {setTelefono}
                        />
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>fecha</Text>

                        <View style = {styles.fechaContenedor}>
                        
                        <DatePicker
                                date = {fecha}
                                locale = 'es'
                                mode="date"
                                onDateChange={(date) => setFecha(date)}
                            />

                        </View>
                         

                    </View>
    

                    <View style={styles.campo}>
                        <Text style={styles.label}>Sintomas</Text>
                        <TextInput
                            style={[styles.input, styles.sintomasInput]}
                            placeholder="Sintomas"
                            placeholderTextColor={'#666'}
                            value = {sintomas}
                            onChangeText = {setSintomas}
                            multiline = {true}
                            numberOfLines = {4}
                            
                        />
                    </View>

                    
                    <Pressable 
                     style = {styles.nuevaCita}
                     onPress = {handleCita}
                    >   
                        <Text style = {styles.nuevaCitaTexto}>{pacienteObj.id ? 'Editar' : 'Agregar'} Paciente </Text>  
                        
                    </Pressable>

                </ScrollView>
            </SafeAreaView>
    </Modal>

    )
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#6D28D9',
        flex: 1,
    },
    titulo: {
        fontSize: 30,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        color: '#FFF'
    },
    tituloBold: {
        fontWeight: '900',

    },

    btnCancelar: {
        marginVertical: 30,
        backgroundColor: '#5827A4',
        marginHorizontal: 30,
        padding: 15,
        borderRadius: 10,

    },

    btnCancelarTexto: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    },

    campo: {
        marginTop: 10,
        marginHorizontal: 30,
        marginBottom: 10,
    },
    label:{
        color: '#FFF',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600',
    },
    input:{
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15

        
    },
    sintomasInput: {
        height: 100,
    },
    fechaContenedor: {
        backgroundColor: '#FFF',
        borderRadius: 10,

    },

    nuevaCita: {
        marginVertical: 50,
        backgroundColor: '#F59E0B',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10,
    },

    nuevaCitaTexto:{
       color: '#5827A4',
       textAlign: 'center',
       fontWeight: '900',
       fontSize: 16,
       textTransform: 'uppercase'

        
    }
})
export default Formulario