/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2024-02-21 17:19:21
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2024-02-29 09:32:30
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\Home\swiper.tsx
 * @Description: 首页轮播组件，抽离自CpsImgSwiper组件，进行了定制化
 */

import React from "react";

import HomeTitle from "./rightSide";
import Bubble from "@site/src/components/bubbleText";

import data from "@site/src/components/ImageSwiper/data";
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
    this.autoSwitch(20000);
  }

  autoSwitch = (switchDelay: number) => {
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
    /**
     * @description: 位于组件中央的彩色轮播切换按钮
     */
    const Items = () => {
      return (
        <div className="absolute w-full h-10 bottom-[5%] z-[1] flex items-center justify-center gap-4">
          {data.map((item, index) => {
            const { mainColor } = item;
            const key = index.toString();
            return (
              <div
                key={key}
                onClick={(e) => this.switchPage(index)}
                style={{ background: mainColor }}
                className={[
                  "border-2 border-solid border-white",
                  "w-5 h-5 rounded-full cursor-pointer",
                  "hover:w-10 transition-all duration-300",
                ].join(" ")}
              ></div>
            );
          })}
        </div>
      );
    };

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
        <div id="homeTitleComment" className="home-title w-[400px]">
          <HomeTitle />
        </div>

        {/* 泡泡组件 */}
        <Bubble width={600} height={200} bubbleScale={1.5} positionElementId="postitionElement"></Bubble>

        {/* 轮播组件 */}
        <CpsImgSwiper
          showArrow={false}
          autoSwitch={0}
          page={this.state.page}
          mainColor={DEFAULT_MAIN_COLOR}
          subColor={DEFAULT_SUB_COLOR}
          classNames={[
            "md:w-[500px] md:h-[300px]",
            "lg:w-[600px] lg:h-[450px]",
            "xl:w-[850px] xl:h-[550px]",
            "w-[4 50px] h-[550px] min-w-[300px]",
            "bg-white rounded-md overflow-hidden relative",
          ].join(" ")}
        ></CpsImgSwiper>

        {/* 切页圆点 */}
        {/* <Items key="items" /> */}
      </div>
    );
  }
}
