import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import {
  Provider as PaperProvider,
  DefaultTheme,
  MD3DarkTheme,
  Button,
  useTheme,
} from "react-native-paper";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  return (
    <AuthProvider>
      <PaperProvider theme={isDarkTheme ? MD3DarkTheme : DefaultTheme}>
        <NavigationContainer>
          <AppNavigator toggleTheme={toggleTheme} isDarkTheme={isDarkTheme} />
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}

interface AppNavigatorProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({
  toggleTheme,
  isDarkTheme,
}) => {
  const { isAuthenticated } = useAuth();
  const { colors } = useTheme();

  return (
    <Stack.Navigator>
      {isAuthenticated ? (
        <Stack.Screen
          name="Drawer"
          component={() => (
            <DrawerNavigator
              toggleTheme={toggleTheme}
              isDarkTheme={isDarkTheme}
            />
          )}
          options={{
            title: "Menu",
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.onSurface,
          }}
        />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};
interface DrawerNavigatorProps {
  toggleTheme: () => void;
  isDarkTheme: boolean;
}

const DrawerNavigator: React.FC<DrawerNavigatorProps> = ({
  toggleTheme,
  isDarkTheme,
}) => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <DrawerContent
          {...props}
          toggleTheme={toggleTheme}
          isDarkTheme={isDarkTheme}
        />
      )}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Menu" component={MenuScreen} />
    </Drawer.Navigator>
  );
};

const DrawerContent: React.FC<any> = ({
  toggleTheme,
  isDarkTheme,
  ...props
}) => {
  const { colors } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const textColor = isDarkTheme ? "white" : colors.onSurface;

  const { logout } = useAuth();

  return (
    <View
      style={{ flex: 1, paddingTop: 30, backgroundColor: colors.background }}
    >
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Home")}
        style={[styles.drawerItem, { borderColor: textColor }]}
      >
        <Text style={[styles.text, { color: textColor }]}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => setMenuOpen(!menuOpen)}
        style={[styles.drawerItem, { borderColor: textColor }]}
      >
        <Text style={[styles.text, { color: textColor }]}>Menu</Text>
      </TouchableOpacity>

      {menuOpen && (
        <View style={styles.subMenu}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("SubOption1")}
            style={[styles.drawerItem, { borderColor: textColor }]}
          >
            <Text style={[styles.text, { color: textColor }]}>Subopção 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("SubOption2")}
            style={[styles.drawerItem, { borderColor: textColor }]}
          >
            <Text style={[styles.text, { color: textColor }]}>Subopção 2</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.themeSwitcher}>
        <Button mode="contained" onPress={toggleTheme} style={styles.button}>
          {isDarkTheme ? "Modo Claro" : "Modo Escuro"}
        </Button>
      </View>

      <View style={styles.logoutButton}>
        <Button mode="contained" onPress={logout} style={styles.button}>
          Logout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    paddingVertical: 20,
    paddingLeft: 10,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 18,
  },
  subMenu: {
    marginLeft: 20,
    marginTop: 10,
  },
  themeSwitcher: {
    position: "absolute",
    bottom: 70,
    left: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  logoutButton: {
    position: "absolute",
    bottom: 20,
    left: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  button: {
    width: "100%",
  },
});

export default App;
