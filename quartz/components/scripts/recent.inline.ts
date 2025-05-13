import { FullSlug, resolveRelative } from "../../util/path"
import { ContentDetails } from "../../plugins/emitters/contentIndex"
import { formatDate } from "../Date"
import { ValidLocale } from "../../i18n"

function toggleRecent(this: HTMLElement) {
  const nearestRecent = this.closest(".recent") as HTMLElement
  if (!nearestRecent) return
  const recentCollapsed = nearestRecent.classList.toggle("collapsed")
  nearestRecent.setAttribute(
    "aria-expanded",
    nearestRecent.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )

  if (!recentCollapsed) {
    // Stop <html> from being scrollable when mobile recent is open
    document.documentElement.classList.add("mobile-no-scroll")
  } else {
    document.documentElement.classList.remove("mobile-no-scroll")
  }
}

function createNode(
  currentSlug: FullSlug,
  locale: ValidLocale,
  entry: ContentDetails,
): HTMLLIElement {
  const template = document.getElementById("recent-template") as HTMLTemplateElement
  const clone = template.content.cloneNode(true) as DocumentFragment
  const li = clone.querySelector("li") as HTMLLIElement
  const a = li.querySelector("a") as HTMLAnchorElement
  a.href = resolveRelative(currentSlug, entry.slug)
  a.dataset.for = entry.slug
  a.textContent = entry.title

  if (currentSlug === entry.slug) {
    a.classList.add("active")
  }

  if (entry.date) {
    const date = new Date(entry.date!)
    const time = li.querySelector("time") as HTMLTimeElement
    time.dateTime = date.toISOString()
    time.textContent = formatDate(date, locale)
  }

  return li
}

async function setupRecent(currentSlug: FullSlug) {
  const allRecents = document.querySelectorAll("div.recent") as NodeListOf<HTMLElement>
  const data = await fetchData

  for (const recent of allRecents) {
    const locale = recent.dataset.locale as ValidLocale
    const recentUl = recent.querySelector(".recent-ul")
    if (!recentUl) continue

    const entries = [...Object.entries(data)] as [FullSlug, ContentDetails][]
    entries.sort(([_a, a], [_b, b]) => {
      if (a.date && b.date) {
        const aDate = new Date(a.date)
        const bDate = new Date(b.date)
        const order = bDate.getTime() - aDate.getTime()
        if (order != 0) return order
      }
      return a.title.localeCompare(b.title)
    })

    const fragment = document.createDocumentFragment()
    for (const [slug, entry] of entries) {
      if (slug == ("index" as FullSlug)) continue
      const node = createNode(currentSlug, locale, entry)
      fragment.appendChild(node)
    }
    recentUl.insertBefore(fragment, recentUl.firstChild)

    // restore recent scrollTop position if it exists
    const scrollTop = sessionStorage.getItem("recentScrollTop")
    if (scrollTop) {
      recentUl.scrollTop = parseInt(scrollTop)
    }

    // Set up event handlers
    const recentButtons = recent.getElementsByClassName(
      "recent-toggle",
    ) as HTMLCollectionOf<HTMLElement>
    for (const button of recentButtons) {
      button.addEventListener("click", toggleRecent)
      window.addCleanup(() => button.removeEventListener("click", toggleRecent))
    }
  }
}

document.addEventListener("prenav", async () => {
  // save recent scrollTop position
  const recent = document.querySelector(".recent-ul")
  if (!recent) return
  sessionStorage.setItem("recentScrollTop", recent.scrollTop.toString())
})

document.addEventListener("nav", async (e: CustomEventMap["nav"]) => {
  const currentSlug = e.detail.url
  await setupRecent(currentSlug)

  // if mobile hamburger is visible, collapse by default
  for (const recent of document.getElementsByClassName("recent")) {
    const mobileRecent = recent.querySelector(".mobile-recent")
    if (!mobileRecent) return

    if (mobileRecent.checkVisibility()) {
      recent.classList.add("collapsed")
      recent.setAttribute("aria-expanded", "false")

      // Allow <html> to be scrollable when mobile recent is collapsed
      document.documentElement.classList.remove("mobile-no-scroll")
    }

    mobileRecent.classList.remove("hide-until-loaded")
  }
})

window.addEventListener("resize", function () {
  // Desktop recent opens by default, and it stays open when the window is resized
  // to mobile screen size. Applies `no-scroll` to <html> in this edge case.
  const recent = document.querySelector(".recent")
  if (!recent) return

  const mobileRecent = recent.querySelector(".mobile-recent")
  if (!mobileRecent) return

  if (mobileRecent.checkVisibility()) {
    recent.classList.add("collapsed")
    recent.setAttribute("aria-expanded", "false")

    // Allow <html> to be scrollable when mobile recent is collapsed
    document.documentElement.classList.remove("mobile-no-scroll")
  } else {
    recent.classList.remove("collapsed")
    recent.setAttribute("aria-expanded", "true")
  }
  // if (!recent.classList.contains("collapsed")) {
  //   document.documentElement.classList.add("mobile-no-scroll")
  //   return
  // }
})
