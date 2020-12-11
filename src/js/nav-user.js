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
        if (code === 200) {
          resolve(res.data.data);
        } else {
          resolve(res);
        }
      })
      .catch((err) => {
        jumpLogin(err);
        reject(err);
      });
  });
}

class createNav {
  constructor(DOM) {
    this.navList = null;
    this.DOM = DOM;
  }
  async getNavList() {
    this.navList = await fetchGet("/uums/navbars");
    return this.navList;
  }
  init() {
    this.getNavList().then((res) => {
      this.addStyle();
      let html = `
      <div class="nav-content">
        <div class="drop-btn">
          <img src="${open}"/>
          <span>系统导航</span>
        </div>
        <ol class="drop-menu">`;
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
      this.DOM.innerHTML = html;
    });
  }
  addStyle() {
    let styleNode = document.createElement("style");
    styleNode.type = "text/css";
    styleNode.innerHTML += `
    .nav-content{ position: relative; color: #fff; }
    .nav-content>.drop-btn{
      cursor: pointer;
      padding: 14px 20px;
    }
    .nav-content>.drop-menu{
      background: #16223B;
      margin: 0;
      padding: 10px 0 0 10px;
      max-width: 600px;
      border-top: 1px solid #fff;
      list-style: none;
    }
    .nav-content>.drop-menu::after {
      content: "";
      display: block;
      height: 0;
      clear: both;
      visibility: hidden;
      overflow: hidden;
    }
    .nav-content>.drop-menu>li{
      width: 140px;
      height: 45px;
      background: rgba(255, 255, 255, 0.04);
      border-radius: 2px;
      margin-right: 10px;
      margin-bottom: 10px;
      float: left;
    }
    .nav-content>.drop-menu>li:hover,
    .nav-content>.drop-menu>li.active{
      border-left: 3px solid #0FD0F2;
    }
    .nav-content>.drop-menu>li>a>img{
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
}

class createAvatar {
  constructor(DOM) {
    this.userinfo = null;
    this.DOM = DOM;
  }
  async getUserInfo() {
    this.userinfo = await fetchGet("/uums/user_info");
    return this.userinfo;
  }
  init() {
    this.getUserInfo().then((res) => {
      this.addStyle();
      const html = `
      <div class="user-info">
        <div id="avatarContent" class="avatar">
          <img src="${defalt_avatar}" alt="默认头像" />
          <span class="detail">
            <div class="name">${res.name ? res.name : "-"}</div>
            <div class="role">${res.role.name ? res.role.name : "-"}</div>
          </span>
        </div>
        <ol id="dropMenu" class="drop-menu">
          <li><a href="${res.profileUrl}" target="_blank">个人主页</a></li>
          <li><a href="${res.logoutUrl}">退出</a></li>
        </ol>
      </div>`;
      this.DOM.innerHTML = html;
      const avatarContent = document.getElementById("avatarContent");
      const dropMenu = document.getElementById("dropMenu");
      dropMenu.onmouseover = avatarContent.onmouseover = () => {
        dropMenu.style.visibility = "visible";
      };
      dropMenu.onmouseout = avatarContent.onmouseout = () => {
        dropMenu.style.visibility = "hidden";
      };
    });
  }
  addStyle() {
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
}

export { createNav, createAvatar };
