import React, { useState, useEffect, useRef } from "react";

// import BannerAnim from "rc-banner-anim";

import { ANIM_CONFIGS } from "./Swiper/index";
import { isSupportWebp } from "./Swiper/utils";
import dataArray, { type ICpsImgSwiperDataItem } from "./Swiper/data";
import type { ICpsImgSwiperProps } from "./Swiper/index";

import HomeTitle from "./homeTitle";
// import Bubble from "@site/src/components/BubbleText";
import ImgPreview from "@site/src/components/ImageSwiper/imagePreview";
import { useGlobalStore, DEFAULT_SUB_COLOR, DEFAULT_MAIN_COLOR } from "@site/src/store";

import CpsImgSwiper from "@site/src/components/ImageSwiper";
// import { CpsBubbleComponent } from "@site/src/components/BubbleText/index_new";

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

  const onNext = () => {
    const newIndex = colorIndex + 1;
    switchColor(newIndex);
    return newIndex;
  };

  const onPrev = () => {
    const newIndex = colorIndex - 1;
    switchColor(newIndex);
    return newIndex;
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
      className={["overflow-hidden relative", "w-full", "flex justify-evenly items-center text-gray-700"].join(" ")}
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
        <div>
          <button onClick={() => switchColor()}> 切换颜色 </button>
        </div>
      </div>

      <CpsImgSwiper
        mainColor={DEFAULT_MAIN_COLOR}
        subColor={DEFAULT_SUB_COLOR}
        autoSwitch={0}
        onNext={onNext}
        onPrev={onPrev}
        classNames={[
          "relative",
          "min-w-[300px] min-h-[250px]",
          "sm:w-[500px] sm:h-[300px]",
          "md:w-[500px] md:h-[400px]",
          "lg:w-[650px] lg:h-[450px]",
          "xl:w-[850px] xl:h-[550px]",
          "shadow-xl bg-white rounded-md overflow-hidden",
        ].join(" ")}
      ></CpsImgSwiper>

      {/* <Items key="items" /> */}
    </div>
  );
};

export default HomeImgSwiper;
