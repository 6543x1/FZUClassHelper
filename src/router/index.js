import { createRouter,createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Class from "../views/Class.vue";
import Create from "../views/Create.vue";
import Join from "../views/Join.vue";
import Course from "../views/Course.vue";
import Notice from "../views/Notice.vue";
import Management from "../views/Management.vue";
import List from "../views/List.vue";
import Active from "../views/Active.vue";
import Login from "../views/Login.vue";
import MyNotification from "../views/MyNotification.vue";
import NoticeDetail from "../views/NoticeDetail.vue";
import VoteDetail from "../views/VoteDetail.vue";
import RandomDetail from "../views/RandomDetail.vue";
import SignDetail from "../views/SignDetail.vue";
import Statics from "../views/Statics.vue";
import PublicNotice from "../views/public/PublicNotice.vue";
import PublicHome from "../views/public/PublicHome.vue";
import PublicRandom from "../views/public/PublicRandom.vue";
import PublicVote from "../views/public/PublicVote.vue";
import PublicSignIn from "../views/public/PublicSignIn.vue";
import PublicClassAnswer from "../views/public/PublicClassAnswer.vue";

const routes = [
  {
    path: "/Home",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/",
    name: "Class",
    component: Class,
    meta: {
      title: "我的班级",
    },
  },
  {
    path: "/Create",
    name: "Create",
    component: Create,
  },
  {
    path: "/Join",
    name: "Join",
    component: Join,
  },
  {
    path: "/Course",
    name: "Course",
    component: Course,
  },
  {
    path: "/Notice/:classID/:deadLine/:publisher/:title",
    name: "Notice",
    component: Notice,
  },
  {
    path: "/Management/:classID",
    name: "Management",
    component: Management,
  },
  {
    path: "/List/:classID",
    name: "List",
    component: List,
  },
  {
    path: "/Active/:classID",
    name: "Active",
    component: Active,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
    meta: {
      title: "用户登录",
    },
  },
  {
    //Notification是Vue自有的，不要命名冲突了
    //记得在上面import引入！！！！
    path: "/MyNotification",
    name: "MyNotification",
    component: MyNotification,
    meta: {
      title: "主页———通知",
    },
  },
  {
    path: "/NoticeDetail/:notice",//必须在路由声明params参数
    name: "NoticeDetail",
    component: NoticeDetail,
    meta: {
      title: "公告详情",
    },
  },
  {
    path: "/VoteDetail/:vote",//必须在路由声明params参数
    name: "VoteDetail",
    component: VoteDetail,
    meta: {
      title: "投票详情",
    },
  },
  {
    path: "/RandomDetail/:randomStu",//必须在路由声明params参数
    name: "RandomDetail",
    component: RandomDetail,
    meta: {
      title: "选人详情",
    },
  },
  {
    path: "/SignDetail/:signDetail",//必须在路由声明params参数
    name: "SignDetail",
    component: SignDetail,
    meta: {
      title: "签到详情",
    },
  },
  {
    path: "/Statics/:statics",//必须在路由声明params参数
    name: "Statics",
    component: Statics,
    meta: {
      title: "统计详情",
    },
  },
  {
    path: "/PublicHome",//必须在路由声明params参数
    name: "PublicHome",
    component: PublicHome,
    meta: {
      title: "发布...",
    },
  },

  {
    path: "/PublicNotice",//必须在路由声明params参数
    name: "PublicNotice",
    component: PublicNotice,
    meta: {
      title: "发布公告",
    },
  },

  {
    path: "/PublicRandom",
    name: "PublicRandom",
    component: PublicRandom,
    meta: {
      title: "随机选人",
    },
  },
  {
    path: "/PublicVote",
    name: "PublicVote",
    component: PublicVote,
    meta: {
      title: "发布投票",
    },
  },
  {
    path: "/PublicSignIn",
    name: "PublicSignIn",
    component: PublicSignIn,
    meta: {
      title: "发布签到",
    },
  },
 {
      path: "/PublicClassAnswer",
      name: "PublicClassAnswer",
      component: PublicClassAnswer,
      meta: {
        title: "班级问答",
      },
    },


];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  //  mode:"hash",
  // base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  var token = sessionStorage.getItem("token");
  //如果没登录,都导向登录页
  if (!token) {
    if (to.path !== "/Login") {
      next({ path: "/Login" });
    } else {
      next();
    }
  } else {
    next();
  }
});
/**
 * 跳转登陆页面强制刷新，相当于F5
 */
router.afterEach((to, from) => {
  if (from.path != "/Login" && from.path != "/" && to.path == "/Login") {
    window.location.reload();
  }
});
export default router;
