// /* eslint-disable import/prefer-default-export */
// /* eslint no-unused-vars: "off" */
import React, { useState } from "react";
import {
  MenuItem,
} from "react-pro-sidebar";
import { NavLink } from 'react-router-dom';

export const LeftPrime = ({match}) => {
  return (
    <>
      <MenuItem><NavLink to="/app/prime/prime" activeClassName="active">STATES</NavLink></MenuItem>
      <MenuItem><NavLink to="/app/prime/channels" activeClassName="active">CHANNELS</NavLink></MenuItem>
    </>
  )
}

export const LeftTrend = ({match}) => {
  return (
    <>
      <MenuItem><NavLink to="/app/trend/overview" activeClassName="active">OVERVIEW</NavLink></MenuItem>
      <MenuItem><NavLink to="/app/trend/social" activeClassName="active">SOCIAL</NavLink></MenuItem>
      <MenuItem><NavLink to="/app/trend/ecommerce" activeClassName="active">E-COMMERCE</NavLink></MenuItem>
      <MenuItem><NavLink to="/app/trend/googleAnalytics" activeClassName="active">GOOGLE ANALYTICS</NavLink></MenuItem>
      <MenuItem><NavLink to="/app/trend/response" activeClassName="active">TREND-RESPONSE</NavLink></MenuItem>
    </>
  )
}

export const LeftSocial = ({match}) => {
  return (
    <>
      <MenuItem>SENTIMENT ANALYSIS</MenuItem>
      <MenuItem>NEEDS PATTERNS</MenuItem>
    </>
  )
}

export const LeftOnline = ({match}) => {
  return (
    <>
      <MenuItem>OVERVIEW</MenuItem>
      <MenuItem>PRODUCT &amp; PRICE</MenuItem>
    </>
  )
}

export const LeftSimulator = ({match}) => {
  return (
    <>
      <MenuItem>Simulator 메뉴1</MenuItem>
    </>
  )
}

export const LeftAbout = ({match}) => {
  return (
    <>
      <MenuItem>about 메뉴1</MenuItem>
    </>
  )
}