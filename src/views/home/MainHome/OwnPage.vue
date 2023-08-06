<template>
    <div class="PageTop">
        <el-row :gutter="50">
            <el-col :span="40">
                <el-avatar class="centered-avatar" :src="avatarUrl" />
            </el-col>
            <el-col :span="30">
                <el-row>
                    <span style="text-shadow: 0px 0px 15px #0752ff, 0px 0px 15px #0752ff;font-size: 40px;">
                        {{ username }}
                    </span>
                </el-row>
                <el-row class="my-row">
                    <span style="font-size: 20px;">个性签名</span>
                </el-row>
                <el-row class="my-row" v-if="isshowSignature">
                    <span style="font-size: 15px;">{{ signature }}</span>
                </el-row>
                <el-row class="my-row" v-else>
                    <el-row>
                        <el-input v-model="signature" placeholder="请输入个性签名"></el-input>
                    </el-row>
                    <el-row>
                        <el-button type="primary" @click="saveSignature">保存</el-button>
                        <el-button type="default" @click="cancelSignature">取消</el-button>
                    </el-row>

                </el-row>
            </el-col>
            <el-col :span="10" class="button-col">
                <el-button class="edit-avatar-button" type="primary" @click="showAvatarDialog">更换头像</el-button>
                <el-button class="edit-signature-button" type="primary"
                    @click="showSignatureDialog = true">编辑个性签名</el-button>
            </el-col>
        </el-row>
    </div>

    <div class="MyPage">
        <el-collapse v-model="activeNames" @change="handleChange">
            <p></p>
            <el-collapse-item title="消费信息" name="1">
                <template #title>
                    <span style="font-size:20px">消费信息</span>
                </template>
                <el-row>
                    <el-col :span="6">
                        <el-statistic title="累计订单数量" :value="55" />
                    </el-col>
                    <el-col :span="6">
                        <el-statistic :value="53">
                            <template #title>
                                <div class="title-wrapper">
                                    <span class="title-text">已完成数量</span>
                                </div>
                            </template>
                            <template #suffix>/55</template>
                        </el-statistic>
                    </el-col>
                    <el-col :span="6">
                        <el-statistic title="累计消费" :value="1720" />
                    </el-col>
                    <el-col :span="6">
                        <el-statistic title="钱包余额" :value="562">
                            <template #suffix>
                            </template>
                        </el-statistic>
                    </el-col>
                </el-row>
            </el-collapse-item>
            <p></p>
            <el-collapse-item title="个人信息" name="2">
                <template #title>
                    <span style="font-size:20px">个人信息</span>
                </template>
                <el-descriptions class="margin-top" title="个人信息表" :column="3" :size="large" border>
                    <template #extra>
                        <el-button type="primary" v-if="!editMode" @click="editMode = true">编辑</el-button>
                        <el-button type="success" v-if="editMode" @click="saveChanges">保存</el-button>
                        <el-button type="danger" v-if="editMode" @click="cancelEditMode">取消</el-button>
                    </template>
                    <!-- 用户ID不可修改 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <user />
                                </el-icon>
                                ID
                            </div>
                        </template>
                        <!-- USERINFO - ID -->
                        <p>{{ userInfo.id }}</p>
                    </el-descriptions-item>
                    <!-- 用户昵称 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <user />
                                </el-icon>
                                用户昵称
                            </div>
                        </template>
                        <span v-if="editMode">
                            <el-input v-model="userInfo.username" />
                        </span>
                        <span v-else>{{ userInfo.username }}</span>
                    </el-descriptions-item>
                    <!-- 电话号码 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <iphone />
                                </el-icon>
                                电话
                            </div>
                        </template>
                        <span v-if="editMode">
                            <el-input v-model="userInfo.telephone" />
                        </span>
                        <span v-else>{{ userInfo.telephone }}</span>
                    </el-descriptions-item>
                    <!-- 姓名不可修改 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <location />
                                </el-icon>
                                姓名
                            </div>
                        </template>
                        <!-- USERINFO - Name     -->
                        <p>{{ userInfo.name }}</p>
                    </el-descriptions-item>
                    <!-- 登记不可修改 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <tickets />
                                </el-icon>
                                等级
                            </div>
                        </template>
                        <!-- USERINFO - UserLevel   -->
                        <el-tag size="small">
                            <p>{{ userInfo.userlevel }}</p>
                        </el-tag>
                    </el-descriptions-item>
                    <!-- 身份证号不可修改 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <office-building />
                                </el-icon>
                                身份证号
                            </div>
                        </template>
                        <!-- USERINFO - Indentity   -->
                        <p>{{ userInfo.identity }}</p>
                    </el-descriptions-item>
                    <!-- 电子邮箱可以修改 -->
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon :style="iconStyle">
                                    <office-building />
                                </el-icon>
                                Email
                            </div>
                        </template>
                        <span v-if="editMode">
                            <el-input v-model="userInfo.email" />
                        </span>
                        <span v-else>{{ userInfo.email }}</span>
                    </el-descriptions-item>

                </el-descriptions>
            </el-collapse-item>
            <p></p>
        </el-collapse>
    </div>
</template>
      
<script>
import {
    Iphone,
    Location,
    OfficeBuilding,
    Tickets,
    User
} from '@element-plus/icons-vue'

import { computed, ref } from 'vue'
import { getUserProfile } from '@/api/mainhome.js'

const size = ref('')
const iconStyle = computed(() => {
    const marginMap = {
        large: '8px',
        default: '6px',
        small: '4px',
    }
    return {
        marginRight: marginMap[size.value] || marginMap.default,
        iconStyle
    }
})

export default {
    created() {
        console.log("尝试拿到个人信息")
        const UserID = '99999'; // 假设用户ID是 '99999'
        getUserProfile(UserID)
            .then((res) => {
                // 处理返回的用户个人资料数据
                console.log("拿数据成功");
                console.log('Response Data:', res.data); // 打印获取到的数据
                this.userInfo = res.data; // 将获取到的数据存储到userInfo中
            })
            .catch((error) => {
                // 处理错误
                console.log("拿数据失败");
                console.error('Error:', error); // 打印错误信息
            });
    },
    data() {
        return {
            isshowSignature: true,
            editMode: false,
            editSignature: false,
            avatarUrl: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
            signature: "暂未设置个性签名！",
            userInfo: {// 用户信息...
                id: "",
                username: "",
                userlevel: "",
                name: "",
                telephone: "",
                email: "",
                identity: "",
            },
            editedUserInfo: {

            }, // 用于保存编辑后的数据
        };
    },
    methods: {
        saveChanges() {
            // 将编辑后的数据保存到 editedUserInfo 对象中
            this.editedUserInfo = { ...this.userInfo };

            // 在这里可以将 editedUserInfo 保存在客户端本地，例如使用 localStorage
            localStorage.setItem('editedUserInfo', JSON.stringify(this.editedUserInfo));

            // 保存成功后，退出编辑模式
            this.editMode = false;
        },
        cancelEditMode() {
            // 取消编辑模式
            this.editMode = false;
        },
        showAvatarDialog() {
            // 在这里显示一个对话框或者表单，让用户输入新的头像信息
            // 处理用户输入后，更新 avatarUrl
        },
        showSignatureDialog() {
            // 在这里显示一个对话框或者表单，让用户输入新的个性签名信息
            // 处理用户输入后，更新 signature
            this.isshowSignature = !this.isshowSignature;
        },

    },
    computed: {
        iconStyle() {
            return "font-size: 14px; margin-right: 5px;";
        },
    },
    components: {
        Iphone,
        Location,
        OfficeBuilding,
        Tickets,
        User,
    },
    setup() {
        const activeNames = ref(["1", "2", "3", "4"])
        return {
            activeNames
        }
    }
}
</script>
      
<style>
.PageTop {
    border: 1px solid #ccc;
    width: 1400px;
    /* 设置边框的宽度为 300 像素 */
    margin-top: 0%;
    font-size: 30px;
    color: black;
    position: absolute;
    top: 150px;
    left: 205px;
    padding: 40px;
}

.button-col {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.my-row {
    margin-top: 20px;
}

.centered-avatar {
    /* 如果需要调整头像的大小，可以在这里设置宽度和高度属性 */
    width: 120px;
    height: 120px;
}

.flex-grow {
    flex-grow: 1;
}

.demo-type {
    display: flex;
}

.demo-type>div {
    flex: 1;
    text-align: center;
}

.demo-type>div:not(:last-child) {
    border-right: 1px solid var(--el-border-color);
}

.el-col {
    text-align: center;
}

.MyPage {
    border: 1px solid #ccc;
    font-size: 20px;
    position: absolute;
    top: 390px;
    left: 185px;
    right: 0;
    padding: 40px;
    /* 调整组件的间距 */
    margin: 0 auto;
    max-width: 1400px;
}

.el-descriptions {
    margin-top: 20px;
}

.cell-item {
    display: flex;
    align-items: center;
}

.margin-top {
    margin-top: 20px;
}
</style>