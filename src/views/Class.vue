<template>
  <div>
    <MyNav></MyNav>
    <!-- <div @click="methodName()"></div> -->
    <!-- <div class="nav">
      <ul class="select">
        <li>
          <a href="javascript:;">{{ className }}</a>
        </li>
        <li>
          <a href="javascript:;"
            ><img src="../assets/img/通知(3).png" alt="" />{{ notice }}</a
          >
        </li>
        <li>
          <a href="javascript:;"
            ><img src="../assets/img/发布.png" alt="" />{{ release }}</a
          >
        </li>
        <li @click="C_main, getHandle()">
          <a href="javascript:;"
            ><img src="../assets/img/班级.png" alt="" />{{ class_ }}</a
          >
        </li>
        <li>
          <a href="javascript:;"
            ><img src="../assets/img/wo-de-.png" alt="" />{{ my }}</a
          >
        </li>
      </ul>
    </div> -->
    <div class="line"></div>
    <div class="title">
      <h1>我的班级</h1>
      <p @click="join">加入班级</p>
      <p @click="create">创建班级</p>
    </div>
    <!-- <button @click="check">到班级通知</button> -->
    <!-- <button @click="manage">到班级管理</button> -->
    <!-- <button @click="list">到班级名单</button> -->
    <!-- <button @click="active">到活跃度查看</button> -->
    <div class="line1"></div>
    <!-- <table id="classes">
        <tr v-for="(item,index) in display" :key="index">
            <td>{{item.name}}</td>
        </tr>
    </table> -->
    <ul class="content" id="list">
      <li
        @click="getHandle2()"
        v-for="(item, index) in display.slice(
          (curPage - 1) * pageSize,
          curPage * pageSize
        )"
        :key="index"
      >
        {{ item.name }}
      </li>
    </ul>
    <!-- <button id="pre">上一页</button>
    <p id="index_num" style="display: inline;">/</p>
    <button id="next">下一页</button> -->
    <!--分页控件-->
    <div id="pageControl">
      <input
        type="button"
        class="btn_PageControl"
        v-show="curPage > 1"
        @click="curPage--"
        value="&laquo;"
      />
      <span>当前第{{ curPage }}页</span>/<span>总共{{ pageSum }}页</span>
      <input
        type="button"
        class="btn_PageControl"
        v-show="curPage < pageSum"
        @click="curPage++"
        value="&raquo;"
      />
    </div>
  </div>
</template>

<script>
import service from "../api/services/service";
import MyNav from "@/components/MyNav.vue";
export default {
  components:{
    MyNav
  },
  name: "Class",
  data() {
    return {
      className: "FZU班务助手",
      notice: "通知",
      release: "发布",
      class_: "班级",
      my: "我的",
      display: [],
      classID: "",
      deadLine: "",
      publisher: "",
      title: "",
      pageSum: 0,
      pageSize: 5,
      curPage: 1,
    };
  },
  mounted() {
    this.getHandle();
  },
  methods: {
    join() {
      this.$router.push("/Join");
    },
    create() {
      this.$router.push("/Create");
    },
    check() {
      this.$router.push(
        "/Notice/" +
          this.classID +
          "/" +
          this.deadLine +
          "/" +
          this.publisher +
          "/" +
          this.title
      );
    },
    manage() {
      this.$router.push("/Management/");
    },
    list() {
      this.$router.push("/List");
    },
    active() {
      this.$router.push("/Active");
    },
    C_main() {
      this.$router.push("/");
    },
    // axios.get 发起get请求
    // 参数一 表示请求的地址
    // 参数二 表示配置的信息
    // params 表示传递到服务器端的数据，以url参数的形式拼接在请求地址后面
    // headers 表示请求头
    getHandle() {
      // console.log("hhh")
      let userInfo = JSON.parse(sessionStorage.getItem("user"));
      if (userInfo.role === "teacher") {
        this.getHandle1();
        return;
      }
      let token = sessionStorage.getItem('token');
      service.defaults.headers.common["token"] = token;
      service
        .get("api" + "/classes/getMyClass", {})
        .then((res) => {
          console.log(res);
          this.display = res.data.data;
          this.classID = res.data.data[0].classID;
          // this.pageSum= res.data.data.mapList.length/this.pageSize;
          console.log(
            "@@pageSum is",
            Math.ceil(res.data.data.length / this.pageSize)
          ); //NICE
          this.pageSum = Math.ceil(res.data.data.length / this.pageSize);
          // console.log(res.data.data[0].classID)
        })
        .catch((err) => console.log(err));
    },
    getHandle1() {
      // console.log("hhh")
      let token = this.$store.state.token;
      service.defaults.headers.common["token"] = token;
      service
        .get("api" + "/classes/getMyCreatedClass", {})
        .then((res) => {
          console.log(res);
          this.display = res.data.data;
          this.classID = res.data.data[0].classID;
          this.pageSum = Math.ceil(res.data.data.length / this.pageSize);
          // console.log(res.data.data[0].classID)
        })
        .catch((err) => console.log(err));
    },
    getHandle2() {
      // let _this = this
      // console.log("hhh")
      let param = new FormData();
      // param.append('classID',this.classID)
      // console.log(this.classID)
      let token = this.$store.state.token;
      service.defaults.headers.common["token"] = token;
      service
        .get("api" + "/classes/" + this.classID + "/getVotes", param)
        .then((res) => {
          console.log(res);
          this.display = res.data[0];
          this.deadLine = res.data[0].deadLine;
          this.publisher = res.data[0].publisher;
          this.title = res.data[0].title;
          // console.log(this.title)
          this.check();
        })
        .catch((err) => console.log(err));
    },
    //     postHandle(){
    //         let param = new FormData()
    //         param.append('classID', this.classID)
    //         let token = this.$store.state.token
    //         // console.log(token)
    //         service.defaults.headers.common['token'] = token
    //         service.post('api'+'/classes/'+this.classID+'/join',param)
    //         .then(res => {
    //             console.log(res);
    //             confirm(res.msg);
    //         })
    //         .catch(err => console.log(err));
  },
};
</script>
<style src="@/assets/css/reset.css" scoped></style>
<style src="@/assets/css/nav.css" scoped></style>
<style src="@/assets/css/main.css" scoped></style>
<style scoped>
/* @import url("../assets/css/reset.css"); */
/* @import url("../assets/css/main.css"); */
/* @import url("../assets/css/nav.css"); */
#pageControl {
  position: relative;
  bottom: 0;
  margin: auto;
}
#list {
  height: 500px;
}
.btn_PageControl {
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
  width: 60px;
  height: 40px;
  text-align: center;
  font-size: 20px;
  background: rgb(241, 241, 241);
  border: none;
}
.btn_PageControl:hover {
  background: rgb(221, 221, 221);
}
</style>


