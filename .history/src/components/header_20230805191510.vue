<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <!--logo部分-->
        <el-menu-item index="0" @click="tomain"> <img :src="logo" style="width: 100px; height: 72px" /></el-menu-item>
        <el-col :span="16">
            <!--搜索栏部分-->
            <div class="search">
                <el-row>
                    <el-col :span="16" :offset="2">
                        <el-input v-model="input" @keypress="handleKeypress" placeholder="请输入" />
                    </el-col>
                    <el-col :span="4" :offset="0">
                        <el-button type="primary" class="search-btn" @click="search">搜索</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-col>
        <!--右部菜单部分-->
        <div class="flex-grow" />
        <el-menu-item index="1" @click="toevaluatepage">维修与回收</el-menu-item>
        <el-menu-item index="2" @click="tomainhome">
            <template #title>个人主页</template>
        </el-menu-item>
    </el-menu>
</template>

<script >
import { ref } from 'vue'
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "header",
    data() {
        return {
            activeIndex: ref(''),
            logo: require("../assets/project.png"),
            input: '',
            filteredItems: [],
        }
    },

    methods: {
        handleKeypress(e) {
            if (e.keyCode === 32) {
                this.input += '‌';   //使用指定的字符替换空格
                e.preventDefault();
            }
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath)
        },
        tomain() {
            this.$router.push('/mainpage')
        },
        toevaluatepage() {
            this.$router.push('/evaluatepage')
        },
        tomainhome() {
            this.$router.push('/MainHome')
        },
        search() {
            this.$router.push({ path: '/search', query: { input: this.input } });
        }
    }
}
</script>

<style scoped>
.search {
    margin-top: 20px;
}

.flex-grow {
    flex-grow: 1;
}
</style>