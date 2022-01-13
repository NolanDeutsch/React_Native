import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default MessageScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Message Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
