const standardized = (...fns) => (x) => fns.reduce((v, f) => f(v), x);
const Path = () => {
	const breakPathIntoArrayElements = (path) => {
		/**
			 * Breaking path into array
			 * @param  {String} path Ex: BLOOMBERG/CAX/2020/01
			 * @return {Array} ["root", "BLOOMBERG", "BLOOMBERG/CAX", "BLOOMBERG/CAX/2020", "BLOOMBERG/CAX/2020/01"]
		*/
		let array = ['root'];
		if (isEmpty(path)) return array;

		let str = '';
		path = makePathStandard(path);
		path.split('/').forEach((o, index) => {
			const divider = index === 0 ? '' : '/';
			str = str.concat(`${divider}${o}`);
			if(str !== '')
				array.push(str);
		});
		return array;
	}

	const makePathStandard = (path) => {
		/**
			 * 1. Uppercase returned string
			 * 2. Clean path from extra (double, triple) slashes,
			 * 3. Remove slashes at the front and end of the string
			 * @param  {String} path Ex: ///BLooMBERG/cax///2020/01//
			 * @return {String} BLOOMBERG/CAX/2020/01
		*/
		if (isEmpty(path)) return '';

		const toUppercase = (path) => path.toUpperCase();
		return standardized (
			toUppercase,
			replaceMultipleSlashesToSingle,
			removeFirstAndLastSlashesInPath
		)(path);
	}

	const removeFirstAndLastSlashesInPath = (path) => {
		/**
			 * Remove slashes at the front and end of the string
			 * @param  {String} path Ex: ///BLOOMBERG/CAX/2020/01/
			 * @return {String} BLOOMBERG/CAX/2020/01
		*/
		if (isEmpty(path)) return '';

		let result = ''.concat(path);
		return result.replace(/^\/+/g,'').replace(/\/+$/g,'');
	}

	const isEmpty = (path) => {
		/**
			 * Remove slashes at the front and end of the string
			 * @param  {String} path
			 * @return {Boolean} True or False
		*/
		if (!path) return true;
		path = path.trim().replace(/^\/+/g,'').replace(/\/+$/g,'');
		return path === '' ? true : false;
	}

	const replaceMultipleSlashesToSingle = (str) => str.replace(/\/+/g,'/');

	return {
		asArray: breakPathIntoArrayElements,
		standardizedPath: makePathStandard,
		isEmpty: isEmpty
	}
}
export default Path();