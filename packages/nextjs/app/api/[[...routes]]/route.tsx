/** @jsxImportSource frog/jsx */
import { Button, Frog } from "frog";
import { devtools } from "frog/dev";
import { handle } from "frog/next";
import { serveStatic } from "frog/serve-static";
import { Box, vars } from "~~/frog-ui/ui";
import {
  generateRoastOrPraiseRequest,
  getAllCast,
  getUserBulk,
  getUserByUsername,
  groqFallback,
  randomNode,
} from "~~/lib/gaianet";
import { getDataById, saveData } from "~~/lib/mongo";
import { parseString } from "~~/lib/parseString";
import { generateImage } from '~~/lib/create-image'
const app = new Frog({
  // imageAspectRatio: '1:1',
  hub: {
    apiUrl: "https://hubs.airstack.xyz",
    fetchOptions: {
      //@ts-ignore
      headers: {
        "x-airstack-hubs": process.env.AIRSTACK_API_KEY,
      },
    },
  },
  ui: { vars },
  assetsPath: "/",
  basePath: "/api",
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: "Roast or praise farcaster user",
});

// Uncomment to use Edge Runtime
// export const runtime = 'edge'
app.composerAction(
  "/roaster",
  async c => {
    const data = c.actionData;

    const originalText = JSON.parse(decodeURIComponent(data.state as any)).cast.text;
    return c.res({
      title: "Roast or praise farcaster user",
      //@ts-ignore
      url: `${process.env.NEXT_PUBLIC_URL}/composer-forms?fid=${data.fid}&originalText=${originalText}`,
    });
  },
  {
    /* Name of the action – 14 characters max. */
    name: "Roast or praise",
    /* Description of the action – 20 characters max. */
    description: "Roasting or praising farcaster user",
    icon: "image",
    imageUrl: "https://frog.fm/logo-light.svg",
  },
);
app.frame("/roastorpraise/:id", async c => {
  const id = c.req.param("id");

 
  // return c.json(data)
  return c.res({
    imageAspectRatio:"1:1",
    image: `https://${process.env.MINIO_ENDPOINT}/image/file-${id}`,
    intents: [
      (
        <Button.Redirect
          location={`https://warpcast.com/~/developers/composer-actions?postUrl=${encodeURIComponent(
            (process.env.NEXT_PUBLIC_URL as string) + "/api/roaster",
          )}`}
        >
          try now
        </Button.Redirect>
      ) as any,
    ],
  });
});
app.hono.get("/parsestring", async c => {
  const text = decodeURIComponent(c.req.query("text") as string);
  const data = await parseString(text);
  return c.json(data);
});
app.hono.get("/get/:id", async c => {
  const id = c.req.param("id");
  const data = await getDataById("roastorpraise", id);
  return c.json(data);
});
app.hono.get("/getallnodes", async c => {
  const data = await randomNode();
  return c.json(data);
});
app.hono.get("/getallcast/:fid", async c => {
  const fid = c.req.param("fid");
  const data = await getAllCast(fid);
  return c.json(data as any);
});
app.hono.post("/checkusername", async c => {
  const data = await c.req.json();
  const getUsername = await getUserByUsername(data.username as string);
  return c.json(getUsername);
});
app.hono.post("/generateroastorpraise", async c => {
  const data = await c.req.json();

  const getUsername = await generateRoastOrPraiseRequest(
    data.roastOrPraise as any,
    data.username as any,
    data.detail as any,
  );
  return c.json(getUsername);
});
app.hono.post("/groqfallback", async c => {
  const data = await c.req.json();

  const fallback = await groqFallback(data.username as string, data.roast as any, data.detail);
  return c.json(fallback);
});
app.hono.post("/savedata", async c => {
  const data = await c.req.json();
  const id = await saveData(
    { username: data.username, creator: data.creator, type: data.type, message: data.message },
    "roastorpraise",
  );
  await generateImage("/screenshot/" + id._id.toString(), id._id.toString())
  return c.json({ id: id._id.toString() });
});
app.hono.get("/getuserfid/:fid", async c => {
  const fid = c.req.param("fid");
  const data = await getUserBulk(fid);

  return c.json(data);
});
devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
