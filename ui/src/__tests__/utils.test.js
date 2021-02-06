import Path from '../utils/path.js';

/* eslint-disable */
const isEmptyTest = (str, expected) => {
	let result = Path.isEmpty(str);
	expect(result).toEqual(expected);
}

const testPossibleEmptyValues = [undefined, null, '', ' '];

describe('Utilities library tests (src/utils/...', () => {
	describe('Testing Path functions', () => {
		
		describe('Path.isEmpty() function', () => {
			it('should return true since string is empty', () => {
				testPossibleEmptyValues.forEach((value) => {
					isEmptyTest(value, true);
				})
			});

			it('should return false since path is not empty', () => {
				const possibleValues = ['aaa', '777', '...'];
				possibleValues.forEach((value) => {
					isEmptyTest(value, false);
				})
			});
		});

		describe('Path.standardizedPath(): standardizedPath function', () => {
			it('should return empty value', () => {
				testPossibleEmptyValues.forEach((value) => {
					const result = Path.standardizedPath(value);
					expect(result).toEqual('');
				})
			});

			it('should return upper case standardized value', () => {
				const expected = 'BLOOMBERG/CAX/2020/01';
				const possibleValues = ['///BLOOMBERG/CAX/2020/01///', 'bloomberg/CAX//2020/01/', '/BLOOMBERG/cax/2020/01', 'BLOOMBERG/CAX/2020/01///',];
				possibleValues.forEach((value) => {
					const result = Path.standardizedPath(value);
					expect(result).toEqual(expected);
				})
			});
		});
		describe('Path.asArray(): ', () => {
			it('should return default ["root"] array if input is empty', () => {
				testPossibleEmptyValues.forEach((value) => {
					const result = Path.asArray(value);
					expect(result).toEqual(['root']);
				})
			});
			it('should return broken down array with valid path parts', () => {
				const input = 'BLOOMBERG//cax/2020//01';
				const expected = ["root", "BLOOMBERG", "BLOOMBERG/CAX", "BLOOMBERG/CAX/2020", "BLOOMBERG/CAX/2020/01"];
				const result = Path.asArray(input);
				expect(result).toEqual(expected);
			});
		});
	});
});