import { FilePath, QUARTZ, joinSegments } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import fs from "fs"
import { glob } from "../../util/glob"

export const RawFile: QuartzEmitterPlugin = () => ({
  name: "RawFile",
  async *emit({ argv, cfg }) {
    const rawFilePath = joinSegments(QUARTZ, "public")
    const fps = await glob("*", rawFilePath, cfg.configuration.ignorePatterns)
    for (const fp of fps) {
      const src = joinSegments(rawFilePath, fp) as FilePath
      const dest = joinSegments(argv.output, fp) as FilePath
      await fs.promises.copyFile(src, dest)
      yield dest
    }
  },
  async *partialEmit() {},
})
