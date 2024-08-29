type User = {
  object: "user";
  fid: number;
  custody_address: string;
  username: string;
  display_name: string;
  pfp_url: string;
  profile: {
    bio: {
      text: string;
      mentioned_profiles?: any[]; // Optional if this key may not exist or is empty
    };
  };
  follower_count: number;
  following_count: number;
  verifications: string[];
  verified_addresses: {
    eth_addresses: string[];
    sol_addresses: string[];
  };
  active_status: "inactive" | "active"; // Adjust based on actual values
  power_badge: boolean;
};

type Channel = {
  object: "channel_dehydrated";
  id: string;
  name: string;
  image_url: string;
};

type Embed = {
  url: string;
  metadata?: {
    content_type?: string;
    content_length?: number | null;
  };
};

type Reaction = {
  fid: number;
  fname: string;
};

type Reactions = {
  likes_count: number;
  recasts_count: number;
  likes: Reaction[];
  recasts: Reaction[];
};

type Cast = {
  object: "cast";
  hash: string;
  thread_hash: string;
  parent_hash: string | null;
  parent_url: string | null;
  root_parent_url: string | null;
  parent_author: {
    fid: number | null;
  };
  author: User;
  text: string;
  timestamp: string;
  embeds: Embed[];
  reactions: Reactions;
  replies: {
    count: number;
  };
  channel: Channel;
  mentioned_profiles: User[];
};

export type CastsResponse = {
  casts: Cast[];
};

type UserProfile = {
  fid: number;
  custodyAddress: string;
  username: string;
  displayName: string;
  pfp: {
    url: string;
  };
  profile: {
    bio: {
      text: string;
      mentionedProfiles: any[]; // Replace `any` with the actual type if known
    };
  };
  followerCount: number;
  followingCount: number;
  verifications: string[];
  verifiedAddresses: {
    eth_addresses: string[];
    sol_addresses: string[];
  };
  activeStatus: "inactive" | "active"; // Assuming these are the only statuses
  powerBadge: boolean;
  viewerContext: {
    following: boolean;
    followedBy: boolean;
  };
};

export type Result = {
  result: {
    user: UserProfile;
  };
};
interface LogEntry {
  finish_reason: string;
  index: number;
  logprobs: null | any; // Assuming logprobs could be an object or null
  message: {
    content: string;
    role: string;
    tool_calls: any[]; // Assuming this is an array of objects
  };
}

export interface ChatCompletion {
  created: number;
  id: string;
  model: string;
  object: string;
  usage: {
    completion_tokens: number;
    prompt_tokens: number;
    total_tokens: number;
  };
  choices: LogEntry[];
}
