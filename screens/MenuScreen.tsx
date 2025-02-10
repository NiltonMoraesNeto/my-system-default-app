import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../types/navigation";
import { useTheme } from "react-native-paper";

type MenuScreenNavigationProp = DrawerNavigationProp<
  RootDrawerParamList,
  "Menu"
>;

const MenuScreen = () => {
  const navigation = useNavigation<MenuScreenNavigationProp>();
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.onSurface }]}>Menu</Text>
      <Button
        title="Option 1"
        onPress={() => alert("Option 1 selected")}
        color={colors.primary}
      />
      <Button
        title="Option 2"
        onPress={() => alert("Option 2 selected")}
        color={colors.primary}
      />
      <Button
        title="Go to Home"
        onPress={() => navigation.navigate("Home")}
        color={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default MenuScreen;
