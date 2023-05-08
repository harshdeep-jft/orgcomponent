'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React__default = require('react');
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

var React__default__namespace = /*#__PURE__*/_interopNamespace(React__default);
var React__default__default = /*#__PURE__*/_interopDefaultLegacy(React__default);
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
  return /*#__PURE__*/React__default__namespace.createElement(Card__default["default"], {
    className: "".concat(classes.card, " ").concat(isLeafNode ? classes.leafNode : ''),
    style: {
      backgroundColor: '#FFE5E5'
    }
  }, /*#__PURE__*/React__default__namespace.createElement(CardHeader__default["default"], {
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
  }), /*#__PURE__*/React__default__namespace.createElement(CardContent__default["default"], null, /*#__PURE__*/React__default__namespace.createElement(Typography__default["default"], {
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
  var _useState = React__default.useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    customersData = _useState2[0],
    setcustomersData = _useState2[1];
  var _useState3 = React__default.useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
    cursorItem = _useState4[0];
    _useState4[1];
  var _useState5 = React__default.useState(customersData.length),
    _useState6 = _slicedToArray(_useState5, 2);
    _useState6[0];
    _useState6[1];
  React__default.useEffect(function () {
    fetch("http://localhost:3000/items").then(function (response) {
      return response.json();
    }).then(function (data) {
      var result = convertJsonToItemData(data);
      setcustomersData(result);
    }).catch(function (error) {
      console.error("Error fetching data: ", error);
    });
  }, []);
  return /*#__PURE__*/React__default__default["default"].createElement("div", null, /*#__PURE__*/React__default__default["default"].createElement(basicprimitivesreact.OrgDiagram, {
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
          return /*#__PURE__*/React__default__default["default"].createElement("div", {
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
          }, /*#__PURE__*/React__default__default["default"].createElement(NodeCard, {
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
  return /*#__PURE__*/React__default__default["default"].createElement("div", null, /*#__PURE__*/React__default__default["default"].createElement(Button, null, "click me "));
}

exports.Button = Button;
exports.NodeCard = NodeCard;
exports.Org = Org;
