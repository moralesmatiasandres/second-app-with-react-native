import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './reutilizables';

class LoginForm extends Component {
  state ={ email: '', contraseña: '', error: '', loading: false };
  
  onButtonPress() {
     const { email, contraseña } = this.state; 
     this.setState({ error: '', loading: true });
     
     firebase.auth().signInWithEmailAndPassword(email, contraseña)
      .then(this.logeoExitoso.bind(this)) 
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, contraseña)
         .then(this.logeoExitoso.bind(this))
         .catch(this.logeoFallido.bind(this));           
      });
  }

    logeoExitoso() {
        this.setState({
             email: '',
             contraseña: '',
             loading: false,
             error: ''
        });
    }
    logeoFallido() {
        this.setState({ error: 'Error de autentifiacion', loading: false }); 
    }

    renderButton() {
        if (this.state.loading) {
           return <Spinner tamaño='small' />;
        }
        return (
            <Button presionarBoton={this.onButtonPress.bind(this)} >
                Log in
            </Button>
        );
    }
    
    render() {
        return (
           <Card>
               <CardSection >
                   <Input 
                      placeholder="user@gmail.com"
                      label="Email"
                      value={this.state.email}
                      onChangeText={email => this.setState({ email })}
                   />
               </CardSection >

               <CardSection>
                   <Input
                      secureTextEntry
                      placeholder="Contraseña"
                      label="Contraseña"
                      value={this.state.contraseña}
                      onChangeText={contraseña => this.setState({ contraseña })}
                   />
               </CardSection>

               <Text style={styles.errorStyle}>
                   {this.state.error}
               </Text>

               <CardSection>
                   {this.renderButton()}
               </CardSection>
           </Card>
        );
    }
}

const styles = {
    errorStyle: {
        fontSize: 40,
        alignSelf: 'center',
        color: 'red',
    }
};

export default LoginForm;
