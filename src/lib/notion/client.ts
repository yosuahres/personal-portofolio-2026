import { Client } from "@notionhq/client";

// Without a token every request is rejected, so queries skip Notion and return empty results.
export const isNotionConfigured = Boolean(process.env.NOTION_TOKEN);

// Initialize Notion client singleton
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});
