import React, { useContext } from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen() {
  const { loggedInUser, logout } = useContext(AuthContext)!;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Welcome, {loggedInUser?.name}</Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>{loggedInUser?.email}</Text>
      <Button mode="outlined" onPress={logout}>Logout</Button>
    </View>
  );
}
