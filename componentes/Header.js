import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ navigation }) {
  return (
    <View style={styles.header}>
      <View style={styles.logoBox}>
        <Image
          source={require("../assets/imagenes/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.titulo}>Mini Mundo</Text>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
        <Ionicons name="home-outline" size={28} color="#2D6F83" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 45,
    paddingHorizontal: 22,
    paddingBottom: 12,
    backgroundColor: "#EAF7FC",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2D6F83",
  },
});