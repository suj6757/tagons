import React from "react";
import {
  LineChart,
  Line,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "1", Total: 300, Coupang: 456, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "2", Total: -145, Coupang: 230, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "3", Total: -100, Coupang: 345, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "4", Total: -8, Coupang: 450, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "5", Total: 100, Coupang: 321, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "6", Total: 9, Coupang: 235, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "7", Total: 53, Coupang: 267, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "8", Total: 252, Coupang: -378, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "9", Total: 79, Coupang: -210, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "10", Total: 294, Coupang: -23, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "12", Total: 43, Coupang: 45, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "13", Total: -74, Coupang: 90, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "14", Total: -71, Coupang: 130, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "15", Total: -117, Coupang: 11, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "16", Total: -186, Coupang: 107, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "17", Total: -16, Coupang: 926, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "18", Total: -125, Coupang: 653, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "19", Total: 222, Coupang: 366, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "20", Total: 372, Coupang: 486, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "21", Total: 182, Coupang: 512, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "22", Total: 164, Coupang: 302, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "23", Total: 316, Coupang: 425, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "24", Total: 131, Coupang: 467, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "25", Total: 291, Coupang: -190, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "26", Total: -47, Coupang: 194, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "27", Total: -415, Coupang: 371, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "28", Total: -182, Coupang: 376, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "29", Total: -93, Coupang: 295, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "30", Total: -99, Coupang: 322, '11st': 135, 'G-market': 205, Acuction: 369 },
  { name: "31", Total: -52, Coupang: 246, '11st': 135, 'G-market': 205, Acuction: 369 },
];

export default function BrushChartTest2() {

  return (
    <ResponsiveContainer width="100%" height={500} className='mt-5'>
      <LineChart
        data={data}
        margin={{
          top: 60,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tickLine={false} axisLine={false} />
        <YAxis tickLine={false} axisLine={false} />
        <Tooltip />
        <Legend align="center" verticalAlign="top" height={30} className='brushchartlegend' />
        <ReferenceLine y={0} stroke="#000" />
        <Brush dataKey="name" y={30} height={40} stroke="#8884d8" />
        <Line
          type="monotone"
          dataKey="Total"
          stroke="#4774c5"
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="Coupang"
          stroke="#3a3b3b"
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="11st"
          stroke="#a1a1a1"
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="G-market"
          stroke="#ffc104"
          activeDot={{ r: 5 }}
        />
        <Line
          type="monotone"
          dataKey="Acuction"
          stroke="#5597d3"
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
