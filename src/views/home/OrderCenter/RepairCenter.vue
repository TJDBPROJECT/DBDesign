<template>
  <div class="ordering">
    <div>订单列表</div>
  </div>
  <div class="OrderDetailsContainer">
    <div class="OrderDetails">
      <el-table :data="repairData" style="width: 100%">
        <el-table-column prop="OrderID" label="订单ID" width="80" />
        <el-table-column prop="CreateTime" label="创建时间" width="200" />
        <el-table-column prop="OrderPrice" label="订单金额" width="80" />
        <el-table-column prop="CouponID" label="优惠券ID" width="80" />
        <el-table-column prop="EngineerID" label="工程师ID" width="80" />
        <el-table-column prop="RepairLocation" label="维修地点" width="200" />
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
      <!-- 左侧内容 -->
      <div><strong>优惠券 ID:</strong> {{ selectedOrder.CouObj.Id }}</div>
      <div><strong>优 惠 折 扣:</strong> {{ selectedOrder.CouObj.Discount }}</div>
      <div><strong>优 惠 类 型:</strong> {{ selectedOrder.CouObj.Name }}</div>
      <div><strong>是 否 使 用:</strong> {{ selectedOrder.CouObj.Status }}</div>
      <div><strong>优 惠 编 号:</strong> {{ selectedOrder.CouObj.Type }}</div>
      <!-- 其他左侧内容 -->
    </div>
    <div class="details-right-column">
      <!-- 右侧内容 -->
      <div><strong>维 修 品 牌:</strong> {{ selectedOrder.RepairOptionID.Brand }}</div>
      <div><strong>维 修 详 情:</strong> {{ selectedOrder.RepairOptionID.RepairCategory.Detail }}</div>
      <div><strong>维 修 I D:</strong> {{ selectedOrder.RepairOptionID.RepairCategory.ID }}</div>
      <div><strong>维 修 设 备:</strong> {{ selectedOrder.RepairOptionID.RepairCategory.Name }}</div>
      <div><strong>维 修 需 求:</strong> {{ selectedOrder.RepairOptionID.RepairRequirement }}</div>
      <div><strong>维 修 时 间:</strong> {{ selectedOrder.RepairTime }}</div>
      <!-- 其他右侧内容 -->
    </div>
  </div>
</el-dialog>
  <!-- 修改弹窗 -->
  <el-dialog v-model="editDialogVisible" title="修改订单信息" :before-close="handleEditDialogClose">
    <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="80px">
      <el-form-item label="优惠券ID" prop="CouponID">
        <el-input v-model="editForm.CouponID"></el-input>
      </el-form-item>
      <el-form-item label="工程师ID" prop="EngineerID">
        <el-input v-model="editForm.EngineerID"></el-input>
      </el-form-item>
      <el-form-item label="选项ID" prop="OptionID">
        <el-input v-model="editForm.OptionID"></el-input>
      </el-form-item>
      <el-form-item label="维修地点" prop="RepairLocation">
        <el-input v-model="editForm.RepairLocation"></el-input>
      </el-form-item>
      <el-form-item label="维修时间" prop="RepairTime">
        <el-date-picker v-model="editForm.RepairTime" type="datetime"
          value-format="yyyy-MM-dd'T'HH:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item label="订单状态" prop="OrderStatus">
        <el-input v-model="editForm.OrderStatus"></el-input>
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
</template>
  
<script>
import { ElMessageBox, ElNotification } from 'element-plus';
import { getRepairOrderInfo, editRepairOrderInfo } from '@/api/order.js'; // 根据实际情况导入维修订单的前后端交互函数
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['userid']),
  },
  data() {
    return {
      repairData: [],
      editDialogVisible: false, // 修改弹窗可见性
      editForm: {}, // 修改表单数据
      editFormRules: {
        CouponID: [{ required: false, message: '请输入优惠券ID', trigger: 'blur' }],
        EngineerID: [{ required: true, message: '请输入工程师ID', trigger: 'blur' }],
        OptionID: [{ required: true, message: '请输入选项ID', trigger: 'blur' }],
        RepairLocation: [{ required: true, message: '请输入维修地点', trigger: 'blur' }],
        RepairTime: [{ required: true, message: '请选择维修时间', trigger: 'change' }],
        OrderStatus: [{ required: true, message: '请输入订单状态', trigger: 'blur' }],
      },
      detailsDialogVisible: false, // 初始化为false
      deleteDialogVisible: false, // 删除弹窗可见性
      selectedOrder: null, // 选中的订单数据
      displayedRepairData: [], // 当前页面显示的维修订单数据
      totalOrders: 0, // 总订单数
      currentPage: 1, // 当前页码
      pageSize: 10, // 每页显示的订单数
    };
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
  created() {
    console.log("尝试获取维修订单信息")
    const UserID = this.userid;
    getRepairOrderInfo(UserID)
      .then((res) => {
        // 处理返回的用户个人资料数据
        console.log("拿数据成功");
        console.log(UserID);
        console.log('Response Data:', res.data); // 打印获取到的数据
        this.repairData = res.data.repair_order; // 将获取到的数据存储到repairData中
      })
      .catch((error) => {
        // 处理错误
        console.log("拿数据失败");
        console.error('Error:', error); // 打印错误信息
      });
    this.getOrderData();
  },
  methods: {
    getOrderData() {
      getRepairOrderInfo(this.userid)
        .then((res) => {
          this.repairData = res.data.repair_order; // 将获取到的数据存储到repairData中
          this.totalOrders = Math.ceil(this.allRepairData.length / this.pageSize); // 设置总订单数
          this.updateDisplayedRepairData(); // 更新当前页面显示的数据
        })
        .catch((error) => {
          console.error('获取维修订单信息失败:', error);
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
    updateDisplayedRepairData() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.displayedRepairData = this.repairData.slice(startIndex, endIndex);
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
          const { CouponID, EngineerID, OptionID, RepairLocation, RepairTime, OrderStatus } = this.editForm;
          editRepairOrderInfo({
            uid: this.userid,
            id: this.editForm.OrderID,
            CouponID,
            EngineerID,
            OptionID,
            RepairLocation,
            RepairTime,
            OrderStatus,
          })
            .then((res) => {
              console.log('修改订单信息成功:', res);
              ElNotification.success({
                title: '成功',
                message: '修改订单信息成功',
              });
              this.fetchOrderData(); // 刷新订单数据
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
  align-items: stretch; /* 保持两列高度一致 */
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