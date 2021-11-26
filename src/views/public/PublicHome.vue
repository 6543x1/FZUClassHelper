<template>
  <div class="publicHome">
      <MyNav/>
       <div class="box1">
            <div class="line1">
                <div class="line1_position">
                    <ul>
                         <router-link to="/PublicSignIn"><li><img src="../../assets/img/签到调整颜色.png" alt=""><p>签到</p></li></router-link>
                        <router-link to="/PublicNotice"><li><img src="../../assets/img/公告(2).png" alt=""><p>公告</p></li></router-link>
                        <router-link to="/PublicClassAnswer"><li><img src="../../assets/img/课堂.png" alt=""><p>课堂问答</p></li></router-link>
                    </ul>

                </div>
            </div>
            <div class="line2">
                <div class="line2_position">
                    <ul>
                        <router-link to="/PublicVote"><li><img src="../../assets/img/投票(1).png" alt=""><p>投票</p></li></router-link>
                        <router-link to="/PublicRandom"><li><img src="../../assets/img/抽签(2).png" alt=""><p>抽签</p></li></router-link>
                    </ul>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import MyNav from "@/components/MyNav.vue";
export default {
    name:'PublicHome',
    components:{
        MyNav,
    },
    data(){
        return{

        }
    }


}
</script>

<style scoped>
.box1{
    position: relative;
    float:center;
}
.line1_position {
    height: 200px;
    width: 900px;
    position: relative;
    left: 400px;

}

.line1_position li {
    float: left;
    margin: 50px 50px 50px 50px;
    margin-right: 100px;
    list-style: none;

}

.line1_position li img {
    height: 100px;
    width: 100px;
    border: azure;
    border-style: solid;
    border-radius: 15px;

}

.line2_position {
    height: 200px;
    width: 900px;
    position: relative;
    left: 550px;

}

.line2_position li {
    float: left;
    margin: 50px 50px 50px 50px;
    margin-right: 100px;
    list-style: none;
}

.line2_position li img {
    height: 100px;
    width: 100px;
    border: azure;
    border-style: solid;
    border-radius: 15px;
}

p{
    text-align: center;
}
</style>