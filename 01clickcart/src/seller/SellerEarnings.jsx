import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEarningsData } from "../context/seller";
import { useTheme } from "../context/ThemeContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SellerEarnings = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [earnings, setEarnings] = useState(0);
  const [chartView, setChartView] = useState("weekly");
  const [chartData, setChartData] = useState([]);

  const [allData, setAllData] = useState({
    daily: [],
    weekly: [],
    monthly: [],
  });

  useEffect(() => {
    const fetchEarnings = async () => {
      const data = await getEarningsData();
      setEarnings(data.total);
      setAllData({
        daily: data.daily,
        weekly: data.weekly,
        monthly: data.monthly,
      });
      setChartData(data.weekly); // default view
    };

    fetchEarnings();
  }, []);

  const handleViewChange = (e) => {
    const value = e.target.value;
    setChartView(value);
    setChartData(allData[value]);
  };

  const getXAxisKey = () => {
    if (chartView === "daily") return "day";
    if (chartView === "weekly") return "week";
    return "month";
  };

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Seller Earnings</h1>
        <button
          onClick={() => navigate('/seller-dashboard')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go to Dashboard
        </button>
      </div>

      <div className="rounded-xl border bg-white dark:bg-gray-800 p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-2">Total Earnings</h2>
        <p className="text-3xl font-bold text-green-500">
          {earnings.toLocaleString('en-US', {
            style: 'currency',
            currency: 'INR',
          })}
        </p>
      </div>

      <div className="rounded-xl border bg-white dark:bg-gray-800 p-6 shadow-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            Seller Earnings - {chartView.charAt(0).toUpperCase() + chartView.slice(1)}
          </h3>
          <select
            value={chartView}
            onChange={handleViewChange}
            className="border rounded-md px-3 py-1 bg-gray-100 dark:bg-gray-700 dark:text-white"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis
              dataKey={getXAxisKey()}
              stroke={theme === "dark" ? "#ccc" : "#333"}
            />
            <YAxis stroke={theme === "dark" ? "#ccc" : "#333"} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="earnings"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SellerEarnings;
