<template>
    <nav>
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">
                <el-icon style="color: #c5d7e3">
                    <HomeFilled />
                </el-icon>
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">
                <span style="font-weight: normal">首页</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="navi in navis" :to="navi.url">
                <span style="font-weight: normal">{{ navi.name }}</span>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </nav>
</template>

<script setup lang="ts">
import { ArrowRight, HomeFilled } from "@element-plus/icons-vue";

const props = defineProps({
    navis: Object
})

const navis = props.navis;
</script>

<style scoped>
nav {
    padding: 10px 0;
}
</style>