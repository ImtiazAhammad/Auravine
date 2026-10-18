module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/kaggle-stats/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET() {
    const username = process.env.KAGGLE_USERNAME || "Arfazrll";
    const apiToken = process.env.KAGGLE_API_TOKEN;
    if (!apiToken) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Kaggle API token not found"
        }, {
            status: 500
        });
    }
    try {
        const auth = Buffer.from(`${username}:${apiToken}`).toString('base64');
        const headers = {
            'Authorization': `Basic ${auth}`
        };
        // 1. Fetch Datasets
        const datasetsRes = await fetch(`https://www.kaggle.com/api/v1/datasets/list?user=${username}`, {
            headers
        });
        const datasetsRaw = await datasetsRes.json();
        const datasets = Array.isArray(datasetsRaw) ? datasetsRaw.map((d)=>({
                title: d.title || "Untitled Dataset",
                votes: d.voteCount || 0,
                views: d.viewCount || 0,
                updated: d.lastUpdated || new Date().toISOString(),
                url: d.url,
                category: "Dataset",
                usability: d.usabilityRating || 0,
                size: d.totalBytes ? (d.totalBytes / 1024 / 1024).toFixed(1) + " MB" : "N/A"
            })) : [];
        // 2. Fetch Models
        const modelsRes = await fetch(`https://www.kaggle.com/api/v1/models/list?owner=${username}`, {
            headers
        });
        const modelsData = await modelsRes.json();
        const models = (modelsData.models || []).map((m)=>({
                title: m.title || "Untitled Model",
                category: "Model",
                updated: m.lastUpdated || new Date().toISOString(),
                votes: 0
            }));
        // 3. User Provided Notebooks & Overview Items (Merged for high fidelity)
        const notebooks = [
            {
                title: "Churn Prediction",
                category: "Notebook",
                updated: "2 months ago",
                msg: "Score: 0.91404",
                votes: 3
            },
            {
                title: "renewable energy prediction model",
                category: "Notebook",
                updated: "2 months ago",
                msg: "Private",
                votes: 0
            },
            {
                title: "DDoSDetection_AdaptiveAttention",
                category: "Notebook",
                updated: "2 months ago",
                msg: "0 comments",
                votes: 0
            },
            {
                title: "Mushroom Classification",
                category: "Notebook",
                updated: "2 months ago",
                msg: "1 comment",
                votes: 0
            },
            {
                title: "IrisProject.Rmd",
                category: "Notebook",
                updated: "2 months ago",
                msg: "0 comments",
                votes: 0
            },
            {
                title: "Urban Solar ROI & Sustainability Analysis",
                category: "Notebook",
                updated: "2 months ago",
                msg: "0 comments",
                votes: 0
            },
            {
                title: "Milk Clasification",
                category: "Notebook",
                updated: "2 months ago",
                msg: "0 comments",
                votes: 1
            },
            {
                title: "rag_core",
                category: "Notebook",
                updated: "2 months ago",
                msg: "0 comments",
                votes: 0
            },
            {
                title: "Transformer Based SQLi Detection",
                category: "Notebook",
                updated: "2 months ago",
                msg: "0 comments",
                votes: 0
            }
        ];
        const competitions = [
            {
                title: "Predict Customer Churn",
                msg: "Playground Series - Season 6 Episode 3",
                type: "Playground",
                teams: "4142 Teams",
                time: "a month ago"
            },
            {
                title: "Tugas 2 Machine learning",
                msg: "Eksplorasi data cuaca BMKG berbasis API",
                type: "Community",
                teams: "6 Teams",
                time: "2 months ago"
            },
            {
                title: "March Machine Learning Mania 2026",
                msg: "Forecast the 2026 NCAA Basketball Tournaments",
                type: "Featured",
                teams: "3462 Teams",
                time: "a month ago"
            },
            {
                title: "ADIKARA 2025 - Indonesian Credit Score",
                msg: "ADIKARA 2025 - Indonesian Credit Score",
                type: "Community",
                teams: "49 Teams",
                time: "5 months ago"
            },
            {
                title: "Seleksi Data Science Academy COMPFEST 17",
                msg: "Seleksi Data Science Academy COMPFEST 17",
                type: "Community",
                teams: "260 Teams",
                time: "10 months ago"
            },
            {
                title: "Penyisihan Data Mining Adikara 2024",
                msg: "Kompetisi Data Mining ADIKARA",
                type: "Community",
                teams: "23 Teams",
                time: "a year ago"
            },
            {
                title: "Housing Prices Competition",
                msg: "Apply what you learned in the Machine Learning course",
                type: "Getting Started",
                teams: "4433 Teams",
                time: "Ongoing"
            }
        ];
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            stats: {
                datasets: datasets.length,
                notebooks: notebooks.length,
                models: models.length,
                competitions: competitions.length,
                totalContributions: datasets.length + notebooks.length + models.length + competitions.length
            },
            datasets,
            models,
            notebooks,
            competitions,
            overview: [
                ...datasets.slice(0, 5),
                ...notebooks.slice(0, 5),
                ...models.slice(0, 5)
            ].sort((a, b)=>new Date(b.updated).getTime() - new Date(a.updated).getTime()),
            activity: datasets.slice(0, 5).map((d, i)=>({
                    type: "Update",
                    repo: d.title,
                    msg: `Refined ${d.category} structure`,
                    time: new Date(d.updated).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric'
                    })
                }))
        });
    } catch (error) {
        console.error("Kaggle API Error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Failed to fetch Kaggle stats"
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1bh1-xpsi0u_5._.js.map