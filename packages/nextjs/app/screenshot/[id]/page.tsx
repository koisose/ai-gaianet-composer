'use client'
import useSWR from 'swr'
//@ts-ignore
import React from "react";
import '~~/styles/hide.css'
const TwitterCard = ({text,type,username}) => {
  return (
    <div className="relative flex h-full w-full max-w-[32rem] flex-col gap-2 overflow-hidden rounded-lg border p-4 backdrop-blur-md shadow-2xl">
      <div className="flex flex-row justify-between tracking-tight">
        <div className="flex items-center space-x-2">
         
          <div>
            
            <div className="flex items-center space-x-1">
              
               {type} of @{username}
             
            </div>
          </div>
        </div>
     
      </div>
      <div className="break-words leading-normal tracking-tighter">
        <span className="text-sm font-normal">
          {text}
        </span>
       
      </div>
      <div className="flex flex-1 items-center justify-center"></div>
    </div>
  );
};

const fetcher = (url) => fetch(url).then((res) => res.json());
export default function Home({params}:any) {
  const id=params.id
  const { data,isLoading } = useSWR('/api/get/'+id, fetcher,{refreshInterval:10000});
  return (
   <div className="flex items-center justify-center h-screen">
    <div className="flex flex-col items-center justify-center">
      {/* {JSON.stringify(data)} */}
      {!isLoading && <TwitterCard text={data.message} type={data.type} username={data.username} />}
    </div>
   </div>

  );
}
