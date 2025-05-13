import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/twohoplinks.scss"
import { resolveRelative, SimpleSlug, simplifySlug } from "../util/path"
import { i18n } from "../i18n"
import { Data } from "vfile"
import { classNames } from "../util/lang"

// @ts-ignore
import script from "./scripts/twohoplinks.inline"

interface TwohopLinksOptions {
  hideWhenEmpty: boolean
}

const defaultOptions: TwohopLinksOptions = {
  hideWhenEmpty: true,
}

const linkicon = () => (
  <i class="linkicon">
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
    </svg>
  </i>
)

const sortFn = (a: Data, b: Data) => {
  const aTitle = a.frontmatter?.title
  const bTitle = b.frontmatter?.title
  if (aTitle && bTitle) {
    return aTitle.localeCompare(bTitle)
  }
  return 1
}

export default ((opts?: Partial<TwohopLinksOptions>) => {
  const options: TwohopLinksOptions = { ...defaultOptions, ...opts }
  // const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()

  const TwohopLinks: QuartzComponent = ({
    fileData,
    allFiles,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    const slug = simplifySlug(fileData.slug!)

    const uniqueLinks = new Set<SimpleSlug>()
    uniqueLinks.add("/" as SimpleSlug)
    uniqueLinks.add(slug)

    const backlinksMap = allFiles.reduce(
      (map, file) => {
        file.links?.forEach((link) => {
          if (!map[link]) map[link] = []
          map[link].push(file)
        })
        return map
      },
      {} as Record<SimpleSlug, Data[]>,
    )

    const getBacklinks = (slug: SimpleSlug) => backlinksMap[slug] ?? []

    const outlinkFiles = allFiles
      .filter((file) => {
        const s = simplifySlug(file.slug!)
        if (!fileData.links?.includes(s)) return false
        if (uniqueLinks.has(s)) return false
        uniqueLinks.add(s)
        return true
      })
      .sort(sortFn)
    const backlinkFiles = getBacklinks(slug)
      .filter((file) => {
        const s = simplifySlug(file.slug!)
        if (uniqueLinks.has(s)) return false
        uniqueLinks.add(s)
        return true
      })
      .sort(sortFn)
    const allLinkFiles = outlinkFiles.concat(backlinkFiles)

    if (options.hideWhenEmpty && allLinkFiles.length == 0) {
      return null
    }
    return (
      <div class={classNames(displayClass, "twohoplinks")}>
        <button type="button" class="thl-header" aria-controls="thl-content" aria-expanded={false}>
          <h3>
            {linkicon()}
            {"Links"}
          </h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
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
        <div class="overflow thl-content">
          <ul>
            {allLinkFiles.length > 0 ? (
              allLinkFiles.map((file) => (
                <li>
                  <a href={resolveRelative(fileData.slug!, file.slug!)} class="internal">
                    {file.frontmatter?.title}
                  </a>
                </li>
              ))
            ) : (
              <li>{i18n(cfg.locale).components.backlinks.noBacklinksFound}</li>
            )}
          </ul>
          {outlinkFiles.map((file) => {
            const os = simplifySlug(file.slug!)
            const hops = getBacklinks(os)
              .filter((hop) => {
                const hs = simplifySlug(hop.slug!)
                if (uniqueLinks.has(hs)) return false
                uniqueLinks.add(hs)
                return true
              })
              .sort(sortFn)

            if (hops.length < 1) return null

            return (
              <div>
                <h3>
                  {linkicon()}
                  {file.frontmatter?.title}
                </h3>
                <ul>
                  {hops.map((hop) => (
                    <li>
                      <a href={resolveRelative(fileData.slug!, hop.slug!)} class="internal">
                        {hop.frontmatter?.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
          <div class="overflow-end"></div>
        </div>
      </div>
    )
  }

  TwohopLinks.css = style
  TwohopLinks.afterDOMLoaded = script

  return TwohopLinks
}) satisfies QuartzComponentConstructor
