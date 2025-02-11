/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-02-05 23:21:47
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-02-11 22:14:24
 * @FilePath: \cps-blog-docusaurus-v3\src\theme\GlobalLayout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/theme/GlobalLayout.tsx
import React, { ReactNode } from "react";
import { GlobalStateProvider } from "../context/GlobalStateContext";
import Layout from "@theme/Layout";

const GlobalLayout: React.FC<{ children: ReactNode }> = (props) => {
  return (
    <GlobalStateProvider>
      <Layout {...props} />
    </GlobalStateProvider>
  );
};

export default GlobalLayout;
