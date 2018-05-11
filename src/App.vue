<template>
  <div class="app">
    <Heade></Heade>
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
body::-webkit-scrollbar {
  width: 6px;
  background-color: rgb(251, 245, 245);
}
body::-webkit-scrollbar-thumb {
  height: 150px;
  background-color: #555;
}
</style>
