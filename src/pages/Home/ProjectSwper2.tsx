/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-11 20:21:13
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-03-19 08:48:25
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\Home\ProjectSwper.tsx
 * @Description: 这是参考https://superpower.com/中相同功能的组件实现的
 * @demo https://codepen.io/ramzibach-the-styleful/pen/LYoYejb 无限滚动参考
 */
import React, { useEffect, useRef } from "react";
import { COLOR_LIST } from "@site/src/store";

import SvgLogoAntDesign from "@site/static/logo/AntDesign.svg";
import SvgLogoTDesign from "@site/static/logo/TDesign.svg";
import SvgLogoElement from "@site/static/logo/element-logo.svg";
import SvgLogoElementPlus from "@site/static/logo/element-plus-logo.svg";

import SvgLogoHeadless from "@site/static/logo/headless.svg";
import SvgLogoPython from "@site/static/logo/icons8-python.svg";
import SvgLogoNodejs from "@site/static/logo/nodejs.svg";
import SvgLogoReactjs from "@site/static/logo/reactjs.svg";

import SvgLogoTailwindCSS from "@site/static/logo/tailwindCSS-logo.svg";
import SvgLogoVue from "@site/static/logo/vue.svg";
import SvgLogoNust from "@site/static/logo/nust.svg";
import SvgLogoNest from "@site/static/logo/nest.svg";
import SvgLogoElectron from "@site/static/logo/electron3.svg";

import SvgLogoECharts from "@site/static/logo/ECharts-01.svg";

interface SwiperRowProps {
  colors: string[];
  offset: number;
}

const LogoIconRow: React.FC = () => {
  const maxWidth = 120;
  const height = 60;

  return (
    <div className="flex flex-wrap items-center justify-center gap-8 p-4">
      <SvgLogoAntDesign className="w-auto" style={{ height, maxWidth }} />
      <SvgLogoTDesign className="w-auto" style={{ height, maxWidth }} />
      <SvgLogoElement className="w-auto" style={{ height, maxWidth }} />
      <SvgLogoElementPlus className="w-auto" style={{ height, maxWidth }} />

      <SvgLogoHeadless className="w-auto" style={{ height, maxWidth }} />
      <SvgLogoPython className="w-auto" style={{ height, maxWidth }} />
      <SvgLogoNodejs className="w-auto" style={{ height, maxWidth }} />
      <SvgLogoReactjs className="w-auto" style={{ height, maxWidth }} />
      <SvgLogoTailwindCSS className="w-auto" style={{ height, maxWidth }} />

      <SvgLogoVue className="w-auto" style={{ height, maxWidth }} />
      <SvgLogoNust className="w-auto" style={{ height, maxWidth }} />
      <SvgLogoNest className="w-auto" style={{ height, maxWidth }} />
      <SvgLogoElectron className="w-auto" style={{ height, maxWidth }} />

      <SvgLogoECharts className="w-auto" style={{ height, maxWidth }} />
    </div>
  );
};

// 单独封装一行
const SwiperRow: React.FC<SwiperRowProps> = ({ colors, offset }) => {
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
          >
            <div
              className={[
                comTransCss,
                "box-border w-full h-full rounded-3xl",
                "z-10",
                "xl:max-w-[330px]",
                "lg:max-w-[300px]",
                "md:max-w-[200px]",
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
    <>
      <div className="h-[120px]">
        <LogoIconRow></LogoIconRow>
      </div>

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
    </>
  );
};

export default ProjectSwper;
