global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShipmentDetailsModal from "../components/ShipmentDetailsModal";
import { ShipmentType, ShipmentDetailType } from "../types";

const shipmentMock: ShipmentType = {
    shipmentId: "12345",
    partnerCompanyId: "company-B",
    destinationName: "Los Angels",
    referenceName: "Test Shipment",
    status: "IN PROGRESS",
    departureName: "New York",
    plannedDeparture: "2024-12-01T10:00:00Z",
    plannedDestination: "2024-12-05T15:00:00Z",
};

const detailsMock: ShipmentDetailType = {
    shipmentId: "14213",
    temperature: [
        { t: 1, v: 22 },
        { t: 2, v: 23 },
    ],
    humidity: [
        { t: 1, v: 60 },
        { t: 2, v: 55 },
    ],
    lat: 40.7128,
    lng: -74.006,
};

jest.mock("react-leaflet", () => ({
    MapContainer: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    TileLayer: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    Marker: ({ children }: { children: React.ReactNode }) => (
        <div>{children}</div>
    ),
    Popup: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe("ShipmentDetailsModal", () => {
    it("renders shipment details", () => {
        render(
        <ShipmentDetailsModal
            shipment={shipmentMock}
            details={detailsMock}
            onClose={jest.fn()}
        />
        );

        expect(screen.getByText("Shipment ID:")).toBeInTheDocument();
        expect(screen.getByText(shipmentMock.shipmentId)).toBeInTheDocument();
        expect(screen.getByText("Reference Name:")).toBeInTheDocument();
        expect(screen.getByText(shipmentMock.referenceName)).toBeInTheDocument();
        expect(screen.getByText("Status:")).toBeInTheDocument();
        expect(screen.getByText(shipmentMock.status)).toBeInTheDocument();
    });

    it("conditionally renders details when status is 'IN PROGRESS'", () => {
        render(
        <ShipmentDetailsModal
            shipment={shipmentMock}
            details={detailsMock}
            onClose={jest.fn()}
        />
        );

        expect(screen.getByText("Geolocation")).toBeInTheDocument();
        expect(screen.getByText("Temperature Chart")).toBeInTheDocument();
        expect(screen.getByText("Humidity Chart")).toBeInTheDocument();
    });

    it("renders message when status is not 'IN PROGRESS'", () => {
        const shipmentNotInProgress = { ...shipmentMock, status: "COMPLETED" };

        render(
        <ShipmentDetailsModal
            shipment={shipmentNotInProgress}
            details={null}
            onClose={jest.fn()}
        />
        );

        expect(
        screen.getByText(
            "No further details available for this shipment as it is not in progress."
        )
        ).toBeInTheDocument();
    });

    it("calls onClose when close button is clicked", () => {
        const onCloseMock = jest.fn();
        render(
        <ShipmentDetailsModal
            shipment={shipmentMock}
            details={detailsMock}
            onClose={onCloseMock}
        />
        );

        const closeButton = screen.getByText("Close");
        userEvent.click(closeButton);

        expect(onCloseMock).toHaveBeenCalledTimes(1);
    });
});
