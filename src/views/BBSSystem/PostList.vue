<template>
    <div>
        <BBSNavi :navis="navis"></BBSNavi>
        <div class="bbs-pad">
            <div class="playbill" v-if="section != null">
                <div class="section-info">
                    <p>
                    <h1>{{ section.sectionTitle }}</h1>
                    <span>今日：{{ section.postTodayCount }}</span>
                    <span>主题：{{ section.postAllCount }}</span>
                    </p>
                    <p>
                        <span v-for="lord in section.sectionLords" style="margin-right: 10px;">
                            {{ lord }}
                        </span>
                    </p>
                    <p>{{ section.sectionDescription }}</p>
                </div>
                <div class="playbill-image">
                    <img :src="section.sectionPlaybill" alt="">
                </div>
            </div>
            <div class="post-pad"></div>
            <div class="send-pad">
                <p class="send-pad-title">快速发帖</p>
                <el-select v-model="typeSelected" class="m-2" placeholder="请选择">
                    <el-option v-for="item in postType" :key="item.id" :label="item.postTypeName" :value="item.id" />
                </el-select>
                <el-input v-model="txtPostTitle" placeholder="Please input">
                    <template #prepend>主题</template>
                </el-input>
                <div id="editor" style="border: 1px solid #ccc;">
                    <Toolbar :editor="editorRef" style="border-bottom:1px solid #eee;" />
                    <Editor style="height: 300px;" v-model="valueHtml" @onCreated="onCreated" />
                </div>
                <el-button type="primary" @click="onSend">发帖</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, shallowRef } from "vue";
import BBSNavi from "../../components/bbs_components/BBSNavi.vue";
import { useRoute } from "vue-router";
import { AddPost, getPostType, getSectionInfo } from "@/httpRequests/PostListRequest";
// import wangEditor from "wangeditor";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import "@wangeditor/editor/dist/css/style.css"

const editorRef = shallowRef();
const valueHtml = ref("");
const navis = ref([
    { name: "社区论坛", url: "/section" },
    { name: "当前版块名称", url: "" }
])

const section = ref();
const postType = ref();
const txtPostTitle = ref("");
const typeSelected = ref("");
const onCreated = (editor: any) => {
    editorRef.value = editor
}

const onSend = async () => {
    // var html = editor.txt.html();
    // 这里需要做一个非空判断
    let postTitle = txtPostTitle.value;
    let postTypeId = typeSelected.value;
    let replyContent = valueHtml.value;
    let areaId = section.value.areaId;
    let areaName = section.value.areaName;
    let sectionId = section.value.id;
    let sectionName = section.value.sectionTitle;
    var res = await AddPost({
        postTitle,
        areaId,
        areaName,
        sectionId,
        sectionName,
        postTypeId,
        replyCreate: {
            replyContent,
            sectionId,
        }
    })

}

onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
})

const route = useRoute();
// let editor: wangEditor;
onMounted(async () => {
    let sectionId: string = route.query["sid"] as string
    section.value = await getSectionInfo(sectionId);
    postType.value = await getPostType(sectionId);
})
</script>

<style scoped>
.bbs-pad {
    width: 100%;
}

.playbill {
    border: 1px solid #ccc;
    padding: 5px 10px;

    .playbill-image {
        img {
            width: 100%;
            height: 398px;
        }
    }
}

.send-pad {
    border: 1px solid #ccc;
    padding: 20px;

    .send-pad-title {
        background-color: #eee;
        height: 36px;
        line-height: 36px;
    }

    .el-select {
        z-index: 2;
        width: 10%;
    }

    .el-input {
        width: 30%;
        margin-left: 30px;
    }

    #editor {
        position: relative;
        z-index: 1;
    }
}
</style>