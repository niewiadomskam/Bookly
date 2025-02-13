import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import LoginScreen from "./componets/userContent/LoginScreen";
import HomeScreen from "./componets/userContent/HomeScreen";
import FlatsListScreen from "./componets/flatly/FlatsListScreen";
import MyReservationsList from "./componets/userContent/MyReservationsList";
import MyReservationCarDetails from "./componets/userContent/details/MyReservationCarDetails";
import MyReservationFlatDetails from "./componets/userContent/details/MyReservationFlatDetails";
import MyReservationParkingDetails from "./componets/userContent/details/MyReservationParkingDetails";
import MyReservationDetails from "./componets/userContent/details/MyReservationDetails";

const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen },
    FlatsList: { screen: FlatsListScreen },
    LoginScreen: { screen: LoginScreen },
    MyReservationsList: { screen: MyReservationsList },
    MyReservationCarDetails: { screen: MyReservationCarDetails },
    MyReservationFlatDetails: { screen: MyReservationFlatDetails },
    MyReservationParkingDetails: { screen: MyReservationParkingDetails },
    MyReservationDetails: { screen: MyReservationDetails },
  },
  {
    initialRouteName: "LoginScreen",
    headerMode: "screen",
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
