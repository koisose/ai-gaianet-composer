import axios from "axios";

async function checkUsername(username: string) {
  try {
    const usernameFid = await axios.get("https://api.neynar.com/v1/farcaster/user-by-username", {
      params: {
        username,
      },
      headers: {
        accept: "application/json",
        api_key: process.env.NEYNAR as string,
      },
    });
    if (usernameFid.data.result.user) {
      if (usernameFid.data.result.user.username === username) {
        return usernameFid.data.result.user.fid;
      } else {
        throw new Error("no username");
      }
    } else {
      throw new Error("no username");
    }
  } catch {
    return null;
  }
}
//@ts-ignore
export async function parseString(str) {
  const originalText = str;
  //@ts-ignore
  const mentions = [];
  const mentionsPositions = [];
  //@ts-ignore
  const embeds = [];
  //@ts-ignore
  str.replace(
    /(@\w+(\.eth)?)|((http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?)/g,
    function (match: any, mention: any, ethDomain: any, url: any, offset: any) {
      console.log(match, ethDomain, offset);
      if (mention) {
        //@ts-ignore
        mentions.push(mention);

        return "";
      }
      if (url) {
        //@ts-ignore
        embeds.push(url);
        return url;
      }
    },
  );
  const checkUser = [];
  for (let i = 0; i < mentions.length; i++) {
    try {
      //@ts-ignore
      const fid = await checkUsername(mentions[i].substring(1));
      if (fid !== null) {
        //@ts-ignore
        checkUser.push({ username: mentions[i], fid });
      }
    } catch {
      console.log("user not found");
    }
  }
  let newText = str;
  for (let i = 0; i < checkUser.length; i++) {
    //@ts-ignore
    if (str.indexOf(checkUser[i].username) !== -1) {
      //@ts-ignore
      mentionsPositions.push(str.indexOf(checkUser[i].username));
      //@ts-ignore
      str = str.replace(checkUser[i].username, "");
      newText = str;
    }
  }

  return {
    originalText,
    text: newText,
    //@ts-ignore
    embeds: embeds.map(a => ({ url: a })),
    embedsDeprecated: [],
    //@ts-ignore
    mentions: checkUser.map(a => a.fid),
    //@ts-ignore
    mentionsUsername: checkUser.map(a => a.username.replace("@", "")),
    mentionsPositions: mentionsPositions,
  };
}
