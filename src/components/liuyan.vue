<template>
  <div class="app">
    <div class="heade">
      <img src="../../static/img/bg.jpg" alt="背景图" class="heade-bg">
      <div class="input-box">
        <div class="header-logo-box" @click="changeUser">
          <img src="../../static/img/headr-logo.png" alt="头像">
          <p>{{user_name}}</p>
        </div>
        <textarea v-model="inputAdd" :id="isInput1==1?'input':''" @focus="inputFocus(1)" @blur="inputBlur(1)" type="text" placeholder="说点什么吧 富强 民主 文明 和谐"></textarea>
        <div class="inputAdd" :id="isInput2==1?'inputAdd':''">
          <span @click="add">发布</span>
        </div>
      </div>
      <!-- 填写个人信息 -->
      <div class="user-box" :id="userShow==1?'userBox':''">
        <input type="text" v-model="user_name" :id="isInput1==2?'input':''" @focus="inputFocus(2)" @blur="inputBlur(2)" placeholder="请输入昵称 （必填）">
        <input type="text" v-model="user_email" :id="isInput1==3?'input':''" @focus="inputFocus(3)" @blur="inputBlur(3)" placeholder="请输入邮箱 （选填）">
        <input type="text" v-model="token" :id="isInput1==4?'input':''" @focus="inputFocus(4)" @blur="inputBlur(4)" placeholder="请输入标识码 （选填）">
        <span @click="saveUser">确认</span>
      </div>
    </div>
    <!-- 列表 -->
    <div class="content-box">
      <div class="content">
        <ul class="left-list" v-if="list">
          <li v-for="(item, index) in list" :key="index">
            <img class="list-logo" :src="item.img" onerror="this.src='../../static/img/headr-logo.png'" alt="用户头像">
            <div class="list">
              <p class="list-title">{{item.user_name}}</p>
              <p class="list-content">{{item.content}}</p>
              <span class="list-time">{{item.time}}</span>
              <p class="btm">
                <a @click="deleteList(item.cid, index)">删除</a>
                <a @click="toUser(item.user_name)">回复</a>
              </p>
            </div>
          </li>
          <div class="more" @click="toMore">{{fontEnd}}</div>
        </ul>
      </div>
    </div>
    <!-- 返回顶部 -->
    <transition name="fade">
      <div v-show="isToTop==='1'" @click="toTop" class="toTop">
        <img src="../../static/img/totop.png" alt="返回顶部" title="返回顶部">
      </div>
    </transition>
  </div>
</template>

<script>
// import $ from "jquery";
import bus from "../assets/eventBus.js";
export default {
  name: "Liuyan",
  data() {
    return {
      isInput1: 0, // 聚焦失焦input框
      isInput2: 0, // 聚焦失焦发布页面
      userShow: 0, // 修改个人信息
      inputAdd: "", // 评论内容
      user_name: "雁过留名",
      user_email: "",
      token: "",
      user_sex: "",
      list: [],
      limit: [1, 10],
      fontEnd: "点击加载更多",
      isToTop: 0
    };
  },
  mounted() {
    var that = this;
    bus.$on("toTopEvent", function(mse) {
      // 兄弟组件通信
      that.isToTop = mse;
    });
    this.listAjax();
    if (localStorage.user) {
      var user = localStorage.user;
      user = JSON.parse(user);
      this.user_name = user.user_name;
    }
  },
  methods: {
    /* 获取评论 */
    listAjax: function() {
      var that = this;
      this.axios({
        // url: "../../static/json/list.json",
        url: "http://192.168.1.147/index.php?r=lst",
        method: "get",
        params: {
          limit: that.limit
        },
        responseType: "json" // 响应数据类型 默认
      })
        .then(function(res) {
          if (res.data.error_code !== 0) {
            alert(res.data.message);
          } else {
            // var aa = JSON.parse(res.data.data);
            res.data.data.list.forEach(function(item, index, array) {
              that.list.push(item);
            });
            if (res.data.data.last === 1) {
              // 判断后面是否还有数据
              that.fontEnd = "已经到底部啦！";
            }
          }
        })
        .catch(function(err) {
          alert("获取评论ajax请求出错，错误信息：" + err);
        });
    },
    /* 增加评论 */
    liuyanAjax: function() {
      var that = this;
      var user = localStorage.user;
      user = JSON.parse(user);
      this.axios({
        // url: "../../static/json/index.json",
        url: "http://192.168.1.147/index.php?r=add",
        method: "get",
        params: {
          user_name: user.user_name,
          user_email: user.user_email,
          token: user.token,
          user_sex: user.user_sex,
          content: this.inputAdd,
          img: "../../static/img/headr-logo.png"
        },
        responseType: "json" // 响应数据类型 默认
      })
        .then(function(res) {
          if (res.data.error_code !== 0) {
            that.list.splice(0, 1);
            alert(res.data.message);
          } else {
            // alert(that.list[0])
            // console.log(that.list[0].cid, res.data.data.cid);
            that.list[0].cid = res.data.data.cid;
          }
        })
        .catch(function(err) {
          that.list.splice(0, 1);
          alert("增加评论ajax请求出错，错误信息：" + err);
        });
    },
    /* 聚焦 */
    inputFocus: function(id) {
      if (id !== 1) {
        this.isInput1 = id;
      } else {
        this.isInput1 = 1;
        this.isInput2 = 1;
      }
    },
    /* 失焦 */
    inputBlur: function() {
      this.isInput1 = 0;
      this.isInput2 = 0;
    },
    /* 增加评论 */
    add: function() {
      /* 临时添加 */
      var user = localStorage.user;
      user = JSON.parse(user);
      var addCon = {
        user_name: user.user_name,
        time: "17:20 2018-5-4",
        img: "",
        content: this.inputAdd,
        cid: 0
      };
      if (localStorage.user) {
        if (this.inputAdd) {
          this.liuyanAjax();
          this.inputAdd = "";
          this.list.unshift(addCon);
        } else {
          alert("请输入评论内容");
        }
      } else {
        alert("请先设置昵称");
      }
    },
    changeUser: function() {
      this.userShow = 1;
      this.user_name = "";
    },
    /* 确认个人信息 */
    saveUser: function() {
      if (this.user_name !== "") {
        this.userShow = 0;
        var token;
        if (this.token === "12580") {
          token = 1;
        } else {
          token = 2;
        }
        var user = {
          user_name: this.user_name,
          user_email: this.user_email,
          token: token,
          user_sex: this.user_sex
        };
        user = JSON.stringify(user); // 存入前先转化为字符串
        localStorage.setItem("user", user);
      } else {
        alert("请输入昵称");
      }
    },
    /* 删除评论 */
    deleteList: function(cid, index) {
      /* 删除ajax */
      var user = localStorage.user;
      user = JSON.parse(user);
      if (user.token === 1) {
        /* 删除列表项 */
        this.list.splice(index, 1);
        this.axios({
          // url: "../../static/json/index.json",
          url: "http://192.168.1.147/index.php?r=del",
          method: "get",
          params: {
            cid: cid,
            token: 1
          },
          responseType: "json" // 响应数据类型 默认
        })
          .then(function(res) {
            if (res.data.error_code !== 0) {
              alert(res.data.message);
            }
          })
          .catch(function(err) {
            alert("删除评论ajax请求出错，错误信息：" + err);
          });
      } else {
        alert("对不起，您没有权限");
      }
    },
    /* 加载更多 */
    toMore: function() {
      var arr = [];
      this.limit.forEach(function(item, index, array) {
        arr.push(item + 10);
      });
      this.limit = arr;
      if (this.fontEnd === "已经到底部啦！") {
        alert("没有更多评论啦!");
      } else {
        this.listAjax();
      }
    },
    /* 回复 */
    toUser: function(userName) {
      this.inputAdd = "@" + userName + "：";
      alert(window.scrollTop());
    },
    toTop: () => {
      bus.$emit("toTopEvent");
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media (max-width: 600px) {
  .heade .heade-bg {
    margin-top: 50px;
  }
  .heade .user-box {
    margin-top: 20px;
  }
  .heade .input-box {
    margin-top: 20px;
  }
  .input-box textarea {
    font-size: 12px;
  }
}
.app {
  background: #f4f4f4;
  padding-bottom: 50px;
}
.heade {
  width: 100%;
  max-height: 640px;
  position: relative;
}
.heade-bg {
  margin-top: 30px;
  width: 100%;
  height: auto;
}
.input-box {
  width: 55%;
  max-width: 700px;
  height: 120px;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 20px 20px 80px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.198);
}
.header-logo-box {
  position: absolute;
  top: 20px;
  left: 5px;
  width: 70px;
  text-align: center;
  cursor: pointer;
}
.header-logo-box img {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 5px;
}
.header-logo-box p {
  width: 100%;
  margin-top: 10px;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
textarea {
  width: 99%;
  height: 99%;
  vertical-align: top;
  outline: none;
  color: rgb(12, 12, 12);
  font-size: 18px;
  resize: none;
  padding: 5px 10px;
  box-sizing: border-box;
  z-index: 10;
  transition: all 0.3s;
}
#input {
  border: 1px solid rgb(236, 162, 2);
  transition: all 0.3s;
}
.inputAdd {
  width: 100%;
  max-width: 700px;
  height: 34%;
  max-height: 120px;
  background: #fff;
  position: absolute;
  top: 100%;
  left: 0;
  padding: 0 20px;
  margin-top: -5px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.198);
  transform: rotateX(-90deg);
  opacity: 0;
  transition: all 0.3s;
}
#inputAdd {
  transform: rotateX(0deg);
  opacity: 1;
}
.inputAdd span {
  padding: 0 20px;
  font-size: 15px;
  height: 30px;
  line-height: 30px;
  color: #fff;
  background: #f90;
  border-radius: 2px;
  transition: all 0.1s linear;
  cursor: pointer;
  float: right;
}
.inputAdd span:hover {
  background: rgb(230, 139, 3);
}
/* 填写个人信息 */
.user-box {
  width: 55%;
  max-width: 700px;
  height: 120px;
  background: rgba(0, 0, 0, 0.877);
  border: 1px solid #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotateX(90deg);
  padding: 20px 20px 20px 20px;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(255, 255, 255, 0.198);
  opacity: 0;
  transition: all 0.5s;
}
#userBox {
  transform: translate(-50%, -50%) rotateX(0deg);
  opacity: 1;
}
.user-box input {
  width: 200px;
  height: 30px;
  outline: none;
  border: 1px solid #fff;
  background: rgb(39, 39, 39);
  color: #f70;
  margin-bottom: 15px;
  margin-right: 20px;
  text-indent: 10px;
}
.user-box span {
  display: inline-block;
  width: 80px;
  height: 25px;
  text-align: center;
  color: #fff;
  line-height: 25px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.5s;
  font-size: 14px;
}
.user-box span:hover {
  color: #fff;
  border: 1px solid #fff;
  background: #f70;
}
/* 评论列表 */
.content-box {
  width: 100%;
}
.content {
  max-width: 1200px;
  width: 88%;
  margin: 10px auto;
}
/* 左边评论列表 */
.left-list {
  width: 70%;
  border: 1px solid #e0e0e0;
}
.left-list li {
  min-height: 110px;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 15px 15px 15px 80px;
  box-sizing: border-box;
  position: relative;
}
.left-list li:hover {
  background: #ebe9e9;
}
/* 评论用户头像 */
.list-logo {
  width: 50px;
  height: 50px;
  position: absolute;
  top: 20px;
  left: 15px;
}
.list {
  width: 100%;
  box-sizing: border-box;
}
.list-title {
  margin-bottom: 8px;
  font-size: 16px;
  color: rgb(221, 134, 3);
}
.list-content {
  margin-bottom: 12px;
  font-size: 14px;
  color: #333;
  line-height: 20px;
}
.list-time {
  display: inline-block;
  font-size: 12px;
  color: rgb(75, 73, 73);
}
.btm {
  position: absolute;
  right: 15px;
  bottom: 10px;
}
.btm a {
  color: #aaa;
  font-size: 14px;
  transition: all 0.3s;
  margin-left: 10px;
  cursor: pointer;
}
.btm a:hover {
  color: #f70;
  text-decoration: underline;
}
/* 加载更多 */
.more {
  width: 100%;
  height: 20px;
  cursor: pointer;
  line-height: 20px;
  text-align: center;
  margin: 10px auto;
  color: rgba(51, 51, 51, 0.863);
  transition: all 0.2s;
  font-size: 16px;
}
.more:hover {
  color: #f70;
  text-decoration: underline;
}
/* 返回顶部 */
.toTop {
  width: 50px;
  height: 50px;
  position: fixed;
  right: 30px;
  bottom: 40px;
  background: rgb(122, 122, 122);
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  transition: all 0.4s;
  border-radius: 2px;
}
.toTop:hover {
  background: rgb(114, 113, 113);
}
.toTop img {
  width: 30px;
  height: 30px;
  vertical-align: middle;
}
.fade-enter {
  opacity: 0;
  right: 0px;
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  right: 80px;
}
.fade-leave-active {
  transition: all 0.3s;
}
.fade-leave-to {
  right: 0px;
  opacity: 0;
}
</style>
