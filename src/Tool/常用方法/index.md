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

## 3. 字节转化

> 输入一个值，返回其数据类型

```javascript
const filterSize = (size) => {
  function pow1024(num) {
    return Math.pow(1024, num);
  }
  if (!size) return '';
  if (size < pow1024(1)) return size + ' B';
  if (size < pow1024(2)) return (size / pow1024(1)).toFixed(2) + ' KB';
  if (size < pow1024(3)) return (size / pow1024(2)).toFixed(2) + ' MB';
  if (size < pow1024(4)) return (size / pow1024(3)).toFixed(2) + ' GB';
  return (size / pow1024(4)).toFixed(2) + ' TB';
};
```

## 4. 地址栏query转对象

> 输入一串地址，返回一个query对象

```javascript
const parsingQuery = (queryString: string) => {
  if (!queryString) {
    return
  }
  const arr = queryString.split('?')[1]?.split(/[&]/g);
  const obj: { [key: string]: string } = {};
  Array.isArray(arr) && arr.map((item) => {
    const v = item.split('=');
    // eslint-disable-next-line prefer-destructuring
    obj[v[0]] = v[1];
    return null;
  })
  return obj;
}
```

## 5. 数组扁平化

> 数组扁平化

```javascript
const flatten = (arr) => {
  while (arr.some((item) => (Array.isArray(item)))) {
    arr = [].concat(...arr);
  }
  return arr;
}
```
