import { defineConfig } from "vitepress";
import { withSidebar } from "vitepress-sidebar";
import { imageComparerPlugin } from "./plugins/image-comparer.js";

const sidebarOptions = {
  /*
   * For detailed instructions, see the links below:
   * https://vitepress-sidebar.cdget.com/guide/options
   */
  //
  // ============ [ RESOLVING PATHS ] ============
  // documentRootPath: '/',
  // scanStartPath: null,
  // resolvePath: null,
  // basePath: null,
  //
  // ============ [ GROUPING ] ============
  // collapsed: true,
   collapseDepth: 2,
  // rootGroupText: 'Contents',
  // rootGroupLink: 'https://github.com/jooy2',
  // rootGroupCollapsed: false,
  //
  // ============ [ GETTING MENU TITLE ] ============
  // useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  // useFolderLinkFromIndexFile: false,
  // useFolderTitleFromIndexFile: false,
  // frontmatterTitleFieldName: 'title',
  //
  // ============ [ GETTING MENU LINK ] ============
  // useFolderLinkFromSameNameSubFile: false,
  useFolderLinkFromIndexFile: true,
  // folderLinkNotIncludesFileName: false,
  //
  // ============ [ INCLUDE / EXCLUDE ] ============
  excludePattern: ["README.md"],
  // excludeFilesByFrontmatterFieldName: 'exclude',
  // includeDotFiles: false,
  // includeEmptyFolder: false,
  // includeRootIndexFile: false,
  // includeFolderIndexFile: false,
  //
  // ============ [ STYLING MENU TITLE ] ============
  // hyphenToSpace: true,
  // underscoreToSpace: true,
  // capitalizeFirst: false,
  // capitalizeEachWords: false,
  // keepMarkdownSyntaxFromTitle: false,
  // removePrefixAfterOrdering: false,
  // prefixSeparator: '.',
  //
  // ============ [ SORTING ] ============
  // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'],
  // sortFolderTo: null,
  // sortMenusByName: false,
  // sortMenusByFileDatePrefix: false,
  sortMenusByFrontmatterOrder: true,
  frontmatterOrderDefaultValue: 9999,
  // sortMenusByFrontmatterDate: false,
  // sortMenusOrderByDescending: false,
  // sortMenusOrderNumericallyFromTitle: false,
  // sortMenusOrderNumericallyFromLink: false,
  //
  // ============ [ MISC ] ============
  // debugPrint: false,
};

// https://vitepress.dev/reference/site-config
export default defineConfig(
  withSidebar(
    {
      // Site lives at the root of easywaterscape.williamfaucher.com.
      base: "/",
      title: "EasyWaterscape",
      description: "EasyWaterscape Documentation - Realtime Ocean & Water System for Unreal Engine 5",
      head: [
        ["link", { rel: "icon", href: "/favicon.ico" }],
        ["link", { rel: "apple-touch-icon", href: "/apple-touch-icon.png" }],
        [
          "meta",
          {
            property: "og:title",
            content: "EasyWaterscape - Realtime Ocean & Water System for Unreal Engine 5",
          },
        ],
        [
          "meta",
          {
            property: "og:description",
            content: "EasyWaterscape Documentation",
          },
        ],
                [
          "meta",
          {
            property: "og:image",
            content: "https://easywaterscape.williamfaucher.com/easyWaterscape_thumbnail_03.jpg",
          },
        ],
        ["meta", { property: "og:image:width", content: "1920" }],
        ["meta", { property: "og:image:height", content: "1080" }],
        ["meta", { property: "og:image:alt", content: "EasyWaterscape logo over a foggy sea with a buoy and sea stacks" }],
        [
          "meta",
          {
            name: "twitter:image",
            content: "https://easywaterscape.williamfaucher.com/easyWaterscape_thumbnail_03.jpg",
          },
        ],
        [
          "meta",
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
        ],
                [
          "script",
          {
            defer: "",
            src: "https://static.cloudflareinsights.com/beacon.min.js",
            "data-cf-beacon": '{"token": "a994ee135e1b47c1b4c28267309a7542"}',
          },
        ],  
      ],
      appearance: "force-dark",
      markdown: {
        config: (md) => {
          md.use(imageComparerPlugin);
        },
      },
      themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        logo: "/LogoEasyWaterscape_01.png",   // new
        siteTitle: false,    // new: hides the "EasyWaterscape" text
        nav: [
          { text: "Home", link: "/" },
          { text: "Discord", link: "https://discord.com/invite/PjY9wEq9wG" },
          { text: "Fab", link: "https://www.fab.com/listings/ddd28113-6f59-4ba3-bf60-ad7b1920a547" },
        ],
        search: {
          provider: "local",
        },
        outline: {
          level: [2, 3],
        },
        cleanUrls: true,
      },
    },
    sidebarOptions,
  ),
);
