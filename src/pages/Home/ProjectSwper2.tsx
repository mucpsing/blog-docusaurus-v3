/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-11 20:21:13
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-03-12 15:49:54
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\Home\ProjectSwper.tsx
 * @Description: 这是参考https://superpower.com/中相同功能的组件实现的
 */
import React, { useEffect, useRef } from "react";
import { COLOR_LIST } from "@site/src/store";

interface SwiperRowProps {
  colors: string[];
  offset: number;
}

// 单独封装一行
const SwiperRow: React.FC<SwiperRowProps> = ({ colors, offset }) => {
  useEffect(() => {});

  return (
    <div className="flex flex-grow flex-row gap-[14px] transition-all duration-500 custom-ease-smooth flex-1 hover:flex-[3]">
      {colors.map((color, index) => {
        const key = index + offset;
        return (
          <section
            key={key}
            className={[
              "rounded-3xl",
              "hover:flex-[3]",
              "flex flex-1 relative items-center justify-center",
              "transition-all duration-500 custom-ease-smooth",
            ].join(" ")}
            style={{
              border: `2px solid ${color}`,
            }}
          >
            <div className={["w-full h-full rounded-3xl", "xl:max-w-[300px] xl:max-h-[210px]"].join(" ")} style={{ backgroundColor: color }}></div>

            <div></div>
          </section>
        );
      })}
    </div>
  );
};

const ProjectSwper = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const halfCount = COLOR_LIST.length / 2;

  return (
    <div
      ref={containerRef}
      className={[
        "w-screen max-w-[1550px] box-border",
        "xl:h-[400px] lg:h-[360px] md:h-[320px] sm:h-[300px]",
        "mx-auto my-8 flex flex-col gap-[14px] px-8",
      ].join(" ")}
    >
      {/* 第一行 */}
      <SwiperRow colors={COLOR_LIST.slice(0, halfCount)} offset={0} />
      {/* 第二行 */}
      <SwiperRow colors={COLOR_LIST.slice(halfCount)} offset={halfCount} />
    </div>
  );
};

export default ProjectSwper;
