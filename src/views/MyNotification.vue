/* eslint-disable */ 
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
          v-on:click="getRandom"
          id="button-nav"
        />
        <br><br>
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
        
      <ul class="content" id="list">
      <li
        v-for="(item, index) in display.slice( (curPage - 1) * pageSize,
          curPage * pageSize)"
        :key="index"
      >
        {{ item.title }}
        <br>
        截止时间:{{item.deadLine}}
      </li>
    </ul>
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
        <!-- <div id="notice">
          <h2>{{ title}}</h2>
          <p>
            {{ publisher}}&ensp;&ensp;&ensp;&ensp;&ensp;{{ deadline }}
          </p>
        </div> -->

        <!-- <div id="notice1">
          <h2>{{ title[1] }}</h2>
          <p>
            {{ publisher[1] }}&ensp;&ensp;&ensp;&ensp;&ensp;{{ deadline[1] }}
          </p>
        </div>

        <div id="notice2">
          <h2>{{title[2]}}</h2>
          <p>
            {{ publisher[2] }}&ensp;&ensp;&ensp;&ensp;&ensp;{{ deadline[2] }}
          </p>
        </div>

        <div id="notice3">
          <h2>{{ title[3] }}</h2>
          <p>
            {{ publisher[3] }}&ensp;&ensp;&ensp;&ensp;&ensp;{{ deadline[3] }}
          </p>
        </div>

        <div id="notice4">
          <h2>{{ title[4] }}</h2>
          <p>
            {{ publisher[4] }}&ensp;&ensp;&ensp;&ensp;&ensp;{{ deadline[4] }}
          </p>
        </div> -->
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
      display:[],
      token: "",
      deadline: '',
      publisher: '',
      title: '',
      vid: "",
      pageSum:0,
      pageSize:5,
      curPage:1,
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
    getRandom(){
      console.log('Random...');
    },
    //获取投票
    Getvotes() {
      let url = "api/classes/{classID}/getVotes";
      let xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.setRequestHeader("token", this.token);
      this.addURLParam(url, "classID", this.classID);
      xhr.send(null);
      xhr.onreadystatechange = ()=> {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            alert("获取成功！");
            var myJson = JSON.parse(xhr.responseText);
            this.deadline = myJson.data[0].deadline;
            this.publisher = myJson.data[0].publisher;
            this.title = myJson.data[0].title;
            this.vid = myJson.data[0].vid;
            this.ModifyDeadline();
          } else alert("Request was unsuccessful:" + xhr.status);
        }
      };
    },

    //获取公告
    Getannouncement() {
      // let url = "api/classes/{classID}/notice";
       console.log("classIDs",this.classIDs);
      console.log("classIDs[0]",this.classIDs[0].classID);
      this.classID=this.classIDs[0].classID;
      let url="api/classes/"+this.classID+"/notice";
      let xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      xhr.setRequestHeader("token", this.token);
     
      // this.addURLParam(url, "classID", this.classID);
      xhr.send(null);
      xhr.onreadystatechange = ()=> {
        if (xhr.readyState == 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText);
            var myJson = JSON.parse(xhr.responseText);
            console.log("noticeRes",myJson);
            this.display=myJson.data;
            console.log(typeof(this.display));
            console.log(this.display);
            this.pageSum=Math.ceil(this.display.length/this.pageSize);
            // this.deadline = myJson.data[0].deadline;
            // this.publisher = myJson.data[0].publisher;
            // this.title = myJson.data[0].title;
            // this.vid = myJson.data[0].vid;
            this.ModifyDeadline();
          } else alert("Request was unsuccessful:" + xhr.status);
        }
      };
    },

    //获取签到
    Getsignin() {
      let url = "api/classes/{classID}/signIn";
      let xhr = new XMLHttpRequest();
      xhr.open("get", url, true);
      this.addURLParam(url, "classID", this.classID);
      xhr.setRequestHeader("token", this.token);
      xhr.send(null);
      xhr.onreadystatechange = ()=> {
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
      xhr.onreadystatechange = ()=> {
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
      // let l = this.deadline.length;
      // for (let i = 0; i < l; i++)
      //   this.deadline[i] = "截止时间：" + this.deadline[i];
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
.content{
    height: 300px;
}
.content li{
    height: 50px;
    width: 80%;
    font-size:  15px;
    color: #3393FC;
    /* border-top: 1px solid #000; */
    border: 1px solid #000;
    /* margin: -1px; */
    margin: 10px auto;
    list-style-type: none;
}
#pageControl{
  margin-left:50px;
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
<style src="@/assets/css/通知.css"  scoped>
    </style>
<style src="@/assets/css/版头.css" scoped></style>