import { useWorkspaceStore } from "@/entities/workspace";
import useWindowDimensions from "@/shared/lib/window";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export const Analytics = () => {
  const { fetchStats, stats } = useWorkspaceStore();
  const { id } = useParams();
  useEffect(() => {
    fetchStats(id);
    console.log(stats);
  }, []);

  const data = [
    {
      name: "30 03 2024",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "31 03 2024",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "01 04 2024",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "02 04 2024",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "03 04 2024",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "04 04 2024",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "05 04 2024",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  const { height, width } = useWindowDimensions();
  return (<>
    <div className="w-full h-full">
      <div className="w-full flex items-center justify-between p-2 ">
        <div>
          <h1 className="text-4xl font-semibold">Статистика</h1>
          <h2 className="text-l text-gray-500">
            Здесь будет отображаться статистика и аналитика текущего рабочего
            пространства
          </h2>
        </div>
        <div></div>
      </div>
      {/* {stats.map((item) => )} */}
        <LineChart className="w-[cals(100vw - 193px) h-[calc(100vh - 193)]]"
          width={width - 193}
          height={height - 193}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="pv"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
    </div></>
  );
};


