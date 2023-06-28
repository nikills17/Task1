import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

const Home = ({ route }) => {
  const { name, email, hobbies, gender, mobile, profileImage } = route.params.userData;

  return (
    <View style={styles.container}>
      <Text style={{ color: '#000', fontWeight: '700', fontSize: 22, marginVertical: 25 }}>Registration Form Data</Text>
      <Text style={styles.heading}>Name: <Text style={styles.text}>{name}</Text></Text>
      <Text style={styles.heading}>Email: <Text style={styles.text}>{email}</Text></Text>
      <Text style={styles.heading}>Hobbies: <Text style={styles.text}>{hobbies.join(', ')}</Text></Text>
      <Text style={styles.heading}>Gender: <Text style={styles.text}>{gender}</Text></Text>
      <Text style={styles.heading}>Mobile: <Text style={styles.text}>{mobile}</Text></Text>
      <Text style={styles.heading}>Image:</Text>
      {profileImage && <Image source={{ uri: profileImage }} style={{ width: 200, height: 200 }} />}
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  heading: {
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#000'
  },
  text: {
    fontWeight: '400',
    color: '#000'
  },
});
export default Home
