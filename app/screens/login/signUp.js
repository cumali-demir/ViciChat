import React from 'react';
import {
  View,
    Alert,
    ScrollView,
  Image,
  Keyboard
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkStyleSheet,
  RkTheme,
  RkAvoidKeyboard
} from 'react-native-ui-kitten';
import {GradientButton} from '../../components/';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import {data} from '../../data'
import {LoginV1} from "./login1";
export class SignUp extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state={
        name:'',
        surname:'',
        email:'',
        password:'',
        passwordConfrim:'',
    }

  }



    checkInputs(){
        let user = this.state;
        for (var i in user) {
            if (user[i] === '' ) {
                alert(i.toUpperCase() + ' Cannot be pass empty');
                return false;
            }
        }

        if(user.password !== user.passwordConfrim){
            alert('Passwords are not equal');
            return false;
        }
        return true
    }
    signUp(){

        if( !this.checkInputs() )
            return;

        let {email,password} = this.state;
        this.setState({loading:true});
        data.signUp(email,password).then(
            success=>{
                this.setState({loading:false,error:false});
                Alert.alert(
                    'Success',
                    'Registration Successful,please login',
                    [
                        {text: 'OK', onPress: () => this.props.navigation.navigate("Login")},
                    ],
                    { cancelable: false }
                )
            },
            error=>{
                this.setState({loading:false,error:true});
                alert(error || 'There is an unexcepted error')
            }
        )
    }

    render() {
        let renderIcon = () => {
            if (RkTheme.current.name === 'light')
                return <Image style={styles.image} source={require('../../assets/images/logo.png')}/>;
            return <Image style={styles.image} source={require('../../assets/images/logoDark.png')}/>
        };
        return (
            <RkAvoidKeyboard
                style={styles.screen}
                onStartShouldSetResponder={ (e) => true}
                onResponderRelease={ (e) => Keyboard.dismiss()}>
                <View style={{alignItems: 'center'}}>
                    {renderIcon()}
                    <RkText rkType='h1'>Registration</RkText>
                </View>
                <View style={styles.content}>
                    <View>
                        <RkTextInput
                            rkType='rounded'
                            placeholder='Name'
                            onChangeText={(name) => this.setState({name})}/>
                        <RkTextInput
                            rkType='rounded'
                            placeholder='Surname'
                            onChangeText={(surname) => this.setState({surname})}/>
                        <RkTextInput
                            rkType='rounded'
                            placeholder='Email'
                            onChangeText={(email) => this.setState({email})}/>
                        <RkTextInput
                            rkType='rounded'
                            placeholder='Password'
                            secureTextEntry={true}
                            onChangeText={(password) => this.setState({password})}/>
                        <RkTextInput
                            rkType='rounded'
                            placeholder='Confirm Password'
                            secureTextEntry={true}
                            onChangeText={(passwordConfrim) => this.setState({passwordConfrim})}/>

                        <GradientButton style={styles.save} rkType='large' text='SIGN UP'
                                        onPress={() => this.signUp()}/>
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.textRow}>
                            <RkText rkType='primary3'>Already have an account?</RkText>
                            <RkButton rkType='clear'  onPress={() => this.props.navigation.navigate('Login')}>
                                <RkText rkType='header6'> Sign in now </RkText>
                            </RkButton>
                        </View>
                    </View>
                </View>
            </RkAvoidKeyboard>
        )
    }
}

let styles = RkStyleSheet.create(theme => ({
    screen: {
        padding: 16,
        flex: 1,
        justifyContent: 'space-around',
        backgroundColor: theme.colors.screen.base
    },
    image: {
        marginBottom: 10,
        height:scaleVertical(77),
        resizeMode:'contain'
    },
    content: {
        justifyContent: 'space-between'
    },
    save: {
        marginVertical: 20
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: 24,
        marginHorizontal: 24,
        justifyContent: 'space-around'
    },
    footer:{
        justifyContent:'flex-end'
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
}));