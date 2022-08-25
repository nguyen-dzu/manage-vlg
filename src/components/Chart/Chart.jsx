import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import apiService from "../../api/apiService";
import "./Chart.scss";



export default function Chart({aspect, data}) {
  return (
    <div className="chart">
      <div className="title">Thống Kê 6 Tháng Gần Nhất</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          width={730}
          height={250}
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#599e94" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#599e94" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="monthVN" stroke="gray" />
          <CartesianGrid strokeDasharray="3 3" style={{
             stroke: "rgb(228, 225, 225)",
          }}/>
          <Tooltip />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#599e94"
            fillOpacity={1}
            fill="url(#revenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
