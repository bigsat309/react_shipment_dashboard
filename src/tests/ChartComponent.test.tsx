global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
};

import { render, screen } from "@testing-library/react";
import ChartComponent from "../components/ChartComponent";

const temperatureMock = [
    { t: 1, v: 22 },
    { t: 2, v: 23 },
];

const humidityMock = [
    { t: 1, v: 60 },
    { t: 2, v: 55 },
];

const getTemperatureDomain = (): [number, number] => [20, 25];
const getHumidityDomain = (): [number, number] => [50, 70];

describe("ChartComponent", () => {
    it("renders temperature chart correctly", () => {
        render(
        <ChartComponent
            title="Temperature Chart"
            data={temperatureMock}
            getDomain={getTemperatureDomain}
        />
        );

        expect(screen.getByText("Temperature Chart")).toBeInTheDocument();
    });

    it("renders humidity chart correctly", () => {
        render(
        <ChartComponent
            title="Humidity Chart"
            data={humidityMock}
            getDomain={getHumidityDomain}
        />
        );

        expect(screen.getByText("Humidity Chart")).toBeInTheDocument();
    });
});
