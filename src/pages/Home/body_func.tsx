import React, { useState, useEffect, useRef } from "react";

import BannerAnim from "rc-banner-anim";
import QueueAnim from "rc-queue-anim";

import { ANIM_CONFIGS } from "./Swiper/index";
import { isSupportWebp } from "./Swiper/utils";
import dataArray, { type ICpsImgSwiperDataItem } from "./Swiper/data";
import type { ICpsImgSwiperProps } from "./Swiper/index";

import HomeTitle from "./rightSide";
import Bubble from "@site/src/components/BubbleText";
import ImgPreview from "@site/src/components/ImageSwiper/imagePreview";
import { useGlobalStore, DEFAULT_SUB_COLOR, DEFAULT_MAIN_COLOR } from "@site/src/store";

import CpsImgSwiper from "@site/src/components/ImageSwiper";

const Element = BannerAnim.Element;

const HomeImgSwiper: React.FC<ICpsImgSwiperProps> = (props) => {
  const [showInt, setShowInt] = useState(0);
  const [delay, setDelay] = useState(0);
  const [oneEnter, setOneEnter] = useState(false);
  const [webp, setWebp] = useState(props.useWebp ? isSupportWebp() : false);
  const { colorIndex, isMobile, switchColor } = useGlobalStore();

  const bannerImg = useRef<any>(null);
  const bannerText = useRef<any>(null);

  const autoSwitchInterID = useRef<any>(null);

  const currtAnim = useRef<any>(ANIM_CONFIGS.right);
  const DATA = dataArray;

  useEffect(() => {
    if (props.autoSwitch > 0) {
      setTimeout(() => {
        onRight("autoSwitch");
        autoSwitchInterID.current = setInterval(() => {
          onRight("autoSwitch");
        }, props.autoSwitch);
      }, 1000);
    }
    return () => {
      if (autoSwitchInterID.current) clearInterval(autoSwitchInterID.current);
    };
  }, [props.autoSwitch]);

  const onChange = () => {
    if (!oneEnter) {
      setDelay(300);
      setOneEnter(true);
    }
  };

  const onLeft = (e?) => {
    if (typeof e !== "string" && autoSwitchInterID.current) {
      clearInterval(autoSwitchInterID.current);
      autoSwitchInterID.current = null;
    }

    let currentInt = showInt;

    currtAnim.current = ANIM_CONFIGS.left;

    if (currentInt <= 0) {
      currentInt = dataArray.length - 1;
    } else {
      currentInt -= 1;
    }

    setShowInt(currentInt);
    bannerImg.current.prev();
    bannerText.current.prev();
  };

  const onRight = (e?) => {
    if (typeof e !== "string" && autoSwitchInterID.current) {
      clearInterval(autoSwitchInterID.current);
      autoSwitchInterID.current = null;
    }

    let currentInt = showInt;

    currtAnim.current = ANIM_CONFIGS.right;

    if (currentInt >= dataArray.length - 1) {
      currentInt = 0;
    } else {
      currentInt += 1;
    }

    setShowInt(currentInt);
    bannerImg.current.next();
    bannerText.current.next();
  };

  const switchPage = (index: number) => {
    const currentPage = showInt;

    if (currentPage === index) {
      return;
    } else if (currentPage < index) {
      onRight();
    } else {
      onLeft();
    }
  };

  const Items = () => {
    return (
      <div className="absolute w-full h-10 bottom-0 z-[1] flex items-center justify-center gap-4">
        {DATA.map((item, index) => {
          const { mainColor } = item;
          const key = index.toString();
          return (
            <div
              key={key}
              onClick={() => switchPage(index)}
              style={{ background: mainColor }}
              className={["border-2 border-solid border-white", "w-5 h-5 rounded-full cursor-pointer", "hover:w-10 transition-all duration-300"].join(
                " "
              )}
            ></div>
          );
        })}
      </div>
    );
  };

  const ImgShow = (target: ICpsImgSwiperDataItem) => {
    return (
      <div className="w-full mask">
        <img src={target.gif} alt="" />
      </div>
    );
  };

  return (
    <div
      className={[
        `overflow-hidden relative w-full h-[600px]`,
        "md:h-[650px]",
        "lg:h-[750px]",
        "xl:h-[900px]",
        "flex justify-evenly items-center pt-60 pb-64 px-4 text-gray-700",
      ].join(" ")}
      style={{ height: "clamp(100px, calc(-60px + 100vh), 1200px)" }}
    >
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

      <div id="homeTitleComment" className="home-title w-[400px]">
        <HomeTitle />
        <div>
          <button onClick={() => switchColor()}> 切换颜色 </button>
        </div>
      </div>

      <Bubble width={600} height={200} bubbleScale={1.5} positionElementId="postitionElement"></Bubble>

      <CpsImgSwiper
        mainColor={DEFAULT_MAIN_COLOR}
        subColor={DEFAULT_SUB_COLOR}
        autoSwitch={0}
        classNames={[
          "relative",
          "min-w-[300px] min-h-[250px]",
          "sm:w-[500px] sm:h-[300px]",
          "md:w-[500px] md:h-[400px]",
          "lg:w-[500px] lg:h-[350px]",
          "xl:w-[950px] xl:h-[650px]",
          "shadow-xl bg-white rounded-md overflow-hidden",
        ].join(" ")}
      ></CpsImgSwiper>

      <Items key="items" />
    </div>
  );
};

export default HomeImgSwiper;
