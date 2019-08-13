import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, CardSection } from './componentes/reutilizables';
import LoginForm from './componentes/LoginForm';

class App extends Component {
    state = { logeado: null }; 

    componentDidMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyC6rRjckY3XsaWNSxewnukZZN6T5AgM_L4',
            authDomain: 'autentificacion-9b390.firebaseapp.com',
            databaseURL: 'https://autentificacion-9b390.firebaseio.com',
            projectId: 'autentificacion-9b390',
            storageBucket: 'autentificacion-9b390.appspot.com',
            messagingSenderId: '580082617367',
            
    });

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.setState({ logeado: true });
        } 
        else {
            this.setState({ logeado: false });
        }
    });    
} 
    renderContent() {
        switch (this.state.logeado) {
            case true: 
                return (
                    <CardSection>
                        <Button presionarBoton={() => firebase.auth().signOut()}>Log out</Button>
                    </CardSection>
                );      
            case false:
                return <LoginForm />;
            default: 
                return <Spinner tamaño="large" />;  
        }
    }

    render() {
        return (
           <View>
              <Header headerText="AUTENIFICACION" /> 
              {this.renderContent()}
           </View>
        );
    }
}

export default App;

