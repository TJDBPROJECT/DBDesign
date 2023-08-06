<!-- eslint-disable vue/no-deprecated-slot-attribute -->
<template>
    <div class="common-layout">
        <el-container>
            <!--搜索栏部分-->
            <el-header height="100px">
                <seach />
            </el-header>
            <el-container>
                <!--边栏部分-->
                <el-aside width="200px">
                    <el-menu default-active="2" class="el-menu-vertical-demo">
                        <el-menu-item index="1">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>小米</span>
                        </el-menu-item> <el-menu-item index="2">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>华为</span>
                        </el-menu-item> <el-menu-item index="3">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>联想</span>
                        </el-menu-item> <el-menu-item index="4">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>OPPO</span>
                        </el-menu-item>
                        <el-menu-item index="5">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>苹果</span>
                        </el-menu-item>
                        <el-menu-item index="6">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>索尼</span>
                        </el-menu-item>
                        <el-menu-item index="7">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>戴尔</span>
                        </el-menu-item>
                        <el-menu-item index="8">
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>任天堂</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <!--主体部分-->
                <!--具体部分-->
                <el-main>
                    <el-row class="recommend-products">
                        <el-col :span="8" v-for="(product, index) in paginatedProducts" :key="index">
                            <el-col :span="23">
                                <el-card shadow="hover" @click="goToDetailsPage(product.Type_Name)">
                                    <div class="product-card">
                                        <img :src="product.Structure_Url" alt="product image">
                                        <div class="product-info">
                                            <div class="product-name">{{ product.Type_Name }}</div>
                                        </div>
                                    </div>
                                </el-card>
                            </el-col>
                        </el-col>
                    </el-row>
                    <el-col :span="5" :offset="9">
                        <!-- 使用分页组件 -->
                        <el-pagination background layout="prev, pager, next" :total="totalPages * 10" v-model="currentPage"
                            @current-change="handlePageChange" />
                    </el-col>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { ref } from 'vue';
import header from '../components/header.vue';
import { pictureget } from '@/api/picture';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "evaluatepage",

    data() {
        return {
            images: [],
            activeIndex: ref('1'),
            products: [],
            currentPage: 1,
            totalPages: 0, // 添加一个 totalPages 属性
        };
    },
    components: {
        "seach": header,
    },
    methods: {
        handlePageChange(currentPage) {
            this.currentPage = currentPage;
        },
        goToDetailsPage(productId) {
            this.$router.push({ name: 'DetailsPage', params: { productId: productId } });
        },
        calculateTotalPages() {
            const itemsPerPage = 6;
            this.totalPages = Math.ceil(this.products.length / itemsPerPage);
        },
    },
    mounted() {
        pictureget().then((res) => {
            if (res.data === false) {
                this.$message.error("获得失败");
            } else {
                this.$message.success("获得成功");
                console.log("获得成功");
                console.log(res.data);
                this.products = res.data.DeviceType;
                this.images = res.data.DeviceType;
                console.log("products");
                console.log(this.products);
                this.calculateTotalPages(); // 在数据加载完成后计算总页数
            }
        });
    },

}
</script>


<style scoped>
.time {
    font-size: 12px;
    color: #999;
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 100%;
    display: block;
}

.el-row {
    margin-bottom: 20px;
}

.type {
    flex-grow: 1;
}
</style>

