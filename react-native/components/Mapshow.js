import React from 'react';
import {  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions, } from 'react-native';
import { StackNavigator } from 'react-navigation';
import MapViewDirections from 'react-native-maps-directions'
import MapView  from 'react-native-maps';
import Button from './Button';
import axios from 'axios';
import Card from './Card';
import CardSection from './CardSection'
import Panel from './Panel';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 23.0082;
const LONGITUDE = 72.9784;
const LATITUDE_DELTA = 20;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyCcd_KFCyDz_570_OSqwjmLm8Z6fE1rQf4';

class Mapshow extends React.Component {

  state = { routes: [] };

  static navigationOptions = ({ navigation }) => ({
      title: `Enjoy your Journey`,

    });

  constructor(props) {
   super(props)
   this.state = {
     srcLoc: {
         latitude: this.props.navigation.state.params.srcLat,
         longitude: this.props.navigation.state.params.srcLong,
       },
       destLoc: {
         latitude: 23.565,
         longitude: 72.984,
       }
   };
   console.log(this.props.navigation.state.params);
 }



componentWillMount() {
  this.setState({
    srcLoc: {
        latitude: this.props.navigation.state.params.srcLat,
        longitude: this.props.navigation.state.params.srcLong,
      },
      destLoc: {
        latitude: this.props.navigation.state.params.destLat,
        longitude: this.props.navigation.state.params.destLong,
      },
      routes : []
  });

  this.renderRoutes = function renderRoutes() {
        return this.state.routes.map(route =>
          <Route key={'toRoute'} route={route} />);
    }

    this.renderDistance = function renderDistance() {
      return this.state.routes.map(distance =>
        <Distance key={'toDistance'} distance={distance} />);
    }


  axios.get(`https://api.airdrop46.hasura-app.io/${this.props.navigation.state.params.srcLong}/${this.props.navigation.state.params.srcLat}/${this.props.navigation.state.params.destLong}/${this.props.navigation.state.params.destLat}`)
       .then(response => this.setState({ routes: response.data.routes }));
  console.log(this.state);
}





  render() {
 console.log(this.state,'test');
 console.log(this.state.routes.distance);
    const {state} = this.props.navigation;
    const cord = {
      latitude: state.params.srcLat,
      longitude:state.params.srcLong,
    }

    return (
      <View style={styles.viewStyle}>
        <View style={styles.map}>
      <MapView
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          zoomLevel={200}
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={StyleSheet.absoluteFill}>
          <MapView.Marker coordinate={this.state.srcLoc} />
           <MapView.Marker coordinate={this.state.destLoc} />
    <MapViewDirections
      origin={this.state.srcLoc}
      destination={this.state.destLoc}
      strokeColor="hotpink"
      strokeWidth={4}
      apikey={GOOGLE_MAPS_APIKEY}/>
        </MapView>
        </View >
        <View>{this.renderDistance()}</View>
        <Text>Directions </Text>

          <ScrollView >
            {this.renderRoutes()}
            </ScrollView>
        </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  map: {
   width: Dimensions.get('window').width,
   height: Dimensions.get('window').height/2
 },
 layout: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
 viewStyle: {
   justifyContent: 'space-between',
   flexDirection: 'column',
   flex: 1,
   alignItems: 'center',
   margin: 2,
   padding: 2
 }
});

class Distance extends React.Component {

constructor(props){
  super(props)
    this.state= this.props;

}

render() {
  return (
    <Card >
      <CardSection>
          <Text> The Distance is {this.state.distance.distance} metres</Text>
          </CardSection>
          </Card>
  );
}
}

class Route extends React.Component {

constructor(props){
  super(props)
    this.state= this.props;

}
componentWillMount(){
  this.renderLegs = function(){
    return this.state.route.legs.map(leg =>
      <Legs key={'toLeg'} leg={leg} />);
  }
}
render() {
  return (
    this.renderLegs()
  );
}
}


class Legs extends React.Component {

constructor(props){
  super(props)
    this.state= this.props;

}
componentWillMount(){
  this.renderSteps = function(){
    return this.state.leg.steps.map(step =>
      <Step key={'toStep'} step={step} />);
  }
}
render() {
  return (
    this.renderSteps()
  );
}
}

class Step extends React.Component {

constructor(props){
  super(props)
    this.state= this.props;

}
// componentWillMount(){
//   this.renderManeuver = function(){
//     return this.state.step.maneuver.map(maneuver =>
//       <Manuever maneuver={maneuver} />);
//   }
// }
render() {
  return (

    <Card >
      <CardSection>
          <Text>{this.state.step.maneuver.instruction}</Text>
          </CardSection>
          <CardSection style={{backgroundColor: 'whitesmoke'}}>
            <Text> and continue for {this.state.step.duration} metres</Text>
            </CardSection>
          </Card>
);
}
}


export default Mapshow;
