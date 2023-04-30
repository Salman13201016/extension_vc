// ##################################################
// Fetching Files related
// ##################################################
function diggerSingle(age, area) {
	let rawsaleid = document.getElementById("ctl00_Content_lblBasic_Order").innerText.trim();
	let rawname = document.getElementById("ctl00_Content_txtBasic_CustName").value;
	let rawaging = document.getElementById("ctl00_Content_txtTotalMthAging").value;
	let rawoscurrent = document.getElementById('ctl00_Content_txtTotalCurrentOSAmt').value.split(' ')[1];
	let rawostotal = document.getElementById("ctl00_Content_txtTotalOutstanding").value.split(' ')[1];
	let rawostarget = document.getElementById("ctl00_Content_txtTargetOSAmt").value.split(' ')[1];
	let rawospaid = document.getElementById("ctl00_Content_txtTargetCollAmt").value.split(' ')[1];
	let rawproduct = document.getElementById("ctl00_Content_txtBasic_Product").value;
	let rawemergencyname = document.getElementById("ctl00_Content_txtEC_ContactName").value;
	let rawemergencyrelation = document.getElementById("ctl00_Content_txtEC_Relation").value;
	let rawemail = document.getElementById("ctl00_Content_txtCC_BiillingEmail").value.toLowerCase();
	let rawnric = document.getElementById("ctl00_Content_txtBasic_CustIC").value;
	let rawmonthly = document.getElementById("ctl00_Content_txtBasic_Rental").value;
	let rawlastservice = document.getElementById("ctl00_Content_txtBasic_LastService").value;
	let rawinstalldate = document.getElementById("ctl00_Content_txtBasic_InstDate").value;
	let rawcontractend = document.getElementById("ctl00_Content_txtContractEndDate").value;
	let rawobligation = document.getElementById('ctl00_Content_txtBasic_RentPeriod').value;

	let rawunbillaging = document.getElementById('ctl00_Content_txtUnbillMthAging').value.split(' ')[1];
	let rawunbilltotal = document.getElementById('ctl00_Content_txtUnbillAmt').value.split(' ')[1];

	let rawscheme = document.getElementById("ctl00_Content_txtBasic_RentalScheme").value;
	let rawaddrmail = document.getElementById("ctl00_Content_txtBasic_BillAddress").value;
	let rawaddrinst = document.getElementById("ctl00_Content_txtBasic_InstAddress").value;
	let rawcontact = diggerDigContact();
	let rawblacklist = false;

	if (rawname.includes('(BLACKLISTED)')) {
		rawblacklist = true;
		rawname = rawname.replace('(BLACKLISTED) ', '');
	}

	let data = {
		created: new Date(),
		updated: '',
		visit: false,
		saleid: rawsaleid.split(" ")[0],
		name: rawname,
		nric: rawnric,
		blacklist: rawblacklist,
		// area: rawaddrinst.match(/\d{5}\s(.+)\sMALAYSIA/)[1],
		area: area,
		obligation: rawobligation,
		scheme: rawscheme,
		rental: parseFloat(rawmonthly),
		aging: {
			raw: rawaging,
			flat: age
		},
		unbill: {
			aging: parseFloat(rawunbillaging),
			total: parseFloat(rawunbilltotal)
		},
		os: {
			current: parseFloat(rawoscurrent),
			total: parseFloat(rawostotal),
			target: parseFloat(rawostarget),
			paid: parseFloat(rawospaid)
		},
		addr: {
			mail: rawaddrmail,
			inst: rawaddrinst
		},
		product: rawproduct,
		emergency: {
			name: rawemergencyname,
			relation: rawemergencyrelation
		},
		email: rawemail,
		contact: rawcontact,
		notes : [],
		date: {
			lastservice: rawlastservice,
			install: rawinstalldate,
			end: rawcontractend,
			ptp: '',
			due: ''
		},
		broken: [],
		stage: {
			val: 1,
			ts: ''
		},
		float: 0.00
	}

	return data;
}
function diggerDigContact() {
	let result = [];
	let table = document.getElementById("ctl00_Content_RadGrid_Contact_ctl00");
	for (i = 1; i < table.rows.length; i++) {
		let detail = table.rows[i].cells[0].innerText;
		// if email skip
		if (detail.split("\n")[1].split(" : ")[1] === undefined || detail.split("\n")[1].split(" : ")[1].length < 5) {
			console.log(detail.split("\n")[1].split(" : ")[1]);
			continue;
		}
		if (detail.split("\n")[1].split(" : ")[1].includes("@")) {continue;}

		result.push(detail);
	}

	let contacts = result.map(function(value, index, array) {
		value = value.split("\n");
		let data = {
			name: value[0],
			rawtel: formattedTel(sanitizeTel(value[1].split(" : ")[1])),
			tel: sanitizeTel(value[1].split(" : ")[1])
		};
		return data;
	});

	let data = {
		default: 0,
		list: contacts
	};

	return data;
}
function sanitizeTel(rawtel) {
	if (rawtel.includes("-")) rawtel = rawtel.replace("-", "");
	if (rawtel.includes("+600")) rawtel = rawtel.replace("+600", "60");
	if (rawtel.includes("+")) rawtel = rawtel.replace("+", "");
	return rawtel;
}
function formattedTel(rawtel) {
	if (rawtel.includes('60')) rawtel = rawtel.replace('60', '+60-');
	return rawtel;
}
function getUpdateFileCountByAging() {
	let total = parseInt(document.getElementById("ctl00_Content_txtTotalTarget").innerHTML.split(" <br> ")[1].split(" : ")[1]);
	let a2, a3, a4, a5a, a5b;
	if (User.team === 'alpha') {
		try {
			a2 = parseFloat(document.getElementById("ctl00_Content_txtAging2").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
			a3 = parseFloat(document.getElementById("ctl00_Content_txtAging3").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
			a4 = parseFloat(document.getElementById("ctl00_Content_txtAging4").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
		}
		catch(err) {
			Snackbar.show('This CA is not ALPHA...');
			return;
		}
	} else {
		try {
			a5a = parseFloat(document.getElementById("ctl00_Content_txtAging5_Unbill1").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
			a5b = parseFloat(document.getElementById("ctl00_Content_txtAging5_Unbill2").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
		}
		catch(err) {
			Snackbar.show('This CA is not BRAVO...');
			return;
		}
	}
	updateCollected();
	function updateCollected() {
		let info = mydb.info;
		let collected = info.collected;
		if (User.team === 'alpha') {	
			collected.a2 = a2;
			collected.a3 = a3;
			collected.a4 = a4;
		} else {
			collected.a5a = a5a;
			collected.a5b = a5b;
		}
		collected.aoa = parseFloat(document.getElementById("ctl00_Content_txtTotalTarget").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace('RM ', '').replace(',', ''));
		info.collected = collected;
		mydb.info = info;
		mydb.updated = new Date();
		mydb.persist();
	}

	let cmf = CMFile.all();

	if (total === cmf.length) {
		//
		// console.log('update normal');
		updateProcedure(null, null, 0, 0);

	} else if (total > cmf.length) {
		if (!confirm('Save additional files?')) return;
		if (User.team === 'alpha') {
			let diff = parseInt(total) - cmf.length;
			let data = [];
			console.log('Diff is : ' + diff);
			
			r2 = CMFile.aging(2, cmf);
			r3 = CMFile.aging(3, cmf);
			r4 = CMFile.aging(4, cmf);

			if (r2.length < parseInt(document.getElementById("ctl00_Content_txtAging2").innerHTML.split(" <br> ")[1].split(" : ")[1])) {
				data.push({
					aging: 2,
					diff: parseInt(document.getElementById("ctl00_Content_txtAging2").innerHTML.split(" <br> ")[1].split(" : ")[1]) - r2.length,
					total: parseInt(document.getElementById("ctl00_Content_txtAging2").innerHTML.split(" <br> ")[1].split(" : ")[1]),
					done: false
				});
			}
			if (r3.length < parseInt(document.getElementById("ctl00_Content_txtAging3").innerHTML.split(" <br> ")[1].split(" : ")[1])) {
				data.push({
					aging: 3,
					diff: parseInt(document.getElementById("ctl00_Content_txtAging3").innerHTML.split(" <br> ")[1].split(" : ")[1]) - r3.length,
					total: parseInt(document.getElementById("ctl00_Content_txtAging3").innerHTML.split(" <br> ")[1].split(" : ")[1]),
					done: false
				});
			}
			if (r4.length < parseInt(document.getElementById("ctl00_Content_txtAging4").innerHTML.split(" <br> ")[1].split(" : ")[1])) {
				data.push({
					aging: 4,
					diff: parseInt(document.getElementById("ctl00_Content_txtAging4").innerHTML.split(" <br> ")[1].split(" : ")[1]) - r4.length,
					total: parseInt(document.getElementById("ctl00_Content_txtAging4").innerHTML.split(" <br> ")[1].split(" : ")[1]),
					done: false
				});
			}

			Memory.put({
				page: 'listing',
				action: 'fasu',
				meta: data,
				toAdd: [],
				total: diff
			});
			location.href = Page.url('listing');

			console.log(data);
		} else {
			let diff = parseInt(total) - cmf.length;
			let data = [];
			console.log('Diff is : ' + diff);

			if (cmf.length < total) {
				data.push({
					aging: 5,
					diff: total - cmf.length,
					total: total,
					done: false
				});
			}

			Memory.put({
				page: 'listing',
				action: 'fasu',
				meta: data,
				toAdd: [],
				total: diff
			});
			location.href = Page.url('listing');

			console.log(data);
		}
		// console.log('update extra');
	} else if (total < cmf.length) {
		let diff = cmf.length - parseInt(total);
		updateProcedure(null, null, 0, diff);
	}
}
function fetchAllSidByAgingUpdate() {
	let schBtn = document.getElementById("ctl00_Content_btnConfirmSearch_input");
	let ag2Btn, ag3Btn, ag4Btn, ag5Btn;
	if (User.team === 'alpha') {
		ag2Btn = document.getElementById("ctl00_Content_cmbMthAging_DropDown").children[0].children[1].children[0].children[0];
		ag3Btn = document.getElementById("ctl00_Content_cmbMthAging_DropDown").children[0].children[1].children[1].children[0];
		ag4Btn = document.getElementById("ctl00_Content_cmbMthAging_DropDown").children[0].children[1].children[2].children[0];
	} else {
		ag5Btn = document.getElementById("ctl00_Content_cmbMthAging_DropDown").children[0].children[1].children[3].children[0];
	}
	
	let agtarget = Memory.fetch('meta')[0].aging;
	switch (agtarget) {
		case 2:
			agingClickHandlerUpdate(ag2Btn, schBtn);
			break;
		case 3:
			agingClickHandlerUpdate(ag3Btn, schBtn);
			break;
		case 4:
			agingClickHandlerUpdate(ag4Btn, schBtn);
			break;
		case 5:
			agingClickHandlerUpdate(ag5Btn, schBtn);
			break;
		default:
			return;
	}
}
function agingClickHandlerUpdate(abtn, sbtn) {
	if (Memory.fetch('meta')[0].done) {
		let newmeta = Memory.fetch('meta');
		newmeta.shift();
		abtn.click();
		if (newmeta.length === 0) {
			ProgBar.show('finish fetching files id...', 100, 100);
			Memory.put({
				page: 'listing',
				action: 'mso',
				meta: Memory.fetch('toAdd'),
				total: Memory.fetch('total')
			});
			// console.log('From aghu hee :');
			// console.log(Memory.fetch(''));
			massSavingOps();
			return;
		}
		Memory.put({
			page: 'listing',
			action: 'fasu',
			meta: newmeta,
			toAdd: Memory.fetch('toAdd'),
			total: Memory.fetch('total')
		});
		fetchAllSidByAgingUpdate();
	} else {
		abtn.click();
		sbtn.click();
		beginWaitByAgingLoadUpdate(Memory.fetch('meta')[0].total, Memory.fetch('meta')[0].aging);
	}
}
function beginWaitByAgingLoadUpdate(filesum, aging) {
	let cfsum = parseInt(document.getElementsByClassName("rgInfoPart")[0].getElementsByTagName("strong")[0].innerText);
	if (cfsum !== filesum) {
		setTimeout(function() {
			beginWaitByAgingLoadUpdate(filesum, aging);
		}, 1500);
		return;
	} else {
		let clen = parseInt(document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox").children[0].children[0].value);
		if (clen < 50) {
			document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox_Arrow").click();
			document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox_DropDown").children[0].children[0].children[2].click();
			console.log(parseInt(document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox").children[0].children[0].value));
			setTimeout(function() {
				beginWaitByAgingLoadUpdate(filesum, aging);
			}, 1500);
			return;
		}
		let x = document.getElementById("ctl00_Content_RadGrid_Sales_ctl00");
			
		if (x.children[2].childElementCount < 11) {
			setTimeout(function() {
				beginWaitByAgingLoadUpdate(filesum, aging);
			}, 1500);
			return;
		}
		ProgBar.show('fetching new files id...', Memory.fetch('toAdd').length, Memory.fetch('total'));
		updateExtraProcedure(null, null, aging);
	}
}
function updateExtraProcedure(toAdd = null, page = null, aging = null) {
	let cpage, mpage;
	mpage = parseInt(document.getElementsByClassName("rgInfoPart")[0].getElementsByTagName("strong")[1].innerText);
	cpage = parseInt(document.getElementsByClassName("rgCurrentPage")[0].innerText);

	if (!toAdd) {
		toAdd = [];
	} else {
		if (page !== null) {
			if (cpage !== page) {
				setTimeout(function() {
				    // for table to finish loading next page
				    updateExtraProcedure(toAdd, page, aging);
				}, 1500	);
				return;
			}
		}
	}
	// LOOPTROUGHTABLE
	let table = document.getElementById("ctl00_Content_RadGrid_Sales_ctl00");
	for (var i = 1; i < table.rows.length; i++) {
		let saleid = table.rows[i].cells[2].innerText.trim();
		let area = table.rows[i].cells[18].innerText.trim();
		// CHECK if saleid exist in toAdd array
		if (toAdd.length > 0) {
			if (toAdd.some(val => val.saleid === saleid)) {
				continue
			}
		}
		toAdd.push({
			aging: aging,
			saleid: saleid,
			area: area
		});
		// app.toolbar.updateStatus(null, toAdd.length, Memory.fetch('').total);
	} // EOLOOP
	// console.log(toAdd.length);
	let totalitem = parseInt(document.getElementsByClassName("rgInfoPart")[0].getElementsByTagName("strong")[0].innerText);
	if (toAdd.length === totalitem) {
		let diff = toAdd.filter(x => !CMFile.exist('saleid', x.saleid));
		mymemory.data.meta[0].done = true;
		if (Memory.fetch('toAdd') === undefined) {
			mymemory.data.toAdd = diff;
		} else {
			mymemory.data.toAdd = Memory.fetch('toAdd').concat(diff);
		}
		mymemory.persist();//
		ProgBar.show(null, Memory.fetch('toAdd').length, Memory.fetch('total'));
		fetchAllSidByAgingUpdate();
		return;
	} else {
		if (cpage < mpage) {
			document.getElementsByClassName("rgPageNext")[0].click();
			setTimeout(function(){
			    // for table to finish loading next page
			    updateExtraProcedure(toAdd, ++cpage, aging);
			}, 2000);
		} else {
			// return to first page and begin
			document.getElementsByClassName("rgPageFirst")[0].click();
			setTimeout(function(){
			    // for table to finish loading next page
			    updateExtraProcedure(toAdd, 1, aging);
			}, 2000);
		}
	}
}

function getFileCountByAging() {
	let total, a2, a3, a4, a5, data;
	total = parseInt(document.getElementById("ctl00_Content_txtTotalTarget").innerHTML.split(" <br> ")[1].split(" : ")[1]);

	data = [];

	if (User.team === 'alpha') {
		try {
			a2 = parseInt(document.getElementById("ctl00_Content_txtAging2").innerHTML.split(" <br> ")[1].split(" : ")[1]);
			a3 = parseInt(document.getElementById("ctl00_Content_txtAging3").innerHTML.split(" <br> ")[1].split(" : ")[1]);
			a4 = parseInt(document.getElementById("ctl00_Content_txtAging4").innerHTML.split(" <br> ")[1].split(" : ")[1]);
		}
		catch(err) {
			console.log(err.message);
			Snackbar.show('This CA is not ALPHA...');
			return;
		}			
		if (a2 > 0) data.push({
			aging: 2, total: a2, done: false
		});
		if (a3 > 0) data.push({
			aging: 3, total: a3, done: false
		});
		if (a4 > 0) data.push({
			aging: 4, total: a4, done: false
		});
	} else {
		try {
			a5 = total;
		}
		catch(err) {
			//
		}	
		if (a5 > 0) data.push({
			aging: 5, total: a5, done: false
		});
	}
	updateCollected();
	function updateCollected() {
		let info = mydb.info;
		let collected = info.collected;
		if (User.team === 'alpha') {	
			collected.a2 = parseFloat(document.getElementById("ctl00_Content_txtAging2").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
			collected.a3 = parseFloat(document.getElementById("ctl00_Content_txtAging3").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
			collected.a4 = parseFloat(document.getElementById("ctl00_Content_txtAging4").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
		} else {
			collected.a5a = parseFloat(document.getElementById("ctl00_Content_txtAging5_Unbill1").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
			collected.a5b = parseFloat(document.getElementById("ctl00_Content_txtAging5_Unbill2").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
		}
		collected.aoa = parseFloat(document.getElementById("ctl00_Content_txtTotalTarget").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace('RM ', '').replace(',', ''));
		info.collected = collected;
		mydb.info = info;
		mydb.updated = new Date();
		mydb.persist();
	}

	Memory.put({
		page: 'listing',
		action: 'fetchAllSid',
		meta: data,
		total: parseInt(total),
		toCreate: []
	});
	location.href = Page.url('listing');
}
function fetchAllSidByAging() {
	let schBtn = document.getElementById("ctl00_Content_btnConfirmSearch_input");
	let ag2Btn, ag3Btn, ag4Btn, ag5Btn;
	if (User.team === 'alpha') {
		ag2Btn = document.getElementById("ctl00_Content_cmbMthAging_DropDown").children[0].children[1].children[0].children[0];
		ag3Btn = document.getElementById("ctl00_Content_cmbMthAging_DropDown").children[0].children[1].children[1].children[0];
		ag4Btn = document.getElementById("ctl00_Content_cmbMthAging_DropDown").children[0].children[1].children[2].children[0];
	} else {
		ag5Btn = document.getElementById("ctl00_Content_cmbMthAging_DropDown").children[0].children[1].children[3].children[0];
	}
	
	let agtarget = Memory.fetch('meta')[0].aging;
	switch (agtarget) {
		case 2:
			agingClickHandler(ag2Btn, schBtn);
			break;
		case 3:
			agingClickHandler(ag3Btn, schBtn);
			break;
		case 4:
			agingClickHandler(ag4Btn, schBtn);
			break;
		case 5:
			agingClickHandler(ag5Btn, schBtn);
			break;
		default:
			return;
	}
}
function agingClickHandler(abtn, sbtn) {
	if (Memory.fetch('meta')[0].done) {
		let newmeta = Memory.fetch('meta');
		newmeta.shift();
		abtn.click();
		if (newmeta.length === 0) {
			ProgBar.show('finish fetching files id...', 100, 100);
			Memory.put({
				page: 'listing',
				action: 'mso',
				meta: Memory.fetch('toCreate'),
				total: Memory.fetch('total')
			});
			// console.log(Memory.fetch(''));
			massSavingOps();
			return;
		}
		Memory.put({
			page: 'listing',
			action: 'fetchAllSid',
			meta: newmeta,
			total: Memory.fetch('total'),
			toCreate: Memory.fetch('toCreate')
		});
		fetchAllSidByAging();
	} else {
		if (Memory.fetch('meta')[0].aging !== 5) {
			abtn.click();
			sbtn.click();
		}
		beginWaitByAgingLoad(Memory.fetch('meta')[0].total, Memory.fetch('meta')[0].aging);
	}
}
function massSavingOps() {
	if (Memory.fetch('meta').length > 0) {
		ProgBar.show(`saving ${(Memory.fetch('total') - Memory.fetch('meta').length)} / ${Memory.fetch('total')} files...`, (Memory.fetch('total') - Memory.fetch('meta').length), Memory.fetch('total'));
		// if (Memory.fetch('total') < 150) {
		// 	ProgBar.show(`saving ${(Memory.fetch('total') - Memory.fetch('meta').length)} / ${Memory.fetch('total')} add. files...`, (Memory.fetch('total') - Memory.fetch('meta').length), Memory.fetch('total'));
		// } else {
		// 	ProgBar.show(`saving ${CMFile.all().length} / ${Memory.fetch('total')} files...`, CMFile.all().length, Memory.fetch('total'));
		// }
		
		let sid = Memory.fetch('meta')[0].saleid;
		let sidinput = document.getElementById("ctl00_Content_txtSalesNo");
		sidinput.value = sid;
		document.getElementById("ctl00_Content_btnConfirmSearch_input").click();
		msowait(sid);
	} else {
		ProgBar.show('finish saving files...', 100, 100);
		// app.toolbar.showStatus();
		// alert("All files saved!");
		Memory.clear();
		return;
	}
}
function msowait(target) {
	let table = document.getElementById("ctl00_Content_RadGrid_Sales_ctl00");
	let link = table.rows[1].cells[0].getElementsByTagName("input")[0];
	let cid = table.rows[1].cells[2].innerText;

	if (cid === target) {
		Memory.put({
			page: 'single',
			action: 'save',
			meta: Memory.fetch('meta'),
			total: Memory.fetch('total')
		});
		if (Madebug.status) console.log('setting timeout for click 2...');
		setTimeout(() => {
			link.click();
		}, 1750);
		return;
	} else {
		setTimeout(function() {
		    // ONCE loaded, c
		    msowait(target);
		}, 2000);
		return;
	}
}
function beginWaitByAgingLoad(filesum, aging) {
	let cfsum = parseInt(document.getElementsByClassName("rgInfoPart")[0].getElementsByTagName("strong")[0].innerText);
	if (cfsum !== filesum) {
		setTimeout(function() {
			beginWaitByAgingLoad(filesum, aging);
		}, 1500);
		return;
	} else {
		let clen = parseInt(document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox").children[0].children[0].value);
		if (clen < 50) {
			document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox_Arrow").click();
			document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox_DropDown").children[0].children[0].children[2].click();
			console.log(parseInt(document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox").children[0].children[0].value));
			setTimeout(function() {
				beginWaitByAgingLoad(filesum, aging);
			}, 1500);
			return;
		}
		let x = document.getElementById("ctl00_Content_RadGrid_Sales_ctl00");
			
		if (x.children[2].childElementCount < 11) {
			setTimeout(function() {
				beginWaitByAgingLoad(filesum, aging);
			}, 1500);
			return;
		}

		let cid = x.children[2].children[0].cells[2].innerText;

		if (Memory.fetch('toCreate').length > 0) {
			if (Memory.fetch('toCreate').some(record => record['saleid'] === cid)) {
				setTimeout(function() {
					beginWaitByAgingLoad(filesum, aging);
				}, 1500);
				return;
			}
		}
		
		ProgBar.show('fetching files id...', Memory.fetch('toCreate').length, Memory.fetch('total'));
		syncProcedure(null, null, aging);
	}
}
function syncProcedure(toCreate = null, page = null, aging = null) {
	let cpage, mpage;
	mpage = parseInt(document.getElementsByClassName("rgInfoPart")[0].getElementsByTagName("strong")[1].innerText);
	cpage = parseInt(document.getElementsByClassName("rgCurrentPage")[0].innerText);

	if (!toCreate) {
		toCreate = [];
	} else {
		if (page !== null) {
			if (cpage !== page) {
				setTimeout(function() {
				    // for table to finish loading next page
				    // alert("Next page  " + cpage);
				    console.log("from wait");
				    syncProcedure(toCreate, page, aging);
				}, 1500	);
				console.log("who first");
				return;
			}
		}
	}
	// LOOPTROUGHTABLE
	let table = document.getElementById("ctl00_Content_RadGrid_Sales_ctl00");
	for (var i = 1; i < table.rows.length; i++) {
		let saleid = table.rows[i].cells[2].innerText.trim();
		let area = table.rows[i].cells[18].innerText.trim();
		// CHECK if saleid exist in toCreate array
		if (toCreate.length > 0) {
			if (toCreate.some(val => val.saleid === saleid)) {
				continue
			}
		}
		toCreate.push({
			aging: aging,
			saleid: saleid,
			area: area
		});
		ProgBar.show(null, toCreate.length, Memory.fetch('total'));
	} // EOLOOP
	// console.log(toCreate.length);
	let totalitem = parseInt(document.getElementsByClassName("rgInfoPart")[0].getElementsByTagName("strong")[0].innerText);
	if (toCreate.length === totalitem) {
		// console.log(toCreate);
		mymemory.data.meta[0].done = true;
		if (Memory.fetch('toCreate') === undefined) {
			mymemory.data.toCreate = toCreate;
		} else {
			mymemory.data.toCreate = Memory.fetch('toCreate').concat(toCreate);
		}
		mymemory.persist();//
		fetchAllSidByAging();
		return;
	} else {
		if (cpage < mpage) {
			document.getElementsByClassName("rgPageNext")[0].click();
			setTimeout(function(){
			    // for table to finish loading next page
			    // alert("Next page  " + cpage);
			    syncProcedure(toCreate, ++cpage, aging);
			}, 2000);
		} else {
			// return to first page and begin
			document.getElementsByClassName("rgPageFirst")[0].click();
			setTimeout(function(){
			    // for table to finish loading next page
			    // alert("First page " + cpage);
			    syncProcedure(toCreate, 1, aging);
			}, 2000);
		}
	}
}
function updateProcedure(toUpdate = null, page = null, count = null, removed = 0) {
	if (!Page.is('listing')) {
		Memory.put({
			page: 'listing',
			action: 'bup',
			meta: {
				toUpdate: toUpdate,
				page: page,
				count: count,
				removed: removed
			}
		});
		location.href = Page.url('listing');
		return;
	}
	if (!check50({
		toUpdate: toUpdate,
		page: page,
		count: count,
		removed: removed
	})) return;

	let cpage, mpage;
	mpage = parseInt(document.getElementsByClassName("rgInfoPart")[0].getElementsByTagName("strong")[1].innerText);
	cpage = parseInt(document.getElementsByClassName("rgCurrentPage")[0].innerText);
	if (!toUpdate) {
		// toUpdate = [];
		toUpdate = CMFile.all({verb: 'only', key: 'saleid'});
	} else {
		if (page !== null) {
			if (cpage !== page) {
				setTimeout(function() {
				    // for table to finish loading next page
				    // alert("Next page  " + cpage);
				    updateProcedure(toUpdate, page, count, removed);
				}, 1500);
				return;
			}
		}
	}
	console.log("beginning update");
	// console.log(toUpdate.length);
	if (toUpdate.length === removed) {
		console.log('toUpdate is:');
		console.log(toUpdate);
		toUpdate.forEach((val,idx,arr) => {
			let data = CMFile.give(val);
			data.removed = true;
			CMFile.update(val, data);
		});
		Snackbar.show('Finish update, ' + count + ' files updated, ' + removed + ' file(s) removed..');
		Memory.clear();
		setTimeout(location.reload(), 2500);
		return;
	}
	// LOOPTROUGHTABLE
	let table = document.getElementById("ctl00_Content_RadGrid_Sales_ctl00");
	for (var i = 1; i < table.rows.length; i++) {
		let saleid = table.rows[i].cells[2].innerText.trim();
		// CHECK if saleid exist in toUpdate array
		if (toUpdate.length > 0) {
			if (toUpdate.includes(saleid)) {
				// CHECK if os.paid is equal to paid
				if (CMFile.give(saleid).os.paid !== parseFloat(table.rows[i].cells[9].innerText)) {
					// UPDATE
					let record = CMFile.give(saleid);
					record.os.paid = parseFloat(table.rows[i].cells[9].innerText);
					record.os.total = parseFloat(table.rows[i].cells[6].innerText) + parseFloat(table.rows[i].cells[8].innerText);

					if (record.float) {
						let t = record.float + record.os.paid;
						if (t <= 0) {
							record.float = 0;
						}
					}
					
					CMFile.update(saleid, record);
					count++;
					console.log(saleid + " UPDATED!");
				}
				toUpdate.splice(toUpdate.findIndex((val) => {
					return val === saleid;
				}), 1);
				let rec = CMFile.all();
				ProgBar.show(`${rec.length - toUpdate.length} files updated...`, rec.length - toUpdate.length, rec.length);
				console.log(`${toUpdate.length} files left`);
			}
		}
	} // EOLOOP
	if (toUpdate.length > 0) {
		
		if (cpage < mpage) {
			document.getElementsByClassName("rgPageNext")[0].click();

			setTimeout(function(){
			    // for table to finish loading next page
			    // alert("Next page  " + cpage);
			    updateProcedure(toUpdate, ++cpage, count, removed);
			}, 1500);
		} else {
			// return to first page and begin
			document.getElementsByClassName("rgPageFirst")[0].click();
			setTimeout(function(){
			    // for table to finish loading next page
			    // alert("First page " + cpage);
			    updateProcedure(toUpdate, 1, count, removed);
			}, 1500);
		}
	} else {
		mydb.updated = new Date();
		mydb.persist();
		Snackbar.show(`${count} files updated`);
		Memory.clear();
		setTimeout(function() {
			location.reload();
		}, 2000);
	}
}
function check50(opt) {
	let cpage, mpage;
	mpage = parseInt(document.getElementsByClassName("rgInfoPart")[0].getElementsByTagName("strong")[1].innerText);
	cpage = parseInt(document.getElementsByClassName("rgCurrentPage")[0].innerText);
	let clen = parseInt(document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox").children[0].children[0].value);
	if (clen < 50) {
		document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox_Arrow").click();
		document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox_DropDown").children[0].children[0].children[2].click();
		setTimeout(function() {
			updateProcedure(opt.toUpdate, opt.page, opt.count, opt.removed);
		}, 2000);
		return false;
	} else {
		x = document.getElementById("ctl00_Content_RadGrid_Sales_ctl00");
		
		if (x.children[2].childElementCount > 10) {
			return true;
		} else if (cpage === mpage) {
			console.log('Its max page to go for update');
			return true;
		}
		setTimeout(function() {
			updateProcedure(opt.toUpdate, opt.page, opt.count, opt.removed);
		}, 2000);
		return false;
	}
}

function gfcbau() {
	let total, a2, a3, a4, a5, data;
	total = parseInt(document.getElementById("ctl00_Content_txtTotalTarget").innerHTML.split(" <br> ")[1].split(" : ")[1]);

	data = [];

	if (User.team === 'alpha') {
		try {
			a2 = parseInt(document.getElementById("ctl00_Content_txtAging2").innerHTML.split(" <br> ")[1].split(" : ")[1]);
			a3 = parseInt(document.getElementById("ctl00_Content_txtAging3").innerHTML.split(" <br> ")[1].split(" : ")[1]);
			a4 = parseInt(document.getElementById("ctl00_Content_txtAging4").innerHTML.split(" <br> ")[1].split(" : ")[1]);
		}
		catch(err) {
			console.log(err.message);
			Snackbar.show('This CA is not ALPHA...');
			return;
		}			
		if (a2 > 0) data.push({
			aging: 2, total: a2, done: false
		});
		if (a3 > 0) data.push({
			aging: 3, total: a3, done: false
		});
		if (a4 > 0) data.push({
			aging: 4, total: a4, done: false
		});
	} else {
		try {
			// a5 = parseInt(document.getElementById("ctl00_Content_txtAging5").innerHTML.split(" <br> ")[1].split(" : ")[1]);
			a5 = total;
		}
		catch(err) {
			//
		}	
		if (a5 > 0) data.push({
			aging: 5, total: a5, done: false
		});
	}
	updateCollected();
	function updateCollected() {
		let info = mydb.info;
		let collected = info.collected;
		if (User.team === 'alpha') {	
			collected.a2 = parseFloat(document.getElementById("ctl00_Content_txtAging2").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
			collected.a3 = parseFloat(document.getElementById("ctl00_Content_txtAging3").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
			collected.a4 = parseFloat(document.getElementById("ctl00_Content_txtAging4").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
		} else {
			collected.a5a = parseFloat(document.getElementById("ctl00_Content_txtAging5_Unbill1").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
			collected.a5b = parseFloat(document.getElementById("ctl00_Content_txtAging5_Unbill2").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace(' RM ', '').replace(',', ''));
		}
		collected.aoa = parseFloat(document.getElementById("ctl00_Content_txtTotalTarget").innerHTML.split(" <br> ")[0].split(" : ")[1].split(' / ')[0].replace('RM ', '').replace(',', ''));
		info.collected = collected;
		mydb.info = info;
		mydb.updated = new Date();
		mydb.persist();
	}

	Memory.put({
		page: 'listing',
		action: 'fetchAllSidUpdate',
		meta: data,
		total: parseInt(total),
		toUpdate: []
	});
	location.href = Page.url('listing');
}
function fasbau() {
	let schBtn = document.getElementById("ctl00_Content_btnConfirmSearch_input");
	let ag2Btn, ag3Btn, ag4Btn, ag5Btn;
	if (User.team === 'alpha') {
		ag2Btn = document.getElementById("ctl00_Content_cmbMthAging_DropDown").children[0].children[1].children[0].children[0];
		ag3Btn = document.getElementById("ctl00_Content_cmbMthAging_DropDown").children[0].children[1].children[1].children[0];
		ag4Btn = document.getElementById("ctl00_Content_cmbMthAging_DropDown").children[0].children[1].children[2].children[0];
	} else {
		ag5Btn = document.getElementById("ctl00_Content_cmbMthAging_DropDown").children[0].children[1].children[3].children[0];
	}
	
	let agtarget = Memory.fetch('meta')[0].aging;
	switch (agtarget) {
		case 2:
			agingClickHandler(ag2Btn, schBtn);
			break;
		case 3:
			agingClickHandler(ag3Btn, schBtn);
			break;
		case 4:
			agingClickHandler(ag4Btn, schBtn);
			break;
		case 5:
			agingClickHandler(ag5Btn, schBtn);
			break;
		default:
			return;
	}

	function agingClickHandler(abtn, sbtn) {
		if (Memory.fetch('meta')[0].done) {
			let newmeta = Memory.fetch('meta');
			newmeta.shift();
			abtn.click();
			if (newmeta.length === 0) {
				ProgBar.show('finish fetching files data...', 100, 100);
				Memory.put({
					page: 'listing',
					action: 'muo',
					meta: Memory.fetch('toUpdate'),
					total: Memory.fetch('total')
				});
				// console.log(Memory.fetch(''));
				// massSavingOps();
				massUpdateOps();
				console.log(Memory.fetch());
				return;
			}
			Memory.put({
				page: 'listing',
				action: 'fetchAllSidUpdate',
				meta: newmeta,
				total: Memory.fetch('total'),
				toUpdate: Memory.fetch('toUpdate')
			});
			fasbau();
		} else {
			if (Memory.fetch('meta')[0].aging !== 5) {
				abtn.click();
				sbtn.click();
			}
			beginWaitByAgingLoadU(Memory.fetch('meta')[0].total, Memory.fetch('meta')[0].aging);
		}	
	}

	function beginWaitByAgingLoadU(filesum, aging) {
		let cfsum = parseInt(document.getElementsByClassName("rgInfoPart")[0].getElementsByTagName("strong")[0].innerText);
		if (cfsum !== filesum) {
			setTimeout(function() {
				beginWaitByAgingLoadU(filesum, aging);
			}, 1500);
			return;
		} else {
			let clen = parseInt(document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox").children[0].children[0].value);
			if (clen < 50) {
				document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox_Arrow").click();
				document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox_DropDown").children[0].children[0].children[2].click();
				console.log(parseInt(document.getElementById("ctl00_Content_RadGrid_Sales_ctl00_ctl03_ctl01_PageSizeComboBox").children[0].children[0].value));
				setTimeout(function() {
					beginWaitByAgingLoadU(filesum, aging);
				}, 1500);
				return;
			}
			let x = document.getElementById("ctl00_Content_RadGrid_Sales_ctl00");
				
			if (x.children[2].childElementCount < 11) {
				setTimeout(function() {
					beginWaitByAgingLoadU(filesum, aging);
				}, 1500);
				return;
			}

			let cid = x.children[2].children[0].cells[2].innerText;

			if (Memory.fetch('toUpdate').length > 0) {
				if (Memory.fetch('toUpdate').some(record => record['saleid'] === cid)) {
					setTimeout(function() {
						beginWaitByAgingLoadU(filesum, aging);
					}, 1500);
					return;
				}
			}

			ProgBar.show('fetching latest files...', Memory.fetch('toUpdate').length, Memory.fetch('total'));
			updateProc(null, null, aging);
		}
	}

}
function updateProc(toUpdate = null, page = null, aging = null) {
	let cpage, mpage;
	mpage = parseInt(document.getElementsByClassName("rgInfoPart")[0].getElementsByTagName("strong")[1].innerText);
	cpage = parseInt(document.getElementsByClassName("rgCurrentPage")[0].innerText);

	if (!toUpdate) {
		toUpdate = [];
	} else {
		if (page !== null) {
			if (cpage !== page) {
				setTimeout(function() {
				    // for table to finish loading next page
				    // alert("Next page  " + cpage);
				    console.log("from wait");
				    updateProc(toUpdate, page, aging);
				}, 1500	);
				console.log("who first");
				return;
			}
		}
	}
	// LOOPTROUGHTABLE
	let table = document.getElementById("ctl00_Content_RadGrid_Sales_ctl00");
	for (var i = 1; i < table.rows.length; i++) {
		let saleid = table.rows[i].cells[2].innerText.trim();
		let area = table.rows[i].cells[18].innerText.trim(); //here
		// CHECK if saleid exist in toCreate array
		if (toUpdate.length > 0) {
			if (toUpdate.some(val => val.saleid === saleid)) {
				continue
			}
		}
		toUpdate.push({
			aging: aging,
			saleid: saleid,
			area: area,
			os: {
				paid: parseFloat(table.rows[i].cells[9].innerText),
				total: parseFloat(table.rows[i].cells[6].innerText)
			}
		});
		ProgBar.show(null, toUpdate.length, Memory.fetch('total'));
	} // EOLOOP
	// console.log(toCreate.length);
	let totalitem = parseInt(document.getElementsByClassName("rgInfoPart")[0].getElementsByTagName("strong")[0].innerText);
	if (toUpdate.length === totalitem) {
		// console.log(toCreate);
		mymemory.data.meta[0].done = true;
		if (Memory.fetch('toUpdate') === undefined) {
			mymemory.data.toUpdate = toUpdate;
		} else {
			mymemory.data.toUpdate = Memory.fetch('toUpdate').concat(toUpdate);
		}
		mymemory.persist();//
		fasbau();
		return;
	} else {
		if (cpage < mpage) {
			document.getElementsByClassName("rgPageNext")[0].click();
			setTimeout(function(){
			    // for table to finish loading next page
			    // alert("Next page  " + cpage);
			    updateProc(toUpdate, ++cpage, aging);
			}, 2000);
		} else {
			// return to first page and begin
			document.getElementsByClassName("rgPageFirst")[0].click();
			setTimeout(function(){
			    // for table to finish loading next page
			    // alert("First page " + cpage);
			    updateProc(toUpdate, 1, aging);
			}, 2000);
		}
	}
}
function massUpdateOps() {
	let count = 0;
	let adds = [];
	let news = Memory.fetch('meta');
	let existing = CMFile.all({verb: 'only', key: 'saleid'});
	console.log(news);
	console.log(existing);
	news.forEach((record,idx,arr) => {
		ProgBar.show(`updating ${idx + 1} / ${news.length} files...`, idx + 1, news.length);
		if (CMFile.exist('saleid', record.saleid)) {
			let change = false;
			let rec = CMFile.give(record.saleid);
			if (rec.os.paid !== record.os.paid) {
				rec.os.paid = record.os.paid;
				rec.os.total = record.os.total;
				change = true;
			}
			if (rec.float) {
				let t = rec.float + rec.os.paid;
				if (t <= 0) {
					rec.float = 0;
					// change = true;
				}
			}
			if (change) {
				CMFile.update(rec.saleid, rec);
				count++;
			}
		}
		else {
			adds.push(record);
		}
		if (existing.includes(record.saleid)) {
			existing.splice(existing.findIndex((val) => {
				return val === record.saleid;
			}), 1);
		}
	});
	if (existing.length) {
		existing.forEach((val) => {
			let record = CMFile.give(val);
			record.removed = true;
			CMFile.update(val, record);
		});
	}
	if (adds.length) {
		Memory.put({
			page: 'listing',
			action: 'mso',
			meta: adds,
			total: adds.length
		});
		massSavingOps();
	}
	else {
		Snackbar.show(`${count} files updated...`);
		Memory.clear();
		setTimeout(() => {
			location.href = Page.url('home');
		}, 2000);
	}
}