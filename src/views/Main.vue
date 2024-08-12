<template>
    <div>
        <div class="nav-pad">
            <el-menu mode="horizontal" :default-active="activeIndex">
                <el-menu-item index="First" @click="toPage('/')">首页</el-menu-item>
                <el-menu-item index="FileType" @click="toPage('/file-type')">文件下载</el-menu-item>
                <el-menu-item index="3" @click="toPage('/')" disabled>图书仓库</el-menu-item>
                <el-menu-item index="Section" @click="toPage('/section')">社区论坛</el-menu-item>
            </el-menu>
            <TopLoginPad class="top-login-pad" />
        </div>
        <div class="page-pad">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TopLoginPad from '../components/TopLoginPad.vue';

import { getCurrentComponentName } from '../utility/RouterHelper'

const activeIndex = ref("First")
activeIndex.value = getCurrentComponentName() as string;

const router = useRouter();
const toPage = (path: string) => {
    router.push(path);
}


onMounted(async () => {

})
</script>

<style lang="scss" scoped>
.nav-pad {
    width: 80%;
    margin: auto;
    position: relative;

    .el-menu {}

    .top-login-pad {
        position: absolute;
        bottom: 10px;
        right: 10px;
    }
}

.page-pad {
    width: 80%;
    margin: auto;
}
</style>