"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRangePosition = void 0;
var React = _interopRequireWildcard(require("react"));
var _useControlled = _interopRequireDefault(require("@mui/utils/useControlled"));
var _useEventCallback = _interopRequireDefault(require("@mui/utils/useEventCallback"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useRangePosition = props => {
  const singleInputFieldRef = React.useRef();
  const [rangePosition, setRangePosition] = (0, _useControlled.default)({
    name: 'useRangePosition',
    state: 'rangePosition',
    controlled: props.rangePosition,
    default: props.defaultRangePosition ?? 'start'
  });

  // When using a single input field,
  // we want to select the 1st section of the edited date when updating the range position.
  const syncRangePositionWithSingleInputField = newRangePosition => {
    if (singleInputFieldRef.current == null) {
      return;
    }
    const sections = singleInputFieldRef.current.getSections();
    const targetActiveSectionIndex = newRangePosition === 'start' ? 0 : sections.length / 2;
    singleInputFieldRef.current.setSelectedSections(targetActiveSectionIndex);
  };
  const handleRangePositionChange = (0, _useEventCallback.default)(newRangePosition => {
    setRangePosition(newRangePosition);
    props.onRangePositionChange?.(newRangePosition);
    syncRangePositionWithSingleInputField(newRangePosition);
  });
  return {
    rangePosition,
    onRangePositionChange: handleRangePositionChange,
    singleInputFieldRef
  };
};
exports.useRangePosition = useRangePosition;