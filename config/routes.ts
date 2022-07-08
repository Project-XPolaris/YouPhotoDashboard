export default [
  {
    path: "/user",
    layout: false,
    routes: [
      {
        name: "login",
        path: "/user/login",
        component: "./user/Login"
      },
      {
        component: "./404"
      }
    ]
  },
  {
    path: "/welcome",
    name: "welcome",
    icon: "smile",
    component: "./Welcome"
  },
  {
    path: "/library",
    name: "library",
    icon: "HddOutlined",
    routes: [
      {
        path: "/library/list",
        name: "List",
        icon: "smile",
        component: "./Library/List"
      },
      {
        component: "./404"
      }
    ]
  },
  {
    path: "/photo",
    name: "photo",
    icon: "FileImageOutlined",
    routes: [
      {
        path: "/photo/list",
        name: "List",
        icon: "smile",
        component: "./Photo/List"
      },
      {
        component: "./404"
      }
    ]
  },
  {
    path: "/",
    redirect: "/welcome"
  },
  {
    component: "./404"
  }
];
