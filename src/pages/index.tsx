/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2024-02-21 08:43:33
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-02-04 16:00:59
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\index.tsx
 * @Description: 入口文件，首页
 */

import React from "react";
import Head from "@docusaurus/Head";

import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import HomepageBody from "@site/src/pages/Home/index";
import HomepageFeatures from "@site/src/pages/Home/features";
import Bubble from "@site/src/components/bubbleText";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <Head>
        {/* 修复css不加载的问题 */}
        <link rel="stylesheet" href={require("/css/globalcss.css").default} />
      </Head>

      <div className="relative flex flex-col" id="ccvb">
        <HomepageBody alignmentMode="horizontal" />

        <Bubble positionElementId="ccvb" top="60px" left="center"></Bubble>
      </div>

      <div>
        <HomepageFeatures />
      </div>
    </Layout>
  );
}
