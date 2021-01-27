import './Map.css'
import { useEffect, useState } from 'react';

const Map = () => {
    const authOptions = {
        authType: "subscriptionKey",
        subscriptionKey: "Jm-j7idzXmYLzFd4KiIKtbSdh_DYyltrZgKxj497n6c"
    }
    var subscriptionKeyCredential = new window.atlas.service.SubscriptionKeyCredential(window.atlas.getSubscriptionKey());
    var pipeline = window.atlas.service.MapsURL.newPipeline(subscriptionKeyCredential);
    var searchURL = new window.atlas.service.SearchURL(pipeline);

    const [gardens, setGardens] = useState([]);
    const [positions, setPositions] = useState({});
    const atlantaBBox = [-84.41531, 33.66927, -84.37179, 33.85259];

    useEffect(() => {
        function getMap() {
            var map = new window.atlas.Map("map", {
                authOptions: authOptions
            });
            map.setCamera({
                bounds: atlantaBBox,
                zoom: 40
            });
            map.events.add('ready', async function () {
                var datasource = new window.atlas.source.DataSource();
                map.sources.add(datasource);
                var resultLayer = new window.atlas.layer.SymbolLayer(datasource, null, {
                    iconOptions: {
                        image: 'pin-round-darkblue',
                        anchor: 'center',
                        allowOverlap: true
                    },
                    textOptions: {
                        anchor: "top"
                    }
                });
                map.layers.add(resultLayer);
                var newPositions = positions;
                for (var gardenName in gardens) {
                    var gardenData = gardens[gardenName];
                    var query = gardenData["ADDRESS"];

                    try {
                        var results = await searchURL.searchAddress(window.atlas.service.Aborter.timeout(10000), query, {
                            limit: 1
                        })
                        var data = results.geojson.getFeatures();
                        datasource.add(data);
                        if (data["features"]) {
                            newPositions[data["features"][0]["geometry"]["coordinates"]] = gardenName;
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
                setPositions(newPositions)
                var popup = new window.atlas.Popup();
                map.events.add('mouseover', resultLayer, function (e) {
                    var position = e.shapes[0].getCoordinates();
        
                    var html = `
                        <div style="padding:5px">
                            <div>${positions[position]}</div>
                        </div>`;
        
                    popup.setPopupOptions({
                        content: html,
                        position: position
                    });
        
                    popup.open(map);
                });
                map.events.add('click', resultLayer, function (e) {
                    console.log("clicked");
                });
            });
        }
    
        const getGardens = async () => {
            try {
                let response = await fetch("api/garden-get");
                let json = await response.json();
                setGardens(json);
            } catch (err) {
                console.log(err);
            }
        }
        getMap();
        getGardens();
    }, [])

    return (
        <div id="map">

        </div>
    );
}

export default Map;