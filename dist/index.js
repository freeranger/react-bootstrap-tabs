(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'classnames'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('classnames'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.classnames);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _classnames) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Tab = exports.Tabs = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _classnames2 = _interopRequireDefault(_classnames);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var TabsComponent = function (_React$Component) {
        _inherits(TabsComponent, _React$Component);

        function TabsComponent(props) {
            _classCallCheck(this, TabsComponent);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TabsComponent).call(this, props));

            _this._renderHeader = function (tab, index) {
                var isActive = false;
                if (typeof _this.state.selected === 'number') {
                    isActive = _this.state.selected == index;
                } else {
                    isActive = _this.state.selected === tab.props.label;
                }

                var customHeaderClass = tab.props.headerClass ? tab.props.headerClass : _this.props.headerClass ? _this.props.headerClass : null;
                var customActiveHeaderClass = !isActive ? null : tab.props.activeHeaderClass || tab.props.activeHeaderClass || 'active';
                var linkClasses = (0, _classnames2.default)('nav-link', customHeaderClass, customActiveHeaderClass, {
                    'disabled': tab.props.disabled
                });

                return _react2.default.createElement(
                    'li',
                    { key: index, className: 'nav-item' },
                    _react2.default.createElement(
                        'a',
                        { className: linkClasses, onClick: tab.props.disabled ? null : _this._handleClick.bind(_this, index) },
                        tab.props.label
                    )
                );
            };

            _this.state = {
                selected: _this.props.selected
            };
            return _this;
        }

        _createClass(TabsComponent, [{
            key: 'componentWillReceiveProps',
            value: function componentWillReceiveProps(nextProps) {
                this.setState({ selected: nextProps.selected });
            }
        }, {
            key: 'render',
            value: function render() {
                var classNames = (0, _classnames2.default)('tabs', this.props.className);

                return _react2.default.createElement(
                    'div',
                    { className: classNames },
                    this._renderHeaders(),
                    this._renderContent()
                );
            }
        }, {
            key: '_renderHeaders',
            value: function _renderHeaders() {
                if (this.props.children === undefined) {
                    return null;
                }

                return _react2.default.createElement(
                    'ul',
                    { role: 'tablist', className: 'nav nav-tabs' },
                    Array.isArray(this.props.children) ? this.props.children.map(this._renderHeader.bind(this)) : this._renderHeader(this.props.children, 0)
                );
            }
        }, {
            key: '_renderContent',
            value: function _renderContent() {
                var _this2 = this;

                if (this.props.children === undefined) {
                    return null;
                }

                var onlyOneChild = !Array.isArray(this.props.children);

                var selected = this.state.selected;

                // Find the tab index - selected could be the index or could be the tab label
                var selectedIndex = void 0;
                if (typeof selected === 'number') {
                    selectedIndex = selected;
                    if (selectedIndex < 0) {
                        console.warn('tab index \'' + this.state.selected + '\' < 0, defaulting to first tab');
                        selectedIndex = 0;
                        selected = selectedIndex;
                    } else {
                        var tabCount = this.props.children.length || 1;
                        if (selectedIndex > tabCount - 1) {
                            console.warn('tab index \'' + this.state.selected + '\' > number of tabs (' + tabCount + ', defaulting to last tab');
                            selectedIndex = tabCount - 1;
                            selected = selectedIndex;
                        }
                    }
                } else {
                    (function () {
                        // selected is a string - should be the tab label so find the index of that tab
                        var selectedLabel = _this2.state.selected;
                        selectedIndex = onlyOneChild ? 0 : _this2.props.children.findIndex(function (child) {
                            return selectedLabel === child.props.label;
                        });
                        if (selectedIndex < 0) {
                            console.warn('tab \'' + _this2.state.selected + '\' not found, defaulting to first tab');
                            selectedIndex = 0;
                            selected = onlyOneChild ? _this2.props.children.props.label : _this2.props.children[selectedIndex].props.label;
                        }
                    })();
                }

                // If the selected tab has changed then we need to update the state
                if (selected !== this.state.selected) {
                    this.setState({ selected: selected });
                }

                var contentTab = onlyOneChild ? this.props.children : this.props.children[selectedIndex];
                var contentClassNames = (0, _classnames2.default)('tab-content', contentTab.props.contentClass || this.props.contentClass);

                return _react2.default.createElement(
                    'div',
                    { className: contentClassNames },
                    contentTab
                );
            }
        }, {
            key: '_handleClick',
            value: function _handleClick(index, event) {
                event.preventDefault();
                this.setState({ selected: index });
                if (this.props.onSelect !== undefined) {
                    this.props.onSelect(index, this.props.children[index].props.label);
                }
            }
        }]);

        return TabsComponent;
    }(_react2.default.Component);

    TabsComponent.propTypes = {
        /**
         * The selected tab - either the index of it or the label string.  Defaults to tab 0 if not supplied
         */
        selected: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.number, _react2.default.PropTypes.string]),

        /**
         * Optional CSS class to apply to the component overall
         */
        className: _react2.default.PropTypes.string,

        /**
         * Optional CSS class to apply to each tab header
         */
        headerClass: _react2.default.PropTypes.string,

        /**
         * Optional CSS class to apply to the active tab header
         */
        activeHeaderClass: _react2.default.PropTypes.string,

        /**
         * Optional CSS class to apply to the content container for the currently selected tab
         */
        contentClass: _react2.default.PropTypes.string,

        /**
         * Optional method to call when a tab is selected.  Receive the tab index and tab label of the selected tab
         */
        onSelect: _react2.default.PropTypes.func,

        /**
         * At least one tab is required - otherwise there's no point rendering this!
         */
        children: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.array, _react2.default.PropTypes.element]).isRequired

    };
    TabsComponent.defaultProps = {
        selected: 0
    };
    ;

    /**
     * React Bootstrap Tab component (to be contained by a <Tabs> component
     * usage:
     * <Tab label="Tab 1">
     *     <div>Tab 1 contents!</div>
     * </Tab>
     */

    var TabComponent = function (_React$Component2) {
        _inherits(TabComponent, _React$Component2);

        function TabComponent(props) {
            _classCallCheck(this, TabComponent);

            return _possibleConstructorReturn(this, Object.getPrototypeOf(TabComponent).call(this, props));
        }

        _createClass(TabComponent, [{
            key: 'render',
            value: function render() {
                return _react2.default.createElement(
                    'div',
                    null,
                    this.props.children
                );
            }
        }]);

        return TabComponent;
    }(_react2.default.Component);

    TabComponent.propTypes = {
        /**
         * Label to display as the tab header
         */
        label: _react2.default.PropTypes.string.isRequired,

        /**
         * Is this tab disabled?  Default: false
         */
        disabled: _react2.default.PropTypes.bool,

        /**
         * Optional CSS class to apply to the tab header
         */
        headerClass: _react2.default.PropTypes.string,

        /**
         * Optional CSS class to apply to the tab header when active
         */
        activeHeaderClass: _react2.default.PropTypes.string,

        /**
         * Optional CSS class to apply to the content container when the tab is displayed
         */
        contentClass: _react2.default.PropTypes.string
    };
    ;

    exports.Tabs = TabsComponent;
    exports.Tab = TabComponent;
});