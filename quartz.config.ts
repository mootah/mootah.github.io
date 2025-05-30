import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "saibox",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "google",
      tagId: "G-T3CJSQWF6C",
    },
    locale: "ja-JP",
    baseUrl: "mootah.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      // fontOrigin: "googleFonts",
      // cdnCaching: true,
      // typography: {
      //   header: "Noto Sans JP",
      //   body: "Noto Sans JP",
      //   code: "Noto Sans Mono",
      // },
      fontOrigin: "local",
      cdnCaching: false,
      typography: {
        header: "LINE Seed JP",
        body: "LINE Seed JP",
        code: "JuliaMono",
      },
      colors: {
        lightMode: {
          // light: "#faf8f8",
          light: "#f5f6f6",
          lightgray: "#e5e5e5",
          gray: "#b8b8b8",
          darkgray: "#4e4e4e",
          dark: "#2b2b2b",
          // secondary: "#284b63",
          secondary: "#004fa5",
          // tertiary: "#84a59d",
          // tertiary: "#6fa1d7",
          tertiary: "#4d88c9",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          // light: "#161618",
          light: "#161719",
          lightgray: "#393639",
          gray: "#646464",
          darkgray: "#bababa",
          dark: "#ebebeb",
          // secondary: "#ac93f7",
          // secondary: "#6fa1d7",
          secondary: "#4d88c9",
          // tertiary: "#c4b5fd",
          // tertiary: "#b5cefd",
          tertiary: "#6aa8ed",
          highlight: "rgba(143, 159, 169, 0.15)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.RemoveH1(),
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest",
        openLinksInNewTab: true,
      }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.HardLineBreaks(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      // Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.RawFile(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

if (!process.env.QUARTZ_LOCAL) {
  config.plugins.emitters.push(
    Plugin.CustomOgImages({
      colorScheme: "darkMode",
    }),
  )
}

export default config
