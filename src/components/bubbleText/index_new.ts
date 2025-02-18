// import "./style.sass";
import { createCoverElement, getR } from "./utils";
import { throttle } from "lodash";

export interface BubbleProps {
  image?: string;
  width?: number;
  height?: number;
  offsetX?: number;
  offsetY?: number;
  bubbleSize?: number;
  bubbleCount?: number; // 泡泡数量
  bubbleSizeMin?: number; // 泡泡的最小尺寸
  intervalTime?: number;
  bubbleScale?: number;
  positionElementId?: string;
  opacity?: number;
  opacityMax?: number;
  opacitymin?: number;
  autoGather?: boolean;
}

export interface BubbleState {
  top: number | string;
  left: number | string;
  right: number | string;
  bottom: number | string;
  transform: string;

  children: any[];
  boxAnim: any;
  isMouseEnter: boolean;
  currtState: "dispersing" | "done" | "gathing";
}

export class CpsBubbleComponent {
  private DEFAULT_PROPS: BubbleProps = {
    positionElementId: "CpsBubble.positionElement", // 用于定位的元素id，组件会根据这个元素来进行绝对定位
    image: "/logo/capsion.png",
    offsetX: 0,
    offsetY: 0,
    width: 600,
    height: 200,
    bubbleScale: 1,
    bubbleSize: 10,
    bubbleCount: 10,
    bubbleSizeMin: 5,
    intervalTime: 8000, // 泡泡往复的时间，这里需要重构
    opacityMax: 0.9,
    opacitymin: 0.7,
    autoGather: true,
  };
  private props: BubbleProps = {};
  private pointArray = [];
  public INTERVAL_LIST = [];
  private id = "CpsBubble.warp";
  private bubbleRangeId = "body";

  private dom: any;
  private positionElement: HTMLElement;
  private observer: MutationObserver;
  private bubbleWarpElement: HTMLElement; // 用来批量挂载泡泡的容器，不起到任何作用，但是泡泡都在这个容器内部
  private bubbleDisperseRangeElement: HTMLElement;
  private bubbleElementList = []; // 存放所有泡泡div实例

  constructor(props) {
    this.props = { ...this.DEFAULT_PROPS, ...props };
    console.log("CpsBubbleComponent");

    this.init();
  }

  private isInit: boolean = false;
  public test = () => {
    const testButtonElement = document.createElement("button");
    testButtonElement.innerText = "Test";
    testButtonElement.onclick = () => this.onTest();
    Object.assign({ pointerEvents: "auto", width: "100px", heigh: "60px", backgroundColor: "green" }, testButtonElement.style);
    this.dom.appendChild(testButtonElement);
  };

  private onTest = () => {
    console.log("onTest: ", this.bubbleWarpElement);

    this.disperseData();
  };

  public init = () => {
    console.log("CpsBubbleComponent: init()");
    this.positionElement = document.getElementById(this.props.positionElementId);
    if (!this.positionElement) {
      console.error("CpsBubbleComponent: init() 未找到元素id");
      return false;
    }

    const bodyElement = document.body;
    const rect = this.positionElement.getBoundingClientRect();
    const baseStyle = {
      position: "absolute",
      left: `${rect.x}`,
      y: rect.y,
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
    };
    // 创建元素
    const hasDom = document.getElementById(this.id);
    if (hasDom) return;
    const dom = createCoverElement(this.props.positionElementId, baseStyle);
    this.dom = dom.element;
    this.dom.id = this.id;

    if (this.bubbleRangeId == "body") {
      this.bubbleDisperseRangeElement = document.body;
    } else {
      this.bubbleDisperseRangeElement = document.getElementById(this.bubbleRangeId);
    }

    // 创建 MutationObserver 来监听目标元素的变化
    // 观察目标元素的属性和子节点变化
    this.observer = new MutationObserver(this.onRise);
    this.observer.observe(this.positionElement, { attributes: true, childList: true, subtree: true });

    // 监听窗口大小变化，确保新元素尺寸同步更新
    window.addEventListener("resize", this.onRise);

    bodyElement.appendChild(this.dom);

    setTimeout(() => {
      this.createPointData();
      this.test();
    }, 1000);

    return true;
    // 这里必须使用setInterval防止setTimeout时，dom未完全生成
    // const taskID = setInterval(() => {
    //   isDone = this.updatePositions();

    //   if (isDone) {
    //     clearInterval(taskID);
    //     this.createPointData();
    //     this.isInit = true;
    //     setTimeout(() => {
    //       // BUG 如果这里直接调用 this.disperseData() 则会触发找不到元素id
    //       this.onMouseLeave({ target: { id: "LogoGather.init" } });

    //       if (this.props.autoGather) {
    //       }
    //     }, 2000);
    //   }
    // }, 100);
  };

  private onRise = throttle(() => this.updatePositions(), 200);
  public updatePositions = () => {
    console.log("触发updatePositions");
    const rect = this.positionElement.getBoundingClientRect();
    this.dom.style.width = `${rect.width}px`;
    this.dom.style.height = `${rect.height}px`;
    this.dom.style.left = `${rect.left}px`;
    this.dom.style.top = `${rect.top}px`;
  };

  public onUnmount = () => {
    window.removeEventListener("resize", this.updatePositions);
  };

  private createPointData = () => {
    const { width, height } = this.props;
    let canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    canvas.width = width;
    canvas.height = height;
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height).data;
      this.createBubble(data, width, height);
      canvas.remove();
    };
    img.crossOrigin = "anonymous";
    img.src = this.props.image;
  };

  private createBubble = (data: Uint8ClampedArray, w: number, h: number) => {
    this.pointArray = [];
    const DEFAULT_DELAY = 12000;

    const number = this.props.bubbleCount;
    for (let i = 0; i < w; i += number) {
      for (let j = 0; j < h; j += number) {
        if (data[(i + j * w) * 4 + 3] > 150) {
          this.pointArray.push({ x: i, y: j });
        }
      }
    }
    const bubbleStyleList = [];
    const bubbleWarp = document.createElement("div");
    Object.assign(bubbleWarp.style, { pointerEvent: "none", position: "absolute", top: 0, left: 0, width: "100vw", height: "0" });
    // Object.assign(bubbleWarp.style, { zIndex: 6, pointerEvent: "none", position: "absolute", top: 0, left: 0, width: "100vw", height: "0" });

    const rect = this.dom.getBoundingClientRect();
    this.pointArray.forEach((item, i) => {
      const r = (Math.random() * this.props.bubbleSizeMin + this.props.bubbleSizeMin) * this.props.bubbleScale;
      const opacity = this.props.opacity ? this.props.opacity : Math.random() * this.props.opacitymin + this.props.opacitymin;

      const delay = Math.floor(Math.random() * (DEFAULT_DELAY / 3));
      const start = DEFAULT_DELAY / 2 - delay;

      const R = Math.round(Math.random() * 95 + 160);
      const G = Math.round(Math.random() * 95 + 160);
      const B = Math.round(Math.random() * 95 + 160);

      const eachBubbleStyle = {
        position: "absolute",
        left: `${item.x + rect.left}px`,
        top: `${item.y + rect.top}px`,
        width: `${r}px`,
        height: `${r}px`,
        opacity: opacity,
        backgroundColor: `rgb(${R},${G},${B})`,
        borderRadius: "50%",
        animation: `up-and-down-${(i % 2) + 1} ${start}ms ease-in-out ${delay}ms infinite`,
        // ease: "easeInOutQuint",
        // willChange: "left, top",
        // transitionProperty: "left top",
        // transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        // transitionDuration: "800ms",
      };

      const eachBubbleElement = document.createElement("div");
      Object.assign(eachBubbleElement.style, eachBubbleStyle);

      this.bubbleElementList.push(eachBubbleElement);
      bubbleStyleList.push(eachBubbleStyle);
      bubbleWarp.appendChild(eachBubbleElement);
    });

    this.bubbleWarpElement = bubbleWarp;

    document.body.appendChild(bubbleWarp);
  };

  disperseData = () => {
    if (!this.bubbleDisperseRangeElement) return console.warn("bubble: 无法获取dom或者positionElement");

    const sideRect = this.bubbleDisperseRangeElement.getBoundingClientRect();

    // 计算样式
    const newStlyeList = this.bubbleElementList.map(() => ({
      left: `${getR(sideRect.left, sideRect.width)}px`,
      top: `${getR(sideRect.top, sideRect.height)}px`,
    }));

    // 更新样式
    requestAnimationFrame(() => {
      this.bubbleElementList.forEach((bubbleElement, i) => {
        Object.assign(bubbleElement.style, newStlyeList[i]);
      });
    });
  };

  // private updatePositions = (): boolean => {
  //   // console.log("updatePositions");

  //   // 不需要获取定位信息
  //   if (!this.props.positionElementId) {
  //     // console.log("不需要定位");
  //     return true;
  //   }

  //   if (!this.positionElement) {
  //     this.positionElement = document.getElementById(this.props.positionElementId);

  //     if (!this.positionElement) {
  //       console.log("获取元素失败");
  //       return false;
  //     }
  //   }

  //   if (!this.dom) {
  //     console.log("父级包裹元素实例读取失败");
  //     return false;
  //   }

  //   // 以下代码根据最近一个相对定位的父级元素重新计算泡泡散开时候的位置
  //   const { top, left, transform } = this.state;

  //   const positionElement = this.positionElement.getBoundingClientRect();
  //   const parent = this.dom.getBoundingClientRect();

  //   const translateX = this.props.width / 2 - positionElement.width / 2;
  //   const translateY = this.props.height / 2 - positionElement.height / 2;
  //   const newTransform = `translate(-${translateX}px, -${translateY}px)`;

  //   const newTop = positionElement.y - parent.y + this.props.offsetY;
  //   console.log("newTop: ", newTop);
  //   const newLeft = positionElement.x - parent.x + this.props.offsetX;
  //   const newState = { top: newTop, left: newLeft, transform: newTransform };

  //   const oldStateString = JSON.stringify({ top, left, transform });
  //   const newStateString = JSON.stringify(newState);

  //   if (oldStateString != newStateString) this.setState(newState);

  //   return true;
  // };
}
