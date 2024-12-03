import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface ChartComponentProps {
    title: string;
    data: { t: number; v: number | null }[];
    getDomain: () => [number, number];
}

const ChartComponent: React.FC<ChartComponentProps> = ({
    title,
    data,
    getDomain,
    }) => {
    const formatTime = (timestamp: number) => {
        return new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        }).format(new Date(timestamp));
    };

    const lineColor = title === "Temperature Chart" ? "#ff7300" : "#00c49f";
    const lineStrokeWidth = 3;

    return (
    <div className="flex flex-col border p-4 rounded-lg shadow-lg flex-grow">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
        <div className="flex-grow">
            <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                dataKey="t"
                tickFormatter={formatTime}
                axisLine={false} 
                tick={{ fontSize: 12, fill: "#666" }}
                dy={10}
                />
                <YAxis
                domain={getDomain()}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#666" }}
                tickCount={5}
                width={50}
                />
                <Tooltip
                contentStyle={{ backgroundColor: "#fff", borderRadius: "5px" }}
                itemStyle={{ color: "#000" }}
                />
                <Legend />
                <Line
                type="monotone"
                dataKey="v"
                stroke={lineColor}
                strokeWidth={lineStrokeWidth}
                dot={{ r: 4 }}
                activeDot={{
                    r: 6,
                    strokeWidth: 2,
                    stroke: "#fff",
                    fill: lineColor,
                }}
                />
            </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
    );
};

export default ChartComponent;
