import { promises as fs } from "fs"
import path from "path"
import { QUARTZ } from "./path"
import { FontWeight } from "satori/wasm"
import chalk from "chalk"

const fontDir = path.join(QUARTZ, "static", "fonts")

type FontDict = { [rawFontName: string]: { [weight: number]: string } }

const localFonts: FontDict = {
  "LINE Seed JP": {
    400: "LINESeedJP_OTF_Rg.otf",
    700: "LINESeedJP_OTF_Bd.otf",
  },
  "JuliaMono": {
    400: "JuliaMono-Regular.ttf",
    700: "JuliaMono-Bold.ttf",
  },
}

export async function getLocalFontData(rawFontName: string, weight: FontWeight) {
  const fontName = localFonts[rawFontName][weight]
  const fontPath = path.join(fontDir, fontName)
  try {
    await fs.access(fontPath)
    return fs.readFile(fontPath)
  } catch (error) {
    console.log(
      chalk.blue(
        `\nInfo: Failed to get local font ${rawFontName} with weight ${weight}`,
      ),
    )
  }
  return undefined
}