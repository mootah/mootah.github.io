import { Translation } from "./definition"

// export default {
//   propertyDefaults: {
//     title: "無題",
//     description: "説明なし",
//   },
//   components: {
//     callout: {
//       note: "ノート",
//       abstract: "抄録",
//       info: "情報",
//       todo: "やるべきこと",
//       tip: "ヒント",
//       success: "成功",
//       question: "質問",
//       warning: "警告",
//       failure: "失敗",
//       danger: "危険",
//       bug: "バグ",
//       example: "例",
//       quote: "引用",
//     },
//     backlinks: {
//       title: "バックリンク",
//       noBacklinksFound: "バックリンクはありません",
//     },
//     themeToggle: {
//       lightMode: "ライトモード",
//       darkMode: "ダークモード",
//     },
//     explorer: {
//       title: "エクスプローラー",
//     },
//     footer: {
//       createdWith: "作成",
//     },
//     graph: {
//       title: "グラフビュー",
//     },
//     recentNotes: {
//       title: "最近の記事",
//       seeRemainingMore: ({ remaining }) => `さらに${remaining}件 →`,
//     },
//     transcludes: {
//       transcludeOf: ({ targetSlug }) => `${targetSlug}のまとめ`,
//       linkToOriginal: "元記事へのリンク",
//     },
//     search: {
//       title: "検索",
//       searchBarPlaceholder: "検索ワードを入力",
//     },
//     tableOfContents: {
//       title: "目次",
//     },
//     contentMeta: {
//       readingTime: ({ minutes }) => `${minutes} min read`,
//     },
//   },
//   pages: {
//     rss: {
//       recentNotes: "最近の記事",
//       lastFewNotes: ({ count }) => `最新の${count}件`,
//     },
//     error: {
//       title: "Not Found",
//       notFound: "ページが存在しないか、非公開設定になっています。",
//       home: "ホームページに戻る",
//     },
//     folderContent: {
//       folder: "フォルダ",
//       itemsUnderFolder: ({ count }) => `${count}件のページ`,
//     },
//     tagContent: {
//       tag: "タグ",
//       tagIndex: "タグ一覧",
//       itemsUnderTag: ({ count }) => `${count}件のページ`,
//       showingFirst: ({ count }) => `のうち最初の${count}件を表示しています`,
//       totalTags: ({ count }) => `全${count}個のタグを表示中`,
//     },
//   },
// } as const satisfies Translation
//

export default {
  propertyDefaults: {
    title: "Untitled",
    description: "No description provided",
  },
  components: {
    callout: {
      note: "Note",
      abstract: "Abstract",
      info: "Info",
      todo: "Todo",
      tip: "Tip",
      success: "Success",
      question: "Question",
      warning: "Warning",
      failure: "Failure",
      danger: "Danger",
      bug: "Bug",
      example: "Example",
      quote: "Quote",
    },
    backlinks: {
      title: "Backlinks",
      noBacklinksFound: "No backlinks found",
    },
    themeToggle: {
      lightMode: "Light mode",
      darkMode: "Dark mode",
    },
    explorer: {
      title: "Explorer",
    },
    footer: {
      createdWith: "Created with",
    },
    graph: {
      title: "Graph View",
    },
    recentNotes: {
      title: "Recent Notes",
      seeRemainingMore: ({ remaining }) => `See ${remaining} more →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transclude of ${targetSlug}`,
      linkToOriginal: "Link to original",
    },
    search: {
      title: "Search",
      searchBarPlaceholder: "Search for something",
    },
    tableOfContents: {
      title: "Table of Contents",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `所要: ${minutes}分`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Recent notes",
      lastFewNotes: ({ count }) => `Last ${count} notes`,
    },
    error: {
      title: "Not Found",
      notFound: "Either this page is private or doesn't exist.",
      home: "Return to Homepage",
    },
    folderContent: {
      folder: "Folder",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 item under this folder." : `${count} items under this folder.`,
    },
    tagContent: {
      tag: "Tag",
      tagIndex: "Tag Index",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 item with this tag." : `${count} items with this tag.`,
      showingFirst: ({ count }) => `Showing first ${count} tags.`,
      totalTags: ({ count }) => `Found ${count} total tags.`,
    },
  },
} as const satisfies Translation
