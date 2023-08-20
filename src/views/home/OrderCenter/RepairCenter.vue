<template>
    <div class="ordering">
      <div>订单列表</div>
    </div>
    <div class="OrderDetails">
      <el-table :data="orders" style="width: 100%">
        <el-table-column prop="OrderID" label="订单ID" width="100" />
        <el-table-column prop="OrderPrice" label="订单金额" width="100" />
        <el-table-column prop="EngineerID" label="工程师ID" width="100" />
        <el-table-column prop="RepairLocation" label="维修地点" width="150" />
        <el-table-column prop="RepairTime" label="维修时间" width="150" />
        <el-table-column prop="OrderStatus" label="订单状态" width="100" />
        <el-table-column fixed="right" label="操作" width="150">
          <template #default="{ row }">
            <el-button link type="primary" size="middle" @click="openEditDialog(row)">修改</el-button>
            <el-button link type="danger" size="middle" @click="openDeleteDialog(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <br>
      <div class="pageChange">
        <el-pagination background layout="prev,pager,next" :total="100" current-page="1" @current-change="currentChange">
        </el-pagination>
      </div>
    </div>
  
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
          <el-date-picker v-model="editForm.RepairTime" type="datetime" value-format="yyyy-MM-dd'T'HH:mm:ss"></el-date-picker>
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
        orders: [],
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
        deleteDialogVisible: false, // 删除弹窗可见性
        selectedOrder: null, // 选中的订单数据
      };
    },
    created() {
      console.log("尝试获取维修订单信息")
      this.fetchOrderData();
    },
    methods: {
      fetchOrderData() {
        getRepairOrderInfo({ UserID: this.userid })
          .then((res) => {
            console.log('获取回收订单信息成功:',res.data);
            this.res = res.data.orders;
          })
          .catch((error) => {
            console.error('获取订单信息失败:', error);
          });
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
        this.fetchOrderData(); // 刷新订单数据
      },
  
      // 分页回调
      currentChange(e) {
        console.log(e);
      },

    },
  };
  </script>