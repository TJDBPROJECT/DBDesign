<template>
  <div class="ordering">
    <div>订单列表</div>
  </div>
  <div class="OrderDetailsContainer">
    <div class="OrderDetails">
      <el-table :data="recycleData" style="width: 100%">
        <el-table-column font-size="20px" prop="OrderID" label="订单ID" width="100" />
        <el-table-column prop="Recycle_Location" label="回收地址" width="100" />
        <el-table-column prop="ExpectedPrice" label="预期价格" width="100" />
        <el-table-column prop="Recycle_Time" label="回收时间" width="200" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button link type="info" size="middle" @click="openDetailsDialog(row)">详情</el-button>
            <el-button link type="primary" size="middle" @click="openEditDialog(row)">修改</el-button>
            <el-button link type="danger" size="middle" @click="openDeleteDialog(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <div class="pageChange">
        <el-pagination background layout="prev, pager, next" :total="totalOrders" :current-page="currentPage"
          :page-size="pageSize" @current-change="handlePageChange" />
      </div>
    </div>
  </div>
  <!-- 详情弹窗 -->
  <el-dialog v-model="detailsDialogVisible" title="订单详情">
    <div v-if="selectedOrder" class="details-dialog-content">
      <div class="details-left-column">
        <div><strong>订 单 I D:</strong> {{ selectedOrder.OrderID }}</div>
        <div><strong>回 收 地 址:</strong> {{ selectedOrder.Recycle_Location }}</div>
        <div><strong>预 期 价 格:</strong> {{ selectedOrder.ExpectedPrice }}</div>
        <div><strong>回 收 时 间:</strong> {{ selectedOrder.Recycle_Time }}</div>
        <div><strong>回 收 类 型:</strong> {{ selectedOrder.Device.Device_Cate_ID.CategoryName }}</div>
        <div><strong>回 收 品 牌:</strong> {{ selectedOrder.Device.Device_Type_ID.Brand }}</div>
        <div><strong>品 牌 I D:</strong> {{ selectedOrder.Device.Device_Type_ID.TypeID }}</div>
        <div><strong>品 牌 详 情:</strong> {{ selectedOrder.Device.Device_Type_ID.Type_Name }}</div>
        <div><strong>回 收 时 间:</strong> {{ selectedOrder.Recycle_Time }}</div>
        <!-- 其他订单详细信息 -->
      </div>
      <div class="details-right-column">
        <div>
          <strong>图 片：</strong>
          <div v-for="imageUrl in selectedOrder.Device.Device_Type_ID.Structure_Url" :key="imageUrl">
            <img
              :src="imageUrl"
              alt="图片"
              style="max-width: 100px; max-height: 100px; margin-right: 10px; cursor: pointer;"
              @click="openImageModal(imageUrl)"
            >
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
  <!-- 修改弹窗 -->
  <el-dialog v-model="editDialogVisible" title="修改订单信息" :before-close="handleEditDialogClose">
    <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="80px">
      <el-form-item label="预期价格" prop="ExpectedPrice">
        <el-input v-model="editForm.ExpectedPrice"></el-input>
      </el-form-item>
      <el-form-item label="回收地点" prop="Recycle_Location">
        <el-input v-model="editForm.Recycle_Location"></el-input>
      </el-form-item>
      <el-form-item label="回收时间" prop="Recycle_Time">
        <el-date-picker v-model="editForm.Recycle_Time" type="datetime"
          value-format="yyyy-MM-dd'T'HH:mm:ss"></el-date-picker>
      </el-form-item>
    </el-form>
    <span class="dialog-footer">
      <el-button @click="handleEditDialogClose">取消</el-button>
      <el-button type="primary" @click="submitEditForm">确定</el-button>
    </span>
  </el-dialog>

  <!-- 删除弹窗 -->
  <el-dialog v-model="deleteDialogVisible" title="删除订单" width="30%" :before-close="handleDeleteDialogClose">
    <span>确定要删除这条订单信息吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="deleteOrder">确定</el-button>
        <el-button @click="handleDeleteDialogClose">取消</el-button>
      </span>
    </template>
  </el-dialog>
    <!-- 放大图片的弹窗 -->
    <el-dialog v-model="isImageModalVisible" title="放大图片">
    <div v-if="selectedImage">
      <img :src="selectedImage" alt="放大图片" style="max-width: 100%; max-height: 100%;" />
    </div>
  </el-dialog>
</template>
  
<script>
import { ElMessageBox, ElNotification } from 'element-plus';
import { getRecycleOrderInfo, editRecycleOrderInfo } from '@/api/order.js';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['userid']),
  },
  data() {
    return {
      recycleData: [], // 存储订单数据
      editForm: {}, // 修改表单数据
      editFormRules: {
        ExpectedPrice: [{ required: true, message: '请输入预期价格', trigger: 'blur' }],
        Recycle_Location: [{ required: true, message: '请输入回收地点', trigger: 'blur' }],
        Recycle_Time: [{ required: true, message: '请选择回收时间', trigger: 'change' }],
      },
      editDialogVisible: false, // 修改弹窗可见性
      deleteDialogVisible: false, // 删除弹窗可见性
      detailsDialogVisible: false, // 初始化为false
      selectedOrder: null, // 选中的订单数据
      displayedRepairData: [], // 当前页面显示的回收订单数据
      totalOrders: 0, // 总订单数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的订单数
      isImageModalVisible: false,
      selectedImage: '',
    };
  },
  created() {
    console.log("尝试获取回收订单信息")
    const UserID = this.userid;
    getRecycleOrderInfo(UserID)
      .then((res) => {
        // 处理返回的用户个人资料数据
        console.log("拿数据成功");
        console.log(UserID);
        console.log('Response Data:', res.data); // 打印获取到的数据
        this.recycleData = res.data.recycle_order; // 将获取到的数据存储到recycleData中
      })
      .catch((error) => {
        // 处理错误
        console.log("拿数据失败");
        console.error('Error:', error); // 打印错误信息
      });
    this.getOrderData();
  },
  mounted() {
    // 在组件加载完成后重新计算表格头部的宽度
    this.$nextTick(() => {
      const tableHeader = document.querySelector(".el-table__header");
      const tableBody = document.querySelector(".el-table__body-wrapper");
      if (tableHeader && tableBody) {
        tableHeader.style.width = tableBody.offsetWidth + "px";
      }
    });
  },
  methods: {
    getOrderData() {
      getRecycleOrderInfo(this.userid)
        .then((res) => {
          // 处理返回的数据
          this.recycleData = res.data.recycle_order;
        })
        .catch((error) => {
          // 处理错误
          console.error('获取地址信息失败:', error);
        });
    },
    openDetailsDialog(row) {
      this.selectedOrder = row;
      this.detailsDialogVisible = true;
    },
    handlePageChange(page) {
      this.currentPage = page; // 更新当前页码
      this.updateDisplayedRepairData(); // 更新当前页面显示的数据
    },
    // 打开修改弹窗
    openEditDialog(row) {
      this.editForm = { ...row };
      this.editDialogVisible = true;
    },

    // 关闭修改弹窗
    handleEditDialogClose() {
      this.editDialogVisible = false;
      this.$refs.editForm.clearValidate(); // 清除表单验证信息
    },

    // 提交修改表单
    submitEditForm() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          const { ExpectedPrice, Recycle_Location, Recycle_Time } = this.editForm;
          editRecycleOrderInfo({
            id: this.userid,
            ExpectedPrice,
            Recycle_Location,
            Recycle_Time,
          })
            .then((res) => {
              console.log('修改订单信息成功:', res);
              ElNotification.success({
                title: '成功',
                message: '修改订单信息成功',
              });
              this.getOrderData(); // 刷新订单数据
              this.editDialogVisible = false;
            })
            .catch((error) => {
              console.error('修改订单信息失败:', error);
              ElNotification.error({
                title: '错误',
                message: '修改订单信息失败',
              });
            });
        }
      });
    },

    // 打开删除弹窗
    openDeleteDialog(row) {
      this.selectedOrder = row;
      this.deleteDialogVisible = true;
    },

    // 关闭删除弹窗
    handleDeleteDialogClose() {
      this.selectedOrder = null;
      this.deleteDialogVisible = false;
    },

    openImageModal(imageUrl) {
      this.selectedImage = imageUrl;
      this.isImageModalVisible = true;
    },

    closeImageModal() {
      this.isImageModalVisible = false;
      this.selectedImage = ''; // 清空选中的图片
    },

    // 删除订单
    deleteOrder() {
      this.handleDeleteDialogClose();
      ElMessageBox.alert('删除成功', '提示', { type: 'success' });
      this.getOrderData(); // 刷新订单数据
    },

    // 分页回调
    currentChange(e) {
      console.log(e);
    },
  },
};
</script>
  
<style>
.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.pageChange {
  display: flex;
  justify-content: center;
}

.ordering {
  font-size: 30px;
  text-align: center;
  padding: 10px 0;
}

.OrderDetailsContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 70vh;
  text-align: center;
}

.OrderDetails {
  font-size: 25px;
  max-width: 1400px;
  margin-top: 0px;
  /* 调整与页面上方的距离 */
  padding: 20px;
  /* 增加内边距 */
  border: 1px solid #ccc;
  /* 添加边框样式 */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  /* 添加阴影效果 */
  display: inline-block;
  vertical-align: middle;
}

.el-table__header {
  height: 0px;
}

.details-dialog-content {
  display: flex;
}

.details-left-column {
  flex: 1;
  text-align: left;
  padding-right: 20px;
}

.details-right-column {
  flex: 1;
  text-align: left;
  padding-left: 20px;
}
</style>