import React from "react";
import { ShipmentType } from "../types";

interface ShipmentsListProps {
    shipments: ShipmentType[];
    onSelectShipment: (shipmentId: string) => void;
}

const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
    };
    return new Date(date).toLocaleString("en-US", options);
};

const getStatusColor = (status: string) => {
    if (status === "IN PROGRESS") {
        return "bg-green-500 text-white";
    } else if (status === "DRAFT") {
        return "bg-yellow-500 text-white";
    }
    return "bg-gray-500 text-white";
};

const ShipmentsList: React.FC<ShipmentsListProps> = ({
    shipments,
    onSelectShipment,
}) => {
    return (
    <div className="overflow-x-auto w-[95%] mx-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white">
            <tr>
                <th className="px-6 py-3 text-left font-semibold text-sm border-b border-gray-300">
                Shipment ID
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm border-b border-gray-300">
                Reference Name
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm border-b border-gray-300">
                Destination
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm border-b border-gray-300">
                Departure
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm border-b border-gray-300">
                Departure Date
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm border-b border-gray-300">
                Planned Destination
                </th>
                <th className="px-6 py-3 text-left font-semibold text-sm border-b border-gray-300">
                Status
                </th>
            </tr>
            </thead>
            <tbody>
            {shipments.length === 0 ? (
                <tr>
                <td
                    colSpan={7}
                    className="text-center px-6 py-4 text-gray-500 border-b border-gray-300"
                >
                    No data available
                </td>
                </tr>
            ) : (
                shipments.map((shipment, index) => (
                <tr
                    key={shipment.shipmentId}
                    onClick={() => onSelectShipment(shipment.shipmentId)}
                    className={`cursor-pointer hover:bg-gray-100 ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                >
                    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-300">
                    {shipment.shipmentId}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-300">
                    {shipment.referenceName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-300">
                    {shipment.destinationName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-300">
                    {shipment.departureName}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-300">
                    {formatDate(shipment.plannedDeparture)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-300">
                    {formatDate(shipment.plannedDestination)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 border-b border-gray-300">
                    <span
                        className={`px-4 py-2 rounded-full ${getStatusColor(
                        shipment.status
                        )}`}
                    >
                        {shipment.status}
                    </span>
                    </td>
                </tr>
                ))
            )}
            </tbody>
        </table>
    </div>
    );
};

export default ShipmentsList;
