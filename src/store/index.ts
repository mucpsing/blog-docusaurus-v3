/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-02-11 22:15:29
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-02-12 00:37:49
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
}

export const _useGlobalStore = create<GlobalStore>((set) => ({
  colorIndex: 0,
  setColorIndex: (newColorIndex: number) => set(() => ({ colorIndex: newColorIndex })),
  switchColor: () =>
    set((state) => ({
      colorIndex: DEFAULT_MAIN_COLOR[state.colorIndex + 1] ? state.colorIndex + 1 : 0,
    })),
}));

function capitalizeFirstLetter(str: string): string {
  if (!str) return str; // 如果是空字符串，直接返回
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const useGlobalStore = <K extends keyof GlobalStore>(storeKey: K): [GlobalStore[K], (value: GlobalStore[K]) => void] => {
  const setKey = `set${capitalizeFirstLetter(storeKey)}` as keyof GlobalStore;

  return [_useGlobalStore((state) => state[storeKey]), _useGlobalStore((state) => state[setKey]) as any];
};
