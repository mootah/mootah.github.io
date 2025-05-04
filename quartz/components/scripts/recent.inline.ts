
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

async function setupRecent() {
  const allRecents = document.querySelectorAll("div.recent") as NodeListOf<HTMLElement>

  for (const recent of allRecents) {
    const recentUl = recent.querySelector(".recent-ul")
    if (!recentUl) continue


    // restore recent scrollTop position if it exists
    const scrollTop = sessionStorage.getItem("recentScrollTop")
    if (scrollTop) {
      recentUl.scrollTop = parseInt(scrollTop)
    } else {
      // try to scroll to the active element if it exists
      const activeElement = recentUl.querySelector(".active")
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: "smooth" })
      }
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
  await setupRecent()

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
