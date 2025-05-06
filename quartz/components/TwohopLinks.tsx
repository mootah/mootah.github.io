import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/twohoplinks.scss"
import { resolveRelative, SimpleSlug, simplifySlug } from "../util/path"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"
import OverflowListFactory from "./OverflowList"
import { Data } from "vfile"

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

export default ((opts?: Partial<TwohopLinksOptions>) => {
  const options: TwohopLinksOptions = { ...defaultOptions, ...opts }
  const { OverflowList, overflowListAfterDOMLoaded } = OverflowListFactory()

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

    const outlinkFiles = allFiles.filter((file) => {
      const s = simplifySlug(file.slug!)
      if (!fileData.links?.includes(s)) return false
      if (uniqueLinks.has(s)) return false
      uniqueLinks.add(s)
      return true
    })
    const backlinkFiles = getBacklinks(slug).filter((file) => {
      const s = simplifySlug(file.slug!)
      if (uniqueLinks.has(s)) return false
      uniqueLinks.add(s)
      return true
    })
    const allLinkFiles = outlinkFiles.concat(backlinkFiles)

    if (options.hideWhenEmpty && allLinkFiles.length == 0) {
      return null
    }
    return (
      <div class={classNames(displayClass, "twohoplinks")}>
        <h3>
          {linkicon()}
          {"Links"}
        </h3>
        <OverflowList>
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
          {outlinkFiles.map((file) => {
            const os = simplifySlug(file.slug!)
            const hops = getBacklinks(os).filter((hop) => {
              const hs = simplifySlug(hop.slug!)
              if (uniqueLinks.has(hs)) return false
              uniqueLinks.add(hs)
              return true
            })

            if (hops.length < 1) return null

            return (
              <li>
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
              </li>
            )
          })}
        </OverflowList>
      </div>
    )
  }

  TwohopLinks.css = style
  TwohopLinks.afterDOMLoaded = overflowListAfterDOMLoaded

  return TwohopLinks
}) satisfies QuartzComponentConstructor
