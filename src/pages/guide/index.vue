<script setup lang="ts">
</script>

<template>
  <div class="guide-page">
    <h1>CODM 指南</h1>

    <section>
      <h2>转盘cp</h2>
      <ol>
        <li>通行证：220CP</li>
        <li>高级版通行证：520CP</li>
        <li>单副近战武器传说：4550cp</li>
        <li>神话枪皮保底：5810cp</li>
        <li>传说角色转盘保底：5810CP</li>
        <li>神话角色转盘：7220CP</li>
        <li>传说转盘：4950CP</li>
        <li>神话枪皮只升满级：6300CP</li>
        <li>神话角色只升满级∶12000cp左右</li>
      </ol>
      <p class="tip">
        需要充值可以联系微信：wlq16680802181
      </p>
    </section>

    <section>
      <h2>注册账号需要准备的信息</h2>
      <p>为确保注册顺利进行，请准备以下信息：</p>
      <ul>
        <li>
          注册需要的邮箱，密码，游戏昵称分开发我
          注：-邮箱不能注册过国际服
        </li>
        <li>密码不能连续数字或者字母</li>
        <li>昵称重复我这边一般会加一些特殊字符</li>
      </ul>
      <ol>
        <li>进入登录页后点击「注册新账号」。</li>
        <li>按照提示填写手机号/邮箱并获取验证码。</li>
        <li>设置密码，完善实名资料后提交。</li>
        <li>完成注册后，可立即使用新账号登录。</li>
      </ol>
    </section>

    <section>
      <h2>如何下载 CODM</h2>
      <ol>
        <li>安卓：下个光环助手里面搜使命召唤，找到欧美服就是国际服，OPPO不兼容</li>
        <li>国际服苹果：需要米果或者日子的id</li>
        <li>东南亚：虫虫助手 安卓找到后缀有：（台服）</li>
        <li>东南亚苹果：港台ID</li>
      </ol>
      <p class="tip">
        若所在地区暂未开放，此原因是未使用加速器或者加速器网络出错；账号登录点击第二个按钮！
      </p>
    </section>
  </div>
</template>

<style scoped>
.guide-page {
  padding: 24px;
  line-height: 1.7;
  color: #1f2933;
  background: #f9fbfd;
}

h1 {
  margin-bottom: 24px;
  font-size: 28px;
}

section + section {
  margin-top: 40px;
}

h2 {
  margin-bottom: 16px;
  font-size: 20px;
  color: #0f172a;
}

ol,
ul {
  padding-left: 20px;
  margin-bottom: 16px;
}

.tip {
  margin: 8px 0 0;
  padding: 12px 16px;
  border-left: 4px solid #2563eb;
  background: #eef2ff;
  border-radius: 4px;
  color: #1d4ed8;
}
</style>

<route lang="json5">
{
  name: 'Guide'
}
</route>
