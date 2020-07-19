import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';


const Button = props => (
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => props.onPress(props.name)}
  >
    <Text style={styles.buttonText}>
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
);


const getRoundOutcome = userChoice => {
  const computerChoice = randomComputerChoice().name;
  let result;

  if (userChoice === 'Đá') {
    result = computerChoice === 'Kéo' ? 'Thắngg!' : 'thua!';
  }
  if (userChoice === 'Giấy') {
    result = computerChoice === 'Đá' ? 'Thắngg!' : 'thua!';
  }
  if (userChoice === 'Kéo') {
    result = computerChoice === 'Giấy' ? 'Thắngg!' : 'thua!';
  }

  if (userChoice === computerChoice) result = 'Hòa!';
  return [result, computerChoice];
};

const randomComputerChoice = () =>
  CHOICES[Math.floor(Math.random() * CHOICES.length)];


  
const ChoiceCard = ({ player, choice: { uri, name } }) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.choiceDescription}>{player}</Text>
      <Image source={{ uri }} resizeMode="contain" style={styles.choiceImage} />
      <Text style={styles.choiceCardTitle}>{title}</Text>
    </View>
  );
};

const CHOICES = [
  {
    name: 'Đá',
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png'
  },
  {
    name: 'Giấy',
    uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png'
  },
  {
    name: 'Kéo',
    uri:
      'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png'
  }
];
let totalScore = 0;
let userScore = 0;
let cptScore = 0;
export default function App() {
  const caculateScore = (result) => {
    if (result === 'Thắngg!') userScore++ ;
    else if (result === 'thua!') cptScore++ ;
  }
  const [gamePrompt, setGamePrompt] = useState('Oản Tù Tì!');

  const [userChoice, setUserChoice] = useState({});
  const [computerChoice, setComputerChoice] = useState({});
  const onPress = playerChoice => {
    
  const [result, compChoice] = getRoundOutcome(playerChoice);
  const newUserChoice = CHOICES.find(choice => choice.name === playerChoice);
  const newComputerChoice = CHOICES.find(choice => choice.name === compChoice);
  setGamePrompt(result);
  setUserChoice(newUserChoice);
  setComputerChoice(newComputerChoice);
  caculateScore(result);
  totalScore++;
};

const getResultColor = () => {
  if (gamePrompt === 'Thắngg!') return 'green' ;
  if (gamePrompt === 'thua!') return 'red' ;
  return null;
}
  return (
    <View style={styles.container}>
     <Text style={{ fontSize: 35, color: getResultColor() }}>{gamePrompt}</Text>
      <View style={styles.choicesContainer}>
        <View style={styles.display_score}>
          <View style={styles.score_count}>
          <Text style={{fontSize: 35}}>{totalScore}</Text>
          </View>
          <View style={styles.score_user}>
            <Text style={{fontSize: 25, color: 'green'}}>{userScore}</Text>
            <Text style={{fontSize: 25, color: 'red'}}>{cptScore}</Text>
          </View>
        </View>
        <View style={styles.display_img}>
        <ChoiceCard
         player="Player"
         choice={userChoice}
        />
        <Text style={{ color: '#250902' }}>vs</Text>
        <ChoiceCard
        player="Computer"
        choice={computerChoice}
        />  
        </View>
      </View>
    {
    CHOICES.map(choice => {
      return <Button key={choice.name} name={choice.name} onPress={onPress} />;
      
    })
    }
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e9ebee',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: 200,
    margin: 10,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#640D14',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  choicesContainer: {
    flex: 0.8,
    margin: 10,
    borderWidth: 2,
    paddingTop: 50,
    shadowRadius: 5,
    paddingBottom: 100,
    borderColor: 'grey',
    shadowOpacity: 0.90,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { height: 5, width: 5 },
  },
  display_score:{
    flex: 0.2,
    position: "relative",
    alignItems: "center",
  },
  display_img: {
    flex: 0.8,
    flexDirection: 'row',
  },
  score_user:{
    width: 185,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    position: "absolute",
  },
  score_count: {
    marginTop: -43,
    position: "relative",
    marginBottom: 10,
  },
  choiceContainer: {
    flex: 1,
    alignItems: 'center',
  },
  choiceDescription: {
    fontSize: 25,
    color: '#250902',
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  choiceCardTitle: {
    fontSize: 30,
    color: '#250902'
  },
  choiceImage: {
    width: 150,
    height: 150,
    padding: 10,
  }
});
