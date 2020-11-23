## 用TS的姿势实现一个react后台管理系统

1. TS姿势入门
    1.  基本数据类型
    2.  泛型
    3.  接口
        1.  接口的声明
        2.  接口回调
        3.  接口的继承
    4.  类
        1.  多态
        2.  继承
        3.  封装
        
2.  用TS的姿势了解react
    1.  初始化react项目
    2.  使用接口声明props属性
    3.  使用接口声明state状态
    4.  jsx模板语法
        1.  map与key
        2.  三目运算符
        3.  运算符
    6.  组件
    5.  生命周期
    
3.  用TS的姿势打开redux的大门
    1.  redux介绍
        1.  redux的使用场景
        2.  redux的基本原则
    2.  redux的核心概念
        1. store
            1.  初始化store
            2.  更新store
        2. state
            1.  定义state
        3. reducer
            1.  定义reducer
            2.  合并reducer
        4. action
            1.  如何定义action
    3.  redux-thunk为readux和react牵线搭桥    
        1.  connect链接props与state
        2.  mapStateToProps将state转化为propos
        3.  mapDispatchToProps发射props给react
        
4.  react-router-dom入门
    1.  BrowserRouter
    2.  Redirect路由跳转
    3.  Route定义路由
    4.  Switch路由切换
    5.  matchPath判断路由是否匹配
    6.  NavLink定义路由链接
    7.  withRouter高阶组件
    
5.  RABC权限管理
    1.  RBAC介绍
    2.  RBAC实现原理
    3.  权限如何划分
    4.  前后端分类RBAC实现思路

6.  核心实现
    1.  整体布局实现
    2.  定义权限路由表
        1.  公共权限
        2.  私有权限
    3.  redux管理权限
        1.  store存储权限
        2.  redux-thunk为react与权限牵线搭桥   
    4.  react-router-dom渲染权限
        1.  NavLink展示左侧菜单
        2.  Route与Switch渲染权限
        3.  matchPath判断权限
    5.  自定义组件
        1.  公共布局渲染内容
        2.  左侧菜单
        3.  页面内权限管理
        
7.  拓展
    如何结合公司业务进一步拓展，例如：公司规定，订单列表，
    销售只能看到与自己相关的订单，售后只能看到部分订单参数