import React from "react";
import { ShipmentDetailType, ShipmentType } from "../types";
import MapComponent from "./MapComponent";
import ChartComponent from "./ChartComponent";
import { formatDate } from "../utils/formatDate";

interface ShipmentDetailsModalProps {
    shipment: ShipmentType;
    details?: ShipmentDetailType | null | undefined;
    onClose: () => void;
}

const ShipmentDetailsModal: React.FC<ShipmentDetailsModalProps> = ({
    shipment,
    details,
    onClose,
}) => {
    const isInProgress: boolean = shipment.status === "IN PROGRESS";

    const getTemperatureDomain = (): [number, number] => {
        if (details?.temperature) {
        const values = details.temperature
            .map((item: { t: number; v: number | null }) => item.v)
            .filter((value): value is number => value !== null);

        if (values.length > 0) {
            const maxTemp = Math.max(...values);
            const minTemp = Math.min(...values);
            return [minTemp - 1, maxTemp + 1];
        }
        }
        return [0, 40];
    };

    const getHumidityDomain = (): [number, number] => {
        if (details?.humidity) {
        const values = details.humidity
            .map((item: { t: number; v: number | null }) => item.v)
            .filter((value): value is number => value !== null);

        if (values.length > 0) {
            const maxHumidity = Math.max(...values);
            const minHumidity = Math.min(...values);
            return [minHumidity - 5, maxHumidity + 5]; 
        }
        }
        return [0, 100];
    };

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div
            className={`bg-white p-6 rounded-lg shadow-lg overflow-auto transition-all ${
            isInProgress ? "w-[80%] h-[80%]" : "w-[30%] h-[auto]"
            }`}
        >
            <h2 className="text-2xl font-bold mb-4">Shipment Details</h2>

            <div className="mb-6">
            <p>
                <strong>Shipment ID:</strong> {shipment.shipmentId}
            </p>
            <p>
                <strong>Reference Name:</strong> {shipment.referenceName}
            </p>
            <p>
                <strong>Status:</strong> {shipment.status}
            </p>
            <p>
                <strong>Departure:</strong> {shipment.departureName}
            </p>
            <p>
                <strong>Departure Date:</strong>{" "}
                {formatDate(new Date(shipment.plannedDeparture).getTime())}
            </p>
            <p>
                <strong>Planned Destination:</strong>{" "}
                {formatDate(new Date(shipment.plannedDestination).getTime())}
            </p>
            </div>

            {isInProgress && details ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col border p-4 rounded-lg shadow-md h-full">
                <h3 className="text-xl font-semibold mb-2">Geolocation</h3>
                <div className="w-full h-full max-h-[80vh] border bg-gray-200 overflow-hidden">
                    <MapComponent details={details} shipment={shipment} />
                </div>
                </div>

                <div className="flex flex-col gap-6 w-full h-full">
                <ChartComponent
                    title="Temperature Chart"
                    data={details.temperature}
                    getDomain={getTemperatureDomain}
                />

                <ChartComponent
                    title="Humidity Chart"
                    data={details.humidity}
                    getDomain={getHumidityDomain}
                />
                </div>
            </div>
            ) : (
            <div className="mb-6 text-gray-500">
                <p>
                <strong>
                    No further details available for this shipment as it is not in
                    progress.
                </strong>
                </p>
            </div>
            )}

            <div className="flex justify-end mt-4">
            <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
                Close
            </button>
            </div>
        </div>
    </div>
    );
};

export default ShipmentDetailsModal;
