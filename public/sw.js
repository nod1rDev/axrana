if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,n)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let t={};const o=e=>a(e,c),r={module:{uri:c},exports:t,require:o};s[c]=Promise.all(i.map((e=>r[e]||o(e)))).then((e=>(n(...e),t)))}}define(["./workbox-c2c0676f"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/NjMo5e2Dujqhd6V94h8q8/_buildManifest.js",revision:"b222cbf4d8e1f47e27a8925222733e53"},{url:"/_next/static/NjMo5e2Dujqhd6V94h8q8/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1444-f7806009a7e5fece.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/1769-7ce11b42cc31ba4e.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/1793-be3c7aa3ca3b56bb.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/2287-34ca9716f95b58dc.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/2403-fe3e1de878566730.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/292-2cb5bfb9d1f02d27.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/3903-d67371f8e47e290b.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/3983-3490cf59ccfe5e17.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/4059-eca1351d8e3fafb7.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/4095-58d2c70577394f6d.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/5471-9e57cd0b4c4800e6.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/6669-a6a07705a2f3414e.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/7301-0236ae7c6c62f24e.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/7574-c77c6b1de88ad153.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/8430-76b2ba470563f8fd.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/8941-eae0d496468b64b1.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/91-4ca1d0c9936b96eb.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/9753-8eb591207efd74a2.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/9822-ef47cc1166afbb8b.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/%5Bid%5D/page-0cf83e3047ff826f.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/_not-found/page-3920b4711d064c06.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/layout-b559d7043b33f18b.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/maxsus/%5Bid%5D/page-1340f6d5327176b8.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/maxsus/add/page-28117822442126d7.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/maxsus/page-b22ec590f6efff88.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/names/page-dabee346b227dc93.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/otchot/%5Bid%5D/page-c9441c112f68748d.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/otchot/add/page-a1cf88d046391ee7.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/otchot/page-5360de683ce29d9e.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/page-9a4a7c98b7f442ba.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/read/%5Bid%5D/page-851838f6c38fb62d.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/read/page-53c630ce3d8e1256.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/shartnoma/add/page-2fafe540819dce39.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/shartnoma/edit/%5Bid%5D/page-92af87b57f22bc94.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/shartnoma/edit/page-e2866590391cae35.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/shartnoma/page-a49796dbbc417a32.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/shaxsiy/page-79defddad4e56563.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/tip/%5Bid%5D/page-4b170c1b3c389f42.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/tip/add/page-a023944a549774bf.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/tip/batalyon/page-a14075a0f81730d8.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/tip/page-ce5bf716dad95ef7.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/topshiriq/%5Bid%5D/page-6431e80e45693a9a.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/app/topshiriq/page-650c4b392ffe404c.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/fd9d1056-3e5d3c630784c984.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/framework-a63c59c368572696.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/main-7638c49029f0fce0.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/main-app-06ace929cbb62499.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/pages/_app-00b74eae5e8dab51.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/pages/_error-c72a1f77a3c0be1b.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-e5d0492eff32270d.js",revision:"NjMo5e2Dujqhd6V94h8q8"},{url:"/_next/static/css/c201541324afb186.css",revision:"c201541324afb186"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/draft.svg",revision:"578639ea0279cd42fa349a2856ec8157"},{url:"/icon-192x192.png",revision:"b69e71ca81d420777498dcaf94828c71"},{url:"/icon-256x256.png",revision:"d97e6c2caf8da03d6a735b1a53c88867"},{url:"/icon-384x384.png",revision:"56fdf9ec759bc3ca6cdceff6d7c4f5d4"},{url:"/icon-512x512.png",revision:"1f3351099618a3bf2dd0e95b68bf260c"},{url:"/manifest.json",revision:"74abe398b54c7b894e5ae4e51ffc1aed"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/paid.svg",revision:"1d42fa198559781abe4bbbc0246097f7"},{url:"/pinding.svg",revision:"4022e909bcb88d8b652c44479c1bfc7b"},{url:"/swe-worker-5c72df51bb1f6ee0.js",revision:"5a47d90db13bb1309b25bdf7b363570e"},{url:"/vercel.svg",revision:"61c6b19abff40ea7acd577be818f3976"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
