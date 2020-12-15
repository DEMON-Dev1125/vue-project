
const maps = {
    clickable: () => {

        let map;
        let markers = [];

        function initMap() {
            const haightAshbury = { lat: 37.769, lng: -122.446 };
            map = new google.maps.Map(document.getElementById("map"), {
                zoom: 12,
                center: haightAshbury,
                mapTypeId: "terrain",
            });
            // This event listener will call addMarker() when the map is clicked.
            map.addListener("click", (event) => {
                addMarker(event.latLng);
            });
            // Adds a marker at the center of the map.
            addMarker(haightAshbury);
        }

        // Adds a marker to the map and push to the array.
        function addMarker(location) {
            const marker = new google.maps.Marker({
                position: location,
                map: map,
            });
            markers.push(marker);
        }

        // Sets the map on all markers in the array.
        function setMapOnAll(map) {
            for (let i = 0; i < markers.length; i++) {
                markers[i].setMap(map);
            }
        }

        // Removes the markers from the map, but keeps them in the array.
        function clearMarkers() {
            setMapOnAll(null);
        }

        // Shows any markers currently in the array.
        function showMarkers() {
            setMapOnAll(map);
        }

        // Deletes all markers in the array by removing references to them.
        function deleteMarkers() {
            clearMarkers();
            markers = [];
        }
        return (
            <>
                <div id="floating-panel">
                    <input onclick="clearMarkers();" type="button" value="Hide Markers" />
                    <input onclick="showMarkers();" type="button" value="Show All Markers" />
                    <input onclick="deleteMarkers();" type="button" value="Delete Markers" />
                </div>
                <div id="map"></div>
            </>
        );
    }
}