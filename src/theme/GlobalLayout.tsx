/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-02-05 23:21:47
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-02-12 17:25:00
 * @FilePath: \cps-blog-docusaurus-v3\src\theme\GlobalLayout.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/theme/GlobalLayout.tsx
import React, { ReactNode, useEffect } from "react";

import Layout from "@theme/Layout";
import { useGlobalStore } from "@site/src/store";

const GlobalLayout: React.FC<{ children: ReactNode }> = (props) => {
  // 从 Zustand store 中获取当前窗口的宽度和高度
  const { setSize, setIsMobile } = useGlobalStore();

  // 使用 useEffect 来监听 window 的 resize 事件
  useEffect(() => {
    // 调用 setSize 更新状态
    const handleResize = () => setSize();
    setIsMobile();
    console.log("Layout app: onMounted");

    // 添加 resize 事件监听器
    window.addEventListener("resize", handleResize);

    // 清理副作用：组件卸载时移除事件监听
    console.log("Layout app: unMounted");
    return () => window.removeEventListener("resize", handleResize);
  }, [setSize]); // 只在 setSize 改变时重新绑定事件
  return <Layout {...props} />;
};

export default GlobalLayout;
