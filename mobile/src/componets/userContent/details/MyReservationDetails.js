import { View, Modal } from "react-native";
import React from "react";
import MyReservationCarDetails from "./MyReservationCarDetails";
import MyReservationFlatDetails from "./MyReservationFlatDetails";
import MyReservationParkingDetails from "./MyReservationParkingDetails";

export default class MyReservationDetails extends React.Component {
  constructor(props) {
    super(props);
    this.cancelReservation = this.cancelReservation.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);

    this.state = {
      modalVisible: false,
    };
  }
  setModalVisible(value) {
    this.setState({ modalVisible: value });
  }

  cancelReservation() {
    this.setState({ modalVisible: false });
    let fkid = this.props.navigation.getParam("FKid");
    let type = this.props.navigation.getParam("type");
    let id = this.props.navigation.getParam("id");
    let result;
    if (type === "car") {
      result = this.cancelCarReservation(fkid);
    } else if (type === "flat") {
      result = this.cancelFlatReservation(fkid);
    } else {
      result = this.cancelParkingReservation(fkid);
    }
    if (result.isSucces) {
      this.cancelReservationInBookly(id);
    }
  }
  cancelCarReservation(fkid) {
    //fetch
  }
  cancelParkingReservation(fkid) {
    //fetch
  }
  cancelFlatReservation(fkid) {}
  cancelReservationInBookly(id) {}

  render() {
    let body;
    if (this.props.navigation.getParam("type") === "car") {
      body = <MyReservationCarDetails FKid={this.props.navigation.getParam("FKid")} />;
    } else if (this.props.navigation.getParam("type") === "flat") {
      body = <MyReservationFlatDetails FKid={this.props.navigation.getParam("FKid")} />;
    } else if (this.props.navigation.getParam("type") === "parking") {
      body = <MyReservationParkingDetails FKid={this.props.navigation.getParam("FKid")} />;
    }
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Do you want to cancel that reservation?</Text>

              <TouchableHighlight
                onPress={() => {
                  this.cancelReservation();
                }}
              >
                <Text>Yes</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(false);
                }}
              >
                <Text>No</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        {body}

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Cancel reservation</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
