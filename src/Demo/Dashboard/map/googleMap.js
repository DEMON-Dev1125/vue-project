import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Map, Marker, GoogleApiWrapper, InfoWindow, Polyline, Polygon } from 'google-maps-react';

import ClickableMap from "./clickablemap";
import Aux from "../../../hoc/_Aux";

const polygon = [
    { lat: 21.2105052, lng: 72.8653491 },
    { lat: 21.2206445, lng: 72.8704506 },
    { lat: 21.2183091, lng: 72.8631228 }
];
// const pathCoordinates = [ 
//     {lat:50, lng:1},
//     {lat:50.1, lng:1.1},
//   ] 

// const path = [
//     {lat: 25.774, lng: -80.190},
//     {lat: 18.466, lng: -66.118},
//     {lat: 32.321, lng: -64.757},
//     {lat: 25.774, lng: -80.190}
//   ];
class GoogleMap extends React.Component {

    state = {
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false,
        position: null,
        path: [{ lat: 25.774, lng: -80.190 }]
    };

    onMarkerClick = (props, marker) =>
        this.setState({
            activeMarker: marker,
            selectedPlace: props,
            showingInfoWindow: true
        });

    onInfoWindowClose = () =>
        this.setState({
            activeMarker: null,
            showingInfoWindow: false
        });

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };

    componentDidMount() {
        this.renderAutoComplete();
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps.map) this.renderAutoComplete();
    }

    onSubmit(e) {
        e.preventDefault();
    }

    renderAutoComplete() {
        const { google, map } = this.props;

        if (!google || !map) return;

        const autocomplete = new google.map.places.Autocomplete(this.autocomplete);
        autocomplete.bindTo('bounds', map);

        autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();

            if (!place.geometry) return;

            if (place.geometry.viewport) map.fitBounds(place.geometry.viewport);
            else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);
            }

            this.setState({ position: place.geometry.location });
        });
    }

    addPoint = (latlng) => {
        const point = {
            lat: latlng.lat(),
            lng: latlng.lng()
        }
        const newPath = [
            ...this.state.path,
            point
        ]
        console.log("ffffffff", newPath);
        this.setState({
            path: newPath
        });
    }
    render() {
        // const { position } = this.state;

        return (
            <Aux>
                <Row>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Polygon</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div style={{ height: '300px', width: '100%' }}>
                                    <Map
                                        centerAroundCurrentLocation
                                        google={this.props.google}
                                        className="map"
                                        zoom={14}>
                                        <Polygon
                                            fillColor="#dc3545"
                                            fillOpacity={0.35}
                                            paths={[polygon]}
                                            strokeColor="#dc3545"
                                            strokeOpacity={0.8}
                                            strokeWeight={2}
                                        />
                                    </Map>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={6}>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h5">Polyline</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div style={{ height: '300px', width: '100%' }}>
                                    <Map google={this.props.google}
                                        style={{ width: '100%', height: '100%', position: 'relative' }}
                                        className={'map'}
                                        onClick={(t, map, e) => this.addPoint(e.latLng)}
                                        zoom={14}
                                    >
                                        <Polyline
                                            path={this.state.path}
                                            strokeColor="#0000FF"
                                            strokeOpacity={0.8}
                                            strokeWeight={2}
                                        />
                                        <Marker
                                            name="Codedthemes"
                                            position={this.state.path[0]}
                                            style={{ width: 10 + "px" }}
                                            icon={{
                                                url: 'https://img.pngio.com/google-map-maker-google-maps-computer-icons-map-marker-google-map-maker-png-728_512.jpg',
                                                size:{
                                                    width: 50,
                                                    height:50
                                                }
                                            }}
                                        />
                                    </Map>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Aux>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCE0nvTeHBsiQIrbpMVTe489_O5mwyqofk'
})(GoogleMap);