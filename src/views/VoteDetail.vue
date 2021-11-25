<template>
  <div class="voteDetail">
       <div id="publish-page">
       <MyNav/>
        <div class="box4">
            <div class="box5">
                <button href="" onclick="window.history.back(-1)"
                    style="outline: none; cursor: pointer; border: none; background: none; font-size: 30px; position: relative;left: 5px; float: left;"><span
                        style="color: red;font-size: 30px;">&lt;</span></button>
                <span class="title">{{vote.title}}</span>
                <a href="count.html"
                    style="position: relative;position: relative; float: right;right: 5px; display: none;"
                    id="count"><img src="image/投票(1).png" style="height: 15px;"> 参与情况</a>
                <span style="float: left;clear: both;margin-left: 100px;color: slategrey;">{{vote.publisher}}</span>
                <span style="float: left;margin-left: 50px;color: slategrey;">{{vote.publishedTime}}</span>
                <span style="float: left;margin-left: 50px;color:red">截止时间：</span>
            <span style="float: left;color: red;">{{vote.deadLine}}</span>
            </div>
            <div class="box6">
                <!-- <input type="checkbox" v-for="(item,index) in vote.selections" :key="index" name="1">{{item}}</input> -->
                <p v-for="(item,index) in vote.selections" :key="index"><label><input type="radio" name="1" :value="item" v-model="curSelection" @change="showSelection">{{item}}</label></p>
                <!-- <form action="" method="post">
                    <p><label><input type="checkbox" name="1" value="1">选项一选项一选项一选项一</label></p>
                    <p><label><input type="checkbox" name="1" value="2">选项一选项一选项一选项一</label></p>
                    <p><label><input type="checkbox" name="1" value="3">选项一选项一选项一选项一</label></p>
                    <p><label><input type="checkbox" name="1" value="4">选项一选项一选项一选项一</label></p>
                </form> -->
                <!-- <form action="" method="post"> -->
                    <!-- <button type="button" id="votei"
                        onclick="document.getElementById('count').style.display='block';document.getElementById('votei').style.background='rgb(164,164,164)';document.getElementById('butto').innerHTML='已投票';document.getElementById('vote_count').style.display='block'"> -->
                    <button type="button" id="votei" @click="gotoVote">
                        <span color="white" id="butto">投 票</span>
                    </button>
                <!-- </form> -->
                <a href="vote_count.html"
                    style="position: relative;position: relative;top: 115px;left: 325px;  display: none;"
                    id="vote_count"><img src="image/投票(1).png" style="height: 15px;"> 统计结果</a>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import MyNav from "@/components/MyNav.vue";
import service from "../api/services/service";
export default {
    name:'VoteDetail',
    components:{
        MyNav,
    },
    data(){
        return {
            vote:{},
            curSelection:'',
        }
    },
    computed:{
        voted(){
            return '投票';
        }
    },
    methods:{
        gotoVote(){
                let param = new FormData();
      param.append("vid", this.vote.nid);
      param.append("selections",this.curSelection);
      let token = sessionStorage.getItem('token');
      service.defaults.headers.common["token"] = token;
      service
        .post("/api/classes/"+this.vote.classID+"/notice/vote", param)
        .then((res) => {
          console.log(res);
            alert(res.data.msg);
            // if(res.data.status==true){
            //     this.notice.confirm=true;
            // }
        
        })
        .catch((err) => console.log(err));
        },
        showSelection(){
            console.log(this.curSelection);
        }
    },
    mounted(){
        this.vote=JSON.parse(this.$route.params.vote);
        console.log(this.vote);
    }
}
</script>
<style src="../assets/css/style.css" scoped>
</style>
 <style scoped>
        .box6 p {
            position: relative;
            left: 0px;
            margin: 10px;
            font-size: 20px;
        }
        .box4{
            height:300px;
        }
    </style>
