Component({
  data: {
    selected: 0,
    textColor: "#7A7E83",
    selectedColor: "#2f54eb",
    list: [
       {
            "pagePath": "pages/index/index",
            "iconPath": "static/image/tabHomeUn.png",
            "selectedIconPath": "static/image/tabHomeSel.png",
            "text": "首页"
        },
        {
            "pagePath": "pages/userInfo/userInfo",
            "iconPath": "static/image/tabMyUn.png",
            "selectedIconPath": "static/image/tabMySel.png",
            "text": "我的"
        }
    ],
  },
  methods: {
    tap(e) {
      const data = e.target.dataset;
      my.switchTab({
        url: data.value.pagePath,
      });
    },
  },
})
