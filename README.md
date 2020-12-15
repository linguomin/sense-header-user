# sense-header-user

描述：展示公用导航及头像，用户等

## 使用方法

### 安装

```install
npm install sense-header-user
```

### 开发环境

npm start
启动服务

### 编译

npm run build

### 组件内引入

```import
import senseHeader from "./nav-user";

const navDOM = document.getElementById("nav");
const avatarDOM = document.getElementById("avatar");

senseHeader.createNav(navDOM);
senseHeader.createAvatar(avatarDOM);
senseHeader.getNavList().then((res) => {
  console.log(res);
});
senseHeader.getUserInfo().then((res) => {
  console.log(res);
});
```

***插件如有bug请联系linguomin_sam@163.com***
