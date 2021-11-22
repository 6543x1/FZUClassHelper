<template>
  <div class="login">
    <form>
      <img src="../assets/img/图片5.png" />
      <h3>登&ensp;录</h3>
      <div id="username_div">
        <span id="username_span"></span>
        <input type="text" id="username" v-model="username" placeholder="请输入用户名" />
      </div>

      <div id="password_div">
        <span id="password_span"></span
        ><input type="password" id="password" v-model="password" placeholder="请输入密码" />
      </div>

      <div id="button_div">
        <input id="btnlogin" type="button" value="登录" @click="postHandle"/>
      </div>

      <p id="links">
        <a href="重置密码.html" id="links_left">重置密码</a
        ><a href="新用户注册.html" id="links_right">用户注册</a>
      </p>
    </form>
  </div>
</template>

<script>
import service from "../api/services/service"
// import {useRouter} from "vue-router"
// const router=useRouter();
export default {
  name: "Login",
  data() {
    return {
    username:'',
    password:'',
    // token:'',
    }
  },
  methods: {
    C_main() {
      this.$router.push("/");
    },
    postHandle() {
      let param = new FormData();
      param.append('username', this.username);
      param.append('password',this.password);
    //   let token = this.$store.state.token;
    //   console.log(token);
    //   service.defaults.headers.common["token"] = token;
      //service.post('api'+'/classes/'+this.classID+'/join',param)
      service
        .post(
          "api/user/login",
          param
        )
        .then((res) =>{ console.log(res);
        console.log(res.data.data.jwtToken);
        // this.$store.mutations.setToken(this.$store.state,res.data.data.jwtToken);
        sessionStorage.setItem('token',res.data.data.jwtToken);
        sessionStorage.setItem('user',JSON.stringify(res.data.data.user));
        let userInfo=sessionStorage.getItem('user');
        console.log(typeof(userInfo));
        console.log(userInfo);
        // this.token=res.data.data.jwtToken;
        // console.log("@@",this.token);
        this.$store.commit('setToken',res.data.data.jwtToken);
        this.$router.push({path:'/',query:{name:JSON.stringify(res.data.data)}});
       
        // router.push({path:'/',query:{name:res.data.data}});
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
            .login
            {
                position: fixed;
                /* width: 100%;
                height: 100%; */
                left: 50%;
                top: 40%;
                margin-left: -150px;
                margin-top: -150px;
                text-align: center;
                font-size: 20px;
                color: #fff;
                /* background: url("../assets/img/图片6.png") no-repeat;
                background-size: 100% 100%; */
            }
            input{
                padding-left:40px ;
                height: 30px;
                width: 300px;
            }
            img{
                height: 50px;
                width: 50px;
            }
            #username_span{
                background: url("../assets/img/图片3.png") no-repeat;
                position: absolute;
                display: inline-block;
                width: 30px;
                height: 30px;
                background-size: 80% 80%;
                background-position: bottom;
            }
            #password_span{
                background: url("../assets/img/图片4.png") no-repeat;
                position: absolute;
                display: inline-block;
                width: 30px;
                height: 30px;
                background-size: 80% 80%;
                background-position: bottom;
            }
            #username_div{
                margin-bottom:20px;
            }
            #password_div{
                margin-bottom:30px;
            }
            #button_div{
                margin-bottom: 25px;
                color: #fff;
            }
            #btnlogin{
                width: 346px;
                height: 35px;
                text-align: center;
                font-size: 15px;
                background-color: #6162dc;
                color: #fff;
                padding: 0px;
            }
            #links_left{
                float: left;
            }
            #links_right{
                float: right;
            }
            #links{
                font-size: 14px;
            }
            h3{
                margin-top:-4px;
                margin-bottom: 30px;
            }
            /* .login{
                background: url("../assets/img/图片6.png") no-repeat;
                background-size: cover;
            } */
            a{
                color: #fff;
            }
            
</style>