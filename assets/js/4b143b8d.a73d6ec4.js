(self.webpackChunkcps_blog_docusaurus_v3=self.webpackChunkcps_blog_docusaurus_v3||[]).push([[818,411],{2323:(t,e,s)=>{"use strict";s.d(e,{Z:()=>a});var i=s(6731),n=s.n(i),o=s(2699);const r=[{mainColor:"#FFF43D",subColor:"#F6B429"},{mainColor:"#FC1E4F",subColor:"#FF4058"},{mainColor:"#9FDA7F",subColor:"#64D487"}];const a=(0,o.shuffle)(n()).map(((t,e)=>{let s=e%r.length,i={title:t.title,content:t.description,preview:t.preview,mainColor:r[s].mainColor,subColor:r[s].subColor};return t.logo&&(i.logo=t.logo),t.gif&&(i.gif=t.gif),t.website&&(i.website=t.website),i}))},1789:(t,e,s)=>{"use strict";s.d(e,{Z:()=>l});var i=s(3518),n=s(7691),o=s(9840);let r=!1;class a extends i.Component{constructor(t){super(t),this.parent=document.getElementById("cps-img-preview")}onload=t=>{this.props.onload&&this.props.onload(t)};close=()=>{console.log("\u5173\u95ed"),this.setState({show:!1}),r=!1};show=()=>(console.log("show"),this.parent||(this.parent=document.getElementById("cps-img-preview")),this.parent.style.display="","");hidden=()=>(console.log("hidden"),this.parent||(this.parent=document.getElementById("cps-img-preview")),this.parent.style.display="none","hidden");render(){return(0,o.jsx)("div",{className:["overlay z-[1000]",r?this.show():this.hidden(),"absolute w-full h-full top-0 left-0 flex justify-center items-center","bg-black/70"].join(" "),onClick:this.close,children:(0,o.jsx)("img",{className:"",src:this.props.src,alt:"img",onLoad:t=>this.onload(this.props.src)})})}}const l=t=>{console.log({target:t});let e;try{e=document.getElementById("cps-img-preview")}catch(s){console.log("\u9700\u8981\u91cd\u65b0\u521b\u5efa")}e||(e=(()=>{let t=document.createElement("div");return t.id="cps-img-preview",t.style.position="absolute",t.style.top="0",t.style.left="0",t.style.width="100%",t.style.height="100%",document.body.appendChild(t),t})()),r=!0,n.render((0,o.jsx)(a,{src:t.gif?t.gif:t.preview}),e)}},1949:(t,e,s)=>{"use strict";s.d(e,{DW:()=>a,Ui:()=>o});var i=s(3518),n=(s(4669),s(3493),s(8346),s(8384),s(8808),s(5605),s(2323));s(1789),s(9840);const o={left:[{translateX:[0,-300],opacity:[1,0]},{translateX:[0,300],opacity:[1,0]}],right:[{translateX:[0,300],opacity:[1,0]},{translateX:[0,-300],opacity:[1,0]}]},r=["#FC1E4F","#FFF43D","#9FDA7F"],a=["#FF4058","#F6B429","#64D487"];i.Component,n.Z},5605:(t,e,s)=>{"use strict";s.d(e,{R:()=>i,n:()=>n});const i=()=>{try{return 0===document.createElement("canvas").toDataURL("image/webp",.5).indexOf("data:image/webp")}catch(t){return!1}};function n(t){const e=new RegExp(".(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|WMF|webp|jpeg)$");try{return t.replace(e,".webp")}catch(s){return t}}},8649:(t,e,s)=>{"use strict";s.d(e,{Z:()=>l});var i=s(3518),n=s(7691),o=s(3114),r=s(2699),a=s(9840);class l extends i.Component{static defaultProps={image:"/logo/capsion.png",width:600,height:200,bubbleScale:1,bubbleSize:10,bubbleSizeMin:5,intervalTime:8e3,positionElementId:"",opacityMax:.9,opacitymin:.7};isInit=!1;IS_CURRT_WEB_PAGE=!0;constructor(t){super(t),this.state={top:0,left:0,bottom:"unset",right:"unset",children:[],boxAnim:{},transform:null,isMouseEnter:!1},this.gather=!0,this.interval=null,console.log("BUG: ",this.props.image)}init=()=>{window.CPS_ENV||(window.CPS_ENV={CPS_INTERVAL_LIST:[]});let t=!1;const e=setInterval((()=>{t=this.updatePositions(),t&&(clearInterval(e),this.createPointData(),this.isInit=!0,setTimeout((()=>{this.onMouseLeave({target:{id:"LogoGather.init"}})}),this.props.intervalTime/2))}),1e3)};componentDidMount(){this.dom=n.findDOMNode(this),this.init(),document.addEventListener("visibilitychange",(()=>{document.hidden?(document.title="\u6b7b\u9b3c\uff0c\u4f60\u53bb\u54ea\u513f\u4e86\uff01",this.IS_CURRT_WEB_PAGE=!1):(document.title="\u6b7b\u9b3c\uff0c\u4f60\u7ec8\u4e8e\u56de\u6765\u62c9\uff01",this.IS_CURRT_WEB_PAGE=!0)})),this.resizeEvent=(0,r.throttle)(this.updatePositions,200),window.addEventListener("resize",this.resizeEvent)}componentWillUnmount(){window.CPS_ENV.CPS_INTERVAL_LIST.forEach((t=>clearInterval(t))),window.removeEventListener("resize",this.resizeEvent),this.resizeEvent.cancel()}onMouseEnter=t=>{t&&t.target.id.startsWith("LogoGather")&&(console.log("onMouseEnter"),this.setState({isMouseEnter:!0},(()=>{this.gather||this.updateTweenData(),window.CPS_ENV.CPS_INTERVAL_LIST.length>0&&(window.CPS_ENV.CPS_INTERVAL_LIST.forEach((t=>clearInterval(t))),window.CPS_ENV.CPS_INTERVAL_LIST=[])})))};onMouseLeave=t=>{t&&t.target.id.startsWith("LogoGather")&&(console.log("onMouseLeave"),this.setState({isMouseEnter:!1},(()=>{this.gather&&this.updateTweenData(),window.CPS_ENV.CPS_INTERVAL_LIST.length>0&&(window.CPS_ENV.CPS_INTERVAL_LIST.forEach((t=>clearInterval(t))),window.CPS_ENV.CPS_INTERVAL_LIST=[]),window.CPS_ENV.CPS_INTERVAL_LIST.push(setInterval(this.updateTweenData,this.props.intervalTime))})))};setDataToDom(t,e,s){this.pointArray=[];const i=this.props.bubbleSize;for(let o=0;o<e;o+=i)for(let n=0;n<s;n+=i)t[4*(o+n*e)+3]>150&&this.pointArray.push({x:o,y:n});const n=[];this.pointArray.forEach(((t,e)=>{const s=(Math.random()*this.props.bubbleSizeMin+this.props.bubbleSizeMin)*this.props.bubbleScale,i=this.props.opacity?this.props.opacity:Math.random()*this.props.opacitymin+this.props.opacitymin,r=Math.floor(Math.random()*(this.props.intervalTime/3)),l=this.props.intervalTime/2-r,c=Math.round(95*Math.random()+160),p=Math.round(95*Math.random()+160),h=Math.round(95*Math.random()+160);n.push((0,a.jsx)(o.ZP,{className:"absolute rounded-[100%]",style:{left:t.x,top:t.y},children:(0,a.jsx)("div",{className:"point rounded-[100%]",style:{width:s,height:s,opacity:i,backgroundColor:`rgb(${c},${p},${h})`,animation:`up-and-down-${e%2+1} ${l}ms ease-in-out ${r}ms infinite`}})},e))})),this.setState({children:n,boxAnim:{opacity:0,type:"from",duration:800}})}createPointData=()=>{const{width:t,height:e}=this.props;let s=document.createElement("canvas");const i=s.getContext("2d");i.clearRect(0,0,t,e),s.width=t,s.height=e;const n=new Image;n.onload=()=>{i.drawImage(n,0,0,n.width,n.height,0,0,t,e);const o=i.getImageData(0,0,t,e).data;this.setDataToDom(o,t,e),s.remove()},n.crossOrigin="anonymous",n.src=this.props.image};gatherData=()=>{const t=this.state.children.map((t=>i.cloneElement(t,{animation:{x:0,y:0,opacity:1,scale:1,delay:500*Math.random(),duration:800,ease:"easeInOutQuint"}})));this.setState({children:t})};disperseData=()=>{const t=this.dom.getBoundingClientRect(),e=this.sideBox.getBoundingClientRect(),s=e.top-t.top,n=e.left-t.left,o=this.state.children.map((e=>{const o=2*(Math.random()*this.props.bubbleSizeMin+this.props.bubbleSizeMin);return i.cloneElement(e,{animation:{width:o,height:o,x:Math.random()*t.width-n-e.props.style.left,y:Math.random()*t.height-s-e.props.style.top,opacity:this.props.opacity?this.props.opacity:Math.random()*this.props.opacitymin+this.props.opacitymin,scale:2.4*Math.random()+.1,duration:500*Math.random()+500,ease:"easeInOutQuint"}})}));this.setState({children:o})};updatePositions=()=>{if(!this.props.positionElementId)return!0;if(!this.positionElement&&(this.positionElement=document.getElementById(this.props.positionElementId),!this.positionElement))return console.log("\u83b7\u53d6\u5143\u7d20\u5931\u8d25"),!1;if(!this.dom)return console.log("\u7236\u7ea7\u5305\u88f9\u5143\u7d20\u5b9e\u4f8b\u8bfb\u53d6\u5931\u8d25"),!1;const{top:t,left:e,transform:s}=this.state,i=this.positionElement.getBoundingClientRect(),n=this.dom.getBoundingClientRect(),o=`translate(-${this.props.width/2-i.width/2}px, -${this.props.height/2-i.height/2}px)`,r={top:i.y-n.y,left:i.x-n.x,transform:o};return JSON.stringify({top:t,left:e,transform:s})!=JSON.stringify(r)&&this.setState(r),!0};updateTweenData=()=>{try{if(!this.IS_CURRT_WEB_PAGE)return;if(this.dom=n.findDOMNode(this),this.sideBox=n.findDOMNode(this.sideBoxComp),this.gather){if(this.state.isMouseEnter)return;this.disperseData()}else this.gatherData();this.gather=!this.gather}catch(t){console.log("\u66f4\u65b0\u6570\u636e\u5931\u8d25: ",t)}};render(){return(0,a.jsx)("div",{id:"logoContainer",className:"absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none",children:(0,a.jsx)(o.ZP,{animation:this.state.boxAnim,className:["absolute pointer-events-auto bg-orange-300/10 rounded-xl",this.isInit?"shadow-md":""].join(" "),style:{width:`${this.props.width}px`,height:`${this.props.height}px`,top:this.state.top,left:this.state.left,bottom:this.state.bottom,right:this.state.right,transform:this.state.transform},onMouseEnter:this.onMouseEnter,onMouseLeave:this.onMouseLeave,id:"LogoGather.hoverZone",ref:t=>this.sideBoxComp=t,children:this.state.children})})}}},6731:t=>{t.exports=[{title:"\u3010ST\u63d2\u4ef6\u3011\u4ee3\u7801\u683c\u5f0f\u5316",description:"\u901a\u8fc7\u672c\u5730node\u8c03\u7528`prettier`\u6765\u4e2a\u683c\u5f0f\u5316\u6587\u4ef6\uff0c\u652f\u6301\u4e00\u4e0b\u540e\u7f00\u683c\u5f0f\u6587\u4ef6\uff1a`js`\u3001`html`\u3001`css`\u3001`pug`\u3001`stylus`\u3001`less`\u3001`sass`\u3001`vue`\u3001`ts`",tags:["opensource","python","sublimetext","nodejs"],preview:"/screenshot/sublimeTextPlugs/cps-beautify/cps-beautify_preview.png",gif:"/screenshot/sublimeTextPlugs/cps-beautify/cps-beautify.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u539f\u521b\u4f5c\u54c1\\ST\u63d2\u4ef6\\\u4ee3\u7801\u683c\u5f0f\u5316.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u539f\u521b\u4f5c\u54c1/ST\u63d2\u4ef6/\u4ee3\u7801\u683c\u5f0f\u5316"},{title:"\u3010ST\u63d2\u4ef6\u3011\u5feb\u6377\u8fd0\u884cshell\u547d\u4ee4",description:"1\u3001\u8bfb\u53d6nodejs\u9879\u76ee\u548cpython\u9879\u76ee\u7684script\u5b57\u6bb5\uff1b2\u3001\u901a\u8fc7\u5feb\u6377\u952e\u76f4\u63a5\u53ef\u4ee5\u5728SublimeText\u4e2d\u901a\u8fc7\u539f\u751f\u7684pannel\u8f93\u5165shell\u6307\u4ee4\uff0c\u4e0esublimeREPL\u7c7b\u4f3c\uff0c\u4f46\u529f\u80fd\u4e0d\u540c",tags:["opensource","python","sublimetext"],preview:"/screenshot/sublimeTextPlugs/cps-run-commands/cps-Run-Command.png",gif:"/screenshot/sublimeTextPlugs/cps-run-commands/cps-Run-Command.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u539f\u521b\u4f5c\u54c1\\ST\u63d2\u4ef6\\\u5feb\u6377\u8fd0\u884cshell\u547d\u4ee4.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u539f\u521b\u4f5c\u54c1/ST\u63d2\u4ef6/\u5feb\u6377\u8fd0\u884cshell\u547d\u4ee4"},{title:"\u3010ST\u63d2\u4ef6\u3011\u751f\u6210\u51fd\u6570\u6ce8\u91ca",description:"\u81ea\u52a8\u5206\u6790\u51fd\u6570\u53c2\u6570\uff0c\u751f\u6210jsdoc\u98ce\u683c\u7684\u6ce8\u91ca\u5757\uff0c\u65b0\u589e\u53c2\u6570\u667a\u80fd\u5206\u6790\uff0c\u53ef\u5728\u5df2\u6709\u6ce8\u91ca\u5757\u7684\u57fa\u7840\u4e0a\u66f4\u65b0\u65b0\u53c2\u6570\u3002",tags:["opensource","python","sublimetext"],preview:"/screenshot/sublimeTextPlugs/cps-Comments-Creator/cps-Comments-Creator.png",gif:"/screenshot/sublimeTextPlugs/cps-Comments-Creator/cps-Comments-Creator.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u539f\u521b\u4f5c\u54c1\\ST\u63d2\u4ef6\\\u751f\u6210\u51fd\u6570\u6ce8\u91ca.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u539f\u521b\u4f5c\u54c1/ST\u63d2\u4ef6/\u751f\u6210\u51fd\u6570\u6ce8\u91ca"},{title:"\u3010ST\u63d2\u4ef6\u3011\u6587\u4ef6\u5934\u751f\u6210",description:"\ud83d\udd0c\u4e00\u952e\u63d2\u5165\u6587\u4ef6\u5934\u90e8\u4fe1\u606f\uff0c\u4f5c\u8005\u4fe1\u606f\uff0c\u5177\u4f53\u63cf\u8ff0\u7b49\uff0c\u652f\u6301\u4efb\u4f55\u540e\u7f00\u540d\u6587\u4ef6\uff08\u81ea\u5b9a\u4e49\u5417\u6dfb\u52a0\uff09\uff0c\u4fe1\u606f\u6a21\u677f\u81ea\u5b9a\u4e49\u3002",tags:["opensource","python","sublimetext"],preview:"/screenshot/sublimeTextPlugs/cps-fileheader/fileheader.png",gif:"/screenshot/sublimeTextPlugs/cps-fileheader/fileheader.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u539f\u521b\u4f5c\u54c1\\ST\u63d2\u4ef6\\\u751f\u6210\u6587\u4ef6\u5934.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u539f\u521b\u4f5c\u54c1/ST\u63d2\u4ef6/\u751f\u6210\u6587\u4ef6\u5934"},{title:"\u3010ST\u63d2\u4ef6\u3011\u81ea\u52a8\u5207\u6362\u82f1\u6587\u8f93\u5165",description:"\u65e5\u5e38\u7f16\u5199\u4ee3\u7801\u7684\u73af\u5883\u4e2d\uff0c\u4e00\u7801\u4ee3\u7801\u4e00\u8fb9\u67e5\u8d44\u6599\uff0c\u4e00\u8fb9\u804a\u5929\u4e00\u8fb9\u7801\u4ee3\u7801\uff1a`\u82f1\u6587\u8f93\u5165`>`\u4e2d\u6587\u8f93\u5165`>`\u82f1\u6587\u8f93\u5165`>`...`\u8fd9\u6837\u7684\u573a\u666f\u6765\u6765\u56de\u56de\uff0c\u6bcf\u6b21\u5207\u6362\u573a\u666f\u603b\u4f1a\u8981\u624b\u52a8\u5207\u6362\u4e00\u4e0b\u8f93\u5165\u6cd5\uff0c\u975e\u5e38\u4e0d\u4f18\u96c5\u3002",tags:["opensource","python","sublimetext"],preview:"/screenshot/sublimeTextPlugs/cps-auto-switch-language/cps-auto-switch-language_preview.png",gif:"/screenshot/sublimeTextPlugs/cps-auto-switch-language/cps-auto-switch-language1_800.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u539f\u521b\u4f5c\u54c1\\ST\u63d2\u4ef6\\\u81ea\u52a8\u5207\u6362\u82f1\u6587\u8f93\u5165.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u539f\u521b\u4f5c\u54c1/ST\u63d2\u4ef6/\u81ea\u52a8\u5207\u6362\u82f1\u6587\u8f93\u5165"},{title:"\u3010ST\u63d2\u4ef6\u3011\u81ea\u52a8\u66f4\u65b0channel_v3",description:"\u81ea\u52a8\u6216\u8005\u624b\u52a8\u89e6\u53d1\u66f4\u65b0`channel_v3.json` \u6587\u4ef6\uff0c\u5e76\u5c06\u5176\u4e0b\u8f7d\u5230\u672c\u5730\u8fdb\u884c\u79bb\u7ebf\u5173\u8054\uff0c\u4ece\u6b64\u79d2\u5f00<code>Ctrl + Shfit + P</code>\u3002",tags:["opensource","python","sublimetext"],preview:"/screenshot/sublimeTextPlugs/cps-auto-update-channel/cps-auto-update-channel.png",gif:"/screenshot/sublimeTextPlugs/cps-auto-update-channel/cps-auto-update-channel.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u539f\u521b\u4f5c\u54c1\\ST\u63d2\u4ef6\\\u81ea\u52a8\u66f4\u65b0channel_v3.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u539f\u521b\u4f5c\u54c1/ST\u63d2\u4ef6/\u81ea\u52a8\u66f4\u65b0channel_v3"},{title:"psd\u6587\u4ef6\u89e3\u6790\u63a5\u53e3",description:"\u89e3\u6790psd\u6587\u4ef6\uff0c\u8c03\u7528\u5b98\u65b9\u63a5\u53e3\u6216\u8005\u8c03\u7528\u672c\u5730ps\u8f6f\u4ef6\u5bf9\u6587\u4ef6\u8fdb\u884c\u56fe\u5c42\u5185\u5bb9\u4fee\u6539\uff0c\u6700\u7ec8\u5bfc\u51fa\u56fe\u7247\uff0c\u5408\u9002\u7528\u4e86\u6a21\u7279\u6362\u88c5\uff0c\u4ea7\u54c1\u53d8\u8272\u7b49",tags:["python","fastapi","favorite","swagger"],preview:"/screenshot/psd-api/image-20220607152510720.png",gif:"/screenshot/psd-api/\u63a5\u53e3\u6d4b\u8bd51.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u5b8c\u6574\u9879\u76ee\\psd\u6587\u4ef6\u89e3\u6790\u63a5\u53e3\\index.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u5b8c\u6574\u9879\u76ee/psd\u6587\u4ef6\u89e3\u6790\u63a5\u53e3"},{title:"\u4e2a\u4eba\u535a\u5ba2",description:"1500\u591a\u7bc7\u4e2a\u4eba\u5b66\u4e60\u7b14\u8bb0\u901a\u8fc7Typora\u8bb0\u5f55\u5728\u672c\u5730\uff0c\u57fa\u4e8eDocusaurus\u6846\u67b6\u642d\u5efa\u4e86\u672c\u535a\u5ba2\uff0c\u52aa\u529b\u66f4\u65b0\u4e2d",tags:["opensource","nodejs","typescript","javascript","reactjs","favorite"],preview:"/screenshot/capsion.top/capsion.top_proview_1.png",gif:"/screenshot/capsion.top/capsion.top.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u5b8c\u6574\u9879\u76ee\\\u4e2a\u4eba\u7f51\u7ad9\\index.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u5b8c\u6574\u9879\u76ee/\u4e2a\u4eba\u7f51\u7ad9"},{title:"cps-cli\u81ea\u7528\u811a\u624b\u67b6",description:"\u6574\u5408\u4e86\u5f88\u591a\u4e2a\u4eba\u5e38\u7528\u7684\u811a\u672c\u529f\u80fd\uff0c\u5feb\u901f\u751f\u6210\u9879\u76ee\uff0cTypora\u4e0a\u4f20\u56fe\u7247\u3001",tags:["typescript","nodejs","opensource","python","sublimetext"],preview:"/screenshot/cps-cli/cps-cli.png",gif:"/screenshot/cps-cli/cps-cli.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u5b8c\u6574\u9879\u76ee\\\u4e2a\u4eba\u81ea\u7528\u811a\u624b\u67b6\\index.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u5b8c\u6574\u9879\u76ee/\u4e2a\u4eba\u81ea\u7528\u811a\u624b\u67b6"},{title:"Electron\u622a\u56fe\u5ba2\u6237\u7aef",description:"\u57fa\u4e8eElectron+vue3+TailwindCss\u7684\u4e00\u6b21\u5c1d\u8bd5\uff0c\u81ea\u7528\u7a0b\u5e8f\u540e\u53f0\u622a\u56fe\u5de5\u5177\uff0c\u5177\u4f53\u7528\u6765\u505a\u4ec0\u4e48\uff0c\u61c2\u5f97\u5c0f\u4f19\u4f34\u81ea\u8ba4\u61c2\uff0c\u524d\u7aefUI\u90e8\u5206\u5f00\u6e90\u3002",tags:["opensource","nodejs","vue","favorite","electron","tailwindcss","typescript","javascript"],preview:"/screenshot/hongqi/admin/image-20230505161924362.png",gif:"/screenshot/capsion.top/capsion.top.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u5b8c\u6574\u9879\u76ee\\\u622a\u56fe\u63d2\u4ef6\\index.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u5b8c\u6574\u9879\u76ee/\u622a\u56fe\u63d2\u4ef6"},{title:"\u7a97\u5e18\u6362\u88c5\u5c0f\u7a0b\u5e8f\u540e\u53f0",description:"\u5168\u6808\u7a97\u5e18\u5c0f\u7a0b\u5e8f\u7684\u540e\u53f0\uff0c\u57fa\u4e8evue2.x\u5168\u5bb6\u6876+elementUI+axios\u642d\u5efa\uff0c\u72ec\u7acb\u9879\u76ee\u4e14\u4ee5\u4e0a\u7ebf3\u5e74\uff0c\u7a33\u5b9a\u8fd0\u884c",tags:["opensource","vue","favorite","element","javascript"],preview:"/screenshot/hongqi/admin/image-20230505161924362.png",gif:"/screenshot/capsion.top/capsion.top.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u5b8c\u6574\u9879\u76ee\\\u7a97\u5e18\u6362\u88c5\u540e\u53f0\u524d\u7aef\\index.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u5b8c\u6574\u9879\u76ee/\u7a97\u5e18\u6362\u88c5\u540e\u53f0\u524d\u7aef"},{title:"\u7a97\u5e18\u6362\u88c5\u5c0f\u7a0b\u5e8f",description:"\u4ea7\u54c1\u6362\u88c5\u5c0f\u7a0b\u5e8f\uff0c\u57fa\u4e8euni-app\u7684webview\uff0c\u6838\u5fc3\u662fvue2\u5168\u5bb6\u6876+Vant\uff0c\u652f\u6301\u5168\u5e73\u53f0\u5c0f\u7a0b\u5e8f\u5b9e\u73b0\u4e86\uff0c\u4ea7\u54c1\u66f4\u6362\uff0c\u900f\u89c6\u5b9e\u65f6\u53d8\u5f62\uff082D\uff09\uff0c\u4ea7\u54c1\u73b0\u573a\u8bd5\u88c5\u7b49",tags:["opensource","nodejs","vue","favorite","uni-app","vant","javascript"],preview:"/screenshot/hongqi/uni-app/uni-app1.png",gif:"/screenshot/hongqi/uni-app/uni-app.gif",filepath:"docs\\\u301005\u3011\u9879\u76ee\u7ecf\u5386\\\u5b8c\u6574\u9879\u76ee\\\u7a97\u5e18\u6362\u88c5\u5c0f\u7a0b\u5e8f\\index.md",website:"/docs/\u301005\u3011\u9879\u76ee\u7ecf\u5386/\u5b8c\u6574\u9879\u76ee/\u7a97\u5e18\u6362\u88c5\u5c0f\u7a0b\u5e8f"}]},5759:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>x});var i=s(3518);function n(){return n=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i])}return t},n.apply(this,arguments)}var o={strings:["These are the default values...","You know what you should do?","Use your own!","Have a great day!"],stringsElement:null,typeSpeed:0,startDelay:0,backSpeed:0,smartBackspace:!0,shuffle:!1,backDelay:700,fadeOut:!1,fadeOutClass:"typed-fade-out",fadeOutDelay:500,loop:!1,loopCount:1/0,showCursor:!0,cursorChar:"|",autoInsertCss:!0,attr:null,bindInputFocusEvents:!1,contentType:"html",onBegin:function(t){},onComplete:function(t){},preStringTyped:function(t,e){},onStringTyped:function(t,e){},onLastStringBackspaced:function(t){},onTypingPaused:function(t,e){},onTypingResumed:function(t,e){},onReset:function(t){},onStop:function(t,e){},onStart:function(t,e){},onDestroy:function(t){}},r=new(function(){function t(){}var e=t.prototype;return e.load=function(t,e,s){if(t.el="string"==typeof s?document.querySelector(s):s,t.options=n({},o,e),t.isInput="input"===t.el.tagName.toLowerCase(),t.attr=t.options.attr,t.bindInputFocusEvents=t.options.bindInputFocusEvents,t.showCursor=!t.isInput&&t.options.showCursor,t.cursorChar=t.options.cursorChar,t.cursorBlinking=!0,t.elContent=t.attr?t.el.getAttribute(t.attr):t.el.textContent,t.contentType=t.options.contentType,t.typeSpeed=t.options.typeSpeed,t.startDelay=t.options.startDelay,t.backSpeed=t.options.backSpeed,t.smartBackspace=t.options.smartBackspace,t.backDelay=t.options.backDelay,t.fadeOut=t.options.fadeOut,t.fadeOutClass=t.options.fadeOutClass,t.fadeOutDelay=t.options.fadeOutDelay,t.isPaused=!1,t.strings=t.options.strings.map((function(t){return t.trim()})),t.stringsElement="string"==typeof t.options.stringsElement?document.querySelector(t.options.stringsElement):t.options.stringsElement,t.stringsElement){t.strings=[],t.stringsElement.style.cssText="clip: rect(0 0 0 0);clip-path:inset(50%);height:1px;overflow:hidden;position:absolute;white-space:nowrap;width:1px;";var i=Array.prototype.slice.apply(t.stringsElement.children),r=i.length;if(r)for(var a=0;a<r;a+=1)t.strings.push(i[a].innerHTML.trim())}for(var l in t.strPos=0,t.currentElContent=this.getCurrentElContent(t),t.currentElContent&&t.currentElContent.length>0&&(t.strPos=t.currentElContent.length-1,t.strings.unshift(t.currentElContent)),t.sequence=[],t.strings)t.sequence[l]=l;t.arrayPos=0,t.stopNum=0,t.loop=t.options.loop,t.loopCount=t.options.loopCount,t.curLoop=0,t.shuffle=t.options.shuffle,t.pause={status:!1,typewrite:!0,curString:"",curStrPos:0},t.typingComplete=!1,t.autoInsertCss=t.options.autoInsertCss,t.autoInsertCss&&(this.appendCursorAnimationCss(t),this.appendFadeOutAnimationCss(t))},e.getCurrentElContent=function(t){return t.attr?t.el.getAttribute(t.attr):t.isInput?t.el.value:"html"===t.contentType?t.el.innerHTML:t.el.textContent},e.appendCursorAnimationCss=function(t){var e="data-typed-js-cursor-css";if(t.showCursor&&!document.querySelector("["+e+"]")){var s=document.createElement("style");s.setAttribute(e,"true"),s.innerHTML="\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      ",document.body.appendChild(s)}},e.appendFadeOutAnimationCss=function(t){var e="data-typed-fadeout-js-css";if(t.fadeOut&&!document.querySelector("["+e+"]")){var s=document.createElement("style");s.setAttribute(e,"true"),s.innerHTML="\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      ",document.body.appendChild(s)}},t}()),a=new(function(){function t(){}var e=t.prototype;return e.typeHtmlChars=function(t,e,s){if("html"!==s.contentType)return e;var i=t.substring(e).charAt(0);if("<"===i||"&"===i){var n;for(n="<"===i?">":";";t.substring(e+1).charAt(0)!==n&&!(1+ ++e>t.length););e++}return e},e.backSpaceHtmlChars=function(t,e,s){if("html"!==s.contentType)return e;var i=t.substring(e).charAt(0);if(">"===i||";"===i){var n;for(n=">"===i?"<":"&";t.substring(e-1).charAt(0)!==n&&!(--e<0););e--}return e},t}()),l=function(){function t(t,e){r.load(this,e,t),this.begin()}var e=t.prototype;return e.toggle=function(){this.pause.status?this.start():this.stop()},e.stop=function(){this.typingComplete||this.pause.status||(this.toggleBlinking(!0),this.pause.status=!0,this.options.onStop(this.arrayPos,this))},e.start=function(){this.typingComplete||this.pause.status&&(this.pause.status=!1,this.pause.typewrite?this.typewrite(this.pause.curString,this.pause.curStrPos):this.backspace(this.pause.curString,this.pause.curStrPos),this.options.onStart(this.arrayPos,this))},e.destroy=function(){this.reset(!1),this.options.onDestroy(this)},e.reset=function(t){void 0===t&&(t=!0),clearInterval(this.timeout),this.replaceText(""),this.cursor&&this.cursor.parentNode&&(this.cursor.parentNode.removeChild(this.cursor),this.cursor=null),this.strPos=0,this.arrayPos=0,this.curLoop=0,t&&(this.insertCursor(),this.options.onReset(this),this.begin())},e.begin=function(){var t=this;this.options.onBegin(this),this.typingComplete=!1,this.shuffleStringsIfNeeded(this),this.insertCursor(),this.bindInputFocusEvents&&this.bindFocusEvents(),this.timeout=setTimeout((function(){0===t.strPos?t.typewrite(t.strings[t.sequence[t.arrayPos]],t.strPos):t.backspace(t.strings[t.sequence[t.arrayPos]],t.strPos)}),this.startDelay)},e.typewrite=function(t,e){var s=this;this.fadeOut&&this.el.classList.contains(this.fadeOutClass)&&(this.el.classList.remove(this.fadeOutClass),this.cursor&&this.cursor.classList.remove(this.fadeOutClass));var i=this.humanizer(this.typeSpeed),n=1;!0!==this.pause.status?this.timeout=setTimeout((function(){e=a.typeHtmlChars(t,e,s);var i=0,o=t.substring(e);if("^"===o.charAt(0)&&/^\^\d+/.test(o)){var r=1;r+=(o=/\d+/.exec(o)[0]).length,i=parseInt(o),s.temporaryPause=!0,s.options.onTypingPaused(s.arrayPos,s),t=t.substring(0,e)+t.substring(e+r),s.toggleBlinking(!0)}if("`"===o.charAt(0)){for(;"`"!==t.substring(e+n).charAt(0)&&(n++,!(e+n>t.length)););var l=t.substring(0,e),c=t.substring(l.length+1,e+n),p=t.substring(e+n+1);t=l+c+p,n--}s.timeout=setTimeout((function(){s.toggleBlinking(!1),e>=t.length?s.doneTyping(t,e):s.keepTyping(t,e,n),s.temporaryPause&&(s.temporaryPause=!1,s.options.onTypingResumed(s.arrayPos,s))}),i)}),i):this.setPauseStatus(t,e,!0)},e.keepTyping=function(t,e,s){0===e&&(this.toggleBlinking(!1),this.options.preStringTyped(this.arrayPos,this));var i=t.substring(0,e+=s);this.replaceText(i),this.typewrite(t,e)},e.doneTyping=function(t,e){var s=this;this.options.onStringTyped(this.arrayPos,this),this.toggleBlinking(!0),this.arrayPos===this.strings.length-1&&(this.complete(),!1===this.loop||this.curLoop===this.loopCount)||(this.timeout=setTimeout((function(){s.backspace(t,e)}),this.backDelay))},e.backspace=function(t,e){var s=this;if(!0!==this.pause.status){if(this.fadeOut)return this.initFadeOut();this.toggleBlinking(!1);var i=this.humanizer(this.backSpeed);this.timeout=setTimeout((function(){e=a.backSpaceHtmlChars(t,e,s);var i=t.substring(0,e);if(s.replaceText(i),s.smartBackspace){var n=s.strings[s.arrayPos+1];s.stopNum=n&&i===n.substring(0,e)?e:0}e>s.stopNum?(e--,s.backspace(t,e)):e<=s.stopNum&&(s.arrayPos++,s.arrayPos===s.strings.length?(s.arrayPos=0,s.options.onLastStringBackspaced(),s.shuffleStringsIfNeeded(),s.begin()):s.typewrite(s.strings[s.sequence[s.arrayPos]],e))}),i)}else this.setPauseStatus(t,e,!1)},e.complete=function(){this.options.onComplete(this),this.loop?this.curLoop++:this.typingComplete=!0},e.setPauseStatus=function(t,e,s){this.pause.typewrite=s,this.pause.curString=t,this.pause.curStrPos=e},e.toggleBlinking=function(t){this.cursor&&(this.pause.status||this.cursorBlinking!==t&&(this.cursorBlinking=t,t?this.cursor.classList.add("typed-cursor--blink"):this.cursor.classList.remove("typed-cursor--blink")))},e.humanizer=function(t){return Math.round(Math.random()*t/2)+t},e.shuffleStringsIfNeeded=function(){this.shuffle&&(this.sequence=this.sequence.sort((function(){return Math.random()-.5})))},e.initFadeOut=function(){var t=this;return this.el.className+=" "+this.fadeOutClass,this.cursor&&(this.cursor.className+=" "+this.fadeOutClass),setTimeout((function(){t.arrayPos++,t.replaceText(""),t.strings.length>t.arrayPos?t.typewrite(t.strings[t.sequence[t.arrayPos]],0):(t.typewrite(t.strings[0],0),t.arrayPos=0)}),this.fadeOutDelay)},e.replaceText=function(t){this.attr?this.el.setAttribute(this.attr,t):this.isInput?this.el.value=t:"html"===this.contentType?this.el.innerHTML=t:this.el.textContent=t},e.bindFocusEvents=function(){var t=this;this.isInput&&(this.el.addEventListener("focus",(function(e){t.stop()})),this.el.addEventListener("blur",(function(e){t.el.value&&0!==t.el.value.length||t.start()})))},e.insertCursor=function(){this.showCursor&&(this.cursor||(this.cursor=document.createElement("span"),this.cursor.className="typed-cursor",this.cursor.setAttribute("aria-hidden",!0),this.cursor.innerHTML=this.cursorChar,this.el.parentNode&&this.el.parentNode.insertBefore(this.cursor,this.el.nextSibling)))},t}(),c=s(2699),p=s.n(c),h=s(2053),u=s(3493),d=s(1687),m=s(2187),g=s.n(m),f=s(9840);function y(t){let{iconName:e,className:s="",iconPrefix:n="",...o}=t;return(0,i.useEffect)((()=>function(t){if(void 0===t&&(t=""),window.CPS_ICONFONT_INIT)return;const e=t||"//at.alicdn.com/t/c/font_3959151_f86s1etjfv.js",s=document.createElement("script");s.src=e,document.body.appendChild(s),window.CPS_ICONFONT_INIT=!0}()),[]),(0,f.jsx)("svg",{className:g()("iconfontDefault",s),"aria-hidden":"true",...o,children:(0,f.jsx)("use",{xlinkHref:`#${n}${e}`})})}const b={heroBanner:"heroBanner_qdFl",buttons:"buttons_AeoN",containerRight:"containerRight_TZdB",containerLeft:"containerLeft_b8Ow"};function w(){const{siteConfig:t}=(0,d.Z)(),e=(0,i.useRef)(null);return(0,i.useEffect)((()=>{const s=new l(e.current,{strings:p().shuffle(t.tagline.split(",")),startDelay:1e3,typeSpeed:120,backSpeed:120,backDelay:4e3,loop:!0});return()=>s.destroy()}),[]),(0,f.jsx)("p",{className:"my-2 min-h-[10rem] hero__subtitle",children:(0,f.jsx)("span",{className:"transform",ref:e})})}function x(){const{siteConfig:t}=(0,d.Z)();return(0,f.jsxs)(u.Z,{type:"left",duration:800,className:"px-4 text-center text-white",children:[(0,f.jsx)("h1",{id:"postitionElement",className:"hero__title h-[200px] pointer-events-none"},"title"),(0,f.jsx)("p",{className:"my-6 underline decoration-dotted",children:(0,f.jsx)("a",{href:"docs/\u301007\u3011\u5e38\u8bc6\u79d1\u666e/\u793e\u4f1a\u771f\u5b9e/\u540d\u4eba\u540d\u8a00",children:"\u8fd9\u4e9b\u5e74\u6211\u4eec\u542c\u5230\u7684\u540d\u4eba\u75af\u8a00"})},"content"),(0,f.jsx)(w,{}),(0,f.jsxs)("div",{className:`${b.buttons} mx-2 mt-4 flex justify-center gap-2`,children:[(0,f.jsx)(h.Z,{className:"button button--secondary button--lg",to:"/",children:"\u4f5c\u54c1\u96c6 \ud83d\udcbc"},"b1"),(0,f.jsx)(h.Z,{className:"button button--secondary button--lg",to:"/",children:"\u4e2a\u4eba\u7b80\u4ecb \ud83d\udcc4"},"b2")]},"btns"),(0,f.jsxs)(u.Z,{delay:1e3,duration:1400,type:["bottom","top"],ease:["easeOutQuart","easeInOutQuart"],className:"flex justify-center gap-3 my-3 text-2xl",component:"footer",children:[(0,f.jsx)("div",{children:(0,f.jsx)(y,{className:"home-swiper-icon-default",iconName:"logoicon-bilibili-line"})},"a"),(0,f.jsx)("div",{children:(0,f.jsx)(y,{className:"home-swiper-icon-default",iconName:"logoicon-juejin"})},"b"),(0,f.jsx)("div",{children:(0,f.jsx)(y,{className:"home-swiper-icon-default",iconName:"logoicon-github-fill"})},"c"),(0,f.jsx)("div",{children:(0,f.jsx)(y,{className:"home-swiper-icon-default",iconName:"logoicon-gitee"})},"d"),(0,f.jsx)("div",{children:(0,f.jsx)(y,{className:"home-swiper-icon-default",iconName:"logoicon-QQ-circle-fill"})},"e"),(0,f.jsx)("div",{children:(0,f.jsx)(y,{className:"home-swiper-icon-default",iconName:"logoicon-weixin"})},"f")]})]})}},2591:(t,e,s)=>{"use strict";s.r(e),s.d(e,{default:()=>y});var i=s(3518),n=s(4669),o=s(3493),r=s(8346),a=s(8384),l=s(8808),c=s(1949),p=s(5605),h=s(1789),u=s(2323),d=s(5759),m=s(8649),g=s(9840);const f=n.ZP.Element;class y extends i.Component{currtAnim=c.Ui.right;DATA=[];static defaultProps={alignmentMode:"horizontal",showText:!1,showImg:!0,showArrow:!0,autoSwitch:3e4};constructor(t){super(t),this.DATA=u.Z,this.state={showInt:0,delay:0,oneEnter:!1,webp:!!t.useWebp&&(0,p.R)()}}componentWillUnmount(){this.autoSwitchInterID&&clearInterval(this.autoSwitchInterID),this.setState=(t,e)=>null}componentDidMount(){this.props.autoSwitch>0&&setTimeout((()=>{this.onRight("autoSwitch"),this.autoSwitchInterID=setInterval((()=>{this.onRight("autoSwitch")}),this.props.autoSwitch)}),1e3)}onChange=()=>{this.state.showInt,this.state.oneEnter||this.setState({delay:300,oneEnter:!0})};onLeft=t=>{"string"!=typeof t&&this.autoSwitchInterID&&(clearInterval(this.autoSwitchInterID),this.autoSwitchInterID=0);let e=this.state.showInt;this.currtAnim=c.Ui.left,e<=0?e=u.Z.length-1:e-=1,this.setState({showInt:e}),this.bannerImg.prev(),this.bannerText.prev()};onRight=t=>{"string"!=typeof t&&this.autoSwitchInterID&&(clearInterval(this.autoSwitchInterID),this.autoSwitchInterID=0);let e=this.state.showInt;this.currtAnim=c.Ui.right,e>=u.Z.length-1?e=0:e+=1,this.setState({showInt:e}),this.bannerImg.next(),this.bannerText.next()};switchPage=t=>{const e=this.state.showInt;e!=t&&(e<t?this.onRight():this.onLeft())};render(){const t=this.DATA.map(((t,e)=>{let s=t.preview,i=t.logo;return this.state.webp&&(s=t.preview.replace(".png",".webp"),i=t.logo.replace(".png",".webp")),(0,g.jsx)(f,{leaveChildHide:!0,children:(0,g.jsxs)(o.Z,{className:"relative flex items-center justify-center w-full h-full",animConfig:this.currtAnim,duration:t=>"map"===t.key?800:1e3,delay:[e?300:this.state.delay,0],ease:["easeOutCubic","easeInQuad"],children:[(0,g.jsx)("div",{className:["absolute top-0 w-full","vertical"==this.props.alignmentMode?"h-1/2":"h-2/3"].join(" "),style:{background:t.mainColor}},"bg"),(0,g.jsx)("div",{className:["vertical"==this.props.alignmentMode?"bottom-[15%] w-4/5":"w-4/5","absolute cursor-pointer"].join(" "),children:(0,g.jsx)("img",{src:s,className:"object-fill w-full h-full hover:opacity-90",alt:"",onClick:e=>(0,h.Z)(t),crossOrigin:"anonymous"})},"map")]},"img-wrapper")},e)})),e=this.DATA.map(((t,e)=>{const{title:s,content:i,subColor:n}=t;return(0,g.jsx)(f,{prefixCls:"vertical"==this.props.alignmentMode?"px-6 py-12 md:px-3 md:py-6":"px-10 py-4 md:px-5 md:py-2",children:(0,g.jsxs)(o.Z,{className:"flex flex-col items-start",type:"bottom",duration:800,delay:[e?800:this.state.delay+500,0],children:[(0,g.jsx)("h2",{className:"py-2 my-1 text-xl",children:(0,g.jsx)("a",{className:"text-gray-700",href:t.website,children:s})},"title"),(0,g.jsx)("em",{style:{background:n},className:"inline-block rounded-sm w-16 h-[2px]"},"line"),(0,g.jsx)("p",{className:"mt-3 text-sm",children:i},"content")]})},e)})),s=()=>(0,g.jsx)("div",{className:"absolute w-full h-10 bottom-0 z-[1] flex items-center justify-center gap-4",children:this.DATA.map(((t,e)=>{const{mainColor:s}=t,i=e.toString();return(0,g.jsx)("div",{onClick:t=>this.switchPage(e),style:{background:s},className:["border-2 border-solid border-white","w-5 h-5 rounded-full cursor-pointer","hover:w-10 transition-all duration-300"].join(" ")},i)}))});return(0,g.jsxs)("div",{className:["overflow-hidden relative w-full h-[600px]","md:h-[650px]","lg:h-[750px]","xl:h-[900px]","flex justify-evenly items-center pt-60 pb-64 px-4 text-gray-700"].join(" "),style:{background:this.DATA[this.state.showInt].subColor,transition:"background 1s"},children:[(0,g.jsx)("div",{id:"homeTitleComment",className:"home-title w-[400px]",children:(0,g.jsx)(d.default,{})}),(0,g.jsx)(m.Z,{width:600,height:200,bubbleScale:1.5,positionElementId:"postitionElement"}),(0,g.jsxs)("div",{className:["md:w-[500px] md:h-[400px]","lg:w-[500px] lg:h-[350px]","xl:w-[950px] xl:h-[650px]","w-[4 50px] h-[550px] min-w-[300px]","shadow-xl bg-white rounded-md overflow-hidden relative"].join(" "),children:[(0,g.jsx)(n.ZP,{className:["cps-swiper-img relative overflow-hidden","vertical"==this.props.alignmentMode?"w-1/2 h-full inline-block z-[1]":"w-full min-w-[450px] h-full block absolute z-[2]"].join(" "),sync:!0,type:"across",duration:1e3,ease:"easeInOutExpo",arrow:!1,thumb:!1,ref:t=>this.bannerImg=t,onChange:this.onChange,dragPlay:!1,children:t}),(0,g.jsx)(n.ZP,{style:{backdropFilter:"blur(5px)"},className:["cps-swiper-text overflow-hidden z-[3]","vertical"==this.props.alignmentMode?"w-1/2 h-full inline-block relative":"w-full h-1/3 block absolute bottom-0 bg-white/50"].join(" "),sync:!0,type:"across",duration:1e3,arrow:!1,thumb:!1,ease:"easeInOutExpo",ref:t=>this.bannerText=t,dragPlay:!1,children:e}),this.props.showArrow?(0,g.jsxs)(r.Z,{enter:{opacity:0,type:"from"},leave:{opacity:0},children:[(0,g.jsx)(a.Z,{className:"z-[3] absolute text-2xl left-1 -mt-[20px] top-1/2",onClick:this.onLeft}),(0,g.jsx)(l.Z,{className:"z-[3] right-1 absolute text-2xl -mt-[20px] top-1/2",onClick:this.onRight})]}):null]}),(0,g.jsx)(s,{},"items")]})}}}}]);