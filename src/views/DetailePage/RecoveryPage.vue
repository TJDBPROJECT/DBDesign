<template>
  <seach/>
  
  <!-- 步骤条显示回收进度 -->
    <el-header style="margin-top: 20px;">
        <el-steps :active="2" align-center>
            <el-step title="Step 1" description="Some description" />
            <el-step title="Step 2" description="Some description" />
            <el-step title="Step 3" description="Some description" />
            <el-step title="Step 4" description="Some description" />
        </el-steps>
    </el-header>

  <div class="product-recycle">

    <div class="left-panel">
      <img :src="productImage" alt="Device Image" style="height: 400px; width: 400px;"/>

      <div class="order-button">
        
        <el-button type="primary" @click="goback" class="order-button">  返回  </el-button>
        <el-button type="primary" @click="submitForm" class="order-button">  下单  </el-button>
      </div>

    </div>


    <div class="right-panel">
      <!-- 输入设备基本信息，品牌、型号 -->
        <div class="product-info">
            <h1 style="display: flex;">{{ productName }}</h1>
            <h2 style="display: flex;margin-bottom: 10px;">{{ productModel }}</h2>
            <p class="__services">
            <el-icon class="gray-icon"><Avatar /></el-icon><span class="gray-text">免费上门</span>
            <el-icon class="gray-icon"><Shop /></el-icon><span class="gray-text">价格合理</span>
            <el-icon class="gray-icon"><Management /></el-icon><span class="gray-text">品质服务</span>
            </p>
            <hr style="width: 370px;margin-left: 0px;"/>
        </div>
        
        <div class="storage-group" style="margin-top: 0px;">
            <h3 class="group-title">{{ title }}</h3>
            <div class="btn-group">
            <el-button
                v-for="(option, index) in options"
                :key="index"
                :type="selectedOption === option.value ? 'primary' : 'default'"
                @click="selectOption(option.value)"
            >{{ option.label }}</el-button>
            </div>
        </div>
      
  
      <div class="product-form">
        <el-form ref="productForm" :model="form" label-width="120px">
          
        <div style="margin-left: 50px;">
          <storage-group
            title="存储容量"
            :options="['64GB', '128GB', '256GB', '512GB']"
            @option-selected="handleOptionSelected"
          ></storage-group>
        </div>
          <el-form-item label="购买渠道">
            <div>
              <DropdownList :options="['自营门店', '官方门店', '网络门店']"></DropdownList>
            </div>
          </el-form-item>
          <el-form-item label="机身外观">
            <el-input class="input"  v-model="form.device_cate"></el-input>
          </el-form-item>
          <el-form-item label="屏幕显示">
            <el-input  class="input" v-model="form.device_type"></el-input>
          </el-form-item>
          <el-form-item label="屏幕外观">
            <el-input  class="input" v-model="form.recycle_location"></el-input>
          </el-form-item>
          
    <!-- 其他页面内容 -->
          <div style="margin-left: 50px;">
            <RepairHistory title="维修历史"></RepairHistory>
          </div>  
          
        </el-form>

        

      </div>
    </div>
  </div>
</template>
  
  <script>
  import StorageGroup from '@/components/StorageGroup.vue'
  import RepairHistory from '@/components/RepairHistory.vue'
  import DropdownList from '@/components/DropdownList.vue';
  import header from '/src/components/header.vue'

  import { createRecycleOrder } from '@/api/repair_info.js'
  
  export default {

    name:'RecoveryPage',

    props: {
      title: {
        type: String,
        required: true
      },
      options: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        productImage: require('/public/p.jpg'),
        productName: '设备名称',
        productModel: '设备型号',
        form: {
          device_cate: '类型',
          device_type: '型号',
          expectedprice: '价格',
          recycle_location: '地点',
          recycle_time: '时间',
        },
      };
    },
    methods: {
      selectOption(option) {
        this.selectedOption = option;
        this.$emit('option-selected', option);

      },
      submitForm() {
          this.$router.push({ name: 'recycleprice' });
          

      },
      goback() {
        this.$router.push({ name: 'DetailsPage' });
      }
    },
    handleOptionSelected(option) {
        console.log('选中的存储容量:', option);
        // 在这里处理选中的存储容量
    },
    async submitForm() {
      try {
        // Construct the data to send to the backend
        const createdata = {
          Device_Cate:"phone",
          Device_Type:"iPhone6",
          ExpectedPrice:100,
          Recycle_Location:"home",
          Recycle_Time:"2023-08-10T15:25:00"

        };


        // Call your API function to create the repair order
        await createRecycleOrder(createdata);
        
        // if (createResponse.data.success) {
        //   console.log('回收订单创建成功:', createResponse.data);

        //   // 获取创建的回收订单信息
        //   const getOrderResponse = await repair_info({ uid: this.userId }); // 根据需要传入用户ID

        //   console.log('获取回收订单信息:', getOrderResponse.data);
          
        //   // 在此处您可以进行订单创建成功后的后续操作，例如跳转到订单详情页等
        //   // this.$router.push({ name: 'orderDetails', params: { orderId: getOrderResponse.data.orders.OrderID } });
        // } else {
        //   console.error('回收订单创建失败:', createResponse.data);
        //   // 处理订单创建失败的情况，显示错误提示等
        // }
      } catch (error) {
        console.error('Error creating order:', error);
        // Handle the error as needed
      }
    },
    components: {
      "seach": header,
      StorageGroup,
      RepairHistory,
      DropdownList,
    },
  };
  </script>
  
  <style>


.order-button {
  display: flex;
  justify-content: flex-end;
  
  margin-top: 10px; /* 调整底部间距 */
  margin-right: 20px; /* 调整右侧间距 */
  font-size: 15px; /* 调整按钮字体大小 */
  padding: 20px 40px; /* 增加按钮内边距 */
}

.__services{
    display: flex;
    margin-bottom: 20px;
}
  
.storage-group {
    margin-bottom: 20px;
}

.group-title {
font-size: 18px;
font-weight: bold;
}

.btn-group {
margin-top: 10px;
}

.product-recycle {
display: flex;
justify-content: space-between;
}

.container {
display: flex;
justify-content: center;
margin-top: 50px;
}

.centered-steps {
width: 50%;
}

.left-panel {
flex: 1;
margin-left: 400px;
margin-top: 100px;
}

.right-panel {
right: 100px;
flex: 2;
}

.gray-icon {
    color: #888;
    font-size: 18px;
    margin-right: 5px;
}

.gray-text {
color: #888;
font-size: 12px;
margin-right: 20px;
margin-bottom: 0px;
}

.product-info {
padding: 20px;
margin-left: 50px;
margin-bottom: 0%;
}

h1 {
font-size: 24px;
font-weight: bold;
}

h2 {
font-size: 18px;
}

.input{
width: 300px;
}

.product-form {
position: relative;
margin-top: 0px;;
margin-left: 20px;
}
</style>
  