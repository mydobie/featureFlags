"use strict";var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p]}return t};return __assign.apply(this,arguments)};var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:true});var jsx_runtime_1=require("react/jsx-runtime");var ExclamationCircle_1=__importDefault(require("./ExclamationCircle"));var CoreUI=function(_a){var _b=_a.features,features=_b===void 0?[]:_b,_c=_a.onFeatureClick,onFeatureClick=_c===void 0?function(){}:_c,_d=_a.onFeatureReset,onFeatureReset=_d===void 0?function(){}:_d,_e=_a.persist,persist=_e===void 0?false:_e,_f=_a.readonly,readonly=_f===void 0?false:_f;return(0,jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment,{children:[(0,jsx_runtime_1.jsx)("ul",__assign({"data-testid":"coreFeatureFlagsUI"},{children:features.map(function(feature){var _a;return(0,jsx_runtime_1.jsx)("li",{children:(0,jsx_runtime_1.jsxs)("div",__assign({className:"form-check form-switch custom-control custom-switch"},{children:[(0,jsx_runtime_1.jsx)("input",{className:"form-check-input custom-control-input",type:"checkbox",id:feature.id,checked:feature.active,onChange:function(e){onFeatureClick(feature.id,e.target.checked)},disabled:readonly})," ",(0,jsx_runtime_1.jsxs)("label",__assign({className:"form-check-label custom-control-label",htmlFor:feature.id},{children:[(_a=feature.description)!==null&&_a!==void 0?_a:feature.id," ",feature.active!==feature.original?(0,jsx_runtime_1.jsx)(ExclamationCircle_1.default,{}):null]}))]}))},feature.id)})})),persist&&!readonly?(0,jsx_runtime_1.jsxs)("p",__assign({className:"alert alert-secondary",role:"alert","data-testid":"persistAlert"},{children:[(0,jsx_runtime_1.jsx)("strong",{children:"NOTE:"})," Feature flag values are persisting on page refresh. This is not recommended for a production environment. Check the"," ",(0,jsx_runtime_1.jsx)("code",{children:"persist"})," setting when calling ",(0,jsx_runtime_1.jsx)("code",{children:"loadFeatureFlags"})," ","or ",(0,jsx_runtime_1.jsx)("code",{children:"loadFeatureFlagsRedux"}),"."]})):null,!readonly?(0,jsx_runtime_1.jsx)("button",__assign({type:"button",className:"btn btn-success","data-testid":"resetButton",onClick:function(){return onFeatureReset()}},{children:"Reset flags to default"})):null]})};exports.default=CoreUI;