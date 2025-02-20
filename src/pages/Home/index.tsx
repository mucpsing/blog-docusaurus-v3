/*
 * @Author: CPS holy.dandelion@139.com
 * @Date: 2023-02-07 19:55:02
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-02-20 15:10:20
 * @FilePath: \cps-blog\src\pages\index.tsx
 * @Description: 首页
 */
import React from "react";
import Head from "@docusaurus/Head";
// import Layout from "@site/src/theme/GlobalLayout";
import Layout from "@theme/Layout";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import HomepageSwiper from "./body";
import HomepageFeatures from "./features";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description="Description will go into a meta tag in <head />">
      <Head>
        {/* 修复css不加载的问题 */}
        <link rel="stylesheet" href={`${siteConfig.baseUrl}css/bubble.css`} />
      </Head>

      <div id="homepage.swiper" className="relative flex flex-col">
        <HomepageSwiper />
      </div>

      <div>
        <HomepageFeatures />
      </div>
    </Layout>
  );
}
