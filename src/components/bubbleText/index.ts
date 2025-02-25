import * as utils from "./utils";
import { throttle, debounce } from "lodash";

export interface BubbleProps {
  DEBUG?: boolean;
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
  autoSwitch?: boolean;
  bubbleRangeId?: string;
  hoverGather?: boolean;
}

export class CpsBubbleComponent {
  private DEFAULT_PROPS: BubbleProps = {
    DEBUG: false,
    positionElementId: "CpsBubble.positionElement", // 用于定位的元素id，泡泡文字会在这个元素的范围内生成
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
    autoSwitch: true,
    bubbleRangeId: "body",
    hoverGather: true,
  };
  private props: BubbleProps = {};
  private pointArray = [];
  public INTERVAL_LIST = [];
  private id = "CpsBubble";

  private dom: HTMLElement; // 组成字母的范围参考元素
  private positionElement: HTMLElement;
  private observer: MutationObserver;
  private bubbleRegionElement: HTMLElement; // 用来批量挂载泡泡的容器，不起到任何作用，但是泡泡都在这个容器内部
  private bubbleDisperseRangeElement: HTMLElement;
  private bubbleElementList: HTMLDivElement[] = []; // 存放所有泡泡div实例
  private isGather = true;

  private resizeGatherIntervalID: NodeJS.Timeout;
  private domResizeObserver: ResizeObserver;

  constructor(props) {
    this.props = { ...this.DEFAULT_PROPS, ...props };
    if (this.props.DEBUG) console.log("CpsBubbleComponent create");

    this.init();
  }

  public test = () => {
    // 按钮1
    const baseStyle = { pointerEvents: "auto", width: "100px", heigh: "60px", backgroundColor: "green" };
    const testButtonElement = document.createElement("button");
    testButtonElement.innerText = "切换";
    testButtonElement.onclick = () => this.onTest();
    Object.assign(baseStyle, testButtonElement.style);
    this.dom.appendChild(testButtonElement);

    // 按钮2
    const testButtonElement2 = document.createElement("button");
    testButtonElement2.innerText = "destroy";
    testButtonElement2.onclick = () => {
      this.destroy();

      // this.init();
    };
    Object.assign(baseStyle, testButtonElement2.style);
    this.dom.appendChild(testButtonElement2);
  };

  private onTest = () => {
    if (this.props.DEBUG) console.log("onTest: ");

    this.switch();
  };

  public init = () => {
    if (this.props.DEBUG) console.log("CpsBubbleComponent: init()");

    this.positionElement = document.getElementById(this.props.positionElementId);
    if (!this.positionElement) {
      console.error("CpsBubbleComponent: init() 未找到定位元素:positionElement");
      return false;
    }

    const rect = this.positionElement.getBoundingClientRect();
    const baseStyle = {
      position: "absolute",
      left: `${rect.x}`,
      y: rect.y,
      width: `${this.props.width}px`,
      height: `${this.props.height}px`,
    };

    // 创建元素
    const existingDom = document.getElementById(this.id);
    if (existingDom) {
      if (this.props.DEBUG) console.warn("页面已经存在对应id元素");
      return;
    }

    this.dom = utils.createCoverElement(this.props.positionElementId, baseStyle).element;
    this.dom.id = this.id;
    if (this.props.hoverGather) {
      this.dom.className = "bubbleWarp";
      this.dom.onmouseenter = this.gatherData;
      this.dom.onmouseleave = this.disperseData;
    }

    if (this.props.bubbleRangeId == "body") {
      this.bubbleDisperseRangeElement = document.body;
    } else {
      this.bubbleDisperseRangeElement = document.getElementById(this.props.bubbleRangeId);
    }

    // 创建 MutationObserver 来监听目标元素的变化
    // 观察目标元素的属性和子节点变化
    this.observer = new MutationObserver(this.onRise);
    this.observer.observe(this.positionElement, { attributes: true, childList: true, subtree: true });

    // 监听窗口大小变化，确保新元素尺寸同步更新
    window.addEventListener("resize", this.onRise);

    // 默认将背景挂载到body上
    document.body.appendChild(this.dom);

    setTimeout(() => {
      // 创建泡泡并挂载到body
      this.createPointData();

      // 添加DEBUG控制按钮
      if (this.props.DEBUG) this.test();
    }, 1000);

    return true;
  };

  public switch = () => {
    this.isGather ? this.disperseData() : this.gatherData();

    this.isGather = !this.isGather;
  };

  public onRise = throttle(() => this.updatePositions(), 200);
  public onResizeDisperseData = throttle(() => {
    this.disperseData();
  }, 10000);

  public updatePositions = () => {
    if (this.props.DEBUG) console.log("触发  updatePositions");
    if (this.resizeGatherIntervalID) clearTimeout(this.resizeGatherIntervalID);

    // 进行扩散
    if (this.isGather) this.disperseData();

    const rect = this.positionElement.getBoundingClientRect();
    this.dom.style.width = `${rect.width}px`;
    this.dom.style.height = `${rect.height}px`;
    this.dom.style.left = `${rect.left + this.props.offsetX}px`;
    this.dom.style.top = `${rect.top + this.props.offsetY}px`;

    // 进行收集
    this.resizeGatherIntervalID = setTimeout(() => {
      this.gatherData();
    }, 2000);
  };

  public destroy = () => {
    this.bubbleRegionElement.style.opacity = "0";

    window.removeEventListener("resize", this.onRise);

    this.onResizeDisperseData.cancel();
    if (this.dom) document.body.removeChild(this.dom);
    if (this.bubbleRegionElement) document.body.removeChild(this.bubbleRegionElement);

    setTimeout(() => {
      if (this.props.DEBUG) console.log("destroy::");
    }, 100);
  };

  private createPointData = () => {
    const rect = this.positionElement.getBoundingClientRect();

    const width = Math.trunc(rect.width);
    const height = Math.trunc(rect.height);

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
    this.bubbleRegionElement.id = "CpsBubble.bubbleRegionElement";
    const transition = "all .8s cubic-bezier(0.4, 0, 0.2, 1) 0s";
    Object.assign(this.bubbleRegionElement.style, {
      position: "absolute",
      transition,
      pointerEvent: "none",
      top: 0,
      left: 0,
      width: "100vw",
      height: "0",
      opacity: 0,
    });

    const rect = this.dom.getBoundingClientRect();
    const offsetX = rect.left + this.props.offsetX;
    const offsetY = rect.top + this.props.offsetY;

    this.pointArray.forEach((item, i) => {
      const r = (Math.random() * this.props.bubbleSizeMin + this.props.bubbleSizeMin) * this.props.bubbleScale;
      const opacity = this.props.opacity ? this.props.opacity : Math.random() * this.props.opacitymin + this.props.opacitymin;

      const delay = Math.floor(Math.random() * (DEFAULT_DELAY / 3));
      const start = DEFAULT_DELAY / 2 - delay;

      const eachBubbleWarpStyle = {
        position: "absolute",
        borderRadius: "50%",
        left: `${item.x + offsetX}px`,
        top: `${item.y + offsetY}px`,
        transition,
        pointerEvents: "none",
        willChange: "transform",
        opacity: 1,
      };

      const eachBubbleStyle = {
        width: `${r}px`,
        height: `${r}px`,
        opacity,
        backgroundColor: utils.getRandomColor(),
        borderRadius: "50%",
        animation: `up-and-down-${(i % 2) + 1} ${start}ms ease-in-out ${delay}ms infinite`,
        pointerEvents: "none",
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
    setTimeout(() => (this.bubbleRegionElement.style.opacity = "1"));
  };

  disperseData = () => {
    if (!this.bubbleDisperseRangeElement) return console.warn("bubble: 无法获取dom或者positionElement");

    // 获取泡泡的扩散范围
    const sideRect = this.bubbleDisperseRangeElement.getBoundingClientRect();

    // 计算样式
    const newStlyeList = this.bubbleElementList.map((item) => {
      const { left, top } = item.getBoundingClientRect();

      let coords = utils.getRandomPointByDOMRect(sideRect);
      while (
        coords[0] > sideRect.width + sideRect.left + this.props.bubbleSizeMin ||
        coords[1] > sideRect.height + sideRect.top + this.props.bubbleScale
      ) {
        coords = utils.getRandomPointByDOMRect(sideRect);
      }
      const offsetX = coords[0] - left;
      const offsetY = coords[1] - top;

      return { transform: `translate(${offsetX}px, ${offsetY}px)` };
    });

    // 更新样式
    requestAnimationFrame(() => {
      this.bubbleElementList.forEach((bubbleElement, i) => {
        Object.assign(bubbleElement.style, newStlyeList[i]);
        this.isGather = false;
      });
    });
  };

  gatherData = () => {
    requestAnimationFrame(() => {
      const rect = this.positionElement.getBoundingClientRect();

      this.bubbleElementList.forEach((bubbleElement, i) => {
        const newStyle: any = {
          transform: `translate(${0 + this.props.offsetX},${0 + this.props.offsetY})`,
        };

        const oldTop = this.pointArray[i].x;
        const newTop = this.pointArray[i].x + rect.left + this.props.offsetX;
        const oldLeft = this.pointArray[i].y;
        const newLeft = this.pointArray[i].y + rect.top + this.props.offsetY;
        const isPositionChanged = oldTop != newTop || oldLeft != newLeft;

        if (isPositionChanged) {
          newStyle.left = `${this.pointArray[i].x + rect.left + this.props.offsetX}px`;
          newStyle.top = `${this.pointArray[i].y + rect.top + this.props.offsetY}px`;
        }

        Object.assign(bubbleElement.style, newStyle);
        this.isGather = true;
      });
    });
  };
}
