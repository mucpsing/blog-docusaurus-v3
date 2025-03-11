/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-03-11 20:21:13
 * @LastEditors: Capsion 373704015@qq.com
 * @LastEditTime: 2025-03-11 22:47:59
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\Home\ProjectSwper.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect, useRef } from "react";
import { COLOR_LIST } from "@site/src/store";
import { debounce, throttle } from "lodash";

const ProjectItem = ({ color }) => {
  return (
    // <div
    //   style={{ backgroundColor: color, maxWidth: `${500}px` }}
    //   className={["__ProjectSwperItem", "relative flex-1  hover:flex-[5]", "transition-all duration-[1200ms]"].join(" ")}
    // >
    //   <span>{color}</span>
    // </div>

    <div className={[].join(" ")}>
      <span>{color}</span>
    </div>
  );
};

// const ProjectSwper = () => {
//   // 示例图片地址，可以替换为实际图片
//   const conut = COLOR_LIST.length;
//   // mx-auto my-8 flex w-screen max-w-[1550px] flex-col gap-[14px] px-8
//   return (
//     <div
//       className={[
//         "flex flex-col gap-4 p-8 mx-auto",
//         "max-w-[1550px] h-[440px] w-screen ",
//         "overflow-hidden transition-all duration-500 ease-out",
//       ].join(" ")}
//     >
//       {/* 第一行 */}
//       <div className="flex flex-1 gap-4 hover:flex-[3] transition-all duration-700 ease-out" style={{ maxHeight: `${300}px` }}>
//         {COLOR_LIST.slice(0, conut / 2).map((color, index) => {
//           return <ProjectItem color={color} key={index} />;
//         })}
//       </div>

//       {/* 第二行 */}
//       <div className="flex flex-1 gap-4 hover:flex-[3] transition-all duration-700 ease-out">
//         {COLOR_LIST.slice(conut / 2, conut).map((color, index) => (
//           <ProjectItem color={color} key={index} />
//         ))}
//       </div>
//     </div>
//   );
// };

// 封装成自定义hook

const ProjectSwper = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const conut = COLOR_LIST.length / 2;
  const props = {
    maxHeight: 450,
  };

  const gapWidth = 14;
  const [size, setSize] = useState(Array.from({ length: COLOR_LIST.length }).map((_i, d) => ({ id: d, w: 100, h: 20, color: COLOR_LIST[d] })));

  const init = debounce(() => {
    if (!containerRef || !containerRef.current) return;

    const { clientWidth, clientHeight } = containerRef.current;

    const style = getComputedStyle(containerRef.current);
    const padding = {
      top: parseInt(style.paddingTop),
      right: parseInt(style.paddingRight),
      bottom: parseInt(style.paddingBottom),
      left: parseInt(style.paddingLeft),
    };

    // 计算可用空间时扣除padding
    const availableWidth = clientWidth - padding.left - padding.right;
    const newWidth = (availableWidth - padding.right - padding.left - gapWidth * (conut - 2)) / conut;
    const newHeight = (props.maxHeight - gapWidth - padding.top - padding.bottom) / 2;

    setSize((prev) =>
      prev.map((item) => ({
        ...item,
        w: newWidth,
        h: newHeight,
      }))
    );

    console.log({ w: newWidth, h: newHeight });
  }, 200);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      init();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div className={["w-screen max-w-[1550px] mx-auto", "my-8 flex flex-col gap-[14px] px-8"].join(" ")}>
      {/* 第一行 */}
      <div className="flex flex-grow flex-row gap-[14px] transition-all duration-300 ease-out" ref={containerRef}>
        {COLOR_LIST.slice(0, conut).map((color, index) => {
          const key = index;
          return (
            <div
              key={key}
              className={["transition-all duration-300 ease-out"].join(" ")}
              style={{ width: `${size[key].w}px`, height: `${size[key].h}px`, backgroundColor: color }}
            >
              <span>{key}</span>
            </div>
          );
        })}
      </div>

      {/* 第二行 */}
      <div className="flex flex-grow flex-row gap-[14px] transition-all duration-300 ease-out">
        {COLOR_LIST.slice(conut, COLOR_LIST.length).map((color, index) => {
          const key = index + conut;
          return (
            <div
              key={key}
              className={["transition-all duration-300 ease-out"].join(" ")}
              style={{ width: `${size[key].w}px`, height: `${size[key].h}px`, backgroundColor: color }}
            >
              <span>{key}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectSwper;
