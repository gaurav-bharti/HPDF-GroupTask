import React from 'react';
import { StyleSheet, Text, View, Button, AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Mapshow from './components/Mapshow';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 23.8152937, lng: 72.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 23.496818, lng: 72.2940881 } }};
const Ahmedabad = { description: 'Ahmedabad', geometry: { location: { lat: 23.022505, lng: 72.57136209999999 } }};
const Delhi = { description: 'Delhi', geometry: { location: { lat: 28.7040592, lng: 77.10249019999992 } }};

class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Let\'s begin your journey!'
  };

  constructor(props) {
    super(props)
    this.state = {
      sourceDetails: {
        srcLat: 0,
        srcLong: 0
      },
      destDetails: {
        destLat: 0,
        destLong: 0
      },
    }
  }


  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
       (position) => {
         console.log("wokeeey");
         console.log(position);
         this.setState({
           latitude: position.coords.latitude,
           longitude: position.coords.longitude,
           error: null,
         });

       },
       (error) => this.setState({ error: error.message }),
       { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
     );


}


  render() {
    const { navigate } = this.props.navigation;
    return  (
        <View style={{ flex: 1}}>
       <GooglePlacesAutocomplete style={{zIndex: 1}}
         placeholder="Source"
         minLength={2} // minimum length of text to search
         autoFocus={false}
         returnKeyType={'default'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
         listViewDisplayed="auto" // true/false/undefined
         fetchDetails={true}
         renderDescription={row => row.description} // custom description render
         onPress={(data, description = null) => {
           // 'details' is provided when fetchDetails = true
           this.setState({
             sourceDetails: {
               srcLat: description.geometry.location.lat,
               srcLong: description.geometry.location.lng
             }
           })
           console.log(data);
           console.log(description);
           console.log(this.state.sourceDetails);
         }}
         getDefaultValue={() => {
           return ''; // text input default value
         }}
         query={{
           // available options: https://developers.google.com/places/web-service/autocomplete
           key: 'AIzaSyC2QhtACfVZ2cr9HVvxQuzxd3HT36NNK3Q',
           language: 'en', // language of the results
           types: '(cities)', // default: 'geocode'
         }}
         styles={{
           description: {
             fontWeight: 'bold',
             alignItems: 'center',

           },
           predefinedPlacesDescription: {
             color: '#1faadb',
             justifyContent: 'center',
             flex: 1,
             alignItems: 'center',

           },
         }}
         // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
         // currentLocationLabel="Current location"
         nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
         GoogleReverseGeocodingQuery={{
           // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
         }}
         GooglePlacesSearchQuery={{
           // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
           rankby: 'distance',
           types: 'food',
         }}
         filterReverseGeocodingByTypes={[
           'locality',
           'administrative_area_level_3',
         ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
         predefinedPlaces={[homePlace, workPlace,Ahmedabad, Delhi]}
         debounce={200}
       />

     <GooglePlacesAutocomplete style={{zIndex: -1}}
         placeholder="Destination"
         minLength={2} // minimum length of text to search
         autoFocus={false}
         returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
         listViewDisplayed="auto" // true/false/undefined
         fetchDetails={true}
         renderDescription={row => row.description} // custom description render
         onPress={(data, description = null) => {
           // 'details' is provided when fetchDetails = true
           this.setState({
             destDetails: {
               destLat: description.geometry.location.lat,
               destLong: description.geometry.location.lng
             }
           })
           console.log(data);
           console.log(description);
           console.log(this.state.destDetails);
         }}
         getDefaultValue={() => {
           return ''; // text input default value
         }}
         query={{
           // available options: https://developers.google.com/places/web-service/autocomplete
           key: 'AIzaSyC2QhtACfVZ2cr9HVvxQuzxd3HT36NNK3Q',
           language: 'en', // language of the results
           types: '(cities)', // default: 'geocode'
         }}
         styles={{
           description: {
             fontWeight: 'bold',
           },
           predefinedPlacesDescription: {
             color: '#1faadb',
             alignItems: 'center'
           },
         }}
         // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
         // currentLocationLabel="Current location"
         nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
         GoogleReverseGeocodingQuery={{
           // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
         }}
         GooglePlacesSearchQuery={{
           // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
           rankby: 'distance',
           types: 'food',
         }}
         filterReverseGeocodingByTypes={[
           'locality',
           'administrative_area_level_3',
         ]} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
         predefinedPlaces={[homePlace, workPlace ,Ahmedabad, Delhi]}
         debounce={200}
       />
          <Button
            onPress={() => navigate('Mapshow', {srcLat:this.state.sourceDetails.srcLat,
              srcLong:this.state.sourceDetails.srcLong,
              destLat: this.state.destDetails.destLat,
              destLong: this.state.destDetails.destLong}) }
            title="GO!!"
          />
      </View>
    );
  }
}

const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Mapshow: { screen: Mapshow },
});

export default class App extends React.Component {
  render() {
    return <SimpleApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});


AppRegistry.registerComponent('hpdfmapapp', () => App);
