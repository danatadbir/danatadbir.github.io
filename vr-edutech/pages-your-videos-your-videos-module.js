(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-your-videos-your-videos-module"],{

/***/ "3wd/":
/*!*****************************************************************!*\
  !*** ./src/app/pages/your-videos/your-videos-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: YourVideosRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YourVideosRoutingModule", function() { return YourVideosRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_videos_videos_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/videos/videos.component */ "7qav");





const routes = [
    { path: 'Your-Videos', component: _components_videos_videos_component__WEBPACK_IMPORTED_MODULE_2__["VideosComponent"] }
];
class YourVideosRoutingModule {
}
YourVideosRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: YourVideosRoutingModule });
YourVideosRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function YourVideosRoutingModule_Factory(t) { return new (t || YourVideosRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](YourVideosRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](YourVideosRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "4cAV":
/*!***********************************************************************************!*\
  !*** ./src/app/pages/your-videos/components/dialogs/reapply/reapply.component.ts ***!
  \***********************************************************************************/
/*! exports provided: ReapplyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReapplyComponent", function() { return ReapplyComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");




class ReapplyComponent {
    constructor() {
        this.description = '';
    }
    ngOnInit() {
    }
}
ReapplyComponent.ɵfac = function ReapplyComponent_Factory(t) { return new (t || ReapplyComponent)(); };
ReapplyComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ReapplyComponent, selectors: [["app-reapply"]], decls: 12, vars: 1, consts: [["mat-dialog-title", ""], [1, "mat-typography"], [1, "mb", "input-div"], [1, "label-dialog"], ["rows", "3", 1, "input-dialog-custom", "w-100", 2, "resize", "none", 3, "ngModel", "ngModelChange"], ["align", "end"], ["mat-dialog-close", "", 1, "btn-custom-dialog", "color-red", "mr-button"], ["mat-dialog-close", "", 1, "btn-custom-dialog", "color-green", "mr-button"]], template: function ReapplyComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Reason for Reapply");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-dialog-content", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Reason");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "textarea", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function ReapplyComponent_Template_textarea_ngModelChange_6_listener($event) { return ctx.description = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-dialog-actions", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Send");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.description);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3lvdXItdmlkZW9zL2NvbXBvbmVudHMvZGlhbG9ncy9yZWFwcGx5L3JlYXBwbHkuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ReapplyComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-reapply',
                templateUrl: './reapply.component.html',
                styleUrls: ['./reapply.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "7qav":
/*!*************************************************************************!*\
  !*** ./src/app/pages/your-videos/components/videos/videos.component.ts ***!
  \*************************************************************************/
/*! exports provided: VideosComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VideosComponent", function() { return VideosComponent; });
/* harmony import */ var _dialogs_reapply_reapply_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../dialogs/reapply/reapply.component */ "4cAV");
/* harmony import */ var _dialogs_reject_reject_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../dialogs/reject/reject.component */ "Pj5i");
/* harmony import */ var _dialogs_edit_course_edit_course_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../dialogs/edit-course/edit-course.component */ "8jVY");
/* harmony import */ var _dialogs_delete_course_delete_course_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../dialogs/delete-course/delete-course.component */ "zkyY");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var src_app_service_app_init_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/service/app-init.service */ "X4hQ");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _your_videos_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../your-videos.service */ "ayZL");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _video_player_video_player_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../video-player/video-player.component */ "cgZn");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");













function VideosComponent_th_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Video ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "app-video-player", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r20 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("Src", element_r20 == null ? null : element_r20.video)("poster", element_r20 == null ? null : element_r20.poster);
} }
function VideosComponent_th_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Name ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r21 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", element_r21.name, " ");
} }
function VideosComponent_th_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Category ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r22 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", element_r22.category, " ");
} }
function VideosComponent_th_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Uploader ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r23 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", element_r23.uploader, " ");
} }
function VideosComponent_th_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Length ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r24 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", element_r24.length, " ");
} }
function VideosComponent_th_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Price ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_24_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](2, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " (USD) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r25 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind4"](2, 1, element_r25.price, "", "", "2.0"), " ");
} }
function VideosComponent_th_26_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Status ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_27_span_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Pending ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_27_span_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Approved");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_27_span_3_Template(rf, ctx) { if (rf & 1) {
    const _r34 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function VideosComponent_td_27_span_3_Template_span_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r34); const ctx_r33 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r33.openDialogReject(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Rejected");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_27_span_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " deleteRequest ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_27_span_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "span", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " deleted ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_27_button_7_Template(rf, ctx) { if (rf & 1) {
    const _r36 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function VideosComponent_td_27_button_7_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r36); const ctx_r35 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](2); return ctx_r35.openDialogReapply(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, "Reapply ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_27_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, VideosComponent_td_27_span_1_Template, 2, 0, "span", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](2, VideosComponent_td_27_span_2_Template, 2, 0, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](3, VideosComponent_td_27_span_3_Template, 2, 0, "span", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](4, VideosComponent_td_27_span_4_Template, 2, 0, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](5, VideosComponent_td_27_span_5_Template, 2, 0, "span", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](7, VideosComponent_td_27_button_7_Template, 2, 0, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r26 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", element_r26.status === 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", element_r26.status === 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", element_r26.status === 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", element_r26.status === 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", element_r26.status === 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", element_r26.status === 3);
} }
function VideosComponent_th_29_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Edit ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_30_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r41 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function VideosComponent_td_30_button_1_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r41); const element_r37 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit; const ctx_r39 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r39.openDialogEdit(element_r37); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "img", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_30_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, VideosComponent_td_30_button_1_Template, 2, 0, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r37 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", element_r37.status !== 4 && element_r37.status !== 5);
} }
function VideosComponent_th_32_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "th", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](1, " Delete ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_33_button_1_Template(rf, ctx) { if (rf & 1) {
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function VideosComponent_td_33_button_1_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r46); const element_r42 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]().$implicit; const ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"](); return ctx_r44.openDialog(element_r42); });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](1, "img", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} }
function VideosComponent_td_33_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "td", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](1, VideosComponent_td_33_button_1_Template, 2, 0, "button", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
} if (rf & 2) {
    const element_r42 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", element_r42.status !== 4 && element_r42.status !== 5);
} }
function VideosComponent_tr_34_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 44);
} }
function VideosComponent_tr_35_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](0, "tr", 45);
} }
class VideosComponent {
    constructor(dialog, service) {
        this.dialog = dialog;
        this.service = service;
        this.displayedColumns = [
            'video',
            'name',
            'category',
            'uploader',
            'length',
            'price',
            'status',
            'edit',
            'delete',
        ];
    }
    ngOnInit() {
        this.coursesList();
    }
    coursesList() {
        this.service.listCourses().subscribe((res) => {
            var _a, _b;
            let data = res.courses;
            console.log(data, res);
            this.courses = [];
            for (let file of data) {
                this.courses.push({
                    id: file === null || file === void 0 ? void 0 : file._id,
                    video: `${src_app_service_app_init_service__WEBPACK_IMPORTED_MODULE_5__["AppInitService"].baseUrl}/${file === null || file === void 0 ? void 0 : file.file}`,
                    name: file === null || file === void 0 ? void 0 : file.name,
                    category: file === null || file === void 0 ? void 0 : file.category,
                    uploader: ((_a = file === null || file === void 0 ? void 0 : file.owner) === null || _a === void 0 ? void 0 : _a.firstName) + ' ' + ((_b = file === null || file === void 0 ? void 0 : file.owner) === null || _b === void 0 ? void 0 : _b.lastName),
                    description: file === null || file === void 0 ? void 0 : file.description,
                    price: file === null || file === void 0 ? void 0 : file.price,
                    length: new Date((file === null || file === void 0 ? void 0 : file.length) * 1000).toISOString().substr(14, 5),
                    status: this.convertStatus(file.status),
                    poster: `${src_app_service_app_init_service__WEBPACK_IMPORTED_MODULE_5__["AppInitService"].baseUrl}/${file.thumbnail}`,
                    notes: (file === null || file === void 0 ? void 0 : file.notes) ? file === null || file === void 0 ? void 0 : file.notes : [],
                });
            }
        });
    }
    openDialog(course) {
        console.log(course);
        const dialogRef = this.dialog.open(_dialogs_delete_course_delete_course_component__WEBPACK_IMPORTED_MODULE_3__["DeleteCourseComponent"], {
            width: '400px',
            data: course,
        });
        dialogRef.afterClosed().subscribe((result) => {
            this.coursesList();
        });
    }
    openDialogEdit(video) {
        const dialogRef = this.dialog.open(_dialogs_edit_course_edit_course_component__WEBPACK_IMPORTED_MODULE_2__["EditCourseComponent"], {
            width: '700px',
            data: video,
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }
    openDialogReject() {
        const dialogRef = this.dialog.open(_dialogs_reject_reject_component__WEBPACK_IMPORTED_MODULE_1__["RejectComponent"], {
            width: '400px',
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
        });
    }
    openDialogReapply() {
        const dialogRef = this.dialog.open(_dialogs_reapply_reapply_component__WEBPACK_IMPORTED_MODULE_0__["ReapplyComponent"], {
            width: '400px',
        });
        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
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
            case 'deleterequest':
                st = 4;
                break;
            case 'deleted':
                st = 5;
                break;
            default:
                st = 1;
                break;
        }
        return st;
    }
}
VideosComponent.ɵfac = function VideosComponent_Factory(t) { return new (t || VideosComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_your_videos_service__WEBPACK_IMPORTED_MODULE_7__["YourVideosService"])); };
VideosComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: VideosComponent, selectors: [["app-videos"]], decls: 36, vars: 3, consts: [[1, "holder-content"], [1, "component-container"], [1, "holder-name-section"], [1, "name-section"], [1, "holder-content-component"], ["mat-table", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "video"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["style", "width: 300px;", "mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["class", "txt-center", "mat-header-cell", "", 4, "matHeaderCellDef"], ["style", "color: #2F6855!important;", "mat-cell", "", 4, "matCellDef"], ["matColumnDef", "category"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "uploader"], ["matColumnDef", "length"], ["matColumnDef", "price"], ["matColumnDef", "status"], ["matColumnDef", "edit"], ["matColumnDef", "delete"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", "", 2, "width", "300px"], [3, "Src", "poster"], ["mat-header-cell", "", 1, "txt-center"], ["mat-cell", "", 2, "color", "#2F6855!important"], ["mat-cell", ""], ["class", "status-chip pendding", 4, "ngIf"], ["class", "status-chip approve", 4, "ngIf"], ["class", "status-chip reject", 3, "click", 4, "ngIf"], ["class", "status-chip reject", 4, "ngIf"], ["mat-button", "", "color", "primary", "style", "margin-left: 5px; margin-bottom: 10px; color: #2F6855;", 3, "click", 4, "ngIf"], [1, "status-chip", "pendding"], [1, "status-chip", "approve"], [1, "status-chip", "reject", 3, "click"], [1, "status-chip", "reject"], ["mat-button", "", "color", "primary", 2, "margin-left", "5px", "margin-bottom", "10px", "color", "#2F6855", 3, "click"], ["color", "primary", "mat-icon-button", "", 3, "click", 4, "ngIf"], ["color", "primary", "mat-icon-button", "", 3, "click"], ["src", "./assets/img/edit.svg", "alt", "", 2, "width", "20px"], ["color", "warn", "mat-icon-button", "", 3, "click", 4, "ngIf"], ["color", "warn", "mat-icon-button", "", 3, "click"], ["src", "./assets/img/delete.svg", "alt", "", 2, "width", "20px"], ["mat-header-row", ""], ["mat-row", ""]], template: function VideosComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Your Videos");
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](6, "table", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](7, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](8, VideosComponent_th_8_Template, 2, 0, "th", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](9, VideosComponent_td_9_Template, 2, 2, "td", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](10, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](11, VideosComponent_th_11_Template, 2, 0, "th", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](12, VideosComponent_td_12_Template, 2, 1, "td", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](13, 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](14, VideosComponent_th_14_Template, 2, 0, "th", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](15, VideosComponent_td_15_Template, 2, 1, "td", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](16, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](17, VideosComponent_th_17_Template, 2, 0, "th", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](18, VideosComponent_td_18_Template, 2, 1, "td", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](19, 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](20, VideosComponent_th_20_Template, 2, 0, "th", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](21, VideosComponent_td_21_Template, 2, 1, "td", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](22, 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](23, VideosComponent_th_23_Template, 2, 0, "th", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](24, VideosComponent_td_24_Template, 5, 6, "td", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](25, 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](26, VideosComponent_th_26_Template, 2, 0, "th", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](27, VideosComponent_td_27_Template, 8, 6, "td", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](28, 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](29, VideosComponent_th_29_Template, 2, 0, "th", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](30, VideosComponent_td_30_Template, 2, 1, "td", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](31, 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](32, VideosComponent_th_32_Template, 2, 0, "th", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](33, VideosComponent_td_33_Template, 2, 1, "td", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](34, VideosComponent_tr_34_Template, 1, 0, "tr", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](35, VideosComponent_tr_35_Template, 1, 0, "tr", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("dataSource", ctx.courses);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](28);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
    } }, directives: [_angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatCell"], _video_player_video_player_component__WEBPACK_IMPORTED_MODULE_9__["VideoPlayerComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButton"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_8__["MatRow"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_10__["CurrencyPipe"]], styles: ["tr.mat-row[_ngcontent-%COMP%] {\n  height: 150px;\n  padding-top: 15px;\n  padding-bottom: 15px;\n  box-sizing: border-box;\n}\n\ntr.mat-header-row[_ngcontent-%COMP%] {\n  background: aliceblue;\n}\n\n.txt-center[_ngcontent-%COMP%] {\n  text-align: center;\n}\n\n.status-chip[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 5px;\n  border-radius: 50px;\n  -webkit-border-radius: 50px;\n  -moz-border-radius: 50px;\n  -ms-border-radius: 50px;\n  -o-border-radius: 50px;\n  font-size: 13px;\n  width: 85px;\n}\n\n.pendding[_ngcontent-%COMP%] {\n  background-color: #e7fd1b;\n  color: #000000;\n}\n\n.approve[_ngcontent-%COMP%] {\n  background-color: #2F6855;\n  color: #ffffff;\n}\n\n.reject[_ngcontent-%COMP%] {\n  background-color: #e71212;\n  color: #ffffff;\n  cursor: pointer;\n  margin-bottom: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMveW91ci12aWRlb3MvY29tcG9uZW50cy92aWRlb3MvdmlkZW9zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsYUFBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7RUFDQSxzQkFBQTtBQUNGOztBQUNBO0VBQ0UscUJBQUE7QUFFRjs7QUFBQTtFQUNFLGtCQUFBO0FBR0Y7O0FBREE7RUFDRSxxQkFBQTtFQUNBLFlBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0Esd0JBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7QUFJRjs7QUFEQTtFQUNFLHlCQUFBO0VBQ0EsY0FBQTtBQUlGOztBQUNBO0VBQ0UseUJBQUE7RUFDQSxjQUFBO0FBRUY7O0FBQ0E7RUFDRSx5QkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBRUEsa0JBQUE7QUFDRiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3lvdXItdmlkZW9zL2NvbXBvbmVudHMvdmlkZW9zL3ZpZGVvcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRyLm1hdC1yb3d7XG4gIGhlaWdodDogMTUwcHg7XG4gIHBhZGRpbmctdG9wOiAxNXB4O1xuICBwYWRkaW5nLWJvdHRvbTogMTVweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cbnRyLm1hdC1oZWFkZXItcm93IHtcbiAgYmFja2dyb3VuZDogYWxpY2VibHVlO1xufVxuLnR4dC1jZW50ZXJ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5zdGF0dXMtY2hpcHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBwYWRkaW5nOiA1cHg7XG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNTBweDtcbiAgLW1vei1ib3JkZXItcmFkaXVzOiA1MHB4O1xuICAtbXMtYm9yZGVyLXJhZGl1czogNTBweDtcbiAgLW8tYm9yZGVyLXJhZGl1czogNTBweDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICB3aWR0aDogODVweDtcblxufVxuLnBlbmRkaW5ne1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjMxLCAyNTMsIDI3KTtcbiAgY29sb3I6ICMwMDAwMDA7XG4gIC8vIG1hcmdpbi1sZWZ0OiAxMHB4O1xuXG5cbn1cbi5hcHByb3Zle1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMkY2ODU1O1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgLy8gbWFyZ2luLWxlZnQ6IDEwcHg7XG59XG4ucmVqZWN0e1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjMxLCAxOCwgMTgpO1xuICBjb2xvcjogI2ZmZmZmZjtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICAvLyBtYXJnaW4tbGVmdDogMTBweDtcbiAgbWFyZ2luLWJvdHRvbTogNXB4O1xuXG5cbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵsetClassMetadata"](VideosComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_4__["Component"],
        args: [{
                selector: 'app-videos',
                templateUrl: './videos.component.html',
                styleUrls: ['./videos.component.scss'],
            }]
    }], function () { return [{ type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_6__["MatDialog"] }, { type: _your_videos_service__WEBPACK_IMPORTED_MODULE_7__["YourVideosService"] }]; }, null); })();


/***/ }),

/***/ "8jVY":
/*!*******************************************************************************************!*\
  !*** ./src/app/pages/your-videos/components/dialogs/edit-course/edit-course.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: EditCourseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditCourseComponent", function() { return EditCourseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _video_player_video_player_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../video-player/video-player.component */ "cgZn");





class EditCourseComponent {
    constructor(video) {
        this.video = video;
        this.description = 'Test Description';
    }
    ngOnInit() {
        console.log(this.video);
    }
}
EditCourseComponent.ɵfac = function EditCourseComponent_Factory(t) { return new (t || EditCourseComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])); };
EditCourseComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: EditCourseComponent, selectors: [["app-edit-course"]], decls: 35, vars: 8, consts: [["mat-dialog-title", ""], [1, "mat-typography"], [1, "container-detail-course"], [1, "flex-row", "mb"], [1, "my-col-2"], [1, "label-dialog"], ["type", "text", "readonly", "", 1, "input-dialog-custom", "w-100", 3, "value"], ["type", "text", 1, "input-dialog-custom", "w-100", 3, "value"], [1, "flex-row"], [1, "mb", "input-div"], ["value", "Test Description", "rows", "3", 1, "input-dialog-custom", "w-100", 2, "resize", "none", 3, "value"], [1, "my-col-2", 2, "height", "280px"], [2, "width", "100%", "height", "100%"], [3, "Src", "poster"], ["align", "end"], ["mat-dialog-close", "", 1, "btn-custom-dialog", "color-green", "mr-button"], ["mat-dialog-close", "", 1, "btn-custom-dialog", "color-red"]], template: function EditCourseComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-dialog-content", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Uploader Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Course Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "input", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Length Course");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Category Course");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "input", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "textarea", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "div", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](29, "app-video-player", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "mat-dialog-actions", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Applay");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "button", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.video == null ? null : ctx.video.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.video == null ? null : ctx.video.uploader);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.video == null ? null : ctx.video.name);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.video == null ? null : ctx.video.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.video == null ? null : ctx.video.category);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.video == null ? null : ctx.video.description);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("Src", ctx.video == null ? null : ctx.video.video)("poster", ctx.video == null ? null : ctx.video.poster);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _video_player_video_player_component__WEBPACK_IMPORTED_MODULE_2__["VideoPlayerComponent"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"]], styles: [".container-detail-course[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 10px;\n}\n\n.details-holder[_ngcontent-%COMP%] {\n  width: 300px;\n  height: 100%;\n  box-sizing: border-box;\n  padding: 10px;\n  margin-right: 10px;\n  overflow-y: auto;\n}\n\n.player-holder[_ngcontent-%COMP%] {\n  width: calc(100% - 310px);\n  height: 400px;\n  padding: 10px;\n  box-sizing: border-box;\n  background-color: #eee;\n  border-radius: 5px;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  -o-border-radius: 5px;\n}\n\n.detail-text[_ngcontent-%COMP%] {\n  font-size: 16px;\n  margin-bottom: 10px;\n  line-height: 2;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMveW91ci12aWRlb3MvY29tcG9uZW50cy9kaWFsb2dzL2VkaXQtY291cnNlL2VkaXQtY291cnNlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBRUksV0FBQTtFQUNBLGFBQUE7QUFBSjs7QUFFRTtFQUNFLFlBQUE7RUFDQSxZQUFBO0VBQ0Esc0JBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQUNKOztBQUVFO0VBQ0UseUJBQUE7RUFDQSxhQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSxrQkFBQTtFQUNBLDBCQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtFQUNBLHFCQUFBO0FBQ0o7O0FBRUU7RUFDRSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FBQ0oiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy95b3VyLXZpZGVvcy9jb21wb25lbnRzL2RpYWxvZ3MvZWRpdC1jb3Vyc2UvZWRpdC1jb3Vyc2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29udGFpbmVyLWRldGFpbC1jb3Vyc2V7XG5cbiAgICB3aWR0aDogMTAwJTtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICB9XG4gIC5kZXRhaWxzLWhvbGRlcntcbiAgICB3aWR0aDogMzAwcHg7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgcGFkZGluZzogMTBweDtcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gICAgb3ZlcmZsb3cteTogYXV0bztcblxuICB9XG4gIC5wbGF5ZXItaG9sZGVye1xuICAgIHdpZHRoOiBjYWxjKDEwMCUgLSAzMTBweCk7XG4gICAgaGVpZ2h0OiA0MDBweDtcbiAgICBwYWRkaW5nOiAxMHB4O1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgICBib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgLW1vei1ib3JkZXItcmFkaXVzOiA1cHg7XG4gICAgLW1zLWJvcmRlci1yYWRpdXM6IDVweDtcbiAgICAtby1ib3JkZXItcmFkaXVzOiA1cHg7XG4gIH1cblxuICAuZGV0YWlsLXRleHR7XG4gICAgZm9udC1zaXplOiAxNnB4O1xuICAgIG1hcmdpbi1ib3R0b206IDEwcHg7XG4gICAgbGluZS1oZWlnaHQ6IDI7XG4gIH1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EditCourseComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-edit-course',
                templateUrl: './edit-course.component.html',
                styleUrls: ['./edit-course.component.scss']
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }]; }, null); })();


/***/ }),

/***/ "9Xa1":
/*!*********************************************************!*\
  !*** ./src/app/pages/your-videos/your-videos.module.ts ***!
  \*********************************************************/
/*! exports provided: YourVideosModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YourVideosModule", function() { return YourVideosModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _your_videos_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./your-videos-routing.module */ "3wd/");
/* harmony import */ var _components_videos_videos_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/videos/videos.component */ "7qav");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/table */ "+0xr");
/* harmony import */ var _components_video_player_video_player_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/video-player/video-player.component */ "cgZn");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _components_dialogs_edit_course_edit_course_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/dialogs/edit-course/edit-course.component */ "8jVY");
/* harmony import */ var _components_dialogs_delete_course_delete_course_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/dialogs/delete-course/delete-course.component */ "zkyY");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _components_dialogs_reject_reject_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/dialogs/reject/reject.component */ "Pj5i");
/* harmony import */ var _components_dialogs_reapply_reapply_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/dialogs/reapply/reapply.component */ "4cAV");















class YourVideosModule {
}
YourVideosModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: YourVideosModule });
YourVideosModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function YourVideosModule_Factory(t) { return new (t || YourVideosModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _your_videos_routing_module__WEBPACK_IMPORTED_MODULE_2__["YourVideosRoutingModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_4__["MatTableModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
            _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ReactiveFormsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](YourVideosModule, { declarations: [_components_videos_videos_component__WEBPACK_IMPORTED_MODULE_3__["VideosComponent"], _components_video_player_video_player_component__WEBPACK_IMPORTED_MODULE_5__["VideoPlayerComponent"], _components_dialogs_edit_course_edit_course_component__WEBPACK_IMPORTED_MODULE_8__["EditCourseComponent"], _components_dialogs_delete_course_delete_course_component__WEBPACK_IMPORTED_MODULE_9__["DeleteCourseComponent"], _components_dialogs_reject_reject_component__WEBPACK_IMPORTED_MODULE_12__["RejectComponent"], _components_dialogs_reapply_reapply_component__WEBPACK_IMPORTED_MODULE_13__["ReapplyComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _your_videos_routing_module__WEBPACK_IMPORTED_MODULE_2__["YourVideosRoutingModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_4__["MatTableModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
        _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ReactiveFormsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](YourVideosModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_components_videos_videos_component__WEBPACK_IMPORTED_MODULE_3__["VideosComponent"], _components_video_player_video_player_component__WEBPACK_IMPORTED_MODULE_5__["VideoPlayerComponent"], _components_dialogs_edit_course_edit_course_component__WEBPACK_IMPORTED_MODULE_8__["EditCourseComponent"], _components_dialogs_delete_course_delete_course_component__WEBPACK_IMPORTED_MODULE_9__["DeleteCourseComponent"], _components_dialogs_reject_reject_component__WEBPACK_IMPORTED_MODULE_12__["RejectComponent"], _components_dialogs_reapply_reapply_component__WEBPACK_IMPORTED_MODULE_13__["ReapplyComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _your_videos_routing_module__WEBPACK_IMPORTED_MODULE_2__["YourVideosRoutingModule"],
                    _angular_material_table__WEBPACK_IMPORTED_MODULE_4__["MatTableModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
                    _angular_material_dialog__WEBPACK_IMPORTED_MODULE_10__["MatDialogModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_11__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_11__["ReactiveFormsModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "Pj5i":
/*!*********************************************************************************!*\
  !*** ./src/app/pages/your-videos/components/dialogs/reject/reject.component.ts ***!
  \*********************************************************************************/
/*! exports provided: RejectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RejectComponent", function() { return RejectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "3Pt+");




class RejectComponent {
    constructor() {
        this.description = 'This Video is very bad!!!';
    }
    ngOnInit() {
    }
}
RejectComponent.ɵfac = function RejectComponent_Factory(t) { return new (t || RejectComponent)(); };
RejectComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RejectComponent, selectors: [["app-reject"]], decls: 10, vars: 1, consts: [["mat-dialog-title", ""], [1, "mat-typography"], [1, "mb", "input-div"], [1, "label-dialog"], ["value", "Test Description", "rows", "3", "readonly", "", 1, "input-dialog-custom", "w-100", 2, "resize", "none", 3, "ngModel", "ngModelChange"], ["align", "end"], ["mat-dialog-close", "", 1, "btn-custom-dialog", "color-red", "mr-button"]], template: function RejectComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Reason for rejecting the course");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-dialog-content", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Reason");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "textarea", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function RejectComponent_Template_textarea_ngModelChange_6_listener($event) { return ctx.description = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-dialog-actions", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Close");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.description);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__["NgModel"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3lvdXItdmlkZW9zL2NvbXBvbmVudHMvZGlhbG9ncy9yZWplY3QvcmVqZWN0LmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RejectComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-reject',
                templateUrl: './reject.component.html',
                styleUrls: ['./reject.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "ayZL":
/*!*********************************************************************!*\
  !*** ./src/app/pages/your-videos/components/your-videos.service.ts ***!
  \*********************************************************************/
/*! exports provided: API, YourVideosService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API", function() { return API; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YourVideosService", function() { return YourVideosService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../environments/environment */ "AytR");







const API = `${_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].API_BASE}`;
const httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
        'Content-Type': 'application/json'
    }),
};
class YourVideosService {
    constructor(http) {
        this.http = http;
    }
    listCourses() {
        return this.http.get(`${API}/vredu/course`)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(handleError('all courses')));
    }
    requestDeleteCourses(data) {
        return this.http.put(`${API}/vredu/course`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(handleError('delete request courses')));
    }
}
YourVideosService.ɵfac = function YourVideosService_Factory(t) { return new (t || YourVideosService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
YourVideosService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: YourVideosService, factory: YourVideosService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](YourVideosService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }]; }, null); })();
function handleError(operation = 'operation', result) {
    return (error) => {
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
        // TODO: better job of transforming error for user consumption
        // UtilitesService.log(`${operation} failed: ${error.message}`);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(error.error);
    };
}


/***/ }),

/***/ "cgZn":
/*!*************************************************************************************!*\
  !*** ./src/app/pages/your-videos/components/video-player/video-player.component.ts ***!
  \*************************************************************************************/
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
            controlBar: {
                muteToggle: false,
                replay: false,
                muted: false
            },
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
    } }, inputs: { Src: "Src", poster: "poster" }, decls: 3, vars: 2, consts: [["crossorigin", "anonymous", "controls", "", "muted", "", "playsinline", "", "preload", "none", 1, "video-js", "vjs-default-skin", "vjs-big-play-centered", "custom-player", 2, "width", "100%", "height", "120px", 3, "poster"], ["videoCourse", ""], ["type", "video/mp4", 3, "src"]], template: function VideoPlayerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "video", 0, 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "source", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("poster", ctx.poster, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.Src, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3lvdXItdmlkZW9zL2NvbXBvbmVudHMvdmlkZW8tcGxheWVyL3ZpZGVvLXBsYXllci5jb21wb25lbnQuc2NzcyJ9 */"] });
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

/***/ "zkyY":
/*!***********************************************************************************************!*\
  !*** ./src/app/pages/your-videos/components/dialogs/delete-course/delete-course.component.ts ***!
  \***********************************************************************************************/
/*! exports provided: DeleteCourseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeleteCourseComponent", function() { return DeleteCourseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ "0IaG");
/* harmony import */ var _your_videos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../your-videos.service */ "ayZL");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");






class DeleteCourseComponent {
    constructor(video, service) {
        this.video = video;
        this.service = service;
        this.description = '';
    }
    ngOnInit() {
        console.log(this.video);
    }
    deleteRequest() {
        var _a, _b, _c, _d, _e;
        let data = {
            name: (_a = this.video) === null || _a === void 0 ? void 0 : _a.name,
            category: (_b = this.video) === null || _b === void 0 ? void 0 : _b.category,
            price: (_c = this.video) === null || _c === void 0 ? void 0 : _c.price,
            description: (_d = this.video) === null || _d === void 0 ? void 0 : _d.description,
            status: 'deleterequest',
            id: (_e = this.video) === null || _e === void 0 ? void 0 : _e.id,
            note: this.description,
        };
        this.service.requestDeleteCourses(data).subscribe(res => {
        });
    }
}
DeleteCourseComponent.ɵfac = function DeleteCourseComponent_Factory(t) { return new (t || DeleteCourseComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_your_videos_service__WEBPACK_IMPORTED_MODULE_2__["YourVideosService"])); };
DeleteCourseComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DeleteCourseComponent, selectors: [["app-delete-course"]], decls: 14, vars: 1, consts: [["mat-dialog-title", ""], [1, "mat-typography"], [1, "mb", "input-div"], [1, "label-dialog"], ["value", "Test Description", "rows", "3", 1, "input-dialog-custom", "w-100", 2, "resize", "none", 3, "ngModel", "ngModelChange"], ["align", "end"], ["mat-dialog-close", "", 1, "btn-custom-dialog", "color-red", "mr-button"], ["mat-dialog-close", "", 1, "btn-custom-dialog", "color-green", 3, "click"]], template: function DeleteCourseComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Delete Course");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-dialog-content", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Are You Sure for Delete Course?");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "label", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Reason");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "textarea", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function DeleteCourseComponent_Template_textarea_ngModelChange_8_listener($event) { return ctx.description = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "mat-dialog-actions", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DeleteCourseComponent_Template_button_click_12_listener() { return ctx.deleteRequest(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Delete");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.description);
    } }, directives: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogTitle"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogContent"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogActions"], _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MatDialogClose"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3lvdXItdmlkZW9zL2NvbXBvbmVudHMvZGlhbG9ncy9kZWxldGUtY291cnNlL2RlbGV0ZS1jb3Vyc2UuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DeleteCourseComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-delete-course',
                templateUrl: './delete-course.component.html',
                styleUrls: ['./delete-course.component.scss']
            }]
    }], function () { return [{ type: undefined, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"]]
            }] }, { type: _your_videos_service__WEBPACK_IMPORTED_MODULE_2__["YourVideosService"] }]; }, null); })();


/***/ })

}]);
//# sourceMappingURL=pages-your-videos-your-videos-module.js.map