import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";
import process from "node:process";

import * as path from "path";
import * as scripts from "./src/scripts";
// import { addHeaderTag } from "./src/scripts/customPlugs";

import { extractTagline } from "./src/scripts/taglineList";
// import customPlugin from "./src/plugins/fixHostToCDN";

/* 【首页】名人名言 */
const taglineList = extractTagline(path.resolve("./docs/【07】常识科普/社会真实/名人名言.md"));

/* 排除的文件夹 */
const excludeDirList = ["【18】副业开发", ".obsidian", "gg", ".trash"];

const config: Config = {
  title: "Capsion | 个人博客 | 编程资料整理",
  tagline: taglineList.join(","),
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://www.capsion.top",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  projectName: "capsion-blog", // Usually your repo name.
  organizationName: "capsion-blog", // Usually your GitHub org/user name.
  // deploymentBranch: "pages",
  // trailingSlash: false,

  // onBrokenLinks: "throw",
  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: ["@docusaurus/plugin-ideal-image"],

  // 开启mermaid（思维导图）支持
  markdown: { mermaid: true },
  themes: [
    "@docusaurus/theme-mermaid",
    [
      "@easyops-cn/docusaurus-search-local",
      {
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,

        // For Docs using Chinese, it is recomended to set:
        language: ["en", "zh"],

        // If you're using `noIndex: true`, set `forceIgnoreNoIndex` to enable local index:
        // forceIgnoreNoIndex: true,
      },
    ],
  ],

  // 插入<scripts>标签，
  scripts: [
    // 修复本地host的开发图片跳转问题
    {
      src: "/scripts/beforeWindowLoad.js", // 插入图片修复脚本
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
      title: "🍌 Capsion Lab 🍌",
      logo: { alt: "My Site Logo", src: "img/logo.svg" },
      items: [
        { to: "/", label: "🏠 首页", position: "left" },

        {
          label: "📔 笔记",
          type: "dropdown",
          position: "left",
          items: scripts.createNavItemByDir({ targetPath: path.resolve("./docs"), excludeDirList }),
        },

        { type: "search", position: "left" },

        // {
        //   type: "dropdown",
        //   label: "🧪 我的实验",
        //   position: "left",
        //   items: [
        //     {
        //       to: "/sample/jiuhao",
        //       label: "🛵 真智能自电",
        //     },
        //     {
        //       to: "/sample/ai",
        //       label: "🤖 AI模特换装",
        //     },
        //   ],
        // },

        {
          label: "💼 作品案例",
          position: "right",
          to: "/project",
        },

        {
          type: "dropdown",
          label: "🤸 联系我",
          position: "right",
          items: [
            {
              type: "html",
              className: "dropdown-archived-versions",
              value: "<b>我的代码</b>",
            },
            {
              href: "https://gitee.com/capsion/capsion",
              label: "Gitee",
            },
            {
              href: "https://github.com/mucpsing/mucpsing",
              label: "GitHub",
            },

            {
              type: "html",
              value: '<hr class="dropdown-separator">',
            },
            // {
            //   type: "html",
            //   className: "dropdown-archived-versions",
            //   value: "<b>个人信息</b>",
            // },
            {
              href: "https://gitee.com/capsion/resume",
              label: "📃 个人简历",
            },
          ],
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "NoteBooks",
          items: [
            {
              label: "Blog",
              to: "/docs",
            },
          ],
        },
        {
          title: "Community",
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
              label: "Gitee",
              href: "https://gitee.com/capsion/capsion",
            },
            {
              label: "GitHub",
              href: "https://github.com/mucpsing/mucpsing",
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

if (process.env.PAGE_TYPE && process.env.PAGE_TYPE == "github") {
  const githubConfig = {
    url: "https://mucpsing.github.io",
    baseUrl: "/blog-docusaurus-v3/",
    projectName: "blog-docusaurus-v3", // Usually your repo name.
    organizationName: "mucpsing", // Usually your GitHub org/user name.
    deploymentBranch: "pages",
    scripts: [
      {
        src: "/blog-docusaurus-v3/scripts/beforeWindowLoad.js", // 插入图片修复脚本
      },
    ],
  };

  Object.assign(config, githubConfig);
}

export default config;
