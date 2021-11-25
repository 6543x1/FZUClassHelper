<template>
    <div class="noticeDetail">
        <MyNav/>
        <div id="publish-page">
       
        <div class="box4">
            <div class="box5">
                <button href="" onclick="window.history.back(-1)"
                    style="outline: none; cursor: pointer; border: none; background: none; font-size: 30px; position: relative;left: 5px; float: left;"><span
                        style="color: red;font-size: 30px;">&lt;</span></button>
                <center><span class="title">测试111111</span></center>
                <a href="count.html" style="position: relative;position: relative; float: right;right: 5px;"><img
                        src="../assets/img/投票(1).png" style="height: 15px;"> 统计结果</a>
                <span style="float: left;clear: both;margin-left: 100px;color: slategrey;">张明</span>
                <span style="float: left;margin-left: 50px;color: slategrey;">2021-12-12&nbsp;08:11:00</span>
                <span style="float: left;margin-left: 50px;color:red">截止时间：</span>
                <span style="float: left;color: red;">2021-12-12&nbsp;24:00:00</span>
            </div>
            <div class="box6">
                <!--内嵌页面显示通知的内容，用text.html-->
                <iframe src="text.html" frameborder="1" height="400px" width="700px" id="textshow"></iframe>
                <center><button id="inf"
                        style="cursor: pointer; border: none; display:inline-block; width: 80px;height: 30px; font-size: 20px; background: rgb(1,176,255); color: floralwhite;"
                        onclick="document.getElementById('inf').style.background='slategrey';document.getElementById('inf').innerHTML='已确认'">未确认</button>
                </center>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
import MyNav from "@/components/MyNav.vue"
export default {
    name:'NoticeDetail',
    components:{
        MyNav,
    },
    methods:{

    }
}
</script>

<style>

</style>
<style src="../assets/css/style.css" scoped>
</style>