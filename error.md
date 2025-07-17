PS D:\FaceRead> npm run dev

> faceread@0.0.0 dev
> vite


  VITE v5.4.19  ready in 1532 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
오후 4:41:06 [vite] Pre-transform error: Failed to resolve import "@/components/ui/tooltip" from "src/components/RewardScreen.tsx". Does the file exist?
오후 4:41:06 [vite] Internal server error: Failed to resolve import "@/components/ui/tooltip" from "src/components/RewardScreen.tsx". Does the file exist?
  Plugin: vite:import-analysis
  File: D:/FaceRead/src/components/RewardScreen.tsx:9:7
  24 |    TooltipProvider,
  25 |    TooltipTrigger
  26 |  } from "@/components/ui/tooltip";
     |          ^
  27 |  import {
  28 |    RotateCcw,
      at TransformPluginContext._formatError (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:49258:41)
      at TransformPluginContext.error (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:49253:16)
      at normalizeUrl (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:64291:23)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:64423:39
      at async Promise.all (index 6)
      at async TransformPluginContext.transform (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:64350:7)
      at async PluginContainer.transform (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:49099:18)
      at async loadAndTransform (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:51977:27)
      at async viteTransformMiddleware (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:62105:24)
오후 4:41:09 [vite] Internal server error: Failed to resolve import "@/components/ui/tooltip" from "src/components/RewardScreen.tsx". Does the file exist?
  Plugin: vite:import-analysis
  File: D:/FaceRead/src/components/RewardScreen.tsx:9:7
  24 |    TooltipProvider,
  25 |    TooltipTrigger
  26 |  } from "@/components/ui/tooltip";
     |          ^
  27 |  import {
  28 |    RotateCcw,
      at TransformPluginContext._formatError (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:49258:41)
      at TransformPluginContext.error (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:49253:16)
      at normalizeUrl (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:64291:23)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:64423:39
      at async Promise.all (index 6)
      at async TransformPluginContext.transform (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:64350:7)
      at async PluginContainer.transform (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:49099:18)
      at async loadAndTransform (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:51977:27)
      at async viteTransformMiddleware (file:///D:/FaceRead/node_modules/vite/dist/node/chunks/dep-C6uTJdX2.js:62105:24)