import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      markers: []
    };
  }
    
  componentDidMount() {
    fetch('https://api.airtable.com/v0/appXXMCwAfxx7g9sl/VENDORS?api_key=keyT2A9MZe2xbjLUW') 
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
             <Table id="restaurantsTable">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Email</Th>
                  <Th>Website</Th>
                  <Th>Curbside</Th>
                  <Th>Delivery</Th>
                  <Th>Type</Th>
                </Tr>
              </Thead>
              <Tbody>
                {this.state.restaurants.map(restaurant => <TableRow {...restaurant.fields} /> )}
              </Tbody>
            </Table>       
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
  <Tr>
    <Td>{Name}</Td>
    <Td>{Email}</Td>
    <Td>{Website}</Td>
    <Td>{Curbside}</Td>
    <Td>{Delivery}</Td>
    <Td>{Type}</Td>
  </Tr>
);

const MarkerElement = ({ Name, Email, Website, Curbside, Delivery, Type, lon, lat }) => {
  if (!lon || !lat) { // evaluates to true if currentVideo is null
    return ""; 
  }
  return (
    <Marker           
        position={{lat:lat, lng: lon}}>
        <Popup>
            <span>{Name}</span>
        </Popup>
    </Marker>
  );

};