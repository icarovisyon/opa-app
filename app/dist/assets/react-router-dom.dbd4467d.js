import{r as o}from"./react.4e438aeb.js";import{R as m}from"./react-router.bef492ad.js";import{c as f}from"./@remix-run.335c8a54.js";import{j as p}from"./@mui.cefe77e7.js";/**
 * React Router DOM v6.4.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function x(e){let{basename:n,children:c,window:l}=e,r=o.exports.useRef();r.current==null&&(r.current=f({window:l,v5Compat:!0}));let t=r.current,[s,u]=o.exports.useState({action:t.action,location:t.location});return o.exports.useLayoutEffect(()=>t.listen(u),[t]),p(m,{basename:n,children:c,location:s.location,navigationType:s.action,navigator:t})}var a;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmitImpl="useSubmitImpl",e.UseFetcher="useFetcher"})(a||(a={}));var i;(function(e){e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(i||(i={}));export{x as B};
