/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-02-20 09:21:04
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-02-27 12:40:15
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\Home\body.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from "react";
import HomeTitle from "./homeTitle";

import CpsImgSwiper from "@site/src/components/ImageSwiper";
import { DEFAULT_SUB_COLOR, DEFAULT_MAIN_COLOR } from "@site/src/store";

const HomeImgSwiper: React.FC = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const [isHorizontal, setIsHorizontal] = useState<boolean>(window.innerWidth > window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      // 判断屏幕是否是横向模式
      const isScreenHorizontal = window.innerWidth > window.innerHeight;
      setIsHorizontal(isScreenHorizontal);
    };

    // 监听屏幕大小变化
    window.addEventListener("resize", handleResize);

    // 在组件卸载时清理事件监听器
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onNext = () => {
    let newIndex = colorIndex + 1;
    if (newIndex >= DEFAULT_SUB_COLOR.length) {
      newIndex = 0;
    }
    setColorIndex(newIndex);
    return newIndex;
  };

  const onPrev = () => {
    let newIndex = colorIndex - 1;
    if (newIndex < 0) {
      newIndex = DEFAULT_SUB_COLOR.length - 1;
    }
    setColorIndex(newIndex);
    return newIndex;
  };

  // const ImgShow = (target: ICpsImgSwiperDataItem) => {
  //   return (
  //     <div className="w-full mask">
  //       <img src={target.gif} alt="" />
  //     </div>
  //   );
  // };

  return (
    <div
      className={["overflow-hidden relative", "w-full", "flex justify-evenly items-center text-gray-700", isHorizontal ? "" : "flex-col"].join(" ")}
      style={{ height: "clamp(100px, calc(-60px + 80vh), 1200px)" }}
      id="ccvb"
    >
      {DEFAULT_SUB_COLOR.map((bgColor, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 w-full h-full z-[-1]"
          style={{
            background: bgColor,
            opacity: DEFAULT_SUB_COLOR[colorIndex] === bgColor ? 1 : 0,
            transition: "opacity 1.4s",
          }}
        ></div>
      ))}

      <div id="homeTitleComment" className="relative home-title w-[600px]">
        <HomeTitle />
        <div className="text-center">
          <h1>当前屏幕是：{isHorizontal ? "横向" : "纵向"}</h1>
        </div>
      </div>

      <CpsImgSwiper
        mainColor={DEFAULT_MAIN_COLOR}
        subColor={DEFAULT_SUB_COLOR}
        autoSwitch={0}
        onNext={onNext}
        onPrev={onPrev}
        classNames={[
          "relative min-w-[300px]",
          isHorizontal
            ? "min-h-[250px] sm:w-[500px] sm:h-[300px] md:w-[500px] md:h-[400px] lg:w-[650px] lg:h-[450px] xl:w-[850px] xl:h-[550px]"
            : "min-h-[350px] w-10/12 h-2/5",
          "shadow-xl bg-white rounded-md overflow-hidden",
        ].join(" ")}
      ></CpsImgSwiper>

      {/* <Items key="items" /> */}
    </div>
  );
};

export default HomeImgSwiper;
