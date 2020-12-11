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
import { createNav, createAvatar } from 'sense-header-user';
```

准备两个DOM存放用户中心，导航栏，例：

const navDOM = document.getElementById("nav");
const avatarDOM = document.getElementById("avatar");

const navlist = new createNav(navDOM);
const user = new createAvatar(avatarDOM);

<!-- 开始按插件默认的样式加载到准备好的DOM元素中 -->
navlist.init();
user.init();

<!-- 如果不想要插件集成的样式,这个有两种方式进行修改 -->
1、插件自带样式都是用class写的样式，可以直接修改class样式
2、调用返回数据方法，获取用户信息、导航信息，自己集成相应的DOM

navlist.getNavList().then(res=>{
  // res就是你想要的数据
  console.log(res);
});
user.getUserInfo().then(res=>{
  // res就是你想要的数据
  console.log(res);
});

***插件如有bug请联系linguomin_sam@163.com***
