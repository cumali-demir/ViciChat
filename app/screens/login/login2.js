import React from 'react';
import {
  View,
  Image,
    AsyncStorage,
  Keyboard
} from 'react-native';
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard, RkStyleSheet
} from 'react-native-ui-kitten';
import {FontAwesome} from '../../assets/icons';
import {GradientButton} from '../../components/gradientButton';
import {RkTheme} from 'react-native-ui-kitten';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import {NavigationActions} from "react-navigation";
import {data} from '../../data'
import {LoadingIndicator} from "../../components";

export class LoginV2 extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state={
        email:'',
        password:'',
    }
  }

  async componentDidMount(){
      let email =   await AsyncStorage.getItem('email');
      let password = await AsyncStorage.getItem('password');

      console.log(email);

      console.log(password);
      if(email === null || password === null){
          return;
      }

      this.setState({email,password});
      this.login()
  }
  login(){



          let {email,password} = this.state;
          this.setState({loading:true});
          data.login(email,password).then(
              success => {
                  this.setState({loading:false,error:false});

                  AsyncStorage.setItem('email', email);
                  AsyncStorage.setItem('password', password);

                  let toHome = NavigationActions.reset({
                      index: 0,
                      actions: [NavigationActions.navigate({routeName: 'Home'})]
                  });
                  this.props.navigation.dispatch(toHome)
              },
              error=>{
                  this.setState({loading:false,error:true});
                  alert(error || 'Unexpected Error');
              }
          );

  }
  render() {
      let {loading} = this.state;
    let renderIcon = () => {
      if (RkTheme.current.name === 'light')
        return <Image style={styles.image} source={require('../../assets/images/logo.png')}/>;
      return <Image style={styles.image} source={require('../../assets/images/logoDark.png')}/>
    };

    let {email,password} = this.state;
    return (
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={ (e) => true}
        onResponderRelease={ (e) => Keyboard.dismiss()}>
        <View style={styles.header}>
          {renderIcon()}
          <RkText rkType='light h1'>React Native</RkText>
          <RkText rkType='logo h0'>UI Kitten</RkText>
        </View>
        <View style={styles.content}>
          <View>
            <RkTextInput rkType='rounded'
                         value={email}
                         placeholder='Username'
                         onChangeText={(email) => this.setState({email})}/>

            <RkTextInput rkType='rounded'
                         value={password}
                         placeholder='Password' secureTextEntry={true}
                         onChangeText={(password) => this.setState({password})}/>
              <LoadingIndicator loading={loading}/>

              <GradientButton style={styles.save} rkType='large' text='LOGIN'
                              onPress={() => this.login()}/>
          </View>
          <View style={styles.buttons}>
            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero'>{FontAwesome.twitter}</RkText>
            </RkButton>
            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero'>{FontAwesome.google}</RkText>
            </RkButton>
            <RkButton style={styles.button} rkType='social'>
              <RkText rkType='awesome hero'>{FontAwesome.facebook}</RkText>
            </RkButton>
          </View>

          <View style={styles.footer}>
            <View style={styles.textRow}>
              <RkText rkType='primary3'>Don’t have an account?</RkText>
              <RkButton rkType='clear' onPress={() => this.props.navigation.navigate('SignUp')}>
                <RkText rkType='header6'> Sign up now </RkText>
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
    padding: scaleVertical(16),
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: theme.colors.screen.base
  },
  image: {
    height: scaleVertical(77),
    resizeMode: 'contain'
  },
  header: {
    paddingBottom: scaleVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  content: {
    justifyContent: 'space-between'
  },
  save: {
    marginVertical: 20
  },
  buttons: {
    flexDirection: 'row',
    marginBottom: scaleVertical(24),
    marginHorizontal: 24,
    justifyContent: 'space-around',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    borderColor: theme.colors.border.solid
  },
  footer: {}
}));