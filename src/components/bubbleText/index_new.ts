// import "./style.sass";
import { createCoverElement, getRandomColor, getRectangleIntoFour, getR, getRegionPosition, getRandomPoint } from "./utils";
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
  private bubbleRegionElement: HTMLElement; // 用来批量挂载泡泡的容器，不起到任何作用，但是泡泡都在这个容器内部
  private bubbleDisperseRangeElement: HTMLElement;
  private bubbleElementList = []; // 存放所有泡泡div实例

  private bubbleDisperseRange = {};

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
    console.log("onTest: ", this.bubbleRegionElement);

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
      // 创建泡泡并挂载到body
      this.createPointData();

      // 计算扩散区域
      const region = this.bubbleDisperseRangeElement.getBoundingClientRect();
      this.bubbleDisperseRange = getRectangleIntoFour(region);
      console.log(this.bubbleDisperseRange);
      this.test();
    }, 1000);

    return true;
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

    this.bubbleRegionElement = document.createElement("div");
    Object.assign(this.bubbleRegionElement.style, { pointerEvent: "none", position: "absolute", top: 0, left: 0, width: "100vw", height: "0" });

    const rect = this.dom.getBoundingClientRect();
    this.pointArray.forEach((item, i) => {
      const r = (Math.random() * this.props.bubbleSizeMin + this.props.bubbleSizeMin) * this.props.bubbleScale;
      const opacity = this.props.opacity ? this.props.opacity : Math.random() * this.props.opacitymin + this.props.opacitymin;

      const delay = Math.floor(Math.random() * (DEFAULT_DELAY / 3));
      const start = DEFAULT_DELAY / 2 - delay;

      const eachBubbleWarpStyle = {
        position: "absolute",
        borderRadius: "50%",
        left: `${item.x + rect.left}px`,
        top: `${item.y + rect.top}px`,
        transition: "all .8s cubic-bezier(0.4, 0, 0.2, 1) 0s",
      };

      const eachBubbleStyle = {
        width: `${r}px`,
        height: `${r}px`,
        opacity: opacity,
        backgroundColor: getRandomColor(),
        borderRadius: "50%",
        animation: `up-and-down-${(i % 2) + 1} ${start}ms ease-in-out ${delay}ms infinite`,
        willChange: "transform",
      };

      const eachBubbleElement = document.createElement("div");
      Object.assign(eachBubbleElement.style, eachBubbleStyle);

      const eachBubbleWarpElement = document.createElement("div");
      Object.assign(eachBubbleWarpElement.style, eachBubbleWarpStyle);

      eachBubbleWarpElement.appendChild(eachBubbleElement);

      this.bubbleElementList.push(eachBubbleWarpElement);
      this.bubbleRegionElement.appendChild(eachBubbleWarpElement);
    });

    document.body.appendChild(this.bubbleRegionElement);
  };

  disperseData = () => {
    if (!this.bubbleDisperseRangeElement) return console.warn("bubble: 无法获取dom或者positionElement");

    const rect = this.dom.getBoundingClientRect();
    const sideRect = this.bubbleDisperseRangeElement.getBoundingClientRect();
    console.log("sideRect: ", sideRect);

    const sideTop = sideRect.top - rect.top;
    const sideLeft = sideRect.left - rect.left;

    // 计算样式
    const newStlyeList = this.bubbleElementList.map((item) => {
      const { left, top } = item.getBoundingClientRect();
      const xyPosition = getRegionPosition([left, top], rect);

      let x, y;
      if (!this.bubbleDisperseRange[xyPosition]) {
        x = Math.random() * rect.width - sideLeft - left;
        y = Math.random() * rect.height - sideTop - top;
      } else {
        const coords = getRandomPoint(this.bubbleDisperseRange[xyPosition]);
        [x, y] = coords;
      }

      console.log({ xyPosition, x, y });
      return {
        transform: `translate(${x}px, ${y}px)`,
      };
    });

    // 更新样式
    this.bubbleElementList.forEach((bubbleElement, i) => {
      Object.assign(bubbleElement.style, newStlyeList[i]);
    });
  };
}
