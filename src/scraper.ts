import axios from "axios";
import { load } from "cheerio";

type GumroadPost = {
  header: string;
  time: string;
  link: string;
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

async function getPosts(baseUrl: string): Promise<GumroadPost[]> {
  const response = await axios.get(baseUrl + "/posts");
  const $ = load(response.data);

  const output: GumroadPost[] = [];

  $("main > a").each((_, element) => {
    const header = $(element).find("h2").text();
    const time = $(element).find("time").text();
    const postUrl = $(element).attr("href") || "";

    output.push({ header, time, link: baseUrl + postUrl });
  });

  return output;
}

getGumroadPosts("trnr");
