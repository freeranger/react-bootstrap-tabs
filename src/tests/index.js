import React                          from 'react';
import { shallow, mount, configure }  from 'enzyme';
import Adapter                        from 'enzyme-adapter-react-16';
import { expect }                     from 'chai';
import sinon                          from 'sinon';

import {Tabs, Tab} from '../index';

configure({adapter: new Adapter()});

describe('Tabs', () => {

    describe('Markup', () => {

        it('should render no nav items if no tabs are supplied', () => {
            // act
            const wrapper = shallow(<Tabs></Tabs>);

            // assert
            expect(wrapper.find('.nav-item').length).to.equal(0);
        });

        it('should render one nav item and one nav-link if one tab is supplied', () => {
            // act
            const wrapper = shallow(<Tabs><Tab label="Tab 1"></Tab></Tabs>);

            // assert
            expect(wrapper.find('.nav-item').length).to.equal(1, 'nav-item count');
            expect(wrapper.find('.nav-link').length).to.equal(1, 'nav-link count');
        });

        it('should render two nav items and two nav-links if two tabs are supplied', () => {
            // act
            const wrapper = shallow(<Tabs selected={0}><Tab label="Tab 1"></Tab><Tab label="Tab 2"></Tab></Tabs>);

            // assert
            expect(wrapper.find('.nav-item').length).to.equal(2, 'nav-item count');
            expect(wrapper.find('.nav-link').length).to.equal(2, 'nav-link count');
        });

        it('should render an active link for the selected tab', () =>{
            // act
            const wrapper = shallow(<Tabs selected={1}><Tab label="Tab 1"></Tab><Tab label="Tab 2"></Tab></Tabs>);

            // assert
            const activeLink = wrapper.find('.nav-link.active');
            expect(activeLink.length).to.equal(1, 'expected exactly one active link');
            expect(activeLink.text()).to.equal('Tab 2', 'text');
        });

        it('should render the body of the first (default) tab when no active tab is specified', () => {
            // act
            const wrapper = mount(<Tabs><Tab label="Tab 1">This is tab 1</Tab><Tab label="Tab 2">This is tab 2</Tab></Tabs>);

            // assert
            expect(wrapper.find('.tab-content').text()).to.equal('This is tab 1');
        });

        it('should render the body of the initially active tab', () => {
            // act
            const wrapper = mount(<Tabs selected={1}><Tab label="Tab 1">This is tab 1</Tab><Tab label="Tab 2">This is tab 2</Tab></Tabs>);

            // assert
            expect(wrapper.find('.tab-content').text()).to.equal('This is tab 2');
        });

        it('should render the body of the tab when there is only one tab', () => {
            // act
            const wrapper = mount(<Tabs><Tab label="Tab 1">One lonely tab</Tab></Tabs>);

            // assert
            expect(wrapper.find('.tab-content').text()).to.equal('One lonely tab');
        });

        describe('custom classes', () => {

            it('should render a custom class for the tab container if one is specified', () => {
                // act
                const wrapper = mount(<Tabs className="class1"><Tab label="Tab 1" c>Tab 1</Tab></Tabs>);

                // assert
                expect(wrapper.hasClass('class1')).is.true;
            });

            it('should render a custom class for each tab header if one is specified at the tabs level', () => {
                // act
                const wrapper = mount(<Tabs headerClass="class1"><Tab label="Tab 1">Tab 1</Tab><Tab label="Tab 2">Tab 2</Tab></Tabs>);

                // assert
                expect(wrapper.find('.class1').length).to.equal(2);
            });

            it('should render a custom class for the tab content if one is specified at the tabs level', () => {
                // act
                const wrapper = mount(<Tabs contentClass="class1"><Tab label="Tab 1">Tab 1</Tab><Tab label="Tab 2">Tab 2</Tab></Tabs>);

                // assert
                expect(wrapper.find('.tab-content.class1').length).to.equal(1);
            });

            it('should render a custom class for the tab header if one is specified at the tab level', () => {
                // act
                const wrapper = mount(<Tabs><Tab label="Tab 1" headerClass="class1">Tab 1</Tab><Tab label="Tab 2">Tab 2</Tab></Tabs>);

                // assert
                expect(wrapper.find('.class1').length).to.equal(1);
            });

            it('should render a custom class for the tab content if one is specified at the tab level', () => {
                // act
                const wrapper = mount(<Tabs><Tab label="Tab 1" className="class1">Tab 1</Tab><Tab label="Tab 2">Tab 2</Tab></Tabs>);

                // assert
                expect(wrapper.find('.tab-content .class1').length).to.equal(1);
            });

            it('should render the custom class for the header at the tab level in preference to that at the tabs level if both are specified', () => {
                // act
                const wrapper = mount(<Tabs headerClass="class1"><Tab label="Tab 1" headerClass="class2">Tab 1</Tab><Tab label="Tab 2">Tab 2</Tab></Tabs>);

                // assert
                expect(wrapper.find('.class2').length).to.equal(1);
            });

            it('should render the custom class for content at the tab level in preference to that at the tabs level if both are specified', () => {
                // act
                const wrapper = mount(<Tabs contentClass="class1"><Tab label="Tab 1" className="class2">Tab 1</Tab><Tab label="Tab 2">Tab 2</Tab></Tabs>);

                // assert
                expect(wrapper.find('.tab-content .class2').length).to.equal(1);
            });
        });

        describe('custom styles', () => {

            it('should render a custom style for the tab container if one is specified', () => {
                // act
                const wrapper = mount(<Tabs style={{color:'blue'}}><Tab label="Tab 1" c>Tab 1</Tab></Tabs>);

                // assert
                expect(wrapper.getDOMNode().getAttribute('style')).to.equal('color: blue;');
            });

            it('should render a custom style for each tab header if one is specified at the tabs level', () => {
                // act
                const wrapper = mount(<Tabs headerStyle={{color:'blue'}}><Tab label="Tab 1">Tab 1</Tab><Tab label="Tab 2">Tab 2</Tab></Tabs>);

                // assert
                const actual = wrapper.find('.nav-item a');
                expect(actual.length).to.equal(2);
                actual.forEach(header => {
                    expect(header.getDOMNode().getAttribute('style')).to.equal('color: blue;');
                });
            });

            it('should render a custom style for the tab content if one is specified at the tabs level', () => {
                // act
                const wrapper = mount(<Tabs contentStyle={{color:'blue'}}><Tab label="Tab 1">Tab 1</Tab></Tabs>);

                // assert
                const actual = wrapper.find('.tab-content');
                expect(actual.length).to.equal(1);
                expect(actual.getDOMNode().getAttribute('style')).to.equal('color: blue;');
            });

            it('should render a custom style for the tab header if one is specified at the tab level', () => {
                // act
                const wrapper = mount(<Tabs><Tab label="Tab 1" headerStyle={{color:'blue'}}>Tab 1</Tab><Tab label="Tab 2">Tab 2</Tab></Tabs>);

                // assert
                const actual = wrapper.find('.nav-item a');
                expect(actual.length).to.equal(2);
                // The first one will have a custom style but not the second
                expect(actual.first().getDOMNode().getAttribute('style')).to.equal('color: blue;');
                expect(actual.last().getDOMNode().getAttribute('style')).to.equal(null);

            });

            it('should render a custom style for the tab content if one is specified at the tab level', () => {
                // act
                const wrapper = mount(<Tabs><Tab label="Tab 1" style={{color:'blue'}}>Tab 1</Tab><Tab label="Tab 2">Tab 2</Tab></Tabs>);

                // assert
                const actual = wrapper.find('.tab-content');
                expect(actual.length).to.equal(1);
                expect(actual.getDOMNode().getAttribute('style')).to.equal('color: blue;');
            });

            it('should render the custom style for the header at the tab level in preference to that at the tabs level if both are specified for the same value', () => {
                // act
                const wrapper = mount(<Tabs headerStyle={{color:'blue'}}><Tab label="Tab 1" headerStyle={{color:'red'}}>Tab 1</Tab><Tab label="Tab 2">Tab 2</Tab></Tabs>);

                // assert
                const actual = wrapper.find('.nav-item a');
                expect(actual.length).to.equal(2);
                // The first one will have a the Tab level colour, but the second will have the Tabs level one
                expect(actual.first().getDOMNode().getAttribute('style')).to.equal('color: red;');
                expect(actual.last().getDOMNode().getAttribute('style')).to.equal('color: blue;');
            });

            it('should merge the custom style for the header at the tab level with that at the tabs level if both are specified for different values', () => {
                // act
                const wrapper = mount(<Tabs headerStyle={{backgroundColor:'blue'}}><Tab label="Tab 1" headerStyle={{color:'red'}}>Tab 1</Tab><Tab label="Tab 2">Tab 2</Tab></Tabs>);

                // assert
                const actual = wrapper.find('.nav-item a');
                expect(actual.length).to.equal(2);
                // The first one will have a custom style but not the second
                expect(actual.first().getDOMNode().getAttribute('style')).to.equal('background-color: blue; color: red;');
            });

            it('should render the custom style for content at the tab level in preference to that at the tabs level if both are specified for the same value', () => {
                // act
                const wrapper = mount(<Tabs contentStyle={{color:'blue'}}><Tab label="Tab 1" style={{color:'red'}}>Tab 1</Tab><Tab label="Tab 2">Tab 2</Tab></Tabs>);

                // assert
                const actual = wrapper.find('.tab-content');

                expect(actual.getDOMNode().getAttribute('style')).to.equal('color: red;');
            });

            it('should merge the custom style for content at the tab level with that at the tabs level if both are specified for different values', () => {
                // act
                const wrapper = mount(<Tabs contentStyle={{backgroundColor:'blue'}}><Tab label="Tab 1" style={{color:'red'}}>Tab 1</Tab><Tab label="Tab 2">Tab 2</Tab></Tabs>);

                // assert
                const actual = wrapper.find('.tab-content');

                expect(actual.getDOMNode().getAttribute('style')).to.equal('background-color: blue; color: red;');
            });
        });
    });

    describe('behaviour', () => {

        it('should default to selecting the first tab if selected is not supplied', () => {
            // act
            const wrapper = shallow(<Tabs><Tab label="Tab 1"></Tab><Tab label="Tab 2"></Tab></Tabs>);

            // assert
            expect(wrapper.state().selected).to.equal(0);
        });

        it('should select the provided tab by index if a number is supplied', () => {
            // act
            const wrapper = shallow(<Tabs selected={1}><Tab label="Tab 1"></Tab><Tab label="Tab 2"></Tab></Tabs>);

            // assert
            expect(wrapper.state().selected).to.equal(1);
        });

        it('should select the provided tab by label if a string is supplied', () => {
            // act
            const wrapper = shallow(<Tabs selected="Tab 2"><Tab label="Tab 1"></Tab><Tab label="Tab 2"></Tab></Tabs>);

            // assert
            expect(wrapper.state().selected).to.equal('Tab 2');
        });

        it('should select the first tab if the selected index < 0', () =>{
            // act
            const wrapper = mount(<Tabs selected={-1}><Tab label="Tab 1"></Tab><Tab label="Tab 2"></Tab></Tabs>);

            // assert
            expect(wrapper.state().selected, wrapper.html()).to.equal(0);
        });

        it('should select the last tab if the selected index > the number of tabs - 41', () =>{
            // act
            const wrapper = shallow(<Tabs selected={2}><Tab label="Tab 1"></Tab><Tab label="Tab 2"></Tab></Tabs>);

            // assert
            expect(wrapper.state().selected).to.equal(1);
        });

        it('should select the first tab if the provided label does not exist', () => {
            // act
            const wrapper = shallow(<Tabs selected="Non existing Tab"><Tab label="Tab 1"></Tab><Tab label="Tab 2"></Tab></Tabs>);

            // assert
            expect(wrapper.state().selected).to.equal('Tab 1');
        });

        it('should callback to onSelect with the tab index and label if an unselected tab is clicked', () => {
            // arrange
            const buttonClick = sinon.spy();
            const wrapper = shallow(
                <Tabs onSelect={buttonClick} selected={1}><Tab label="Tab 1"></Tab><Tab label="Tab 2"></Tab></Tabs>
            );

            // act
            wrapper.find('.nav-link').first().simulate('click', {preventDefault: () => undefined});

            // assert
            expect(buttonClick.calledOnce).to.equal(true, 'Not called once');
            expect(buttonClick.args[0][0]).to.equal(0, 'index');
            expect(buttonClick.args[0][1]).to.equal('Tab 1', 'label');
        });

        it('should change the currently active tab if an unselected tab is clicked', () => {
            // arrange
            const buttonClick = sinon.spy();
            const wrapper = shallow(
                <Tabs onSelect={buttonClick} selected={1}><Tab label="Tab 1"></Tab><Tab label="Tab 2"></Tab></Tabs>
            );

            // act
            wrapper.find('.nav-link').first().simulate('click', {preventDefault: () => undefined});

            // assert
            const activeLink = wrapper.find('.nav-link.active');
            expect(activeLink.length).to.equal(1);
            expect(activeLink.text()).to.equal('Tab 1');
        });

        it('should render the body of the active tab when the active tab changes', () => {
            // arrange
            const wrapper = mount(<Tabs selected={1}><Tab label="Tab 1">This is tab 1</Tab><Tab label="Tab 2">This is tab 2</Tab></Tabs>);

            // act
            wrapper.find('.nav-link').first().simulate('click', {preventDefault: () => undefined});

            // assert
            expect(wrapper.find('.tab-content').text()).to.equal('This is tab 1');
        });

        it('should not callback to onSelect if the currently selected tab is clicked', () => {

            // arrange
            const buttonClick = sinon.spy();
            const wrapper = shallow(
                <Tabs onSelect={buttonClick} selected={0}><Tab label="Tab 1"></Tab><Tab label="Tab 2"></Tab></Tabs>
            );

            // act
            wrapper.find('.nav-link').first().simulate('click', {preventDefault: () => undefined});

            // assert
            expect(buttonClick.calledOnce).to.equal(true);
        });

        it('should not callback to onSelect if a disabled tab is clicked', () => {

            // arrange
            const buttonClick = sinon.spy();
            const wrapper = shallow(
                <Tabs onSelect={buttonClick} selected={1}><Tab label="Tab 1" disabled></Tab><Tab label="Tab 2"></Tab></Tabs>
            );

            // act
            wrapper.find('.nav-link').first().simulate('click', {preventDefault: () => undefined});

            // assert
            expect(buttonClick.called).to.equal(false);
        });

        it('should change the selected prop when setProps is called', () => {
            // arrange
            const wrapper = mount(<Tabs selected={0}><Tab label="Tab 1"></Tab><Tab label="Tab 2"></Tab></Tabs>);
            expect(wrapper.props().selected).to.equal(0);

            // act
            wrapper.setProps({selected: 1});

            // assert
            expect(wrapper.props().selected).to.equal(1);
        });

        it('should call componentDidUpdate when a property changes', () => {
            // arrange
            sinon.spy(Tabs.prototype, 'componentDidUpdate');
            const wrapper = mount(<Tabs selected={0}><Tab label="Tab 1"></Tab><Tab label="Tab 2"></Tab></Tabs>);

            // act
            wrapper.setProps({selected: 1});

            // assert
            // The below line doesn't work with the version of enzyme being referenced
            // https://github.com/enzymejs/enzyme/issues/1690
            expect(Tabs.prototype.componentDidUpdate.calledOnce).to.be.true;
            Tabs.prototype.componentDidUpdate.restore();
        });

    });
});

describe('Tab', () => {

    it('should have a label prop', () => {
        const wrapper = mount(<Tab label="A tab"/>);
        expect(wrapper.props()).to.have.property('label');
    });

    it('should not be disabled by default', () =>{
        const wrapper = shallow(<Tab label="A tab"/>);
        expect(wrapper.props().disabled).to.not.be.true;
    });

    it('should be disabled if the disabled prop is supplied', () =>{
        const wrapper = mount(<Tab label="A tab" disabled />);
        expect(wrapper.props().disabled).to.be.true;
    });

    it('should have the supplied label prop', () => {
        const wrapper = mount(<Tab  label="A tab" />);
        expect(wrapper.props().label).to.equal('A tab');
    });
});