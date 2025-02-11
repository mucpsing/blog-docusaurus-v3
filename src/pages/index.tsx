/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2024-02-21 08:43:33
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-02-12 00:26:21
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\index.tsx
 * @Description: 入口文件，首页
 */

import React from "react";
import Head from "@docusaurus/Head";

// import Layout from "@site/src/theme/GlobalLayout";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import HomepageBody from "@site/src/pages/Home";
import HomepageFeatures from "@site/src/pages/Home/features";
// import Bubble from "@site/src/components/bubbleText/index_func2";
// import Bubble from "@site/src/components/bubbleText/index_new";
import Bubble from "@site/src/components/bubbleText";

import { useState } from "react";
import { useGlobalStore } from "@site/src/store";

export default function Home(): JSX.Element {
  const [colorIndex, _setColorIndex] = useGlobalStore("colorIndex");

  return (
    <Layout>
      <Head>
        {/* 修复css不加载的问题 */}
        <link rel="stylesheet" href={require("/css/globalcss.css").default} />
      </Head>

      <div className="relative flex flex-col" id="ccvb">
        <HomepageBody alignmentMode="horizontal" />

        {/* <Bubble></Bubble> */}
        <Bubble positionElementId="ccvb" top="60px" left="center" bubbleSize={10}></Bubble>

        <div>
          <div>{colorIndex}</div>
        </div>
      </div>

      <div>
        <HomepageFeatures />
      </div>
    </Layout>
  );
}
