import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

const CustomLineChart = ({ data, title = "Évolution des montants", color = "#2563eb", showTrend = true }) => {
    // Calcul de la tendance moyenne pour la ligne de référence
    const avgValue = data?.length ? data.reduce((sum, item) => sum + item.totalAmount, 0) / data.length : 0;

    // Formatage personnalisé pour les tooltips
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            const date = new Date(label);

            return (
                <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4 backdrop-blur-sm">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                        {date.toLocaleDateString("de-DE", {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                        {value.toLocaleString("fr-FR", {
                            style: 'currency',
                            currency: 'EUR',
                            minimumFractionDigits: 2
                        })}
                    </p>
                    {showTrend && (
                        <p className="text-xs text-gray-500 mt-1">
                            {value > avgValue ? '↗️ Au-dessus de la moyenne' : '↙️ En-dessous de la moyenne'}
                        </p>
                    )}
                </div>
            );
        }
        return null;
    };

    // Formatage des axes avec gestion d'erreur
    const formatXAxis = (str) => {
        try {
            const date = new Date(str);
            return date.toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short"
            });
        } catch {
            return str;
        }
    };

    const formatYAxis = (value) => {
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(1)}M €`;
        } else if (value >= 1000) {
            return `${(value / 1000).toFixed(0)}k €`;
        }
        return `${value} €`;
    };

    return (
        <div className="bg-white  rounded-xl shadow-sm border border-gray-100 p-6">
            {/* En-tête du graphique */}
            <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Période : {data?.length ? `${data.length} points de données` : 'Aucune donnée'}</span>
                    {data?.length > 0 && (
                        <span className="font-medium">
                            Moyenne : {avgValue.toLocaleString("fr-FR", {
                            style: 'currency',
                            currency: 'EUR',
                            minimumFractionDigits: 2
                        })}
                        </span>
                    )}
                </div>
            </div>

            {/* Graphique principal */}
            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                        {/* Grille avec style moderne */}
                        <CartesianGrid
                            strokeDasharray="2 4"
                            stroke="#f1f5f9"
                            strokeWidth={1}
                        />

                        {/* Axe X avec style amélioré */}
                        <XAxis
                            dataKey="date"
                            tickFormatter={formatXAxis}
                            tick={{ fontSize: 12, fill: '#64748b' }}
                            axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                            tickLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                        />

                        {/* Axe Y avec formatage intelligent */}
                        <YAxis
                            tickFormatter={formatYAxis}
                            tick={{ fontSize: 12, fill: '#64748b' }}
                            axisLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                            tickLine={{ stroke: '#e2e8f0', strokeWidth: 1 }}
                            domain={['dataMin - 100', 'dataMax + 100']}
                        />

                        {/* Ligne de référence pour la moyenne */}
                        {showTrend && data?.length > 0 && (
                            <ReferenceLine
                                y={avgValue}
                                stroke="#94a3b8"
                                strokeDasharray="5 5"
                                strokeWidth={1}
                                label={{
                                    value: "Moyenne",
                                    position: "insideTopRight",
                                    style: { fontSize: 10, fill: '#64748b' }
                                }}
                            />
                        )}

                        {/* Tooltip personnalisé */}
                        <Tooltip content={<CustomTooltip />} />

                        {/* Ligne principale avec animation et style */}
                        <Line
                            type="monotone"
                            dataKey="totalAmount"
                            stroke={color}
                            strokeWidth={3}
                            dot={{
                                fill: color,
                                strokeWidth: 2,
                                stroke: '#ffffff',
                                r: 4
                            }}
                            activeDot={{
                                r: 6,
                                fill: color,
                                stroke: '#ffffff',
                                strokeWidth: 3,
                                shadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                            animationDuration={1000}
                            animationEasing="ease-out"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Légende et informations supplémentaires */}
            <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: color }}></div>
                            <span>Montant total</span>
                        </div>
                        {showTrend && (
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-0.5 bg-gray-400" style={{ borderTop: '1px dashed #94a3b8' }}></div>
                                <span>Moyenne</span>
                            </div>
                        )}
                    </div>
                    <span>Montants en euros (€)</span>
                </div>
            </div>
        </div>
    );
};

export default CustomLineChart;
