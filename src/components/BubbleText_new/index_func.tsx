import React, { useState, useEffect, useRef, useCallback } from "react";
import TweenOne from "rc-tween-one";
import { throttle, type DebouncedFunc } from "lodash";

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
  transform: string | null;

  children: React.ReactNode[];
  boxAnim: Record<string, any>;
  isMouseEnter: boolean;
}

const LogoGather: React.FC<LogoGatherProps> = ({
  top = "center",
  left = "center",
  image = "/logo/capsion.png",
  width = 600,
  height = 200,
  bubbleSize = 10,
  bubbleSizeMin = 5,
  intervalTime = 8000,
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

  const gather = useRef(true);
  const interval = useRef<number | null>(null);
  const pointArray = useRef<{ x: number; y: number }[]>([]);
  const dom = useRef<HTMLDivElement | null>(null);
  const sideBox = useRef<HTMLDivElement | null>(null);
  const sideBoxComp = useRef<HTMLDivElement | null>(null);
  const positionElement = useRef<HTMLElement | null>(null);
  const resizeEvent = useRef<DebouncedFunc<() => boolean> | null>(null);

  const isInit = useRef(false);
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

  // 更新位置
  const updatePositions = useCallback(() => {
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
    if (oldStateString !== newStateString) setState((prevState) => ({ ...prevState, ...newState }));

    return true;
  }, [positionElementId, state, top, left, height, width]);

  const createPointData = useCallback(() => {
    let canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx?.clearRect(0, 0, width, height);
    canvas.width = width;
    canvas.height = height;
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
      const data = ctx?.getImageData(0, 0, width, height).data;
      if (data) setDataToDom(data, width, height);
      canvas.remove();
    };
    img.crossOrigin = "anonymous";
    img.src = image;
  }, [width, height, image]);

  const setDataToDom = (data: Uint8ClampedArray, w: number, h: number) => {
    pointArray.current = [];
    const children: React.ReactNode[] = [];
    for (let i = 0; i < w; i += bubbleSize) {
      for (let j = 0; j < h; j += bubbleSize) {
        if (data[(i + j * w) * 4 + 3] > 150) {
          pointArray.current.push({ x: i, y: j });
        }
      }
    }

    pointArray.current.forEach((item, i) => {
      const r = (Math.random() * bubbleSizeMin + bubbleSizeMin) * bubbleScale;
      const opacity = opacityMax ? opacityMax : Math.random() * opacitymin + opacitymin;

      const delay = Math.floor(Math.random() * (intervalTime / 3));
      const start = intervalTime / 2 - delay;

      const R = Math.round(Math.random() * 95 + 160);
      const G = Math.round(Math.random() * 95 + 160);
      const B = Math.round(Math.random() * 95 + 160);

      children.push(
        <TweenOne key={i} className="absolute rounded-[100%]" style={{ left: item.x, top: item.y }}>
          <div
            className="point rounded-[100%]"
            style={{
              width: r,
              height: r,
              opacity,
              backgroundColor: `rgb(${R},${G},${B})`,
              animation: `up-and-down-${(i % 2) + 1} ${start}ms ease-in-out ${delay}ms infinite`,
            }}
          ></div>
        </TweenOne>
      );
    });

    setState((prevState) => ({
      ...prevState,
      children,
      boxAnim: { opacity: 0, type: "from", duration: 800 },
    }));
  };

  const onMouseEnter = (e: React.MouseEvent) => {
    if (!e.target || !e.target.id?.startsWith("LogoGather")) return;

    setState(
      (prevState) => ({ ...prevState, isMouseEnter: true }),
      () => {
        if (!gather.current) updateTweenData();
        if (window.CPS_ENV.CPS_INTERVAL_LIST.length > 0) {
          window.CPS_ENV.CPS_INTERVAL_LIST.forEach((intervalID) => clearInterval(intervalID));
          window.CPS_ENV.CPS_INTERVAL_LIST = [];
        }
      }
    );
  };

  const onMouseLeave = (e: React.MouseEvent) => {
    if (!e.target || !e.target.id?.startsWith("LogoGather")) return;

    setState(
      (prevState) => ({ ...prevState, isMouseEnter: false }),
      () => {
        if (gather.current) updateTweenData();
        if (window.CPS_ENV.CPS_INTERVAL_LIST.length > 0) {
          window.CPS_ENV.CPS_INTERVAL_LIST.forEach((intervalID) => clearInterval(intervalID));
          window.CPS_ENV.CPS_INTERVAL_LIST = [];
        }

        window.CPS_ENV.CPS_INTERVAL_LIST.push(setInterval(updateTweenData, intervalTime));
      }
    );
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

  const gatherData = () => {
    const children = state.children.map((item) =>
      React.cloneElement(item, {
        animation: {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          delay: Math.random() * 500,
          duration: 800,
          ease: "easeInOutQuint",
        },
      })
    );
    setState((prevState) => ({ ...prevState, children }));
  };

  const disperseData = () => {
    const rect = dom.current!.getBoundingClientRect();
    const sideRect = sideBox.current!.getBoundingClientRect();

    const sideTop = sideRect.top - rect.top;
    const sideLeft = sideRect.left - rect.left;

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

    setState((prevState) => ({ ...prevState, children }));
  };

  useEffect(() => {
    dom.current = document.getElementById("logoContainer") as HTMLDivElement;
    sideBox.current = document.getElementById("LogoGather.hoverZone") as HTMLDivElement;

    init();

    resizeEvent.current = throttle(updatePositions, 200);
    window.addEventListener("resize", resizeEvent.current);

    return () => {
      window.CPS_ENV.CPS_INTERVAL_LIST.forEach((intervalID) => clearInterval(intervalID));
      window.removeEventListener("resize", resizeEvent.current!);
      resizeEvent.current?.cancel();
    };
  }, [init, updatePositions]);

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
        {state.children}
      </TweenOne>
    </div>
  );
};

export default LogoGather;
