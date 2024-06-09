import { Button } from './ui/button';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import "leaflet/dist/leaflet.css";


const ViewLocation = ({ parcel }) => {

    const position = [parcel.latitude, parcel.longitude]
    // const position = [23.79637967864563, 90.36189107847785]
    return (
        <>
            <Button onClick={() => document.getElementById(`viewLocation_${parcel._id}`).showModal()}>View Location</Button>
            <dialog id={`viewLocation_${parcel._id}`} className="modal modal-bottom sm:modal-middle">
                <div className="modal-box !max-w-4xl">
                    <MapContainer center={position} zoom={20} style={{ height: '400px', width: '100%', borderRadius: '12px' }} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                        </Marker>
                    </MapContainer>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>

    );
};

export default ViewLocation;