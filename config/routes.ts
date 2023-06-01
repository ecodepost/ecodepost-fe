export default [
  {
    path: '/',
    name: '主页',
    component: './LayoutIndex/index',
    routes: [
      {
        path: '/s/',
        name: '空间',
        component: './LayoutCmt/Community',
        routes: [
          {
            path: '/s/:spaceGuid',
            name: '空间',
            component: './LayoutSpace/Space',
            routes: [
              {
                path: '/s/:spaceGuid/d/-/create',
                name: '创建文章',
                component: './SpaceFileCreate/SpaceFileCreatePage',
              },
              {
                path: '/s/:spaceGuid/d/:fileGuid/d/-/create',
                name: '创建子级数据',
                component: './SpaceFileCreateSub/FileCreateSubPage',
              },
              {
                path: '/s/:spaceGuid/d/:fileGuid/edit',
                name: '编辑文章',
                component: './SpaceFileEdit/SpaceFileEditPage',
              },
              {
                path: '/s/:spaceGuid/d/:fileGuid',
                name: '文章详情',
                component: './SpaceFileDetail/SpaceFileDetailPage',
                exact: true,
              },
              {
                path: '/s/:spaceGuid/d/:fileGuid/d/:subFileGuid',
                name: '文章详情',
                component: './SpaceFileDetail/SpaceFileDetailPage',
              },
              {
                path: '/s/:spaceGuid',
                name: '文章列表',
                component: './SpaceFileList/SpaceFileListPage',
              },
            ],
          },
        ],
      },
      {
        path: '/admin',
        name: '社区管理后台',
        component: './LayoutCmt/Community',
        routes: [
          {
            path: '/admin/setting/summary',
            component: './CmtAdmin/Setting/Summary/Summary',
            name: '概况',
          },
          {
            path: '/admin/setting/home',
            component: './CmtAdmin/Setting/HomeSetting/HomeSetting',
            name: '首页设置',
          },
          {
            path: '/admin/setting/colorSetting',
            component: './CmtAdmin/Setting/ColorSetting/ColorSetting',
            name: '配色设置',
          },
          {
            path: '/admin/manage/superAdmin',
            component: './CmtAdmin/Manage/SuperAdmin/Setting',
            name: '超级管理员',
          },
          {
            path: '/admin/manage/spaceAdmin',
            component: './CmtAdmin/Manage/SpaceAdmin/SpaceAdmin',
            name: '空间管理员',
          },
          {
            path: '/admin/manage/spaceAdmin/:roleId',
            component: './CmtAdmin/Manage/SpaceAdmin/Group/Group',
            name: '用户组详情',
          },
          {
            path: '/admin/manage/log',
            component: './CmtAdmin/Manage/UpdateLog/UpdateLog',
            name: '更新日志',
          },
          {
            path: '/admin/manage/memberList',
            component: './CmtAdmin/Manage/MemberList/MemberList',
            name: '社区成员',
          },
          {
            path: '/admin/manage/log',
            component: './CmtAdmin/Manage/UpdateLog/UpdateLog',
            name: '更新日志',
          },
          {
            path: '/admin/memberList',
            component: './CmtAdmin/Manage/MemberList/MemberList',
            name: '社区成员',
          },
        ],
      },

      {
        path: '',
        component: './LayoutCmt/Community',
        name: '社区',
        layout: false,
        routes: [
          {
            path: '/g/:groupGuid',
            component: './Group/Group',
            name: '分组',
          },
          {
            path: '/home',
            component: './Cmt/CmtHome/HomePage',
            name: '社区首页',
          },
          {
            path: '/notice',
            component: './Notice/Notice',
            name: '',
          },
          {
            path: '/s/:spaceGuid',
            name: '空间',
            component: './LayoutSpace/Space',
            routes: [
              {
                path: '/s/:spaceGuid/d/-/create',
                name: '创建文章',
                component: './SpaceFileCreate/SpaceFileCreatePage',
              },
              {
                path: '/s/:spaceGuid/d/:fileGuid/d/-/create',
                name: '创建子级数据',
                component: './SpaceFileCreateSub/FileCreateSubPage',
              },
              {
                path: '/s/:spaceGuid/d/:fileGuid/edit',
                name: '编辑文章',
                component: './SpaceFileEdit/SpaceFileEditPage',
              },
              {
                path: '/s/:spaceGuid/d/:fileGuid',
                name: '文章详情',
                component: './SpaceFileDetail/SpaceFileDetailPage',
                exact: true,
              },
              {
                path: '/s/:spaceGuid/d/:fileGuid/d/:subFileGuid',
                name: '文章详情',
                component: './SpaceFileDetail/SpaceFileDetailPage',
              },
              {
                path: '/s/:spaceGuid',
                name: '文章列表',
                component: './SpaceFileList/SpaceFileListPage',
              },
            ],
          },
          {
            path: '/p/:name',
            component: './Cmt/CmtProfile/Profile',
            name: '',
            routes: [
              {
                path: '/p/:name/collection',
                component: './Profile/Collection/Collection',
                name: '帖子',
              },
              {
                path: '/p/:name/post',
                component: './Profile/Article/Article',
                name: '帖子',
              },
              {
                path: '/p/:name/answer',
                component: './Profile/Question/Question',
                name: '帖子',
              },
              {
                path: '/p/:name/following',
                component: './Profile/FollowingList/FollowingList',
                name: '帖子',
              },
              {
                path: '/p/:name/follower',
                component: './Profile/FollowerList/FollowerList',
                name: '帖子',
              },
            ],
          },
        ],
      },
      {
        path: '/',
        // component: './Welcome/WelcomePage',
        // redirect: '/create-cmt',
        // 这里一定要经过上级组件
        component: './LayoutCmt/Community',
        name: '用户第一次登录，没有社区展示页面',
      },
      {
        path: '/my',
        component: './Settings/Settings',
        name: '设置',
        routes: [
          {
            path: '/my/profile',
            name: '修改个人资料',
            component: './Settings/Profile/Profile',
          },
          {
            path: '/my/password',
            name: '修改登录密码',
            component: './Settings/Password/Password',
          },
          {
            path: '/my/phone',
            name: '修改绑定手机号',
            component: './Settings/Phone/Phone',
          },
          {
            path: '/my/email',
            name: '修改邮箱',
            component: './Settings/Email/Email',
          },
          {
            path: '/my/third',
            name: '绑定第三方账号',
            component: './Settings/Third/Third',
          },
          {
            path: '/my/friend',
            name: '私信与添加好友',
            component: './Settings/Friend/Friend',
          },
          {
            path: '/my/personalSpace',
            name: '个人空间信息展示',
            component: './Settings/PersonalSpace/PersonalSpace',
          },
        ],
      },

    ],
  },
  {
    path: "*",
    component: './404',
  },
];
