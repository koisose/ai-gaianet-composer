import type {
  ChatCompletion, // , Result
} from "./type";
import Groq from "groq-sdk";
import ky from "ky";

export async function groqFallback(username: string, roastOrPraise: "roast" | "praise", detail: any) {
  const API_KEY = process.env.GROQ_API_KEY;
  const groq = new Groq({
    apiKey: API_KEY,
  });
  const completion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          roastOrPraise === "roast" ? "you're a roast master" : "You are a helpful, respectful, and honest praiser.",
      },
      {
        role: "user",
        content: `give a short and ${
          roastOrPraise === "roast" ? "harsh roasting" : "glowing praise"
        } for the following social media user: "${username}". Here are the details: ${detail}`,
      },
    ],
    model: "gemma-7b-it",
  });
  // const text = completion.choices[0]?.message?.content;
  return completion;
}

export async function getCastByHash(hash: string): Promise<any> {
  const response = await ky.get(`https://api.neynar.com/v2/farcaster/cast?identifier=${hash}&type=hash`, {
    headers: {
      accept: "application/json",
      api_key: process.env.NEYNAR,
    },
  });

  return response.json();
}
export async function getUserBulk(fids: string): Promise<any> {
  const response = await ky.get(`https://api.neynar.com/v2/farcaster/user/bulk?fids=${fids}`, {
    headers: {
      accept: "application/json",
      api_key: process.env.NEYNAR,
    },
  });

  return response.json();
}

export async function randomNode() {
  const response = await ky.get("https://api.gaianet.ai/api/v1/network/nodes/");
  const data = await response.json();

  const objectArray = (data as any).data.objects.filter(
    (obj: any) => obj.status === "ONLINE" && obj.model_name && obj.model_name.toLowerCase().includes("llama"),
  );
  const random = objectArray[Math.floor(Math.random() * objectArray.length)];
  return random;
}
export async function getAllCast(fid: any) {
  const response = await ky.get(`https://client.warpcast.com/v2/profile-casts?fid=${fid}&limit=5`);
  return response.json();
  // Process the response here
}
async function checkUsername(username: string): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/checkusername`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    throw new Error(`Error checking username: ${response.status}`);
  }

  return await response.json();
}
export async function fallbackGroq(username: string, roast: any, detail: any): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/groqfallback`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, roast, detail }),
  });

  if (!response.ok) {
    throw new Error(`Error checking username: ${response.status}`);
  }

  return await response.json();
}
export async function savedata(username: string, creator: any, type: any, message: any): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/savedata`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, creator, type, message }),
  });

  if (!response.ok) {
    throw new Error(`Error savedata`);
  }

  return await response.json();
}
async function postGenerate(roastOrPraise: any, username: any, detail: any): Promise<any> {
  // console.log({ roastOrPraise, username, detail })
  const response = await ky.post(`${process.env.NEXT_PUBLIC_URL}/api/generateroastorpraise`, {
    json: { roastOrPraise, username, detail },
  });

  if (!response.ok) {
    throw new Error(`Error savedata`);
  }

  return await response.json();
}
export async function getUserByUsername(username: string): Promise<any> {
  const response = await ky.get(`https://client.warpcast.com/v2/user-by-username?username=${username}`);
  return response.json();
}
async function getAllNodes(): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getallnodes`);
  if (!response.ok) {
    throw new Error(`Error fetching nodes: ${response.status}`);
  }
  return await response.json();
}
export async function getUserByFid(fid: any): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getuserfid/${fid}`);
  if (!response.ok) {
    throw new Error(`Error fetching nodes: ${response.status}`);
  }
  return await response.json();
}
async function getAllCasts(fid: any): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/getallcast/${fid}`);
  if (!response.ok) {
    throw new Error(`Error fetching nodes: ${response.status}`);
  }
  return await response.json();
}
export async function getParseString(text: any): Promise<any> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/parsestring?text=${text}`);
  if (!response.ok) {
    throw new Error(`Error fetching nodes: ${response.status}`);
  }
  return await response.json();
}
export async function generateRoastOrPraiseRequest(roastOrPraise: any, username: any, detail: any) {
  const random = await getAllNodes();
  const response = await ky.post(`https://${random.subdomain}/v1/chat/completions`, {
    json: {
      messages: [
        {
          role: "system",
          content:
            roastOrPraise === "roast"
              ? "you're a roast master for a social media website called farcaster"
              : "You are a helpful, respectful, and honest praiser for a social media website called farcaster",
        },
        {
          role: "user",
          content: `give a short and ${
            roastOrPraise === "roast" ? "harsh roasting" : "glowing praise"
          } for the following social media user: "${username}". Here are the details: ${detail}`,
        },
      ],
      model: random.model_name,
    },
    retry: {
      limit: 3,
      methods: ["post"],
      statusCodes: [408, 504],
      backoffLimit: 3000,
    },
    timeout: 50000,
  });
  return response;
}
export async function generateRoastOrPraise(
  username: string,
  roastOrPraise: "roast" | "praise",
): Promise<ChatCompletion> {
  const user = await checkUsername(username);
  const { fid, activeStatus, displayName, followerCount, followingCount, powerBadge, profile } = user.result.user;
  let last5Post = [] as any;
  try {
    const last5 = await getAllCasts(fid);
    //@ts-ignore
    last5Post = last5.result.casts.map(a => ({ text: a.text }));
  } catch (e) {
    //@ts-ignore
    console.log(e.message);
  }

  const detail = JSON.stringify({
    activeStatus,
    displayName,
    followerCount,
    followingCount,
    powerBadge,
    profile,
    last5Post,
  });
  try {
    const response = await postGenerate(roastOrPraise, username, detail);
    return response.json();
  } catch {
    // console.log("error",e.message)
    console.log(username, roastOrPraise, detail);
    const response = await fallbackGroq(username, roastOrPraise, detail);
    return response as any;
  }
}
