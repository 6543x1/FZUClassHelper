<template>
  <div class="myNotification">
    <MyNav></MyNav>
    <!-- <div class="box">
      <div class="index">
        <a href="index.html"
          ><img src="../assets/img/font.png" alt="福大班务"
        /></a>
      </div>

      <div class="nav">
        <ul>
          <li>
            <a href="index.html"
              ><img src="../assets/img/通知(3).png" alt="" />通知</a
            >
          </li>
          <li>
            <a href="publish.html"
              ><img src="../assets/img/发布.png" alt="" />发布</a
            >
          </li>
          <li>
            <a href="news.html"
              ><img src="../assets/img/班级2.png" alt="" />班级</a
            >
          </li>
        </ul>
      </div>

      <div class="center">
        <a href="sign.html"
          ><img src="../assets/img/头像.png" alt="头像" />我的</a
        >
      </div>
    </div> -->

    <div id="layout">
      <nav>
        <input
          type="button"
          value="全部"
          v-on:click="Getunfinished"
          id="button-nav"
        />
        <br />
        <input
          type="button"
          value="公告"
          v-on:click="Getannouncement"
          id="button-nav"
        /><br />
        <input
          type="button"
          value="投票"
          v-on:click="Getvotes"
          id="button-nav"
        /><br />
        <input
          type="button"
          value="签到"
          v-on:click="Getsignin"
          id="button-nav"
        /><br />
        <input
          type="button"
          value="抽签"
          v-on:click="GetRandom"
          id="button-nav"
        /><br /><br />
      </nav>

      <div id="section">
        <table>
          <tr>
            <td id="button-notice">
              <input type="button" value="我收到的" id="recenotice" />
            </td>
            <td id="button-notice">
              <input type="button" value="我发起的" id="sendnotice" />
            </td>
          </tr>
        </table>

        <div id="notice">
          <h2>{{ title[0] }}</h2>
          <p>
            {{ publisher[0] }}&ensp;&ensp;&ensp;&ensp;&ensp;{{ deadline[0] }}
          </p>
        </div>

        <div id="notice">
          <h2>{{ title[1] }}</h2>
          <p>
            {{ publisher[1] }}&ensp;&ensp;&ensp;&ensp;&ensp;{{ deadline[1] }}
          </p>
        </div>

        <div id="notice">
          <h2>{{title[2]}}</h2>
          <p>
            {{ publisher[2] }}&ensp;&ensp;&ensp;&ensp;&ensp;{{ deadline[2] }}
          </p>
        </div>

        <div id="notice">
          <h2>{{ title[3] }}</h2>
          <p>
            {{ publisher[3] }}&ensp;&ensp;&ensp;&ensp;&ensp;{{ deadline[3] }}
          </p>
        </div>

        <div id="notice">
          <h2>{{ title[4] }}</h2>
          <p>
            {{ publisher[4] }}&ensp;&ensp;&ensp;&ensp;&ensp;{{ deadline[4] }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from '../api/services/service';
import MyNav from "@/components/MyNav.vue";
export default {
  components:{
    MyNav
  },
  name: "MyNotification",
  data() {
    return {
      classID: "",
      classIDs:[],
      token: "",
      deadline: '',
      publisher: '',
      title: '',
      vid: "",
    };
  },
  computed: {
    // classIDs: [],
  },

  mounted() {
    this.token=sessionStorage.getItem('token');
    this.ReceiveClassID();
  },

  methods: {
    //获取投票
    Getvotes() {
      let url = "api/classes/{classID}/getVotes";
      let xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.setRequestHeader("token", this.token);
      this.addURLParam(url, "classID", this.classID);
      xhr.send(null);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            alert("获取成功！");
            var myJson = JSON.parse(xhr.responseText);
            this.deadline = myJson.data.deadline;
            this.publisher = myJson.data.publisher;
            this.title = myJson.data.title;
            this.vid = myJson.data.vid;
            this.ModifyDeadline();
          } else alert("Request was unsuccessful:" + xhr.status);
        }
      };
    },

    //获取公告
    Getannouncement() {
      let url = "api/classes/{classID}/notice";
      let xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.setRequestHeader("token", this.token);
      console.log("classIDs",this.classIDs);
      console.log("classIDs[0]",this.classIDs[0].classID);
      // this.classID=this.classIDs[0].classID;
      // this.addURLParam(url, "classID", this.classID);
      // xhr.send(null);
      // xhr.onreadystatechange = function () {
      //   if (xhr.readyState == 4) {
      //     if (xhr.status >= 200 && xhr.status < 300) {
      //       alert("获取成功！");
      //       var myJson = JSON.parse(xhr.responseText);
      //       console.log(myJson);
      //       this.deadline = myJson.data.deadline;
      //       this.publisher = myJson.data.publisher;
      //       this.title = myJson.data.title;
      //       this.vid = myJson.data.vid;
      //       this.ModifyDeadline();
      //     } else alert("Request was unsuccessful:" + xhr.status);
      //   }
      // };
    },

    //获取签到
    Getsignin() {
      let url = "api/classes/{classID}/signIn";
      let xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      this.addURLParam(url, "classID", this.classID);
      xhr.setRequestHeader("token", this.token);
      xhr.send(null);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            alert("获取成功！");
            var myJson = JSON.parse(xhr.responseText);
            this.deadline = myJson.data.deadline;
            this.publisher = myJson.data.publisher;
            this.title = myJson.data.title;
            this.vid = myJson.data.vid;
            this.ModifyDeadline();
          } else alert("Request was unsuccessful:" + xhr.status);
        }
      };
    },

    //请求所有的班级信息
    ReceiveClassID() {
      let url = "api/classes/getMyClass";
      let xhr = new XMLHttpRequest();
      service.defaults.headers.common["token"] = sessionStorage.getItem('token');
      // service
      //   .get("api" + "/classes/getMyClass", {})
      //   .then((res) => {
      //     console.log(res);
      //     this.classIDs = res.data.data;
      //     this.classID = res.data.data[0].classID;
      //     // this.pageSum= res.data.data.mapList.length/this.pageSize;
      //     console.log(
      //       "@@classIDs is",this.classIDs); 
      //     // console.log(res.data.data[0].classID)
      //   })
      //   .catch((err) => console.log(err));
      xhr.open("get", url, true);
      xhr.setRequestHeader("token", this.token);
      this.addURLParam(url, "classID", this.classID);
      xhr.send(null);
      // 友情提示！箭头函数的内部的this作用域为当前vue实例
      // 而function()通常为window
      xhr.onreadystatechange =  ()=> { 
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            alert("获取成功！");
            var myJson = JSON.parse(xhr.responseText);
            console.log(myJson);
            // this.classID = myJson.data.classID;
            this.classIDs=myJson.data;
            console.log("myJson.data.data:",myJson.data);
            console.log("@@",this.classIDs);
            console.log("@@@",this.classIDs[0].classID);
            // sessionStorage.setItem("classID",this.classID);
          } else alert("Request was unsuccessful:" + xhr.status);
        }
      };
    },

    //获取还未完成的所有活动
    Getunfinished() {
      let url = "api/classes/{classID}/unconfirmed";
      let xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.setRequestHeader("token", this.token);
      this.addURLParam(url, "classID", this.classID);
      xhr.send(null);
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            alert("获取成功！");
            var myJson = JSON.parse(xhr.responseText);
            console.log(myJson);
            this.deadline = myJson.data.deadline;
            this.publisher = myJson.data.publisher;
            this.title = myJson.data.title;
            this.vid = myJson.data.vid;
            this.ModifyDeadline();
          } else alert("Request was unsuccessful:" + xhr.status);
        }
      };
    },

    //格式化截止时间
    ModifyDeadline() {
      let l = this.deadline.length;
      for (let i = 0; i < l; i++)
        this.deadline[i] = "截止时间：" + this.deadline[i];
    },

    //添加信息
    addURLParam(url, name, value) {
      url += url.indexOf("?") == -1 ? "?" : "&";
      url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
      return url;
    },
  },
};
</script>

<style scoped>
/* // vue中直接import 是不受scoped影响的！所以会污染全局
// @import url("../assets/css/通知.css");
// @import url("../assets/css/版头.css"); */

  
</style>
<style src="@/assets/css/通知.css"  scoped>
    </style>
<style src="@/assets/css/版头.css" scoped></style>