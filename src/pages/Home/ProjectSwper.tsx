import React, { useState, useEffect, useRef } from "react";
import { DEFAULT_MAIN_COLOR } from "@site/src/store";

const ProjectItem = ({ color }) => {
  const selfRef = useRef<HTMLDivElement>(null);
  const [oldWidth, setOldWidth] = useState(0);
  const onHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (selfRef && selfRef.current) {
      console.log("oldWidth: ", selfRef.current.clientWidth);

      if (selfRef.current.clientWidth == oldWidth) {
        selfRef.current.style.width = `${selfRef.current.clientWidth * 1.5}px`;
      } else {
        selfRef.current.style.width = `${oldWidth}px`;
      }

      console.log("oldWidth: ", selfRef.current.style.width);
      console.log("color: ", color);
    }
  };

  useEffect(() => {
    console.log("触发");
    if (selfRef.current) setOldWidth(selfRef.current.clientWidth);
  }, []);

  //
  return (
    <div style={{ backgroundColor: color }} className="relative __ProjectSwperItem flex-grow-[1] transition-all" onMouseEnter={onHover} ref={selfRef}>
      <span>{color}</span>
    </div>
  );
};

const ProjectSwper = () => {
  // 示例图片地址，可以替换为实际图片
  const conut = DEFAULT_MAIN_COLOR.length;

  return (
    <div className="flex flex-col h-[400px] gap-4 overflow-hidden transition-all duration-500 ease-out">
      {/* 第一行 */}
      <div className="flex flex-1 gap-4">
        {DEFAULT_MAIN_COLOR.slice(0, conut / 2).map((color, index) => {
          console.log({ color });
          return <ProjectItem color={color} key={index} />;
        })}
      </div>

      {/* 第二行 */}
      <div className="flex flex-1 gap-4">
        {DEFAULT_MAIN_COLOR.slice(conut / 2, conut).map((color, index) => (
          <ProjectItem color={color} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProjectSwper;
