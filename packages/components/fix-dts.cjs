#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dtsPath = path.join(__dirname, 'dist', 'index.d.ts');

if (!fs.existsSync(dtsPath)) {
  console.log('dist/index.d.ts does not exist');
  process.exit(0);
}

let content = fs.readFileSync(dtsPath, 'utf8');

// 检查是否是重复导出格式
if (content.includes('export * from') && content.split('export * from').length > 2) {
  console.log('Fixing duplicate exports in dist/index.d.ts');
  content = `export * from './src/index'\nexport { default } from './src/index'`;
  fs.writeFileSync(dtsPath, content);
  console.log('Fixed dist/index.d.ts');
} else {
  console.log('dist/index.d.ts is already clean');
}