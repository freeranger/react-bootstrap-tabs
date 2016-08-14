import React    from 'react';
import classes  from 'classnames';

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
        selected: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),

        /**
         * Optional CSS class to apply to the component overall
         */
        className: React.PropTypes.string,

        /**
         * Optional CSS class to apply to each tab header
         */
        headerClass: React.PropTypes.string,

        /**
         * Optional CSS class to apply to the active tab header
         */
        activeHeaderClass: React.PropTypes.string,

        /**
         * Optional CSS class to apply to the content container for the currently selected tab
         */
        contentClass: React.PropTypes.string,

        /**
         * Optional method to call when a tab is selected.  Receive the tab index and tab label of the selected tab
         */
        onSelect: React.PropTypes.func,

        /**
         * At least one tab is required - otherwise there's no point rendering this!
         */
        children: React.PropTypes.oneOfType([React.PropTypes.array, React.PropTypes.element]).isRequired

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

    componentWillReceiveProps(nextProps) {
        this.setState({ selected: nextProps.selected });
    }

    render() {
        const classNames = classes('tabs', this.props.className);

        return (
            <div className={classNames}>
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
                {Array.isArray(this.props.children) ? this.props.children.map(this._renderHeader.bind(this))
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

        const customHeaderClass = tab.props.headerClass ? tab.props.headerClass : (this.props.headerClass ? this.props.headerClass : null);
        const customActiveHeaderClass = !isActive ? null : tab.props.activeHeaderClass || tab.props.activeHeaderClass || 'active';
        let linkClasses = classes('nav-link', customHeaderClass, customActiveHeaderClass, {
            'disabled': tab.props.disabled
        });

        return (
            <li key={index} className="nav-item">
                <a className={linkClasses} onClick={tab.props.disabled ? null : this._handleClick.bind(this, index)}>{tab.props.label}</a>
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
            if (selectedIndex < 0) {
                console.warn(`tab index '${this.state.selected}' < 0, defaulting to first tab`);
                selectedIndex = 0;
                selected = selectedIndex;
            }
            else {
                const tabCount = this.props.children.length || 1;
                if (selectedIndex > tabCount - 1) {
                    console.warn(`tab index '${this.state.selected}' > number of tabs (${tabCount}, defaulting to last tab`);
                    selectedIndex = tabCount - 1;
                    selected = selectedIndex;
                }
            }
        }
        else {
            // selected is a string - should be the tab label so find the index of that tab
            const selectedLabel = this.state.selected;
            selectedIndex = onlyOneChild ? 0: this.props.children.findIndex((child) => selectedLabel === child.props.label);
            if (selectedIndex < 0) {
                console.warn(`tab '${this.state.selected}' not found, defaulting to first tab`);
                selectedIndex = 0;
                selected = onlyOneChild ? this.props.children.props.label : this.props.children[selectedIndex].props.label;
            }
        }

        // If the selected tab has changed then we need to update the state
        if (selected !== this.state.selected) {
            this.setState({selected: selected});
        }

        const contentTab = onlyOneChild ? this.props.children : this.props.children[selectedIndex];
        const contentClassNames = classes('tab-content', contentTab.props.contentClass || this.props.contentClass);

        return (
            <div className={contentClassNames}>
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
        label: React.PropTypes.string.isRequired,

        /**
         * Is this tab disabled?  Default: false
         */
        disabled: React.PropTypes.bool,

        /**
         * Optional CSS class to apply to the tab header
         */
        headerClass: React.PropTypes.string,

        /**
         * Optional CSS class to apply to the tab header when active
         */
        activeHeaderClass: React.PropTypes.string,

        /**
         * Optional CSS class to apply to the content container when the tab is displayed
         */
        contentClass: React.PropTypes.string
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (<div>{this.props.children}</div>);
    }
};

export {TabsComponent as Tabs, TabComponent as Tab};