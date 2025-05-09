import { QuartzTransformerPlugin } from "../types";
import { visit } from "unist-util-visit"
import { Root } from "hast"


export const RemoveH1: QuartzTransformerPlugin = () => {
  return {
    name: "RemoveH1",
    htmlPlugins(ctx) {
      return [
        () => {
          return (tree: Root, file) => {
            visit(tree, "element", (node, _index, _parent) => {
              if (node.tagName === "h1") {
                  _parent?.children.splice(_index!, 1);
              }
            })
          }
        }
      ]
    }
  }
}