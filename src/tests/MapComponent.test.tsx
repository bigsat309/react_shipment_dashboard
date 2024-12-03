import { render, screen } from "@testing-library/react";
import MapComponent from "../components/MapComponent";

const detailsMock = { lat: 40.7128, lng: -74.006 };
const shipmentMock = { departureName: "New York" };

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

describe("MapComponent", () => {
    it("renders map with location data", () => {
        render(<MapComponent details={detailsMock} shipment={shipmentMock} />);

        expect(screen.getByText("Geolocation Map")).toBeInTheDocument();
        expect(screen.getByText("Shipment Location")).toBeInTheDocument();
    });

    it("shows an error message when location data is missing", () => {
        render(<MapComponent details={null} shipment={shipmentMock} />);

        expect(
        screen.getByText("Location data is missing or incorrect.")
        ).toBeInTheDocument();
    });
});
