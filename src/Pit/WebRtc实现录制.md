---
title: WebRtc实时录制
order: 8
nav:
  title: 踩坑
  path: /blogs
group:
  title: 遇到的坑
  path: /遇到的坑
  order: 2
---
# 7. WebRtc实时录制

## 需求描述

```
  对音频/视频进行录制.
```

## 使用方案

```
    webRTC中的navigator.mediaDevices.getUserMedia来换取音视频的Track
    使用MediaRecorder进行录制
    使用node.JS 的文件系统进行文件写入
```

## 需求分析

```javascript
    


```

## 一些链接

```javascript
    


```

## Code 部分


### 获取音频/视频stream

```javascript
    // 获取stream.
    const video: any = {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: id, // 屏幕窗口id
      },
    };
   const steram = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: video
    });

```

### mediaRecord录制

```javascript
  private recordInterval = 3000,
  private toArrayBuffer(blob: any, cb: any) {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const arrayBuffer = fileReader.result;
      cb(arrayBuffer);
    };
    fileReader.readAsArrayBuffer(blob);
  }
  private toBuffer(ab: any) {
    return Buffer.from(ab);
  }

  public handleStream = (stream: MediaStream) => {
    const options = {
      mimeType: 'video/webm; codecs=vp8',
    };
    if (!MediaRecorder.isTypeSupported(options.mimeType)) {
      this.appendLog(`${options.mimeType} is not supported!`);
      return;
    }
    // return;
    this.recorder = new MediaRecorder(stream, options);
    if (!this.recorder) {
      return;
    }
    // this.recorder.start(3000);
    this.recorder.ondataavailable = (event: any) => {
      this.blobs = new Blob([event.data], { type: 'video/webm' });
      this.toArrayBuffer(this.blobs, (ab: any) => {
        const buffer = this.toBuffer(ab);
        this.size = this.size + buffer.length;
        // buffer 写入文件
        window.app.sendMessageToCurrentWindow(RecordMessages.save, buffer);
      });
    };

    this.recorder.onerror = (event: any) => {

    };

    this.recorder.onstart = () => {
     
    };

    this.recorder.onstop = (event: any) => {
        // 正常结束
        console.info('正常结束录制');
        // 保存目录
        const savePath = window.app.sendMessageToCurrentWindow(RecordMessages.savePath);
        // 文件合并
        const res = window.app.sendMessageToCurrentWindow(RecordMessages.merge);
    };

    this.recorder.start(this.recordInterval);
  };

```

### 写入文件(Node)

```javascript
    fs.appendFile(p, buffer, (err: any) =>  {
        if (err) {
          this.appendLog('Failed to save video ' + err )
          this.appendLog('path = ' + this.saveFilePath);
        } else {

      }
    });
```