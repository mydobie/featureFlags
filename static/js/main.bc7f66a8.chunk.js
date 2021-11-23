(this["webpackJsonp@mydobie/feature-flags"]=this["webpackJsonp@mydobie/feature-flags"]||[]).push([[0],{39:function(e,t,r){"use strict";r.r(t);var n,a=r(1),s=r.n(a),c=r(14),i=r(13),o=r.n(i),l=r(6),u=r(19),d=r(3),j=r(9),b=r(7),h="featureFlags",f="featuresFlagsPersist",O=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],r=Array.from(e);return t.forEach((function(e){var t=r.findIndex((function(t){return t.id===e.id}));-1===t?r.push({id:e.id,active:e.active,description:e.description}):r[t].active=e.active})),r},v=function(){var e;return JSON.parse(null!==(e=localStorage.getItem(h))&&void 0!==e?e:"[]")},g=function(e){return e.FeatureFlags.features},p=function(e){return e.FeatureFlags.persist},x=function(e){var t,r,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"FeatureFlags";return void 0!==n?null===(r=n[a].features.find((function(t){return t.id===e})))||void 0===r?void 0:r.active:(null===(t=v().find((function(t){return t.id===e})))||void 0===t?void 0:t.active)||!1},m=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0,r=e,n=s.a.useState((function(){try{var e=window.localStorage.getItem(r);return e?JSON.parse(e):t}catch(n){return console.log(n),t}})),a=Object(d.a)(n,2),c=a[0],i=a[1],o=function(e){try{var t=e instanceof Function?e(c):e;i(t),window.localStorage.setItem(r,JSON.stringify(t))}catch(n){console.log(n)}};return[c,o]},y=r(11),F=r(20),S="featureFlagsAdd",E="featureFlagsEdit",R="featureFlagsReset",_={features:[],persist:!1},A=Object(F.a)((function(e,t){if(!e)return _;switch(t.type){case S:var r=t.payload,n=r.features,a=r.overrides,s=r.persist,c=r.reset||!s?[]:Object(y.a)(e.features);O(n,a).forEach((function(e){var t=c.findIndex((function(t){return t.id===e.id}));-1===t?c.push(Object(b.a)(Object(b.a)({},e),{},{original:e.active})):c[t].original=e.active})),e.persist=t.payload.persist,e.features=c;break;case E:var i=Object(y.a)(e.features),o=i.findIndex((function(e){return e.id===t.payload.id}));i[o].active=t.payload.active,e.features=i;break;case R:var l=Object(y.a)(e.features).map((function(e){return Object(b.a)(Object(b.a)({},e),{},{active:e.original})}));e.features=l}})),N=function(e){var t,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"FeatureFlags";return(null===(t=Object(l.c)((function(e){return e[r].features})).find((function(t){return t.id===e})))||void 0===t?void 0:t.active)||!1},C=r(0),T=function(){return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",viewBox:"0 0 16 16","aria-hidden":"true","data-testid":"flagNotInitialWarning",children:[Object(C.jsx)("path",{d:"M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"}),Object(C.jsx)("path",{d:"M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"})]}),Object(C.jsx)("span",{className:"sr-only visually-hidden",children:"Differs from default"})]})},k=function(e){var t=e.features,r=void 0===t?[]:t,n=e.onFeatureClick,a=void 0===n?function(){}:n,s=e.onFeatureReset,c=void 0===s?function(){}:s,i=e.persist,o=void 0!==i&&i,l=e.readonly,u=void 0!==l&&l;return Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)("ul",{"data-testid":"coreFeatureFlagsUI",children:r.map((function(e){var t;return Object(C.jsx)("li",{children:Object(C.jsxs)("div",{className:"form-check form-switch custom-control custom-switch",children:[Object(C.jsx)("input",{className:"form-check-input custom-control-input",type:"checkbox",id:e.id,checked:e.active,onChange:function(t){a(e.id,t.target.checked)},disabled:u})," ",Object(C.jsxs)("label",{className:"form-check-label custom-control-label",htmlFor:e.id,children:[null!==(t=e.description)&&void 0!==t?t:e.id," ",e.active!==e.original?Object(C.jsx)(T,{}):null]})]})},e.id)}))}),o&&!u?Object(C.jsxs)("p",{className:"alert alert-secondary",role:"alert","data-testid":"persistAlert",children:[Object(C.jsx)("strong",{children:"NOTE:"})," Feature flag values are persisting on page refresh. This is not recommended for a production environment. Check the"," ",Object(C.jsx)("code",{children:"persist"})," setting when calling ",Object(C.jsx)("code",{children:"loadFeatureFlags"})," ","or ",Object(C.jsx)("code",{children:"loadFeatureFlagsRedux"}),"."]}):null,u?null:Object(C.jsx)("button",{type:"button",className:"btn btn-success","data-testid":"resetButton",onClick:function(){return c()},children:"Reset flags to default"})]})},P=function(e){var t=e.onFeatureChange,r=void 0===t?function(){}:t,n=e.onFeatureReset,a=void 0===n?function(){}:n,s=e.readonly,c=void 0!==s&&s,i=Object(l.b)();return Object(C.jsx)(C.Fragment,{children:Object(C.jsx)(k,{features:Object(l.c)(g),onFeatureClick:function(e,t){i({type:E,payload:{id:e,active:t}}),r(e,t)},onFeatureReset:function(){i({type:R}),a()},persist:Object(l.c)(p),readonly:c})})},w=r(17),I=r.n(w),L=r(21),D=function(e){var t=e.onFeatureChange,r=void 0===t?function(){}:t,n=e.onFeatureReset,a=void 0===n?function(){}:n,s=e.readonly,c=void 0!==s&&s,i=m(h),o=Object(d.a)(i,2),l=o[0],u=o[1],j=m(f),O=Object(d.a)(j,1)[0];return Object(C.jsx)(C.Fragment,{children:Object(C.jsx)(k,{persist:O,features:l,onFeatureClick:function(){var e=Object(L.a)(I.a.mark((function e(t,n){var a;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=Object(y.a)(l).map((function(e){return e.id===t?Object(b.a)(Object(b.a)({},e),{},{active:n}):e})),u(a),r(t,n);case 3:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}(),onFeatureReset:function(){var e=v().map((function(e){return Object(b.a)(Object(b.a)({},e),{},{active:e.original||!1})}));u(e),a()},readonly:c})})},G="/local",U="/redux",V="/readonly",J="COLORS",z="DINOS",H="FRUITS",K="VEGGIES",W=[{id:H,active:!1,description:"Fruit list"},{id:K,active:!0,description:"Vegetable list"}],B=[{id:J,active:!1,description:"Color list"},{id:z,active:!1,description:"Dino list"}],M=function(){var e=Object(l.c)((function(e){return x(K,e)})),t=Object(l.c)((function(e){return x(H,e)})),r={backgroundColor:"#ccc",color:"#000"};return Object(C.jsx)("nav",{children:Object(C.jsxs)("ul",{className:"nav",children:[Object(C.jsx)("li",{className:"nav-item",children:Object(C.jsx)(j.b,{className:"nav-link",to:"/",children:"Home"})}),Object(C.jsx)("li",{className:"nav-item",children:Object(C.jsx)(j.b,{className:"nav-link",to:G,children:"Local storage"})}),Object(C.jsx)("li",{className:"nav-item",children:Object(C.jsx)(j.b,{className:"nav-link",to:U,children:"Redux"})}),Object(C.jsx)("li",{className:"nav-item",children:Object(C.jsx)(j.b,{className:"nav-link",to:V,children:"Read only"})}),x(J)?Object(C.jsx)("li",{className:"nav-item nav-link",style:r,children:"Link to Colors"}):null,x(z)?Object(C.jsx)("li",{className:"nav-item nav-link",style:r,children:"Link to Dinos"}):null,t?Object(C.jsx)("li",{className:"nav-item nav-link",style:r,children:"Link to Fruits"}):null,e?Object(C.jsx)("li",{className:"nav-item nav-link",style:r,children:"Link to Veggies"}):null]})})},q=r(2),Q=function(){var e=N(K),t=N(H);return Object(C.jsxs)("div",{className:"container",children:[Object(C.jsx)("h1",{children:"Feature flags - redux"}),Object(C.jsx)(P,{onFeatureChange:function(e,t){console.log("Feature flag ",e," is active:",t)},onFeatureReset:function(){console.log("Redux based features have been reset")}}),t?Object(C.jsxs)("div",{children:[Object(C.jsx)("hr",{}),Object(C.jsx)("h2",{children:"Fruit content"}),Object(C.jsx)("p",{children:"Thai basil curry dark chocolate grapefruit avocado basil pesto habanero golden cherry balsamic vinaigrette spicy kimchi Thai curry roasted brussel sprouts blueberry pops scotch bonnet pepper creamiest strawberry mango smoothie banana creamy cauliflower alfredo sauce udon noodles picnic crispy salted coriander ginger carrot spiced juice hazelnut shiitake."})]}):null,e?Object(C.jsxs)("div",{children:[Object(C.jsx)("hr",{}),Object(C.jsx)("h2",{children:"Veggie content"}),Object(C.jsx)("p",{children:"Fiery fruit hot Thai super chili red amazon pepper with Thai sun pepper red lentil curry tabasco pepper summertime crumbled lentils blueberries crunchy seaweed basil roasted peanuts tofu avocado dressing drizzle orange naga viper cremini mushrooms alfalfa sprouts picnic salad green pepper black bean wraps dark and stormy overflowing a delicious meal leek lychee."})]}):null]})},X=function(e){var t=e.onFeatureChange,r=void 0===t?function(){}:t;return Object(C.jsxs)("div",{className:"container",children:[Object(C.jsx)("h1",{children:"Feature flags - local storage"}),Object(C.jsx)(D,{onFeatureChange:function(e,t){r(),console.log("Feature flag ",e,"is active:",t)},onFeatureReset:function(){r(),console.log("Local storage based features have been reset")}}),x(J)?Object(C.jsxs)("div",{children:[Object(C.jsx)("hr",{}),Object(C.jsx)("h2",{children:"Colors content"}),Object(C.jsx)("p",{children:"Wafer gummi bears drag\xe9e cheesecake gummi bears carrot cake tart jelly-o sweet roll. Tart souffl\xe9 chocolate cake marzipan sweet roll tootsie roll wafer gummies. Souffl\xe9 tiramisu cheesecake ice cream lemon drops pastry oat cake ice cream donut. Candy canes liquorice souffl\xe9 danish brownie macaroon macaroon drag\xe9e."})]}):null,x(z)?Object(C.jsxs)("div",{children:[Object(C.jsx)("hr",{}),Object(C.jsx)("h2",{children:"Dinos content"}),Object(C.jsx)("p",{children:"Lessemsaurus Acristavus Koreaceratops Nebulasaurus Propanoplosaurus Owenodon Onychosaurus Rayososaurus Nurosaurus Lambeosaurus Tethyshadros Bellusaurus Chromogisaurus Nanotyrannus Monoclonius Sterrholophus Dryosaurus Galvesaurus Geranosaurus Aviatyrannis Ricardoestesia Omnivoropteryx Tianyuraptor Kakuru Cylindricodon Stenopelix Ornatotholus Cystosaurus Struthiosaurus Rileyasuchus."})]}):null]})},Y=function(){return Object(C.jsxs)("div",{className:"container",children:[Object(C.jsx)("h1",{children:"Local Storage Flags - Read Only"}),Object(C.jsx)(D,{readonly:!0}),Object(C.jsx)("hr",{}),Object(C.jsx)("h1",{children:"Redux Flags - Read Only"}),Object(C.jsx)(P,{readonly:!0})]})},Z=function(){var e=function(){var e=s.a.useState([{},function(){}]),t=Object(d.a)(e,2),r=t[0],n=t[1];return[r,function(){fetch("/featureFlags/versions.json").then((function(e){return e.json()})).then((function(e){if(!e)throw Error("No version data");n(e)})).catch((function(){return console.error("Error finding versions file")}))}]}(),t=Object(d.a)(e,2),r=t[0],n=t[1];return s.a.useEffect((function(){n()}),[]),Object(C.jsxs)("div",{className:"container",children:[Object(C.jsx)("div",{className:"row",children:Object(C.jsxs)("div",{className:"col",children:[Object(C.jsx)("h1",{children:"Feature Flags demo"}),Object(C.jsx)("p",{children:"This simple package allows you mark items as feature flags and then set the availability of those items through configuration."})]})}),Object(C.jsx)("div",{className:"row",children:Object(C.jsxs)("div",{className:"col",children:[Object(C.jsx)("hr",{}),Object(C.jsx)("h2",{children:"Version: "}),Object(C.jsxs)("ul",{children:[Object(C.jsxs)("li",{children:[Object(C.jsx)("strong",{children:"Project Name: "}),"@mydobie/feature-flags"]}),Object(C.jsxs)("li",{children:[Object(C.jsx)("strong",{children:"Project Version: "}),"2.3.1"]}),Object(C.jsxs)("li",{children:[Object(C.jsx)("strong",{children:"State persists on refresh: "}),"false"]}),Object(C.jsxs)("li",{children:[Object(C.jsx)("strong",{children:"Git Commit: "}),"780245c"]}),Object(C.jsxs)("li",{children:[Object(C.jsx)("strong",{children:"React Version: "}),s.a.version]}),Object(C.jsxs)("li",{children:[Object(C.jsx)("strong",{children:"React Redux: "}),r["react-redux"]]}),Object(C.jsxs)("li",{children:[Object(C.jsx)("strong",{children:"Bootstrap CSS Version: "}),r.bootstrap]})]})]})})]})},$=r.p+"static/media/page_not_found.61ba8739.svg",ee=function(){return Object(C.jsxs)("div",{className:"container",children:[Object(C.jsx)("h1",{children:"Page not found"}),Object(C.jsx)("p",{children:"The page you requested could not be found."}),Object(C.jsx)("p",{style:{textAlign:"center"},children:Object(C.jsx)("img",{src:$,className:"App-logo",alt:""})})]})},te=function(e){var t=e.onFeatureChange,r=void 0===t?function(){}:t;return Object(C.jsx)("div",{children:Object(C.jsxs)(q.c,{children:[Object(C.jsx)(q.a,{path:"/",element:Object(C.jsx)(Z,{})}),Object(C.jsx)(q.a,{path:G,element:Object(C.jsx)(X,{onFeatureChange:r})}),Object(C.jsx)(q.a,{path:U,element:Object(C.jsx)(Q,{})}),Object(C.jsx)(q.a,{path:V,element:Object(C.jsx)(Y,{})}),Object(C.jsx)(q.a,{path:"*",element:Object(C.jsx)(ee,{})})]})})};r(36);!function(e){var t=e.features,r=e.persist,n=e.overrides;r||localStorage.setItem(h,JSON.stringify([])),localStorage.setItem(f,r?"true":"false"),O(t||[],n||[]).forEach((function(e){!function(e,t){var r,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=JSON.parse(null!==(r=localStorage.getItem(h))&&void 0!==r?r:"[]"),s=a.findIndex((function(t){return t.id===e}));-1===s?a.push({id:e,active:t,description:n,original:t}):a[s].original=t,localStorage.setItem(h,JSON.stringify(a))}(e.id,e.active,e.description)}))}({features:B,overrides:JSON.parse(null!==(n=Object({NODE_ENV:"production",PUBLIC_URL:"/featureFlags",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_GIT_SHA:"780245c",REACT_APP_VERSION:"2.3.1",REACT_APP_NAME:"@mydobie/feature-flags",REACT_APP_USE_LOCAL_STORAGE:"true",REACT_APP_FEATURE_FLAGS_PERSIST:"false"}).REACT_APP_FEATURE_FLAGS)&&void 0!==n?n:"[]"),persist:!1});var re=function(){var e=Object(a.useReducer)((function(e){return e+1}),0),t=Object(d.a)(e,2)[1],r=Object(l.b)();s.a.useEffect((function(){var e;r(function(e){var t=e.features,r=e.overrides,n=void 0===r?[]:r,a=e.persist,s=void 0!==a&&a,c=e.reset;return{type:S,payload:{features:t,overrides:n,persist:s,reset:c}}}({features:W||[],overrides:JSON.parse(null!==(e=Object({NODE_ENV:"production",PUBLIC_URL:"/featureFlags",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_GIT_SHA:"780245c",REACT_APP_VERSION:"2.3.1",REACT_APP_NAME:"@mydobie/feature-flags",REACT_APP_USE_LOCAL_STORAGE:"true",REACT_APP_FEATURE_FLAGS_PERSIST:"false"}).REACT_APP_FEATURE_FLAGS)&&void 0!==e?e:"[]"),persist:!1}))}),[]);return Object(C.jsx)("div",{children:Object(C.jsxs)(j.a,{basename:"",children:[Object(C.jsx)(M,{}),Object(C.jsx)("main",{children:Object(C.jsx)(te,{onFeatureChange:t})})]})})},ne=r(8),ae=r(22),se=r.n(ae),ce=r(23),ie=r.n(ce),oe=Object(ne.a)({FeatureFlags:A}),le={key:"root",storage:se.a,stateReconciler:ie.a},ue=oe;ue=Object(c.a)(le,oe);var de=function(){return Object(ne.b)(ue)}(),je=Object(c.b)(de),be=Object(C.jsx)(u.a,{loading:null,persistor:je,children:Object(C.jsx)(re,{})});o.a.render(Object(C.jsx)(s.a.StrictMode,{children:Object(C.jsx)(l.a,{store:de,children:be})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.bc7f66a8.chunk.js.map