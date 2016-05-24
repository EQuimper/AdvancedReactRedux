import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, { expect } from 'chai';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery';

// Set up testing environment to run like a browser in the command line

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>'); // Fake the DOM
global.window = global.document.defaultView; // Fake the BROWSER
const $ = jquery(global.window); // Hook jQuery to the fake DOM

// Build 'renderComponent' helper that should render a given react class.

function renderComponent(ComponentClass, props, state) {
	const componentInstance = TestUtils.renderIntoDocument(
		<Provider store={createStore(reducers, state)}>
			<ComponentClass {...props}/>
		</Provider>
	);

	return $(ReactDOM.findDOMNode(componentInstance)); // Produces HTML
}

// Build helper for simulating event.

$.fn.simulate = function (eName, value) {
	if (value) {
		this.val(value);
	}
	TestUtils.Simulate[eName](this[0]);
};

// Set up Chai-jQuery

chaiJquery(chai, chai.util, $);

// Export

export { renderComponent, expect };