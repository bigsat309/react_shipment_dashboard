import { render, screen, fireEvent } from "@testing-library/react";
import ShipmentsList from "../components/ShipmentsList";

const mockShipments = [
    {
        shipmentId: "123",
        referenceName: "Test Shipment",
        destinationName: "New York",
        departureName: "San Francisco",
        plannedDeparture: "2024-12-01T12:00:00Z",
        plannedDestination: "2024-12-02T12:00:00Z",
        status: "IN PROGRESS",
        partnerCompanyId: "company-1", 
    },
    {
        shipmentId: "124",
        referenceName: "Another Shipment",
        destinationName: "Los Angeles",
        departureName: "San Francisco",
        plannedDeparture: "2024-12-05T12:00:00Z",
        plannedDestination: "2024-12-06T12:00:00Z",
        status: "DRAFT",
        partnerCompanyId: "company-2",
    },
];


const mockOnSelectShipment = jest.fn();

describe("ShipmentsList", () => {
    it("renders list of shipments correctly", () => {
        render(
        <ShipmentsList
            shipments={mockShipments}
            onSelectShipment={mockOnSelectShipment}
        />
        );

        expect(screen.getByText("Test Shipment")).toBeInTheDocument();
        expect(screen.getByText("Another Shipment")).toBeInTheDocument();
    });

    it("calls onSelectShipment when a shipment is clicked", () => {
        render(
        <ShipmentsList
            shipments={mockShipments}
            onSelectShipment={mockOnSelectShipment}
        />
        );

        fireEvent.click(screen.getByText("Test Shipment"));
        expect(mockOnSelectShipment).toHaveBeenCalledWith("123");
    });
});
