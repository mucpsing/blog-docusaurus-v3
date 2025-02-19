/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-02-11 22:15:29
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-02-19 22:52:36
 * @FilePath: \cps-blog-docusaurus-v3\src\components\store\index.ts
 * @Description: 这是全局状态存储
 */
import { create } from "zustand";
import isMobile from "is-mobile";

export const DEFAULT_MAIN_COLOR = ["#FC1E4F", "#FFF43D", "#9FDA7F"];
export const DEFAULT_SUB_COLOR = ["#FF4058", "#F6B429", "#64D487"];

// document.addEventListener("visibilitychange", () => {
//   var isHidden = document.hidden;

//   if (isHidden) {
//     document.title = "死鬼，你去哪儿了！";
//     this.IS_CURRT_WEB_PAGE = false;
//   } else {
//     document.title = "死鬼，你终于回来拉！";
//     this.IS_CURRT_WEB_PAGE = true;
//   }
// });

export interface GlobalStore {
  colorIndex: number;
  setColorIndex: (newColorIndex: number) => void;
  switchColor: (newIndex?: number) => void;

  width: number;
  height: number;
  setSize: () => void;

  isMobile: boolean;
  setIsMobile: () => void;

  screenSize: "sm" | "md" | "lg" | "xl";
  setScreenSize: () => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  // 当前设备环境
  isMobile: false,
  setIsMobile: () => {
    const ismobile = isMobile();
    set(() => ({ isMobile: ismobile }));

    console.log("setIsMobile: ", { isMobile: ismobile });
  },

  // 当前屏幕尺寸，
  width: window.innerWidth,
  height: window.innerHeight,
  setSize: () => {
    set({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  },

  // 全局背景颜色索引
  colorIndex: 0,
  setColorIndex: (newColorIndex: number) => set(() => ({ colorIndex: newColorIndex })),
  switchColor: (newIndex: number | null = null) =>
    set((state) => {
      if (newIndex == null || !DEFAULT_MAIN_COLOR[newIndex]) newIndex = state.colorIndex + 1;

      return { colorIndex: DEFAULT_MAIN_COLOR[newIndex] ? newIndex : 0 };
    }),

  // 屏幕状态
  screenSize: "sm", // 默认值
  setScreenSize: () => {
    const width = window.innerWidth;
    let size;
    // Set the screen size based on the window width
    if (width < 640) {
      size = "sm";
    } else if (width >= 640 && width < 1024) {
      size = "md";
    } else if (width >= 1024 && width < 1280) {
      size = "lg";
    } else {
      size = "xl";
    }
    set({ screenSize: size });
  },
}));
