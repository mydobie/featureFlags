"use strict";var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p]}return t};return __assign.apply(this,arguments)};var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:true});var jsx_runtime_1=require("react/jsx-runtime");var react_1=__importDefault(require("react"));var index_1=require("./index");var NoFlags_1=__importDefault(require("./NoFlags"));var ReadOnly_1=__importDefault(require("./ReadOnly"));var CoreUI=function(_a){var _b=_a.onFeatureChange,onFeatureChange=_b===void 0?function(){}:_b,_c=_a.onFeatureReset,onFeatureReset=_c===void 0?function(){}:_c,_d=_a.readonly,readonly=_d===void 0?false:_d,_e=_a.notDefaultIndicator,notDefaultIndicator=_e===void 0?(0,jsx_runtime_1.jsx)("span",__assign({className:"badge badge-pill badge-info rounded-pill bg-info text-dark","data-testid":"notDefaultIndicatorDefault"},{children:"Changed"})):_e;var features=(0,index_1.useGetFeatures)();var editFeature=(0,index_1.useEditFeatureFlag)();var resetFlags=(0,index_1.useResetFeatureFlags)();var persist=react_1.default.useContext(index_1.FFContext).persist;if(!features||features.length===0){return(0,jsx_runtime_1.jsx)(NoFlags_1.default,{})}return readonly?(0,jsx_runtime_1.jsx)(ReadOnly_1.default,{features:features||[],notDefaultIndicator:notDefaultIndicator}):(0,jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment,{children:[(0,jsx_runtime_1.jsx)("ul",__assign({"data-testid":"coreFeatureFlagsUI"},{children:features.map(function(feature){var _a;return(0,jsx_runtime_1.jsx)("li",{children:(0,jsx_runtime_1.jsxs)("div",__assign({className:"form-check form-switch custom-control custom-switch"},{children:[(0,jsx_runtime_1.jsx)("input",{className:"form-check-input custom-control-input",type:"checkbox",id:feature.id,checked:feature.active,onChange:function(e){editFeature(feature.id,e.target.checked);onFeatureChange(feature.id,e.target.checked)},disabled:readonly})," ",(0,jsx_runtime_1.jsxs)("label",__assign({className:"form-check-label custom-control-label font-weight-bold fw-bold",htmlFor:feature.id},{children:[(_a=feature.title)!==null&&_a!==void 0?_a:feature.id,feature.active!==feature.original?(0,jsx_runtime_1.jsxs)("span",__assign({"data-testid":"flagNotInitialWarning"},{children:[" ",notDefaultIndicator]})):null]})),feature.description?(0,jsx_runtime_1.jsx)("div",__assign({className:"text-muted font-italic fst-italic","data-testid":"feature_description"},{children:feature.description})):null]}))},feature.id)})})),persist&&!readonly?(0,jsx_runtime_1.jsxs)("p",__assign({className:"alert alert-secondary",role:"alert","data-testid":"persistAlert"},{children:[(0,jsx_runtime_1.jsx)("strong",{children:"NOTE:"})," Feature flag values are persisting on page refresh. This is not recommended for a production environment. Check the ",(0,jsx_runtime_1.jsx)("code",{children:"persist"})," setting when calling"," ",(0,jsx_runtime_1.jsx)("code",{children:"FeatureFlagProvider"}),"."]})):null,!readonly?(0,jsx_runtime_1.jsx)("button",__assign({type:"button",className:"btn btn-success","data-testid":"resetButton",onClick:function(){resetFlags();onFeatureReset()}},{children:"Reset flags to default"})):null]})};exports.default=CoreUI;