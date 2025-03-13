/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-11 20:21:13
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-03-13 22:48:57
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\Home\ProjectSwper.tsx
 * @Description: 这是参考https://superpower.com/中相同功能的组件实现的
 */
import React, { useEffect, useRef } from "react";
import { COLOR_LIST } from "@site/src/store";

interface SwiperRowProps {
  colors: string[];
  offset: number;
}

const IconRow: React.FC = () => {
  return <div></div>;
};
// 单独封装一行
const SwiperRow: React.FC<SwiperRowProps> = ({ colors, offset }) => {
  useEffect(() => {});

  const comTransCss = ["transition-all duration-500 custom-ease-smooth"].join(" ");

  return (
    <div className={["transition-all duration-500 custom-ease-smooth", "flex flex-grow flex-row gap-[14px] flex-1 hover:flex-[3]"].join(" ")}>
      {colors.map((color, index) => {
        const key = index + offset;
        return (
          <section
            key={key}
            className={[
              comTransCss,
              "rounded-3xl box-border group",
              "hover:flex-[3] hover:py-4",
              "flex flex-1 relative items-center justify-center",
            ].join(" ")}
            // style={{ border: `2px solid ${color}` }}
          >
            <div
              className={[
                comTransCss,
                "box-border w-full h-full rounded-3xl",
                "z-10",
                "xl:max-w-[330px]",
                "lg:max-w-[300px]",
                "md:max-w-[200px]",
                // "xl:max-w-[330px] group-hover:xl:max-h-[220px]",
                // "lg:max-w-[300px] group-hover:lg:max-h-[190px]",
                // "md:max-w-[200px] group-hover:md:max-h-[160px]",
              ].join(" ")}
              style={{ backgroundColor: color }}
            ></div>
            <div className="absolute flex w-full h-full">
              <div className="flex flex-col w-1/2 h-full">
                {/* 左上角 */}
                <div
                  className={[
                    comTransCss,
                    "flex justify-start items-center pl-4",
                    "h-full w-full opacity-0 group-hover:opacity-100",
                    "border-solid border-0 border-l-[0.5px] border-b-[0.5px] border-zinc-300",
                  ].join(" ")}
                >
                  <span className="text-xs">
                    ElementUI<br></br>
                    Vue2.x
                  </span>
                </div>
                {/* 左下角 */}
                <div
                  className={[
                    comTransCss,
                    "h-full w-full opacity-0 group-hover:opacity-100",
                    "border-solid border-0 border-l-[0.5px] border-zinc-300",
                  ].join(" ")}
                ></div>
              </div>
              <div className="flex flex-col w-1/2 h-full">
                {/* 右上角 */}

                <div
                  className={[
                    comTransCss,
                    "h-full w-full opacity-0 group-hover:opacity-100",
                    "border-solid border-0 border-r-[0.5px]  border-b-[0.5px] border-zinc-300",
                  ].join(" ")}
                ></div>

                {/* 右下角 */}
                <div
                  className={[
                    comTransCss,
                    "h-full w-full opacity-0 group-hover:opacity-100",
                    "border-solid border-0 border-r-[0.5px] border-zinc-300",
                  ].join(" ")}
                ></div>
              </div>
            </div>
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
        "xl:h-[400px] lg:h-[360px] md:h-[260px] sm:h-[200px]",
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
