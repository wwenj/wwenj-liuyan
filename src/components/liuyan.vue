<template>
  <div class="app">
    <div class="heade">
      <img src="../../static/img/bg.jpg" alt="背景图" class="heade-bg">
      <div class="input-box">
        <div class="header-logo-box">
          <img src="../../static/img/headr-logo.jpg" alt="头像">
          <p>wwenj</p>
        </div>
        <textarea v-model="inputAdd" :id="isIput==1?'input':''" @focus="inputFocus" @blur="inputBlur" type="text" placeholder="说点什么吧,民主 和谐 文明 富强"></textarea>
        <div class="inputAdd" :id="isIput==1?'inputAdd':''">
          <span @click="add">发布</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Liuyan",
  data() {
    return {
      isIput: 0,
      inputAdd: ''
    };
  },
  mounted() {
    // this.liuyanAjax()
  },
  methods: {
    liuyanAjax: function() {
      // var that = this;
      this.axios({
        url: "../../static/json/index.json",
        method: "get",
        params: {
          // ID: 12345
        },
        responseType: "json" // 响应数据类型 默认
      })
        .then(function(res) {
          console.log(res);
        })
        .catch(function(err) {
          alert("ajax请求出错，错误信息：" + err);
        });
    },
    inputFocus: function() {
      this.isIput = 1;
    },
    inputBlur: function() {
      this.isIput = 0;
    },
    add: function() {
      alert(this.inputAdd)
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
  .heade .input-box {
    margin-top: 20px;
  }
  .input-box textarea{
    font-size: 12px;
  }
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
  left: 20px;
  width: 40px;
  margin-right: 20px;
}
.header-logo-box img {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 5px;
}
.header-logo-box p {
  margin-top: 10px;
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
}
#input {
  border: 1px solid rgb(236, 162, 2);
  /* transition: all 0.1s; */
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
</style>
