---
title: 浅试bat批处理
order: 9
nav:
  title: 踩坑
  path: /blogs
group:
  title: 遇到的坑
  path: /遇到的坑
  order: 2
---
# 8. 浅试bat批处理

## 需求描述

```
   客户端程序录制了任意个短视频 需要再录制结束后合并成一个视频
```

## 使用方案

```
    视频合成使用mkvmerge.exe工具
    生成一个bat批处理来完成整个过程
      1. 创建一个bat批处理文件
      2. exec调用批处理文件
      3. 执行mkvmerge进行视频合成
      4. 删除合成的源文件
      5. 删除自身bat文件
```

## 需求分析

```javascript
    
    在实际使用中.发现很多的问题.比如node去查询目录下文件的顺序问题. 文件路径包含中文或者奇怪字符的问题. bat文件中文乱码的问题.

```

## Code 部分


### 

```javascript
 
  // 1.找到系统中mkvmerge路径
  const mergeToolDir = getResourcePath('mkvmerge.exe'); 
  const saveDir = this.saveFileDir;
  // 2.找到录制目录下的所有需要合成文件
  const recordFileArr = (fs.readdirSync(saveDir) || []).sort((a, b) => {
    return +a.split('.')[0] - +b.split('.')[0]
  });
  // 对视频文件的轨道Track Id 0的信息获取
  const firstTrack: string[] = [];
  const errFileIdx: number[] = []; // 可能有些视频时损坏的(目前只发现小视频). 考虑先越过处理
  recordFileArr.map((i) => `${saveDir}${i}`).map((filePath, idx) => {
    const c = `${mergeToolDir} -i ${filePath}`
    try {
      const stdout  = execSync(c)
      if (stdout.indexOf('Track ID 0: video') !== -1) {
        firstTrack.push('video')
      } else {
        firstTrack.push('audio')
      }
    } catch (error) {
      errFileIdx.push(idx);
    }
  
  })
  const mergeTrackIds: string[] = [];
  for (let i = 0 ; i < firstTrack.length - 1; i++) {
    if (firstTrack[i] !== firstTrack[i + 1 ]) {
      mergeTrackIds.push(`${i + 1}:0:${i}:1,${i + 1}:1:${i}:0`)
    }
  }
  const appendInstruction = mergeTrackIds.length ? `--append-to ${mergeTrackIds.join(',')}` : ''

  // 3.获取核心需要执行的cmd 指令
  const cmd = `${mergeToolDir} ${appendInstruction} -o merge.webm ${recordFileArr.filter((_, idx) => !errFileIdx.includes(idx)).join(' + ')}`
  
  const batFileName = 'merge.bat'
  const batLogFileName = 'merge.log'

  const batFilePath = `${this.saveFileDir}${batFileName}`;
  const batLogFilePath = `${this.saveFileDir}${batLogFileName}`

  // 4.定义好bat文件的执行内容
  const batStr = `
      chcp 65001\r\n
      cd ${this.saveFileDir} >> ${batLogFileName} \r\n
      echo ------- >> ${batLogFileName}\r\n
      echo start merge webm video. >> ${batLogFileName}\r\n
      echo ------- >> ${batLogFileName}\r\n
      ${cmd} >> ${batLogFileName}\r\n
      if exist "merge.webm" (\r\n
        echo ------- >> ${batLogFileName}\r\n
        echo start del source file. >> ${batLogFileName}\r\n
        echo ------- >> ${batLogFileName}\r\n
        ${recordFileArr.map((p) => {
          return `del ${p} >> ${batLogFileName} \r\n`;
        }).join('')}
        echo ------- >> ${batLogFileName}\r\n
        echo start del bat file >> ${batLogFileName}\r\n
        echo ------- >> ${batLogFileName}\r\n
        del ${batFileName} >> ${batLogFileName}\r\n
        echo success: mergefile success----------\r\n 
      ) else (\r\n
        echo error: mergefile Error----------\r\n 
      )\r\n
      
  `

  // 5. 创建bat文件 以及对应日志文件
  fs.writeFileSync(batLogFilePath, ''); // 创建批处理日志文件
  fs.writeFileSync(batFilePath, batStr); // 创建批处理文件

  // 6.调用批处理文件
  const child = execFile(batFilePath, null, {cwd: this.saveFileDir}, (error,  stdout, stderr) => {
    
  });
  child.unref();

```
