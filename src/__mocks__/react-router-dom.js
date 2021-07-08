/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';

const rrd = require('react-router-dom');
// Just render plain div with its children
rrd.BrowserRouter = ({ children }) => <div>{children}</div>;
rrd.HashRouter = ({ children }) => <div>{children}</div>;

// HashRouter
module.exports = rrd;
