import senseHeader from "./nav-user";

const navDOM = document.getElementById("nav");
const avatarDOM = document.getElementById("avatar");

senseHeader.createNav(navDOM,'/iam');
senseHeader.createAvatar(avatarDOM,'/iam');
senseHeader.getNavList().then((res) => {
  console.log(res);
});
senseHeader.getUserInfo().then((res) => {
  console.log(res);
});
