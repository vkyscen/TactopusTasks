import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  ToastAndroid,
  
} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Icon } from "react-native-elements";
// import * as FileSystem from "expo-file-system";

export default function App() {
  const [data, setData] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    fetch("https://picsum.photos/v2/list")
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const [download, setDownload] = useState("");

  const donwloadFile = async () => {

let fileUri = FileSystem.documentDirectory + "small.jpeg";
const uri = download
    FileSystem.downloadAsync(uri, fileUri)
    .then(({ uri }) => {
        saveFile(uri);
      })
      .catch(error => {
        console.error(error);
      })
  };


const saveFile = async (fileUri) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
        ToastAndroid.show('Download completed', ToastAndroid.SHORT);
        setModalVisible(false)
    }
}

function validateEmail(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <View
      style={{
        backgroundColor: "#8964e0",
        height: 100,

        borderBottomEndRadius: 50,
        borderBottomStartRadius: 50,
        // alignItems: "center",
        alignContent: "center",
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginLeft: "40%",
          marginVertical: "10%",
          color: "#fff",
        }}
      >
        Home
      </Text>
    </View>
      <FlatList
        data={data}
        numColumns={2}
        renderItem={({ item }) => (
          <View
            style={{
              width: "44%",
              height: 300,
              borderRadius: 16,
              backgroundColor: "#f2f2f2",
              elevation: 8,
              marginHorizontal: "3%",
              marginVertical: "4%",
            }}
          >
            <Image
              source={{ uri: item.download_url }}
              style={{
                width: "100%",
                height: "80%",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
              }}
            />
            <View
              style={{
                padding: "2%",
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "monospace",
                  fontWeight: "bold",
                  flexWrap: "wrap",
                  flex: 3,
                }}
              >
                {item.author}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setDownload(item.download_url);
                  setModalVisible(true);
                }}
              >
                <Icon
                  name="download"
                  type="font-awesome-5"
                  size={25}
                  color="#8964e0"
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <View
          style={{
            backgroundColor: "#c1c1c1",
            width: "70%",
            height: "40%",
            alignSelf: "center",
            top: "20%",
            borderRadius: 16,
            padding: "3%",
            elevation: 10,
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 20, margin: "2%" }}>Name</Text>
          <TextInput
          onChangeText = {(txt)=>setEmail(txt)}
            style={{
              width: "90%",
              height: "20%",
              borderWidth: 2,
              alignSelf: "center",
              borderRadius: 10,
              margin: "2%",
              borderColor: "#c1c1c1",
              padding: "2%",
            }}
          />
          <Text style={{ fontSize: 20, margin: "2%" }}>Email Id</Text>
          <TextInput
          textContentType="emailAddress"
          onChangeText = {(txt)=> setEmail(txt)}
            style={{
              width: "90%",
              height: "20%",
              borderWidth: 2,
              alignSelf: "center",
              borderRadius: 10,
              margin: "2%",
              borderColor: "#c1c1c1",
              padding: "2%",
            }}
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#8964e0",
              width: 100,
              height: 40,
              alignSelf: "center",
              marginVertical: "4%",
              borderRadius: 10,
            }}
            onPress={validateEmail(email) ? donwloadFile : null }
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
    </SafeAreaView>
  );
}