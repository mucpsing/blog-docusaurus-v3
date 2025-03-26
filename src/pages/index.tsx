/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-02-13 22:20:06
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-03-26 15:42:25
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\index.tsx
 * @Description:  入口文件，首页
 */
import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";
import Start from "./Start";

import Home from "./Home";
// import Test from "./Test";

export default function HomePage() {
  return (
    <BrowserOnly fallback={<Start></Start>}>
      {/* <BrowserOnly fallback={<div>Loading 123333333 </div>}> */}
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
