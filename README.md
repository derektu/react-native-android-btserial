# Bluetooth module for react-native android

A react native android module for serial IO over bluetooth device.

The source code is largely from [BluetoothSerial cordova plugin](https://github.com/don/BluetoothSerial).
However only part of the source code is ported due to time constraint.

## Setup

There are sereral steps in the setup process

1. install module
2. update `android/settings.gradle`
3. update `android/app/build.gradle`
4. Register module in MainActivity.java
5. Rebuild and restart package manager


* install module

```bash
 npm i --save react-native-android-btserial
```

* `android/settings.gradle`

```gradle
...
include ':react-native-android-btserial'
project(':react-native-android-btserial').projectDir = new File(settingsDir, '../node_modules/react-native-android-btserial')
```

* `android/app/build.gradle`

```gradle
...
dependencies {
    ...
    compile project(':react-native-android-btserial')
}
```

* register module (in MainActivity.java)

```java
import com.derektu.btserial.BTSerialPackage;    // <--- import

public class MainActivity extends Activity implements DefaultHardwareBackBtnHandler {

    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new BTSerialPackage()       // <----- add package
        );
    }

  ......

}
```
* Run `react-native run-android` from your project root directory

## API

```js
var BTSerial = require('react-native-android-btserial');
```

- [BTSerial.isEnabled](#isEnabled)
- [BTSerial.enableBT](#enableBT)
- [BTSerial.showBTSettings](#showBTSettings)
- [BTSerial.listDevices](#listDevices)
- [BTSerial.connect](#connect)
- [BTSerial.disconnect](#disconnect)
- [BTSerial.write](#write)
- [BTSerial.available](#available)
- [BTSerial.read](#read)
- [BTSerial.setConnectionStatusCallback](#setConnectionStatusCallback)
- [BTSerial.setDataAvailableCallback](#setDataAvailableCallback)


## isEnabled

Check if Bluetooth is enabled.

    BTSerial.isEnabled(function(err, enabled) {
        // enabled is true/false
    });

## enableBT

Enable Bluetooth. If Bluetooth is not enabled, will request user to enable BT

    BTSerial.enableBT(function(err, enabled) {
      // enabled is true/false
    ));

## showBTSettings

Display System Bluebooth settings screen.

    BTSerial.showBTSettings();

## listDevices

List paired devices. devices is an array of {id:.., address:.., name:..}

    BTSerial.listDevices(function(err, devices) {
    })

## connect

Connect to a paired device. If device is connected, status is true, and deviceName is the
name of remote device. Otherwise status is false.

    BTSerial.connect(address, function(err, status, deviceName){
    });

## disconnect

Disconnect from connected device.

    BTSerial.disconnect();

## write

Write data to connected devices. If encoding is null or empty, default to utf-8.

    BTSerial.write(string, encoding, function(err) {
    });

## available

Check if there is any data received from connected device.

    BTSerial.available(function(err, count) {
    });

## read

Read data from connected device. If encoding is null or empty, default to utf-8.
If there is no data, empty string('') will be returned.

    BTSerial.read(encoding, function(err, string) {
    })

# setConnectionStatusCallback

Register a callback that will be invoked when remote connection is aborted. When callback 'e' is
{devicename: 'this device'}

    BTSerial.setConnectionStatusCallback(function(e) {
    })

# setDataAvailableCallback

Register a callback that will be invoked when receive data from connected device. When callback 'e' is
{available: count}

    BTSerial.setDataAvailableCallback(function(e) {
    })
