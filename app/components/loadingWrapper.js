import React from 'react'
import {ActivityIndicator, View} from "react-native";
import {RkStyleSheet, RkText} from "react-native-ui-kitten";
import {FontIcons} from "../assets/icons";

export class LoadingWrapper extends React.Component {

    constructor(props) {

        super (props);
    }

    render() {

        let {loading, error, children, footer} = this.props;
        if (loading) {
            return (
                <View style={styles.container}>
                    <View>
                        <ActivityIndicator size="large"/>
                        <RkText rkType='secondary' style={styles.text}>Lütfen bekleyin...</RkText>
                    </View>
                </View>
            )
        } else if (error) {
            return (
                <View style={styles.container}>
                    <View>
                        <RkText style={styles.text} rkType='primary moon menuIcon'>
                            {FontIcons.caution}
                        </RkText>
                        <RkText rkType='secondary' style={styles.text}>{error||'Bir hata oluştu.'}</RkText>
                        {footer}
                    </View>

                </View>
            )
        }
        return children || null;
    }
}

let styles = RkStyleSheet.create(theme => ({
    container: {
        backgroundColor: theme.colors.screen.base,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    text: {
        textAlign: 'center',
        padding: 10
    }
}));