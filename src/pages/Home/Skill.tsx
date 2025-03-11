import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DEFAULT_SUB_COLOR, DEFAULT_MAIN_COLOR } from "@site/src/store";

const SkillComponents = ({ colorIndex: number }) => {
  useEffect(() => {
    gsap.registerPlugin(useGSAP, ScrollTrigger);
  });

  return (
    <div>
      <div className="inline-flex flex-row h-full flex-nowrap">
        {DEFAULT_MAIN_COLOR.map((color, key) => {
          return (
            <div key={key} className="w-screen h-full" style={{ backgroundColor: color }}>
              {key}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default SkillComponents;
