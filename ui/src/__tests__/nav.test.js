import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Nav from '../pages/nav/index.js';
import NavigationTree from '../pages/nav/tree';
import { MockedProvider } from "@apollo/client/testing";
import { mocks } from '../data/vendors';
import mediaQuery from 'css-mediaquery';
const waitForExpect = require('wait-for-expect');

/* eslint-disable */
const mustHaveVendor = 'BLOOMBERG';
function createMatchMedia(width) {
	return query => ({
		matches: mediaQuery.match(query, { width }),
		addListener: () => {},
		removeListener: () => {},
	});
}

describe("Side Navigation Section", () => {
	describe("<Nav />", () => {
		let wrapper = null;
		beforeAll(() => {
			// set the screen width
			window.matchMedia = createMatchMedia(window.innerWidth);
			wrapper = mount(
				<MockedProvider mocks={mocks} addTypename={true}>
					<Nav />
				</MockedProvider>
			)
		});

		it('checks if Apollo Client retriving the data; render loading', () => {
			expect(wrapper.text()).toContain("Loading...");
		});

		it ('checks if we have NavigationTree page component instance', async () => {
			await act(async () => {
				await waitForExpect(() => {
					wrapper.update()
					expect(wrapper.find(NavigationTree).length).toEqual(1);
				});
			});
		});
	});

	describe("<NavigationTree />", () => {
		let props = null;
		let wrapper = null;
		beforeAll(() => {
			props = {
				data: mocks[0].result.data
			}
			wrapper = mount(
				<NavigationTree {...props} />
			)
		});

		it('checks if tree view renders correctly after the query method on Apollo Client executed', () => {
			setTimeout(() => {}, 200); // slight delay
			expect(wrapper.find(`li.${mustHaveVendor}`).length).toEqual(1);
		});

		it('makes sure that tree view could expand items; checking if onNodeToggle method is on the place and works', () => {
			// Lets assume that BLOOMBERG is a must have client
			setTimeout(() => {}, 200); // slight delay
			wrapper.find(`li.${mustHaveVendor}`).simulate('click'); // expand the nav item
			expect(wrapper.find(`li.${mustHaveVendor}`).hasClass('Mui-expanded')).toEqual(true);
		});
	});
});