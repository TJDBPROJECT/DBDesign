<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="change">
        <div class="contact-page">
            <h1>联系客服</h1>
            <el-select v-model="selectedQuestion" placeholder="请选择问题" @change="getAnswer">
                <el-option v-for="question in questions" :key="question.ID" :label="question.Question"
                    :value="question.ID"></el-option>
            </el-select>

            <div class="answer" v-if="selectedAnswer">
                <h2>答案：</h2>
                <p>{{ selectedAnswer }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ContactPage',
  data() {
    return {
      selectedQuestion: '',
      selectedAnswer: '',
      questions: [
        {
          ID: '001',
          Question: '你们接受哪些类型的电子产品？',
          Answer: '我们接受多种类型的电子产品，包括但不限于手机、平板电脑、笔记本电脑、台式电脑、相机、游戏机、电视、音响设备等。如果您不确定某种产品是否在我们的接受范围内，可以随时联系我们以获取更多信息。',
        },
        {
          ID: '003',
          Question: '您的维修人员是否有资质？',
          Answer: '是的，我们的维修人员经过专业培训，具有丰富的维修经验和相关的资质。他们能够应对各种电子产品的维修需求。',
        },
        {
          ID: '004',
          Question: '你们对隐私和数据安全有何保障？',
          Answer: '我们非常重视客户的隐私和数据安全。在进行维修之前，我们会建议您备份您的数据。在维修过程中，我们会尽力保护您的数据不受损失，但我们建议您在交付设备时删除个人敏感信息。',
        },
        {
          ID: '005',
          Question: '您的价格是如何确定的？',
          Answer: '我们的价格评估考虑了多个因素，包括设备类型、问题的严重程度、所需的零部件和维修时间。我们会根据这些因素提供您一个透明的报价，以确保价格的公平性和合理性。',
        },
        {
          ID: '002',
          Question: '你们提供保修服务吗？',
          Answer: '是的，我们提供一年期的保修服务，涵盖我们修复过的部件。凭借维修证明可在保修期内到任意门店进行保修,具体保修政策会因修复的内容而异，您可以咨询我们的工作人员以获取更多细节。',
        },
      ],
    };
  },
  methods: {
    getAnswer() {
      const question = this.questions.find(
        (q) => q.ID === this.selectedQuestion
      );
      if (question) {
        this.selectedAnswer = question.Answer;
      } else {
        this.selectedAnswer = '';
      }
    },
  },
};
</script>


  
<style>
.contact-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.answer {
  margin-top: 20px;
}

h1,
h2 {
  margin-bottom: 10px;
}
.change {
    border: 1px solid #ccc;
    width: 1200px;
    /* 设置边框的宽度为 300 像素 */
    margin-top: 0%;
    font-size: 30px;
    color: black;
    position: absolute;
    top: 150px;
    left: 205px;
    padding: 40px;
}
</style>