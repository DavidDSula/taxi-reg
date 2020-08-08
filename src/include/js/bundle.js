/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./src/include/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/_dev_js_sass/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/_dev_js_sass/js/index.js":
/*!**************************************!*\
  !*** ./src/_dev_js_sass/js/index.js ***!
  \**************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../sass/main.scss */ "./src/_dev_js_sass/sass/main.scss");
/* harmony import */ var _sass_main_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sass_main_scss__WEBPACK_IMPORTED_MODULE_0__);

document.addEventListener('DOMContentLoaded', function () {
  var method = 'POST';
  var url = "./modules/driverInsert.php";
  var asyn = true; // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // ---------------Section Admin -----------------------------------
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  var loginBtn = document.querySelector('.formWrapper .mbtn');
  var taxicount = 'taxicount.php';
  var location = window.location.pathname;
  var count = 0;

  if (loginBtn && loginBtn.offsetParent) {
    var logged = document.querySelector('form.logged');
    var loginWrapper = logged.parentNode;
    loginWrapper.style.cssText = 'position:absolute; width:auto; height:auto; left:auto; right:0; ';
    hideShow(loginBtn, logged);

    if (location.includes(taxicount)) {
      var fold = document.querySelector('.add');
      fold.style.cssText = 'display: block;';
      var formDat = new FormData();
      formDat.append('getDrivers', true);
      var getDrivers = BarPromise(method, url, asyn, formDat);
      getDrivers.then(function (data) {
        data && data['data'] != 0 ? formElements(data, fold) : alert("Произошла ошибка на сервере! или данных нет!");
      }).then(function () {
        showHideAfterPromise();
      })["catch"](function (error) {
        alert('error !---> ' + error);
      });
    }
  }

  function formElements(data, wrapper) {
    data['data'].forEach(function (e) {
      var person = crtEl('div');
      person.className = 'person';
      elAdd(wrapper, person); // ---Folr

      var fold = crtEl('div');
      fold.className = 'folded';
      person.appendChild(fold);
      elAdd(person, fold);
      var label = crtEl('label');
      label.innerText = e['name'] + " (" + e['dateAdded'] + ")";
      elAdd(fold, label);
      var angle_w = crtEl('span');
      angle_w.setAttribute('title', 'разверенуть/свернуть');
      angle_w.className = 'rot';
      elAdd(fold, angle_w);
      var angle = crtEl('span');
      angle.innerHTML = '&#8735;';
      angle.style.cssText = 'transform: rotate(-45deg);';
      elAdd(angle_w, angle);
      var add = crtEl('span');
      add.setAttribute('title', 'удалить водителя со страницы');
      add.innerHTML = '-';
      elAdd(fold, add); // ---Unfold

      var unfold = crtEl('div');
      unfold.className = 'unfolded';
      elAdd(person, unfold);
      var form = crtEl('form');
      elAdd(unfold, form);
      var name_lbl = crtEl('label');
      name_lbl.innerHTML = 'Ф.И.О ';
      elAdd(form, name_lbl);
      var name_inp = crtEl('input');
      name_inp.value = e['name'];
      name_inp.setAttribute("name", "name");
      elAdd(form, name_inp);
      var phone_lbl = crtEl('label');
      phone_lbl.innerHTML = 'Номер телефона';
      elAdd(form, phone_lbl);
      var phone_inp = crtEl('input');
      phone_inp.value = e['phone'];
      phone_inp.setAttribute("name", "phone");
      elAdd(form, phone_inp);
      var firm_lbl = crtEl('label');
      firm_lbl.innerHTML = 'Марка Автомобиля';
      elAdd(form, firm_lbl);
      var firm_inp = crtEl('input');
      firm_inp.value = e['firm'];
      firm_inp.setAttribute("name", "marc");
      elAdd(form, firm_inp);
      var model_lbl = crtEl('label');
      model_lbl.innerHTML = 'Марка Автомобиля';
      elAdd(form, model_lbl);
      var model_inp = crtEl('input');
      model_inp.value = e['model'];
      model_inp.setAttribute("name", "model");
      elAdd(form, model_inp);
      var year_lbl = crtEl('label');
      year_lbl.innerHTML = 'Год Выпуска';
      elAdd(form, year_lbl);
      var year_inp = crtEl('input');
      year_inp.value = e['year'];
      year_inp.setAttribute("name", "year");
      elAdd(form, year_inp);
      var color_lbl = crtEl('label');
      color_lbl.innerHTML = 'Цвет Автомобиля';
      elAdd(form, color_lbl);
      var color_inp = crtEl('input');
      color_inp.value = e['color'];
      color_inp.setAttribute("name", "color");
      elAdd(form, color_inp);
      var gNumber_lbl = crtEl('label');
      gNumber_lbl.innerHTML = 'Гос. номер автомобиля';
      elAdd(form, gNumber_lbl);
      var gNumber_inp = crtEl('input');
      gNumber_inp.value = e['stateNumber'];
      gNumber_inp.setAttribute("name", "g_n");
      elAdd(form, gNumber_inp);
      var license_lbl = crtEl('label');
      license_lbl.innerHTML = 'Серия и номер ВУ (прав)';
      elAdd(form, license_lbl);
      var license_inp = crtEl('input');
      license_inp.value = e['licrnseNum'];
      license_inp.setAttribute("name", "licens");
      elAdd(form, license_inp);
      var licenseTerminate_lbl = crtEl('label');
      licenseTerminate_lbl.innerHTML = 'Дата выдачи и окончания ВУ (прав)';
      elAdd(form, licenseTerminate_lbl);
      var licenseTerminate_inp = crtEl('input');
      licenseTerminate_inp.value = e['licenseTermination'];
      licenseTerminate_inp.setAttribute("name", "data_l");
      elAdd(form, licenseTerminate_inp);
      var city_lbl = crtEl('label');
      city_lbl.innerHTML = 'Город ';
      elAdd(form, city_lbl);
      var city_inp = crtEl('input');
      city_inp.value = e['city'];
      city_inp.setAttribute("name", "sity");
      elAdd(form, city_inp);
    });

    if (data['count'] > 20 && count == 0) {
      var el = crtEl('span');
      el.className = 'mbtn';
      el.innerText = 'Показать ещё';
      el.style.cssText = 'margin-top: 10px;';
      wrapper.insertAdjacentElement('afterend', el);
      el.addEventListener('click', function (el) {
        count += 20;
        var formDat = new FormData();
        formDat.append('getDrivers', count);
        var getDrivers_2 = BarPromise(method, url, asyn, formDat);
        getDrivers_2.then(function (data) {
          data && data['data'] ? formElements(data, fold) : alert("Произошла ошибка на сервере! или данных нет");
        }).then(function () {
          showHideAfterPromise();
        })["catch"](function (error) {
          alert('error !---> ' + error);
        });
      });
    } else if (data['data'] && data['data'].length < 20 && data['count'] > 20) {
      var mBtn = document.querySelector('.body_page > .mbtn');

      if (mBtn) {
        mBtn.style.cssText = 'display: none;';
      }

      ;
    }
  }

  ; // ------show form / Delete application-----

  function showHideAfterPromise() {
    var wrapper = document.querySelector(".add");
    var form = document.querySelectorAll('.unfolded > form');

    if (form[0]) {
      form.forEach(function (e) {
        var arow = e.parentNode.parentNode.childNodes[0].childNodes[1].childNodes[0];
        var del = e.parentNode.parentNode.childNodes[0].childNodes[2];
        wrapper.addEventListener('click', function (ev) {
          if (e.offsetParent && ev.target == arow) arow.style.cssText = "transform: rotate(-45deg);";else if (!e.offsetParent && ev.target == arow || e.offsetParent && e.outerHTML.indexOf(ev.target.outerHTML) != -1) arow.style.cssText = "transform: rotate(-225deg);";else arow.style.cssText = "transform: rotate(-45deg);";

          if (ev.target == del) {
            var person = e.parentNode.parentNode.childNodes[0].childNodes[0].innerText;
            var input = e.parentNode.parentNode.childNodes[1].childNodes[0].querySelectorAll('input');

            if (input) {
              var formd = new FormData();
              formd.append('rem', true);
              input.forEach(function (e) {
                var n = e.name.trim();
                var v = e.value.trim();
                formd.append(n, v);
              });
            }

            var c = 'rgb(253, 251, 251)'; //White

            var els = message("Удалить Водителя ?<br><br><br>" + person, c);
            var obj = els.close;
            hideShow_2(ev.target, els.el, ev, obj);
            els.subm.addEventListener('click', function (ev) {
              var promiseDel = BarPromise(method, url, asyn, formd);
              promiseDel.then(function (data) {
                data =  true ? window.location.reload() : undefined;
              })["catch"](function (error) {
                alert('error !---> ' + error);
              });
            });
          }
        });
      });
    }
  } // -----Add new Data from Server


  document.addEventListener('click', function (ev) {
    //---Arrow Show-Hide Form-----
    var arrow = document.querySelectorAll('.folded > .rot span ');
    arrow.forEach(function (arowBtn) {
      if (ev.target == arowBtn) {
        var element = arowBtn.parentNode.parentNode.parentNode.childNodes[1].childNodes[0];
        hideShow_2(arowBtn, element, ev);
      }

      ;
    });
  }); // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // --------------Section Index Form and Form Buttons--------------
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  //----send form-----------

  var button = document.querySelector('.form_body > .sub');
  var checkBox = document.querySelector('.form_body .checkWrapper input');
  var form_Al = document.querySelectorAll('.form_body > input');
  var error = document.createElement('p');
  var checkError = document.createElement('p');

  if (form_Al[0]) {
    button.insertAdjacentElement('beforebegin', error);
    button.insertAdjacentElement('afterend', checkError);
    var formData = new FormData();
    formData.append('driver', true);
    button.addEventListener('click', function () {
      var temp = [];
      form_Al.forEach(function (e) {
        var k = e.id.trim();
        var val = e.value.trim();
        formData.append(k, val);
        temp[k] = val;
      });
      var check = checkInput(temp);

      if (check != true) {
        errorSubmit(error, false, 'Необходимо заполнить все поля!');
      } else if (!checkBox.checked) {
        errorSubmit(error, true);
        errorSubmit(checkError, false, 'Поставте галочку!');
      } else {
        var promise = BarPromise(method, url, asyn, formData);
        promise.then(function (data) {
          data > 0 ? regSucsess() : alert("Водитель с такими данными уже есть в системе!");
        })["catch"](function (error) {
          alert('error !---> ' + error);
        });
        errorSubmit(error, true);
        errorSubmit(checkError, true);
      }
    });
  }

  function regSucsess() {
    button.parentNode.parentNode.parentNode.style.cssText = 'display: none';
    var m = '<h3>Ваша заявка на подключение принята!</h3> <br> Мы                свяжемся с вами в ближайшее время! <br> Приглашайте к               нам своих друзей';
    var c = 'rgb(253, 251, 251)'; //White

    var els = message(m, c);
    var obj = els.subm.innerHTML + els.close.innerHTML;
    hideShow(els.subm, els.el, obj);
    var form_Al = document.querySelectorAll('.form_body > input');
    form_Al.forEach(function (e) {
      e.value = '';
    }); // make  form empty
  }

  function checkInput(arr) {
    for (var kay in arr) {
      if (arr[kay] === '') {
        return false;
        break;
      }

      ;
    }

    ;
    return true;
  }

  ;

  function errorSubmit(el) {
    var sucsess = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'error';

    if (!sucsess) {
      el.innerText = text;
      el.style.color = 'red';
    } else if (el.innerText != '' && sucsess) {
      el.innerText = '';
    }
  }

  ; //--------Sow Hide---------

  var element = document.querySelector('div.f_list');
  var closeElement = document.querySelector('.f_list span.close a');
  var btn = document.querySelector('.form > span.sub');
  if (element) hideShow(btn, element, closeElement, true); // in Universal functions
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  /*--------------Section Profile--------------*/
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  var userMbtn = document.querySelectorAll('.deleteAccount > div > .user ');
  userMbtn.forEach(function (el) {
    var formWrapper = el.parentNode.childNodes[3];
    hideShow(el, formWrapper);
  });
  var newUser = document.querySelector('.deleteAccount > .newUser ');
  var addBtn = document.querySelector('.deleteAccount > .addAc ');
  var closenewUser = document.querySelector('.deleteAccount > .newUser > .close >* ');
  hideShow(addBtn, newUser, closenewUser); // var loc = window.location.href.split('?')[1];
  // console.log( decodeURIComponent( loc ) );
  // --Universal functions---

  function hideShow(btn, element) {
    var closeElement = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var inhtml = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var htmlv;
    var close_html;
    document.addEventListener('click', display);

    function display(e) {
      !inhtml ? htmlv = element.outerHTML : htmlv = element.innerHTML;
      typeof closeElement === 'string' ? close_html = closeElement : closeElement;

      if (!element.clientHeight && e.target === btn) {
        element.style.cssText = 'display : block ; ';
      } else if (e.target === closeElement) {
        element.style = 'display : none';
      } else if (close_html && close_html.indexOf(e.target.innerHTML) != -1) {
        element.style = 'display : none';
      } else if (htmlv.indexOf(e.target.outerHTML) != -1 && closeElement != 'dont') {
        element.style = 'display : block';
      } else {
        element.style = 'display : none';
      }
    }
  }

  ;

  function hideShow_2(btn, element, e) {
    var close = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var inhtml = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var btn = btn;
    var element = element;
    var closeElement = close;
    var htmlv; //    console.log( btn.outerHTML.indexOf(e.target.outerHTML) );

    if (!element.offsetParent && e.target === btn) {
      element.style.cssText = 'display : block ; ';
    } else {
      element.style = 'display : none';
    }

    document.addEventListener('click', ineerEvent);

    function ineerEvent(ev) {
      var check = ev.target === closeElement;
      !inhtml ? htmlv = element.outerHTML : htmlv = element.innerHTML;

      if (htmlv.indexOf(ev.target.innerHTML) == -1 && ev.target != btn || check) {
        element.style = 'display : none';
        document.removeEventListener('click', ineerEvent);
      }
    }

    ;
  }

  ;

  function BarPromise(meth, ul, asyn) {
    var searchValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open(meth, ul, asyn);

      xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          searchValue != '' ? resolve(JSON.parse(xhr.responseText)) : resolve('');
        } else {
          reject(xhr.statusText);
        }
      };

      xhr.onerror = function () {
        reject(xhr.statusText);
      };

      xhr.send(searchValue);
    });
  }

  function message(massage, color) {
    removeOld('.message_wrapper');

    if (massage) {
      var wrapper = document.createElement('div');
      wrapper.className = 'message_wrapper ' + guid();
      var wrapperCl = document.createElement('span');
      wrapperCl.className = 'button_close';
      var close = document.createElement('span');
      close.innerText = '❌';
      var text = document.createElement('span');
      text.className = 'text_wrapper';
      text.innerHTML = massage;
      var submit = document.createElement('span');
      submit.innerText = 'Подтвердить';
      submit.className = 'button_submite';
      wrapper.style.display = "block";
      wrapper.appendChild(wrapperCl);
      wrapperCl.appendChild(close);
      wrapper.appendChild(text);
      wrapper.appendChild(submit);
      document.body.appendChild(wrapper);
      return {
        'el': wrapper,
        'close': close,
        'subm': submit
      };
    }

    function removeOld(el) {
      var element = document.querySelector(el);
      if (element) element.remove();
    }

    ;
  }

  function crtEl(name) {
    var name = document.createElement(name);
    return name;
  }

  function elAdd(parent, child) {
    child.className += " " + guid();
    parent.appendChild(child); //   parent.insertAdjacentElement('afterend',child);
  }

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
});

/***/ }),

/***/ "./src/_dev_js_sass/sass/main.scss":
/*!*****************************************!*\
  !*** ./src/_dev_js_sass/sass/main.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL19kZXZfanNfc2Fzcy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvX2Rldl9qc19zYXNzL3Nhc3MvbWFpbi5zY3NzP2U5NWUiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwibWV0aG9kIiwidXJsIiwiYXN5biIsImxvZ2luQnRuIiwicXVlcnlTZWxlY3RvciIsInRheGljb3VudCIsImxvY2F0aW9uIiwid2luZG93IiwicGF0aG5hbWUiLCJjb3VudCIsIm9mZnNldFBhcmVudCIsImxvZ2dlZCIsImxvZ2luV3JhcHBlciIsInBhcmVudE5vZGUiLCJzdHlsZSIsImNzc1RleHQiLCJoaWRlU2hvdyIsImluY2x1ZGVzIiwiZm9sZCIsImZvcm1EYXQiLCJGb3JtRGF0YSIsImFwcGVuZCIsImdldERyaXZlcnMiLCJCYXJQcm9taXNlIiwidGhlbiIsImRhdGEiLCJmb3JtRWxlbWVudHMiLCJhbGVydCIsInNob3dIaWRlQWZ0ZXJQcm9taXNlIiwiZXJyb3IiLCJ3cmFwcGVyIiwiZm9yRWFjaCIsImUiLCJwZXJzb24iLCJjcnRFbCIsImNsYXNzTmFtZSIsImVsQWRkIiwiYXBwZW5kQ2hpbGQiLCJsYWJlbCIsImlubmVyVGV4dCIsImFuZ2xlX3ciLCJzZXRBdHRyaWJ1dGUiLCJhbmdsZSIsImlubmVySFRNTCIsImFkZCIsInVuZm9sZCIsImZvcm0iLCJuYW1lX2xibCIsIm5hbWVfaW5wIiwidmFsdWUiLCJwaG9uZV9sYmwiLCJwaG9uZV9pbnAiLCJmaXJtX2xibCIsImZpcm1faW5wIiwibW9kZWxfbGJsIiwibW9kZWxfaW5wIiwieWVhcl9sYmwiLCJ5ZWFyX2lucCIsImNvbG9yX2xibCIsImNvbG9yX2lucCIsImdOdW1iZXJfbGJsIiwiZ051bWJlcl9pbnAiLCJsaWNlbnNlX2xibCIsImxpY2Vuc2VfaW5wIiwibGljZW5zZVRlcm1pbmF0ZV9sYmwiLCJsaWNlbnNlVGVybWluYXRlX2lucCIsImNpdHlfbGJsIiwiY2l0eV9pbnAiLCJlbCIsImluc2VydEFkamFjZW50RWxlbWVudCIsImdldERyaXZlcnNfMiIsImxlbmd0aCIsIm1CdG4iLCJxdWVyeVNlbGVjdG9yQWxsIiwiYXJvdyIsImNoaWxkTm9kZXMiLCJkZWwiLCJldiIsInRhcmdldCIsIm91dGVySFRNTCIsImluZGV4T2YiLCJpbnB1dCIsImZvcm1kIiwibiIsIm5hbWUiLCJ0cmltIiwidiIsImMiLCJlbHMiLCJtZXNzYWdlIiwib2JqIiwiY2xvc2UiLCJoaWRlU2hvd18yIiwic3VibSIsInByb21pc2VEZWwiLCJyZWxvYWQiLCJhcnJvdyIsImFyb3dCdG4iLCJlbGVtZW50IiwiYnV0dG9uIiwiY2hlY2tCb3giLCJmb3JtX0FsIiwiY3JlYXRlRWxlbWVudCIsImNoZWNrRXJyb3IiLCJmb3JtRGF0YSIsInRlbXAiLCJrIiwiaWQiLCJ2YWwiLCJjaGVjayIsImNoZWNrSW5wdXQiLCJlcnJvclN1Ym1pdCIsImNoZWNrZWQiLCJwcm9taXNlIiwicmVnU3Vjc2VzcyIsIm0iLCJhcnIiLCJrYXkiLCJzdWNzZXNzIiwidGV4dCIsImNvbG9yIiwiY2xvc2VFbGVtZW50IiwiYnRuIiwidXNlck1idG4iLCJmb3JtV3JhcHBlciIsIm5ld1VzZXIiLCJhZGRCdG4iLCJjbG9zZW5ld1VzZXIiLCJpbmh0bWwiLCJodG1sdiIsImNsb3NlX2h0bWwiLCJkaXNwbGF5IiwiY2xpZW50SGVpZ2h0IiwiaW5lZXJFdmVudCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJtZXRoIiwidWwiLCJzZWFyY2hWYWx1ZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsIkpTT04iLCJwYXJzZSIsInJlc3BvbnNlVGV4dCIsInN0YXR1c1RleHQiLCJvbmVycm9yIiwic2VuZCIsIm1hc3NhZ2UiLCJyZW1vdmVPbGQiLCJndWlkIiwid3JhcHBlckNsIiwic3VibWl0IiwiYm9keSIsInJlbW92ZSIsInBhcmVudCIsImNoaWxkIiwiczQiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ0b1N0cmluZyIsInN1YnN0cmluZyJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUVBQSxRQUFRLENBQUNDLGdCQUFULENBQTBCLGtCQUExQixFQUE2QyxZQUMzQztBQUNFLE1BQUlDLE1BQU0sR0FBSSxNQUFkO0FBQ0EsTUFBSUMsR0FBRyxHQUFPLDRCQUFkO0FBQ0EsTUFBSUMsSUFBSSxHQUFNLElBQWQsQ0FIRixDQUlFO0FBQ0E7QUFDQTs7QUFFRSxNQUFJQyxRQUFRLEdBQUlMLFFBQVEsQ0FBQ00sYUFBVCxDQUF3QixvQkFBeEIsQ0FBaEI7QUFDQSxNQUFJQyxTQUFTLEdBQUcsZUFBaEI7QUFDQSxNQUFJQyxRQUFRLEdBQUlDLE1BQU0sQ0FBQ0Qs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O0FBQ0EsV0FBT0EsSUFBUDtBQUNEOztBQUNILFdBQVNoRCxLQUFULENBQWdCNEgsTUFBaEIsRUFBd0JDLEtBQXhCLEVBQ0U7QUFDRUEsU0FBSyxDQUFDOUgsU0FBTixJQUFxQixNQUFNd0gsSUFBSSxFQUEvQjtBQUNBSyxVQUFNLENBQUMzSCxXQUFQLENBQW1CNEgsS0FBbkIsRUFGRixDQUdBO0FBQ0M7O0FBRUgsV0FBU04sSUFBVCxHQUNFO0FBQ0UsYUFBU08sRUFBVCxHQUNFO0FBQ0UsYUFBT0MsSUFBSSxDQUFDQyxLQUFMLENBQVcsQ0FBQyxJQUFJRCxJQUFJLENBQUNFLE1BQUwsRUFBTCxJQUFzQixPQUFqQyxFQUNLQyxRQURMLENBQ2MsRUFEZCxFQUVLQyxTQUZMLENBRWUsQ0FGZixDQUFQO0FBR0Q7O0FBQ0gsV0FBT0wsRUFBRSxLQUFLQSxFQUFFLEVBQVQsR0FBYyxHQUFkLEdBQW9CQSxFQUFFLEVBQXRCLEdBQTJCLEdBQTNCLEdBQWlDQSxFQUFFLEVBQW5DLEdBQXdDLEdBQXhDLEdBQThDQSxFQUFFLEVBQWhELEdBQXFELEdBQXJELEdBQTJEQSxFQUFFLEVBQTdELEdBQWtFQSxFQUFFLEVBQXBFLEdBQXlFQSxFQUFFLEVBQWxGO0FBQ0Q7QUFHTixDQTVsQkgsRTs7Ozs7Ozs7Ozs7QUNGQSx1QyIsImZpbGUiOiJqcy9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIi4vc3JjL2luY2x1ZGUvXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL19kZXZfanNfc2Fzcy9qcy9pbmRleC5qc1wiKTtcbiIsImltcG9ydCAnLi4vc2Fzcy9tYWluLnNjc3MnO1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsZnVuY3Rpb24oKVxyXG4gIHtcclxuICAgIHZhciBtZXRob2QgID0gJ1BPU1QnO1xyXG4gICAgdmFyIHVybCAgICAgPSBcIi4vbW9kdWxlcy9kcml2ZXJJbnNlcnQucGhwXCI7XHJcbiAgICB2YXIgYXN5biAgICA9IHRydWU7XHJcbiAgICAvLyB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XHJcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS1TZWN0aW9uIEFkbWluIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XHJcblxyXG4gICAgICB2YXIgbG9naW5CdG4gID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5mb3JtV3JhcHBlciAubWJ0bicgKTtcclxuICAgICAgdmFyIHRheGljb3VudCA9ICd0YXhpY291bnQucGhwJztcclxuICAgICAgdmFyIGxvY2F0aW9uICA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcclxuXHJcblxyXG4gICAgICB2YXIgY291bnQ9IDA7XHJcblxyXG4gICAgICBpZiAoIGxvZ2luQnRuICYmIGxvZ2luQnRuLm9mZnNldFBhcmVudClcclxuICAgICAgICB7XHJcbiAgICAgICAgICB2YXIgbG9nZ2VkICAgICAgICAgICAgICAgICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnZm9ybS5sb2dnZWQnICk7XHJcbiAgICAgICAgICB2YXIgbG9naW5XcmFwcGVyICAgICAgICAgICAgICAgPSBsb2dnZWQucGFyZW50Tm9kZTtcclxuICAgICAgICAgICAgICBsb2dpbldyYXBwZXIuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjphYnNvbHV0ZTsgd2lkdGg6YXV0bzsgaGVpZ2h0OmF1dG87IGxlZnQ6YXV0bzsgcmlnaHQ6MDsgJyA7XHJcbiAgICAgICAgICBoaWRlU2hvdyggbG9naW5CdG4sIGxvZ2dlZCApO1xyXG5cclxuICAgICAgICAgIGlmKCBsb2NhdGlvbi5pbmNsdWRlcyh0YXhpY291bnQpIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZvbGQgICAgICAgICAgICAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQnKTtcclxuICAgICAgICAgICAgICAgICAgICBmb2xkLnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogYmxvY2s7JyA7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGZvcm1EYXQgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtRGF0LmFwcGVuZCggJ2dldERyaXZlcnMnICwgdHJ1ZSApO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBnZXREcml2ZXJzID0gQmFyUHJvbWlzZShtZXRob2QsIHVybCwgYXN5biwgZm9ybURhdCk7XHJcblxyXG4gICAgICAgICAgICAgICAgZ2V0RHJpdmVycy50aGVuIChmdW5jdGlvbihkYXRhKXsgZGF0YSAmJiBkYXRhWydkYXRhJ10gIT0gMCA/IGZvcm1FbGVtZW50cyhkYXRhICwgZm9sZCkgOiBhbGVydChcItCf0YDQvtC40LfQvtGI0LvQsCDQvtGI0LjQsdC60LAg0L3QsCDRgdC10YDQstC10YDQtSEg0LjQu9C4INC00LDQvdC90YvRhSDQvdC10YIhXCIpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuIChmdW5jdGlvbigpe3Nob3dIaWRlQWZ0ZXJQcm9taXNlKCk7IH0gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcil7YWxlcnQoJ2Vycm9yICEtLS0+ICcrZXJyb3IpO30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gZm9ybUVsZW1lbnRzKCBkYXRhLCB3cmFwcGVyIClcclxuICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICBkYXRhWydkYXRhJ10uZm9yRWFjaCggZnVuY3Rpb24oZSlcclxuICAgICAgICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBlcnNvbiAgICAgICAgICAgPSBjcnRFbCAoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJzb24uY2xhc3NOYW1lID0gJ3BlcnNvbic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsQWRkKCB3cmFwcGVyLCBwZXJzb24gKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIC0tLUZvbHJcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZm9sZCAgICAgICAgICAgID0gY3J0RWwgKCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm9sZC5jbGFzc05hbWUgID0gJ2ZvbGRlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNvbi5hcHBlbmRDaGlsZChmb2xkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxBZGQoIHBlcnNvbiwgZm9sZCApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGFiZWwgICAgICAgICAgID0gY3J0RWwgKCdsYWJlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbC5pbm5lclRleHQgPSBlWyduYW1lJ10rXCIgKFwiKyBlWydkYXRlQWRkZWQnXSArXCIpXCI7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsQWRkKCBmb2xkLCBsYWJlbCApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYW5nbGVfdyAgICAgICAgICAgPSBjcnRFbCAoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGVfdy5zZXRBdHRyaWJ1dGUgKCd0aXRsZScsICfRgNCw0LfQstC10YDQtdC90YPRgtGML9GB0LLQtdGA0L3Rg9GC0YwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGVfdy5jbGFzc05hbWUgPSAncm90JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxBZGQoIGZvbGQsIGFuZ2xlX3cgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuZ2xlICAgICAgICAgICAgICAgPSBjcnRFbCAoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGUuaW5uZXJIVE1MICAgICA9ICcmIzg3MzU7JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5nbGUuc3R5bGUuY3NzVGV4dCA9ICd0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpOyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsQWRkKCBhbmdsZV93LCBhbmdsZSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgYWRkICAgICAgICAgICAgID0gY3J0RWwgKCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZC5zZXRBdHRyaWJ1dGUgKCd0aXRsZScsICfRg9C00LDQu9C40YLRjCDQstC+0LTQuNGC0LXQu9GPINGB0L4g0YHRgtGA0LDQvdC40YbRiycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGQuaW5uZXJIVE1MICAgPSAnLSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsQWRkKCBmb2xkLCBhZGQgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gLS0tVW5mb2xkXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHVuZm9sZCAgICAgICAgICAgICAgPSBjcnRFbCAoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmZvbGQuY2xhc3NOYW1lICAgID0gJ3VuZm9sZGVkJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxBZGQoIHBlcnNvbiwgdW5mb2xkICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBmb3JtICAgICAgICAgICAgICAgID0gY3J0RWwgKCdmb3JtJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsQWRkKCB1bmZvbGQsIGZvcm0gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWVfbGJsICAgICAgICAgICAgPSBjcnRFbCAoJ2xhYmVsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVfbGJsLmlubmVySFRNTCAgPSAn0KQu0Jgu0J4gJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxBZGQoIGZvcm0sIG5hbWVfbGJsICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lX2lucCAgICAgICAgICAgID0gY3J0RWwgKCdpbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lX2lucC52YWx1ZSAgICAgID0gZVsnbmFtZSddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lX2lucC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwibmFtZVwiKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbEFkZCggZm9ybSwgbmFtZV9pbnAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBob25lX2xibCAgICAgICAgICAgPSBjcnRFbCAoJ2xhYmVsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lX2xibC5pbm5lckhUTUwgPSAn0J3QvtC80LXRgCDRgtC10LvQtdGE0L7QvdCwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxBZGQoIGZvcm0sIHBob25lX2xibCApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgcGhvbmVfaW5wICAgICAgICAgICA9IGNydEVsICgnaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGhvbmVfaW5wLnZhbHVlICAgICA9IGVbJ3Bob25lJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBob25lX2lucC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwicGhvbmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsQWRkKCBmb3JtLCBwaG9uZV9pbnAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpcm1fbGJsICAgICAgICAgICA9IGNydEVsKCdsYWJlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaXJtX2xibC5pbm5lckhUTUwgPSAn0JzQsNGA0LrQsCDQkNCy0YLQvtC80L7QsdC40LvRjyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsQWRkKCBmb3JtLCBmaXJtX2xibCApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZmlybV9pbnAgICAgICAgICAgID0gY3J0RWwoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcm1faW5wLnZhbHVlICAgICA9IGVbJ2Zpcm0nXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlybV9pbnAuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcIm1hcmNcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsQWRkKCBmb3JtLCBmaXJtX2lucCApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgbW9kZWxfbGJsICAgICAgICAgICA9IGNydEVsKCdsYWJlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbF9sYmwuaW5uZXJIVE1MID0gJ9Cc0LDRgNC60LAg0JDQstGC0L7QvNC+0LHQuNC70Y8nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbEFkZCggZm9ybSwgbW9kZWxfbGJsICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBtb2RlbF9pbnAgICAgICAgICAgID0gY3J0RWwgKCdpbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbF9pbnAudmFsdWUgICAgID0gZVsnbW9kZWwnXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZWxfaW5wLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJtb2RlbFwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxBZGQoIGZvcm0sIG1vZGVsX2lucCApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgeWVhcl9sYmwgICAgICAgICAgID0gY3J0RWwgKCdsYWJlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB5ZWFyX2xibC5pbm5lckhUTUwgPSAn0JPQvtC0INCS0YvQv9GD0YHQutCwJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxBZGQoIGZvcm0sIHllYXJfbGJsICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciB5ZWFyX2lucCAgICAgICAgICAgPSBjcnRFbCAoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHllYXJfaW5wLnZhbHVlICAgICA9IGVbJ3llYXInXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeWVhcl9pbnAuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInllYXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsQWRkKCBmb3JtLCB5ZWFyX2lucCApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29sb3JfbGJsICAgICAgICAgICA9IGNydEVsICgnbGFiZWwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JfbGJsLmlubmVySFRNTCA9ICfQptCy0LXRgiDQkNCy0YLQvtC80L7QsdC40LvRjyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsQWRkKCBmb3JtLCBjb2xvcl9sYmwgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yX2lucCAgICAgICAgICAgPSAgY3J0RWwgKCdpbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcl9pbnAudmFsdWUgICAgID0gZVsnY29sb3InXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JfaW5wLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJjb2xvclwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxBZGQoIGZvcm0sIGNvbG9yX2lucCApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ051bWJlcl9sYmwgICAgICAgICAgPSBjcnRFbCAoJ2xhYmVsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdOdW1iZXJfbGJsLmlubmVySFRNTD0gJ9CT0L7RgS4g0L3QvtC80LXRgCDQsNCy0YLQvtC80L7QsdC40LvRjyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsQWRkKCBmb3JtLCBnTnVtYmVyX2xibCApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgZ051bWJlcl9pbnAgICAgICAgICAgID0gY3J0RWwgKCdpbnB1dCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnTnVtYmVyX2lucC52YWx1ZSAgICAgPSBlWydzdGF0ZU51bWJlciddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnTnVtYmVyX2lucC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsIFwiZ19uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbEFkZCggZm9ybSwgZ051bWJlcl9pbnAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpY2Vuc2VfbGJsICAgICAgICAgICA9ICBjcnRFbCAoJ2xhYmVsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpY2Vuc2VfbGJsLmlubmVySFRNTCA9ICfQodC10YDQuNGPINC4INC90L7QvNC10YAg0JLQoyAo0L/RgNCw0LIpJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxBZGQoIGZvcm0sIGxpY2Vuc2VfbGJsICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaWNlbnNlX2lucCAgICAgICAgPSBjcnRFbCAoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpY2Vuc2VfaW5wLnZhbHVlICA9IGVbJ2xpY3Juc2VOdW0nXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGljZW5zZV9pbnAuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcImxpY2Vuc1wiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxBZGQoIGZvcm0sIGxpY2Vuc2VfaW5wICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsaWNlbnNlVGVybWluYXRlX2xibCAgICAgICAgICAgPSAgY3J0RWwgKCdsYWJlbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWNlbnNlVGVybWluYXRlX2xibC5pbm5lckhUTUwgPSAn0JTQsNGC0LAg0LLRi9C00LDRh9C4INC4INC+0LrQvtC90YfQsNC90LjRjyDQktCjICjQv9GA0LDQsiknO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbEFkZCggZm9ybSwgbGljZW5zZVRlcm1pbmF0ZV9sYmwgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpY2Vuc2VUZXJtaW5hdGVfaW5wICAgICAgICA9IGNydEVsICgnaW5wdXQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGljZW5zZVRlcm1pbmF0ZV9pbnAudmFsdWUgID0gZVsnbGljZW5zZVRlcm1pbmF0aW9uJ107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpY2Vuc2VUZXJtaW5hdGVfaW5wLnNldEF0dHJpYnV0ZShcIm5hbWVcIiwgXCJkYXRhX2xcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsQWRkKCBmb3JtLCBsaWNlbnNlVGVybWluYXRlX2lucCApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB2YXIgY2l0eV9sYmwgICAgICAgICAgID0gIGNydEVsICgnbGFiZWwnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eV9sYmwuaW5uZXJIVE1MID0gJ9CT0L7RgNC+0LQgJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxBZGQoIGZvcm0sIGNpdHlfbGJsICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjaXR5X2lucCAgICAgICAgPSBjcnRFbCAoJ2lucHV0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNpdHlfaW5wLnZhbHVlICA9IGVbJ2NpdHknXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2l0eV9pbnAuc2V0QXR0cmlidXRlKFwibmFtZVwiLCBcInNpdHlcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsQWRkKCBmb3JtLCBjaXR5X2lucCApO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuXHJcblxyXG4gICAgICAgICAgICBpZiAoIGRhdGFbJ2NvdW50J10gPiAyMCAmJiBjb3VudCA9PSAwIClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWwgICAgICAgICAgICAgICA9IGNydEVsICgnc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc05hbWUgICAgID0gJ21idG4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5pbm5lclRleHQgICAgID0gJ9Cf0L7QutCw0LfQsNGC0Ywg0LXRidGRJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuc3R5bGUuY3NzVGV4dCA9ICdtYXJnaW4tdG9wOiAxMHB4OydcclxuICAgICAgICAgICAgICAgICAgICB3cmFwcGVyLmluc2VydEFkamFjZW50RWxlbWVudCggJ2FmdGVyZW5kJywgZWwgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lciAoICdjbGljaycsIGZ1bmN0aW9uICggZWwgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudCArPSAyMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybURhdCA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9ybURhdC5hcHBlbmQoICdnZXREcml2ZXJzJyAsIGNvdW50ICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGdldERyaXZlcnNfMiA9IEJhclByb21pc2UobWV0aG9kLCB1cmwsIGFzeW4sIGZvcm1EYXQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldERyaXZlcnNfMi50aGVuIChmdW5jdGlvbihkYXRhKXsgZGF0YSAmJiBkYXRhWydkYXRhJ10gPyBmb3JtRWxlbWVudHMoZGF0YSAsIGZvbGQpIDogYWxlcnQoXCLQn9GA0L7QuNC30L7RiNC70LAg0L7RiNC40LHQutCwINC90LAg0YHQtdGA0LLQtdGA0LUhINC40LvQuCDQtNCw0L3QvdGL0YUg0L3QtdGCXCIpOyB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4gKGZ1bmN0aW9uKCl7c2hvd0hpZGVBZnRlclByb21pc2UoKTsgfSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe2FsZXJ0KCdlcnJvciAhLS0tPiAnK2Vycm9yKTt9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKCBkYXRhWydkYXRhJ10gJiYgZGF0YVsnZGF0YSddLmxlbmd0aCA8IDIwICYmIGRhdGFbJ2NvdW50J10gPiAyMCApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLmJvZHlfcGFnZSA+IC5tYnRuJyApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIG1CdG4gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtQnRuLnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogbm9uZTsnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgIC8vIC0tLS0tLXNob3cgZm9ybSAvIERlbGV0ZSBhcHBsaWNhdGlvbi0tLS0tXHJcbiAgICAgICAgZnVuY3Rpb24gc2hvd0hpZGVBZnRlclByb21pc2UoKVxyXG4gICAgICAgICAgICB7XHJcblxyXG4gICAgICAgICAgICB2YXIgd3JhcHBlciA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZFwiKTtcclxuICAgICAgICAgICAgdmFyIGZvcm0gICAgPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnVuZm9sZGVkID4gZm9ybScpO1xyXG5cclxuICAgICAgICAgICAgaWYoIGZvcm1bMF0gKVxyXG4gICAgICAgICAgICAgICAge1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5mb3JFYWNoKCBmdW5jdGlvbihlKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgYXJvdyA9IGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNoaWxkTm9kZXNbMF0uY2hpbGROb2Rlc1sxXS5jaGlsZE5vZGVzWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRlbCAgPSBlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMl07XHJcblxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiggZXYgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoZS5vZmZzZXRQYXJlbnQgJiYgZXYudGFyZ2V0ID09IGFyb3cgICApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcm93LnN0eWxlLmNzc1RleHQgPSBcInRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICghZS5vZmZzZXRQYXJlbnQgJiYgZXYudGFyZ2V0ID09IGFyb3cgfHwgZS5vZmZzZXRQYXJlbnQgJiYgZS5vdXRlckhUTUwuaW5kZXhPZihldi50YXJnZXQub3V0ZXJIVE1MKSAhPSAtMSApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcm93LnN0eWxlLmNzc1RleHQgPSBcInRyYW5zZm9ybTogcm90YXRlKC0yMjVkZWcpO1wiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJvdy5zdHlsZS5jc3NUZXh0ID0gXCJ0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1wiO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIGV2LnRhcmdldCA9PSBkZWwgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwZXJzb24gPSBlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZE5vZGVzWzBdLmNoaWxkTm9kZXNbMF0uaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCAgPSBlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMF0ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlucHV0KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZm9ybWQgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1kLmFwcGVuZCggJ3JlbScsIHRydWUgKVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LmZvckVhY2goZnVuY3Rpb24oZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuID0gZS5uYW1lLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHYgPSBlLnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1kLmFwcGVuZCggbiwgdiApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjICAgPSAncmdiKDI1MywgMjUxLCAyNTEpJzsvL1doaXRlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVscyA9IG1lc3NhZ2UoIFwi0KPQtNCw0LvQuNGC0Ywg0JLQvtC00LjRgtC10LvRjyA/PGJyPjxicj48YnI+XCIgKyBwZXJzb24sICBjICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGVscy5jbG9zZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGlkZVNob3dfMiggZXYudGFyZ2V0LCAgZWxzLmVsLCBldiwgb2JqICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVscy5zdWJtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oIGV2IClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb21pc2VEZWwgPSAgQmFyUHJvbWlzZSggbWV0aG9kLCB1cmwsIGFzeW4sIGZvcm1kICk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZURlbC50aGVuICggZnVuY3Rpb24oIGRhdGEgKXsgZGF0YSA9ISAwID8gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpIDogYWxlcnQoIFwi0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsCDQvdCwINGB0LXRgNCy0LXRgNC1IVwiICk7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCBmdW5jdGlvbiggZXJyb3IgKXsgYWxlcnQoICdlcnJvciAhLS0tPiAnK2Vycm9yICk7fSApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgIC8vIC0tLS0tQWRkIG5ldyBEYXRhIGZyb20gU2VydmVyXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAoICdjbGljaycsIGZ1bmN0aW9uICggZXYgKVxyXG4gICAgICAgICAge1xyXG5cclxuICAgICAgICAgICAgLy8tLS1BcnJvdyBTaG93LUhpZGUgRm9ybS0tLS0tXHJcbiAgICAgICAgICAgIHZhciBhcnJvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcuZm9sZGVkID4gLnJvdCBzcGFuICcgKTtcclxuXHJcbiAgICAgICAgICAgIGFycm93LmZvckVhY2goIGZ1bmN0aW9uICggYXJvd0J0biApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBldi50YXJnZXQgPT0gYXJvd0J0biApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gYXJvd0J0bi5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5jaGlsZE5vZGVzWzFdLmNoaWxkTm9kZXNbMF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoaWRlU2hvd18yKCBhcm93QnRuLCBlbGVtZW50LCBldiApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICB9ICk7XHJcblxyXG4gICAgLy8gfn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+flxyXG4gICAgLy8gLS0tLS0tLS0tLS0tLS1TZWN0aW9uIEluZGV4IEZvcm0gYW5kIEZvcm0gQnV0dG9ucy0tLS0tLS0tLS0tLS0tXHJcbiAgICAvLyB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XHJcbiAgICAgIC8vLS0tLXNlbmQgZm9ybS0tLS0tLS0tLS0tXHJcbiAgICAgIHZhciBidXR0b24gICAgID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX2JvZHkgPiAuc3ViJyk7XHJcbiAgICAgIHZhciBjaGVja0JveCAgID0gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX2JvZHkgLmNoZWNrV3JhcHBlciBpbnB1dCcpO1xyXG4gICAgICB2YXIgZm9ybV9BbCAgICA9ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZm9ybV9ib2R5ID4gaW5wdXQnKTtcclxuICAgICAgdmFyIGVycm9yICAgICAgPSAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICB2YXIgY2hlY2tFcnJvciA9ICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcblxyXG4gICAgICBpZiAoZm9ybV9BbFswXSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICBidXR0b24uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIGVycm9yKTtcclxuICAgICAgICAgIGJ1dHRvbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJywgY2hlY2tFcnJvcik7XHJcblxyXG5cclxuICAgICAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCggJ2RyaXZlcicgLCB0cnVlICk7XHJcblxyXG5cclxuICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHZhciB0ZW1wID0gW11cclxuICAgICAgICAgICAgICBmb3JtX0FsLmZvckVhY2goZnVuY3Rpb24oZSlcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgdmFyIGsgICA9IGUuaWQudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgICB2YXIgdmFsID0gZS52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCggayAsIHZhbCApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgdGVtcFtrXSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgdmFyIGNoZWNrID0gY2hlY2tJbnB1dCAoIHRlbXAgKTtcclxuXHJcbiAgICAgICAgICAgICAgaWYgKCBjaGVjayAhPSB0cnVlIClcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yU3VibWl0ICggZXJyb3IsIGZhbHNlLCAn0J3QtdC+0LHRhdC+0LTQuNC80L4g0LfQsNC/0L7Qu9C90LjRgtGMINCy0YHQtSDQv9C+0LvRjyEnICk7XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICBlbHNlIGlmICggIWNoZWNrQm94LmNoZWNrZWQgKVxyXG4gICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JTdWJtaXQgKCBlcnJvciwgdHJ1ZSApO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yU3VibWl0ICggY2hlY2tFcnJvciwgZmFsc2UsICfQn9C+0YHRgtCw0LLRgtC1INCz0LDQu9C+0YfQutGDIScgKTtcclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gQmFyUHJvbWlzZShtZXRob2QsIHVybCwgYXN5biwgZm9ybURhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4gKGZ1bmN0aW9uKGRhdGEpeyBkYXRhID4gMCA/IHJlZ1N1Y3Nlc3MoKSAgOiBhbGVydChcItCS0L7QtNC40YLQtdC70Ywg0YEg0YLQsNC60LjQvNC4INC00LDQvdC90YvQvNC4INGD0LbQtSDQtdGB0YLRjCDQsiDRgdC40YHRgtC10LzQtSFcIik7IH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChmdW5jdGlvbihlcnJvcil7YWxlcnQoJ2Vycm9yICEtLS0+ICcrZXJyb3IpOyB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JTdWJtaXQgKCBlcnJvciwgdHJ1ZSApO1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yU3VibWl0ICggY2hlY2tFcnJvciwgdHJ1ZSApO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuXHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIGZ1bmN0aW9uIHJlZ1N1Y3Nlc3MoKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgYnV0dG9uLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTogbm9uZSc7XHJcblxyXG4gICAgICAgICAgICB2YXIgbSAgID0gJzxoMz7QktCw0YjQsCDQt9Cw0Y/QstC60LAg0L3QsCDQv9C+0LTQutC70Y7Rh9C10L3QuNC1INC/0YDQuNC90Y/RgtCwITwvaDM+IDxicj4g0JzRiyAgICAgICAgICAgICAgICDRgdCy0Y/QttC10LzRgdGPINGBINCy0LDQvNC4INCyINCx0LvQuNC20LDQudGI0LXQtSDQstGA0LXQvNGPISA8YnI+INCf0YDQuNCz0LvQsNGI0LDQudGC0LUg0LogICAgICAgICAgICAgICDQvdCw0Lwg0YHQstC+0LjRhSDQtNGA0YPQt9C10LknO1xyXG4gICAgICAgICAgICB2YXIgYyAgID0gJ3JnYigyNTMsIDI1MSwgMjUxKSc7Ly9XaGl0ZVxyXG4gICAgICAgICAgICB2YXIgZWxzID0gbWVzc2FnZSggbSwgYyApO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBvYmogPSBlbHMuc3VibS5pbm5lckhUTUwgKyBlbHMuY2xvc2UuaW5uZXJIVE1MXHJcblxyXG4gICAgICAgICAgICBoaWRlU2hvdyggZWxzLnN1Ym0sICBlbHMuZWwsIG9iaiApO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBmb3JtX0FsPSAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmZvcm1fYm9keSA+IGlucHV0Jyk7XHJcbiAgICAgICAgICAgIGZvcm1fQWwuZm9yRWFjaChmdW5jdGlvbihlKXtlLnZhbHVlID0gJyd9KTsgLy8gbWFrZSAgZm9ybSBlbXB0eVxyXG5cclxuICAgICAgICB9XHJcbiAgICAgIGZ1bmN0aW9uIGNoZWNrSW5wdXQgKCAgYXJyIClcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgZm9yICggdmFyIGtheSBpbiAgYXJyIClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIGFycltrYXldID09PSAnJyApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgIH07XHJcbiAgICAgIGZ1bmN0aW9uIGVycm9yU3VibWl0ICggZWwsIHN1Y3Nlc3MgPSBmYWxzZSAsIHRleHQgPSAnZXJyb3InKVxyXG4gICAgICAgICAgIHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXN1Y3Nlc3MgKVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuaW5uZXJUZXh0ICAgPSB0ZXh0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS5jb2xvciA9ICdyZWQnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCBlbC5pbm5lclRleHQgIT0gJycgJiYgc3Vjc2VzcyApXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5pbm5lclRleHQgICA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgfTtcclxuICAgICAgLy8tLS0tLS0tLVNvdyBIaWRlLS0tLS0tLS0tXHJcbiAgICAgIHZhciBlbGVtZW50ICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdkaXYuZl9saXN0Jyk7XHJcbiAgICAgIHZhciBjbG9zZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZl9saXN0IHNwYW4uY2xvc2UgYScpO1xyXG4gICAgICB2YXIgYnRuICAgICAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm0gPiBzcGFuLnN1YicpO1xyXG5cclxuICAgICAgaWYoZWxlbWVudClcclxuICAgICAgICBoaWRlU2hvdyggYnRuLCBlbGVtZW50LCBjbG9zZUVsZW1lbnQsIHRydWUgKTsgIC8vIGluIFVuaXZlcnNhbCBmdW5jdGlvbnNcclxuICAgIC8vIH5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5cclxuICAgIC8qLS0tLS0tLS0tLS0tLS1TZWN0aW9uIFByb2ZpbGUtLS0tLS0tLS0tLS0tLSovXHJcbiAgICAvLyB+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+fn5+XHJcbiAgICAgICAgdmFyIHVzZXJNYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCggJy5kZWxldGVBY2NvdW50ID4gZGl2ID4gLnVzZXIgJyApO1xyXG5cclxuICAgICAgICB1c2VyTWJ0bi5mb3JFYWNoKCBmdW5jdGlvbiAoIGVsIClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdmFyIGZvcm1XcmFwcGVyID0gZWwucGFyZW50Tm9kZS5jaGlsZE5vZGVzWzNdO1xyXG5cclxuICAgICAgICAgICAgICAgIGhpZGVTaG93KCBlbCwgZm9ybVdyYXBwZXIgKTtcclxuICAgICAgICAgICAgfSApO1xyXG5cclxuICAgICAgICB2YXIgbmV3VXNlciAgICAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5kZWxldGVBY2NvdW50ID4gLm5ld1VzZXIgJyApO1xyXG4gICAgICAgIHZhciBhZGRCdG4gICAgICAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLmRlbGV0ZUFjY291bnQgPiAuYWRkQWMgJyApO1xyXG4gICAgICAgIHZhciBjbG9zZW5ld1VzZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLmRlbGV0ZUFjY291bnQgPiAubmV3VXNlciA+IC5jbG9zZSA+KiAnICk7XHJcblxyXG4gICAgICAgIGhpZGVTaG93KCBhZGRCdG4sIG5ld1VzZXIsIGNsb3NlbmV3VXNlciApO1xyXG5cclxuICAgICAgICAvLyB2YXIgbG9jID0gd2luZG93LmxvY2F0aW9uLmhyZWYuc3BsaXQoJz8nKVsxXTtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyggZGVjb2RlVVJJQ29tcG9uZW50KCBsb2MgKSApO1xyXG5cclxuXHJcblxyXG5cclxuICAgIC8vIC0tVW5pdmVyc2FsIGZ1bmN0aW9ucy0tLVxyXG4gICAgICBmdW5jdGlvbiBoaWRlU2hvdyAoIGJ0biwgZWxlbWVudCwgY2xvc2VFbGVtZW50PSBmYWxzZSwgaW5odG1sID0gZmFsc2UgIClcclxuICAgICAgXHRcdHtcclxuXHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGh0bWx2O1xyXG4gICAgICAgICAgICAgICAgdmFyIGNsb3NlX2h0bWxcclxuXHJcbiAgICAgICAgICBcdCAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpc3BsYXkpO1xyXG5cclxuICAgICAgXHRcdFx0ZnVuY3Rpb24gZGlzcGxheShlKVxyXG4gICAgICBcdFx0XHRcdHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICFpbmh0bWwgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICBodG1sdiAgICAgID0gZWxlbWVudC5vdXRlckhUTUwgOiAgaHRtbHYgID0gZWxlbWVudC5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZihjbG9zZUVsZW1lbnQpID09PSAnc3RyaW5nJyA/ICBjbG9zZV9odG1sID0gY2xvc2VFbGVtZW50ICAgICAgOiAgY2xvc2VFbGVtZW50O1xyXG5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFlbGVtZW50LmNsaWVudEhlaWdodCAmJiBlLnRhcmdldCA9PT0gYnRuIClcclxuICAgICAgXHRcdFx0XHRcdFx0XHR7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9ICdkaXNwbGF5IDogYmxvY2sgOyAnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiggZS50YXJnZXQgPT09IGNsb3NlRWxlbWVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlID0gJ2Rpc3BsYXkgOiBub25lJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGNsb3NlX2h0bWwgJiYgY2xvc2VfaHRtbC5pbmRleE9mKGUudGFyZ2V0LmlubmVySFRNTCkgIT0gLTEgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5zdHlsZSA9ICdkaXNwbGF5IDogbm9uZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKCBodG1sdi5pbmRleE9mKGUudGFyZ2V0Lm91dGVySFRNTCkgIT0gLTEgJiYgY2xvc2VFbGVtZW50ICE9ICdkb250JyApXHJcbiAgICAgIFx0XHRcdFx0XHRcdFx0e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUgPSAnZGlzcGxheSA6IGJsb2NrJztcclxuICAgICAgXHRcdFx0XHRcdFx0XHR9XHJcbiAgICAgIFx0XHRcdFx0XHRlbHNlXHJcbiAgICAgIFx0XHRcdFx0XHRcdFx0e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUgPSAnZGlzcGxheSA6IG5vbmUnO1xyXG4gICAgICBcdFx0XHRcdFx0XHRcdH1cclxuXHJcblxyXG5cclxuICAgICAgXHRcdFx0XHR9XHJcblxyXG4gICAgICBcdCAgIH07XHJcbiAgICAgIGZ1bmN0aW9uIGhpZGVTaG93XzIgKCBidG4sIGVsZW1lbnQsIGUsICBjbG9zZT0gZmFsc2UsIGluaHRtbCA9IGZhbHNlIClcclxuICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgdmFyIGJ0biAgICAgICAgICA9IGJ0bjtcclxuICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgICAgICA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgIHZhciBjbG9zZUVsZW1lbnQgPSBjbG9zZTtcclxuXHJcbiAgICAgICAgICAgICAgIHZhciBodG1sdjtcclxuICAgICAgICAgICAgLy8gICAgY29uc29sZS5sb2coIGJ0bi5vdXRlckhUTUwuaW5kZXhPZihlLnRhcmdldC5vdXRlckhUTUwpICk7XHJcblxyXG5cclxuICAgICAgICAgICAgICAgaWYoIWVsZW1lbnQub2Zmc2V0UGFyZW50ICYmIGUudGFyZ2V0ID09PSBidG4gIClcclxuICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheSA6IGJsb2NrIDsgJztcclxuICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgZWxzZVxyXG4gICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUgPSAnZGlzcGxheSA6IG5vbmUnO1xyXG4gICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciAoICdjbGljaycsIGluZWVyRXZlbnQgKVxyXG5cclxuXHJcbiAgICAgICAgICAgICAgIGZ1bmN0aW9uIGluZWVyRXZlbnQgKCBldiApXHJcbiAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgdmFyIGNoZWNrID0gZXYudGFyZ2V0ID09PSBjbG9zZUVsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICFpbmh0bWwgID8gIGh0bWx2ICA9IGVsZW1lbnQub3V0ZXJIVE1MIDogIGh0bWx2ICA9IGVsZW1lbnQuaW5uZXJIVE1MO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGh0bWx2LmluZGV4T2YoZXYudGFyZ2V0LmlubmVySFRNTCkgPT0gLTEgICYmIGV2LnRhcmdldCAhPSBidG4gfHwgY2hlY2sgKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnN0eWxlID0gJ2Rpc3BsYXkgOiBub25lJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIgKCAnY2xpY2snLCBpbmVlckV2ZW50IClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgfSA7XHJcbiAgICAgICAgICAgICB9O1xyXG4gICAgICBmdW5jdGlvbiBCYXJQcm9taXNlKG1ldGgsIHVsLCBhc3luICwgc2VhcmNoVmFsdWU9bnVsbCApXHJcbiAgICAgICB7XHJcbiAgXHRcdFx0ICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KVxyXG4gIFx0XHRcdFx0ICAgIHtcclxuICBcdFx0XHRcdCAgICAgICAgdmFyIHhociAgICA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIFx0XHRcdFx0ICAgICAgICB4aHIub3BlbihtZXRoLHVsLGFzeW4pO1xyXG4gIFx0XHRcdFx0ICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKClcclxuICBcdFx0XHRcdFx0ICAgICAgICB7XHJcbiAgXHRcdFx0XHQgICAgICBcdFx0XHRpZiAoeGhyLnJlYWR5U3RhdGUgPT0gNCAmJiB4aHIuc3RhdHVzID09IDIwMClcclxuICBcdFx0XHRcdFx0ICAgICAgXHRcdFx0e1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFZhbHVlICE9JycgPyByZXNvbHZlKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCkpIDogcmVzb2x2ZSgnJyk7XHJcbiAgXHRcdFx0XHRcdCAgICAgICAgXHRcdH1cclxuICBcdFx0XHRcdFx0ICAgICAgICBcdGVsc2VcclxuICBcdFx0XHRcdFx0ICAgICAgICBcdFx0e1xyXG4gIFx0XHRcdFx0XHRcdFx0XHQgICAgICAgIHJlamVjdCh4aHIuc3RhdHVzVGV4dCk7XHJcbiAgXHRcdFx0XHRcdFx0XHRcdCAgICB9XHJcbiAgXHRcdFx0ICAgICAgICBcdFx0fVxyXG5cclxuICBcdFx0XHRcdCAgICAgICAgeGhyLm9uZXJyb3I9IGZ1bmN0aW9uICgpXHJcbiAgXHRcdFx0XHRcdCAgICAgICAge1xyXG4gIFx0XHRcdFx0XHRcdCAgICAgIFx0cmVqZWN0KHhoci5zdGF0dXNUZXh0KTtcclxuICBcdFx0XHQgICAgXHRcdFx0fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2VuZChzZWFyY2hWYWx1ZSk7XHJcblxyXG4gIFx0XHRcdCAgICBcdH0pO1xyXG4gICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gbWVzc2FnZSAobWFzc2FnZSwgY29sb3IpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgcmVtb3ZlT2xkICggJy5tZXNzYWdlX3dyYXBwZXInIClcclxuICAgICAgICAgIGlmIChtYXNzYWdlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgdmFyIHdyYXBwZXIgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgIHdyYXBwZXIuY2xhc3NOYW1lID0gJ21lc3NhZ2Vfd3JhcHBlciAnK2d1aWQoKTtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHdyYXBwZXJDbCAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICAgIHdyYXBwZXJDbC5jbGFzc05hbWUgPSAnYnV0dG9uX2Nsb3NlJztcclxuICAgICAgICAgICAgICB2YXIgY2xvc2UgICAgICAgICAgICAgICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgICAgICAgICAgY2xvc2UuaW5uZXJUZXh0ICAgICA9ICfinYwnO1xyXG5cclxuICAgICAgICAgICAgICB2YXIgdGV4dCAgICAgICAgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICAgIHRleHQuY2xhc3NOYW1lICAgID0gJ3RleHRfd3JhcHBlcic7XHJcbiAgICAgICAgICAgICAgICAgIHRleHQuaW5uZXJIVE1MICAgID0gbWFzc2FnZTtcclxuXHJcblxyXG4gICAgICAgICAgICAgIHZhciBzdWJtaXQgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgICBzdWJtaXQuaW5uZXJUZXh0ID0gJ9Cf0L7QtNGC0LLQtdGA0LTQuNGC0YwnO1xyXG4gICAgICAgICAgICAgICAgICBzdWJtaXQuY2xhc3NOYW1lID0gJ2J1dHRvbl9zdWJtaXRlJztcclxuXHJcblxyXG4gICAgICAgICAgICAgIHdyYXBwZXIuc3R5bGUuZGlzcGxheSAgICAgICAgICAgPSBcImJsb2NrXCI7XHJcblxyXG5cclxuICAgICAgICAgICAgICB3cmFwcGVyICAgLmFwcGVuZENoaWxkKHdyYXBwZXJDbCk7XHJcbiAgICAgICAgICAgICAgd3JhcHBlckNsIC5hcHBlbmRDaGlsZChjbG9zZSk7XHJcbiAgICAgICAgICAgICAgd3JhcHBlciAgIC5hcHBlbmRDaGlsZCh0ZXh0KTtcclxuICAgICAgICAgICAgICB3cmFwcGVyICAgLmFwcGVuZENoaWxkKHN1Ym1pdCk7XHJcbiAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcclxuXHJcblxyXG4gICAgICAgICAgICAgIHJldHVybiB7J2VsJzp3cmFwcGVyLCAnY2xvc2UnOmNsb3NlLCAnc3VibSc6c3VibWl0fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgZnVuY3Rpb24gcmVtb3ZlT2xkICggZWwgKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoIGVsICk7XHJcbiAgICAgICAgICAgICAgICBpZihlbGVtZW50KVxyXG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG5cclxuXHJcblxyXG4gICAgICBmdW5jdGlvbiBjcnRFbCAobmFtZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICB2YXIgbmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSk7XHJcbiAgICAgICAgICByZXR1cm4gbmFtZTtcclxuICAgICAgICB9XHJcbiAgICAgIGZ1bmN0aW9uIGVsQWRkIChwYXJlbnQsIGNoaWxkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNoaWxkLmNsYXNzTmFtZSAgICs9IFwiIFwiICsgZ3VpZCgpO1xyXG4gICAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICAgICAgICAvLyAgIHBhcmVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2FmdGVyZW5kJyxjaGlsZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgZnVuY3Rpb24gZ3VpZCgpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgZnVuY3Rpb24gczQoKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgfSlcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iXSwic291cmNlUm9vdCI6IiJ9