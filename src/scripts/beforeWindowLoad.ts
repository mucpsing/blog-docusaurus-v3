/*
 * @Author: CPS holy.dandelion@139.com
 * @Date: 2023-04-04 17:09:26
 * @LastEditors: CPS holy.dandelion@139.com
 * @LastEditTime: 2024-02-21 23:35:22
 * @FilePath: \cps-blog-test\static\cps.js
 * @Description: 用来修复docs中，所有采用了本地服务器图片的链接指定的cdn
 */

const SEARCH_HOST = "localhost:45462";
const CND_HOST = "qiniu.capsion.top/blog";

/**
 * @description: 替换url中的host为指定的host
 * @param {URL} imgSrc img标签的src内容，必须是url格式
 * @param {string} searchHost 需要替换的url host
 * @return {URL}
 */
function fixLocalHostToCDN(inputHost, searchHost = SEARCH_HOST, newHost = CND_HOST) {
  try {
    // 当前host相同，可能是网络原因加载失败，此处进行忽略或者替换成通用cdn再尝试
    if (location.host == searchHost) return "";

    if (inputHost.indexOf(searchHost) > -1) {
      // 如果没有指定替换新的host，则替换为当前源
      if (newHost) {
        return inputHost.replace(searchHost, newHost);
      } else {
        return inputHost.replace(searchHost, location.host);
      }
    }
  } catch (error) {
    console.log("图片替换失败123：", inputHost);
    console.log({ error });
    return "";
  }
}

/**
 * @description: 检查当前的请求的url与源地址是否匹配
 * @param {Element} imgElement
 * @return {Boolean}
 */
function isSameDomain(inputUrlStr) {
  try {
    return new URL(inputUrlStr).host === location.host;
  } catch (error) {
    console.log("isSameDomain: error", error);
    return false;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("cps-scripts has loaded");
  document.addEventListener(
    "error",

    /* 捕获加载失败的图片标签，判断如果host不是指定的，则进行修正 */
    (e) => {
      const elem = e.target as any;
      if (elem.tagName.toLowerCase() === "img") {
        if (isSameDomain(elem.src)) return;

        const newSrc = fixLocalHostToCDN(elem.src, SEARCH_HOST, CND_HOST);

        // 这里有可能触发无限重新赋值同一个无法加载url的死循环
        if (newSrc && elem.src != newSrc) {
          console.log("尝试替换cdn图片: ", newSrc);
          elem.src = newSrc;
        }
      }
    },
    true
  );
});
