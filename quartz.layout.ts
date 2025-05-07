import { Options } from "./quartz/components/Explorer"
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug, simplifySlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

export const sortFn: Options["sortFn"] = (a, b) => {
  if (a.data?.date && b.data?.date) {
    const aDate = new Date(a.data?.date)
    const bDate = new Date(b.data?.date)
    const order = bDate.getTime() - aDate.getTime()
    if (order != 0) return order
  }
  return a.displayName.localeCompare(b.displayName)
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.RecentNotes({
      limit: 100100100,
      showTags: false,
      filter: (f) => simplifySlug(f.slug!) != ("/" as SimpleSlug)
    }),
    // Component.Explorer({ sortFn }),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
    Component.TwohopLinks(),
    // Component.Backlinks(),
    // Component.Graph(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.RecentNotes({
      limit: 100100100,
      showTags: false,
    }),
    // Component.Explorer({ sortFn }),
  ],
  right: [],
}