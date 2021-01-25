import { AzureMap, AzureMapsProvider } from 'react-azure-maps';
import {AuthenticationType} from 'azure-maps-control';
import './Map.css'

const Map = () => {
    
    const option = {
        authOptions: {
            authType: AuthenticationType.subscriptionKey,
            subscriptionKey: "Jm-j7idzXmYLzFd4KiIKtbSdh_DYyltrZgKxj497n6c"
        }
    }

    return (
        <div className = "Map">
            <AzureMapsProvider>
                <div className = "MapView">
                    <AzureMap options={option} />
                </div>
            </AzureMapsProvider>
        </div>
    );
}

export default Map;