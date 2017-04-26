import React, {Component} from "react"

/**
 * 权限判定
 * @date   2016-09-18
 * @author niko
 * @param  {string | [string]}   authId 权限代号，可以是数组
 * @return {Boolean}
 */
const isAuth = (authId) => {
  let id = parseInt(authId);
  let authIds = JSON.parse(window.localStorage.getItem('auth')) || [];
  return id === authIds;
};

const Auth = (props) => {
  if (isAuth(props.authId)) {
    return props.children
  } else {
    return null;
  }
};

export {
  isAuth,
  Auth
}
