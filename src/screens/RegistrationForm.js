import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert, ScrollView, StatusBar } from 'react-native';
import { Checkbox, RadioButton, Button } from 'react-native-paper';
import ImageCropPicker from 'react-native-image-crop-picker';


const RegistrationForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hobbies, setHobbies] = useState([]);
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [validationError, setValidationError] = useState('');

  const hobbySelect = (value) => {
    if (hobbies.includes(value)) {
      setHobbies(hobbies.filter((hobby) => hobby !== value));
    } else {
      setHobbies([...hobbies, value]);
    }
  };


  const onSubmit = (userData) => {
    console.log(userData);
  };


  const handleRegistration = () => {
    if (!name || !email || !hobbies.length || !gender || !mobile) {
      setValidationError('Please fill in all fields');
    } else {
      setValidationError('');

      const userData = {
        name,
        email,
        hobbies,
        gender,
        mobile,
        profileImage,
      };

      onSubmit(userData);

      setName('');
      setEmail('');
      setHobbies([]);
      setGender('');
      setMobile('');
      setProfileImage(null);
      navigation.navigate('Home', { userData });
    }
  };


  const handleImageUpload = () => {
    Alert.alert(
      'Select an image from',
      'Gallery',
      [
        {
          text: 'Gallery',
          onPress: () => {
            ImageCropPicker.openPicker({
              width: 500,
              height: 500,
            }).then((image) => {
              setProfileImage(image.path);
            });
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };



  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />

      <Text style={styles.text}>Registration Form</Text>
      <ScrollView showsVerticalScrollIndicator={false}>


        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Hobbies</Text>
        <View style={styles.checkboxContainer}>


          <Checkbox.Item
            label="Reading"
            status={hobbies.includes('Reading') ? 'checked' : 'unchecked'}
            onPress={() => hobbySelect('Reading')}
          />
          <Checkbox.Item
            label="Gaming"
            status={hobbies.includes('Gaming') ? 'checked' : 'unchecked'}
            onPress={() => hobbySelect('Gaming')}
          />
        </View>

        <Text style={styles.label}>Gender</Text>
        <View style={styles.radioContainer}>
          <RadioButton.Group onValueChange={setGender} value={gender}>
            <View style={styles.radioButtonContainer}>
              <RadioButton.Item label="Male" value="Male" />
              <RadioButton.Item label="Female" value="Female" />
            </View>
          </RadioButton.Group>
        </View>

        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.input}
          value={mobile}
          onChangeText={setMobile}
          placeholder="Enter your mobile number"
          keyboardType="numeric"
        />

        <View style={styles.profileImageContainer}>
          {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}
          <TouchableOpacity onPress={handleImageUpload} style={styles.uploadButton}>
            <Text style={styles.buttonText}>Upload Profile Image</Text>
          </TouchableOpacity>

        </View>

        <Text style={styles.errorText}>{validationError}</Text>

        <Button mode="contained" onPress={handleRegistration} style={styles.button}>
          Submit
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    color: '#000',
    marginVertical: 20
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  checkboxContainer: {
    marginTop: 5,
  },
  radioContainer: {
    marginTop: 5,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  button: {
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default RegistrationForm;
