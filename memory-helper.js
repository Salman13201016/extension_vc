function getMemoryData(filename) {
	let data;
	try {
		data = JSON.parse(window.localStorage.getItem(filename));
	}
	catch(err) {
		console.log(err);
		data = null;
	}
	return data;
}
function saveMemory(filename, data) {
	window.localStorage.setItem(filename, JSON.stringify(data));
}
function readMemory() {
	if (Memory.fetch('page') === Page.name && Memory.fetch('action') === 'fasu') {
		fetchAllSidByAgingUpdate();
		return;
	}
	if (Memory.fetch('page') === Page.name && Memory.fetch('action') === 'fetchAllSid') {
		fetchAllSidByAging();
		return;
	}
	if (Memory.fetch('page') === Page.name && Memory.fetch('action') === 'fetchAllSidUpdate') {
		fasbau();
		return;
	}
	if (Memory.fetch('page') === Page.name && Memory.fetch('action') === 'reqmoto') {
		Quick.moto(Memory.fetch('meta'));
		return;
	}
	if (Memory.fetch('page') === Page.name && Memory.fetch('action') === 'addfloat') {
		Quick.float(Memory.fetch('meta'));
		return;
	}
	if (Memory.fetch('page') === Page.name && Memory.fetch('action') === 'checkos') {
		Quick.os(Memory.fetch('meta'));
		return;
	}
	if (Memory.fetch('page') === Page.name && Memory.fetch('action') === "openfile") {
		Quick.file(Memory.fetch('meta'));
		return;
	}
	if (Memory.fetch('page') === Page.name && Memory.fetch('action') === 'bup') {
		ProgBar.show('updating files...', 1, CMFile.all().length);
		console.log('bup...');
		updateProcedure(Memory.fetch('meta').toUpdate, Memory.fetch('page'), Memory.fetch('meta').count, Memory.fetch('meta').removed);
		return;
	}
	if (Memory.fetch('page') === Page.name && Memory.fetch('action') === 'gfcba') {
		Fetcher.fetch();
		return;
	}
	if (Memory.fetch('page') === Page.name && Memory.fetch('action') === 'gufcba') {
		Fetcher.update();
		return;
	}
	if (Memory.fetch('page') === Page.name && Memory.fetch('action') === 'save') {
		let data = diggerSingle(Memory.fetch('meta')[0].aging, Memory.fetch('meta')[0].area);
		if (!CMFile.exist('saleid', data.saleid)) {
			CMFile.add(data);
			if (Memory.fetch('meta')[0].saleid === data.saleid) {
				mymemory.data.meta.shift();
				if (Memory.fetch('meta').length > 0) {
					Memory.put({
						page: 'listing',
						action: 'mso',
						meta: Memory.fetch('meta'),
						total: parseInt(Memory.fetch('total'))
					});
					// console.log('mem setted');
				} else {
					Memory.clear();
					// console.log('its cleared');
				}
				window.close();
			}
		}
		console.log(data);
		console.log(CMFile.exist('saleid', data.saleid));
		return;
		// console.log(diggerSingle());
	}
	if (Memory.fetch('page') === Page.name && Memory.fetch('action') === 'mso') {
		massSavingOps();
		return;
	}
}