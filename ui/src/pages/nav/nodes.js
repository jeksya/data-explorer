/*
	Building treeview nodes for the left side navigation
*/
const Navigation = () => {

	const _sortArray = (array = [], field = null) => {
		if(array.lenght === 0) return [];
		return !field
			? [...array].sort((a, b) => a.localeCompare(b))
			: [...array].sort((a, b) => a[field].localeCompare(b[field]))
	}

	const _levels = ["source", "subsource", "year", "month", "day"];

	const _isLeaf = (depth) => depth && _levels[depth] === 'day' ? true : false;

	const vendorToTreeViewFormat = (data) => {

		const nodes = { id: 'root', name :"Vendors", children : [], leaf: false };

		if(!data || !data.vendors || data.vendors.length === 0) return nodes;

		const sortedData = _sortArray(data.vendors, "path");

		sortedData.forEach((o) => {
			let id = '';
			let depthCursor = nodes.children;
			_levels.forEach((property, depth) => {
				// each level
				if(o[property]) {
					let index;
					depthCursor.forEach((child,i) => {
						if (o[property] === child.name) {
							index = i;
						}
					});

					id = id + (id === '' ? '' : '/') + o[property];
					if (isNaN(index)) {
						depthCursor.push({id: id, name : o[property], children : [], leaf: _isLeaf(depth) });
						index = depthCursor.length - 1;
					}
					depthCursor = depthCursor[index].children;
				}
			});
		});
		return nodes;
	}
	return {
		nodes: vendorToTreeViewFormat
	}
};
export default Navigation();