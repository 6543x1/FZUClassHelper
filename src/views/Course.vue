<template>
    <div>
        <div class="nav">
            <ul class="select">
                <li><a href="javascript:;">{{className}}</a></li>
                <li><a href="javascript:;"><img src="../assets/img/通知(3).png" alt="">{{notice}}</a></li>
                <li><a href="javascript:;"><img src="../assets/img/发布.png" alt="">{{release}}</a></li>
                <li><a href="" @click="C_main"><img src="../assets/img/班级.png" alt="">{{class_}}</a></li>
                <li><a href="javascript:;"><img src="../assets/img/头像.png" alt="">{{my}}</a></li>
            </ul>
        </div>
        <div class="line"></div>
        <div class="process">
            <a href="" @click="C_main" class="arrow"><img src="../assets/img/向左箭头.png" style="float:left"></a>
            <h2>周四一二节</h2>
            <a href="#" style="color: #00B2FF;">管理班级</a>
            <div class="line"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Course',

    data() {
        return {
          className: 'FZU班务助手',
          notice:'通知',
          release:'发布',
          class_:'班级',
          my:'我的'
        };
    },

    mounted() {
        
    },

    methods: {
        C_main() {
            this.$router.push('/')
        },
    },
};
</script>

<style lang="scss" scoped>
    @import url("../assets/css/reset.css");
    @import url("../assets/css/nav.css");
    @import url("../assets/css/create.css");
    .process{
        position: relative;
    }
    .process h2{
        display: inline-block;
        margin-top: 20px;
        margin-bottom: 20px;
        font-size: 30px;
    }
    .process a{
        display: inline-block;
        position: absolute;
        top: 30px;
        right: 20px;
    }
    .process .arrow{
        display: block;
        top: -5px;
        left: 0;
    }
</style>