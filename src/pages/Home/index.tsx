/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-02-11 23:11:21
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-02-12 00:36:33
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\Home\index_func.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useRef } from "react";
import HomeTitle from "./rightSide";
import { _useGlobalStore, DEFAULT_SUB_COLOR, useGlobalStore } from "@site/src/store";

/** 默认的 HomeImgSwiper 组件属性 */
export const DEFAULT_HOME_IMG_SWIPER_PROPS = {
  alignmentMode: "horizontal" as "horizontal" | "vertical",
  isAutoSwitch: true, // 是否自动切换背景色
  switchDelay: 20000, // 背景切换间隔（毫秒）
  className: "", // 允许外部传入额外的 class
  style: {},
};

/** 提取 props 的类型 */
export type HomeImgSwiperProps = typeof DEFAULT_HOME_IMG_SWIPER_PROPS;

const HomeImgSwiper: React.FC<Partial<HomeImgSwiperProps>> = (props) => {
  // 使用默认值填充 props
  const { alignmentMode, isAutoSwitch, switchDelay, className } = { ...DEFAULT_HOME_IMG_SWIPER_PROPS, ...props };
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // 存储定时器引用，防止重复调用

  // 这是全局的，不是useState;
  const switchColor = _useGlobalStore((state) => state.switchColor);
  const colorIndex = _useGlobalStore((state) => state.colorIndex);

  useEffect(() => {
    if (!isAutoSwitch) return;

    // 清除之前的定时器，防止多次触发
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => switchColor(), switchDelay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [colorIndex, isAutoSwitch, switchDelay]);

  return (
    <div
      className={[
        "cps-blog__titleTyping",
        `overflow-hidden relative w-full`,
        "flex justify-evenly items-center pt-60 pb-64 px-4 text-gray-700",
        className,
      ].join(" ")}
      style={{ height: "clamp(100px, calc(-60px + 100vh), 1200px)", ...props.style }}
    >
      {/* 标题组件 */}
      <div id="homeTitleComment" className="mt-10 home-title w-[400px]">
        <HomeTitle />
        <div>
          <button onClick={() => switchColor()}> 切换颜色 </button>
        </div>
      </div>

      {/* 背景色切换 */}
      {DEFAULT_SUB_COLOR.map((bgColor, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 w-full h-full z-[-1]"
          style={{
            background: bgColor,
            opacity: DEFAULT_SUB_COLOR[colorIndex] === bgColor ? 1 : 0,
            transition: "opacity .6s",
          }}
        ></div>
      ))}
    </div>
  );
};

export default HomeImgSwiper;
