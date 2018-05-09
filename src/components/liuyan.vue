<template>
  <div class="hello">
    111111
  </div>
</template>

<script>
export default {
  name: "Liuyan",
  data() {
    return {};
  },
  methods: {
    liuyanAjax: function() {
      // var that = this;
      this.axios({
        url: "http://api.zhituteam.com/api/index",
        method: "get",
        params: {
          ID: 12345 // 请求参数
        },
        withCredentials: false, // 跨域不带凭证 默认
        responseType: "json" // 响应数据类型 默认
      })
        .then(function(res) {
          console.log(res);
          alert("1");
        })
        .catch(function(err) {
          alert("ajax请求出错，错误信息：" + err)
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 100px;
  height: 100px;
}
</style>
