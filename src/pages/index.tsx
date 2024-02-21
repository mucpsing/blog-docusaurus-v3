/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2024-02-21 08:43:33
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2024-02-21 08:43:36
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\index.tsx
 * @Description: 入口文件，首页
 */

import React from "react";
import Head from "@docusaurus/Head";

import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

// import HomepageFeatures from "@site/src/components/HomepageFeatures";
// import HomepageSwiper from "@site/src/components/HomepageSwiper";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <Head>
        {/* 修复css不加载的问题 */}
        <link rel="stylesheet" href="/css/globalcss.css" />
      </Head>
      <header className="relative flex flex-col">
        {/* <HomepageSwiper /> */}
        <div>HomepageSwiper</div>
      </header>

      <main>
        {/* <HomepageFeatures /> */}
        <div>HomepageFeatures</div>
      </main>
    </Layout>
  );
}
