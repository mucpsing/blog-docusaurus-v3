/*
 * @Author: CPS holy.dandelion@139.com
 * @Date: 2023-02-07 19:55:02
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-02-20 10:49:03
 * @FilePath: \cps-blog\src\pages\index.tsx
 * @Description: 首页
 */
import React, { useEffect } from "react";
import Head from "@docusaurus/Head";
import Layout from "@site/src/theme/GlobalLayout";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import HomepageSwiper from "./body";
import HomepageFeatures from "./features";

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  useEffect(() => {
    if (ExecutionEnvironment.canUseDOM) {
      // As soon as the site loads in the browser, register a global event listener
      window.addEventListener("keydown", (e) => {
        if (e.code === "Period") {
          location.assign(location.href.replace(".com", ".dev"));
        }
      });
    }
  }, []);

  return (
    <Layout title={siteConfig.title} description="Description will go into a meta tag in <head />">
      <Head>
        {/* 修复css不加载的问题 */}
        <link rel="stylesheet" href={`${siteConfig.baseUrl}css/globalcss.css`} />
      </Head>

      <div id="homepage.swiper" className="relative flex flex-col">
        <HomepageSwiper />
        <button>siteConfig.baseUrl</button>
      </div>

      <div>
        <HomepageFeatures />
      </div>
    </Layout>
  );
}
