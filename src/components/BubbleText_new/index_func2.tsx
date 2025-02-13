import React, { useState, useEffect, useRef, useCallback } from "react";

import TweenOne, { Ticker } from "rc-tween-one";
import { throttle, type DebouncedFunc } from "lodash";
import type { IAnimObject } from "rc-tween-one";
import { cloneDeep, delay } from "lodash";

import style from "./styles.module.css";

type Point = {
  wrapStyle: {
    left: number;
    top: number;
  };
  style: {
    width: number;
    height: number;
    opacity: number;
    backgroundColor: string;
  };
  animation: IAnimObject;
};

interface LogoGatherProps {
  top?: number | string | "center" | "auto"; // 顶部间距，默认上下居中
  left?: number | string | "center" | "auto"; // 左部间距，默认左右居中
  image?: string;
  width?: number;
  height?: number;
  bubbleSize?: number;
  bubbleSizeMin?: number; // 泡泡的最小尺寸
  intervalTime?: number;
  bubbleScale?: number;
  positionElementId?: string;
  opacity?: number;
  opacityMax?: number;
  opacitymin?: number;
}

interface LogoGatherState {
  top: number | string;
  left: number | string;
  right: number | string;
  bottom: number | string;
  transform: string;

  children: React.ReactNode[];
  boxAnim: Record<string, any>;
  isMouseEnter: boolean;
}

declare global {
  interface Window {
    CPS_ENV: { CPS_INTERVAL_LIST: any[] };
  }
}

const defaultProps = {
  image: "/logo/capsion.png",
  width: 600,
  height: 200,
  top: "center",
  bubbleScale: 1,
  bubbleSize: 10,
  bubbleSizeMin: 5,
  intervalTime: 8000,
  positionElementId: "",
  opacityMax: 0.9,
  opacitymin: 0.7,
};

export const LogoGather: React.FC<LogoGatherProps> = ({
  top = "center",
  left = "center",
  image = "/logo/capsion.png",
  width = 600,
  height = 200,
  bubbleSize = 10,
  bubbleSizeMin = 5,
  intervalTime = 5000,
  bubbleScale = 1,
  positionElementId = "",
  opacityMax = 0.9,
  opacitymin = 0.7,
}) => {
  const [state, setState] = useState<LogoGatherState>({
    top: 0,
    left: 0,
    bottom: "unset",
    right: "unset",
    children: [],
    boxAnim: {},
    transform: null,
    isMouseEnter: false,
  });

  const data = {
    image: "/logo/capsion.png",
    w: 600, // 图片实际的宽度
    h: 200, // 图片实际的高度
    scale: 1.5, // 显示时需要的缩放比例
    pointSizeMin: 10, // 显示时圆点最小的大小
  };

  const gather = useRef(true);

  const pointArray = useRef<{ x: number; y: number }[]>([]);

  // 聚合：true，保证永远拿到的是最新的数据，useState是异步的，在interval中拿不到
  const gatherRef = useRef(true);

  const intervalRef = useRef<string | null>(null);
  const initAnimateTime = 800;

  // 数据变更，促使dom变更
  const [points, setPoints] = useState<Point[]>([]);
  // 同步 points 数据，保证永远拿到的是最新的数据，useState是异步的，在interval中拿不到
  const pointsRef = useRef(points);
  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  const dom = useRef<HTMLDivElement | null>(null);
  const sideBox = useRef<HTMLDivElement | null>(null);
  const sideBoxComp = useRef<HTMLDivElement | null>(null);
  const positionElement = useRef<HTMLElement | null>(null);

  let resizeEvent: DebouncedFunc<() => boolean | null>;

  let isInit = useRef(false);
  const IS_CURRT_WEB_PAGE = useRef(true);

  // 初始化
  const init = () => {
    if (!window.CPS_ENV) window.CPS_ENV = { CPS_INTERVAL_LIST: [] };

    let isDone = false;
    const taskID = setInterval(() => {
      isDone = updatePositions();

      if (isDone) {
        clearInterval(taskID);
        createPointData();
        isInit.current = true;

        setTimeout(() => {
          onMouseLeave({ target: { id: "LogoGather.init" } });
        }, intervalTime / 2);
      }
    }, 1000);
  };

  useEffect(() => {
    dom.current = document.getElementById("logoContainer") as HTMLDivElement;
    sideBox.current = document.getElementById("LogoGather.hoverZone") as HTMLDivElement;

    init();

    resizeEvent = throttle(updatePositions, 200);
    window.addEventListener("resize", resizeEvent);

    return () => {
      window.CPS_ENV.CPS_INTERVAL_LIST.forEach((intervalID) => clearInterval(intervalID));
      window.removeEventListener("resize", resizeEvent);
      resizeEvent.cancel();
      console.log("disperse~~");
    };
  }, []);

  const onMouseEnter = (e) => {
    if (!e.target || !e.target.id?.startsWith("LogoGather")) return console.warn("onMouseEnter: LogoGather not found");

    setState((prevState) => ({ ...prevState, isMouseEnter: true }));

    if (!gather.current) updateTweenData();

    if (window.CPS_ENV.CPS_INTERVAL_LIST.length > 0) {
      window.CPS_ENV.CPS_INTERVAL_LIST.forEach((intervalID) => clearInterval(intervalID));
      window.CPS_ENV.CPS_INTERVAL_LIST = [];
    }
  };

  const onMouseLeave = (e) => {
    if (!e.target || !e.target.id?.startsWith("LogoGather")) return;

    setState((prevState) => ({ ...prevState, isMouseEnter: false }));

    if (gather.current) {
      updateTweenData();
    }

    if (window.CPS_ENV.CPS_INTERVAL_LIST.length > 0) {
      window.CPS_ENV.CPS_INTERVAL_LIST.forEach((intervalID) => clearInterval(intervalID));
      window.CPS_ENV.CPS_INTERVAL_LIST = [];
    }

    window.CPS_ENV.CPS_INTERVAL_LIST.push(setInterval(updateTweenData, intervalTime));
  };

  const setDataToDom = (imgData: Uint8ClampedArray, w: number, h: number) => {
    const pointArr: { x: number; y: number; r: number }[] = [];
    const num = Math.round(w / 10);
    for (let i = 0; i < w; i += num) {
      for (let j = 0; j < h; j += num) {
        const index = (i + j * w) * 4 + 3;
        if (imgData[index] > 150) {
          pointArr.push({
            x: i,
            y: j,
            r: Math.random() * data.pointSizeMin + 12,
          });
        }
      }
    }

    const newPoints = pointArr.map((item, i) => {
      const opacity = Math.random() * 0.4 + 0.1;
      const R = Math.round(Math.random() * 95 + 160);
      const G = Math.round(Math.random() * 95 + 160);
      const B = Math.round(Math.random() * 95 + 160);

      const delayS = Math.floor(Math.random() * (intervalTime / 3));
      const startS = intervalTime / 2 - delay;

      const point: Point = {
        wrapStyle: { left: item.x * data.scale, top: item.y * data.scale },
        style: {
          width: item.r * data.scale,
          height: item.r * data.scale,
          opacity: opacity,
          // backgroundColor: `rgb(${Math.round(Math.random() * 95 + 160)}, 255, 255)`,
          backgroundColor: `rgb(${R},${G},${B})`,
        },
        animation: {
          y: (Math.random() * 2 - 1) * 10 || 5,
          x: (Math.random() * 2 - 1) * 5 || 2.5,
          delay: Math.random() * 1000,
          repeat: -1,
          duration: 3000,
          ease: "easeInOutQuad",
        },
      };
      return point;
    });

    delay(() => {
      setPoints(newPoints);
    }, initAnimateTime + 150);

    intervalRef.current = Ticker.interval(updateTweenData, intervalTime);
  };

  const createPointData = () => {
    let canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    canvas.width = width;
    canvas.height = height;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height).data;
      setDataToDom(data, width, height);
      canvas.remove();
    };
    img.crossOrigin = "anonymous";
    img.src = image;
  };

  const gatherData = () => {
    const children = state.children.map((item) =>
      React.cloneElement(item, {
        animation: {
          x: 0,
          y: 0,
          opacity: Math.random() * 0.2 + 0.1,
          scale: 1,
          delay: Math.random() * 500,
          duration: 800,
          ease: "easeInOutQuint",
        },
      })
    );

    setState((state) => ({ ...state, children }));
  };

  const disperseData = () => {
    const rect = dom.current!.getBoundingClientRect();
    const sideRect = sideBox.current!.getBoundingClientRect();

    const sideTop = sideRect.top - rect.top;
    const sideLeft = sideRect.left - rect.left;

    if (state.children.length == 0) return console.warn("禁告，没有子元素");

    const children = state.children.map((item) => {
      const r = (Math.random() * bubbleSizeMin + bubbleSizeMin) * 2;

      return React.cloneElement(item, {
        animation: {
          width: r,
          height: r,
          x: Math.random() * rect.width - sideLeft - item.props.style.left,
          y: Math.random() * rect.height - sideTop - item.props.style.top,
          opacity: opacityMax ? opacityMax : Math.random() * opacitymin + opacitymin,
          scale: Math.random() * 2.4 + 0.1,
          duration: Math.random() * 500 + 500,
          ease: "easeInOutQuint",
        },
      });
    });

    setState((state) => {
      return { ...state, children };
    });
  };

  const updatePositions = () => {
    if (!positionElement.current) {
      positionElement.current = document.getElementById(positionElementId || "") as HTMLElement;
      if (!positionElement.current) return false;
    }

    if (!dom.current) return false;

    const { top, left, transform } = state;
    const oldStateString = JSON.stringify({ top, left, transform });

    const positionRect = positionElement.current.getBoundingClientRect();
    const selfRect = sideBox.current!.getBoundingClientRect();

    const newState: { top?: number | string; left?: number | string; transform?: string } = { transform: `translate(0, 0)` };
    let translateX, translateY;

    if (top === "auto" || top === "center") {
      translateY = positionRect.height / 2 - height / 2;
    } else if (top) {
      newState.top = top;
    }

    if (["center", "auto"].includes(left as string)) {
      translateX = positionRect.width / 2 - width / 2;
    } else if (left) {
      newState.left = left;
    }

    if (translateX && translateY) {
      newState.transform = `translate(${translateX}px, ${translateY}px)`;
    } else if (translateX) {
      newState.transform = `translate(${translateX}px, 0)`;
    } else if (translateY) {
      newState.transform = `translate(0, ${translateY}px)`;
    }

    const newStateString = JSON.stringify(newState);
    if (oldStateString !== newStateString) {
      setState((prevState) => ({ ...prevState, ...newState }));
    }

    return true;
  };

  const updateTweenData = () => {
    if (!IS_CURRT_WEB_PAGE.current) return;

    if (gather.current) {
      if (state.isMouseEnter) return;

      disperseData();
    } else {
      gatherData();
    }

    gather.current = !gather.current;
  };

  return (
    <div id="logoContainer" className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <TweenOne
        animation={state.boxAnim}
        className={["absolute pointer-events-auto bg-orange-300/10 rounded-xl", isInit.current ? "shadow-md" : ""].join(" ")}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          top: state.top,
          left: state.left,
          bottom: state.bottom,
          right: state.right,
          transform: state.transform,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        id="LogoGather.hoverZone"
        ref={sideBoxComp}
      >
        {points.map((item, i) => (
          <TweenOne className={style.pointWrap} key={i} style={item.wrapStyle}>
            <TweenOne className={style.point} style={item.style} animation={item.animation} />
          </TweenOne>
        ))}
      </TweenOne>
    </div>
  );
};

export default LogoGather;
