function toggleThl(this: HTMLElement) {
  this.classList.toggle("collapsed")
  this.setAttribute(
    "aria-expanded",
    this.getAttribute("aria-expanded") === "true" ? "false" : "true",
  )
  const content = this.nextElementSibling as HTMLElement | undefined
  if (!content) return
  content.classList.toggle("collapsed")
}

function setupThl() {
  for (const thl of document.getElementsByClassName("twohoplinks")) {
    const button = thl.querySelector(".thl-header")
    const content = thl.querySelector(".thl-content")
    if (!button || !content) return
    button.addEventListener("click", toggleThl)
    window.addCleanup(() => button.removeEventListener("click", toggleThl))
  }
}

document.addEventListener("nav", () => {
  setupThl()
})
