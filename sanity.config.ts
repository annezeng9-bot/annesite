import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./sanity/schemas";

// These come from your .env.local file
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "portfolio-studio",
  title: "Portfolio Studio",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Site settings as a singleton (no list, direct edit)
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),
            S.listItem()
              .title("Photos")
              .child(S.documentTypeList("photo").title("Photos")),
            S.listItem()
              .title("Projects")
              .child(S.documentTypeList("project").title("Projects")),
          ]),
    }),
    visionTool(),
    media(), // Better image management UI
  ],
  schema: {
    types: schemaTypes,
  },
});
