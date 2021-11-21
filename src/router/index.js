import { createRouter, createWebHistory } from "vue-router";
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
    meta:{
      title: "我的班级",
    }
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
    path:"/Login",
    name:"Login",
    component: Login,
    meta:{
      title: '用户登录',
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
    }
  var token = sessionStorage.getItem("token");
  //如果没登录,都导向登录页
  if (!token) {
    if (to.path !== '/Login') {
      next({ path: '/Login' })
    }
    else {
      next();
    }
  }
  else {
    next();
  }
})
/**
 * 跳转登陆页面强制刷新，相当于F5
 */
router.afterEach((to,from)=>{
  if(from.path != '/Login' && from.path != '/' && to.path == '/Login'){
      window.location.reload();
  }
})
export default router;
