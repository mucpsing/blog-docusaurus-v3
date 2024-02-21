import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

import * as path from "path";
import * as utils from "./src/scripts/utils";
// import { addHeaderTag } from "./src/scripts/customPlugs";

import { extractTagline } from "./src/scripts/taglineList";

/* 【首页】名人名言 */
const taglineList = extractTagline(path.resolve("./docs/【07】常识科普/社会真实/名人名言.md"));

/* 【上方导航】学习笔记 */
const excludeDirList = ["【18】副业开发", ".obsidian", "gg", ".trash"];
// const navBarDocsItems = {
//   label: "📔 学习笔记",
//   type: "dropdown",
//   position: "right",
//   items: utils.createNavItemByDir({ targetPath: path.resolve("./docs"), excludeDirList }),
// };

/* 【上方导航】生成项目页 相当于跳转/project路由 */
const defaultPath = ["./docs/【05】项目经历/原创作品/", "./docs/【05】项目经历/完整项目/"];
const defaultPrefix = ["/docs/【05】项目经历/原创作品", "/docs/【05】项目经历/完整项目"];
const outputPath = path.resolve("./data/project.js");
// (async () => await utils.createProjectDataByFolder(defaultPath, defaultPrefix, outputPath))();

const config: Config = {
  title: "Capsion",
  tagline: taglineList.join(","),
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://www.capsion.top",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "capsion", // Usually your GitHub org/user name.
  projectName: "cps-blog-docusaurus-v3", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // 开启mermaid（思维导图）支持
  markdown: { mermaid: true },
  themes: ["@docusaurus/theme-mermaid"],

  // 插入<scripts>标签
  scripts: [
    {
      // src: "/scripts/beforeWindowLoad.js", // 插入图片修复脚本
      src: "./src/scripts/beforeWindowLoad.ts", // 插入图片修复脚本
      async: false,
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        // blog: {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "My Site",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorial112233",
        },
        // { to: "/blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/facebook/docusaurus",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community123",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Blog",
              to: "/blog",
            },
            {
              label: "GitHub",
              href: "https://github.com/facebook/docusaurus",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
