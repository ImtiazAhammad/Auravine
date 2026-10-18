(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ClickSpark.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const ClickSpark = ({ sparkColor = '#fff', sparkSize = 10, sparkRadius = 15, sparkCount = 8, duration = 400, easing = 'ease-out', extraScale = 1.0, children })=>{
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const sparksRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const startTimeRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClickSpark.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const parent = canvas.parentElement;
            if (!parent) return;
            let resizeTimeout;
            const resizeCanvas = {
                "ClickSpark.useEffect.resizeCanvas": ()=>{
                    const { width, height } = parent.getBoundingClientRect();
                    if (canvas.width !== width || canvas.height !== height) {
                        canvas.width = width;
                        canvas.height = height;
                    }
                }
            }["ClickSpark.useEffect.resizeCanvas"];
            const handleResize = {
                "ClickSpark.useEffect.handleResize": ()=>{
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(resizeCanvas, 100);
                }
            }["ClickSpark.useEffect.handleResize"];
            const ro = new ResizeObserver(handleResize);
            ro.observe(parent);
            resizeCanvas();
            return ({
                "ClickSpark.useEffect": ()=>{
                    ro.disconnect();
                    clearTimeout(resizeTimeout);
                }
            })["ClickSpark.useEffect"];
        }
    }["ClickSpark.useEffect"], []);
    const easeFunc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClickSpark.useCallback[easeFunc]": (t)=>{
            switch(easing){
                case 'linear':
                    return t;
                case 'ease-in':
                    return t * t;
                case 'ease-in-out':
                    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                default:
                    return t * (2 - t);
            }
        }
    }["ClickSpark.useCallback[easeFunc]"], [
        easing
    ]);
    const isAnimatingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const animationIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const draw = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ClickSpark.useCallback[draw]": (timestamp)=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            sparksRef.current = sparksRef.current.filter({
                "ClickSpark.useCallback[draw]": (spark)=>{
                    const elapsed = timestamp - spark.startTime;
                    if (elapsed >= duration) return false;
                    const progress = elapsed / duration;
                    const eased = easeFunc(progress);
                    const distance = eased * sparkRadius * extraScale;
                    const lineLength = sparkSize * (1 - eased);
                    const x1 = spark.x + distance * Math.cos(spark.angle);
                    const y1 = spark.y + distance * Math.sin(spark.angle);
                    const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
                    const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);
                    ctx.strokeStyle = sparkColor;
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                    return true;
                }
            }["ClickSpark.useCallback[draw]"]);
            if (sparksRef.current.length > 0) {
                animationIdRef.current = requestAnimationFrame(draw);
            } else {
                isAnimatingRef.current = false;
                animationIdRef.current = null;
            }
        }
    }["ClickSpark.useCallback[draw]"], [
        duration,
        easeFunc,
        extraScale,
        sparkColor,
        sparkRadius,
        sparkSize
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClickSpark.useEffect": ()=>{
            return ({
                "ClickSpark.useEffect": ()=>{
                    if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current);
                }
            })["ClickSpark.useEffect"];
        }
    }["ClickSpark.useEffect"], []);
    const handleClick = (e)=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const now = performance.now();
        const newSparks = Array.from({
            length: sparkCount
        }, (_, i)=>({
                x,
                y,
                angle: 2 * Math.PI * i / sparkCount,
                startTime: now
            }));
        sparksRef.current.push(...newSparks);
        if (!isAnimatingRef.current) {
            isAnimatingRef.current = true;
            animationIdRef.current = requestAnimationFrame(draw);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative w-full h-full",
        onClick: handleClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "absolute inset-0 pointer-events-none z-[9999]"
            }, void 0, false, {
                fileName: "[project]/src/components/ClickSpark.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ClickSpark.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ClickSpark, "txyI8pvBc7EplUDG1ctU+CTdNGc=");
_c = ClickSpark;
const __TURBOPACK__default__export__ = ClickSpark;
var _c;
__turbopack_context__.k.register(_c, "ClickSpark");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/ArcPreloaderWrapper.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArcPreloaderWrapper",
    ()=>ArcPreloaderWrapper
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$arc$2d$preloader$2d$hero$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/arc-preloader-hero.tsx [app-client] (ecmascript)");
"use client";
;
;
function ArcPreloaderWrapper({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$arc$2d$preloader$2d$hero$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ArcRevealHero"], {
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/layout/ArcPreloaderWrapper.tsx",
        lineNumber: 8,
        columnNumber: 9
    }, this);
}
_c = ArcPreloaderWrapper;
var _c;
__turbopack_context__.k.register(_c, "ArcPreloaderWrapper");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/ChatBot.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ChatBot",
    ()=>ChatBot
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-2.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/alert-circle.js [app-client] (ecmascript) <export default as AlertCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/maximize-2.js [app-client] (ecmascript) <export default as Maximize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minimize-2.js [app-client] (ecmascript) <export default as Minimize2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/portfolio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/use-intl/dist/esm/development/react.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
// ─── Helpers ──────────────────────────────────────────────────────────────────
function generateId() {
    return Math.random().toString(36).slice(2, 11);
}
function formatTime(date) {
    return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}
// ─── Markdown renderer (simple, no external deps) ─────────────────────────────
function SimpleMarkdown({ text }) {
    const lines = text.split("\n");
    const elements = [];
    let i = 0;
    let k = 0; // Separate key counter — always unique regardless of i's position
    while(i < lines.length){
        const line = lines[i];
        // Empty line → spacing
        if (line.trim() === "") {
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-2"
            }, k++, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 52,
                columnNumber: 27
            }, this));
            i++;
            continue;
        }
        // Heading ##
        if (line.startsWith("## ")) {
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-semibold text-sm mt-2 mb-1",
                children: inlineFormat(line.slice(3))
            }, k++, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 60,
                columnNumber: 17
            }, this));
            i++;
            continue;
        }
        // Heading #
        if (line.startsWith("# ")) {
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-bold text-sm mt-2 mb-1",
                children: inlineFormat(line.slice(2))
            }, k++, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 71,
                columnNumber: 17
            }, this));
            i++;
            continue;
        }
        // Bullet list
        if (line.match(/^[-*•] /)) {
            const items = [];
            while(i < lines.length && lines[i].match(/^[-*•] /)){
                items.push(lines[i].replace(/^[-*•] /, ""));
                i++;
            }
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "list-disc list-inside space-y-0.5 my-1",
                children: items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "text-sm leading-relaxed",
                        children: inlineFormat(item)
                    }, idx, false, {
                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                        lineNumber: 89,
                        columnNumber: 25
                    }, this))
            }, k++, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 87,
                columnNumber: 17
            }, this));
            continue;
        }
        // Numbered list
        if (line.match(/^\d+\. /)) {
            const items = [];
            while(i < lines.length && lines[i].match(/^\d+\. /)){
                items.push(lines[i].replace(/^\d+\. /, ""));
                i++;
            }
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ol", {
                className: "list-decimal list-inside space-y-0.5 my-1",
                children: items.map((item, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                        className: "text-sm leading-relaxed",
                        children: inlineFormat(item)
                    }, idx, false, {
                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                        lineNumber: 108,
                        columnNumber: 25
                    }, this))
            }, k++, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 106,
                columnNumber: 17
            }, this));
            continue;
        }
        // Regular paragraph
        elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm leading-relaxed",
            children: inlineFormat(line)
        }, k++, false, {
            fileName: "[project]/src/components/layout/ChatBot.tsx",
            lineNumber: 119,
            columnNumber: 13
        }, this));
        i++;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-1",
        children: elements
    }, void 0, false, {
        fileName: "[project]/src/components/layout/ChatBot.tsx",
        lineNumber: 126,
        columnNumber: 12
    }, this);
}
_c = SimpleMarkdown;
function inlineFormat(text) {
    // Bold (**text**), italic (*text*), code (`code`), links [text](url)
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);
    return parts.map((part, idx)=>{
        if (part.startsWith("**") && part.endsWith("**")) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                children: part.slice(2, -2)
            }, idx, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 134,
                columnNumber: 20
            }, this);
        }
        if (part.startsWith("*") && part.endsWith("*")) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                children: part.slice(1, -1)
            }, idx, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 137,
                columnNumber: 20
            }, this);
        }
        if (part.startsWith("`") && part.endsWith("`")) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("code", {
                className: "px-1 py-0.5 rounded text-xs font-mono bg-foreground/10",
                children: part.slice(1, -1)
            }, idx, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 141,
                columnNumber: 17
            }, this);
        }
        const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (linkMatch) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                href: linkMatch[2],
                target: "_blank",
                rel: "noopener noreferrer",
                className: "underline underline-offset-2 hover:opacity-80",
                children: linkMatch[1]
            }, idx, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 149,
                columnNumber: 17
            }, this);
        }
        return part;
    });
}
// ─── Suggested questions moved into component for i18n ───
// ─── Message bubble ───────────────────────────────────────────────────────────
const MessageBubble = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].memo(_s(function MessageBubble({ message, onRetry }) {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])("chatbot");
    const isUser = message.role === "user";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 8,
            scale: 0.97
        },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        transition: {
            duration: 0.2
        },
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex gap-2.5 w-full", isUser ? "flex-row-reverse" : "flex-row"),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center mt-0.5", isUser ? "bg-primary/20 border border-primary/30" : "bg-foreground/10 border border-foreground/10"),
                children: isUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                    className: "w-3.5 h-3.5 text-primary"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/ChatBot.tsx",
                    lineNumber: 194,
                    columnNumber: 21
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                    className: "w-3.5 h-3.5 text-foreground/70"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/ChatBot.tsx",
                    lineNumber: 196,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 185,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col gap-1 max-w-[82%]", isUser ? "items-end" : "items-start"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("px-3.5 py-2.5 rounded-2xl break-words", isUser ? "bg-primary text-primary-foreground rounded-tr-sm" : message.error ? "bg-destructive/10 border border-destructive/20 text-destructive rounded-tl-sm" : "bg-foreground/8 border border-foreground/8 text-foreground rounded-tl-sm"),
                        children: isUser ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm leading-relaxed whitespace-pre-wrap",
                            children: message.content
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                            lineNumber: 213,
                            columnNumber: 25
                        }, this) : message.error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                            className: "w-3.5 h-3.5 flex-shrink-0"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                                            lineNumber: 217,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm",
                                            children: message.content
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                                            lineNumber: 218,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/ChatBot.tsx",
                                    lineNumber: 216,
                                    columnNumber: 29
                                }, this),
                                onRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: onRetry,
                                    className: "flex items-center gap-1 text-xs underline underline-offset-2 hover:opacity-80 w-fit",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                            className: "w-3 h-3"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                                            lineNumber: 225,
                                            columnNumber: 37
                                        }, this),
                                        t("retry")
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/ChatBot.tsx",
                                    lineNumber: 221,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                            lineNumber: 215,
                            columnNumber: 25
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SimpleMarkdown, {
                            text: message.content
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                            lineNumber: 231,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                        lineNumber: 202,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-[10px] text-foreground/40 px-1",
                        children: formatTime(message.timestamp)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                        lineNumber: 234,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 201,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/ChatBot.tsx",
        lineNumber: 178,
        columnNumber: 9
    }, this);
}, "h6+q2O3NJKPY5uL0BIJGLIanww8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
}));
_c1 = MessageBubble;
// ─── Typing indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 6
        },
        animate: {
            opacity: 1,
            y: 0
        },
        exit: {
            opacity: 0,
            y: 6
        },
        className: "flex gap-2.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-shrink-0 w-7 h-7 rounded-full bg-foreground/10 border border-foreground/10 flex items-center justify-center mt-0.5",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                    className: "w-3.5 h-3.5 text-foreground/70"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/ChatBot.tsx",
                    lineNumber: 250,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 249,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3.5 py-3 rounded-2xl rounded-tl-sm bg-foreground/8 border border-foreground/8",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex gap-1 items-center h-3",
                    children: [
                        0,
                        1,
                        2
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                            className: "w-1.5 h-1.5 rounded-full bg-foreground/40",
                            animate: {
                                y: [
                                    0,
                                    -4,
                                    0
                                ]
                            },
                            transition: {
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.15,
                                ease: "easeInOut"
                            }
                        }, i, false, {
                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                            lineNumber: 255,
                            columnNumber: 25
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/ChatBot.tsx",
                    lineNumber: 253,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 252,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/ChatBot.tsx",
        lineNumber: 243,
        columnNumber: 9
    }, this);
}
_c2 = TypingIndicator;
// ─── ChatWindow ───────────────────────────────────────────────────────────────
function ChatWindow({ onClose, origin }) {
    _s1();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])("chatbot");
    const locale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"])();
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ChatWindow.useState": ()=>{
            if ("TURBOPACK compile-time truthy", 1) {
                try {
                    const saved = sessionStorage.getItem("portfolio-chat-messages");
                    if (saved) {
                        const parsed = JSON.parse(saved);
                        return parsed.map({
                            "ChatWindow.useState": (m)=>({
                                    ...m,
                                    timestamp: new Date(m.timestamp)
                                })
                        }["ChatWindow.useState"]);
                    }
                } catch (e) {
                // ignore parsing errors
                }
            }
            return [
                {
                    id: generateId(),
                    role: "assistant",
                    content: t("greeting", {
                        name: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portfolioData"].personal.name
                    }),
                    timestamp: new Date()
                }
            ];
        }
    }["ChatWindow.useState"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            if (messages.length > 0) {
                sessionStorage.setItem("portfolio-chat-messages", JSON.stringify(messages));
            }
        }
    }["ChatWindow.useEffect"], [
        messages
    ]);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showScrollBtn, setShowScrollBtn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastUserMessage, setLastUserMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scrollContainerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const abortControllerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Auto-scroll to bottom
    const scrollToBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatWindow.useCallback[scrollToBottom]": (smooth = true)=>{
            messagesEndRef.current?.scrollIntoView({
                behavior: smooth ? "smooth" : "instant"
            });
        }
    }["ChatWindow.useCallback[scrollToBottom]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            scrollToBottom();
        }
    }["ChatWindow.useEffect"], [
        messages,
        isLoading,
        scrollToBottom
    ]);
    // Show scroll-to-bottom button when not at bottom
    const handleScroll = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatWindow.useCallback[handleScroll]": ()=>{
            const el = scrollContainerRef.current;
            if (!el) return;
            const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
            setShowScrollBtn(distFromBottom > 60);
        }
    }["ChatWindow.useCallback[handleScroll]"], []);
    // Focus input on open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            const timer = setTimeout({
                "ChatWindow.useEffect.timer": ()=>inputRef.current?.focus()
            }["ChatWindow.useEffect.timer"], 100);
            return ({
                "ChatWindow.useEffect": ()=>clearTimeout(timer)
            })["ChatWindow.useEffect"];
        }
    }["ChatWindow.useEffect"], []);
    // Cleanup abort controller on unmount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatWindow.useEffect": ()=>{
            return ({
                "ChatWindow.useEffect": ()=>{
                    abortControllerRef.current?.abort();
                }
            })["ChatWindow.useEffect"];
        }
    }["ChatWindow.useEffect"], []);
    const sendMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatWindow.useCallback[sendMessage]": async (text)=>{
            const trimmed = text.trim();
            if (!trimmed || isLoading) return;
            setLastUserMessage(trimmed);
            setInput("");
            const userMsg = {
                id: generateId(),
                role: "user",
                content: trimmed,
                timestamp: new Date()
            };
            setMessages({
                "ChatWindow.useCallback[sendMessage]": (prev)=>[
                        ...prev,
                        userMsg
                    ]
            }["ChatWindow.useCallback[sendMessage]"]);
            setIsLoading(true);
            // Build messages array for API (exclude error messages)
            const apiMessages = [
                ...messages,
                userMsg
            ].filter({
                "ChatWindow.useCallback[sendMessage].apiMessages": (m)=>!m.error
            }["ChatWindow.useCallback[sendMessage].apiMessages"]).map({
                "ChatWindow.useCallback[sendMessage].apiMessages": ({ role, content })=>({
                        role,
                        content
                    })
            }["ChatWindow.useCallback[sendMessage].apiMessages"]);
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();
            try {
                const res = await fetch("/api/chat", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        messages: apiMessages,
                        locale
                    }),
                    signal: abortControllerRef.current.signal
                });
                if (!res.ok) {
                    let errorMessage = t("error");
                    try {
                        const errData = await res.json();
                        errorMessage = errData?.error ?? errorMessage;
                    } catch  {
                    // ignore JSON parse errors
                    }
                    throw new Error(errorMessage);
                }
                const data = await res.json();
                const reply = data?.reply;
                if (!reply || typeof reply !== "string") {
                    throw new Error(t("invalidResponse"));
                }
                setMessages({
                    "ChatWindow.useCallback[sendMessage]": (prev)=>[
                            ...prev,
                            {
                                id: generateId(),
                                role: "assistant",
                                content: reply,
                                timestamp: new Date()
                            }
                        ]
                }["ChatWindow.useCallback[sendMessage]"]);
            } catch (err) {
                if (err instanceof Error && err.name === "AbortError") return;
                const errorMsg = err instanceof Error ? err.message : t("unknownError");
                setMessages({
                    "ChatWindow.useCallback[sendMessage]": (prev)=>[
                            ...prev,
                            {
                                id: generateId(),
                                role: "assistant",
                                content: errorMsg,
                                timestamp: new Date(),
                                error: true
                            }
                        ]
                }["ChatWindow.useCallback[sendMessage]"]);
            } finally{
                setIsLoading(false);
            }
        }
    }["ChatWindow.useCallback[sendMessage]"], [
        messages,
        isLoading
    ]);
    const handleRetry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatWindow.useCallback[handleRetry]": ()=>{
            if (!lastUserMessage) return;
            // Remove last error message
            setMessages({
                "ChatWindow.useCallback[handleRetry]": (prev)=>{
                    const last = prev[prev.length - 1];
                    if (last?.error) return prev.slice(0, -1);
                    return prev;
                }
            }["ChatWindow.useCallback[handleRetry]"]);
            sendMessage(lastUserMessage);
        }
    }["ChatWindow.useCallback[handleRetry]"], [
        lastUserMessage,
        sendMessage
    ]);
    const handleKeyDown = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatWindow.useCallback[handleKeyDown]": (e)=>{
            if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
            }
        }
    }["ChatWindow.useCallback[handleKeyDown]"], [
        input,
        sendMessage
    ]);
    // Auto-resize textarea
    const handleInputChange = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatWindow.useCallback[handleInputChange]": (e)=>{
            setInput(e.target.value);
            const el = e.target;
            el.style.height = "auto";
            el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
        }
    }["ChatWindow.useCallback[handleInputChange]"], []);
    const SUGGESTED_QUESTIONS = t.raw("suggestions");
    const showSuggestions = messages.length <= 1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-40",
                onClick: onClose,
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 475,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: origin ? {
                    opacity: 0,
                    scale: 0,
                    x: "-50%",
                    y: "-50%"
                } : {
                    opacity: 0,
                    scale: 0.92,
                    y: 16
                },
                animate: origin ? {
                    opacity: 1,
                    scale: 1,
                    x: "-50%",
                    y: "-50%"
                } : {
                    opacity: 1,
                    scale: 1,
                    y: 0
                },
                exit: origin ? {
                    opacity: 0,
                    scale: 0,
                    x: "-50%",
                    y: "-50%"
                } : {
                    opacity: 0,
                    scale: 0.92,
                    y: 16
                },
                transition: {
                    type: "spring",
                    damping: 25,
                    stiffness: 300
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed z-50 flex flex-col", origin ? "top-1/2 left-1/2" : isExpanded ? "bottom-4 sm:bottom-12 right-4 sm:right-12" : "bottom-24 right-4 md:right-16", isExpanded ? "w-[calc(100vw-2rem)] sm:w-[600px] md:w-[700px] lg:w-[800px] h-[calc(100vh-2rem)] sm:h-[80vh] max-h-[800px]" : "w-[calc(100vw-2rem)] sm:w-[420px] h-[600px] max-h-[85vh]", "rounded-2xl shadow-2xl overflow-hidden", "bg-background border border-foreground/10", "backdrop-blur-xl transition-all duration-300 ease-in-out"),
                style: origin ? {
                    transformOrigin: "center"
                } : {
                    maxWidth: isExpanded ? "800px" : "420px",
                    transformOrigin: "bottom right"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between px-4 py-3 border-b border-foreground/8 bg-foreground/3 flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-8 h-8 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                    className: "w-4 h-4 text-primary"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/ChatBot.tsx",
                                                    lineNumber: 504,
                                                    columnNumber: 33
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/ChatBot.tsx",
                                                lineNumber: 503,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-background"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/ChatBot.tsx",
                                                lineNumber: 506,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                                        lineNumber: 502,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-semibold leading-none",
                                                children: t("title")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/ChatBot.tsx",
                                                lineNumber: 509,
                                                columnNumber: 29
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-foreground/50 mt-0.5",
                                                children: t("subtitle")
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/ChatBot.tsx",
                                                lineNumber: 510,
                                                columnNumber: 29
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                                        lineNumber: 508,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/ChatBot.tsx",
                                lineNumber: 501,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setIsExpanded(!isExpanded),
                                        className: "w-7 h-7 rounded-full flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/8 transition-colors",
                                        "aria-label": isExpanded ? "Collapse" : "Expand",
                                        children: isExpanded ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minimize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minimize2$3e$__["Minimize2"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                                            lineNumber: 521,
                                            columnNumber: 43
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$maximize$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Maximize2$3e$__["Maximize2"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                                            lineNumber: 521,
                                            columnNumber: 79
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                                        lineNumber: 516,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onClose,
                                        className: "w-7 h-7 rounded-full flex items-center justify-center text-foreground/50 hover:text-foreground hover:bg-foreground/8 transition-colors",
                                        "aria-label": t("close"),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                                            lineNumber: 528,
                                            columnNumber: 29
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                                        lineNumber: 523,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/ChatBot.tsx",
                                lineNumber: 515,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                        lineNumber: 500,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: scrollContainerRef,
                        onScroll: handleScroll,
                        "data-lenis-prevent": true,
                        className: "flex-1 overflow-y-auto px-3.5 py-4 space-y-4 scrollbar-thin scrollbar-thumb-foreground/10 scrollbar-track-transparent",
                        children: [
                            messages.map((msg, idx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MessageBubble, {
                                    message: msg,
                                    onRetry: msg.error && idx === messages.length - 1 ? handleRetry : undefined
                                }, msg.id, false, {
                                    fileName: "[project]/src/components/layout/ChatBot.tsx",
                                    lineNumber: 541,
                                    columnNumber: 25
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TypingIndicator, {}, void 0, false, {
                                    fileName: "[project]/src/components/layout/ChatBot.tsx",
                                    lineNumber: 549,
                                    columnNumber: 39
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/ChatBot.tsx",
                                lineNumber: 548,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: showSuggestions && !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 6
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: 6
                                    },
                                    className: "flex flex-wrap gap-2 pt-1",
                                    children: SUGGESTED_QUESTIONS.map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>sendMessage(q),
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs px-3 py-1.5 rounded-full border transition-all", "bg-foreground/5 border-foreground/10 text-foreground/70", "hover:bg-primary/10 hover:border-primary/30 hover:text-foreground", "active:scale-95"),
                                            children: q
                                        }, q, false, {
                                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                                            lineNumber: 562,
                                            columnNumber: 37
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/ChatBot.tsx",
                                    lineNumber: 555,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/ChatBot.tsx",
                                lineNumber: 553,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: messagesEndRef
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/ChatBot.tsx",
                                lineNumber: 579,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                        lineNumber: 534,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                        children: showScrollBtn && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                            initial: {
                                opacity: 0,
                                scale: 0.8
                            },
                            animate: {
                                opacity: 1,
                                scale: 1
                            },
                            exit: {
                                opacity: 0,
                                scale: 0.8
                            },
                            onClick: ()=>scrollToBottom(),
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute right-3 bottom-20 z-10", "w-7 h-7 rounded-full flex items-center justify-center", "bg-background border border-foreground/15 shadow-md", "text-foreground/60 hover:text-foreground transition-colors"),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                className: "w-3.5 h-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/ChatBot.tsx",
                                lineNumber: 597,
                                columnNumber: 29
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                            lineNumber: 585,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                        lineNumber: 583,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-shrink-0 px-3.5 py-3 border-t border-foreground/8 bg-foreground/2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-end gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        ref: inputRef,
                                        "data-lenis-prevent": true,
                                        value: input,
                                        onChange: handleInputChange,
                                        onKeyDown: handleKeyDown,
                                        disabled: isLoading,
                                        placeholder: t("placeholder"),
                                        rows: 1,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-1 resize-none rounded-xl px-3.5 py-2.5 text-sm", "bg-foreground/5 border border-foreground/10", "placeholder:text-foreground/35 text-foreground", "focus:outline-none focus:border-primary/40 focus:bg-foreground/7", "transition-colors disabled:opacity-50", "min-h-[40px] max-h-[120px] leading-relaxed"),
                                        style: {
                                            height: "40px"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                                        lineNumber: 605,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>sendMessage(input),
                                        disabled: isLoading || !input.trim(),
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center", "bg-primary text-primary-foreground", "transition-all active:scale-95", "disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100", "hover:opacity-90"),
                                        "aria-label": "Send message",
                                        children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                            className: "w-4 h-4 animate-spin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                                            lineNumber: 637,
                                            columnNumber: 33
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/ChatBot.tsx",
                                            lineNumber: 639,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                                        lineNumber: 624,
                                        columnNumber: 25
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/ChatBot.tsx",
                                lineNumber: 604,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[10px] text-foreground/30 mt-1.5 text-center",
                                children: t("inputHint")
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/ChatBot.tsx",
                                lineNumber: 643,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                        lineNumber: 603,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 480,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/ChatBot.tsx",
        lineNumber: 473,
        columnNumber: 9
    }, this);
}
_s1(ChatWindow, "o3zIZ3tnwW9qlka0+ibvZEnmrd0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$use$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocale"]
    ];
});
_c3 = ChatWindow;
function ChatBot({ headless = false }) {
    _s2();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [hasNewMsg, setHasNewMsg] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [origin, setOrigin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const toggle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatBot.useCallback[toggle]": ()=>{
            setOrigin(null);
            setIsOpen({
                "ChatBot.useCallback[toggle]": (prev)=>!prev
            }["ChatBot.useCallback[toggle]"]);
            setHasNewMsg(false);
        }
    }["ChatBot.useCallback[toggle]"], []);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatBot.useCallback[close]": ()=>setIsOpen(false)
    }["ChatBot.useCallback[close]"], []);
    // Close on Escape key
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatBot.useEffect": ()=>{
            const handleKeyDown = {
                "ChatBot.useEffect.handleKeyDown": (e)=>{
                    if (e.key === "Escape" && isOpen) close();
                }
            }["ChatBot.useEffect.handleKeyDown"];
            window.addEventListener("keydown", handleKeyDown);
            return ({
                "ChatBot.useEffect": ()=>window.removeEventListener("keydown", handleKeyDown)
            })["ChatBot.useEffect"];
        }
    }["ChatBot.useEffect"], [
        isOpen,
        close
    ]);
    // Listen for external toggle events (e.g. from Footer)
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatBot.useEffect": ()=>{
            const handleToggle = {
                "ChatBot.useEffect.handleToggle": (e)=>{
                    const customEvent = e;
                    if (customEvent.detail && typeof customEvent.detail.x === 'number') {
                        setOrigin({
                            x: customEvent.detail.x,
                            y: customEvent.detail.y
                        });
                    } else {
                        setOrigin(null);
                    }
                    setIsOpen(true);
                }
            }["ChatBot.useEffect.handleToggle"];
            window.addEventListener("portfolio:toggle-chatbot", handleToggle);
            return ({
                "ChatBot.useEffect": ()=>window.removeEventListener("portfolio:toggle-chatbot", handleToggle)
            })["ChatBot.useEffect"];
        }
    }["ChatBot.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ChatWindow, {
                    onClose: close,
                    origin: origin
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/ChatBot.tsx",
                    lineNumber: 693,
                    columnNumber: 41
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 693,
                columnNumber: 13
            }, this),
            !headless && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                onClick: toggle,
                whileHover: {
                    scale: 1.1
                },
                whileTap: {
                    scale: 0.95
                },
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative p-3 rounded-full transition-all group", "border border-foreground/10", isOpen ? "bg-primary/20 border-primary/40" : "bg-foreground/5 hover:bg-foreground/10"),
                "aria-label": "Open portfolio chatbot",
                "aria-expanded": isOpen,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-5 h-5 transition-colors", isOpen ? "text-primary" : "text-foreground/60 group-hover:text-foreground")
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                        lineNumber: 711,
                        columnNumber: 21
                    }, this),
                    hasNewMsg && !isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        initial: {
                            scale: 0
                        },
                        animate: {
                            scale: 1
                        },
                        className: "absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                        lineNumber: 721,
                        columnNumber: 25
                    }, this),
                    !isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                        className: "absolute inset-0 rounded-full border border-primary/30",
                        animate: {
                            scale: [
                                1,
                                1.3,
                                1
                            ],
                            opacity: [
                                0.4,
                                0,
                                0.4
                            ]
                        },
                        transition: {
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/ChatBot.tsx",
                        lineNumber: 729,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/ChatBot.tsx",
                lineNumber: 697,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/ChatBot.tsx",
        lineNumber: 691,
        columnNumber: 9
    }, this);
}
_s2(ChatBot, "8U3FBnCtiZ6nXdpcQJG5R/nSp58=");
_c4 = ChatBot;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "SimpleMarkdown");
__turbopack_context__.k.register(_c1, "MessageBubble");
__turbopack_context__.k.register(_c2, "TypingIndicator");
__turbopack_context__.k.register(_c3, "ChatWindow");
__turbopack_context__.k.register(_c4, "ChatBot");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/ConditionalNavigation.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ConditionalNavigation",
    ()=>ConditionalNavigation
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/layout/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Footer.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BackToTop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/BackToTop.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function ConditionalNavigation({ children }) {
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ConditionalNavigation.useEffect": ()=>{
            setMounted(true);
        }
    }["ConditionalNavigation.useEffect"], []);
    const segments = pathname?.split('/').filter(Boolean) || [];
    const projectsIndex = segments.indexOf('projects');
    const isProjectDetail = projectsIndex !== -1 && segments.length > projectsIndex + 1;
    const blogIndex = segments.indexOf('blog');
    const isBlogDetail = blogIndex !== -1 && segments.length > blogIndex + 1;
    // Default to true for SSR to match the most common initial state,
    // but only actually render the conditional logic once mounted to avoid mismatches.
    const useFullLayout = !(isProjectDetail || isBlogDetail);
    if (!mounted) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/layout/ConditionalNavigation.tsx",
            lineNumber: 27,
            columnNumber: 16
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: useFullLayout ? "relative min-h-screen flex flex-col" : "contents",
        children: [
            useFullLayout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Navbar"], {}, void 0, false, {
                fileName: "[project]/src/components/layout/ConditionalNavigation.tsx",
                lineNumber: 34,
                columnNumber: 31
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: useFullLayout ? "flex-1 relative" : "contents",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/layout/ConditionalNavigation.tsx",
                lineNumber: 35,
                columnNumber: 13
            }, this),
            useFullLayout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Footer"], {}, void 0, false, {
                fileName: "[project]/src/components/layout/ConditionalNavigation.tsx",
                lineNumber: 38,
                columnNumber: 31
            }, this),
            useFullLayout && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$BackToTop$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BackToTop"], {}, void 0, false, {
                fileName: "[project]/src/components/layout/ConditionalNavigation.tsx",
                lineNumber: 39,
                columnNumber: 31
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/ConditionalNavigation.tsx",
        lineNumber: 31,
        columnNumber: 9
    }, this);
}
_s(ConditionalNavigation, "qIOWh+H4KANmZw/Ng5wnr7tzXF0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = ConditionalNavigation;
var _c;
__turbopack_context__.k.register(_c, "ConditionalNavigation");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/Footer.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spotlight$2d$new$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/spotlight-new.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/github.js [app-client] (ecmascript) <export default as Github>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/linkedin.js [app-client] (ecmascript) <export default as Linkedin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-client] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gamepad-2.js [app-client] (ecmascript) <export default as Gamepad2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/music.js [app-client] (ecmascript) <export default as Music>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$focus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Focus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/focus.js [app-client] (ecmascript) <export default as Focus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useIsMobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/useIsMobile.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/portfolio.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const socialIcons = {
    github: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__["Github"],
    linkedin: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$linkedin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Linkedin$3e$__["Linkedin"],
    twitter: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"],
    instagram: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"],
    discord: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gamepad$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gamepad2$3e$__["Gamepad2"],
    spotify: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$music$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Music$3e$__["Music"]
};
const marqueeKeys = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5'
];
function Marquee() {
    _s();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('footer.marquee');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex overflow-hidden py-4 bg-zinc-50 dark:bg-black border-y border-zinc-200 dark:border-white/10 backdrop-blur-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: "flex gap-12 whitespace-nowrap",
                animate: {
                    x: [
                        0,
                        -1000
                    ]
                },
                transition: {
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                },
                children: [
                    ...marqueeKeys,
                    ...marqueeKeys,
                    ...marqueeKeys
                ].map((key, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 text-sm font-mono tracking-widest uppercase text-muted-foreground/80",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t(key)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Footer.tsx",
                                lineNumber: 55,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-1.5 h-1.5 rounded-full bg-primary/50"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Footer.tsx",
                                lineNumber: 56,
                                columnNumber: 25
                            }, this)
                        ]
                    }, i, true, {
                        fileName: "[project]/src/components/layout/Footer.tsx",
                        lineNumber: 54,
                        columnNumber: 21
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 48,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 61,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 62,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 47,
        columnNumber: 9
    }, this);
}
_s(Marquee, "h6+q2O3NJKPY5uL0BIJGLIanww8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
_c = Marquee;
function SocialCard({ social }) {
    const Icon = socialIcons[social.icon] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__["Github"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
        href: social.url,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "group relative flex items-center gap-2 px-4 h-11 md:h-12 transition-all duration-300 rounded-full border border-white/5 bg-secondary/30 hover:bg-secondary/50 backdrop-blur-sm shadow-sm",
        whileHover: {
            y: -4,
            scale: 1.05
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: "w-7 h-7 text-muted-foreground group-hover:text-primary transition-colors duration-300"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 80,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-sm md:text-base font-bold tracking-wide text-muted-foreground group-hover:text-foreground transition-colors",
                children: social.platform
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 81,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/5 transition-all duration-300"
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 83,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 73,
        columnNumber: 9
    }, this);
}
_c1 = SocialCard;
function Footer() {
    _s1();
    const { theme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const tNav = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('navigation');
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('footer');
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAboutExpanded, setIsAboutExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isEmailHovered, setIsEmailHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [copyrightIndex, setCopyrightIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [localTime, setLocalTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Footer.useEffect": ()=>{
            const updateTime = {
                "Footer.useEffect.updateTime": ()=>{
                    const now = new Date();
                    const options = {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                        timeZone: 'Asia/Jakarta'
                    };
                    const timeString = new Intl.DateTimeFormat('en-US', options).format(now);
                    // Jakarta is UTC+7
                    setLocalTime(`${timeString} UTC+7`);
                }
            }["Footer.useEffect.updateTime"];
            updateTime();
            const interval = setInterval(updateTime, 60000);
            return ({
                "Footer.useEffect": ()=>clearInterval(interval)
            })["Footer.useEffect"];
        }
    }["Footer.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Footer.useEffect": ()=>{
            setMounted(true);
            const interval = setInterval({
                "Footer.useEffect.interval": ()=>{
                    setCopyrightIndex({
                        "Footer.useEffect.interval": (prev)=>(prev + 1) % 2
                    }["Footer.useEffect.interval"]);
                }
            }["Footer.useEffect.interval"], 2500); // Trigger every 2.5s
            return ({
                "Footer.useEffect": ()=>clearInterval(interval)
            })["Footer.useEffect"];
        }
    }["Footer.useEffect"], []);
    const currentYear = new Date().getFullYear();
    // Lock body scroll when footer is expanded
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Footer.useEffect": ()=>{
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            return ({
                "Footer.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["Footer.useEffect"];
        }
    }["Footer.useEffect"], [
        isExpanded
    ]);
    const toggleExpand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Footer.useCallback[toggleExpand]": ()=>{
            setIsExpanded({
                "Footer.useCallback[toggleExpand]": (prev)=>!prev
            }["Footer.useCallback[toggleExpand]"]);
        }
    }["Footer.useCallback[toggleExpand]"], []);
    const closeExpanded = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Footer.useCallback[closeExpanded]": ()=>{
            setIsExpanded(false);
        }
    }["Footer.useCallback[closeExpanded]"], []);
    const handleCopyEmail = ()=>{
        navigator.clipboard.writeText(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portfolioData"].personal.email);
        setCopied(true);
        setTimeout(()=>setCopied(false), 2000);
    };
    // Animation variants
    const overlayVariants = {
        closed: {
            opacity: 0
        },
        open: {
            opacity: 1
        }
    };
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const isBlog = pathname?.includes('/blog');
    const isBlogDetail = pathname?.includes('/blog/') && pathname.split('/blog/')[1]?.length > 0;
    const isGallery = pathname?.includes('/gallery');
    const previewSocials = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portfolioData"].personal.socialLinks.filter((s)=>s.platform !== 'Discord' && s.platform !== 'Spotify').slice(0, 4);
    const expandedSocials = previewSocials.filter((s)=>s.platform !== 'Twitter');
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(isBlog ? 'absolute bottom-0 w-full border-t-0 pointer-events-none !bg-transparent z-20' : isGallery ? 'relative z-20 mt-auto !bg-transparent' : 'relative z-20 mt-auto dark:bg-black', isExpanded && 'opacity-0 pointer-events-none'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: `max-w-[1600px] mx-auto relative z-10 px-6 md:px-12 lg:px-24 py-6 md:py-8 pointer-events-auto ${isBlog || isGallery ? '!bg-transparent' : ''}`,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `
                        px-6 md:px-8 py-4 md:py-6 transition-all duration-300
                        ${isBlog || isGallery ? 'bg-card dark:bg-black/40 dark:backdrop-blur-xl border-2 border-foreground/10 dark:border-white/5 rounded-[2rem] shadow-xl dark:shadow-black/20' : 'glass-card'}
                    `,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5 md:gap-2 pl-2 md:pl-4 z-10 overflow-hidden h-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-xs md:text-sm font-bold uppercase tracking-widest ${isBlog ? 'text-muted-foreground' : 'text-gradient'}`,
                                            children: [
                                                "© ",
                                                currentYear
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                            lineNumber: 192,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative w-[280px] h-full flex items-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                mode: "popLayout",
                                                children: mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                                    initial: {
                                                        y: 20,
                                                        opacity: 0
                                                    },
                                                    animate: {
                                                        y: 0,
                                                        opacity: 1
                                                    },
                                                    exit: {
                                                        y: -20,
                                                        opacity: 0
                                                    },
                                                    transition: {
                                                        duration: 0.5,
                                                        ease: "easeInOut"
                                                    },
                                                    className: `absolute left-0 text-xs md:text-sm font-bold uppercase tracking-widest whitespace-nowrap ${isBlog ? 'text-muted-foreground' : 'text-gradient'}`,
                                                    children: copyrightIndex === 0 ? `${"AURAVINE"}.` : "All rights reserved."
                                                }, copyrightIndex, false, {
                                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 45
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Footer.tsx",
                                                lineNumber: 196,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                            lineNumber: 195,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                    lineNumber: 191,
                                    columnNumber: 29
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-end gap-4 md:gap-8 z-10 ml-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1.5 sm:gap-2",
                                            children: previewSocials.map((social)=>{
                                                const Icon = socialIcons[social.icon];
                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        social.platform === 'Twitter' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
                                                            href: "https://arfazrllworkspace.vercel.app/",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "p-1.5 rounded-full hover:bg-foreground/5 transition-all text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95",
                                                            "aria-label": "Workspace",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$focus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Focus$3e$__["Focus"], {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/Footer.tsx",
                                                                lineNumber: 231,
                                                                columnNumber: 57
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                                            lineNumber: 224,
                                                            columnNumber: 53
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].a, {
                                                            href: social.platform === 'Twitter' ? undefined : social.url,
                                                            onClick: social.platform === 'Twitter' ? (e)=>{
                                                                e.preventDefault();
                                                                window.dispatchEvent(new CustomEvent('portfolio:toggle-chatbot', {
                                                                    detail: {
                                                                        x: window.innerWidth / 2,
                                                                        y: window.innerHeight / 2
                                                                    }
                                                                }));
                                                            } : undefined,
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "p-1.5 rounded-full hover:bg-foreground/5 transition-all text-muted-foreground hover:text-foreground hover:scale-110 active:scale-95",
                                                            "aria-label": social.platform,
                                                            children: Icon && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                                className: "w-4 h-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/layout/Footer.tsx",
                                                                lineNumber: 248,
                                                                columnNumber: 62
                                                            }, this)
                                                        }, social.platform, false, {
                                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                                            lineNumber: 234,
                                                            columnNumber: 49
                                                        }, this)
                                                    ]
                                                }, social.platform, true, {
                                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 45
                                                }, this);
                                            })
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                            lineNumber: 217,
                                            columnNumber: 33
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                            onClick: toggleExpand,
                                            className: `
                                            flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full transition-all text-xs font-black uppercase tracking-[0.2em]
                                            ${isBlog ? 'bg-muted/50 border-2 border-foreground/10 text-foreground hover:bg-muted hover:border-foreground/20' : 'bg-muted hover:bg-muted/80 text-foreground'}
                                        `,
                                            whileHover: {
                                                scale: 1.05
                                            },
                                            whileTap: {
                                                scale: 0.95
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "hidden sm:inline",
                                                    children: t('more')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                                    lineNumber: 267,
                                                    columnNumber: 37
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                                    animate: {
                                                        rotate: isExpanded ? 180 : 0
                                                    },
                                                    transition: {
                                                        duration: 0.3
                                                    },
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/Footer.tsx",
                                                        lineNumber: 272,
                                                        columnNumber: 41
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                                    lineNumber: 268,
                                                    columnNumber: 37
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                            lineNumber: 255,
                                            columnNumber: 33
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                    lineNumber: 216,
                                    columnNumber: 29
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Footer.tsx",
                            lineNumber: 189,
                            columnNumber: 25
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Footer.tsx",
                        lineNumber: 182,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Footer.tsx",
                    lineNumber: 181,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 175,
                columnNumber: 13
            }, this),
            mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPortal"])(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    variants: overlayVariants,
                    initial: "closed",
                    animate: "open",
                    exit: "closed",
                    transition: {
                        duration: 0.4,
                        ease: [
                            0.16,
                            1,
                            0.3,
                            1
                        ]
                    },
                    className: "fixed inset-0 z-[10000] bg-white dark:bg-black flex flex-col pt-0 overflow-hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$spotlight$2d$new$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spotlight"], {
                            gradientFirst: theme === 'dark' ? "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)" : "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(0, 0%, 20%, .03) 0, hsla(0, 0%, 15%, .01) 50%, hsla(0, 0%, 10%, 0) 80%)",
                            gradientSecond: theme === 'dark' ? "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)" : "radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 20%, .02) 0, hsla(0, 0%, 15%, .01) 80%, transparent 100%)",
                            gradientThird: theme === 'dark' ? "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)" : "radial-gradient(50% 50% at 50% 50%, hsla(0, 0%, 20%, .01) 0, hsla(0, 0%, 15%, .01) 80%, transparent 100%)"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Footer.tsx",
                            lineNumber: 293,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-shrink-0 pt-[5vh]",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Marquee, {}, void 0, false, {
                                fileName: "[project]/src/components/layout/Footer.tsx",
                                lineNumber: 310,
                                columnNumber: 33
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Footer.tsx",
                            lineNumber: 309,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 flex flex-col px-[8vw] pt-[4vh] pb-0 justify-between relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex-1 flex flex-col justify-center max-w-[1600px] w-full mx-auto relative",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-0 right-[-2vw] z-[10001]",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                onClick: closeExpanded,
                                                className: "relative p-[clamp(12px,1.2vw,20px)] flex items-center justify-center",
                                                initial: {
                                                    opacity: 0,
                                                    scale: 0.8
                                                },
                                                animate: {
                                                    opacity: 1,
                                                    scale: 1
                                                },
                                                transition: {
                                                    delay: 0.3
                                                },
                                                whileHover: {
                                                    scale: 1.1
                                                },
                                                whileTap: {
                                                    scale: 0.9
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "absolute inset-0 rounded-full bg-black dark:bg-white shadow-2xl"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/Footer.tsx",
                                                        lineNumber: 327,
                                                        columnNumber: 45
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                        className: "relative z-10 flex items-center justify-center",
                                                        whileHover: {
                                                            rotate: 90
                                                        },
                                                        transition: {
                                                            type: "spring",
                                                            stiffness: 260,
                                                            damping: 20
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                            className: "w-[clamp(24px,2vw,32px)] h-[clamp(24px,2vw,32px)] text-white dark:text-black",
                                                            strokeWidth: 2.5
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                                            lineNumber: 333,
                                                            columnNumber: 49
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/Footer.tsx",
                                                        lineNumber: 328,
                                                        columnNumber: 45
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/Footer.tsx",
                                                lineNumber: 318,
                                                columnNumber: 41
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                            lineNumber: 317,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full grid grid-cols-4 gap-x-[5vw] gap-y-[4vh]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterColumn, {
                                                    title: t('links'),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterLink, {
                                                            href: "/",
                                                            children: tNav('home')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                                            lineNumber: 341,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterLink, {
                                                            href: "/resume",
                                                            children: tNav('resume')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                                            lineNumber: 342,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterLink, {
                                                            href: "/contact",
                                                            children: tNav('contact')
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                                            lineNumber: 343,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AboutHoverMenu, {
                                                            tNav: tNav,
                                                            onExpandChange: setIsAboutExpanded
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                                            lineNumber: 344,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                                    lineNumber: 340,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterColumn, {
                                                    title: t('socials'),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "relative flex items-center gap-2 group w-fit",
                                                            onMouseEnter: ()=>setIsEmailHovered(true),
                                                            onMouseLeave: ()=>setIsEmailHovered(false),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterLink, {
                                                                    href: `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portfolioData"].personal.email}`,
                                                                    children: "Email"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                                                    lineNumber: 353,
                                                                    columnNumber: 49
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                                    children: isEmailHovered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                        initial: {
                                                                            opacity: 0,
                                                                            x: 5
                                                                        },
                                                                        animate: {
                                                                            opacity: 1,
                                                                            x: 0
                                                                        },
                                                                        exit: {
                                                                            opacity: 0,
                                                                            x: 5
                                                                        },
                                                                        className: "absolute left-full ml-[clamp(8px,1vw,16px)] whitespace-nowrap flex items-center gap-[clamp(4px,0.5vw,8px)] z-50",
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                className: "text-[clamp(12px,1.1vw,18px)] font-medium text-zinc-400 dark:text-zinc-500 select-all",
                                                                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portfolioData"].personal.email
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/layout/Footer.tsx",
                                                                                lineNumber: 362,
                                                                                columnNumber: 61
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                                onClick: (e)=>{
                                                                                    e.preventDefault();
                                                                                    handleCopyEmail();
                                                                                },
                                                                                className: "text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors",
                                                                                title: "Copy Email",
                                                                                children: copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                                                    className: "w-[clamp(14px,1vw,20px)] h-[clamp(14px,1vw,20px)] text-green-500"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                                                                    lineNumber: 373,
                                                                                    columnNumber: 75
                                                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                                    className: "w-[clamp(14px,1vw,20px)] h-[clamp(14px,1vw,20px)]"
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                                                                    lineNumber: 373,
                                                                                    columnNumber: 164
                                                                                }, this)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/components/layout/Footer.tsx",
                                                                                lineNumber: 365,
                                                                                columnNumber: 61
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/components/layout/Footer.tsx",
                                                                        lineNumber: 356,
                                                                        columnNumber: 57
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                                                    lineNumber: 354,
                                                                    columnNumber: 49
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                                            lineNumber: 348,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterLink, {
                                                            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portfolioData"].personal.socialLinks.find((s)=>s.platform === 'LinkedIn')?.url || '#',
                                                            target: "_blank",
                                                            children: "LinkedIn"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                                            lineNumber: 379,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterLink, {
                                                            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portfolioData"].personal.socialLinks.find((s)=>s.platform === 'Instagram')?.url || '#',
                                                            target: "_blank",
                                                            children: "Instagram"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                                            lineNumber: 380,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterLink, {
                                                            href: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["portfolioData"].personal.socialLinks.find((s)=>s.platform === 'GitHub')?.url || '#',
                                                            target: "_blank",
                                                            children: "GitHub"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                                            lineNumber: 381,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                                    lineNumber: 347,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterColumn, {
                                                    title: t('localTime'),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-zinc-900 dark:text-white text-[1.2vw] min-text-[14px] font-medium tracking-tight",
                                                            children: localTime
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                                            lineNumber: 385,
                                                            columnNumber: 45
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: "https://www.google.com/maps/place/Jakarta,+Indonesia",
                                                            target: "_blank",
                                                            rel: "noopener noreferrer",
                                                            className: "text-zinc-900 dark:text-white text-[1.2vw] min-text-[14px] font-medium tracking-tight hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors inline-block",
                                                            children: "Jakarta, Indonesia"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                                            lineNumber: 388,
                                                            columnNumber: 45
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                                    lineNumber: 384,
                                                    columnNumber: 41
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FooterColumn, {
                                                    title: t('version'),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-zinc-900 dark:text-white text-[1.2vw] min-text-[14px] font-medium tracking-tight",
                                                        children: t('versionEdition')
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/Footer.tsx",
                                                        lineNumber: 399,
                                                        columnNumber: 45
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                                    lineNumber: 398,
                                                    columnNumber: 41
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/layout/Footer.tsx",
                                            lineNumber: 339,
                                            columnNumber: 37
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                    lineNumber: 314,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-auto overflow-hidden flex-shrink-0 relative",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h2, {
                                        initial: {
                                            opacity: 0,
                                            y: "100%"
                                        },
                                        animate: isAboutExpanded ? {
                                            opacity: 0,
                                            y: "120%"
                                        } : {
                                            opacity: 1,
                                            y: "38%"
                                        },
                                        transition: {
                                            duration: 0.6,
                                            ease: [
                                                0.16,
                                                1,
                                                0.3,
                                                1
                                            ]
                                        },
                                        className: "text-[18vw] font-black leading-none text-zinc-900 dark:text-white tracking-tighter select-none text-center",
                                        children: "ARFAZRLL"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Footer.tsx",
                                        lineNumber: 408,
                                        columnNumber: 37
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/Footer.tsx",
                                    lineNumber: 407,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Footer.tsx",
                            lineNumber: 313,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Footer.tsx",
                    lineNumber: 285,
                    columnNumber: 25
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 283,
                columnNumber: 17
            }, this), document.body)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 173,
        columnNumber: 9
    }, this);
}
_s1(Footer, "iTFAbMZ+1omXqjzd0DUQpvHZFaM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c2 = Footer;
function FooterColumn({ title, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-[1.5vw]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: "text-zinc-500 text-[clamp(10px,0.8vw,14px)] font-bold tracking-widest uppercase",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 430,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-[0.8vw]",
                children: children
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 431,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 429,
        columnNumber: 9
    }, this);
}
_c3 = FooterColumn;
function FooterLink({ href, children, target }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        whileHover: {
            x: 5
        },
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            href: href,
            target: target,
            rel: target === '_blank' ? 'noopener noreferrer' : undefined,
            className: "text-zinc-900 dark:text-white text-[clamp(14px,1.2vw,22px)] font-medium hover:text-zinc-500 dark:hover:text-zinc-400 transition-colors w-fit whitespace-nowrap block",
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/layout/Footer.tsx",
            lineNumber: 444,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 440,
        columnNumber: 9
    }, this);
}
_c4 = FooterLink;
function AboutHoverMenu({ tNav, onExpandChange }) {
    _s2();
    const [isHovered, setIsHovered] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const isMobile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useIsMobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"])();
    const [isOpen, setIsOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const subLinks = [
        {
            href: '/achievements',
            label: tNav('achievements')
        },
        {
            href: '/skills',
            label: tNav('skills')
        },
        {
            href: '/experience',
            label: tNav('experience')
        },
        {
            href: '/projects',
            label: tNav('projects')
        },
        {
            href: '/blog',
            label: tNav('blog')
        },
        {
            href: '/gallery',
            label: tNav('gallery')
        }
    ];
    const active = isMobile ? isOpen : isHovered;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AboutHoverMenu.useEffect": ()=>{
            onExpandChange(active);
        }
    }["AboutHoverMenu.useEffect"], [
        active,
        onExpandChange
    ]);
    const containerVariants = {
        open: {
            height: 'auto',
            opacity: 1,
            transition: {
                height: {
                    duration: 0.6,
                    ease: [
                        0.16,
                        1,
                        0.3,
                        1
                    ]
                },
                opacity: {
                    duration: 0.4,
                    ease: "linear"
                },
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
        closed: {
            height: 0,
            opacity: 0,
            transition: {
                height: {
                    duration: 0.4,
                    ease: [
                        0.16,
                        1,
                        0.3,
                        1
                    ]
                },
                opacity: {
                    duration: 0.2,
                    ease: "linear"
                },
                staggerChildren: 0.03,
                staggerDirection: -1
            }
        }
    };
    const itemVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.4,
                ease: [
                    0.16,
                    1,
                    0.3,
                    1
                ]
            }
        },
        closed: {
            y: 10,
            opacity: 0,
            transition: {
                duration: 0.3,
                ease: [
                    0.16,
                    1,
                    0.3,
                    1
                ]
            }
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-2",
        onMouseEnter: ()=>!isMobile && setIsHovered(true),
        onMouseLeave: ()=>!isMobile && setIsHovered(false),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2 cursor-pointer group w-fit",
                onClick: ()=>isMobile && setIsOpen(!isOpen),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "#about",
                        className: "text-zinc-900 dark:text-white text-[clamp(14px,1.2vw,22px)] font-medium group-hover:text-zinc-500 dark:group-hover:text-zinc-400 transition-colors",
                        children: tNav('about')
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Footer.tsx",
                        lineNumber: 514,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        animate: {
                            rotate: active ? 180 : 0
                        },
                        transition: {
                            duration: 0.3
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUp$3e$__["ChevronUp"], {
                            className: "w-4 h-4 text-zinc-500 transform rotate-180"
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Footer.tsx",
                            lineNumber: 524,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/Footer.tsx",
                        lineNumber: 520,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 510,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: active && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    variants: containerVariants,
                    initial: "closed",
                    animate: "open",
                    exit: "closed",
                    className: "overflow-hidden flex flex-col gap-2 pl-4 border-l border-zinc-200 dark:border-white/10 ml-2",
                    children: subLinks.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            variants: itemVariants,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: link.href,
                                className: "text-zinc-500 dark:text-zinc-400 text-[clamp(12px,1vw,18px)] font-medium hover:text-zinc-900 dark:hover:text-white transition-colors",
                                children: link.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Footer.tsx",
                                lineNumber: 539,
                                columnNumber: 33
                            }, this)
                        }, link.href, false, {
                            fileName: "[project]/src/components/layout/Footer.tsx",
                            lineNumber: 538,
                            columnNumber: 29
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Footer.tsx",
                    lineNumber: 530,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Footer.tsx",
                lineNumber: 528,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Footer.tsx",
        lineNumber: 505,
        columnNumber: 9
    }, this);
}
_s2(AboutHoverMenu, "chwyLrpj9M3TOxjwTUEPYvNue6A=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$useIsMobile$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIsMobile"]
    ];
});
_c5 = AboutHoverMenu;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Marquee");
__turbopack_context__.k.register(_c1, "SocialCard");
__turbopack_context__.k.register(_c2, "Footer");
__turbopack_context__.k.register(_c3, "FooterColumn");
__turbopack_context__.k.register(_c4, "FooterLink");
__turbopack_context__.k.register(_c5, "AboutHoverMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/LoadingScreen.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoadingScreen",
    ()=>LoadingScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$apple$2d$hello$2d$effect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/apple-hello-effect.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function LoadingScreen({ onComplete, onExitStart, duration }) {
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const handleAnimationComplete = ()=>{
        // Small pause at the end for impact before exiting
        setTimeout(()=>{
            setIsLoading(false);
            onExitStart?.();
            setTimeout(()=>{
                onComplete?.();
            }, 1200); // Increased slightly for smoother overlap
        }, 300);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        mode: "wait",
        children: isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
            initial: {
                y: 0
            },
            exit: {
                y: "-100%",
                transition: {
                    duration: 1.2,
                    ease: [
                        0.7,
                        0,
                        0.3,
                        1
                    ]
                }
            },
            className: "fixed inset-0 z-[1000] flex flex-col items-center justify-center bg-background overflow-hidden will-change-transform",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    initial: {
                        opacity: 0,
                        y: 20
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    },
                    exit: {
                        opacity: 0,
                        y: -40,
                        transition: {
                            duration: 0.6,
                            ease: [
                                0.33,
                                1,
                                0.68,
                                1
                            ]
                        }
                    },
                    className: "relative flex flex-col items-center justify-center w-full max-w-[400px] will-change-transform",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$apple$2d$hello$2d$effect$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AppleHelloEnglishEffect"], {
                        speed: 1.2,
                        onAnimationComplete: handleAnimationComplete,
                        className: "text-foreground h-16 sm:h-20 md:h-24 will-change-transform"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/LoadingScreen.tsx",
                        lineNumber: 51,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/LoadingScreen.tsx",
                    lineNumber: 41,
                    columnNumber: 21
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    animate: {
                        opacity: [
                            0.2,
                            0.5,
                            0.2
                        ]
                    },
                    transition: {
                        duration: 2,
                        repeat: Infinity
                    },
                    exit: {
                        opacity: 0,
                        transition: {
                            duration: 0.3
                        }
                    },
                    className: "absolute bottom-12 w-1.5 h-1.5 rounded-full bg-foreground/10"
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/LoadingScreen.tsx",
                    lineNumber: 55,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/LoadingScreen.tsx",
            lineNumber: 30,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/LoadingScreen.tsx",
        lineNumber: 28,
        columnNumber: 9
    }, this);
}
_s(LoadingScreen, "5S7VQ8+9ArWv2AFPIfnY+LwrHeg=");
_c = LoadingScreen;
var _c;
__turbopack_context__.k.register(_c, "LoadingScreen");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/Navbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Navbar",
    ()=>Navbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-scroll.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/utils/use-motion-value-event.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/react-client/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-client] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$focus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Focus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/focus.js [app-client] (ecmascript) <export default as Focus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CardNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/CardNav.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$animated$2d$theme$2d$toggler$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/animated-theme-toggler.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$arc$2d$preloader$2d$hero$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/arc-preloader-hero.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
function Clock() {
    _s();
    const [time, setTime] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Clock.useEffect": ()=>{
            setMounted(true);
            const updateTime = {
                "Clock.useEffect.updateTime": ()=>{
                    const now = new Date();
                    const h = String(now.getHours()).padStart(2, '0');
                    const m = String(now.getMinutes()).padStart(2, '0');
                    const s = String(now.getSeconds()).padStart(2, '0');
                    setTime(`${h}:${m}:${s}`);
                }
            }["Clock.useEffect.updateTime"];
            updateTime();
            const interval = setInterval(updateTime, 1000);
            return ({
                "Clock.useEffect": ()=>clearInterval(interval)
            })["Clock.useEffect"];
        }
    }["Clock.useEffect"], []);
    if (!mounted) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "font-mono text-xl md:text-2xl font-black opacity-0",
        children: "00:00:00"
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Navbar.tsx",
        lineNumber: 35,
        columnNumber: 26
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "font-mono text-xl md:text-2xl font-black text-gradient tracking-widest hover:tracking-[0.2em] transition-all duration-300",
        children: time
    }, void 0, false, {
        fileName: "[project]/src/components/layout/Navbar.tsx",
        lineNumber: 38,
        columnNumber: 9
    }, this);
}
_s(Clock, "q+ez0lACvqXH6tZbHIHpk/UJ5qk=");
_c = Clock;
// Sub-links for the "About" dropdown
// Sub-links for the "About" dropdown
const useNavItems = ()=>{
    _s1();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('navigation.menu');
    return [
        {
            label: "About",
            links: [
                {
                    label: t('achievements'),
                    href: "/achievements",
                    description: t('achievementsDesc')
                },
                {
                    label: t('skills'),
                    href: "/skills",
                    description: t('skillsDesc')
                },
                {
                    label: t('experience'),
                    href: "/experience",
                    description: t('experienceDesc')
                },
                {
                    label: t('projects'),
                    href: "/projects",
                    description: t('projectsDesc')
                },
                {
                    label: t('blog'),
                    href: "/blog",
                    description: t('blogDesc')
                }
            ]
        }
    ];
};
_s1(useNavItems, "h6+q2O3NJKPY5uL0BIJGLIanww8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"]
    ];
});
function Navbar() {
    _s2();
    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"])('navigation');
    const navItems = useNavItems();
    const { theme, setTheme, resolvedTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const { scrollY } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"])();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isScrolled, setIsScrolled] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isMenuOpen, setIsMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [lastScrollY, setLastScrollY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currentLocale, setCurrentLocale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('en');
    // Consume preload state directly from context
    const { isPreloading: isPreloadActive } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$arc$2d$preloader$2d$hero$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePreloadState"])();
    const isDark = resolvedTheme === 'dark';
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            setMounted(true);
            const locale = document.cookie.split('; ').find({
                "Navbar.useEffect": (row)=>row.startsWith('locale=')
            }["Navbar.useEffect"])?.split('=')[1] || 'en';
            setCurrentLocale(locale);
        }
    }["Navbar.useEffect"], []);
    // Lock body scroll when menu is open
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            return ({
                "Navbar.useEffect": ()=>{
                    document.body.style.overflow = '';
                }
            })["Navbar.useEffect"];
        }
    }["Navbar.useEffect"], [
        isMenuOpen
    ]);
    // Close menu on route change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Navbar.useEffect": ()=>{
            setIsMenuOpen(false);
        }
    }["Navbar.useEffect"], [
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"])(scrollY, 'change', {
        "Navbar.useMotionValueEvent": (latest)=>{
            if (isMenuOpen) return; // Don't hide navbar when menu is open
            const direction = latest > lastScrollY ? 'down' : 'up';
            setIsScrolled(latest > 50);
            if (direction === 'down' && latest > 100) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(latest);
        }
    }["Navbar.useMotionValueEvent"]);
    const toggleMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Navbar.useCallback[toggleMenu]": ()=>{
            setIsMenuOpen({
                "Navbar.useCallback[toggleMenu]": (prev)=>!prev
            }["Navbar.useCallback[toggleMenu]"]);
        }
    }["Navbar.useCallback[toggleMenu]"], []);
    const toggleLocale = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Navbar.useCallback[toggleLocale]": ()=>{
            const newLocale = currentLocale === 'en' ? 'id' : 'en';
            document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
            setCurrentLocale(newLocale);
            window.location.reload();
        }
    }["Navbar.useCallback[toggleLocale]"], [
        currentLocale
    ]);
    const closeMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Navbar.useCallback[closeMenu]": ()=>{
            setIsMenuOpen(false);
        }
    }["Navbar.useCallback[closeMenu]"], []);
    const handleHomeClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "Navbar.useCallback[handleHomeClick]": (e)=>{
            if (pathname === '/') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            closeMenu();
        }
    }["Navbar.useCallback[handleHomeClick]"], [
        pathname,
        closeMenu
    ]);
    // Animation variants
    const navVariants = {
        visible: {
            y: 0,
            opacity: 1
        },
        hidden: {
            y: -100,
            opacity: 0
        }
    };
    const menuVariants = {
        closed: {
            opacity: 0
        },
        open: {
            opacity: 1
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].nav, {
                variants: navVariants,
                initial: "hidden",
                animate: !isPreloadActive && (isVisible || isMenuOpen) ? 'visible' : 'hidden',
                transition: {
                    duration: 0.4,
                    ease: [
                        0.25,
                        0.1,
                        0.25,
                        1
                    ]
                },
                className: "fixed top-0 left-0 right-0 z-[100]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-4 md:py-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex items-center justify-between transition-all duration-500 rounded-full', isScrolled ? 'glass-strong px-6 py-3' : 'py-2'),
                        layout: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/",
                                className: "relative group min-w-[120px]",
                                onClick: handleHomeClick,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Clock, {}, void 0, false, {
                                    fileName: "[project]/src/components/layout/Navbar.tsx",
                                    lineNumber: 172,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                lineNumber: 171,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden lg:flex items-center gap-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        onClick: handleHomeClick,
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full group', pathname === '/' ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative z-10",
                                            children: t('home')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Navbar.tsx",
                                            lineNumber: 186,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Navbar.tsx",
                                        lineNumber: 178,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$CardNav$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        items: navItems,
                                        theme: isDark ? 'dark' : 'light',
                                        pathname: pathname
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Navbar.tsx",
                                        lineNumber: 189,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/contact",
                                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full group', pathname === '/contact' ? 'text-foreground bg-muted' : 'text-muted-foreground hover:text-foreground'),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "relative z-10",
                                            children: t('contact')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Navbar.tsx",
                                            lineNumber: 203,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Navbar.tsx",
                                        lineNumber: 196,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                lineNumber: 176,
                                columnNumber: 25
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2 md:gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        className: "p-2 md:p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors",
                                        "aria-label": "Focus mode",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "https://arfazrllworkspace.vercel.app/",
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$focus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Focus$3e$__["Focus"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                                lineNumber: 216,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Navbar.tsx",
                                            lineNumber: 215,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Navbar.tsx",
                                        lineNumber: 209,
                                        columnNumber: 29
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        onClick: toggleLocale,
                                        className: "p-2 md:p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors",
                                        "aria-label": "Toggle language",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Navbar.tsx",
                                            lineNumber: 227,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Navbar.tsx",
                                        lineNumber: 220,
                                        columnNumber: 29
                                    }, this),
                                    mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$animated$2d$theme$2d$toggler$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatedThemeToggler"], {}, void 0, false, {
                                        fileName: "[project]/src/components/layout/Navbar.tsx",
                                        lineNumber: 231,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                        whileHover: {
                                            scale: 1.05
                                        },
                                        whileTap: {
                                            scale: 0.95
                                        },
                                        onClick: toggleMenu,
                                        className: "p-2 md:p-2.5 rounded-full bg-muted/80 hover:bg-muted transition-colors lg:hidden",
                                        "aria-label": "Toggle menu",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                            mode: "wait",
                                            initial: false,
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                initial: {
                                                    rotate: -90,
                                                    opacity: 0
                                                },
                                                animate: {
                                                    rotate: 0,
                                                    opacity: 1
                                                },
                                                exit: {
                                                    rotate: 90,
                                                    opacity: 0
                                                },
                                                transition: {
                                                    duration: 0.2
                                                },
                                                children: isMenuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Navbar.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 55
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                                    className: "w-5 h-5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/layout/Navbar.tsx",
                                                    lineNumber: 249,
                                                    columnNumber: 83
                                                }, this)
                                            }, isMenuOpen ? 'close' : 'menu', false, {
                                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                                lineNumber: 242,
                                                columnNumber: 37
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Navbar.tsx",
                                            lineNumber: 241,
                                            columnNumber: 33
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/Navbar.tsx",
                                        lineNumber: 234,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                lineNumber: 208,
                                columnNumber: 25
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/Navbar.tsx",
                        lineNumber: 163,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/Navbar.tsx",
                    lineNumber: 162,
                    columnNumber: 17
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Navbar.tsx",
                lineNumber: 155,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    variants: menuVariants,
                    initial: "closed",
                    animate: "open",
                    exit: "closed",
                    transition: {
                        duration: 0.3
                    },
                    className: "fixed inset-0 z-[90] lg:hidden",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "absolute inset-0 bg-background",
                            initial: {
                                opacity: 0
                            },
                            animate: {
                                opacity: 1
                            },
                            exit: {
                                opacity: 0
                            }
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/Navbar.tsx",
                            lineNumber: 270,
                            columnNumber: 29
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative flex flex-col items-center justify-center h-full overflow-y-auto py-20",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "flex flex-col items-center gap-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/",
                                            onClick: handleHomeClick,
                                            className: "text-3xl font-black text-muted-foreground hover:text-foreground transition-colors",
                                            children: t('home')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Navbar.tsx",
                                            lineNumber: 280,
                                            columnNumber: 37
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                            href: "/contact",
                                            onClick: closeMenu,
                                            className: "text-3xl font-black text-muted-foreground hover:text-foreground transition-colors",
                                            children: t('contact')
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Navbar.tsx",
                                            lineNumber: 288,
                                            columnNumber: 37
                                        }, this),
                                        navItems.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col items-center gap-4 py-4 border-b border-white/5 w-full last:border-0 text-center",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-black font-mono text-primary tracking-[0.3em] uppercase opacity-50",
                                                        children: category.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/Navbar.tsx",
                                                        lineNumber: 299,
                                                        columnNumber: 45
                                                    }, this),
                                                    category.links.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                            href: link.href,
                                                            onClick: closeMenu,
                                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('text-2xl font-bold transition-all hover:scale-110 active:scale-95 duration-200', pathname === link.href ? 'text-foreground' : 'text-muted-foreground/60 hover:text-foreground'),
                                                            children: link.label
                                                        }, link.label, false, {
                                                            fileName: "[project]/src/components/layout/Navbar.tsx",
                                                            lineNumber: 303,
                                                            columnNumber: 49
                                                        }, this))
                                                ]
                                            }, category.label, true, {
                                                fileName: "[project]/src/components/layout/Navbar.tsx",
                                                lineNumber: 298,
                                                columnNumber: 41
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Navbar.tsx",
                                    lineNumber: 278,
                                    columnNumber: 33
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: 20
                                    },
                                    transition: {
                                        delay: 0.5
                                    },
                                    className: "flex items-center gap-4 mt-12",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: toggleLocale,
                                            className: "px-6 py-3 rounded-full glass-card text-sm font-medium hover:bg-muted/50 transition-colors",
                                            children: currentLocale === 'en' ? 'English' : 'Indonesia'
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Navbar.tsx",
                                            lineNumber: 326,
                                            columnNumber: 37
                                        }, this),
                                        mounted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$animated$2d$theme$2d$toggler$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatedThemeToggler"], {
                                            className: "px-6 py-6 glass-card text-sm font-medium hover:bg-muted/50 flex items-center gap-2"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/Navbar.tsx",
                                            lineNumber: 333,
                                            columnNumber: 41
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/Navbar.tsx",
                                    lineNumber: 319,
                                    columnNumber: 33
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/Navbar.tsx",
                            lineNumber: 277,
                            columnNumber: 29
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/Navbar.tsx",
                    lineNumber: 262,
                    columnNumber: 25
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/Navbar.tsx",
                lineNumber: 259,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/Navbar.tsx",
        lineNumber: 154,
        columnNumber: 9
    }, this);
}
_s2(Navbar, "E5uhBl6i7byk4q3l1F8Hvt+krAI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$react$2d$client$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslations"],
        useNavItems,
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$scroll$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useScroll"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$arc$2d$preloader$2d$hero$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePreloadState"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$utils$2f$use$2d$motion$2d$value$2d$event$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValueEvent"]
    ];
});
_c1 = Navbar;
var _c, _c1;
__turbopack_context__.k.register(_c, "Clock");
__turbopack_context__.k.register(_c1, "Navbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$LoadingScreen$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/LoadingScreen.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Navbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Navbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$layout$2f$Footer$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/layout/Footer.tsx [app-client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/BackToTop.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BackToTop",
    ()=>BackToTop
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-spring.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function BackToTop() {
    _s();
    const [isVisible, setIsVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Use refs for values that change rapidly to avoid re-renders
    const isVisibleRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Magnetic Logic
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const x = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const y = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    const mouseX = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(x, {
        stiffness: 120,
        damping: 14,
        mass: 0.1
    });
    const mouseY = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"])(y, {
        stiffness: 120,
        damping: 14,
        mass: 0.1
    });
    const handleMouseMove = (e)=>{
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const { height, width, left, top } = rect;
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);
            // Standard sensitivity
            x.set(middleX);
            y.set(middleY);
        }
    };
    const handleMouseLeave = ()=>{
        x.set(0);
        y.set(0);
    };
    // Optimized Scroll Logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "BackToTop.useEffect": ()=>{
            const handleScroll = {
                "BackToTop.useEffect.handleScroll": ()=>{
                    // 1. Clear any existing timeout (the "stop" detector)
                    if (timeoutRef.current) {
                        clearTimeout(timeoutRef.current);
                    }
                    // 2. If currently visible, hide it immediately (state change only if needed)
                    if (isVisibleRef.current) {
                        setIsVisible(false);
                        isVisibleRef.current = false;
                    }
                    // 3. Set new timeout to detect scroll stop
                    timeoutRef.current = setTimeout({
                        "BackToTop.useEffect.handleScroll": ()=>{
                            const scrolledEnough = window.scrollY > 100;
                            if (scrolledEnough && !isVisibleRef.current) {
                                setIsVisible(true);
                                isVisibleRef.current = true;
                            } else if (!scrolledEnough && isVisibleRef.current) {
                                setIsVisible(false);
                                isVisibleRef.current = false;
                            }
                        }
                    }["BackToTop.useEffect.handleScroll"], 100); // 100ms debounce
                }
            }["BackToTop.useEffect.handleScroll"];
            // Passive listener for performance
            window.addEventListener('scroll', handleScroll, {
                passive: true
            });
            return ({
                "BackToTop.useEffect": ()=>{
                    window.removeEventListener('scroll', handleScroll);
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                }
            })["BackToTop.useEffect"];
        }
    }["BackToTop.useEffect"], []);
    const scrollToTop = ()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
        children: isVisible && // Wrapper: Large touch target for magnetic pull
        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            ref: ref,
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            className: "fixed bottom-6 right-6 z-[100] w-32 h-32 flex items-center justify-center pointer-events-auto hide-on-modal transition-all duration-300",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                initial: {
                    opacity: 0,
                    scale: 0.5
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                exit: {
                    opacity: 0,
                    scale: 0.5
                },
                transition: {
                    duration: 0.2
                },
                onClick: scrollToTop,
                style: {
                    x: mouseX,
                    y: mouseY
                },
                className: "relative h-14 w-14 rounded-full bg-foreground text-background shadow-2xl flex items-center justify-center border border-background/20 backdrop-blur-md cursor-pointer group",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"], {
                        className: "w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/BackToTop.tsx",
                        lineNumber: 100,
                        columnNumber: 25
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 rounded-full bg-foreground/10 blur-xl -z-10 group-hover:blur-2xl transition-all"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/BackToTop.tsx",
                        lineNumber: 103,
                        columnNumber: 25
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/BackToTop.tsx",
                lineNumber: 91,
                columnNumber: 21
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ui/BackToTop.tsx",
            lineNumber: 85,
            columnNumber: 17
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/BackToTop.tsx",
        lineNumber: 82,
        columnNumber: 9
    }, this);
}
_s(BackToTop, "+HP6UgH0IT3kjCwcSNIWKXMypaI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$spring$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSpring"]
    ];
});
_c = BackToTop;
var _c;
__turbopack_context__.k.register(_c, "BackToTop");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/CardNav.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CardNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/navigation.js [app-client] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/briefcase.js [app-client] (ecmascript) <export default as Briefcase>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rocket.js [app-client] (ecmascript) <export default as Rocket>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image.js [app-client] (ecmascript) <export default as ImageIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function GridSnake({ theme }) {
    _s();
    const [pathX, setPathX] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [pathY, setPathY] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "GridSnake.useEffect": ()=>{
            const cols = 11; // ~264px max width
            const rows = 6; // ~144px max height
            const gridSize = 24;
            let x = Math.floor(Math.random() * cols) * gridSize;
            let y = Math.floor(Math.random() * rows) * gridSize;
            const px = [
                x
            ];
            const py = [
                y
            ];
            for(let i = 0; i < 40; i++){
                const isHorizontal = Math.random() > 0.5;
                const step = (Math.random() > 0.5 ? 1 : -1) * gridSize;
                if (isHorizontal) {
                    x += step;
                    if (x < 0) x = (cols - 1) * gridSize;
                    else if (x >= cols * gridSize) x = 0;
                } else {
                    y += step;
                    if (y < 0) y = (rows - 1) * gridSize;
                    else if (y >= rows * gridSize) y = 0;
                }
                px.push(x);
                py.push(y);
            }
            setPathX(px);
            setPathY(py);
        }
    }["GridSnake.useEffect"], []);
    if (pathX.length === 0) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute inset-0 overflow-hidden pointer-events-none opacity-30 group-hover:opacity-100 transition-opacity duration-700",
        children: [
            ...Array(4)
        ].map((_, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute top-0 left-0 w-[24px] h-[24px]", theme === 'dark' ? i === 0 ? "bg-white/20" : "bg-white/10" : i === 0 ? "bg-black/20" : "bg-black/10"),
                animate: {
                    x: pathX,
                    y: pathY
                },
                transition: {
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.15
                }
            }, i, false, {
                fileName: "[project]/src/components/ui/CardNav.tsx",
                lineNumber: 67,
                columnNumber: 17
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/CardNav.tsx",
        lineNumber: 65,
        columnNumber: 9
    }, this);
}
_s(GridSnake, "e9u8MXrKEN05b459jtmtmoWu6vg=");
_c = GridSnake;
function ActiveDot({ theme }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex ml-2 -translate-y-px align-middle",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "relative flex h-2 w-2",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-[#D1FF4D]"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/CardNav.tsx",
                    lineNumber: 93,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "relative inline-flex rounded-full h-2 w-2 bg-[#D1FF4D] shadow-[0_0_5px_rgba(209,255,77,0.8)]"
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/CardNav.tsx",
                    lineNumber: 94,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/CardNav.tsx",
            lineNumber: 92,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/CardNav.tsx",
        lineNumber: 91,
        columnNumber: 9
    }, this);
}
_c1 = ActiveDot;
function MegaBoxBig({ href, icon: Icon, title, desc, theme, pathname }) {
    const isActive = pathname === href || pathname?.startsWith(`${href}/`);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group relative flex flex-col justify-between rounded-2xl border p-5 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 h-40 overflow-hidden", theme === 'dark' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-[#161616] hover:bg-[#1f1f1f] hover:shadow-xl hover:shadow-black/50", isActive ? "border-[#D1FF4D]/50 shadow-[0_0_15px_rgba(209,255,77,0.05)]" : "border-white/10 hover:border-white/20") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("hover:bg-white hover:shadow-xl hover:shadow-black/10", isActive ? "bg-white border-[#D1FF4D]/80 shadow-md shadow-[#D1FF4D]/10" : "bg-black/[0.02] border-black/10 hover:border-black/20")),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 opacity-[0.04] pointer-events-none",
                style: {
                    backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/CardNav.tsx",
                lineNumber: 111,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GridSnake, {
                theme: theme
            }, void 0, false, {
                fileName: "[project]/src/components/ui/CardNav.tsx",
                lineNumber: 114,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-6 h-6 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3", theme === 'dark' ? isActive ? "text-[#D1FF4D]" : "text-white/70 group-hover:text-white" : isActive ? "text-[#8cb815]" : "text-black/70 group-hover:text-black")
            }, void 0, false, {
                fileName: "[project]/src/components/ui/CardNav.tsx",
                lineNumber: 116,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 mt-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-bold text-[15px] mb-1.5 transition-colors duration-300 flex items-center", theme === 'dark' ? isActive ? "text-[#D1FF4D]" : "text-white" : isActive ? "text-[#8cb815]" : "text-black"),
                        children: [
                            title,
                            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActiveDot, {
                                theme: theme
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/CardNav.tsx",
                                lineNumber: 121,
                                columnNumber: 34
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/CardNav.tsx",
                        lineNumber: 119,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-xs font-medium leading-relaxed transition-colors duration-300", theme === 'dark' ? "text-white/60 group-hover:text-white/80" : "text-black/60 group-hover:text-black/80"),
                        children: desc
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/CardNav.tsx",
                        lineNumber: 123,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/CardNav.tsx",
                lineNumber: 118,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none", theme === 'dark' ? "bg-gradient-to-tr from-transparent via-white/5 to-transparent" : "bg-gradient-to-tr from-transparent via-black/5 to-transparent")
            }, void 0, false, {
                fileName: "[project]/src/components/ui/CardNav.tsx",
                lineNumber: 127,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/CardNav.tsx",
        lineNumber: 104,
        columnNumber: 9
    }, this);
}
_c2 = MegaBoxBig;
function MegaBoxSmall({ href, icon: Icon, title, desc, theme, pathname }) {
    const isActive = pathname === href || pathname?.startsWith(`${href}/`);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group relative flex flex-col justify-center rounded-2xl border p-4 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 overflow-hidden", theme === 'dark' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-[#161616] hover:bg-[#1f1f1f] hover:shadow-xl hover:shadow-black/50", isActive ? "border-[#D1FF4D]/50 shadow-[0_0_15px_rgba(209,255,77,0.05)]" : "border-white/10 hover:border-white/20") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("hover:bg-white hover:shadow-xl hover:shadow-black/10", isActive ? "bg-white border-[#D1FF4D]/80 shadow-md shadow-[#D1FF4D]/10" : "bg-black/[0.02] border-black/10 hover:border-black/20")),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-start justify-between relative z-10",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-bold text-sm mb-1.5 transition-colors duration-300 flex items-center", theme === 'dark' ? isActive ? "text-[#D1FF4D]" : "text-white" : isActive ? "text-[#8cb815]" : "text-black"),
                            children: [
                                title,
                                isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActiveDot, {
                                    theme: theme
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/CardNav.tsx",
                                    lineNumber: 149,
                                    columnNumber: 38
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/CardNav.tsx",
                            lineNumber: 147,
                            columnNumber: 21
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[11px] font-medium leading-relaxed transition-colors duration-300", theme === 'dark' ? "text-white/60 group-hover:text-white/80" : "text-black/60 group-hover:text-black/80"),
                            children: desc
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/CardNav.tsx",
                            lineNumber: 151,
                            columnNumber: 21
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ui/CardNav.tsx",
                    lineNumber: 146,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1.5 rounded-xl transition-colors duration-300", theme === 'dark' ? "group-hover:bg-white/10" : "group-hover:bg-black/5"),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-4 h-4 mt-0.5 flex-shrink-0 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12", theme === 'dark' ? isActive ? "text-[#D1FF4D]" : "text-white/40 group-hover:text-white/80" : isActive ? "text-[#8cb815]" : "text-black/40 group-hover:text-black/80")
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/CardNav.tsx",
                        lineNumber: 154,
                        columnNumber: 21
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/CardNav.tsx",
                    lineNumber: 153,
                    columnNumber: 17
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ui/CardNav.tsx",
            lineNumber: 145,
            columnNumber: 13
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/CardNav.tsx",
        lineNumber: 139,
        columnNumber: 9
    }, this);
}
_c3 = MegaBoxSmall;
function SidebarLink({ href, icon: Icon, title, desc, theme, pathname }) {
    const isChat = href === '#';
    const isActive = pathname === href || href !== '#' && pathname?.startsWith(`${href}/`);
    const className = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("group flex items-center gap-4 rounded-2xl border p-4 transition-all duration-500 overflow-hidden relative", theme === 'dark' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-[#161616] hover:bg-[#1f1f1f]", isActive ? "border-[#D1FF4D]/50 shadow-[0_0_15px_rgba(209,255,77,0.05)]" : "border-white/10 hover:border-white/20") : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("hover:bg-white", isActive ? "bg-white border-[#D1FF4D]/80 shadow-sm shadow-[#D1FF4D]/10" : "bg-black/[0.02] border-black/10 hover:border-black/20"), isChat ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:scale-[1.02] hover:-translate-x-1 hover:shadow-xl");
    const content = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 relative z-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-bold text-sm mb-1.5 transition-colors duration-300 flex items-center", theme === 'dark' ? isActive ? "text-[#D1FF4D]" : "text-white" : isActive ? "text-[#8cb815]" : "text-black"),
                        children: [
                            title,
                            isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActiveDot, {
                                theme: theme
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/CardNav.tsx",
                                lineNumber: 178,
                                columnNumber: 34
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/CardNav.tsx",
                        lineNumber: 176,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-[11px] font-medium transition-colors duration-300", theme === 'dark' ? "text-white/60 group-hover:text-white/80" : "text-black/60 group-hover:text-black/80"),
                        children: desc
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/CardNav.tsx",
                        lineNumber: 180,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/CardNav.tsx",
                lineNumber: 175,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-5 h-5 relative z-10 transition-transform duration-500 group-hover:scale-125 group-hover:-rotate-6", theme === 'dark' ? isActive ? "text-[#D1FF4D]" : "text-white/40 group-hover:text-white/80" : isActive ? "text-[#8cb815]" : "text-black/40 group-hover:text-black/80")
            }, void 0, false, {
                fileName: "[project]/src/components/ui/CardNav.tsx",
                lineNumber: 182,
                columnNumber: 13
            }, this),
            !isChat && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none", theme === 'dark' ? "bg-gradient-to-r from-transparent to-white/[0.02]" : "bg-gradient-to-r from-transparent to-black/[0.02]")
            }, void 0, false, {
                fileName: "[project]/src/components/ui/CardNav.tsx",
                lineNumber: 186,
                columnNumber: 17
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/CardNav.tsx",
        lineNumber: 174,
        columnNumber: 9
    }, this);
    if (isChat) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: className,
            children: content
        }, void 0, false, {
            fileName: "[project]/src/components/ui/CardNav.tsx",
            lineNumber: 196,
            columnNumber: 13
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        href: href,
        className: className,
        children: content
    }, void 0, false, {
        fileName: "[project]/src/components/ui/CardNav.tsx",
        lineNumber: 203,
        columnNumber: 9
    }, this);
}
_c4 = SidebarLink;
function CardNav({ items, theme = "dark", pathname = "/" }) {
    _s1();
    const [isExpanded, setIsExpanded] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close on click outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CardNav.useEffect": ()=>{
            const handleClickOutside = {
                "CardNav.useEffect.handleClickOutside": (event)=>{
                    if (containerRef.current && !containerRef.current.contains(event.target)) {
                        setIsExpanded(false);
                    }
                }
            }["CardNav.useEffect.handleClickOutside"];
            document.addEventListener('mousedown', handleClickOutside);
            return ({
                "CardNav.useEffect": ()=>document.removeEventListener('mousedown', handleClickOutside)
            })["CardNav.useEffect"];
        }
    }["CardNav.useEffect"], []);
    const aboutItem = items.find((i)=>i.label === "About") || items[0];
    const allHrefs = [
        '/projects',
        '/experience',
        '/skills',
        '/achievements',
        '/blog',
        '/gallery',
        '/resume'
    ];
    const isActive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "CardNav.useMemo[isActive]": ()=>{
            return allHrefs.some({
                "CardNav.useMemo[isActive]": (href)=>pathname === href || pathname.startsWith(`${href}/`)
            }["CardNav.useMemo[isActive]"]);
        }
    }["CardNav.useMemo[isActive]"], [
        pathname
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: containerRef,
        className: "relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                onMouseEnter: ()=>setIsExpanded(true),
                onClick: ()=>setIsExpanded(!isExpanded),
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative px-5 py-2 text-sm font-bold transition-all duration-300 rounded-full flex items-center gap-2 group", isActive ? theme === 'dark' ? "text-white bg-white/10" : "text-black bg-black/5" : theme === 'dark' ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-full"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/CardNav.tsx",
                        lineNumber: 246,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "relative z-10 flex items-center gap-2",
                        children: [
                            isActive && isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    scale: 0
                                },
                                animate: {
                                    scale: 1
                                },
                                className: "flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                    animate: {
                                        opacity: [
                                            1,
                                            0.4,
                                            1
                                        ],
                                        scale: [
                                            1,
                                            1.3,
                                            1
                                        ]
                                    },
                                    transition: {
                                        repeat: Infinity,
                                        duration: 2,
                                        ease: "easeInOut"
                                    },
                                    className: "w-1.5 h-1.5 rounded-full bg-[#D1FF4D] shadow-[0_0_8px_rgba(209,255,77,0.6)]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/CardNav.tsx",
                                    lineNumber: 254,
                                    columnNumber: 29
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/CardNav.tsx",
                                lineNumber: 249,
                                columnNumber: 25
                            }, this),
                            aboutItem.label
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/CardNav.tsx",
                        lineNumber: 247,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                        animate: {
                            rotate: isExpanded ? 180 : 0
                        },
                        transition: {
                            duration: 0.3
                        },
                        className: "relative z-10",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            className: "w-4 h-4 opacity-50"
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/CardNav.tsx",
                            lineNumber: 268,
                            columnNumber: 21
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/CardNav.tsx",
                        lineNumber: 263,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/CardNav.tsx",
                lineNumber: 236,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: isExpanded && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    onMouseLeave: ()=>setIsExpanded(false),
                    initial: {
                        opacity: 0,
                        y: 10,
                        scale: 0.98,
                        x: "-50%"
                    },
                    animate: {
                        opacity: 1,
                        y: 20,
                        scale: 1,
                        x: "-50%"
                    },
                    exit: {
                        opacity: 0,
                        y: 10,
                        scale: 0.98,
                        x: "-50%"
                    },
                    transition: {
                        duration: 0.25,
                        ease: "easeOut"
                    },
                    className: "absolute top-full left-1/2 z-[100] pointer-events-auto",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative w-[850px] rounded-[1.5rem] border shadow-2xl flex backdrop-blur-2xl transition-all overflow-hidden", theme === 'dark' ? "bg-[#0a0a0a]/95 border-white/10 shadow-black/80" : "bg-white/95 border-black/10 shadow-black/5"),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 p-5 flex flex-col gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaBoxBig, {
                                                href: "/projects",
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rocket$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Rocket$3e$__["Rocket"],
                                                title: "Project",
                                                desc: "Discover my latest builds",
                                                theme: theme,
                                                pathname: pathname
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/CardNav.tsx",
                                                lineNumber: 293,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaBoxBig, {
                                                href: "/experience",
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$briefcase$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Briefcase$3e$__["Briefcase"],
                                                title: "Experience",
                                                desc: "My professional journey",
                                                theme: theme,
                                                pathname: pathname
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/CardNav.tsx",
                                                lineNumber: 294,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/CardNav.tsx",
                                        lineNumber: 292,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-3 gap-4",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaBoxSmall, {
                                                href: "/skills",
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"],
                                                title: "Skill",
                                                desc: "Technical expertise",
                                                theme: theme,
                                                pathname: pathname
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/CardNav.tsx",
                                                lineNumber: 298,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaBoxSmall, {
                                                href: "/achievements",
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"],
                                                title: "Achievement",
                                                desc: "Milestones reached",
                                                theme: theme,
                                                pathname: pathname
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/CardNav.tsx",
                                                lineNumber: 299,
                                                columnNumber: 37
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MegaBoxSmall, {
                                                href: "/blog",
                                                icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"],
                                                title: "Blog",
                                                desc: "Insights and docs",
                                                theme: theme,
                                                pathname: pathname
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ui/CardNav.tsx",
                                                lineNumber: 300,
                                                columnNumber: 37
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ui/CardNav.tsx",
                                        lineNumber: 297,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/CardNav.tsx",
                                lineNumber: 290,
                                columnNumber: 29
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-[280px] p-4 flex flex-col justify-center gap-4 border-l", theme === 'dark' ? "border-white/5" : "border-black/5"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarLink, {
                                        href: "/gallery",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageIcon$3e$__["ImageIcon"],
                                        title: "Gallery",
                                        desc: "Visual portfolio & moments",
                                        theme: theme,
                                        pathname: pathname
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/CardNav.tsx",
                                        lineNumber: 309,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarLink, {
                                        href: "/resume",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"],
                                        title: "Resume",
                                        desc: "View or download my CV",
                                        theme: theme,
                                        pathname: pathname
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/CardNav.tsx",
                                        lineNumber: 310,
                                        columnNumber: 33
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarLink, {
                                        href: "#",
                                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"],
                                        title: "Chat",
                                        desc: "Coming soon to connect",
                                        theme: theme,
                                        pathname: pathname
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ui/CardNav.tsx",
                                        lineNumber: 311,
                                        columnNumber: 33
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ui/CardNav.tsx",
                                lineNumber: 305,
                                columnNumber: 29
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ui/CardNav.tsx",
                        lineNumber: 283,
                        columnNumber: 25
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/CardNav.tsx",
                    lineNumber: 275,
                    columnNumber: 21
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/CardNav.tsx",
                lineNumber: 273,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/CardNav.tsx",
        lineNumber: 235,
        columnNumber: 9
    }, this);
}
_s1(CardNav, "AU998Q25Vs3Nl67ElX4V2nZLv/A=");
_c5 = CardNav;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "GridSnake");
__turbopack_context__.k.register(_c1, "ActiveDot");
__turbopack_context__.k.register(_c2, "MegaBoxBig");
__turbopack_context__.k.register(_c3, "MegaBoxSmall");
__turbopack_context__.k.register(_c4, "SidebarLink");
__turbopack_context__.k.register(_c5, "CardNav");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/ThemeAwareClickSpark.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeAwareClickSpark",
    ()=>ThemeAwareClickSpark
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ClickSpark$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ClickSpark.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const ThemeAwareClickSpark = ({ children })=>{
    _s();
    const { resolvedTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ThemeAwareClickSpark.useEffect": ()=>{
            setMounted(true);
        }
    }["ThemeAwareClickSpark.useEffect"], []);
    // Default to white (dark mode) if not mounted yet to avoid mismatch
    const sparkColor = mounted ? resolvedTheme === 'dark' ? '#ffffff' : '#171717' : '#ffffff';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ClickSpark$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        sparkColor: sparkColor,
        sparkSize: 10,
        sparkRadius: 15,
        sparkCount: 8,
        duration: 400,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/ui/ThemeAwareClickSpark.tsx",
        lineNumber: 19,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_s(ThemeAwareClickSpark, "7mWKygn7kk6b3+dTNlroOqQjeIs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = ThemeAwareClickSpark;
var _c;
__turbopack_context__.k.register(_c, "ThemeAwareClickSpark");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/animated-theme-toggler.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedThemeToggler",
    ()=>AnimatedThemeToggler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/moon.js [app-client] (ecmascript) <export default as Moon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sun.js [app-client] (ecmascript) <export default as Sun>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react-dom/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const AnimatedThemeToggler = ({ className, duration = 500, ...props })=>{
    _s();
    const { theme, setTheme, resolvedTheme } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"])();
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const buttonRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const isDark = resolvedTheme === "dark";
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnimatedThemeToggler.useEffect": ()=>{
            setMounted(true);
        }
    }["AnimatedThemeToggler.useEffect"], []);
    const toggleTheme = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AnimatedThemeToggler.useCallback[toggleTheme]": async ()=>{
            if (!buttonRef.current || !mounted) return;
            // Fallback if View Transitions API is not supported
            if (!document.startViewTransition) {
                setTheme(isDark ? "light" : "dark");
                return;
            }
            await document.startViewTransition({
                "AnimatedThemeToggler.useCallback[toggleTheme]": ()=>{
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2d$dom$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["flushSync"])({
                        "AnimatedThemeToggler.useCallback[toggleTheme]": ()=>{
                            setTheme(isDark ? "light" : "dark");
                        }
                    }["AnimatedThemeToggler.useCallback[toggleTheme]"]);
                }
            }["AnimatedThemeToggler.useCallback[toggleTheme]"]).ready;
            const { top, left, width, height } = buttonRef.current.getBoundingClientRect();
            const x = left + width / 2;
            const y = top + height / 2;
            const maxRadius = Math.hypot(Math.max(left, window.innerWidth - left), Math.max(top, window.innerHeight - top));
            document.documentElement.animate({
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`
                ]
            }, {
                duration,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)"
            });
        }
    }["AnimatedThemeToggler.useCallback[toggleTheme]"], [
        isDark,
        duration,
        setTheme,
        mounted
    ]);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        ref: buttonRef,
        onClick: toggleTheme,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-2 md:p-2.5 rounded-full bg-transparent hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-300 text-foreground hover:scale-110 hover:rotate-12", className),
        ...props,
        children: [
            isDark ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sun$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sun$3e$__["Sun"], {
                className: "w-4 h-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/animated-theme-toggler.tsx",
                lineNumber: 78,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$moon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Moon$3e$__["Moon"], {
                className: "w-4 h-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/animated-theme-toggler.tsx",
                lineNumber: 78,
                columnNumber: 47
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: "Toggle theme"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/animated-theme-toggler.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/animated-theme-toggler.tsx",
        lineNumber: 69,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AnimatedThemeToggler, "k/h256CcmvQx6xyAsHw1n11M+kw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTheme"]
    ];
});
_c = AnimatedThemeToggler;
var _c;
__turbopack_context__.k.register(_c, "AnimatedThemeToggler");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/apple-hello-effect.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppleHelloEnglishEffect",
    ()=>AppleHelloEnglishEffect,
    "AppleHelloVietnameseEffect",
    ()=>AppleHelloVietnameseEffect
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
const initialProps = {
    pathLength: 0,
    opacity: 0
};
const animateProps = {
    pathLength: 1,
    opacity: 1
};
function AppleHelloVietnameseEffect({ className, speed = 1, onAnimationComplete, ...props }) {
    const calc = (x)=>x * speed;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].svg, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-20", className),
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 1009 200",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "14.8883",
        initial: {
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        transition: {
            duration: 0.5
        },
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: "xin chào"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 44,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].path, {
                d: "M102.233 96.2277C75.6823 127.245 45.1612 158.759 11.4143 190.521",
                style: {
                    strokeLinecap: "round"
                },
                initial: initialProps,
                animate: animateProps,
                transition: {
                    duration: calc(0.3),
                    ease: "easeInOut",
                    opacity: {
                        duration: 0.15
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].path, {
                d: "M7.69214 116.575C9.67725 105.16 16.8733 95.7311 28.5358 95.7311C40.4465 95.7311 46.8981 105.408 53.3497 124.019C56.7409 133.283 60.1322 142.547 63.5234 151.81C73.689 179.58 81.1988 191.513 100.855 191.513C128.722 191.513 154.043 159.148 161.595 118.502C162.929 111.321 164.774 103.736 166.043 96.2273",
                style: {
                    strokeLinecap: "round"
                },
                initial: initialProps,
                animate: animateProps,
                transition: {
                    duration: calc(0.7),
                    ease: "easeInOut",
                    delay: calc(0.4),
                    opacity: {
                        duration: 0.35,
                        delay: calc(0.4)
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].path, {
                d: "M166.043 96.2273C163.191 113.101 160.565 126.997 158.92 139.404C157.989 147.592 157.544 154.54 157.596 161.488C157.729 179.354 164.764 191.513 182.695 191.513C209.39 191.513 236.181 159.123 243.73 118.5C245.064 111.321 247.012 103.759 248.139 96.2273",
                style: {
                    strokeLinecap: "round"
                },
                initial: initialProps,
                animate: animateProps,
                transition: {
                    duration: calc(0.5),
                    ease: "easeOut",
                    delay: calc(1),
                    opacity: {
                        duration: 0.25,
                        delay: calc(1)
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].path, {
                d: "M248.139 96.2278C243.424 127.741 239.454 158.759 234.491 190.272",
                style: {
                    strokeLinecap: "round"
                },
                initial: initialProps,
                animate: animateProps,
                transition: {
                    duration: calc(0.3),
                    ease: "easeOut",
                    delay: calc(1.5),
                    opacity: {
                        duration: 0.15,
                        delay: calc(1.5)
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].path, {
                d: "M237.873 167.951C244.704 121.32 265.508 94.2422 290.322 94.2422C307.692 94.2422 316.625 106.153 315.136 123.026C313.896 135.681 309.677 150.322 308.685 162.729C307.444 179.85 316.499 191.513 330.769 191.513C348.722 191.513 359.309 179.314 364.143 165.965",
                style: {
                    strokeLinecap: "round"
                },
                initial: initialProps,
                animate: animateProps,
                transition: {
                    duration: calc(0.9),
                    ease: "easeOut",
                    delay: calc(1.8),
                    opacity: {
                        duration: 0.45,
                        delay: calc(1.8)
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].path, {
                d: "M535.91 109.876C531.265 100.446 520.943 93.4984 505.459 93.4984C476.516 93.4984 462.044 117.816 462.044 143.374C462.044 171.503 482.265 192.506 511.307 192.506C559.762 192.506 592.902 136.708 621.581 97.8807C640.764 71.9101 649.874 49.2359 650.372 31.1674C650.62 17.7684 644.168 7.60362 632.01 7.60362C618.61 7.60362 610.173 17.7684 604.963 41.1011C599.255 66.7441 595.037 96.1684 584.367 190.521",
                style: {
                    strokeLinecap: "round"
                },
                initial: initialProps,
                animate: animateProps,
                transition: {
                    duration: calc(1.1),
                    ease: "easeInOut",
                    delay: calc(2.6),
                    opacity: {
                        duration: 0.55,
                        delay: calc(2.6)
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].path, {
                d: "M585.413 181.299C590.677 135.025 611.663 98.2125 638.213 98.2125C654.094 98.2125 664.187 110.868 661.321 128.982C659.708 139.652 656.794 152.059 655.128 164.217C653.102 179.602 658.89 191.513 676.813 191.513C702.178 191.513 717.375 164.077 725.613 135.196",
                style: {
                    strokeLinecap: "round"
                },
                initial: initialProps,
                animate: animateProps,
                transition: {
                    duration: calc(1),
                    ease: "easeInOut",
                    delay: calc(3.6),
                    opacity: {
                        duration: 0.5,
                        delay: calc(3.6)
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].path, {
                d: "M803.871 112.995C799.007 101.8 788.666 94.2423 772.207 94.2423C744.912 94.2423 724.398 121.538 723.052 150.818C721.878 177.617 734.244 192.681 751.857 192.505C776.858 192.255 795.234 167.699 803.437 115.742C804.449 109.332 805.498 102.638 806.51 96.2274",
                style: {
                    strokeLinecap: "round"
                },
                initial: initialProps,
                animate: animateProps,
                transition: {
                    duration: calc(0.8),
                    ease: "easeOut",
                    delay: calc(4.6),
                    opacity: {
                        duration: 0.4,
                        delay: calc(4.6)
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].path, {
                d: "M806.51 96.2274C805.486 102.73 804.461 109.232 803.436 115.735C798.955 144.175 796.887 155.395 797.109 162.729C797.628 179.85 803.785 191.513 820.064 191.513C842.563 191.513 860.966 164.721 870.266 138.289C879.653 111.612 891.315 94.9867 915.633 94.9867C935.732 94.9867 951.613 109.875 951.613 137.915C951.613 168.932 931.489 192.257 906.059 192.505C883.681 192.753 868.983 174.639 870.471 147.344C872.208 117.071 890.571 94.9867 914.64 94.9867C928.536 94.9867 940.207 101.164 949.38 107.89C974.247 126.031 993.407 114.82 1000.74 96.8832",
                style: {
                    strokeLinecap: "round"
                },
                initial: initialProps,
                animate: animateProps,
                transition: {
                    duration: calc(1.5),
                    ease: "easeOut",
                    delay: calc(5.4),
                    opacity: {
                        duration: 0.75,
                        delay: calc(5.4)
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 158,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].path, {
                className: "stroke-yellow-400",
                d: "M763.027 19.3039C768.734 34.6886 780.397 48.3362 792.059 55.5322",
                style: {
                    strokeLinecap: "round"
                },
                initial: initialProps,
                animate: animateProps,
                transition: {
                    duration: calc(0.8),
                    ease: "easeInOut",
                    delay: calc(7),
                    opacity: {
                        duration: 0.4,
                        delay: calc(7)
                    }
                },
                onAnimationComplete: onAnimationComplete
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 172,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = AppleHelloVietnameseEffect;
function AppleHelloEnglishEffect({ className, speed = 1, onAnimationComplete, ...props }) {
    const calc = (x)=>x * speed;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].svg, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("h-20", className),
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 638 200",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "14.8883",
        initial: {
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        transition: {
            duration: 0.5
        },
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                children: "hello"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].path, {
                d: "M8.69214 166.553C36.2393 151.239 61.3409 131.548 89.8191 98.0295C109.203 75.1488 119.625 49.0228 120.122 31.0026C120.37 17.6036 113.836 7.43883 101.759 7.43883C88.3598 7.43883 79.9231 17.6036 74.7122 40.9363C69.005 66.5793 64.7866 96.0036 54.1166 190.356",
                style: {
                    strokeLinecap: "round"
                },
                initial: initialProps,
                animate: animateProps,
                transition: {
                    duration: calc(0.8),
                    ease: "easeInOut",
                    opacity: {
                        duration: 0.4
                    }
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 214,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].path, {
                d: "M55.1624 181.135C60.6251 133.114 81.4118 98.0479 107.963 98.0479C123.844 98.0479 133.937 110.703 131.071 128.817C129.457 139.487 127.587 150.405 125.408 163.06C122.869 178.941 130.128 191.348 152.122 191.348C184.197 191.348 219.189 173.523 237.097 145.915C243.198 136.509 245.68 128.073 245.928 119.884C246.176 104.996 237.739 93.8296 222.851 93.8296C203.992 93.8296 189.6 115.17 189.6 142.465C189.6 171.745 205.481 192.341 239.208 192.341C285.066 192.341 335.86 137.292 359.199 75.8585C365.788 58.513 368.26 42.4065 368.26 31.1512C368.26 17.8057 364.042 7.55823 352.131 7.55823C340.469 7.55823 332.777 16.6141 325.829 30.9129C317.688 47.4967 311.667 71.4162 309.203 98.4549C303 166.301 316.896 191.348 349.936 191.348C390 191.348 434.542 135.534 457.286 75.6686C463.803 58.513 466.275 42.4065 466.275 31.1512C466.275 17.8057 462.057 7.55823 450.146 7.55823C438.484 7.55823 430.792 16.6141 423.844 30.9129C415.703 47.4967 409.682 71.4162 407.218 98.4549C401.015 166.301 414.911 191.348 444.416 191.348C473.874 191.348 489.877 165.67 499.471 138.402C508.955 111.447 520.618 94.8221 544.935 94.8221C565.035 94.8221 580.916 109.71 580.916 137.75C580.916 168.768 560.792 192.093 535.362 192.341C512.984 192.589 498.285 174.475 499.774 147.179C501.511 116.907 519.873 94.8221 543.943 94.8221C557.839 94.8221 569.51 100.999 578.682 107.725C603.549 125.866 622.709 114.656 630.047 96.7186",
                style: {
                    strokeLinecap: "round"
                },
                initial: initialProps,
                animate: animateProps,
                transition: {
                    duration: calc(2.8),
                    ease: "easeInOut",
                    delay: calc(0.7),
                    opacity: {
                        duration: 0.7,
                        delay: calc(0.7)
                    }
                },
                onAnimationComplete: onAnimationComplete
            }, void 0, false, {
                fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
                lineNumber: 227,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/apple-hello-effect.tsx",
        lineNumber: 199,
        columnNumber: 5
    }, this);
}
_c1 = AppleHelloEnglishEffect;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "AppleHelloVietnameseEffect");
__turbopack_context__.k.register(_c1, "AppleHelloEnglishEffect");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/arc-preloader-hero.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ArcRevealHero",
    ()=>ArcRevealHero,
    "PreloadContext",
    ()=>PreloadContext,
    "usePreloadState",
    ()=>usePreloadState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/framer-motion/dist/es/animation/animate/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/motion/dist/es/react.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/framer-motion/dist/es/value/use-motion-value.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/motion/node_modules/framer-motion/dist/es/value/use-transform.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis-react.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const PreloadContext = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"]({
    isPreloading: true,
    phase: "intro"
});
const usePreloadState = ()=>{
    _s();
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](PreloadContext);
};
_s(usePreloadState, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
function ArcRevealHero({ greetings, greetingHold = 800, revealDuration = 800, className, introClassName, greetingClassName, revealClassName, storageKey, children }) {
    _s1();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const lenis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLenis"])();
    const [phase, setPhase] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]("intro");
    const [index, setIndex] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](0);
    const [prevPathname, setPrevPathname] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](pathname);
    // Progress from 0 to 2
    // 0 -> 1: Black curve rises from bottom
    // 1: Text appears (held by greetingHold)
    // 1 -> 2: Black curve lifts up to reveal page
    const progress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"])(0);
    // Synchronously handle route change during render! 
    // This PREVENTS the new page from appearing BEFORE the preloader animation starts!
    if (pathname !== prevPathname) {
        const isBackToProjects = prevPathname.startsWith('/projects/') && pathname === '/projects';
        const isBackToBlog = prevPathname.startsWith('/blog/') && pathname === '/blog';
        setPrevPathname(pathname);
        // Skip preloader if navigating back to the main listing page from a detail page
        if (!isBackToProjects && !isBackToBlog) {
            setPhase("intro");
            setIndex(0);
            progress.set(0);
        }
    }
    // Optimization: Defer rendering the NEW page until the screen is fully covered by the black preloader.
    // This prevents heavy components (like Three.js/Spline) from freezing the JS thread during the intro animation!
    const isInitialSSR = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"](true);
    const [renderedChildren, setRenderedChildren] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](children);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ArcRevealHero.useEffect": ()=>{
            isInitialSSR.current = false;
        }
    }["ArcRevealHero.useEffect"], []);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ArcRevealHero.useEffect": ()=>{
            // Only update the actual rendered page when the screen is fully covered (text/reveal) or animation is done.
            if (phase === "text" || phase === "reveal" || phase === "done" || isInitialSSR.current) {
                setRenderedChildren(children);
            }
        }
    }["ArcRevealHero.useEffect"], [
        phase,
        children
    ]);
    // Generate title from pathname if greetings is not provided
    const title = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "ArcRevealHero.useMemo[title]": ()=>{
            if (pathname === '/') return 'Home';
            const parts = pathname.split('/').filter(Boolean);
            if ((parts[0] === 'projects' || parts[0] === 'blog') && parts.length > 1) {
                // Format slug (e.g., browser-automation-agent -> Browser Automation Agent)
                return parts[1].split('-').map({
                    "ArcRevealHero.useMemo[title]": (word)=>word.charAt(0).toUpperCase() + word.slice(1)
                }["ArcRevealHero.useMemo[title]"]).join(' ');
            }
            if (parts.length > 0) {
                return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
            }
            return 'Loading';
        }
    }["ArcRevealHero.useMemo[title]"], [
        pathname
    ]);
    const activeGreetings = greetings || [
        {
            text: title
        }
    ];
    const arcPath = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"])(progress, {
        "ArcRevealHero.useTransform[arcPath]": (p)=>{
            if (p <= 1) {
                // Rise phase (0 to 1)
                const topEdge = 110 - p * 110;
                // Convex upwards curve
                const control = topEdge - 30 * Math.sin(p * Math.PI);
                return `M 0 ${topEdge} Q 50 ${control} 100 ${topEdge} L 100 110 L 0 110 Z`;
            } else {
                // Reveal phase (1 to 2)
                const t = p - 1;
                const bottomEdge = 110 - t * 110;
                // Concave upwards curve
                const control = bottomEdge - 30 * Math.sin(t * Math.PI);
                return `M 0 0 L 100 0 L 100 ${bottomEdge} Q 50 ${control} 0 ${bottomEdge} Z`;
            }
        }
    }["ArcRevealHero.useTransform[arcPath]"]);
    // Scroll lock and global event
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ArcRevealHero.useEffect": ()=>{
            const isPreloading = phase !== "done";
            if ("TURBOPACK compile-time truthy", 1) {
                window.dispatchEvent(new CustomEvent('preload-state-change', {
                    detail: isPreloading
                }));
            }
            if (isPreloading) {
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
                window.scrollTo(0, 0); // Force scroll to top while preloading
                if (lenis) lenis.stop();
            } else {
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
                if (lenis) lenis.start();
            }
            return ({
                "ArcRevealHero.useEffect": ()=>{
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    if (lenis) lenis.start();
                    if ("TURBOPACK compile-time truthy", 1) {
                        window.dispatchEvent(new CustomEvent('preload-state-change', {
                            detail: false
                        }));
                    }
                }
            })["ArcRevealHero.useEffect"];
        }
    }["ArcRevealHero.useEffect"], [
        phase,
        lenis
    ]);
    // Check initial load overrides
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ArcRevealHero.useEffect": ()=>{
            // For homepage first load, if the original hello loader will run, skip this one
            if (pathname === '/' && ("TURBOPACK compile-time value", "object") !== 'undefined') {
                const isLoaded = sessionStorage.getItem('portfolioLoaded');
                if (!isLoaded) {
                    setPhase("done");
                    return;
                }
            }
            if (storageKey && ("TURBOPACK compile-time value", "object") !== "undefined") {
                try {
                    if (window.sessionStorage.getItem(storageKey) === "done") {
                        setPhase("done");
                        return;
                    }
                } catch  {
                // ignore
                }
            }
        }
    }["ArcRevealHero.useEffect"], []); // Run only once on mount
    // Phase: Intro -> Text
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ArcRevealHero.useEffect": ()=>{
            if (phase !== "intro") return;
            const controls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(progress, 1, {
                duration: revealDuration / 1000,
                ease: [
                    0.7,
                    0,
                    0.3,
                    1
                ],
                onComplete: {
                    "ArcRevealHero.useEffect.controls": ()=>{
                        setPhase("text");
                    }
                }["ArcRevealHero.useEffect.controls"]
            });
            return ({
                "ArcRevealHero.useEffect": ()=>controls.stop()
            })["ArcRevealHero.useEffect"];
        }
    }["ArcRevealHero.useEffect"], [
        phase,
        progress,
        revealDuration
    ]);
    // Phase: Text hold -> Reveal
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ArcRevealHero.useEffect": ()=>{
            if (phase !== "text") return;
            const t = window.setTimeout({
                "ArcRevealHero.useEffect.t": ()=>{
                    setPhase("reveal");
                }
            }["ArcRevealHero.useEffect.t"], greetingHold);
            return ({
                "ArcRevealHero.useEffect": ()=>window.clearTimeout(t)
            })["ArcRevealHero.useEffect"];
        }
    }["ArcRevealHero.useEffect"], [
        phase,
        greetingHold
    ]);
    // Phase: Reveal -> Done
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "ArcRevealHero.useEffect": ()=>{
            if (phase !== "reveal") return;
            const controls = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$animation$2f$animate$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["animate"])(progress, 2, {
                duration: revealDuration / 1000,
                ease: [
                    0.7,
                    0,
                    0.3,
                    1
                ],
                onComplete: {
                    "ArcRevealHero.useEffect.controls": ()=>{
                        setPhase("done");
                        if (storageKey && ("TURBOPACK compile-time value", "object") !== "undefined") {
                            try {
                                window.sessionStorage.setItem(storageKey, "done");
                            } catch  {
                            // ignore
                            }
                        }
                    }
                }["ArcRevealHero.useEffect.controls"]
            });
            return ({
                "ArcRevealHero.useEffect": ()=>controls.stop()
            })["ArcRevealHero.useEffect"];
        }
    }["ArcRevealHero.useEffect"], [
        phase,
        progress,
        revealDuration,
        storageKey
    ]);
    const showOverlay = phase !== "done";
    const current = activeGreetings[Math.min(index, activeGreetings.length - 1)];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative isolate min-h-screen w-full bg-background text-foreground", className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PreloadContext.Provider, {
                value: {
                    isPreloading: showOverlay,
                    phase
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative z-0", revealClassName),
                    children: renderedChildren
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/arc-preloader-hero.tsx",
                    lineNumber: 242,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/arc-preloader-hero.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                children: showOverlay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].div, {
                    initial: {
                        opacity: 1
                    },
                    exit: {
                        opacity: 0
                    },
                    transition: {
                        duration: 0.18,
                        ease: [
                            0.4,
                            0,
                            0.2,
                            1
                        ]
                    },
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("fixed inset-0 z-[999] h-screen w-full overflow-hidden", introClassName),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "absolute inset-0 flex items-center justify-center z-10",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                mode: "wait",
                                children: phase === "text" && current && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].span, {
                                    lang: current.lang,
                                    initial: {
                                        opacity: 0,
                                        y: 15
                                    },
                                    animate: {
                                        opacity: 1,
                                        y: 0
                                    },
                                    exit: {
                                        opacity: 0,
                                        y: -15
                                    },
                                    transition: {
                                        duration: 0.4,
                                        ease: "easeOut"
                                    },
                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("select-none px-6 text-center text-5xl font-semibold tracking-tight text-white", greetingClassName),
                                    children: current.text
                                }, `${index}-${current.text}`, false, {
                                    fileName: "[project]/src/components/ui/arc-preloader-hero.tsx",
                                    lineNumber: 261,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ui/arc-preloader-hero.tsx",
                                lineNumber: 259,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ui/arc-preloader-hero.tsx",
                            lineNumber: 258,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                            className: "pointer-events-none absolute inset-0 h-full w-full z-0",
                            viewBox: "0 0 100 100",
                            preserveAspectRatio: "none",
                            "aria-hidden": true,
                            children: [
                                (phase === "intro" || phase === "text") && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                    width: "100",
                                    height: "100",
                                    className: "fill-background"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/arc-preloader-hero.tsx",
                                    lineNumber: 288,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$dist$2f$es$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["motion"].path, {
                                    d: arcPath,
                                    className: "fill-foreground dark:fill-[#262626]"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ui/arc-preloader-hero.tsx",
                                    lineNumber: 291,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ui/arc-preloader-hero.tsx",
                            lineNumber: 280,
                            columnNumber: 13
                        }, this)
                    ]
                }, "arc-reveal-overlay", true, {
                    fileName: "[project]/src/components/ui/arc-preloader-hero.tsx",
                    lineNumber: 247,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ui/arc-preloader-hero.tsx",
                lineNumber: 245,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/arc-preloader-hero.tsx",
        lineNumber: 235,
        columnNumber: 5
    }, this);
}
_s1(ArcRevealHero, "WGfMdpiC9HsqWiuPr4EpPvRDXsI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLenis"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$motion$2d$value$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMotionValue"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$motion$2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$value$2f$use$2d$transform$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTransform"]
    ];
});
_c = ArcRevealHero;
var _c;
__turbopack_context__.k.register(_c, "ArcRevealHero");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ui/spotlight-new.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Spotlight",
    ()=>Spotlight
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
"use client";
;
;
const Spotlight = ({ gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)", gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)", gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)", translateY = -350, width = 560, height = 1380, smallWidth = 240, duration = 7, xOffset = 100 } = {})=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        transition: {
            duration: 1.5
        },
        className: "pointer-events-none absolute inset-0 h-full w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                animate: {
                    x: [
                        0,
                        xOffset,
                        0
                    ]
                },
                transition: {
                    duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                },
                className: "absolute top-0 left-0 w-screen h-screen z-40 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            transform: `translateY(${translateY}px) rotate(-45deg)`,
                            background: gradientFirst,
                            width: `${width}px`,
                            height: `${height}px`
                        },
                        className: `absolute top-0 left-0`
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/spotlight-new.tsx",
                        lineNumber: 53,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            transform: "rotate(-45deg) translate(5%, -50%)",
                            background: gradientSecond,
                            width: `${smallWidth}px`,
                            height: `${height}px`
                        },
                        className: `absolute top-0 left-0 origin-top-left`
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/spotlight-new.tsx",
                        lineNumber: 63,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            transform: "rotate(-45deg) translate(-180%, -70%)",
                            background: gradientThird,
                            width: `${smallWidth}px`,
                            height: `${height}px`
                        },
                        className: `absolute top-0 left-0 origin-top-left`
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/spotlight-new.tsx",
                        lineNumber: 73,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/spotlight-new.tsx",
                lineNumber: 41,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                animate: {
                    x: [
                        0,
                        -xOffset,
                        0
                    ]
                },
                transition: {
                    duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut"
                },
                className: "absolute top-0 right-0 w-screen h-screen z-40 pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            transform: `translateY(${translateY}px) rotate(45deg)`,
                            background: gradientFirst,
                            width: `${width}px`,
                            height: `${height}px`
                        },
                        className: `absolute top-0 right-0`
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/spotlight-new.tsx",
                        lineNumber: 96,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            transform: "rotate(45deg) translate(-5%, -50%)",
                            background: gradientSecond,
                            width: `${smallWidth}px`,
                            height: `${height}px`
                        },
                        className: `absolute top-0 right-0 origin-top-right`
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/spotlight-new.tsx",
                        lineNumber: 106,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            transform: "rotate(45deg) translate(180%, -70%)",
                            background: gradientThird,
                            width: `${smallWidth}px`,
                            height: `${height}px`
                        },
                        className: `absolute top-0 right-0 origin-top-right`
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/spotlight-new.tsx",
                        lineNumber: 116,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/spotlight-new.tsx",
                lineNumber: 84,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/spotlight-new.tsx",
        lineNumber: 29,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Spotlight;
var _c;
__turbopack_context__.k.register(_c, "Spotlight");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/portfolio.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "portfolioData",
    ()=>portfolioData
]);
const portfolioData = {
    personal: {
        name: "AURAVINE",
        title: "AI-First Software Development",
        subtitle: "AI-first software development and digital transformation for businesses ready to work smarter and grow",
        bio: "Auravine is a custom software development company focused on building intelligent, practical, and scalable digital solutions. We combine modern software engineering with AI capabilities to help businesses solve operational challenges, create better customer experiences, and unlock new opportunities.",
        avatar: "/grid.svg",
        location: "Serving local and international businesses",
        email: "",
        phone: "",
        resumeUrl: '/resume',
        website: "",
        languages: [
            {
                name: 'Indonesian',
                level: 'Native'
            },
            {
                name: 'English',
                level: 'Limited Working'
            },
            {
                name: 'French',
                level: 'Elementary'
            }
        ],
        socialLinks: [
            {
                platform: 'GitHub',
                url: '#',
                icon: 'github',
                username: 'Arfazrll'
            },
            {
                platform: 'LinkedIn',
                url: '#',
                icon: 'linkedin',
                username: "AURAVINE"
            },
            {
                platform: 'Instagram',
                url: '#',
                icon: 'instagram',
                username: 'arfazrll09_'
            },
            {
                platform: 'Twitter',
                url: '#',
                icon: 'twitter',
                username: 'arfazrll'
            },
            {
                platform: 'Discord',
                url: '#',
                icon: 'discord',
                username: 'arfazrll'
            },
            {
                platform: 'Spotify',
                url: '#',
                icon: 'spotify',
                username: 'Azrll'
            }
        ]
    },
    projects: [
        {
            id: 'project-1',
            slug: 'browser-automation-agent',
            title: 'Browser Automation Agent',
            description: 'An intelligent support assistant that automates common customer inquiries and workflows to improve response times and customer satisfaction.',
            longDescription: 'Agent Browser is a command-line interface (CLI) tool for AI-driven browser automation. Built on top of browser-use, this tool allows you to command an AI agent to perform complex browser interactions, scraping, and testing using natural language.',
            techStack: [
                'Python 3.11+',
                'browser-use',
                'Gemini',
                'Groq'
            ],
            tools: [
                'VS Code',
                'CLI',
                'uv'
            ],
            status: 'completed',
            repoUrl: '#/Browser-Automation-Agent.git',
            demoUrl: '#',
            startDate: '2026-04-01',
            role: 'AI Engineer',
            customTimeline: 'April 2026',
            team: 'Personal Project',
            highlights: [
                'Natural Language Control',
                'Multiple LLM Support',
                'Smart Rate Limiting'
            ],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Core Capabilities',
                    items: [
                        '**Natural Language Control**: Command the browser to navigate, click, fill forms, and extract information using simple text prompts.',
                        '**Multiple LLM Support**: Easily toggle between powerful models like Google Gemini and Groq.',
                        '**Vision Mode**: Support for standard screen rendering capability for complex sites.'
                    ]
                },
                {
                    title: 'Performance & Optimization',
                    items: [
                        '**Smart Rate Limiting**: Built-in delay mechanism and fallback handling to gracefully circumvent free-tier API rate limits.',
                        '**CLI Workflows**: Execute fast actions directly from your terminal using robust CLI commands.',
                        '**Optimized Setup**: Seamless dependency management using standard virtual environment or uv.'
                    ]
                },
                {
                    title: 'Logging & Outputs',
                    items: [
                        '**Execution Traces**: Application logs are automatically written to the logs/ directory for easy debugging.',
                        '**Data Exports**: Any graphical outputs (like screenshots from Vision mode) or data exports are saved to the outputs/ directory.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone and Setup',
                    code: 'git clone #/Browser-Automation-Agent.git\ncd Browser-Automation-Agent\npython -m venv venv\nvenv\\Scripts\\activate',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install -e .',
                    type: 'code'
                },
                {
                    title: 'Environment Configuration',
                    code: 'cp .env.example .env\n# Fill in GOOGLE_API_KEY or GROQ_API_KEY',
                    type: 'code'
                },
                {
                    title: 'Run Agent',
                    code: 'agentbrowser run --help\nagentbrowser run "Cari jadwal libur nasional Indonesia 2026 di Google dan rangkum"',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "API Rate Limits Exhaustion",
                    solution: "Implemented a smart rate limiting delay mechanism and fallback handling to gracefully circumvent free-tier API restrictions (e.g., Gemini 15 RPM Free Tier)."
                },
                {
                    problem: "Complex DOM Navigation",
                    solution: "Integrated a Vision Mode to capture screenshots and allow the LLM to process visual context for dynamically rendered sites."
                },
                {
                    problem: "Command-Line Interface Scalability",
                    solution: "Engineered a robust CLI framework offering specific workflow executions, dynamic LLM toggling (--llm gemini), and vision toggles (--vision)."
                }
            ]
        },
        {
            id: 'project-2',
            slug: 'swarm-agent-orchestrator',
            title: 'Swarm AI Blog Writer',
            image: '/project/swarmaiblogwriter1.webp',
            description: 'An AI-powered voice receptionist that handles calls, schedules appointments, and routes inquiries to help businesses serve customers around the clock.',
            longDescription: 'Swarm AI Blog Writer is a production-grade, multi-agent blog generation engine where multiple specialized AI agents orchestrate in a synchronized pipeline to create long-form, research-backed blog posts exported as professional PDF reports. Powered by Pydantic AI structured validation and Groq\'s Llama 3.3 70B, the system features a Planner, Researcher, Writer, and Editor agent working in harmony. A premium SaaS-grade Vue.js 3 frontend with GSAP animations and a bento-grid layout delivers the interaction layer, while a serverless Flask backend handles AI inference and PDF generation.',
            techStack: [
                'Vue.js 3',
                'Vite 5',
                'TypeScript',
                'Tailwind CSS 3',
                'GSAP 3',
                'Python',
                'Flask',
                'Pydantic v2',
                'Groq API',
                'Llama 3.3 70B',
                'FPDF2'
            ],
            tools: [
                'VS Code',
                'Vercel',
                'Postman',
                'GitHub'
            ],
            status: 'completed',
            repoUrl: '#/Swarm-Agent-Orchestrator',
            demoUrl: 'https://swarmagentblog.vercel.app/',
            startDate: '2025-03-01',
            role: 'AI Engineer & Full Stack Developer',
            customTimeline: 'March 2025',
            team: 'Personal Project',
            highlights: [
                'Multi-Agent Orchestration',
                '70B LLM via Groq',
                'Professional PDF Export'
            ],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Multi-Agent Orchestration',
                    items: [
                        '**Planner Agent**: Generates a structured 5-section blog outline validated by Pydantic v2 schemas before passing to the next stage.',
                        '**Researcher Agent**: Performs deep-dive research for each section using Llama 3.3 70B, enriching content with factual context.',
                        '**Writer Agent**: Crafts the final 1000+ word Markdown article from the research data, ensuring stylistic coherence.',
                        '**Editor Agent**: Reviews and refines the draft for clarity, grammar, and professional tone before PDF export.'
                    ]
                },
                {
                    title: 'Premium SaaS Frontend',
                    items: [
                        '**Vue.js 3 + GSAP**: Fluid, GSAP-powered animations on a high-contrast minimalist interface for a premium feel.',
                        '**Bento-Grid Layout**: Modern card-based feature showcase using Tailwind CSS 3 for a polished SaaS aesthetic.',
                        '**Live Generation Panel**: Real-time progress feed showing agent pipeline status as the blog is being generated.',
                        '**Lucide VueNext Icons**: Consistent, scalable icon system integrated throughout the UI components.'
                    ]
                },
                {
                    title: 'AI & Validation Pipeline',
                    items: [
                        '**Pydantic v2 Schemas**: Strict structured validation (BlogPlan, FinalBlog) enforced at each agent handoff to prevent hallucinated outputs.',
                        '**Groq Inference**: Standardized on Llama 3.3 70B via Groq API for superior reasoning speed and schema adherence.',
                        '**5-Section Planning**: Comprehensive outline generation covering introduction, body sections, and conclusion for long-form articles.'
                    ]
                },
                {
                    title: 'Infrastructure & Deployment',
                    items: [
                        '**Serverless Architecture**: Flask backend structured as a flat, serverless-compatible API for Vercel deployment.',
                        '**Professional PDF Export**: Automatic Markdown-to-PDF rendering via FPDF2 with automated artifact cleanup after delivery.',
                        '**Vercel Routing**: `vercel.json` routes all `/api/*` requests to the Flask serverless handler; Vite-built frontend served from `dist/`.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone the Repository',
                    code: 'git clone #/Swarm-Agent-Orchestrator.git\ncd Swarm-Agent-Orchestrator',
                    type: 'code'
                },
                {
                    title: 'Install Frontend Dependencies',
                    code: 'npm install',
                    type: 'code'
                },
                {
                    title: 'Install Backend Dependencies',
                    code: 'pip install -r requirements.txt',
                    type: 'code'
                },
                {
                    title: 'Environment Configuration',
                    code: '# Create .env in the root directory\nGROQ_API_KEY=your_groq_key_here',
                    type: 'code'
                },
                {
                    title: 'Run Development Servers',
                    code: '# Terminal 1 — Frontend\nnpm run dev\n\n# Terminal 2 — Backend\npython api/index.py\n# Visit http://localhost:5173',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: 'Agent Pipeline Validation Failures',
                    solution: 'Enforced strict Pydantic v2 schemas (BlogPlan, FinalBlog) at every agent handoff boundary. Any malformed LLM output triggers a re-prompt before the pipeline advances, ensuring 100% schema-valid data flow.'
                },
                {
                    problem: 'Serverless Cold-Start Latency',
                    solution: 'Restructured the Flask application into a flat, serverless-compatible API layout for Vercel, minimizing dependency loading overhead and achieving sub-400ms cold-start initialization.'
                },
                {
                    problem: 'PDF Encoding Artifacts',
                    solution: 'Built a custom Markdown sanitization layer before FPDF2 rendering that strips unsupported Unicode characters and normalizes heading/emphasis syntax, producing clean, professional PDF output without encoding errors.'
                }
            ]
        },
        {
            id: 'project-3',
            slug: 'creative-portfolio-website',
            title: 'Creative Portfolio Website',
            image: '/project/creativeportfoliowebsite1.webp',
            description: 'Modern, animated portfolio with 3D elements and smooth animations.',
            longDescription: 'A production-grade creative portfolio engineered to demonstrate high-level proficiency in Artificial Intelligence, Blockchain, and Modern Web Architectures. This platform transcends traditional static websites by offering a high-performance interactive experience powered by advanced WebGL shaders, physics-based simulations, and real-time data integration. It serves as a living laboratory for experimenting with cutting-edge frontend technologies while maintaing strict accessibility and SEO standards.',
            techStack: [
                'Next.js',
                'TypeScript',
                'Tailwind CSS',
                'Three.js',
                'Framer Motion',
                'GSAP'
            ],
            tools: [
                'VS Code',
                'Figma',
                'GitHub'
            ],
            status: 'completed',
            demoUrl: 'https://syahrilarfianalmazril.vercel.app',
            repoUrl: '#/PersonalBlog',
            startDate: '2025-01-20',
            highlights: [
                '3D animations',
                'Scroll effects',
                'Bilingual EN/ID'
            ],
            category: 'Creative Tech',
            features: [
                {
                    title: 'Immersive 3D Experience',
                    items: [
                        '**Interactive 3D Lanyard**: A physics-simulated 3D ID Card in the hero section that reacts to mouse movements.',
                        '**Hyperspeed Backgrounds**: Custom shader-based warp effects for a futuristic Web3 aesthetic.',
                        '**Particle Systems**: Dynamic background particles that enhance depth and interactivity.'
                    ]
                },
                {
                    title: 'Professional Insights',
                    items: [
                        '**Real-time Coding Stats**: Integrated WakaTime cards showing your top languages and coding activity.',
                        '**Dynamic GitHub Metrics**: Live cards displaying repository stats and contributions.',
                        '**Interactive Timeline**: A visual journey of your career at CPS Lab, HUMIC, and more.'
                    ]
                },
                {
                    title: 'Performance & UX',
                    items: [
                        '**Bilingual (EN/ID)**: Complete internationalization support.',
                        '**Smooth Scroll**: Lenis-based smooth scrolling for a premium feel.',
                        '**Theme Engine**: System-preferred dark/light mode with a custom "Click Spark" effect.',
                        '**Responsive Architecture**: Pixel-perfect layouts for mobile, tablet, and desktop.'
                    ]
                },
                {
                    title: 'Scalable Ecosystem',
                    items: [
                        '**Modular Components**: Atomic design architecture for maximum reusability.',
                        '**Type Safety**: Full TypeScript implementation for robust code reliability.',
                        '**SEO Optimized**: Semantic HTML and meta tags for maximum visibility.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone the Repository',
                    code: 'git clone #/PersonalBlog.git\ncd PersonalBlog',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'npm install',
                    type: 'code'
                },
                {
                    title: 'Environment Variables',
                    type: 'text',
                    code: `Create a .env.local file in the root directory:

NEXT_PUBLIC_GITHUB_USERNAME=Arfazrll
WAKATIME_API_KEY=your_wakatime_key`
                },
                {
                    title: 'Launch Development Server',
                    code: 'npm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Performance Bottlenecks with Heavy 3D Assets",
                    solution: "Engineered a custom rendering pipeline using Instanced Meshes and aggressive DRaco compression, reducing initial load time by 60% while maintaining a consistent 60 FPS on mobile devices through dynamic quality scaling."
                },
                {
                    problem: "Seamless State Synchronization",
                    solution: "Implemented a robust global state management system using Zustand to orchestrate complex interactions between the React UI layer and the 3D Canvas, ensuring perfectly synchronized animations without prop-drilling overhead."
                },
                {
                    problem: "Cross-Browser Shader Compatibility",
                    solution: "Developed fallback materials and uniform-based capability detection to ensure the custom GLSL shaders render correctly across inconsistent WebGL implementations on Safari and older Android browsers."
                }
            ]
        },
        {
            id: 'project-4',
            slug: 'snbtin-platform',
            title: 'SNBTIn - Platform Persiapan SNBT 2025',
            image: '/project/snbtinplatformpersiapansnbt20251.webp',
            description: 'Platform edukasi berbasis AI dengan 6 modul utama untuk persiapan UTBK-SNBT.',
            longDescription: 'SNBTIn adalah platform persiapan SNBT (Seleksi Nasional Berbasis Tes) terpercaya yang dirancang khusus untuk siswa SMA di Indonesia. Menyediakan ekosistem pembelajaran komprehensif dengan materi berkualitas, latihan soal, forum diskusi, dan fitur-fitur interaktif yang membantu siswa mempersiapkan diri secara optimal. Dengan lebih dari 10,000 siswa aktif dan tingkat kelulusan 85%, platform ini menjadi solusi utama untuk menembus PTN impian.',
            techStack: [
                'Next.js',
                'TypeScript',
                'React',
                'Tailwind CSS'
            ],
            tools: [
                'VS Code',
                'GitHub',
                'Figma',
                'Vercel'
            ],
            status: 'completed',
            repoUrl: '#/SNBTIn',
            demoUrl: 'https://snbtin.vercel.app/',
            startDate: '2025-01-01',
            customTimeline: 'Mar 2025 – Apr 2025',
            team: '4 Developers',
            highlights: [
                '10,000+ Active Students',
                '85% Pass Rate',
                '98% Exam Similarity'
            ],
            category: 'EdTech Platform',
            features: [
                {
                    title: '📚 Comprehensive Learning Ecosystem',
                    items: [
                        '**Materi Lengkap**: Full curriculum coverage for all SNBT subjects with videos, PDFs, and interactive docs.',
                        '**Video Interaktif**: High-quality video explanations from expert instructors.',
                        '**Latihan Soal**: Over 10,000 practice questions with detailed solutions and error analysis.'
                    ]
                },
                {
                    title: '🎯 Exam Mastery & Analytics',
                    items: [
                        '**Tryout Berkala**: Regular simulation exams with latest question patterns.',
                        '**Analisis Kemampuan**: Detailed performance dashboard to track progress and weak points.',
                        '**98% Similarity**: Questions designed to closely mimic actual SNBT exams.'
                    ]
                },
                {
                    title: '💻 Modern Tech Experience',
                    items: [
                        '**Dark/Light Mode**: Comfortable learning environment day or night.',
                        '**Responsive Design**: Optimized for desktop, tablet, and mobile learning.',
                        '**Interactive Visuals**: 3D models and animated backgrounds for engaging UX.'
                    ]
                },
                {
                    title: '🤝 Community & Support',
                    items: [
                        '**Forum Diskusi**: Collaborative learning space for students and teachers.',
                        '**Konsultasi**: Direct access to instructors for difficult topics.',
                        '**Leaderboard**: Gamified progress tracking to motivate students.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone the Repository',
                    code: 'git clone #/SNBTIn.git\ncd SNBTIn',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'npm install',
                    type: 'code'
                },
                {
                    title: 'Environmental Setup',
                    code: 'NEXT_PUBLIC_API_URL=your_api_url\nNEXTAUTH_URL=http://localhost:3000\nDATABASE_URL=your_db_connection',
                    type: 'code'
                },
                {
                    title: 'Run Development Server',
                    code: 'npm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Handling High-Concurrency Tryouts",
                    solution: "Implemented serverless architecture with scalable database connections to handle thousands of concurrent users during national simulation events without latency."
                },
                {
                    problem: "Real-time Analytics Processing",
                    solution: "Utilized efficient data aggregation pipelines to provide instant feedback and detailed performance analytics immediately after exam submission."
                },
                {
                    problem: "Interactive Content Delivery",
                    solution: "Integrated a custom video player and PDF viewer with lazy loading and adaptive streaming to ensure smooth content delivery even on low-bandwidth connections."
                }
            ]
        },
        {
            id: 'project-5',
            slug: 'terraflow-platform',
            title: 'Terraflow Platform',
            image: '/project/terraflowplatform1.webp',
            description: 'Sistem Deteksi Risiko Longsor secara Real-Time terintegrasi dengan sensor satelit dan prediksi cuaca.',
            longDescription: 'TerraFlow Platform is an intelligent IoT solution designed for precision agriculture and environmental monitoring. It features a robust Direct-to-Cloud architecture where ESP32 sensor nodes communicate directly with Firebase Realtime Database, ensuring instant data synchronization. The system combines a high-performance Go (Gin) backend for configuration management with a modern Next.js 14 frontend for real-time visualization and remote control of actuators like pumps and servos.',
            techStack: [
                'Next.js',
                'Go',
                'Gin',
                'Firebase',
                'Docker',
                'ESP32',
                'C++',
                'React',
                'Tailwind CSS'
            ],
            tools: [
                'VS Code',
                'Docker',
                'Firebase Console',
                'PlatformIO'
            ],
            status: 'completed',
            repoUrl: '#/TerraflowPlatform',
            demoUrl: 'https://terraflowio.vercel.app/',
            startDate: '2025-10-01',
            customTimeline: 'Oct 2025 - Dec 2025',
            team: '2 Developer',
            role: 'Software Engineering',
            highlights: [
                'Direct-to-Cloud Architecture',
                'Real-time Monitoring',
                'Go High-Performance API'
            ],
            category: 'IoT & Embedded',
            features: [
                {
                    title: '🤖 Smart Firmware (ESP32)',
                    items: [
                        '**Direct HTTP Communication**: Efficient data transmission using `HTTPClient.h` directly to Firebase REST API.',
                        '**Smart Control Logic**: Automated actuation of pumps and servos based on real-time sensor readings.',
                        '**Robust Connectivity**: Built-in auto-reconnect and retry mechanisms to handle unstable field networks.'
                    ]
                },
                {
                    title: '🖥️ Modern Dashboard',
                    items: [
                        '**Real-time Visualization**: Dynamic charts using `recharts` that update instantly with Firebase data.',
                        '**Interactive Control**: Remote manual overrides for field actuators directly from the UI.',
                        '**Responsive Design**: Built with Next.js 14 and Tailwind CSS for optimal experience on all devices.'
                    ]
                },
                {
                    title: '⚡ High-Performance Backend',
                    items: [
                        '**Go (Gin) Server**: Ultra-fast API for centralized configuration management.',
                        '**Secure Distribution**: Safe delivery of Firebase credentials to authenticated clients.',
                        '**Health Monitoring**: Dedicated endpoints for container and service status checks.'
                    ]
                },
                {
                    title: '☁️ Direct-to-Cloud Architecture',
                    items: [
                        '**Zero-Gateway Latency**: Edge devices write directly to the cloud, bypassing intermediate gateways for millisecond-level updates.',
                        '**Scalable Infrastructure**: Containerized deployment with Docker ensures consistent environments across development and production.',
                        '**Firebase Sync**: Leverages Firebase Realtime Database for instant state synchronization between hardware and all connected clients.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Environment Setup',
                    code: 'PORT=8080\nALLOWED_ORIGINS=http://localhost:3000\nFIREBASE_API_KEY=your_key\n# Add other Firebase credentials',
                    type: 'code'
                },
                {
                    title: 'Deploy with Docker',
                    code: 'cd deployments\ndocker-compose up -d --build',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Unstable Field Connectivity",
                    solution: "Implemented a robust state machine in C++ firmware with exponential backoff retries and auto-reconnection logic to ensure zero data loss during network interruptions."
                },
                {
                    problem: "Real-time Latency",
                    solution: "Adoption of a Direct-to-Cloud architecture where edge devices bypass intermediate gateways and write directly to Firebase, reducing latency to milliseconds."
                },
                {
                    problem: "Secure Config Management",
                    solution: "Developed a centralized Go (Gin) backend service to manage and distribute sensitive configuration and credentials securely, decoupling them from the frontend code."
                }
            ]
        },
        {
            id: 'project-6',
            slug: 'docsinsight-engine',
            title: 'DocsInsight Engine',
            description: 'Enterprise RAG System for intelligent document analysis.',
            longDescription: 'DocsInsight Engine is a high-performance, private Retrieval-Augmented Generation (RAG) platform. It allows users to upload complex documents and interact with them through a neural search interface powered by local Large Language Models (LLMs). Built on a robust Python/Flask backend and orchestrated by LangChain, it ensures sensitive data never leaves your infrastructure while delivering enterprise-grade search capabilities.',
            techStack: [
                'Python',
                'Flask',
                'LangChain',
                'Ollama',
                'ChromaDB',
                'Docker'
            ],
            tools: [
                'VS Code',
                'Docker',
                'Ollama'
            ],
            status: 'completed',
            repoUrl: '#/RAG-DocsInsight-Engine',
            demoUrl: '#',
            startDate: '2024-11-01',
            role: 'AI Engineer',
            customTimeline: 'Oct - Nov 2025',
            highlights: [
                'Local LLM Execution',
                'Multi-Format Support',
                'Neural Retrieval'
            ],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Core Capabilities',
                    items: [
                        '**Multi-Format Support**: Seamlessly process PDF, DOCX, XLSX, CSV, and TXT files.',
                        '**Privacy-Centric**: Fully local execution using **Ollama**. Your sensitive data never leaves your infrastructure.',
                        '**Neural Retrieval**: Uses **ChromaDB** for high-speed vector similarity search.'
                    ]
                },
                {
                    title: 'Modern Interface',
                    items: [
                        '**Glassmorphism UI**: A sleek, dark-themed interface with real-time markdown rendering.',
                        '**Code Highlighting**: Automatic syntax highlighting for technical responses.',
                        '**Source Verification**: Every answer comes with citations from uploaded documents to prevent hallucinations.'
                    ]
                },
                {
                    title: 'Technical Architecture',
                    items: [
                        '**Backend**: Python 3.11 with Flask and LangChain orchestration.',
                        '**Vector DB**: ChromaDB for persistent document embeddings.',
                        '**One-Command Setup**: Production-ready deployment with Docker and Docker Compose.'
                    ]
                },
                {
                    title: 'System Insights',
                    items: [
                        '**Scalability**: The `VectorStoreManager` handles multiple documents simultaneously by filtering searches based on unique file hashes.',
                        '**Performance**: Document chunking is optimized with a `1000` character size and `200` character overlap.',
                        '**Security**: Strictly enforced policies to prevent sensitive credentials (`.env`) or local databases from being exposed.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone and Setup',
                    code: 'git clone #/RAG-DocsInsight-Engine.git\ncd rag-docsinsight-engine',
                    type: 'code'
                },
                {
                    title: 'Launch with Docker',
                    code: 'docker-compose up --build',
                    type: 'code'
                },
                {
                    title: 'Access Application',
                    code: 'Open http://localhost:5000',
                    type: 'text'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Scalability with Multiple Documents",
                    solution: "Designed a `VectorStoreManager` that filters searches based on unique file hashes, allowing the system to handle multiple uploaded documents simultaneously without cross-contamination."
                },
                {
                    problem: "Context Window Efficiency",
                    solution: "Optimized document chunking with a 1000-character size and 200-character overlap to maintain context coherence while fitting within the Llama 3 context window."
                },
                {
                    problem: "Data Security",
                    solution: "Implemented strict `.dockerignore` and `.gitignore` policies to prevent sensitive credentials (`.env`) or local vector databases from being leaked to version control."
                }
            ]
        },
        {
            id: 'project-7',
            slug: 'donasiaku',
            title: 'Donasiaku',
            description: 'Platform Penyaluran Donasi Barang Layak Pakai.',
            longDescription: 'Donasiku adalah platform modern yang dirancang untuk memfasilitasi penyaluran donasi barang fisik layak pakai secara efisien dan transparan. Menghubungkan Donatur dengan Penerima melalui ekosistem digital yang dilengkapi fitur pelacakan status, chat real-time, dan verifikasi akun untuk memastikan bantuan sampai ke tangan yang tepat.',
            techStack: [
                'Laravel 12',
                'React 19',
                'Tailwind CSS 3.4',
                'MySQL',
                'Vite',
                'Sanctum'
            ],
            tools: [
                'VS Code',
                'Docker',
                'Postman',
                'MySQL Workbench'
            ],
            status: 'completed',
            repoUrl: 'https://github.com/Mazkad12/DONASIKU-WEBPRO',
            demoUrl: 'https://donasiku.site/',
            startDate: '2024-10-01',
            role: 'Full Stack Developer',
            customTimeline: 'Oct - Dec 2025',
            team: '6 Developers',
            highlights: [
                'Monorepo Architecture',
                'Real-time Chat',
                'Sanctum Authentication'
            ],
            category: 'Software Engineering',
            features: [
                {
                    title: 'Donation Management',
                    items: [
                        '**Postingan Donasi**: Donatur dapat mengunggah barang dengan foto, deskripsi, dan kategori.',
                        '**Permintaan Barang**: Penerima dapat menelusuri katalog dan mengirim permintaan langsung.',
                        '**Status Tracking**: Pelacakan status transparan mulai dari Dipesan hingga Diterima.'
                    ]
                },
                {
                    title: 'Security & Trust',
                    items: [
                        '**Otentikasi Aman**: Didukung oleh **Laravel Sanctum** untuk manajemen sesi yang kuat.',
                        '**Verifikasi Akun**: Sistem validasi dokumen untuk memastikan kredibilitas Penerima.',
                        '**Role-Based Access**: Antarmuka yang dioptimalkan khusus untuk Donatur dan Penerima.'
                    ]
                },
                {
                    title: 'Communication',
                    items: [
                        '**Real-time Chat**: Koordinasi langsung antara donor dan penerima dalam platform.',
                        '**Sistem Notifikasi**: Pemberitahuan instan untuk pesan baru dan perubahan status donasi.',
                        '**Responsive UI**: Desain yang dioptimalkan untuk akses dari seluler hingga desktop.'
                    ]
                },
                {
                    title: 'User Intelligence',
                    items: [
                        '**Manajemen Profil**: Pengaturan informasi pribadi, avatar, dan preferensi donasi.',
                        '**Riwayat Aktivitas**: Rekam jejak lengkap donasi yang pernah diberikan atau diterima.',
                        '**Analitik Sederhana**: Statistik kontribusi sosial bagi pengguna aktif.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone the Repository',
                    code: 'git clone https://github.com/Mazkad12/DONASIKU-WEBPRO.git\ncd donasiaku',
                    type: 'code'
                },
                {
                    title: 'Docker Setup (Recommended)',
                    code: 'docker-compose -f docker-compose.dev.yml up -d --build',
                    type: 'code'
                },
                {
                    title: 'Manual Backend Setup',
                    code: 'cd backend\ncomposer install\ncp .env.example .env\nphp artisan key:generate\nphp artisan migrate\nphp artisan serve',
                    type: 'code'
                },
                {
                    title: 'Manual Frontend Setup',
                    code: 'cd frontend\nnpm install\nnpm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Secure Document Verification",
                    solution: "Developed a robust backend pipeline with Laravel Sanctum and manual admin verification workflows to ensure high trust levels for beneficiary accounts."
                },
                {
                    problem: "Real-time Coordination Complexity",
                    solution: "Integrated a custom chat system with instant state updates to facilitate direct communication without relying on third-party messaging apps."
                },
                {
                    problem: "Monorepo Environment Sync",
                    solution: "Orchestrated a containerized development environment using Docker to ensure seamless integration between the PHP/Laravel API and React 19 client."
                }
            ]
        },
        {
            id: 'project-8',
            slug: 'security-automation-genai',
            title: 'Security Automation with GenAI',
            description: 'AI-driven cybersecurity threat detection system using Transformers.',
            longDescription: 'Security Automation with GenAI is a research-driven project exploring the intersection of deep learning and cybersecurity. It leverages state-of-the-art Transformer architectures and Adaptive Attention mechanisms to automate the detection of complex threats like SQL Injection, DDoS, and network intrusions, providing a robust defense framework for modern digital infrastructures.',
            techStack: [
                'Python',
                'TensorFlow',
                'Keras',
                'Transformers',
                'Pandas',
                'Scikit-learn',
                'Adaptive Attention'
            ],
            tools: [
                'VS Code',
                'Jupyter Notebook',
                'Google Colab',
                'Wireshark'
            ],
            status: 'completed',
            repoUrl: '#/Security-Automation-GenAI',
            demoUrl: '#',
            startDate: '2024-09-01',
            role: 'AI Developer',
            customTimeline: 'Nov - Dec 2025',
            team: 'SOC Intern Project',
            highlights: [
                'Transformer-Based SQLi Detection',
                'Adaptive Attention for DDoS',
                'Multi-Modal Data Fusion'
            ],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Threat Intelligence',
                    items: [
                        '**SQLi Transformer**: Contextual learning model that recognizes malicious SQL patterns in HTTP requests.',
                        '**Phishing BERT**: Bidirectional analysis of URLs and email text to identify deceptive social engineering attempts.',
                        '**Malware Classification**: Network traffic sequence analysis to detect C2 communications.'
                    ]
                },
                {
                    title: 'Network Defense',
                    items: [
                        '**Adaptive DDoS Protection**: Real-time traffic analysis using dynamic attention weights for spike detection.',
                        '**Intrusion Detection**: High-precision classification of unauthorized access patterns using UNSW-NB15 datasets.',
                        '**MitM Identification**: Anomaly detection in communication sequences to identify packet interception.'
                    ]
                },
                {
                    title: 'Research Domains',
                    items: [
                        '**Zero-Day Detection**: Unsupervised learning approach to identify previously unmapped attack behaviors.',
                        '**Ransomware Prediction**: Sequence modeling for sudden encryption patterns in packet data.',
                        '**Insider Threat Analysis**: Comprehensive user activity log analysis for unusual access patterns.'
                    ]
                },
                {
                    title: 'Performance Analytics',
                    items: [
                        '**Comprehensive Metrics**: Evaluation using precision-recall curves, F1-scores, and confusion matrices.',
                        '**Visual Insights**: Deep data distribution analysis using Matplotlib and Seaborn.',
                        '**Temporal Analysis**: Understanding data flow over time to identify slow-burning APT (Advanced Persistent Threats).'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Setup Environment',
                    code: 'git clone #/Security-Automation-GenAI.git\ncd security-automation-ai-genai\n# Recommended: use a virtual environment',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install tensorflow pandas numpy matplotlib seaborn scikit-learn jupyter',
                    type: 'code'
                },
                {
                    title: 'Run Research Notebooks',
                    code: 'cd [target_source_dir]\njupyter notebook\n# Open the .ipynb files in the notebook subdirectory',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Signature-Based Limitations",
                    solution: "Transformed security operations by implementing Transformer models that learn from behavior and context rather than static signatures."
                },
                {
                    problem: "Dynamic Attack Patterns",
                    solution: "Developed an Adaptive Attention mechanism that dynamically adjusts focus to specific traffic segments during active DDoS attempts."
                },
                {
                    problem: "Multi-Modal Data Synchronization",
                    solution: "Engineered a data fusion pipeline to integrate network traffic, file logs, and process behavior into a unified Transformer input layer."
                }
            ]
        },
        {
            id: 'project-9',
            slug: 'web3-guestbook-dapp',
            title: 'Web3 Guestbook DApp',
            description: 'Decentralized guestbook on Ethereum allowing for immutable messages.',
            longDescription: 'Web3GuestbookDapp is a decentralized application that bridges modern Web2 interfaces with the Ethereum blockchain. It allows users to connect their MetaMask wallets and sign a persistent guestbook, creating immutable records of their visit. The project demonstrates the full lifecycle of a DApp, from smart contract development with Solidity to a responsive frontend built with Next.js.',
            techStack: [
                'Solidity',
                'Hardhat',
                'Next.js',
                'Ethereum',
                'Web3.js',
                'MetaMask',
                'Ethers.js'
            ],
            tools: [
                'VS Code',
                'MetaMask',
                'Remix IDE',
                'Vercel'
            ],
            status: 'completed',
            repoUrl: '#/Web3GuestbookDapp',
            demoUrl: 'https://metamaskguestbook.vercel.app/',
            startDate: '2025-01-01',
            role: 'Blockchain Developer',
            customTimeline: 'Jan - Feb 2026',
            team: 'Personal Project',
            highlights: [
                'Immutable Blockchain Records',
                'MetaMask Integration',
                'Smart Contract Automation'
            ],
            category: 'Blockchain',
            features: [
                {
                    title: 'Wallet Integration',
                    items: [
                        '**MetaMask Connection**: Seamless user authentication through industry-standard Web3 providers.',
                        '**Account Status**: Real-time monitoring of wallet connection and network synchronization.',
                        '**Auto-Recovery**: Graceful handling of network switches and account changes.'
                    ]
                },
                {
                    title: 'Blockchain Logic',
                    items: [
                        '**Solidity Smart Contract**: Robust logic for managing guestbook entries stored on-chain.',
                        '**Hardhat Environment**: Comprehensive suite for testing, compiling, and deploying contracts.',
                        '**Immutable Logs**: Every signature is a permanent transaction on the Ethereum network.'
                    ]
                },
                {
                    title: 'Real-time Interaction',
                    items: [
                        '**Auto-Fetch Feed**: Instant update of guestbook entries upon successful blockchain confirmation.',
                        '**Transaction Feedback**: Visual indicators for transaction pending, success, and error states.',
                        '**Wave Reactions**: Interactive "Wave" feature that sends a blockchain-verified greeting.'
                    ]
                },
                {
                    title: 'Optimized Frontend',
                    items: [
                        '**Next.js 14**: High-performance interface with optimized rendering and asset delivery.',
                        '**Tailwind Styling**: Modern, clean UI designed for a professional Web3 experience.',
                        '**ABI Bridge**: Secure integration between Javascript logic and the smart contract interface.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone & Install',
                    code: 'git clone #/Web3GuestbookDapp.git\ncd web3guestbookdapp\nnpm install',
                    type: 'code'
                },
                {
                    title: 'Blockchain Setup',
                    code: 'cd backend\nnpx hardhat node\n# In a new terminal:\nnpx hardhat run scripts/deploy.js --network localhost',
                    type: 'code'
                },
                {
                    title: 'Frontend Configuration',
                    code: 'cd ../frontend\n# Update contract-address.json with the deployed address\nnpm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Blockchain Nonce Desynchronization",
                    solution: "Implemented a custom activity reset workflow and state-sync logic to handle cases where local blockchain resets caused mismatching nonces in MetaMask."
                },
                {
                    problem: "Contract ABI Management",
                    solution: "Automated the ABI extraction process into the frontend environment to ensure the bridge between Web2 and Web3 remains perfectly aligned during contract updates."
                },
                {
                    problem: "Ethereum Event Handling",
                    solution: "Utilized Ethers.js event listeners to trigger UI updates directly from the blockchain state, ensuring the feed remains real-time without polling."
                }
            ]
        },
        {
            id: 'project-10',
            slug: 'digilibzx',
            title: 'Digilibzx',
            description: 'Modern full-stack digital library management system with AI-powered features.',
            longDescription: 'Digilibzx is a comprehensive digital library management solution designed to streamline library operations. Built with a robust Java Spring Boot backend and a high-performance Next.js frontend, it integrates Google Gemini and OpenAI to provide automated book summaries. The system features a multi-layered security framework, real-time activity analytics, and a seamless borrowing system for an enhanced user experience.',
            techStack: [
                'Java',
                'Spring Boot 3',
                'Next.js 14',
                'TypeScript',
                'MySQL',
                'Spring Security',
                'Hibernate',
                'Docker',
                'Tailwind CSS',
                'Shadcn UI',
                'Google Gemini',
                'OpenAI',
                'Swagger',
                'Recharts'
            ],
            tools: [
                'IntelliJ IDEA',
                'VS Code',
                'Docker Desktop',
                'MySQL Workbench',
                'Maven',
                'pnpm'
            ],
            status: 'completed',
            repoUrl: '#/Digilibzx',
            demoUrl: '#',
            startDate: '2024-08-01',
            role: 'Lead & Full Stack Dev',
            customTimeline: 'December 2025',
            team: '5 Developers',
            highlights: [
                'AI-Powered Book Summaries',
                'Real-time Analytics Dashboard',
                'Docker Containerization Ready'
            ],
            category: 'Software Engineering',
            features: [
                {
                    title: 'User Experience',
                    items: [
                        '**Smart Search**: Advanced book discovery by title, category, or author with real-time filtering.',
                        '**Self-Service Circulation**: Integrated shopping cart for borrowing requests and return tracking.',
                        '**Review System**: Community-driven ratings and reviews for every book in the collection.'
                    ]
                },
                {
                    title: 'AI Capabilities',
                    items: [
                        '**AI Summarize**: Automatic generation of book summaries using Google Gemini & OpenAI API integration.',
                        '**Smart Recommendations**: Data-driven book suggestions based on user borrowing patterns.',
                        '**Content Analysis**: Intelligent categorization and tagging of new library additions.'
                    ]
                },
                {
                    title: 'Admin Controls',
                    items: [
                        '**Analytics Dashboard**: Visualized insights into borrowing trends and popular books using Recharts.',
                        '**Transaction Validation**: Streamlined approval/rejection workflow for borrowing requests.',
                        '**Inventory Control**: Comprehensive book and category management with cover upload support.'
                    ]
                },
                {
                    title: 'System Integrity',
                    items: [
                        '**Secure Authentication**: Multi-layered protection using Spring Security and JWT signatures.',
                        '**PDF Reporting**: Automated generation of analytics and inventory reports for library auditing.',
                        '**Docker Ready**: Optimized orchestration for easy deployment and scalability across environments.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Docker Method (Recommended)',
                    code: 'git clone #/Digilibzx.git\ncd digilibzx\n# Update .env and application.properties\ndocker-compose up --build',
                    type: 'code'
                },
                {
                    title: 'Manual Backend Setup',
                    code: 'cd backend\nmvn clean install\n# Setup MySQL (digilibz_db) and update application.properties\nmvn spring-boot:run',
                    type: 'code'
                },
                {
                    title: 'Manual Frontend Setup',
                    code: 'cd frontend\npnpm install\nnpm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "AI Model Token Constraints",
                    solution: "Implemented a text-shredding and summarization pipeline to handle large book descriptions without exceeding Google Gemini's token limits."
                },
                {
                    problem: "Real-time Chart Performance",
                    solution: "Optimized database queries and integrated Recharts with memoized components to ensure smooth rendering of library activity dashboards."
                },
                {
                    problem: "Multi-Role Security Complexity",
                    solution: "Configured a granular Spring Security filter chain to manage distinct access levels for Admins, Lecturers, and Students securely."
                }
            ]
        },
        {
            id: 'project-12',
            slug: 'polabdc-dental-management',
            title: 'POLABDC Dental Management',
            description: 'AI-powered Dental Clinic Management SaaS for digitized operations.',
            longDescription: 'RoxyDental (POLABDC) is a high-performance SaaS solution designed to digitize dental clinic operations. It integrates Artificial Intelligence to assist dentists with disease prediction and data analysis while providing a seamless experience for patients, nurses, and administrators. Built as a Monorepo, the system ensures scalability by separating the Next.js client, Express.js server, and dynamic Python AI processing unit.',
            techStack: [
                'Next.js 14',
                'Express.js',
                'Prisma',
                'Supabase',
                'PostgreSQL',
                'Python',
                'TypeScript',
                'Tailwind CSS',
                'Shadcn UI',
                'JWT',
                'Google Gemini'
            ],
            tools: [
                'VS Code',
                'Supabase Dashboard',
                'Prisma Studio',
                'Figma',
                'Postman'
            ],
            status: 'completed',
            repoUrl: '#/POLABDC',
            demoUrl: 'https://polabdc.my.id/',
            startDate: '2024-07-01',
            role: 'Backend Developer',
            customTimeline: 'Nov 2025 - Jan 2026',
            team: '3 Developers',
            highlights: [
                'AI-Driven EMR System',
                'Monorepo Architecture',
                'Real-time Queue Management'
            ],
            category: 'Software Engineering',
            features: [
                {
                    title: 'Dentist Experience',
                    items: [
                        '**Smart Dashboard**: Overview of daily appointments and financial stats at a glance.',
                        '**Digital EMR**: Comprehensive Electronic Medical Records with full history tracking.',
                        '**AI Assistant**: Intelligent disease prediction and clinical data analysis for diagnosis support.',
                        '**Treatment Planning**: Record treatments, prescriptions, and detailed clinical notes.'
                    ]
                },
                {
                    title: 'Nursing Workflow',
                    items: [
                        '**Queue Management**: Real-time handling of patient queues for efficient clinic flow.',
                        '**Vitals Recording**: Pre-consultation checks including blood pressure and symptom logging.',
                        '**Rapid Registration**: Streamlined onboarding process for new patients.'
                    ]
                },
                {
                    title: 'Operational Logic',
                    items: [
                        '**Scheduling System**: Conflict-free calendar for managing clinic-wide appointments.',
                        '**Billing & Invoicing**: Automated revenue tracking and invoice generation.',
                        '**RBAC Security**: Granular Role-Based Access Control for different clinic personnel.'
                    ]
                },
                {
                    title: 'AI & Infrastructure',
                    items: [
                        '**AI Service Integration**: Python-based microservice for high-speed disease prediction models.',
                        '**Monorepo Scaling**: Structured architecture connecting Next.js, Express.js, and AI modules.',
                        '**Database Architecture**: High-performance schema design using Prisma ORM and PostgreSQL.',
                        '**Real-time Synchronization**: Leveraging Supabase subscriptions for instant state updates across the clinic.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Database Setup',
                    code: 'cd backend\nnpm install\n# Configure .env with DATABASE_URL (Supabase)\nnpx prisma migrate dev --name init',
                    type: 'code'
                },
                {
                    title: 'Backend & AI Setup',
                    code: 'npm run dev # Backend starts at port 5000\ncd ../roxydental-ai\npip install -r requirements.txt\npython api.py',
                    type: 'code'
                },
                {
                    title: 'Frontend Launch',
                    code: 'cd ../frontend\nnpm install\n# Configure .env.local with NEXT_PUBLIC_API_URL\nnpm run dev',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "AI Service Latency",
                    solution: "Isolated the AI engine into a separate Python microservice to prevent heavy ML processing from blocking the main Express.js event loop."
                },
                {
                    problem: "Monorepo Orchestration",
                    solution: "Implemented a structured directory system with shared environment configurations to maintain synchronization across Frontend, Backend, and AI modules."
                },
                {
                    problem: "Real-time Queue Sync",
                    solution: "leveraged Supabase real-time subscriptions and optimistic UI updates to ensure nurses and doctors see patient status changes instantly."
                }
            ]
        },
        {
            id: 'project-13',
            slug: 'deep-learning-image-classifier',
            title: 'Deep Learning Image Classifier',
            description: 'Interactive educational platform for visualizing CNN and Transfer Learning mechanics.',
            longDescription: 'The Deep Learning Image Classifier is an interactive educational platform designed to demystify the inner workings of Convolutional Neural Networks (CNN) and Transfer Learning. Built with Streamlit and TensorFlow, the application provides real-time visualizations of image preprocessing, RGB channel analysis, convolution operations, and intermediate feature maps, allowing users to watch as the model extracts features and reaches a classification decision.',
            techStack: [
                'Python',
                'TensorFlow',
                'Keras',
                'Streamlit',
                'Plotly',
                'NumPy',
                'SciPy',
                'MobileNetV2',
                'Pillow'
            ],
            tools: [
                'Jupyter Notebook',
                'Google Colab',
                'Streamlit Cloud',
                'VS Code'
            ],
            status: 'completed',
            repoUrl: '#/CA-Modul03-HandsOn',
            demoUrl: 'https://ca-modul03-handson.streamlit.app/',
            startDate: '2024-06-01',
            role: 'AI Research Engineer',
            customTimeline: 'Nov 2025',
            team: 'Personal Project',
            highlights: [
                'Real-time Feature Map Visualization',
                'Interactive Layer Breakdown',
                'CNN vs Transfer Learning Comparison'
            ],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Interactive Analytics',
                    items: [
                        '**RGB Matrix Analysis**: Dynamic heatmaps and histograms for detailed color channel decomposition.',
                        '**Feature Map Extraction**: Live visualization of intermediate layer outputs to understand what the model "sees".',
                        '**Prediction Confidence**: Interactive probability distributions and confidence meters for classification results.'
                    ]
                },
                {
                    title: 'Architecture Deep-Dive',
                    items: [
                        '**Custom CNN Workflow**: Step-by-step breakdown of a 3-layer convolutional network for hand gesture recognition.',
                        '**Conv Operations**: Real-time demonstration of filters extracting edges, textures, and patterns.',
                        '**MobileNetV2 Integration**: Implementation of pre-trained ImageNet models for high-accuracy Cheetah vs Hyena classification.'
                    ]
                },
                {
                    title: 'Model Learning',
                    items: [
                        '**Transfer Learning Mechanics**: Visual explanation of frozen base models and custom classifier fine-tuning.',
                        '**Hyperparameter Insights**: Interactive Sliders to adjust visualization parameters and model thresholds.',
                        '**Performance Reporting**: Detailed accuracy and loss metrics comparison between custom and pre-trained architectures.'
                    ]
                },
                {
                    title: 'Educational UX',
                    items: [
                        '**Progressive Visualization**: Managed learning path from raw image input to final classification probability.',
                        '**Interactive Documentation**: Integrated explanations of convolution, pooling, and activation functions.',
                        '**Dual-Model Comparison**: Parallel demonstration of standard CNN vs state-of-the-art Transfer Learning (MobileNetV2).'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Environment Setup',
                    code: 'git clone #/CA-Modul03-HandsOn.git\ncd CA-Modul03-HandsOn\npython -m venv venv\nsource venv/bin/activate',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install -r requirements.txt',
                    type: 'code'
                },
                {
                    title: 'Launch Platform',
                    code: 'streamlit run app.py',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Intermediate Activation Capture",
                    solution: "Constructed sub-models using the Keras Functional API to extract output tensors from specific intermediate layers without interrupting the main inference pipeline."
                },
                {
                    problem: "High-Resolution Heatmap Lag",
                    solution: "Optimized RGB intensity distributions using Plotly's WebGL-accelerated rendering and data downsampling for ultra-smooth interactive charts."
                },
                {
                    problem: "Limited Computation on Edge",
                    solution: "Utilized depthwise separable convolutions from MobileNetV2 to achieve 96%+ accuracy while maintaining low-latency inference on standard CPU-based instances."
                }
            ]
        },
        {
            id: 'project-14',
            slug: 'ai-book-discovery-platform',
            title: 'AI Book Discovery Platform',
            description: 'Local RAG-based book recommendation system with semantic search.',
            longDescription: 'The AI Book Discovery Platform is an intelligent recommendation system that moves beyond simple keyword matching to understand the semantic context of user queries. Powered by Ollama, it leverages the \"nomic-embed-text\" model for vector-based search and \"llama3.2:1b\" for expert-level book analysis. The entire system runs 100% locally, ensuring complete user privacy while providing deep insights into search intent and reader profiling.',
            techStack: [
                'Python',
                'Streamlit',
                'Ollama',
                'LangChain',
                'Nomic Embed',
                'Llama 3.2',
                'Pandas',
                'Scikit-learn'
            ],
            tools: [
                'VS Code',
                'Ollama Runtime',
                'Streamlit Cloud',
                'Jupyter Notebook'
            ],
            status: 'completed',
            repoUrl: '#/OllamaLLM-RecomendationSystem',
            demoUrl: '#',
            startDate: '2024-05-01',
            role: 'Ai & Software Developer',
            customTimeline: 'Oct - Nov 2025',
            team: 'Personal Project',
            highlights: [
                'Semantic Search Engine',
                '100% Local LLM Inference',
                'Privacy-First Architecture'
            ],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Search Architecture',
                    items: [
                        '**Semantic Discovery**: Natural language understanding using vector embeddings to find books by theme and intent.',
                        '**Vector Search**: Implementation of Cosine Similarity algorithms to rank matches by semantic relevance.',
                        '**Contextual Logic**: Ability to find relevant titles even without matching exact keywords in descriptions.'
                    ]
                },
                {
                    title: 'Local AI Intelligence',
                    items: [
                        '**LLM Analysis**: Leveraging Llama 3.2 to generate expert book reviews, summaries, and audience insights.',
                        '**Query Decomposition**: Intelligent breakdown of user search descriptions to identify hidden reading preferences.',
                        '**Reader Profiling**: AI-generated reports on the user\'s reading style based on their historical search history.'
                    ]
                },
                {
                    title: 'Data Management',
                    items: [
                        '**Curated Datasets**: Pre-loaded collection of diverse literature for immediate discovery.',
                        '**Custom Ingestion**: Support for user-uploaded CSV datasets to enable search across personal libraries.',
                        '**Dynamic Tabulation**: Real-time processing and ranking of large book catalogs using optimized Pandas pipelines.'
                    ]
                },
                {
                    title: 'Privacy & Performance',
                    items: [
                        '**Edge Computing**: 100% local inference via Ollama, ensuring no data ever leaves the user\'s machine.',
                        '**Inference Optimization**: Fine-tuned model parameters (top_k, temperature) to balance generation speed and analytical depth.',
                        '**Responsive UI**: Instant feedback loops in Streamlit for embedding generation and generation status.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Ollama Setup',
                    code: 'ollama pull nomic-embed-text\nollama pull llama3.2:1b\n# Ensure Ollama serve is running',
                    type: 'code'
                },
                {
                    title: 'Environment Launch',
                    code: 'git clone #/OllamaLLM-RecomendationSystem.git\npip install -r requirements.txt\nstreamlit run OllamaLLM.py',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Vector Storage Overhead",
                    solution: "Developed an on-demand embedding generation and caching strategy for local datasets to eliminate the need for an external vector database."
                },
                {
                    problem: "LLM Hallucination Control",
                    solution: "Implemented strict system prompts and few-shot examples within the RAG pipeline to ensure generated reviews stay grounded in the provided book metadata."
                },
                {
                    problem: "System Resource Management",
                    solution: "Optimized the transition between the embedding model and generative model to prevent VRAM spikes on machines with limited hardware."
                }
            ]
        },
        {
            id: 'project-15',
            slug: 'mytelkomsel-sentiment-analysis',
            title: 'MyTelkomsel Sentiment Analysis',
            description: 'Comparing ML/DL architectures for Indonesian app review sentiment classification.',
            longDescription: 'This project provides a comprehensive sentiment analysis pipeline for MyTelkomsel application reviews scraped from the Google Play Store. It features a robust Indonesian text preprocessing engine and compares three distinct architectural approaches: TF-IDF with Linear SVM, Word2Vec with Random Forest, and a Deep Learning BiLSTM network to identify user sentiment with high accuracy.',
            techStack: [
                'Python',
                'TensorFlow',
                'Keras',
                'Scikit-learn',
                'Gensim',
                'Pandas',
                'NumPy',
                'google-play-scraper'
            ],
            tools: [
                'Jupyter Notebook',
                'Git LFS',
                'VS Code',
                'Google Play Store API'
            ],
            status: 'completed',
            repoUrl: '#/MyTelkomsel-Sentiment-Insights',
            demoUrl: '#',
            startDate: '2024-03-01',
            role: 'Data Scientist',
            customTimeline: 'Aug - Oct 2025',
            team: 'Personal Project',
            highlights: [
                'BiLSTM Deep Learning Model',
                'Automated Play Store Scraping',
                'Indonesian NLP Pipeline'
            ],
            category: 'Data Science',
            features: [
                {
                    title: 'Data Acquisition',
                    items: [
                        '**Automated Scraping**: Direct review extraction from Google Play Store using `google-play-scraper`.',
                        '**Star Rating Mapping**: Automated labeling logic (1-2 stars → Negative, 3 → Neutral, 4-5 → Positive).',
                        '**Indonesian Focus**: Targeted collection logic specifically for the `id:id` locale.'
                    ]
                },
                {
                    title: 'Text Preprocessing',
                    items: [
                        '**Tokenization & Cleaning**: Robust removal of URLs, mentions, hashtags, and whitespace normalization.',
                        '**Indonesian NLP**: Specific normalization rules to handle local slang and formal/informal Indonesian text.',
                        '**Vectorization Pipelines**: Comparative implementation of TF-IDF, Word2Vec, and Keras Tokenizer.'
                    ]
                },
                {
                    title: 'Model Architectures',
                    items: [
                        '**Scheme A (Linear SVM)**: High-speed production model using TF-IDF feature extraction (86.15% accuracy).',
                        '**Scheme B (Random Forest)**: Ensemble learning approach using 200D custom Word2Vec embeddings.',
                        '**Scheme C (BiLSTM)**: State-of-the-art Deep Learning architecture for capturing sequential context (86.82% accuracy).'
                    ]
                },
                {
                    title: 'Analytical Insights',
                    items: [
                        '**Performance Benchmarking**: Detailed F1-score and accuracy comparison across all three model types.',
                        '**CLI Inference Tool**: Cross-platform command-line tool for real-time sentiment prediction.',
                        '**Model Persistence**: Efficient storage and versioning of large `.keras` and `.joblib` files via Git LFS.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Base Setup',
                    code: 'git clone #/MyTelkomsel-Sentiment-Insights.git\ncd mytelkomsel-sentiment-analysis\ngit lfs install\ngit lfs pull\npip install -r requirements.txt',
                    type: 'code'
                },
                {
                    title: 'Data Collection',
                    code: 'python src/scraping/scrape_playstore.py\npython src/prepare_dataset.py',
                    type: 'code'
                },
                {
                    title: 'Inference',
                    code: 'python src/train/inference.py --text "Aplikasi sangat bagus dan membantu!"',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Imbalanced Neutral Sentiment",
                    solution: "Applied custom weights and refined text normalization to improve F1-scores for the neutral class, which is inherently more ambiguous in Indonesian app reviews."
                },
                {
                    problem: "Large Model Storage",
                    solution: "Integrated Git LFS (Large File Storage) to manage model binary persistence while keeping the source repository lightweight and performant."
                },
                {
                    problem: "Casual Language Variance",
                    solution: "Developed a robust preprocessing script to handle Indonesian-specific linguistic nuances, slang, and common typos found in Play Store reviews."
                }
            ]
        },
        {
            id: 'project-16',
            slug: 'neurovision-real-time-detection',
            title: 'NeuroVision (Real-time Detection)',
            description: 'Advanced real-time object detection using YOLOv3 and Darknet-53.',
            longDescription: 'NeuroVision is a high-performance computer vision system that implements real-time object detection using the YOLOv3 (You Only Look Once) algorithm. By leveraging the Darknet-53 backbone and OpenCV\'s DNN module, the platform can simultaneously detect and classify 80 categories of objects from the COCO dataset with massive throughput and minimal latency, even on edge-computing hardware.',
            techStack: [
                'Python',
                'OpenCV',
                'YOLOv3',
                'Darknet-53',
                'NumPy',
                'CUDA',
                'OpenCL',
                'COCO Dataset'
            ],
            tools: [
                'VS Code',
                'Darknet CLI',
                'Git LFS',
                'PowerShell'
            ],
            status: 'completed',
            repoUrl: '#/NeuroVision-Smarter-RealTime-Detection',
            demoUrl: '#',
            startDate: '2025-01-01',
            role: 'CV Developer',
            customTimeline: 'Oct 2025',
            team: 'Personal Project',
            highlights: [
                'Real-time 45+ FPS Detection',
                'Multi-scale Object Recognition',
                'GPU-Accelerated Inference'
            ],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Vision Engine',
                    items: [
                        '**Real-Time Processing**: Ultra-low latency detection logic capable of handling high-resolution webcam feeds.',
                        '**Object Localization**: Precise bounding box generation with adaptive color-coding for 80 distinct classes.',
                        '**Confidence Scoring**: Integrated probability mapping to filter low-confidence detections and ensure visual accuracy.'
                    ]
                },
                {
                    title: 'Architecture Logic',
                    items: [
                        '**Darknet-53 Backbone**: High-accuracy feature extraction using 53 convolutional layers for balanced speed and precision.',
                        '**Feature Pyramid Network (FPN)**: Multi-scale detection heads for identifying small, medium, and large objects simultaneously.',
                        '**Efficient Inference**: Single-pass forward propagation for holistic image analysis in one neural network execution.'
                    ]
                },
                {
                    title: 'Engineering Optimization',
                    items: [
                        '**GPU Acceleration**: Optional integration with CUDA and OpenCL for maximizing FPS on compatible hardware.',
                        '**Threshold Management**: Interactive configuration for Confidence and Non-Maximum Suppression (NMS) thresholds.',
                        '**I/O Versatility**: Support for diverse input sources including built-in webcams, external USB cameras, and RTSP streams.'
                    ]
                },
                {
                    title: 'Live Controls',
                    items: [
                        '**Interactive Commands**: Real-time hotkeys for pausing detection, capturing screenshots, and graceful exit.',
                        '**Performance Benchmarks**: On-screen FPS counters and object counters for real-time system monitoring.',
                        '**Adaptive Resizing**: Intelligent preprocessing pipeline using `dnn.blobFromImage` for standardized model input.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Repository & Env',
                    code: 'git clone #/NeuroVision-Smarter-RealTime-Detection.git\ncd neurovision-real-time-detection\npip install opencv-python numpy',
                    type: 'code'
                },
                {
                    title: 'Model Downloads',
                    code: 'wget https://pjreddie.com/media/files/yolov3.weights\n# Verify yolov3.cfg and coco.names are present',
                    type: 'code'
                },
                {
                    title: 'Launch Vision',
                    code: 'python Vision.py',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Low FPS on CPU Instances",
                    solution: "Implemented frame-skipping logic and resized the input blob to 320x320 to maintain smooth UI interactivity without sacrificing significant detection accuracy."
                },
                {
                    problem: "Overlapping Bounding Boxes",
                    solution: "Fine-tuned the NMS (Non-Maximum Suppression) threshold to 0.4, effectively merging redundant detections for the same object."
                },
                {
                    problem: "Environmental Lighting Noise",
                    solution: "Applied adaptive confidence thresholding to dynamically filter false positives in varying light conditions typical of diverse webcam environments."
                }
            ]
        },
        {
            id: 'project-17',
            slug: 'voices-unheard',
            title: 'Voices Unheard',
            description: 'Secure, anonymous digital sanctuary for conflict-affected story sharing.',
            longDescription: 'Voices Unheard is a mission-critical digital platform designed to provide a safe space for war victims, refugees, and survivors of discrimination to share their stories anonymously. As a System Analyst, I defined the technical architecture to ensure \"Zero Digital Refoulement\"—guaranteeing that no identifiable user data is ever collected or tracked. The platform integrates trauma-informed UI principles with AI-assisted pre-moderation, enabling vulnerable individuals to document their experiences with absolute technical security and emotional support.',
            techStack: [
                'Node.js',
                'Express.js',
                'PostgreSQL',
                'React.js',
                'AI (NLP)',
                'TLS 1.3',
                'AES-256'
            ],
            tools: [
                'VS Code',
                'Redis',
                'UML Design',
                'Figma'
            ],
            status: 'completed',
            repoUrl: '#/Voices-Unheard-ASE',
            demoUrl: '#',
            startDate: '2025-07-01',
            role: 'System Analyst',
            customTimeline: 'July - September 2025',
            team: '5 Developers',
            highlights: [
                'Secure Managed Anonymity',
                'Trauma-Informed UX',
                'Zero-Refoulement Architecture'
            ],
            category: 'Software Engineering',
            features: [
                {
                    title: 'Anonymous Protection',
                    items: [
                        '**Metadata Cleaning**: Automated removal of EXIF data and GPS coordinates from all uploaded files to protect user location.',
                        '**Zero IP Logging**: Privacy-first logging system that ensures no tracking of user identities or network signatures.',
                        '**Token-based Deletion**: Secure token system allowing users to delete their submissions without requiring a persistent account.'
                    ]
                },
                {
                    title: 'Trauma-Informed UI',
                    items: [
                        '**Quick Exit**: Always-visible emergency exit button that instantly redirects to neutral sites for physical safety.',
                        '**Content Warnings**: Layered consent mechanism requiring users to confirm before viewing potentially triggering media.',
                        '**Empathetic Design**: Minimalist, calming interface designed to reduce cognitive load and secondary trauma for survivors.'
                    ]
                },
                {
                    title: 'AI & Moderation',
                    items: [
                        '**Pre-screening Logic**: AI-driven NLP system that pre-moderates content for hate speech and high-risk triggers.',
                        '**Crisis Escalation**: Automated protocols for identifying crisis situations (suicide threats, etc.) and providing resource lists.',
                        '**Secure Dashboard**: Moderator interface designed for reviewing stories without any access to submitter metadata.'
                    ]
                },
                {
                    title: 'Security Infrastructure',
                    items: [
                        '**End-to-End Encryption**: Mandatory TLS 1.3 for all communications and AES-256 for data encryption at rest.',
                        '**OWASP Compliance**: Hardened backend implementation adhering to top-10 security practices for web applications.',
                        '**PostgreSQL Vault**: Database architecture utilizing at-rest encryption to protect sensitive narrative content.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'System Requirements',
                    code: 'Node.js 18+\nPostgreSQL 13+\nRedis (Session Management)',
                    type: 'code'
                },
                {
                    title: 'Security Configuration',
                    code: 'DATABASE_URL=postgres://...\nENCRYPTION_KEY=aes256_...\nAI_MODERATION_KEY=nlp_...',
                    type: 'code'
                },
                {
                    title: 'Platform Launch',
                    code: 'npm install\nnpm run seed (Optional: Sample AI prompts)\nnpm start',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Survivor Geolocation Risks",
                    solution: "Implemented a server-side interceptor that strips all binary metadata (EXIF/JFIF) from library-level upload requests before the file reaches the database."
                },
                {
                    problem: "AI Moderation Accuracy",
                    solution: "Utilized dual-layer moderation—AI for initial risk classification and human review for nuanced emotional context—ensuring survivors feel heard but not judged."
                },
                {
                    problem: "Quick Exit Latency",
                    solution: "Developed the Emergency Exit as a client-side listener that bypasses standard routing logic for a sub-100ms response time when clicked."
                }
            ]
        },
        {
            id: 'project-18',
            slug: 'smart-motion-detection-system',
            title: 'Smart Motion Detection System',
            description: 'AIoT motion detection using YOLO11-Pose and MQTT for smart home automation.',
            longDescription: 'The Smart Motion Detection System is an advanced IoT solution that leverages YOLO11n pose estimation to detect and analyze human movement patterns in real-time. Unlike traditional motion detectors that rely on simple pixel changes, this system performs sophisticated skeletal analysis (17 keypoints) to distinguish between meaningful human activity and environmental noise. Integrated with EMQX Cloud via secure MQTT, it enables precise automated control of smart home devices like lamps and fans with sub-second latency.',
            techStack: [
                'Python',
                'YOLO11-Pose',
                'OpenCV',
                'MQTT',
                'Raspberry Pi',
                'EMQX Cloud'
            ],
            tools: [
                'VS Code',
                'Raspberry Pi 5',
                'Mosquitto',
                'Git LFS'
            ],
            status: 'completed',
            repoUrl: 'https://github.com/CPS-TelU/AIoT-dmouv2025',
            demoUrl: '#',
            startDate: '2025-07-01',
            role: 'CV Researcher Intern',
            customTimeline: 'July - September 2025',
            team: 'CPS Research Group',
            highlights: [
                'Skeletal 17-Keypoint Tracking',
                'Secure SSL/TLS MQTT',
                'Raspberry Pi 5 Optimization'
            ],
            category: 'IoT & Embedded',
            features: [
                {
                    title: 'Intelligent Motion Analysis',
                    items: [
                        '**Advanced Pose Detection**: YOLO11n-based skeleton tracking with 17 keypoint analysis for human activity recognition.',
                        '**Smart Movement Filtering**: Intelligent algorithms to distinguish between meaningful motion and environmental noise (pets, shadows).',
                        '**Stability Analysis**: Multi-frame pose stability verification using normalized motion calculation independent of frame position.'
                    ]
                },
                {
                    title: 'Smart Device Integration',
                    items: [
                        '**Multi-Device Control**: Automated GPIO-level control for lamps, fans, and relays with precise state management.',
                        '**Operation Modes**: Support for Automatic (motion-based), Manual (remote override), and Scheduled control modes.',
                        '**Intelligent Auto-Off**: Highly configurable delay logic that turns off devices only when sustained inactivity is verified.'
                    ]
                },
                {
                    title: 'IoT Connectivity',
                    items: [
                        '**Secure MQTT Communication**: SSL/TLS encrypted messaging via EMQX Cloud for cross-network device orchestration.',
                        '**Remote Command API**: Standardized JSON topic structure for status updates, sensor events, and remote configuration.',
                        '**Dynamic Updates**: Remote parameter tuning for thresholds and cooldowns without requiring system restarts.'
                    ]
                },
                {
                    title: 'Performance Monitoring',
                    items: [
                        '**Real-time Analytics**: On-screen FPS counters and movement pattern visualizations for system health monitoring.',
                        '**Edge Optimization**: Tailored for Raspberry Pi 5 with buffer management and efficient deque structures for history data.',
                        '**Error Handling**: Comprehensive logging system and automatic MQTT reconnection logic for 24/7 uptime.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Hardware Setup',
                    code: 'Raspberry Pi 5 (4GB recommended)\nUSB Camera (640x480+)\nRelay Modules for GPIO Pin 26 (Lamp) and 19 (Fan)',
                    type: 'code'
                },
                {
                    title: 'Dependencies & Repo',
                    code: 'git clone https://github.com/CPS-TelU/AIoT-dmouv2025\npip install opencv-python ultralytics paho-mqtt',
                    type: 'code'
                },
                {
                    title: 'MQTT Configuration',
                    code: '# Edit MQTTConfig in AIoT-dmouv2025.py\nBROKER = "your-emqx-node.emqxsl.com"\nPORT = 8883 # Use SSL',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Environmental Pixel Flutter",
                    solution: "Moved away from frame-differencing to skeletal pose estimation, ensuring that only validated human keypoint movements trigger device actions."
                },
                {
                    problem: "IoT Latency in Unstable Networks",
                    solution: "Implemented an asynchronous Paho-MQTT client with local state caching, allowing the system to continue local processing during brief connectivity drops."
                },
                {
                    problem: "Hardware Resource Constraints",
                    solution: "Optimized model inference using the YOLO11n-pose variant and limited frame resolution to 640x480, achieving stable 30+ FPS on Raspberry Pi gear."
                }
            ]
        },
        {
            id: 'project-19',
            slug: 'solar-energy-pinn-prediction',
            title: 'Solar Energy PINN Prediction',
            description: 'AI-powered solar energy prediction system integrating Physics-Informed Neural Networks (PINN).',
            longDescription: 'This research-driven project introduces a Physics-Informed Neural Network (PINN) framework for optimizing solar energy prediction in Indonesia. By integrating fundamental solar radiation laws and thermal efficiency equations directly into the neural network\'s loss function, the system overcomes the intermittency challenges of renewable energy and data scarcity. The model achieves an R² of 0.834, significantly outperforming traditional data-only models while maintaining strict adherence to physical conservation laws.',
            techStack: [
                'Python',
                'TensorFlow',
                'Keras',
                'Scikit-learn',
                'Physics-Informed Neural Network',
                'NSRDB API'
            ],
            tools: [
                'Jupyter Notebook',
                'Google Colab',
                'Matplotlib',
                'Seaborn',
                'LaTeX'
            ],
            status: 'completed',
            repoUrl: '#/Photovoltaic-Physics-Informed-Neural-Network',
            demoUrl: '#',
            startDate: '2025-07-01',
            role: 'Data Scientist',
            customTimeline: 'July - August 2025',
            team: '3 Developers',
            highlights: [
                'Physics-Loss Integration',
                '25% RMSE Improvement',
                'National Energy Research'
            ],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Physics-Driven AI',
                    items: [
                        '**Hukum Fisika Terintegrasi**: Penggabungan persamaan radiasi matahari (G_eff) dan efisiensi termal panel ke dalam arsitektur AI.',
                        '**Smart Loss Function**: Desain custom loss function yang mengombinasikan data loss dengan physics residuals (Conseravation Laws).',
                        '**Auto-Differentiation**: Optimasi gradient berbasis automatic differentiation untuk pemenuhan hukum fisika yang presisi.'
                    ]
                },
                {
                    title: 'Advanced PINN Architecture',
                    items: [
                        '**Progressive Reduction**: Arsitektur neural network 5-layer dengan 8,673 parameter untuk ekstraksi fitur yang optimal.',
                        '**Physics Continuity**: Implementasi lambda weighting (λ=0.1) untuk menyeimbangkan pembelajaran dari data empiris dan teori fisika.',
                        '**Robust Generalization**: Kemampuan prediksi yang tetap akurat bahkan pada dataset terbatas melalui physics-guided learning.'
                    ]
                },
                {
                    title: 'Data & API Integration',
                    items: [
                        '**NREL NSRDB API**: Integrasi otomatis dengan National Solar Radiation Database untuk akuisisi data cuaca presisi tinggi.',
                        '**Nusantara Coverage**: Pengambilan data berbasis koordinat (Lat/Lon) untuk berbagai titik strategis PLTS di Indonesia.',
                        '**Automated Cleaning**: Pipeline preprocessing untuk outlier detection dan normalisasi data radiasi matahari secara real-time.'
                    ]
                },
                {
                    title: 'Predictive Analytics',
                    items: [
                        '**Scenario Analysis**: Simulasi output energi pada 6 variasi skenario cuaca ekstrim (Rainy vs Dry season).',
                        '**Metric Evaluation**: Pengujian performa mendalam menggunakan MAE, RMSE, dan R² dibandingkan dengan model baseline.',
                        '**SHAP Analysis**: Interpretasi model untuk memahami variabel cuaca paling berpengaruh terhadap fluktuasi energi.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Environment Setup',
                    code: 'git clone #/Photovoltaic-Physics-Informed-Neural-Network.git\npip install tensorflow pandas scikit-learn matplotlib',
                    type: 'code'
                },
                {
                    title: 'NREL API Hook',
                    code: '# Get key from developer.nrel.gov\napi_key = "YOUR_NREL_API_KEY"\nlat, lon = -1.93, 125.50',
                    type: 'code'
                },
                {
                    title: 'Model Execution',
                    code: 'python PINN.py\n# Generates predictions vs actuals with physics constraints',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Intermittency Energi Surya",
                    solution: "Mengintegrasikan model temperatur panel (T_cell) ke dalam jaringan saraf untuk memprediksi penurunan efisiensi akibat panas secara fisik."
                },
                {
                    problem: "Data Historis Berkualitas Terbatas",
                    solution: "PINN menggunakan hukum fisika sebagai regularizer, memungkinkan training model yang robust dengan jumlah data yang lebih sedikit dibandingkan deep learning standar."
                },
                {
                    problem: "Kompleksitas Custom Loss",
                    solution: "Menggunakan TensorFlow GradientTape untuk menghitung derivatif parsial dari persamaan fisika selama proses backpropagation."
                }
            ]
        },
        {
            id: 'project-20',
            slug: 'credit-risk-analysis-lstm',
            title: 'Credit Risk Analysis LSTM',
            description: 'High-precision loan default prediction using stacked LSTM layers and sequential financial modeling.',
            longDescription: 'This project focuses on predicting credit risk using Long Short-Term Memory (LSTM), a variant of Recurrent Neural Networks (RNNs) optimized for financial sequential data. By capturing long-term temporal dependencies in credit history and financial behavior, the system identifies high-risk loan applicants with significantly higher accuracy than traditional linear models. The analysis incorporates business-critical metrics such as Default Capture Rate and Approval Rate to maximize institutional profitability.',
            techStack: [
                'Python',
                'TensorFlow',
                'Keras',
                'LSTM',
                'Scikit-learn',
                'SMOTE'
            ],
            tools: [
                'Jupyter Notebook',
                'Hugging Face Spaces',
                'Pandas',
                'Seaborn',
                'SMOTE'
            ],
            status: 'completed',
            repoUrl: '#/CreditRisk_Analysis',
            demoUrl: 'https://huggingface.co/spaces/Alfazril/CreditRisk_Analysis',
            startDate: '2025-07-01',
            role: 'Data Scientist',
            customTimeline: 'July 2025',
            team: '3 Developers',
            highlights: [
                'Stacked LSTM Neural Network',
                'SMOTE Imbalance Handling',
                'Financial ROI Analysis'
            ],
            category: 'Data Science',
            features: [
                {
                    title: 'Sequential Model Architecture',
                    items: [
                        '**LSTM Layers**: Stacked Long Short-Term Memory layers to capture complex temporal patterns in debt behavior.',
                        '**Dropout Optimization**: Integrated dropout layers to prevent overfitting on specific credit profiles.',
                        '**Binary Optimization**: Sigmoid activation output with Adam optimizer and binary cross-entropy loss function.'
                    ]
                },
                {
                    title: 'Financial Data Preprocessing',
                    items: [
                        '**3D Reshaping**: Data transformation into `[samples, timesteps, features]` format for deep learning sequential input.',
                        '**SMOTE Sampling**: Implementation of Synthetic Minority Over-sampling to balance default vs. non-default cases.',
                        '**Feature Scaling**: Numerical normalization and categorical encoding for employment and loan-type stability.'
                    ]
                },
                {
                    title: 'Risk & ROI Analytics',
                    items: [
                        '**Profitability Analysis**: Comparative study on ROI/cost savings from avoiding defaults vs baseline approval rates.',
                        '**Risk Segmentation**: Automatic classification of applicants into Low, Medium, and High-risk tiers based on probability scores.',
                        '**Advanced AUC Tuning**: Hyperparameter tuning via GridSearchCV to maximize Default Capture Rate.'
                    ]
                },
                {
                    title: 'Comprehensive Evaluation',
                    items: [
                        '**Default Capture Rate**: Measuring the exact proportion of actual defaults identified by the model.',
                        '**Business Metrics**: Evaluating model impact via Approval Rate vs institutional Risk Appetite.',
                        '**Interactive Visualization**: Deployment on Hugging Face Spaces for real-time model interaction and prediction testing.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Model Environment',
                    code: 'git clone #/CreditRisk_Analysis\npip install -r requirements.txt',
                    type: 'code'
                },
                {
                    title: 'Preprocessing Data',
                    code: '# Data must be reshaped for LSTM\nX_train = X_train.reshape((X_train.shape[0], 1, X_train.shape[1]))',
                    type: 'code'
                },
                {
                    title: 'Training & Eval',
                    code: 'python train_lstm.py\n# Outputs Accuracy, Precision, Recall, and AUC metrics',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Imbalance Financial Datasets",
                    solution: "Applied SMOTE (Synthetic Minority Over-sampling Technique) to ensure the LSTM model learns to identify rare default events as effectively as frequent low-risk ones."
                },
                {
                    problem: "Vanishing Gradient in Deep RNNs",
                    solution: "Utilized LSTM gates (Input, Forget, Output) to maintain long-term memory gradients, essential for capturing years of credit history."
                },
                {
                    problem: "Overfitting on Loan Profiles",
                    solution: "Implemented early stopping and dropout strategies to ensure the model generalizes across diverse demographic and financial sectors."
                }
            ]
        },
        {
            id: 'project-21',
            slug: 'hand-gesture-recognition',
            title: 'Hand Gesture Recognition',
            description: 'Real-time hand tracking and skeletal landmark detection using MediaPipe and OpenCV.',
            longDescription: 'Hand Gesture Recognition is a high-performance computer vision system that utilizes MediaPipe’s Hands solution for robust, real-time hand landmark detection. By extracting 21 coordinate points from a video stream, the system performs dynamic finger counting and gesture analysis. This project serves as a foundational framework for human-computer interaction (HCI), enabling non-contact control systems for various software applications with high skeletal stability.',
            techStack: [
                'Python',
                'MediaPipe',
                'OpenCV'
            ],
            tools: [
                'VS Code',
                'Git LFS',
                'PowerShell'
            ],
            status: 'completed',
            repoUrl: '#/Hand-Gesture-Recognition',
            demoUrl: '#',
            startDate: '2024-12-01',
            role: 'CV Developer',
            customTimeline: 'December 2024',
            team: 'Personal Project',
            highlights: [
                'MediaPipe Hands Integration',
                'Real-time 21-Landmark Tracking',
                'Dynamic Finger Counting'
            ],
            category: 'AI & Machine Learning',
            features: [
                {
                    title: 'Real-Time Hand Tracking',
                    items: [
                        '**MediaPipe Hands Integration**: Leveraging Google’s sophisticated machine learning pipeline for sub-millisecond hand tracking.',
                        '**21-Landmark Detection**: Accurate extraction of 21 key coordinate points representing joints and fingertips in 3D space.',
                        '**Static/Dynamic Mode Support**: Configurable landmark detection that works for both single frames and high-speed video streams.'
                    ]
                },
                {
                    title: 'Gesture Recognition Logic',
                    items: [
                        '**Dynamic Finger Counting**: Custom algorithms to count raised fingers by comparing tip positions with joint landmarks (MCP/PIP).',
                        '**Coordinate Analysis**: Real-time calculation of Euclidean distances between landmarks for gesture classification.',
                        '**Stability Filtering**: Signal smoothing to ensure counting accuracy even with minor hand tremors or sensor noise.'
                    ]
                },
                {
                    title: 'Cross-Platform Architecture',
                    items: [
                        '**OpenCV Integration**: Robust video processing and frame visualization with real-time landmark rendering.',
                        '**Low Hardware Overhead**: Optimized for standard laptop webcams without requiring dedicated GPU acceleration.',
                        '**Modular Code Structure**: Decoupled AI tracking logic from UI rendering for easy integration into larger projects.'
                    ]
                },
                {
                    title: 'Interactive UI & Output',
                    items: [
                        '**Live Landmark Rendering**: Real-time projection of skeletal joint maps onto the video feed for user feedback.',
                        '**Real-time Event Logging**: Instant detection feedback via console logs and on-screen text overlays.',
                        '**Customizable Gestures**: Extensible architecture that allows adding new symbolic recognitions (peace signs, thumbs up).'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Environment & Setup',
                    code: 'git clone #/Hand-Gesture-Recognition.git\npython -m venv HandTracking-env',
                    type: 'code'
                },
                {
                    title: 'Dependency Install',
                    code: 'HandTracking-env\\Scripts\\Activate\npip install opencv-python mediapipe',
                    type: 'code'
                },
                {
                    title: 'Run AI Application',
                    code: 'python HandsTrackingAI.py\n# Press "q" to exit camera feed',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Low Lighting Conditions",
                    solution: "Adjusted MediaPipe's min_detection_confidence threshold and applied OpenCV histogram equalization to improve landmark stability in dark environments."
                },
                {
                    problem: "Hand-to-Camera Distance Variance",
                    solution: "Normalized landmark coordinates relative to the palm center, ensuring finger counting logic remains accurate regardless of how close the hand is to the camera."
                },
                {
                    problem: "Frame Rate Latency",
                    solution: "Optimized frame processing by disabling static_image_mode during streaming, allowing the system to use temporal information for faster tracking."
                }
            ]
        },
        {
            id: 'project-22',
            slug: 'data-analyst-dashboard',
            title: 'Data Analyst Dashboard',
            description: 'Interactive analytics tool for e-commerce data exploration using Dash and Plotly.',
            longDescription: 'The Data Analyst Dashboard is a comprehensive, interactive analytic platform designed to streamline e-commerce data exploration. Built with Python and Streamlit, it allows analysts to move beyond static reports by providing real-time data filtering, dynamic chart generation (bar, line, pie), and automated summary statistics. The system features a robust preprocessing pipeline for handling missing data and outliers, ensuring that decision-makers have access to high-quality insights on sales performance and product category trends.',
            techStack: [
                'Python',
                'Streamlit',
                'Plotly',
                'Pandas',
                'NumPy',
                'Dash'
            ],
            tools: [
                'VS Code',
                'Jupyter Notebook',
                'Git LFS',
                'PowerShell'
            ],
            status: 'completed',
            repoUrl: '#/Data-Analyst-Dashboard',
            demoUrl: '#',
            startDate: '2024-07-01',
            role: 'Data Analyst',
            customTimeline: 'July - August 2024',
            team: 'Personal Project',
            highlights: [
                'Interactive Real-time Visuals',
                'Automated Data Preprocessing',
                'E-commerce Trends Analysis'
            ],
            category: 'Data Science',
            features: [
                {
                    title: 'Interactive Data Exploration',
                    items: [
                        '**Dynamic Chart Generation**: Real-time rendering of bar, line, and pie charts based on multi-variable user selections.',
                        '**Drill-down Analytics**: Ability to focus on specific time periods or product categories with instant visual feedback.',
                        '**Metric Customization**: Dynamic dashboard layout that adjusts according to the selected Key Performance Indicators (KPIs).'
                    ]
                },
                {
                    title: 'Data Filtering & Manipulation',
                    items: [
                        '**Smart Preprocessing**: Automated handling of missing values, duplicate entries, and data type transformations.',
                        '**Advanced Filtering**: Multi-layered filters for product categories, price ranges, and sales dates.',
                        '**Outlier Detection**: Integrated statistical methods to identify and isolate anomalies in e-commerce transaction data.'
                    ]
                },
                {
                    title: 'Customizable Dashboards',
                    items: [
                        '**Modular UI Layout**: Flexible dashboard design using Streamlit containers for a clean and professional analytics interface.',
                        '**Real-time State Management**: Instant synchronization between dropdown selections and data visualization components.',
                        '**Export Capabilities**: One-click functionality to export processed data and summary statistics for offline reporting.'
                    ]
                },
                {
                    title: 'E-Commerce Deep-Dive',
                    items: [
                        '**Sales Trend Analysis**: Visualizing historical sales growth and forecasting potential seasonal patterns.',
                        '**Category Performance**: Deep-dive into product category rankings based on volume, revenue, and profit margins.',
                        '**Reader Profiling**: (In context of related projects) Identifying high-value segments and customer behavior archetypes.'
                    ]
                }
            ],
            installation: [
                {
                    title: 'Clone & Environment',
                    code: 'git clone #/Data-Analyst-Dashboard.git\ncd Data-Analyst-Dashboard',
                    type: 'code'
                },
                {
                    title: 'Install Dependencies',
                    code: 'pip install pandas streamlit plotly dash numpy',
                    type: 'code'
                },
                {
                    title: 'Launch Dashboard',
                    code: 'streamlit run Dashboard/EcomersDashboard.py\n# Access at http://localhost:8501',
                    type: 'code'
                }
            ],
            challengesAndSolutions: [
                {
                    problem: "Handling Large Unstructured Datasets",
                    solution: "Developed a robust Pandas-based cleaning pipeline that standardizes data formats and handles null values before they reach the visualization layer."
                },
                {
                    problem: "Real-time UI Responsiveness",
                    solution: "Leveraged Streamlit caching (`@st.cache_data`) to ensure that heavy data processing operations only run when the underlying dataset changes."
                },
                {
                    problem: "Visualization Over-cluttering",
                    solution: "Implemented hierarchical filtering (Category -> Sub-category) to keep visualizations focused and easy to interpret for non-technical stakeholders."
                }
            ]
        }
    ],
    experiences: [
        {
            id: `prof-new-1`,
            company: `FlyRank AI`,
            position: `Machine Learning Engineer`,
            description: `Selected into FlyRank AI's Machine Learning Internship Program (July 2026 Cohort), contributing to applied AI development within a remote-first, product-driven engineering environment.`,
            responsibilities: [
                `Contribute to end-to-end machine learning workflows spanning data preparation, model development, evaluation, and deployment aligned with production standards.`,
                `Collaborate with a distributed engineering team across 2+ time zones, participating in agile sprints, code reviews, and technical design discussions.`,
                `Deliver 1-2 ML driven features or research prototypes as part of the structured internship curriculum, applying industry best practices in reproducibility and model performance tracking.`
            ],
            skills: [
                `Machine Learning`,
                `Python`,
                `MLOps`,
                `AI Development`,
                `Remote Collaboration`
            ],
            startDate: `2026-06-01`,
            isOngoing: true,
            location: "Serving local and international businesses",
            type: `internship`,
            externalLink: `https://internship.flyrank.ai/intern`,
            logo: `/assets/flyrankailogo.webp`,
            logoBg: `bg-black`
        },
        {
            id: `prof-new-2`,
            company: `BiruLangit`,
            position: `Data Engineer`,
            description: `Serving as a Data Engineer at Biru Langit, owning the daily production-grade IoT inspection reporting workflow for a fleet of active LCS sensor devices deployed in operational field environments.`,
            responsibilities: [
                `Deliver daily inspection reports covering 25 active LCS sensor devices with a zero-hallucination standard, achieving 100% data traceability through OCR-based extraction from PostgreSQL production snapshots.`,
                `Operate and maintain SSH tunnel and PostgreSQL infrastructure against a production VPS, sustaining 99%+ pipeline uptime across 30+ consecutive daily reporting cycles.`,
                `Executed a full backup and migration of a 9.6 GB production PostgreSQL database and deployed the Orion Pax NestJS stack via Docker and PM2, achieving zero data loss and full service continuity on the backup VPS.`
            ],
            skills: [
                `PostgreSQL`,
                `Docker`,
                `Data Engineering`,
                `IoT`,
                `DevOps`
            ],
            startDate: `2026-05-01`,
            isOngoing: true,
            location: "Serving local and international businesses",
            type: `contract`,
            externalLink: [
                `#/GeoPollute`,
                `https://github.com/ekshalasi-langit-biru/orion-pax`,
                `https://biru-langit.com/`
            ],
            logo: `/assets/birulangitlogo.webp`,
            logoBg: `bg-white`
        },
        {
            id: `prof-new-3`,
            company: `SoftAge Information Technology Limited`,
            position: `Data Collection & Exploratory`,
            description: `Serving as a Freelance Data Collection & Exploratory specialist at SoftAge Information Technology Limited, contributing to AI training data pipelines supporting global LLM and machine learning model development.`,
            responsibilities: [
                `Collected, validated, and structured 500+ high-quality data samples across multiple domains, ensuring alignment with strict AI training data specifications.`,
                `Conducted exploratory data analysis and quality assurance workflows, achieving 95%+ data acceptance rate across submission batches.`,
                `Collaborated with a distributed remote team across 2+ regions, adhering to industry-grade annotation guidelines and enterprise data governance standards.`
            ],
            skills: [
                `Data Collection`,
                `Data Quality Assurance`,
                `Exploratory Data Analysis`,
                `Data Annotation`,
                `Remote Collaboration`
            ],
            startDate: `2026-03-01`,
            endDate: `2026-05-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `freelance`,
            externalLink: `https://softage.ai/`,
            logo: `/assets/softagelogo.webp`,
            logoBg: `bg-white`
        },
        {
            id: `prof-new-4`,
            company: `McKinsey & Company`,
            position: `Forward Program`,
            description: `Selected into McKinsey & Company's Forward Program, a competitive leadership and professional development program equipping the next generation of leaders with core business, digital, and problem-solving capabilities.`,
            responsibilities: [
                `Completed 100+ hours of structured learning across leadership, problem-solving, digital fluency, and adaptability modules designed by McKinsey experts.`,
                `Applied McKinsey's structured problem-solving frameworks to 3+ real-world case exercises, delivering actionable recommendations aligned with consulting-grade methodology.`,
                `Engaged with a global cohort of 1,000+ Forward learners through peer collaboration, discussion forums, and capstone project deliverables.`
            ],
            skills: [
                `Leadership`,
                `Strategic Thinking`,
                `Problem Solving`,
                `Structured Communication`,
                `Consulting`
            ],
            startDate: `2026-03-01`,
            endDate: `2026-06-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `internship`,
            externalLink: `https://www.credly.com/badges/387c38b6-6f19-49c6-9fed-b5e98120f26d/public_url`,
            logo: `/assets/McKinseylogo.webp`,
            logoBg: `bg-white`
        },
        {
            id: `prof-new-5`,
            company: `Cisometric`,
            position: `Information Security Auditor`,
            description: `Selected into Cisometric Academy's IS Audit Class Batch 4, executing a full-cycle ISO/IEC 27001:2022 internal audit engagement within a structured professional apprenticeship program.`,
            responsibilities: [
                `Conducted a full-cycle ISO/IEC 27001:2022 internal audit engagement, evaluating ISMS implementation through evidence sampling, interviews, control assessment, and compliance verification activities.`,
                `Developed 5+ professional audit artifacts including audit plans, working papers, control checklists, executive reports, and remediation recommendations aligned with industry-standard audit methodologies.`,
                `Reported 4 Major Non-Conformities affecting 4 key information security control areas, delivering prioritized remediation actions and compliance improvement recommendations based on ISO/IEC 27001:2022 requirements.`
            ],
            skills: [
                `Information Security Audit`,
                `ISO/IEC 27001`,
                `ISMS`,
                `Risk Assessment`,
                `Compliance`
            ],
            startDate: `2026-05-01`,
            endDate: `2026-06-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `internship`,
            externalLink: [
                `#/Audit-Engagement`,
                `https://www.cisometric.com/academy`
            ],
            logo: `/assets/cisometriclogo.webp`,
            logoBg: `bg-white`
        },
        {
            id: `prof-1`,
            company: `Dicoding Academy`,
            position: `Machine Learning Code Reviewer`,
            description: `Selected as a freelance Machine Learning Code Reviewer at Dicoding Academy, responsible for technical evaluation and quality assurance of student ML project submissions.`,
            responsibilities: [
                `Reviewed and evaluated 50+ ML project submissions, conducting in-depth code analysis covering logical correctness, efficiency, and adherence to industry best practices.`,
                `Delivered structured, actionable feedback with an average review turnaround under 24 hours, directly supporting learner progression toward certification.`,
                `Functioned as both technical reviewer and mentor, upholding academic standards while sustaining a 90%+ learner pass rate within reviewed batches.`
            ],
            skills: [
                `Machine Learning`,
                `Python`,
                `Code Review`,
                `Quality Assurance`,
                `Mentorship`
            ],
            startDate: `2025-01-01`,
            endDate: `2025-01-31`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `freelance`,
            logo: `/assets/dicodinglogo.webp?v=2`,
            externalLink: `#/Dicoding-Reviews-Submission`
        },
        {
            id: `prof-2`,
            company: `Dicoding Indonesia`,
            position: `Digital Learning Experience Auditor`,
            description: `Contracted as a Digital Learning Experience Auditor for Dicoding Indonesia's AI Engineer learning path, responsible for end-to-end quality assurance and curriculum contribution across digital course materials.`,
            responsibilities: [
                `Reviewed and evaluated 3-5 course modules, assessing content accuracy, technical clarity, and instructional design quality against industry standards.`,
                `Delivered structured feedback across 20+ improvement points, directly contributing to content revisions and new material development that improved learner engagement and course accessibility.`,
                `Collaborated with the curriculum team to ensure AI Engineer learning path materials met both academic benchmarks and professional competency requirements.`
            ],
            skills: [
                `Python`,
                `Artificial Intelligence`,
                `Quality Assurance`,
                `Instructional Design`,
                `Curriculum Development`
            ],
            startDate: `2025-10-01`,
            endDate: `2026-01-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `freelance`,
            logo: `/assets/dicodinglogo.webp?v=2`,
            externalLink: `https://docs.google.com/presentation/d/13gNI6ttgW3eMXgZS8G3LzEbzOVwQ3Ot4HVWER0hpUgI/edit?usp=sharing`
        },
        {
            id: `prof-3`,
            company: `HUMIC Engineering Research Center`,
            position: `AI Developer Intern`,
            description: `Developed and deployed AI-driven threat detection systems within a research-focused environment at HUMIC Engineering Research Center, specializing in Deep Learning and Transformer-based architectures for cybersecurity applications.`,
            responsibilities: [
                `Engineered Transformer-based models achieving 90%+ F1-score across 4 attack vectors - SQL Injection, DDoS, Network Intrusion, and Malware - on datasets ranging from 50K to 500K+ records.`,
                `Managed full ML pipelines across 10+ large-scale cybersecurity datasets, covering data preprocessing, feature engineering, model training, hyperparameter tuning, and evaluation.`,
                `Collaborated within a 6-member research team to deliver a production-ready AI security system within a 4-month development cycle.`
            ],
            skills: [
                `Artificial Intelligence`,
                `Deep Learning`,
                `Transformers`,
                `Cybersecurity`,
                `Machine Learning`
            ],
            startDate: `2025-09-01`,
            endDate: `2025-12-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `internship`,
            logo: `/assets/HumicLogo.webp`,
            externalLink: `#/Security-Automation-GenAI`
        },
        {
            id: `prof-4`,
            company: `Cyber Physical System Laboratory`,
            position: `Computer Vision Researcher Intern`,
            description: `Conducted end-to-end AI research at CPS Laboratory, focusing on the development and deployment of intelligent Computer Vision systems integrated with IoT infrastructure for real-world applications.`,
            responsibilities: [
                `Built D'Mouv, an AI-powered Smart Motion Detection System using YOLOv11n on Raspberry Pi, achieving 80–90% detection accuracy with real-time inference under 100ms latency.`,
                `Integrated 3+ IoT devices (lamp, fan, and connected peripherals) with automated control logic triggered by human presence detection, delivering seamless AIoT automation.`,
                `Developed full-stack connectivity across Computer Vision, Express.js backend, Supabase, and React Native mobile app, enabling remote monitoring and device control for end users.`
            ],
            skills: [
                `Artificial Intelligence`,
                `Deep Learning`,
                `Computer Vision`,
                `IoT`,
                `React Native`
            ],
            startDate: `2025-07-01`,
            endDate: `2025-09-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `internship`,
            logo: `/assets/logocps.webp`,
            externalLink: `https://medium.com/@cpslaboratory2324/dmouv-sistem-smart-motion-detection-berbasis-internet-of-things-8f26ef2427f1`
        },
        {
            id: `prof-5`,
            company: `Advanced Software Engineering Laboratory`,
            position: `System Analyst Intern`,
            description: `Contributed as a System Analyst intern within a research-focused software engineering lab, responsible for translating business requirements into structured technical documentation for an integrated web application platform.`,
            responsibilities: [
                `Produced a full system documentation suite including SRS, SDD, and complete UML diagrams (Use Case, Activity, Sequence) serving as the primary development blueprint across a 4-month cycle.`,
                `Collaborated across 3-5 cross-functional team members spanning Development, UI/UX, and QA to ensure accurate requirement implementation and design validation.`,
                `Supported development of Voices Unheard, an AI-powered anonymous storytelling platform integrating AI pre-moderation and secure data protection, aligned with SDG 16.`
            ],
            skills: [
                `SDLC`,
                `Software Design`,
                `UML`,
                `Requirements Engineering`,
                `System Architecture`
            ],
            startDate: `2025-07-01`,
            endDate: `2025-10-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `internship`,
            logo: `/assets/aselablogo.webp`,
            externalLink: `#/Voices-Unheard-ASE`
        },
        {
            id: `prof-6`,
            company: `Informatics Laboratory, Telkom University`,
            position: `Computer Network Practicum Assistant (Contract-Based)`,
            description: `Serving as a Practicum Assistant for the Computer Network course at Informatics Laboratory, Telkom University, responsible for teaching, mentoring, and evaluating students across practical networking sessions.`,
            responsibilities: [
                `Guided 100+ students across 10+ lab sessions covering networking protocols including HTTP, DNS, TCP/UDP, DHCP, ICMP, ARP, and Web Server configuration.`,
                `Acted as PIC for the Socket Programming final project, mentoring 15+ student groups through end-to-end implementation, documentation, and technical assessment.`,
                `Evaluated 200+ assignments, lab reports, and practicum exams, maintaining consistent academic standards with a 95% project completion rate.`
            ],
            skills: [
                `Python`,
                `Socket Programming`,
                `Computer Networks`,
                `TCP/IP`,
                `Mentoring`
            ],
            startDate: `2025-09-01`,
            endDate: `2026-01-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `contract`,
            logo: `/assets/iflablogo.webp`,
            externalLink: ``
        },
        {
            id: `prof-7`,
            company: `Cyber Physical System Laboratory`,
            position: `Research Assistant (Contract-Based)`,
            description: `Serving in a dual capacity as Research Assistant and Mentor at the Cyber Physical System (CPS) Laboratory, contributing to applied research initiatives while guiding junior members across AI & Data, Computer Vision, and intelligent cyber-physical applications.`,
            responsibilities: [
                `Contributed to 2+ active research projects and delivered 5+ working prototypes spanning IoT hardware integration, sensor data processing, and machine learning implementation aligned with the laboratory's research roadmap and publication targets.`,
                `Mentored 10+ junior members across foundational technical tracks in machine learning and computer vision, with 90%+ successfully completing final prototype delivery within program timelines.`,
                `Delivered 15+ technical review sessions and code walkthroughs while contributing to curriculum refinement across 3 technical tracks, improving knowledge transfer efficiency for subsequent laboratory cohorts.`
            ],
            skills: [
                `Artificial Intelligence`,
                `Machine Learning`,
                `Computer Vision`,
                `Research`,
                `Mentoring`
            ],
            startDate: `2025-08-01`,
            isOngoing: true,
            location: "Serving local and international businesses",
            type: `contract`,
            logo: `/assets/logocps.webp`
        },
        {
            id: `prof-8`,
            company: `Dinas Pangan dan Pertanian Kota Bandung`,
            position: `Data Entry Assistant`,
            description: `Supported data lifecycle and reporting functions at the Bandung City Office of Food and Agriculture, ensuring data integrity and delivering actionable insights for operational decision-making.`,
            responsibilities: [
                `Processed and validated 1,000+ daily records, implementing categorization and systematization protocols to maintain data accuracy and consistency.`,
                `Produced 5+ analytical reports delivering trend analysis and actionable insights that directly supported data-driven decision-making within the department.`,
                `Maintained structured documentation across 40+ activity logs, serving as an official record of data management progress throughout the internship.`
            ],
            skills: [
                `Data Entry`,
                `Data Management`,
                `Reporting`,
                `Analytical Skills`,
                `Teamwork`
            ],
            startDate: `2024-06-01`,
            endDate: `2024-08-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `internship`,
            logo: `/assets/dinas-pangan-dan-pertanian-kota-bandung.webp`,
            externalLink: `https://riibse.center.telkomuniversity.ac.id/e-selamat/`
        },
        {
            id: `lead-1`,
            company: `Cyber Physical System Laboratory`,
            position: `Human Resources Staff`,
            description: `Supporting people development and organizational culture within CPS Laboratory, focusing on training, growth initiatives, and team performance for lab assistants.`,
            responsibilities: [
                `Coordinated HR development initiatives for 20–50 lab assistants, supporting team performance and interpersonal communication across the laboratory.`,
                `Facilitated 1–2 structured training programs aimed at strengthening assistant capabilities and fostering a collaborative work culture.`,
                `Drove talent development strategies aligned with laboratory innovation goals, ensuring a productive and growth-oriented environment.`
            ],
            skills: [
                `Interpersonal Skills`,
                `Problem Solving`,
                `Human Resources`,
                `Training`,
                `Team Building`
            ],
            startDate: `2025-07-01`,
            isOngoing: true,
            location: "Serving local and international businesses",
            type: `contract`,
            logo: `/assets/logocps.webp`,
            externalLink: `https://cpslaboratory.com/`
        },
        {
            id: `lead-2`,
            company: `Digistar Club by Telkom Indonesia`,
            position: `Chief Committee`,
            description: `Leading end-to-end execution of digital talent development programs under Digistar Club by Telkom Indonesia, overseeing the full project lifecycle from strategic planning to post-event analysis.`,
            responsibilities: [
                `Directed 4–5 events including DigiTalks Series and DigiCourse #3, collectively reaching 200+ participants across the tech community.`,
                `Led a committee of 6–10 members, managing resource allocation, timeline execution, and cross-functional coordination with speakers and external partners.`,
                `Delivered post-event analysis reports with actionable recommendations, ensuring continuous improvement across each program iteration.`
            ],
            skills: [
                `Leadership`,
                `Event Management`,
                `Stakeholder Management`,
                `Research Skills`,
                `Intrapersonal Skills`
            ],
            startDate: `2025-03-01`,
            endDate: `2025-09-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `contract`,
            logo: `/assets/logodigistar.webp`
        },
        {
            id: `lead-3`,
            company: `Digistar Club by Telkom Indonesia`,
            position: `Ranger – Digital Application Club`,
            description: `Serving as a committee member for Digistar Club by Telkom Indonesia, managing end-to-end execution of digital talent development programs focused on Computer Vision and AI deployment.`,
            responsibilities: [
                `Orchestrated 3 flagship programs (DigiCourse #1, DigiCourse #2, DigiCamp #1) reaching 300–500 participants across online and hybrid formats.`,
                `Managed multi-channel communications strategy across 3-5 platforms, driving participant acquisition and expanding community reach.`,
                `Coordinated with 3-5 external partners and stakeholders throughout the full program lifecycle from planning to post-event analysis.`
            ],
            skills: [
                `Artificial Intelligence`,
                `Program Management`,
                `Strategic Communications`,
                `Event Management`,
                `Interpersonal Skills`
            ],
            startDate: `2025-03-01`,
            isOngoing: true,
            location: "Serving local and international businesses",
            type: `contract`,
            logo: `/assets/logodigistar.webp`,
            externalLink: `https://www.digistartelkom.id/`
        },
        {
            id: `lead-4`,
            company: `Himpunan Mahasiswa Teknologi Informasi, Telkom University`,
            position: `Academic Affairs Division`,
            description: `Supported the Academic Affairs Division of HMTT Telkom University as an intern, contributing to the planning and execution of academic programs designed to enhance student learning and skill development.`,
            responsibilities: [
                `Assisted in managing 3-4 academic programs including seminars and bootcamps, reaching 100–200 student participants across events.`,
                `Handled end-to-end operational support across 10+ execution workstreams covering registration, documentation, timeline management, and on-site logistics.`,
                `Contributed to promotional strategies and audience engagement efforts, driving an estimated 20%+ uplift in participation rate across academic initiatives.`
            ],
            skills: [
                `Event Planning`,
                `Operations Management`,
                `Logistics`,
                `Team Coordination`,
                `Intrapersonal Skills`
            ],
            startDate: `2024-09-01`,
            endDate: `2025-01-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `volunteer`,
            logo: `/assets/HMITlogo.webp?v=1`
        },
        {
            id: `lead-5`,
            company: `Youth Ranger Indonesia`,
            position: `Public Relations Communication`,
            description: `Managed public relations and strategic communications for Youth Ranger Indonesia, driving community engagement and brand visibility across regional empowerment programs.`,
            responsibilities: [
                `Supported communications for 6+ community programs, reaching audiences across 3-5 channels including social media and regional media platforms.`,
                `Built and maintained stakeholder relationships with 10+ media contacts, community leaders, and partners to secure advocacy and advance high-impact youth empowerment initiatives.`,
                `Architected integrated PR strategies that elevated organizational visibility, driving an estimated 30%+ growth in community engagement across West Java.`
            ],
            skills: [
                `Public Relations`,
                `Strategic Communications`,
                `Stakeholder Management`,
                `Entrepreneurship`,
                `Intrapersonal Skills`
            ],
            startDate: `2024-07-01`,
            endDate: `2025-01-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `contract`,
            logo: `/assets/youth-ranger-indonesia.webp`,
            externalLink: `https://youthrangerindonesia.com/`
        },
        {
            id: `vol-1`,
            company: `Galeri Investasi BEI Telkom University`,
            position: `Fundraising Assistant`,
            description: `Instrumental in executing fundraising for economic empowerment events.`,
            responsibilities: [
                `Execution of fundraising campaign`,
                `Strategic donor prospecting`,
                `High-impact sponsorship proposal development`,
                `Management of targeted outreach pipeline`
            ],
            skills: [
                `Deep Learning`,
                `Machine Learning`,
                `Computer Vision`,
                `NLP`,
                `MLOps`
            ],
            startDate: `2025-02-01`,
            endDate: `2025-03-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `volunteer`,
            logo: `/assets/logobei.webp`,
            externalLink: `https://www.gibeitelkomuniversity.site/`
        },
        {
            id: `vol-2`,
            company: `HMIT Telkom University`,
            position: `Event Planner & Organizer`,
            description: `Key member of MAKRAB 2024 organizing committee.`,
            responsibilities: [
                `Strategic program design and execution`,
                `Co-development of master event agenda`,
                `Spearheading core knowledge-sharing segments`,
                `Collaborating for impactful event delivery`
            ],
            skills: [
                `Python`,
                `Machine Learning`,
                `Data Preprocessing`,
                `Data Engineering`,
                `Model Deployment`
            ],
            startDate: `2024-11-01`,
            endDate: `2024-12-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `volunteer`,
            logo: `/assets/HMITlogo.webp?v=1`
        },
        {
            id: `vol-3`,
            company: `Young On Top Bandung`,
            position: `Environmental Hygiene Team`,
            description: `Volunteer for environmental improvement initiatives.`,
            responsibilities: [
                `Hands-on clean-up drives`,
                `Implementing waste segregation systems`,
                `Strategic community outreach and education`,
                `Coordination with external partners`
            ],
            skills: [
                `Leadership`,
                `Entrepreneurship`,
                `Cross-cultural Collaboration`,
                `Teamwork`,
                `Project Management`
            ],
            startDate: `2024-02-01`,
            endDate: `2024-02-07`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `volunteer`,
            logo: `/assets/yotlogo.webp`
        },
        {
            id: `vol-4`,
            company: `SMA Negeri 88 Jakarta`,
            position: `Logistics Operator – Campus Expo 2024`,
            description: `Logistics Coordinator managing the operational backbone of the event.`,
            responsibilities: [
                `Directing all logistical pillars (venue, equipment, transport)`,
                `Orchestrating team coordination`,
                `Efficient on-the-ground execution`,
                `Performance evaluation and reporting`
            ],
            skills: [
                `GitHub`,
                `IoT`,
                `Web Development`,
                `Machine Learning`,
                `Linux`
            ],
            startDate: `2024-01-01`,
            endDate: `2024-01-15`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `volunteer`,
            logo: `/assets/sman88logo.webp`
        },
        {
            id: `cert-1`,
            company: `Coding Camp powered by DBS Foundation`,
            position: `Scholarship Awardee – Progressive Learning Program`,
            description: `Selected as a scholarship recipient for an intensive AI Engineer training program by DBS Foundation, covering end-to-end machine learning engineering from core algorithms to production deployment.`,
            responsibilities: [
                `Completed 300+ hours of rigorous curriculum spanning Machine Learning, Deep Learning for Computer Vision and NLP, and MLOps best practices for production-ready model deployment.`,
                `Built and deployed a functional AI application as the program capstone, demonstrating end-to-end engineering capability from prototype to production.`,
                `Gained hands-on experience across 5+ industry-standard workflows including model training, evaluation, optimization, and deployment pipelines.`
            ],
            skills: [
                `Deep Learning`,
                `Machine Learning`,
                `Computer Vision`,
                `NLP`,
                `MLOps`
            ],
            startDate: `2025-04-01`,
            endDate: `2025-10-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `apprenticeship`,
            logo: `/assets/DBSLogo.webp?v=1`,
            externalLink: `https://mail.google.com/mail/u/0/#search/DBS/FMfcgzQbfxpgnbGGdbWztHKKvfbDfgjx`
        },
        {
            id: `cert-2`,
            company: `Indosat Ooredoo Hutchison Digital Camp`,
            position: `Machine Learning Engineer Program`,
            description: `Selected as a recipient of the competitive IDCamp individual learning program by Indosat Ooredoo Hutchison, completing an intensive Machine Learning Engineering curriculum aligned with industry standards.`,
            responsibilities: [
                `Completed 100+ hours of end-to-end ML engineering curriculum covering data preprocessing, feature engineering, model development, optimization, and production deployment.`,
                `Built and deployed a functional ML model as the program capstone, achieving evaluation scores that qualified for program graduation among a competitive awardee cohort.`,
                `Gained hands-on proficiency across 5+ industry-standard Python ML libraries and workflows for building production-ready machine learning systems.`
            ],
            skills: [
                `Python`,
                `Machine Learning`,
                `Data Preprocessing`,
                `Data Engineering`,
                `Model Deployment`
            ],
            startDate: `2024-06-01`,
            endDate: `2024-12-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `apprenticeship`,
            logo: `/assets/indosat-ooredoo-hutchison-digital-camp.webp`,
            externalLink: `https://idcamp.ioh.co.id/`
        },
        {
            id: `cert-3`,
            company: `AIESEC in Bandung`,
            position: `Delegate – AIESEC Future Leaders 2024`,
            description: `Participated in AIESEC Future Leaders 2024, a prestigious 4-month leadership development program focused on personal growth, social impact projects, and global competency building.`,
            responsibilities: [
                `Engaged in 20+ curriculum sessions covering leadership frameworks, entrepreneurial thinking, and cross-cultural collaboration across the 4-month program.`,
                `Contributed to team-based projects targeting global issues, delivering actionable, impact-driven solutions alongside 5+ cross-functional delegates.`,
                `Built a global network of 30+ delegates through in-person summits, networking sessions, and collaborative work across diverse professional and cultural backgrounds.`
            ],
            skills: [
                `Leadership`,
                `Entrepreneurship`,
                `Cross-cultural Collaboration`,
                `Teamwork`,
                `Project Management`
            ],
            startDate: `2024-10-01`,
            endDate: `2025-01-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `apprenticeship`,
            logo: `/assets/aieseclogo.webp`,
            externalLink: `https://www.instagram.com/aiesecbandung/`
        },
        {
            id: `cert-4`,
            company: `Cyber Physical System Laboratory`,
            position: `CA Study Group Member`,
            description: `Completed an intensive study group program at Cyber Physical System Laboratory, contributing to end-to-end development across IoT systems, web applications, and machine learning implementations.`,
            responsibilities: [
                `Delivered 3 project tracks spanning IoT system development, web application development, and machine learning implementation, each presented as a final prototype to laboratory reviewers.`,
                `Led hardware-software integration across the full project lifecycle, achieving 100% prototype completion within program deadlines.`,
                `Applied Linux, Git, and cross-platform development tools across 3+ collaborative repositories within a deadline-driven team environment.`
            ],
            skills: [
                `GitHub`,
                `IoT`,
                `Web Development`,
                `Machine Learning`,
                `Linux`
            ],
            startDate: `2024-11-01`,
            endDate: `2025-01-01`,
            isOngoing: false,
            location: "Serving local and international businesses",
            type: `contract`,
            logo: `/assets/logocps.webp`
        },
        {
            id: `cert-5`,
            company: `GDSC Telkom University Bandung`,
            position: `Machine Learning Path Member`,
            description: `Active member of the Machine Learning path at Google Developer Student Clubs (GDSC) Telkom University, engaged in continuous learning and collaborative project development within a Google-supported developer community.`,
            responsibilities: [
                `Contributed actively to 1-2 team-based ML projects, applying core concepts spanning regression, classification, and clustering to real-world problem-solving.`,
                `Participated in 10+ technical workshops and hands-on training sessions covering industry-relevant ML skills and practical model development.`,
                `Collaborated with 5+ peers across disciplines to build portfolio-grade solutions aligned with current industry standards.`
            ],
            skills: [
                `Machine Learning`,
                `Python`,
                `Problem Solving`,
                `Critical Thinking`,
                `Teamwork`
            ],
            startDate: `2023-11-01`,
            isOngoing: true,
            location: "Serving local and international businesses",
            type: `contract`,
            logo: `/assets/logogdsc.webp`,
            externalLink: `https://g.dev/Arfazrll`
        }
    ],
    education: [
        {
            id: 'edu-1',
            institution: 'Telkom University',
            degree: 'Bachelor of Technology',
            major: 'Information Technology',
            startDate: '2023-08-01',
            isOngoing: true,
            gpa: '3.8/4.0',
            activities: [
                'GDSC ML Path',
                'CPS Lab Researcher',
                'HMIT Academic',
                'Data Science Competitions'
            ],
            achievements: [
                'ML Project Final Score: 92/100',
                'Active in national data science competitions',
                'Research Assistant at multiple laboratories'
            ]
        },
        {
            id: 'edu-2',
            institution: 'SMAN 88 Jakarta',
            degree: 'High School Diploma',
            major: 'Science (IPA)',
            startDate: '2020-06-01',
            endDate: '2023-06-30',
            isOngoing: false,
            activities: [
                'Science Studies'
            ],
            achievements: [
                'Strong foundation in mathematics and physics',
                'Analytical thinking development'
            ]
        }
    ],
    achievements: [
        {
            id: 'ach-1',
            title: 'Top 15/90 - Data Mining ADIKARA 2024',
            issuer: 'Telkom University',
            date: '2024-10-01',
            description: 'Achieved top 15 ranking in data mining competition, applying advanced ML models to complex datasets.',
            category: 'award'
        },
        {
            id: 'ach-2',
            title: '4th Place - Business Case Competition',
            issuer: 'GENBI',
            date: '2025-01-01',
            description: 'Developed innovative solutions for real-world business problems.',
            category: 'award'
        },
        {
            id: 'cert-1',
            title: 'Generative AI',
            issuer: 'Dicoding Indonesia',
            date: '2025-05-01',
            credentialId: '72ZD5LYYLZYW',
            credentialUrl: 'https://www.dicoding.com/certificates/72ZD5LYYLZYW',
            type: 'Course',
            tags: [
                'AI',
                'Generative AI'
            ],
            category: 'certification',
            image: '/certificate/Generative AI.pdf'
        },
        {
            id: 'cert-2',
            title: 'Practical AI for Productivity',
            issuer: 'Dicoding Indonesia',
            date: '2025-05-01',
            credentialId: 'L4PQE0RYOPO1',
            credentialUrl: 'https://www.dicoding.com/certificates/L4PQE0RYOPO1',
            type: 'Course',
            tags: [
                'AI',
                'Productivity'
            ],
            category: 'certification',
            image: '/certificate/Practical AI for Productivity.pdf'
        },
        {
            id: 'cert-3',
            title: 'Financial Literacy',
            issuer: 'Dicoding Indonesia',
            date: '2025-05-01',
            credentialId: 'N9ZO9KGW6XG5',
            credentialUrl: 'https://www.dicoding.com/certificates/N9ZO9KGW6XG5',
            category: 'certification',
            image: '/certificate/Financial Literacy.pdf'
        },
        {
            id: 'cert-4',
            title: 'Pemrograman Dengan Java',
            issuer: 'Dicoding Indonesia',
            date: '2025-02-01',
            credentialId: '1RXYEE173ZVM',
            credentialUrl: 'https://www.dicoding.com/certificates/1RXYEE173ZVM',
            category: 'certification',
            image: '/certificate/Pemrograman Dengan Java.pdf'
        },
        {
            id: 'cert-5',
            title: 'Back-End dengan JavaScript',
            issuer: 'Dicoding Indonesia',
            date: '2025-02-01',
            credentialId: '1RXYEE1EQZVM',
            credentialUrl: 'https://www.dicoding.com/certificates/1RXYEE1EQZVM',
            category: 'certification',
            image: '/certificate/Back-End dengan JavaScript.pdf'
        },
        {
            id: 'cert-6',
            title: 'Started with Databases',
            issuer: 'Amazon Web Services',
            date: '2025-02-01',
            credentialUrl: 'https://www.credly.com/badges/ccd9ad7a-f4b9-41e7-8589-f845d50c67f1/linked_in_profile',
            category: 'certification',
            image: '/certificate/Started with Databases.webp'
        },
        {
            id: 'cert-7',
            title: 'Supervised Machine Learning Regression and Classification',
            issuer: 'DeepLearning.AI',
            date: '2025-01-01',
            credentialId: 'JEZL7ZL9SADP',
            credentialUrl: 'https://www.coursera.org/account/accomplishments/verify/JEZL7ZL9SADP',
            category: 'certification',
            image: '/certificate/Supervised Machine Learning Regression and Classification.webp'
        },
        {
            id: 'cert-8',
            title: 'elevAIte with Dicoding Program 2025',
            issuer: 'Dicoding Indonesia',
            date: '2025-01-01',
            credentialUrl: 'https://learn.microsoft.com/en-us/users/arfazrlll-6195/achievements/8752dbgw',
            category: 'certification',
            image: '/certificate/elevAIte with Dicoding Program 2025.webp'
        },
        {
            id: 'cert-9',
            title: 'Data Analytics on Google Cloud',
            issuer: 'Google Cloud Skills Boost',
            date: '2025-01-01',
            credentialId: '13612507',
            credentialUrl: 'https://www.skills.google/public_profiles/241d7451-f9ad-4c87-81e0-affa9d6fed28/badges/13612507?utm_medium=social&utm_source=linkedin&utm_campaign=ql-social-share',
            category: 'certification',
            image: '/certificate/Data Analytics on Google Cloud.webp'
        },
        {
            id: 'cert-10',
            title: 'AI Innovation Challenge',
            issuer: 'COMPFEST',
            date: '2024-11-01',
            credentialUrl: 'https://verify.compfest.id/verify/cf-2024-79c13629-a893-47a8-afba-8300ada74e0b',
            category: 'certification',
            image: '/certificate/AI Innovation Challenge.pdf'
        },
        {
            id: 'cert-11',
            title: 'Dasar Pemrograman JavaScript',
            issuer: 'Dicoding Indonesia',
            date: '2025-01-01',
            credentialId: 'MRZMNKG3KPYQ',
            credentialUrl: 'https://www.dicoding.com/certificates/MRZMNKG3KPYQ',
            category: 'certification',
            image: '/certificate/Dasar Pemrograman JavaScript.pdf'
        },
        {
            id: 'cert-12',
            title: 'Fundamental SQL Using SELECT Statement',
            issuer: 'DQLab',
            date: '2024-01-01',
            credentialUrl: 'https://academy.dqlab.id/Certificate_check/result/DQLABSQLT1HCTASH#mycertificate',
            category: 'certification',
            image: '/certificate/Fundamental SQL Using SELECT Statement.pdf'
        },
        {
            id: 'cert-13',
            title: 'Introduction to Generative AI',
            issuer: 'Amazon Web Services',
            date: '2025-01-01',
            credentialId: 'fedcea5d-b7d5-425d-b6b5-fd9d24b7c918',
            credentialUrl: 'https://www.credly.com/badges/fedcea5d-b7d5-425d-b6b5-fd9d24b7c918/linked_in_profile',
            category: 'certification',
            image: '/certificate/Introduction to Generative AI.webp'
        },
        {
            id: 'cert-14',
            title: 'Deep Learning Beginner',
            issuer: 'Udemy',
            date: '2025-01-01',
            credentialId: 'UC-7dff40d7-4bif-4213-8928-653d07e72315',
            credentialUrl: 'https://www.udemy.com/certificate/UC-7dff40d7-4b1f-42f3-8928-653d07e7a315/',
            category: 'certification',
            image: '/certificate/Deep Learning Beginner.webp'
        },
        {
            id: 'cert-15',
            title: 'Machine Learning Foundations',
            issuer: 'Amazon Web Services',
            date: '2024-12-01',
            credentialId: '4fc1c551-1f68-47cc-b371-d2785495ae61',
            credentialUrl: 'https://www.credly.com/badges/60d0828f-021d-4b73-8fef-705eddd8069a/linked_in_profile',
            category: 'certification',
            image: '/certificate/Machine Learning Foundations.webp'
        },
        {
            id: 'cert-16',
            title: 'Cloud Practitioner Essentials',
            issuer: 'Dicoding Indonesia',
            date: '2024-12-01',
            credentialId: 'EYX4J4D6OZDL',
            credentialUrl: 'https://www.dicoding.com/certificates/EYX4J4D6OZDL',
            category: 'certification',
            image: '/certificate/Cloud Practitioner Essentials.pdf'
        },
        {
            id: 'cert-17',
            title: 'Pemrograman dengan Dart',
            issuer: 'Dicoding Indonesia',
            date: '2024-10-01',
            credentialId: '2VX34RJ24ZYQ',
            credentialUrl: 'https://www.dicoding.com/certificates/2VX34RJ24ZYQ',
            category: 'certification',
            image: '/certificate/Pemrograman dengan Dart.pdf'
        },
        {
            id: 'cert-18',
            title: 'Mastering Smart Contract',
            issuer: 'ICP HUB Indonesia',
            date: '2024-10-01',
            credentialId: 'IOC-8DeTb',
            credentialUrl: 'https://nwtbe-6iaaa-aaaak-qiqca-cai.icp0.io/student-dashboard/my-certificates',
            category: 'certification',
            image: '/certificate/Mastering Smart Contract.webp'
        },
        {
            id: 'cert-19',
            title: 'Machine Learning Modeling (Beginner)',
            issuer: 'Dicoding Indonesia',
            date: '2024-10-01',
            credentialId: '1RXY20W6KXVM',
            credentialUrl: 'https://www.dicoding.com/certificates/1RXY20W6KXVM',
            category: 'certification',
            image: '/certificate/Machine Learning Modeling (Beginner).pdf'
        },
        {
            id: 'cert-20',
            title: 'AWS Academy Graduate - Cloud 1',
            issuer: 'Amazon Web Services',
            date: '2024-10-01',
            credentialId: '4fc1c551-1f68-47cc-b371-d2785495ae61',
            credentialUrl: 'https://www.credly.com/badges/4fc1c551-1f68-47cc-b371-d2785495ae61',
            type: 'Course',
            tags: [
                'AWS',
                'Cloud'
            ],
            category: 'certification',
            image: '/certificate/AWS Academy Graduate - AWS Academy Introduction to Cloud 1.pdf'
        },
        {
            id: 'cert-21',
            title: 'React Dasar (Gold)',
            issuer: 'Skilvul',
            date: '2024-09-01',
            credentialId: 'E7jpSPY5S6-x_qr8XR7EFQ',
            credentialUrl: 'https://skilvul.com/courses/react-dasar/student/cm0f41vtl01q501p29y0a45jf/',
            category: 'certification',
            image: '/certificate/React Dasar (Gold).pdf'
        },
        {
            id: 'cert-22',
            title: 'Algorithm & Data Structures with Python',
            issuer: 'Skilvul',
            date: '2024-08-01',
            credentialId: 'g2lBGc8vSMqN0J2ez6BSnA',
            credentialUrl: 'https://skilvul.com/courses/algorithm-and-data-structures-with-python/student/cm0f41vtl01q501p29y0a45jf/',
            category: 'certification',
            image: '/certificate/Algorithm & Data Structures with Python.pdf'
        },
        {
            id: 'cert-23',
            title: 'Python Lanjutan',
            issuer: 'Skilvul',
            date: '2024-08-01',
            credentialId: 'MysWQQTNQvuKl-AXaTUILw',
            credentialUrl: 'https://skilvul.com/courses/python-lanjutan/student/cm0f41vtl01q501p29y0a45jf/',
            category: 'certification',
            image: '/certificate/Python Lanjutan.pdf'
        },
        {
            id: 'cert-24',
            title: 'Docker, Kubernetes dan DevOps',
            issuer: 'Udemy',
            date: '2024-08-01',
            credentialId: 'UC-306a5eba-5acd-4d0d-9fe8-cdd4259d8027',
            credentialUrl: 'https://www.udemy.com/certificate/UC-306a5eba-5acd-4d0d-9fe8-cdd4259d8027/',
            category: 'certification',
            image: '/certificate/Docker, Kubernetes dan DevOps.webp'
        },
        {
            id: 'cert-25',
            title: 'Store Listing Certificate',
            issuer: 'Google Play',
            date: '2024-07-01',
            credentialId: '110540570',
            credentialUrl: 'https://www.credential.net/ad3d06cc-16c9-4e1a-90db-c36fa3626bc8#acc.SKJ845tp',
            category: 'certification',
            image: '/certificate/Store Listing Certificate.pdf'
        },
        {
            id: 'cert-26',
            title: 'Fullstack Programming Untuk Pemula',
            issuer: 'Udemy',
            date: '2024-07-01',
            credentialId: 'UC-3c8cd3d2-a39f-4e63-8bca-25c1901a1b06',
            credentialUrl: 'https://www.udemy.com/certificate/UC-3c8cd3d2-a39f-4e63-8bca-25c1901a1b06/',
            category: 'certification',
            image: '/certificate/Fullstack Programming Untuk Pemula.webp'
        },
        {
            id: 'cert-27',
            title: 'Pemrograman dengan Python',
            issuer: 'Dicoding Indonesia',
            date: '2024-07-01',
            credentialId: '4EXGQ83LQZRL',
            credentialUrl: 'https://www.dicoding.com/certificates/4EXGQ83LQZRL',
            category: 'certification',
            image: '/certificate/Pemrograman dengan Python.pdf'
        },
        {
            id: 'cert-28',
            title: 'Dasar Structured Query Language (SQL)',
            issuer: 'Dicoding Indonesia',
            date: '2024-07-01',
            credentialId: 'JLX17RY45X72',
            credentialUrl: 'https://www.dicoding.com/certificates/JLX17RY45X72',
            category: 'certification',
            image: '/certificate/Dasar Structured Query Language (SQL).pdf'
        },
        {
            id: 'cert-29',
            title: 'Visualisasi Data',
            issuer: 'Dicoding Indonesia',
            date: '2024-07-01',
            credentialId: 'L4PQ1Y25QXO1',
            credentialUrl: 'https://www.dicoding.com/certificates/L4PQ1Y25QXO1',
            category: 'certification',
            image: '/certificate/Visualisasi Data.pdf'
        },
        {
            id: 'cert-30',
            title: 'Dasar Artificial Intelligence',
            issuer: 'Dicoding Indonesia',
            date: '2024-07-01',
            credentialId: '6RPN19RV4X2M',
            credentialUrl: 'https://www.dicoding.com/certificates/6RPN19RV4X2M',
            category: 'certification',
            image: '/certificate/Dasar Artificial Intelligence.pdf'
        }
    ],
    techStack: [
        {
            name: 'Python',
            icon: 'https://cdn.simpleicons.org/python',
            category: 'language'
        },
        {
            name: 'TypeScript',
            icon: 'https://cdn.simpleicons.org/typescript',
            category: 'language'
        },
        {
            name: 'JavaScript',
            icon: 'https://cdn.simpleicons.org/javascript',
            category: 'language'
        },
        {
            name: 'Solidity',
            icon: 'https://cdn.simpleicons.org/solidity',
            category: 'language'
        },
        {
            name: 'React',
            icon: 'https://cdn.simpleicons.org/react',
            category: 'framework'
        },
        {
            name: 'Next.js',
            icon: 'https://cdn.simpleicons.org/nextdotjs',
            category: 'framework'
        },
        {
            name: 'Node.js',
            icon: 'https://cdn.simpleicons.org/nodedotjs',
            category: 'framework'
        },
        {
            name: 'TensorFlow',
            icon: 'https://cdn.simpleicons.org/tensorflow',
            category: 'library'
        },
        {
            name: 'Scikit-learn',
            icon: 'https://cdn.simpleicons.org/scikitlearn',
            category: 'library'
        },
        {
            name: 'Pandas',
            icon: 'https://cdn.simpleicons.org/pandas',
            category: 'library'
        },
        {
            name: 'NumPy',
            icon: 'https://cdn.simpleicons.org/numpy',
            category: 'library'
        },
        {
            name: 'Matplotlib',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg',
            category: 'library'
        },
        {
            name: 'Tailwind CSS',
            icon: 'https://cdn.simpleicons.org/tailwindcss',
            category: 'library'
        },
        {
            name: 'Redis',
            icon: 'https://cdn.simpleicons.org/redis',
            category: 'database'
        },
        {
            name: 'PostgreSQL',
            icon: 'https://cdn.simpleicons.org/postgresql',
            category: 'database'
        },
        {
            name: 'Kubernetes',
            icon: 'https://cdn.simpleicons.org/kubernetes',
            category: 'tool'
        },
        {
            name: 'Docker',
            icon: 'https://cdn.simpleicons.org/docker',
            category: 'tool'
        },
        {
            name: 'Terraform',
            icon: 'https://cdn.simpleicons.org/terraform',
            category: 'tool'
        },
        {
            name: 'LangChain',
            icon: 'https://cdn.simpleicons.org/langchain',
            category: 'library'
        },
        {
            name: 'Mistral AI',
            icon: 'https://cdn.simpleicons.org/mistralai',
            category: 'library'
        },
        {
            name: 'PyTorch',
            icon: 'https://cdn.simpleicons.org/pytorch',
            category: 'library'
        },
        {
            name: 'OpenCV',
            icon: 'https://cdn.simpleicons.org/opencv',
            category: 'library'
        },
        {
            name: 'FastAPI',
            icon: 'https://cdn.simpleicons.org/fastapi',
            category: 'framework'
        },
        {
            name: 'Flask',
            icon: 'https://cdn.simpleicons.org/flask',
            category: 'framework'
        }
    ],
    hardSkills: [
        {
            name: 'System Architecture',
            level: 'intermediate',
            category: 'software',
            description: 'Designing robust, scalable, and high-performance system architectures for complex applications.'
        },
        {
            name: 'AI Agents & Autonomy',
            level: 'beginner',
            category: 'ai',
            description: 'Designing autonomous systems with recursive reasoning and decision-making capabilities.'
        },
        {
            name: 'Large Language Models (LLM)',
            level: 'intermediate',
            category: 'ai',
            description: 'Expertise in fine tuning open source models, RAG architectures, and prompt engineering.'
        },
        {
            name: 'Data Science',
            level: 'expert',
            category: 'ai',
            description: 'Advanced statistical analysis and predictive modeling to extract insights from big data.'
        },
        {
            name: 'Deep Learning (CV/NLP)',
            level: 'advanced',
            category: 'ai',
            description: 'Architecting deep neural networks for complex computer vision and natural language tasks.'
        },
        {
            name: 'Computer Vision',
            level: 'intermediate',
            category: 'ai',
            description: 'Developing real-time object detection, pattern recognition, and spatial analysis systems.'
        },
        {
            name: 'Machine Learning Ops',
            level: 'advanced',
            category: 'ai',
            description: 'Implementing robust pipelines for model training, deployment, and performance monitoring.'
        },
        {
            name: 'DevOps',
            level: 'advanced',
            category: 'devops',
            description: 'Streamlining development workflows and infrastructure management through automation.'
        },
        {
            name: 'Full Stack Development',
            level: 'expert',
            category: 'software',
            description: 'Engineering scalable web architectures from pixel-perfect frontends to robust databases.'
        },
        {
            name: 'System Analysis',
            level: 'advanced',
            category: 'software',
            description: 'Translating complex stakeholder requirements into efficient and scalable technical blueprints.'
        },
        {
            name: 'SDLC',
            level: 'intermediate',
            category: 'software',
            description: 'Governing the entire life cycle of software development with a focus on quality and agility.'
        },
        {
            name: 'Software Design',
            level: 'advanced',
            category: 'software',
            description: 'Applying architectural patterns and principles to build maintainable and modular systems.'
        },
        {
            name: 'Requirement Specifications',
            level: 'advanced',
            category: 'software',
            description: 'Defining clear, precise, and actionable technical documentation for engineering teams.'
        },
        {
            name: 'Data Analytics',
            level: 'advanced',
            category: 'data',
            description: 'Transforming raw data into meaningful visualizations and strategic intelligence.'
        },
        {
            name: 'Data Visualization',
            level: 'expert',
            category: 'data',
            description: 'Crafting intuitive and interactive dashboards to communicate complex data findings.'
        },
        {
            name: 'SQL & DBMS',
            level: 'expert',
            category: 'data',
            description: 'Architecting and optimizing relational database schemas for high-performance applications.'
        },
        {
            name: 'Docker & Kubernetes',
            level: 'intermediate',
            category: 'devops',
            description: 'Containerizing applications for consistent deployment and orchestrating cloud resources.'
        },
        // Other Technical Skills
        {
            name: 'Wazuh',
            level: 'beginner',
            category: 'other',
            description: 'Exploring open-source security monitoring for threat detection and compliance.'
        },
        {
            name: 'Network Traffic Analysis',
            level: 'beginner',
            category: 'other',
            description: 'Analyzing packet captures to identify anomalies and optimize network performance.'
        },
        {
            name: 'Socket Programming',
            level: 'expert',
            category: 'other',
            description: 'Implementing low-level network communication protocols for real-time data transfer.'
        },
        {
            name: 'Google Cloud Platform',
            level: 'beginner',
            category: 'other',
            description: 'Utilizing cloud infrastructure and services for scalable application hosting.'
        },
        {
            name: 'Solidity',
            level: 'beginner',
            category: 'other',
            description: 'Writing secure smart contracts for decentralized applications on Ethereum.'
        },
        {
            name: 'Decentralized Applications (DApps)',
            level: 'beginner',
            category: 'other',
            description: 'Developing web applications that interact with blockchain smart contracts.'
        },
        {
            name: 'Blockchain Architecture',
            level: 'beginner',
            category: 'other',
            description: 'Understanding the fundamental principles of distributed ledger technologies.'
        }
    ],
    softSkills: [
        {
            name: 'Problem Solving',
            description: 'Innovative debugging and algorithmic optimization'
        },
        {
            name: 'Systemic Thinking',
            description: 'Designing robust, scalable end-to-end architectures'
        },
        {
            name: 'Critical Thinking',
            description: 'Analytical approach to solving complex engineering challenges'
        },
        {
            name: 'Continuous Learning',
            description: 'Staying updated with state-of-the-art AI research'
        },
        {
            name: 'Analytical Thinking',
            description: 'Breaking down complex data into actionable insights'
        },
        {
            name: 'Adaptability',
            description: 'Quickly mastering new frameworks and AI models'
        },
        {
            name: 'Leadership',
            description: 'Leading engineering teams and managing complex projects'
        },
        {
            name: 'Communication',
            description: 'Translating complex AI concepts for stakeholders'
        },
        {
            name: 'Teamwork',
            description: 'Collaborative development in cross-functional agile teams'
        },
        {
            name: 'Research Skills',
            description: 'In-depth literature review and academic contribution'
        }
    ],
    tools: [
        {
            name: 'VS Code',
            icon: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg',
            category: 'ide'
        },
        {
            name: 'Jupyter',
            icon: 'https://cdn.simpleicons.org/jupyter',
            category: 'ide'
        },
        {
            name: 'Google Colab',
            icon: 'https://cdn.simpleicons.org/googlecolab',
            category: 'ide'
        },
        {
            name: 'Figma',
            icon: 'https://cdn.simpleicons.org/figma',
            category: 'design'
        },
        {
            name: 'GitHub',
            icon: 'https://cdn.simpleicons.org/github',
            category: 'devops'
        },
        {
            name: 'Git',
            icon: 'https://cdn.simpleicons.org/git',
            category: 'devops'
        },
        {
            name: 'Docker',
            icon: 'https://cdn.simpleicons.org/docker',
            category: 'devops'
        },
        {
            name: 'Conda',
            icon: 'https://cdn.simpleicons.org/anaconda',
            category: 'devops'
        },
        {
            name: 'Linux',
            icon: 'https://cdn.simpleicons.org/linux',
            category: 'devops'
        },
        {
            name: 'Postman',
            icon: 'https://cdn.simpleicons.org/postman',
            category: 'devops'
        }
    ],
    faqs: [
        {
            question: 'What services do you offer?',
            answer: 'I specialize in Full Stack Development (React, Next.js, Node.js), AI/ML Development (TensorFlow, Computer Vision, NLP), Data Science, and Blockchain/Web3 development (Solidity, Smart Contracts, DApps).'
        },
        {
            question: 'What technologies are you exploring?',
            answer: 'Currently diving deep into AI Agents, Blockchain technology (Solidity, Smart Contracts), and MLOps for production-ready AI systems.'
        },
        {
            question: 'Are you available for opportunities?',
            answer: 'Yes! I\'m open to internships, collaborations, and exciting projects in AI, Data Science, Full Stack Development, and Blockchain. Feel free to reach out!'
        }
    ],
    blogs: [
        {
            id: 'blog-1',
            slug: 'future-of-ai-agents',
            title: 'The Future of AI Agents in Enterprise',
            excerpt: 'How autonomous agents are redefining software architecture and decision-making processes.',
            content: 'Detailed exploration of AI agents...',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-03-20',
            category: 'applied-ai',
            tags: [
                'AI',
                'Agents',
                'Enterprise'
            ],
            author: {
                name: 'Azril',
                avatar: "/grid.svg"
            },
            readTime: '5'
        },
        {
            id: 'blog-2',
            slug: 'web3-ux-challenges',
            title: 'Overcoming Web3 UX Challenges',
            excerpt: 'Strategies for building decentralized applications that feel as smooth as Web2.',
            content: 'UX in Web3 is critical...',
            image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-03-15',
            category: 'more',
            tags: [
                'Web3',
                'Blockchain',
                'UX'
            ],
            author: {
                name: 'Azril',
                avatar: "/grid.svg"
            },
            readTime: '4'
        },
        {
            id: 'blog-3',
            slug: 'mastering-nextjs-performance',
            title: 'Mastering Next.js Performance',
            excerpt: 'Advanced techniques for optimizing Core Web Vitals in modern React applications.',
            content: 'Performance optimization...',
            image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-03-05',
            category: 'software-development',
            tags: [
                'Next.js',
                'React',
                'Performance'
            ],
            author: {
                name: 'Azril',
                avatar: "/grid.svg"
            },
            readTime: '6'
        },
        {
            id: 'blog-4',
            slug: 'ai-driven-security',
            title: 'AI-Driven Cybersecurity',
            excerpt: 'Using deep learning to detect and prevent modern network intrusion.',
            content: 'Cybersecurity with AI...',
            image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-02-28',
            category: 'applied-ai',
            tags: [
                'AI',
                'Security',
                'Deep Learning'
            ],
            author: {
                name: 'Azril',
                avatar: "/grid.svg"
            },
            readTime: '7'
        },
        {
            id: 'blog-5',
            slug: 'llm-fine-tuning',
            title: 'Fine-Tuning LLMs locally',
            excerpt: 'A guide to optimizing open-source models using Ollama and LoRA techniques.',
            content: 'Local LLM fine-tuning...',
            image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-02-15',
            category: 'applied-ai',
            tags: [
                'LLM',
                'Python',
                'Ollama'
            ],
            author: {
                name: 'Azril',
                avatar: "/grid.svg"
            },
            readTime: '8'
        },
        {
            id: 'blog-6',
            slug: 'smart-contract-security',
            title: 'Smart Contract Audit Patterns',
            excerpt: 'Common vulnerabilities and how to prevent them in Solidity.',
            content: 'Audit patterns...',
            image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-02-01',
            category: 'more',
            tags: [
                'Solidity',
                'Ethereum',
                'Security'
            ],
            author: {
                name: 'Azril',
                avatar: "/grid.svg"
            },
            readTime: '5'
        },
        {
            id: 'blog-7',
            slug: 'modern-state-management',
            title: 'Modern State Management in React',
            excerpt: 'Comparing Zustand, Redux Toolkit, and React Context for large-scale apps.',
            content: 'State management...',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-01-25',
            category: 'software-development',
            tags: [
                'React',
                'Zustand',
                'Architecture'
            ],
            author: {
                name: 'Azril',
                avatar: "/grid.svg"
            },
            readTime: '4'
        },
        {
            id: 'blog-8',
            slug: 'iot-edge-computing',
            title: 'Edge Computing with ESP32',
            excerpt: 'Implementing real-time data processing at the edge for industrial IoT.',
            content: 'Edge computing...',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-01-10',
            category: 'software-development',
            tags: [
                'IoT',
                'ESP32',
                'Edge'
            ],
            author: {
                name: 'Azril',
                avatar: "/grid.svg"
            },
            readTime: '6'
        },
        {
            id: 'blog-9',
            slug: 'ai-in-healthcare',
            title: 'AI Transformation in Healthcare',
            excerpt: 'How computer vision is assisting in medical diagnostics and data analysis.',
            content: 'Healthcare AI...',
            image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-01-05',
            category: 'applied-ai',
            tags: [
                'Healthcare',
                'AI',
                'Ethics'
            ],
            author: {
                name: 'Azril',
                avatar: "/grid.svg"
            },
            readTime: '7'
        },
        {
            id: 'blog-10',
            slug: 'the-architects-manifesto',
            title: "Digital Garden: The Architect's Manifesto",
            excerpt: "Reflecting on my journey as an AI Engineer and the philosophy behind building intelligent, scalable systems.",
            content: "My journey into the world of technology hasn't been just about code...",
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2000&auto=format&fit=crop&fm=webp',
            date: '2026-03-31',
            category: 'about-me',
            tags: [
                'Philosophy',
                'Engineering',
                'About Me'
            ],
            author: {
                name: 'Azril',
                avatar: "/grid.svg"
            },
            readTime: '5'
        }
    ],
    gallery: [
        {
            id: 'gal-1',
            title: 'CPS Lab Research',
            description: 'Deep Learning research workshop at Cyber Physical System Laboratory.',
            date: '2025-01-20',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop&fm=webp',
            category: 'research'
        },
        {
            id: 'gal-2',
            title: 'Smart City Symposium',
            description: 'Presenting AIoT solutions for sustainable urban development.',
            date: '2024-12-15',
            type: 'video',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop&fm=webp',
            category: 'event'
        },
        {
            id: 'gal-3',
            title: 'Neural Network Visualization',
            description: 'Custom visualization of a Convolutional Neural Network architecture.',
            date: '2024-11-30',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=2000&auto=format&fit=crop&fm=webp',
            category: 'technical'
        },
        {
            id: 'gal-4',
            title: 'Blockchain Hackathon',
            description: 'Building decentralized finance solutions in 48 hours.',
            date: '2024-10-25',
            type: 'image',
            url: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=2000&auto=format&fit=crop&fm=webp',
            category: 'event'
        },
        {
            id: 'gal-5',
            title: 'IoT Prototype Demo',
            description: 'Testing real-time sensor integration with cloud platforms.',
            date: '2024-09-15',
            type: 'video',
            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop&fm=webp',
            category: 'technical'
        }
    ]
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/useIsMobile.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsMobile",
    ()=>useIsMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useIsMobile(breakpoint = 768) {
    _s();
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIsMobile.useEffect": ()=>{
            const checkIsMobile = {
                "useIsMobile.useEffect.checkIsMobile": ()=>{
                    setIsMobile(window.innerWidth < breakpoint);
                }
            }["useIsMobile.useEffect.checkIsMobile"];
            // Initial check
            checkIsMobile();
            // Event listener for window resize
            window.addEventListener('resize', checkIsMobile);
            // Cleanup
            return ({
                "useIsMobile.useEffect": ()=>{
                    window.removeEventListener('resize', checkIsMobile);
                }
            })["useIsMobile.useEffect"];
        }
    }["useIsMobile.useEffect"], [
        breakpoint
    ]);
    return isMobile;
}
_s(useIsMobile, "0VTTNJATKABQPGLm9RVT0tKGUgU=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatDate",
    ()=>formatDate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatDate(input) {
    const date = new Date(input);
    return date.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric"
    });
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/providers/I18nProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "I18nProvider",
    ()=>I18nProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$NextIntlClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__NextIntlClientProvider$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/shared/NextIntlClientProvider.js [app-client] (ecmascript) <export default as NextIntlClientProvider>");
'use client';
;
;
function I18nProvider({ children, locale, messages, timeZone = 'Asia/Jakarta' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$shared$2f$NextIntlClientProvider$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__NextIntlClientProvider$3e$__["NextIntlClientProvider"], {
        locale: locale,
        messages: messages,
        timeZone: timeZone,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/providers/I18nProvider.tsx",
        lineNumber: 15,
        columnNumber: 9
    }, this);
}
_c = I18nProvider;
var _c;
__turbopack_context__.k.register(_c, "I18nProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/providers/SmoothScrollProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SmoothScrollProvider",
    ()=>SmoothScrollProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lenis/dist/lenis-react.mjs [app-client] (ecmascript)");
'use client';
;
;
function SmoothScrollProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lenis$2f$dist$2f$lenis$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactLenis"], {
        root: true,
        options: {
            lerp: 0.1,
            duration: 1.5,
            smoothWheel: true,
            // smoothTouch is causing TS error in this version's types
            // @ts-ignore
            smoothTouch: false
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/providers/SmoothScrollProvider.tsx",
        lineNumber: 7,
        columnNumber: 9
    }, this);
}
_c = SmoothScrollProvider;
var _c;
__turbopack_context__.k.register(_c, "SmoothScrollProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/providers/ThemeProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.module.js [app-client] (ecmascript)");
'use client';
;
;
function ThemeProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        attribute: "class",
        defaultTheme: "dark",
        enableSystem: true,
        disableTransitionOnChange: false,
        storageKey: "portfolio-theme",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/providers/ThemeProvider.tsx",
        lineNumber: 12,
        columnNumber: 9
    }, this);
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=src_0qfen8gzst7xo._.js.map