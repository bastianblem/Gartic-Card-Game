<template>
  <div
    class="flex flex-col items-center gap-4 w-full max-w-2xl bg-slate-800 p-4 rounded-2xl border border-slate-700 shadow-xl"
  >
    <!-- Toolkit bar -->
    <div
      class="flex flex-wrap items-center justify-between w-full border-b border-slate-700 pb-3 gap-3"
    >
      <!-- Color palette -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="color in PALETTE"
          :key="color.value"
          @click="setMode('draw', color.value)"
          :style="{ backgroundColor: color.value }"
          :title="color.name"
          class="w-8 h-8 rounded-full border-2 transition-transform duration-150 hover:scale-110 active:scale-95"
          :class="
            currentMode === 'draw' && currentStrokeColor === color.value
              ? 'border-white scale-110 shadow-lg'
              : 'border-slate-900'
          "
        />
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Eraser -->
        <button
          @click="setMode('erase')"
          class="p-2 border rounded-lg text-sm font-medium transition-all duration-150 flex items-center"
          :class="
            currentMode === 'erase'
              ? 'bg-brand-primary border-brand-primary text-white shadow-glow-indigo'
              : 'bg-slate-700 border-transparent hover:bg-slate-600'
          "
          title="Radiergummi"
        >
          <Icon name="lucide:eraser" class="w-5 h-5" />
        </button>

        <!-- Filling Bucket -->
        <button
          @click="fillCanvas"
          class="p-2 bg-slate-700 hover:bg-slate-600 border border-transparent rounded-lg text-sm font-medium transition-colors flex items-center"
          title="Ganzes Canvas mit aktueller Farbe füllen"
        >
          <Icon name="lucide:paint-bucket" class="w-5 h-5" />
        </button>

        <div class="w-px h-6 bg-slate-700 mx-1" />

        <!-- Delete -->
        <button
          @click="clearCanvas"
          class="px-2 py-2 bg-slate-700 hover:bg-brand-danger/70 border border-transparent rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
        >
          <Icon name="lucide:trash-2" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Canvas -->
    <div
      class="relative w-full aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-900"
    >
      <canvas
        ref="canvasRef"
        @mousedown="startDrawing"
        @mousemove="draw"
        @mouseup="stopDrawing"
        @mouseleave="stopDrawing"
        class="absolute top-0 left-0 w-full h-full cursor-crosshair touch-none"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const PALETTE = [
  { name: "Cyber Indigo", value: "#6366f1" },
  { name: "Neon Cyan", value: "#00f5ff" },
  { name: "Neon Green", value: "#39ff14" },
  { name: "Neon Pink", value: "#ff007f" },
  { name: "Vibrant Yellow", value: "#facc15" },
  { name: "Vibrant Orange", value: "#f97316" },
  { name: "Pure White", value: "#ffffff" },
  { name: "Dark Slate", value: "#1e294b" },
];

type ToolMode = "draw" | "erase";

// States
const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
const isDrawing = ref(false);

const currentMode = ref<ToolMode>("draw");
const currentStrokeColor = ref("#6366f1"); // Starting Color
const canvasBgColor = ref("#020617"); // BG Color of the canvas
const lineWidth = 6;

let lastX = 0;
let lastY = 0;

onMounted(() => {
  if (!canvasRef.value) return;
  ctx = canvasRef.value.getContext("2d");
  if (!ctx) return;

  resizeCanvas();
});

const resizeCanvas = () => {
  if (!canvasRef.value || !ctx) return;
  const rect = canvasRef.value.getBoundingClientRect();
  canvasRef.value.width = rect.width;
  canvasRef.value.height = rect.height;
  applyLineStyles();
};

const applyLineStyles = () => {
  if (!ctx) return;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
};

// Changes the mode between drawing/erasing
const setMode = (mode: ToolMode, color?: string) => {
  currentMode.value = mode;
  if (mode === "draw" && color) {
    currentStrokeColor.value = color;
  }
};

const getCoordinates = (event: MouseEvent) => {
  if (!canvasRef.value) return { x: 0, y: 0 };
  const rect = canvasRef.value.getBoundingClientRect();
  return {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top,
  };
};

const startDrawing = (event: MouseEvent) => {
  isDrawing.value = true;
  const { x, y } = getCoordinates(event);
  lastX = x;
  lastY = y;
};

const draw = (event: MouseEvent) => {
  if (!isDrawing.value || !ctx) return;
  const { x, y } = getCoordinates(event);

  ctx.beginPath();
  ctx.lineWidth = currentMode.value === "erase" ? 24 : lineWidth;

  if (currentMode.value === "erase") {
    ctx.globalCompositeOperation = "destination-out";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = currentStrokeColor.value;
  }

  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();

  lastX = x;
  lastY = y;
};

const stopDrawing = () => {
  isDrawing.value = false;
};

const fillCanvas = () => {
  if (!canvasRef.value || !ctx) return;

  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = currentStrokeColor.value;
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);

  canvasBgColor.value = currentStrokeColor.value;
};

const clearCanvas = () => {
  if (!canvasRef.value || !ctx) return;
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  ctx.globalCompositeOperation = "source-over";
  canvasBgColor.value = "#020617";
};
</script>
