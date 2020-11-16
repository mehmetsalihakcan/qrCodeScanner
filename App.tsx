/**
 * Sample React Native App
 *Mehmet Salih akcan
 */
('use strict');
import React from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Linking,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
const {width} = Dimensions.get('window');
const App = () => {
  const [flashMode, setFlashMode] = React.useState(false);

  React.useEffect(() => {
    //postQrCode();
  }, [flashMode]);
  /*

    const postQrCode = async (strCode: string) => {
      const URL = `Todo/GetByDeviceIDWorkList?deviceID=${strCode}`;
      return axios
        .post(URL)
        .then((res: object) => {
          if (res.status === 200) {
            console.log('Bağlantı başarılı ... status : ' + res.status);
            return res;
          }
        })
        .catch((error: string) => {
          console.log(error);
        });
    };
*/

  const openUrl = (e) => {
    console.log('qr code e valude : ', e);

    if (e.data.substring(0, 4) === 'http') {
      Linking.openURL(e.data).catch((err) =>
        console.error('An error occured', err),
      );
    } else {
      Alert.alert('Okunan Kod', e.data);
    }
  };

  const toggleFlashMode = () => {
    setFlashMode(!flashMode);
    console.log('flashMode : ', flashMode);
    console.log(
      'RNCamera.Constants.FlashMode : ',
      RNCamera.Constants.FlashMode.torch,
    );
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.qrCode}>
            <QRCodeScanner
              containerStyle={{marginTop: 0}}
              onRead={openUrl}
              reactivate={true}
              reactivateTimeout={10}
              showMarker={true}
              flashMode={
                flashMode === true
                  ? RNCamera.Constants.FlashMode.torch
                  : RNCamera.Constants.FlashMode.off
              }
              bottomContent={
                <TouchableOpacity>
                  <Text style={{fontSize: 25, fontWeight: 'bold'}}>
                    Kodu Tarat
                  </Text>
                </TouchableOpacity>
              }
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: 'orange',
                width: width * 0.5,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={toggleFlashMode}>
              <Text style={styles.buttonList}>Flash Aç/Kapa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  qrCode: {
    position: 'relative',
  },
  buttonList: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
});

export default App;
