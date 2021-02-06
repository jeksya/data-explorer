import React from 'react';
import { mount } from 'enzyme';
import LandingPage from '../pages/index';

/* eslint-disable */
jest.mock('@okta/okta-react', () => ({
	useOktaAuth: () => ({
		authState: { isAuthenticated: true},
		authService: { handleAuthentication: jest.fn() }
	})
}));

describe('App component', () => {
	it('checks if Landing Page component has an instance', () => {
		const wrapper = mount(<LandingPage />);
		expect(wrapper.find(LandingPage).length).toEqual(1);
	});
});
