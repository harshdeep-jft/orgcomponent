'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var basicprimitivesreact = require('basicprimitivesreact');
var basicprimitives = require('basicprimitives');
var Card = require('@mui/material/Card');
var CardHeader = require('@mui/material/CardHeader');
var CardContent = require('@mui/material/CardContent');
var Typography = require('@mui/material/Typography');
var styles = require('@mui/styles');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Card__default = /*#__PURE__*/_interopDefaultLegacy(Card);
var CardHeader__default = /*#__PURE__*/_interopDefaultLegacy(CardHeader);
var CardContent__default = /*#__PURE__*/_interopDefaultLegacy(CardContent);
var Typography__default = /*#__PURE__*/_interopDefaultLegacy(Typography);

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var useStyles = styles.makeStyles({
  card: {
    width: 150,
    height: 100,
    transition: 'background-color 0.3s ease'
  },
  leafNode: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#FDE3A7 !important',
      border: '2.5px solid #FFFF00'
    }
  }
});
function NodeCard(props) {
  var _props$title = props.title,
    title = _props$title === void 0 ? 'No Title Found' : _props$title,
    _props$description = props.description,
    description = _props$description === void 0 ? 'No Description Found' : _props$description,
    data = props.data,
    itemConfig = props.itemConfig;
  var classes = useStyles();
  var hasChildren = data.filter(function (item) {
    return item.parent === itemConfig.id;
  }).length > 0;
  var isLeafNode = !hasChildren;
  return /*#__PURE__*/React__namespace.createElement(Card__default["default"], {
    className: "".concat(classes.card, " ").concat(isLeafNode ? classes.leafNode : ''),
    style: {
      backgroundColor: '#FFE5E5'
    }
  }, /*#__PURE__*/React__namespace.createElement(CardHeader__default["default"], {
    sx: {
      borderBottom: '1px solid #ccc',
      backgroundColor: '#f0f0f0'
    },
    style: {
      textTransform: 'capitalize',
      paddingRight: '10px'
    },
    title: title,
    titleTypographyProps: {
      fontSize: '14px',
      fontWeight: '800',
      textAlign: 'center'
    }
  }), /*#__PURE__*/React__namespace.createElement(CardContent__default["default"], null, /*#__PURE__*/React__namespace.createElement(Typography__default["default"], {
    style: {
      textTransform: 'capitalize',
      fontSize: '12px',
      fontWeight: '600',
      textAlign: 'center'
    },
    variant: "body2",
    color: "text.primary"
  }, description)));
}

function convertJsonToItemData(data) {
  var itemDataArray = [];
  function appendJsonData(data, parent) {
    var item = {};
    item.id = "".concat(data.organizationID, "_").concat(parent);
    item.title = data.organizationCategory;
    item.description = data.organizationName;
    item.parent = parent;
    itemDataArray.push(item);
    if (data.children != null && data.children.length > 0) {
      for (var i = 0; i < data.children.length; i++) {
        var child = appendJsonData(data.children[i], item.id);
        itemDataArray.push(child);
      }
      // item.templateName = 'DisableTemplate'
    } else {
      console.log('🚀  file:  ,Line: ,method: , ~ value: ,', data);
    }
    return item;
  }
  appendJsonData(data, null);
  return itemDataArray;
}
function Org() {
  var _useState = React.useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    customersData = _useState2[0],
    setcustomersData = _useState2[1];
  var _useState3 = React.useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    cursorItem = _useState4[0];
    _useState4[1];
  var _useState5 = React.useState(customersData.length),
    _useState6 = _slicedToArray(_useState5, 2);
    _useState6[0];
    _useState6[1];
  React.useEffect(function () {
    fetch("http://localhost:3000/items").then(function (response) {
      return response.json();
    }).then(function (data) {
      var result = convertJsonToItemData(data);
      setcustomersData(result);
    }).catch(function (error) {
      console.error("Error fetching data: ", error);
    });
  }, []);
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(basicprimitivesreact.OrgDiagram, {
    centerOnCursor: true,
    config: {
      customersData: customersData,
      cursorItem: cursorItem,
      pageFitMode: basicprimitives.PageFitMode.AutoSize,
      selectionPathMode: basicprimitives.SelectionPathMode.None,
      selectedItems: [3],
      autoSizeMinimum: {
        width: 1024,
        height: 768
      },
      autoSizeMaximum: {
        width: 1920,
        height: 1080
      },
      verticalAlignment: basicprimitives.VerticalAlignmentType.Middle,
      horizontalAlignment: basicprimitives.HorizontalAlignmentType.Left,
      childrenPlacementType: basicprimitives.ChildrenPlacementType.Vertical,
      leavesPlacementType: basicprimitives.ChildrenPlacementType.Horizontal,
      navigationMode: basicprimitives.Enabled.False,
      hasSelectorCheckbox: basicprimitives.Enabled.False,
      hasButtons: basicprimitives.Enabled.False,
      buttonsPanelSize: 40,
      defaultTemplateName: "info",
      templates: [{
        name: "info",
        itemSize: {
          width: 150,
          height: 100
        },
        highlightBorderWidth: 2,
        highlightPadding: {
          left: 4,
          top: 4,
          right: 4,
          bottom: 4
        },
        cursorPadding: {
          left: 3,
          top: 3,
          right: 3,
          bottom: 3
        },
        cursorBorderWidth: 2,
        onItemRender: function onItemRender(_ref) {
          var itemConfig = _ref.context;
          var hasChildren = customersData.filter(function (item) {
            return item.parent === itemConfig.id;
          }).length > 0;
          var isLeafNode = !hasChildren;
          return /*#__PURE__*/React__default["default"].createElement("div", {
            className: "InfoTemplate ".concat(hasChildren ? '' : 'clickable', " "),
            "data-entity": itemConfig.id,
            onClick: function onClick(event) {
              event.stopPropagation();
              if (isLeafNode) {
                console.log('🚀  ~ value: ,', itemConfig.id, ':', itemConfig.description);
                // $('#entity').data('id', `${itemConfig.id}`)
                // $('#entity').data('value', `${itemConfig.description}`)
              }
            }
          }, /*#__PURE__*/React__default["default"].createElement(NodeCard, {
            title: itemConfig.title,
            description: itemConfig.description,
            data: customersData,
            itemConfig: itemConfig
          }));
        }
      }],
      items: customersData.map(function (item) {
        return {
          id: item.id,
          parent: item.parent,
          title: item.title,
          description: item.description
        };
      })
    },
    scale: 1
  }));
}

function Button() {
  return /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(Button, null, "click me "));
}

exports.Button = Button;
exports.NodeCard = NodeCard;
exports.Org = Org;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL05vZGVDYXJkcy9Ob2RlQ2FyZC5qcyIsIi4uLy4uL3NyYy9jb21wb25lbnRzL09yZy9PcmcuanMiLCIuLi8uLi9zcmMvY29tcG9uZW50cy9CdXR0b24vQnV0dG9uLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBDYXJkIGZyb20gJ0BtdWkvbWF0ZXJpYWwvQ2FyZCc7XG5pbXBvcnQgQ2FyZEhlYWRlciBmcm9tICdAbXVpL21hdGVyaWFsL0NhcmRIZWFkZXInO1xuaW1wb3J0IENhcmRDb250ZW50IGZyb20gJ0BtdWkvbWF0ZXJpYWwvQ2FyZENvbnRlbnQnO1xuaW1wb3J0IFR5cG9ncmFwaHkgZnJvbSAnQG11aS9tYXRlcmlhbC9UeXBvZ3JhcGh5JztcbmltcG9ydCB7IG1ha2VTdHlsZXMgfSBmcm9tICdAbXVpL3N0eWxlcyc7XG5cbmNvbnN0IHVzZVN0eWxlcyA9IG1ha2VTdHlsZXMoe1xuICAgIGNhcmQ6IHtcbiAgICAgICAgd2lkdGg6IDE1MCxcbiAgICAgICAgaGVpZ2h0OiAxMDAsXG4gICAgICAgIHRyYW5zaXRpb246ICdiYWNrZ3JvdW5kLWNvbG9yIDAuM3MgZWFzZScsXG4gICAgfSxcbiAgICBsZWFmTm9kZToge1xuICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgJyY6aG92ZXInOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjRkRFM0E3ICFpbXBvcnRhbnQnLFxuICAgICAgICAgICAgYm9yZGVyOiAnMi41cHggc29saWQgI0ZGRkYwMCdcbiAgICAgICAgfSxcbiAgICB9LFxufSk7XG5cbmZ1bmN0aW9uIE5vZGVDYXJkKHByb3BzKSB7XG5cbiAgICBjb25zdCB7XG4gICAgICAgIHRpdGxlID0gJ05vIFRpdGxlIEZvdW5kJyxcbiAgICAgICAgZGVzY3JpcHRpb24gPSAnTm8gRGVzY3JpcHRpb24gRm91bmQnLFxuICAgICAgICBkYXRhLFxuICAgICAgICBpdGVtQ29uZmlnXG4gICAgfSA9IHByb3BzO1xuXG4gICAgY29uc3QgY2xhc3NlcyA9IHVzZVN0eWxlcygpO1xuXG4gICAgY29uc3QgaGFzQ2hpbGRyZW4gPSBkYXRhLmZpbHRlcihpdGVtID0+IGl0ZW0ucGFyZW50ID09PSBpdGVtQ29uZmlnLmlkKS5sZW5ndGggPiAwO1xuICAgIGNvbnN0IGlzTGVhZk5vZGUgPSAhaGFzQ2hpbGRyZW47XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8Q2FyZFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtgJHtjbGFzc2VzLmNhcmR9ICR7aXNMZWFmTm9kZSA/IGNsYXNzZXMubGVhZk5vZGUgOiAnJ31gfVxuICAgICAgICAgICAgc3R5bGU9e3sgYmFja2dyb3VuZENvbG9yOiAnI0ZGRTVFNScgfX1cbiAgICAgICAgPlxuICAgICAgICAgICAgPENhcmRIZWFkZXJcbiAgICAgICAgICAgICAgICBzeD17eyBib3JkZXJCb3R0b206ICcxcHggc29saWQgI2NjYycsIGJhY2tncm91bmRDb2xvcjogJyNmMGYwZjAnIH19XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgdGV4dFRyYW5zZm9ybTogJ2NhcGl0YWxpemUnLCBwYWRkaW5nUmlnaHQ6ICcxMHB4JyB9fVxuICAgICAgICAgICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgICAgICAgICB0aXRsZVR5cG9ncmFwaHlQcm9wcz17eyBmb250U2l6ZTogJzE0cHgnLCBmb250V2VpZ2h0OiAnODAwJywgdGV4dEFsaWduOiAnY2VudGVyJyB9fVxuICAgICAgICAgICAgLz5cblxuICAgICAgICAgICAgPENhcmRDb250ZW50PlxuICAgICAgICAgICAgICAgIDxUeXBvZ3JhcGh5XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IHRleHRUcmFuc2Zvcm06ICdjYXBpdGFsaXplJywgZm9udFNpemU6ICcxMnB4JywgZm9udFdlaWdodDogJzYwMCcsIHRleHRBbGlnbjogJ2NlbnRlcicgfX1cbiAgICAgICAgICAgICAgICAgICAgdmFyaWFudD1cImJvZHkyXCIgY29sb3I9XCJ0ZXh0LnByaW1hcnlcIj5cbiAgICAgICAgICAgICAgICAgICAge2Rlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgIDwvVHlwb2dyYXBoeT5cbiAgICAgICAgICAgIDwvQ2FyZENvbnRlbnQ+XG4gICAgICAgIDwvQ2FyZD5cbiAgICApO1xufVxuXG5leHBvcnQgZGVmYXVsdCBOb2RlQ2FyZDsiLCJpbXBvcnQgUmVhY3QsIHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgT3JnRGlhZ3JhbSB9IGZyb20gXCJiYXNpY3ByaW1pdGl2ZXNyZWFjdFwiO1xuaW1wb3J0IHsgUGFnZUZpdE1vZGUsIEVuYWJsZWQsIFZlcnRpY2FsQWxpZ25tZW50VHlwZSwgSG9yaXpvbnRhbEFsaWdubWVudFR5cGUsIENoaWxkcmVuUGxhY2VtZW50VHlwZSwgU2VsZWN0aW9uUGF0aE1vZGUgfSBmcm9tIFwiYmFzaWNwcmltaXRpdmVzXCI7XG5pbXBvcnQgTm9kZUNhcmQgZnJvbSBcIi4uL05vZGVDYXJkcy9Ob2RlQ2FyZFwiO1xuXG5mdW5jdGlvbiBjb252ZXJ0SnNvblRvSXRlbURhdGEoZGF0YSkge1xuICBsZXQgaXRlbURhdGFBcnJheSA9IFtdO1xuXG4gIGZ1bmN0aW9uIGFwcGVuZEpzb25EYXRhKGRhdGEsIHBhcmVudCkge1xuXG4gICAgbGV0IGl0ZW0gPSB7fTtcbiAgICBpdGVtLmlkID0gYCR7ZGF0YS5vcmdhbml6YXRpb25JRH1fJHtwYXJlbnR9YDtcbiAgICBpdGVtLnRpdGxlID0gZGF0YS5vcmdhbml6YXRpb25DYXRlZ29yeTtcbiAgICBpdGVtLmRlc2NyaXB0aW9uID0gZGF0YS5vcmdhbml6YXRpb25OYW1lO1xuICAgIGl0ZW0ucGFyZW50ID0gcGFyZW50O1xuXG4gICAgaXRlbURhdGFBcnJheS5wdXNoKGl0ZW0pO1xuXG4gICAgaWYgKGRhdGEuY2hpbGRyZW4gIT0gbnVsbCAmJiBkYXRhLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBsZXQgY2hpbGQgPSBhcHBlbmRKc29uRGF0YShkYXRhLmNoaWxkcmVuW2ldLCBpdGVtLmlkKTtcbiAgICAgICAgaXRlbURhdGFBcnJheS5wdXNoKGNoaWxkKTtcbiAgICAgIH1cbiAgICAgIC8vIGl0ZW0udGVtcGxhdGVOYW1lID0gJ0Rpc2FibGVUZW1wbGF0ZSdcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc29sZS5sb2coJ/CfmoAgIGZpbGU6ICAsTGluZTogLG1ldGhvZDogLCB+IHZhbHVlOiAsJywgZGF0YSlcbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbTtcbiAgfVxuXG4gIGFwcGVuZEpzb25EYXRhKGRhdGEsIG51bGwpO1xuXG5cbiAgcmV0dXJuIGl0ZW1EYXRhQXJyYXk7XG59XG5mdW5jdGlvbiBPcmcoKSB7XG5cbiAgY29uc3QgW2N1c3RvbWVyc0RhdGEsIHNldGN1c3RvbWVyc0RhdGFdID0gdXNlU3RhdGUoW10pO1xuICBjb25zdCBbY3Vyc29ySXRlbSwgc2V0Q3Vyc29ySXRlbV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2luZGV4LCBzZXRJbmRleF0gPSB1c2VTdGF0ZShjdXN0b21lcnNEYXRhLmxlbmd0aCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBmZXRjaChcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9pdGVtc1wiKVxuICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSBjb252ZXJ0SnNvblRvSXRlbURhdGEoZGF0YSk7XG4gICAgICAgIHNldGN1c3RvbWVyc0RhdGEocmVzdWx0KVxuICAgICAgfSlcbiAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJFcnJvciBmZXRjaGluZyBkYXRhOiBcIiwgZXJyb3IpO1xuICAgICAgfSk7XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8T3JnRGlhZ3JhbVxuICAgICAgICBjZW50ZXJPbkN1cnNvcj17dHJ1ZX1cbiAgICAgICAgY29uZmlnPXt7XG4gICAgICAgICAgY3VzdG9tZXJzRGF0YSxcbiAgICAgICAgICBjdXJzb3JJdGVtLFxuICAgICAgICAgIHBhZ2VGaXRNb2RlOiBQYWdlRml0TW9kZS5BdXRvU2l6ZSxcbiAgICAgICAgICBzZWxlY3Rpb25QYXRoTW9kZTogU2VsZWN0aW9uUGF0aE1vZGUuTm9uZSxcbiAgICAgICAgICBzZWxlY3RlZEl0ZW1zOiBbM10sXG5cbiAgICAgICAgICBhdXRvU2l6ZU1pbmltdW06IHsgd2lkdGg6IDEwMjQsIGhlaWdodDogNzY4IH0sXG4gICAgICAgICAgYXV0b1NpemVNYXhpbXVtOiB7IHdpZHRoOiAxOTIwLCBoZWlnaHQ6IDEwODAgfSxcbiAgICAgICAgICB2ZXJ0aWNhbEFsaWdubWVudDogVmVydGljYWxBbGlnbm1lbnRUeXBlLk1pZGRsZSxcbiAgICAgICAgICBob3Jpem9udGFsQWxpZ25tZW50OiBIb3Jpem9udGFsQWxpZ25tZW50VHlwZS5MZWZ0LFxuICAgICAgICAgIGNoaWxkcmVuUGxhY2VtZW50VHlwZTogQ2hpbGRyZW5QbGFjZW1lbnRUeXBlLlZlcnRpY2FsLFxuICAgICAgICAgIGxlYXZlc1BsYWNlbWVudFR5cGU6IENoaWxkcmVuUGxhY2VtZW50VHlwZS5Ib3Jpem9udGFsLFxuICAgICAgICAgIG5hdmlnYXRpb25Nb2RlOiBFbmFibGVkLkZhbHNlLFxuICAgICAgICAgIGhhc1NlbGVjdG9yQ2hlY2tib3g6IEVuYWJsZWQuRmFsc2UsXG4gICAgICAgICAgaGFzQnV0dG9uczogRW5hYmxlZC5GYWxzZSxcbiAgICAgICAgICBidXR0b25zUGFuZWxTaXplOiA0MCxcbiAgICAgICAgICBkZWZhdWx0VGVtcGxhdGVOYW1lOiBcImluZm9cIixcblxuICAgICAgICAgIHRlbXBsYXRlczogW3tcbiAgICAgICAgICAgIG5hbWU6IFwiaW5mb1wiLFxuICAgICAgICAgICAgaXRlbVNpemU6IHsgd2lkdGg6IDE1MCwgaGVpZ2h0OiAxMDAgfSxcbiAgICAgICAgICAgIGhpZ2hsaWdodEJvcmRlcldpZHRoOiAyLFxuICAgICAgICAgICAgaGlnaGxpZ2h0UGFkZGluZzogeyBsZWZ0OiA0LCB0b3A6IDQsIHJpZ2h0OiA0LCBib3R0b206IDQgfSxcbiAgICAgICAgICAgIGN1cnNvclBhZGRpbmc6IHsgbGVmdDogMywgdG9wOiAzLCByaWdodDogMywgYm90dG9tOiAzIH0sXG4gICAgICAgICAgICBjdXJzb3JCb3JkZXJXaWR0aDogMixcblxuICAgICAgICAgICAgb25JdGVtUmVuZGVyOiAoeyBjb250ZXh0OiBpdGVtQ29uZmlnIH0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaGFzQ2hpbGRyZW4gPSBjdXN0b21lcnNEYXRhLmZpbHRlcihpdGVtID0+IGl0ZW0ucGFyZW50ID09PSBpdGVtQ29uZmlnLmlkKS5sZW5ndGggPiAwO1xuICAgICAgICAgICAgICBjb25zdCBpc0xlYWZOb2RlID0gIWhhc0NoaWxkcmVuO1xuXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgSW5mb1RlbXBsYXRlICR7aGFzQ2hpbGRyZW4gPyAnJyA6ICdjbGlja2FibGUnfSBgfVxuICAgICAgICAgICAgICAgICAgZGF0YS1lbnRpdHk9e2l0ZW1Db25maWcuaWR9XG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0xlYWZOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ/CfmoAgIH4gdmFsdWU6ICwnLCBpdGVtQ29uZmlnLmlkLCAnOicsIGl0ZW1Db25maWcuZGVzY3JpcHRpb24pXG4gICAgICAgICAgICAgICAgICAgICAgLy8gJCgnI2VudGl0eScpLmRhdGEoJ2lkJywgYCR7aXRlbUNvbmZpZy5pZH1gKVxuICAgICAgICAgICAgICAgICAgICAgIC8vICQoJyNlbnRpdHknKS5kYXRhKCd2YWx1ZScsIGAke2l0ZW1Db25maWcuZGVzY3JpcHRpb259YClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfX0+XG4gICAgICAgICAgICAgICAgICA8Tm9kZUNhcmRcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e2l0ZW1Db25maWcudGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uPXtpdGVtQ29uZmlnLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgICAgICAgICBkYXRhPXtjdXN0b21lcnNEYXRhfVxuICAgICAgICAgICAgICAgICAgICBpdGVtQ29uZmlnPXtpdGVtQ29uZmlnfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfV0sXG5cbiAgICAgICAgICBpdGVtczogY3VzdG9tZXJzRGF0YS5tYXAoKGl0ZW0pID0+ICh7XG4gICAgICAgICAgICBpZDogaXRlbS5pZCxcbiAgICAgICAgICAgIHBhcmVudDogaXRlbS5wYXJlbnQsXG4gICAgICAgICAgICB0aXRsZTogaXRlbS50aXRsZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLmRlc2NyaXB0aW9uLFxuICAgICAgICAgIH0pKSxcbiAgICAgICAgfX0gc2NhbGU9ezF9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9yZzsiLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmZ1bmN0aW9uIEJ1dHRvbigpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgICA8QnV0dG9uPmNsaWNrIG1lIDwvQnV0dG9uPlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJ1dHRvbiJdLCJuYW1lcyI6WyJ1c2VTdHlsZXMiLCJtYWtlU3R5bGVzIiwiY2FyZCIsIndpZHRoIiwiaGVpZ2h0IiwidHJhbnNpdGlvbiIsImxlYWZOb2RlIiwiY3Vyc29yIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyIiwiTm9kZUNhcmQiLCJwcm9wcyIsIl9wcm9wcyR0aXRsZSIsInRpdGxlIiwiX3Byb3BzJGRlc2NyaXB0aW9uIiwiZGVzY3JpcHRpb24iLCJkYXRhIiwiaXRlbUNvbmZpZyIsImNsYXNzZXMiLCJoYXNDaGlsZHJlbiIsImZpbHRlciIsIml0ZW0iLCJwYXJlbnQiLCJpZCIsImxlbmd0aCIsImlzTGVhZk5vZGUiLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJDYXJkIiwiY2xhc3NOYW1lIiwiY29uY2F0Iiwic3R5bGUiLCJDYXJkSGVhZGVyIiwic3giLCJib3JkZXJCb3R0b20iLCJ0ZXh0VHJhbnNmb3JtIiwicGFkZGluZ1JpZ2h0IiwidGl0bGVUeXBvZ3JhcGh5UHJvcHMiLCJmb250U2l6ZSIsImZvbnRXZWlnaHQiLCJ0ZXh0QWxpZ24iLCJDYXJkQ29udGVudCIsIlR5cG9ncmFwaHkiLCJ2YXJpYW50IiwiY29sb3IiLCJjb252ZXJ0SnNvblRvSXRlbURhdGEiLCJpdGVtRGF0YUFycmF5IiwiYXBwZW5kSnNvbkRhdGEiLCJvcmdhbml6YXRpb25JRCIsIm9yZ2FuaXphdGlvbkNhdGVnb3J5Iiwib3JnYW5pemF0aW9uTmFtZSIsInB1c2giLCJjaGlsZHJlbiIsImkiLCJjaGlsZCIsImNvbnNvbGUiLCJsb2ciLCJPcmciLCJfdXNlU3RhdGUiLCJ1c2VTdGF0ZSIsIl91c2VTdGF0ZTIiLCJfc2xpY2VkVG9BcnJheSIsImN1c3RvbWVyc0RhdGEiLCJzZXRjdXN0b21lcnNEYXRhIiwiX3VzZVN0YXRlMyIsIl91c2VTdGF0ZTQiLCJjdXJzb3JJdGVtIiwic2V0Q3Vyc29ySXRlbSIsIl91c2VTdGF0ZTUiLCJfdXNlU3RhdGU2IiwiaW5kZXgiLCJzZXRJbmRleCIsInVzZUVmZmVjdCIsImZldGNoIiwidGhlbiIsInJlc3BvbnNlIiwianNvbiIsInJlc3VsdCIsImNhdGNoIiwiZXJyb3IiLCJPcmdEaWFncmFtIiwiY2VudGVyT25DdXJzb3IiLCJjb25maWciLCJwYWdlRml0TW9kZSIsIlBhZ2VGaXRNb2RlIiwiQXV0b1NpemUiLCJzZWxlY3Rpb25QYXRoTW9kZSIsIlNlbGVjdGlvblBhdGhNb2RlIiwiTm9uZSIsInNlbGVjdGVkSXRlbXMiLCJhdXRvU2l6ZU1pbmltdW0iLCJhdXRvU2l6ZU1heGltdW0iLCJ2ZXJ0aWNhbEFsaWdubWVudCIsIlZlcnRpY2FsQWxpZ25tZW50VHlwZSIsIk1pZGRsZSIsImhvcml6b250YWxBbGlnbm1lbnQiLCJIb3Jpem9udGFsQWxpZ25tZW50VHlwZSIsIkxlZnQiLCJjaGlsZHJlblBsYWNlbWVudFR5cGUiLCJDaGlsZHJlblBsYWNlbWVudFR5cGUiLCJWZXJ0aWNhbCIsImxlYXZlc1BsYWNlbWVudFR5cGUiLCJIb3Jpem9udGFsIiwibmF2aWdhdGlvbk1vZGUiLCJFbmFibGVkIiwiRmFsc2UiLCJoYXNTZWxlY3RvckNoZWNrYm94IiwiaGFzQnV0dG9ucyIsImJ1dHRvbnNQYW5lbFNpemUiLCJkZWZhdWx0VGVtcGxhdGVOYW1lIiwidGVtcGxhdGVzIiwibmFtZSIsIml0ZW1TaXplIiwiaGlnaGxpZ2h0Qm9yZGVyV2lkdGgiLCJoaWdobGlnaHRQYWRkaW5nIiwibGVmdCIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwiY3Vyc29yUGFkZGluZyIsImN1cnNvckJvcmRlcldpZHRoIiwib25JdGVtUmVuZGVyIiwiX3JlZiIsImNvbnRleHQiLCJvbkNsaWNrIiwiZXZlbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJpdGVtcyIsIm1hcCIsInNjYWxlIiwiQnV0dG9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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
