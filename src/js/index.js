import SenseHeader from "./nav-user";

const navDOM = document.getElementById("nav");
const avatarDOM = document.getElementById("avatar");

const senseHeader = new SenseHeader("/panorama");
console.log(senseHeader);
console.log(
  senseHeader.initNav(navDOM).then(res => {
    console.log(res);
  })
);
console.log(
  senseHeader.initAvatar(avatarDOM).then(res => {
    console.log(res);
  })
);
