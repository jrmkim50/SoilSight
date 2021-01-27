import './Map.css'
import { useEffect, useState } from 'react';

const Map = () => {
    const authOptions = {
        authType: "subscriptionKey",
        subscriptionKey: "Jm-j7idzXmYLzFd4KiIKtbSdh_DYyltrZgKxj497n6c"
    }
    var subscriptionKeyCredential = new window.atlas.service.SubscriptionKeyCredential("Jm-j7idzXmYLzFd4KiIKtbSdh_DYyltrZgKxj497n6c");
    var pipeline = window.atlas.service.MapsURL.newPipeline(subscriptionKeyCredential);
    var searchURL = new window.atlas.service.SearchURL(pipeline);

    const [gardens, setGardens] = useState([]);
    const [positions, setPositions] = useState({});
    const [currentGarden, setCurrentGarden] = useState(null);
    const atlantaBBox = [-84.41531, 33.66927, -84.37179, 33.85259];

    useEffect(() => {
        function getMap(tempGardens) {
            if (gardens.length !== 0) {
                tempGardens = gardens;
            }
            var map = new window.atlas.Map("map", {
                authOptions: authOptions
            });
            map.setCamera({
                bounds: atlantaBBox,
                zoom: 40
            });
            var datasource = new window.atlas.source.DataSource();
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
            var popup = new window.atlas.Popup();
            map.events.add('ready', async function () {
                console.log('1');
                map.sources.add(datasource);
                map.layers.add(resultLayer);
                var newPositions = positions;
                console.log('2');
                for (var gardenName in tempGardens) {
                    var gardenData = tempGardens[gardenName];
                    console.log('3');
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
                setPositions(newPositions);
                map.events.add('click', resultLayer, function (e) {
                    if (e.shapes && e.shapes.length > 0) {
                        var content, coordinate;
                        coordinate = e.shapes[0].data.geometry.coordinates;
                        content = `<div class="azurePopup">
                                        <div>${positions[coordinate]}</div>
                                   </div>`;
                        if (content && coordinate) {
                            popup.setOptions({
                                content: content,
                                position: coordinate
                            });
                            popup.open(map);
                            setCurrentGarden(tempGardens[positions[coordinate]]);
                            console.log(tempGardens[positions[coordinate]])
                        }
                    }
                });
            })
        }
    
        const getGardens = async (result) => {
            try {
                let response = await fetch("api/garden-get");
                let json = await response.json();
                setGardens(json);
                result(json);
            } catch (err) {
                console.log(err);
            }
        }

        getGardens(getMap);
    }, [])

    return (
        <div>
            <div id="map">

            </div>
            <div className="gardenInfo">
                <h4>Garden Name</h4>
                <p>{(currentGarden) ? currentGarden.Name : ""}</p>
                <h4>Garden Address</h4>
                <p>{(currentGarden) ? currentGarden.ADDRESS : ""}</p>
                {(currentGarden) ? (<img src={currentGarden.IMAGE_ID} alt="garden image"/>) : ""}
            </div>
        </div>
    );
}

export default Map;