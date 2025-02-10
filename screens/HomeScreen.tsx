import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import { Button, Card, Paragraph, Title } from "react-native-paper";
import { useTheme } from "react-native-paper";

interface HomeScreenProps {
  toggleTheme?: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ toggleTheme }) => {
  const { colors } = useTheme();

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: colors.background },
      ]}
    >
      <Text style={[styles.text, { color: colors.onSurface }]}>
        Nome da Empresa
      </Text>
      <Card style={styles.card}>
        <Card.Cover
          style={styles.cardCover}
          source={{
            uri: "https://static.wikia.nocookie.net/real-girls-on-the-island/images/a/ab/S9scoobydoo.jpg/revision/latest?cb=20180822104156",
          }}
        />
        <Card.Content>
          <Title>Total de Usuários</Title>
          <Paragraph>2 usuários registrados</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>OK</Button>
        </Card.Actions>
      </Card>
      <Card style={styles.card}>
        <Card.Cover
          style={styles.cardCover}
          source={{
            uri: "https://static.wikia.nocookie.net/real-girls-on-the-island/images/a/ab/S9scoobydoo.jpg/revision/latest?cb=20180822104156",
          }}
        />
        <Card.Content>
          <Title>Total de Usuários</Title>
          <Paragraph>2 usuários registrados</Paragraph>
        </Card.Content>
        <Card.Actions>
          <Button>Cancel</Button>
          <Button>OK</Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
  },
  button: {
    marginTop: 10,
  },
  card: {
    width: "90%",
    marginBottom: 20,
    marginTop: 20,
  },
  cardCover: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
});

export default HomeScreen;
