<template>
  <div class="ordering">
    <div>订单列表</div>
  </div>
  <div class="OrderDetails">
    <el-table :data="RecycleOrderInfo" style="width: 100%">
      <el-table-column font-size="20px" prop="OrderID" label="订单ID" width="100" />
      <el-table-column prop="CategoryName" label="订单名称" width="200" />
      <el-table-column prop="Type_Name" label="类型" width="150" />
      <el-table-column prop="Structure_Url" label="Structure Url" width="200" />
      <el-table-column prop="details" label="订单详情" width="180" />
      <el-table-column prop="time" label="订单时间" width="150" />
      <el-table-column prop="state" label="订单状态" width="150" />
      <el-table-column prop="money" label="订单金额" />
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
      RecycleOrderInfo: {
        CategoryID: "",
        CategoryName: "",
        TypeID: "",
        Type_Name: "",
        Structure_Url: ""
      }, // 存储订单数据
      editDialogVisible: false, // 修改弹窗可见性
      editForm: {}, // 修改表单数据
      editFormRules: {
        ExpectedPrice: [{ required: true, message: '请输入预期价格', trigger: 'blur' }],
        Recycle_Location: [{ required: true, message: '请输入回收地点', trigger: 'blur' }],
        Recycle_Time: [{ required: true, message: '请选择回收时间', trigger: 'change' }],
      },
      deleteDialogVisible: false, // 删除弹窗可见性
      selectedOrder: null, // 选中的订单数据
    };
  },
  created() {
    console.log("尝试获取回收订单信息")
    this.fetchRecycleOrderData();
  },
  methods: {
    fetchRecycleOrderData() {
      getRecycleOrderInfo(this.userid)
        .then((res) => {
          const orderData = res.data; // 根据实际返回数据结构获取数据
          if (orderData && orderData.length > 0) {
            const firstOrder = orderData[0];
            this.RecycleOrderInfo.CategoryID = firstOrder.Device.Device_Cate_ID.CategoryID;
            this.RecycleOrderInfo.CategoryName = firstOrder.Device.Device_Cate_ID.CategoryName;
            this.RecycleOrderInfo.TypeID = firstOrder.Device.Device_Type_ID.TypeID;
            this.RecycleOrderInfo.Type_Name = firstOrder.Device.Device_Type_ID.Type_Name;
            this.RecycleOrderInfo.Structure_Url = firstOrder.Device.Device_Type_ID.Structure_Url;
          }
        })
        .catch((error) => {
          console.error('获取回收订单信息失败:', error);
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
              this.fetchRecycleOrderData(); // 刷新订单数据
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
      this.fetchRecycleOrderData(); // 刷新订单数据
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
  position: absolute;
  top: 150px;
  left: 200px;
  right: 0;
  padding: 10px 0;
  margin: 0 auto;
  max-width: 1400px;
}

.OrderDetails {
  font-size: 25px;
  position: absolute;
  top: 130px;
  left: 200px;
  right: 0;
  padding: 10px 0;
  margin: 0 auto;
  max-width: 1400px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
  