<template>
   <div class="publicSignIn">
      <MyNav/>
    <div class="box1">
        <div class="publish_sheet">
            <ul>
               
                <li><a href="发布公告页面.html">发布公告</a></li>
                <li><a href="发布投票页面.html">发布投票</a></li>
                <li><p>发布签到</p></li>
                <li><a href="发布课堂页面.html">课堂问答</a></li>
                <li><a href="发布抽签页面.html">活动抽签</a></li>
            </ul>
        </div>
        <div id="operation2">
            <h2>定时签到</h2>
            <table>
                <tr>
                    <td>发送给</td>
                     <td><select v-model="classID" class="noticePublic_select">
                        <option value="null">请下拉选择一个班级</option>
                        <option v-for="(item,index) in classes" :key="index" :value="item.id">{{item.name}}</option>
                       </select>
                    </td>
                </tr>

                <tr>
                    <td>标题</td>
                    <td><input type="text" v-model="title"></td>
                </tr>


                <tr>
                    <td>截止日期</td>
                    <td><input type="date" v-model="deadLineDate"></td>
                </tr>

                <tr>
                    <td>截止时间</td>
                    <td><input type="time" v-model="deadLineTime"></td>
                </tr>
            </table>
            <p><button>发布</button></p>
        </div>
    </div>
    </div>
</template>

<script>
import MyNav from "@/components/MyNav.vue";
import service from "../../api/services/service";
export default {
    name:'PublicSignIn',
    data(){
          return {
          className: 'FZU班务助手',
          notice:'通知',
          release:'发布',
          class_:'班级',
          my:'我的',
          classes:[],
          title:'',
          deadLineDate:'',
          deadLineTime:'',
        };
    },
    components: {
        MyNav,
    },
    computed:{
        deadLine(){
            return this.deadLineDate+" "+this.deadLineTime;
        }
    },
    methods: {
         getClasses(){
            service.defaults.headers.common["token"] =sessionStorage.getItem('token');
            service.get('api/classes/getMyCreatedClass').then((res)=>{
                if(res.status==false){
                    alert(res.msg);
                }
                else{
                    this.classes=res.data.data;
                    console.log(this.classes);
                }
            }).catch((err) => console.log(err));
        },
         goPublic(){
            console.log(this.body,this.title,this.classID);
            console.log(this.deadLine);
            let param=new FormData();
            param.append("key",0);
            param.append("title",this.title);

            let expiredTime=181;
            if(this.deadLine==' '){  
                expiredTime=182;
            }else{
                expiredTime=Date.parse(this.deadLine)-Date.now();

            }
            param.append("expiredTime",expiredTime);
             
             service.defaults.headers.common["token"] =sessionStorage.getItem('token');
            service.post('api/classes/'+this.classID+'/publishSignIn',param).then((res)=>{
                if(res.data.status==false){
                    alert("发布失败,原因："+res.data.msg);
                }
                else{
                   alert("发布成功");
                }
            }).catch((err) => console.log(err));
        }
    },
    mounted() {
        this.getClasses();
    }
}
</script>

<style scoped>
        .publish_sheet {
    float: left;
    width: 300px;
    height: 550px;
    margin: 0px 0px 0px 0px;
    text-align: center;
    border-right: 1px solid black;
    position: relative;
}

.publish_sheet li {

    margin: 50px 50px 50px 5px;
    margin-right: 100px;
    list-style: none;
}

li{
	list-style-type:none;
}
select{
	width:350px;
	height:25px;
	border:1px solid;
	margin: 10px;
}

textarea{
	margin: 10px;
}

input{
	margin: 10px;
	height:20px;
}

button{
	background-color: #00B0FF; 
	width: 100px;
	height: 30px;
	border: 1px solid;
}

#operation2{
	text-align:left;
	margin-left:200px ;
	padding-left:300px ;
	padding-top:10px;
	width: 500px;
}

table{
	border-collapse:separate; 
	border-spacing:0px 5px;
}

p{
	text-align: center;
}

h2{
	text-align: center;
}
</style>