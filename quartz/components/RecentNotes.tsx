import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { SimpleSlug } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/recentNotes.scss"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import OverflowListFactory from "./OverflowList"
// @ts-ignore
import script from "./scripts/recent.inline"
import { concatenateResources } from "../util/resources"

interface Options {
  title?: string
  limit: number
  linkToMore: SimpleSlug | false
  showTags: boolean
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
  folderDefaultState: "collapsed" | "open"
  folderClickBehavior: "collapse" | "link"
  useSavedState: boolean
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  limit: 3,
  linkToMore: false,
  showTags: true,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg),
  folderDefaultState: "collapsed",
  folderClickBehavior: "link",
  useSavedState: true,
})

export default ((userOpts?: Partial<Options>) => {
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()
  const RecentNotes: QuartzComponent = ({
    // allFiles,
    // fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const opts = { ...defaultOptions(cfg), ...userOpts }
    // const pages = allFiles.filter(opts.filter).sort(opts.sort)
    // const remaining = Math.max(0, pages.length - opts.limit)
    return (
      <div
        class={classNames(displayClass, "recent")}
        data-behavior={opts.folderClickBehavior}
        data-collapsed={opts.folderDefaultState}
        data-savestate={opts.useSavedState}
        data-locale={cfg.locale}
      >
        <button
          type="button"
          class="recent-toggle mobile-recent hide-until-loaded"
          data-mobile={true}
          aria-controls="recent-content"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>
        <button
          type="button"
          class="title-button recent-toggle desktop-recent"
          data-mobile={false}
          aria-expanded={true}
        >
          <h2>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h2>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="5 8 14 8"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="fold"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="recent-content" aria-expanded={true}>
          <OverflowList class="recent-ul" />
          <template id="recent-template">
            <li class="recent-li">
              <div class="section">
                <div class="desc">
                  <a href="#" class="internal"></a>
                </div>
                <p class="meta">
                  <time></time>
                </p>
              </div>
            </li>
          </template>
        </div>
      </div>
    )
  }

  RecentNotes.css = style
  RecentNotes.afterDOMLoaded = concatenateResources(script, overflowListAfterDOMLoaded)
  return RecentNotes
}) satisfies QuartzComponentConstructor
