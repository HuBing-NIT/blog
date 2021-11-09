---
title: 子进程启动Jar
order: 1
nav:
  title: 个人
  path: /blogs
group:
  title: 遇到的坑
  path: /遇到的坑
  order: 2
---

# 1. 子进程启动 Jar(electron)

```javascript

import { spawn } from 'child_process';
import * as os from 'os';
import { cwd } from 'process';

private openJavaServer() { //启动jar
        const java = getResourcePath('jre1.8/bin/java.exe')  // 这里用的jre
        const file = getResourcePath('out-warehouse-local-print-service-web-1.0.2.jar') // 要启动的jar包
        const sdkLog = path.normalize(app.isPackaged ? path.join(process.env.APPDATA, 'outwarehouseLabelPrint', 'sdklogs') : path.join(cwd(), 'sdklogs'))

        const sdkLogPath = `-DsdkLogPath=${sdkLog}\\`
        console.info(`jre start: ${java} -Dfile.encoding=utf-8 ${sdkLogPath} -jar ${file}`)

        // 以node child_process 的spawn模块启动jar包
        // 核心就是 java -jar jar包  附带上一些启动参数
        this.workderProcess = spawn(java, ['-Dfile.encoding=utf-8', sdkLogPath , '-jar', file ], {})
        this.workderProcess.stdout.on('data', (data) => {
            console.info(data.toString())
        })
        this.workderProcess.on('close', (code, signal) => {
            console.info(`子进程close，code:${code} 信号${signal}`);
            this.workderProcess = null
        });
        this.workderProcess.on('disconnect', () => {
            console.info('disconnect')
        })
        this.workderProcess.on('error', (error) => {
            console.info('error', error)
        })
        this.workderProcess.on('exit', (code, signal) => {
            console.info(`子进程退出,code:${code} 信号${signal}`);
            this.workderProcess = null
        })
    }

```
