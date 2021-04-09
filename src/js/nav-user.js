import axios from "axios";
import jumpLogin from "sense-jump-login";
import defalt_avatar from "../image/defalt_avatar.png";
import open from "../image/open.svg";

class SenseHeader {
  constructor(prefix) {
    this.prefix = prefix;
  }

  async initAvatar(DOM) {
    this.addUserStyle();
    const res = await this.getUserInfo();
    this.userinfo = res;
    const html = `
      <div class="user-info">
        <div id="avatarContent" class="avatar">
          <img src="${defalt_avatar}" alt="默认头像" />
          <span class="detail">
            <div class="name">${
              this.userinfo.name ? this.userinfo.name : "-"
            }</div>
            <div class="role">${
              this.userinfo.role && this.userinfo.role.name
                ? this.userinfo.role.name
                : "-"
            }</div>
          </span>
        </div>
        <ol id="dropMenu" class="drop-menu">
          <li><a href="${this.userinfo.profileUrl}">个人主页</a></li>
          <li><a href="${this.prefix + "/logout"}">退出</a></li>
        </ol>
      </div>`;
    DOM.innerHTML = html;
    const avatarContent = document.getElementById("avatarContent");
    const dropMenu = document.getElementById("dropMenu");
    avatarContent.onclick = e => {
      e.stopPropagation();
      if (dropMenu.style.display === "block") {
        dropMenu.style.display = "none";
        dropMenu.style.opacity = 0;
      } else {
        dropMenu.style.opacity = 1;
        dropMenu.style.display = "block";
      }
    };
    document.addEventListener("click", () => {
      dropMenu.style.display = "none";
      dropMenu.style.opacity = 0;
    });
    dropMenu.onclick = e => {
      e.stopPropagation();
    };

    return this.userinfo;
  }

  async initNav(DOM) {
    this.addNavStyle();
    const res = await this.getNavList();
    this.navList = res;
    let html = `
    <div class="nav-content">
      <div id="dropBtn" class="drop-btn">
        <img src="${open}"/>
        <span>系统导航</span>
      </div>
      <ol id="navDropMenu" class="nav-drop-menu">`;
    if (this.navList && this.navList.length) {
      this.navList.forEach(item => {
        html += `
        <li class="${this.prefix === "/" + item.key ? "active" : ""}">
          <a href="${item.url ? item.url : "#"}">
            <img src="data:image/jpeg;base64,${item.icon ? item.icon : "#"}"/>
            <span>${item.name ? item.name : "-"}</span>
          </a>
        </li>
        `;
      });
    }

    html += `</ol></div>`;
    DOM.innerHTML = html;
    const dropBtn = document.getElementById("dropBtn");
    const navDropMenu = document.getElementById("navDropMenu");
    dropBtn.onclick = e => {
      e.stopPropagation();
      if (navDropMenu.style.display === "block") {
        navDropMenu.style.display = "none";
        navDropMenu.style.opacity = 0;
      } else {
        navDropMenu.style.opacity = 1;
        navDropMenu.style.display = "block";
      }
    };
    document.addEventListener("click", () => {
      navDropMenu.style.display = "none";
      navDropMenu.style.opacity = 0;
    });
    navDropMenu.onclick = e => {
      e.stopPropagation();
    };

    return this.navList;
  }

  addNavStyle() {
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
      max-width: 610px;
      border-top: 1px solid #454a54;
      list-style: none;
      display: none;
      opacity: 0;
      transition: all .5s ease-out;
      position: relative;
      z-index: 99999;
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

  addUserStyle() {
    let styleNode = document.createElement("style");
    styleNode.type = "text/css";
    styleNode.innerHTML += `
    .user-info{ position: relative; }
    .user-info>.avatar {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      color: #fff;
    }
    .user-info>.avatar>img{ width: 35px; height: 35px; margin-right: 10px; }
    .user-info>.drop-menu {
      list-style: none;
      background: #16223B;
      position: absolute;
      top: 50px;
      left: 0;
      margin: 0;
      padding: 0;
      border-radius: 3px;
      display: none;
      opacity: 0;
      transition: all .5s ease-out;
      z-index: 99999;
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

  //获取导航信息
  async getNavList() {
    const navList = await this.fetch(this.prefix + "/uumsapi/uums/navbars");
    return navList;
  }

  // 获取个人信息
  async getUserInfo() {
    const userinfo = await this.fetch(this.prefix + "/uumsapi/uums/user_info");
    return userinfo;
  }

  fetch(url) {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then(res => {
          if (res.data.code === 200) {
            resolve(res.data.data);
          } else {
            resolve(res);
          }
        })
        .catch(err => {
          jumpLogin(err);
          reject(err);
        });
    });
  }
}

export default SenseHeader;
