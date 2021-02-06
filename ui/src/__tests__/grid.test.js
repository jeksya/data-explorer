import React, {useEffect} from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import Body from '../pages/body/index.js';
import { GlobalContext, useGlobalDispatch } from '../context/index.js';
import { MockedProvider } from '@apollo/client/testing';
import { mocks } from '../data/files.js';
import { AgGridReact } from "@ag-grid-community/react";
import { NoDataForCurrentPath } from '../pages/messages.js';

const waitForExpect = require('wait-for-expect');

const ensureGridApiHasBeenSet = (gridInstance) => {
	return new Promise(function (resolve) {
		(function waitForGridReady() {
			if (gridInstance.gridApi) {
				resolve(gridInstance);
				return;
			}
			setTimeout(waitForGridReady, 100); // no luck? try again
		})();
	});
};
/* eslint-disable */
describe("Grid and Body components", () => {
	let BodyComponent = null;
	let wrapper = null;
	let agGridReact = null;

	beforeAll(async () => {
		// set time out to 15 sec
		jest.setTimeout(15000);

		const SetPathInBodyComponent = (props) => {
			const dispatch = useGlobalDispatch();
			// update path
			useEffect(() => {
				dispatch({
					type: 'PATH',
					payload: props.path
				});
			});
			return <Body />
		}
		BodyComponent = (props) => {
			// Set GraphQL with Body component
			return (
				<MockedProvider mocks={mocks} addTypename={true}>
					<GlobalContext>
						<SetPathInBodyComponent {...props}/>
					</GlobalContext>
				</MockedProvider>
			)
		}

		wrapper = mount(
			<BodyComponent path='BLOOMBERG/CAX/2020/01/01' />
		);
		await act(async () => {
			await waitForExpect(() => {
				wrapper.update()
				agGridReact = wrapper.find(AgGridReact).instance();

				ensureGridApiHasBeenSet(agGridReact)
					.then(() => done());
			});
		});
	});

	describe("<Body />", () => {
		it('makes sure that empty path returns no data found message', () => {
			const wrapperNoPath = mount(
				<BodyComponent path='' />
			);
			expect(wrapperNoPath.text()).toEqual(NoDataForCurrentPath());
		});
	});
	describe("<Grid />", () => {
		it('makes sure ag-grid component rendered if path is provided', () => {
			expect(wrapper.find(AgGridReact).length).toEqual(1);
		});
		it('makes sure ag-grid instance available and we can set row data in the grid.', async () =>  {
			act(() => {
				waitForExpect(() => {
					wrapper.update();
					const rowData = mocks[0].result.data.vendor.get_files;
					agGridReact.api.setRowData(rowData);
					const count = 0;
					agGridReact.api.forEachNode(node => {
						count++;
					});
					expect(count).toEqual(rowData.length);
				});
			});
		});
	});
});
