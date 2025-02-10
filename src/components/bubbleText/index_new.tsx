import React, { useRef, useState, useEffect } from "react";
import TweenOne, { Ticker } from "rc-tween-one";
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
    animation: string;
  };
  animation: IAnimObject;
};

const logoAnimate = () => {
  const data = {
    image: "/logo/capsion.png",
    w: 600, // 图片实际的宽度
    h: 200, // 图片实际的高度
    scale: 1, // 显示时需要的缩放比例
    pointSizeMin: 5, // 显示时圆点最小的大小
  };

  const intervalRef = useRef<string | null>(null);
  const intervalTime = 5000;
  const initAnimateTime = 800;

  const logoBoxRef = useRef<HTMLDivElement>(null);

  // 聚合：true，保证永远拿到的是最新的数据，useState是异步的，在interval中拿不到
  const gatherRef = useRef(true);

  // 数据变更，促使dom变更
  const [points, setPoints] = useState<Point[]>([]);

  // 同步 points 数据，保证永远拿到的是最新的数据，useState是异步的，在interval中拿不到
  const pointsRef = useRef(points);
  useEffect(() => {
    pointsRef.current = points;
  }, [points]);

  const setDataToDom = (imgData: Uint8ClampedArray, w: number, h: number) => {
    const pointArr: { x: number; y: number; r: number }[] = [];
    // const num = Math.round(w / 10);
    const num = 10;
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
      const opacity = Math.random() * 0.7 + 0.3;
      // const opacity = Math.random() * 0.7 + 0.9;

      const R = Math.round(Math.random() * 95 + 160);
      const G = Math.round(Math.random() * 95 + 160);
      const B = Math.round(Math.random() * 95 + 160);

      const delayS = Math.floor(Math.random() * (8000 / 3));
      const startS = 8000 / 2 - delayS;

      const point: Point = {
        wrapStyle: { left: item.x * data.scale, top: item.y * data.scale },
        style: {
          width: item.r * data.scale,
          height: item.r * data.scale,
          opacity: opacity,
          // backgroundColor: `rgb(${Math.round(Math.random() * 95 + 160)}, 255, 255)`,
          backgroundColor: `rgb(${R},${G},${B})`,
          animation: `up-and-down-${(i % 2) + 1} ${startS}ms ease-in-out ${delayS}ms infinite`,
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
    const { w, h } = data;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, w, h);
    canvas.width = w;
    canvas.height = h;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = data.image;
    img.onload = () => {
      // ctx.drawImage(img, 0, 0);
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);

      const data = ctx.getImageData(0, 0, w, h).data;
      setDataToDom(data, w, h);
    };
  };

  useEffect(() => {
    createPointData();

    return () => removeInterval();
  }, []);

  // 分散数据
  const disperseData = () => {
    if (!logoBoxRef.current || !logoBoxRef.current.parentElement) return;

    const rect = logoBoxRef.current.parentElement.getBoundingClientRect();
    const boxRect = logoBoxRef.current.getBoundingClientRect();
    const boxTop = boxRect.top - rect.top;
    const boxLeft = boxRect.left - rect.left;

    const newPoints = cloneDeep(pointsRef.current).map((item) => ({
      ...item,
      animation: {
        x: Math.random() * rect.width - boxLeft - item.wrapStyle.left,
        y: Math.random() * rect.height - boxTop - item.wrapStyle.top,
        opacity: Math.random() * 0.2 + 0.1,
        scale: Math.random() * 2.4 + 0.1,
        duration: Math.random() * 500 + 500,
        ease: "easeInOutQuint",
      },
    }));
    setPoints(newPoints);
  };

  // 聚合数据
  const gatherData = () => {
    const newPoints = cloneDeep(pointsRef.current).map((item) => ({
      ...item,
      animation: {
        x: 0,
        y: 0,
        opacity: Math.random() * 0.2 + 0.1,
        scale: 1,
        delay: Math.random() * 500,
        duration: 800,
        ease: "easeInOutQuint",
      },
    }));
    setPoints(newPoints);
  };

  const updateTweenData = () => {
    gatherRef.current ? disperseData() : gatherData();
    gatherRef.current = !gatherRef.current;
  };

  const removeInterval = () => {
    if (intervalRef.current) {
      Ticker.clear(intervalRef.current);
      intervalRef.current = null;
    }
  };
  
  const onMouseEnter = () => {
    console.log("onMouseEnter...");
    if (!gatherRef.current) {
      updateTweenData();
    }
    removeInterval();
  };

  const onMouseLeave = () => {
    console.log("onMouseLeave...");
    if (gatherRef.current) {
      updateTweenData();
    }
    intervalRef.current = Ticker.interval(updateTweenData, intervalTime);
  };

  return (
    <div id="logoContainer" className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <TweenOne
        animation={{ opacity: 0, type: "from", duration: 800 }}
        className={["absolute pointer-events-auto bg-orange-300/10 rounded-xl", "shadow-md"].join(" ")}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={logoBoxRef}
      >
        {points.map((item, i) => (
          <TweenOne className="absolute rounded-[100%]" key={i} style={item.wrapStyle}>
            <TweenOne className="point rounded-[100%]" style={item.style} animation={item.animation} />
            {/* <div className="point rounded-[100%]" style={item.style}></div> */}
          </TweenOne>
        ))}
      </TweenOne>
    </div>
  );
};

export default logoAnimate;
