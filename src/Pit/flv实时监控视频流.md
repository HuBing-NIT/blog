---
title: flv格式实时监控流
order: 7
nav:
  title: 踩坑
  path: /blogs
group:
  title: 遇到的坑
  path: /遇到的坑
  order: 2
---
# 6. flv格式实时监控流

## 需求描述

```
   存在若干摄像头.需要在页面内显示摄像头的实时画面.并且在页面上进行框选.
```

## 使用方案

```
    flv.js来接入监控摄像头的实时视频流. canvans来做画矩形框的处理
```

## 需求分析

```javascript
    
1.由于显示的是视频画面.一开始简单的以为只要使用video标签.src赋给地址就可实现.但是flv的路径格式不能直接使用在video上.需要一定的处理
2.发现需要使用flv.js库来实现.实时画面展示后.再通过canvas的画布设置成一致后.就行画矩形框的处理

```

## 一些链接

```javascript
    
1. https://juejin.cn/post/7044707642693910541#heading-5
2. https://www.npmjs.com/package/flv.js

```

## Code 部分


### 

```javascript
 
 const onLoadVideo = async () => {
    console.info('onLoadVideo: 摄像头id', monitorId)
    message.loading('摄像头画面加载中..', 30)
    const [err, res] = await algorithmService.featchCameraVideo(monitorId); // 请求flv地址
    if (!err) {
      if (flvjs.isSupported()) { // 是否支持
        flvMgr && flvMgr.detachMediaElement();
        flvMgr && flvMgr.destroy();
        const videoEl: any = document.getElementById('my-player')
        const flvPlayer = flvjs.createPlayer({
          type: 'flv',
          url: res || 'http://img.ksbbs.com/asset/Mon_1704/15868902d399b87.flv'
        })
        flvPlayer.attachMediaElement(videoEl) // 挂在元素
        flvPlayer.load(); // 加载流
        flvPlayer.play(); // 播放流
        flvPlayer.on(flvjs.Events.ERROR, (e, errdet) => { // error监听
          // 参数 err 是一级异常，errdet 是二级异常
          if (e === flvjs.ErrorTypes.MEDIA_ERROR) {
            handleError()
            console.info('MEDIA_ERROR 媒体错误')
            if (errdet === flvjs.ErrorDetails.MEDIA_FORMAT_UNSUPPORTED) {
              console.info('MEDIA_FORMAT_UNSUPPORTED 媒体格式不支持')
            }
          }
          if (e === flvjs.ErrorTypes.NETWORK_ERROR) {
            console.info('NETWORK_ERROR 网络错误')
            handleError()
            if (errdet === flvjs.ErrorDetails.NETWORK_STATUS_CODE_INVALID) {
              console.info('NETWORK_STATUS_CODE_INVALID http状态码异常')
            }
          }
          if (e === flvjs.ErrorTypes.OTHER_ERROR) {
            console.info('OTHER_ERROR 其他异常：', errdet)
            handleError()
          }
        })
        flvPlayer.on(flvjs.Events.METADATA_ARRIVED, () => {
          console.info('METADATA_ARRIVED');
          handleSuccess()
        })
        flvPlayer.on(flvjs.Events.LOADING_COMPLETE, () => {
          console.info('LOADING_COMPLETE 加载完成');
          handleSuccess();
        })
        setFlvMgr(flvPlayer)
      }
    } else {
      handleError()
    }
  }

```
