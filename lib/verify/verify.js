"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _uidSafe = _interopRequireDefault(require("uid-safe"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Solution must be correct within the given tolerance
var verifySolution = function verifySolution(captcha, solution, tolerance) {
  return Math.abs(captcha - solution) < tolerance;
}; // Slider position must not jump to the solution without intermediate values


var verifyHorizontalMotion = function verifyHorizontalMotion(positions) {
  return !positions.reduce(function (jumpToInput, pos) {
    return jumpToInput && (pos === 0 || pos === positions[positions.length - 1]);
  }, true);
}; // Vertical motion must be present while dragging the slider


var verifyVerticalMotion = function verifyVerticalMotion(positions) {
  return positions.reduce(function (total, pos) {
    return total + pos;
  }) !== 0;
};

var verifyTrailLength = function verifyTrailLength(trail) {
  return trail.x.length === trail.y.length;
};

var verifyResponse = function verifyResponse(captcha, solution, trail, tolerance) {
  return verifySolution(captcha, solution, tolerance) && verifyTrailLength(trail) && verifyHorizontalMotion(trail.x, solution) && verifyVerticalMotion(trail.y);
};

var verifyCaptcha = function verifyCaptcha(captcha, _ref) {
  var response = _ref.response,
      trail = _ref.trail;

  var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref2$tolerance = _ref2.tolerance,
      tolerance = _ref2$tolerance === void 0 ? 7 : _ref2$tolerance,
      _ref2$verify = _ref2.verify,
      verify = _ref2$verify === void 0 ? verifyResponse : _ref2$verify;

  return new Promise(function (resolve) {
    if (verify(captcha, response, trail, tolerance)) {
      (0, _uidSafe["default"])(32).then(function (token) {
        resolve({
          result: 'success',
          token: token
        });
      });
    } else {
      resolve({
        result: 'failure'
      });
    }
  });
};

var _default = verifyCaptcha;
exports["default"] = _default;
