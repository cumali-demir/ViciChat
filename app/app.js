import React from 'react';
import {
  DrawerNavigator,
  StackNavigator
} from 'react-navigation';
import {withRkTheme} from 'react-native-ui-kitten';
import {AppRoutes} from './config/navigation/routesBuilder';
import * as Screens from './screens';
import {bootstrap} from './config/bootstrap';
import track from './config/analytics';
import {data} from './data'
// import {AppLoading, Font} from 'expo';
import {View} from "react-native";

bootstrap();
data.populateData();
console.ignoredYellowBox = [
    'Warning: Failed prop type: Invalid props.style key `fontSize` supplied to `View`',
    'Remote debugger is in a background tab'
];

function getCurrentRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getCurrentRouteName(route);
  }
  return route.routeName;
}

let SideMenu = withRkTheme(Screens.SideMenu);
const KittenApp = StackNavigator({
  First: {
    screen: Screens.SplashScreen
  },
    Login: {
        screen: Screens.LoginV2
    },
  Home: {
    screen: DrawerNavigator({
        ...AppRoutes,
      },
      {
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
        contentComponent: (props) => <SideMenu {...props}/>
      })
  }
}, {
  headerMode: 'none',
});

export default class App extends React.Component {

  render() {

      componentDidMount(){
          
      }

    return (
      <View style={{flex: 1}}>
        <KittenApp
          onNavigationStateChange={(prevState, currentState) => {
            const currentScreen = getCurrentRouteName(currentState);
            const prevScreen = getCurrentRouteName(prevState);

          }}
        />
      </View>
    );
  }
}

// Expo.registerRootComponent(App);
