<template>
  <div class="statics">
      <MyNav/>
      <div class="box4">
            <div class="box5">
                <button href="" onclick="window.history.back(-1)"
                    style="outline: none; cursor: pointer; border: none; background: none; font-size: 30px; position: relative;left: 5px; float: left;"><span
                        style="color: red;font-size: 30px;">&lt;</span></button>
               <span class="title" style="font-size: 30px;">统计结果</span>
            </div>
            <div class="box6">
                <div class="box7">
                    <div class="loading">
                        <div class="left"></div>
                        <div class="right"></div>
                        <div class="progress">85%已参与</div>
                    </div>
                    <div
                        style="height: 10px;width: 10px; position: relative;left: 510px; top: 66px;background:rgb(122, 159, 244);border-radius: 100%;">
                    </div>
                    <span style="height: 10px;width: 10px; position: relative;top: 50px;">已参与</span>
                    <span style="height: 10px;width: 10px; position: relative;top: 50px;">324人</span><br>
                    <div
                        style=" height: 10px;width: 10px; position: relative;left: 510px; top: 96px;background:rgb(66, 221, 146);border-radius: 100%;">
                    </div>
                    <span style="height: 10px;width: 10px; position: relative;top: 80px;">未参与</span>
                    <span style="height: 10px;width: 10px; position: relative;top: 80px;">29人</span><br>
                </div>
                <div class="box8">
                    <center><span style="font-size: 25px;">待通知人员</span></center>
                </div>
                <div class="box9">
                    <button style="position: relative;left: 300px;top: 220px;">
                        上一页
                    </button>
                    <span style="position: relative;left: 350px;top: 220px;">3/5</span>
                    <button style=" position: relative;left: 400px;top: 220px;">
                        下一页
                    </button>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import MyNav from "@/components/MyNav.vue";
export default {
    
    name:'Static',
    components: {
        MyNav,
    }
}
</script>
<style src="../assets/css/style.css" scoped>
</style>

<style scoped>
    .loading {
    width: 8em;
    height: 8em;
    position: relative;
    margin-left: 250px;
    margin-top: 30px;
    margin-right: 150px;
    float: left;
}

.loading .progress {
    position: absolute;
    width: 6em;
    height: 6em;
    background-color: white;
    border-radius: 50%;
    left: 1em;
    top: 1em;
    line-height: 6em;
    text-align: center;
}

.left,
.right {
    width: 4em;
    height: 8em;
    overflow: hidden;
    position: relative;
    float: left;
    background-color: rgb(66, 221, 146);
}

.left {
    border-radius: 8em 0 0 8em;
}

.right {
    border-radius: 0 8em 8em 0;
}

.left:after,
.right:after {
    content: "";
    position: absolute;
    display: block;
    width: 4em;
    height: 8em;
    background-color: white;
    border-radius: 8em 0 0 8em;
    background-color: rgb(122, 159, 244);
}

.right:after {
    content: "";
    position: absolute;
    display: block;
    border-radius: 0 8em 8em 0;
}

.left:after {
    transform-origin: right center;
    transform: rotateZ(0deg);
    /* deg控制占比 总为360 注意超过一半时候需要改变背景颜色  */
}

.right:after {
    transform-origin: left center;
    transform: rotateZ(45deg);
}
</style>