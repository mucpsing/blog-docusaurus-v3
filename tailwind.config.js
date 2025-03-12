/*
 * @Author: cpasion-office-win10 373704015@qq.com
 * @Date: 2024-02-21 09:15:00
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2024-02-21 09:15:13
 * @FilePath: \cps-blog-docusaurus-v3\tailwind.config.js
 * @Description: tailwind配置
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      transitionTimingFunction: {
        // 添加自定义曲线（名称可自定义）
        "custom-ease-smooth": "cubic-bezier(0.15, 0.00, 0.00, 0.99)",

        // 可选：覆盖默认曲线
        // 'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)'
      },
    },
  },
  plugins: [],
};
