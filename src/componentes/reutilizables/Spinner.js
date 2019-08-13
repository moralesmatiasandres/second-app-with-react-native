import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ tamaño }) => (
        <View style={styles.spinnerStyle}>
           <ActivityIndicator size={tamaño || 'large'} />
        </View>
    );

const styles = {
    spinnerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
};

export { Spinner };
