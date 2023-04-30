function getCmfileAll(prop) {
	let records = mydb.records.filter((val,idx,arr) => {
		return !val.removed;
	});
	if (!prop) return records;
	switch(prop.verb) {
		case 'only':
			return records.map((val,idx,arr) => {
				return val[prop.key];
			});
			break;
		default:
			console.log('No fond');
	}
}
function getCmfileByAging(aging, datas) {
	switch(aging) {
		case '5a':
			return datas.filter((val,idx,arr) => {
				return val.aging.flat === 5 && val.unbill.aging <= 3;
			});
			break;
		case '5b':
			return datas.filter((val,idx,arr) => {
				return val.aging.flat === 5 && val.unbill.aging > 3;
			});
			break;
		default:
			return datas.filter((val,idx,arr) => {
				return val.aging.flat === aging;
			});
	}
}
function removeCmfile(saleid) {
	let records = mydb.records;
	records.splice(getFileIndexBy('saleid', saleid), 1);
	mydb.records = records;
	mydb.persist();
}
function getCmfileWhere(key, value) {
	if (!DB.valid) {
		console.log('Data has change from give...');
		DB.reload();
	}
	return mydb.records[getFileIndexBy(key, value)];
}
function getFileIndexBy(key, value) {
	return mydb.records.findIndex(record => record[key] === value);
}
function getFileExist(key, value) {
	if (mydb.records.length === 0) return false;
	if (mydb.records.some(record => record[key] === value)) return true;
	else return false;
}
function cmfileUpdate(id, data) {
	if (!DB.valid) {
		console.log('Data has change...');
		DB.reload();
	}
	let updated = new Date();
	let records = mydb.records;
	records[getFileIndexBy('saleid', id)] = data;
	mydb.records = records;
	updatedAt();
	mydb.persist();

	function updatedAt() {
		updated = updated.toString();
		mydb.lastupdate = updated;
		Watcher.patch(updated);
		console.log('updating Watcher...');
	}
}
function cmfileAdd(data) {
	let records = mydb.records;
	records.push(data);
	mydb.records = records;
	mydb.persist();
}