<template>
  <div class="app">
    <Heade class="heade"></Heade>
    <Liuyan></Liuyan>
    <Foot></Foot>
  </div>
</template>

<script>
import Heade from "./components/heade";
import Foot from "./components/foot";
import Liuyan from "./components/liuyan";
export default {
  components: {
    Heade,
    Foot,
    Liuyan
  },
  data() {
    return {};
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.app {
  width: 100%;
  height: 2000px;
  /* background: rgb(235, 235, 235); */
}
body::-webkit-scrollbar {
  width: 6px;
  background-color: rgb(251, 245, 245);
}
body::-webkit-scrollbar-thumb {
  height: 150px;
  background-color: #555;
}
</style>
