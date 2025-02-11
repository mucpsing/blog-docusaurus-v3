/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-02-11 22:15:29
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-02-11 22:59:45
 * @FilePath: \cps-blog-docusaurus-v3\src\components\store\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { create } from "zustand";

export const DEFAULT_MAIN_COLOR = ["#FC1E4F", "#FFF43D", "#9FDA7F"];
export const DEFAULT_SUB_COLOR = ["#FF4058", "#F6B429", "#64D487"];

export interface GlobalStore {
  colorIndex: number;
  setColorIndex: (newColorIndex: number) => void;
}

export const _useGlobalStore = create<GlobalStore>((set) => ({
  colorIndex: 0,
  setColorIndex: (newColorIndex: number) => set(() => ({ colorIndex: newColorIndex })),
}));

function capitalizeFirstLetter(str: string): string {
  if (!str) return str; // 如果是空字符串，直接返回
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const useGlobalStore = <K extends keyof GlobalStore>(storeKey: K): [GlobalStore[K], (value: GlobalStore[K]) => void] => {
  const setKey = `set${capitalizeFirstLetter(storeKey)}` as keyof GlobalStore;

  return [_useGlobalStore((state) => state[storeKey]), _useGlobalStore((state) => state[setKey]) as any];
};
