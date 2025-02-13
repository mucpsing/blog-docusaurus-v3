/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2024-02-21 08:43:33
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-02-13 22:52:18
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\index.tsx
 * @Description: 入口文件，首页
 */

import React from "react";
import Head from "@docusaurus/Head";

import Layout from "@site/src/theme/GlobalLayout";
import HomepageBody from "@site/src/pages/Home_old";
import HomepageFeatures from "@site/src/pages/Home_old/features";
// import Bubble from "@site/src/components/bubbleText";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import { useGlobalStore } from "@site/src/store";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description="Description will go into a meta tag in <head />">
      <Head>
        {/* 修复css不加载的问题 */}
        <link rel="stylesheet" href="/css/globalcss.css" />
      </Head>
      <header className="relative flex flex-col">
        <HomepageSwiper />
      </header>

      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
