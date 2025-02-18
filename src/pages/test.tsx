import React, { useRef, useEffect } from "react";
import Layout from "@site/src/theme/GlobalLayout";
import * as utils from "@site/src/components/BubbleText/utils";

export default function Home(): JSX.Element {
  const testRef = useRef<HTMLDivElement>(null);
  const test = (e) => {
    const dom = document.getElementById("out");
    const outRect = dom.getBoundingClientRect();
    const xy = [outRect.left, outRect.top];

    const randomPoint = utils.getRandomPoint([
      [0, 60],
      [760, 364],
    ]);

    const outRectT = utils.getRectangleIntoFour(outRect);
    const newXY = utils.getRegionPosition(randomPoint, outRect);
    const [x, y] = outRectT[newXY];

    const testRefElement = document.getElementById("testRef");
    testRefElement.style.top = `${randomPoint[1] - outRect.top}px`;
    testRefElement.style.left = `${randomPoint[0] - outRect.left}px`;

    console.log("生成范围： ", newXY);
    console.log("randomPoint: ", randomPoint);
    console.log("outRect: ", outRect);
    console.log("outRectT: ", outRectT);
  };
  return (
    <Layout>
      <div id="out" className={["relative w-[100vw] h-[50vh] bg-red-200 flex justify-center items-center"].join(" ")}>
        <div className={[" flex justify-center items-center flex-grow-[1] h-full", "flex flex-col"].join(" ")}>
          <div className={["bg-gray-400 w-full flex-grow-[1] text-center"].join(" ")}>1</div>
          <div className={["bg-gray-300 w-full flex-grow-[1] text-center"].join(" ")}>2</div>
        </div>
        <div className={[" flex justify-center items-center flex-grow-[1] h-full", "flex flex-col"].join(" ")}>
          <div className={["bg-yellow-400 w-full flex-grow-[1] text-center"].join(" ")}>1</div>
          <div className={["bg-yellow-300 w-full flex-grow-[1] text-center"].join(" ")}>2</div>
        </div>

        <div
          id="testRef"
          ref={testRef}
          className={["rounded-[100%] w-[20px] h-[20px] bg-red-500", "absolute top-1/2 left-1/2"].join(" ")}
          style={{ transform: "translate(-50%, -50%)" }}
        ></div>
        <button
          className="absolute bottom-0 w-[200px]"
          onClick={(e) => {
            test(e);
          }}
        >
          1
        </button>
      </div>
    </Layout>
  );
}
