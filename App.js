import React, { PureComponent } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';
import axios from 'axios'
export default class App extends PureComponent {

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          captureAudio = {false}
          type={RNCamera.Constants.Type.back}
          barCodeTypes ={[RNCamera.Constants.BarCodeType.qr]}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          googleVisionBarcodeType= {RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE}
          googleVisionBarcodeMode= {RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeMode.ALTERNATE}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }





takePicture = async () => {

  if (this.camera) {
    const options = { quality: 0.5, base64: true };
    const dataObj = await this.camera.takePictureAsync(options);
    console.log(dataObj.uri,dataObj.type,dataObj.rawdata,dataObj.data ); //rawdata=dataencoded and data = textual representation of QR
    
    try{
      const res = await axios.post('https://us-central1-smart-parking-86a30.cloudfunctions.net/handleGates', {
      slotId: 'OGXFn9rNUwx3nKnpQnr4',
      locationId: 'GlavFx89ZZWG1YG42ciO', 
      ticket: '27e0f03c-db00-4f20-9883-e6557613041e'
    })
    console.log('This is the gate status\n----------------------\n'+res.data)
    }
    
    catch(err) {
      console.log('Error bolray yash\n----------------------\n'+err.message)
    }  
  }
  }
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: 'black',
},
preview: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
},
capture: {
  flex: 0,
  backgroundColor: '#fff',
  borderRadius: 5,
  padding: 15,
  paddingHorizontal: 20,
  alignSelf: 'center',
  margin: 20,
},
});
 
