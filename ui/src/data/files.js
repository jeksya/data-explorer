
/* Data for unit tests */

import { FILES } from '../pages/body/grid.js';
export const mocks = [{
	request: {
		query: FILES
	},
	result: {
		data: {
			"vendor": {
				"get_files": [
					{
						"name": "bloomberg_20200101_1i4l0.csv",
						"version": "784941e2-2e8d-44c1-8c2d-a3ba664e6918",
						"path": "BLOOMBERG/CAX/2020/01/01",
						"created_on": "01/01/2020"
					},
					{
						"name": "bloomberg_20200101_2fdja.csv",
						"version": "d8b134f7-4584-482c-a370-6e675121928c",
						"path": "BLOOMBERG/CAX/2020/01/01",
						"created_on": "01/01/2020"
					},
					{
						"name": "bloomberg_20200101_3qv4c.csv",
						"version": "ac597b6f-a4ea-4808-b589-c7f2e519adb9",
						"path": "BLOOMBERG/CAX/2020/01/01",
						"created_on": "01/01/2020"
					},
					{
						"name": "bloomberg_20200101_4iw2r.csv",
						"version": "9e3c686b-c4be-46af-a71e-7fcd1a78b624",
						"path": "BLOOMBERG/CAX/2020/01/01",
						"created_on": "01/01/2020"
					}
				]
			}
		}
	}
}];