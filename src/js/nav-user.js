import axios from "axios";
import jumpLogin from "sense-jump-login";

import defalt_avatar from "../image/defalt_avatar.png";
import open from "../image/open.svg";
import datacenter from "../image/datacenter.svg";
import evalution from "../image/evalution.svg";
import inference from "../image/inference.svg";
import mark from "../image/mark.svg";
import panorama from "../image/panorama.svg";
import resource from "../image/resource.svg";
import train from "../image/train.svg";
import user from "../image/user.svg";

// get请求，失败401跳登录
function fetchGet(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(url)
      .then((res) => {
        // resolve(res.data);
        if (code === 200) {
          resolve(res.data.data);
        } else {
          resolve(res);
        }
      })
      .catch((err) => {
        jumpLogin(err, true);
        reject(err);
      });
  });
}

/**
 * 获取导航信息
 */
async function getNavList(baseuri) {
  const navList = await fetchGet(baseuri + "/uumsapi/uums/navbars");
  return navList;
}

/**
 * 获取个人信息
 */
async function getUserInfo(baseuri) {
  const userinfo = await fetchGet(baseuri + "/uumsapi/uums/user_info");
  return userinfo;
}

/**
 * 添加导航样式
 */
function addNavStyle() {
  let styleNode = document.createElement("style");
  styleNode.type = "text/css";
  styleNode.innerHTML += `
  .nav-content{ position: relative; color: #fff; }
  .nav-content>.drop-btn{
    cursor: pointer;
    padding: 18px 20px;
  }
  .nav-content>.nav-drop-menu{
    background: #16223B;
    margin: 0;
    padding: 10px 0 0 10px;
    max-width: 600px;
    border-top: 1px solid #fff;
    list-style: none;
    visibility: hidden;
    opacity: 0;
    transition: all .5s ease-out;
  }
  .nav-content>.nav-drop-menu::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
    overflow: hidden;
  }
  .nav-content>.nav-drop-menu>li{
    width: 140px;
    height: 45px;
    background: rgba(255, 255, 255, 0.04);
    border-radius: 2px;
    margin-right: 10px;
    margin-bottom: 10px;
    float: left;
  }
  .nav-content>.nav-drop-menu>li:hover,
  .nav-content>.nav-drop-menu>li.active{
    border-left: 3px solid #0FD0F2;
  }
  .nav-content>.nav-drop-menu>li>a>img{
    vertical-align: sub;
  }
  .nav-content a {
    text-decoration:none;
    color: #fff;
    display: inline-block;
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 3;
  }
  `;
  document.getElementsByTagName("head")[0].appendChild(styleNode);
}

/**
 * 添加个人信息样式
 */
function addUserStyle() {
  let styleNode = document.createElement("style");
  styleNode.type = "text/css";
  styleNode.innerHTML += `
  .user-info{ position: relative; }
  .user-info>.avatar {
    cursor: pointer;
    width: 110px;
    display: flex;
    justify-content: space-between;
    color: #fff;
  }
  .user-info>.avatar>img{ width:35px; }
  .user-info>.drop-menu {
    list-style: none;
    background: #16223B;
    position: absolute;
    top: 36px;
    left: 10px;
    margin: 0;
    padding: 0;
    border-radius: 3px;
    visibility: hidden;
    opacity: 0;
    transition: all .5s ease-out;
  }
  .user-info>.drop-menu>li{
    padding: 5px 10px;
  }
  .user-info a {
    text-decoration:none;
    color: hsla(0,0%,100%,.6);
  }
  .user-info a:hover {
    color: hsla(0,0%,100%,1);
  }
  `;
  document.getElementsByTagName("head")[0].appendChild(styleNode);
}

/**
 * 创建导航
 * @param {DOM元素} DOM
 */
function createNav(DOM, baseuri) {
  addNavStyle();
  getNavList(baseuri).then((res) => {
    let html = `
    <div class="nav-content">
      <div id="dropBtn" class="drop-btn">
        <img src="${open}"/>
        <span>系统导航</span>
      </div>
      <ol id="navDropMenu" class="nav-drop-menu">`;
    res.forEach((item) => {
      html += `
        <li>
          <a href="${item.url ? item.url : "#"}" target="_blank">
            <img src="${item.key ? item.key : "#"}"/>
            <span>${item.name ? item.name : "-"}</span>
          </a>
        </li>
        `;
    });

    html += `</ol></div>`;
    DOM.innerHTML = html;
    const dropBtn = document.getElementById("dropBtn");
    const navDropMenu = document.getElementById("navDropMenu");
    dropBtn.onclick = () => {
      if (navDropMenu.style.visibility === "visible") {
        navDropMenu.style.visibility = "hidden";
        navDropMenu.style.opacity = 0;
      } else {
        navDropMenu.style.opacity = 1;
        navDropMenu.style.visibility = "visible";
      }
    };
  });
}

/**
 * 创建个人信息
 * @param {DOM元素} DOM
 */
function createAvatar(DOM, baseuri) {
  addUserStyle();
  getUserInfo(baseuri).then((res) => {
    const html = `
    <div class="user-info">
      <div id="avatarContent" class="avatar">
        <img src="${defalt_avatar}" alt="默认头像" />
        <span class="detail">
          <div class="name">${res.name ? res.name : "-"}</div>
          <div class="role">${
            res.role && res.role.name ? res.role.name : "-"
          }</div>
        </span>
      </div>
      <ol id="dropMenu" class="drop-menu">
        <li><a href="${res.profileUrl}" target="_blank">个人主页</a></li>
        <li><a href="${baseuri + "/logout"}">退出</a></li>
      </ol>
    </div>`;
    DOM.innerHTML = html;
    const avatarContent = document.getElementById("avatarContent");
    const dropMenu = document.getElementById("dropMenu");
    dropMenu.onmouseover = avatarContent.onmouseover = () => {
      dropMenu.style.visibility = "visible";
      dropMenu.style.opacity = 1;
    };
    dropMenu.onmouseout = avatarContent.onmouseout = () => {
      dropMenu.style.visibility = "hidden";
      dropMenu.style.opacity = 0;
    };
  });
}

export default { createNav, createAvatar, getNavList, getUserInfo };
