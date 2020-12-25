# 基于 Vue 和 Webpack4 的可插拔式微前端架构 - platform

## platform 框架介绍
platform 框架介绍 是基于 Vue 和 Webpack4 实现的一种项目结构；业务模块可以像拼图一样与架构模块组合，形成不同的系统，而这一切都是可以在**生产环境热插拔**的；这意味着你可以随时向你的系统添加新的功能模块，甚至改版整个系统，而不需要替换掉整个项目。

此外当多个项目使用此架构开发，即使模块是由不同的项目打包出来的，也可以在生产环境进行快速组合，模块可以非常简单的进行复用。

## 特点test
- 支持生产环境模块热插拔
- 底层为项目的核心提供保障(core)
- 基座作为基座模块，也支持多个并存(frames)
- 业务模块的灵活组合(puzzles)

## 如何建立关联
- 将基座和业务模块以`umd`模块的方式用 `webpack` 打包出来
- 通过 [LoadJS](https://github.com/muicss/loadjs) 对这些模块进行挂载，会在 `window` 对象上附加该模块对象
- 通过动态路由和动态的状态管理的方式将该对象加载到架构中

## 如何进行项目构建

**获取核心模块和基座模块**

请拉取dev -> dev-bj

~~~
git clone https://gitlab.zgjdy.cn/jdy-frontend/platform.git
~~~

**建立puzzles文件夹**

项目拉取完成以后在您可以看到`src` 下面的项目结构是这样的

~~~
├─core
│  ├─api
│  │  ├─config
│  │  └─mock
│  │      └─menus
│  ├─mixins
│  ├─scripts
│  ├─store
│  │  └─modules
│  ├─styles
│  └─utils
├─frames
│  └─dashboard
│      ├─assets
│      │  ├─application
│      │  │  ├─attendanceManager
│      │  │  ├─contractManage
│      │  │  ├─dailyCost
│      │  │  ├─dataManage
│      │  │  ├─devicePurchase
│      │  │  ├─dispatchManage
│      │  │  ├─fieldvisualization
│      │  │  ├─flowManage
│      │  │  ├─meettingManage
│      │  │  ├─officeSupplies
│      │  │  ├─orgStructure
│      │  │  ├─productManager(Supply)
│      │  │  ├─projectCostManager
│      │  │  ├─projectManage
│      │  │  ├─purchasingManagement
│      │  │  ├─sealManagement
│      │  │  ├─shoppingMall
│      │  │  ├─systemConfig
│      │  │  ├─vehicleManagement
│      │  │  └─workLog
│      │  ├─home
│      │  ├─login
│      │  ├─messagenotify
│      │  └─step
│      ├─components
│      │  ├─ApprovalRecord
│      │  ├─AsideMenu
│      │  ├─CrumbBox
│      │  ├─Dialog
│      │  ├─ExportScript
│      │  ├─LeftToRightMould
│      │  ├─Process
│      │  ├─Steps
│      │  └─Visual
│      │      └─components
│      ├─scripts
│      ├─store
│      │  └─modules
│      └─views
│          ├─home
│          │  └─components
│          ├─layout
│          │  └─components
│          ├─login
│          │  └─components
│          └─page
│              └─components
└─puzzles（此文件文件夹不存在，此时需要在src下面建立puzzles文件夹）

~~~

**拉取业务模块**

如果需要进行业务模块的拉取，把所有的业务模块拉取到puzzles文件下面 例如：组织架构和系统管理

~~~
git clone https://gitlab.zgjdy.cn/jdy-frontend/systemmanage.git
git clone https://gitlab.zgjdy.cn/jdy-frontend/orgstructure.git
~~~

**注意事项**

git地址项目的文件小写命名的`systemmanage.git`  在puzzles中是以驼峰名称的文件结构， 即和GitLab中仓库的名字保持一致

**完整的项目结构展示**

`src` 中完整的项目结构的展示

~~~
├─core
│  ├─api
│  │  ├─config
│  │  └─mock
│  │      └─menus
│  ├─mixins
│  ├─scripts
│  ├─store
│  │  └─modules
│  ├─styles
│  └─utils
├─frames
│  └─dashboard
│      ├─assets
│      │  ├─application
│      │  │  ├─attendanceManager
│      │  │  ├─contractManage
│      │  │  ├─dailyCost
│      │  │  ├─dataManage
│      │  │  ├─devicePurchase
│      │  │  ├─dispatchManage
│      │  │  ├─fieldvisualization
│      │  │  ├─flowManage
│      │  │  ├─meettingManage
│      │  │  ├─officeSupplies
│      │  │  ├─orgStructure
│      │  │  ├─productManager(Supply)
│      │  │  ├─projectCostManager
│      │  │  ├─projectManage
│      │  │  ├─purchasingManagement
│      │  │  ├─sealManagement
│      │  │  ├─shoppingMall
│      │  │  ├─systemConfig
│      │  │  ├─vehicleManagement
│      │  │  └─workLog
│      │  ├─home
│      │  ├─login
│      │  ├─messagenotify
│      │  └─step
│      ├─components
│      │  ├─ApprovalRecord
│      │  ├─AsideMenu
│      │  ├─CrumbBox
│      │  ├─Dialog
│      │  ├─ExportScript
│      │  ├─LeftToRightMould
│      │  ├─Process
│      │  ├─Steps
│      │  └─Visual
│      │      └─components
│      ├─scripts
│      ├─store
│      │  └─modules
│      └─views
│          ├─home
│          │  └─components
│          ├─layout
│          │  └─components
│          ├─login
│          │  └─components
│          └─page
│              └─components
└─puzzles
    ├─orgStructure
    │  ├─scripts
    │  └─views
    │      ├─employeeManage
    │      │  └─components
    │      ├─orgManage
    │      │  └─components
    │      └─postManage
    └─systemManage
        ├─scripts
        └─views
            ├─applicationAuthorization
            │  └─components
            ├─applicationConfig
            │  ├─components
            │  ├─dailytask
            │  ├─systemMessage
            │  └─urgenttask
            ├─applicationEmpower
            │  └─components
            ├─resourceManage
            │  └─components
            └─roleManage
                └─components
~~~

## 运行项目

### 开发环境

安装依赖

```bash
npm install
```

构建第三方依赖建立动态链接库

```bash
npm run dll
```

运行

```bash
npm run serve
```



### 生成环境

安装依赖

```bash
npm install
```

构建第三方依赖

```bash
npm run dll
```

构建，在这步你可以选择需要打包的基座模块和业务模块方便进行灵活组合

```bash
npm run build
```

#### 单独打包架构

```
npm run core
```

#### 单独打包基座模块

```bash
npm run frame --name="xxx"
```

#### 单独打包业务模块

```bash
npm run puzzle --name="xxx"
```

通过上述操作打包出的模块，可以直接新增到生产环境或者替换生产环境对应应模块



## 代码结构

### config

此文件夹内包含webpack所有打包配置文件

### public

config.js：项目配置，用于生产环境配置

index.html：HTML 模版

### static

主要用于放置静态资源，将会直接复制到生产环境static文件夹

### static -> dll

由`npm run dll`生成的第三方库和公共代码等

### src 项目结构

~~~
├─core									  // 主框架
│  ├─api								  // 存放主框架的api文档
│  │  └─mock
│  ├─mixins								  // 存放整体项目混入的文件
│  │  └─pagination.js					  // 分页文件
│  ├─scripts	   						  // 用处理主框架、基座框架、子模块之间的关系
│  ├─store								  // 主框架的状态管理
│  │  └─modules
│  │  └─index.js
│  ├─styles								  // 全局样式
│  │  └─base.less						  // 基础样式
│  │  └─index.less						  // 样式入口
│  │  └─search.less						  // 顶部搜索样式
│  │  └─tab.less						  // 选项卡样式
│  │  └─var.less						  // 全局变量样式
│  └─utils
├─frames						          // 基座框架
│  └─dashboard 						      // dashBoard基座
│      ├─assets							  // 静态文件，图片这些，进行模块开发
│      │  ├─application
│      │  │  ├─dispatchManage
│      │  │  ├─flowManage
│      │  │  ├─orgStructure
│      │  │  └─systemConfig
│      │  ├─home
│      │  ├─login
│      │  └─messagenotify
│      ├─components      				  // 此基座的用的全局组件
│      │  ├─AsideMenu      				  // 侧边栏
│      │  ├─Dialog      				  // 弹框
│      │  └─LeftToRightMould      		  // 左右结构的页面
│      ├─scripts      		  			  // 路由存放地方
│      ├─store      		  			  // 基座状态管理
│      │  └─modules
│      │  └─index.js
│      └─views    		  			      // 基座的视图
│          ├─home    		  			  // 主页面
│          │  └─components
│          │  └─index.vue
│          ├─layout    		  			  // 布局页面
│          │  └─components
│          │  └─inex.vue
│          ├─login    		  			  // 登录页面
│          │  └─components
│          └─page
│              └─components
└─puzzles				    		      // 子模块
    └─systemManage					  	  // 系统管理模块
        ├─scripts 						  // 子模块的动态路由
        └─views
            ├─applicationAuthorization
            │  └─components
            ├─applicationConfig
            │  ├─components
            │  ├─dailytask
            │  ├─systemMessage
            │  └─urgenttask
            ├─applicationEmpower
            │  └─components
            ├─resourceManage
            │  └─components
            └─roleManage
                └─components
~~~



### EsLint规范

项目中采用标准的eslint的规范，在项目开中需要安装EsList

**相关的vscode的插件**

- EsLint
- vetur
- Prettier - Code formatter

**在vscode中首选项进行json配置**

低于1.41.1版本的配置方案

~~~
{
  "workbench.iconTheme": "material-icon-theme",
  "explorer.confirmDragAndDrop": false,
  "explorer.confirmDelete": false,
  //配置eslint
  "eslint.autoFixOnSave": true,  //  启用保存时自动修复,默认只支持.js文件
  "eslint.validate": [
     "javascript",  //  用eslint的规则检测js文件
     {
       "language": "vue",   // 检测vue文件
       "autoFix": true   //  为vue文件开启保存自动修复的功能
     },
     {
       "language": "html",
       "autoFix": true
     },
   ],
}
~~~

1.41.1版本包含1.41.1的版本

~~~
{
    "editor.quickSuggestions": {
        "other": true,
        "comments": true,
        "strings": true
    },
    "editor.fontSize": 16, // 字体
    "editor.wordWrap": "on", // 自动换行
    "editor.formatOnSave": false, // 保存自动格式化代码
    "emmet.syntaxProfiles": {
        "javascript": "jsx",
        "vue": "html",
        "vue-html": "html"
    },
    "editor.codeActionsOnSave": {
        "source.fixAll.tslint": true,
        "source.fixAll.eslint": true
    },
    "eslint.run": "onSave",
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "html",
        "vue-html",
        "vue"
    ],
    "eslint.options": {
        "plugins": ["html"],
        "extensions": [".js", ".vue"]
    },
    "editor.tabSize": 2,
    "files.autoSave": "off",
}
~~~

## 选项卡组件
~~~
<el-tabs v-model="activeName" type="card" class="one-card-tabs is-padding">
    <el-tab-pane label="用户管理" name="first" />
    <el-tab-pane label="配置管理" name="second" />
    <el-tab-pane label="角色管理" name="third" />
    <el-tab-pane label="定时任务补偿" name="fourth" />
    <el-tab-pane name="last">
        <span slot="label"><i class="iconfont icon-fanhui-copy" /> 返回</span>
    </el-tab-pane>
    </el-tabs>
    <el-tabs v-model="activeName" type="card" class="two-card-tabs is-padding">
    <el-tab-pane label="用户管理" name="first" />
    <el-tab-pane label="配置管理" name="second" />
    <el-tab-pane label="角色管理" name="third" />
    <el-tab-pane label="定时任务补偿" name="fourth" />
    </el-tabs>
    <el-tabs v-model="activeName" type="card" class="three-card-tabs is-padding">
    <el-tab-pane label="用户管理" name="first" />
    <el-tab-pane label="配置管理" name="second" />
    <el-tab-pane label="角色管理" name="third" />
    <el-tab-pane label="定时任务补偿" name="fourth" />
    </el-tabs>
    <el-tabs v-model="activeName" class="nomal first-margin is-padding">
    <el-tab-pane label="用户管理" name="first" />
    <el-tab-pane label="配置管理" name="second" />
    <el-tab-pane label="角色管理" name="third" />
    <el-tab-pane label="定时任务补偿" name="fourth" />
</el-tabs>
~~~

## tooltip用法
~~~
<el-tooltip effect="dark" placement="top-start">
    <div slot="content" class="tooltip-font"> 这hi噢黑哦然后问我偶尔howIE然后问IE然后我维护日文化融文化融我和肉人家文化人叫我和融合</div>
    <el-button type="primary">修改</el-button>
</el-tooltip>
~~~

## searchBar用法
~~~

~~~

## 权限点命名规范
**例：资源名称:操作类型  resource:add**
查询			query
新增			add
修改			edit
删除		    delete
复制            copy
导出脚本		export
导入            import
切换数据类型	change
自定义配置		config
恢复默认配置	reset
任务类型维护	type
默认配置		default
划分区域        divideArea
分配            distribute
下架            down
新增设备         addEquip
入库            warehouse
确认           confirm
发货           goods
开票           invoice
关闭           close
发布            release
停止            stop
调整            adjust
维护            maintain
授权            power
设置            setting
版本            edition
结算            settle
撤销            revoke
取消            cancel
审批            approve
退出            out
清空            empty
安全协议        safeAgree
三级安全教育     safeEducation
安全技术交底     disclose
下载            download
上传            upload
## 文件上传的类型
资源管理        resource
