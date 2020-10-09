import React, { useState, useEffect } from "react";
import { StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    Modal,
    TouchableOpacity,
    SafeAreaView,
    TextInput,} from "react-native";
    import { Icon } from "react-native-elements";

export default function imageCard(props) {
  return (
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
              source={{ uri: props.imageUrl }}
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
                {props.author}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Icon
                  name="download"
                  type="font-awesome-5"
                  size={25}
                  style={{}}
                />
              </TouchableOpacity>
            </View>
          </View>
  );
}
