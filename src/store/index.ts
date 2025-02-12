/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-02-11 22:15:29
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-02-12 17:27:24
 * @FilePath: \cps-blog-docusaurus-v3\src\components\store\index.ts
 * @Description: 这是全局状态存储
 */
import { create } from "zustand";

export const DEFAULT_MAIN_COLOR = ["#FC1E4F", "#FFF43D", "#9FDA7F"];
export const DEFAULT_SUB_COLOR = ["#FF4058", "#F6B429", "#64D487"];

export interface GlobalStore {
  colorIndex: number;
  setColorIndex: (newColorIndex: number) => void;
  switchColor: () => void;
  width: number;
  height: number;
  setSize: () => void;
}

export const useGlobalStore = create<GlobalStore>((set) => ({
  colorIndex: 0,
  width: window.innerWidth,
  height: window.innerHeight,
  setSize: () => {
    set({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  },

  setColorIndex: (newColorIndex: number) => set(() => ({ colorIndex: newColorIndex })),
  switchColor: () =>
    set((state) => ({
      colorIndex: DEFAULT_MAIN_COLOR[state.colorIndex + 1] ? state.colorIndex + 1 : 0,
    })),
}));
