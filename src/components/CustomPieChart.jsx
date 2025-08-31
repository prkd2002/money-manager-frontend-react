import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { addThousandsSeperator } from "../utils/utils.js";

const CustomPieChart = ({ data, label, totalAmount, color, showTextAnchor = false }) => {
    // Custom tooltip pour afficher les montants formatés
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
                    <p className="font-medium text-gray-800">{data.payload.name}</p>
                    <p className="text-sm text-gray-600">
                        Montant: <span className="font-semibold">€{addThousandsSeperator(data.value)}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    // Custom label pour afficher les pourcentages sur le graphique
    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        if (!showTextAnchor || percent < 0.05) return null; // Ne pas afficher si moins de 5%

        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                fontSize={12}
                fontWeight="bold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    // Custom legend
    const CustomLegend = ({ payload }) => {
        return (
            <div className="flex justify-center flex-row space-x-2 mt-4">
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="text-sm text-gray-700">
                            {entry.value}: €{addThousandsSeperator(entry.payload.amount)}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="w-full h-80 relative">
            {/* Titre central */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                <p className="text-sm text-gray-600 font-medium">{label}</p>
                <p className="text-2xl font-bold text-gray-800">{totalAmount}</p>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={showTextAnchor ? renderLabel : false}
                        outerRadius={120}
                        innerRadius={60} // Crée un donut chart
                        fill="#8884d8"
                        dataKey="amount"
                        startAngle={90}
                        endAngle={450}
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={color[index % color.length]}
                                stroke={color[index % color.length]}
                                strokeWidth={2}
                            />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        content={<CustomLegend />}
                        verticalAlign="bottom"
                        height={36}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;