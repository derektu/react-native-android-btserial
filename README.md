# Bluetooth module for react-native android
[![npm](https://img.shields.io/npm/dm/localeval.svg)](derektu/react-native-android-btserial)

A react native android module for serial IO over bluetooth device. Remember to test in a real device because android emulator doesn't support bluetooth

The source code is largely from [BluetoothSerial cordova plugin](https://github.com/don/BluetoothSerial).
However only part of the source code is ported due to time constraint.

Example code [here](https://github.com/Yhozen/RN-BTExample)

Use react native >= 0.47.0 

## Install via [npm](https://npmjs.com)

```sh
$ npm install -S react-native-android-btserial
```
IMPORTANT at this moment you will need to run the next command instead
```sh
$ npm install -S yhozen/react-native-android-btserial
```
 
## Link libraries
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


* MainApplication.java (android/app/src/main/java/com/[appname])

```java
import com.derektu.btserial.BTSerialPackage;    // <--- import

public class MainApplication extends Application implements ReactApplication {

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

## Usage

```js
import BTSerial  from 'react-native-android-btserial'
```
or

```js
const BTSerial  = require('react-native-android-btserial')
```


## API

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

    BTSerial.isEnabled(function (err, enabled) {
        // enabled is true/false
    })

## enableBT

Enable Bluetooth. If Bluetooth is not enabled, will request user to enable BT

    BTSerial.enableBT(function (err, enabled) {
      // enabled is true/false
    })

## showBTSettings

Display System Bluebooth settings screen.

    BTSerial.showBTSettings()

## listDevices

List paired devices. devices is an array of {id:.., address:.., name:..}

    BTSerial.listDevices(function(err, devices) {
        // callback
    })

## connect

Connect to a paired device. If device is connected, status is true, and deviceName is the
name of remote device. Otherwise status is false.

    BTSerial.connect(address, function (err, status, deviceName) {
        // callback
    })

## disconnect

Disconnect from connected device.

    BTSerial.disconnect();

## write

Write data to connected devices. If encoding is null or empty, default to utf-8.

    BTSerial.write(string, encoding, function (err) {
        // callback
    })

## available

Check if there is any data received from connected device.

    BTSerial.available(function (err, count) {
        // callback
    })

## read

Read data from connected device. If encoding is null or empty, default to utf-8.
If there is no data, empty string('') will be returned.

    BTSerial.read(encoding, function (err, string) {
        // callback
    })

# setConnectionStatusCallback

Register a callback that will be invoked when remote connection is aborted. When callback 'e' is
{devicename: 'this device'}

    BTSerial.setConnectionStatusCallback(function (e) {
        // callback
    })

# setDataAvailableCallback

Register a callback that will be invoked when receive data from connected device. When callback 'e' is
{available: count}

    BTSerial.setDataAvailableCallback(function (e) {
        // callback
    })
