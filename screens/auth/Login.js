import { Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';//install

import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loginUser } from '../../redux/actions'

import { container, form } from '../styles';
import data from '../../data/data.json'

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true);

    const users = data["users"]
    const userEmails = users.map((user) => { 
        return user["email"]
     })
    const onSignUp = () => {
        if (userEmails.indexOf(email)!==-1){
            if (users[userEmails.indexOf(email)]["password"]===password) {
                props.loginUser(userEmails.indexOf(email))
                .then((res) => { 
                    console.log(props.currentUser);
                 })
            } 
            else 
            {
                setIsValid({ bool: true, boolSnack: true, message: "Invalid password" })
                return;
            }
        }
        else{
            setIsValid({ bool: true, boolSnack: true, message: "Unregistered email" })
            return;
        }
    }

    return (
        <View style={container.center}>
            <View style={container.formCenter}>
                <TextInput
                    style={form.textInput}
                    placeholder="email"
                    onChangeText={(email) => setEmail(email)}
                />
                <TextInput
                    style={form.textInput}
                    placeholder="password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />

                <Button
                    style={form.button}
                    onPress={() => onSignUp()}
                    title="Sign In"
                />
            </View>
            <View style={form.bottomButton} >
                <Text
                    title="Register"
                    onPress={() => props.navigation.navigate("Register")} >
                    Don't have an account? SignUp.
                </Text>
            </View>
            <Snackbar
                visible={isValid.boolSnack}
                duration={2000}
                onDismiss={() => { setIsValid({ boolSnack: false }) }}>
                {isValid.message}
            </Snackbar>
        </View>
    )
}


const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})

const mapDispatchProps = (dispatch) => bindActionCreators({ loginUser }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Login);
