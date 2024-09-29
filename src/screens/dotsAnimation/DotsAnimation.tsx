import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions, Text, TouchableOpacity } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const DOT_COUNT = 1000;  // Total dots for all letters

const DotsAnimation = () => {
  const [dots, setDots] = useState([]);
  const animationValues = useRef([]);

  useEffect(() => {
    const generatedDots: any = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      generatedDots.push({
        x: new Animated.Value(Math.random() * SCREEN_WIDTH),
        y: new Animated.Value(Math.random() * SCREEN_HEIGHT),
      });
    }
    setDots(generatedDots);
    animationValues.current = generatedDots;
  }, []);

  const startAnimation = () => {
    const letterForm = generateLetterForm('HELO', DOT_COUNT);

    const animations = animationValues.current.map((dot: any, index) => {
      return Animated.parallel([
        Animated.timing(dot.x, {
          toValue: letterForm[index % letterForm.length].x,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(dot.y, {
          toValue: letterForm[index % letterForm.length].y,
          duration: 3000,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.stagger(10, animations).start();
  };

  // Function to generate positions for 'HELLO'
  const generateLetterForm = (word: string, count: number) => {
    const positions = [];
    const totalLetters = word.length;
    const dotPerLetter = Math.floor(count / totalLetters); // Distribute dots evenly across all letters

    for (let i = 0; i < totalLetters; i++) {
      const letter = word[i];
      const letterXOffset = (SCREEN_WIDTH / (totalLetters + 1)) * (i + 1); // Space between letters
      positions.push(...generateLetterPositions(letter, dotPerLetter, letterXOffset));
    }

    return positions;
  };

  // Function to generate positions for each letter
  const generateLetterPositions = (letter: string, count: number, xOffset: number) => {
    const positions = [];
    const letterHeight = SCREEN_HEIGHT / 8; // Smaller height for letters
    const letterWidth = SCREEN_WIDTH / 30;  // Smaller width for letters
    const centerY = SCREEN_HEIGHT / 2;      // Center on the screen

    switch (letter) {
      case 'H':
        for (let i = 0; i < count / 3; i++) {
          positions.push({ x: xOffset, y: centerY + i * (letterHeight / (count / 3)) });
          positions.push({ x: xOffset + letterWidth, y: centerY + i * (letterHeight / (count / 3)) });
        }
        for (let i = 0; i < count / 3; i++) {
          positions.push({ x: xOffset + i * (letterWidth / (count / 3)), y: centerY + letterHeight / 2 });
        }
        break;

      case 'E':
        for (let i = 0; i < count / 3; i++) {
          positions.push({ x: xOffset, y: centerY + i * (letterHeight / (count / 3)) });
        }
        for (let i = 0; i < count / 3; i++) {
          positions.push({ x: xOffset + i * (letterWidth / (count / 3)), y: centerY });
          positions.push({ x: xOffset + i * (letterWidth / (count / 3)), y: centerY + letterHeight / 2 });
          positions.push({ x: xOffset + i * (letterWidth / (count / 3)), y: centerY + letterHeight });
        }
        break;

      case 'L':
        for (let i = 0; i < count / 2; i++) {
          positions.push({ x: xOffset, y: centerY + i * (letterHeight / (count / 2)) });
        }
        for (let i = 0; i < count / 2; i++) {
          positions.push({ x: xOffset + i * (letterWidth / (count / 2)), y: centerY + letterHeight });
        }
        break;

      case 'O':
        const radius = letterHeight / 3; // Smaller radius for 'O'
        const dotsForO = count; // Use more dots for 'O' to make it smooth
        for (let i = 0; i < dotsForO; i++) {
          const angle = (i / dotsForO) * 2 * Math.PI;
          const x = xOffset + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          positions.push({ x, y });
        }
        break;

      default:
        break;
    }

    return positions;
  };

  return (
    <View style={styles.container}>
      {dots.map((dot: any, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              transform: [
                { translateX: dot.x },
                { translateY: dot.y },
              ],
            },
          ]}
        />
      ))}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={startAnimation}>
          <Text style={styles.buttonText}>Form HELLO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  dot: {
    position: 'absolute',
    width: 2,
    height: 2,
    backgroundColor: 'black',
    borderRadius: 1,
  },
  buttonContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default DotsAnimation;
