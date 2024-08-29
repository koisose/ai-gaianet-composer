"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { postComposerCreateCastActionMessage } from "frog/next";
import type { NextPage } from "next";
import { generateRoastOrPraise, getParseString, getUserByFid, savedata } from "~~/lib/gaianet";
import "~~/styles/hide.css";
import { notification } from "~~/utils/scaffold-eth";
import { Input } from "~~/components/ui/input"
import ShimmerButton from "~~/components/magicui/shimmer-button";
import { Loader2 } from "lucide-react"
const Home: NextPage = () => {
  const searchParams = useSearchParams();
  const inputRef = useRef(null);
  const fid = searchParams.get("fid");
  const originalText = searchParams.get("originalText");
  const { data: creator, isLoading } = useQuery({
    queryKey: ["user", fid],
    queryFn: () => getUserByFid(fid),
  });
  const { data: parsedString, isLoading: loadingParsed } = useQuery({
    queryKey: ["parseString", originalText],
    queryFn: () => getParseString(originalText),
  });
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [user, setUsername] = useState(
    parsedString?.mentionsUsername.length > 0 ? parsedString.mentionsUsername[0] : "",
  );
  if (isLoading || loadingParsed) return <div>Loading...</div>;

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-4xl font-bold ">Roast or Praise Farcaster user</h1>
        <p className="mt-4 text-lg ">Input farcaster username</p>
      </div>
      <div className="flex flex-col items-center justify-center ">
        <Input ref={inputRef}
          disabled={loading}
          type="text"
          value={parsedString?.mentionsUsername.length > 0 ? parsedString.mentionsUsername[0] : "" || (user as any)}
          onChange={e => setUsername(e.target.value)}
          className="border border-gray-400 mx-4 py-2 rounded-md w-[500px]" placeholder="farcaster username" />

        <div className="mt-4 flex space-x-4">
          <ShimmerButton
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              setGenerated("");
              try {
                setType("roast");
                //@ts-ignore
                const text = await generateRoastOrPraise(inputRef?.current?.value || (user as string), "roast");
                setGenerated(text.choices[0].message.content);
              } catch (e) {
                //@ts-ignore
                setLoading(false);
                notification.error("Sorry there is error on our end please roast again");
              }
              setLoading(false);
            }}
          className="shadow-2xl" background="blue">
            <span className="whitespace-pre-wrap  text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
            {loading?<Loader2 className="mr-2 h-4 w-4 animate-spin" />:"Roast"}
            </span>
          </ShimmerButton>
          <ShimmerButton 
             onClick={async () => {
              setLoading(true);
              setGenerated("");
              setType("praise");
              try {
                //@ts-ignore
                const text = await generateRoastOrPraise(inputRef?.current?.value || (user as string), "praise");
                setGenerated(text.choices[0].message.content);
              } catch (e) {
                setLoading(false);

                notification.error("Sorry there is error on our end please praise again");
              }
              setLoading(false);
            }}
            disabled={loading}
          className="shadow-2xl" background="green">
            <span className="whitespace-pre-wrap  text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              {loading?<Loader2 className="mr-2 h-4 w-4 animate-spin" />:"Praise"}
            </span>
          </ShimmerButton>
        
        </div>
      </div>
      {generated.length > 0 && (
        <>
          <div className="mt-8 w-[10em]] mx-10 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-center text-center ">
              <p className="text-black">{generated}</p>
            </div>
          </div>
          <div className="flex justify-center my-5">
            <ShimmerButton 
              onClick={async () => {
                setLoading(true);
                const url = process.env.NEXT_PUBLIC_URL;
                //@ts-ignore
                savedata(inputRef?.current?.value || (user as string), creator.users[0].username, type, generated)
                  .then(data => {
                    postComposerCreateCastActionMessage({
                      text: `${originalText} ${url}/api/roastorpraise/${data.id}` as string,
                      embeds: [`${url}/api/roastorpraise/${data.id}`],
                    });
                    setLoading(false);
                  })
                  .catch(e => {
                    console.log(e.message);
                    setLoading(false);
                    notification.error("sorry there is an error in our end please try again");
                  });
              }}
              background="purple"
            >
              {loading?<Loader2 className="mr-2 h-4 w-4 animate-spin" />:"Share"}
            </ShimmerButton >
          </div>
        </>
      )}
    </>
  );
};

export default Home;
