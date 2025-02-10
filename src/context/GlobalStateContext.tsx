/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-02-05 23:07:26
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-02-05 23:48:02
 * @FilePath: \cps-blog-docusaurus-v3\src\context\GlobalStateContext.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import React, { createContext, useContext, useState, ReactNode } from "react";

// 定义全局状态的类型
interface GlobalState {
  someKey: string;
}

// 定义上下文的类型
interface GlobalStateContextType {
  globalState: GlobalState;
  updateGlobalState: (newState: Partial<GlobalState>) => void;
}

// 创建全局状态的上下文
const GlobalStateContext = createContext<GlobalStateContextType | undefined>(undefined);

// 创建全局状态提供者组件
export const GlobalStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [globalState, setGlobalState] = useState<GlobalState>({
    someKey: "initialValue",
  });

  const updateGlobalState = (newState: Partial<GlobalState>) => {
    setGlobalState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return <GlobalStateContext.Provider value={{ globalState, updateGlobalState }}>{children}</GlobalStateContext.Provider>;
};

// 自定义 Hook 用于获取全局状态
export const useGlobalState = (): GlobalStateContextType => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error("useGlobalState must be used within a GlobalStateProvider");
  }
  return context;
};

// 导出 Consumer，方便类组件使用
// export const GlobalStateConsumer = GlobalStateContext.Consumer;
