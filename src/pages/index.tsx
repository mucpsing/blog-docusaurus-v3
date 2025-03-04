/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-02-13 22:20:06
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-03-03 18:05:13
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\index.tsx
 * @Description:  入口文件，首页
 */
import React from "react";
import Home from "./Home";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Test from "./Test";

export default function HomePage() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => {
        return <Home />;

        // if (process.env.NODE_ENV === "development") {
        //   return <Test />;
        // } else {
        //   return <Home />;
        // }
      }}
    </BrowserOnly>
  );
}
