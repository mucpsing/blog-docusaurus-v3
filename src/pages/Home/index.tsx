/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2024-02-21 17:19:21
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-02-04 15:56:08
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\Home\swiper.tsx
 * @Description: 首页轮播组件，抽离自CpsImgSwiper组件，进行了定制化
 */

import React from "react";

import HomeTitle from "./rightSide";

import CpsImgSwiper, { DEFAULT_MAIN_COLOR, DEFAULT_SUB_COLOR } from "@site/src/components/ImageSwiper/index";
import type { AlignmentModeT } from "@site/src/components/ImageSwiper/index";
export default class HomeImgSwiper extends React.Component<
  { alignmentMode: AlignmentModeT },
  {
    bgColor: string[];
    bgColorIndex: number;
    page: number;
    isStartAutoSwitch: NodeJS.Timeout;
  }
> {
  static defaultProps = {
    alignmentMode: "horizontal",
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      bgColor: ["#F6B429"],
      bgColorIndex: 0,
      isStartAutoSwitch: null,
    };
  }

  componentWillUnmount(): void {
    this.setState = (state, callback) => null;
    clearInterval(this.state.isStartAutoSwitch);
  }

  componentDidMount(): void {
    this.switchOnce(20000);
  }

  switchOnce = (switchDelay: number) => {
    setTimeout(() => {
      if (!this.state.isStartAutoSwitch) {
        let isStartAutoSwitch = setInterval(() => {
          let newIndex = this.state.page + 1;

          if (!DEFAULT_SUB_COLOR[newIndex]) newIndex = 0; // 已到最后一个长度，恢复

          this.setState({ page: newIndex });
        }, switchDelay);
        this.setState({ isStartAutoSwitch });
      }
    }, 1000);
  };

  switchPage = (page: number) => {
    console.log("switchPage: ", page);
    this.setState({ page });
  };

  render() {
    return (
      <div
        className={[
          `overflow-hidden relative w-full h-[600px]`,
          "md:h-[650px]",
          "lg:h-[750px]",
          "xl:h-[850px]",
          "flex justify-evenly items-center pt-60 pb-64 px-4 text-gray-700",
        ].join(" ")}
        style={{ background: DEFAULT_SUB_COLOR[this.state.page], transition: "background 1s" }}
      >
        {/* 标题组件 */}
        <div id="homeTitleComment" className="mt-10 home-title w-[400px]">
          <HomeTitle />
        </div>
      </div>
    );
  }
}
