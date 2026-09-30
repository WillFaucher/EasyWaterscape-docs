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
  // collapseDepth: 2,
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
      // Must match the GitHub repo name (site lives at <user>.github.io/EasyWaterscape-docs/).
      // Delete this line if you move the site to your own domain.
      base: "/EasyWaterscape-docs/",
      title: "EasyWaterscape",
      description: "EasyWaterscape Documentation - FFT ocean for Unreal Engine 5",
      head: [
        // TODO: add public/favicon.ico, then uncomment
        // ["link", { rel: "icon", href: "/favicon.ico" }],
        [
          "meta",
          {
            property: "og:title",
            content: "EasyWaterscape - FFT ocean for Unreal Engine 5",
          },
        ],
        [
          "meta",
          {
            property: "og:description",
            content: "EasyWaterscape documentation",
          },
        ],
        // TODO: add og:image / twitter:image once the site has a URL and a banner image
        [
          "meta",
          {
            name: "twitter:card",
            content: "summary_large_image",
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
        nav: [
          { text: "Home", link: "/" },
          { text: "Documentation", link: "/Getting started/" },
          // TODO: add your Fab listing link
          // { text: "Fab", link: "https://www.fab.com/listings/..." },
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
