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
import SenseHeader from "./nav-user";

const navDOM = document.getElementById("nav");
const avatarDOM = document.getElementById("avatar");

// new实例时候传入接口前缀（项目前缀）
const senseHeader = new SenseHeader("/panorama");

// 传入系统导航的容器DOM生成系统导航并获取导航列表，如果不需要获取不需要then
senseHeader.initNav(navDOM).then(res=>{console.log(res);})

// 传入个人信息的容器DOM生成个人信息并获取用户信息，如果不需要获取不需要then
senseHeader.initAvatar(avatarDOM).then(res=>{console.log(res);})
```

***插件如有bug请联系linguomin_sam@163.com***
