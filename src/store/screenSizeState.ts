/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-02-14 14:57:19
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-02-14 15:00:55
 * @FilePath: \cps-blog-docusaurus-v3\src\store\screenSizeState.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { create } from "zustand";

// 定义屏幕尺寸的断点
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// 创建 Zustand 状态
const useScreenSizeStore = create((set) => ({
  screenSize: "sm", // 默认值
  setScreenSize: (size: string) => set({ screenSize: size }), // 更新尺寸的方法
}));

// 监听窗口大小变化并更新状态
const updateScreenSize = () => {
  const width = window.innerWidth;
  let size = "sm";

  if (width >= breakpoints.xl) {
    size = "xl";
  } else if (width >= breakpoints.lg) {
    size = "lg";
  } else if (width >= breakpoints.md) {
    size = "md";
  } else {
    size = "sm";
  }

  useScreenSizeStore.getState().setScreenSize(size);
};

// 初始化监听
window.addEventListener("resize", updateScreenSize);
updateScreenSize(); // 初始化时调用一次

export default useScreenSizeStore;
