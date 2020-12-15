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
