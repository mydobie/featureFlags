"use strict";var __assign=this&&this.__assign||function(){__assign=Object.assign||function(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p]}return t};return __assign.apply(this,arguments)};var __spreadArray=this&&this.__spreadArray||function(to,from,pack){if(pack||arguments.length===2)for(var i=0,l=from.length,ar;i<l;i++){if(ar||!(i in from)){if(!ar)ar=Array.prototype.slice.call(from,0,i);ar[i]=from[i]}}return to.concat(ar||Array.prototype.slice.call(from))};var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:true});exports.FeatureFlagged=exports.useResetFeatureFlags=exports.useSetFeatureFlags=exports.featuresWithOverrides=exports.useEditFeatureFlag=exports.useIsFeatureActive=exports.useGetFeatures=exports.FeatureFlagProvider=exports.FFContext=exports.LOCAL_STORAGE_KEY=void 0;var jsx_runtime_1=require("react/jsx-runtime");var react_1=__importDefault(require("react"));var useLocalStorage_1=__importDefault(require("./useLocalStorage"));exports.LOCAL_STORAGE_KEY="FEATURE_FLAGS";exports.FFContext=react_1.default.createContext({featureFlags:[],setFeatureFlags:function(){},persist:false});var formatFeatures=function(features){return __spreadArray([],features,true).map(function(feature){if(feature.original!==undefined&&feature.active!==undefined){return feature}if(feature.active===undefined){feature.active=false}if(feature.original===undefined){feature.original=feature.active}return feature})};var setFlagsForLocalStorage=function(features){return __spreadArray([],features,true).map(function(feature){return{id:feature.id,active:feature.active}})};var FeatureFlagProvider=function(_a){var _b=_a.features,features=_b===void 0?[]:_b,children=_a.children,persist=_a.persist,hideWarnings=_a.hideWarnings;var _c=(0,useLocalStorage_1.default)(exports.LOCAL_STORAGE_KEY),localStorage=_c[0],setLocalStorage=_c[1];var _d=react_1.default.useState(formatFeatures(features)),featuresState=_d[0],setFeaturesState=_d[1];react_1.default.useEffect(function(){if(persist&&!hideWarnings){console.warn("Feature flags are set to persist on page refresh.  This is not recommended in production environments.")}},[hideWarnings,persist]);var updateFeatures=function(incomingFeatures,isEdit){var updatedIncomingFeatures=__spreadArray([],incomingFeatures,true);if(persist){if(!isEdit){updatedIncomingFeatures=(0,exports.featuresWithOverrides)(incomingFeatures,localStorage)}setLocalStorage(setFlagsForLocalStorage(updatedIncomingFeatures))}setFeaturesState(updatedIncomingFeatures)};react_1.default.useEffect(function(){if(persist){updateFeatures(formatFeatures(features))}},[]);return(0,jsx_runtime_1.jsx)(exports.FFContext.Provider,__assign({value:{featureFlags:featuresState,setFeatureFlags:updateFeatures,persist:persist}},{children:children}))};exports.FeatureFlagProvider=FeatureFlagProvider;exports.default=exports.FeatureFlagProvider;var useGetFeatures=function(){var featureFlags=react_1.default.useContext(exports.FFContext).featureFlags;return featureFlags||[]};exports.useGetFeatures=useGetFeatures;var useIsFeatureActive=function(featureId){var _a;var featureFlags=(0,exports.useGetFeatures)();return((_a=featureFlags.find(function(feature){return feature.id===featureId}))===null||_a===void 0?void 0:_a.active)||false};exports.useIsFeatureActive=useIsFeatureActive;var useEditFeatureFlag=function(){var _a=react_1.default.useContext(exports.FFContext),featureFlags=_a.featureFlags,setFeatureFlags=_a.setFeatureFlags;var editFeature=function(featureId,isActive){var newFeatures=featureFlags?__spreadArray([],featureFlags,true):[];var featureIndex=newFeatures.findIndex(function(flag){return flag.id===featureId});if(featureIndex!==undefined){newFeatures[featureIndex].active=isActive;setFeatureFlags(newFeatures,true)}else{console.error("Attempting to set unknown feature flag ",featureId)}};return editFeature};exports.useEditFeatureFlag=useEditFeatureFlag;var featuresWithOverrides=function(featuresArray,overRidesArray){if(featuresArray===void 0){featuresArray=[]}if(overRidesArray===void 0){overRidesArray=[]}var features=__spreadArray([],featuresArray,true);overRidesArray.forEach(function(overRide){var featureIndex=features.findIndex(function(feature){return feature.id===overRide.id});if(featureIndex!==-1){if(features[featureIndex].original===undefined){features[featureIndex].original=features[featureIndex].active}if(overRide.active!==undefined){features[featureIndex].active=overRide.active}if(overRide.description){features[featureIndex].description=overRide.description}if(overRide.title){features[featureIndex].title=overRide.title}}});return features};exports.featuresWithOverrides=featuresWithOverrides;var useSetFeatureFlags=function(isEdit){var setFeatureFlags=react_1.default.useContext(exports.FFContext).setFeatureFlags;var setFormattedFeatures=function(features){setFeatureFlags(formatFeatures(features),isEdit)};return setFormattedFeatures};exports.useSetFeatureFlags=useSetFeatureFlags;var useResetFeatureFlags=function(){var _a=react_1.default.useContext(exports.FFContext),featureFlags=_a.featureFlags,setFeatureFlags=_a.setFeatureFlags;var reset=function(){var resetFlags=featureFlags.map(function(feature){return __assign(__assign({},feature),{active:feature.original})});setFeatureFlags(resetFlags,true)};return reset};exports.useResetFeatureFlags=useResetFeatureFlags;var FeatureFlagged=function(_a){var feature=_a.feature,children=_a.children,isNotActive=_a.isNotActive;var isActive=(0,exports.useIsFeatureActive)(feature);return(0,jsx_runtime_1.jsx)(jsx_runtime_1.Fragment,{children:isActive&&!isNotActive||!isActive&&isNotActive?children:null})};exports.FeatureFlagged=FeatureFlagged;