import React from 'react';
import {
  AsyncStorage,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  RkButton, RkStyleSheet,
  RkText
} from 'react-native-ui-kitten';
import {MainRoutes} from '../../config/navigation/routes';
import {data} from '../../data'
import {NavigationActions} from "react-navigation";
const paddingValue = 8;

export class GridV1 extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Grid Menu'.toUpperCase(),
  });

  constructor(props) {
    super(props);
  }


  _calculateItemSize() {
    let {height, width} = Dimensions.get('window');
    return (width - paddingValue * 6) / 2;
  }

  render() {
    let size = this._calculateItemSize();
    let navigate = this.props.navigation.navigate;
    let thisProps = this.props;

    let items = MainRoutes.map(function (route, index) {
      return (
        <RkButton
          rkType='square shadow'
          style={{width: size, height: size}}
          key={index}
          onPress={() => {
              if (route.id === 'LogOut') {
                  data.logout().then(
                      success =>{

                          let toLogin = NavigationActions.reset({
                              index: 0,
                              actions: [NavigationActions.navigate({routeName: 'Login'})]
                          });

                          thisProps.screenProps.rootNavigation.dispatch(toLogin);
                      },
                      error=>alert('beklenmeyen bir hata olustu')
                  );

              } else {
                  navigate(route.id);
              }
          }}>

          <RkText style={styles.icon} rkType='primary moon menuIcon'>
            {route.icon}
          </RkText>
          <RkText>{route.title}</RkText>

        </RkButton>
      )
    });


    return (
      <ScrollView style={styles.root}
                  contentContainerStyle={styles.rootContainer}>
        {items}
      </ScrollView>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.scroll,
    padding: paddingValue,
  },
  rootContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  icon: {
    marginBottom: 16
  }
}));