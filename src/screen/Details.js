import React, { useState, useEffect } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    Image, 
    Button, 
    Modal, 
    TouchableHighlight, 
    Alert 
} from 'react-native';
import Axios from 'axios'

const Detail = ({
    route
}) => {
    const [data, setdata]=useState([])
    const [addmodalVisible, setaddModalVisible] = useState(false);
    const fetchdata = () =>{
        console.log('masuk home')
        Axios.get(`https://0d7a93f9-9445-4847-b983-054ba7ece444.mock.pstmn.io/cakes/${route.params.id}`)
        .then((res)=>{
            console.log(res.data)
          setdata(res.data.data)
        }).catch((err)=>{
          console.log(err)
        })
      }

      useEffect(()=>{
        fetchdata()
      },[])

    const deleteCake=()=>{
        setaddModalVisible(!addmodalVisible)
        Axios.delete(`https://0d7a93f9-9445-4847-b983-054ba7ece444.mock.pstmn.io/cakes/${route.params.id}`)
        .then((res)=>{
          console.log(res.data)
          setsuccessModalVisible(!successmodalVisible)
        }).catch((err)=>{
          console.log(err)
        })
    }

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={addmodalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}> Are you sure want to delete {data.title}?</Text>

                    <TouchableHighlight
                    style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                    onPress={() => {
                        deleteCake();
                    }}
                    >
                    <Text style={styles.textStyle}>Delete Cake</Text>
                    </TouchableHighlight>
                </View>
                </View>
            </Modal>


            <Text style={{marginBottom:'5%', fontSize:20}}>{data.title}</Text>
            <Image source={{uri: data.image }} style={styles.image}/>
            <Text style={{marginBottom:'5%', fontSize:14, marginHorizontal:'5%'}}>{data.description}</Text>
            <Button
                onPress={()=> setaddModalVisible(!addmodalVisible) }
                title="Delete Cake"
                color="#ed9853"
                />
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      },
      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor: '#2c3e50',
        },
        image:{
            height: 300, 
            width: '70%', 
            marginBottom:'5%',
            borderRadius:20 
        }
});

export default Detail;