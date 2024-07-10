(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-upload-upload-module"],{

/***/ "GAHo":
/*!***********************************************!*\
  !*** ./src/app/pages/upload/upload.module.ts ***!
  \***********************************************/
/*! exports provided: UploadModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadModule", function() { return UploadModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _upload_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./upload-routing.module */ "L5T1");
/* harmony import */ var _components_upload_upload_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/upload/upload.component */ "Gwoo");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "3Pt+");







class UploadModule {
}
UploadModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: UploadModule });
UploadModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function UploadModule_Factory(t) { return new (t || UploadModule)(); }, imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
            _upload_routing_module__WEBPACK_IMPORTED_MODULE_2__["UploadRoutingModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](UploadModule, { declarations: [_components_upload_upload_component__WEBPACK_IMPORTED_MODULE_3__["UploadComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
        _upload_routing_module__WEBPACK_IMPORTED_MODULE_2__["UploadRoutingModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UploadModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                declarations: [_components_upload_upload_component__WEBPACK_IMPORTED_MODULE_3__["UploadComponent"]],
                imports: [
                    _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                    _upload_routing_module__WEBPACK_IMPORTED_MODULE_2__["UploadRoutingModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"]
                ]
            }]
    }], null, null); })();


/***/ }),

/***/ "Gwoo":
/*!********************************************************************!*\
  !*** ./src/app/pages/upload/components/upload/upload.component.ts ***!
  \********************************************************************/
/*! exports provided: UploadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadComponent", function() { return UploadComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _upload_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../upload.service */ "si5r");
/* harmony import */ var _page_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../page.service */ "HoS6");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");






function UploadComponent_option_28_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "option", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const category_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", category_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](category_r3);
} }
class UploadComponent {
    constructor(service, messageService) {
        this.service = service;
        this.messageService = messageService;
        this.length = 0;
        this.time = 0;
    }
    ngOnInit() {
        this.categoryList();
    }
    onSelectVideo(e) {
        let getTime;
        const file = e.target.files && e.target.files[0];
        if (file) {
            const file_ = e.target.files;
            // this.video = file_.item(0);
            console.log(this.video);
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                console.log(file, file.type);
                this.video = file;
                this.urlVideo = event.target.result;
                if (file.type == 'video/mp4' ||
                    file.type == 'video/ogg' ||
                    file.type == 'video/webm') {
                    console.log(file);
                    this.videoName = file.name;
                    let videoElement = document.createElement('video');
                    videoElement.src = event.target.result;
                    console.log(videoElement.readyState, videoElement.duration);
                    let self = this;
                    setTimeout(function () {
                        console.log(videoElement.readyState, videoElement.duration);
                        if (videoElement.readyState === 4) {
                            // console.log(videoElement.readyState,videoElement.duration)
                            self.length = self.secondsToTime(videoElement.duration);
                            self.time = videoElement.duration;
                            self.estimate(self.Category, self.time);
                            console.log(self.length);
                        }
                    }, 2000);
                }
            };
        }
    }
    onSelectPhoto(e) {
        const file = e.target.files && e.target.files[0];
        let getTime;
        // this.checkFileDuration(e);
        if (file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            // if(file.type.indexOf('image')> -1){
            //   this.format = 'image';
            // } else if(file.type.indexOf('video')> -1){
            //   this.format = 'video';
            // }
            const file_ = e.target.files;
            this.photo = file_.item(0);
            reader.onload = (event) => {
                console.log(event);
                this.urlPhoto = event.target.result;
                this.photoName = file.name;
            };
        }
    }
    secondsToTime(in_seconds) {
        in_seconds = parseFloat(in_seconds.toFixed(2));
        let time = '';
        let hours = Math.floor(in_seconds / 3600);
        let minutes = Math.floor((in_seconds - hours * 3600) / 60);
        let seconds = in_seconds - hours * 3600 - minutes * 60;
        //seconds = Math.floor( seconds );
        seconds = seconds.toFixed(0);
        if (hours < 10) {
            hours = '0' + hours;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        time = minutes + ':' + seconds;
        return time;
    }
    checkFileDuration(e) {
        let getTime;
        var file = e.target.files && e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            console.log(file);
            if (file.type == 'video/mp4' ||
                file.type == 'video/ogg' ||
                file.type == 'video/webm') {
                let videoElement = document.createElement('video');
                videoElement.src = e.target.result;
                var timer = setInterval(function () {
                    if (videoElement.readyState === 4) {
                        getTime = this.secondsToTime(videoElement.duration);
                        console.log(getTime);
                    }
                }, 500);
            }
        };
        if (file) {
            reader.readAsDataURL(file);
        }
        else {
            alert('nofile');
        }
    }
    categoryList() {
        this.service.category().subscribe((res) => {
            this.categories = res === null || res === void 0 ? void 0 : res.categories;
            this.Category = res === null || res === void 0 ? void 0 : res.categories[0];
        });
    }
    getPrice(e) {
        console.log(e);
        this.estimate(e, this.time);
    }
    estimate(category, time) {
        this.service.estimate(category, time).subscribe((res) => {
            this.priceRange = res.data[0] + '-' + res.data[1];
            this.minprice = res.data[0];
            this.maxprice = res.data[1];
        });
    }
    createCourse() {
        if (this.priceSugg > this.maxprice || this.priceSugg < this.minprice) {
            this.messageService.e("The price entered is not specified in the price range");
        }
        else {
            const video = new FormData();
            video.append('file', this.video);
            video.append('name', this.videoName);
            video.append('description', this.description);
            video.append('thumbnail', this.photo);
            video.append('category', this.Category);
            video.append('price', this.priceSugg);
            this.service.createCourse(video).subscribe((res) => {
                console.log(res);
                this.videoName = '';
                this.description = '';
                this.video = null;
                this.photo = null;
                this.photoName = '';
                this.priceRange = 0;
                this.length = 0;
                this.priceSugg = 0;
            });
        }
    }
}
UploadComponent.ɵfac = function UploadComponent_Factory(t) { return new (t || UploadComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_upload_service__WEBPACK_IMPORTED_MODULE_1__["UploadService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_page_service__WEBPACK_IMPORTED_MODULE_2__["PageService"])); };
UploadComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: UploadComponent, selectors: [["app-upload"]], decls: 53, vars: 8, consts: [[1, "holder-content"], [1, "component-container"], [1, "holder-name-section"], [1, "name-section"], [1, "holder-content-component"], [1, "flex-row", "holder-form-upload"], [1, "my-col-2", "flex-row"], [1, "btn-upload-holder"], ["type", "file", "id", "videoInput", "name", "file", 2, "display", "none", 3, "change"], ["fileInput", ""], [1, "btnUpload", 3, "click"], [1, "input-upload-holder"], ["type", "text", 1, "input-dialog-custom", "input-upload", "w-100", 3, "ngModel", "ngModelChange"], ["type", "file", "id", "file", "name", "file", 2, "display", "none", 3, "change"], ["photoInput", ""], ["color", "primary", 1, "btnUpload", 3, "click"], ["type", "text", "readonly", "", 1, "input-dialog-custom", "input-upload", "w-100", 3, "ngModel", "ngModelChange"], [1, "flex-row", "mb"], [1, "my-col-2"], [1, "label-dialog"], [1, "input-dialog-custom", "input-custom-upload", "w-100", 3, "ngModel", "ngModelChange"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "readonly", "", 1, "input-dialog-custom", "input-custom-upload", "w-100", 3, "ngModel", "ngModelChange"], ["type", "text", 1, "input-dialog-custom", "input-custom-upload", "w-100", 3, "ngModel", "ngModelChange"], [1, "w-100"], ["rows", "7", 1, "input-dialog-custom", "input-custom-upload", "w-100", 3, "ngModel", "ngModelChange"], ["align", "start", 1, "mb"], [1, "btn-upload-group"], [1, "btn-custom-dialog", "mr-button", "color-red"], [1, "btn-custom-dialog", "color-green", 3, "click"], [3, "value"]], template: function UploadComponent_Template(rf, ctx) { if (rf & 1) {
        const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Upload Course");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "input", 8, 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function UploadComponent_Template_input_change_9_listener($event) { return ctx.onSelectVideo($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UploadComponent_Template_button_click_11_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10); return _r0.click(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " Video ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "input", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UploadComponent_Template_input_ngModelChange_14_listener($event) { return ctx.videoName = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "input", 13, 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("change", function UploadComponent_Template_input_change_17_listener($event) { return ctx.onSelectPhoto($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 15);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UploadComponent_Template_button_click_19_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r4); const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](18); return _r1.click(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " Cover ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "input", 16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UploadComponent_Template_input_ngModelChange_22_listener($event) { return ctx.photoName = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Category");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "select", 20);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UploadComponent_Template_select_ngModelChange_27_listener($event) { return ctx.getPrice($event); })("ngModelChange", function UploadComponent_Template_select_ngModelChange_27_listener($event) { return ctx.Category = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](28, UploadComponent_option_28_Template, 2, 2, "option", 21);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Price Range ($)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UploadComponent_Template_input_ngModelChange_32_listener($event) { return ctx.priceRange = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](36, "Proposed price ($)");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "input", 23);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UploadComponent_Template_input_ngModelChange_37_listener($event) { return ctx.priceSugg = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "div", 18);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](40, "Length Video");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "input", 22);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UploadComponent_Template_input_ngModelChange_41_listener($event) { return ctx.length = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "div", 17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "div", 24);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "label", 19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "Description");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "textarea", 25);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function UploadComponent_Template_textarea_ngModelChange_46_listener($event) { return ctx.description = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 26);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 27);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "button", 28);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](50, "Cancel");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "button", 29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function UploadComponent_Template_button_click_51_listener() { return ctx.createCourse(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](52, "Upload");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.videoName);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.photoName);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.Category);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.categories);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.priceRange);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.priceSugg);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.description);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgModel"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["SelectControlValueAccessor"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgSelectOption"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_x"]], styles: [".btn-upload-holder[_ngcontent-%COMP%] {\n  width: 105px;\n  margin-right: 5px;\n}\n\n.input-upload-holder[_ngcontent-%COMP%] {\n  width: calc(100% - 110px);\n}\n\n.btnUpload[_ngcontent-%COMP%] {\n  min-width: 80px;\n  height: 39px;\n  background: #f9f8f7;\n  border: 0.5px solid #2F6855;\n  color: #2F6855;\n  font-family: myFont;\n  font-size: 14px;\n  padding: 5px 10px;\n  box-sizing: border-box;\n  border-radius: 20px;\n  -webkit-border-radius: 20px;\n  -moz-border-radius: 20px;\n  -ms-border-radius: 20px;\n  -o-border-radius: 20px;\n}\n\n.video-player-holder[_ngcontent-%COMP%] {\n  height: 180px;\n}\n\n.register-holder[_ngcontent-%COMP%] {\n  height: 190px;\n  display: flex;\n  align-items: flex-end;\n  justify-content: end;\n}\n\n.input-upload[_ngcontent-%COMP%] {\n  height: 42px;\n  background: rgba(50, 155, 117, 0.4);\n  border-radius: 20px;\n  -webkit-border-radius: 20px;\n  -moz-border-radius: 20px;\n  -ms-border-radius: 20px;\n  -o-border-radius: 20px;\n  color: #ffffff;\n  font-family: myFont;\n  font-size: 13px;\n  text-align: left;\n  padding: 5px 10px;\n  box-sizing: border-box;\n  border: none;\n}\n\n.holder-form-upload[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #cfd8dc;\n  height: 50px;\n  margin-bottom: 10px;\n}\n\n.input-custom-upload[_ngcontent-%COMP%] {\n  min-height: 42px;\n  border-radius: 20px;\n  -webkit-border-radius: 20px;\n  -moz-border-radius: 20px;\n  -ms-border-radius: 20px;\n  -o-border-radius: 20px;\n  color: #6d6e71;\n  font-size: 13px;\n  padding: 5px 15px;\n  box-sizing: border-box;\n  border: 1px solid #2F6855;\n  background: linear-gradient(#d8d8d8, #e9e9e9, #f5f5f5, #fcfcfc, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff, #ffffff);\n}\n\n.btn-upload-group[_ngcontent-%COMP%] {\n  float: right;\n  padding: 30px;\n  box-sizing: border-box;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvdXBsb2FkL2NvbXBvbmVudHMvdXBsb2FkL3VwbG9hZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUNBO0VBQ0UseUJBQUE7QUFFRjs7QUFDQTtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7RUFDQSxpQkFBQTtFQUNBLHNCQUFBO0VBR0EsbUJBQUE7RUFDQSwyQkFBQTtFQUNBLHdCQUFBO0VBQ0EsdUJBQUE7RUFDQSxzQkFBQTtBQUFGOztBQUVBO0VBQ0UsYUFBQTtBQUNGOztBQUNBO0VBQ0UsYUFBQTtFQUNBLGFBQUE7RUFDQSxxQkFBQTtFQUNBLG9CQUFBO0FBRUY7O0FBQUE7RUFDRSxZQUFBO0VBQ0EsbUNBQUE7RUFDQSxtQkFBQTtFQUNBLDJCQUFBO0VBQ0Esd0JBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtFQUNBLFlBQUE7QUFHRjs7QUFEQTtFQUNFLGdDQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FBSUY7O0FBRkE7RUFDRSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMkJBQUE7RUFDQSx3QkFBQTtFQUNBLHVCQUFBO0VBQ0Esc0JBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtFQUNBLHVJQUFBO0FBS0Y7O0FBVUE7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FBUEYiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy91cGxvYWQvY29tcG9uZW50cy91cGxvYWQvdXBsb2FkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJ0bi11cGxvYWQtaG9sZGVyIHtcbiAgd2lkdGg6IDEwNXB4O1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cbi5pbnB1dC11cGxvYWQtaG9sZGVyIHtcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDExMHB4KTtcbn1cblxuLmJ0blVwbG9hZCB7XG4gIG1pbi13aWR0aDogODBweDtcbiAgaGVpZ2h0OiAzOXB4O1xuICBiYWNrZ3JvdW5kOiAjZjlmOGY3O1xuICBib3JkZXI6IDAuNXB4IHNvbGlkICMyRjY4NTU7XG4gIGNvbG9yOiAjMkY2ODU1O1xuICBmb250LWZhbWlseTogbXlGb250O1xuICBmb250LXNpemU6IDE0cHg7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAvLyBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIC8vIHRvcDogNHB4O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogMjBweDtcbiAgLW1zLWJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIC1vLWJvcmRlci1yYWRpdXM6IDIwcHg7XG59XG4udmlkZW8tcGxheWVyLWhvbGRlciB7XG4gIGhlaWdodDogMTgwcHg7XG59XG4ucmVnaXN0ZXItaG9sZGVyIHtcbiAgaGVpZ2h0OiAxOTBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGVuZDtcbn1cbi5pbnB1dC11cGxvYWQge1xuICBoZWlnaHQ6IDQycHg7XG4gIGJhY2tncm91bmQ6IHJnYmEoNTAsIDE1NSwgMTE3LCAwLjQpO1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIC1tb3otYm9yZGVyLXJhZGl1czogMjBweDtcbiAgLW1zLWJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIC1vLWJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBmb250LWZhbWlseTogbXlGb250O1xuICBmb250LXNpemU6IDEzcHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIHBhZGRpbmc6IDVweCAxMHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBib3JkZXI6IG5vbmU7XG59XG4uaG9sZGVyLWZvcm0tdXBsb2FkIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNjZmQ4ZGM7XG4gIGhlaWdodDogNTBweDtcbiAgbWFyZ2luLWJvdHRvbTogMTBweDtcbn1cbi5pbnB1dC1jdXN0b20tdXBsb2FkIHtcbiAgbWluLWhlaWdodDogNDJweDtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAyMHB4O1xuICAtbW96LWJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIC1tcy1ib3JkZXItcmFkaXVzOiAyMHB4O1xuICAtby1ib3JkZXItcmFkaXVzOiAyMHB4O1xuICBjb2xvcjogIzZkNmU3MTtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBwYWRkaW5nOiA1cHggMTVweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm9yZGVyOiAxcHggc29saWQgIzJGNjg1NTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuICAgICNkOGQ4ZDgsXG4gICAgI2U5ZTllOSxcbiAgICAjZjVmNWY1LFxuICAgICNmY2ZjZmMsXG4gICAgI2ZmZmZmZixcbiAgICAjZmZmZmZmLFxuICAgICNmZmZmZmYsXG4gICAgI2ZmZmZmZixcbiAgICAjZmZmZmZmLFxuICAgICNmZmZmZmYsXG4gICAgI2ZmZmZmZixcbiAgICAjZmZmZmZmXG4gICk7XG59XG4uYnRuLXVwbG9hZC1ncm91cCB7XG4gIGZsb2F0OiByaWdodDtcbiAgcGFkZGluZzogMzBweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UploadComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-upload',
                templateUrl: './upload.component.html',
                styleUrls: ['./upload.component.scss'],
            }]
    }], function () { return [{ type: _upload_service__WEBPACK_IMPORTED_MODULE_1__["UploadService"] }, { type: _page_service__WEBPACK_IMPORTED_MODULE_2__["PageService"] }]; }, null); })();


/***/ }),

/***/ "L5T1":
/*!*******************************************************!*\
  !*** ./src/app/pages/upload/upload-routing.module.ts ***!
  \*******************************************************/
/*! exports provided: UploadRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadRoutingModule", function() { return UploadRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _components_upload_upload_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/upload/upload.component */ "Gwoo");





const routes = [{ path: 'Upload', component: _components_upload_upload_component__WEBPACK_IMPORTED_MODULE_2__["UploadComponent"] }];
class UploadRoutingModule {
}
UploadRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: UploadRoutingModule });
UploadRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function UploadRoutingModule_Factory(t) { return new (t || UploadRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](UploadRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UploadRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "si5r":
/*!************************************************!*\
  !*** ./src/app/pages/upload/upload.service.ts ***!
  \************************************************/
/*! exports provided: API, UploadService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API", function() { return API; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UploadService", function() { return UploadService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "tk/3");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../environments/environment */ "AytR");







const API = `${_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].API_BASE}`;
const httpOptions = {
    headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
        'Content-Type': 'application/json'
    }),
};
class UploadService {
    constructor(http) {
        this.http = http;
    }
    createCourse(data) {
        return this.http.post(`${API}/vredu/course`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(handleError('Create Course')));
    }
    category() {
        return this.http.get(`${API}/vredu/course/categories`)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(handleError('Category')));
    }
    estimate(category, time) {
        return this.http.get(`${API}/vredu/course/estimate/${category}/${time}`)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(handleError('estimate time')));
    }
}
UploadService.ɵfac = function UploadService_Factory(t) { return new (t || UploadService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
UploadService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: UploadService, factory: UploadService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](UploadService, [{
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


/***/ })

}]);
//# sourceMappingURL=pages-upload-upload-module.js.map