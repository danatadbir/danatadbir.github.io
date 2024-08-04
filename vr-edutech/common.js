(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "Iopx":
/*!*********************************************************!*\
  !*** ./src/app/pages/approve-course/approve.service.ts ***!
  \*********************************************************/
/*! exports provided: API, ApproveService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "API", function() { return API; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApproveService", function() { return ApproveService; });
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
class ApproveService {
    constructor(http) {
        this.http = http;
    }
    courseList(status, name, category) {
        let _url = `${API}/vredu/course`;
        if (status) {
            _url = `${_url}?status=${status}`;
        }
        if (name) {
            if (status) {
                _url = `${_url}&name=${name}`;
            }
            else {
                _url = `${_url}?name=${name}`;
            }
        }
        if (category) {
            if (status || name) {
                _url = `${_url}&category=${category}`;
            }
            else {
                _url = `${_url}?category=${category}`;
            }
        }
        return this.http.get(_url)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(handleError('list courses')));
    }
    updateCourse(data) {
        return this.http.put(`${API}/vredu/course`, data)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(handleError('Update course')));
    }
    categoryList() {
        return this.http.get(`${API}/vredu/course/categories`)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(handleError('category')));
    }
}
ApproveService.ɵfac = function ApproveService_Factory(t) { return new (t || ApproveService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"])); };
ApproveService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ApproveService, factory: ApproveService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ApproveService, [{
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
//# sourceMappingURL=common.js.map