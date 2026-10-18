(()=>{"use strict";(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/ImageTrail.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ImageTrail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
function lerp(a, b, n) {
    return (1 - n) * a + n * b;
}
function getLocalPointerPos(e, rect) {
    let clientX = 0, clientY = 0;
    if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
    }
    return {
        x: clientX - rect.left,
        y: clientY - rect.top
    };
}
function getMouseDistance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.hypot(dx, dy);
}
class ImageItem {
    DOM = {
        el: null,
        inner: null
    };
    defaultStyle = {
        scale: 1,
        x: 0,
        y: 0,
        opacity: 0
    };
    rect = null;
    resize;
    constructor(DOM_el){
        this.DOM.el = DOM_el;
        this.DOM.inner = this.DOM.el.querySelector('.content__img-inner');
        this.getRect();
        this.initEvents();
    }
    initEvents() {
        this.resize = ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].set(this.DOM.el, this.defaultStyle);
            this.getRect();
        };
        window.addEventListener('resize', this.resize);
    }
    getRect() {
        this.rect = this.DOM.el.getBoundingClientRect();
    }
}
class ImageTrailVariant1 {
    container;
    DOM;
    images;
    imagesTotal;
    imgPosition;
    zIndexVal;
    activeImagesCount;
    isIdle;
    threshold;
    mousePos;
    lastMousePos;
    cacheMousePos;
    constructor(container){
        this.container = container;
        this.DOM = {
            el: container
        };
        this.images = [
            ...container.querySelectorAll('.content__img')
        ].map((img)=>new ImageItem(img));
        this.imagesTotal = this.images.length;
        this.imgPosition = 0;
        this.zIndexVal = 1;
        this.activeImagesCount = 0;
        this.isIdle = true;
        this.threshold = 80;
        this.mousePos = {
            x: 0,
            y: 0
        };
        this.lastMousePos = {
            x: 0,
            y: 0
        };
        this.cacheMousePos = {
            x: 0,
            y: 0
        };
        const handlePointerMove = (ev)=>{
            const rect = this.container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
        };
        container.addEventListener('mousemove', handlePointerMove);
        container.addEventListener('touchmove', handlePointerMove);
        const initRender = (ev)=>{
            const rect = this.container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
            this.cacheMousePos = {
                ...this.mousePos
            };
            requestAnimationFrame(()=>this.render());
            container.removeEventListener('mousemove', initRender);
            container.removeEventListener('touchmove', initRender);
        };
        container.addEventListener('mousemove', initRender);
        container.addEventListener('touchmove', initRender);
    }
    render() {
        const distance = getMouseDistance(this.mousePos, this.lastMousePos);
        this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
        this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
        if (distance > this.threshold) {
            this.showNextImage();
            this.lastMousePos = {
                ...this.mousePos
            };
        }
        if (this.isIdle && this.zIndexVal !== 1) {
            this.zIndexVal = 1;
        }
        requestAnimationFrame(()=>this.render());
    }
    showNextImage() {
        ++this.zIndexVal;
        this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
        const img = this.images[this.imgPosition];
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(img.DOM.el);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
            onStart: ()=>this.onImageActivated(),
            onComplete: ()=>this.onImageDeactivated()
        }).fromTo(img.DOM.el, {
            opacity: 1,
            scale: 1,
            zIndex: this.zIndexVal,
            x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2
        }, {
            duration: 0.4,
            ease: 'power1',
            x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.mousePos.y - (img.rect?.height ?? 0) / 2
        }, 0).to(img.DOM.el, {
            duration: 0.4,
            ease: 'power3',
            opacity: 0,
            scale: 0.2
        }, 0.4);
    }
    onImageActivated() {
        this.activeImagesCount++;
        this.isIdle = false;
    }
    onImageDeactivated() {
        this.activeImagesCount--;
        if (this.activeImagesCount === 0) {
            this.isIdle = true;
        }
    }
}
class ImageTrailVariant2 {
    container;
    DOM;
    images;
    imagesTotal;
    imgPosition;
    zIndexVal;
    activeImagesCount;
    isIdle;
    threshold;
    mousePos;
    lastMousePos;
    cacheMousePos;
    constructor(container){
        this.container = container;
        this.DOM = {
            el: container
        };
        this.images = [
            ...container.querySelectorAll('.content__img')
        ].map((img)=>new ImageItem(img));
        this.imagesTotal = this.images.length;
        this.imgPosition = 0;
        this.zIndexVal = 1;
        this.activeImagesCount = 0;
        this.isIdle = true;
        this.threshold = 80;
        this.mousePos = {
            x: 0,
            y: 0
        };
        this.lastMousePos = {
            x: 0,
            y: 0
        };
        this.cacheMousePos = {
            x: 0,
            y: 0
        };
        const handlePointerMove = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
        };
        container.addEventListener('mousemove', handlePointerMove);
        container.addEventListener('touchmove', handlePointerMove);
        const initRender = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
            this.cacheMousePos = {
                ...this.mousePos
            };
            requestAnimationFrame(()=>this.render());
            container.removeEventListener('mousemove', initRender);
            container.removeEventListener('touchmove', initRender);
        };
        container.addEventListener('mousemove', initRender);
        container.addEventListener('touchmove', initRender);
    }
    render() {
        const distance = getMouseDistance(this.mousePos, this.lastMousePos);
        this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
        this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
        if (distance > this.threshold) {
            this.showNextImage();
            this.lastMousePos = {
                ...this.mousePos
            };
        }
        if (this.isIdle && this.zIndexVal !== 1) {
            this.zIndexVal = 1;
        }
        requestAnimationFrame(()=>this.render());
    }
    showNextImage() {
        ++this.zIndexVal;
        this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
        const img = this.images[this.imgPosition];
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(img.DOM.el);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
            onStart: ()=>this.onImageActivated(),
            onComplete: ()=>this.onImageDeactivated()
        }).fromTo(img.DOM.el, {
            opacity: 1,
            scale: 0,
            zIndex: this.zIndexVal,
            x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2
        }, {
            duration: 0.4,
            ease: 'power1',
            scale: 1,
            x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.mousePos.y - (img.rect?.height ?? 0) / 2
        }, 0).fromTo(img.DOM.inner, {
            scale: 2.8,
            filter: 'brightness(250%)'
        }, {
            duration: 0.4,
            ease: 'power1',
            scale: 1,
            filter: 'brightness(100%)'
        }, 0).to(img.DOM.el, {
            duration: 0.4,
            ease: 'power2',
            opacity: 0,
            scale: 0.2
        }, 0.45);
    }
    onImageActivated() {
        this.activeImagesCount++;
        this.isIdle = false;
    }
    onImageDeactivated() {
        this.activeImagesCount--;
        if (this.activeImagesCount === 0) {
            this.isIdle = true;
        }
    }
}
class ImageTrailVariant3 {
    container;
    DOM;
    images;
    imagesTotal;
    imgPosition;
    zIndexVal;
    activeImagesCount;
    isIdle;
    threshold;
    mousePos;
    lastMousePos;
    cacheMousePos;
    isDestroyed = false;
    handlePointerMove;
    constructor(container){
        this.container = container;
        this.DOM = {
            el: container
        };
        this.images = [
            ...container.querySelectorAll('.content__img')
        ].map((img)=>new ImageItem(img));
        this.imagesTotal = this.images.length;
        this.imgPosition = 0;
        this.zIndexVal = 1;
        this.activeImagesCount = 0;
        this.isIdle = true;
        this.threshold = 80;
        this.mousePos = {
            x: 0,
            y: 0
        };
        this.lastMousePos = {
            x: 0,
            y: 0
        };
        this.cacheMousePos = {
            x: 0,
            y: 0
        };
        this.handlePointerMove = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
        };
        window.addEventListener('mousemove', this.handlePointerMove);
        window.addEventListener('touchmove', this.handlePointerMove);
        const initRender = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
            this.cacheMousePos = {
                ...this.mousePos
            };
            requestAnimationFrame(()=>this.render());
            window.removeEventListener('mousemove', initRender);
            window.removeEventListener('touchmove', initRender);
        };
        window.addEventListener('mousemove', initRender);
        window.addEventListener('touchmove', initRender);
    }
    destroy() {
        this.isDestroyed = true;
        window.removeEventListener('mousemove', this.handlePointerMove);
        window.removeEventListener('touchmove', this.handlePointerMove);
    }
    render() {
        if (this.isDestroyed) return;
        const distance = getMouseDistance(this.mousePos, this.lastMousePos);
        this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
        this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
        if (distance > this.threshold) {
            this.showNextImage();
            this.lastMousePos = {
                ...this.mousePos
            };
        }
        if (this.isIdle && this.zIndexVal !== 1) {
            this.zIndexVal = 1;
        }
        requestAnimationFrame(()=>this.render());
    }
    showNextImage() {
        ++this.zIndexVal;
        this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
        const img = this.images[this.imgPosition];
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(img.DOM.el);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
            onStart: ()=>this.onImageActivated(),
            onComplete: ()=>this.onImageDeactivated()
        }).fromTo(img.DOM.el, {
            opacity: 1,
            scale: 0,
            zIndex: this.zIndexVal,
            xPercent: 0,
            yPercent: 0,
            x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2
        }, {
            duration: 0.4,
            ease: 'power1',
            scale: 1,
            x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.mousePos.y - (img.rect?.height ?? 0) / 2
        }, 0).fromTo(img.DOM.inner, {
            scale: 1.2
        }, {
            duration: 0.4,
            ease: 'power1',
            scale: 1
        }, 0).to(img.DOM.el, {
            duration: 0.6,
            ease: 'power2.in',
            opacity: 0,
            scale: 0,
            x: this.container.offsetWidth / 2 - (img.rect?.width ?? 0) / 2,
            y: this.container.offsetHeight * 0.18 - (img.rect?.height ?? 0) / 2
        }, 0.6);
    }
    onImageActivated() {
        this.activeImagesCount++;
        this.isIdle = false;
    }
    onImageDeactivated() {
        this.activeImagesCount--;
        if (this.activeImagesCount === 0) {
            this.isIdle = true;
        }
    }
}
class ImageTrailVariant4 {
    container;
    DOM;
    images;
    imagesTotal;
    imgPosition;
    zIndexVal;
    activeImagesCount;
    isIdle;
    threshold;
    mousePos;
    lastMousePos;
    cacheMousePos;
    constructor(container){
        this.container = container;
        this.DOM = {
            el: container
        };
        this.images = [
            ...container.querySelectorAll('.content__img')
        ].map((img)=>new ImageItem(img));
        this.imagesTotal = this.images.length;
        this.imgPosition = 0;
        this.zIndexVal = 1;
        this.activeImagesCount = 0;
        this.isIdle = true;
        this.threshold = 80;
        this.mousePos = {
            x: 0,
            y: 0
        };
        this.lastMousePos = {
            x: 0,
            y: 0
        };
        this.cacheMousePos = {
            x: 0,
            y: 0
        };
        const handlePointerMove = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
        };
        container.addEventListener('mousemove', handlePointerMove);
        container.addEventListener('touchmove', handlePointerMove);
        const initRender = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
            this.cacheMousePos = {
                ...this.mousePos
            };
            requestAnimationFrame(()=>this.render());
            container.removeEventListener('mousemove', initRender);
            container.removeEventListener('touchmove', initRender);
        };
        container.addEventListener('mousemove', initRender);
        container.addEventListener('touchmove', initRender);
    }
    render() {
        const distance = getMouseDistance(this.mousePos, this.lastMousePos);
        if (distance > this.threshold) {
            this.showNextImage();
            this.lastMousePos = {
                ...this.mousePos
            };
        }
        this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
        this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
        if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
        requestAnimationFrame(()=>this.render());
    }
    showNextImage() {
        ++this.zIndexVal;
        this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
        const img = this.images[this.imgPosition];
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(img.DOM.el);
        let dx = this.mousePos.x - this.cacheMousePos.x;
        let dy = this.mousePos.y - this.cacheMousePos.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance !== 0) {
            dx /= distance;
            dy /= distance;
        }
        dx *= distance / 100;
        dy *= distance / 100;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
            onStart: ()=>this.onImageActivated(),
            onComplete: ()=>this.onImageDeactivated()
        }).fromTo(img.DOM.el, {
            opacity: 1,
            scale: 0,
            zIndex: this.zIndexVal,
            x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2
        }, {
            duration: 0.4,
            ease: 'power1',
            scale: 1,
            x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.mousePos.y - (img.rect?.height ?? 0) / 2
        }, 0).fromTo(img.DOM.inner, {
            scale: 2,
            filter: `brightness(${Math.max(400 * distance / 100, 100)}%) contrast(${Math.max(400 * distance / 100, 100)}%)`
        }, {
            duration: 0.4,
            ease: 'power1',
            scale: 1,
            filter: 'brightness(100%) contrast(100%)'
        }, 0).to(img.DOM.el, {
            duration: 0.4,
            ease: 'power3',
            opacity: 0
        }, 0.4).to(img.DOM.el, {
            duration: 1.5,
            ease: 'power4',
            x: `+=${dx * 110}`,
            y: `+=${dy * 110}`
        }, 0.05);
    }
    onImageActivated() {
        this.activeImagesCount++;
        this.isIdle = false;
    }
    onImageDeactivated() {
        this.activeImagesCount--;
        if (this.activeImagesCount === 0) {
            this.isIdle = true;
        }
    }
}
class ImageTrailVariant5 {
    container;
    DOM;
    images;
    imagesTotal;
    imgPosition;
    zIndexVal;
    activeImagesCount;
    isIdle;
    threshold;
    mousePos;
    lastMousePos;
    cacheMousePos;
    lastAngle;
    constructor(container){
        this.container = container;
        this.DOM = {
            el: container
        };
        this.images = [
            ...container.querySelectorAll('.content__img')
        ].map((img)=>new ImageItem(img));
        this.imagesTotal = this.images.length;
        this.imgPosition = 0;
        this.zIndexVal = 1;
        this.activeImagesCount = 0;
        this.isIdle = true;
        this.threshold = 80;
        this.mousePos = {
            x: 0,
            y: 0
        };
        this.lastMousePos = {
            x: 0,
            y: 0
        };
        this.cacheMousePos = {
            x: 0,
            y: 0
        };
        this.lastAngle = 0;
        const handlePointerMove = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
        };
        container.addEventListener('mousemove', handlePointerMove);
        container.addEventListener('touchmove', handlePointerMove);
        const initRender = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
            this.cacheMousePos = {
                ...this.mousePos
            };
            requestAnimationFrame(()=>this.render());
            container.removeEventListener('mousemove', initRender);
            container.removeEventListener('touchmove', initRender);
        };
        container.addEventListener('mousemove', initRender);
        container.addEventListener('touchmove', initRender);
    }
    render() {
        const distance = getMouseDistance(this.mousePos, this.lastMousePos);
        if (distance > this.threshold) {
            this.showNextImage();
            this.lastMousePos = {
                ...this.mousePos
            };
        }
        this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
        this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
        if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
        requestAnimationFrame(()=>this.render());
    }
    showNextImage() {
        let dx = this.mousePos.x - this.cacheMousePos.x;
        let dy = this.mousePos.y - this.cacheMousePos.y;
        let angle = Math.atan2(dy, dx) * (180 / Math.PI);
        if (angle < 0) angle += 360;
        if (angle > 90 && angle <= 270) angle += 180;
        const isMovingClockwise = angle >= this.lastAngle;
        this.lastAngle = angle;
        let startAngle = isMovingClockwise ? angle - 10 : angle + 10;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance !== 0) {
            dx /= distance;
            dy /= distance;
        }
        dx *= distance / 150;
        dy *= distance / 150;
        ++this.zIndexVal;
        this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
        const img = this.images[this.imgPosition];
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(img.DOM.el);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
            onStart: ()=>this.onImageActivated(),
            onComplete: ()=>this.onImageDeactivated()
        }).fromTo(img.DOM.el, {
            opacity: 1,
            filter: 'brightness(80%)',
            scale: 0.1,
            zIndex: this.zIndexVal,
            x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2,
            rotation: startAngle
        }, {
            duration: 1,
            ease: 'power2',
            scale: 1,
            filter: 'brightness(100%)',
            x: this.mousePos.x - (img.rect?.width ?? 0) / 2 + dx * 70,
            y: this.mousePos.y - (img.rect?.height ?? 0) / 2 + dy * 70,
            rotation: this.lastAngle
        }, 0).to(img.DOM.el, {
            duration: 0.4,
            ease: 'expo',
            opacity: 0
        }, 0.5).to(img.DOM.el, {
            duration: 1.5,
            ease: 'power4',
            x: `+=${dx * 120}`,
            y: `+=${dy * 120}`
        }, 0.05);
    }
    onImageActivated() {
        this.activeImagesCount++;
        this.isIdle = false;
    }
    onImageDeactivated() {
        this.activeImagesCount--;
        if (this.activeImagesCount === 0) this.isIdle = true;
    }
}
class ImageTrailVariant6 {
    container;
    DOM;
    images;
    imagesTotal;
    imgPosition;
    zIndexVal;
    activeImagesCount;
    isIdle;
    threshold;
    mousePos;
    lastMousePos;
    cacheMousePos;
    constructor(container){
        this.container = container;
        this.DOM = {
            el: container
        };
        this.images = [
            ...container.querySelectorAll('.content__img')
        ].map((img)=>new ImageItem(img));
        this.imagesTotal = this.images.length;
        this.imgPosition = 0;
        this.zIndexVal = 1;
        this.activeImagesCount = 0;
        this.isIdle = true;
        this.threshold = 80;
        this.mousePos = {
            x: 0,
            y: 0
        };
        this.lastMousePos = {
            x: 0,
            y: 0
        };
        this.cacheMousePos = {
            x: 0,
            y: 0
        };
        const handlePointerMove = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
        };
        container.addEventListener('mousemove', handlePointerMove);
        container.addEventListener('touchmove', handlePointerMove);
        const initRender = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
            this.cacheMousePos = {
                ...this.mousePos
            };
            requestAnimationFrame(()=>this.render());
            container.removeEventListener('mousemove', initRender);
            container.removeEventListener('touchmove', initRender);
        };
        container.addEventListener('mousemove', initRender);
        container.addEventListener('touchmove', initRender);
    }
    render() {
        const distance = getMouseDistance(this.mousePos, this.lastMousePos);
        this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
        this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);
        if (distance > this.threshold) {
            this.showNextImage();
            this.lastMousePos = {
                ...this.mousePos
            };
        }
        if (this.isIdle && this.zIndexVal !== 1) {
            this.zIndexVal = 1;
        }
        requestAnimationFrame(()=>this.render());
    }
    mapSpeedToSize(speed, minSize, maxSize) {
        const maxSpeed = 200;
        return minSize + (maxSize - minSize) * Math.min(speed / maxSpeed, 1);
    }
    mapSpeedToBrightness(speed, minB, maxB) {
        const maxSpeed = 70;
        return minB + (maxB - minB) * Math.min(speed / maxSpeed, 1);
    }
    mapSpeedToBlur(speed, minBlur, maxBlur) {
        const maxSpeed = 90;
        return minBlur + (maxBlur - minBlur) * Math.min(speed / maxSpeed, 1);
    }
    mapSpeedToGrayscale(speed, minG, maxG) {
        const maxSpeed = 90;
        return minG + (maxG - minG) * Math.min(speed / maxSpeed, 1);
    }
    showNextImage() {
        const dx = this.mousePos.x - this.cacheMousePos.x;
        const dy = this.mousePos.y - this.cacheMousePos.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        ++this.zIndexVal;
        this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
        const img = this.images[this.imgPosition];
        const scaleFactor = this.mapSpeedToSize(speed, 0.3, 2);
        const brightnessValue = this.mapSpeedToBrightness(speed, 0, 1.3);
        const blurValue = this.mapSpeedToBlur(speed, 20, 0);
        const grayscaleValue = this.mapSpeedToGrayscale(speed, 600, 0);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(img.DOM.el);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
            onStart: ()=>this.onImageActivated(),
            onComplete: ()=>this.onImageDeactivated()
        }).fromTo(img.DOM.el, {
            opacity: 1,
            scale: 0,
            zIndex: this.zIndexVal,
            x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2
        }, {
            duration: 0.8,
            ease: 'power3',
            scale: scaleFactor,
            filter: `grayscale(${grayscaleValue * 100}%) brightness(${brightnessValue * 100}%) blur(${blurValue}px)`,
            x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.mousePos.y - (img.rect?.height ?? 0) / 2
        }, 0).fromTo(img.DOM.inner, {
            scale: 2
        }, {
            duration: 0.8,
            ease: 'power3',
            scale: 1
        }, 0).to(img.DOM.el, {
            duration: 0.4,
            ease: 'power3.in',
            opacity: 0,
            scale: 0.2
        }, 0.45);
    }
    onImageActivated() {
        this.activeImagesCount++;
        this.isIdle = false;
    }
    onImageDeactivated() {
        this.activeImagesCount--;
        if (this.activeImagesCount === 0) {
            this.isIdle = true;
        }
    }
}
function getNewPosition(position, offset, arr) {
    const realOffset = Math.abs(offset) % arr.length;
    if (position - realOffset >= 0) {
        return position - realOffset;
    } else {
        return arr.length - (realOffset - position);
    }
}
class ImageTrailVariant7 {
    container;
    DOM;
    images;
    imagesTotal;
    imgPosition;
    zIndexVal;
    activeImagesCount;
    isIdle;
    threshold;
    mousePos;
    lastMousePos;
    cacheMousePos;
    visibleImagesCount;
    visibleImagesTotal;
    constructor(container){
        this.container = container;
        this.DOM = {
            el: container
        };
        this.images = [
            ...container.querySelectorAll('.content__img')
        ].map((img)=>new ImageItem(img));
        this.imagesTotal = this.images.length;
        this.imgPosition = 0;
        this.zIndexVal = 1;
        this.activeImagesCount = 0;
        this.isIdle = true;
        this.threshold = 80;
        this.mousePos = {
            x: 0,
            y: 0
        };
        this.lastMousePos = {
            x: 0,
            y: 0
        };
        this.cacheMousePos = {
            x: 0,
            y: 0
        };
        this.visibleImagesCount = 0;
        this.visibleImagesTotal = 9;
        this.visibleImagesTotal = Math.min(this.visibleImagesTotal, this.imagesTotal - 1);
        const handlePointerMove = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
        };
        container.addEventListener('mousemove', handlePointerMove);
        container.addEventListener('touchmove', handlePointerMove);
        const initRender = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
            this.cacheMousePos = {
                ...this.mousePos
            };
            requestAnimationFrame(()=>this.render());
            container.removeEventListener('mousemove', initRender);
            container.removeEventListener('touchmove', initRender);
        };
        container.addEventListener('mousemove', initRender);
        container.addEventListener('touchmove', initRender);
    }
    render() {
        const distance = getMouseDistance(this.mousePos, this.lastMousePos);
        this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.3);
        this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.3);
        if (distance > this.threshold) {
            this.showNextImage();
            this.lastMousePos = {
                ...this.mousePos
            };
        }
        if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
        requestAnimationFrame(()=>this.render());
    }
    showNextImage() {
        ++this.zIndexVal;
        this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
        const img = this.images[this.imgPosition];
        ++this.visibleImagesCount;
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(img.DOM.el);
        const scaleValue = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].utils.random(0.5, 1.6);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
            onStart: ()=>this.onImageActivated(),
            onComplete: ()=>this.onImageDeactivated()
        }).fromTo(img.DOM.el, {
            scale: scaleValue - Math.max(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].utils.random(0.2, 0.6), 0),
            rotationZ: 0,
            opacity: 1,
            zIndex: this.zIndexVal,
            x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2
        }, {
            duration: 0.4,
            ease: 'power3',
            scale: scaleValue,
            rotationZ: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].utils.random(-3, 3),
            x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.mousePos.y - (img.rect?.height ?? 0) / 2
        }, 0);
        if (this.visibleImagesCount >= this.visibleImagesTotal) {
            const lastInQueue = getNewPosition(this.imgPosition, this.visibleImagesTotal, this.images);
            const oldImg = this.images[lastInQueue];
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].to(oldImg.DOM.el, {
                duration: 0.4,
                ease: 'power4',
                opacity: 0,
                scale: 1.3,
                onComplete: ()=>{
                    if (this.activeImagesCount === 0) {
                        this.isIdle = true;
                    }
                }
            });
        }
    }
    onImageActivated() {
        this.activeImagesCount++;
        this.isIdle = false;
    }
    onImageDeactivated() {
        this.activeImagesCount--;
    }
}
class ImageTrailVariant8 {
    container;
    DOM;
    images;
    imagesTotal;
    imgPosition;
    zIndexVal;
    activeImagesCount;
    isIdle;
    threshold;
    mousePos;
    lastMousePos;
    cacheMousePos;
    rotation;
    cachedRotation;
    zValue;
    cachedZValue;
    constructor(container){
        this.container = container;
        this.DOM = {
            el: container
        };
        this.images = [
            ...container.querySelectorAll('.content__img')
        ].map((img)=>new ImageItem(img));
        this.imagesTotal = this.images.length;
        this.imgPosition = 0;
        this.zIndexVal = 1;
        this.activeImagesCount = 0;
        this.isIdle = true;
        this.threshold = 80;
        this.mousePos = {
            x: 0,
            y: 0
        };
        this.lastMousePos = {
            x: 0,
            y: 0
        };
        this.cacheMousePos = {
            x: 0,
            y: 0
        };
        this.rotation = {
            x: 0,
            y: 0
        };
        this.cachedRotation = {
            x: 0,
            y: 0
        };
        this.zValue = 0;
        this.cachedZValue = 0;
        const handlePointerMove = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
        };
        container.addEventListener('mousemove', handlePointerMove);
        container.addEventListener('touchmove', handlePointerMove);
        const initRender = (ev)=>{
            const rect = container.getBoundingClientRect();
            this.mousePos = getLocalPointerPos(ev, rect);
            this.cacheMousePos = {
                ...this.mousePos
            };
            requestAnimationFrame(()=>this.render());
            container.removeEventListener('mousemove', initRender);
            container.removeEventListener('touchmove', initRender);
        };
        container.addEventListener('mousemove', initRender);
        container.addEventListener('touchmove', initRender);
    }
    render() {
        const distance = getMouseDistance(this.mousePos, this.lastMousePos);
        this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.1);
        this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.1);
        if (distance > this.threshold) {
            this.showNextImage();
            this.lastMousePos = {
                ...this.mousePos
            };
        }
        if (this.isIdle && this.zIndexVal !== 1) {
            this.zIndexVal = 1;
        }
        requestAnimationFrame(()=>this.render());
    }
    showNextImage() {
        const rect = this.container.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const relX = this.mousePos.x - centerX;
        const relY = this.mousePos.y - centerY;
        this.rotation.x = -(relY / centerY) * 30;
        this.rotation.y = relX / centerX * 30;
        this.cachedRotation = {
            ...this.rotation
        };
        const distanceFromCenter = Math.sqrt(relX * relX + relY * relY);
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const proportion = distanceFromCenter / maxDistance;
        this.zValue = proportion * 1200 - 600;
        this.cachedZValue = this.zValue;
        const normalizedZ = (this.zValue + 600) / 1200;
        const brightness = 0.2 + normalizedZ * 2.3;
        ++this.zIndexVal;
        this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
        const img = this.images[this.imgPosition];
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].killTweensOf(img.DOM.el);
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline({
            onStart: ()=>this.onImageActivated(),
            onComplete: ()=>this.onImageDeactivated()
        }).set(this.DOM.el, {
            perspective: 1000
        }, 0).fromTo(img.DOM.el, {
            opacity: 1,
            z: 0,
            scale: 1 + this.cachedZValue / 1000,
            zIndex: this.zIndexVal,
            x: this.cacheMousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.cacheMousePos.y - (img.rect?.height ?? 0) / 2,
            rotationX: this.cachedRotation.x,
            rotationY: this.cachedRotation.y,
            filter: `brightness(${brightness})`
        }, {
            duration: 1,
            ease: 'expo',
            scale: 1 + this.zValue / 1000,
            x: this.mousePos.x - (img.rect?.width ?? 0) / 2,
            y: this.mousePos.y - (img.rect?.height ?? 0) / 2,
            rotationX: this.rotation.x,
            rotationY: this.rotation.y
        }, 0).to(img.DOM.el, {
            duration: 0.4,
            ease: 'power2',
            opacity: 0,
            z: -800
        }, 0.3);
    }
    onImageActivated() {
        this.activeImagesCount++;
        this.isIdle = false;
    }
    onImageDeactivated() {
        this.activeImagesCount--;
        if (this.activeImagesCount === 0) {
            this.isIdle = true;
        }
    }
}
const variantMap = {
    1: ImageTrailVariant1,
    2: ImageTrailVariant2,
    3: ImageTrailVariant3,
    4: ImageTrailVariant4,
    5: ImageTrailVariant5,
    6: ImageTrailVariant6,
    7: ImageTrailVariant7,
    8: ImageTrailVariant8
};
function ImageTrail({ items = [], variant = 1 }) {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ImageTrail.useEffect": ()=>{
            if (!containerRef.current) return;
            const Cls = variantMap[variant] || variantMap[1];
            const instance = new Cls(containerRef.current);
            return ({
                "ImageTrail.useEffect": ()=>{
                    if ('destroy' in instance && typeof instance.destroy === 'function') {
                        instance.destroy();
                    }
                }
            })["ImageTrail.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["ImageTrail.useEffect"], [
        variant,
        items
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full relative z-0 rounded-lg bg-transparent overflow-visible pointer-events-auto",
        ref: containerRef,
        children: items.map((url, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "content__img w-[190px] aspect-[1.1] rounded-[15px] absolute top-0 left-0 opacity-0 overflow-hidden [will-change:transform,filter]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "content__img-inner bg-center bg-cover w-[calc(100%+20px)] h-[calc(100%+20px)] absolute top-[-10px] left-[-10px]",
                    style: {
                        backgroundImage: `url(${url})`
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/ImageTrail.tsx",
                    lineNumber: 1223,
                    columnNumber: 11
                }, this)
            }, i, false, {
                fileName: "[project]/src/components/ImageTrail.tsx",
                lineNumber: 1219,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/ImageTrail.tsx",
        lineNumber: 1217,
        columnNumber: 5
    }, this);
}
_s(ImageTrail, "8puyVO4ts1RhCfXUmci3vLI3Njw=");
_c = ImageTrail;
var _c;
__turbopack_context__.k.register(_c, "ImageTrail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/layout/SocialCorner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SocialCorner",
    ()=>SocialCorner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$portfolio$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/portfolio.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
;
const SocialCorner = ({ className, delay = 0.5 })=>{
    return null; // Component disabled per user request
    //TURBOPACK unreachable
    ;
    const linkedinLink = undefined;
    const instagramLink = undefined;
    const githubLink = undefined;
};
_c = SocialCorner;
var _c;
__turbopack_context__.k.register(_c, "SocialCorner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);})()

//# sourceMappingURL=src_components_1dfr7el48m8vn._.js.map