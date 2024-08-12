<!-- <template>
    <div>
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
                <el-breadcrumb-item>社区论坛</el-breadcrumb-item>
            </el-breadcrumb>
        </nav>
        <div class="area-pad">
            <div class="area-item" v-for="area in areaInfo">
                <p class="title">
                    {{ area.name }}
                    <span>分区版主：
                        <i style="margin-right: 10px;" v-for="areaLord in area.areaPadLords">
                            {{ areaLord.userName }}
                        </i>
                    </span>
                </p>
                <div class="section-pad">
                    <table>
                        <tr>
                            <td v-for="section in area.sections">
                                <div>
                                    <div class="section-item-img">
                                        <img :src="section.sectionIcon" alt="" />
                                    </div>
                                    <div class="section-item-info">
                                        <p class="s-name">{{ section.sectionTitle }}</p>
                                        <p class="s-description">{{ section.sectionDescription }}</p>
                                        <p>版主：<router-link to="/aaa" v-for="sectionLord in section.sectionLords">{{
                                            sectionLord.userName }}</router-link></p>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getAreaInfo } from "@/httpRequests/SectionRequest";
import { ArrowRight, HomeFilled } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";

const areaInfo = ref();

onMounted(async () => {
    areaInfo.value = await getAreaInfo();
})

</script>

<style scoped>
nav {
    padding: 10px 0;
}

.area-pad {
    border: 1px solid #ccc;

    .area-item {
        .title {
            background-color: #eee;
            font-weight: 800;
            font-size: 13px;
            height: 36px;
            line-height: 36px;
            padding-left: 10px;

            span {
                float: right;
                margin-right: 20px;
                font-weight: 100;
            }
        }

        .section-pad {
            padding: 0 10px;

            table {
                width: 100%;

                tr {
                    display: flex;

                    td {
                        flex: 1;
                        padding: 10px 0 10px 10px;

                        .section-item-img {
                            float: left;
                            margin-right: 10px;
                            height: 100%;

                            img {
                                width: 100px;
                                height: 58px;
                            }
                        }

                        .section-item-info {
                            p {
                                font-size: 13px;
                            }

                            .s-name {
                                font-weight: 800;
                                font-size: 13px;
                            }

                            .s-description {
                                padding: 3px 0;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style> -->

<template>
    <div>
        <BBSNavi :navis="navis"></BBSNavi>
        <AreaSectionPad :areaInfo="areaInfo"></AreaSectionPad>
    </div>
</template>

<script setup lang="ts">
import AreaSectionPad from '@/components/bbs_components/AreaSectionPad.vue';
import BBSNavi from '@/components/bbs_components/BBSNavi.vue';
import { getAreaInfo } from '@/httpRequests/SectionRequest';
import { onMounted, ref } from 'vue';

const areaInfo = ref();
const navis = ref([
    { name: "社区论坛", url: "" }
])

onMounted(async () => {
    var res = await getAreaInfo();
    areaInfo.value = res;
});
</script>

<style scoped></style>