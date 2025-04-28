/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2025-03-04 08:47:28
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-04-28 15:14:09
 * @FilePath: \cps-blog-docusaurus-v3\src\pages\Home\Skill.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
      <div className="flex-row h-full flex-nowrap">
        {DEFAULT_MAIN_COLOR.map((color, key) => {
          return (
            <div key={key} className="w-screen h-full" style={{ backgroundColor: color }}>
              {key}
            </div>
          );
        })}
      </div>

      <div></div>
    </div>
  );
};
export default SkillComponents;
