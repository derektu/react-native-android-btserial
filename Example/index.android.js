/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

var TestScreen = require('./App/Components/TestScreen');

class TestBTSerial extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TestScreen/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('TestBTSerial', () => TestBTSerial);
