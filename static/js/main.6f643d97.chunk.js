(this["webpackJsonp@mydobie/feature_flags"]=this["webpackJsonp@mydobie/feature_flags"]||[]).push([[0],{106:function(e,t,n){},108:function(e,t,n){"use strict";n.r(t);var r=n(6),a=n(1),c=n.n(a),i=n(18),s=n.n(i),l=n(22),o=n(19),u=n(69),j=n(64),d=n.n(j),b=n(65),h=n.n(b),O=n(37),f=n(70),v=n(16),x="featureFlags",p="featureFlagsAdd",g="featureFlagsEdit",C="featureFlagsReset",m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:function(){},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"REACT_APP_FEATURE_FLAGS",a=[];a=e.map((function(e){return{id:e.id,active:e.active||!1,description:e.description,original:e.active||!1}}));var c=Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_GIT_SHA:"f2f52b0",REACT_APP_VERSION:"1.0.0-beta.0",REACT_APP_NAME:"@mydobie/feature_flags"})[r],i=c?JSON.parse(c):[];return i.forEach((function(e){var t=a.findIndex((function(t){return t.id===e.id}));if(-1===t)a.push({id:e.id,active:e.active||!1,description:e.description,original:e.active||!1});else{var n=Object(v.a)({},e),r=a[t];n.description=e.description||r.description,n.active=e.active||r.active,n.original=n.active,a[t]=n}})),t?{type:p,payload:a}:(n(a),localStorage.setItem(x,JSON.stringify(a)))},y=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(n)return{type:g,payload:{id:e,active:t}};var r=JSON.parse(localStorage.getItem(x)),a=r.map((function(n){return n.id===e?Object(v.a)(Object(v.a)({},n),{},{active:t}):n}));return localStorage.setItem(x,JSON.stringify(a)),a},F=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(e)return{type:C};var t=JSON.parse(localStorage.getItem(x)),n=t.map((function(e){return Object(v.a)(Object(v.a)({},e),{},{active:e.original})}));return localStorage.setItem(x,JSON.stringify(n)),n},R=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{flags:[]},t=arguments.length>1?arguments[1]:void 0;switch(t.type){case p:return Object(v.a)(Object(v.a)({},e),{},{flags:t.payload});case g:var n=t.payload,r=n.id,a=n.active,c=Object(f.a)(e.flags),i=c.findIndex((function(e){return e.id===r}));return-1===i?e:(c[i].active=a,Object(v.a)(Object(v.a)({},e),{},{flags:c}));case C:var s=e.flags.map((function(e){return Object(v.a)(Object(v.a)({},e),{},{active:e.original})}));return Object(v.a)(Object(v.a)({},e),{},{flags:s});default:return e}},S=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return null===e?JSON.parse(localStorage.getItem(x)):e.reducerFeatureFlags.flags},k=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,n=t;if(null===n&&(n=S()),n){var r=n.find((function(t){return t.id===e}));return void 0===r?void 0:r.active}},_=Object(o.combineReducers)({reducerFeatureFlags:R}),T={key:"root",storage:d.a,stateReconciler:h.a},E=Object(o.createStore)(_,Object(O.composeWithDevTools)());if("true"===Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0,REACT_APP_GIT_SHA:"f2f52b0",REACT_APP_VERSION:"1.0.0-beta.0",REACT_APP_NAME:"@mydobie/feature_flags"}).REACT_APP_USE_LOCAL_STORAGE){var A=Object(u.a)(T,_);E=function(){return Object(o.createStore)(A,Object(O.composeWithDevTools)())}}var N=E,P=n(38),I=n.n(P),L=n(66),D=n(13),U=n(11),G=n(12),V=n(15),J=n(14),W=n(25),H=n(10),K=n(47),w=n(48),B=n(44),M=n(45),q=n(46),z=n(61),Q=!1,X=function(){return Object(r.jsx)("div",{})},Y=function(){return Object(r.jsx)("div",{})},Z=function(){return Object(r.jsx)("div",{})},$=function(){return Object(r.jsx)("div",{})},ee=function(){return Object(r.jsx)("div",{})};try{var te=n(29);X=te.CustomInput,Y=te.Button,Z=te.Container,$=te.Row,ee=te.Col,Q=!0}catch(Te){}var ne=function(e){Object(V.a)(n,e);var t=Object(J.a)(n);function n(e){var r;return Object(D.a)(this,n),(r=t.call(this,e)).featureClick=r.featureClick.bind(Object(G.a)(r)),r.featureReset=r.featureReset.bind(Object(G.a)(r)),r}return Object(U.a)(n,[{key:"featureClick",value:function(e,t){(0,this.props.onFeatureClick)(e,t)}},{key:"featureReset",value:function(){(0,this.props.onFeatureReset)()}},{key:"container",value:function(){var e=this;if(!1===Q)return Object(r.jsx)("div",{children:"Reactstrap is needed to render the feature flags UI"});var t=this.props,n=t.features,a=t.readonly;return Object(r.jsx)(Z,{children:Object(r.jsx)($,{children:Object(r.jsxs)(ee,{children:[Object(r.jsx)("h2",{children:"Feature Flags"}),n&&n.map((function(t){return Object(r.jsx)("div",{style:{fontWeight:t.active?"bold":""},className:"customInputItem",children:Object(r.jsx)(X,{type:"switch",id:t.id,name:"customSwitch",label:t.description,checked:t.active,disabled:a,onChange:function(n){e.featureClick(t.id,n.target.checked)}})},t.id)})),Object(r.jsx)("div",{style:{marginTop:"20px",marginBottom:"20px"},children:a?null:Object(r.jsx)(Y,{id:"resetFeatureFlags",color:"success",onClick:function(){e.featureReset()},children:"Reset Flags"})})]})})})}},{key:"render",value:function(){return this.container()}}]),n}(c.a.Component);ne.defaultProps={features:[],onFeatureClick:function(){},onFeatureReset:function(){},readonly:!1};var re=function(e){Object(V.a)(n,e);var t=Object(J.a)(n);function n(e){var r;return Object(D.a)(this,n),(r=t.call(this,e)).featureChange=r.featureChange.bind(Object(G.a)(r)),r.featureReset=r.featureReset.bind(Object(G.a)(r)),r}return Object(U.a)(n,[{key:"featureChange",value:function(e,t){var n=this.props.onFeatureChange;y(e,t),n(this.features())}},{key:"featureReset",value:function(){var e=this.props.onFeatureChange;F(),e(this.features())}},{key:"features",value:function(){return S()}},{key:"render",value:function(){var e=this.props.readonly;return Object(r.jsx)(ne,{onFeatureClick:this.featureChange,onFeatureReset:this.featureReset,features:this.features(),readonly:e})}}]),n}(c.a.Component);re.defaultProps={onFeatureChange:function(){},readonly:!1};var ae,ce=!1;try{ae=n(22).connect,ce=!0}catch(Te){}var ie=function(e){Object(V.a)(n,e);var t=Object(J.a)(n);function n(e){var r;return Object(D.a)(this,n),(r=t.call(this,e)).featureChange=r.featureChange.bind(Object(G.a)(r)),r.resetFeatures=r.resetFeatures.bind(Object(G.a)(r)),r.state={},r}return Object(U.a)(n,[{key:"featureChange",value:function(e,t){var n=this.props,r=n.edit,a=n.onFeatureChange,c=n.flags;r(e,t),a(c)}},{key:"resetFeatures",value:function(){var e=this.props;(0,e.reset)((0,e.onFeatureChange)(e.flags))}},{key:"render",value:function(){var e=this.props,t=e.flags,n=e.readonly;return Object(r.jsx)(ne,{features:t,onFeatureClick:this.featureChange,onFeatureReset:this.resetFeatures,readonly:n})}}]),n}(c.a.Component);ie.defaultProps={onFeatureChange:function(){},readonly:!1};var se=ce?ae((function(e){return{flags:S(e)}}),(function(e){return{edit:function(t,n){return e(y(t,n,!0))},reset:function(){return e(F(!0))}}}))(ie):ie,le=function(e){Object(V.a)(n,e);var t=Object(J.a)(n);function n(e){var r;return Object(D.a)(this,n),(r=t.call(this,e)).state={},r}return Object(U.a)(n,[{key:"render",value:function(){return Object(r.jsx)(B.a,{children:Object(r.jsx)(M.a,{children:Object(r.jsxs)(q.a,{children:[Object(r.jsxs)(z.a,{children:[Object(r.jsx)("h1",{children:"Feature Flags"}),Object(r.jsx)("p",{children:"These are the testing pages to play with feature flags module. Use the links above to change the feature flag settings."})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Local storage based (read-only):"}),Object(r.jsx)(re,{readonly:!0})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Redux based (read-only):"}),Object(r.jsx)(se,{readonly:!0})]})]})})})}}]),n}(c.a.Component);le.defaultProps={};var oe=function(){return Object(r.jsx)(B.a,{children:Object(r.jsx)(M.a,{children:Object(r.jsxs)(q.a,{children:[Object(r.jsx)("h1",{children:"Version"}),Object(r.jsxs)("ul",{children:[Object(r.jsxs)("li",{children:[Object(r.jsx)("strong",{children:"Application Name:"}),Object(r.jsx)("span",{id:"appNameFromPackageJson",children:"@mydobie/feature_flags"})]}),Object(r.jsxs)("li",{children:[Object(r.jsx)("strong",{children:"Version: "}),Object(r.jsx)("span",{id:"appVersionFromPackageJson",children:"1.0.0-beta.0"})]}),Object(r.jsxs)("li",{children:[Object(r.jsx)("strong",{children:"Git Commit: "}),Object(r.jsx)("span",{id:"gitCommitHash",children:"f2f52b0"})]})]})]})})})},ue=function(){return Object(r.jsx)(B.a,{children:Object(r.jsx)(M.a,{children:Object(r.jsxs)(q.a,{children:[Object(r.jsx)("h1",{children:"Page not found"}),Object(r.jsx)("p",{children:"The page you requested could not be found."})]})})})},je=function(e){var t=e.onFeatureChange,n=e.readonly;return Object(r.jsx)(re,{onFeatureChange:t,readonly:n})},de=function(e){var t=e.onFeatureChange,n=e.readonly;return Object(r.jsx)(se,{onFeatureChange:t,readonly:n})},be=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;return S(e)},he=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return k(e,t)},Oe="COLORS",fe="DINOS",ve="FRUITS",xe="VEGGIES",pe=[{id:ve,active:!1,description:"Fruit list"},{id:xe,active:!1,description:"Vegetable list"}],ge=[{id:Oe,active:!1,description:"Color list"},{id:fe,inuse:!1,description:"Dino list"}],Ce=function(e){Object(V.a)(n,e);var t=Object(J.a)(n);function n(e){var r;return Object(D.a)(this,n),(r=t.call(this,e)).featureChange=function(){(0,r.props.onFeatureChange)()},r.state={},r.featureChange=r.featureChange.bind(Object(G.a)(r)),r}return Object(U.a)(n,null,[{key:"colorList",value:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Primary Colors of Light"}),Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{children:"Red"}),Object(r.jsx)("li",{children:"Green"}),Object(r.jsx)("li",{children:"Blue"})]})]})}},{key:"dinoList",value:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Common Dinosaurs"}),Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{children:"Pterodactyl"}),Object(r.jsx)("li",{children:"Lirainosaurus"}),Object(r.jsx)("li",{children:"Iguanodon"})]})]})}}]),Object(U.a)(n,[{key:"render",value:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)("h1",{children:"Feature flags set in local storage"}),Object(r.jsx)(je,{onFeatureChange:this.featureChange}),Object(r.jsx)("hr",{}),he(Oe)?n.colorList():null,he(fe)?n.dinoList():null]})}}]),n}(c.a.Component);Ce.defaultProps={onFeatureChange:function(){}};var me=function(e){Object(V.a)(n,e);var t=Object(J.a)(n);function n(e){var r;return Object(D.a)(this,n),(r=t.call(this,e)).state={},r}return Object(U.a)(n,null,[{key:"fruitsList",value:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Fruits"}),Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{children:"Apples"}),Object(r.jsx)("li",{children:"Grapes"}),Object(r.jsx)("li",{children:"Oranges"})]})]})}},{key:"veggieList",value:function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Vegetables"}),Object(r.jsxs)("ul",{children:[Object(r.jsx)("li",{children:"Broccoli"}),Object(r.jsx)("li",{children:"Carrots"}),Object(r.jsx)("li",{children:"Spinach"})]})]})}}]),Object(U.a)(n,[{key:"componentDidMount",value:function(){}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var e=this.props.features;return Object(r.jsxs)("div",{children:[Object(r.jsx)("h1",{children:"Feature Flags stored in Redux store"}),Object(r.jsx)(de,{}),Object(r.jsx)("hr",{}),he("FRUITS",e)?n.fruitsList():null,he("VEGGIES",e)?n.veggieList():null]})}}]),n}(c.a.Component);me.defaultProps={};var ye=Object(l.connect)((function(e){return{features:be(e)}}),(function(){return{}}))(me),Fe=(n(106),function(e){return Object(r.jsx)("nav",{children:Object(r.jsxs)(K.a,{children:[Object(r.jsx)(w.a,{children:Object(r.jsx)(W.b,{activeClassName:"active",className:"nav-link",to:"/",children:"Home"})}),Object(r.jsx)(w.a,{children:Object(r.jsx)(W.b,{activeClassName:"active",className:"nav-link",to:"/local",children:"Local Storage Based Feature Flags"})}),k(fe)?Object(r.jsx)(w.a,{children:Object(r.jsx)("span",{className:"nav-link",children:"LINK TO DINOS"})}):null,k(Oe)?Object(r.jsx)(w.a,{children:Object(r.jsx)("span",{className:"nav-link",children:"LINK TO COLORS"})}):null,Object(r.jsx)(w.a,{children:Object(r.jsx)(W.b,{activeClassName:"active",className:"nav-link",to:"/redux",children:"Redux Based Feature Flags"})}),k(ve,e)?Object(r.jsx)(w.a,{children:Object(r.jsx)("span",{className:"nav-link",children:"LINK TO FRUITS"})}):null,k(xe,e)?Object(r.jsx)(w.a,{children:Object(r.jsx)("span",{className:"nav-link",children:"LINK TO VEGGIES"})}):null,Object(r.jsx)(w.a,{children:Object(r.jsx)(W.b,{activeClassName:"active",className:"nav-link",to:"/version",children:"Version"})})]})})}),Re=function(e){Object(V.a)(n,e);var t=Object(J.a)(n);function n(e){var r;return Object(D.a)(this,n),(r=t.call(this,e)).reRenderApp=r.reRenderApp.bind(Object(G.a)(r)),r}return Object(U.a)(n,[{key:"componentDidMount",value:function(){var e=Object(L.a)(I.a.mark((function e(){var t;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=this.props.loadFeatureToRedux,m(ge,!1,this.reRenderApp()),t(pe);case 3:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentWillUnmount",value:function(){}},{key:"reRenderApp",value:function(){this.forceUpdate()}},{key:"render",value:function(){var e,t=this.props.features;return Object(r.jsx)("div",{children:Object(r.jsxs)(W.a,{basename:"",children:[Object(r.jsx)("header",{}),Fe(t),Object(r.jsx)("main",{children:Object(r.jsx)(B.a,{children:Object(r.jsx)(M.a,{children:Object(r.jsx)(q.a,{children:(e=this.reRenderApp,Object(r.jsxs)(H.d,{children:[Object(r.jsx)(H.b,{path:"/",exact:!0,children:Object(r.jsx)(le,{})}),Object(r.jsx)(H.b,{path:"/home",exact:!0,children:Object(r.jsx)(H.a,{to:"/"})}),Object(r.jsx)(H.b,{path:"/local",children:Object(r.jsx)(Ce,{onFeatureChange:e})}),Object(r.jsx)(H.b,{path:"/redux",children:Object(r.jsx)(ye,{})}),Object(r.jsx)(H.b,{path:"/version",children:Object(r.jsx)(oe,{})}),Object(r.jsx)(H.b,{path:"/",children:Object(r.jsx)(ue,{})})]}))})})})}),Object(r.jsx)("footer",{})]})})}}]),n}(c.a.Component),Se=Object(l.connect)((function(e){return{features:S(e)}}),(function(e){return{loadFeatureToRedux:function(t){return e(m(t,!0))}}}))(Re),ke=N,_e=document.getElementById("root");s.a.render(Object(r.jsx)(l.Provider,{store:ke,children:Object(r.jsx)(Se,{})}),_e)}},[[108,1,2]]]);
//# sourceMappingURL=main.6f643d97.chunk.js.map