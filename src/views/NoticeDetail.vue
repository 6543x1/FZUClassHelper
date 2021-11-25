<template>
  <div class="noticeDetail">
    <MyNav />
    <div id="publish-page">
      <div class="box4">
        <div class="box5">
          <button
            href=""
            onclick="window.history.back(-1)"
            style="
              outline: none;
              cursor: pointer;
              border: none;
              background: none;
              font-size: 30px;
              position: relative;
              left: 5px;
              float: left;
            "
          >
            <span style="color: red; font-size: 30px">&lt;</span>
          </button>
          <center>
            <span class="title">{{ notice.title }}</span>
          </center>
          <a
            href="count.html"
            style="
              position: relative;
              position: relative;
              float: right;
              right: 5px;
            "
            ><img src="../assets/img/投票(1).png" style="height: 15px" />
            统计结果</a
          >
          <span
            style="
              float: left;
              clear: both;
              margin-left: 100px;
              color: slategrey;
            "
            >{{ notice.publisher }}</span
          >
          <span style="float: left; margin-left: 50px; color: slategrey">{{
            notice.publishTime
          }}</span>
          <span style="float: left; margin-left: 50px; color: red"
            >截止时间：</span
          >
          <span style="float: left; color: red">{{ notice.deadLine }}</span>
        </div>
        <div class="box6">
          {{ notice.body }}
        </div>
        <div class="notice_confirm">
          <button @click="gotoConfirm" :class='[confirm=="确认公告"?"btn_confirm":"btn_noConfirm"]'>{{ confirm }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyNav from "@/components/MyNav.vue";
import service from "../api/services/service";
export default {

  data() {
    return {
      notice: {},
      // confirm:'确认公告'
    };
  },
  computed: {
    confirm() {
      if (this.notice.deadLine == null) {
        return "无需确认";
      } else if(this.notice.confirm==true){
        return "已确认";
      }else{
          return "确认公告";
      }
    },
  },
  mounted() {
    console.log(this.$route.params);
    this.notice = JSON.parse(this.$route.params.notice);
    console.log("this.notice=", this.notice);
  },
  name: "NoticeDetail",
  components: {
    MyNav,
  }, 
  methods: {
      gotoConfirm(){
        //   let url="api/classes/"+this.notice.classID+"/notice/confirm";
          let param = new FormData();
      param.append("nid", this.notice.nid);
      let token = sessionStorage.getItem('token');
      service.defaults.headers.common["token"] = token;
      service
        .post("/api/classes/"+this.notice.classID+"/notice/confirm", param)
        .then((res) => {
          console.log(res);
            alert(res.data.msg);
            if(res.data.status==true||res.data.msg=='超时确认成功'){
                this.notice.confirm=true;
            }
        
        })
        .catch((err) => console.log(err));
      }
  },
};
</script>

<style scoped>
.notice_confirm button {
  cursor: pointer;
  border: none;
  display: inline-block;
  width: 80px;
  height: 30px;
  font-size: 20px;
  /* background: rgb(1, 176, 255); */
  color: white;
}
.btn_confirm{
    background: rgb(1,176,255);
}
.btn_noConfirm{
    background: rgb(221, 221, 221);
}
</style>
<style src="../assets/css/style.css" scoped>
</style>