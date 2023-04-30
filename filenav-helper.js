function filenavSetAging(datas) {
	myfilenav.datas = datas;
	$('#mya2btnc').text( CMFile.aging(2, myfilenav.datas).length );
	$('#mya3btnc').text( CMFile.aging(3, myfilenav.datas).length );
	$('#mya4btnc').text( CMFile.aging(4, myfilenav.datas).length );
	$('#mya5abtnc').text( CMFile.aging('5a', myfilenav.datas).length );
	$('#mya5bbtnc').text( CMFile.aging('5b', myfilenav.datas).length );
}
function filenavSetArea(aging) {
	myfilenav.aging = CMFile.aging(aging, myfilenav.datas);
	let areas = [... new Set(myfilenav.aging.map(item => item.area))];
	return makeArea(areas);

	function makeArea(areas) {
		let data = [];
		for (var i = areas.length - 1; i >= 0; i--) {
			let nd = myfilenav.aging.filter((val,idx,arr) => {
				return val.area === areas[i];
			});
			data.push({
				text: areas[i],
				callback: {type: 'click', handler: function() {
					$(this).addClass('active').siblings().removeClass('active');
					FileNav.setFocus(nd);
					FileNav.view();
				}},
				count: nd.length
			});
		}
		data.sort((a,b) => b.count - a.count);
		return data;
	}
}
function filenavSetPTP(aging) {
	myfilenav.aging = CMFile.aging(aging, myfilenav.datas);
	let ptps = [... new Set(myfilenav.aging.map(item => item.date.ptp))];
	return makePtps(ptps);

	function makePtps(ptps) {
		let data = [];
		for (var i = ptps.length - 1; i >= 0; i--) {
			let nd = myfilenav.aging.filter((val,idx,arr) => {
				return val.date.ptp === ptps[i];
			});
			let today = new Date().getDate();
			let txt = ptps[i].split('-');
			txt.splice(0,1);
			txt.reverse();
			if (today === parseInt(txt[0])) txt = 'today';
			else txt = txt.join(' / ');
			data.push({
				text: txt,
				callback: {type: 'click', handler: function() {
					$(this).addClass('active').siblings().removeClass('active');
					FileNav.setFocus(nd);
					FileNav.view();
				}},
				count: nd.length,
				date: new Date(ptps[i])
			});
		}
		if ($('#mycatbtn button.active').text().includes('ptp')) data.sort((a,b) => new Date(a.date) - new Date(b.date));
		else if ($('#mycatbtn button.active').text().includes('broken')) data.sort((a,b) => new Date(b.date) - new Date(a.date));
		return data;
	}
}