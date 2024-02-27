/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2024-02-21 17:19:21
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2024-02-27 16:07:38
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\Home\swiper.tsx
 * @Description: 首页轮播组件，抽离自CpsImgSwiper组件，进行了定制化
 */

import React from "react";

import BannerAnim from "rc-banner-anim";

import CpsImgSwiper, { ANIM_CONFIGS } from "@site/src/components/ImageSwiper/index";
import { isSupportWebp } from "@site/src/components/ImageSwiper/utils";
import ImgPreview from "@site/src/components/ImageSwiper/imagePreview";
import dataArray from "@site/src/components/ImageSwiper/data";

import type { ICpsImgSwiperDataItem } from "@site/src/components/ImageSwiper/data";
import type { ICpsImgSwiperProps, ICpsImgSwiperState } from "@site/src/components/ImageSwiper/index";

import HomeTitle from "./rightSide";
import Bubble from "@site/src/components/bubbleText";

const Element = BannerAnim.Element;

interface SwiperStateT {
  bgColor: string[];
  bgColorIndex: number;
  webp: boolean;
  showInt: number;
  oneEnter: boolean;
  delay: number;
}
export default class HomeImgSwiper extends React.Component<ICpsImgSwiperProps, SwiperStateT> {
  bannerImg: any;
  bannerText: any;
  titleElement: Element;

  autoSwitchInterID: any;

  // 因为过渡效果分为左右两边，需要根据每次点击的按钮来重新指定是采用左边的过渡还是右边的过渡效果
  currtAnim: any = ANIM_CONFIGS.right;
  DATA: ICpsImgSwiperDataItem[] = [];

  static defaultProps = {
    alignmentMode: "horizontal",
    showText: false,
    showImg: true,
    showArrow: true,
    autoSwitch: 30000,
    imgPreview: true,
  };

  constructor(props) {
    super(props);

    this.DATA = dataArray;
    this.state = {
      showInt: 0,
      delay: 0,
      oneEnter: false,
      bgColor: ["#F6B429"],
      bgColorIndex: 0,
      webp: props.useWebp ? isSupportWebp() : false,
    };
  }

  componentWillUnmount(): void {
    if (this.autoSwitchInterID) clearInterval(this.autoSwitchInterID);

    this.setState = (state, callback) => null;
  }

  componentDidMount(): void {}

  onChange = () => {
    this.state.showInt;
    if (!this.state.oneEnter) {
      this.setState({ delay: 300, oneEnter: true });
    }
  };

  render() {
    return (
      <div
        className={[
          `overflow-hidden relative w-full h-[600px]`,
          "md:h-[650px]",
          "lg:h-[750px]",
          "xl:h-[900px]",
          "flex justify-evenly items-center pt-60 pb-64 px-4 text-gray-700",
        ].join(" ")}
        style={{ background: this.state.bgColor[this.state.bgColorIndex], transition: "background 1s" }}
      >
        {/* 标题组件 */}
        <div id="homeTitleComment" className="home-title w-[400px]">
          <HomeTitle />
        </div>

        {/* 泡泡组件 */}
        <Bubble width={600} height={200} bubbleScale={1.5} positionElementId="postitionElement"></Bubble>

        {/* 轮播组件 */}
        <CpsImgSwiper
          showArrow={false}
          autoSwitch={0}
          classNames={[
            "md:w-[500px] md:h-[400px]",
            "lg:w-[500px] lg:h-[350px]",
            "xl:w-[950px] xl:h-[650px]",
            "w-[4 50px] h-[550px] min-w-[300px]",
            "bg-white rounded-md overflow-hidden relative",
          ].join(" ")}
        ></CpsImgSwiper>
      </div>
    );
  }
}
