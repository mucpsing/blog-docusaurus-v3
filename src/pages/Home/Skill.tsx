import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { DEFAULT_SUB_COLOR, DEFAULT_MAIN_COLOR } from "@site/src/store";

const SkillComponents = ({ colorIndex: number }) => {

    
  return (
    <div className="w-full h-[650px] box">
      {DEFAULT_MAIN_COLOR.map((color, key) => {
        return (
          <div key={key} className="inline-block w-full h-full" style={{ backgroundColor: color }}>
            {key}
          </div>
        );
      })}
    </div>
  );
};
export default SkillComponents;
