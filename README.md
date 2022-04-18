# backend-base

NodeJS Version v14.15.4
NPM Version 6.14.10

## 安裝套件
```bash
npm install
```
or
```bash
npm i
```

### 環境設定
```bash
cp .env.example .env
```

### 啟動服務
```bash
npm start
```

## 指令語法

### 建立資料庫
```bash
npm run db:create
```
### 執行資料表遷移
```bash
npm run db:migrate
```
### 初始化資料庫
```bash
npm run db:init
```
### 移除資料庫
```bash
npm run db:drop
```
### 重設資料庫
```bash
npm run db:reset
```

### 執行專案測試
```bash
npm run test
```

## 打包專案
```bash
npm run build
```
