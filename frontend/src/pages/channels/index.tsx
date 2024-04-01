import { API_URL } from "@/shared/lib/constants";
import { useState } from "react";
import { User } from "@/shared/lib/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Channels = () => {
  const options = {
    method: 'GET',
    headers: {
      token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyMzUwMzg4LCJpYXQiOjE3MTE5MTgzODgsImp0aSI6IjI1YzFjYmQ4YjQzMDQwYjk4YmUxZWJlZDczYjEzOWY0IiwidXNlcl9pZCI6MX0.Dzin-obC7zu0GFTZoyXb1R-l6aPBz43Rb7YchCBwA78"
    },
  };
  const [channels, setChannels] = useState()
  useEffect(() => {
    (async () => {
      const res = await fetch(API_URL + "/workspace/1/channels", options);
      setChannels((await res.json()));
      console.log(channels)
    })();
  }, []);
  
  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="w-full p-4 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-semibold">Ваши каналы</h1>
          <h2 className="text-l text-gray-500">
            Здесь будут отображаться каналы текущего рабочего пространства
          </h2>
        </div>
        
      </div>
      
    </div>
  );
};
