<template>
  <div class="heade">
    <div class="nav-box" id={hide:isNav}>
      <div class="nav">
        <a href="http://www.wwenj.com" class="logo-home">
          <img src="../../static/img/logo1.png" alt="" width="30" height="30">
          <span>Home</span>
        </a>
        <div class="nav-con">
          <a href="http://blog.wwenj.com/" target="_Blank">博文</a>
          <a href="http://resume.wwenj.com/" target="_Blank">简历</a>
          <a href="http://yun.wwenj.com/" target="_Blank">实验室</a>
          <a href="http://liuyan.wwenj.com/" target="_Blank">留言</a>
        </div>
      </div>
      <!-- 导航栏底部阴影层 -->
      <div class="shadow"></div>
    </div>
    <div class="bot"></div>
  </div>
</template>

<script>
export default {
  name: "Heade",
  data() {
    return {
      isNav: 1,
      F: 1
    };
  },
  mounted() {
    if (document.addEventListener) {
      document.addEventListener("DOMMouseScroll", this.scrollFunc, false);
    }
    window.onmousewheel = document.onmousewheel = this.scrollFunc;
  },
  methods: {
    scrollFunc: function(e) {
      e = e || window.event;
      if (e.wheelDelta) {
        this.F = e.wheelDelta;
      } else if (e.detail) {
        this.F = e.detail;
      }
      if (this.F < 0) {
        console.log("向下");
      } else {
        console.log("向上");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* pc屏幕样式 */
@media (max-width: 700px) {
  .heade .nav-box {
    box-shadow: 0px 0px 0px red inset;
  }
}
/* 手机端样式 */
@media (max-width: 600px) {
  .heade .nav-con {
    display: none;
  }
}
#hide {
  display: none;
}
.heade {
  width: 100%;
  position: fixed;
  z-index: 20;
}
.nav-box {
  width: 100%;
  height: 50px;
  background: #ffffff;
  position: absolute;
  top: 0;
  left: 0;
  box-shadow: 0px 2px 3px #ccc inset;
}
.nav {
  width: 88%;
  height: 50px;
  margin: auto;
}
.nav-box:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  bottom: -30px;
  left: 0;
  border-style: solid;
  border-width: 0 0 30px 100vw;
  border-color: transparent #ffffff;
}
.shadow {
  width: 100%;
  border-bottom: 1px solid #fff;
  transform: rotate(-1.2deg);
  margin-top: 14px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.7);
}
/* 导航logo */
.logo-home {
  float: left;
}
.logo-home img {
  vertical-align: bottom;
}
.logo-home {
  display: inline-block;
  width: 130px;
  height: 50px;
}
.logo-home span {
  display: inline-block;
  height: 50px;
  line-height: 72px;
  vertical-align: bottom;
  font-size: 25px;
  font-weight: bold;
}
/*导航选项*/
.nav-con {
  height: 50px;
  float: right;
  line-height: 55px;
  /* border: 1px solid black; */
}
.nav-con a {
  display: inline-block;
  padding: 0 15px;
  margin-right: 15px;
  font-size: 15px;
  transition: all 0.3s;
  color: #666;
}
.nav-con a:hover {
  color: #f70;
}
</style>
