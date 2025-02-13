/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2024-02-21 08:43:33
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-02-13 15:38:27
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\index.tsx
 * @Description: 入口文件，首页
 */

import React from "react";
import Head from "@docusaurus/Head";

import Layout from "@site/src/theme/GlobalLayout";
import HomepageBody from "@site/src/pages/Home";
import HomepageFeatures from "@site/src/pages/Home/features";
// import Bubble from "@site/src/components/bubbleText";

import { useGlobalStore } from "@site/src/store";

export default function Home(): JSX.Element {
  const { colorIndex, isMobile } = useGlobalStore();

  return (
    <Layout>
      <Head>
        {/* 修复css不加载的问题 */}
        <link rel="stylesheet" href={require("/css/globalcss.css").default} />
      </Head>
      <HomepageBody alignmentMode="horizontal" />

      {/* <div className="absolute w-full h-full" id="ccvb">
        <Bubble positionElementId="ccvb" top="60px" left="center" bubbleSize={10} bubbleCount={isMobile ? 15 : 10}></Bubble>
      </div> */}

      <div>
        <HomepageFeatures />
      </div>
    </Layout>
  );
}
