(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-courses-page-courses-page-module"],{

/***/ "0MNC":
/*!*******************************************************************!*\
  !*** ./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/layout.js ***!
  \*******************************************************************/
/*! exports provided: BreakpointObserver, Breakpoints, LayoutModule, MediaMatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreakpointObserver", function() { return BreakpointObserver; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Breakpoints", function() { return Breakpoints; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModule", function() { return LayoutModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MediaMatcher", function() { return MediaMatcher; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ "8LU1");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ "nLfN");






/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


class LayoutModule {
}
LayoutModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: LayoutModule });
LayoutModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function LayoutModule_Factory(t) { return new (t || LayoutModule)(); } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](LayoutModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{}]
    }], null, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Global registry for all dynamically-created, injected media queries. */
const mediaQueriesForWebkitCompatibility = new Set();
/** Style tag that holds all of the dynamically-created media queries. */
let mediaQueryStyleNode;
/** A utility for calling matchMedia queries. */
class MediaMatcher {
    constructor(_platform) {
        this._platform = _platform;
        this._matchMedia = this._platform.isBrowser && window.matchMedia ?
            // matchMedia is bound to the window scope intentionally as it is an illegal invocation to
            // call it from a different scope.
            window.matchMedia.bind(window) :
            noopMatchMedia;
    }
    /**
     * Evaluates the given media query and returns the native MediaQueryList from which results
     * can be retrieved.
     * Confirms the layout engine will trigger for the selector query provided and returns the
     * MediaQueryList for the query provided.
     */
    matchMedia(query) {
        if (this._platform.WEBKIT) {
            createEmptyStyleRule(query);
        }
        return this._matchMedia(query);
    }
}
MediaMatcher.ɵfac = function MediaMatcher_Factory(t) { return new (t || MediaMatcher)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"])); };
MediaMatcher.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ factory: function MediaMatcher_Factory() { return new MediaMatcher(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"])); }, token: MediaMatcher, providedIn: "root" });
MediaMatcher.ctorParameters = () => [
    { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"] }
];
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MediaMatcher, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"] }]; }, null); })();
/**
 * For Webkit engines that only trigger the MediaQueryListListener when
 * there is at least one CSS selector for the respective media query.
 */
function createEmptyStyleRule(query) {
    if (mediaQueriesForWebkitCompatibility.has(query)) {
        return;
    }
    try {
        if (!mediaQueryStyleNode) {
            mediaQueryStyleNode = document.createElement('style');
            mediaQueryStyleNode.setAttribute('type', 'text/css');
            document.head.appendChild(mediaQueryStyleNode);
        }
        if (mediaQueryStyleNode.sheet) {
            mediaQueryStyleNode.sheet
                .insertRule(`@media ${query} {.fx-query-test{ }}`, 0);
            mediaQueriesForWebkitCompatibility.add(query);
        }
    }
    catch (e) {
        console.error(e);
    }
}
/** No-op matchMedia replacement for non-browser platforms. */
function noopMatchMedia(query) {
    // Use `as any` here to avoid adding additional necessary properties for
    // the noop matcher.
    return {
        matches: query === 'all' || query === '',
        media: query,
        addListener: () => { },
        removeListener: () => { }
    };
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Utility for checking the matching state of @media queries. */
class BreakpointObserver {
    constructor(_mediaMatcher, _zone) {
        this._mediaMatcher = _mediaMatcher;
        this._zone = _zone;
        /**  A map of all media queries currently being listened for. */
        this._queries = new Map();
        /** A subject for all other observables to takeUntil based on. */
        this._destroySubject = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
    }
    /** Completes the active subject, signalling to all other observables to complete. */
    ngOnDestroy() {
        this._destroySubject.next();
        this._destroySubject.complete();
    }
    /**
     * Whether one or more media queries match the current viewport size.
     * @param value One or more media queries to check.
     * @returns Whether any of the media queries match.
     */
    isMatched(value) {
        const queries = splitQueries(Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceArray"])(value));
        return queries.some(mediaQuery => this._registerQuery(mediaQuery).mql.matches);
    }
    /**
     * Gets an observable of results for the given queries that will emit new results for any changes
     * in matching of the given queries.
     * @param value One or more media queries to check.
     * @returns A stream of matches for the given queries.
     */
    observe(value) {
        const queries = splitQueries(Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceArray"])(value));
        const observables = queries.map(query => this._registerQuery(query).observable);
        let stateObservable = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["combineLatest"])(observables);
        // Emit the first state immediately, and then debounce the subsequent emissions.
        stateObservable = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["concat"])(stateObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)), stateObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["skip"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["debounceTime"])(0)));
        return stateObservable.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(breakpointStates => {
            const response = {
                matches: false,
                breakpoints: {},
            };
            breakpointStates.forEach(({ matches, query }) => {
                response.matches = response.matches || matches;
                response.breakpoints[query] = matches;
            });
            return response;
        }));
    }
    /** Registers a specific query to be listened for. */
    _registerQuery(query) {
        // Only set up a new MediaQueryList if it is not already being listened for.
        if (this._queries.has(query)) {
            return this._queries.get(query);
        }
        const mql = this._mediaMatcher.matchMedia(query);
        // Create callback for match changes and add it is as a listener.
        const queryObservable = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"]((observer) => {
            // Listener callback methods are wrapped to be placed back in ngZone. Callbacks must be placed
            // back into the zone because matchMedia is only included in Zone.js by loading the
            // webapis-media-query.js file alongside the zone.js file.  Additionally, some browsers do not
            // have MediaQueryList inherit from EventTarget, which causes inconsistencies in how Zone.js
            // patches it.
            const handler = (e) => this._zone.run(() => observer.next(e));
            mql.addListener(handler);
            return () => {
                mql.removeListener(handler);
            };
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["startWith"])(mql), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(({ matches }) => ({ query, matches })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(this._destroySubject));
        // Add the MediaQueryList to the set of queries.
        const output = { observable: queryObservable, mql };
        this._queries.set(query, output);
        return output;
    }
}
BreakpointObserver.ɵfac = function BreakpointObserver_Factory(t) { return new (t || BreakpointObserver)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](MediaMatcher), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"])); };
BreakpointObserver.ɵprov = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"])({ factory: function BreakpointObserver_Factory() { return new BreakpointObserver(Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(MediaMatcher), Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"])(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"])); }, token: BreakpointObserver, providedIn: "root" });
BreakpointObserver.ctorParameters = () => [
    { type: MediaMatcher },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }
];
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](BreakpointObserver, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{ providedIn: 'root' }]
    }], function () { return [{ type: MediaMatcher }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }]; }, null); })();
/**
 * Split each query string into separate query strings if two queries are provided as comma
 * separated.
 */
function splitQueries(queries) {
    return queries.map(query => query.split(','))
        .reduce((a1, a2) => a1.concat(a2))
        .map(query => query.trim());
}

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// PascalCase is being used as Breakpoints is used like an enum.
// tslint:disable-next-line:variable-name
const Breakpoints = {
    XSmall: '(max-width: 599.99px)',
    Small: '(min-width: 600px) and (max-width: 959.99px)',
    Medium: '(min-width: 960px) and (max-width: 1279.99px)',
    Large: '(min-width: 1280px) and (max-width: 1919.99px)',
    XLarge: '(min-width: 1920px)',
    Handset: '(max-width: 599.99px) and (orientation: portrait), ' +
        '(max-width: 959.99px) and (orientation: landscape)',
    Tablet: '(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait), ' +
        '(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)',
    Web: '(min-width: 840px) and (orientation: portrait), ' +
        '(min-width: 1280px) and (orientation: landscape)',
    HandsetPortrait: '(max-width: 599.99px) and (orientation: portrait)',
    TabletPortrait: '(min-width: 600px) and (max-width: 839.99px) and (orientation: portrait)',
    WebPortrait: '(min-width: 840px) and (orientation: portrait)',
    HandsetLandscape: '(max-width: 959.99px) and (orientation: landscape)',
    TabletLandscape: '(min-width: 960px) and (max-width: 1279.99px) and (orientation: landscape)',
    WebLandscape: '(min-width: 1280px) and (orientation: landscape)',
};

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=layout.js.map

/***/ }),

/***/ "DtC1":
/*!**************************************************************************************************!*\
  !*** ./src/app/pages/courses-page/components/dialogs/details-course/details-course.component.ts ***!
  \**************************************************************************************************/
/*! exports provided: DetailsCourseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailsCourseComponent", function() { return DetailsCourseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _video_player_video_player_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../video-player/video-player.component */ "jI73");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");








class DetailsCourseComponent {
    constructor() { }
    ngOnInit() {
    }
}
DetailsCourseComponent.ɵfac = function DetailsCourseComponent_Factory(t) { return new (t || DetailsCourseComponent)(); };
DetailsCourseComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DetailsCourseComponent, selectors: [["app-details-course"]], decls: 28, vars: 0, consts: [["mat-dialog-title", ""], [1, "mat-typography"], [1, "container-detail-course"], [1, "flex-row"], [1, "details-holder"], [1, "example-form"], ["appearance", "fill", 1, "w-100"], ["matInput", "", "value", "mohammad dargoei", "readonly", ""], ["matInput", "", "value", "Plastic surgery", "readonly", ""], ["matInput", "", "value", "12:47:09", "readonly", ""], [1, "detail-text"], [1, "player-holder"], ["Src", "../../../../../assets/videos/1.mp4"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""]], template: function DetailsCourseComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Course A");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-dialog-content", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "form", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-form-field", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Uploader");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-form-field", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Category");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "mat-form-field", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Length");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "p", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "b");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Description:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, " Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](24, "app-video-player", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "mat-dialog-actions", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_3__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_4__["MatInput"], _video_player_video_player_component__WEBPACK_IMPORTED_MODULE_5__["VideoPlayerComponent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"]], styles: [".container-detail-course[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px;\n}\n\n.details-holder[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 100%;\n  box-sizing: border-box;\n  padding: 10px;\n  margin-right: 10px;\n  overflow-y: auto;\n}\n\n.player-holder[_ngcontent-%COMP%] {\n  width: calc(100% - 310px);\n  height: 400px;\n  padding: 10px;\n  box-sizing: border-box;\n  background-color: #eee;\n  border-radius: 5px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  -o-border-radius: 5px;\n}\n\n.detail-text[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin-bottom: 10px;\n  line-height: 2;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvY291cnNlcy1wYWdlL2NvbXBvbmVudHMvZGlhbG9ncy9kZXRhaWxzLWNvdXJzZS9kZXRhaWxzLWNvdXJzZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUVFLFdBQUE7RUFDQSxhQUFBO0FBQUY7O0FBRUE7RUFDRSxZQUFBO0VBQ0EsWUFBQTtFQUNBLHNCQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLHlCQUFBO0VBQ0EsYUFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSwwQkFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtBQUNGOztBQUVBO0VBQ0UsZUFBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtBQUNGIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvY291cnNlcy1wYWdlL2NvbXBvbmVudHMvZGlhbG9ncy9kZXRhaWxzLWNvdXJzZS9kZXRhaWxzLWNvdXJzZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250YWluZXItZGV0YWlsLWNvdXJzZXtcblxuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogMTBweDtcbn1cbi5kZXRhaWxzLWhvbGRlcntcbiAgd2lkdGg6IDMwMHB4O1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAgb3ZlcmZsb3cteTogYXV0bztcblxufVxuLnBsYXllci1ob2xkZXJ7XG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAzMTBweCk7XG4gIGhlaWdodDogNDAwcHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xuICAtbXMtYm9yZGVyLXJhZGl1czogNXB4O1xuICAtby1ib3JkZXItcmFkaXVzOiA1cHg7XG59XG5cbi5kZXRhaWwtdGV4dHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBsaW5lLWhlaWdodDogMjtcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DetailsCourseComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-details-course',
                templateUrl: './details-course.component.html',
                styleUrls: ['./details-course.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "FJQz":
/*!****************************************************************************!*\
  !*** ./src/app/pages/courses-page/components/courses/courses.component.ts ***!
  \****************************************************************************/
/*! exports provided: CoursesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoursesComponent", function() { return CoursesComponent; });
/* harmony import */ var _dialogs_details_course_details_course_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../dialogs/details-course/details-course.component */ "DtC1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var src_app_service_message_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/service/message.service */ "bB31");
/* harmony import */ var _courses_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../courses.service */ "bWHu");
/* harmony import */ var src_app_pages_shopping_shopping_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/pages/shopping/shopping.service */ "73xB");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _video_player_video_player_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../video-player/video-player.component */ "jI73");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "bTqV");














function CoursesComponent_mat_option_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const category_r17 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", category_r17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](category_r17);
} }
function CoursesComponent_th_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Video ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CoursesComponent_td_19_app_video_player_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "app-video-player", 30);
} if (rf & 2) {
    const element_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("Src", element_r18.video)("poster", element_r18.poster);
} }
function CoursesComponent_td_19_img_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 31);
} if (rf & 2) {
    const element_r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", element_r18.poster, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
} }
function CoursesComponent_td_19_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, CoursesComponent_td_19_app_video_player_1_Template, 1, 2, "app-video-player", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, CoursesComponent_td_19_img_2_Template, 1, 1, "img", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r18 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", element_r18 == null ? null : element_r18.video);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !(element_r18 == null ? null : element_r18.video));
} }
function CoursesComponent_th_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CoursesComponent_td_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r23 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", element_r23.name, " ");
} }
function CoursesComponent_th_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Category ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CoursesComponent_td_25_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r24 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", element_r24.category, " ");
} }
function CoursesComponent_th_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Uploader ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CoursesComponent_td_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r25 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", element_r25.uploader, " ");
} }
function CoursesComponent_th_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Length ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CoursesComponent_td_31_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r26 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", element_r26.length, " ");
} }
function CoursesComponent_th_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Price ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CoursesComponent_td_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r27 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind4"](2, 1, element_r27.price, "", "", "2.0"), " (USD) ");
} }
function CoursesComponent_th_36_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "th", 32);
} }
function CoursesComponent_td_37_Template(rf, ctx) { if (rf & 1) {
    const _r30 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CoursesComponent_td_37_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r30); const element_r28 = ctx.$implicit; const ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r29.addToBasket(element_r28); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Add to Cart ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function CoursesComponent_tr_38_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 35);
} }
function CoursesComponent_tr_39_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 36);
} }
class CoursesComponent {
    constructor(dialog, message, services, shoppingService) {
        this.dialog = dialog;
        this.message = message;
        this.services = services;
        this.shoppingService = shoppingService;
        this.displayedColumns = [
            'video',
            'name',
            'category',
            'uploader',
            'length',
            'price',
            'add',
        ];
        this.query = '';
    }
    ngOnInit() {
        this.categories();
        this.courses();
        this.shoppingService.listBasket().subscribe((res) => {
            var _a;
            let data = res === null || res === void 0 ? void 0 : res.basket;
            this.message.basketList = (_a = res === null || res === void 0 ? void 0 : res.basket) !== null && _a !== void 0 ? _a : [];
            this.message.basket.next(res === null || res === void 0 ? void 0 : res.basket);
        });
    }
    categories() {
        this.services.categories().subscribe((res) => {
            this.listCategory = res.categories;
        });
    }
    courses(query, category) {
        this.services
            .getCourses(undefined, query ? query : undefined, category ? category : undefined)
            .subscribe((res) => {
            var _a, _b;
            console.log(res);
            let data = res.courses;
            this.listCourses = [];
            for (const course of data) {
                this.listCourses.push({
                    id: course === null || course === void 0 ? void 0 : course._id,
                    name: course === null || course === void 0 ? void 0 : course.name,
                    category: course === null || course === void 0 ? void 0 : course.category,
                    description: course === null || course === void 0 ? void 0 : course.description,
                    price: course === null || course === void 0 ? void 0 : course.price,
                    length: new Date((course === null || course === void 0 ? void 0 : course.length) * 1000).toISOString().substr(14, 5),
                    status: this.convertStatus(course === null || course === void 0 ? void 0 : course.status),
                    poster: course === null || course === void 0 ? void 0 : course.thumbnail,
                    uploader: ((_a = course === null || course === void 0 ? void 0 : course.owner) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = course === null || course === void 0 ? void 0 : course.owner) === null || _b === void 0 ? void 0 : _b.lastName),
                    video: (course === null || course === void 0 ? void 0 : course.file) ? `${window.origin}/${course === null || course === void 0 ? void 0 : course.file}` : '',
                });
            }
        });
    }
    changeCatrgory(e) {
        this.courses(this.query, e.value);
    }
    ngOnDestroy() { }
    openDialog() {
        const dialogRef = this.dialog.open(_dialogs_details_course_details_course_component__WEBPACK_IMPORTED_MODULE_0__["DetailsCourseComponent"], {
            width: '900px',
            data: {},
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }
    addToBasket(data) {
        this.services.changeBasket('add', data === null || data === void 0 ? void 0 : data.id).subscribe((res) => {
            this.message.basketList.push({
                id: data === null || data === void 0 ? void 0 : data.id,
                thumbnail: data === null || data === void 0 ? void 0 : data.poster,
                name: data.name,
                price: data.price,
            });
            this.message.basket.next(this.message.basketList);
        });
    }
    convertStatus(status) {
        let st;
        switch (status) {
            case 'pending':
                st = 1;
                break;
            case 'approved':
                st = 2;
                break;
            case 'rejected':
                st = 3;
                break;
            default:
                break;
                return st;
        }
    }
}
CoursesComponent.ɵfac = function CoursesComponent_Factory(t) { return new (t || CoursesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_service_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_courses_service__WEBPACK_IMPORTED_MODULE_4__["CoursesService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_pages_shopping_shopping_service__WEBPACK_IMPORTED_MODULE_5__["ShoppingService"])); };
CoursesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: CoursesComponent, selectors: [["app-courses"]], decls: 40, vars: 4, consts: [[1, "holder-content"], [1, "component-container"], [1, "holder-name-section"], [1, "name-section"], [1, "holder-content-component"], [1, "flex-row", "category-holder"], [1, "select-holder"], [3, "selectionChange"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], [1, "courese-holder"], ["mat-table", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "video"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["style", "width: 300px; padding-top: 10px;", "mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["class", "txt-center", "mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "category"], ["matColumnDef", "uploader"], ["matColumnDef", "length"], ["matColumnDef", "price"], ["matColumnDef", "add"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [3, "value"], ["mat-header-cell", ""], ["mat-cell", "", 2, "width", "300px", "padding-top", "10px"], [3, "Src", "poster", 4, "ngIf"], ["style", "width: 300px; height: auto", "alt", "", 3, "src", 4, "ngIf"], [3, "Src", "poster"], ["alt", "", 2, "width", "300px", "height", "auto", 3, "src"], ["mat-header-cell", "", 1, "txt-center"], ["mat-cell", ""], ["mat-button", "", "color", "primary", 2, "color", "#00D175", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]], template: function CoursesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Coruses");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Categories");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-select", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectionChange", function CoursesComponent_Template_mat_select_selectionChange_11_listener($event) { return ctx.changeCatrgory($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-option", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "All");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, CoursesComponent_mat_option_14_Template, 2, 2, "mat-option", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "table", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](17, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](18, CoursesComponent_th_18_Template, 2, 0, "th", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](19, CoursesComponent_td_19_Template, 3, 2, "td", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](20, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, CoursesComponent_th_21_Template, 2, 0, "th", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, CoursesComponent_td_22_Template, 2, 1, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](23, 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, CoursesComponent_th_24_Template, 2, 0, "th", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](25, CoursesComponent_td_25_Template, 2, 1, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](26, 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](27, CoursesComponent_th_27_Template, 2, 0, "th", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](28, CoursesComponent_td_28_Template, 2, 1, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](29, 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](30, CoursesComponent_th_30_Template, 2, 0, "th", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](31, CoursesComponent_td_31_Template, 2, 1, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](32, 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](33, CoursesComponent_th_33_Template, 2, 0, "th", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](34, CoursesComponent_td_34_Template, 3, 6, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](35, 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](36, CoursesComponent_th_36_Template, 1, 0, "th", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](37, CoursesComponent_td_37_Template, 3, 0, "td", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](38, CoursesComponent_tr_38_Template, 1, 0, "tr", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](39, CoursesComponent_tr_39_Template, 1, 0, "tr", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.listCategory);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("dataSource", ctx.listCourses);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
    } }, directives: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatLabel"], _angular_material_select__WEBPACK_IMPORTED_MODULE_7__["MatSelect"], _angular_material_core__WEBPACK_IMPORTED_MODULE_8__["MatOption"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgForOf"], _angular_material_table__WEBPACK_IMPORTED_MODULE_10__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_10__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_10__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_10__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_10__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_10__["MatRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_10__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_10__["MatCell"], _angular_common__WEBPACK_IMPORTED_MODULE_9__["NgIf"], _video_player_video_player_component__WEBPACK_IMPORTED_MODULE_11__["VideoPlayerComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButton"], _angular_material_table__WEBPACK_IMPORTED_MODULE_10__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_10__["MatRow"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_9__["CurrencyPipe"]], styles: ["@charset \"UTF-8\";\n.vjs-modal-dialog[_ngcontent-%COMP%]   .vjs-modal-dialog-content[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-modal-dialog[_ngcontent-%COMP%], .vjs-button[_ngcontent-%COMP%]    > .vjs-icon-placeholder[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-big-play-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.vjs-button[_ngcontent-%COMP%]    > .vjs-icon-placeholder[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-big-play-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  text-align: center;\n}\n@font-face {\n  font-family: VideoJS;\n  src: url(data:application/font-woff;charset=utf-8;base64,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) format(\"woff\");\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-play[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-play-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-big-play-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-play[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-play-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-big-play-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f101\";\n}\n.vjs-icon-play-circle[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-play-circle[_ngcontent-%COMP%]:before {\n  content: \"\\f102\";\n}\n.vjs-icon-pause[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-play-control.vjs-playing[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-pause[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-play-control.vjs-playing[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f103\";\n}\n.vjs-icon-volume-mute[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-mute-control.vjs-vol-0[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-volume-mute[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-mute-control.vjs-vol-0[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f104\";\n}\n.vjs-icon-volume-low[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-mute-control.vjs-vol-1[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-volume-low[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-mute-control.vjs-vol-1[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f105\";\n}\n.vjs-icon-volume-mid[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-mute-control.vjs-vol-2[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-volume-mid[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-mute-control.vjs-vol-2[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f106\";\n}\n.vjs-icon-volume-high[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-mute-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-volume-high[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-mute-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f107\";\n}\n.vjs-icon-fullscreen-enter[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-fullscreen-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-fullscreen-enter[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-fullscreen-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f108\";\n}\n.vjs-icon-fullscreen-exit[_ngcontent-%COMP%], .video-js.vjs-fullscreen[_ngcontent-%COMP%]   .vjs-fullscreen-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-fullscreen-exit[_ngcontent-%COMP%]:before, .video-js.vjs-fullscreen[_ngcontent-%COMP%]   .vjs-fullscreen-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f109\";\n}\n.vjs-icon-square[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-square[_ngcontent-%COMP%]:before {\n  content: \"\\f10a\";\n}\n.vjs-icon-spinner[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-spinner[_ngcontent-%COMP%]:before {\n  content: \"\\f10b\";\n}\n.vjs-icon-subtitles[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%], .video-js.video-js[_ngcontent-%COMP%]:lang(en-GB)   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%], .video-js.video-js[_ngcontent-%COMP%]:lang(en-IE)   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%], .video-js.video-js[_ngcontent-%COMP%]:lang(en-AU)   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%], .video-js.video-js[_ngcontent-%COMP%]:lang(en-NZ)   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-subtitles-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-subtitles[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before, .video-js.video-js[_ngcontent-%COMP%]:lang(en-GB)   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before, .video-js.video-js[_ngcontent-%COMP%]:lang(en-IE)   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before, .video-js.video-js[_ngcontent-%COMP%]:lang(en-AU)   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before, .video-js.video-js[_ngcontent-%COMP%]:lang(en-NZ)   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-subtitles-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f10c\";\n}\n.vjs-icon-captions[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]:lang(en)   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]:lang(fr-CA)   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-captions-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-captions[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]:lang(en)   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]:lang(fr-CA)   .vjs-subs-caps-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-captions-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f10d\";\n}\n.vjs-icon-chapters[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-chapters-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-chapters[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-chapters-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f10e\";\n}\n.vjs-icon-share[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-share[_ngcontent-%COMP%]:before {\n  content: \"\\f10f\";\n}\n.vjs-icon-cog[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-cog[_ngcontent-%COMP%]:before {\n  content: \"\\f110\";\n}\n.vjs-icon-circle[_ngcontent-%COMP%], .vjs-seek-to-live-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-level[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-play-progress[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-circle[_ngcontent-%COMP%]:before, .vjs-seek-to-live-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-volume-level[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-play-progress[_ngcontent-%COMP%]:before {\n  content: \"\\f111\";\n}\n.vjs-icon-circle-outline[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-circle-outline[_ngcontent-%COMP%]:before {\n  content: \"\\f112\";\n}\n.vjs-icon-circle-inner-circle[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-circle-inner-circle[_ngcontent-%COMP%]:before {\n  content: \"\\f113\";\n}\n.vjs-icon-hd[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-hd[_ngcontent-%COMP%]:before {\n  content: \"\\f114\";\n}\n.vjs-icon-cancel[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-control.vjs-close-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-cancel[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-control.vjs-close-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f115\";\n}\n.vjs-icon-replay[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-play-control.vjs-ended[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-replay[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-play-control.vjs-ended[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f116\";\n}\n.vjs-icon-facebook[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-facebook[_ngcontent-%COMP%]:before {\n  content: \"\\f117\";\n}\n.vjs-icon-gplus[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-gplus[_ngcontent-%COMP%]:before {\n  content: \"\\f118\";\n}\n.vjs-icon-linkedin[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-linkedin[_ngcontent-%COMP%]:before {\n  content: \"\\f119\";\n}\n.vjs-icon-twitter[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-twitter[_ngcontent-%COMP%]:before {\n  content: \"\\f11a\";\n}\n.vjs-icon-tumblr[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-tumblr[_ngcontent-%COMP%]:before {\n  content: \"\\f11b\";\n}\n.vjs-icon-pinterest[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-pinterest[_ngcontent-%COMP%]:before {\n  content: \"\\f11c\";\n}\n.vjs-icon-audio-description[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-descriptions-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-audio-description[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-descriptions-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f11d\";\n}\n.vjs-icon-audio[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-audio-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-audio[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-audio-button[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f11e\";\n}\n.vjs-icon-next-item[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-next-item[_ngcontent-%COMP%]:before {\n  content: \"\\f11f\";\n}\n.vjs-icon-previous-item[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-previous-item[_ngcontent-%COMP%]:before {\n  content: \"\\f120\";\n}\n.vjs-icon-picture-in-picture-enter[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-picture-in-picture-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-picture-in-picture-enter[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   .vjs-picture-in-picture-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f121\";\n}\n.vjs-icon-picture-in-picture-exit[_ngcontent-%COMP%], .video-js.vjs-picture-in-picture[_ngcontent-%COMP%]   .vjs-picture-in-picture-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  font-family: VideoJS;\n  font-weight: normal;\n  font-style: normal;\n}\n.vjs-icon-picture-in-picture-exit[_ngcontent-%COMP%]:before, .video-js.vjs-picture-in-picture[_ngcontent-%COMP%]   .vjs-picture-in-picture-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  content: \"\\f122\";\n}\n.video-js[_ngcontent-%COMP%] {\n  display: block;\n  vertical-align: top;\n  box-sizing: border-box;\n  color: #fff;\n  background-color: #000;\n  position: relative;\n  padding: 0;\n  font-size: 10px;\n  line-height: 1;\n  font-weight: normal;\n  font-style: normal;\n  font-family: Arial, Helvetica, sans-serif;\n  word-break: initial;\n}\n.video-js[_ngcontent-%COMP%]:-moz-full-screen {\n  position: absolute;\n}\n.video-js[_ngcontent-%COMP%]:-webkit-full-screen {\n  width: 100% !important;\n  height: 100% !important;\n}\n.video-js[tabindex=\"-1\"][_ngcontent-%COMP%] {\n  outline: none;\n}\n.video-js[_ngcontent-%COMP%]   *[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]:before, .video-js[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]:after {\n  box-sizing: inherit;\n}\n.video-js[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n  list-style-position: outside;\n  margin-left: 0;\n  margin-right: 0;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.video-js.vjs-fluid[_ngcontent-%COMP%], .video-js.vjs-16-9[_ngcontent-%COMP%], .video-js.vjs-4-3[_ngcontent-%COMP%], .video-js.vjs-9-16[_ngcontent-%COMP%], .video-js.vjs-1-1[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 100%;\n  height: 0;\n}\n.video-js.vjs-16-9[_ngcontent-%COMP%] {\n  padding-top: 56.25%;\n}\n.video-js.vjs-4-3[_ngcontent-%COMP%] {\n  padding-top: 75%;\n}\n.video-js.vjs-9-16[_ngcontent-%COMP%] {\n  padding-top: 177.7777777778%;\n}\n.video-js.vjs-1-1[_ngcontent-%COMP%] {\n  padding-top: 100%;\n}\n.video-js.vjs-fill[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-tech[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\nbody.vjs-full-window[_ngcontent-%COMP%] {\n  padding: 0;\n  margin: 0;\n  height: 100%;\n}\n.vjs-full-window[_ngcontent-%COMP%]   .video-js.vjs-fullscreen[_ngcontent-%COMP%] {\n  position: fixed;\n  overflow: hidden;\n  z-index: 1000;\n  left: 0;\n  top: 0;\n  bottom: 0;\n  right: 0;\n}\n.video-js.vjs-fullscreen[_ngcontent-%COMP%]:not(.vjs-ios-native-fs) {\n  width: 100% !important;\n  height: 100% !important;\n  padding-top: 0 !important;\n}\n.video-js.vjs-fullscreen.vjs-user-inactive[_ngcontent-%COMP%] {\n  cursor: none;\n}\n.vjs-hidden[_ngcontent-%COMP%] {\n  display: none !important;\n}\n.vjs-disabled[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: default;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-offscreen[_ngcontent-%COMP%] {\n  height: 1px;\n  left: -9999px;\n  position: absolute;\n  top: 0;\n  width: 1px;\n}\n.vjs-lock-showing[_ngcontent-%COMP%] {\n  display: block !important;\n  opacity: 1 !important;\n  visibility: visible !important;\n}\n.vjs-no-js[_ngcontent-%COMP%] {\n  padding: 20px;\n  color: #fff;\n  background-color: #000;\n  font-size: 18px;\n  font-family: Arial, Helvetica, sans-serif;\n  text-align: center;\n  width: 300px;\n  height: 150px;\n  margin: 0px auto;\n}\n.vjs-no-js[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], .vjs-no-js[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:visited {\n  color: #66A8CC;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-big-play-button[_ngcontent-%COMP%] {\n  font-size: 3em;\n  line-height: 1.5em;\n  height: 1.63332em;\n  width: 3em;\n  display: block;\n  position: absolute;\n  top: 10px;\n  left: 10px;\n  padding: 0;\n  cursor: pointer;\n  opacity: 1;\n  border: 0.06666em solid #fff;\n  background-color: #2B333F;\n  background-color: rgba(43, 51, 63, 0.7);\n  border-radius: 0.3em;\n  transition: all 0.4s;\n}\n.vjs-big-play-centered[_ngcontent-%COMP%]   .vjs-big-play-button[_ngcontent-%COMP%] {\n  top: 50%;\n  left: 50%;\n  margin-top: -0.81666em;\n  margin-left: -1.5em;\n}\n.video-js[_ngcontent-%COMP%]:hover   .vjs-big-play-button[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-big-play-button[_ngcontent-%COMP%]:focus {\n  border-color: #fff;\n  background-color: #73859f;\n  background-color: rgba(115, 133, 159, 0.5);\n  transition: all 0s;\n}\n.vjs-controls-disabled[_ngcontent-%COMP%]   .vjs-big-play-button[_ngcontent-%COMP%], .vjs-has-started[_ngcontent-%COMP%]   .vjs-big-play-button[_ngcontent-%COMP%], .vjs-using-native-controls[_ngcontent-%COMP%]   .vjs-big-play-button[_ngcontent-%COMP%], .vjs-error[_ngcontent-%COMP%]   .vjs-big-play-button[_ngcontent-%COMP%] {\n  display: none;\n}\n.vjs-has-started.vjs-paused.vjs-show-big-play-button-on-pause[_ngcontent-%COMP%]   .vjs-big-play-button[_ngcontent-%COMP%] {\n  display: block;\n}\n.video-js[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: none;\n  border: none;\n  color: inherit;\n  display: inline-block;\n  font-size: inherit;\n  line-height: inherit;\n  text-transform: none;\n  text-decoration: none;\n  transition: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n}\n.vjs-control[_ngcontent-%COMP%]   .vjs-button[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-control.vjs-close-button[_ngcontent-%COMP%] {\n  cursor: pointer;\n  height: 3em;\n  position: absolute;\n  right: 0;\n  top: 0.5em;\n  z-index: 2;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-modal-dialog[_ngcontent-%COMP%] {\n  background: rgba(0, 0, 0, 0.8);\n  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8), rgba(255, 255, 255, 0));\n  overflow: auto;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-modal-dialog[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.vjs-modal-dialog[_ngcontent-%COMP%]   .vjs-modal-dialog-content[_ngcontent-%COMP%] {\n  font-size: 1.2em;\n  line-height: 1.5;\n  padding: 20px 24px;\n  z-index: 1;\n}\n.vjs-menu-button[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.vjs-menu-button.vjs-disabled[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.vjs-workinghover[_ngcontent-%COMP%]   .vjs-menu-button.vjs-disabled[_ngcontent-%COMP%]:hover   .vjs-menu[_ngcontent-%COMP%] {\n  display: none;\n}\n.vjs-menu[_ngcontent-%COMP%]   .vjs-menu-content[_ngcontent-%COMP%] {\n  display: block;\n  padding: 0;\n  margin: 0;\n  font-family: Arial, Helvetica, sans-serif;\n  overflow: auto;\n}\n.vjs-menu[_ngcontent-%COMP%]   .vjs-menu-content[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.vjs-scrubbing[_ngcontent-%COMP%]   .vjs-control.vjs-menu-button[_ngcontent-%COMP%]:hover   .vjs-menu[_ngcontent-%COMP%] {\n  display: none;\n}\n.vjs-menu[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0.2em 0;\n  line-height: 1.4em;\n  font-size: 1.2em;\n  text-align: center;\n  text-transform: lowercase;\n}\n.vjs-menu[_ngcontent-%COMP%]   li.vjs-menu-item[_ngcontent-%COMP%]:focus, .vjs-menu[_ngcontent-%COMP%]   li.vjs-menu-item[_ngcontent-%COMP%]:hover, .js-focus-visible[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%]   li.vjs-menu-item[_ngcontent-%COMP%]:hover {\n  background-color: #73859f;\n  background-color: rgba(115, 133, 159, 0.5);\n}\n.vjs-menu[_ngcontent-%COMP%]   li.vjs-selected[_ngcontent-%COMP%], .vjs-menu[_ngcontent-%COMP%]   li.vjs-selected[_ngcontent-%COMP%]:focus, .vjs-menu[_ngcontent-%COMP%]   li.vjs-selected[_ngcontent-%COMP%]:hover, .js-focus-visible[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%]   li.vjs-selected[_ngcontent-%COMP%]:hover {\n  background-color: #fff;\n  color: #2B333F;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]:not(.vjs-selected):focus:not(:focus-visible), .js-focus-visible[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]:not(.vjs-selected):focus:not(.focus-visible) {\n  background: none;\n}\n.vjs-menu[_ngcontent-%COMP%]   li.vjs-menu-title[_ngcontent-%COMP%] {\n  text-align: center;\n  text-transform: uppercase;\n  font-size: 1em;\n  line-height: 2em;\n  padding: 0;\n  margin: 0 0 0.3em 0;\n  font-weight: bold;\n  cursor: default;\n}\n.vjs-menu-button-popup[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  bottom: 0;\n  width: 10em;\n  left: -3em;\n  height: 0em;\n  margin-bottom: 1.5em;\n  border-top-color: rgba(43, 51, 63, 0.7);\n}\n.vjs-menu-button-popup[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%]   .vjs-menu-content[_ngcontent-%COMP%] {\n  background-color: #2B333F;\n  background-color: rgba(43, 51, 63, 0.7);\n  position: absolute;\n  width: 100%;\n  bottom: 1.5em;\n  max-height: 15em;\n}\n.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-menu-button-popup[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%]   .vjs-menu-content[_ngcontent-%COMP%], .vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-menu-button-popup[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%]   .vjs-menu-content[_ngcontent-%COMP%] {\n  max-height: 5em;\n}\n.vjs-layout-small[_ngcontent-%COMP%]   .vjs-menu-button-popup[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%]   .vjs-menu-content[_ngcontent-%COMP%] {\n  max-height: 10em;\n}\n.vjs-layout-medium[_ngcontent-%COMP%]   .vjs-menu-button-popup[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%]   .vjs-menu-content[_ngcontent-%COMP%] {\n  max-height: 14em;\n}\n.vjs-layout-large[_ngcontent-%COMP%]   .vjs-menu-button-popup[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%]   .vjs-menu-content[_ngcontent-%COMP%], .vjs-layout-x-large[_ngcontent-%COMP%]   .vjs-menu-button-popup[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%]   .vjs-menu-content[_ngcontent-%COMP%], .vjs-layout-huge[_ngcontent-%COMP%]   .vjs-menu-button-popup[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%]   .vjs-menu-content[_ngcontent-%COMP%] {\n  max-height: 25em;\n}\n.vjs-workinghover[_ngcontent-%COMP%]   .vjs-menu-button-popup.vjs-hover[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%], .vjs-menu-button-popup[_ngcontent-%COMP%]   .vjs-menu.vjs-lock-showing[_ngcontent-%COMP%] {\n  display: block;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-menu-button-inline[_ngcontent-%COMP%] {\n  transition: all 0.4s;\n  overflow: hidden;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-menu-button-inline[_ngcontent-%COMP%]:before {\n  width: 2.222222222em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-menu-button-inline[_ngcontent-%COMP%]:hover, .video-js[_ngcontent-%COMP%]   .vjs-menu-button-inline[_ngcontent-%COMP%]:focus, .video-js[_ngcontent-%COMP%]   .vjs-menu-button-inline.vjs-slider-active[_ngcontent-%COMP%], .video-js.vjs-no-flex[_ngcontent-%COMP%]   .vjs-menu-button-inline[_ngcontent-%COMP%] {\n  width: 12em;\n}\n.vjs-menu-button-inline[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%] {\n  opacity: 0;\n  height: 100%;\n  width: auto;\n  position: absolute;\n  left: 4em;\n  top: 0;\n  padding: 0;\n  margin: 0;\n  transition: all 0.4s;\n}\n.vjs-menu-button-inline[_ngcontent-%COMP%]:hover   .vjs-menu[_ngcontent-%COMP%], .vjs-menu-button-inline[_ngcontent-%COMP%]:focus   .vjs-menu[_ngcontent-%COMP%], .vjs-menu-button-inline.vjs-slider-active[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%] {\n  display: block;\n  opacity: 1;\n}\n.vjs-no-flex[_ngcontent-%COMP%]   .vjs-menu-button-inline[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%] {\n  display: block;\n  opacity: 1;\n  position: relative;\n  width: auto;\n}\n.vjs-no-flex[_ngcontent-%COMP%]   .vjs-menu-button-inline[_ngcontent-%COMP%]:hover   .vjs-menu[_ngcontent-%COMP%], .vjs-no-flex[_ngcontent-%COMP%]   .vjs-menu-button-inline[_ngcontent-%COMP%]:focus   .vjs-menu[_ngcontent-%COMP%], .vjs-no-flex[_ngcontent-%COMP%]   .vjs-menu-button-inline.vjs-slider-active[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%] {\n  width: auto;\n}\n.vjs-menu-button-inline[_ngcontent-%COMP%]   .vjs-menu-content[_ngcontent-%COMP%] {\n  width: auto;\n  height: 100%;\n  margin: 0;\n  overflow: hidden;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-control-bar[_ngcontent-%COMP%] {\n  display: none;\n  width: 100%;\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  height: 3em;\n  background-color: #2B333F;\n  background-color: rgba(43, 51, 63, 0.7);\n}\n.vjs-has-started[_ngcontent-%COMP%]   .vjs-control-bar[_ngcontent-%COMP%] {\n  display: flex;\n  visibility: visible;\n  opacity: 1;\n  transition: visibility 0.1s, opacity 0.1s;\n}\n.vjs-has-started.vjs-user-inactive.vjs-playing[_ngcontent-%COMP%]   .vjs-control-bar[_ngcontent-%COMP%] {\n  visibility: visible;\n  opacity: 0;\n  pointer-events: none;\n  transition: visibility 1s, opacity 1s;\n}\n.vjs-controls-disabled[_ngcontent-%COMP%]   .vjs-control-bar[_ngcontent-%COMP%], .vjs-using-native-controls[_ngcontent-%COMP%]   .vjs-control-bar[_ngcontent-%COMP%], .vjs-error[_ngcontent-%COMP%]   .vjs-control-bar[_ngcontent-%COMP%] {\n  display: none !important;\n}\n.vjs-audio.vjs-has-started.vjs-user-inactive.vjs-playing[_ngcontent-%COMP%]   .vjs-control-bar[_ngcontent-%COMP%] {\n  opacity: 1;\n  visibility: visible;\n}\n.vjs-has-started.vjs-no-flex[_ngcontent-%COMP%]   .vjs-control-bar[_ngcontent-%COMP%] {\n  display: table;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-control[_ngcontent-%COMP%] {\n  position: relative;\n  text-align: center;\n  margin: 0;\n  padding: 0;\n  height: 100%;\n  width: 4em;\n  flex: none;\n}\n.vjs-button[_ngcontent-%COMP%]    > .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  font-size: 1.8em;\n  line-height: 1.67;\n}\n.vjs-button[_ngcontent-%COMP%]    > .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  display: block;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-control[_ngcontent-%COMP%]:focus:before, .video-js[_ngcontent-%COMP%]   .vjs-control[_ngcontent-%COMP%]:hover:before, .video-js[_ngcontent-%COMP%]   .vjs-control[_ngcontent-%COMP%]:focus {\n  text-shadow: 0em 0em 1em white;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-control-text[_ngcontent-%COMP%] {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n}\n.vjs-no-flex[_ngcontent-%COMP%]   .vjs-control[_ngcontent-%COMP%] {\n  display: table-cell;\n  vertical-align: middle;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-custom-control-spacer[_ngcontent-%COMP%] {\n  display: none;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%] {\n  cursor: pointer;\n  flex: auto;\n  display: flex;\n  align-items: center;\n  min-width: 4em;\n  touch-action: none;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-progress-control.disabled[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.vjs-live[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%] {\n  display: none;\n}\n.vjs-liveui[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n}\n.vjs-no-flex[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%] {\n  width: auto;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-progress-holder[_ngcontent-%COMP%] {\n  flex: auto;\n  transition: all 0.2s;\n  height: 0.3em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%]   .vjs-progress-holder[_ngcontent-%COMP%] {\n  margin: 0 10px;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%]:hover   .vjs-progress-holder[_ngcontent-%COMP%] {\n  font-size: 1.6666666667em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%]:hover   .vjs-progress-holder.disabled[_ngcontent-%COMP%] {\n  font-size: 1em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-progress-holder[_ngcontent-%COMP%]   .vjs-play-progress[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-progress-holder[_ngcontent-%COMP%]   .vjs-load-progress[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-progress-holder[_ngcontent-%COMP%]   .vjs-load-progress[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  position: absolute;\n  display: block;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  width: 0;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-play-progress[_ngcontent-%COMP%] {\n  background-color: #fff;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-play-progress[_ngcontent-%COMP%]:before {\n  font-size: 0.9em;\n  position: absolute;\n  right: -0.5em;\n  top: -0.3333333333em;\n  z-index: 1;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-load-progress[_ngcontent-%COMP%] {\n  background: rgba(115, 133, 159, 0.5);\n}\n.video-js[_ngcontent-%COMP%]   .vjs-load-progress[_ngcontent-%COMP%]   div[_ngcontent-%COMP%] {\n  background: rgba(115, 133, 159, 0.75);\n}\n.video-js[_ngcontent-%COMP%]   .vjs-time-tooltip[_ngcontent-%COMP%] {\n  background-color: #fff;\n  background-color: rgba(255, 255, 255, 0.8);\n  border-radius: 0.3em;\n  color: #000;\n  float: right;\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 1em;\n  padding: 6px 8px 8px 8px;\n  pointer-events: none;\n  position: absolute;\n  top: -3.4em;\n  visibility: hidden;\n  z-index: 1;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-progress-holder[_ngcontent-%COMP%]:focus   .vjs-time-tooltip[_ngcontent-%COMP%] {\n  display: none;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%]:hover   .vjs-time-tooltip[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%]:hover   .vjs-progress-holder[_ngcontent-%COMP%]:focus   .vjs-time-tooltip[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 0.6em;\n  visibility: visible;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-progress-control.disabled[_ngcontent-%COMP%]:hover   .vjs-time-tooltip[_ngcontent-%COMP%] {\n  font-size: 1em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%]   .vjs-mouse-display[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  width: 1px;\n  height: 100%;\n  background-color: #000;\n  z-index: 1;\n}\n.vjs-no-flex[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%]   .vjs-mouse-display[_ngcontent-%COMP%] {\n  z-index: 0;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%]:hover   .vjs-mouse-display[_ngcontent-%COMP%] {\n  display: block;\n}\n.video-js.vjs-user-inactive[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%]   .vjs-mouse-display[_ngcontent-%COMP%] {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 1s, opacity 1s;\n}\n.video-js.vjs-user-inactive.vjs-no-flex[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%]   .vjs-mouse-display[_ngcontent-%COMP%] {\n  display: none;\n}\n.vjs-mouse-display[_ngcontent-%COMP%]   .vjs-time-tooltip[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: #000;\n  background-color: rgba(0, 0, 0, 0.8);\n}\n.video-js[_ngcontent-%COMP%]   .vjs-slider[_ngcontent-%COMP%] {\n  position: relative;\n  cursor: pointer;\n  padding: 0;\n  margin: 0 0.45em 0 0.45em;\n  \n  -webkit-touch-callout: none;\n  \n  -webkit-user-select: none;\n  \n  \n  \n  \n  user-select: none;\n  background-color: #73859f;\n  background-color: rgba(115, 133, 159, 0.5);\n}\n.video-js[_ngcontent-%COMP%]   .vjs-slider.disabled[_ngcontent-%COMP%] {\n  cursor: default;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-slider[_ngcontent-%COMP%]:focus {\n  text-shadow: 0em 0em 1em white;\n  box-shadow: 0 0 1em #fff;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-mute-control[_ngcontent-%COMP%] {\n  cursor: pointer;\n  flex: none;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%] {\n  cursor: pointer;\n  margin-right: 1em;\n  display: flex;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-control.vjs-volume-horizontal[_ngcontent-%COMP%] {\n  width: 5em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%] {\n  visibility: visible;\n  opacity: 0;\n  width: 1px;\n  height: 1px;\n  margin-left: -1px;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%] {\n  transition: width 1s;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-hover[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]:active   .vjs-volume-control[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]:focus   .vjs-volume-control[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%]:active, .video-js[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-hover[_ngcontent-%COMP%]   .vjs-mute-control[_ngcontent-%COMP%]    ~ .vjs-volume-control[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]   .vjs-volume-control.vjs-slider-active[_ngcontent-%COMP%] {\n  visibility: visible;\n  opacity: 1;\n  position: relative;\n  transition: visibility 0.1s, opacity 0.1s, height 0.1s, width 0.1s, left 0s, top 0s;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-hover[_ngcontent-%COMP%]   .vjs-volume-control.vjs-volume-horizontal[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]:active   .vjs-volume-control.vjs-volume-horizontal[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]:focus   .vjs-volume-control.vjs-volume-horizontal[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%]:active.vjs-volume-horizontal, .video-js[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-hover[_ngcontent-%COMP%]   .vjs-mute-control[_ngcontent-%COMP%]    ~ .vjs-volume-control.vjs-volume-horizontal[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]   .vjs-volume-control.vjs-slider-active.vjs-volume-horizontal[_ngcontent-%COMP%] {\n  width: 5em;\n  height: 3em;\n  margin-right: 0;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-hover[_ngcontent-%COMP%]   .vjs-volume-control.vjs-volume-vertical[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]:active   .vjs-volume-control.vjs-volume-vertical[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]:focus   .vjs-volume-control.vjs-volume-vertical[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%]:active.vjs-volume-vertical, .video-js[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-hover[_ngcontent-%COMP%]   .vjs-mute-control[_ngcontent-%COMP%]    ~ .vjs-volume-control.vjs-volume-vertical[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]   .vjs-volume-control.vjs-slider-active.vjs-volume-vertical[_ngcontent-%COMP%] {\n  left: -3.5em;\n  transition: left 0s;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-hover[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-horizontal[_ngcontent-%COMP%]:active, .video-js[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active[_ngcontent-%COMP%] {\n  width: 10em;\n  transition: width 0.1s;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-mute-toggle-only[_ngcontent-%COMP%] {\n  width: 4em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]   .vjs-volume-control.vjs-volume-vertical[_ngcontent-%COMP%] {\n  height: 8em;\n  width: 3em;\n  left: -3000em;\n  transition: visibility 1s, opacity 1s, height 1s 1s, width 1s 1s, left 1s 1s, top 1s 1s;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]   .vjs-volume-control.vjs-volume-horizontal[_ngcontent-%COMP%] {\n  transition: visibility 1s, opacity 1s, height 1s 1s, width 1s, left 1s 1s, top 1s 1s;\n}\n.video-js.vjs-no-flex[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]   .vjs-volume-control.vjs-volume-horizontal[_ngcontent-%COMP%] {\n  width: 5em;\n  height: 3em;\n  visibility: visible;\n  opacity: 1;\n  position: relative;\n  transition: none;\n}\n.video-js.vjs-no-flex[_ngcontent-%COMP%]   .vjs-volume-control.vjs-volume-vertical[_ngcontent-%COMP%], .video-js.vjs-no-flex[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%]   .vjs-volume-control.vjs-volume-vertical[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 3em;\n  left: 0.5em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-panel[_ngcontent-%COMP%] {\n  display: flex;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-bar[_ngcontent-%COMP%] {\n  margin: 1.35em 0.45em;\n}\n.vjs-volume-bar.vjs-slider-horizontal[_ngcontent-%COMP%] {\n  width: 5em;\n  height: 0.3em;\n}\n.vjs-volume-bar.vjs-slider-vertical[_ngcontent-%COMP%] {\n  width: 0.3em;\n  height: 5em;\n  margin: 1.35em auto;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-level[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  background-color: #fff;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-level[_ngcontent-%COMP%]:before {\n  position: absolute;\n  font-size: 0.9em;\n  z-index: 1;\n}\n.vjs-slider-vertical[_ngcontent-%COMP%]   .vjs-volume-level[_ngcontent-%COMP%] {\n  width: 0.3em;\n}\n.vjs-slider-vertical[_ngcontent-%COMP%]   .vjs-volume-level[_ngcontent-%COMP%]:before {\n  top: -0.5em;\n  left: -0.3em;\n  z-index: 1;\n}\n.vjs-slider-horizontal[_ngcontent-%COMP%]   .vjs-volume-level[_ngcontent-%COMP%] {\n  height: 0.3em;\n}\n.vjs-slider-horizontal[_ngcontent-%COMP%]   .vjs-volume-level[_ngcontent-%COMP%]:before {\n  top: -0.3em;\n  right: -0.5em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-vertical[_ngcontent-%COMP%] {\n  width: 4em;\n}\n.vjs-volume-bar.vjs-slider-vertical[_ngcontent-%COMP%]   .vjs-volume-level[_ngcontent-%COMP%] {\n  height: 100%;\n}\n.vjs-volume-bar.vjs-slider-horizontal[_ngcontent-%COMP%]   .vjs-volume-level[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-vertical[_ngcontent-%COMP%] {\n  width: 3em;\n  height: 8em;\n  bottom: 8em;\n  background-color: #2B333F;\n  background-color: rgba(43, 51, 63, 0.7);\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-horizontal[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%] {\n  left: -2em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-tooltip[_ngcontent-%COMP%] {\n  background-color: #fff;\n  background-color: rgba(255, 255, 255, 0.8);\n  border-radius: 0.3em;\n  color: #000;\n  float: right;\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 1em;\n  padding: 6px 8px 8px 8px;\n  pointer-events: none;\n  position: absolute;\n  top: -3.4em;\n  visibility: hidden;\n  z-index: 1;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%]:hover   .vjs-volume-tooltip[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%]:hover   .vjs-progress-holder[_ngcontent-%COMP%]:focus   .vjs-volume-tooltip[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 1em;\n  visibility: visible;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-vertical[_ngcontent-%COMP%]:hover   .vjs-volume-tooltip[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]   .vjs-volume-vertical[_ngcontent-%COMP%]:hover   .vjs-progress-holder[_ngcontent-%COMP%]:focus   .vjs-volume-tooltip[_ngcontent-%COMP%] {\n  left: 1em;\n  top: -12px;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-control.disabled[_ngcontent-%COMP%]:hover   .vjs-volume-tooltip[_ngcontent-%COMP%] {\n  font-size: 1em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%]   .vjs-mouse-display[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  width: 100%;\n  height: 1px;\n  background-color: #000;\n  z-index: 1;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-horizontal[_ngcontent-%COMP%]   .vjs-mouse-display[_ngcontent-%COMP%] {\n  width: 1px;\n  height: 100%;\n}\n.vjs-no-flex[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%]   .vjs-mouse-display[_ngcontent-%COMP%] {\n  z-index: 0;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%]:hover   .vjs-mouse-display[_ngcontent-%COMP%] {\n  display: block;\n}\n.video-js.vjs-user-inactive[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%]   .vjs-mouse-display[_ngcontent-%COMP%] {\n  visibility: hidden;\n  opacity: 0;\n  transition: visibility 1s, opacity 1s;\n}\n.video-js.vjs-user-inactive.vjs-no-flex[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%]   .vjs-mouse-display[_ngcontent-%COMP%] {\n  display: none;\n}\n.vjs-mouse-display[_ngcontent-%COMP%]   .vjs-volume-tooltip[_ngcontent-%COMP%] {\n  color: #fff;\n  background-color: #000;\n  background-color: rgba(0, 0, 0, 0.8);\n}\n.vjs-poster[_ngcontent-%COMP%] {\n  display: inline-block;\n  vertical-align: middle;\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n  background-size: contain;\n  background-color: #000000;\n  cursor: pointer;\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  height: 100%;\n}\n.vjs-has-started[_ngcontent-%COMP%]   .vjs-poster[_ngcontent-%COMP%] {\n  display: none;\n}\n.vjs-audio.vjs-has-started[_ngcontent-%COMP%]   .vjs-poster[_ngcontent-%COMP%] {\n  display: block;\n}\n.vjs-using-native-controls[_ngcontent-%COMP%]   .vjs-poster[_ngcontent-%COMP%] {\n  display: none;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-live-control[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  flex: auto;\n  font-size: 1em;\n  line-height: 3em;\n}\n.vjs-no-flex[_ngcontent-%COMP%]   .vjs-live-control[_ngcontent-%COMP%] {\n  display: table-cell;\n  width: auto;\n  text-align: left;\n}\n.video-js[_ngcontent-%COMP%]:not(.vjs-live)   .vjs-live-control[_ngcontent-%COMP%], .video-js.vjs-liveui[_ngcontent-%COMP%]   .vjs-live-control[_ngcontent-%COMP%] {\n  display: none;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-seek-to-live-control[_ngcontent-%COMP%] {\n  align-items: center;\n  cursor: pointer;\n  flex: none;\n  display: inline-flex;\n  height: 100%;\n  padding-left: 0.5em;\n  padding-right: 0.5em;\n  font-size: 1em;\n  line-height: 3em;\n  width: auto;\n  min-width: 4em;\n}\n.vjs-no-flex[_ngcontent-%COMP%]   .vjs-seek-to-live-control[_ngcontent-%COMP%] {\n  display: table-cell;\n  width: auto;\n  text-align: left;\n}\n.video-js.vjs-live[_ngcontent-%COMP%]:not(.vjs-liveui)   .vjs-seek-to-live-control[_ngcontent-%COMP%], .video-js[_ngcontent-%COMP%]:not(.vjs-live)   .vjs-seek-to-live-control[_ngcontent-%COMP%] {\n  display: none;\n}\n.vjs-seek-to-live-control.vjs-control.vjs-at-live-edge[_ngcontent-%COMP%] {\n  cursor: auto;\n}\n.vjs-seek-to-live-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  margin-right: 0.5em;\n  color: #888;\n}\n.vjs-seek-to-live-control.vjs-control.vjs-at-live-edge[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  color: red;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-time-control[_ngcontent-%COMP%] {\n  flex: none;\n  font-size: 1em;\n  line-height: 3em;\n  min-width: 2em;\n  width: auto;\n  padding-left: 1em;\n  padding-right: 1em;\n}\n.vjs-live[_ngcontent-%COMP%]   .vjs-time-control[_ngcontent-%COMP%] {\n  display: none;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-current-time[_ngcontent-%COMP%], .vjs-no-flex[_ngcontent-%COMP%]   .vjs-current-time[_ngcontent-%COMP%] {\n  display: none;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-duration[_ngcontent-%COMP%], .vjs-no-flex[_ngcontent-%COMP%]   .vjs-duration[_ngcontent-%COMP%] {\n  display: none;\n}\n.vjs-time-divider[_ngcontent-%COMP%] {\n  display: none;\n  line-height: 3em;\n}\n.vjs-live[_ngcontent-%COMP%]   .vjs-time-divider[_ngcontent-%COMP%] {\n  display: none;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-play-control[_ngcontent-%COMP%] {\n  cursor: pointer;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-play-control[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  flex: none;\n}\n.vjs-text-track-display[_ngcontent-%COMP%] {\n  position: absolute;\n  bottom: 3em;\n  left: 0;\n  right: 0;\n  top: 0;\n  pointer-events: none;\n}\n.video-js.vjs-user-inactive.vjs-playing[_ngcontent-%COMP%]   .vjs-text-track-display[_ngcontent-%COMP%] {\n  bottom: 1em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-text-track[_ngcontent-%COMP%] {\n  font-size: 1.4em;\n  text-align: center;\n  margin-bottom: 0.1em;\n}\n.vjs-subtitles[_ngcontent-%COMP%] {\n  color: #fff;\n}\n.vjs-captions[_ngcontent-%COMP%] {\n  color: #fc6;\n}\n.vjs-tt-cue[_ngcontent-%COMP%] {\n  display: block;\n}\nvideo[_ngcontent-%COMP%]::-webkit-media-text-track-display {\n  transform: translateY(-3em);\n}\n.video-js.vjs-user-inactive.vjs-playing[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]::-webkit-media-text-track-display {\n  transform: translateY(-1.5em);\n}\n.video-js[_ngcontent-%COMP%]   .vjs-picture-in-picture-control[_ngcontent-%COMP%] {\n  cursor: pointer;\n  flex: none;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-fullscreen-control[_ngcontent-%COMP%] {\n  cursor: pointer;\n  flex: none;\n}\n.vjs-playback-rate[_ngcontent-%COMP%]    > .vjs-menu-button[_ngcontent-%COMP%], .vjs-playback-rate[_ngcontent-%COMP%]   .vjs-playback-rate-value[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\n.vjs-playback-rate[_ngcontent-%COMP%]   .vjs-playback-rate-value[_ngcontent-%COMP%] {\n  pointer-events: none;\n  font-size: 1.5em;\n  line-height: 2;\n  text-align: center;\n}\n.vjs-playback-rate[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%] {\n  width: 4em;\n  left: 0em;\n}\n.vjs-error[_ngcontent-%COMP%]   .vjs-error-display[_ngcontent-%COMP%]   .vjs-modal-dialog-content[_ngcontent-%COMP%] {\n  font-size: 1.4em;\n  text-align: center;\n}\n.vjs-error[_ngcontent-%COMP%]   .vjs-error-display[_ngcontent-%COMP%]:before {\n  color: #fff;\n  content: \"X\";\n  font-family: Arial, Helvetica, sans-serif;\n  font-size: 4em;\n  left: 0;\n  line-height: 1;\n  margin-top: -0.5em;\n  position: absolute;\n  text-shadow: 0.05em 0.05em 0.1em #000;\n  text-align: center;\n  top: 50%;\n  vertical-align: middle;\n  width: 100%;\n}\n.vjs-loading-spinner[_ngcontent-%COMP%] {\n  display: none;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  margin: -25px 0 0 -25px;\n  opacity: 0.85;\n  text-align: left;\n  border: 6px solid rgba(43, 51, 63, 0.7);\n  box-sizing: border-box;\n  background-clip: padding-box;\n  width: 50px;\n  height: 50px;\n  border-radius: 25px;\n  visibility: hidden;\n}\n.vjs-seeking[_ngcontent-%COMP%]   .vjs-loading-spinner[_ngcontent-%COMP%], .vjs-waiting[_ngcontent-%COMP%]   .vjs-loading-spinner[_ngcontent-%COMP%] {\n  display: block;\n  animation: vjs-spinner-show 0s linear 0.3s forwards;\n}\n.vjs-loading-spinner[_ngcontent-%COMP%]:before, .vjs-loading-spinner[_ngcontent-%COMP%]:after {\n  content: \"\";\n  position: absolute;\n  margin: -6px;\n  box-sizing: inherit;\n  width: inherit;\n  height: inherit;\n  border-radius: inherit;\n  opacity: 1;\n  border: inherit;\n  border-color: transparent;\n  border-top-color: white;\n}\n.vjs-seeking[_ngcontent-%COMP%]   .vjs-loading-spinner[_ngcontent-%COMP%]:before, .vjs-seeking[_ngcontent-%COMP%]   .vjs-loading-spinner[_ngcontent-%COMP%]:after, .vjs-waiting[_ngcontent-%COMP%]   .vjs-loading-spinner[_ngcontent-%COMP%]:before, .vjs-waiting[_ngcontent-%COMP%]   .vjs-loading-spinner[_ngcontent-%COMP%]:after {\n  animation: vjs-spinner-spin 1.1s cubic-bezier(0.6, 0.2, 0, 0.8) infinite, vjs-spinner-fade 1.1s linear infinite;\n}\n.vjs-seeking[_ngcontent-%COMP%]   .vjs-loading-spinner[_ngcontent-%COMP%]:before, .vjs-waiting[_ngcontent-%COMP%]   .vjs-loading-spinner[_ngcontent-%COMP%]:before {\n  border-top-color: white;\n}\n.vjs-seeking[_ngcontent-%COMP%]   .vjs-loading-spinner[_ngcontent-%COMP%]:after, .vjs-waiting[_ngcontent-%COMP%]   .vjs-loading-spinner[_ngcontent-%COMP%]:after {\n  border-top-color: white;\n  animation-delay: 0.44s;\n}\n@keyframes vjs-spinner-show {\n  to {\n    visibility: visible;\n  }\n}\n@keyframes vjs-spinner-spin {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes vjs-spinner-fade {\n  0% {\n    border-top-color: #73859f;\n  }\n  20% {\n    border-top-color: #73859f;\n  }\n  35% {\n    border-top-color: white;\n  }\n  60% {\n    border-top-color: #73859f;\n  }\n  100% {\n    border-top-color: #73859f;\n  }\n}\n.vjs-chapters-button[_ngcontent-%COMP%]   .vjs-menu[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  width: 24em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-subs-caps-button[_ngcontent-%COMP%]    + .vjs-menu[_ngcontent-%COMP%]   .vjs-captions-menu-item[_ngcontent-%COMP%]   .vjs-menu-item-text[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  vertical-align: middle;\n  display: inline-block;\n  margin-bottom: -0.1em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-subs-caps-button[_ngcontent-%COMP%]    + .vjs-menu[_ngcontent-%COMP%]   .vjs-captions-menu-item[_ngcontent-%COMP%]   .vjs-menu-item-text[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  font-family: VideoJS;\n  content: \"\uF10D\";\n  font-size: 1.5em;\n  line-height: inherit;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-audio-button[_ngcontent-%COMP%]    + .vjs-menu[_ngcontent-%COMP%]   .vjs-main-desc-menu-item[_ngcontent-%COMP%]   .vjs-menu-item-text[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%] {\n  vertical-align: middle;\n  display: inline-block;\n  margin-bottom: -0.1em;\n}\n.video-js[_ngcontent-%COMP%]   .vjs-audio-button[_ngcontent-%COMP%]    + .vjs-menu[_ngcontent-%COMP%]   .vjs-main-desc-menu-item[_ngcontent-%COMP%]   .vjs-menu-item-text[_ngcontent-%COMP%]   .vjs-icon-placeholder[_ngcontent-%COMP%]:before {\n  font-family: VideoJS;\n  content: \" \uF11D\";\n  font-size: 1.5em;\n  line-height: inherit;\n}\n.video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-current-time[_ngcontent-%COMP%], .video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-time-divider[_ngcontent-%COMP%], .video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-duration[_ngcontent-%COMP%], .video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-remaining-time[_ngcontent-%COMP%], .video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-playback-rate[_ngcontent-%COMP%], .video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-chapters-button[_ngcontent-%COMP%], .video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-descriptions-button[_ngcontent-%COMP%], .video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-captions-button[_ngcontent-%COMP%], .video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-subtitles-button[_ngcontent-%COMP%], .video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-audio-button[_ngcontent-%COMP%], .video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%], .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-current-time[_ngcontent-%COMP%], .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-time-divider[_ngcontent-%COMP%], .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-duration[_ngcontent-%COMP%], .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-remaining-time[_ngcontent-%COMP%], .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-playback-rate[_ngcontent-%COMP%], .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-chapters-button[_ngcontent-%COMP%], .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-descriptions-button[_ngcontent-%COMP%], .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-captions-button[_ngcontent-%COMP%], .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-subtitles-button[_ngcontent-%COMP%], .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-audio-button[_ngcontent-%COMP%], .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-current-time[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-time-divider[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-duration[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-remaining-time[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-playback-rate[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-chapters-button[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-descriptions-button[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-captions-button[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-subtitles-button[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-audio-button[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-volume-control[_ngcontent-%COMP%] {\n  display: none !important;\n}\n.video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-horizontal[_ngcontent-%COMP%]:hover, .video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-horizontal[_ngcontent-%COMP%]:active, .video-js.vjs-layout-small[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active[_ngcontent-%COMP%], .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-horizontal[_ngcontent-%COMP%]:hover, .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-horizontal[_ngcontent-%COMP%]:active, .video-js.vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-horizontal[_ngcontent-%COMP%]:hover, .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-horizontal[_ngcontent-%COMP%]:active, .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-volume-panel.vjs-volume-panel-horizontal.vjs-slider-active[_ngcontent-%COMP%] {\n  width: auto;\n  width: initial;\n}\n.video-js.vjs-layout-x-small[_ngcontent-%COMP%]:not(.vjs-liveui)   .vjs-subs-caps-button[_ngcontent-%COMP%], .video-js.vjs-layout-x-small[_ngcontent-%COMP%]:not(.vjs-live)   .vjs-subs-caps-button[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-subs-caps-button[_ngcontent-%COMP%] {\n  display: none;\n}\n.video-js.vjs-layout-x-small.vjs-liveui[_ngcontent-%COMP%]   .vjs-custom-control-spacer[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-custom-control-spacer[_ngcontent-%COMP%] {\n  flex: auto;\n  display: block;\n}\n.video-js.vjs-layout-x-small.vjs-liveui.vjs-no-flex[_ngcontent-%COMP%]   .vjs-custom-control-spacer[_ngcontent-%COMP%], .video-js.vjs-layout-tiny.vjs-no-flex[_ngcontent-%COMP%]   .vjs-custom-control-spacer[_ngcontent-%COMP%] {\n  width: auto;\n}\n.video-js.vjs-layout-x-small.vjs-liveui[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%], .video-js.vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-progress-control[_ngcontent-%COMP%] {\n  display: none;\n}\n.vjs-modal-dialog.vjs-text-track-settings[_ngcontent-%COMP%] {\n  background-color: #2B333F;\n  background-color: rgba(43, 51, 63, 0.75);\n  color: #fff;\n  height: 70%;\n}\n.vjs-text-track-settings[_ngcontent-%COMP%]   .vjs-modal-dialog-content[_ngcontent-%COMP%] {\n  display: table;\n}\n.vjs-text-track-settings[_ngcontent-%COMP%]   .vjs-track-settings-colors[_ngcontent-%COMP%], .vjs-text-track-settings[_ngcontent-%COMP%]   .vjs-track-settings-font[_ngcontent-%COMP%], .vjs-text-track-settings[_ngcontent-%COMP%]   .vjs-track-settings-controls[_ngcontent-%COMP%] {\n  display: table-cell;\n}\n.vjs-text-track-settings[_ngcontent-%COMP%]   .vjs-track-settings-controls[_ngcontent-%COMP%] {\n  text-align: right;\n  vertical-align: bottom;\n}\n@supports (display: grid) {\n  .vjs-text-track-settings[_ngcontent-%COMP%]   .vjs-modal-dialog-content[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n    grid-template-rows: 1fr;\n    padding: 20px 24px 0px 24px;\n  }\n\n  .vjs-track-settings-controls[_ngcontent-%COMP%]   .vjs-default-button[_ngcontent-%COMP%] {\n    margin-bottom: 20px;\n  }\n\n  .vjs-text-track-settings[_ngcontent-%COMP%]   .vjs-track-settings-controls[_ngcontent-%COMP%] {\n    grid-column: 1/-1;\n  }\n\n  .vjs-layout-small[_ngcontent-%COMP%]   .vjs-text-track-settings[_ngcontent-%COMP%]   .vjs-modal-dialog-content[_ngcontent-%COMP%], .vjs-layout-x-small[_ngcontent-%COMP%]   .vjs-text-track-settings[_ngcontent-%COMP%]   .vjs-modal-dialog-content[_ngcontent-%COMP%], .vjs-layout-tiny[_ngcontent-%COMP%]   .vjs-text-track-settings[_ngcontent-%COMP%]   .vjs-modal-dialog-content[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.vjs-track-setting[_ngcontent-%COMP%]    > select[_ngcontent-%COMP%] {\n  margin-right: 1em;\n  margin-bottom: 0.5em;\n}\n.vjs-text-track-settings[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%] {\n  margin: 5px;\n  padding: 3px;\n  border: none;\n}\n.vjs-text-track-settings[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  display: inline-block;\n}\n.vjs-text-track-settings[_ngcontent-%COMP%]   fieldset[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]    > select[_ngcontent-%COMP%] {\n  max-width: 7.3em;\n}\n.vjs-text-track-settings[_ngcontent-%COMP%]   legend[_ngcontent-%COMP%] {\n  color: #fff;\n  margin: 0 0 5px 0;\n}\n.vjs-text-track-settings[_ngcontent-%COMP%]   .vjs-label[_ngcontent-%COMP%] {\n  position: absolute;\n  clip: rect(1px 1px 1px 1px);\n  clip: rect(1px, 1px, 1px, 1px);\n  display: block;\n  margin: 0 0 5px 0;\n  padding: 0;\n  border: 0;\n  height: 1px;\n  width: 1px;\n  overflow: hidden;\n}\n.vjs-track-settings-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus, .vjs-track-settings-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:active {\n  outline-style: solid;\n  outline-width: medium;\n  background-image: linear-gradient(0deg, #fff 88%, #73859f 100%);\n}\n.vjs-track-settings-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n  color: rgba(43, 51, 63, 0.75);\n}\n.vjs-track-settings-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background-color: #fff;\n  background-image: linear-gradient(-180deg, #fff 88%, #73859f 100%);\n  color: #2B333F;\n  cursor: pointer;\n  border-radius: 2px;\n}\n.vjs-track-settings-controls[_ngcontent-%COMP%]   .vjs-default-button[_ngcontent-%COMP%] {\n  margin-right: 1em;\n}\n@media print {\n  .video-js[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:not(.vjs-tech):not(.vjs-poster) {\n    visibility: hidden;\n  }\n}\n.vjs-resize-manager[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border: none;\n  z-index: -1000;\n}\n.js-focus-visible[_ngcontent-%COMP%]   .video-js[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]:focus:not(.focus-visible) {\n  outline: none;\n}\n.video-js[_ngcontent-%COMP%]   *[_ngcontent-%COMP%]:focus:not(:focus-visible) {\n  outline: none;\n}\n.category-holder[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 50px;\n  margin-bottom: 10px;\n}\n.courese-holder[_ngcontent-%COMP%] {\n  width: 100%;\n  height: calc(100% - 60px);\n  box-sizing: border-box;\n  overflow: auto;\n}\n.col-card-4[_ngcontent-%COMP%] {\n  width: calc(100% / 4);\n  height: 320px;\n  box-sizing: border-box;\n  padding: 10px;\n  margin-bottom: 20px;\n}\n.cart-courses[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  padding: 10px;\n  box-sizing: border-box;\n}\n.header-cart-courses[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 35px;\n  margin-top: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #F1F2F2;\n  color: #A7A9AC;\n  font-family: myFont;\n  font-size: 10px;\n}\n.content-cart-courses[_ngcontent-%COMP%] {\n  width: 100%;\n  height: calc(100% - 70px);\n  box-sizing: border-box;\n}\n.price-cart-courses[_ngcontent-%COMP%] {\n  margin-top: 5px;\n  width: 100%;\n  height: 35px;\n  box-sizing: border-box;\n  padding: 5px;\n  display: flex;\n  align-items: center;\n}\n.price-cart-courses[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #9B9B9B;\n  font-family: myFont;\n  font-size: 16px;\n}\n.price-cart-courses[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 13px;\n}\n.actions-cart-courses[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 50pxpx;\n  box-sizing: border-box;\n  padding: 5px;\n}\n.img-courses[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n}\n.video-js[_ngcontent-%COMP%]   canvas[_ngcontent-%COMP%] {\n  position: relative !important;\n}\n.price-cart-courses[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], .header-cart-courses[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n.detail-course-holder[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 280px;\n  margin-bottom: 10px;\n  border: 1px solid #0E5CCC;\n  border-radius: 12px;\n  -webkit-border-radius: 12px;\n  -moz-border-radius: 12px;\n  -ms-border-radius: 12px;\n  -o-border-radius: 12px;\n  padding: 10px;\n  box-sizing: border-box;\n}\n.btn-add-to-cart[_ngcontent-%COMP%] {\n  min-width: 90px;\n  height: 30px;\n  background: #0FBA8E;\n  color: #ffffff;\n  font-family: myFont;\n  border: 1px solid #608D2B;\n  border-radius: 25px;\n  -webkit-border-radius: 25px;\n  -moz-border-radius: 25px;\n  -ms-border-radius: 25px;\n  -o-border-radius: 25px;\n}\ntr.mat-row[_ngcontent-%COMP%] {\n  height: 150px;\n  padding-top: 15px;\n  padding-bottom: 15px;\n  box-sizing: border-box;\n}\ntr.mat-header-row[_ngcontent-%COMP%] {\n  background: aliceblue;\n}\n.txt-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.status-chip[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 5px;\n  border-radius: 50px;\n  -webkit-border-radius: 50px;\n  -moz-border-radius: 50px;\n  -ms-border-radius: 50px;\n  -o-border-radius: 50px;\n  font-size: 13px;\n}\n.pendding[_ngcontent-%COMP%] {\n  background-color: #e7fd1b;\n  color: #000000;\n}\n.approve[_ngcontent-%COMP%] {\n  background-color: #12e759;\n  color: #ffffff;\n}\n.reject[_ngcontent-%COMP%] {\n  background-color: #e71212;\n  color: #ffffff;\n}\n.select-holder[_ngcontent-%COMP%] {\n  width: 200px;\n  margin-right: 20px;\n}\n.search-holder[_ngcontent-%COMP%] {\n  width: calc(100% - 220px);\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy92aWRlby5qcy9kaXN0L3ZpZGVvLWpzLmNzcyIsInNyYy9hcHAvcGFnZXMvY291cnNlcy1wYWdlL2NvbXBvbmVudHMvY291cnNlcy9jb3Vyc2VzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQUNoQjtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztFQUNQLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLGl0TEFBaXRMO0VBQ2p0TCxtQkFBbUI7RUFDbkIsa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7RUFDRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UsZ0JBQWdCO0FBQ2xCO0FBRUE7Ozs7O0VBS0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTs7Ozs7RUFLRSxnQkFBZ0I7QUFDbEI7QUFFQTs7RUFFRSxvQkFBb0I7RUFDcEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjtBQUNBOztFQUVFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdCQUFnQjtBQUNsQjtBQUVBO0VBQ0Usb0JBQW9CO0VBQ3BCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLGdC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U0Y7QUFKQTtFQUNFLGFBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQ0Esc0JBQUE7QUFPRjtBQUxBO0VBQ0UscUJBQUE7QUFRRjtBQU5BO0VBQ0Usa0JBQUE7QUFTRjtBQVBBO0VBQ0UscUJBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLHdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtFQUNBLGVBQUE7QUFVRjtBQVJBO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0FBV0Y7QUFSQTtFQUNFLHlCQUFBO0VBQ0EsY0FBQTtBQVdGO0FBVEE7RUFDRSx5QkFBQTtFQUNBLGNBQUE7QUFZRjtBQVZBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0FBYUY7QUFYQTtFQUNFLHlCQUFBO0FBY0YiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9jb3Vyc2VzLXBhZ2UvY29tcG9uZW50cy9jb3Vyc2VzL2NvdXJzZXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG4udmpzLW1vZGFsLWRpYWxvZyAudmpzLW1vZGFsLWRpYWxvZy1jb250ZW50LCAudmlkZW8tanMgLnZqcy1tb2RhbC1kaWFsb2csIC52anMtYnV0dG9uID4gLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSwgLnZpZGVvLWpzIC52anMtYmlnLXBsYXktYnV0dG9uIC52anMtaWNvbi1wbGFjZWhvbGRlcjpiZWZvcmUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLnZqcy1idXR0b24gPiAudmpzLWljb24tcGxhY2Vob2xkZXI6YmVmb3JlLCAudmlkZW8tanMgLnZqcy1iaWctcGxheS1idXR0b24gLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuQGZvbnQtZmFjZSB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBzcmM6IHVybChkYXRhOmFwcGxpY2F0aW9uL2ZvbnQtd29mZjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxkMDlHUmdBQkFBQUFBQkRrQUFzQUFBQUFHNmdBQVFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQkhVMVZDQUFBQkNBQUFBRHNBQUFCVUlJc2xlazlUTHpJQUFBRkVBQUFBUGdBQUFGWlJpVjNoWTIxaGNBQUFBWVFBQUFEYUFBQURQdjc0OS9wbmJIbG1BQUFDWUFBQUMzQUFBQkhRWmc2T2NXaGxZV1FBQUEzUUFBQUFLd0FBQURZWncyNTFhR2hsWVFBQURmd0FBQUFkQUFBQUpBK1JDTEZvYlhSNEFBQU9IQUFBQUJNQUFBQ003NDRBQUd4dlkyRUFBQTR3QUFBQVNBQUFBRWhGNmtxdWJXRjRjQUFBRG5nQUFBQWZBQUFBSUFFMEFJRnVZVzFsQUFBT21BQUFBU1VBQUFJSzFjZjFvSEJ2YzNRQUFBL0FBQUFCSkFBQUFkUEV4WXVOZUp4allHUmdZT0JpTUdDd1kyQnljZk1KWWVETFNTekpZNUJpWUdHQUFKQThNcHN4SnpNOWtZRUR4Z1BLc1lCcERpQm1nNGdDQUNZN0JVZ0FlSnhqWUdTN3dUaUJnWldCZ2FXUTVSa0RBOE12Q00wY3d4RE9lSTZCZ1ltQmxaa0JLd2hJYzAxaGNQakkrRkdKSGNSZHlBNFJaZ1FSQURLM0N4RUFBSGljN2RGWmJzTWdBRVhSUzB5Y3labm5PZUc3eStxQzhwVTFkSHVzSU9YeHVveGFPbHdaWVdRQjBBZWE0cXVJRU40RTlMektiS2p6RGVNNkgvbXVhNkxtYy9wOHloZzBsdmRZeDE1Wkc4dU9MUU9Hak1wM0V6cW16Sml6WU1tS05SdTI3Tmh6NE1pSk14ZXUzTGp6NEVrcW03VDhQNTJHOFBQM2xuVE9WaysrWjZpTjZRWnpOTjFGN3B0dU43ZUdPakRVb2FHT0RIVnN1dlU4TWRUTzlIZDVhcWd6UTUwYjZzSlFsNGE2TXRTMW9XNE1kV3VvTzBQZEcrckJVSStHZWpMVXM2RmVEUFZxcURkRHZSdnF3MUNmaHBxTTlBdDBpRkxhQUFCNG5KMVlEWEJUVlJaKzUvMjJUVWxKOHdlMHBIbEptN1JKZjVPOEYyajZFeW1sU1BrcHhhTDhVMnhwYTNES2owQ0JoYzJJVzRlV0tTb2tJb0xzdU1xc3NNNjRmK2pBNEhTZFdYWFhzY0JxNjdJT3MzRlhaMVpZV1Z5UkZkbzg5OXlYdElCUVo5MGs3NzE3enozdjNIUFBPZmQ4NTRZQ0NqOWNMOWRMMFJRRk9xQ2JHSm5ySGI1RWF5aUtJV044aUEvaFdCYmxvNmhVV204VHRDRHdFODBXTUp1cy9pcnd5eE9keGVCME1EYjE0Vk5KSG5YWW9MTFNsNkZmQ1VZTzluWVBUQThFcGc5MDkwTHByZmJCYloyaFkwVWxKVVhIUXAzL3Z0V2tTNkVCdjgrclBNcTV1OTY5MmYvZE54Sk5pcXdDMXhQRTlUQ1VnQ3NTZFFXZ0UzWFFEMjVsa0c0Q04yeG1UY09YV0JPeXNlcjZSTjZLbkdiS1NibVEzK2QwT0kxbTJXOFF6TExrSTJzeWtyV0FnSkpFdEE4dkdHVy8yUStDbVQzbjh6Uzl3Wnd1MkRDdnR1WktaTjN4a3JMaDM2eUNadVVvbVFTcUdwWTh0LzI1VmZIVmh3OHo0ZWJHQnRmTGIweWE5UENhRGMrOGRHVHZrMmRzaDZ6N1d6dm93bFhLVVNXbzlNSjE1YTNLckVQMmxvT3IyT2podzZpVzZoZjJCRGRFY2NRdlpHcGFBeTdZb3ZTd3E4a3I3SEdsbHhwZDcxcmtTNkcwU2YxMXNsOU92TUsxK2p3UFBPRHhqVXdrT2ltOUNVM2l4MXdOalhEZm1KU0VuNjE4QnM2bHBXd1VwVSs4UENxTE1ZNjUwempxOFZoQ0lQMTdORUtUeDNlYUxMK3M1UGk2eUpXYVdqVEhMUjFqWXpQU1Y5VkYvNk9qZGIvMWtPM01rM3VoSEMweDZnYzFCamxLUStuUUZ4VFlkYUprWjd5U1Z4TEJiaFIxZHNib05YcDF0Q1lLVzJMUmFFenBZY0l4MkJLTnhhTDBaYVVuU3FmRm9pTmhIS1IvR2tYNlBXVVNBYUplbFFhcVpMMUVwb0hOc2FqU0V5UFNvSjlJamhJeFRkakhMbXdadmhSRE9pRlRZL1llUW52clZabWlUUXRHbmNFQ1h0RlRCWkxPVnd3TVJnb1hIQWtYek16UG4xbkFKSjhqWVNiTURhcU4yd2FHTHpOaGloL2JaeW5VQk1wSVdTZzdWWWk3RFJ4Mm04QUxrSWRSQ0p3STZBckp4MkVJOGthRFdlVFFLZUFGazlmamwvMUF2d2t0alExUDdOanlNR1F5ZmQ0dmppcFg2TS9pNTJEN0NxODBrcWxjeEVjR1hSci9GRWNnczB1NXVHZ0I0Vld1TUZmcGRuMlJlNkhpM1Bxem14V0tzejYrYWUyUG45aFhYdy9mcU04NTlVaUdDMG9LWVlJTEpCcUpyc24xWjFFNXFPczlyUUNpVVFSUkVqbTh5SmNiSEY1Y1VKdWZYMXZBSGxlZncwWGdVb2JvUzNFVGZRbFR4QkM0U090dUU4VlBSSlRCU0NRU2paQ3BrN0dxenUrbWFzYVoyeTdaamVoaG80RjNnODJCTkRrQUhwT1JHNCtPQ1MrZjZKVFBtdFJuL1BIMWtjaDZkMDRzcDdBUWIyNWFRL3BxVXlYZVE4dnJlYkc4T1lRZFhPUSs1ODV1MHNkVzlycWFselJVUmlKKzlGNE13ZVJGcktVamwxR1VZaEgxQTI3V09IdzVjVEZTRlBNbzlFZVVJR25RVFpISWFKN0FITGFPS3NPT0RhTkY5amtCallHMlFFc1EyeGpNVUF4MmJCRWJlVEJXTUh3c2tCam5ncTU2Uy95ZmdrQm5XQmE0SzlzcUt0cTJ0MVVJOFM5SGU1WHVCUmJhd0FkYXRyUUVBaTMwQWtzMitMTThXZUNiYWxWWmtXTnlsdkorZHFKbnpWYitPSGxTb0tXOG5QQ1A3UmQrQ2NaMkRkV0FHcUoyQ0JGT3BoZ3l3RkZDRkJOdGZBYkd0TlBCQ3d4dnlnSGVZTVpNWTlaYm9CcXdxL3BWcnNiZ041dGt2MTUyT0RsYk1maXF3R01CZ3hhNEV4ejNRaG92UklVcDZhY3FabVF6UnEweXBEWFMyVFBMVDAyWUlrUUVUbk9FNDQ1b09HeE9tWEFxVUpOTkc3WGd1cE1qUHEydWE5YXNyajV5WS95dUt0ZU8xS3gwWU5KVHVmcmlyTGUxbVpuYXQ3T0w2cm5VZENXZW5wVzZJOG1BbmJzWThLV3MxUHVTb3ZDVzlBL1oyNVBRMjRhN2NOT3FnbVRrTG1CTWdoNFRIZ2M0YjlrMklWdjEvZy9GNW5HbGp3UExmT2dIQXpKemg0NVYvNCtXZW5Uem1NdFI1Wjd1czJUeXM5MDlVSHFyUFk3S2Jja294UnZSSGhtVmMzY0pHRTk3dW1sMFIxUzBqZFVMVmw3RXZadERGVkJGMzVOOWNFZGpwZ21BaU9sRlorRHRvaDkzK0QzenpIcjhSUk5aUWhuQ05NTmJjZWdPdnBFd1pvTCswNmNKUTA3aCt0aDNmWi83UFZiVkM2bmdUQVYvS29MRnVPNisyS0ZjVTY1MWdFYjV1Z1BTSWIxRCtYcDhWNCtrM3NFSUdudzVtWWU0SWY0azFsRllyNlNDem1NMkVROGlXdG13am5CSTlrVHdlMVRsZkFtWGg3SDAyYnk5ZlcyZ3NqS3d0djBhYVVSS2lsNE9kVjdyREwxTVhJRk5yaGR4b2hjWlhZVG5xNDdXaXNyS2l0YU9iYmY1K3l2a0xpNUo2bENOWlorQjZHQzM4Vk5CWkJEaWRTUy8rbVN2aDZzK3NyZ0M4cHlLTXZEdHQrZGUzYzlmVTc2WlBmdU04dWQ0S3YwZnlQL0xxZmVwTVQvM29aeFNxcFphVGExRGFRWUxZOFRGc0hZYldZc1BvUmhSV2ZMNWVTU1FiaFVHZ0dDM1lMYlZNazZQaXRURk5HcEFzTnJDNkQxVk5CS2dCSE1lamFpdVJXRVdHZ3NTREJUSmpxV0lsOGtKTGxzYUxKMnRYRHI2eEdmVDg1Yk0yUTA2YTQ2eDJIVGd2ZG5WOHo1WUR5LzI3SjR6dDZ4MlZ0a3pqb1lwa3EzNmthQnI0ZVFTZzd0eWlWd2VXdWJYWnVndGFkbDU4eWRhcGZiT1JmS3NEVHVaME9CZ3g0Y2ZkakNmNXRiV05JVG5MMTIwZmRPaTFSVjFDM3VLR3pOZHdZTGNNdlozQnhvUHlUT0NEMVh2WFRwN1UxMGdXQ1ZtVFY5YjNyMnowU2tHV292YjJocDlJODlPOGEyc21seWFPOG11TVUrZFJtdHpwNjBJekFvRnBqTHIxbjM4OGJvTHlmMGRSdnhoc0haMHFiV3FEa3dxdnZwa2o0bDBmWTZFSVhSaTVzUVNyQXZzVll3WFJ5NHFKMkVWdEQxQU43YTBIV3RoOXltdkwxeGMzV1RVS0svVEFIQS9iWERWdFZXZk9NZnVHeEdadjRMbi9qVnI5amMzajF5TXYwdG5kbXl0OVZxODhZOWdIMXd0TFgzS1dqb3Q1KytqV0hnQW9aWmtRMTR3R1EyMEZsaTcxVW1LSkF5NHhLTVNUR2JWZHliVzdGRERBdXQ5WHBENUF6V3JZTzd6UThxZmZxRjgrWW5kL2NsckhjZHl4R3kzYS8zK21mTm56Qy9jQnN2ZVRqblR2WGYxbzZ2ek9sWnc3V3RxdGRtUEsvRXJyei82Tk50RDcyem1OT1pmYm1ZZFRHSGZvb2ZxSTc5T2MrUjJuMWxybkw2cE9tMFVwN2t3eGhUVzEyQW1tN1dZa1hSMnFZckYyQW1nbWJBc3haand5MXhwZy9tMUplMnZycDh2L256MnhwbWxCZzRFOWhyTVUzNDF3VnBUT2gvT2ZtR3ZBbnJhOHE2dWN0cjYwWlFIVjNRK1dNUUp5a01qOFpzV24yUUJPbW1ITUIrbTVwRElwVEZvbllpZ2lhS0FoR0VpQUhGN0VsaVZuUWtqb0xWSU1QdEpwQktIWWQzQThHWUg5akp6cld3bUh4NVFqcDd2REFYMHN1R1J5bTF2dG0vOVcxL0h5Ujh2Y3pmTXM2U2s4RFN2ODU1LzVkbFg5b1FxNTJoVDhzeXlwMnJ4NUlkMTdJQXlBTTN3SWpRUE1PSHp5dEVCNjRxNkQ1elQ5MXlOYm54M1YvbnFuZDAxN1M5WTA2MDVrM2l6b1hMcHN4ZGUybjM4eW9PVjlzMUxjand6TmpiZFg2YXNuQlZhQmovNi9Ed0t3UGtwY3FiREc3Qm5zWG9TcVduVUFtb3R0WUY2ak1TZFZ5WVpoM3pWWENqd1Rpd3dISDZzR3VSaUVIUUd6dVJYNndoWmtwMTIzb3kxQldFMm1FZkovdHZJUnRNNFpNNWJEWGlNc1BNYUFLT1R5YzV1TDU3cnF5eWM1eTVKRTVwbTFpMlMyaVVYMENjYVE2bEM2Wm9nN0pxU3FabVlsb3NsMks2cHdOQTg0elJuUVc2U2FBTFlaUUdXNWxoQ3RVL1czNE42bytiS2ZaOGNmMy9DbC8raVRYM3dCenBPWTRtUmtlTmYzcnB0eWNHU3NoUVdnR2JZdDVqRmMyZTArRGdsSXJ3bDZEVldRN0J1d2FKM1hrMUo0Vkw1dXJuTGwvV2YrZ0hVL2hab1pkS055bTZsRytJMzRGYU5lWktjU3BKSW8ySWVDVnZwZHNER2ZLdnpKbkF3bWVEMzdPdzY1Wld3U293cGd3WDVUNjlzL3JCNTVkUDVCY3BnREtGVjhwN3Eyc24vMXVjOTNiVnpUL3c2VXJDcURUV3ZmQ3Evb0NEL3FaWE5vVWo4Qkw1S3A2R1UwMTdmcmZOWGtBdGlpeWYvU09DRWVMcW5kOFIvUWw5R2xDUmZjdFM2azVjaHZJQnVRMXpDQ2pvQ0hMMkRITkhJWHhNSjNrUWVPOGxic1VYT05lU2ZBNUVqY0c2L0UrS2RoTjRiUDA0dkJoZGk4ODMrQkZCelFieEZidlp6UWVZOUxOQlpjMEZOZm41TndmRG42ckNUblR3NlI4bytnZnBmNWhDb20zM2NSdWlUbHNzM0tIbVpqRCtCUE4rNWdYdUEyemlTL1E3M21MeFVrcGJLTi9lcXd6NXVLMFg5RjNoMmQxVjRuR05nWkdCZ0FPSmQ3NzYraXVlMytjckF6YzRBQWplNUJmY2cweHo5WUhFT0JpWVFCUUE4RlFsRkFIaWNZMkJrWUdCbkFBR09QZ2FHLy84NStoa1lHVkNCTWdCR0d3TllBQUFBZUp4allHQmdZQjhFbUtPUGdRRUFRMDRCZmdBQUFBQUFBQTRBYUFCK0FNd0E0QUVDQVVJQmJBR1lBY0lDR0FKWUFyUUM0QU13QTdBRDNnUXdCSllFM0FVa0JXWUZpZ1lnQm1ZR3RBYnFCMWdJRWdoWUNHNEloQWkyQ09oNG5HTmdaR0JnVUdZb1pXQm5BQUVtSU9ZQ1FnYUcvMkErQXdBWUNRRzJBSGljWFpCTmFvTkFHSVpmRTVQUUNLRlEybFVwczJvWEJmT3p6QUVTeURLQlFKZEdSMk5RUjNRU1NFL1FFL1FFUFVVUFVIcXN2c3JYalRNdzgzelB2UE1OQ3VBV1AzRFFEQWVqZG0xR2p6d1M3cE1td2k3NVhuZ0FENC9DUS9vWDRURmU0UXQ3dU1NYk96anVEYzBFbVhDUC9DN2NKMzhJdStSUDRRRWU4Q1U4cFA4V0htT1BYMkVQejg3VFBvMjAyZXkyT2psblFTWFYvNmFyT2pXRm12c3pNV3RkNkNxd09sS0hxNm92eWNMYVdNV1Z5ZFhLRkZabm1WRmxaVTQ2dFA3UjJuSTVuY2JpL2REa2ZEdEZCQTJERFhiWWtoS2MrVjBCcXM1WnQ5Sk0xSFFHQlJUbS9FZXpUbVpOS3RwY0FNczlZdTZBSzljYUY3NnpvTFdJV2NmTUdPU2tWZHV2U1dlY2hxWnN6MDQwSWIyUFkzdXJ4QkpUenJpVDk1bGlweitUTjFmbUFBQUFlSnh0a01sMndqQU1SZk9BaEFCbEttMmg4MEMzK2FqZ0NLS0RZNmNlZ1A1OVRZQnp1a0FMK3oxWnNxOGN0YUpUVEtQcnNVUUxiWFFRSTBFWEtYcm9ZNEFiRERIQ0dCTk1jWXNaN25DUEI4eXh3Q09lOEl3WHZPSU43L2pBSjc2d3hIZlVxV1grT3pndW1XQWpKTVYxN2kwTmRscjZpckxLTytxZnRkVDdpNnk0dUZTVXZDa25heStsRllaSVphUWNtZkgveElGZFluOThicWhyYTFhS1RNLzZsV01ueWFZaXJ4MXJGVVFaRkJrYjJ6SlV0b1hlSkNlZzBXbkx0SGVTRmMzT3Rybm96TndxaTBUa1NwQk1EQjFuU2RlNW9KWFcyM2hUUzIvVDBMaWxnbFhYN2RtRlZ4TG5xNVUwdllBVEhGazN6WDNCT2lzb1FITkRGRGVabnFLRHk5aFJOYXdON1ZoNzI3aEZ6Y0o1YzhUSUxyS1pmSDd0SVB4QUZQMEJwTGVKUEE9PSkgZm9ybWF0KFwid29mZlwiKTtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuLnZqcy1pY29uLXBsYXksIC52aWRlby1qcyAudmpzLXBsYXktY29udHJvbCAudmpzLWljb24tcGxhY2Vob2xkZXIsIC52aWRlby1qcyAudmpzLWJpZy1wbGF5LWJ1dHRvbiAudmpzLWljb24tcGxhY2Vob2xkZXI6YmVmb3JlIHtcbiAgZm9udC1mYW1pbHk6IFZpZGVvSlM7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbi52anMtaWNvbi1wbGF5OmJlZm9yZSwgLnZpZGVvLWpzIC52anMtcGxheS1jb250cm9sIC52anMtaWNvbi1wbGFjZWhvbGRlcjpiZWZvcmUsIC52aWRlby1qcyAudmpzLWJpZy1wbGF5LWJ1dHRvbiAudmpzLWljb24tcGxhY2Vob2xkZXI6YmVmb3JlIHtcbiAgY29udGVudDogXCJcXGYxMDFcIjtcbn1cblxuLnZqcy1pY29uLXBsYXktY2lyY2xlIHtcbiAgZm9udC1mYW1pbHk6IFZpZGVvSlM7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbi52anMtaWNvbi1wbGF5LWNpcmNsZTpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjEwMlwiO1xufVxuXG4udmpzLWljb24tcGF1c2UsIC52aWRlby1qcyAudmpzLXBsYXktY29udHJvbC52anMtcGxheWluZyAudmpzLWljb24tcGxhY2Vob2xkZXIge1xuICBmb250LWZhbWlseTogVmlkZW9KUztcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuLnZqcy1pY29uLXBhdXNlOmJlZm9yZSwgLnZpZGVvLWpzIC52anMtcGxheS1jb250cm9sLnZqcy1wbGF5aW5nIC52anMtaWNvbi1wbGFjZWhvbGRlcjpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjEwM1wiO1xufVxuXG4udmpzLWljb24tdm9sdW1lLW11dGUsIC52aWRlby1qcyAudmpzLW11dGUtY29udHJvbC52anMtdm9sLTAgLnZqcy1pY29uLXBsYWNlaG9sZGVyIHtcbiAgZm9udC1mYW1pbHk6IFZpZGVvSlM7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbi52anMtaWNvbi12b2x1bWUtbXV0ZTpiZWZvcmUsIC52aWRlby1qcyAudmpzLW11dGUtY29udHJvbC52anMtdm9sLTAgLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTA0XCI7XG59XG5cbi52anMtaWNvbi12b2x1bWUtbG93LCAudmlkZW8tanMgLnZqcy1tdXRlLWNvbnRyb2wudmpzLXZvbC0xIC52anMtaWNvbi1wbGFjZWhvbGRlciB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tdm9sdW1lLWxvdzpiZWZvcmUsIC52aWRlby1qcyAudmpzLW11dGUtY29udHJvbC52anMtdm9sLTEgLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTA1XCI7XG59XG5cbi52anMtaWNvbi12b2x1bWUtbWlkLCAudmlkZW8tanMgLnZqcy1tdXRlLWNvbnRyb2wudmpzLXZvbC0yIC52anMtaWNvbi1wbGFjZWhvbGRlciB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tdm9sdW1lLW1pZDpiZWZvcmUsIC52aWRlby1qcyAudmpzLW11dGUtY29udHJvbC52anMtdm9sLTIgLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTA2XCI7XG59XG5cbi52anMtaWNvbi12b2x1bWUtaGlnaCwgLnZpZGVvLWpzIC52anMtbXV0ZS1jb250cm9sIC52anMtaWNvbi1wbGFjZWhvbGRlciB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tdm9sdW1lLWhpZ2g6YmVmb3JlLCAudmlkZW8tanMgLnZqcy1tdXRlLWNvbnRyb2wgLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTA3XCI7XG59XG5cbi52anMtaWNvbi1mdWxsc2NyZWVuLWVudGVyLCAudmlkZW8tanMgLnZqcy1mdWxsc2NyZWVuLWNvbnRyb2wgLnZqcy1pY29uLXBsYWNlaG9sZGVyIHtcbiAgZm9udC1mYW1pbHk6IFZpZGVvSlM7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbi52anMtaWNvbi1mdWxsc2NyZWVuLWVudGVyOmJlZm9yZSwgLnZpZGVvLWpzIC52anMtZnVsbHNjcmVlbi1jb250cm9sIC52anMtaWNvbi1wbGFjZWhvbGRlcjpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjEwOFwiO1xufVxuXG4udmpzLWljb24tZnVsbHNjcmVlbi1leGl0LCAudmlkZW8tanMudmpzLWZ1bGxzY3JlZW4gLnZqcy1mdWxsc2NyZWVuLWNvbnRyb2wgLnZqcy1pY29uLXBsYWNlaG9sZGVyIHtcbiAgZm9udC1mYW1pbHk6IFZpZGVvSlM7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbi52anMtaWNvbi1mdWxsc2NyZWVuLWV4aXQ6YmVmb3JlLCAudmlkZW8tanMudmpzLWZ1bGxzY3JlZW4gLnZqcy1mdWxsc2NyZWVuLWNvbnRyb2wgLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTA5XCI7XG59XG5cbi52anMtaWNvbi1zcXVhcmUge1xuICBmb250LWZhbWlseTogVmlkZW9KUztcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuLnZqcy1pY29uLXNxdWFyZTpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjEwYVwiO1xufVxuXG4udmpzLWljb24tc3Bpbm5lciB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tc3Bpbm5lcjpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjEwYlwiO1xufVxuXG4udmpzLWljb24tc3VidGl0bGVzLCAudmlkZW8tanMgLnZqcy1zdWJzLWNhcHMtYnV0dG9uIC52anMtaWNvbi1wbGFjZWhvbGRlcixcbi52aWRlby1qcy52aWRlby1qczpsYW5nKGVuLUdCKSAudmpzLXN1YnMtY2Fwcy1idXR0b24gLnZqcy1pY29uLXBsYWNlaG9sZGVyLFxuLnZpZGVvLWpzLnZpZGVvLWpzOmxhbmcoZW4tSUUpIC52anMtc3Vicy1jYXBzLWJ1dHRvbiAudmpzLWljb24tcGxhY2Vob2xkZXIsXG4udmlkZW8tanMudmlkZW8tanM6bGFuZyhlbi1BVSkgLnZqcy1zdWJzLWNhcHMtYnV0dG9uIC52anMtaWNvbi1wbGFjZWhvbGRlcixcbi52aWRlby1qcy52aWRlby1qczpsYW5nKGVuLU5aKSAudmpzLXN1YnMtY2Fwcy1idXR0b24gLnZqcy1pY29uLXBsYWNlaG9sZGVyLCAudmlkZW8tanMgLnZqcy1zdWJ0aXRsZXMtYnV0dG9uIC52anMtaWNvbi1wbGFjZWhvbGRlciB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tc3VidGl0bGVzOmJlZm9yZSwgLnZpZGVvLWpzIC52anMtc3Vicy1jYXBzLWJ1dHRvbiAudmpzLWljb24tcGxhY2Vob2xkZXI6YmVmb3JlLFxuLnZpZGVvLWpzLnZpZGVvLWpzOmxhbmcoZW4tR0IpIC52anMtc3Vicy1jYXBzLWJ1dHRvbiAudmpzLWljb24tcGxhY2Vob2xkZXI6YmVmb3JlLFxuLnZpZGVvLWpzLnZpZGVvLWpzOmxhbmcoZW4tSUUpIC52anMtc3Vicy1jYXBzLWJ1dHRvbiAudmpzLWljb24tcGxhY2Vob2xkZXI6YmVmb3JlLFxuLnZpZGVvLWpzLnZpZGVvLWpzOmxhbmcoZW4tQVUpIC52anMtc3Vicy1jYXBzLWJ1dHRvbiAudmpzLWljb24tcGxhY2Vob2xkZXI6YmVmb3JlLFxuLnZpZGVvLWpzLnZpZGVvLWpzOmxhbmcoZW4tTlopIC52anMtc3Vicy1jYXBzLWJ1dHRvbiAudmpzLWljb24tcGxhY2Vob2xkZXI6YmVmb3JlLCAudmlkZW8tanMgLnZqcy1zdWJ0aXRsZXMtYnV0dG9uIC52anMtaWNvbi1wbGFjZWhvbGRlcjpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjEwY1wiO1xufVxuXG4udmpzLWljb24tY2FwdGlvbnMsIC52aWRlby1qczpsYW5nKGVuKSAudmpzLXN1YnMtY2Fwcy1idXR0b24gLnZqcy1pY29uLXBsYWNlaG9sZGVyLFxuLnZpZGVvLWpzOmxhbmcoZnItQ0EpIC52anMtc3Vicy1jYXBzLWJ1dHRvbiAudmpzLWljb24tcGxhY2Vob2xkZXIsIC52aWRlby1qcyAudmpzLWNhcHRpb25zLWJ1dHRvbiAudmpzLWljb24tcGxhY2Vob2xkZXIge1xuICBmb250LWZhbWlseTogVmlkZW9KUztcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuLnZqcy1pY29uLWNhcHRpb25zOmJlZm9yZSwgLnZpZGVvLWpzOmxhbmcoZW4pIC52anMtc3Vicy1jYXBzLWJ1dHRvbiAudmpzLWljb24tcGxhY2Vob2xkZXI6YmVmb3JlLFxuLnZpZGVvLWpzOmxhbmcoZnItQ0EpIC52anMtc3Vicy1jYXBzLWJ1dHRvbiAudmpzLWljb24tcGxhY2Vob2xkZXI6YmVmb3JlLCAudmlkZW8tanMgLnZqcy1jYXB0aW9ucy1idXR0b24gLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTBkXCI7XG59XG5cbi52anMtaWNvbi1jaGFwdGVycywgLnZpZGVvLWpzIC52anMtY2hhcHRlcnMtYnV0dG9uIC52anMtaWNvbi1wbGFjZWhvbGRlciB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tY2hhcHRlcnM6YmVmb3JlLCAudmlkZW8tanMgLnZqcy1jaGFwdGVycy1idXR0b24gLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTBlXCI7XG59XG5cbi52anMtaWNvbi1zaGFyZSB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tc2hhcmU6YmVmb3JlIHtcbiAgY29udGVudDogXCJcXGYxMGZcIjtcbn1cblxuLnZqcy1pY29uLWNvZyB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tY29nOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTEwXCI7XG59XG5cbi52anMtaWNvbi1jaXJjbGUsIC52anMtc2Vlay10by1saXZlLWNvbnRyb2wgLnZqcy1pY29uLXBsYWNlaG9sZGVyLCAudmlkZW8tanMgLnZqcy12b2x1bWUtbGV2ZWwsIC52aWRlby1qcyAudmpzLXBsYXktcHJvZ3Jlc3Mge1xuICBmb250LWZhbWlseTogVmlkZW9KUztcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuLnZqcy1pY29uLWNpcmNsZTpiZWZvcmUsIC52anMtc2Vlay10by1saXZlLWNvbnRyb2wgLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSwgLnZpZGVvLWpzIC52anMtdm9sdW1lLWxldmVsOmJlZm9yZSwgLnZpZGVvLWpzIC52anMtcGxheS1wcm9ncmVzczpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjExMVwiO1xufVxuXG4udmpzLWljb24tY2lyY2xlLW91dGxpbmUge1xuICBmb250LWZhbWlseTogVmlkZW9KUztcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuLnZqcy1pY29uLWNpcmNsZS1vdXRsaW5lOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTEyXCI7XG59XG5cbi52anMtaWNvbi1jaXJjbGUtaW5uZXItY2lyY2xlIHtcbiAgZm9udC1mYW1pbHk6IFZpZGVvSlM7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbi52anMtaWNvbi1jaXJjbGUtaW5uZXItY2lyY2xlOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTEzXCI7XG59XG5cbi52anMtaWNvbi1oZCB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24taGQ6YmVmb3JlIHtcbiAgY29udGVudDogXCJcXGYxMTRcIjtcbn1cblxuLnZqcy1pY29uLWNhbmNlbCwgLnZpZGVvLWpzIC52anMtY29udHJvbC52anMtY2xvc2UtYnV0dG9uIC52anMtaWNvbi1wbGFjZWhvbGRlciB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tY2FuY2VsOmJlZm9yZSwgLnZpZGVvLWpzIC52anMtY29udHJvbC52anMtY2xvc2UtYnV0dG9uIC52anMtaWNvbi1wbGFjZWhvbGRlcjpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjExNVwiO1xufVxuXG4udmpzLWljb24tcmVwbGF5LCAudmlkZW8tanMgLnZqcy1wbGF5LWNvbnRyb2wudmpzLWVuZGVkIC52anMtaWNvbi1wbGFjZWhvbGRlciB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tcmVwbGF5OmJlZm9yZSwgLnZpZGVvLWpzIC52anMtcGxheS1jb250cm9sLnZqcy1lbmRlZCAudmpzLWljb24tcGxhY2Vob2xkZXI6YmVmb3JlIHtcbiAgY29udGVudDogXCJcXGYxMTZcIjtcbn1cblxuLnZqcy1pY29uLWZhY2Vib29rIHtcbiAgZm9udC1mYW1pbHk6IFZpZGVvSlM7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbi52anMtaWNvbi1mYWNlYm9vazpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjExN1wiO1xufVxuXG4udmpzLWljb24tZ3BsdXMge1xuICBmb250LWZhbWlseTogVmlkZW9KUztcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuLnZqcy1pY29uLWdwbHVzOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTE4XCI7XG59XG5cbi52anMtaWNvbi1saW5rZWRpbiB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tbGlua2VkaW46YmVmb3JlIHtcbiAgY29udGVudDogXCJcXGYxMTlcIjtcbn1cblxuLnZqcy1pY29uLXR3aXR0ZXIge1xuICBmb250LWZhbWlseTogVmlkZW9KUztcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuLnZqcy1pY29uLXR3aXR0ZXI6YmVmb3JlIHtcbiAgY29udGVudDogXCJcXGYxMWFcIjtcbn1cblxuLnZqcy1pY29uLXR1bWJsciB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tdHVtYmxyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTFiXCI7XG59XG5cbi52anMtaWNvbi1waW50ZXJlc3Qge1xuICBmb250LWZhbWlseTogVmlkZW9KUztcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuLnZqcy1pY29uLXBpbnRlcmVzdDpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjExY1wiO1xufVxuXG4udmpzLWljb24tYXVkaW8tZGVzY3JpcHRpb24sIC52aWRlby1qcyAudmpzLWRlc2NyaXB0aW9ucy1idXR0b24gLnZqcy1pY29uLXBsYWNlaG9sZGVyIHtcbiAgZm9udC1mYW1pbHk6IFZpZGVvSlM7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbi52anMtaWNvbi1hdWRpby1kZXNjcmlwdGlvbjpiZWZvcmUsIC52aWRlby1qcyAudmpzLWRlc2NyaXB0aW9ucy1idXR0b24gLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTFkXCI7XG59XG5cbi52anMtaWNvbi1hdWRpbywgLnZpZGVvLWpzIC52anMtYXVkaW8tYnV0dG9uIC52anMtaWNvbi1wbGFjZWhvbGRlciB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tYXVkaW86YmVmb3JlLCAudmlkZW8tanMgLnZqcy1hdWRpby1idXR0b24gLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTFlXCI7XG59XG5cbi52anMtaWNvbi1uZXh0LWl0ZW0ge1xuICBmb250LWZhbWlseTogVmlkZW9KUztcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuLnZqcy1pY29uLW5leHQtaXRlbTpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjExZlwiO1xufVxuXG4udmpzLWljb24tcHJldmlvdXMtaXRlbSB7XG4gIGZvbnQtZmFtaWx5OiBWaWRlb0pTO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG59XG4udmpzLWljb24tcHJldmlvdXMtaXRlbTpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjEyMFwiO1xufVxuXG4udmpzLWljb24tcGljdHVyZS1pbi1waWN0dXJlLWVudGVyLCAudmlkZW8tanMgLnZqcy1waWN0dXJlLWluLXBpY3R1cmUtY29udHJvbCAudmpzLWljb24tcGxhY2Vob2xkZXIge1xuICBmb250LWZhbWlseTogVmlkZW9KUztcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xufVxuLnZqcy1pY29uLXBpY3R1cmUtaW4tcGljdHVyZS1lbnRlcjpiZWZvcmUsIC52aWRlby1qcyAudmpzLXBpY3R1cmUtaW4tcGljdHVyZS1jb250cm9sIC52anMtaWNvbi1wbGFjZWhvbGRlcjpiZWZvcmUge1xuICBjb250ZW50OiBcIlxcZjEyMVwiO1xufVxuXG4udmpzLWljb24tcGljdHVyZS1pbi1waWN0dXJlLWV4aXQsIC52aWRlby1qcy52anMtcGljdHVyZS1pbi1waWN0dXJlIC52anMtcGljdHVyZS1pbi1waWN0dXJlLWNvbnRyb2wgLnZqcy1pY29uLXBsYWNlaG9sZGVyIHtcbiAgZm9udC1mYW1pbHk6IFZpZGVvSlM7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbn1cbi52anMtaWNvbi1waWN0dXJlLWluLXBpY3R1cmUtZXhpdDpiZWZvcmUsIC52aWRlby1qcy52anMtcGljdHVyZS1pbi1waWN0dXJlIC52anMtcGljdHVyZS1pbi1waWN0dXJlLWNvbnRyb2wgLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwiXFxmMTIyXCI7XG59XG5cbi52aWRlby1qcyB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICBwYWRkaW5nOiAwO1xuICBmb250LXNpemU6IDEwcHg7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICB3b3JkLWJyZWFrOiBpbml0aWFsO1xufVxuLnZpZGVvLWpzOi1tb3otZnVsbC1zY3JlZW4ge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG4udmlkZW8tanM6LXdlYmtpdC1mdWxsLXNjcmVlbiB7XG4gIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogMTAwJSAhaW1wb3J0YW50O1xufVxuXG4udmlkZW8tanNbdGFiaW5kZXg9XCItMVwiXSB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi52aWRlby1qcyAqLFxuLnZpZGVvLWpzICo6YmVmb3JlLFxuLnZpZGVvLWpzICo6YWZ0ZXIge1xuICBib3gtc2l6aW5nOiBpbmhlcml0O1xufVxuXG4udmlkZW8tanMgdWwge1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xuICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgbGlzdC1zdHlsZS1wb3NpdGlvbjogb3V0c2lkZTtcbiAgbWFyZ2luLWxlZnQ6IDA7XG4gIG1hcmdpbi1yaWdodDogMDtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxuLnZpZGVvLWpzLnZqcy1mbHVpZCxcbi52aWRlby1qcy52anMtMTYtOSxcbi52aWRlby1qcy52anMtNC0zLFxuLnZpZGVvLWpzLnZqcy05LTE2LFxuLnZpZGVvLWpzLnZqcy0xLTEge1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDA7XG59XG5cbi52aWRlby1qcy52anMtMTYtOSB7XG4gIHBhZGRpbmctdG9wOiA1Ni4yNSU7XG59XG5cbi52aWRlby1qcy52anMtNC0zIHtcbiAgcGFkZGluZy10b3A6IDc1JTtcbn1cblxuLnZpZGVvLWpzLnZqcy05LTE2IHtcbiAgcGFkZGluZy10b3A6IDE3Ny43Nzc3Nzc3Nzc4JTtcbn1cblxuLnZpZGVvLWpzLnZqcy0xLTEge1xuICBwYWRkaW5nLXRvcDogMTAwJTtcbn1cblxuLnZpZGVvLWpzLnZqcy1maWxsIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLnZpZGVvLWpzIC52anMtdGVjaCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG5ib2R5LnZqcy1mdWxsLXdpbmRvdyB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4udmpzLWZ1bGwtd2luZG93IC52aWRlby1qcy52anMtZnVsbHNjcmVlbiB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgei1pbmRleDogMTAwMDtcbiAgbGVmdDogMDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIHJpZ2h0OiAwO1xufVxuXG4udmlkZW8tanMudmpzLWZ1bGxzY3JlZW46bm90KC52anMtaW9zLW5hdGl2ZS1mcykge1xuICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDEwMCUgIWltcG9ydGFudDtcbiAgcGFkZGluZy10b3A6IDAgIWltcG9ydGFudDtcbn1cblxuLnZpZGVvLWpzLnZqcy1mdWxsc2NyZWVuLnZqcy11c2VyLWluYWN0aXZlIHtcbiAgY3Vyc29yOiBub25lO1xufVxuXG4udmpzLWhpZGRlbiB7XG4gIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbn1cblxuLnZqcy1kaXNhYmxlZCB7XG4gIG9wYWNpdHk6IDAuNTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4udmlkZW8tanMgLnZqcy1vZmZzY3JlZW4ge1xuICBoZWlnaHQ6IDFweDtcbiAgbGVmdDogLTk5OTlweDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHdpZHRoOiAxcHg7XG59XG5cbi52anMtbG9jay1zaG93aW5nIHtcbiAgZGlzcGxheTogYmxvY2sgIWltcG9ydGFudDtcbiAgb3BhY2l0eTogMSAhaW1wb3J0YW50O1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlICFpbXBvcnRhbnQ7XG59XG5cbi52anMtbm8tanMge1xuICBwYWRkaW5nOiAyMHB4O1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgZm9udC1zaXplOiAxOHB4O1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMzAwcHg7XG4gIGhlaWdodDogMTUwcHg7XG4gIG1hcmdpbjogMHB4IGF1dG87XG59XG5cbi52anMtbm8tanMgYSxcbi52anMtbm8tanMgYTp2aXNpdGVkIHtcbiAgY29sb3I6ICM2NkE4Q0M7XG59XG5cbi52aWRlby1qcyAudmpzLWJpZy1wbGF5LWJ1dHRvbiB7XG4gIGZvbnQtc2l6ZTogM2VtO1xuICBsaW5lLWhlaWdodDogMS41ZW07XG4gIGhlaWdodDogMS42MzMzMmVtO1xuICB3aWR0aDogM2VtO1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDEwcHg7XG4gIGxlZnQ6IDEwcHg7XG4gIHBhZGRpbmc6IDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgb3BhY2l0eTogMTtcbiAgYm9yZGVyOiAwLjA2NjY2ZW0gc29saWQgI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJCMzMzRjtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MywgNTEsIDYzLCAwLjcpO1xuICBib3JkZXItcmFkaXVzOiAwLjNlbTtcbiAgdHJhbnNpdGlvbjogYWxsIDAuNHM7XG59XG4udmpzLWJpZy1wbGF5LWNlbnRlcmVkIC52anMtYmlnLXBsYXktYnV0dG9uIHtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgbWFyZ2luLXRvcDogLTAuODE2NjZlbTtcbiAgbWFyZ2luLWxlZnQ6IC0xLjVlbTtcbn1cblxuLnZpZGVvLWpzOmhvdmVyIC52anMtYmlnLXBsYXktYnV0dG9uLFxuLnZpZGVvLWpzIC52anMtYmlnLXBsYXktYnV0dG9uOmZvY3VzIHtcbiAgYm9yZGVyLWNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzM4NTlmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDExNSwgMTMzLCAxNTksIDAuNSk7XG4gIHRyYW5zaXRpb246IGFsbCAwcztcbn1cblxuLnZqcy1jb250cm9scy1kaXNhYmxlZCAudmpzLWJpZy1wbGF5LWJ1dHRvbixcbi52anMtaGFzLXN0YXJ0ZWQgLnZqcy1iaWctcGxheS1idXR0b24sXG4udmpzLXVzaW5nLW5hdGl2ZS1jb250cm9scyAudmpzLWJpZy1wbGF5LWJ1dHRvbixcbi52anMtZXJyb3IgLnZqcy1iaWctcGxheS1idXR0b24ge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4udmpzLWhhcy1zdGFydGVkLnZqcy1wYXVzZWQudmpzLXNob3ctYmlnLXBsYXktYnV0dG9uLW9uLXBhdXNlIC52anMtYmlnLXBsYXktYnV0dG9uIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi52aWRlby1qcyBidXR0b24ge1xuICBiYWNrZ3JvdW5kOiBub25lO1xuICBib3JkZXI6IG5vbmU7XG4gIGNvbG9yOiBpbmhlcml0O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIGZvbnQtc2l6ZTogaW5oZXJpdDtcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIHRyYW5zaXRpb246IG5vbmU7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xuICBhcHBlYXJhbmNlOiBub25lO1xufVxuXG4udmpzLWNvbnRyb2wgLnZqcy1idXR0b24ge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4udmlkZW8tanMgLnZqcy1jb250cm9sLnZqcy1jbG9zZS1idXR0b24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGhlaWdodDogM2VtO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDAuNWVtO1xuICB6LWluZGV4OiAyO1xufVxuLnZpZGVvLWpzIC52anMtbW9kYWwtZGlhbG9nIHtcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjgpO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCByZ2JhKDAsIDAsIDAsIDAuOCksIHJnYmEoMjU1LCAyNTUsIDI1NSwgMCkpO1xuICBvdmVyZmxvdzogYXV0bztcbn1cblxuLnZpZGVvLWpzIC52anMtbW9kYWwtZGlhbG9nID4gKiB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbi52anMtbW9kYWwtZGlhbG9nIC52anMtbW9kYWwtZGlhbG9nLWNvbnRlbnQge1xuICBmb250LXNpemU6IDEuMmVtO1xuICBsaW5lLWhlaWdodDogMS41O1xuICBwYWRkaW5nOiAyMHB4IDI0cHg7XG4gIHotaW5kZXg6IDE7XG59XG5cbi52anMtbWVudS1idXR0b24ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi52anMtbWVudS1idXR0b24udmpzLWRpc2FibGVkIHtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4udmpzLXdvcmtpbmdob3ZlciAudmpzLW1lbnUtYnV0dG9uLnZqcy1kaXNhYmxlZDpob3ZlciAudmpzLW1lbnUge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4udmpzLW1lbnUgLnZqcy1tZW51LWNvbnRlbnQge1xuICBkaXNwbGF5OiBibG9jaztcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwO1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgb3ZlcmZsb3c6IGF1dG87XG59XG5cbi52anMtbWVudSAudmpzLW1lbnUtY29udGVudCA+ICoge1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4udmpzLXNjcnViYmluZyAudmpzLWNvbnRyb2wudmpzLW1lbnUtYnV0dG9uOmhvdmVyIC52anMtbWVudSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi52anMtbWVudSBsaSB7XG4gIGxpc3Qtc3R5bGU6IG5vbmU7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMC4yZW0gMDtcbiAgbGluZS1oZWlnaHQ6IDEuNGVtO1xuICBmb250LXNpemU6IDEuMmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHRleHQtdHJhbnNmb3JtOiBsb3dlcmNhc2U7XG59XG5cbi52anMtbWVudSBsaS52anMtbWVudS1pdGVtOmZvY3VzLFxuLnZqcy1tZW51IGxpLnZqcy1tZW51LWl0ZW06aG92ZXIsXG4uanMtZm9jdXMtdmlzaWJsZSAudmpzLW1lbnUgbGkudmpzLW1lbnUtaXRlbTpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM3Mzg1OWY7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTE1LCAxMzMsIDE1OSwgMC41KTtcbn1cblxuLnZqcy1tZW51IGxpLnZqcy1zZWxlY3RlZCxcbi52anMtbWVudSBsaS52anMtc2VsZWN0ZWQ6Zm9jdXMsXG4udmpzLW1lbnUgbGkudmpzLXNlbGVjdGVkOmhvdmVyLFxuLmpzLWZvY3VzLXZpc2libGUgLnZqcy1tZW51IGxpLnZqcy1zZWxlY3RlZDpob3ZlciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGNvbG9yOiAjMkIzMzNGO1xufVxuXG4udmlkZW8tanMgLnZqcy1tZW51ICo6bm90KC52anMtc2VsZWN0ZWQpOmZvY3VzOm5vdCg6Zm9jdXMtdmlzaWJsZSksXG4uanMtZm9jdXMtdmlzaWJsZSAudmpzLW1lbnUgKjpub3QoLnZqcy1zZWxlY3RlZCk6Zm9jdXM6bm90KC5mb2N1cy12aXNpYmxlKSB7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG59XG5cbi52anMtbWVudSBsaS52anMtbWVudS10aXRsZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgZm9udC1zaXplOiAxZW07XG4gIGxpbmUtaGVpZ2h0OiAyZW07XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbjogMCAwIDAuM2VtIDA7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi52anMtbWVudS1idXR0b24tcG9wdXAgLnZqcy1tZW51IHtcbiAgZGlzcGxheTogbm9uZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIHdpZHRoOiAxMGVtO1xuICBsZWZ0OiAtM2VtO1xuICBoZWlnaHQ6IDBlbTtcbiAgbWFyZ2luLWJvdHRvbTogMS41ZW07XG4gIGJvcmRlci10b3AtY29sb3I6IHJnYmEoNDMsIDUxLCA2MywgMC43KTtcbn1cblxuLnZqcy1tZW51LWJ1dHRvbi1wb3B1cCAudmpzLW1lbnUgLnZqcy1tZW51LWNvbnRlbnQge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMkIzMzNGO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDQzLCA1MSwgNjMsIDAuNyk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIGJvdHRvbTogMS41ZW07XG4gIG1heC1oZWlnaHQ6IDE1ZW07XG59XG5cbi52anMtbGF5b3V0LXRpbnkgLnZqcy1tZW51LWJ1dHRvbi1wb3B1cCAudmpzLW1lbnUgLnZqcy1tZW51LWNvbnRlbnQsXG4udmpzLWxheW91dC14LXNtYWxsIC52anMtbWVudS1idXR0b24tcG9wdXAgLnZqcy1tZW51IC52anMtbWVudS1jb250ZW50IHtcbiAgbWF4LWhlaWdodDogNWVtO1xufVxuXG4udmpzLWxheW91dC1zbWFsbCAudmpzLW1lbnUtYnV0dG9uLXBvcHVwIC52anMtbWVudSAudmpzLW1lbnUtY29udGVudCB7XG4gIG1heC1oZWlnaHQ6IDEwZW07XG59XG5cbi52anMtbGF5b3V0LW1lZGl1bSAudmpzLW1lbnUtYnV0dG9uLXBvcHVwIC52anMtbWVudSAudmpzLW1lbnUtY29udGVudCB7XG4gIG1heC1oZWlnaHQ6IDE0ZW07XG59XG5cbi52anMtbGF5b3V0LWxhcmdlIC52anMtbWVudS1idXR0b24tcG9wdXAgLnZqcy1tZW51IC52anMtbWVudS1jb250ZW50LFxuLnZqcy1sYXlvdXQteC1sYXJnZSAudmpzLW1lbnUtYnV0dG9uLXBvcHVwIC52anMtbWVudSAudmpzLW1lbnUtY29udGVudCxcbi52anMtbGF5b3V0LWh1Z2UgLnZqcy1tZW51LWJ1dHRvbi1wb3B1cCAudmpzLW1lbnUgLnZqcy1tZW51LWNvbnRlbnQge1xuICBtYXgtaGVpZ2h0OiAyNWVtO1xufVxuXG4udmpzLXdvcmtpbmdob3ZlciAudmpzLW1lbnUtYnV0dG9uLXBvcHVwLnZqcy1ob3ZlciAudmpzLW1lbnUsXG4udmpzLW1lbnUtYnV0dG9uLXBvcHVwIC52anMtbWVudS52anMtbG9jay1zaG93aW5nIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbi52aWRlby1qcyAudmpzLW1lbnUtYnV0dG9uLWlubGluZSB7XG4gIHRyYW5zaXRpb246IGFsbCAwLjRzO1xuICBvdmVyZmxvdzogaGlkZGVuO1xufVxuXG4udmlkZW8tanMgLnZqcy1tZW51LWJ1dHRvbi1pbmxpbmU6YmVmb3JlIHtcbiAgd2lkdGg6IDIuMjIyMjIyMjIyZW07XG59XG5cbi52aWRlby1qcyAudmpzLW1lbnUtYnV0dG9uLWlubGluZTpob3Zlcixcbi52aWRlby1qcyAudmpzLW1lbnUtYnV0dG9uLWlubGluZTpmb2N1cyxcbi52aWRlby1qcyAudmpzLW1lbnUtYnV0dG9uLWlubGluZS52anMtc2xpZGVyLWFjdGl2ZSxcbi52aWRlby1qcy52anMtbm8tZmxleCAudmpzLW1lbnUtYnV0dG9uLWlubGluZSB7XG4gIHdpZHRoOiAxMmVtO1xufVxuXG4udmpzLW1lbnUtYnV0dG9uLWlubGluZSAudmpzLW1lbnUge1xuICBvcGFjaXR5OiAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiBhdXRvO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDRlbTtcbiAgdG9wOiAwO1xuICBwYWRkaW5nOiAwO1xuICBtYXJnaW46IDA7XG4gIHRyYW5zaXRpb246IGFsbCAwLjRzO1xufVxuXG4udmpzLW1lbnUtYnV0dG9uLWlubGluZTpob3ZlciAudmpzLW1lbnUsXG4udmpzLW1lbnUtYnV0dG9uLWlubGluZTpmb2N1cyAudmpzLW1lbnUsXG4udmpzLW1lbnUtYnV0dG9uLWlubGluZS52anMtc2xpZGVyLWFjdGl2ZSAudmpzLW1lbnUge1xuICBkaXNwbGF5OiBibG9jaztcbiAgb3BhY2l0eTogMTtcbn1cblxuLnZqcy1uby1mbGV4IC52anMtbWVudS1idXR0b24taW5saW5lIC52anMtbWVudSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBvcGFjaXR5OiAxO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHdpZHRoOiBhdXRvO1xufVxuXG4udmpzLW5vLWZsZXggLnZqcy1tZW51LWJ1dHRvbi1pbmxpbmU6aG92ZXIgLnZqcy1tZW51LFxuLnZqcy1uby1mbGV4IC52anMtbWVudS1idXR0b24taW5saW5lOmZvY3VzIC52anMtbWVudSxcbi52anMtbm8tZmxleCAudmpzLW1lbnUtYnV0dG9uLWlubGluZS52anMtc2xpZGVyLWFjdGl2ZSAudmpzLW1lbnUge1xuICB3aWR0aDogYXV0bztcbn1cblxuLnZqcy1tZW51LWJ1dHRvbi1pbmxpbmUgLnZqcy1tZW51LWNvbnRlbnQge1xuICB3aWR0aDogYXV0bztcbiAgaGVpZ2h0OiAxMDAlO1xuICBtYXJnaW46IDA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi52aWRlby1qcyAudmpzLWNvbnRyb2wtYmFyIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgd2lkdGg6IDEwMCU7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgaGVpZ2h0OiAzZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICMyQjMzM0Y7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNDMsIDUxLCA2MywgMC43KTtcbn1cblxuLnZqcy1oYXMtc3RhcnRlZCAudmpzLWNvbnRyb2wtYmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgb3BhY2l0eTogMTtcbiAgdHJhbnNpdGlvbjogdmlzaWJpbGl0eSAwLjFzLCBvcGFjaXR5IDAuMXM7XG59XG5cbi52anMtaGFzLXN0YXJ0ZWQudmpzLXVzZXItaW5hY3RpdmUudmpzLXBsYXlpbmcgLnZqcy1jb250cm9sLWJhciB7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIG9wYWNpdHk6IDA7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB0cmFuc2l0aW9uOiB2aXNpYmlsaXR5IDFzLCBvcGFjaXR5IDFzO1xufVxuXG4udmpzLWNvbnRyb2xzLWRpc2FibGVkIC52anMtY29udHJvbC1iYXIsXG4udmpzLXVzaW5nLW5hdGl2ZS1jb250cm9scyAudmpzLWNvbnRyb2wtYmFyLFxuLnZqcy1lcnJvciAudmpzLWNvbnRyb2wtYmFyIHtcbiAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xufVxuXG4udmpzLWF1ZGlvLnZqcy1oYXMtc3RhcnRlZC52anMtdXNlci1pbmFjdGl2ZS52anMtcGxheWluZyAudmpzLWNvbnRyb2wtYmFyIHtcbiAgb3BhY2l0eTogMTtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cblxuLnZqcy1oYXMtc3RhcnRlZC52anMtbm8tZmxleCAudmpzLWNvbnRyb2wtYmFyIHtcbiAgZGlzcGxheTogdGFibGU7XG59XG5cbi52aWRlby1qcyAudmpzLWNvbnRyb2wge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiA0ZW07XG4gIGZsZXg6IG5vbmU7XG59XG5cbi52anMtYnV0dG9uID4gLnZqcy1pY29uLXBsYWNlaG9sZGVyOmJlZm9yZSB7XG4gIGZvbnQtc2l6ZTogMS44ZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjY3O1xufVxuXG4udmpzLWJ1dHRvbiA+IC52anMtaWNvbi1wbGFjZWhvbGRlciB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4udmlkZW8tanMgLnZqcy1jb250cm9sOmZvY3VzOmJlZm9yZSxcbi52aWRlby1qcyAudmpzLWNvbnRyb2w6aG92ZXI6YmVmb3JlLFxuLnZpZGVvLWpzIC52anMtY29udHJvbDpmb2N1cyB7XG4gIHRleHQtc2hhZG93OiAwZW0gMGVtIDFlbSB3aGl0ZTtcbn1cblxuLnZpZGVvLWpzIC52anMtY29udHJvbC10ZXh0IHtcbiAgYm9yZGVyOiAwO1xuICBjbGlwOiByZWN0KDAgMCAwIDApO1xuICBoZWlnaHQ6IDFweDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgcGFkZGluZzogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMXB4O1xufVxuXG4udmpzLW5vLWZsZXggLnZqcy1jb250cm9sIHtcbiAgZGlzcGxheTogdGFibGUtY2VsbDtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuLnZpZGVvLWpzIC52anMtY3VzdG9tLWNvbnRyb2wtc3BhY2VyIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnZpZGVvLWpzIC52anMtcHJvZ3Jlc3MtY29udHJvbCB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZmxleDogYXV0bztcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLXdpZHRoOiA0ZW07XG4gIHRvdWNoLWFjdGlvbjogbm9uZTtcbn1cblxuLnZpZGVvLWpzIC52anMtcHJvZ3Jlc3MtY29udHJvbC5kaXNhYmxlZCB7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLnZqcy1saXZlIC52anMtcHJvZ3Jlc3MtY29udHJvbCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi52anMtbGl2ZXVpIC52anMtcHJvZ3Jlc3MtY29udHJvbCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi52anMtbm8tZmxleCAudmpzLXByb2dyZXNzLWNvbnRyb2wge1xuICB3aWR0aDogYXV0bztcbn1cblxuLnZpZGVvLWpzIC52anMtcHJvZ3Jlc3MtaG9sZGVyIHtcbiAgZmxleDogYXV0bztcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnM7XG4gIGhlaWdodDogMC4zZW07XG59XG5cbi52aWRlby1qcyAudmpzLXByb2dyZXNzLWNvbnRyb2wgLnZqcy1wcm9ncmVzcy1ob2xkZXIge1xuICBtYXJnaW46IDAgMTBweDtcbn1cblxuLnZpZGVvLWpzIC52anMtcHJvZ3Jlc3MtY29udHJvbDpob3ZlciAudmpzLXByb2dyZXNzLWhvbGRlciB7XG4gIGZvbnQtc2l6ZTogMS42NjY2NjY2NjY3ZW07XG59XG5cbi52aWRlby1qcyAudmpzLXByb2dyZXNzLWNvbnRyb2w6aG92ZXIgLnZqcy1wcm9ncmVzcy1ob2xkZXIuZGlzYWJsZWQge1xuICBmb250LXNpemU6IDFlbTtcbn1cblxuLnZpZGVvLWpzIC52anMtcHJvZ3Jlc3MtaG9sZGVyIC52anMtcGxheS1wcm9ncmVzcyxcbi52aWRlby1qcyAudmpzLXByb2dyZXNzLWhvbGRlciAudmpzLWxvYWQtcHJvZ3Jlc3MsXG4udmlkZW8tanMgLnZqcy1wcm9ncmVzcy1ob2xkZXIgLnZqcy1sb2FkLXByb2dyZXNzIGRpdiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGhlaWdodDogMTAwJTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICB3aWR0aDogMDtcbn1cblxuLnZpZGVvLWpzIC52anMtcGxheS1wcm9ncmVzcyB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG59XG4udmlkZW8tanMgLnZqcy1wbGF5LXByb2dyZXNzOmJlZm9yZSB7XG4gIGZvbnQtc2l6ZTogMC45ZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcmlnaHQ6IC0wLjVlbTtcbiAgdG9wOiAtMC4zMzMzMzMzMzMzZW07XG4gIHotaW5kZXg6IDE7XG59XG5cbi52aWRlby1qcyAudmpzLWxvYWQtcHJvZ3Jlc3Mge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDExNSwgMTMzLCAxNTksIDAuNSk7XG59XG5cbi52aWRlby1qcyAudmpzLWxvYWQtcHJvZ3Jlc3MgZGl2IHtcbiAgYmFja2dyb3VuZDogcmdiYSgxMTUsIDEzMywgMTU5LCAwLjc1KTtcbn1cblxuLnZpZGVvLWpzIC52anMtdGltZS10b29sdGlwIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjgpO1xuICBib3JkZXItcmFkaXVzOiAwLjNlbTtcbiAgY29sb3I6ICMwMDA7XG4gIGZsb2F0OiByaWdodDtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMWVtO1xuICBwYWRkaW5nOiA2cHggOHB4IDhweCA4cHg7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogLTMuNGVtO1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIHotaW5kZXg6IDE7XG59XG5cbi52aWRlby1qcyAudmpzLXByb2dyZXNzLWhvbGRlcjpmb2N1cyAudmpzLXRpbWUtdG9vbHRpcCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi52aWRlby1qcyAudmpzLXByb2dyZXNzLWNvbnRyb2w6aG92ZXIgLnZqcy10aW1lLXRvb2x0aXAsXG4udmlkZW8tanMgLnZqcy1wcm9ncmVzcy1jb250cm9sOmhvdmVyIC52anMtcHJvZ3Jlc3MtaG9sZGVyOmZvY3VzIC52anMtdGltZS10b29sdGlwIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtc2l6ZTogMC42ZW07XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG59XG5cbi52aWRlby1qcyAudmpzLXByb2dyZXNzLWNvbnRyb2wuZGlzYWJsZWQ6aG92ZXIgLnZqcy10aW1lLXRvb2x0aXAge1xuICBmb250LXNpemU6IDFlbTtcbn1cblxuLnZpZGVvLWpzIC52anMtcHJvZ3Jlc3MtY29udHJvbCAudmpzLW1vdXNlLWRpc3BsYXkge1xuICBkaXNwbGF5OiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxcHg7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgei1pbmRleDogMTtcbn1cblxuLnZqcy1uby1mbGV4IC52anMtcHJvZ3Jlc3MtY29udHJvbCAudmpzLW1vdXNlLWRpc3BsYXkge1xuICB6LWluZGV4OiAwO1xufVxuXG4udmlkZW8tanMgLnZqcy1wcm9ncmVzcy1jb250cm9sOmhvdmVyIC52anMtbW91c2UtZGlzcGxheSB7XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuXG4udmlkZW8tanMudmpzLXVzZXItaW5hY3RpdmUgLnZqcy1wcm9ncmVzcy1jb250cm9sIC52anMtbW91c2UtZGlzcGxheSB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogdmlzaWJpbGl0eSAxcywgb3BhY2l0eSAxcztcbn1cblxuLnZpZGVvLWpzLnZqcy11c2VyLWluYWN0aXZlLnZqcy1uby1mbGV4IC52anMtcHJvZ3Jlc3MtY29udHJvbCAudmpzLW1vdXNlLWRpc3BsYXkge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4udmpzLW1vdXNlLWRpc3BsYXkgLnZqcy10aW1lLXRvb2x0aXAge1xuICBjb2xvcjogI2ZmZjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xufVxuXG4udmlkZW8tanMgLnZqcy1zbGlkZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgcGFkZGluZzogMDtcbiAgbWFyZ2luOiAwIDAuNDVlbSAwIDAuNDVlbTtcbiAgLyogaU9TIFNhZmFyaSAqL1xuICAtd2Via2l0LXRvdWNoLWNhbGxvdXQ6IG5vbmU7XG4gIC8qIFNhZmFyaSAqL1xuICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAvKiBLb25xdWVyb3IgSFRNTCAqL1xuICAvKiBGaXJlZm94ICovXG4gIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gIC8qIEludGVybmV0IEV4cGxvcmVyL0VkZ2UgKi9cbiAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAvKiBOb24tcHJlZml4ZWQgdmVyc2lvbiwgY3VycmVudGx5IHN1cHBvcnRlZCBieSBDaHJvbWUgYW5kIE9wZXJhICovXG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzM4NTlmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDExNSwgMTMzLCAxNTksIDAuNSk7XG59XG5cbi52aWRlby1qcyAudmpzLXNsaWRlci5kaXNhYmxlZCB7XG4gIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLnZpZGVvLWpzIC52anMtc2xpZGVyOmZvY3VzIHtcbiAgdGV4dC1zaGFkb3c6IDBlbSAwZW0gMWVtIHdoaXRlO1xuICBib3gtc2hhZG93OiAwIDAgMWVtICNmZmY7XG59XG5cbi52aWRlby1qcyAudmpzLW11dGUtY29udHJvbCB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZmxleDogbm9uZTtcbn1cbi52aWRlby1qcyAudmpzLXZvbHVtZS1jb250cm9sIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBtYXJnaW4tcmlnaHQ6IDFlbTtcbiAgZGlzcGxheTogZmxleDtcbn1cblxuLnZpZGVvLWpzIC52anMtdm9sdW1lLWNvbnRyb2wudmpzLXZvbHVtZS1ob3Jpem9udGFsIHtcbiAgd2lkdGg6IDVlbTtcbn1cblxuLnZpZGVvLWpzIC52anMtdm9sdW1lLXBhbmVsIC52anMtdm9sdW1lLWNvbnRyb2wge1xuICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICBvcGFjaXR5OiAwO1xuICB3aWR0aDogMXB4O1xuICBoZWlnaHQ6IDFweDtcbiAgbWFyZ2luLWxlZnQ6IC0xcHg7XG59XG5cbi52aWRlby1qcyAudmpzLXZvbHVtZS1wYW5lbCB7XG4gIHRyYW5zaXRpb246IHdpZHRoIDFzO1xufVxuLnZpZGVvLWpzIC52anMtdm9sdW1lLXBhbmVsLnZqcy1ob3ZlciAudmpzLXZvbHVtZS1jb250cm9sLCAudmlkZW8tanMgLnZqcy12b2x1bWUtcGFuZWw6YWN0aXZlIC52anMtdm9sdW1lLWNvbnRyb2wsIC52aWRlby1qcyAudmpzLXZvbHVtZS1wYW5lbDpmb2N1cyAudmpzLXZvbHVtZS1jb250cm9sLCAudmlkZW8tanMgLnZqcy12b2x1bWUtcGFuZWwgLnZqcy12b2x1bWUtY29udHJvbDphY3RpdmUsIC52aWRlby1qcyAudmpzLXZvbHVtZS1wYW5lbC52anMtaG92ZXIgLnZqcy1tdXRlLWNvbnRyb2wgfiAudmpzLXZvbHVtZS1jb250cm9sLCAudmlkZW8tanMgLnZqcy12b2x1bWUtcGFuZWwgLnZqcy12b2x1bWUtY29udHJvbC52anMtc2xpZGVyLWFjdGl2ZSB7XG4gIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIG9wYWNpdHk6IDE7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdHJhbnNpdGlvbjogdmlzaWJpbGl0eSAwLjFzLCBvcGFjaXR5IDAuMXMsIGhlaWdodCAwLjFzLCB3aWR0aCAwLjFzLCBsZWZ0IDBzLCB0b3AgMHM7XG59XG4udmlkZW8tanMgLnZqcy12b2x1bWUtcGFuZWwudmpzLWhvdmVyIC52anMtdm9sdW1lLWNvbnRyb2wudmpzLXZvbHVtZS1ob3Jpem9udGFsLCAudmlkZW8tanMgLnZqcy12b2x1bWUtcGFuZWw6YWN0aXZlIC52anMtdm9sdW1lLWNvbnRyb2wudmpzLXZvbHVtZS1ob3Jpem9udGFsLCAudmlkZW8tanMgLnZqcy12b2x1bWUtcGFuZWw6Zm9jdXMgLnZqcy12b2x1bWUtY29udHJvbC52anMtdm9sdW1lLWhvcml6b250YWwsIC52aWRlby1qcyAudmpzLXZvbHVtZS1wYW5lbCAudmpzLXZvbHVtZS1jb250cm9sOmFjdGl2ZS52anMtdm9sdW1lLWhvcml6b250YWwsIC52aWRlby1qcyAudmpzLXZvbHVtZS1wYW5lbC52anMtaG92ZXIgLnZqcy1tdXRlLWNvbnRyb2wgfiAudmpzLXZvbHVtZS1jb250cm9sLnZqcy12b2x1bWUtaG9yaXpvbnRhbCwgLnZpZGVvLWpzIC52anMtdm9sdW1lLXBhbmVsIC52anMtdm9sdW1lLWNvbnRyb2wudmpzLXNsaWRlci1hY3RpdmUudmpzLXZvbHVtZS1ob3Jpem9udGFsIHtcbiAgd2lkdGg6IDVlbTtcbiAgaGVpZ2h0OiAzZW07XG4gIG1hcmdpbi1yaWdodDogMDtcbn1cbi52aWRlby1qcyAudmpzLXZvbHVtZS1wYW5lbC52anMtaG92ZXIgLnZqcy12b2x1bWUtY29udHJvbC52anMtdm9sdW1lLXZlcnRpY2FsLCAudmlkZW8tanMgLnZqcy12b2x1bWUtcGFuZWw6YWN0aXZlIC52anMtdm9sdW1lLWNvbnRyb2wudmpzLXZvbHVtZS12ZXJ0aWNhbCwgLnZpZGVvLWpzIC52anMtdm9sdW1lLXBhbmVsOmZvY3VzIC52anMtdm9sdW1lLWNvbnRyb2wudmpzLXZvbHVtZS12ZXJ0aWNhbCwgLnZpZGVvLWpzIC52anMtdm9sdW1lLXBhbmVsIC52anMtdm9sdW1lLWNvbnRyb2w6YWN0aXZlLnZqcy12b2x1bWUtdmVydGljYWwsIC52aWRlby1qcyAudmpzLXZvbHVtZS1wYW5lbC52anMtaG92ZXIgLnZqcy1tdXRlLWNvbnRyb2wgfiAudmpzLXZvbHVtZS1jb250cm9sLnZqcy12b2x1bWUtdmVydGljYWwsIC52aWRlby1qcyAudmpzLXZvbHVtZS1wYW5lbCAudmpzLXZvbHVtZS1jb250cm9sLnZqcy1zbGlkZXItYWN0aXZlLnZqcy12b2x1bWUtdmVydGljYWwge1xuICBsZWZ0OiAtMy41ZW07XG4gIHRyYW5zaXRpb246IGxlZnQgMHM7XG59XG4udmlkZW8tanMgLnZqcy12b2x1bWUtcGFuZWwudmpzLXZvbHVtZS1wYW5lbC1ob3Jpem9udGFsLnZqcy1ob3ZlciwgLnZpZGVvLWpzIC52anMtdm9sdW1lLXBhbmVsLnZqcy12b2x1bWUtcGFuZWwtaG9yaXpvbnRhbDphY3RpdmUsIC52aWRlby1qcyAudmpzLXZvbHVtZS1wYW5lbC52anMtdm9sdW1lLXBhbmVsLWhvcml6b250YWwudmpzLXNsaWRlci1hY3RpdmUge1xuICB3aWR0aDogMTBlbTtcbiAgdHJhbnNpdGlvbjogd2lkdGggMC4xcztcbn1cbi52aWRlby1qcyAudmpzLXZvbHVtZS1wYW5lbC52anMtdm9sdW1lLXBhbmVsLWhvcml6b250YWwudmpzLW11dGUtdG9nZ2xlLW9ubHkge1xuICB3aWR0aDogNGVtO1xufVxuXG4udmlkZW8tanMgLnZqcy12b2x1bWUtcGFuZWwgLnZqcy12b2x1bWUtY29udHJvbC52anMtdm9sdW1lLXZlcnRpY2FsIHtcbiAgaGVpZ2h0OiA4ZW07XG4gIHdpZHRoOiAzZW07XG4gIGxlZnQ6IC0zMDAwZW07XG4gIHRyYW5zaXRpb246IHZpc2liaWxpdHkgMXMsIG9wYWNpdHkgMXMsIGhlaWdodCAxcyAxcywgd2lkdGggMXMgMXMsIGxlZnQgMXMgMXMsIHRvcCAxcyAxcztcbn1cblxuLnZpZGVvLWpzIC52anMtdm9sdW1lLXBhbmVsIC52anMtdm9sdW1lLWNvbnRyb2wudmpzLXZvbHVtZS1ob3Jpem9udGFsIHtcbiAgdHJhbnNpdGlvbjogdmlzaWJpbGl0eSAxcywgb3BhY2l0eSAxcywgaGVpZ2h0IDFzIDFzLCB3aWR0aCAxcywgbGVmdCAxcyAxcywgdG9wIDFzIDFzO1xufVxuXG4udmlkZW8tanMudmpzLW5vLWZsZXggLnZqcy12b2x1bWUtcGFuZWwgLnZqcy12b2x1bWUtY29udHJvbC52anMtdm9sdW1lLWhvcml6b250YWwge1xuICB3aWR0aDogNWVtO1xuICBoZWlnaHQ6IDNlbTtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbiAgb3BhY2l0eTogMTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB0cmFuc2l0aW9uOiBub25lO1xufVxuXG4udmlkZW8tanMudmpzLW5vLWZsZXggLnZqcy12b2x1bWUtY29udHJvbC52anMtdm9sdW1lLXZlcnRpY2FsLFxuLnZpZGVvLWpzLnZqcy1uby1mbGV4IC52anMtdm9sdW1lLXBhbmVsIC52anMtdm9sdW1lLWNvbnRyb2wudmpzLXZvbHVtZS12ZXJ0aWNhbCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAzZW07XG4gIGxlZnQ6IDAuNWVtO1xufVxuXG4udmlkZW8tanMgLnZqcy12b2x1bWUtcGFuZWwge1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4udmlkZW8tanMgLnZqcy12b2x1bWUtYmFyIHtcbiAgbWFyZ2luOiAxLjM1ZW0gMC40NWVtO1xufVxuXG4udmpzLXZvbHVtZS1iYXIudmpzLXNsaWRlci1ob3Jpem9udGFsIHtcbiAgd2lkdGg6IDVlbTtcbiAgaGVpZ2h0OiAwLjNlbTtcbn1cblxuLnZqcy12b2x1bWUtYmFyLnZqcy1zbGlkZXItdmVydGljYWwge1xuICB3aWR0aDogMC4zZW07XG4gIGhlaWdodDogNWVtO1xuICBtYXJnaW46IDEuMzVlbSBhdXRvO1xufVxuXG4udmlkZW8tanMgLnZqcy12b2x1bWUtbGV2ZWwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbn1cbi52aWRlby1qcyAudmpzLXZvbHVtZS1sZXZlbDpiZWZvcmUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGZvbnQtc2l6ZTogMC45ZW07XG4gIHotaW5kZXg6IDE7XG59XG5cbi52anMtc2xpZGVyLXZlcnRpY2FsIC52anMtdm9sdW1lLWxldmVsIHtcbiAgd2lkdGg6IDAuM2VtO1xufVxuLnZqcy1zbGlkZXItdmVydGljYWwgLnZqcy12b2x1bWUtbGV2ZWw6YmVmb3JlIHtcbiAgdG9wOiAtMC41ZW07XG4gIGxlZnQ6IC0wLjNlbTtcbiAgei1pbmRleDogMTtcbn1cblxuLnZqcy1zbGlkZXItaG9yaXpvbnRhbCAudmpzLXZvbHVtZS1sZXZlbCB7XG4gIGhlaWdodDogMC4zZW07XG59XG4udmpzLXNsaWRlci1ob3Jpem9udGFsIC52anMtdm9sdW1lLWxldmVsOmJlZm9yZSB7XG4gIHRvcDogLTAuM2VtO1xuICByaWdodDogLTAuNWVtO1xufVxuXG4udmlkZW8tanMgLnZqcy12b2x1bWUtcGFuZWwudmpzLXZvbHVtZS1wYW5lbC12ZXJ0aWNhbCB7XG4gIHdpZHRoOiA0ZW07XG59XG5cbi52anMtdm9sdW1lLWJhci52anMtc2xpZGVyLXZlcnRpY2FsIC52anMtdm9sdW1lLWxldmVsIHtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4udmpzLXZvbHVtZS1iYXIudmpzLXNsaWRlci1ob3Jpem9udGFsIC52anMtdm9sdW1lLWxldmVsIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi52aWRlby1qcyAudmpzLXZvbHVtZS12ZXJ0aWNhbCB7XG4gIHdpZHRoOiAzZW07XG4gIGhlaWdodDogOGVtO1xuICBib3R0b206IDhlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJCMzMzRjtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MywgNTEsIDYzLCAwLjcpO1xufVxuXG4udmlkZW8tanMgLnZqcy12b2x1bWUtaG9yaXpvbnRhbCAudmpzLW1lbnUge1xuICBsZWZ0OiAtMmVtO1xufVxuXG4udmlkZW8tanMgLnZqcy12b2x1bWUtdG9vbHRpcCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC44KTtcbiAgYm9yZGVyLXJhZGl1czogMC4zZW07XG4gIGNvbG9yOiAjMDAwO1xuICBmbG9hdDogcmlnaHQ7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDFlbTtcbiAgcGFkZGluZzogNnB4IDhweCA4cHggOHB4O1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IC0zLjRlbTtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICB6LWluZGV4OiAxO1xufVxuXG4udmlkZW8tanMgLnZqcy12b2x1bWUtY29udHJvbDpob3ZlciAudmpzLXZvbHVtZS10b29sdGlwLFxuLnZpZGVvLWpzIC52anMtdm9sdW1lLWNvbnRyb2w6aG92ZXIgLnZqcy1wcm9ncmVzcy1ob2xkZXI6Zm9jdXMgLnZqcy12b2x1bWUtdG9vbHRpcCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDFlbTtcbiAgdmlzaWJpbGl0eTogdmlzaWJsZTtcbn1cblxuLnZpZGVvLWpzIC52anMtdm9sdW1lLXZlcnRpY2FsOmhvdmVyIC52anMtdm9sdW1lLXRvb2x0aXAsXG4udmlkZW8tanMgLnZqcy12b2x1bWUtdmVydGljYWw6aG92ZXIgLnZqcy1wcm9ncmVzcy1ob2xkZXI6Zm9jdXMgLnZqcy12b2x1bWUtdG9vbHRpcCB7XG4gIGxlZnQ6IDFlbTtcbiAgdG9wOiAtMTJweDtcbn1cblxuLnZpZGVvLWpzIC52anMtdm9sdW1lLWNvbnRyb2wuZGlzYWJsZWQ6aG92ZXIgLnZqcy12b2x1bWUtdG9vbHRpcCB7XG4gIGZvbnQtc2l6ZTogMWVtO1xufVxuXG4udmlkZW8tanMgLnZqcy12b2x1bWUtY29udHJvbCAudmpzLW1vdXNlLWRpc3BsYXkge1xuICBkaXNwbGF5OiBub25lO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDFweDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbiAgei1pbmRleDogMTtcbn1cblxuLnZpZGVvLWpzIC52anMtdm9sdW1lLWhvcml6b250YWwgLnZqcy1tb3VzZS1kaXNwbGF5IHtcbiAgd2lkdGg6IDFweDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4udmpzLW5vLWZsZXggLnZqcy12b2x1bWUtY29udHJvbCAudmpzLW1vdXNlLWRpc3BsYXkge1xuICB6LWluZGV4OiAwO1xufVxuXG4udmlkZW8tanMgLnZqcy12b2x1bWUtY29udHJvbDpob3ZlciAudmpzLW1vdXNlLWRpc3BsYXkge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLnZpZGVvLWpzLnZqcy11c2VyLWluYWN0aXZlIC52anMtdm9sdW1lLWNvbnRyb2wgLnZqcy1tb3VzZS1kaXNwbGF5IHtcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xuICBvcGFjaXR5OiAwO1xuICB0cmFuc2l0aW9uOiB2aXNpYmlsaXR5IDFzLCBvcGFjaXR5IDFzO1xufVxuXG4udmlkZW8tanMudmpzLXVzZXItaW5hY3RpdmUudmpzLW5vLWZsZXggLnZqcy12b2x1bWUtY29udHJvbCAudmpzLW1vdXNlLWRpc3BsYXkge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4udmpzLW1vdXNlLWRpc3BsYXkgLnZqcy12b2x1bWUtdG9vbHRpcCB7XG4gIGNvbG9yOiAjZmZmO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XG59XG5cbi52anMtcG9zdGVyIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgNTAlO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvbnRhaW47XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMDAwMDA7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgcmlnaHQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4udmpzLWhhcy1zdGFydGVkIC52anMtcG9zdGVyIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnZqcy1hdWRpby52anMtaGFzLXN0YXJ0ZWQgLnZqcy1wb3N0ZXIge1xuICBkaXNwbGF5OiBibG9jaztcbn1cblxuLnZqcy11c2luZy1uYXRpdmUtY29udHJvbHMgLnZqcy1wb3N0ZXIge1xuICBkaXNwbGF5OiBub25lO1xufVxuXG4udmlkZW8tanMgLnZqcy1saXZlLWNvbnRyb2wge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgZmxleDogYXV0bztcbiAgZm9udC1zaXplOiAxZW07XG4gIGxpbmUtaGVpZ2h0OiAzZW07XG59XG5cbi52anMtbm8tZmxleCAudmpzLWxpdmUtY29udHJvbCB7XG4gIGRpc3BsYXk6IHRhYmxlLWNlbGw7XG4gIHdpZHRoOiBhdXRvO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4udmlkZW8tanM6bm90KC52anMtbGl2ZSkgLnZqcy1saXZlLWNvbnRyb2wsXG4udmlkZW8tanMudmpzLWxpdmV1aSAudmpzLWxpdmUtY29udHJvbCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi52aWRlby1qcyAudmpzLXNlZWstdG8tbGl2ZS1jb250cm9sIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBmbGV4OiBub25lO1xuICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwYWRkaW5nLWxlZnQ6IDAuNWVtO1xuICBwYWRkaW5nLXJpZ2h0OiAwLjVlbTtcbiAgZm9udC1zaXplOiAxZW07XG4gIGxpbmUtaGVpZ2h0OiAzZW07XG4gIHdpZHRoOiBhdXRvO1xuICBtaW4td2lkdGg6IDRlbTtcbn1cblxuLnZqcy1uby1mbGV4IC52anMtc2Vlay10by1saXZlLWNvbnRyb2wge1xuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xuICB3aWR0aDogYXV0bztcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cblxuLnZpZGVvLWpzLnZqcy1saXZlOm5vdCgudmpzLWxpdmV1aSkgLnZqcy1zZWVrLXRvLWxpdmUtY29udHJvbCxcbi52aWRlby1qczpub3QoLnZqcy1saXZlKSAudmpzLXNlZWstdG8tbGl2ZS1jb250cm9sIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnZqcy1zZWVrLXRvLWxpdmUtY29udHJvbC52anMtY29udHJvbC52anMtYXQtbGl2ZS1lZGdlIHtcbiAgY3Vyc29yOiBhdXRvO1xufVxuXG4udmpzLXNlZWstdG8tbGl2ZS1jb250cm9sIC52anMtaWNvbi1wbGFjZWhvbGRlciB7XG4gIG1hcmdpbi1yaWdodDogMC41ZW07XG4gIGNvbG9yOiAjODg4O1xufVxuXG4udmpzLXNlZWstdG8tbGl2ZS1jb250cm9sLnZqcy1jb250cm9sLnZqcy1hdC1saXZlLWVkZ2UgLnZqcy1pY29uLXBsYWNlaG9sZGVyIHtcbiAgY29sb3I6IHJlZDtcbn1cblxuLnZpZGVvLWpzIC52anMtdGltZS1jb250cm9sIHtcbiAgZmxleDogbm9uZTtcbiAgZm9udC1zaXplOiAxZW07XG4gIGxpbmUtaGVpZ2h0OiAzZW07XG4gIG1pbi13aWR0aDogMmVtO1xuICB3aWR0aDogYXV0bztcbiAgcGFkZGluZy1sZWZ0OiAxZW07XG4gIHBhZGRpbmctcmlnaHQ6IDFlbTtcbn1cblxuLnZqcy1saXZlIC52anMtdGltZS1jb250cm9sIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnZpZGVvLWpzIC52anMtY3VycmVudC10aW1lLFxuLnZqcy1uby1mbGV4IC52anMtY3VycmVudC10aW1lIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnZpZGVvLWpzIC52anMtZHVyYXRpb24sXG4udmpzLW5vLWZsZXggLnZqcy1kdXJhdGlvbiB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi52anMtdGltZS1kaXZpZGVyIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgbGluZS1oZWlnaHQ6IDNlbTtcbn1cblxuLnZqcy1saXZlIC52anMtdGltZS1kaXZpZGVyIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnZpZGVvLWpzIC52anMtcGxheS1jb250cm9sIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4udmlkZW8tanMgLnZqcy1wbGF5LWNvbnRyb2wgLnZqcy1pY29uLXBsYWNlaG9sZGVyIHtcbiAgZmxleDogbm9uZTtcbn1cblxuLnZqcy10ZXh0LXRyYWNrLWRpc3BsYXkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogM2VtO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgdG9wOiAwO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLnZpZGVvLWpzLnZqcy11c2VyLWluYWN0aXZlLnZqcy1wbGF5aW5nIC52anMtdGV4dC10cmFjay1kaXNwbGF5IHtcbiAgYm90dG9tOiAxZW07XG59XG5cbi52aWRlby1qcyAudmpzLXRleHQtdHJhY2sge1xuICBmb250LXNpemU6IDEuNGVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDAuMWVtO1xufVxuXG4udmpzLXN1YnRpdGxlcyB7XG4gIGNvbG9yOiAjZmZmO1xufVxuXG4udmpzLWNhcHRpb25zIHtcbiAgY29sb3I6ICNmYzY7XG59XG5cbi52anMtdHQtY3VlIHtcbiAgZGlzcGxheTogYmxvY2s7XG59XG5cbnZpZGVvOjotd2Via2l0LW1lZGlhLXRleHQtdHJhY2stZGlzcGxheSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM2VtKTtcbn1cblxuLnZpZGVvLWpzLnZqcy11c2VyLWluYWN0aXZlLnZqcy1wbGF5aW5nIHZpZGVvOjotd2Via2l0LW1lZGlhLXRleHQtdHJhY2stZGlzcGxheSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS41ZW0pO1xufVxuXG4udmlkZW8tanMgLnZqcy1waWN0dXJlLWluLXBpY3R1cmUtY29udHJvbCB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZmxleDogbm9uZTtcbn1cbi52aWRlby1qcyAudmpzLWZ1bGxzY3JlZW4tY29udHJvbCB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZmxleDogbm9uZTtcbn1cbi52anMtcGxheWJhY2stcmF0ZSA+IC52anMtbWVudS1idXR0b24sXG4udmpzLXBsYXliYWNrLXJhdGUgLnZqcy1wbGF5YmFjay1yYXRlLXZhbHVlIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbi52anMtcGxheWJhY2stcmF0ZSAudmpzLXBsYXliYWNrLXJhdGUtdmFsdWUge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgZm9udC1zaXplOiAxLjVlbTtcbiAgbGluZS1oZWlnaHQ6IDI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnZqcy1wbGF5YmFjay1yYXRlIC52anMtbWVudSB7XG4gIHdpZHRoOiA0ZW07XG4gIGxlZnQ6IDBlbTtcbn1cblxuLnZqcy1lcnJvciAudmpzLWVycm9yLWRpc3BsYXkgLnZqcy1tb2RhbC1kaWFsb2ctY29udGVudCB7XG4gIGZvbnQtc2l6ZTogMS40ZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnZqcy1lcnJvciAudmpzLWVycm9yLWRpc3BsYXk6YmVmb3JlIHtcbiAgY29sb3I6ICNmZmY7XG4gIGNvbnRlbnQ6IFwiWFwiO1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiA0ZW07XG4gIGxlZnQ6IDA7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBtYXJnaW4tdG9wOiAtMC41ZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdGV4dC1zaGFkb3c6IDAuMDVlbSAwLjA1ZW0gMC4xZW0gIzAwMDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB0b3A6IDUwJTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi52anMtbG9hZGluZy1zcGlubmVyIHtcbiAgZGlzcGxheTogbm9uZTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgbGVmdDogNTAlO1xuICBtYXJnaW46IC0yNXB4IDAgMCAtMjVweDtcbiAgb3BhY2l0eTogMC44NTtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgYm9yZGVyOiA2cHggc29saWQgcmdiYSg0MywgNTEsIDYzLCAwLjcpO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBiYWNrZ3JvdW5kLWNsaXA6IHBhZGRpbmctYm94O1xuICB3aWR0aDogNTBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBib3JkZXItcmFkaXVzOiAyNXB4O1xuICB2aXNpYmlsaXR5OiBoaWRkZW47XG59XG5cbi52anMtc2Vla2luZyAudmpzLWxvYWRpbmctc3Bpbm5lcixcbi52anMtd2FpdGluZyAudmpzLWxvYWRpbmctc3Bpbm5lciB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICAtd2Via2l0LWFuaW1hdGlvbjogdmpzLXNwaW5uZXItc2hvdyAwcyBsaW5lYXIgMC4zcyBmb3J3YXJkcztcbiAgICAgICAgICBhbmltYXRpb246IHZqcy1zcGlubmVyLXNob3cgMHMgbGluZWFyIDAuM3MgZm9yd2FyZHM7XG59XG5cbi52anMtbG9hZGluZy1zcGlubmVyOmJlZm9yZSxcbi52anMtbG9hZGluZy1zcGlubmVyOmFmdGVyIHtcbiAgY29udGVudDogXCJcIjtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBtYXJnaW46IC02cHg7XG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XG4gIHdpZHRoOiBpbmhlcml0O1xuICBoZWlnaHQ6IGluaGVyaXQ7XG4gIGJvcmRlci1yYWRpdXM6IGluaGVyaXQ7XG4gIG9wYWNpdHk6IDE7XG4gIGJvcmRlcjogaW5oZXJpdDtcbiAgYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXRvcC1jb2xvcjogd2hpdGU7XG59XG5cbi52anMtc2Vla2luZyAudmpzLWxvYWRpbmctc3Bpbm5lcjpiZWZvcmUsXG4udmpzLXNlZWtpbmcgLnZqcy1sb2FkaW5nLXNwaW5uZXI6YWZ0ZXIsXG4udmpzLXdhaXRpbmcgLnZqcy1sb2FkaW5nLXNwaW5uZXI6YmVmb3JlLFxuLnZqcy13YWl0aW5nIC52anMtbG9hZGluZy1zcGlubmVyOmFmdGVyIHtcbiAgLXdlYmtpdC1hbmltYXRpb246IHZqcy1zcGlubmVyLXNwaW4gMS4xcyBjdWJpYy1iZXppZXIoMC42LCAwLjIsIDAsIDAuOCkgaW5maW5pdGUsIHZqcy1zcGlubmVyLWZhZGUgMS4xcyBsaW5lYXIgaW5maW5pdGU7XG4gIGFuaW1hdGlvbjogdmpzLXNwaW5uZXItc3BpbiAxLjFzIGN1YmljLWJlemllcigwLjYsIDAuMiwgMCwgMC44KSBpbmZpbml0ZSwgdmpzLXNwaW5uZXItZmFkZSAxLjFzIGxpbmVhciBpbmZpbml0ZTtcbn1cblxuLnZqcy1zZWVraW5nIC52anMtbG9hZGluZy1zcGlubmVyOmJlZm9yZSxcbi52anMtd2FpdGluZyAudmpzLWxvYWRpbmctc3Bpbm5lcjpiZWZvcmUge1xuICBib3JkZXItdG9wLWNvbG9yOiB3aGl0ZTtcbn1cblxuLnZqcy1zZWVraW5nIC52anMtbG9hZGluZy1zcGlubmVyOmFmdGVyLFxuLnZqcy13YWl0aW5nIC52anMtbG9hZGluZy1zcGlubmVyOmFmdGVyIHtcbiAgYm9yZGVyLXRvcC1jb2xvcjogd2hpdGU7XG4gIC13ZWJraXQtYW5pbWF0aW9uLWRlbGF5OiAwLjQ0cztcbiAgYW5pbWF0aW9uLWRlbGF5OiAwLjQ0cztcbn1cblxuQGtleWZyYW1lcyB2anMtc3Bpbm5lci1zaG93IHtcbiAgdG8ge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIH1cbn1cbkAtd2Via2l0LWtleWZyYW1lcyB2anMtc3Bpbm5lci1zaG93IHtcbiAgdG8ge1xuICAgIHZpc2liaWxpdHk6IHZpc2libGU7XG4gIH1cbn1cbkBrZXlmcmFtZXMgdmpzLXNwaW5uZXItc3BpbiB7XG4gIDEwMCUge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gIH1cbn1cbkAtd2Via2l0LWtleWZyYW1lcyB2anMtc3Bpbm5lci1zcGluIHtcbiAgMTAwJSB7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xuICB9XG59XG5Aa2V5ZnJhbWVzIHZqcy1zcGlubmVyLWZhZGUge1xuICAwJSB7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogIzczODU5ZjtcbiAgfVxuICAyMCUge1xuICAgIGJvcmRlci10b3AtY29sb3I6ICM3Mzg1OWY7XG4gIH1cbiAgMzUlIHtcbiAgICBib3JkZXItdG9wLWNvbG9yOiB3aGl0ZTtcbiAgfVxuICA2MCUge1xuICAgIGJvcmRlci10b3AtY29sb3I6ICM3Mzg1OWY7XG4gIH1cbiAgMTAwJSB7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogIzczODU5ZjtcbiAgfVxufVxuQC13ZWJraXQta2V5ZnJhbWVzIHZqcy1zcGlubmVyLWZhZGUge1xuICAwJSB7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogIzczODU5ZjtcbiAgfVxuICAyMCUge1xuICAgIGJvcmRlci10b3AtY29sb3I6ICM3Mzg1OWY7XG4gIH1cbiAgMzUlIHtcbiAgICBib3JkZXItdG9wLWNvbG9yOiB3aGl0ZTtcbiAgfVxuICA2MCUge1xuICAgIGJvcmRlci10b3AtY29sb3I6ICM3Mzg1OWY7XG4gIH1cbiAgMTAwJSB7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogIzczODU5ZjtcbiAgfVxufVxuLnZqcy1jaGFwdGVycy1idXR0b24gLnZqcy1tZW51IHVsIHtcbiAgd2lkdGg6IDI0ZW07XG59XG5cbi52aWRlby1qcyAudmpzLXN1YnMtY2Fwcy1idXR0b24gKyAudmpzLW1lbnUgLnZqcy1jYXB0aW9ucy1tZW51LWl0ZW0gLnZqcy1tZW51LWl0ZW0tdGV4dCAudmpzLWljb24tcGxhY2Vob2xkZXIge1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IC0wLjFlbTtcbn1cblxuLnZpZGVvLWpzIC52anMtc3Vicy1jYXBzLWJ1dHRvbiArIC52anMtbWVudSAudmpzLWNhcHRpb25zLW1lbnUtaXRlbSAudmpzLW1lbnUtaXRlbS10ZXh0IC52anMtaWNvbi1wbGFjZWhvbGRlcjpiZWZvcmUge1xuICBmb250LWZhbWlseTogVmlkZW9KUztcbiAgY29udGVudDogXCLvhI1cIjtcbiAgZm9udC1zaXplOiAxLjVlbTtcbiAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG59XG5cbi52aWRlby1qcyAudmpzLWF1ZGlvLWJ1dHRvbiArIC52anMtbWVudSAudmpzLW1haW4tZGVzYy1tZW51LWl0ZW0gLnZqcy1tZW51LWl0ZW0tdGV4dCAudmpzLWljb24tcGxhY2Vob2xkZXIge1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbi1ib3R0b206IC0wLjFlbTtcbn1cblxuLnZpZGVvLWpzIC52anMtYXVkaW8tYnV0dG9uICsgLnZqcy1tZW51IC52anMtbWFpbi1kZXNjLW1lbnUtaXRlbSAudmpzLW1lbnUtaXRlbS10ZXh0IC52anMtaWNvbi1wbGFjZWhvbGRlcjpiZWZvcmUge1xuICBmb250LWZhbWlseTogVmlkZW9KUztcbiAgY29udGVudDogXCIg74SdXCI7XG4gIGZvbnQtc2l6ZTogMS41ZW07XG4gIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xufVxuXG4udmlkZW8tanMudmpzLWxheW91dC1zbWFsbCAudmpzLWN1cnJlbnQtdGltZSxcbi52aWRlby1qcy52anMtbGF5b3V0LXNtYWxsIC52anMtdGltZS1kaXZpZGVyLFxuLnZpZGVvLWpzLnZqcy1sYXlvdXQtc21hbGwgLnZqcy1kdXJhdGlvbixcbi52aWRlby1qcy52anMtbGF5b3V0LXNtYWxsIC52anMtcmVtYWluaW5nLXRpbWUsXG4udmlkZW8tanMudmpzLWxheW91dC1zbWFsbCAudmpzLXBsYXliYWNrLXJhdGUsXG4udmlkZW8tanMudmpzLWxheW91dC1zbWFsbCAudmpzLWNoYXB0ZXJzLWJ1dHRvbixcbi52aWRlby1qcy52anMtbGF5b3V0LXNtYWxsIC52anMtZGVzY3JpcHRpb25zLWJ1dHRvbixcbi52aWRlby1qcy52anMtbGF5b3V0LXNtYWxsIC52anMtY2FwdGlvbnMtYnV0dG9uLFxuLnZpZGVvLWpzLnZqcy1sYXlvdXQtc21hbGwgLnZqcy1zdWJ0aXRsZXMtYnV0dG9uLFxuLnZpZGVvLWpzLnZqcy1sYXlvdXQtc21hbGwgLnZqcy1hdWRpby1idXR0b24sXG4udmlkZW8tanMudmpzLWxheW91dC1zbWFsbCAudmpzLXZvbHVtZS1jb250cm9sLCAudmlkZW8tanMudmpzLWxheW91dC14LXNtYWxsIC52anMtY3VycmVudC10aW1lLFxuLnZpZGVvLWpzLnZqcy1sYXlvdXQteC1zbWFsbCAudmpzLXRpbWUtZGl2aWRlcixcbi52aWRlby1qcy52anMtbGF5b3V0LXgtc21hbGwgLnZqcy1kdXJhdGlvbixcbi52aWRlby1qcy52anMtbGF5b3V0LXgtc21hbGwgLnZqcy1yZW1haW5pbmctdGltZSxcbi52aWRlby1qcy52anMtbGF5b3V0LXgtc21hbGwgLnZqcy1wbGF5YmFjay1yYXRlLFxuLnZpZGVvLWpzLnZqcy1sYXlvdXQteC1zbWFsbCAudmpzLWNoYXB0ZXJzLWJ1dHRvbixcbi52aWRlby1qcy52anMtbGF5b3V0LXgtc21hbGwgLnZqcy1kZXNjcmlwdGlvbnMtYnV0dG9uLFxuLnZpZGVvLWpzLnZqcy1sYXlvdXQteC1zbWFsbCAudmpzLWNhcHRpb25zLWJ1dHRvbixcbi52aWRlby1qcy52anMtbGF5b3V0LXgtc21hbGwgLnZqcy1zdWJ0aXRsZXMtYnV0dG9uLFxuLnZpZGVvLWpzLnZqcy1sYXlvdXQteC1zbWFsbCAudmpzLWF1ZGlvLWJ1dHRvbixcbi52aWRlby1qcy52anMtbGF5b3V0LXgtc21hbGwgLnZqcy12b2x1bWUtY29udHJvbCwgLnZpZGVvLWpzLnZqcy1sYXlvdXQtdGlueSAudmpzLWN1cnJlbnQtdGltZSxcbi52aWRlby1qcy52anMtbGF5b3V0LXRpbnkgLnZqcy10aW1lLWRpdmlkZXIsXG4udmlkZW8tanMudmpzLWxheW91dC10aW55IC52anMtZHVyYXRpb24sXG4udmlkZW8tanMudmpzLWxheW91dC10aW55IC52anMtcmVtYWluaW5nLXRpbWUsXG4udmlkZW8tanMudmpzLWxheW91dC10aW55IC52anMtcGxheWJhY2stcmF0ZSxcbi52aWRlby1qcy52anMtbGF5b3V0LXRpbnkgLnZqcy1jaGFwdGVycy1idXR0b24sXG4udmlkZW8tanMudmpzLWxheW91dC10aW55IC52anMtZGVzY3JpcHRpb25zLWJ1dHRvbixcbi52aWRlby1qcy52anMtbGF5b3V0LXRpbnkgLnZqcy1jYXB0aW9ucy1idXR0b24sXG4udmlkZW8tanMudmpzLWxheW91dC10aW55IC52anMtc3VidGl0bGVzLWJ1dHRvbixcbi52aWRlby1qcy52anMtbGF5b3V0LXRpbnkgLnZqcy1hdWRpby1idXR0b24sXG4udmlkZW8tanMudmpzLWxheW91dC10aW55IC52anMtdm9sdW1lLWNvbnRyb2wge1xuICBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG59XG4udmlkZW8tanMudmpzLWxheW91dC1zbWFsbCAudmpzLXZvbHVtZS1wYW5lbC52anMtdm9sdW1lLXBhbmVsLWhvcml6b250YWw6aG92ZXIsXG4udmlkZW8tanMudmpzLWxheW91dC1zbWFsbCAudmpzLXZvbHVtZS1wYW5lbC52anMtdm9sdW1lLXBhbmVsLWhvcml6b250YWw6YWN0aXZlLFxuLnZpZGVvLWpzLnZqcy1sYXlvdXQtc21hbGwgLnZqcy12b2x1bWUtcGFuZWwudmpzLXZvbHVtZS1wYW5lbC1ob3Jpem9udGFsLnZqcy1zbGlkZXItYWN0aXZlLCAudmlkZW8tanMudmpzLWxheW91dC14LXNtYWxsIC52anMtdm9sdW1lLXBhbmVsLnZqcy12b2x1bWUtcGFuZWwtaG9yaXpvbnRhbDpob3Zlcixcbi52aWRlby1qcy52anMtbGF5b3V0LXgtc21hbGwgLnZqcy12b2x1bWUtcGFuZWwudmpzLXZvbHVtZS1wYW5lbC1ob3Jpem9udGFsOmFjdGl2ZSxcbi52aWRlby1qcy52anMtbGF5b3V0LXgtc21hbGwgLnZqcy12b2x1bWUtcGFuZWwudmpzLXZvbHVtZS1wYW5lbC1ob3Jpem9udGFsLnZqcy1zbGlkZXItYWN0aXZlLCAudmlkZW8tanMudmpzLWxheW91dC10aW55IC52anMtdm9sdW1lLXBhbmVsLnZqcy12b2x1bWUtcGFuZWwtaG9yaXpvbnRhbDpob3Zlcixcbi52aWRlby1qcy52anMtbGF5b3V0LXRpbnkgLnZqcy12b2x1bWUtcGFuZWwudmpzLXZvbHVtZS1wYW5lbC1ob3Jpem9udGFsOmFjdGl2ZSxcbi52aWRlby1qcy52anMtbGF5b3V0LXRpbnkgLnZqcy12b2x1bWUtcGFuZWwudmpzLXZvbHVtZS1wYW5lbC1ob3Jpem9udGFsLnZqcy1zbGlkZXItYWN0aXZlIHtcbiAgd2lkdGg6IGF1dG87XG4gIHdpZHRoOiBpbml0aWFsO1xufVxuLnZpZGVvLWpzLnZqcy1sYXlvdXQteC1zbWFsbDpub3QoLnZqcy1saXZldWkpIC52anMtc3Vicy1jYXBzLWJ1dHRvbiwgLnZpZGVvLWpzLnZqcy1sYXlvdXQteC1zbWFsbDpub3QoLnZqcy1saXZlKSAudmpzLXN1YnMtY2Fwcy1idXR0b24sIC52aWRlby1qcy52anMtbGF5b3V0LXRpbnkgLnZqcy1zdWJzLWNhcHMtYnV0dG9uIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cbi52aWRlby1qcy52anMtbGF5b3V0LXgtc21hbGwudmpzLWxpdmV1aSAudmpzLWN1c3RvbS1jb250cm9sLXNwYWNlciwgLnZpZGVvLWpzLnZqcy1sYXlvdXQtdGlueSAudmpzLWN1c3RvbS1jb250cm9sLXNwYWNlciB7XG4gIGZsZXg6IGF1dG87XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLnZpZGVvLWpzLnZqcy1sYXlvdXQteC1zbWFsbC52anMtbGl2ZXVpLnZqcy1uby1mbGV4IC52anMtY3VzdG9tLWNvbnRyb2wtc3BhY2VyLCAudmlkZW8tanMudmpzLWxheW91dC10aW55LnZqcy1uby1mbGV4IC52anMtY3VzdG9tLWNvbnRyb2wtc3BhY2VyIHtcbiAgd2lkdGg6IGF1dG87XG59XG4udmlkZW8tanMudmpzLWxheW91dC14LXNtYWxsLnZqcy1saXZldWkgLnZqcy1wcm9ncmVzcy1jb250cm9sLCAudmlkZW8tanMudmpzLWxheW91dC10aW55IC52anMtcHJvZ3Jlc3MtY29udHJvbCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi52anMtbW9kYWwtZGlhbG9nLnZqcy10ZXh0LXRyYWNrLXNldHRpbmdzIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzJCMzMzRjtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSg0MywgNTEsIDYzLCAwLjc1KTtcbiAgY29sb3I6ICNmZmY7XG4gIGhlaWdodDogNzAlO1xufVxuXG4udmpzLXRleHQtdHJhY2stc2V0dGluZ3MgLnZqcy1tb2RhbC1kaWFsb2ctY29udGVudCB7XG4gIGRpc3BsYXk6IHRhYmxlO1xufVxuXG4udmpzLXRleHQtdHJhY2stc2V0dGluZ3MgLnZqcy10cmFjay1zZXR0aW5ncy1jb2xvcnMsXG4udmpzLXRleHQtdHJhY2stc2V0dGluZ3MgLnZqcy10cmFjay1zZXR0aW5ncy1mb250LFxuLnZqcy10ZXh0LXRyYWNrLXNldHRpbmdzIC52anMtdHJhY2stc2V0dGluZ3MtY29udHJvbHMge1xuICBkaXNwbGF5OiB0YWJsZS1jZWxsO1xufVxuXG4udmpzLXRleHQtdHJhY2stc2V0dGluZ3MgLnZqcy10cmFjay1zZXR0aW5ncy1jb250cm9scyB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xuICB2ZXJ0aWNhbC1hbGlnbjogYm90dG9tO1xufVxuXG5Ac3VwcG9ydHMgKGRpc3BsYXk6IGdyaWQpIHtcbiAgLnZqcy10ZXh0LXRyYWNrLXNldHRpbmdzIC52anMtbW9kYWwtZGlhbG9nLWNvbnRlbnQge1xuICAgIGRpc3BsYXk6IGdyaWQ7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyO1xuICAgIGdyaWQtdGVtcGxhdGUtcm93czogMWZyO1xuICAgIHBhZGRpbmc6IDIwcHggMjRweCAwcHggMjRweDtcbiAgfVxuXG4gIC52anMtdHJhY2stc2V0dGluZ3MtY29udHJvbHMgLnZqcy1kZWZhdWx0LWJ1dHRvbiB7XG4gICAgbWFyZ2luLWJvdHRvbTogMjBweDtcbiAgfVxuXG4gIC52anMtdGV4dC10cmFjay1zZXR0aW5ncyAudmpzLXRyYWNrLXNldHRpbmdzLWNvbnRyb2xzIHtcbiAgICBncmlkLWNvbHVtbjogMS8tMTtcbiAgfVxuXG4gIC52anMtbGF5b3V0LXNtYWxsIC52anMtdGV4dC10cmFjay1zZXR0aW5ncyAudmpzLW1vZGFsLWRpYWxvZy1jb250ZW50LFxuLnZqcy1sYXlvdXQteC1zbWFsbCAudmpzLXRleHQtdHJhY2stc2V0dGluZ3MgLnZqcy1tb2RhbC1kaWFsb2ctY29udGVudCxcbi52anMtbGF5b3V0LXRpbnkgLnZqcy10ZXh0LXRyYWNrLXNldHRpbmdzIC52anMtbW9kYWwtZGlhbG9nLWNvbnRlbnQge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyO1xuICB9XG59XG4udmpzLXRyYWNrLXNldHRpbmcgPiBzZWxlY3Qge1xuICBtYXJnaW4tcmlnaHQ6IDFlbTtcbiAgbWFyZ2luLWJvdHRvbTogMC41ZW07XG59XG5cbi52anMtdGV4dC10cmFjay1zZXR0aW5ncyBmaWVsZHNldCB7XG4gIG1hcmdpbjogNXB4O1xuICBwYWRkaW5nOiAzcHg7XG4gIGJvcmRlcjogbm9uZTtcbn1cblxuLnZqcy10ZXh0LXRyYWNrLXNldHRpbmdzIGZpZWxkc2V0IHNwYW4ge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi52anMtdGV4dC10cmFjay1zZXR0aW5ncyBmaWVsZHNldCBzcGFuID4gc2VsZWN0IHtcbiAgbWF4LXdpZHRoOiA3LjNlbTtcbn1cblxuLnZqcy10ZXh0LXRyYWNrLXNldHRpbmdzIGxlZ2VuZCB7XG4gIGNvbG9yOiAjZmZmO1xuICBtYXJnaW46IDAgMCA1cHggMDtcbn1cblxuLnZqcy10ZXh0LXRyYWNrLXNldHRpbmdzIC52anMtbGFiZWwge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNsaXA6IHJlY3QoMXB4IDFweCAxcHggMXB4KTtcbiAgY2xpcDogcmVjdCgxcHgsIDFweCwgMXB4LCAxcHgpO1xuICBkaXNwbGF5OiBibG9jaztcbiAgbWFyZ2luOiAwIDAgNXB4IDA7XG4gIHBhZGRpbmc6IDA7XG4gIGJvcmRlcjogMDtcbiAgaGVpZ2h0OiAxcHg7XG4gIHdpZHRoOiAxcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi52anMtdHJhY2stc2V0dGluZ3MtY29udHJvbHMgYnV0dG9uOmZvY3VzLFxuLnZqcy10cmFjay1zZXR0aW5ncy1jb250cm9scyBidXR0b246YWN0aXZlIHtcbiAgb3V0bGluZS1zdHlsZTogc29saWQ7XG4gIG91dGxpbmUtd2lkdGg6IG1lZGl1bTtcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KDBkZWcsICNmZmYgODglLCAjNzM4NTlmIDEwMCUpO1xufVxuXG4udmpzLXRyYWNrLXNldHRpbmdzLWNvbnRyb2xzIGJ1dHRvbjpob3ZlciB7XG4gIGNvbG9yOiByZ2JhKDQzLCA1MSwgNjMsIDAuNzUpO1xufVxuXG4udmpzLXRyYWNrLXNldHRpbmdzLWNvbnRyb2xzIGJ1dHRvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudCgtMTgwZGVnLCAjZmZmIDg4JSwgIzczODU5ZiAxMDAlKTtcbiAgY29sb3I6ICMyQjMzM0Y7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xufVxuXG4udmpzLXRyYWNrLXNldHRpbmdzLWNvbnRyb2xzIC52anMtZGVmYXVsdC1idXR0b24ge1xuICBtYXJnaW4tcmlnaHQ6IDFlbTtcbn1cblxuQG1lZGlhIHByaW50IHtcbiAgLnZpZGVvLWpzID4gKjpub3QoLnZqcy10ZWNoKTpub3QoLnZqcy1wb3N0ZXIpIHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gIH1cbn1cbi52anMtcmVzaXplLW1hbmFnZXIge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYm9yZGVyOiBub25lO1xuICB6LWluZGV4OiAtMTAwMDtcbn1cblxuLmpzLWZvY3VzLXZpc2libGUgLnZpZGVvLWpzICo6Zm9jdXM6bm90KC5mb2N1cy12aXNpYmxlKSB7XG4gIG91dGxpbmU6IG5vbmU7XG59XG5cbi52aWRlby1qcyAqOmZvY3VzOm5vdCg6Zm9jdXMtdmlzaWJsZSkge1xuICBvdXRsaW5lOiBub25lO1xufVxuIiwiLmNhdGVnb3J5LWhvbGRlcntcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbi5jb3VyZXNlLWhvbGRlcntcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogY2FsYygxMDAlIC0gNjBweCk7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG92ZXJmbG93OiBhdXRvO1xufVxuQGltcG9ydCAnfnZpZGVvLmpzL2Rpc3QvdmlkZW8tanMuY3NzJztcbi5jb2wtY2FyZC00IHtcbiAgd2lkdGg6IGNhbGMoMTAwJSAvIDQpO1xuICBoZWlnaHQ6IDMyMHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBwYWRkaW5nOiAxMHB4O1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuLmNhcnQtY291cnNlcyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIC8vIGJveC1zaGFkb3c6IDBweCAycHggMXB4IC0xcHggcmdiKDAgMCAwIC8gMjAlKSxcbiAgLy8gICAwcHggMXB4IDFweCAwcHggcmdiKDAgMCAwIC8gMTQlKSwgMHB4IDFweCAzcHggMHB4IHJnYigwIDAgMCAvIDEyJSk7XG59XG4uaGVhZGVyLWNhcnQtY291cnNlcyB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDM1cHg7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kOiAjRjFGMkYyO1xuICBjb2xvcjogI0E3QTlBQztcbiAgZm9udC1mYW1pbHk6IG15Rm9udDtcbiAgZm9udC1zaXplOiAxMHB4O1xufVxuLmNvbnRlbnQtY2FydC1jb3Vyc2Vze1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA3MHB4KTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgLy8gYm94LXNoYWRvdzogMHB4IDJweCAxcHggLTFweCByZ2IoMCAwIDAgLyAyMCUpLFxuICAvLyAwcHggMXB4IDFweCAwcHggcmdiKDAgMCAwIC8gMTQlKSwgMHB4IDFweCAzcHggMHB4IHJnYigwIDAgMCAvIDEyJSk7XG59XG4ucHJpY2UtY2FydC1jb3Vyc2VzIHtcbiAgbWFyZ2luLXRvcDogNXB4O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAzNXB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBwYWRkaW5nOiA1cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHB7XG4gICAgY29sb3I6ICM5QjlCOUI7XG4gICAgZm9udC1mYW1pbHk6IG15Rm9udDtcbiAgICBmb250LXNpemU6IDE2cHg7XG4gICAgc3BhbntcbiAgICAgIGZvbnQtc2l6ZTogMTNweDtcbiAgICB9XG4gIH1cbn1cbi5hY3Rpb25zLWNhcnQtY291cnNlc3tcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogNTBweHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBwYWRkaW5nOiA1cHg7XG59XG4uaW1nLWNvdXJzZXN7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG4udmlkZW8tanMgY2FudmFze1xuICBwb3NpdGlvbjogcmVsYXRpdmUhaW1wb3J0YW50O1xufVxuLnByaWNlLWNhcnQtY291cnNlcyBzcGFuLC5oZWFkZXItY2FydC1jb3Vyc2Vze1xuICBmb250LXNpemU6IDE4cHg7XG59XG4uZGV0YWlsLWNvdXJzZS1ob2xkZXJ7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDI4MHB4O1xuICBtYXJnaW4tYm90dG9tOiAxMHB4O1xuICBib3JkZXI6IDFweCBzb2xpZCAjMEU1Q0NDO1xuICBib3JkZXItcmFkaXVzOiAxMnB4O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDEycHg7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogMTJweDtcbiAgLW1zLWJvcmRlci1yYWRpdXM6IDEycHg7XG4gIC1vLWJvcmRlci1yYWRpdXM6IDEycHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4uYnRuLWFkZC10by1jYXJ0e1xuICBtaW4td2lkdGg6IDkwcHg7XG4gIGhlaWdodDogMzBweDtcbiAgYmFja2dyb3VuZDogIzBGQkE4RTtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIGZvbnQtZmFtaWx5OiBteUZvbnQ7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM2MDhEMkI7XG4gIGJvcmRlci1yYWRpdXM6IDI1cHg7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogMjVweDtcbiAgLW1vei1ib3JkZXItcmFkaXVzOiAyNXB4O1xuICAtbXMtYm9yZGVyLXJhZGl1czogMjVweDtcbiAgLW8tYm9yZGVyLXJhZGl1czogMjVweDtcbn1cbi5oZWFkZXItY2FydC1jb3Vyc2Vze1xuXG59XG50ci5tYXQtcm93e1xuICBoZWlnaHQ6IDE1MHB4O1xuICBwYWRkaW5nLXRvcDogMTVweDtcbiAgcGFkZGluZy1ib3R0b206IDE1cHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG50ci5tYXQtaGVhZGVyLXJvdyB7XG4gIGJhY2tncm91bmQ6IGFsaWNlYmx1ZTtcbn1cbi50eHQtY2VudGVye1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uc3RhdHVzLWNoaXB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgcGFkZGluZzogNXB4O1xuICBib3JkZXItcmFkaXVzOiA1MHB4O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDUwcHg7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogNTBweDtcbiAgLW1zLWJvcmRlci1yYWRpdXM6IDUwcHg7XG4gIC1vLWJvcmRlci1yYWRpdXM6IDUwcHg7XG4gIGZvbnQtc2l6ZTogMTNweDtcbn1cbi5wZW5kZGluZ3tcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDIzMSwgMjUzLCAyNyk7XG4gIGNvbG9yOiAjMDAwMDAwO1xuXG59XG4uYXBwcm92ZXtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE4LCAyMzEsIDg5KTtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG4ucmVqZWN0e1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjMxLCAxOCwgMTgpO1xuICBjb2xvcjogI2ZmZmZmZjtcbn1cbi5zZWxlY3QtaG9sZGVye1xuICB3aWR0aDogMjAwcHg7XG4gIG1hcmdpbi1yaWdodDogMjBweDtcbn1cbi5zZWFyY2gtaG9sZGVye1xuICB3aWR0aDogY2FsYygxMDAlIC0gMjIwcHgpO1xufVxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CoursesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-courses',
                templateUrl: './courses.component.html',
                styleUrls: ['./courses.component.scss'],
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_2__["MatDialog"] }, { type: src_app_service_message_service__WEBPACK_IMPORTED_MODULE_3__["MessageService"] }, { type: _courses_service__WEBPACK_IMPORTED_MODULE_4__["CoursesService"] }, { type: src_app_pages_shopping_shopping_service__WEBPACK_IMPORTED_MODULE_5__["ShoppingService"] }]; }, null); })();


/***/ }),

/***/ "HOSn":
/*!***********************************************************!*\
  !*** ./src/app/pages/courses-page/courses-page.module.ts ***!
  \***********************************************************/
/*! exports provided: CoursesPageModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoursesPageModule", function() { return CoursesPageModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _courses_page_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./courses-page-routing.module */ "ykUH");
/* harmony import */ var _components_courses_courses_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/courses/courses.component */ "FJQz");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var ngx_mat_select_search__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-mat-select-search */ "WJ5W");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _components_video_player_video_player_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/video-player/video-player.component */ "jI73");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _components_dialogs_details_course_details_course_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/dialogs/details-course/details-course.component */ "DtC1");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
















class CoursesPageModule {
}
CoursesPageModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: CoursesPageModule });
CoursesPageModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function CoursesPageModule_Factory(t) { return new (t || CoursesPageModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _courses_page_routing_module__WEBPACK_IMPORTED_MODULE_2__["CoursesPageRoutingModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
            ngx_mat_select_search__WEBPACK_IMPORTED_MODULE_6__["NgxMatSelectSearchModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIconModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__["MatDialogModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInputModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_14__["MatTableModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CoursesPageModule, { declarations: [_components_courses_courses_component__WEBPACK_IMPORTED_MODULE_3__["CoursesComponent"], _components_video_player_video_player_component__WEBPACK_IMPORTED_MODULE_10__["VideoPlayerComponent"], _components_dialogs_details_course_details_course_component__WEBPACK_IMPORTED_MODULE_12__["DetailsCourseComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _courses_page_routing_module__WEBPACK_IMPORTED_MODULE_2__["CoursesPageRoutingModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
        ngx_mat_select_search__WEBPACK_IMPORTED_MODULE_6__["NgxMatSelectSearchModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIconModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__["MatDialogModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInputModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_14__["MatTableModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CoursesPageModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_components_courses_courses_component__WEBPACK_IMPORTED_MODULE_3__["CoursesComponent"], _components_video_player_video_player_component__WEBPACK_IMPORTED_MODULE_10__["VideoPlayerComponent"], _components_dialogs_details_course_details_course_component__WEBPACK_IMPORTED_MODULE_12__["DetailsCourseComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _courses_page_routing_module__WEBPACK_IMPORTED_MODULE_2__["CoursesPageRoutingModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                    _angular_material_select__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
                    ngx_mat_select_search__WEBPACK_IMPORTED_MODULE_6__["NgxMatSelectSearchModule"],
                    _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIconModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"],
                    _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__["MatDialogModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_13__["MatInputModule"],
                    _angular_material_table__WEBPACK_IMPORTED_MODULE_14__["MatTableModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "ILGT":
/*!****************************************************************************!*\
  !*** ./node_modules/ngx-mat-select-search/node_modules/tslib/tslib.es6.js ***!
  \****************************************************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __createBinding, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault, __classPrivateFieldGet, __classPrivateFieldSet */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__createBinding", function() { return __createBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldGet", function() { return __classPrivateFieldGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__classPrivateFieldSet", function() { return __classPrivateFieldSet; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __createBinding(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}

function __exportStar(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ }),

/***/ "Qu3c":
/*!*************************************************************************!*\
  !*** ./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tooltip.js ***!
  \*************************************************************************/
/*! exports provided: MAT_TOOLTIP_DEFAULT_OPTIONS, MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY, MAT_TOOLTIP_SCROLL_STRATEGY, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY, MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER, MatTooltip, MatTooltipModule, SCROLL_THROTTLE_MS, TOOLTIP_PANEL_CLASS, TooltipComponent, getMatTooltipInvalidPositionError, matTooltipAnimations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_TOOLTIP_DEFAULT_OPTIONS", function() { return MAT_TOOLTIP_DEFAULT_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY", function() { return MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_TOOLTIP_SCROLL_STRATEGY", function() { return MAT_TOOLTIP_SCROLL_STRATEGY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY", function() { return MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER", function() { return MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTooltip", function() { return MatTooltip; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatTooltipModule", function() { return MatTooltipModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLL_THROTTLE_MS", function() { return SCROLL_THROTTLE_MS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOOLTIP_PANEL_CLASS", function() { return TOOLTIP_PANEL_CLASS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TooltipComponent", function() { return TooltipComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMatTooltipInvalidPositionError", function() { return getMatTooltipInvalidPositionError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matTooltipAnimations", function() { return matTooltipAnimations; });
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/overlay */ "rDax");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/scrolling */ "vxfF");
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/bidi */ "cH1L");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/coercion */ "8LU1");
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/keycodes */ "FtGj");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/layout */ "0MNC");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/cdk/platform */ "nLfN");
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/cdk/portal */ "+rOU");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/animations */ "R0Ic");
















/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Animations used by MatTooltip.
 * @docs-private
 */








const matTooltipAnimations = {
    /** Animation that transitions a tooltip in and out. */
    tooltipState: Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["trigger"])('state', [
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["state"])('initial, void, hidden', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["style"])({ opacity: 0, transform: 'scale(0)' })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["state"])('visible', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["style"])({ transform: 'scale(1)' })),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["transition"])('* => visible', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["animate"])('200ms cubic-bezier(0, 0, 0.2, 1)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["keyframes"])([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["style"])({ opacity: 0, transform: 'scale(0)', offset: 0 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["style"])({ opacity: 0.5, transform: 'scale(0.99)', offset: 0.5 }),
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["style"])({ opacity: 1, transform: 'scale(1)', offset: 1 })
        ]))),
        Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["transition"])('* => hidden', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["animate"])('100ms cubic-bezier(0, 0, 0.2, 1)', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_14__["style"])({ opacity: 0 }))),
    ])
};

/** Time in ms to throttle repositioning after scroll events. */
const SCROLL_THROTTLE_MS = 20;
/** CSS class that will be attached to the overlay panel. */
const TOOLTIP_PANEL_CLASS = 'mat-tooltip-panel';
/** Options used to bind passive event listeners. */
const passiveListenerOptions = Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_10__["normalizePassiveListenerOptions"])({ passive: true });
/**
 * Time between the user putting the pointer on a tooltip
 * trigger and the long press event being fired.
 */
const LONGPRESS_DELAY = 500;
/**
 * Creates an error to be thrown if the user supplied an invalid tooltip position.
 * @docs-private
 */
function getMatTooltipInvalidPositionError(position) {
    return Error(`Tooltip position "${position}" is invalid.`);
}
/** Injection token that determines the scroll handling while a tooltip is visible. */
const MAT_TOOLTIP_SCROLL_STRATEGY = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["InjectionToken"]('mat-tooltip-scroll-strategy');
/** @docs-private */
function MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY(overlay) {
    return () => overlay.scrollStrategies.reposition({ scrollThrottle: SCROLL_THROTTLE_MS });
}
/** @docs-private */
const MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
    provide: MAT_TOOLTIP_SCROLL_STRATEGY,
    deps: [_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__["Overlay"]],
    useFactory: MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY,
};
/** Injection token to be used to override the default options for `matTooltip`. */
const MAT_TOOLTIP_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_3__["InjectionToken"]('mat-tooltip-default-options', {
    providedIn: 'root',
    factory: MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY
});
/** @docs-private */
function MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY() {
    return {
        showDelay: 0,
        hideDelay: 0,
        touchendHideDelay: 1500,
    };
}
/**
 * Directive that attaches a material design tooltip to the host element. Animates the showing and
 * hiding of a tooltip provided position (defaults to below the element).
 *
 * https://material.io/design/components/tooltips.html
 */
class MatTooltip {
    constructor(_overlay, _elementRef, _scrollDispatcher, _viewContainerRef, _ngZone, _platform, _ariaDescriber, _focusMonitor, scrollStrategy, _dir, _defaultOptions) {
        this._overlay = _overlay;
        this._elementRef = _elementRef;
        this._scrollDispatcher = _scrollDispatcher;
        this._viewContainerRef = _viewContainerRef;
        this._ngZone = _ngZone;
        this._platform = _platform;
        this._ariaDescriber = _ariaDescriber;
        this._focusMonitor = _focusMonitor;
        this._dir = _dir;
        this._defaultOptions = _defaultOptions;
        this._position = 'below';
        this._disabled = false;
        this._viewInitialized = false;
        this._pointerExitEventsInitialized = false;
        /** The default delay in ms before showing the tooltip after show is called */
        this.showDelay = this._defaultOptions.showDelay;
        /** The default delay in ms before hiding the tooltip after hide is called */
        this.hideDelay = this._defaultOptions.hideDelay;
        /**
         * How touch gestures should be handled by the tooltip. On touch devices the tooltip directive
         * uses a long press gesture to show and hide, however it can conflict with the native browser
         * gestures. To work around the conflict, Angular Material disables native gestures on the
         * trigger, but that might not be desirable on particular elements (e.g. inputs and draggable
         * elements). The different values for this option configure the touch event handling as follows:
         * - `auto` - Enables touch gestures for all elements, but tries to avoid conflicts with native
         *   browser gestures on particular elements. In particular, it allows text selection on inputs
         *   and textareas, and preserves the native browser dragging on elements marked as `draggable`.
         * - `on` - Enables touch gestures for all elements and disables native
         *   browser gestures with no exceptions.
         * - `off` - Disables touch gestures. Note that this will prevent the tooltip from
         *   showing on touch devices.
         */
        this.touchGestures = 'auto';
        this._message = '';
        /** Manually-bound passive event listeners. */
        this._passiveListeners = [];
        /** Emits when the component is destroyed. */
        this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        /**
         * Handles the keydown events on the host element.
         * Needs to be an arrow function so that we can use it in addEventListener.
         */
        this._handleKeydown = (event) => {
            if (this._isTooltipVisible() && event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_8__["ESCAPE"] && !Object(_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_8__["hasModifierKey"])(event)) {
                event.preventDefault();
                event.stopPropagation();
                this._ngZone.run(() => this.hide(0));
            }
        };
        this._scrollStrategy = scrollStrategy;
        if (_defaultOptions) {
            if (_defaultOptions.position) {
                this.position = _defaultOptions.position;
            }
            if (_defaultOptions.touchGestures) {
                this.touchGestures = _defaultOptions.touchGestures;
            }
        }
        _ngZone.runOutsideAngular(() => {
            _elementRef.nativeElement.addEventListener('keydown', this._handleKeydown);
        });
    }
    /** Allows the user to define the position of the tooltip relative to the parent element */
    get position() { return this._position; }
    set position(value) {
        if (value !== this._position) {
            this._position = value;
            if (this._overlayRef) {
                this._updatePosition();
                if (this._tooltipInstance) {
                    this._tooltipInstance.show(0);
                }
                this._overlayRef.updatePosition();
            }
        }
    }
    /** Disables the display of the tooltip. */
    get disabled() { return this._disabled; }
    set disabled(value) {
        this._disabled = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_7__["coerceBooleanProperty"])(value);
        // If tooltip is disabled, hide immediately.
        if (this._disabled) {
            this.hide(0);
        }
        else {
            this._setupPointerEnterEventsIfNeeded();
        }
    }
    /** The message to be displayed in the tooltip */
    get message() { return this._message; }
    set message(value) {
        this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this._message);
        // If the message is not a string (e.g. number), convert it to a string and trim it.
        this._message = value != null ? `${value}`.trim() : '';
        if (!this._message && this._isTooltipVisible()) {
            this.hide(0);
        }
        else {
            this._setupPointerEnterEventsIfNeeded();
            this._updateTooltipMessage();
            this._ngZone.runOutsideAngular(() => {
                // The `AriaDescriber` has some functionality that avoids adding a description if it's the
                // same as the `aria-label` of an element, however we can't know whether the tooltip trigger
                // has a data-bound `aria-label` or when it'll be set for the first time. We can avoid the
                // issue by deferring the description by a tick so Angular has time to set the `aria-label`.
                Promise.resolve().then(() => {
                    this._ariaDescriber.describe(this._elementRef.nativeElement, this.message);
                });
            });
        }
    }
    /** Classes to be passed to the tooltip. Supports the same syntax as `ngClass`. */
    get tooltipClass() { return this._tooltipClass; }
    set tooltipClass(value) {
        this._tooltipClass = value;
        if (this._tooltipInstance) {
            this._setTooltipClass(this._tooltipClass);
        }
    }
    ngAfterViewInit() {
        // This needs to happen after view init so the initial values for all inputs have been set.
        this._viewInitialized = true;
        this._setupPointerEnterEventsIfNeeded();
        this._focusMonitor.monitor(this._elementRef)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(this._destroyed))
            .subscribe(origin => {
            // Note that the focus monitor runs outside the Angular zone.
            if (!origin) {
                this._ngZone.run(() => this.hide(0));
            }
            else if (origin === 'keyboard') {
                this._ngZone.run(() => this.show());
            }
        });
    }
    /**
     * Dispose the tooltip when destroyed.
     */
    ngOnDestroy() {
        const nativeElement = this._elementRef.nativeElement;
        clearTimeout(this._touchstartTimeout);
        if (this._overlayRef) {
            this._overlayRef.dispose();
            this._tooltipInstance = null;
        }
        // Clean up the event listeners set in the constructor
        nativeElement.removeEventListener('keydown', this._handleKeydown);
        this._passiveListeners.forEach(([event, listener]) => {
            nativeElement.removeEventListener(event, listener, passiveListenerOptions);
        });
        this._passiveListeners.length = 0;
        this._destroyed.next();
        this._destroyed.complete();
        this._ariaDescriber.removeDescription(nativeElement, this.message);
        this._focusMonitor.stopMonitoring(nativeElement);
    }
    /** Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input */
    show(delay = this.showDelay) {
        if (this.disabled || !this.message || (this._isTooltipVisible() &&
            !this._tooltipInstance._showTimeoutId && !this._tooltipInstance._hideTimeoutId)) {
            return;
        }
        const overlayRef = this._createOverlay();
        this._detach();
        this._portal = this._portal || new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_11__["ComponentPortal"](TooltipComponent, this._viewContainerRef);
        this._tooltipInstance = overlayRef.attach(this._portal).instance;
        this._tooltipInstance.afterHidden()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(this._destroyed))
            .subscribe(() => this._detach());
        this._setTooltipClass(this._tooltipClass);
        this._updateTooltipMessage();
        this._tooltipInstance.show(delay);
    }
    /** Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input */
    hide(delay = this.hideDelay) {
        if (this._tooltipInstance) {
            this._tooltipInstance.hide(delay);
        }
    }
    /** Shows/hides the tooltip */
    toggle() {
        this._isTooltipVisible() ? this.hide() : this.show();
    }
    /** Returns true if the tooltip is currently visible to the user */
    _isTooltipVisible() {
        return !!this._tooltipInstance && this._tooltipInstance.isVisible();
    }
    /** Create the overlay config and position strategy */
    _createOverlay() {
        if (this._overlayRef) {
            return this._overlayRef;
        }
        const scrollableAncestors = this._scrollDispatcher.getAncestorScrollContainers(this._elementRef);
        // Create connected position strategy that listens for scroll events to reposition.
        const strategy = this._overlay.position()
            .flexibleConnectedTo(this._elementRef)
            .withTransformOriginOn('.mat-tooltip')
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withScrollableContainers(scrollableAncestors);
        strategy.positionChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(this._destroyed)).subscribe(change => {
            if (this._tooltipInstance) {
                if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible()) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the tooltip.
                    this._ngZone.run(() => this.hide(0));
                }
            }
        });
        this._overlayRef = this._overlay.create({
            direction: this._dir,
            positionStrategy: strategy,
            panelClass: TOOLTIP_PANEL_CLASS,
            scrollStrategy: this._scrollStrategy()
        });
        this._updatePosition();
        this._overlayRef.detachments()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(this._destroyed))
            .subscribe(() => this._detach());
        return this._overlayRef;
    }
    /** Detaches the currently-attached tooltip. */
    _detach() {
        if (this._overlayRef && this._overlayRef.hasAttached()) {
            this._overlayRef.detach();
        }
        this._tooltipInstance = null;
    }
    /** Updates the position of the current tooltip. */
    _updatePosition() {
        const position = this._overlayRef.getConfig().positionStrategy;
        const origin = this._getOrigin();
        const overlay = this._getOverlayPosition();
        position.withPositions([
            Object.assign(Object.assign({}, origin.main), overlay.main),
            Object.assign(Object.assign({}, origin.fallback), overlay.fallback)
        ]);
    }
    /**
     * Returns the origin position and a fallback position based on the user's position preference.
     * The fallback position is the inverse of the origin (e.g. `'below' -> 'above'`).
     */
    _getOrigin() {
        const isLtr = !this._dir || this._dir.value == 'ltr';
        const position = this.position;
        let originPosition;
        if (position == 'above' || position == 'below') {
            originPosition = { originX: 'center', originY: position == 'above' ? 'top' : 'bottom' };
        }
        else if (position == 'before' ||
            (position == 'left' && isLtr) ||
            (position == 'right' && !isLtr)) {
            originPosition = { originX: 'start', originY: 'center' };
        }
        else if (position == 'after' ||
            (position == 'right' && isLtr) ||
            (position == 'left' && !isLtr)) {
            originPosition = { originX: 'end', originY: 'center' };
        }
        else if (typeof ngDevMode === 'undefined' || ngDevMode) {
            throw getMatTooltipInvalidPositionError(position);
        }
        const { x, y } = this._invertPosition(originPosition.originX, originPosition.originY);
        return {
            main: originPosition,
            fallback: { originX: x, originY: y }
        };
    }
    /** Returns the overlay position and a fallback position based on the user's preference */
    _getOverlayPosition() {
        const isLtr = !this._dir || this._dir.value == 'ltr';
        const position = this.position;
        let overlayPosition;
        if (position == 'above') {
            overlayPosition = { overlayX: 'center', overlayY: 'bottom' };
        }
        else if (position == 'below') {
            overlayPosition = { overlayX: 'center', overlayY: 'top' };
        }
        else if (position == 'before' ||
            (position == 'left' && isLtr) ||
            (position == 'right' && !isLtr)) {
            overlayPosition = { overlayX: 'end', overlayY: 'center' };
        }
        else if (position == 'after' ||
            (position == 'right' && isLtr) ||
            (position == 'left' && !isLtr)) {
            overlayPosition = { overlayX: 'start', overlayY: 'center' };
        }
        else if (typeof ngDevMode === 'undefined' || ngDevMode) {
            throw getMatTooltipInvalidPositionError(position);
        }
        const { x, y } = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);
        return {
            main: overlayPosition,
            fallback: { overlayX: x, overlayY: y }
        };
    }
    /** Updates the tooltip message and repositions the overlay according to the new message length */
    _updateTooltipMessage() {
        // Must wait for the message to be painted to the tooltip so that the overlay can properly
        // calculate the correct positioning based on the size of the text.
        if (this._tooltipInstance) {
            this._tooltipInstance.message = this.message;
            this._tooltipInstance._markForCheck();
            this._ngZone.onMicrotaskEmpty.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_13__["takeUntil"])(this._destroyed)).subscribe(() => {
                if (this._tooltipInstance) {
                    this._overlayRef.updatePosition();
                }
            });
        }
    }
    /** Updates the tooltip class */
    _setTooltipClass(tooltipClass) {
        if (this._tooltipInstance) {
            this._tooltipInstance.tooltipClass = tooltipClass;
            this._tooltipInstance._markForCheck();
        }
    }
    /** Inverts an overlay position. */
    _invertPosition(x, y) {
        if (this.position === 'above' || this.position === 'below') {
            if (y === 'top') {
                y = 'bottom';
            }
            else if (y === 'bottom') {
                y = 'top';
            }
        }
        else {
            if (x === 'end') {
                x = 'start';
            }
            else if (x === 'start') {
                x = 'end';
            }
        }
        return { x, y };
    }
    /** Binds the pointer events to the tooltip trigger. */
    _setupPointerEnterEventsIfNeeded() {
        // Optimization: Defer hooking up events if there's no message or the tooltip is disabled.
        if (this._disabled || !this.message || !this._viewInitialized ||
            this._passiveListeners.length) {
            return;
        }
        // The mouse events shouldn't be bound on mobile devices, because they can prevent the
        // first tap from firing its click event or can cause the tooltip to open for clicks.
        if (this._platformSupportsMouseEvents()) {
            this._passiveListeners
                .push(['mouseenter', () => {
                    this._setupPointerExitEventsIfNeeded();
                    this.show();
                }]);
        }
        else if (this.touchGestures !== 'off') {
            this._disableNativeGesturesIfNecessary();
            this._passiveListeners
                .push(['touchstart', () => {
                    // Note that it's important that we don't `preventDefault` here,
                    // because it can prevent click events from firing on the element.
                    this._setupPointerExitEventsIfNeeded();
                    clearTimeout(this._touchstartTimeout);
                    this._touchstartTimeout = setTimeout(() => this.show(), LONGPRESS_DELAY);
                }]);
        }
        this._addListeners(this._passiveListeners);
    }
    _setupPointerExitEventsIfNeeded() {
        if (this._pointerExitEventsInitialized) {
            return;
        }
        this._pointerExitEventsInitialized = true;
        const exitListeners = [];
        if (this._platformSupportsMouseEvents()) {
            exitListeners.push(['mouseleave', () => this.hide()]);
        }
        else if (this.touchGestures !== 'off') {
            this._disableNativeGesturesIfNecessary();
            const touchendListener = () => {
                clearTimeout(this._touchstartTimeout);
                this.hide(this._defaultOptions.touchendHideDelay);
            };
            exitListeners.push(['touchend', touchendListener], ['touchcancel', touchendListener]);
        }
        this._addListeners(exitListeners);
        this._passiveListeners.push(...exitListeners);
    }
    _addListeners(listeners) {
        listeners.forEach(([event, listener]) => {
            this._elementRef.nativeElement.addEventListener(event, listener, passiveListenerOptions);
        });
    }
    _platformSupportsMouseEvents() {
        return !this._platform.IOS && !this._platform.ANDROID;
    }
    /** Disables the native browser gestures, based on how the tooltip has been configured. */
    _disableNativeGesturesIfNecessary() {
        const gestures = this.touchGestures;
        if (gestures !== 'off') {
            const element = this._elementRef.nativeElement;
            const style = element.style;
            // If gestures are set to `auto`, we don't disable text selection on inputs and
            // textareas, because it prevents the user from typing into them on iOS Safari.
            if (gestures === 'on' || (element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA')) {
                style.userSelect = style.msUserSelect = style.webkitUserSelect =
                    style.MozUserSelect = 'none';
            }
            // If we have `auto` gestures and the element uses native HTML dragging,
            // we don't set `-webkit-user-drag` because it prevents the native behavior.
            if (gestures === 'on' || !element.draggable) {
                style.webkitUserDrag = 'none';
            }
            style.touchAction = 'none';
            style.webkitTapHighlightColor = 'transparent';
        }
    }
}
MatTooltip.ɵfac = function MatTooltip_Factory(t) { return new (t || MatTooltip)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__["Overlay"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_5__["ScrollDispatcher"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewContainerRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_10__["Platform"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["AriaDescriber"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["FocusMonitor"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](MAT_TOOLTIP_SCROLL_STRATEGY), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__["Directionality"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](MAT_TOOLTIP_DEFAULT_OPTIONS, 8)); };
MatTooltip.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineDirective"]({ type: MatTooltip, selectors: [["", "matTooltip", ""]], hostAttrs: [1, "mat-tooltip-trigger"], inputs: { showDelay: ["matTooltipShowDelay", "showDelay"], hideDelay: ["matTooltipHideDelay", "hideDelay"], touchGestures: ["matTooltipTouchGestures", "touchGestures"], position: ["matTooltipPosition", "position"], disabled: ["matTooltipDisabled", "disabled"], message: ["matTooltip", "message"], tooltipClass: ["matTooltipClass", "tooltipClass"] }, exportAs: ["matTooltip"] });
MatTooltip.ctorParameters = () => [
    { type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__["Overlay"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] },
    { type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_5__["ScrollDispatcher"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewContainerRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] },
    { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_10__["Platform"] },
    { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["AriaDescriber"] },
    { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["FocusMonitor"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [MAT_TOOLTIP_SCROLL_STRATEGY,] }] },
    { type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__["Directionality"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"], args: [MAT_TOOLTIP_DEFAULT_OPTIONS,] }] }
];
MatTooltip.propDecorators = {
    position: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"], args: ['matTooltipPosition',] }],
    disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"], args: ['matTooltipDisabled',] }],
    showDelay: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"], args: ['matTooltipShowDelay',] }],
    hideDelay: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"], args: ['matTooltipHideDelay',] }],
    touchGestures: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"], args: ['matTooltipTouchGestures',] }],
    message: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"], args: ['matTooltip',] }],
    tooltipClass: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"], args: ['matTooltipClass',] }]
};
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](MatTooltip, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Directive"],
        args: [{
                selector: '[matTooltip]',
                exportAs: 'matTooltip',
                host: {
                    'class': 'mat-tooltip-trigger'
                }
            }]
    }], function () { return [{ type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__["Overlay"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ElementRef"] }, { type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_5__["ScrollDispatcher"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewContainerRef"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgZone"] }, { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_10__["Platform"] }, { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["AriaDescriber"] }, { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["FocusMonitor"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
                args: [MAT_TOOLTIP_SCROLL_STRATEGY]
            }] }, { type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_6__["Directionality"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Inject"],
                args: [MAT_TOOLTIP_DEFAULT_OPTIONS]
            }] }]; }, { showDelay: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
            args: ['matTooltipShowDelay']
        }], hideDelay: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
            args: ['matTooltipHideDelay']
        }], touchGestures: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
            args: ['matTooltipTouchGestures']
        }], position: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
            args: ['matTooltipPosition']
        }], disabled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
            args: ['matTooltipDisabled']
        }], message: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
            args: ['matTooltip']
        }], tooltipClass: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Input"],
            args: ['matTooltipClass']
        }] }); })();
/**
 * Internal component that wraps the tooltip's content.
 * @docs-private
 */
class TooltipComponent {
    constructor(_changeDetectorRef, _breakpointObserver) {
        this._changeDetectorRef = _changeDetectorRef;
        this._breakpointObserver = _breakpointObserver;
        /** Property watched by the animation framework to show or hide the tooltip */
        this._visibility = 'initial';
        /** Whether interactions on the page should close the tooltip */
        this._closeOnInteraction = false;
        /** Subject for notifying that the tooltip has been hidden from the view */
        this._onHide = new rxjs__WEBPACK_IMPORTED_MODULE_12__["Subject"]();
        /** Stream that emits whether the user has a handset-sized display.  */
        this._isHandset = this._breakpointObserver.observe(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_9__["Breakpoints"].Handset);
    }
    /**
     * Shows the tooltip with an animation originating from the provided origin
     * @param delay Amount of milliseconds to the delay showing the tooltip.
     */
    show(delay) {
        // Cancel the delayed hide if it is scheduled
        if (this._hideTimeoutId) {
            clearTimeout(this._hideTimeoutId);
            this._hideTimeoutId = null;
        }
        // Body interactions should cancel the tooltip if there is a delay in showing.
        this._closeOnInteraction = true;
        this._showTimeoutId = setTimeout(() => {
            this._visibility = 'visible';
            this._showTimeoutId = null;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._markForCheck();
        }, delay);
    }
    /**
     * Begins the animation to hide the tooltip after the provided delay in ms.
     * @param delay Amount of milliseconds to delay showing the tooltip.
     */
    hide(delay) {
        // Cancel the delayed show if it is scheduled
        if (this._showTimeoutId) {
            clearTimeout(this._showTimeoutId);
            this._showTimeoutId = null;
        }
        this._hideTimeoutId = setTimeout(() => {
            this._visibility = 'hidden';
            this._hideTimeoutId = null;
            // Mark for check so if any parent component has set the
            // ChangeDetectionStrategy to OnPush it will be checked anyways
            this._markForCheck();
        }, delay);
    }
    /** Returns an observable that notifies when the tooltip has been hidden from view. */
    afterHidden() {
        return this._onHide;
    }
    /** Whether the tooltip is being displayed. */
    isVisible() {
        return this._visibility === 'visible';
    }
    ngOnDestroy() {
        this._onHide.complete();
    }
    _animationStart() {
        this._closeOnInteraction = false;
    }
    _animationDone(event) {
        const toState = event.toState;
        if (toState === 'hidden' && !this.isVisible()) {
            this._onHide.next();
        }
        if (toState === 'visible' || toState === 'hidden') {
            this._closeOnInteraction = true;
        }
    }
    /**
     * Interactions on the HTML body should close the tooltip immediately as defined in the
     * material design spec.
     * https://material.io/design/components/tooltips.html#behavior
     */
    _handleBodyInteraction() {
        if (this._closeOnInteraction) {
            this.hide(0);
        }
    }
    /**
     * Marks that the tooltip needs to be checked in the next change detection run.
     * Mainly used for rendering the initial text before positioning a tooltip, which
     * can be problematic in components with OnPush change detection.
     */
    _markForCheck() {
        this._changeDetectorRef.markForCheck();
    }
}
TooltipComponent.ɵfac = function TooltipComponent_Factory(t) { return new (t || TooltipComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_9__["BreakpointObserver"])); };
TooltipComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: TooltipComponent, selectors: [["mat-tooltip-component"]], hostAttrs: ["aria-hidden", "true"], hostVars: 2, hostBindings: function TooltipComponent_HostBindings(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function TooltipComponent_click_HostBindingHandler() { return ctx._handleBodyInteraction(); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresolveBody"]);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵstyleProp"]("zoom", ctx._visibility === "visible" ? 1 : null);
    } }, decls: 3, vars: 7, consts: [[1, "mat-tooltip", 3, "ngClass"]], template: function TooltipComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("@state.start", function TooltipComponent_Template_div_animation_state_start_0_listener() { return ctx._animationStart(); })("@state.done", function TooltipComponent_Template_div_animation_state_done_0_listener($event) { return ctx._animationDone($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](1, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        var tmp_0_0 = null;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵclassProp"]("mat-tooltip-handset", (tmp_0_0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind1"](1, 5, ctx._isHandset)) == null ? null : tmp_0_0.matches);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngClass", ctx.tooltipClass)("@state", ctx._visibility);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx.message);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["AsyncPipe"]], styles: [".mat-tooltip-panel{pointer-events:none !important}.mat-tooltip{color:#fff;border-radius:4px;margin:14px;max-width:250px;padding-left:8px;padding-right:8px;overflow:hidden;text-overflow:ellipsis}.cdk-high-contrast-active .mat-tooltip{outline:solid 1px}.mat-tooltip-handset{margin:24px;padding-left:16px;padding-right:16px}\n"], encapsulation: 2, data: { animation: [matTooltipAnimations.tooltipState] }, changeDetection: 0 });
TooltipComponent.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] },
    { type: _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_9__["BreakpointObserver"] }
];
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](TooltipComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"],
        args: [{
                selector: 'mat-tooltip-component',
                template: "<div class=\"mat-tooltip\"\n     [ngClass]=\"tooltipClass\"\n     [class.mat-tooltip-handset]=\"(_isHandset | async)?.matches\"\n     [@state]=\"_visibility\"\n     (@state.start)=\"_animationStart()\"\n     (@state.done)=\"_animationDone($event)\">{{message}}</div>\n",
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ViewEncapsulation"].None,
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectionStrategy"].OnPush,
                animations: [matTooltipAnimations.tooltipState],
                host: {
                    // Forces the element to have a layout in IE and Edge. This fixes issues where the element
                    // won't be rendered if the animations are disabled or there is no web animations polyfill.
                    '[style.zoom]': '_visibility === "visible" ? 1 : null',
                    '(body:click)': 'this._handleBodyInteraction()',
                    'aria-hidden': 'true'
                },
                styles: [".mat-tooltip-panel{pointer-events:none !important}.mat-tooltip{color:#fff;border-radius:4px;margin:14px;max-width:250px;padding-left:8px;padding-right:8px;overflow:hidden;text-overflow:ellipsis}.cdk-high-contrast-active .mat-tooltip{outline:solid 1px}.mat-tooltip-handset{margin:24px;padding-left:16px;padding-right:16px}\n"]
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["ChangeDetectorRef"] }, { type: _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_9__["BreakpointObserver"] }]; }, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatTooltipModule {
}
MatTooltipModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: MatTooltipModule });
MatTooltipModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ factory: function MatTooltipModule_Factory(t) { return new (t || MatTooltipModule)(); }, providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER], imports: [[
            _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["A11yModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__["OverlayModule"],
            _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"],
        ], _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_5__["CdkScrollableModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](MatTooltipModule, { declarations: function () { return [MatTooltip, TooltipComponent]; }, imports: function () { return [_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["A11yModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
        _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__["OverlayModule"],
        _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"]]; }, exports: function () { return [MatTooltip, TooltipComponent, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_5__["CdkScrollableModule"]]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵsetClassMetadata"](MatTooltipModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"],
        args: [{
                imports: [
                    _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_1__["A11yModule"],
                    _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                    _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__["OverlayModule"],
                    _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"],
                ],
                exports: [MatTooltip, TooltipComponent, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"], _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_5__["CdkScrollableModule"]],
                declarations: [MatTooltip, TooltipComponent],
                entryComponents: [TooltipComponent],
                providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER]
            }]
    }], null, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=tooltip.js.map

/***/ }),

/***/ "WJ5W":
/*!*******************************************************************************************!*\
  !*** ./node_modules/ngx-mat-select-search/__ivy_ngcc__/fesm2015/ngx-mat-select-search.js ***!
  \*******************************************************************************************/
/*! exports provided: MatSelectSearchComponent, MatSelectSearchVersion, NgxMatSelectSearchModule, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatSelectSearchComponent", function() { return MatSelectSearchComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatSelectSearchVersion", function() { return MatSelectSearchVersion; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxMatSelectSearchModule", function() { return NgxMatSelectSearchModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return MatSelectSearchClearDirective; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "ILGT");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/keycodes */ "FtGj");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/scrolling */ "vxfF");
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/tooltip */ "Qu3c");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ "ofXK");


















/**
 * Directive for providing a custom clear-icon.
 * e.g.
 * <ngx-mat-select-search [formControl]="bankFilterCtrl">
 *   <mat-icon ngxMatSelectSearchClear>delete</mat-icon>
 * </ngx-mat-select-search>
 */














const _c0 = ["searchSelectInput"];
const _c1 = ["innerSelectSearch"];
function MatSelectSearchComponent_mat_checkbox_3_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-checkbox", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("change", function MatSelectSearchComponent_mat_checkbox_3_Template_mat_checkbox_change_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r6._emitSelectAllBooleanToParent($event.checked); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("color", ctx_r1.matFormField == null ? null : ctx_r1.matFormField.color)("checked", ctx_r1.toggleAllCheckboxChecked)("indeterminate", ctx_r1.toggleAllCheckboxIndeterminate)("matTooltip", ctx_r1.toggleAllCheckboxTooltipMessage)("matTooltipPosition", ctx_r1.toogleAllCheckboxTooltipPosition);
} }
function MatSelectSearchComponent_mat_spinner_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-spinner", 10);
} }
function MatSelectSearchComponent_button_7_ng_content_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](0, 1, ["*ngIf", "clearIcon; else defaultIcon"]);
} }
function MatSelectSearchComponent_button_7_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function MatSelectSearchComponent_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MatSelectSearchComponent_button_7_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r12); const ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r11._reset(true); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, MatSelectSearchComponent_button_7_ng_content_1_Template, 1, 0, "ng-content", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, MatSelectSearchComponent_button_7_ng_template_2_Template, 2, 0, "ng-template", null, 13, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplateRefExtractor"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](3);
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r4.clearIcon)("ngIfElse", _r9);
} }
function MatSelectSearchComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r5.noEntriesFoundLabel, "\n");
} }
const _c2 = [[["", 8, "mat-select-search-custom-header-content"]], [["", "ngxMatSelectSearchClear", ""]]];
const _c3 = function (a0, a1) { return { "mat-select-search-inner-multiple": a0, "mat-select-search-inner-toggle-all": a1 }; };
const _c4 = [".mat-select-search-custom-header-content", "[ngxMatSelectSearchClear]"];
let MatSelectSearchClearDirective = class MatSelectSearchClearDirective {
};
MatSelectSearchClearDirective.ɵfac = function MatSelectSearchClearDirective_Factory(t) { return new (t || MatSelectSearchClearDirective)(); };
MatSelectSearchClearDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineDirective"]({ type: MatSelectSearchClearDirective, selectors: [["", "ngxMatSelectSearchClear", ""]] });

/**
 * Copyright (c) 2018 Bithost GmbH All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var MatSelectSearchComponent_1;
/* tslint:disable:member-ordering component-selector */
/**
 * Component providing an input field for searching MatSelect options.
 *
 * Example usage:
 *
 * interface Bank {
 *  id: string;
 *  name: string;
 * }
 *
 * @Component({
 *   selector: 'my-app-data-selection',
 *   template: `
 *     <mat-form-field>
 *       <mat-select [formControl]="bankCtrl" placeholder="Bank">
 *         <mat-option>
 *           <ngx-mat-select-search [formControl]="bankFilterCtrl"></ngx-mat-select-search>
 *         </mat-option>
 *         <mat-option *ngFor="let bank of filteredBanks | async" [value]="bank.id">
 *           {{bank.name}}
 *         </mat-option>
 *       </mat-select>
 *     </mat-form-field>
 *   `
 * })
 * export class DataSelectionComponent implements OnInit, OnDestroy {
 *
 *   // control for the selected bank
 *   public bankCtrl: FormControl = new FormControl();
 *   // control for the MatSelect filter keyword
 *   public bankFilterCtrl: FormControl = new FormControl();
 *
 *   // list of banks
 *   private banks: Bank[] = [{name: 'Bank A', id: 'A'}, {name: 'Bank B', id: 'B'}, {name: 'Bank C', id: 'C'}];
 *   // list of banks filtered by search keyword
 *   public filteredBanks: ReplaySubject<Bank[]> = new ReplaySubject<Bank[]>(1);
 *
 *   // Subject that emits when the component has been destroyed.
 *   private _onDestroy = new Subject<void>();
 *
 *
 *   ngOnInit() {
 *     // load the initial bank list
 *     this.filteredBanks.next(this.banks.slice());
 *     // listen for search field value changes
 *     this.bankFilterCtrl.valueChanges
 *       .pipe(takeUntil(this._onDestroy))
 *       .subscribe(() => {
 *         this.filterBanks();
 *       });
 *   }
 *
 *   ngOnDestroy() {
 *     this._onDestroy.next();
 *     this._onDestroy.complete();
 *   }
 *
 *   private filterBanks() {
 *     if (!this.banks) {
 *       return;
 *     }
 *
 *     // get the search keyword
 *     let search = this.bankFilterCtrl.value;
 *     if (!search) {
 *       this.filteredBanks.next(this.banks.slice());
 *       return;
 *     } else {
 *       search = search.toLowerCase();
 *     }
 *
 *     // filter the banks
 *     this.filteredBanks.next(
 *       this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
 *     );
 *   }
 * }
 */
let MatSelectSearchComponent = MatSelectSearchComponent_1 = class MatSelectSearchComponent {
    constructor(matSelect, changeDetectorRef, _viewportRuler, matOption = null, liveAnnouncer, matFormField = null) {
        this.matSelect = matSelect;
        this.changeDetectorRef = changeDetectorRef;
        this._viewportRuler = _viewportRuler;
        this.matOption = matOption;
        this.liveAnnouncer = liveAnnouncer;
        this.matFormField = matFormField;
        /** Label of the search placeholder */
        this.placeholderLabel = 'Suche';
        /** Type of the search input field */
        this.type = 'text';
        /** Label to be shown when no entries are found. Set to null if no message should be shown. */
        this.noEntriesFoundLabel = 'Keine Optionen gefunden';
        /**
         *  Text that is appended to the currently active item label announced by screen readers,
         *  informing the user of the current index, value and total options.
         *  eg: Bank R (Germany) 1 of 6
        */
        this.indexAndLengthScreenReaderText = ' of ';
        /**
          * Whether or not the search field should be cleared after the dropdown menu is closed.
          * Useful for server-side filtering. See [#3](https://github.com/bithost-gmbh/ngx-mat-select-search/issues/3)
          */
        this.clearSearchInput = true;
        /** Whether to show the search-in-progress indicator */
        this.searching = false;
        /** Disables initial focusing of the input field */
        this.disableInitialFocus = false;
        /** Enable clear input on escape pressed */
        this.enableClearOnEscapePressed = false;
        /**
         * Prevents home / end key being propagated to mat-select,
         * allowing to move the cursor within the search input instead of navigating the options
         */
        this.preventHomeEndKeyPropagation = false;
        /** Disables scrolling to active options when option list changes. Useful for server-side search */
        this.disableScrollToActiveOnOptionsChanged = false;
        /** Adds 508 screen reader support for search box */
        this.ariaLabel = 'dropdown search';
        /** Whether to show Select All Checkbox (for mat-select[multi=true]) */
        this.showToggleAllCheckbox = false;
        /** select all checkbox checked state */
        this.toggleAllCheckboxChecked = false;
        /** select all checkbox indeterminate state */
        this.toggleAllCheckboxIndeterminate = false;
        /** Display a message in a tooltip on the toggle-all checkbox */
        this.toggleAllCheckboxTooltipMessage = '';
        /** Define the position of the tooltip on the toggle-all checkbox. */
        this.toogleAllCheckboxTooltipPosition = 'below';
        /** Output emitter to send to parent component with the toggle all boolean */
        this.toggleAll = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onTouched = (_) => { };
        this._options$ = new rxjs__WEBPACK_IMPORTED_MODULE_9__["BehaviorSubject"](null);
        this.optionsList$ = this._options$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["switchMap"])(_options => _options ?
            _options.changes.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(options => options.toArray()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["startWith"])(_options.toArray())) : Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["of"])(null)));
        this.optionsLength$ = this.optionsList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(options => options ? options.length : 0));
        this._formControl = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"]('');
        /** whether to show the no entries found message */
        this._showNoEntriesFound$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_9__["combineLatest"])([
            this._formControl.valueChanges,
            this.optionsLength$
        ]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["map"])(([value, optionsLength]) => this.noEntriesFoundLabel && value
            && optionsLength === this.getOptionsLengthOffset()));
        /** Subject that emits when the component has been destroyed. */
        this._onDestroy = new rxjs__WEBPACK_IMPORTED_MODULE_9__["Subject"]();
    }
    get isInsideMatOption() {
        return !!this.matOption;
    }
    /** Current search value */
    get value() {
        return this._formControl.value;
    }
    /** Reference to the MatSelect options */
    set _options(_options) {
        this._options$.next(_options);
    }
    get _options() {
        return this._options$.getValue();
    }
    ngOnInit() {
        // set custom panel class
        const panelClass = 'mat-select-search-panel';
        if (this.matSelect.panelClass) {
            if (Array.isArray(this.matSelect.panelClass)) {
                this.matSelect.panelClass.push(panelClass);
            }
            else if (typeof this.matSelect.panelClass === 'string') {
                this.matSelect.panelClass = [this.matSelect.panelClass, panelClass];
            }
            else if (typeof this.matSelect.panelClass === 'object') {
                this.matSelect.panelClass[panelClass] = true;
            }
        }
        else {
            this.matSelect.panelClass = panelClass;
        }
        // set custom mat-option class if the component was placed inside a mat-option
        if (this.matOption) {
            this.matOption.disabled = true;
            this.matOption._getHostElement().classList.add('contains-mat-select-search');
        }
        else {
            console.error('<ngx-mat-select-search> must be placed inside a <mat-option> element');
        }
        // when the select dropdown panel is opened or closed
        this.matSelect.openedChange
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["delay"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._onDestroy))
            .subscribe((opened) => {
            if (opened) {
                this.updateInputWidth();
                // focus the search field when opening
                if (!this.disableInitialFocus) {
                    this._focus();
                }
            }
            else {
                // clear it when closing
                if (this.clearSearchInput) {
                    this._reset();
                }
            }
        });
        // set the first item active after the options changed
        this.matSelect.openedChange
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["take"])(1))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._onDestroy))
            .subscribe(() => {
            if (this.matSelect._keyManager) {
                this.matSelect._keyManager.change.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._onDestroy))
                    .subscribe(() => this.adjustScrollTopToFitActiveOptionIntoView());
            }
            else {
                console.log('_keyManager was not initialized.');
            }
            this._options = this.matSelect.options;
            // Closure variable for tracking the most recent first option.
            // In order to avoid avoid causing the list to
            // scroll to the top when options are added to the bottom of
            // the list (eg: infinite scroll), we compare only
            // the changes to the first options to determine if we
            // should set the first item as active.
            // This prevents unnecessary scrolling to the top of the list
            // when options are appended, but allows the first item
            // in the list to be set as active by default when there
            // is no active selection
            let previousFirstOption = this._options.toArray()[this.getOptionsLengthOffset()];
            this._options.changes
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._onDestroy))
                .subscribe(() => {
                // avoid "expression has been changed" error
                setTimeout(() => {
                    // Convert the QueryList to an array
                    const options = this._options.toArray();
                    // The true first item is offset by 1
                    const currentFirstOption = options[this.getOptionsLengthOffset()];
                    const keyManager = this.matSelect._keyManager;
                    if (keyManager && this.matSelect.panelOpen) {
                        // set first item active and input width
                        // Check to see if the first option in these changes is different from the previous.
                        const firstOptionIsChanged = !this.matSelect.compareWith(previousFirstOption, currentFirstOption);
                        // CASE: The first option is different now.
                        // Indiciates we should set it as active and scroll to the top.
                        if (firstOptionIsChanged
                            || !keyManager.activeItem
                            || !options.find(option => this.matSelect.compareWith(option, keyManager.activeItem))) {
                            keyManager.setFirstItemActive();
                        }
                        // wait for panel width changes
                        setTimeout(() => {
                            this.updateInputWidth();
                        });
                        if (!this.disableScrollToActiveOnOptionsChanged) {
                            this.adjustScrollTopToFitActiveOptionIntoView();
                        }
                    }
                    // Update our reference
                    previousFirstOption = currentFirstOption;
                });
            });
        });
        // add or remove css class depending on whether to show the no entries found message
        // note: this is hacky
        this._showNoEntriesFound$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._onDestroy)).subscribe(showNoEntriesFound => {
            // set no entries found class on mat option
            if (this.matOption) {
                if (showNoEntriesFound) {
                    this.matOption._getHostElement().classList.add('mat-select-search-no-entries-found');
                }
                else {
                    this.matOption._getHostElement().classList.remove('mat-select-search-no-entries-found');
                }
            }
        });
        // resize the input width when the viewport is resized, i.e. the trigger width could potentially be resized
        this._viewportRuler.change()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._onDestroy))
            .subscribe(() => {
            if (this.matSelect.panelOpen) {
                this.updateInputWidth();
            }
        });
        this.initMultipleHandling();
        this.optionsList$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._onDestroy)).subscribe(() => {
            // update view when available options change
            this.changeDetectorRef.markForCheck();
        });
    }
    _emitSelectAllBooleanToParent(state) {
        this.toggleAll.emit(state);
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    _isToggleAllCheckboxVisible() {
        return this.matSelect.multiple && this.showToggleAllCheckbox;
    }
    /**
     * Handles the key down event with MatSelect.
     * Allows e.g. selecting with enter key, navigation with arrow keys, etc.
     * @param event
     */
    _handleKeydown(event) {
        // Prevent propagation for all alphanumeric characters in order to avoid selection issues
        if ((event.key && event.key.length === 1) ||
            (event.keyCode >= _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__["A"] && event.keyCode <= _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__["Z"]) ||
            (event.keyCode >= _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__["ZERO"] && event.keyCode <= _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__["NINE"]) ||
            (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__["SPACE"])
            || (this.preventHomeEndKeyPropagation && (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__["HOME"] || event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__["END"]))) {
            event.stopPropagation();
        }
        if (this.matSelect.multiple && event.key && event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__["ENTER"]) {
            // Regain focus after multiselect, so we can further type
            setTimeout(() => this._focus());
        }
        // Special case if click Escape, if input is empty, close the dropdown, if not, empty out the search field
        if (this.enableClearOnEscapePressed === true && event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__["ESCAPE"] && this.value) {
            this._reset(true);
            event.stopPropagation();
        }
    }
    /**
     * Handles the key up event with MatSelect.
     * Allows e.g. the announcing of the currently activeDescendant by screen readers.
     */
    _handleKeyup(event) {
        if (event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__["UP_ARROW"] || event.keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__["DOWN_ARROW"]) {
            const ariaActiveDescendantId = this.matSelect._getAriaActiveDescendant();
            const index = this._options.toArray().findIndex(item => item.id === ariaActiveDescendantId);
            if (index !== -1) {
                const activeDescendant = this._options.toArray()[index];
                this.liveAnnouncer.announce(activeDescendant.viewValue + ' '
                    + this.getAriaIndex(index)
                    + this.indexAndLengthScreenReaderText
                    + this.getAriaLength());
            }
        }
    }
    /**
     * Calculate the index of the current option, taking the offset to length into account.
     * examples:
     *    Case 1 [Search, 1, 2, 3] will have offset of 1, due to search and will read index of total.
     *    Case 2 [1, 2, 3] will have offset of 0 and will read index +1 of total.
     */
    getAriaIndex(optionIndex) {
        if (this.getOptionsLengthOffset() === 0) {
            return optionIndex + 1;
        }
        return optionIndex;
    }
    /**
     * Calculate the length of the options, taking the offset to length into account.
     * examples:
     *    Case 1 [Search, 1, 2, 3] will have length of options.length -1, due to search.
     *    Case 2 [1, 2, 3] will have length of options.length.
     */
    getAriaLength() {
        return this._options.toArray().length - this.getOptionsLengthOffset();
    }
    writeValue(value) {
        this._lastExternalInputValue = value;
        this._formControl.setValue(value);
        this.changeDetectorRef.markForCheck();
    }
    onBlur() {
        this.onTouched();
    }
    registerOnChange(fn) {
        this._formControl.valueChanges.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["filter"])(value => value !== this._lastExternalInputValue), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["tap"])(() => this._lastExternalInputValue = undefined), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._onDestroy)).subscribe(fn);
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * Focuses the search input field
     */
    _focus() {
        if (!this.searchSelectInput || !this.matSelect.panel) {
            return;
        }
        // save and restore scrollTop of panel, since it will be reset by focus()
        // note: this is hacky
        const panel = this.matSelect.panel.nativeElement;
        const scrollTop = panel.scrollTop;
        // focus
        this.searchSelectInput.nativeElement.focus();
        panel.scrollTop = scrollTop;
    }
    /**
     * Resets the current search value
     * @param focus whether to focus after resetting
     */
    _reset(focus) {
        this._formControl.setValue('');
        if (focus) {
            this._focus();
        }
    }
    /**
     * Initializes handling <mat-select [multiple]="true">
     * Note: to improve this code, mat-select should be extended to allow disabling resetting the selection while filtering.
     */
    initMultipleHandling() {
        if (!this.matSelect.ngControl) {
            if (this.matSelect.multiple) {
                // note: the access to matSelect.ngControl (instead of matSelect.value / matSelect.valueChanges)
                // is necessary to properly work in multi-selection mode.
                console.error('the mat-select containing ngx-mat-select-search must have a ngModel or formControl directive when multiple=true');
            }
            return;
        }
        // if <mat-select [multiple]="true">
        // store previously selected values and restore them when they are deselected
        // because the option is not available while we are currently filtering
        this.previousSelectedValues = this.matSelect.ngControl.value;
        this.matSelect.ngControl.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_10__["takeUntil"])(this._onDestroy))
            .subscribe((values) => {
            let restoreSelectedValues = false;
            if (this.matSelect.multiple) {
                if (this._formControl.value && this._formControl.value.length
                    && this.previousSelectedValues && Array.isArray(this.previousSelectedValues)) {
                    if (!values || !Array.isArray(values)) {
                        values = [];
                    }
                    const optionValues = this.matSelect.options.map(option => option.value);
                    this.previousSelectedValues.forEach(previousValue => {
                        if (!values.some(v => this.matSelect.compareWith(v, previousValue))
                            && !optionValues.some(v => this.matSelect.compareWith(v, previousValue))) {
                            // if a value that was selected before is deselected and not found in the options, it was deselected
                            // due to the filtering, so we restore it.
                            values.push(previousValue);
                            restoreSelectedValues = true;
                        }
                    });
                }
            }
            this.previousSelectedValues = values;
            if (restoreSelectedValues) {
                this.matSelect._onChange(values);
            }
        });
    }
    /**
     * Scrolls the currently active option into the view if it is not yet visible.
     */
    adjustScrollTopToFitActiveOptionIntoView() {
        if (this.matSelect.panel && this.matSelect.options.length > 0) {
            const matOptionHeight = this.getMatOptionHeight();
            const activeOptionIndex = this.matSelect._keyManager.activeItemIndex || 0;
            const labelCount = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["_countGroupLabelsBeforeOption"])(activeOptionIndex, this.matSelect.options, this.matSelect.optionGroups);
            // If the component is in a MatOption, the activeItemIndex will be offset by one.
            const indexOfOptionToFitIntoView = (this.matOption ? -1 : 0) + labelCount + activeOptionIndex;
            const currentScrollTop = this.matSelect.panel.nativeElement.scrollTop;
            const searchInputHeight = this.innerSelectSearch.nativeElement.offsetHeight;
            const amountOfVisibleOptions = Math.floor((_angular_material_select__WEBPACK_IMPORTED_MODULE_4__["SELECT_PANEL_MAX_HEIGHT"] - searchInputHeight) / matOptionHeight);
            const indexOfFirstVisibleOption = Math.round((currentScrollTop + searchInputHeight) / matOptionHeight) - 1;
            if (indexOfFirstVisibleOption >= indexOfOptionToFitIntoView) {
                this.matSelect.panel.nativeElement.scrollTop = indexOfOptionToFitIntoView * matOptionHeight;
            }
            else if (indexOfFirstVisibleOption + amountOfVisibleOptions <= indexOfOptionToFitIntoView) {
                this.matSelect.panel.nativeElement.scrollTop = (indexOfOptionToFitIntoView + 1) * matOptionHeight
                    - (_angular_material_select__WEBPACK_IMPORTED_MODULE_4__["SELECT_PANEL_MAX_HEIGHT"] - searchInputHeight);
            }
        }
    }
    /**
     *  Set the width of the innerSelectSearch to fit even custom scrollbars
     *  And support all Operation Systems
     */
    updateInputWidth() {
        if (!this.innerSelectSearch || !this.innerSelectSearch.nativeElement) {
            return;
        }
        let element = this.innerSelectSearch.nativeElement;
        let panelElement;
        while (element = element.parentElement) {
            if (element.classList.contains('mat-select-panel')) {
                panelElement = element;
                break;
            }
        }
        if (panelElement) {
            this.innerSelectSearch.nativeElement.style.width = panelElement.clientWidth + 'px';
        }
    }
    getMatOptionHeight() {
        if (this.matSelect.options.length > 0) {
            return this.matSelect.options.first._getHostElement().getBoundingClientRect().height;
        }
        return 0;
    }
    /**
     * Determine the offset to length that can be caused by the optional matOption used as a search input.
     */
    getOptionsLengthOffset() {
        if (this.matOption) {
            return 1;
        }
        else {
            return 0;
        }
    }
};
MatSelectSearchComponent.ɵfac = function MatSelectSearchComponent_Factory(t) { return new (t || MatSelectSearchComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_select__WEBPACK_IMPORTED_MODULE_4__["MatSelect"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_7__["ViewportRuler"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOption"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_8__["LiveAnnouncer"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], 8)); };
MatSelectSearchComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: MatSelectSearchComponent, selectors: [["ngx-mat-select-search"]], contentQueries: function MatSelectSearchComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵcontentQuery"](dirIndex, MatSelectSearchClearDirective, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.clearIcon = _t.first);
    } }, viewQuery: function MatSelectSearchComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstaticViewQuery"](_c0, true, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstaticViewQuery"](_c1, true, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.searchSelectInput = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.innerSelectSearch = _t.first);
    } }, hostVars: 2, hostBindings: function MatSelectSearchComponent_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("mat-select-search-inside-mat-option", ctx.isInsideMatOption);
    } }, inputs: { placeholderLabel: "placeholderLabel", type: "type", noEntriesFoundLabel: "noEntriesFoundLabel", indexAndLengthScreenReaderText: "indexAndLengthScreenReaderText", clearSearchInput: "clearSearchInput", searching: "searching", disableInitialFocus: "disableInitialFocus", enableClearOnEscapePressed: "enableClearOnEscapePressed", preventHomeEndKeyPropagation: "preventHomeEndKeyPropagation", disableScrollToActiveOnOptionsChanged: "disableScrollToActiveOnOptionsChanged", ariaLabel: "ariaLabel", showToggleAllCheckbox: "showToggleAllCheckbox", toggleAllCheckboxChecked: "toggleAllCheckboxChecked", toggleAllCheckboxIndeterminate: "toggleAllCheckboxIndeterminate", toggleAllCheckboxTooltipMessage: "toggleAllCheckboxTooltipMessage", toogleAllCheckboxTooltipPosition: "toogleAllCheckboxTooltipPosition" }, outputs: { toggleAll: "toggleAll" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => MatSelectSearchComponent_1),
                multi: true
            }
        ])], ngContentSelectors: _c4, decls: 11, vars: 14, consts: [["matInput", "", 1, "mat-select-search-input", "mat-select-search-hidden"], [1, "mat-select-search-inner", "mat-typography", "mat-datepicker-content", "mat-tab-header", 3, "ngClass"], ["innerSelectSearch", ""], ["class", "mat-select-search-toggle-all-checkbox", "matTooltipClass", "ngx-mat-select-search-toggle-all-tooltip", 3, "color", "checked", "indeterminate", "matTooltip", "matTooltipPosition", "change", 4, "ngIf"], ["autocomplete", "off", 1, "mat-select-search-input", "mat-input-element", 3, "type", "formControl", "placeholder", "keydown", "keyup", "blur"], ["searchSelectInput", ""], ["class", "mat-select-search-spinner", "diameter", "16", 4, "ngIf"], ["mat-button", "", "mat-icon-button", "", "aria-label", "Clear", "class", "mat-select-search-clear", 3, "click", 4, "ngIf"], ["class", "mat-select-search-no-entries-found", 4, "ngIf"], ["matTooltipClass", "ngx-mat-select-search-toggle-all-tooltip", 1, "mat-select-search-toggle-all-checkbox", 3, "color", "checked", "indeterminate", "matTooltip", "matTooltipPosition", "change"], ["diameter", "16", 1, "mat-select-search-spinner"], ["mat-button", "", "mat-icon-button", "", "aria-label", "Clear", 1, "mat-select-search-clear", 3, "click"], [4, "ngIf", "ngIfElse"], ["defaultIcon", ""], [1, "mat-select-search-no-entries-found"]], template: function MatSelectSearchComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojectionDef"](_c2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "input", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, MatSelectSearchComponent_mat_checkbox_3_Template, 1, 5, "mat-checkbox", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "input", 4, 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("keydown", function MatSelectSearchComponent_Template_input_keydown_4_listener($event) { return ctx._handleKeydown($event); })("keyup", function MatSelectSearchComponent_Template_input_keyup_4_listener($event) { return ctx._handleKeyup($event); })("blur", function MatSelectSearchComponent_Template_input_blur_4_listener() { return ctx.onBlur(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, MatSelectSearchComponent_mat_spinner_6_Template, 1, 0, "mat-spinner", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, MatSelectSearchComponent_button_7_Template, 4, 2, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵprojection"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, MatSelectSearchComponent_div_9_Template, 2, 1, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](10, "async");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction2"](11, _c3, ctx.matSelect.multiple, ctx._isToggleAllCheckboxVisible()));
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx._isToggleAllCheckboxVisible());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("type", ctx.type)("formControl", ctx._formControl)("placeholder", ctx.placeholderLabel);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵattribute"]("aria-label", ctx.ariaLabel);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.searching);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.value && !ctx.searching);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](10, 9, ctx._showNoEntriesFound$));
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_16__["NgClass"], _angular_common__WEBPACK_IMPORTED_MODULE_16__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControlDirective"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__["MatCheckbox"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__["MatTooltip"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__["MatSpinner"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButton"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIcon"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_16__["AsyncPipe"]], styles: [".mat-select-search-hidden[_ngcontent-%COMP%]{visibility:hidden}.mat-select-search-inner[_ngcontent-%COMP%]{position:absolute;top:0;width:100%;border-bottom-width:1px;border-bottom-style:solid;z-index:100;font-size:inherit;box-shadow:none;border-radius:4px 4px 0 0;-webkit-transform:translate3d(0,0,0)}.mat-select-search-inner.mat-select-search-inner-multiple[_ngcontent-%COMP%]{width:100%}.mat-select-search-inner.mat-select-search-inner-multiple.mat-select-search-inner-toggle-all[_ngcontent-%COMP%]{display:flex;align-items:center}.mat-select-search-inner[_ngcontent-%COMP%]   .mat-input-element[_ngcontent-%COMP%]{flex-basis:auto}.mat-select-search-inner[_ngcontent-%COMP%]   .mat-input-element[_ngcontent-%COMP%]:-ms-input-placeholder{-ms-user-select:text}  .mat-select-search-panel{transform:none!important;overflow-x:hidden}.mat-select-search-input[_ngcontent-%COMP%]{padding:16px 44px 16px 16px;box-sizing:border-box;width:100%}[dir=rtl][_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-right:16px;padding-left:44px}.mat-select-search-no-entries-found[_ngcontent-%COMP%]{padding:16px}.mat-select-search-clear[_ngcontent-%COMP%]{position:absolute;right:4px;top:5px}[dir=rtl][_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%]{right:auto;left:4px}.mat-select-search-spinner[_ngcontent-%COMP%]{position:absolute;right:16px;top:calc(50% - 8px)}[dir=rtl][_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-spinner[_ngcontent-%COMP%]{right:auto;left:16px}.mat-select-search-inside-mat-option[_nghost-%COMP%]   .mat-select-search-input[_ngcontent-%COMP%]{padding-top:0;padding-bottom:0;height:3em;line-height:3em}.mat-select-search-inside-mat-option[_nghost-%COMP%]   .mat-select-search-clear[_ngcontent-%COMP%]{top:3px}  .mat-option[aria-disabled=true].contains-mat-select-search{position:static;padding:0}  .mat-option[aria-disabled=true].contains-mat-select-search .mat-icon{margin-right:0;margin-left:0}  .mat-option[aria-disabled=true].contains-mat-select-search .mat-option-pseudo-checkbox{display:none}  .mat-option[aria-disabled=true].contains-mat-select-search.mat-select-search-no-entries-found{height:6em}.mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:16px;padding-bottom:2px}[dir=rtl][_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%], [dir=rtl]   [_nghost-%COMP%]   .mat-select-search-toggle-all-checkbox[_ngcontent-%COMP%]{padding-left:0;padding-right:16px}"], changeDetection: 0 });
MatSelectSearchComponent.ctorParameters = () => [
    { type: _angular_material_select__WEBPACK_IMPORTED_MODULE_4__["MatSelect"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_select__WEBPACK_IMPORTED_MODULE_4__["MatSelect"],] }] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] },
    { type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_7__["ViewportRuler"] },
    { type: _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOption"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOption"],] }] },
    { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_8__["LiveAnnouncer"] },
    { type: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"],] }] }
];
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "placeholderLabel", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "type", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "noEntriesFoundLabel", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "indexAndLengthScreenReaderText", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "clearSearchInput", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "searching", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "disableInitialFocus", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "enableClearOnEscapePressed", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "preventHomeEndKeyPropagation", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "disableScrollToActiveOnOptionsChanged", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "ariaLabel", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "showToggleAllCheckbox", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "toggleAllCheckboxChecked", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "toggleAllCheckboxIndeterminate", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "toggleAllCheckboxTooltipMessage", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])()
], MatSelectSearchComponent.prototype, "toogleAllCheckboxTooltipPosition", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])()
], MatSelectSearchComponent.prototype, "toggleAll", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('searchSelectInput', { read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], static: true })
], MatSelectSearchComponent.prototype, "searchSelectInput", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('innerSelectSearch', { read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], static: true })
], MatSelectSearchComponent.prototype, "innerSelectSearch", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChild"])(MatSelectSearchClearDirective, { static: false })
], MatSelectSearchComponent.prototype, "clearIcon", void 0);
Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"])('class.mat-select-search-inside-mat-option')
], MatSelectSearchComponent.prototype, "isInsideMatOption", null);
MatSelectSearchComponent = MatSelectSearchComponent_1 = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"])([ Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_select__WEBPACK_IMPORTED_MODULE_4__["MatSelect"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOption"])),
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"])()), Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__param"])(5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"]))
], MatSelectSearchComponent);

/**
 * Copyright (c) 2018 Bithost GmbH All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const MatSelectSearchVersion = '3.1.4';
let NgxMatSelectSearchModule = class NgxMatSelectSearchModule {
};
NgxMatSelectSearchModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: NgxMatSelectSearchModule });
NgxMatSelectSearchModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function NgxMatSelectSearchModule_Factory(t) { return new (t || NgxMatSelectSearchModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_16__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__["MatCheckboxModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIconModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__["MatProgressSpinnerModule"],
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__["MatTooltipModule"]
        ]] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatSelectSearchClearDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"],
        args: [{
                selector: '[ngxMatSelectSearchClear]'
            }]
    }], null, null); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MatSelectSearchComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'ngx-mat-select-search',
                template: "<!-- Placeholder to adjust vertical offset of the mat-option elements -->\r\n<input matInput class=\"mat-select-search-input mat-select-search-hidden\"/>\r\n\r\n<!-- Note: the  mat-datepicker-content mat-tab-header are needed to inherit the material theme colors, see PR #22 -->\r\n<div\r\n      #innerSelectSearch\r\n      class=\"mat-select-search-inner mat-typography mat-datepicker-content mat-tab-header\"\r\n      [ngClass]=\"{'mat-select-search-inner-multiple': matSelect.multiple, 'mat-select-search-inner-toggle-all': _isToggleAllCheckboxVisible() }\">\r\n\r\n  <mat-checkbox *ngIf=\"_isToggleAllCheckboxVisible()\"\r\n                [color]=\"matFormField?.color\"\r\n                class=\"mat-select-search-toggle-all-checkbox\"\r\n                [checked]=\"toggleAllCheckboxChecked\"\r\n                [indeterminate]=\"toggleAllCheckboxIndeterminate\"\r\n                [matTooltip]=\"toggleAllCheckboxTooltipMessage\"\r\n                matTooltipClass=\"ngx-mat-select-search-toggle-all-tooltip\"\r\n                [matTooltipPosition]=\"toogleAllCheckboxTooltipPosition\"\r\n                (change)=\"_emitSelectAllBooleanToParent($event.checked)\"\r\n  ></mat-checkbox>\r\n\r\n  <input class=\"mat-select-search-input mat-input-element\"\r\n         autocomplete=\"off\"\r\n         [type]=\"type\"\r\n         [formControl]=\"_formControl\"\r\n         #searchSelectInput\r\n         (keydown)=\"_handleKeydown($event)\"\r\n         (keyup)=\"_handleKeyup($event)\"\r\n         (blur)=\"onBlur()\"\r\n         [placeholder]=\"placeholderLabel\"\r\n         [attr.aria-label]=\"ariaLabel\"\r\n  />\r\n  <mat-spinner *ngIf=\"searching\"\r\n          class=\"mat-select-search-spinner\"\r\n          diameter=\"16\"></mat-spinner>\r\n\r\n  <button mat-button\r\n          *ngIf=\"value && !searching\"\r\n          mat-icon-button\r\n          aria-label=\"Clear\"\r\n          (click)=\"_reset(true)\"\r\n          class=\"mat-select-search-clear\">\r\n    <ng-content *ngIf=\"clearIcon; else defaultIcon\" select=\"[ngxMatSelectSearchClear]\"></ng-content>\r\n    <ng-template #defaultIcon>\r\n      <mat-icon>close</mat-icon>\r\n    </ng-template>\r\n  </button>\r\n\r\n  <ng-content select=\".mat-select-search-custom-header-content\"></ng-content>\r\n\r\n</div>\r\n\r\n<div *ngIf=\"_showNoEntriesFound$ | async\"\r\n     class=\"mat-select-search-no-entries-found\">\r\n  {{noEntriesFoundLabel}}\r\n</div>\r\n<!--\r\nCopyright (c) 2018 Bithost GmbH All Rights Reserved.\r\n\r\nUse of this source code is governed by an MIT-style license that can be\r\nfound in the LICENSE file at https://angular.io/license\r\n-->\r\n",
                providers: [
                    {
                        provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NG_VALUE_ACCESSOR"],
                        useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["forwardRef"])(() => MatSelectSearchComponent_1),
                        multi: true
                    }
                ],
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectionStrategy"].OnPush,
                styles: [".mat-select-search-hidden{visibility:hidden}.mat-select-search-inner{position:absolute;top:0;width:100%;border-bottom-width:1px;border-bottom-style:solid;z-index:100;font-size:inherit;box-shadow:none;border-radius:4px 4px 0 0;-webkit-transform:translate3d(0,0,0)}.mat-select-search-inner.mat-select-search-inner-multiple{width:100%}.mat-select-search-inner.mat-select-search-inner-multiple.mat-select-search-inner-toggle-all{display:flex;align-items:center}.mat-select-search-inner .mat-input-element{flex-basis:auto}.mat-select-search-inner .mat-input-element:-ms-input-placeholder{-ms-user-select:text}::ng-deep .mat-select-search-panel{transform:none!important;overflow-x:hidden}.mat-select-search-input{padding:16px 44px 16px 16px;box-sizing:border-box;width:100%}:host-context([dir=rtl]) .mat-select-search-input{padding-right:16px;padding-left:44px}.mat-select-search-no-entries-found{padding:16px}.mat-select-search-clear{position:absolute;right:4px;top:5px}:host-context([dir=rtl]) .mat-select-search-clear{right:auto;left:4px}.mat-select-search-spinner{position:absolute;right:16px;top:calc(50% - 8px)}:host-context([dir=rtl]) .mat-select-search-spinner{right:auto;left:16px}:host.mat-select-search-inside-mat-option .mat-select-search-input{padding-top:0;padding-bottom:0;height:3em;line-height:3em}:host.mat-select-search-inside-mat-option .mat-select-search-clear{top:3px}::ng-deep .mat-option[aria-disabled=true].contains-mat-select-search{position:static;padding:0}::ng-deep .mat-option[aria-disabled=true].contains-mat-select-search .mat-icon{margin-right:0;margin-left:0}::ng-deep .mat-option[aria-disabled=true].contains-mat-select-search .mat-option-pseudo-checkbox{display:none}::ng-deep .mat-option[aria-disabled=true].contains-mat-select-search.mat-select-search-no-entries-found{height:6em}.mat-select-search-toggle-all-checkbox{padding-left:16px;padding-bottom:2px}:host-context([dir=rtl]) .mat-select-search-toggle-all-checkbox{padding-left:0;padding-right:16px}"]
            }]
    }], function () { return [{ type: _angular_material_select__WEBPACK_IMPORTED_MODULE_4__["MatSelect"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_material_select__WEBPACK_IMPORTED_MODULE_4__["MatSelect"]]
            }] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }, { type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_7__["ViewportRuler"] }, { type: _angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOption"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_3__["MatOption"]]
            }] }, { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_8__["LiveAnnouncer"] }, { type: _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"],
                args: [_angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"]]
            }] }]; }, { placeholderLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], type: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], noEntriesFoundLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], indexAndLengthScreenReaderText: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], clearSearchInput: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], searching: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], disableInitialFocus: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], enableClearOnEscapePressed: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], preventHomeEndKeyPropagation: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], disableScrollToActiveOnOptionsChanged: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], ariaLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], showToggleAllCheckbox: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], toggleAllCheckboxChecked: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], toggleAllCheckboxIndeterminate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], toggleAllCheckboxTooltipMessage: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], toogleAllCheckboxTooltipPosition: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }], toggleAll: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"]
        }], isInsideMatOption: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostBinding"],
            args: ['class.mat-select-search-inside-mat-option']
        }], searchSelectInput: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
            args: ['searchSelectInput', { read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], static: true }]
        }], innerSelectSearch: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
            args: ['innerSelectSearch', { read: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"], static: true }]
        }], clearIcon: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ContentChild"],
            args: [MatSelectSearchClearDirective, { static: false }]
        }] }); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](NgxMatSelectSearchModule, { declarations: function () { return [MatSelectSearchComponent, MatSelectSearchClearDirective]; }, imports: function () { return [_angular_common__WEBPACK_IMPORTED_MODULE_16__["CommonModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__["MatCheckboxModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIconModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__["MatProgressSpinnerModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__["MatTooltipModule"]]; }, exports: function () { return [MatSelectSearchComponent, MatSelectSearchClearDirective]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](NgxMatSelectSearchModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_16__["CommonModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ReactiveFormsModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
                    _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_12__["MatCheckboxModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__["MatIconModule"],
                    _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_14__["MatProgressSpinnerModule"],
                    _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_15__["MatTooltipModule"]
                ],
                declarations: [
                    MatSelectSearchComponent,
                    MatSelectSearchClearDirective
                ],
                exports: [
                    MatSelectSearchComponent,
                    MatSelectSearchClearDirective
                ]
            }]
    }], null, null); })();

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=ngx-mat-select-search.js.map

/***/ }),

/***/ "Xa2L":
/*!**********************************************************************************!*\
  !*** ./node_modules/@angular/material/__ivy_ngcc__/fesm2015/progress-spinner.js ***!
  \**********************************************************************************/
/*! exports provided: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS, MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY, MatProgressSpinner, MatProgressSpinnerModule, MatSpinner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS", function() { return MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY", function() { return MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatProgressSpinner", function() { return MatProgressSpinner; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatProgressSpinnerModule", function() { return MatProgressSpinnerModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatSpinner", function() { return MatSpinner; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/coercion */ "8LU1");
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/platform */ "nLfN");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");







/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Base reference size of the spinner.
 * @docs-private
 */




function MatProgressSpinner__svg_circle_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "circle", 3);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("animation-name", "mat-progress-spinner-stroke-rotate-" + ctx_r0._spinnerAnimationLabel)("stroke-dashoffset", ctx_r0._getStrokeDashOffset(), "px")("stroke-dasharray", ctx_r0._getStrokeCircumference(), "px")("stroke-width", ctx_r0._getCircleStrokeWidth(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("r", ctx_r0._getCircleRadius());
} }
function MatProgressSpinner__svg_circle_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "circle", 3);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("stroke-dashoffset", ctx_r1._getStrokeDashOffset(), "px")("stroke-dasharray", ctx_r1._getStrokeCircumference(), "px")("stroke-width", ctx_r1._getCircleStrokeWidth(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("r", ctx_r1._getCircleRadius());
} }
function MatSpinner__svg_circle_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "circle", 3);
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("animation-name", "mat-progress-spinner-stroke-rotate-" + ctx_r0._spinnerAnimationLabel)("stroke-dashoffset", ctx_r0._getStrokeDashOffset(), "px")("stroke-dasharray", ctx_r0._getStrokeCircumference(), "px")("stroke-width", ctx_r0._getCircleStrokeWidth(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("r", ctx_r0._getCircleRadius());
} }
function MatSpinner__svg_circle_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "circle", 3);
} if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("stroke-dashoffset", ctx_r1._getStrokeDashOffset(), "px")("stroke-dasharray", ctx_r1._getStrokeCircumference(), "px")("stroke-width", ctx_r1._getCircleStrokeWidth(), "%");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("r", ctx_r1._getCircleRadius());
} }
const _c0 = ".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.cdk-high-contrast-active .mat-progress-spinner circle{stroke:currentColor}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2000ms linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10000ms cubic-bezier(0.87, 0.03, 0.33, 1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.606171575px;transform:rotate(0)}12.5%{stroke-dashoffset:56.5486677px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.606171575px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.5486677px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.606171575px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.5486677px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.606171575px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.5486677px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0deg)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}\n";
const BASE_SIZE = 100;
/**
 * Base reference stroke width of the spinner.
 * @docs-private
 */
const BASE_STROKE_WIDTH = 10;
// Boilerplate for applying mixins to MatProgressSpinner.
/** @docs-private */
class MatProgressSpinnerBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _MatProgressSpinnerMixinBase = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_2__["mixinColor"])(MatProgressSpinnerBase, 'primary');
/** Injection token to be used to override the default options for `mat-progress-spinner`. */
const MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["InjectionToken"]('mat-progress-spinner-default-options', {
    providedIn: 'root',
    factory: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY,
});
/** @docs-private */
function MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS_FACTORY() {
    return { diameter: BASE_SIZE };
}
// .0001 percentage difference is necessary in order to avoid unwanted animation frames
// for example because the animation duration is 4 seconds, .1% accounts to 4ms
// which are enough to see the flicker described in
// https://github.com/angular/components/issues/8984
const INDETERMINATE_ANIMATION_TEMPLATE = `
 @keyframes mat-progress-spinner-stroke-rotate-DIAMETER {
    0%      { stroke-dashoffset: START_VALUE;  transform: rotate(0); }
    12.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(0); }
    12.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(72.5deg); }
    25%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(72.5deg); }

    25.0001%   { stroke-dashoffset: START_VALUE;  transform: rotate(270deg); }
    37.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(270deg); }
    37.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(161.5deg); }
    50%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(161.5deg); }

    50.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(180deg); }
    62.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(180deg); }
    62.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(251.5deg); }
    75%     { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(251.5deg); }

    75.0001%  { stroke-dashoffset: START_VALUE;  transform: rotate(90deg); }
    87.5%   { stroke-dashoffset: END_VALUE;    transform: rotate(90deg); }
    87.5001%  { stroke-dashoffset: END_VALUE;    transform: rotateX(180deg) rotate(341.5deg); }
    100%    { stroke-dashoffset: START_VALUE;  transform: rotateX(180deg) rotate(341.5deg); }
  }
`;
/**
 * `<mat-progress-spinner>` component.
 */
class MatProgressSpinner extends _MatProgressSpinnerMixinBase {
    constructor(_elementRef, platform, _document, animationMode, defaults) {
        super(_elementRef);
        this._elementRef = _elementRef;
        this._document = _document;
        this._diameter = BASE_SIZE;
        this._value = 0;
        this._fallbackAnimation = false;
        /** Mode of the progress circle */
        this.mode = 'determinate';
        const trackedDiameters = MatProgressSpinner._diameters;
        this._spinnerAnimationLabel = this._getSpinnerAnimationLabel();
        // The base size is already inserted via the component's structural styles. We still
        // need to track it so we don't end up adding the same styles again.
        if (!trackedDiameters.has(_document.head)) {
            trackedDiameters.set(_document.head, new Set([BASE_SIZE]));
        }
        this._fallbackAnimation = platform.EDGE || platform.TRIDENT;
        this._noopAnimations = animationMode === 'NoopAnimations' &&
            (!!defaults && !defaults._forceAnimations);
        if (defaults) {
            if (defaults.diameter) {
                this.diameter = defaults.diameter;
            }
            if (defaults.strokeWidth) {
                this.strokeWidth = defaults.strokeWidth;
            }
        }
    }
    /** The diameter of the progress spinner (will set width and height of svg). */
    get diameter() { return this._diameter; }
    set diameter(size) {
        this._diameter = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceNumberProperty"])(size);
        this._spinnerAnimationLabel = this._getSpinnerAnimationLabel();
        // If this is set before `ngOnInit`, the style root may not have been resolved yet.
        if (!this._fallbackAnimation && this._styleRoot) {
            this._attachStyleNode();
        }
    }
    /** Stroke width of the progress spinner. */
    get strokeWidth() {
        return this._strokeWidth || this.diameter / 10;
    }
    set strokeWidth(value) {
        this._strokeWidth = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceNumberProperty"])(value);
    }
    /** Value of the progress circle. */
    get value() {
        return this.mode === 'determinate' ? this._value : 0;
    }
    set value(newValue) {
        this._value = Math.max(0, Math.min(100, Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_3__["coerceNumberProperty"])(newValue)));
    }
    ngOnInit() {
        const element = this._elementRef.nativeElement;
        // Note that we need to look up the root node in ngOnInit, rather than the constructor, because
        // Angular seems to create the element outside the shadow root and then moves it inside, if the
        // node is inside an `ngIf` and a ShadowDom-encapsulated component.
        this._styleRoot = Object(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["_getShadowRoot"])(element) || this._document.head;
        this._attachStyleNode();
        // On IE and Edge, we can't animate the `stroke-dashoffset`
        // reliably so we fall back to a non-spec animation.
        const animationClass = `mat-progress-spinner-indeterminate${this._fallbackAnimation ? '-fallback' : ''}-animation`;
        element.classList.add(animationClass);
    }
    /** The radius of the spinner, adjusted for stroke width. */
    _getCircleRadius() {
        return (this.diameter - BASE_STROKE_WIDTH) / 2;
    }
    /** The view box of the spinner's svg element. */
    _getViewBox() {
        const viewBox = this._getCircleRadius() * 2 + this.strokeWidth;
        return `0 0 ${viewBox} ${viewBox}`;
    }
    /** The stroke circumference of the svg circle. */
    _getStrokeCircumference() {
        return 2 * Math.PI * this._getCircleRadius();
    }
    /** The dash offset of the svg circle. */
    _getStrokeDashOffset() {
        if (this.mode === 'determinate') {
            return this._getStrokeCircumference() * (100 - this._value) / 100;
        }
        // In fallback mode set the circle to 80% and rotate it with CSS.
        if (this._fallbackAnimation && this.mode === 'indeterminate') {
            return this._getStrokeCircumference() * 0.2;
        }
        return null;
    }
    /** Stroke width of the circle in percent. */
    _getCircleStrokeWidth() {
        return this.strokeWidth / this.diameter * 100;
    }
    /** Dynamically generates a style tag containing the correct animation for this diameter. */
    _attachStyleNode() {
        const styleRoot = this._styleRoot;
        const currentDiameter = this._diameter;
        const diameters = MatProgressSpinner._diameters;
        let diametersForElement = diameters.get(styleRoot);
        if (!diametersForElement || !diametersForElement.has(currentDiameter)) {
            const styleTag = this._document.createElement('style');
            styleTag.setAttribute('mat-spinner-animation', this._spinnerAnimationLabel);
            styleTag.textContent = this._getAnimationText();
            styleRoot.appendChild(styleTag);
            if (!diametersForElement) {
                diametersForElement = new Set();
                diameters.set(styleRoot, diametersForElement);
            }
            diametersForElement.add(currentDiameter);
        }
    }
    /** Generates animation styles adjusted for the spinner's diameter. */
    _getAnimationText() {
        const strokeCircumference = this._getStrokeCircumference();
        return INDETERMINATE_ANIMATION_TEMPLATE
            // Animation should begin at 5% and end at 80%
            .replace(/START_VALUE/g, `${0.95 * strokeCircumference}`)
            .replace(/END_VALUE/g, `${0.2 * strokeCircumference}`)
            .replace(/DIAMETER/g, `${this._spinnerAnimationLabel}`);
    }
    /** Returns the circle diameter formatted for use with the animation-name CSS property. */
    _getSpinnerAnimationLabel() {
        // The string of a float point number will include a period ‘.’ character,
        // which is not valid for a CSS animation-name.
        return this.diameter.toString().replace('.', '_');
    }
}
MatProgressSpinner.ɵfac = function MatProgressSpinner_Factory(t) { return new (t || MatProgressSpinner)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS)); };
MatProgressSpinner.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MatProgressSpinner, selectors: [["mat-progress-spinner"]], hostAttrs: ["role", "progressbar", 1, "mat-progress-spinner"], hostVars: 10, hostBindings: function MatProgressSpinner_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-valuemin", ctx.mode === "determinate" ? 0 : null)("aria-valuemax", ctx.mode === "determinate" ? 100 : null)("aria-valuenow", ctx.mode === "determinate" ? ctx.value : null)("mode", ctx.mode);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", ctx.diameter, "px")("height", ctx.diameter, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("_mat-animation-noopable", ctx._noopAnimations);
    } }, inputs: { color: "color", mode: "mode", diameter: "diameter", strokeWidth: "strokeWidth", value: "value" }, exportAs: ["matProgressSpinner"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 3, vars: 8, consts: [["preserveAspectRatio", "xMidYMid meet", "focusable", "false", 3, "ngSwitch"], ["cx", "50%", "cy", "50%", 3, "animation-name", "stroke-dashoffset", "stroke-dasharray", "stroke-width", 4, "ngSwitchCase"], ["cx", "50%", "cy", "50%", 3, "stroke-dashoffset", "stroke-dasharray", "stroke-width", 4, "ngSwitchCase"], ["cx", "50%", "cy", "50%"]], template: function MatProgressSpinner_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MatProgressSpinner__svg_circle_1_Template, 1, 9, "circle", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MatProgressSpinner__svg_circle_2_Template, 1, 7, "circle", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", ctx.diameter, "px")("height", ctx.diameter, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx.mode === "indeterminate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("viewBox", ctx._getViewBox());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", false);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgSwitchCase"]], styles: [_c0], encapsulation: 2, changeDetection: 0 });
/**
 * Tracks diameters of existing instances to de-dupe generated styles (default d = 100).
 * We need to keep track of which elements the diameters were attached to, because for
 * elements in the Shadow DOM the style tags are attached to the shadow root, rather
 * than the document head.
 */
MatProgressSpinner._diameters = new WeakMap();
MatProgressSpinner.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
    { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"],] }] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"],] }] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,] }] }
];
MatProgressSpinner.propDecorators = {
    diameter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    strokeWidth: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    mode: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }],
    value: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"] }]
};
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatProgressSpinner, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'mat-progress-spinner',
                exportAs: 'matProgressSpinner',
                host: {
                    'role': 'progressbar',
                    'class': 'mat-progress-spinner',
                    '[class._mat-animation-noopable]': `_noopAnimations`,
                    '[style.width.px]': 'diameter',
                    '[style.height.px]': 'diameter',
                    '[attr.aria-valuemin]': 'mode === "determinate" ? 0 : null',
                    '[attr.aria-valuemax]': 'mode === "determinate" ? 100 : null',
                    '[attr.aria-valuenow]': 'mode === "determinate" ? value : null',
                    '[attr.mode]': 'mode'
                },
                inputs: ['color'],
                template: "<!--\n  preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's\n  center. The center of the circle will remain at the center of the mat-progress-spinner\n  element containing the SVG. `focusable=\"false\"` prevents IE from allowing the user to\n  tab into the SVG element.\n-->\n\n<svg\n  [style.width.px]=\"diameter\"\n  [style.height.px]=\"diameter\"\n  [attr.viewBox]=\"_getViewBox()\"\n  preserveAspectRatio=\"xMidYMid meet\"\n  focusable=\"false\"\n  [ngSwitch]=\"mode === 'indeterminate'\">\n\n  <!--\n    Technically we can reuse the same `circle` element, however Safari has an issue that breaks\n    the SVG rendering in determinate mode, after switching between indeterminate and determinate.\n    Using a different element avoids the issue. An alternative to this is adding `display: none`\n    for a split second and then removing it when switching between modes, but it's hard to know\n    for how long to hide the element and it can cause the UI to blink.\n  -->\n  <circle\n    *ngSwitchCase=\"true\"\n    cx=\"50%\"\n    cy=\"50%\"\n    [attr.r]=\"_getCircleRadius()\"\n    [style.animation-name]=\"'mat-progress-spinner-stroke-rotate-' + _spinnerAnimationLabel\"\n    [style.stroke-dashoffset.px]=\"_getStrokeDashOffset()\"\n    [style.stroke-dasharray.px]=\"_getStrokeCircumference()\"\n    [style.stroke-width.%]=\"_getCircleStrokeWidth()\"></circle>\n\n  <circle\n    *ngSwitchCase=\"false\"\n    cx=\"50%\"\n    cy=\"50%\"\n    [attr.r]=\"_getCircleRadius()\"\n    [style.stroke-dashoffset.px]=\"_getStrokeDashOffset()\"\n    [style.stroke-dasharray.px]=\"_getStrokeCircumference()\"\n    [style.stroke-width.%]=\"_getCircleStrokeWidth()\"></circle>\n</svg>\n",
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                styles: [".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.cdk-high-contrast-active .mat-progress-spinner circle{stroke:currentColor}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2000ms linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10000ms cubic-bezier(0.87, 0.03, 0.33, 1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.606171575px;transform:rotate(0)}12.5%{stroke-dashoffset:56.5486677px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.606171575px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.5486677px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.606171575px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.5486677px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.606171575px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.5486677px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0deg)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}\n"]
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }, { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]]
            }] }, { type: String, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS]
            }] }]; }, { mode: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], diameter: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], strokeWidth: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], value: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();
/**
 * `<mat-spinner>` component.
 *
 * This is a component definition to be used as a convenience reference to create an
 * indeterminate `<mat-progress-spinner>` instance.
 */
class MatSpinner extends MatProgressSpinner {
    constructor(elementRef, platform, document, animationMode, defaults) {
        super(elementRef, platform, document, animationMode, defaults);
        this.mode = 'indeterminate';
    }
}
MatSpinner.ɵfac = function MatSpinner_Factory(t) { return new (t || MatSpinner)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS)); };
MatSpinner.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: MatSpinner, selectors: [["mat-spinner"]], hostAttrs: ["role", "progressbar", "mode", "indeterminate", 1, "mat-spinner", "mat-progress-spinner"], hostVars: 6, hostBindings: function MatSpinner_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", ctx.diameter, "px")("height", ctx.diameter, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("_mat-animation-noopable", ctx._noopAnimations);
    } }, inputs: { color: "color" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 3, vars: 8, consts: [["preserveAspectRatio", "xMidYMid meet", "focusable", "false", 3, "ngSwitch"], ["cx", "50%", "cy", "50%", 3, "animation-name", "stroke-dashoffset", "stroke-dasharray", "stroke-width", 4, "ngSwitchCase"], ["cx", "50%", "cy", "50%", 3, "stroke-dashoffset", "stroke-dasharray", "stroke-width", 4, "ngSwitchCase"], ["cx", "50%", "cy", "50%"]], template: function MatSpinner_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "svg", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MatSpinner__svg_circle_1_Template, 1, 9, "circle", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MatSpinner__svg_circle_2_Template, 1, 7, "circle", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("width", ctx.diameter, "px")("height", ctx.diameter, "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitch", ctx.mode === "indeterminate");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("viewBox", ctx._getViewBox());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngSwitchCase", false);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgSwitch"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgSwitchCase"]], styles: [_c0], encapsulation: 2, changeDetection: 0 });
MatSpinner.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] },
    { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"],] }] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"],] }] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,] }] }
];
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatSpinner, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'mat-spinner',
                host: {
                    'role': 'progressbar',
                    'mode': 'indeterminate',
                    'class': 'mat-spinner mat-progress-spinner',
                    '[class._mat-animation-noopable]': `_noopAnimations`,
                    '[style.width.px]': 'diameter',
                    '[style.height.px]': 'diameter'
                },
                inputs: ['color'],
                template: "<!--\n  preserveAspectRatio of xMidYMid meet as the center of the viewport is the circle's\n  center. The center of the circle will remain at the center of the mat-progress-spinner\n  element containing the SVG. `focusable=\"false\"` prevents IE from allowing the user to\n  tab into the SVG element.\n-->\n\n<svg\n  [style.width.px]=\"diameter\"\n  [style.height.px]=\"diameter\"\n  [attr.viewBox]=\"_getViewBox()\"\n  preserveAspectRatio=\"xMidYMid meet\"\n  focusable=\"false\"\n  [ngSwitch]=\"mode === 'indeterminate'\">\n\n  <!--\n    Technically we can reuse the same `circle` element, however Safari has an issue that breaks\n    the SVG rendering in determinate mode, after switching between indeterminate and determinate.\n    Using a different element avoids the issue. An alternative to this is adding `display: none`\n    for a split second and then removing it when switching between modes, but it's hard to know\n    for how long to hide the element and it can cause the UI to blink.\n  -->\n  <circle\n    *ngSwitchCase=\"true\"\n    cx=\"50%\"\n    cy=\"50%\"\n    [attr.r]=\"_getCircleRadius()\"\n    [style.animation-name]=\"'mat-progress-spinner-stroke-rotate-' + _spinnerAnimationLabel\"\n    [style.stroke-dashoffset.px]=\"_getStrokeDashOffset()\"\n    [style.stroke-dasharray.px]=\"_getStrokeCircumference()\"\n    [style.stroke-width.%]=\"_getCircleStrokeWidth()\"></circle>\n\n  <circle\n    *ngSwitchCase=\"false\"\n    cx=\"50%\"\n    cy=\"50%\"\n    [attr.r]=\"_getCircleRadius()\"\n    [style.stroke-dashoffset.px]=\"_getStrokeDashOffset()\"\n    [style.stroke-dasharray.px]=\"_getStrokeCircumference()\"\n    [style.stroke-width.%]=\"_getCircleStrokeWidth()\"></circle>\n</svg>\n",
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectionStrategy"].OnPush,
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
                styles: [".mat-progress-spinner{display:block;position:relative}.mat-progress-spinner svg{position:absolute;transform:rotate(-90deg);top:0;left:0;transform-origin:center;overflow:visible}.mat-progress-spinner circle{fill:transparent;transform-origin:center;transition:stroke-dashoffset 225ms linear}._mat-animation-noopable.mat-progress-spinner circle{transition:none;animation:none}.cdk-high-contrast-active .mat-progress-spinner circle{stroke:currentColor}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{animation:mat-progress-spinner-linear-rotate 2000ms linear infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition-property:stroke;animation-duration:4000ms;animation-timing-function:cubic-bezier(0.35, 0, 0.25, 1);animation-iteration-count:infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-animation[mode=indeterminate] circle{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{animation:mat-progress-spinner-stroke-rotate-fallback 10000ms cubic-bezier(0.87, 0.03, 0.33, 1) infinite}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate]{transition:none;animation:none}.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition-property:stroke}._mat-animation-noopable.mat-progress-spinner.mat-progress-spinner-indeterminate-fallback-animation[mode=indeterminate] circle{transition:none;animation:none}@keyframes mat-progress-spinner-linear-rotate{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}@keyframes mat-progress-spinner-stroke-rotate-100{0%{stroke-dashoffset:268.606171575px;transform:rotate(0)}12.5%{stroke-dashoffset:56.5486677px;transform:rotate(0)}12.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(72.5deg)}25%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(72.5deg)}25.0001%{stroke-dashoffset:268.606171575px;transform:rotate(270deg)}37.5%{stroke-dashoffset:56.5486677px;transform:rotate(270deg)}37.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(161.5deg)}50%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(161.5deg)}50.0001%{stroke-dashoffset:268.606171575px;transform:rotate(180deg)}62.5%{stroke-dashoffset:56.5486677px;transform:rotate(180deg)}62.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(251.5deg)}75%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(251.5deg)}75.0001%{stroke-dashoffset:268.606171575px;transform:rotate(90deg)}87.5%{stroke-dashoffset:56.5486677px;transform:rotate(90deg)}87.5001%{stroke-dashoffset:56.5486677px;transform:rotateX(180deg) rotate(341.5deg)}100%{stroke-dashoffset:268.606171575px;transform:rotateX(180deg) rotate(341.5deg)}}@keyframes mat-progress-spinner-stroke-rotate-fallback{0%{transform:rotate(0deg)}25%{transform:rotate(1170deg)}50%{transform:rotate(2340deg)}75%{transform:rotate(3510deg)}100%{transform:rotate(4680deg)}}\n"]
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }, { type: _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_4__["Platform"] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]]
            }] }, { type: String, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS]
            }] }]; }, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
class MatProgressSpinnerModule {
}
MatProgressSpinnerModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: MatProgressSpinnerModule });
MatProgressSpinnerModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function MatProgressSpinnerModule_Factory(t) { return new (t || MatProgressSpinnerModule)(); }, imports: [[_angular_material_core__WEBPACK_IMPORTED_MODULE_2__["MatCommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]], _angular_material_core__WEBPACK_IMPORTED_MODULE_2__["MatCommonModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](MatProgressSpinnerModule, { declarations: function () { return [MatProgressSpinner, MatSpinner]; }, imports: function () { return [_angular_material_core__WEBPACK_IMPORTED_MODULE_2__["MatCommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]]; }, exports: function () { return [MatProgressSpinner, MatSpinner, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__["MatCommonModule"]]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatProgressSpinnerModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_2__["MatCommonModule"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]],
                exports: [
                    MatProgressSpinner,
                    MatSpinner,
                    _angular_material_core__WEBPACK_IMPORTED_MODULE_2__["MatCommonModule"]
                ],
                declarations: [
                    MatProgressSpinner,
                    MatSpinner
                ]
            }]
    }], null, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=progress-spinner.js.map

/***/ }),

/***/ "bSwM":
/*!**************************************************************************!*\
  !*** ./node_modules/@angular/material/__ivy_ngcc__/fesm2015/checkbox.js ***!
  \**************************************************************************/
/*! exports provided: MAT_CHECKBOX_CLICK_ACTION, MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR, MAT_CHECKBOX_DEFAULT_OPTIONS, MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY, MAT_CHECKBOX_REQUIRED_VALIDATOR, MatCheckbox, MatCheckboxChange, MatCheckboxModule, MatCheckboxRequiredValidator, _MatCheckboxRequiredValidatorModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_CHECKBOX_CLICK_ACTION", function() { return MAT_CHECKBOX_CLICK_ACTION; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR", function() { return MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_CHECKBOX_DEFAULT_OPTIONS", function() { return MAT_CHECKBOX_DEFAULT_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY", function() { return MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAT_CHECKBOX_REQUIRED_VALIDATOR", function() { return MAT_CHECKBOX_REQUIRED_VALIDATOR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatCheckbox", function() { return MatCheckbox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatCheckboxChange", function() { return MatCheckboxChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatCheckboxModule", function() { return MatCheckboxModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MatCheckboxRequiredValidator", function() { return MatCheckboxRequiredValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_MatCheckboxRequiredValidatorModule", function() { return _MatCheckboxRequiredValidatorModule; });
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/a11y */ "u47x");
/* harmony import */ var _angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/coercion */ "8LU1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/core */ "FKr1");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/platform-browser/animations */ "R1ws");
/* harmony import */ var _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/observers */ "GU7r");








/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** Injection token to be used to override the default options for `mat-checkbox`. */





const _c0 = ["input"];
const _c1 = function () { return { enterDuration: 150 }; };
const _c2 = ["*"];
const MAT_CHECKBOX_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["InjectionToken"]('mat-checkbox-default-options', {
    providedIn: 'root',
    factory: MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY
});
/** @docs-private */
function MAT_CHECKBOX_DEFAULT_OPTIONS_FACTORY() {
    return {
        color: 'accent',
        clickAction: 'check-indeterminate',
    };
}
/**
 * Injection token that can be used to specify the checkbox click behavior.
 * @deprecated Injection token will be removed, use `MAT_CHECKBOX_DEFAULT_OPTIONS` instead.
 * @breaking-change 10.0.0
 */
const MAT_CHECKBOX_CLICK_ACTION = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["InjectionToken"]('mat-checkbox-click-action');

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// Increasing integer for generating unique ids for checkbox components.
let nextUniqueId = 0;
/**
 * Provider Expression that allows mat-checkbox to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * @docs-private
 */
const MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NG_VALUE_ACCESSOR"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["forwardRef"])(() => MatCheckbox),
    multi: true
};
/** Change event object emitted by MatCheckbox. */
class MatCheckboxChange {
}
// Boilerplate for applying mixins to MatCheckbox.
/** @docs-private */
class MatCheckboxBase {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
}
const _MatCheckboxMixinBase = Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_4__["mixinTabIndex"])(Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_4__["mixinColor"])(Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_4__["mixinDisableRipple"])(Object(_angular_material_core__WEBPACK_IMPORTED_MODULE_4__["mixinDisabled"])(MatCheckboxBase))));
/**
 * A material design checkbox component. Supports all of the functionality of an HTML5 checkbox,
 * and exposes a similar API. A MatCheckbox can be either checked, unchecked, indeterminate, or
 * disabled. Note that all additional accessibility attributes are taken care of by the component,
 * so there is no need to provide them yourself. However, if you want to omit a label and still
 * have the checkbox be accessible, you may supply an [aria-label] input.
 * See: https://material.io/design/components/selection-controls.html
 */
class MatCheckbox extends _MatCheckboxMixinBase {
    constructor(elementRef, _changeDetectorRef, _focusMonitor, _ngZone, tabIndex, 
    /**
     * @deprecated `_clickAction` parameter to be removed, use
     * `MAT_CHECKBOX_DEFAULT_OPTIONS`
     * @breaking-change 10.0.0
     */
    _clickAction, _animationMode, _options) {
        super(elementRef);
        this._changeDetectorRef = _changeDetectorRef;
        this._focusMonitor = _focusMonitor;
        this._ngZone = _ngZone;
        this._clickAction = _clickAction;
        this._animationMode = _animationMode;
        this._options = _options;
        /**
         * Attached to the aria-label attribute of the host element. In most cases, aria-labelledby will
         * take precedence so this may be omitted.
         */
        this.ariaLabel = '';
        /**
         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
         */
        this.ariaLabelledby = null;
        this._uniqueId = `mat-checkbox-${++nextUniqueId}`;
        /** A unique id for the checkbox input. If none is supplied, it will be auto-generated. */
        this.id = this._uniqueId;
        /** Whether the label should appear after or before the checkbox. Defaults to 'after' */
        this.labelPosition = 'after';
        /** Name value will be applied to the input element if present */
        this.name = null;
        /** Event emitted when the checkbox's `checked` value changes. */
        this.change = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        /** Event emitted when the checkbox's `indeterminate` value changes. */
        this.indeterminateChange = new _angular_core__WEBPACK_IMPORTED_MODULE_2__["EventEmitter"]();
        /**
         * Called when the checkbox is blurred. Needed to properly implement ControlValueAccessor.
         * @docs-private
         */
        this._onTouched = () => { };
        this._currentAnimationClass = '';
        this._currentCheckState = 0 /* Init */;
        this._controlValueAccessorChangeFn = () => { };
        this._checked = false;
        this._disabled = false;
        this._indeterminate = false;
        this._options = this._options || {};
        if (this._options.color) {
            this.color = this.defaultColor = this._options.color;
        }
        this.tabIndex = parseInt(tabIndex) || 0;
        // TODO: Remove this after the `_clickAction` parameter is removed as an injection parameter.
        this._clickAction = this._clickAction || this._options.clickAction;
    }
    /** Returns the unique id for the visual hidden input. */
    get inputId() { return `${this.id || this._uniqueId}-input`; }
    /** Whether the checkbox is required. */
    get required() { return this._required; }
    set required(value) { this._required = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceBooleanProperty"])(value); }
    ngAfterViewInit() {
        this._focusMonitor.monitor(this._elementRef, true).subscribe(focusOrigin => {
            if (!focusOrigin) {
                // When a focused element becomes disabled, the browser *immediately* fires a blur event.
                // Angular does not expect events to be raised during change detection, so any state change
                // (such as a form control's 'ng-touched') will cause a changed-after-checked error.
                // See https://github.com/angular/angular/issues/17793. To work around this, we defer
                // telling the form control it has been touched until the next tick.
                Promise.resolve().then(() => {
                    this._onTouched();
                    this._changeDetectorRef.markForCheck();
                });
            }
        });
        this._syncIndeterminate(this._indeterminate);
    }
    // TODO: Delete next major revision.
    ngAfterViewChecked() { }
    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef);
    }
    /**
     * Whether the checkbox is checked.
     */
    get checked() { return this._checked; }
    set checked(value) {
        if (value != this.checked) {
            this._checked = value;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * Whether the checkbox is disabled. This fully overrides the implementation provided by
     * mixinDisabled, but the mixin is still required because mixinTabIndex requires it.
     */
    get disabled() { return this._disabled; }
    set disabled(value) {
        const newValue = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceBooleanProperty"])(value);
        if (newValue !== this.disabled) {
            this._disabled = newValue;
            this._changeDetectorRef.markForCheck();
        }
    }
    /**
     * Whether the checkbox is indeterminate. This is also known as "mixed" mode and can be used to
     * represent a checkbox with three states, e.g. a checkbox that represents a nested list of
     * checkable items. Note that whenever checkbox is manually clicked, indeterminate is immediately
     * set to false.
     */
    get indeterminate() { return this._indeterminate; }
    set indeterminate(value) {
        const changed = value != this._indeterminate;
        this._indeterminate = Object(_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_1__["coerceBooleanProperty"])(value);
        if (changed) {
            if (this._indeterminate) {
                this._transitionCheckState(3 /* Indeterminate */);
            }
            else {
                this._transitionCheckState(this.checked ? 1 /* Checked */ : 2 /* Unchecked */);
            }
            this.indeterminateChange.emit(this._indeterminate);
        }
        this._syncIndeterminate(this._indeterminate);
    }
    _isRippleDisabled() {
        return this.disableRipple || this.disabled;
    }
    /** Method being called whenever the label text changes. */
    _onLabelTextChange() {
        // Since the event of the `cdkObserveContent` directive runs outside of the zone, the checkbox
        // component will be only marked for check, but no actual change detection runs automatically.
        // Instead of going back into the zone in order to trigger a change detection which causes
        // *all* components to be checked (if explicitly marked or not using OnPush), we only trigger
        // an explicit change detection for the checkbox view and its children.
        this._changeDetectorRef.detectChanges();
    }
    // Implemented as part of ControlValueAccessor.
    writeValue(value) {
        this.checked = !!value;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnChange(fn) {
        this._controlValueAccessorChangeFn = fn;
    }
    // Implemented as part of ControlValueAccessor.
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    // Implemented as part of ControlValueAccessor.
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    _getAriaChecked() {
        if (this.checked) {
            return 'true';
        }
        return this.indeterminate ? 'mixed' : 'false';
    }
    _transitionCheckState(newState) {
        let oldState = this._currentCheckState;
        let element = this._elementRef.nativeElement;
        if (oldState === newState) {
            return;
        }
        if (this._currentAnimationClass.length > 0) {
            element.classList.remove(this._currentAnimationClass);
        }
        this._currentAnimationClass = this._getAnimationClassForCheckStateTransition(oldState, newState);
        this._currentCheckState = newState;
        if (this._currentAnimationClass.length > 0) {
            element.classList.add(this._currentAnimationClass);
            // Remove the animation class to avoid animation when the checkbox is moved between containers
            const animationClass = this._currentAnimationClass;
            this._ngZone.runOutsideAngular(() => {
                setTimeout(() => {
                    element.classList.remove(animationClass);
                }, 1000);
            });
        }
    }
    _emitChangeEvent() {
        const event = new MatCheckboxChange();
        event.source = this;
        event.checked = this.checked;
        this._controlValueAccessorChangeFn(this.checked);
        this.change.emit(event);
    }
    /** Toggles the `checked` state of the checkbox. */
    toggle() {
        this.checked = !this.checked;
    }
    /**
     * Event handler for checkbox input element.
     * Toggles checked state if element is not disabled.
     * Do not toggle on (change) event since IE doesn't fire change event when
     *   indeterminate checkbox is clicked.
     * @param event
     */
    _onInputClick(event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `checkbox` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
        // If resetIndeterminate is false, and the current state is indeterminate, do nothing on click
        if (!this.disabled && this._clickAction !== 'noop') {
            // When user manually click on the checkbox, `indeterminate` is set to false.
            if (this.indeterminate && this._clickAction !== 'check') {
                Promise.resolve().then(() => {
                    this._indeterminate = false;
                    this.indeterminateChange.emit(this._indeterminate);
                });
            }
            this.toggle();
            this._transitionCheckState(this._checked ? 1 /* Checked */ : 2 /* Unchecked */);
            // Emit our custom change event if the native input emitted one.
            // It is important to only emit it, if the native input triggered one, because
            // we don't want to trigger a change event, when the `checked` variable changes for example.
            this._emitChangeEvent();
        }
        else if (!this.disabled && this._clickAction === 'noop') {
            // Reset native input when clicked with noop. The native checkbox becomes checked after
            // click, reset it to be align with `checked` value of `mat-checkbox`.
            this._inputElement.nativeElement.checked = this.checked;
            this._inputElement.nativeElement.indeterminate = this.indeterminate;
        }
    }
    /** Focuses the checkbox. */
    focus(origin = 'keyboard', options) {
        this._focusMonitor.focusVia(this._inputElement, origin, options);
    }
    _onInteractionEvent(event) {
        // We always have to stop propagation on the change event.
        // Otherwise the change event, from the input element, will bubble up and
        // emit its event object to the `change` output.
        event.stopPropagation();
    }
    _getAnimationClassForCheckStateTransition(oldState, newState) {
        // Don't transition if animations are disabled.
        if (this._animationMode === 'NoopAnimations') {
            return '';
        }
        let animSuffix = '';
        switch (oldState) {
            case 0 /* Init */:
                // Handle edge case where user interacts with checkbox that does not have [(ngModel)] or
                // [checked] bound to it.
                if (newState === 1 /* Checked */) {
                    animSuffix = 'unchecked-checked';
                }
                else if (newState == 3 /* Indeterminate */) {
                    animSuffix = 'unchecked-indeterminate';
                }
                else {
                    return '';
                }
                break;
            case 2 /* Unchecked */:
                animSuffix = newState === 1 /* Checked */ ?
                    'unchecked-checked' : 'unchecked-indeterminate';
                break;
            case 1 /* Checked */:
                animSuffix = newState === 2 /* Unchecked */ ?
                    'checked-unchecked' : 'checked-indeterminate';
                break;
            case 3 /* Indeterminate */:
                animSuffix = newState === 1 /* Checked */ ?
                    'indeterminate-checked' : 'indeterminate-unchecked';
                break;
        }
        return `mat-checkbox-anim-${animSuffix}`;
    }
    /**
     * Syncs the indeterminate value with the checkbox DOM node.
     *
     * We sync `indeterminate` directly on the DOM node, because in Ivy the check for whether a
     * property is supported on an element boils down to `if (propName in element)`. Domino's
     * HTMLInputElement doesn't have an `indeterminate` property so Ivy will warn during
     * server-side rendering.
     */
    _syncIndeterminate(value) {
        const nativeCheckbox = this._inputElement;
        if (nativeCheckbox) {
            nativeCheckbox.nativeElement.indeterminate = value;
        }
    }
}
MatCheckbox.ɵfac = function MatCheckbox_Factory(t) { return new (t || MatCheckbox)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_0__["FocusMonitor"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵinjectAttribute"]('tabindex'), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](MAT_CHECKBOX_CLICK_ACTION, 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"], 8), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](MAT_CHECKBOX_DEFAULT_OPTIONS, 8)); };
MatCheckbox.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: MatCheckbox, selectors: [["mat-checkbox"]], viewQuery: function MatCheckbox_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatRipple"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx._inputElement = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.ripple = _t.first);
    } }, hostAttrs: [1, "mat-checkbox"], hostVars: 12, hostBindings: function MatCheckbox_HostBindings(rf, ctx) { if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵhostProperty"]("id", ctx.id);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("tabindex", null);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("mat-checkbox-indeterminate", ctx.indeterminate)("mat-checkbox-checked", ctx.checked)("mat-checkbox-disabled", ctx.disabled)("mat-checkbox-label-before", ctx.labelPosition == "before")("_mat-animation-noopable", ctx._animationMode === "NoopAnimations");
    } }, inputs: { disableRipple: "disableRipple", color: "color", tabIndex: "tabIndex", ariaLabel: ["aria-label", "ariaLabel"], ariaLabelledby: ["aria-labelledby", "ariaLabelledby"], id: "id", labelPosition: "labelPosition", name: "name", required: "required", checked: "checked", disabled: "disabled", indeterminate: "indeterminate", ariaDescribedby: ["aria-describedby", "ariaDescribedby"], value: "value" }, outputs: { change: "change", indeterminateChange: "indeterminateChange" }, exportAs: ["matCheckbox"], features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]], ngContentSelectors: _c2, decls: 17, vars: 20, consts: [[1, "mat-checkbox-layout"], ["label", ""], [1, "mat-checkbox-inner-container"], ["type", "checkbox", 1, "mat-checkbox-input", "cdk-visually-hidden", 3, "id", "required", "checked", "disabled", "tabIndex", "change", "click"], ["input", ""], ["matRipple", "", 1, "mat-checkbox-ripple", "mat-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled", "matRippleRadius", "matRippleCentered", "matRippleAnimation"], [1, "mat-ripple-element", "mat-checkbox-persistent-ripple"], [1, "mat-checkbox-frame"], [1, "mat-checkbox-background"], ["version", "1.1", "focusable", "false", "viewBox", "0 0 24 24", 0, "xml", "space", "preserve", 1, "mat-checkbox-checkmark"], ["fill", "none", "stroke", "white", "d", "M4.1,12.7 9,17.6 20.3,6.3", 1, "mat-checkbox-checkmark-path"], [1, "mat-checkbox-mixedmark"], [1, "mat-checkbox-label", 3, "cdkObserveContent"], ["checkboxLabel", ""], [2, "display", "none"]], template: function MatCheckbox_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "label", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "input", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("change", function MatCheckbox_Template_input_change_3_listener($event) { return ctx._onInteractionEvent($event); })("click", function MatCheckbox_Template_input_click_3_listener($event) { return ctx._onInputClick($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceSVG"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "svg", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](10, "path", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnamespaceHTML"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](11, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "span", 12, 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("cdkObserveContent", function MatCheckbox_Template_span_cdkObserveContent_12_listener() { return ctx._onLabelTextChange(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "span", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵprojection"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](1);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("for", ctx.inputId);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("mat-checkbox-inner-container-no-side-margin", !_r2.textContent || !_r2.textContent.trim());
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("id", ctx.inputId)("required", ctx.required)("checked", ctx.checked)("disabled", ctx.disabled)("tabIndex", ctx.tabIndex);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵattribute"]("value", ctx.value)("name", ctx.name)("aria-label", ctx.ariaLabel || null)("aria-labelledby", ctx.ariaLabelledby)("aria-checked", ctx._getAriaChecked())("aria-describedby", ctx.ariaDescribedby);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matRippleTrigger", _r0)("matRippleDisabled", ctx._isRippleDisabled())("matRippleRadius", 20)("matRippleCentered", true)("matRippleAnimation", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](19, _c1));
    } }, directives: [_angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatRipple"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__["CdkObserveContent"]], styles: ["@keyframes mat-checkbox-fade-in-background{0%{opacity:0}50%{opacity:1}}@keyframes mat-checkbox-fade-out-background{0%,50%{opacity:1}100%{opacity:0}}@keyframes mat-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:22.910259}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1)}100%{stroke-dashoffset:0}}@keyframes mat-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mat-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);stroke-dashoffset:0}to{stroke-dashoffset:-22.910259}}@keyframes mat-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(45deg)}}@keyframes mat-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:0;transform:rotate(45deg)}to{opacity:1;transform:rotate(360deg)}}@keyframes mat-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:0;transform:rotate(-45deg)}to{opacity:1;transform:rotate(0deg)}}@keyframes mat-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(315deg)}}@keyframes mat-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;opacity:1;transform:scaleX(1)}32.8%,100%{opacity:0;transform:scaleX(0)}}.mat-checkbox-background,.mat-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:2px;box-sizing:border-box;pointer-events:none}.mat-checkbox{transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;-webkit-tap-highlight-color:transparent}._mat-animation-noopable.mat-checkbox{transition:none;animation:none}.mat-checkbox .mat-ripple-element:not(.mat-checkbox-persistent-ripple){opacity:.16}.mat-checkbox-layout{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mat-checkbox-label{-webkit-user-select:auto;-moz-user-select:auto;-ms-user-select:auto;user-select:auto}.mat-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin:auto;margin-right:8px;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mat-checkbox-inner-container{margin-left:8px;margin-right:auto}.mat-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mat-checkbox-frame{background-color:transparent;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1);border-width:2px;border-style:solid}._mat-animation-noopable .mat-checkbox-frame{transition:none}.cdk-high-contrast-active .mat-checkbox.cdk-keyboard-focused .mat-checkbox-frame{border-style:dotted}.mat-checkbox-background{align-items:center;display:inline-flex;justify-content:center;transition:background-color 90ms cubic-bezier(0, 0, 0.2, 0.1),opacity 90ms cubic-bezier(0, 0, 0.2, 0.1)}._mat-animation-noopable .mat-checkbox-background{transition:none}.cdk-high-contrast-active .mat-checkbox .mat-checkbox-background{background:none}.mat-checkbox-persistent-ripple{width:100%;height:100%;transform:none}.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:.04}.mat-checkbox.cdk-keyboard-focused .mat-checkbox-persistent-ripple{opacity:.12}.mat-checkbox-persistent-ripple,.mat-checkbox.mat-checkbox-disabled .mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:0}@media(hover: none){.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{display:none}}.mat-checkbox-checkmark{top:0;left:0;right:0;bottom:0;position:absolute;width:100%}.mat-checkbox-checkmark-path{stroke-dashoffset:22.910259;stroke-dasharray:22.910259;stroke-width:2.1333333333px}.cdk-high-contrast-black-on-white .mat-checkbox-checkmark-path{stroke:#000 !important}.mat-checkbox-mixedmark{width:calc(100% - 6px);height:2px;opacity:0;transform:scaleX(0) rotate(0deg);border-radius:2px}.cdk-high-contrast-active .mat-checkbox-mixedmark{height:0;border-top:solid 2px;margin-top:2px}.mat-checkbox-label-before .mat-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mat-checkbox-label-before .mat-checkbox-inner-container{margin-left:auto;margin-right:8px}.mat-checkbox-checked .mat-checkbox-checkmark{opacity:1}.mat-checkbox-checked .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-checked .mat-checkbox-mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark{opacity:0;transform:rotate(45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-indeterminate .mat-checkbox-mixedmark{opacity:1;transform:scaleX(1) rotate(0deg)}.mat-checkbox-unchecked .mat-checkbox-background{background-color:transparent}.mat-checkbox-disabled{cursor:default}.cdk-high-contrast-active .mat-checkbox-disabled{opacity:.5}.mat-checkbox-anim-unchecked-checked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-checked .mat-checkbox-checkmark-path{animation:180ms linear 0ms mat-checkbox-unchecked-checked-checkmark-path}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-unchecked-indeterminate-mixedmark}.mat-checkbox-anim-checked-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-checked-unchecked .mat-checkbox-checkmark-path{animation:90ms linear 0ms mat-checkbox-checked-unchecked-checkmark-path}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-checkmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-checkmark}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-mixedmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-checkmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-checkmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-mixedmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-mixedmark}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-mixedmark{animation:300ms linear 0ms mat-checkbox-indeterminate-unchecked-mixedmark}.mat-checkbox-input{bottom:0;left:50%}.mat-checkbox .mat-checkbox-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}\n"], encapsulation: 2, changeDetection: 0 });
MatCheckbox.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"] },
    { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_0__["FocusMonitor"] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Attribute"], args: ['tabindex',] }] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [MAT_CHECKBOX_CLICK_ACTION,] }] },
    { type: String, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"],] }] },
    { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"], args: [MAT_CHECKBOX_DEFAULT_OPTIONS,] }] }
];
MatCheckbox.propDecorators = {
    ariaLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"], args: ['aria-label',] }],
    ariaLabelledby: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"], args: ['aria-labelledby',] }],
    ariaDescribedby: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"], args: ['aria-describedby',] }],
    id: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
    required: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
    labelPosition: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
    name: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
    change: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }],
    indeterminateChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"] }],
    value: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
    _inputElement: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"], args: ['input',] }],
    ripple: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"], args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatRipple"],] }],
    checked: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
    disabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }],
    indeterminate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"] }]
};
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](MatCheckbox, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"],
        args: [{
                selector: 'mat-checkbox',
                template: "<label [attr.for]=\"inputId\" class=\"mat-checkbox-layout\" #label>\n  <div class=\"mat-checkbox-inner-container\"\n       [class.mat-checkbox-inner-container-no-side-margin]=\"!checkboxLabel.textContent || !checkboxLabel.textContent.trim()\">\n    <input #input\n           class=\"mat-checkbox-input cdk-visually-hidden\" type=\"checkbox\"\n           [id]=\"inputId\"\n           [required]=\"required\"\n           [checked]=\"checked\"\n           [attr.value]=\"value\"\n           [disabled]=\"disabled\"\n           [attr.name]=\"name\"\n           [tabIndex]=\"tabIndex\"\n           [attr.aria-label]=\"ariaLabel || null\"\n           [attr.aria-labelledby]=\"ariaLabelledby\"\n           [attr.aria-checked]=\"_getAriaChecked()\"\n           [attr.aria-describedby]=\"ariaDescribedby\"\n           (change)=\"_onInteractionEvent($event)\"\n           (click)=\"_onInputClick($event)\">\n    <div matRipple class=\"mat-checkbox-ripple mat-focus-indicator\"\n         [matRippleTrigger]=\"label\"\n         [matRippleDisabled]=\"_isRippleDisabled()\"\n         [matRippleRadius]=\"20\"\n         [matRippleCentered]=\"true\"\n         [matRippleAnimation]=\"{enterDuration: 150}\">\n      <div class=\"mat-ripple-element mat-checkbox-persistent-ripple\"></div>\n    </div>\n    <div class=\"mat-checkbox-frame\"></div>\n    <div class=\"mat-checkbox-background\">\n      <svg version=\"1.1\"\n           focusable=\"false\"\n           class=\"mat-checkbox-checkmark\"\n           viewBox=\"0 0 24 24\"\n           xml:space=\"preserve\">\n        <path class=\"mat-checkbox-checkmark-path\"\n              fill=\"none\"\n              stroke=\"white\"\n              d=\"M4.1,12.7 9,17.6 20.3,6.3\"/>\n      </svg>\n      <!-- Element for rendering the indeterminate state checkbox. -->\n      <div class=\"mat-checkbox-mixedmark\"></div>\n    </div>\n  </div>\n  <span class=\"mat-checkbox-label\" #checkboxLabel (cdkObserveContent)=\"_onLabelTextChange()\">\n    <!-- Add an invisible span so JAWS can read the label -->\n    <span style=\"display:none\">&nbsp;</span>\n    <ng-content></ng-content>\n  </span>\n</label>\n",
                exportAs: 'matCheckbox',
                host: {
                    'class': 'mat-checkbox',
                    '[id]': 'id',
                    '[attr.tabindex]': 'null',
                    '[class.mat-checkbox-indeterminate]': 'indeterminate',
                    '[class.mat-checkbox-checked]': 'checked',
                    '[class.mat-checkbox-disabled]': 'disabled',
                    '[class.mat-checkbox-label-before]': 'labelPosition == "before"',
                    '[class._mat-animation-noopable]': `_animationMode === 'NoopAnimations'`
                },
                providers: [MAT_CHECKBOX_CONTROL_VALUE_ACCESSOR],
                inputs: ['disableRipple', 'color', 'tabIndex'],
                encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewEncapsulation"].None,
                changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectionStrategy"].OnPush,
                styles: ["@keyframes mat-checkbox-fade-in-background{0%{opacity:0}50%{opacity:1}}@keyframes mat-checkbox-fade-out-background{0%,50%{opacity:1}100%{opacity:0}}@keyframes mat-checkbox-unchecked-checked-checkmark-path{0%,50%{stroke-dashoffset:22.910259}50%{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1)}100%{stroke-dashoffset:0}}@keyframes mat-checkbox-unchecked-indeterminate-mixedmark{0%,68.2%{transform:scaleX(0)}68.2%{animation-timing-function:cubic-bezier(0, 0, 0, 1)}100%{transform:scaleX(1)}}@keyframes mat-checkbox-checked-unchecked-checkmark-path{from{animation-timing-function:cubic-bezier(0.4, 0, 1, 1);stroke-dashoffset:0}to{stroke-dashoffset:-22.910259}}@keyframes mat-checkbox-checked-indeterminate-checkmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(45deg)}}@keyframes mat-checkbox-indeterminate-checked-checkmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:0;transform:rotate(45deg)}to{opacity:1;transform:rotate(360deg)}}@keyframes mat-checkbox-checked-indeterminate-mixedmark{from{animation-timing-function:cubic-bezier(0, 0, 0.2, 0.1);opacity:0;transform:rotate(-45deg)}to{opacity:1;transform:rotate(0deg)}}@keyframes mat-checkbox-indeterminate-checked-mixedmark{from{animation-timing-function:cubic-bezier(0.14, 0, 0, 1);opacity:1;transform:rotate(0deg)}to{opacity:0;transform:rotate(315deg)}}@keyframes mat-checkbox-indeterminate-unchecked-mixedmark{0%{animation-timing-function:linear;opacity:1;transform:scaleX(1)}32.8%,100%{opacity:0;transform:scaleX(0)}}.mat-checkbox-background,.mat-checkbox-frame{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:2px;box-sizing:border-box;pointer-events:none}.mat-checkbox{transition:background 400ms cubic-bezier(0.25, 0.8, 0.25, 1),box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);cursor:pointer;-webkit-tap-highlight-color:transparent}._mat-animation-noopable.mat-checkbox{transition:none;animation:none}.mat-checkbox .mat-ripple-element:not(.mat-checkbox-persistent-ripple){opacity:.16}.mat-checkbox-layout{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:inherit;align-items:baseline;vertical-align:middle;display:inline-flex;white-space:nowrap}.mat-checkbox-label{-webkit-user-select:auto;-moz-user-select:auto;-ms-user-select:auto;user-select:auto}.mat-checkbox-inner-container{display:inline-block;height:16px;line-height:0;margin:auto;margin-right:8px;order:0;position:relative;vertical-align:middle;white-space:nowrap;width:16px;flex-shrink:0}[dir=rtl] .mat-checkbox-inner-container{margin-left:8px;margin-right:auto}.mat-checkbox-inner-container-no-side-margin{margin-left:0;margin-right:0}.mat-checkbox-frame{background-color:transparent;transition:border-color 90ms cubic-bezier(0, 0, 0.2, 0.1);border-width:2px;border-style:solid}._mat-animation-noopable .mat-checkbox-frame{transition:none}.cdk-high-contrast-active .mat-checkbox.cdk-keyboard-focused .mat-checkbox-frame{border-style:dotted}.mat-checkbox-background{align-items:center;display:inline-flex;justify-content:center;transition:background-color 90ms cubic-bezier(0, 0, 0.2, 0.1),opacity 90ms cubic-bezier(0, 0, 0.2, 0.1)}._mat-animation-noopable .mat-checkbox-background{transition:none}.cdk-high-contrast-active .mat-checkbox .mat-checkbox-background{background:none}.mat-checkbox-persistent-ripple{width:100%;height:100%;transform:none}.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:.04}.mat-checkbox.cdk-keyboard-focused .mat-checkbox-persistent-ripple{opacity:.12}.mat-checkbox-persistent-ripple,.mat-checkbox.mat-checkbox-disabled .mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{opacity:0}@media(hover: none){.mat-checkbox-inner-container:hover .mat-checkbox-persistent-ripple{display:none}}.mat-checkbox-checkmark{top:0;left:0;right:0;bottom:0;position:absolute;width:100%}.mat-checkbox-checkmark-path{stroke-dashoffset:22.910259;stroke-dasharray:22.910259;stroke-width:2.1333333333px}.cdk-high-contrast-black-on-white .mat-checkbox-checkmark-path{stroke:#000 !important}.mat-checkbox-mixedmark{width:calc(100% - 6px);height:2px;opacity:0;transform:scaleX(0) rotate(0deg);border-radius:2px}.cdk-high-contrast-active .mat-checkbox-mixedmark{height:0;border-top:solid 2px;margin-top:2px}.mat-checkbox-label-before .mat-checkbox-inner-container{order:1;margin-left:8px;margin-right:auto}[dir=rtl] .mat-checkbox-label-before .mat-checkbox-inner-container{margin-left:auto;margin-right:8px}.mat-checkbox-checked .mat-checkbox-checkmark{opacity:1}.mat-checkbox-checked .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-checked .mat-checkbox-mixedmark{transform:scaleX(1) rotate(-45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark{opacity:0;transform:rotate(45deg)}.mat-checkbox-indeterminate .mat-checkbox-checkmark-path{stroke-dashoffset:0}.mat-checkbox-indeterminate .mat-checkbox-mixedmark{opacity:1;transform:scaleX(1) rotate(0deg)}.mat-checkbox-unchecked .mat-checkbox-background{background-color:transparent}.mat-checkbox-disabled{cursor:default}.cdk-high-contrast-active .mat-checkbox-disabled{opacity:.5}.mat-checkbox-anim-unchecked-checked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-checked .mat-checkbox-checkmark-path{animation:180ms linear 0ms mat-checkbox-unchecked-checked-checkmark-path}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-in-background}.mat-checkbox-anim-unchecked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-unchecked-indeterminate-mixedmark}.mat-checkbox-anim-checked-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-checked-unchecked .mat-checkbox-checkmark-path{animation:90ms linear 0ms mat-checkbox-checked-unchecked-checkmark-path}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-checkmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-checkmark}.mat-checkbox-anim-checked-indeterminate .mat-checkbox-mixedmark{animation:90ms linear 0ms mat-checkbox-checked-indeterminate-mixedmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-checkmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-checkmark}.mat-checkbox-anim-indeterminate-checked .mat-checkbox-mixedmark{animation:500ms linear 0ms mat-checkbox-indeterminate-checked-mixedmark}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-background{animation:180ms linear 0ms mat-checkbox-fade-out-background}.mat-checkbox-anim-indeterminate-unchecked .mat-checkbox-mixedmark{animation:300ms linear 0ms mat-checkbox-indeterminate-unchecked-mixedmark}.mat-checkbox-input{bottom:0;left:50%}.mat-checkbox .mat-checkbox-ripple{position:absolute;left:calc(50% - 20px);top:calc(50% - 20px);height:40px;width:40px;z-index:1;pointer-events:none}\n"]
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ElementRef"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ChangeDetectorRef"] }, { type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_0__["FocusMonitor"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgZone"] }, { type: String, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Attribute"],
                args: ['tabindex']
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [MAT_CHECKBOX_CLICK_ACTION]
            }] }, { type: String, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [_angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_5__["ANIMATION_MODULE_TYPE"]]
            }] }, { type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Optional"]
            }, {
                type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Inject"],
                args: [MAT_CHECKBOX_DEFAULT_OPTIONS]
            }] }]; }, { ariaLabel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
            args: ['aria-label']
        }], ariaLabelledby: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
            args: ['aria-labelledby']
        }], id: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], labelPosition: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], name: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], change: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"]
        }], indeterminateChange: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Output"]
        }], required: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], checked: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], disabled: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], indeterminate: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], ariaDescribedby: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"],
            args: ['aria-describedby']
        }], value: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Input"]
        }], _inputElement: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"],
            args: ['input']
        }], ripple: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"],
            args: [_angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatRipple"]]
        }] }); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const MAT_CHECKBOX_REQUIRED_VALIDATOR = {
    provide: _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NG_VALIDATORS"],
    useExisting: Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["forwardRef"])(() => MatCheckboxRequiredValidator),
    multi: true
};
/**
 * Validator for Material checkbox's required attribute in template-driven checkbox.
 * Current CheckboxRequiredValidator only work with `input type=checkbox` and does not
 * work with `mat-checkbox`.
 */
class MatCheckboxRequiredValidator extends _angular_forms__WEBPACK_IMPORTED_MODULE_3__["CheckboxRequiredValidator"] {
}
MatCheckboxRequiredValidator.ɵfac = function MatCheckboxRequiredValidator_Factory(t) { return ɵMatCheckboxRequiredValidator_BaseFactory(t || MatCheckboxRequiredValidator); };
MatCheckboxRequiredValidator.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineDirective"]({ type: MatCheckboxRequiredValidator, selectors: [["mat-checkbox", "required", "", "formControlName", ""], ["mat-checkbox", "required", "", "formControl", ""], ["mat-checkbox", "required", "", "ngModel", ""]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵProvidersFeature"]([MAT_CHECKBOX_REQUIRED_VALIDATOR]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]] });
const ɵMatCheckboxRequiredValidator_BaseFactory = /*@__PURE__*/ _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetInheritedFactory"](MatCheckboxRequiredValidator);
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](MatCheckboxRequiredValidator, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Directive"],
        args: [{
                selector: `mat-checkbox[required][formControlName],
             mat-checkbox[required][formControl], mat-checkbox[required][ngModel]`,
                providers: [MAT_CHECKBOX_REQUIRED_VALIDATOR]
            }]
    }], null, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/** This module is used by both original and MDC-based checkbox implementations. */
class _MatCheckboxRequiredValidatorModule {
}
_MatCheckboxRequiredValidatorModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: _MatCheckboxRequiredValidatorModule });
_MatCheckboxRequiredValidatorModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function _MatCheckboxRequiredValidatorModule_Factory(t) { return new (t || _MatCheckboxRequiredValidatorModule)(); } });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](_MatCheckboxRequiredValidatorModule, { declarations: [MatCheckboxRequiredValidator], exports: [MatCheckboxRequiredValidator] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](_MatCheckboxRequiredValidatorModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                exports: [MatCheckboxRequiredValidator],
                declarations: [MatCheckboxRequiredValidator]
            }]
    }], null, null); })();
class MatCheckboxModule {
}
MatCheckboxModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: MatCheckboxModule });
MatCheckboxModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ factory: function MatCheckboxModule_Factory(t) { return new (t || MatCheckboxModule)(); }, imports: [[
            _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__["ObserversModule"],
            _MatCheckboxRequiredValidatorModule
        ], _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"], _MatCheckboxRequiredValidatorModule] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](MatCheckboxModule, { declarations: function () { return [MatCheckbox]; }, imports: function () { return [_angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__["ObserversModule"], _MatCheckboxRequiredValidatorModule]; }, exports: function () { return [MatCheckbox, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"], _MatCheckboxRequiredValidatorModule]; } }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](MatCheckboxModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
        args: [{
                imports: [
                    _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatRippleModule"], _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"], _angular_cdk_observers__WEBPACK_IMPORTED_MODULE_6__["ObserversModule"],
                    _MatCheckboxRequiredValidatorModule
                ],
                exports: [MatCheckbox, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__["MatCommonModule"], _MatCheckboxRequiredValidatorModule],
                declarations: [MatCheckbox]
            }]
    }], null, null); })();

/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Generated bundle index. Do not edit.
 */



//# sourceMappingURL=checkbox.js.map

/***/ }),

/***/ "jI73":
/*!**************************************************************************************!*\
  !*** ./src/app/pages/courses-page/components/video-player/video-player.component.ts ***!
  \**************************************************************************************/
/*! exports provided: VideoPlayerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideoPlayerComponent", function() { return VideoPlayerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var video_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! video.js */ "8OJ3");
/* harmony import */ var videojs_vr_dist_videojs_vr_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! videojs-vr/dist/videojs-vr.js */ "ziOO");
/* harmony import */ var videojs_vr_dist_videojs_vr_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(videojs_vr_dist_videojs_vr_js__WEBPACK_IMPORTED_MODULE_2__);




const _c0 = ["videoCourse"];
class VideoPlayerComponent {
    constructor() {
        this.config = {
            controls: true,
            autoplay: false,
            fluid: false,
            loop: false,
            plugin: {
                panorama: {
                    clickAndDrag: true,
                    clickToToggle: true,
                    autoMobileOrientation: true,
                    backToVerticalCenter: false,
                    backToHorizonCenter: false
                }
            }
        };
    }
    ngOnChanges(changes) {
        if (changes['Src']) {
            console.log('video', this.Src, this.poster);
        }
    }
    get baseUrl() {
        return window.origin;
    }
    ngAfterViewInit() {
        this.player = Object(video_js__WEBPACK_IMPORTED_MODULE_1__["default"])(this.target.nativeElement, this.config, () => {
            this.player.vr({ projection: '360' });
        });
    }
    ngOnInit() {
    }
}
VideoPlayerComponent.ɵfac = function VideoPlayerComponent_Factory(t) { return new (t || VideoPlayerComponent)(); };
VideoPlayerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: VideoPlayerComponent, selectors: [["app-video-player"]], viewQuery: function VideoPlayerComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.target = _t.first);
    } }, inputs: { Src: "Src", poster: "poster" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"]], decls: 3, vars: 2, consts: [["crossorigin", "anonymous", "controls", "", "playsinline", "", "preload", "none", 1, "video-js", "vjs-default-skin", "vjs-big-play-centered", "custom-player", 2, "width", "100%", "height", "120px", 3, "poster"], ["videoCourse", ""], ["type", "video/mp4", 3, "src"]], template: function VideoPlayerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "video", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "source", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("poster", ctx.baseUrl + "/" + ctx.poster, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.Src, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NvdXJzZXMtcGFnZS9jb21wb25lbnRzL3ZpZGVvLXBsYXllci92aWRlby1wbGF5ZXIuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](VideoPlayerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-video-player',
                templateUrl: './video-player.component.html',
                styleUrls: ['./video-player.component.scss']
            }]
    }], function () { return []; }, { Src: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], poster: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], target: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['videoCourse']
        }] }); })();


/***/ }),

/***/ "ykUH":
/*!*******************************************************************!*\
  !*** ./src/app/pages/courses-page/courses-page-routing.module.ts ***!
  \*******************************************************************/
/*! exports provided: CoursesPageRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CoursesPageRoutingModule", function() { return CoursesPageRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_courses_courses_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/courses/courses.component */ "FJQz");





const routes = [{ path: 'Courses', component: _components_courses_courses_component__WEBPACK_IMPORTED_MODULE_2__["CoursesComponent"] }];
class CoursesPageRoutingModule {
}
CoursesPageRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: CoursesPageRoutingModule });
CoursesPageRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function CoursesPageRoutingModule_Factory(t) { return new (t || CoursesPageRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CoursesPageRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CoursesPageRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ })

}]);
//# sourceMappingURL=pages-courses-page-courses-page-module.js.map