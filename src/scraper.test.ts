import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { getGumroadPosts, getPostDescription, getPosts } from "./scraper"; // replace "yourFileName" with the actual file name containing the functions
import { expect, test, afterEach } from "@jest/globals";

const mockAxios = new MockAdapter(axios);

afterEach(() => {
    mockAxios.reset();
});

test("getGumroadPosts returns expected data", async () => {
    const mockPosts = [
        { header: "Post 1", time: "12:00", link: "https://accountName.gumroad.com/post1", description: "Description 1" },
        { header: "Post 2", time: "13:00", link: "https://accountName.gumroad.com/post2", description: "Description 2" }
    ];

    mockAxios.onGet("https://accountName.gumroad.com/posts").reply(200, "<html><main><a href='/post1'><h2>Post 1</h2><time>12:00</time></a><a href='/post2'><h2>Post 2</h2><time>13:00</time></a></main></html>");
    mockAxios.onGet("https://accountName.gumroad.com/post1").reply(200, "<html><head><meta name='description' content='Description 1'></head></html>");
    mockAxios.onGet("https://accountName.gumroad.com/post2").reply(200, "<html><head><meta name='description' content='Description 2'></head></html>");

    const result = await getGumroadPosts("accountName");
    expect(result).toEqual(mockPosts);
});

test("getPostDescription returns expected data", async () => {
    const mockDescription = "Mock description";

    mockAxios.onGet("https://example.com/post").reply(200, "<html><head><meta name='description' content='Mock description'></head></html>");

    const result = await getPostDescription("https://example.com/post");
    expect(result).toEqual(mockDescription);
});

test("getPosts returns expected data", async () => {
    const mockPosts = [
        { header: "Post 1", time: "12:00", link: "https://example.com/post1", description: "Description 1" },
        { header: "Post 2", time: "13:00", link: "https://example.com/post2", description: "Description 2" }
    ];

    mockAxios.onGet("https://example.com/posts").reply(200, "<html><main><a href='/post1'><h2>Post 1</h2><time>12:00</time></a><a href='/post2'><h2>Post 2</h2><time>13:00</time></a></main></html>");
    mockAxios.onGet("https://example.com/post1").reply(200, "<html><head><meta name='description' content='Description 1'></head></html>");
    mockAxios.onGet("https://example.com/post2").reply(200, "<html><head><meta name='description' content='Description 2'></head></html>");

    const result = await getPosts("https://example.com");
    expect(result).toEqual(mockPosts);
});