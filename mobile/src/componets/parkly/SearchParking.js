import React from "react";
import { connect } from "react-redux";

import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import { Container, Text } from "native-base";
import { TextInput, HelperText, Title, Button } from "react-native-paper";

import DateTimePicker from "@react-native-community/datetimepicker";
import { LocalDate, LocalTime, DateTimeFormatter, nativeJs } from "@js-joda/core";

import { white } from "react-native-paper/lib/commonjs/styles/colors";
import { anyError, searchByDate } from "../../redux/actions";
import { BUTTON_COLOR } from "../../helpers/colors";

const styles = StyleSheet.create({
  content: { paddingHorizontal: 10, paddingVertical: 20 },
  contentContainer: {
    alignItems: "stretch",
    backgroundColor: white,
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputDate: {
    backgroundColor: white,
    height: 45,
    marginBottom: 10,
    marginRight: 10,
    marginTop: 0,
  },
  putOnBottom: { marginTop: 20 },
  row: {
    flexDirection: "row",
  },
  whiteBackground: {
    backgroundColor: white,
  },
});
const currDate = new Date();

class SearchParking extends React.Component {
  static navigationOptions = { title: "Search parking" };

  constructor(props) {
    super(props);

    const datePlusHour = new Date(currDate);
    datePlusHour.setHours(currDate.getHours() + 1);
    this.state = {
      showDateFromPicker: false,
      showTimeFromPicker: false,
      showDateToPicker: false,
      showTimeToPicker: false,
      city: "",
      dateFrom: currDate,
      dateTo: datePlusHour,
      cityValid: true,
      dateToValid: true,
    };

    this.setDateFrom = this.setDateFrom.bind(this);
    this.setDateTo = this.setDateTo.bind(this);
    this.setCity = this.setCity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  setDateFrom(e, date) {
    if (!date) {
      this.setState({ showDateFromPicker: false, showTimeFromPicker: false });
      return;
    }

    this.setState(oldstate => ({
      dateFrom: date,
      dateToValid: this.validateDateTo(date, oldstate.dateFrom),
      showDateFromPicker: false,
      showTimeFromPicker: false,
    }));
  }

  setDateTo(e, date) {
    if (!date) {
      this.setState({ showDateToPicker: false, showTimeToPicker: false });
      return;
    }

    this.setState(oldstate => ({
      dateTo: date,
      dateToValid: this.validateDateTo(oldstate.dateFrom, date),
      showDateToPicker: false,
      showTimeToPicker: false,
    }));
  }

  validateDateTo(dateFrom, dateTo) {
    const ONE_HOUR = 60 * 60;
    return Boolean(dateFrom && dateTo && parseInt((dateTo - dateFrom) / 1000, 10) >= ONE_HOUR);
  }

  setCity(city) {
    this.setState({
      city,
      cityValid: this.validateCity(city),
    });
  }

  validateCity(city) {
    const cityPattern = /^[A-ZĆŁÓŚŹŻa-ząćęłńóśźż]{3,}$/;
    return Boolean(cityPattern.test(city));
  }

  errorMessage(field) {
    switch (field) {
      case "City":
        return "City name incorrect";
      case "DateTo":
        return "Date to must be later than date from by at least 1 hour";
      default:
        return "";
    }
  }

  handleSubmit() {
    const { city, dateFrom, dateTo } = this.state;
    const cityValid = this.validateCity(city);
    const dateToValid = this.validateDateTo(dateFrom, dateTo);
    if (!cityValid || !dateToValid) {
      this.setState({ cityValid, dateToValid });
      return;
    }
    // TODO: fetch here - reservations/find-parkings

    this.props.searchByDate({ from: dateFrom, to: dateTo });
    this.props.navigation.push("ListParking");
  }

  render() {
    const { showDateFromPicker, showTimeFromPicker, dateFrom, showDateToPicker, showTimeToPicker, dateTo } = this.state;
    const dateFromFormatted = LocalDate.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("d/M/yyyy"));
    const timeFromFormatted = LocalTime.from(nativeJs(dateFrom)).format(DateTimeFormatter.ofPattern("HH:mm"));
    const dateToFormatted = LocalDate.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("d/M/yyyy"));
    const timeToFormatted = LocalTime.from(nativeJs(dateTo)).format(DateTimeFormatter.ofPattern("HH:mm"));

    return (
      <Container>
        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
          <Title>City</Title>
          <TextInput
            mode="outlined"
            style={styles.whiteBackground}
            onChangeText={text => this.setCity(text)}
            value={this.state.city}
          />
          {!this.state.cityValid && <HelperText type="error">{this.errorMessage("City")}</HelperText>}
          <View>
            <Title>From</Title>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => this.setState({ showDateFromPicker: true })}>
                <TextInput mode="flat" style={styles.inputDate} value={dateFromFormatted} editable={false} />
                {showDateFromPicker && (
                  <DateTimePicker
                    minimumDate={currDate}
                    value={dateFrom}
                    mode="date"
                    display="calendar"
                    onChange={this.setDateFrom}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ showTimeFromPicker: true })}>
                <TextInput mode="flat" style={styles.inputDate} value={timeFromFormatted} editable={false} />
                {showTimeFromPicker && (
                  <DateTimePicker
                    minimumDate={currDate}
                    value={dateFrom}
                    mode="time"
                    display="clock"
                    onChange={this.setDateFrom}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Title>To</Title>
            <View style={styles.row}>
              <TouchableOpacity onPress={() => this.setState({ showDateToPicker: true })}>
                <TextInput mode="flat" style={styles.inputDate} value={dateToFormatted} editable={false} />
                {showDateToPicker && (
                  <DateTimePicker
                    minimumDate={dateFrom}
                    value={dateTo}
                    mode="date"
                    display="calendar"
                    onChange={this.setDateTo}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity onPress={() => this.setState({ showTimeToPicker: true })}>
                <TextInput mode="flat" style={styles.inputDate} value={timeToFormatted} editable={false} />
                {showTimeToPicker && (
                  <DateTimePicker
                    minimumDate={dateFrom}
                    value={dateTo}
                    mode="time"
                    display="clock"
                    onChange={this.setDateTo}
                  />
                )}
              </TouchableOpacity>
            </View>
            {!this.state.dateToValid && <HelperText type="error">{this.errorMessage("DateTo")}</HelperText>}
          </View>

          <Button
            mode="contained"
            color={BUTTON_COLOR}
            style={styles.putOnBottom}
            disabled={!(this.state.cityValid && this.state.dateToValid)}
            onPress={this.handleSubmit}
          >
            <Text>Search</Text>
          </Button>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = (state /* , ownProps */) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  anyError: data => dispatch(anyError(data)),
  searchByDate: dates => dispatch(searchByDate(dates)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchParking);
