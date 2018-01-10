// /**
//  * Created by Administrator on 2017/5/26.
//  */
// // 'use strict';
// export function jtoMe(window, document, undefined) {
//   var jsonp = function (url, data, callback) {
//     //初步：挂在回调函数
//     var cbFuncName = 'my_json_cb_' + Math.random().toString().replace('.', '');
//     window[cbFuncName] = callback;
//     //第一步：将data转换为字符串的形式即：{id=1,name:"张山"}=>id=1&name=张三
//     var querystring = '?';
//     for (var key in data) {
//       querystring += key + '=' + data[key] + '&';
//     }
//     //第二步：处理url中的回调函数即：url+=callback
//     querystring += 'callback=' + cbFuncName;
//     //  第三步，创建一个script标签
//     var scriptElement = document.createElement('script');
//     scriptElement.src = url + querystring;
//     //   第四步：将script标签放在页面中
//     document.body.appendChild(scriptElement);
//   };
//   window.$jsonp = jsonp;
// }
