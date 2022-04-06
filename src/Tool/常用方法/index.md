---
title: 常用js方法封装
order: 2
nav:
  title: 工具
  path: /tool
group:
  title: 常用方法
  path: /方法
  order: 1
---

# 常用方法封装

- 以下是一些常用方法的封装


## 1. 返回数据类型

> 输入一个值，返回其数据类型

```javascript
function type(para) {
    return Object.prototype.toString.call(para)
}
```


## 2. 返回当前的时间

> 返回格式可自己修改  

```javascript
function getDateTime() {
    var date = new Date(),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours() + 1,
        minute = date.getMinutes(),
        second = date.getSeconds();
        month = checkTime(month);
        day = checkTime(day);
        hour = checkTime(hour);
        minute = checkTime(minute);
        second = checkTime(second);
     function checkTime(i) {
        if (i < 10) {
                i = "0" + i;
       }
      return i;
    }
    return "" + year + "年" + month + "月" + day + "日" + hour + "时" + minute + "分" + second + "秒"
}
```
