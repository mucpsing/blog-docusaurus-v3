/*
 * @Author: Capsion 373704015@qq.com
 * @Date: 2025-02-17 22:18:58
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2025-02-18 10:44:24
 * @FilePath: \cps-blog-docusaurus-v3\src\components\BubbleText\utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export function getR(min, max) {
  return Math.random() * (max - min) + min;
}

export function createCoverElement(targetId, style) {
  // 获取目标元素
  const targetElement = document.getElementById(targetId);
  if (!targetElement) {
    console.error(`Element with id "${targetId}" not found`);
    return null;
  }

  // 计算目标元素的准确位置和尺寸
  const rect = targetElement.getBoundingClientRect();
  const scrollX = window.scrollX || window.pageXOffset;
  const scrollY = window.scrollY || window.pageYOffset;

  // 创建覆盖层元素
  const cover = document.createElement("div");

  // 设置覆盖层样式
  Object.assign(
    cover.style,
    {
      // position: "absolute",
      left: `${rect.left + scrollX}px`,
      top: `${rect.top + scrollY}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      // zIndex: "9999",
      // pointerEvents: "none", // 允许穿透点击
      // boxSizing: "border-box",
      // backgroundColor: "rgba(255,0,0,0.3)", // 可视化调试用
      // border: "1px dashed #000", // 可视化调试用
    },
    style
  );

  // 处理可能影响定位的父级元素
  const isFixedPosition = getComputedStyle(targetElement).position === "fixed";
  if (isFixedPosition) {
    cover.style.position = "fixed";
    cover.style.left = `${rect.left}px`;
    cover.style.top = `${rect.top}px`;
  }

  // 处理边界溢出情况
  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

  // 检查元素是否部分在可视区域外
  const isPartiallyVisible = rect.top < viewportHeight && rect.bottom > 0 && rect.left < viewportWidth && rect.right > 0;

  if (!isPartiallyVisible) {
    console.warn("Target element is completely outside the viewport");
  }

  // 添加到文档
  document.body.appendChild(cover);

  // 返回引用以便后续操作
  return {
    element: cover,
    update: function () {
      // 更新位置的方法
      const newRect = targetElement.getBoundingClientRect();
      cover.style.left = `${newRect.left + (isFixedPosition ? 0 : scrollX)}px`;
      cover.style.top = `${newRect.top + (isFixedPosition ? 0 : scrollY)}px`;
      cover.style.width = `${newRect.width}px`;
      cover.style.height = `${newRect.height}px`;
    },
    remove: function () {
      cover.remove();
    },
  };
}
