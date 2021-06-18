const utils = {
    genSidebar: function (title, children = [''], collapsable = true, sidebarDepth = 2) {
      console.log('生成侧边栏数组函数，执行了');
      var arr = new Array();
      arr.push({
        title,
        children,
        collapsable,
        sidebarDepth
      })
      console.log(arr);
      return arr;
    }
  };
  
  module.exports = utils;