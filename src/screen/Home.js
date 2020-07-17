import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image, 
  TouchableWithoutFeedback, 
  Button, 
  Modal, 
  TouchableHighlight, 
  Alert
  
} from 'react-native';


import Axios from 'axios'

const Home = ({navigation}) => {
  const [data1, setdata1]=useState([])
  const [data2, setdata2]=useState([])
  const [data3, setdata3]=useState([])
  const [addmodalVisible, setaddModalVisible] = useState(false);
  const [successmodalVisible, setsuccessModalVisible] = useState(false);

  const fetchdata = () =>{
    console.log('masuk home')
    Axios.get('https://0d7a93f9-9445-4847-b983-054ba7ece444.mock.pstmn.io/cakes?page=1')
    .then((res)=>{
      setdata1(res.data.data.items)
      Axios.get('https://0d7a93f9-9445-4847-b983-054ba7ece444.mock.pstmn.io/cakes?page=2')
      .then((res2)=>{
        setdata2(res2.data.data.items)
        Axios.get('https://0d7a93f9-9445-4847-b983-054ba7ece444.mock.pstmn.io/cakes?page=3')
        .then((res3)=>{
          setdata3(res3.data.data.items)
        }).catch((err3)=>{
          console.log(err3)
        })
      }).catch((err2)=>{
        console.log(err2)
      })
      // console.log('ini data'+data)
    }).catch((err)=>{
      console.log(err)
    })
  }

  useEffect(()=>{
    // console.log('masuk use effect')
    fetchdata()
  },[])

  const addCake=()=>{
    setaddModalVisible(!addmodalVisible)
    Axios.post('https://0d7a93f9-9445-4847-b983-054ba7ece444.mock.pstmn.io/cakes', {
      "id": 1,
      "title": "Galette des Rois",
      "description": "The English name of this cake would be the “King´s Cake”. Traditionally this cake is eaten after Christmas, during the first week of January, although lately, it has become so popular that many bakeries sell it during the whole month.",
      "rating": 7,
      "image": "https://thethingswellmake.com/wp-content/uploads/2013/07/kingcake1.jpg",
    })
    .then((res)=>{
      console.log(res.data)
      setsuccessModalVisible(!successmodalVisible)
    }).catch((err)=>{
      console.log(err)
    })
  }

  

  const renderListPost=(data)=>{
    return data.map((val,index)=>{
        return(
            <TouchableWithoutFeedback
                key={index}
                onPress={()=>navigation.navigate('Detail',{id:val.id})}
            >
                <View style={styles.imageContainer}>
                      <Image source={{uri: val.image }} style={styles.image}/>
                    <View >
                      <Text>{val.title}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
         
        )
    })
}



  return (
    <>
    <View style={styles.container}>
       <ScrollView>
        <StatusBar backgroundColor={'#ffffff'} />

       {/* MODAL FOR ADD CAKE */}

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
                <Text style={styles.modalText}>Add New Cake!</Text>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    addCake();
                  }}
                >
                  <Text style={styles.textStyle}>Add Cake</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

      {/* WHEN CAKE SUCCESFULLY ADDED */}

          <Modal
            animationType="slide"
            transparent={true}
            visible={successmodalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Cake Added!</Text>

                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                  onPress={() => {
                    setsuccessModalVisible(!successmodalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

            <View style={styles.topContainer}>
              <Text style={styles.header}>
                  Welcome to Admin CakeKikikan Store
              </Text>
            </View>
            <View style={styles.button}>
              <Button
                  onPress={() => {
                    setaddModalVisible(!addmodalVisible);
                  }}
                  title="Add New Cake"
                  color="#ed9853"
                  style={styles.button}
                  />
            </View>
            <View >
              <Text style={styles.categoryTitle}>
                French Cake
              </Text>
            </View>
            <View style={styles.cakeContainer} >
                    {renderListPost(data1)}
            </View>
            <View>
              <Text style={styles.categoryTitle}>
                Japanesse Cake
              </Text>
            </View>
            <View style={styles.cakeContainer} >
                    {renderListPost(data2)}
            </View>
            <View>
              <Text style={styles.categoryTitle}>
                Arabian Cake
              </Text>
            </View>
            <View style={styles.cakeContainer} >
                    {renderListPost(data3)}
            </View>
        </ScrollView>
    </View>
    </>
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

  container:{
    backgroundColor:'white'
  },
  cakeContainer: {
    flex: 1,
    flexWrap:"wrap",
    flexDirection: 'row',
    textAlign:'center',
  },
  header:{
    textAlign: 'center', // <-- the magic
    fontWeight: 'bold',
    fontSize: 18,
    backgroundColor:'#fff4eb',
    height:120,
    lineHeight:120
  },
  button:{
    width:120,
    marginTop:15,
    marginBottom:10,
    marginLeft:10,
  },
  categoryTitle:{
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical:15,
    marginLeft:10
  },

  imageContainer:{
      justifyContent: 'center',
      width: '50%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: 'white',
  },
  image:{
      height: 180, width: '90%',
      borderRadius:20 
  }
});


export default Home;