/*
 * @Author: CPS holy.dandelion@139.com
 * @Date: 2023-02-07 19:55:02
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-04-28 15:39:13
 * @FilePath: \cps-blog\src\pages\index.tsx
 * @Description: 首页
 */
import React, { useState } from "react";
import Head from "@docusaurus/Head";
// import Layout from "@site/src/theme/GlobalLayout";
import Layout from "@theme/Layout";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import HomepageSwiper from "./body";
import HomepageFeatures from "./features";
import Skill from "./Skill";
import ProjectSwper from "./ProjectSwper";
// import ProjectSwper from "./ProjectSwper";.

// import TT from "!!raw-loader!@site/src/pages/Home/test.mdx";
import TT from "@site/src/pages/Home/test.mdx";
import CodeBlock from "@theme/CodeBlock";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const [colorIndex, setColorIndex] = useState(0);

  return (
    <Layout title={siteConfig.title} description="Description will go into a meta tag in <head />">
      <Head>
        {/* 修复css不加载的问题 */}
        <link rel="stylesheet" href={`${siteConfig.baseUrl}css/bubble.css`} />
      </Head>

      {/* <CodeBlock language="jsx" title="/src/components/HelloCodeTitle.js" showLineNumbers>
        {`function HelloCodeTitle(props) {
  return <h1>Hello, {props.name}</h1>;
}`}
      </CodeBlock> */}

      <CodeBlock>
        <TT></TT>
      </CodeBlock>

      {/* <div id="homepage.swiper" className="relative flex flex-col">
        <HomepageSwiper colorIndex={colorIndex} setColorIndex={setColorIndex} />
      </div> */}

      {/* <div id="ccvbbbb" className={["w-[100vw] bg-slate-400 h-[550px]"].join(" ")}>
        <Skill colorIndex={colorIndex} />
      </div> */}

      <div>
        <ProjectSwper />
      </div>

      <div>
        <HomepageFeatures />
      </div>
    </Layout>
  );
}
