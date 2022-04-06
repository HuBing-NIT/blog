---
title: 去重方法
order: 2
nav:
  title: 工具
  path: /tool
group:
  title: 去重
  path: /
  order: 3
---

## 数组去重

## 1. unique1


```javascript
function unique1(arr) {
    return [...new Set(arr)]
}
```

## 2. unique2


```javascript
function unique2(arr) {
    var obj = {};
    return arr.filter(item => {
        if (!obj[item]) {
            obj[item] = true;
            return true;
        }
    })
}
```


## 3. unique3


```javascript
function unique3(arr) {
    var result = [];
    arr.forEach(item => {
        if (result.indexOf(item) == -1) {
            result.push(item)
        }
    })
    return result;
}
```