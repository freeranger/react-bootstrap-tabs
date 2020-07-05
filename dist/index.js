(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'react', 'classnames', 'prop-types'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('react'), require('classnames'), require('prop-types'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.react, global.classnames, global.propTypes);
        global.index = mod.exports;
    }
})(this, function (exports, _react, _classnames, _propTypes) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Tab = exports.Tabs = undefined;

    var _react2 = _interopRequireDefault(_react);

    var _classnames2 = _interopRequireDefault(_classnames);

    var _propTypes2 = _interopRequireDefault(_propTypes);

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

            var _this = _possibleConstructorReturn(this, (TabsComponent.__proto__ || Object.getPrototypeOf(TabsComponent)).call(this, props));

            _this._renderHeader = function (tab, index) {
                var isActive = false;
                if (typeof _this.state.selected === 'number') {
                    isActive = _this.state.selected == index;
                } else {
                    isActive = _this.state.selected === tab.props.label;
                }

                var customActiveHeaderClass = !isActive ? null : (0, _classnames2.default)('active', _this.props.activeHeaderClass, tab.props.activeHeaderClass);
                var linkClasses = (0, _classnames2.default)('nav-link', _this.props.headerClass, tab.props.headerClass, customActiveHeaderClass, {
                    'disabled': tab.props.disabled
                });

                var customActiveHeaderStyle = !isActive ? null : Object.assign({}, _this.props.activeHeaderStyle, tab.props.activeHeaderStyle);
                var linkStyle = Object.assign({}, _this.props.headerStyle, tab.props.headerStyle, customActiveHeaderStyle);

                return _react2.default.createElement(
                    'li',
                    { key: index, className: 'nav-item' },
                    _react2.default.createElement(
                        'a',
                        { className: linkClasses, style: linkStyle, onClick: tab.props.disabled ? null : _this._handleClick.bind(_this, index) },
                        tab.props.label
                    )
                );
            };

            _this.state = {
                selected: _this.props.selected
            };
            return _this;
        }

        //  UNSAFE_componentWillReceiveProps(nextProps) {
        //      this.setState({ selected: nextProps.selected });
        //  }

        _createClass(TabsComponent, [{
            key: 'componentDidUpdate',
            value: function componentDidUpdate(prevProps, prevState) {
                if (prevState.selected !== this.state.selected) {
                    this.setState({ selected: this.state.selected });
                }
            }
        }, {
            key: 'render',
            value: function render() {
                var classNames = (0, _classnames2.default)('tabs', this.props.className);

                return _react2.default.createElement(
                    'div',
                    { className: classNames, style: this.props.style },
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
                if (this.props.children === undefined) {
                    return null;
                }

                var onlyOneChild = !Array.isArray(this.props.children);

                var selected = this.state.selected;

                // Find the tab index - selected could be the index or could be the tab label
                var selectedIndex = void 0;
                if (typeof selected === 'number') {
                    selectedIndex = selected;
                } else {
                    // selected is a string - should be the tab label so find the index of that tab
                    var selectedLabel = this.state.selected;
                    selectedIndex = onlyOneChild ? 0 : this.props.children.findIndex(function (child) {
                        return selectedLabel === child.props.label;
                    });
                }

                var contentTab = onlyOneChild ? this.props.children : this.props.children[selectedIndex];
                var contentClassNames = (0, _classnames2.default)('tab-content', this.props.contentClass, contentTab.props.className);
                var contentStyle = Object.assign({}, this.props.contentStyle, contentTab.props.style);

                return _react2.default.createElement(
                    'div',
                    { className: contentClassNames, style: contentStyle },
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
        }], [{
            key: 'getDerivedStateFromProps',
            value: function getDerivedStateFromProps(nextProps, prevState) {

                var onlyOneChild = !Array.isArray(nextProps.children);

                var selected = nextProps.selected;

                // Find the tab index - selected could be the index or could be the tab label
                var selectedIndex = void 0;
                if (typeof nextProps.selected === 'number') {
                    selectedIndex = nextProps.selected;
                    if (selectedIndex < 0) {
                        console.warn('tab index \'' + nextProps.selected + '\' < 0, defaulting to first tab');
                        selectedIndex = 0;
                        selected = selectedIndex;
                    } else {
                        var tabCount = nextProps.children && nextProps.children.length || 1;
                        if (selectedIndex > tabCount - 1) {
                            console.warn('tab index \'' + nextProps.selected + '\' > number of tabs (' + tabCount + ', defaulting to last tab');
                            selectedIndex = tabCount - 1;
                            selected = selectedIndex;
                        }
                    }
                } else {
                    // selected is a string - should be the tab label so find the index of that tab
                    var selectedLabel = nextProps.selected;
                    selectedIndex = onlyOneChild ? 0 : nextProps.children.findIndex(function (child) {
                        return selectedLabel === child.props.label;
                    });
                    if (selectedIndex < 0) {
                        console.warn('tab \'' + nextProps.selected + '\' not found, defaulting to first tab');
                        selectedIndex = 0;
                        selected = onlyOneChild ? nextProps.children.props.label : nextProps.children[selectedIndex].props.label;
                    }
                }

                if (selected !== nextProps.selected) {
                    return { selected: selected };
                }
                return null;
            }
        }]);

        return TabsComponent;
    }(_react2.default.Component);

    TabsComponent.propTypes = {
        /**
         * The selected tab - either the index of it or the label string.  Defaults to tab 0 if not supplied
         */
        selected: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),

        /**
         * Optional CSS class to apply to the Tabs component overall
         */
        className: _propTypes2.default.string,

        /**
         * Optional CSS style to apply to the Tabs component overall
         */
        style: _propTypes2.default.object,

        /**
         * Optional CSS class to apply to each tab header
         */
        headerClass: _propTypes2.default.string,

        /**
         * Optional CSS style to apply to each tab header
         */
        headerStyle: _propTypes2.default.object,

        /**
         * Optional CSS class to apply to the active tab header
         */
        activeHeaderClass: _propTypes2.default.string,

        /**
         * Optional CSS style to apply to the active tab header
         */
        activeHeaderStyle: _propTypes2.default.object,

        /**
         * Optional CSS class to apply to the content container for the currently selected tab
         */
        contentClass: _propTypes2.default.string,

        /**
         * Optional CSS style to apply to the content container for the currently selected tab
         */
        contentStyle: _propTypes2.default.object,

        /**
         * Optional method to call when a tab is selected.  Receive the tab index and tab label of the selected tab
         */
        onSelect: _propTypes2.default.func,

        /**
         * The child tabs to display - either an array or an element
         */
        children: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.element])

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

            return _possibleConstructorReturn(this, (TabComponent.__proto__ || Object.getPrototypeOf(TabComponent)).call(this, props));
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
        label: _propTypes2.default.string.isRequired,

        /**
         * Is this tab disabled?  Default: false
         */
        disabled: _propTypes2.default.bool,

        /**
         * Optional CSS class to apply to the tab overall
         */
        className: _propTypes2.default.string,

        /**
         * Optional CSS style to apply to the tab overall
         */
        style: _propTypes2.default.object,

        /**
         * Optional CSS class to apply to the tab header
         */
        headerClass: _propTypes2.default.string,

        /**
         * Optional CSS style to apply to the tab header
         */
        headerStyle: _propTypes2.default.object,

        /**
         * Optional CSS style to apply to the active tab header
         */
        activeHeaderStyle: _propTypes2.default.object,

        /**
         * Optional CSS class to apply to the tab header when active
         */
        activeHeaderClass: _propTypes2.default.string
    };
    ;

    exports.Tabs = TabsComponent;
    exports.Tab = TabComponent;
});