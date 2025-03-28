let lineCount = 90; // 水草數量 (調整為 90)
let lines = []; // 儲存水草的資料
let colors = ['#8ecae6', '#219ebc', '#023047', '#ffb703', '#fb8500']; // 指定的顏色系列

function setup() { // 初始值設定
  let canvas = createCanvas(windowWidth, windowHeight); // 畫布大小
  canvas.style('position', 'absolute'); // 設定畫布位置
  canvas.style('z-index', '10'); // 確保畫布在最上層
  canvas.style('pointer-events', 'none'); // 讓畫布不攔截滑鼠事件

  // 初始化水草資料
  initializeLines();

  // 創建 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw'); // 設定 iframe 的內容網址
  iframe.style('position', 'absolute');
  iframe.style('top', '10%'); // 距離視窗頂部 10%
  iframe.style('left', '10%'); // 距離視窗左側 10%
  iframe.style('width', '80%'); // 寬度為視窗的 80%
  iframe.style('height', '80%'); // 高度為視窗的 80%
  iframe.style('border', 'none'); // 移除邊框
  iframe.style('z-index', '1'); // 確保 iframe 在畫布下方
  iframe.attribute('allow', 'fullscreen'); // 允許 iframe 中的互動功能
}

function draw() { // 畫圖
  clear(); // 清除畫布，保持透明背景

  // 繪製每條水草
  for (let i = 0; i < lines.length; i++) {
    drawWavingLine(lines[i]);
  }
}

function drawWavingLine(line) {
  stroke(line.color); // 設定水草顏色
  strokeWeight(line.thickness); // 設定水草粗細
  strokeJoin(ROUND); // 平滑連接點，避免交界處顏色加深
  noFill(); // 無填充

  beginShape();
  for (let y = height; y > height - line.height; y -= 10) {
    let offsetX = sin(frameCount * line.frequency + y * 0.05) * map(y, height - line.height, height, 20, 0); // 調整搖擺幅度
    vertex(line.x + offsetX, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布大小隨視窗大小改變
  initializeLines(); // 重新初始化水草資料
}

function initializeLines() {
  lines = []; // 清空水草資料
  for (let i = 0; i < lineCount; i++) {
    let baseColor = color(random(colors)); // 從顏色系列中隨機選擇顏色
    baseColor.setAlpha(random(50, 150)); // 設定透明度
    lines.push({
      x: random(width), // 水草的水平位置
      height: random(150, 300), // 水草的高度 (調整為 150 到 300)
      color: baseColor, // 設定顏色並添加透明度
      thickness: random(20, 40), // 水草的粗細 (調整為 20 到 40)
      frequency: random(0.01, 0.05), // 水草搖晃的頻率
    });
  }
}