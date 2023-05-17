"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _sharp = _interopRequireDefault(require("sharp"));

var _generate = require("./generate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var sizes = {
  WIDTH: 250,
  HEIGHT: 150,
  PUZZLE: 60,
  PADDING: 20
};

var createCaptcha = function createCaptcha() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$image = _ref.image,
      image = _ref$image === void 0 ? Buffer.from((0, _generate.backgroundSvg)(sizes.WIDTH, sizes.HEIGHT)) : _ref$image,
      _ref$distort = _ref.distort,
      distort = _ref$distort === void 0 ? false : _ref$distort,
      _ref$rotate = _ref.rotate,
      rotate = _ref$rotate === void 0 ? false : _ref$rotate,
      _ref$fill = _ref.fill,
      fill = _ref$fill === void 0 ? '#000' : _ref$fill,
      _ref$stroke = _ref.stroke,
      stroke = _ref$stroke === void 0 ? '#fff' : _ref$stroke,
      _ref$strokeWidth = _ref.strokeWidth,
      strokeWidth = _ref$strokeWidth === void 0 ? '.4' : _ref$strokeWidth,
      _ref$opacity = _ref.opacity,
      opacity = _ref$opacity === void 0 ? '0.5' : _ref$opacity;

  var seed = (0, _generate.randInt)();
  var overlay = Buffer.from((0, _generate.puzzlePieceSvg)({
    rotate: rotate,
    distort: distort,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    opacity: opacity,
    seed: seed
  }));
  var mask = Buffer.from((0, _generate.puzzlePieceSvg)({
    rotate: rotate,
    distort: distort,
    seed: seed,
    strokeWidth: strokeWidth,
    fill: '#fff',
    stroke: '#fff',
    opacity: '1'
  }));
  var outline = Buffer.from((0, _generate.puzzlePieceSvg)({
    rotate: rotate,
    distort: distort,
    seed: seed,
    stroke: stroke,
    strokeWidth: strokeWidth,
    fill: 'none',
    opacity: '1'
  }));
  var location = {
    // Solution for slider
    left: (0, _generate.randInt)(sizes.PUZZLE + sizes.PADDING, sizes.WIDTH - (sizes.PUZZLE + sizes.PADDING)),
    // Vertical offset
    top: (0, _generate.randInt)(sizes.PADDING, sizes.HEIGHT - (sizes.PUZZLE + sizes.PADDING))
  };
  return new Promise(function (resolve) {
    var ins = (0, _sharp["default"])(image).resize({
      width: sizes.WIDTH,
      height: sizes.HEIGHT
    });
    return ins.composite([{
      input: overlay,
      blend: 'over',
      top: location.top,
      left: location.left
    }]).png().toBuffer().then( /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(background) {
        var composed;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return ins.composite([{
                  input: mask,
                  blend: 'dest-in',
                  top: location.top,
                  left: location.left
                }, {
                  input: outline,
                  blend: 'over',
                  top: location.top,
                  left: location.left
                }]).toBuffer();

              case 2:
                composed = _context.sent;
                return _context.abrupt("return", (0, _sharp["default"])(composed).extract({
                  left: location.left,
                  top: 0,
                  width: sizes.PUZZLE,
                  height: sizes.HEIGHT
                }).png().toBuffer().then(function (slider) {
                  return {
                    data: {
                      background: background,
                      slider: slider
                    },
                    solution: location.left
                  };
                }));

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());
  });
};

var _default = createCaptcha;
exports["default"] = _default;
