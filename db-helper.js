function getDBData(filename) {
	let data;
	try {
		data = JSON.parse(window.localStorage.getItem(filename));
	}
	catch(err) {
		console.log(err);
		data = null;
	}
	if (!data) {
		data = {
			created: '',
			updated: new Date(),
			info: {
				goal: {
					a2: 15,
					a3: 15,
					a4: 15,
					a5a: 5,
					a5b: 5,
					aoa: 10
				},
				collected: {
					a2: 0,
					a3: 0,
					a4: 0,
					a5a: 0,
					a5b: 0,
					aoa: 0
				},
				deadline: ''
			},
			records: []
		}
	}
	return data;
}
function saveDB(filename, data) {
	window.localStorage.setItem(filename, JSON.stringify(data));
}