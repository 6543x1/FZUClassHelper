<template>
    <div>
        <div class="nav">
            <ul class="select">
                <li><a href="javascript:;">{{className}}</a></li>
                <li><a href="javascript:;"><img src="../../assets/img/通知(3).png" alt="">{{notice}}</a></li>
                <li><a href="javascript:;"><img src="../../assets/img/发布.png" alt="">{{release}}</a></li>
                <li><a href="javascript:;"><img src="../../assets/img/班级.png" alt="">{{class_}}</a></li>
                <li><a href="javascript:;"><img src="../../assets/img/wo-de-.png" alt="">{{my}}</a></li>
            </ul>
        </div>
    <div class="line"></div>
    <div class="box1">
        <div class="publish_sheet">
            <ul>
                <!-- 超链接要修改一下 -->
                <li><a href="发布公告页面.html">发布公告</a></li>
                <li><a href="发布投票页面.html">发布投票</a></li>
                <li><a href="发布签到页面.html">发布签到</a></li>
                <li><p>课堂问答</p></li>
                <li><a href="发布抽签页面.html">活动抽签</a></li>
            </ul>
        </div>

        <div id="operation2">
            <h2>课堂问答</h2>
            <table>
                <tr>
                    <td>发送给</td>
                    <td><select v-model="classes">
                        <option value="null">请下拉选择至少一个班级</option>
                        <option value="1">1131616</option>
                        <option value="2">2</option>
                        <option value="3">2</option>
                        <option value="4">2</option>
                    </select></td>
                </tr>
            </table>
            <div id="question-send">
                <img id="wo-de-" src="../../assets/img/wo-de-.png">
                <p><button>开始</button></p>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    name: 'PublishClassAnswer',

    data() {
        return {
          className: 'FZU班务助手',
          notice:'通知',
          release:'发布',
          class_:'班级',
          my:'我的',
          classes:[],
        };
    },
    computed:{
        deadLine(){
            if(this.deadLineTime==''){
                return this.deadLineDate+" "+"00:00";
            }
            return this.deadLineDate+" "+this.deadLineTime;
        }
    },

    mounted() {
        
    },

    methods: {
        
    },
};
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