<template>
    <div class="Myaddress">
    <el-button type="primary" @click="addLocation">新增地址信息</el-button>
    <el-button type="success" @click="editLocation">修改地址信息</el-button>
    <el-button type="danger" @click="deleteLocation">删除地址信息</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="Location_Name" label="地址名" width="500" />
        <el-table-column prop="Loc_Detail" label="详细地址" width="500"  @click="selectLocation"/>
      </el-table>
    </div>
  </template>
  
  <script>
  import { ElMessageBox } from 'element-plus'
  import { getLocationInfo, addLocationInfo, editLocationInfo } from '@/api/location.js'
  import { mapState } from 'vuex';
  
  export default {
    computed: {
      iconStyle() {
        return "font-size: 14px; margin-right: 5px;";
      },
      ...mapState(['userid']), // 获取 userid 数据
    },
    data() {
      return {
        tableData: [],
        ElMessageBox,
        selectedLocation: null // 存储选中的地址数据
      }
    },
    created() {
      console.log("尝试拿到地址信息")
      const UserID = this.userid;
      getLocationInfo(UserID)
        .then((res) => {
          // 处理返回的用户个人资料数据
          console.log("拿数据成功");
          console.log(UserID);
          console.log('Response Data:', res.data); // 打印获取到的数据
          this.tableData = res.data.Location; // 将获取到的数据存储到tableData中
        })
        .catch((error) => {
          // 处理错误
          console.log("拿数据失败");
          console.error('Error:', error); // 打印错误信息
        });
      this.getLocationData();
    },
    methods: {
    // 点击表格行选择地址
    selectLocation(row) {
      this.selectedLocation = row; // 将选中的地址数据存储在 selectedLocation 中
    },

    // 新增地址信息
    addLocation() {
      const newLocation = {
        Location_Name: '新地址',
        Loc_Detail: '新地址详情',
        uid: this.userid // 用户ID
      };
      addLocationInfo(newLocation)
        .then((res) => {
          // 处理成功
          console.log('新增地址信息成功:', res);
          // 重新获取地址信息并刷新表格
          this.getLocationData();
        })
        .catch((error) => {
          // 处理错误
          console.error('新增地址信息失败:', error);
        });
    },

    // 修改地址信息
    editLocation() {
      if (!this.selectedLocation) {
        console.log('未选中地址');
        return;
      }

      const editedLocation = {
        Location_Name: '修改后的地址',
        Loc_Detail: '修改后的地址详情',
        UserID: this.userid,
        id: this.selectedLocation.ID
      };
      editLocationInfo(editedLocation)
        .then((res) => {
          // 处理成功
          console.log('修改地址信息成功:', res);
          // 重新获取地址信息并刷新表格
          this.getLocationData();
          this.selectedLocation = null; // 清空选中的地址数据
        })
        .catch((error) => {
          // 处理错误
          console.error('修改地址信息失败:', error);
        });
    },

    // 删除地址信息
    deleteLocation() {
      if (!this.selectedLocation) {
        console.log('未选中地址');
        return;
      }

      // 弹出确认对话框
      this.ElMessageBox.confirm('确认删除该地址信息吗?', '提示', {
        type: 'warning'
      })
      .then(() => {
        // 调用删除接口...
        // 处理成功
        console.log('删除地址信息成功');
        // 重新获取地址信息并刷新表格
        this.getLocationData();
        this.selectedLocation = null; // 清空选中的地址数据
      })
      .catch(() => {
        // 用户取消删除
        console.log('取消删除地址信息');
      });
    },

    // 获取地址信息
    getLocationData() {
      getLocationInfo(this.userid)
        .then((res) => {
          // 处理返回的数据
          this.tableData = res.data.Location;
        })
        .catch((error) => {
          // 处理错误
          console.error('获取地址信息失败:', error);
        });
    }
  },
}
  
  </script>
  
  <style>
  .Myaddress {
      font-size: 30px;
      position: absolute;
      top: 150px;
      left: 200px;
      right: 0;
      padding: 10px 0;
      margin: 0 auto;
      max-width: 1000px;
  }
  </style>