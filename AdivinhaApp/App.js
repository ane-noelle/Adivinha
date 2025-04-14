import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [guess, setGuess] = useState(''); // Armazenar o chute do usuário
  const [attempts, setAttempts] = useState(5); // Número de tentativas
  const [gameStatus, setGameStatus] = useState(''); // Status do jogo
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1); // Número aleatório gerado entre 1 e 100

  const handleGuess = () => {
    if (attempts > 0) {
      const userGuess = parseInt(guess);

      if (isNaN(userGuess)) {
        Alert.alert('Por favor, insira um número válido!');
        return;
      }

      if (userGuess === randomNumber) {
        setGameStatus('Você acertou! O número era ' + randomNumber);
        Alert.alert('Parabéns!', 'Você acertou o número!');
        setAttempts(0); // Acabam as tentativas
      } else {
        setAttempts(attempts - 1);
        if (userGuess > randomNumber) {
          setGameStatus('Errou! O número é menor.');
        } else {
          setGameStatus('Errou! O número é maior.');
        }

        if (attempts - 1 === 0) {
          setGameStatus(`Você perdeu! O número era ${randomNumber}`);
          Alert.alert('Fim de Jogo', `O número era ${randomNumber}. Tente novamente!`);
        }
      }

      setGuess(''); // Limpar o campo de entrada
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adivinha o Número!</Text>
      <Text style={styles.subtitle}>Tente adivinhar o número entre 1 e 100.</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu palpite"
        keyboardType="numeric"
        value={guess}
        onChangeText={setGuess}
      />
      <Button title="Chutar" onPress={handleGuess} />
      <Text style={styles.attempts}>Tentativas restantes: {attempts}</Text>
      <Text style={styles.gameStatus}>{gameStatus}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  attempts: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  gameStatus: {
    fontSize: 18,
    color: 'red',
    marginTop: 10,
  },
});
