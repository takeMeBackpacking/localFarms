import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      markers: []
    };
  }
    
  componentDidMount() {
    fetch('https://api.airtable.com/v0/appYtlXipFSJvsgwG/VENDORS?api_key=keyT2A9MZe2xbjLUW')
    .then((resp) => resp.json())

    .then(data => {
       this.setState({ restaurants: data.records });
       
    }).catch(err => {
      // Error :(
    });
  }

    
  render() {
    return (
      <div className="container mt-5">
        <div className="row">
             <table id="restaurantsTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Website</th>
                  <th>Curbside</th>
                  <th>Delivery</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {this.state.restaurants.map(restaurant => <TableRow {...restaurant.fields} /> )}
              </tbody>
            </table>       
        </div>
        
        <div className="row">
          <LeafletMap
            center={[38.603786, -121.474507]}
            zoom={12}
            maxZoom={10}
            attributionControl={true}
            zoomControl={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
          >
            <TileLayer
              url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
            />
            {this.state.restaurants.map(restaurant => <MarkerElement {...restaurant.fields} /> )}
          </LeafletMap>
        </div>
      </div>
    );
  }
}

export default App;

const TableRow =  ({ Name, Email, Website, Curbside, Delivery, Type, lon, lat }) => (
  <tr>
    <td>{Name}</td>
    <td>{Email}</td>
    <td>{Website}</td>
    <td>{Curbside}</td>
    <td>{Delivery}</td>
    <td>{Type}</td>
  </tr>
);

const MarkerElement = ({ Name, Email, Website, Curbside, Delivery, Type, lon, lat }) => (
    <Marker           
        position={{lat:lat, lng: lon}}>
        <Popup>
            <span>{Name}</span>
        </Popup>
    </Marker>
);