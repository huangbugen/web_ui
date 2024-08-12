<template>
    <div>
        <div class="notification">
            <div :class="['text-pad', { 'show-all': isShowAll }]" ref="textPad">
            </div>

            <div class="cover" v-show="!isShowAll"></div>
            <div class="open-all" @click="showAll">
                <span v-show="!isShowAll">
                    展开阅读全部
                    <el-icon>
                        <ArrowDown />
                    </el-icon>
                </span>
                <span v-show="isShowAll">
                    收起
                    <el-icon>
                        <ArrowUp />
                    </el-icon>
                </span>

            </div>
        </div>
        <div class="file-tab">
            <el-tabs type="border-card" @tab-change="onFileTypeChange" v-model="currentType">
                <el-tab-pane :label="fileType.typeName" :name="fileType.id" v-for="fileType in fileTypes"
                    :key="fileType.id">
                    <ul>
                        <li v-for="file in files" :key="file?.id" @click="onFileClick(file.id)">
                            <div>
                                <img :src="file?.fileIconUrl" alt="">
                                <p>{{ file?.fileName }}</p>
                            </div>
                            <p>点击下载</p>
                        </li>
                    </ul>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue"
import { ArrowDown, ArrowUp } from "@element-plus/icons-vue"

import { useRouter } from "vue-router"
import { getFiles } from "@/httpRequests/FileTypeRequest";
import { fileTypes } from "./classes/FileType";

//#region 页面操控
const isShowAll = ref(false)
const showAll = () => {
    isShowAll.value = !isShowAll.value;
}

const currentType = ref();
const files = ref();
const onFileTypeChange = async (val: any) => {
    files.value = (await getFiles({
        fileTypeId: val
    })).data;
}
const router = useRouter();
const onFileClick = (fid: any) => {
    router.push(`/file-detail/${fid}`)
}
</script>

<style lang="scss" scoped>
.notification {
    position: relative;

    .text-pad {

        height: 96px;
        overflow: hidden;
    }


    .show-all {
        height: auto;
    }

    .cover {
        position: absolute;
        background: linear-gradient(transparent, #fff);
        bottom: 30px;
        left: 0;
        width: 100%;
        height: 96px;
    }

    .open-all {
        height: 30px;
        text-align: center;
        cursor: pointer;
    }
}

.file-tab {
    * {
        box-sizing: border-box;
    }

    ul {
        li {
            float: left;
            list-style: none;
            cursor: pointer;
            margin-right: 20px;
            transition: 1s;

            div {
                padding: 10px;
                border: #f5f5f5 1px solid;
                width: 226px;
                height: 131px;
                text-align: center;
                transition: 1s;

                img {
                    width: 56px;
                    height: 56px;
                }

                p {
                    height: 30px;
                    font-size: 15px;
                    text-align: center;
                }
            }

            >p {
                transition: 1s;
                border: #f5f5f5 1px solid;
                border-top: 0 none;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: red;
                font-size: 12px;
                margin: 0;
            }

            &:hover {
                box-shadow: 0 0 3px brown;

                div {
                    border-color: brown;
                }

                >p {
                    background-color: brown;
                    border-color: brown;
                    color: #fff
                }
            }

        }
    }
}
</style>
