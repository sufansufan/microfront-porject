<template>
  <div class="team-management">
    <h2 style="text-align:center"> {{ projectName }}</h2>

    您已被任命为该工程下{{ teamName }}的施工队长/代班，您可在登录金斗云APP，可开展以下工作：
    <h4>1)	获取施工队二维码；</h4>
    <h4>2)	给施工队添加施工班组；</h4>
    <h4>3)	审核工人提交的个人资料；</h4>
    <h4>4)	登记工人离场记录；</h4>
    <h4>5)	提交工人的返场申请；</h4>

    以上所有操作均在APP上的【工人实名制管理】中处理；首先登录金斗云App，点击屏幕下方【工作】，打开工作面板，点击工作面板中的【项目管理】，再点击【工人实名制管理】即可打开所在工程项目的列表。
    <p>获取施工队二维码和新增施工班组的操作流程：</p>
    <p>1.	工程项目列表中长按（即按住几秒不放）要处理的工程项目或者点击工程项目右侧的…，弹出可操作的菜单，点击【组建施工队】打开施工队列表页面；</p>
    <p>2.	施工队列表中长按（即按住几秒不放）自己的施工队或者点击施工队右侧的…，弹出可操作的菜单；</p>
    <p>3.	点击菜单中的【新增施工班组】按钮，添加施工班组信息；</p>

    <p>审核工人提交的资料、登记工人离场记录、提交返场申请的操作流程：</p>
    <p>方式一：</p>
    <p>1.	当有工人提交资料后，手机会收到通知，可点击打开金斗云APP；</p>
    <p>2.	点击屏幕下方位于中央的图标，再点击【紧急任务】，列表中将显示所有收到的申请；</p>
    <p>3.	点击打开工人提交的资料， 核查没有问题，点击提交；</p>

    <p>方式二：
    </p><p>1.	工程项目列表中长按（即按住几秒不放）要处理的工程项目或者点击工程项目右侧的…，弹出可操作的菜单，点击【施工人员管理】打开施工人员管理页面；</p>
    <p>2.	【加入申请】显示的是所有收到的工人资料，当有未处理的申请时，会出现红色数字，点击要处理的申请，核查资料正确，则可点击【提交】，将该工人资料提交给劳务员；</p>
    <p>3.	【施工人员】显示的是施工队所有的工人，长按或者点击人员右侧的…，弹出可操作的菜单：</p>
    <p>1)	点击【离场】录入离场信息</p>
    <p>2)	点击【返场】提交返场申请；</p>
    <p>4.	【返场确认】显示的是自己提交的返场确认，可查看劳务员的处理结果。</p>

  </div>
</template>

<script>
export default {
  components: {

  },
  data() {
    return {
      projectName: '',
      teamName: ''

    }
  },
  created() {
    const { taskParams } = this.$route.query
    taskParams.map(item => {
      if (item.parameter === 'projectName') {
        this.projectName = item.name
      } else if (item.parameter === 'teamName') {
        this.teamName = item.name
      }
    })
  }
}
</script>

<style lang="less">
.team-management{
  padding:15px

}
</style>
