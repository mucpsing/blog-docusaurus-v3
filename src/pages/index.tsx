/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2024-02-21 08:43:33
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2024-02-28 16:57:16
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\index.tsx
 * @Description: 入口文件，首页
 */

import React from "react";
import Head from "@docusaurus/Head";

import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import HomepageFeatures from "@site/src/pages/Home/features";
import HomepageBody from "@site/src/pages/Home/index";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

if (ExecutionEnvironment.canUseDOM) {
  // As soon as the site loads in the browser, register a global event listener
  window.addEventListener("keydown", (e) => {
    if (e.code === "Period") {
      location.assign(location.href.replace(".com", ".dev"));
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    console.log("cps-scripts 112233 on loaded");
  });
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <Head>
        {/* 修复css不加载的问题 */}
        <link rel="stylesheet" href="/css/globalcss.css" />
      </Head>
      <div className="relative flex flex-col">
        <HomepageBody alignmentMode="horizontal" />
      </div>

      <div>
        <HomepageFeatures />
      </div>
    </Layout>
  );
}
