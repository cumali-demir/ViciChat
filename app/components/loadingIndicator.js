import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Spinner from 'react-native-spinkit'

export class LoadingIndicator extends React.Component {

    constructor(props) {

        super(props);
    }

    render() {

        let {loading} = this.props;
        if (!loading) return null;

        return (
                <View style={styles.root}>
                    <View style={styles.container}>
                        <Spinner type='ThreeBounce'
                                 color='white'
                                 isVisible={true} />
                        <Text style={styles.text}>Please Wait...</Text>
                    </View>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
    },
    container: {
        padding: 50,
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: 'black',
        opacity: .7
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});