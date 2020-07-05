import React    from 'react';
import classes  from 'classnames';
import PropTypes from 'prop-types';

/**
 * React Bootstrap Tabs component
 * usage:
 * <Tabs selected="Tab 1">
 *     <Tab label="Tab 1">
 *         <div>Tab 1 contents!</div>
 *     </Tab>
 *     <Tab label="Tab 2">
 *         <div>Tab 2 contents!</div>
 *     </Tab>
 * </Tabs>
 */
class TabsComponent extends React.Component {

    static propTypes = {
        /**
         * The selected tab - either the index of it or the label string.  Defaults to tab 0 if not supplied
         */
        selected: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

        /**
         * Optional CSS class to apply to the Tabs component overall
         */
        className: PropTypes.string,

        /**
         * Optional CSS style to apply to the Tabs component overall
         */
        style: PropTypes.object,

        /**
         * Optional CSS class to apply to each tab header
         */
        headerClass: PropTypes.string,

        /**
         * Optional CSS style to apply to each tab header
         */
        headerStyle: PropTypes.object,
        
        /**
         * Optional CSS class to apply to the active tab header
         */
        activeHeaderClass: PropTypes.string,
        
        /**
         * Optional CSS style to apply to the active tab header
         */
        activeHeaderStyle: PropTypes.object,

        /**
         * Optional CSS class to apply to the content container for the currently selected tab
         */
        contentClass: PropTypes.string,
        
        /**
         * Optional CSS style to apply to the content container for the currently selected tab
         */
        contentStyle: PropTypes.object,

        /**
         * Optional method to call when a tab is selected.  Receive the tab index and tab label of the selected tab
         */
        onSelect: PropTypes.func,

        /**
         * The child tabs to display - either an array or an element
         */
        children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])

    }

    static defaultProps = {
        selected: 0
    }

    constructor(props) {
        super(props);

        this.state = {
            selected: this.props.selected
        };
    }

    //  UNSAFE_componentWillReceiveProps(nextProps) {
    //      this.setState({ selected: nextProps.selected });
    //  }

    static getDerivedStateFromProps(nextProps, prevState) {
        
        const onlyOneChild = !Array.isArray(nextProps.children);

        let selected = nextProps.selected;

        // Find the tab index - selected could be the index or could be the tab label
        let selectedIndex;
        if (typeof nextProps.selected === 'number') {
            selectedIndex = nextProps.selected;
            if (selectedIndex < 0) {
                console.warn(`tab index '${nextProps.selected}' < 0, defaulting to first tab`);
                selectedIndex = 0;
                selected = selectedIndex;
            }
            else {
                const tabCount = nextProps.children && nextProps.children.length || 1;
                if (selectedIndex > tabCount - 1) {
                    console.warn(`tab index '${nextProps.selected}' > number of tabs (${tabCount}, defaulting to last tab`);
                    selectedIndex = tabCount - 1;
                    selected = selectedIndex;
                }
            }
        }
        else {
            // selected is a string - should be the tab label so find the index of that tab
            const selectedLabel = nextProps.selected;
            selectedIndex = onlyOneChild ? 0: nextProps.children.findIndex((child) => selectedLabel === child.props.label);
            if (selectedIndex < 0) {
                console.warn(`tab '${nextProps.selected}' not found, defaulting to first tab`);
                selectedIndex = 0;
                selected = onlyOneChild ? nextProps.children.props.label : nextProps.children[selectedIndex].props.label;
            }
        }
        
        if (selected !== nextProps.selected) {
            return { selected: selected};
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.selected !== this.state.selected) {
            this.setState({selected: this.state.selected });
        }
    }

    render() {
        const classNames = classes('tabs', this.props.className);

        return (
            <div className={classNames} style={this.props.style}>
                {this._renderHeaders()}
                {this._renderContent()}
            </div>
        );
    }

    /**
     * Render the tab headers
     * @returns {any} null if there are no children or a <ul> of tabs
     */
    _renderHeaders() {
        if (this.props.children === undefined) {
            return null;
        }

        return (
            <ul role="tablist" className="nav nav-tabs">
                {Array.isArray(this.props.children) 
                    ? this.props.children.map(this._renderHeader.bind(this))
                    : this._renderHeader(this.props.children, 0)
                }
            </ul>
        );
    }

    /**
     * Render an individual header
     * @param {any} tab - the actual tab (a <Tab>)
     * @param {number} index - the index of the tab in the set of tabs
     * @returns {any} - the header for the tab
     */
    _renderHeader = (tab, index) => {
        let isActive = false;
        if (typeof this.state.selected === 'number') {
            isActive = this.state.selected == index;
        }
        else {
            isActive = this.state.selected === tab.props.label;
        }

        const customActiveHeaderClass = !isActive ? null : classes('active', this.props.activeHeaderClass, tab.props.activeHeaderClass);
        let linkClasses = classes('nav-link', this.props.headerClass, tab.props.headerClass, customActiveHeaderClass, {
            'disabled': tab.props.disabled
        });

        const customActiveHeaderStyle = !isActive ? null : Object.assign({}, this.props.activeHeaderStyle, tab.props.activeHeaderStyle);
        const linkStyle = Object.assign({}, this.props.headerStyle, tab.props.headerStyle, customActiveHeaderStyle);

        return (
            <li key={index} className="nav-item" >
                <a className={linkClasses} style={linkStyle} onClick={tab.props.disabled ? null : this._handleClick.bind(this, index)}>{tab.props.label}</a>
            </li>
        );
    };

    /**
     * Renders the content of the currently selected tab
     * @returns {any} The contents of the selected tab
     */
    _renderContent() {
        if (this.props.children === undefined) {
            return null;
        }

        const onlyOneChild = !Array.isArray(this.props.children);

        let selected = this.state.selected;

        // Find the tab index - selected could be the index or could be the tab label
        let selectedIndex;
        if (typeof selected === 'number') {
            selectedIndex = selected;
        }
        else {
            // selected is a string - should be the tab label so find the index of that tab
            const selectedLabel = this.state.selected;
            selectedIndex = onlyOneChild ? 0: this.props.children.findIndex((child) => selectedLabel === child.props.label);
        }

        const contentTab = onlyOneChild ? this.props.children : this.props.children[selectedIndex];
        const contentClassNames = classes('tab-content', this.props.contentClass, contentTab.props.className);
        const contentStyle = Object.assign({}, this.props.contentStyle, contentTab.props.style);

        return (
            <div className={contentClassNames} style={contentStyle}>
                {contentTab}
            </div>
        );
    }

    /**
     * A tab has been clicked on
     * @param {number} index  - the index of the tab
     * @param {Event} event  - the click event
     * @returns {void}
     */
    _handleClick(index, event) {
        event.preventDefault();
        this.setState({selected: index});
        if (this.props.onSelect !== undefined) {
            this.props.onSelect(index, this.props.children[index].props.label);
        }
    }
};

/**
 * React Bootstrap Tab component (to be contained by a <Tabs> component
 * usage:
 * <Tab label="Tab 1">
 *     <div>Tab 1 contents!</div>
 * </Tab>
 */
class TabComponent extends React.Component {

    static propTypes = {
        /**
         * Label to display as the tab header
         */
        label: PropTypes.string.isRequired,

        /**
         * Is this tab disabled?  Default: false
         */
        disabled: PropTypes.bool,

        /**
         * Optional CSS class to apply to the tab overall
         */
        className: PropTypes.string,

        /**
         * Optional CSS style to apply to the tab overall
         */
        style: PropTypes.object,

        /**
         * Optional CSS class to apply to the tab header
         */
        headerClass: PropTypes.string,
 
        /**
         * Optional CSS style to apply to the tab header
         */
        headerStyle: PropTypes.object,

        /**
         * Optional CSS style to apply to the active tab header
         */
        activeHeaderStyle: PropTypes.object,
        
        /**
         * Optional CSS class to apply to the tab header when active
         */
        activeHeaderClass: PropTypes.string,
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (<div>{this.props.children}</div>);
    }
};

export {TabsComponent as Tabs, TabComponent as Tab};