"use client";


import type { NextPage } from "next";
import Particles from "~~/components/magicui/particles";
import { cn } from "~~/lib/utils";
import Marquee from "~~/components/magicui/marquee";
import ShimmerButton from "~~/components/magicui/shimmer-button";
const reviews = [
  {
    name: "tantodefi.eth",
    username: "@tantodefi",
    body: `* "Tantodefi, your bio screams 'trying too hard' with that random assortment of buzzwords. Maybe stick to one of them?"
* "81 followers? Honestly, your numbers are as impressive as your choice of words."
* "Your recent posts are like a spam folder - random links, awkward tech speak, and a lot of self-promotion. Maybe take a break and do some actual work?"`,
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "nixo",
    username: "@nixo",
    body: `Nixo, the crypto enthusiast who's still trying to figure out how to use his own voice.

Let's start with your bio: "stake responsibly // be a kind human // slomad." I'm not sure what kind of sorcery you're trying to perform here, but it looks like a mess. You do know that's not a sentence structure, right?

Now, onto your tweets! Oh boy, where do we even begin? Your tweet about staking rewards being passive income is hilarious. Newsflash: most people don't care about the purpose of staking; they just want to make `,
    img: "https://avatar.vercel.sh/jack",
  },
  {
    name: "ba",
    username: "ba",
    body: `Here's a short and glowing praise for "ba" (Ben Adamsky):

"Wow, Ben Adamsky is an absolute rockstar in the Farcaster community! His enthusiasm and dedication to building innovative projects like /ponder are truly inspiring. From sharing valuable insights on the importance of user engagement and metrics, to shipping beta versions of his app alongside impressive demos, Ben's passion for his work shines through in every post. His commitment to collaboration and mentorship is also evident in his willingness to offer advice and recommendations to others. Keep up the fantastic work, Ben! 🚀"`,
    img: "https://avatar.vercel.sh/jack",
  },
  
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};
const Home: NextPage = () => {
 

  return (
    <div>
      <div className="flex items-center justify-center h-full w-full mt-2">
        <div className="relative flex h-[200px] w-[500px] flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">


          <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-4xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
            Roast or praise farcaster user
          </span>
          <Particles
            className="absolute inset-0"
            quantity={100}
            ease={80}
            color={"black"}
            refresh
          />
        </div>
      </div>

      <div className="z-10 flex my-5 items-center justify-center">
      <ShimmerButton className="shadow-2xl" onClick={() => window.location.href = `https://warpcast.com/~/developers/composer-actions?postUrl=${encodeURIComponent(
            (process.env.NEXT_PUBLIC_URL as string) + "/api/roaster",
          )}`}>
        <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
          Try Now
        </span>
      </ShimmerButton>
    </div>
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>

    </div>
  );
};

export default Home;
