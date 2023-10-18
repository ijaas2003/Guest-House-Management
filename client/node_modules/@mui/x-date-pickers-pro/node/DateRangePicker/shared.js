"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDateRangePickerDefaultizedProps = useDateRangePickerDefaultizedProps;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutPropertiesLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutPropertiesLoose"));
var React = _interopRequireWildcard(require("react"));
var _styles = require("@mui/material/styles");
var _internals = require("@mui/x-date-pickers/internals");
var _DateRangePickerToolbar = require("./DateRangePickerToolbar");
const _excluded = ["components", "componentsProps"];
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function useDateRangePickerDefaultizedProps(props, name) {
  const utils = (0, _internals.useUtils)();
  const defaultDates = (0, _internals.useDefaultDates)();
  const _useThemeProps = (0, _styles.useThemeProps)({
      props,
      name
    }),
    {
      components,
      componentsProps
    } = _useThemeProps,
    themeProps = (0, _objectWithoutPropertiesLoose2.default)(_useThemeProps, _excluded);
  const localeText = React.useMemo(() => {
    if (themeProps.localeText?.toolbarTitle == null) {
      return themeProps.localeText;
    }
    return (0, _extends2.default)({}, themeProps.localeText, {
      dateRangePickerToolbarTitle: themeProps.localeText.toolbarTitle
    });
  }, [themeProps.localeText]);
  return (0, _extends2.default)({}, themeProps, {
    localeText,
    disableFuture: themeProps.disableFuture ?? false,
    disablePast: themeProps.disablePast ?? false,
    minDate: (0, _internals.applyDefaultDate)(utils, themeProps.minDate, defaultDates.minDate),
    maxDate: (0, _internals.applyDefaultDate)(utils, themeProps.maxDate, defaultDates.maxDate),
    slots: (0, _extends2.default)({
      toolbar: _DateRangePickerToolbar.DateRangePickerToolbar
    }, themeProps.slots ?? (0, _internals.uncapitalizeObjectKeys)(components)),
    slotProps: themeProps.slotProps ?? componentsProps
  });
}