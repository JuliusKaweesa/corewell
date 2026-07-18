import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "aafuhqom";
const dataset = process.env.SANITY_STUDIO_DATASET || "production";

export default defineConfig({
  name: "corewell-articles",
  title: "CoreWell Article Studio",
  projectId,
  dataset,
  plugins: [structureTool(), visionTool()],
  schema: { types: schemaTypes },
});
