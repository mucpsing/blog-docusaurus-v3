(self.webpackChunkcps_blog_docusaurus_v3=self.webpackChunkcps_blog_docusaurus_v3||[]).push([[56],{2323:(t,e,s)=>{"use strict";s.d(e,{Z:()=>r});var i=s(6731),o=s.n(i),n=s(2699);const a=[{mainColor:"#FFF43D",subColor:"#F6B429"},{mainColor:"#FC1E4F",subColor:"#FF4058"},{mainColor:"#9FDA7F",subColor:"#64D487"}];const r=(0,n.shuffle)(o()).map(((t,e)=>{let s=e%a.length,i={title:t.title,content:t.description,preview:t.preview,mainColor:a[s].mainColor,subColor:a[s].subColor};return t.logo&&(i.logo=t.logo),t.gif&&(i.gif=t.gif),t.website&&(i.website=t.website),i}))},1789:(t,e,s)=>{"use strict";s.d(e,{Z:()=>p});var i=s(3518),o=s(7691),n=s(9840);let a=!1;class r extends i.Component{constructor(t){super(t),this.parent=document.getElementById("cps-img-preview")}onload=t=>{this.props.onload&&this.props.onload(t)};close=()=>{console.log("\u5173\u95ed"),this.setState({show:!1}),a=!1};show=()=>(console.log("show"),this.parent||(this.parent=document.getElementById("cps-img-preview")),this.parent.style.display="","");hidden=()=>(console.log("hidden"),this.parent||(this.parent=document.getElementById("cps-img-preview")),this.parent.style.display="none","hidden");render(){return(0,n.jsx)("div",{className:["overlay z-[1000]",a?this.show():this.hidden(),"absolute w-full h-full top-0 left-0 flex justify-center items-center","bg-black/70"].join(" "),onClick:this.close,children:(0,n.jsx)("img",{className:"",src:this.props.src,alt:"img",onLoad:t=>this.onload(this.props.src)})})}}const p=t=>{console.log({target:t});let e;try{e=document.getElementById("cps-img-preview")}catch(s){console.log("\u9700\u8981\u91cd\u65b0\u521b\u5efa")}e||(e=(()=>{let t=document.createElement("div");return t.id="cps-img-preview",t.style.position="absolute",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.height="100%",document.body.appendChild(t),t})()),a=!0,o.render((0,n.jsx)(r,{src:t.gif?t.gif:t.preview}),e)}},1949:(t,e,s)=>{"use strict";s.d(e,{DW:()=>r,Ui:()=>n});var i=s(3518),o=(s(4669),s(3493),s(8346),s(8384),s(8808),s(5605),s(2323));s(1789),s(9840);const n={left:[{translateX:[0,-300],opacity:[1,0]},{translateX:[0,300],opacity:[1,0]}],right:[{translateX:[0,300],opacity:[1,0]},{translateX:[0,-300],opacity:[1,0]}]},a=["#FC1E4F","#FFF43D","#9FDA7F"],r=["#FF4058","#F6B429","#64D487"];i.Component,o.Z},5605:(t,e,s)=>{"use strict";s.d(e,{R:()=>i,n:()=>o});const i=()=>{try{return 0===document.createElement("canvas").toDataURL("image/webp",.5).indexOf("data:image/webp")}catch(t){return!1}};function o(t){const e=new RegExp(".(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|jpeg)$");try{return t.replace(e,".webp")}catch(s){return t}}},8649:(t,e,s)=>{"use strict";s.d(e,{Z:()=>p});var i=s(3518),o=s(7691),n=s(3114),a=s(2699),r=s(9840);class p extends i.Component{static defaultProps={image:"/logo/capsion.png",width:600,height:200,bubbleScale:1,bubbleSize:10,bubbleSizeMin:5,intervalTime:8e3,positionElementId:"",opacityMax:.9,opacitymin:.7};isInit=!1;IS_CURRT_WEB_PAGE=!0;constructor(t){super(t),this.state={top:0,left:0,bottom:"unset",right:"unset",children:[],boxAnim:{},transform:null,isMouseEnter:!1},this.gather=!0,this.interval=null,console.log("BUG: ",this.props.image)}init=()=>{window.CPS_ENV||(window.CPS_ENV={CPS_INTERVAL_LIST:[]});let t=!1;const e=setInterval((()=>{t=this.updatePositions(),t&&(clearInterval(e),this.createPointData(),this.isInit=!0,setTimeout((()=>{this.onMouseLeave({target:{id:"LogoGather.init"}})}),this.props.intervalTime/2))}),1e3)};componentDidMount(){this.dom=o.findDOMNode(this),this.init(),document.addEventListener("visibilitychange",(()=>{document.hidden?(document.title="\u6b7b\u9b3c\uff0c\u4f60\u53bb\u54ea\u513f\u4e86\uff01",this.IS_CURRT_WEB_PAGE=!1):(document.title="\u6b7b\u9b3c\uff0c\u4f60\u7ec8\u4e8e\u56de\u6765\u62c9\uff01",this.IS_CURRT_WEB_PAGE=!0)})),this.resizeEvent=(0,a.throttle)(this.updatePositions,200),window.addEventListener("resize",this.resizeEvent)}componentWillUnmount(){window.CPS_ENV.CPS_INTERVAL_LIST.forEach((t=>clearInterval(t))),window.removeEventListener("resize",this.resizeEvent),this.resizeEvent.cancel()}onMouseEnter=t=>{t&&t.target.id.startsWith("LogoGather")&&(console.log("onMouseEnter"),this.setState({isMouseEnter:!0},(()=>{this.gather||this.updateTweenData(),window.CPS_ENV.CPS_INTERVAL_LIST.length>0&&(window.CPS_ENV.CPS_INTERVAL_LIST.forEach((t=>clearInterval(t))),window.CPS_ENV.CPS_INTERVAL_LIST=[])})))};onMouseLeave=t=>{t&&t.target.id.startsWith("LogoGather")&&(console.log("onMouseLeave"),this.setState({isMouseEnter:!1},(()=>{this.gather&&this.updateTweenData(),window.CPS_ENV.CPS_INTERVAL_LIST.length>0&&(window.CPS_ENV.CPS_INTERVAL_LIST.forEach((t=>clearInterval(t))),window.CPS_ENV.CPS_INTERVAL_LIST=[]),window.CPS_ENV.CPS_INTERVAL_LIST.push(setInterval(this.updateTweenData,this.props.intervalTime))})))};setDataToDom(t,e,s){this.pointArray=[];const i=this.props.bubbleSize;for(let n=0;n<e;n+=i)for(let o=0;o<s;o+=i)t[4*(n+o*e)+3]>150&&this.pointArray.push({x:n,y:o});const o=[];this.pointArray.forEach(((t,e)=>{const s=(Math.random()*this.props.bubbleSizeMin+this.props.bubbleSizeMin)*this.props.bubbleScale,i=this.props.opacity?this.props.opacity:Math.random()*this.props.opacitymin+this.props.opacitymin,a=Math.floor(Math.random()*(this.props.intervalTime/3)),p=this.props.intervalTime/2-a,l=Math.round(95*Math.random()+160),c=Math.round(95*Math.random()+160),h=Math.round(95*Math.random()+160);o.push((0,r.jsx)(n.ZP,{className:"absolute rounded-[100%]",style:{left:t.x,top:t.y},children:(0,r.jsx)("div",{className:"point rounded-[100%]",style:{width:s,height:s,opacity:i,backgroundColor:`rgb(${l},${c},${h})`,animation:`up-and-down-${e%2+1} ${p}ms ease-in-out ${a}ms infinite`}})},e))})),this.setState({children:o,boxAnim:{opacity:0,type:"from",duration:800}})}createPointData=()=>{const{width:t,height:e}=this.props;let s=document.createElement("canvas");const i=s.getContext("2d");i.clearRect(0,0,t,e),s.width=t,s.height=e;const o=new Image;o.onload=()=>{i.drawImage(o,0,0,o.width,o.height,0,0,t,e);const n=i.getImageData(0,0,t,e).data;this.setDataToDom(n,t,e),s.remove()},o.crossOrigin="anonymous",o.src=this.props.image};gatherData=()=>{const t=this.state.children.map((t=>i.cloneElement(t,{animation:{x:0,y:0,opacity:1,scale:1,delay:500*Math.random(),duration:800,ease:"easeInOutQuint"}})));this.setState({children:t})};disperseData=()=>{const t=this.dom.getBoundingClientRect(),e=this.sideBox.getBoundingClientRect(),s=e.top-t.top,o=e.left-t.left,n=this.state.children.map((e=>{const n=2*(Math.random()*this.props.bubbleSizeMin+this.props.bubbleSizeMin);return i.cloneElement(e,{animation:{width:n,height:n,x:Math.random()*t.width-o-e.props.style.left,y:Math.random()*t.height-s-e.props.style.top,opacity:this.props.opacity?this.props.opacity:Math.random()*this.props.opacitymin+this.props.opacitymin,scale:2.4*Math.random()+.1,duration:500*Math.random()+500,ease:"easeInOutQuint"}})}));this.setState({children:n})};updatePositions=()=>{if(!this.props.positionElementId)return!0;if(!this.positionElement&&(this.positionElement=document.getElementById(this.props.positionElementId),!this.positionElement))return console.log("\u83b7\u53d6\u5143\u7d20\u5931\u8d25"),!1;if(!this.dom)return console.log("\u7236\u7ea7\u5305\u88f9\u5143\u7d20\u5b9e\u4f8b\u8bfb\u53d6\u5931\u8d25"),!1;const{top:t,left:e,transform:s}=this.state,i=this.positionElement.getBoundingClientRect(),o=this.dom.getBoundingClientRect(),n=`translate(-${this.props.width/2-i.width/2}px, -${this.props.height/2-i.height/2}px)`,a={top:i.y-o.y,left:i.x-o.x,transform:n};return JSON.stringify({top:t,left:e,transform:s})!=JSON.stringify(a)&&this.setState(a),!0};updateTweenData=()=>{try{if(!this.IS_CURRT_WEB_PAGE)return;if(this.dom=o.findDOMNode(this),this.sideBox=o.findDOMNode(this.sideBoxComp),this.gather){if(this.state.isMouseEnter)return;this.disperseData()}else this.gatherData();this.gather=!this.gather}catch(t){console.log("\u66f4\u65b0\u6570\u636e\u5931\u8d25: ",t)}};render(){return(0,r.jsx)("div",{id:"logoContainer",className:"absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none",children:(0,r.jsx)(n.ZP,{animation:this.state.boxAnim,className:["absolute pointer-events-auto bg-orange-300/10 rounded-xl",this.isInit?"shadow-md":""].join(" "),style:{width:`${this.props.width}px`,height:`${this.props.height}px`,top:this.state.top,left:this.state.left,bottom:this.state.bottom,right:this.state.right,transform:this.state.transform},onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave,id:"LogoGather.hoverZone",ref:t=>this.sideBoxComp=t,children:this.state.children})})}}},6731:t=>{t.exports=[{title:"\u3010ST\u63d2\u4ef6\u3011\u4ee3\u7801\u683c\u5f0f\u5316",description:"\u901a\u8fc7\u672c\u5730node\u8c03\u7528`prettier`\u6765\u4e2a\u683c\u5f0f\u5316\u6587\u4ef6\uff0c\u652f\u6301\u4e00\u4e0b\u540e\u7f00\u683c\u5f0f\u6587\u4ef6\uff1a`js`\u3001`html`\u3001`css`\u3001`pug`\u3001`stylus`\u3001`less`\u3001`sass`\u3001`vue`\u3001`ts`",tags:["opensource","python","sublimetext","nodejs"],preview:"/screenshot/sublimeTextPlugs/cps-beautify/cps-beautify_preview.png",gif:"/screenshot/sublimeTextPlugs/cps-beautify/cps-beautify.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u539f\u521b\u4f5c\u54c1\\ST\u63d2\u4ef6\\\u4ee3\u7801\u683c\u5f0f\u5316.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u539f\u521b\u4f5c\u54c1/ST\u63d2\u4ef6/\u4ee3\u7801\u683c\u5f0f\u5316"},{title:"\u3010ST\u63d2\u4ef6\u3011\u5feb\u6377\u8fd0\u884cshell\u547d\u4ee4",description:"1\u3001\u8bfb\u53d6nodejs\u9879\u76ee\u548cpython\u9879\u76ee\u7684script\u5b57\u6bb5\uff1b2\u3001\u901a\u8fc7\u5feb\u6377\u952e\u76f4\u63a5\u53ef\u4ee5\u5728SublimeText\u4e2d\u901a\u8fc7\u539f\u751f\u7684pannel\u8f93\u5165shell\u6307\u4ee4\uff0c\u4e0esublimeREPL\u7c7b\u4f3c\uff0c\u4f46\u529f\u80fd\u4e0d\u540c",tags:["opensource","python","sublimetext"],preview:"/screenshot/sublimeTextPlugs/cps-run-commands/cps-Run-Command.png",gif:"/screenshot/sublimeTextPlugs/cps-run-commands/cps-Run-Command.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u539f\u521b\u4f5c\u54c1\\ST\u63d2\u4ef6\\\u5feb\u6377\u8fd0\u884cshell\u547d\u4ee4.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u539f\u521b\u4f5c\u54c1/ST\u63d2\u4ef6/\u5feb\u6377\u8fd0\u884cshell\u547d\u4ee4"},{title:"\u3010ST\u63d2\u4ef6\u3011\u751f\u6210\u51fd\u6570\u6ce8\u91ca",description:"\u81ea\u52a8\u5206\u6790\u51fd\u6570\u53c2\u6570\uff0c\u751f\u6210jsdoc\u98ce\u683c\u7684\u6ce8\u91ca\u5757\uff0c\u65b0\u589e\u53c2\u6570\u667a\u80fd\u5206\u6790\uff0c\u53ef\u5728\u5df2\u6709\u6ce8\u91ca\u5757\u7684\u57fa\u7840\u4e0a\u66f4\u65b0\u65b0\u53c2\u6570\u3002",tags:["opensource","python","sublimetext"],preview:"/screenshot/sublimeTextPlugs/cps-Comments-Creator/cps-Comments-Creator.png",gif:"/screenshot/sublimeTextPlugs/cps-Comments-Creator/cps-Comments-Creator.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u539f\u521b\u4f5c\u54c1\\ST\u63d2\u4ef6\\\u751f\u6210\u51fd\u6570\u6ce8\u91ca.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u539f\u521b\u4f5c\u54c1/ST\u63d2\u4ef6/\u751f\u6210\u51fd\u6570\u6ce8\u91ca"},{title:"\u3010ST\u63d2\u4ef6\u3011\u6587\u4ef6\u5934\u751f\u6210",description:"\ud83d\udd0c\u4e00\u952e\u63d2\u5165\u6587\u4ef6\u5934\u90e8\u4fe1\u606f\uff0c\u4f5c\u8005\u4fe1\u606f\uff0c\u5177\u4f53\u63cf\u8ff0\u7b49\uff0c\u652f\u6301\u4efb\u4f55\u540e\u7f00\u540d\u6587\u4ef6\uff08\u81ea\u5b9a\u4e49\u5417\u6dfb\u52a0\uff09\uff0c\u4fe1\u606f\u6a21\u677f\u81ea\u5b9a\u4e49\u3002",tags:["opensource","python","sublimetext"],preview:"/screenshot/sublimeTextPlugs/cps-fileheader/fileheader.png",gif:"/screenshot/sublimeTextPlugs/cps-fileheader/fileheader.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u539f\u521b\u4f5c\u54c1\\ST\u63d2\u4ef6\\\u751f\u6210\u6587\u4ef6\u5934.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u539f\u521b\u4f5c\u54c1/ST\u63d2\u4ef6/\u751f\u6210\u6587\u4ef6\u5934"},{title:"\u3010ST\u63d2\u4ef6\u3011\u81ea\u52a8\u5207\u6362\u82f1\u6587\u8f93\u5165",description:"\u65e5\u5e38\u7f16\u5199\u4ee3\u7801\u7684\u73af\u5883\u4e2d\uff0c\u4e00\u7801\u4ee3\u7801\u4e00\u8fb9\u67e5\u8d44\u6599\uff0c\u4e00\u8fb9\u804a\u5929\u4e00\u8fb9\u7801\u4ee3\u7801\uff1a`\u82f1\u6587\u8f93\u5165`>`\u4e2d\u6587\u8f93\u5165`>`\u82f1\u6587\u8f93\u5165`>`...`\u8fd9\u6837\u7684\u573a\u666f\u6765\u6765\u56de\u56de\uff0c\u6bcf\u6b21\u5207\u6362\u573a\u666f\u603b\u4f1a\u8981\u624b\u52a8\u5207\u6362\u4e00\u4e0b\u8f93\u5165\u6cd5\uff0c\u975e\u5e38\u4e0d\u4f18\u96c5\u3002",tags:["opensource","python","sublimetext"],preview:"/screenshot/sublimeTextPlugs/cps-auto-switch-language/cps-auto-switch-language_preview.png",gif:"/screenshot/sublimeTextPlugs/cps-auto-switch-language/cps-auto-switch-language1_800.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u539f\u521b\u4f5c\u54c1\\ST\u63d2\u4ef6\\\u81ea\u52a8\u5207\u6362\u82f1\u6587\u8f93\u5165.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u539f\u521b\u4f5c\u54c1/ST\u63d2\u4ef6/\u81ea\u52a8\u5207\u6362\u82f1\u6587\u8f93\u5165"},{title:"\u3010ST\u63d2\u4ef6\u3011\u81ea\u52a8\u66f4\u65b0channel_v3",description:"\u81ea\u52a8\u6216\u8005\u624b\u52a8\u89e6\u53d1\u66f4\u65b0`channel_v3.json` \u6587\u4ef6\uff0c\u5e76\u5c06\u5176\u4e0b\u8f7d\u5230\u672c\u5730\u8fdb\u884c\u79bb\u7ebf\u5173\u8054\uff0c\u4ece\u6b64\u79d2\u5f00<code>Ctrl + Shfit + P</code>\u3002",tags:["opensource","python","sublimetext"],preview:"/screenshot/sublimeTextPlugs/cps-auto-update-channel/cps-auto-update-channel.png",gif:"/screenshot/sublimeTextPlugs/cps-auto-update-channel/cps-auto-update-channel.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u539f\u521b\u4f5c\u54c1\\ST\u63d2\u4ef6\\\u81ea\u52a8\u66f4\u65b0channel_v3.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u539f\u521b\u4f5c\u54c1/ST\u63d2\u4ef6/\u81ea\u52a8\u66f4\u65b0channel_v3"},{title:"psd\u6587\u4ef6\u89e3\u6790\u63a5\u53e3",description:"\u89e3\u6790psd\u6587\u4ef6\uff0c\u8c03\u7528\u5b98\u65b9\u63a5\u53e3\u6216\u8005\u8c03\u7528\u672c\u5730ps\u8f6f\u4ef6\u5bf9\u6587\u4ef6\u8fdb\u884c\u56fe\u5c42\u5185\u5bb9\u4fee\u6539\uff0c\u6700\u7ec8\u5bfc\u51fa\u56fe\u7247\uff0c\u5408\u9002\u7528\u4e86\u6a21\u7279\u6362\u88c5\uff0c\u4ea7\u54c1\u53d8\u8272\u7b49",tags:["python","fastapi","favorite","swagger"],preview:"/screenshot/psd-api/image-20220607152510720.png",gif:"/screenshot/psd-api/\u63a5\u53e3\u6d4b\u8bd51.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u5b8c\u6574\u9879\u76ee\\psd\u6587\u4ef6\u89e3\u6790\u63a5\u53e3\\index.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u5b8c\u6574\u9879\u76ee/psd\u6587\u4ef6\u89e3\u6790\u63a5\u53e3"},{title:"\u4e2a\u4eba\u535a\u5ba2",description:"1500\u591a\u7bc7\u4e2a\u4eba\u5b66\u4e60\u7b14\u8bb0\u901a\u8fc7Typora\u8bb0\u5f55\u5728\u672c\u5730\uff0c\u57fa\u4e8eDocusaurus\u6846\u67b6\u642d\u5efa\u4e86\u672c\u535a\u5ba2\uff0c\u52aa\u529b\u66f4\u65b0\u4e2d",tags:["opensource","nodejs","typescript","javascript","reactjs","favorite"],preview:"/screenshot/capsion.top/capsion.top_proview_1.png",gif:"/screenshot/capsion.top/capsion.top.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u5b8c\u6574\u9879\u76ee\\\u4e2a\u4eba\u7f51\u7ad9\\index.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u5b8c\u6574\u9879\u76ee/\u4e2a\u4eba\u7f51\u7ad9"},{title:"cps-cli\u81ea\u7528\u811a\u624b\u67b6",description:"\u6574\u5408\u4e86\u5f88\u591a\u4e2a\u4eba\u5e38\u7528\u7684\u811a\u672c\u529f\u80fd\uff0c\u5feb\u901f\u751f\u6210\u9879\u76ee\uff0cTypora\u4e0a\u4f20\u56fe\u7247\u3001",tags:["typescript","nodejs","opensource","python","sublimetext"],preview:"/screenshot/cps-cli/cps-cli.png",gif:"/screenshot/cps-cli/cps-cli.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u5b8c\u6574\u9879\u76ee\\\u4e2a\u4eba\u81ea\u7528\u811a\u624b\u67b6\\index.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u5b8c\u6574\u9879\u76ee/\u4e2a\u4eba\u81ea\u7528\u811a\u624b\u67b6"},{title:"Electron\u622a\u56fe\u5ba2\u6237\u7aef",description:"\u57fa\u4e8eElectron+vue3+TailwindCss\u7684\u4e00\u6b21\u5c1d\u8bd5\uff0c\u81ea\u7528\u7a0b\u5e8f\u540e\u53f0\u622a\u56fe\u5de5\u5177\uff0c\u5177\u4f53\u7528\u6765\u505a\u4ec0\u4e48\uff0c\u61c2\u5f97\u5c0f\u4f19\u4f34\u81ea\u8ba4\u61c2\uff0c\u524d\u7aefUI\u90e8\u5206\u5f00\u6e90\u3002",tags:["opensource","nodejs","vue","favorite","electron","tailwindcss","typescript","javascript"],preview:"/screenshot/hongqi/admin/image-20230505161924362.png",gif:"/screenshot/capsion.top/capsion.top.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u5b8c\u6574\u9879\u76ee\\\u622a\u56fe\u63d2\u4ef6\\index.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u5b8c\u6574\u9879\u76ee/\u622a\u56fe\u63d2\u4ef6"},{title:"\u7a97\u5e18\u6362\u88c5\u5c0f\u7a0b\u5e8f\u540e\u53f0",description:"\u5168\u6808\u7a97\u5e18\u5c0f\u7a0b\u5e8f\u7684\u540e\u53f0\uff0c\u57fa\u4e8evue2.x\u5168\u5bb6\u6876+elementUI+axios\u642d\u5efa\uff0c\u72ec\u7acb\u9879\u76ee\u4e14\u4ee5\u4e0a\u7ebf3\u5e74\uff0c\u7a33\u5b9a\u8fd0\u884c",tags:["opensource","vue","favorite","element","javascript"],preview:"/screenshot/hongqi/admin/image-20230505161924362.png",gif:"/screenshot/capsion.top/capsion.top.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u5b8c\u6574\u9879\u76ee\\\u7a97\u5e18\u6362\u88c5\u540e\u53f0\u524d\u7aef\\index.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u5b8c\u6574\u9879\u76ee/\u7a97\u5e18\u6362\u88c5\u540e\u53f0\u524d\u7aef"},{title:"\u7a97\u5e18\u6362\u88c5\u5c0f\u7a0b\u5e8f",description:"\u4ea7\u54c1\u6362\u88c5\u5c0f\u7a0b\u5e8f\uff0c\u57fa\u4e8euni-app\u7684webview\uff0c\u6838\u5fc3\u662fvue2\u5168\u5bb6\u6876+Vant\uff0c\u652f\u6301\u5168\u5e73\u53f0\u5c0f\u7a0b\u5e8f\u5b9e\u73b0\u4e86\uff0c\u4ea7\u54c1\u66f4\u6362\uff0c\u900f\u89c6\u5b9e\u65f6\u53d8\u5f62\uff082D\uff09\uff0c\u4ea7\u54c1\u73b0\u573a\u8bd5\u88c5\u7b49",tags:["opensource","nodejs","vue","favorite","uni-app","vant","javascript"],preview:"/screenshot/hongqi/uni-app/uni-app1.png",gif:"/screenshot/hongqi/uni-app/uni-app.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u5b8c\u6574\u9879\u76ee\\\u7a97\u5e18\u6362\u88c5\u5c0f\u7a0b\u5e8f\\index.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u5b8c\u6574\u9879\u76ee/\u7a97\u5e18\u6362\u88c5\u5c0f\u7a0b\u5e8f"}]},5368:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>r});var i=s(3518),o=s(8649),n=s(1949),a=s(9840);class r extends i.Component{static defaultProps={alignmentMode:"horizontal"};constructor(t){super(t),this.state={page:0,bgColor:["#F6B429"],bgColorIndex:0,isStartAutoSwitch:null}}componentWillUnmount(){this.setState=(t,e)=>null,clearInterval(this.state.isStartAutoSwitch)}componentDidMount(){this.autoSwitch(2e4)}autoSwitch=t=>{setTimeout((()=>{if(!this.state.isStartAutoSwitch){let e=setInterval((()=>{let t=this.state.page+1;n.DW[t]||(t=0),this.setState({page:t})}),t);this.setState({isStartAutoSwitch:e})}}),1e3)};switchPage=t=>{console.log("switchPage: ",t),this.setState({page:t})};render(){return(0,a.jsxs)("div",{className:["overflow-hidden relative w-full h-[600px]","md:h-[650px]","lg:h-[750px]","xl:h-[850px]","flex justify-evenly items-center pt-60 pb-64 px-4 text-gray-700"].join(" "),style:{background:n.DW[this.state.page],transition:"background 1s"},children:[(0,a.jsx)("div",{id:"homeTitleComment",className:"home-title w-[400px]",children:"111111111111111111111111111111"}),(0,a.jsx)(o.Z,{image:s(3651).Z,width:600,height:200,bubbleScale:1.5,positionElementId:"postitionElement"})]})}}},3651:(t,e,s)=>{"use strict";s.d(e,{Z:()=>i});const i=s.p+"assets/images/capsion-eaa3261d1b5b450251e49c93fcd8784d.png"}}]);