import axios from "axios";
import { load } from "cheerio";

type GumroadPost = {
  header: string;
  time: string;
  link: string;
  description?: string;
};

export async function getGumroadPosts(
  accountName: string
): Promise<GumroadPost[]> {
  try {
    const accountUrl = `https://${accountName}.gumroad.com`;
    const posts = await getPosts(accountUrl);
    return posts;
  } catch (error: any) {
    console.error("Error:", error.message);
  }

  return [];
}

export async function getPosts(baseUrl: string): Promise<GumroadPost[]> {
  const response = await axios.get(baseUrl + "/posts");
  const $ = load(response.data);

  const posts: GumroadPost[] = [];

  $("main > a").each((_, element) => {
    const header = $(element).find("h2").text();
    const time = $(element).find("time").text();
    const postUrl = $(element).attr("href");

    posts.push({ header, time, link: baseUrl + postUrl });
  });

  const postsWithDescription = posts.map(async (post) => {
    post.description = await getPostDescription(post.link);

    return post;
  });

  return Promise.all(postsWithDescription);
}

export async function getPostDescription(url: string): Promise<string | undefined> {
  const response = await axios.get(url);
  const $ = load(response.data);

  return $("head > meta[name='description']").attr("content");
}
