import { createNav, createAvatar } from "./nav-user";

const navDOM = document.getElementById("nav");
const avatarDOM = document.getElementById("avatar");

const navlist = new createNav(navDOM);
const user = new createAvatar(avatarDOM);
console.log(navlist);
console.log(user);
navlist.init();
user.init();
