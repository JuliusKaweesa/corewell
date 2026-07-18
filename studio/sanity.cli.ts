import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "aafuhqom",
    dataset: process.env.SANITY_STUDIO_DATASET || "production",
  },
  deployment: {
    appId: "x8ba5t9gk37x4xkx4ornve7g",
  },
});
