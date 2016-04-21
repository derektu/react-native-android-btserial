import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Button from 'apsl-react-native-button';
var BTSerial = require('react-native-android-btserial');

class TestScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    
    this.deviceName = '98:D3:31:90:6C:78'; // please put your device name here
  }
  
  componentDidMount() {
    BTSerial.setConnectionStatusCallback((e)=> {
      alert(JSON.stringify(e));  
    })

    BTSerial.setDataAvailableCallback((e)=> {
      console.log(JSON.stringify(e));
    })
  }

  showBTSettings() {
    BTSerial.showBTSettings();
  }

  doEnableBT() {
    BTSerial.enableBT((err, status)=> {
      if (err || !status) {
        setTimeout(()=> {
          BTSerial.showBTSettings();  
        }, 100);
      }
      else {
        alert('BT is enabled');
      }
    });
  }
  
  doListDevices() {
    BTSerial.listDevices((err, devices)=> {
      if (err) {
        alert('Err=' + err);
      }
      else {
        alert(devices);
      }
    })
  }
  
  doConnect(deviceName) {
    BTSerial.connect(deviceName, (err, status, deviceName)=> {
      if (err) {
        alert('Err=' + err);
      }
      else {
        if (!status)
          alert("Connection: error");
        else
          alert("Connection: OK=" + deviceName);  
      }
    });
  }
  
  doDisconnect() {
    BTSerial.disconnect();
  }

  doWriteBT(str) {
    BTSerial.write(str, null, (err)=> {
      if (err)
        alert('Err=' + err);
    })
  }
  
  doReadBT() {
    BTSerial.available((err, size)=> {
      if (err) {
        alert('Err=' + err);
      }
      else if (size == 0) {
        alert('No data to read');
      } 
      else if (size > 0) {
        BTSerial.read(null, (err, data)=> {
          if (err) {
            alert('Read Err=' + err);
          }
          else {
            alert('Read=' + data);
          }
        })        
      } 
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.btnBackground} textStyle={styles.btnText} onPress={this.showBTSettings.bind(this)}>Show BT Settings</Button>
        <Button style={styles.btnBackground} textStyle={styles.btnText} onPress={this.doEnableBT.bind(this)}>Check BT Status</Button>
        <Button style={styles.btnBackground} textStyle={styles.btnText} onPress={this.doListDevices.bind(this)}>List Paired Devices</Button>
        <Button style={styles.btnBackground} textStyle={styles.btnText} onPress={this.doConnect.bind(this, this.deviceName)}>Connect BT</Button>
        <Button style={styles.btnBackground} textStyle={styles.btnText} onPress={this.doDisconnect.bind(this)}>Disconnect BT</Button>
        <Button style={styles.btnBackground} textStyle={styles.btnText} onPress={this.doWriteBT.bind(this, '1')}>Write</Button>
        <Button style={styles.btnBackground} textStyle={styles.btnText} onPress={this.doReadBT.bind(this)}>Read</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  btnBackground: {
    borderColor: '#2980b9',
    backgroundColor: '#3498db',
    margin: 10,      
  },
  
  btnText: {
    fontSize: 18,        
    color: 'white',  
  }
  
});

module.exports = TestScreen;

