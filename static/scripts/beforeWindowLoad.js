/*
 * @Author: CPS holy.dandelion@139.com
 * @Date: 2023-04-04 17:09:26
 * @LastEditors: cpasion-office-win10 373704015@qq.com
 * @LastEditTime: 2024-02-26 10:44:01
 * @FilePath: \cps-blog-test\static\cps.js
 * @Description: 用来修复docs中，所有采用了本地服务器图片的链接指定的cdn
 */

const SEARCH_HOST = "localhost:45462";
const CND_HOST = "qiniu.capsion.top/blog";
const FIXED_LIST = [];

/**
 * @description: 检查当前的请求的url与源地址是否匹配
 * @param {Element} imgElement
 * @return {Boolean}
 */
function isSameDomain(inputUrlStr) {
  try {
    // const isSame = new URL(inputUrlStr).host === location.host;
    const isFixed = FIXED_LIST.indexOf(inputUrlStr) !== -1;

    // return isSame || isFixed;
    return isFixed;
  } catch (error) {
    console.log("isSameDomain: error", error);
    return false;
  }
}

/**
 * @description: 替换url中的host为指定的host
 * @param {URL} imgSrc img标签的src内容，必须是url格式
 * @param {string} searchHost 需要替换的url host
 * @return {URL}
 */
function fixLocalHostToCDN(inputUrlStr, searchHost = SEARCH_HOST, newHost = CND_HOST) {
  try {
    // 当前host相同，可能是网络原因加载失败，此处进行忽略或者替换成通用cdn再尝试
    // if (location.host == searchHost) return "";
    // 如果没有指定替换新的host，则替换为当前源
    if (inputUrlStr.indexOf(searchHost) > -1) {
      // 如果没有指定替换新的host，则替换为当前源
      return inputUrlStr.replace(searchHost, newHost);
    } else {
      return inputUrlStr.replace(location.host, newHost);
    }
    // if (inputHost.indexOf(searchHost) > -1) {
    //   // 如果没有指定替换新的host，则替换为当前源
    //   if (newHost) {
    //     return inputHost.replace(searchHost, newHost);
    //   } else {
    //     return inputHost.replace(searchHost, location.host);
    //   }
    // }

    // return "";
  } catch (error) {
    console.log("图片替换失败123：", inputHost);
    console.log({ error });
    return "";
  }
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("cps-scripts has loaded");

  document.addEventListener(
    "error",

    /* 捕获加载失败的图片标签，判断如果host不是指定的，则进行修正 */
    (e) => {
      const elem = e.target;

      // 仅修复<img/>标签
      if (elem.tagName.toLowerCase() === "img") {
        const img = e.target;

        // 已经修复过，不再进行修复
        if (isSameDomain(img.src)) return;

        const newSrc = fixLocalHostToCDN(img.src, SEARCH_HOST, CND_HOST);

        console.log("newSrc: ", newSrc);

        // 这里有可能触发无限重新赋值同一个无法加载url的死循环
        if (newSrc && img.src != newSrc) {
          console.log("尝试替换cdn图片: ", newSrc);
          img.src = newSrc;

          FIXED_LIST.push(newSrc);
        }
      }
    },
    true
  );
});
