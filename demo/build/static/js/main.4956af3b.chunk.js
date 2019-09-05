(window["webpackJsonpvfs-demo"]=window["webpackJsonpvfs-demo"]||[]).push([[0],{165:function(e,t,n){e.exports=n(371)},170:function(e,t,n){},364:function(e,t,n){},368:function(e,t,n){},369:function(e,t,n){},371:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),i=n(6),c=n.n(i),o=(n(170),n(171),n(104)),s=(n(173),n(158)),l=(n(105),n(48)),u=(n(106),n(160)),m=(n(177),n(103)),f=n(42),p=n.n(f),h=n(77),d=n(30),v=(n(373),n(101)),b=(n(372),n(159)),E=(n(185),n(5)),g=function(e){var t=e.onUploadChange;return r.a.createElement("div",{className:"upload-from-main"},r.a.createElement(v.a,{layout:"vertical"},r.a.createElement(v.a.Item,null,r.a.createElement(b.a.Dragger,{name:"zipFiles",accept:".zip,.tar",beforeUpload:function(e){return t(new Blob([e],{type:"text/plain"})),!1},showUploadList:!1},r.a.createElement("p",{className:"ant-upload-drag-icon"},r.a.createElement(E.a,{type:"inbox"})),r.a.createElement("p",{className:"ant-upload-text"},"\u5355\u51fb\u6216\u62d6\u52a8\u6587\u4ef6\u5230\u6b64\u533a\u57df\u4e0a\u4f20"),r.a.createElement("p",{className:"ant-upload-hint"},"\u4ec5\u652f\u6301 ZIP \u538b\u7f29\u5305")))))},w=n(73),y=n(161),j=(n(362),n(102)),O=n(153),x=n(154),D=n(162),N=n(155),k=n(163),S=function(e){function t(){var e;return Object(O.a)(this,t),(e=Object(D.a)(this,Object(N.a)(t).call(this))).children=void 0,e.init(),e}return Object(k.a)(t,e),Object(x.a)(t,[{key:"init",value:function(){this.children=[]}},{key:"setChildren",value:function(e){return this.children=e||[],this}}]),t}(w.Inode),C=function(e){return(new S).setName(e.name).setDate(e.date||new Date).setDosPermissions(e.dosPermissions).setIsDir(e.isDir).setParentPath(e.parentPath).setPath(e.path).setUnixPermissions(e.unixPermissions)},P=(n(364),j.a.TreeNode),T=j.a.DirectoryTree,A=n(367),I=function(e){var t=e.data,n=e.vfsService,i=e.onLaunchFileDetails,c=Object(a.useState)([]),o=Object(d.a)(c,2),s=o[0],l=o[1];Object(a.useEffect)(function(){Array.isArray(t)&&l(t.map(function(e){return C(e)}))},[t]);var u=function(e){n&&n.ls(e.path).then(function(t){var n=t.map(function(e){return C(e)});e.setChildren(function(e){var t=e.slice(0);return function e(t){if(t.length<=1)return t;for(var n,a=t.splice(Math.floor(t.length/2),1)[0],r=[],i=[],c=0;c<t.length;c++){var o=t[c];!0===o.isDir&&!1===a.isDir?r.push(o):o.isDir===a.isDir?(n=o,a.name.localeCompare(n.name)>0?r.push(o):i.push(o)):i.push(o)}return e(r).concat([a],e(i))}(t)}(n)),l(Object(y.a)(s))})},m=function(e){n&&i&&n.read(e.path).then(function(e){"string"===typeof e&&i(e)})};return r.a.createElement("div",{className:"tree-comp",style:{overflow:"auto",height:"100%",maxWidth:"300px",minWidth:"240px"}},s.length?r.a.createElement(T,{onSelect:function(e){if(n){var t,a=Object(d.a)(e,1)[0];if(n.exist(a)){var r=(t=a,function e(t){return t.reduce(function(t,n){return Array.isArray(n.children)&&n.children.length>0?t.concat(e(n.children)):t.concat(n)},[])}(s).find(function(e){return e.path===t}));if(!r)return;r.isDir?u(r):m(r)}}}},function e(t){return t.map(function(t){return r.a.createElement(P,{icon:t.isDir?null:r.a.createElement("i",{className:A.getClassWithColor(t.name)||"fa-file-o"}),title:t.name,key:t.path,dataRef:t,isLeaf:!t.isDir},e(t.children))})}(s)):null)},U=(n(368),n(369),function(e){var t=e.content;return r.a.createElement("div",{className:"details-main"},r.a.createElement("div",{className:"pre-content"},r.a.createElement("pre",null,t)))}),W=new w.ZipVFSService,z=function(){var e=Object(a.useState)([]),t=Object(d.a)(e,2),n=t[0],i=t[1],c=Object(a.useState)(),f=Object(d.a)(c,2),v=f[0],b=f[1],E=Object(a.useState)(""),w=Object(d.a)(E,2),y=w[0],j=w[1],O=Object(a.useState)(!1),x=Object(d.a)(O,2),D=x[0],N=x[1],k=Object(a.useState)(""),S=Object(d.a)(k,2),C=S[0],P=S[1],T=function(){var e=Object(h.a)(p.a.mark(function e(t){return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:W.mount(t).then(Object(h.a)(p.a.mark(function e(){var t;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,W.ls("/");case 2:t=e.sent,i(t||[]),b(W),window.vfsService=W;case 6:case"end":return e.stop()}},e)})));case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),A=function(){N(!0),fetch(y,{headers:{"content-type":"application/zip"}}).then(function(){var e=Object(h.a)(p.a.mark(function e(t){var n;return p.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!t||200!==t.status||"application/zip"!==t.headers.get("content-type")){e.next=5;break}return e.next=3,t.blob();case 3:n=e.sent,T(n);case 5:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}()).finally(function(){N(!1)})};return r.a.createElement("div",{className:"page"},r.a.createElement(o.a,{style:{height:"100vh"}},r.a.createElement(o.a.Content,{className:"content"},r.a.createElement("div",{className:"left"},r.a.createElement(g,{onUploadChange:T}),r.a.createElement(m.a.Text,{style:{textAlign:"center",width:"100%",display:"inline-block"}},"or"),r.a.createElement("div",{className:"feact-url"},r.a.createElement(m.a.Text,null,"\u8fd4\u56de Blob \u6570\u636e\u683c\u5f0f\u7684\u63a5\u53e3"),r.a.createElement(u.a,{style:{marginTop:"10px"},value:y,onChange:function(e){return j(e.target.value)}}),r.a.createElement(l.a,{type:"primary",style:{width:"100%",marginTop:"10px"},onClick:A},"\u786e\u5b9a"))),r.a.createElement("div",{className:"right"},r.a.createElement(s.a,{spinning:D,style:{marginTop:"20px"}},r.a.createElement(I,{data:n,vfsService:v,onLaunchFileDetails:function(e){P(e)}}))),r.a.createElement("div",{className:"file-details"},r.a.createElement(U,{content:C})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(z,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[165,1,2]]]);
//# sourceMappingURL=main.4956af3b.chunk.js.map