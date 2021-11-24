<template>
  <div class="myNav">
    <div class="nav">
      <ul class="select">
        <li>
          <a href="javascript:;">FZU班务助手</a>
        </li>
        <li @click="gotoMyNotification">
          <a href="javascript:;"
            ><img src="../assets/img/通知(3).png" alt="" />通知</a>
        </li>
        <li>
          <a href="javascript:;"
            ><img src="../assets/img/发布.png" alt="" />发布</a>
        </li>
        <li @click="C_main">
          <a href="javascript:;"
            ><img src="../assets/img/班级.png" alt="" />班级</a>
        </li>
        <li>
          <a href="javascript:;"
            ><img src="../assets/img/wo-de-.png" alt="" />我的</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    name:'MyNav',
    methods: {
        C_main() {
            console.log("goto /");
            this.$router.push("/");
        },
        gotoMyNotification(){
            console.log("gotoMyNotification");
            this.$router.push("/MyNotification");
        }
    }
}
</script>
<style scoped>
   .select{
    list-style: none;
  }
  .select li{
    margin: 0;
    padding: 0;
    border:0;
    list-style-type: none;
  }
  .select ul{
    list-style-type: none;
  }
</style>
<style src="@/assets/css/nav.css" scoped>
 

</style>
