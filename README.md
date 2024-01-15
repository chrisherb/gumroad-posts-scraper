# gumroad-posts-scraper

Scrapes your Gumroad account's posts and returns their title, time and url. 
So far no method of retrieving the actual post's content is implemented, since it is unfortunately loaded asynchronously. 

## How to install

```
npm install github:chrisherb/gumroad-posts-scraper
```

## How to use

```
import {getGumroadPosts} from "gumroad-posts-scraper"

const posts = await getGumroadPosts("my-gumroad-account-name");
```
