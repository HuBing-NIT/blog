---
title: 获取Md5
order: 4
nav:
  title: 踩坑
  path: /blogs
group:
  title: 遇到的坑
  path: /遇到的坑
  order: 2
---

# 4. 获取Md5(图片/视频)

## 描述
```
  通过上传视频/图片来获取文件的MD5,判断MD5值是否相同来避免重复上传
```

## 第三方模块
```javascript
import CryptoJS from 'crypto-js'
```

## 全量解析Md5
```javascript
  private getFileMD5 = (file) => new Promise((resolve, reject) => { // 获取文件MD5值
    const reader = new FileReader();
    // 读取文件 value
    reader.readAsArrayBuffer(file);
    reader.onload = () => {
      const wordArray = CryptoJS.lib.WordArray.create(reader.result);
      const hash = CryptoJS.MD5(wordArray).toString();
      resolve(hash) // Md5hash
    };
    reader.onerror = (error) => {
      reject(error)
    }
  })

```


## 分片解析Md5
```javascript
  private getFileMD5ByBurst = (blob, cbProgress) => new Promise((resolve, reject) => {
    const md5 = CryptoJS.algo.MD5.create();
    this.readChunked(blob, (chunk, offs, total) => {
      md5.update(CryptoJS.enc.Latin1.parse(chunk));
      if (cbProgress) {
        cbProgress(offs / total);
      }
    }, err => {
      if (err) {
        reject(err);
      } else {
        // TODO: Handle errors
        const hash = md5.finalize();
        const hashHex = hash.toString(CryptoJS.enc.Hex);
        resolve(hashHex);
      }
    });
  });

```

## 结论

```javascript
场景: 2G内存的低配电脑下解析上传一个150M大小的视频
结果: 全量获取Md5的方式浏览器发生crash.
说明: 通过控制台检测.使用全量解析Md5的方式浏览器内存占用峰值飙升了1个G+, 分片解析Md5 只增加了200M左右.
推荐使用分片获取Md5(或许还有更优的写法)
```





