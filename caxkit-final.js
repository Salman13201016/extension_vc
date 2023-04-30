class Tarikh {
	constructor() {}
	static get mid() {
		return getTarikhMonthId();
	}
	static get mname() {
		return getTarikhMonthName();
	}
	static get year() {
		return getTarikhYear();
	}
	static get strsy() {
		return getTarikhShortYearStr();
	}
	static get intsy() {
		return getTarikhShortYearInt();
	}
	static get sumsy() {
		return getTarikhShortYearSum();
	}
}

class Madebug {
	constructor() {}
	static get status() {
		return false;
	}
}

class Old {
	constructor() {}
	static scan() {
		let list = Object.keys(window.localStorage);
		list = list.filter((val) => {
			return val.includes(User.id + '_cxdata');
		});
		if (list.length) {
			list.forEach((val) => {
				if (val === mydb.filename) {}
				else {
					Old.remove(val);
					console.log(`${val} removed...`);
				}
			});
		}
	}
	static remove(filename) {
		window.localStorage.removeItem(filename);
	}
}

class Page {
	constructor() {}
	static get name() {
		return getPageName();
	}
	static get invalid() {
		return getPageName() === 'no';
	}
	static url(name) {
		return getPageUrl(name);
	}
	static is(name) {
		return this.name === name;
	}
}

class View {
	constructor() {}
	static make() {
		makeView();
	}
}

class User {
	constructor() {}
	static get id() {
		return getUserId();
	}
	static get name() {
		return getUserName();
	}
	static get tel() {
		return getUserTel();
	}
	static get team() {
		return getUserTeam();
	}
}

class Parser {
	constructor() {}
	static parse(data, template, isContact = false) {
		return getParsedText(data, template, isContact);
	}
}

class Modal {
	constructor() {}
	static show() {
		document.getElementById('myModal').style.display = 'block';
	}
	static add(view, reset=false) {
		modalAddView(view, reset);
	}
}

class MyRate {
	constructor() {}
	static update() {
		let agings = (User.team === 'alpha') ? [2,3,4] : ['5a','5b'];
		let rates = Setting.give('rates');
		agings.forEach((aging) => {
			rates['a' + aging];
			let levels = ['a','b','c','d'];
			levels.forEach((level) => {
				rates['a' + aging][level] = {
					op: $(`#oprba${aging}l${level}`).val(),
					fil: parseFloat($('#filrba' + aging + 'l' + level).val()),
					val: parseFloat($('#valrba' + aging + 'l' + level).val())
				}
			});
		});
		Setting.patch('rates', rates);
		Snackbar.show('Rates updated...');
	}
}

class Setting {
	constructor() {
		this.filename = User.id + '_cxsetting';
		this.data = getSettingData(this.filename);
	}
	persist() {
		saveSetting(this.filename, this.data);
	}
	static give(key) {
		switch(key) {
			case 'key':
				return mysetting.data.code;
				break;
			case 'profile':
				return mysetting.data.profile;
				break;
			case 'toolbar':
				return mysetting.data.toolbar;
				break;
			case 'general':
				return mysetting.data.general;
				break;
			case 'template':
				return mysetting.data.template;
				break;
			case 'rates':
				return mysetting.data.rates;
				break;
			default:
				console.log('None found...');
		}
	}
	static patch(key, data) {
		switch(key) {
			case 'key':
				mysetting.data.code = data;
				break;
			case 'profile':
				mysetting.data.profile = data;
				break;
			case 'toolbar':
				mysetting.data.toolbar = data;
				break;
			case 'home':
				mysetting.data.home = data;
				break;
			case 'general':
				mysetting.data.general = data;
				break;
			case 'template':
				mysetting.data.template = data;
				break;
			case 'rates':
				mysetting.data.rates = data;
				break;
			default:
				console.log('None found...');
		}
		mysetting.persist();
	}
}
let mysetting = new Setting();

class Watcher {
	constructor() {}
	static give() {
		let data;
		try {
			data = window.localStorage.getItem( User.id + '_cxwatcher' );
		}
		catch(err) {
			console.log(err);
			data = null;
		}
		return data;
	}
	static patch(data) {
		window.localStorage.setItem( User.id + '_cxwatcher', data);
	}
}

class DB {
	constructor() {
		this.filename = User.id + '_cxdata_' + Tarikh.mid + '_' + Tarikh.strsy;
		this.data = getDBData(this.filename);
		this.lastupdate = Watcher.give();
	}
	persist() {
		saveDB(this.filename, this.data);
	}
	get records() {
		return this.data.records;
	}
	set records(records) {
		this.data.records = records;
	}
	get info() {
		return this.data.info;
	}
	set info(info) {
		this.data.info = info;
	}
	get updated() {
		return this.data.updated;
	}
	set updated(updated) {
		this.data.updated = updated;
	}
	static get valid() {
		return mydb.lastupdate === Watcher.give();
	}
	static reload() {
		mydb.data = getDBData(mydb.filename);
	}
}
let mydb = new DB();
if (Madebug.status) console.log(mydb);

class CAInfo {
	constructor() {}
	static target(aging = 'oa') {
		let records = CMFile.all();
		switch(aging) {
			case 'oa':
				if (User.team === 'alpha') return records.reduce((a,b) => a + b.os.target, 0);
				else return records.reduce((a,b) => a + b.os.target, 0);
				break;
			default:
				if (User.team === 'alpha') return CMFile.aging(aging, records).reduce((a,b) => a + b.os.target, 0);
				// else return records.reduce((a,b) => a + b.os.target, 0) - records.reduce((a,b) => a + b.unbill.total, 0);
				else {
					let sub = CMFile.aging(aging, records);
					return sub.reduce((a,b) => a + b.os.target, 0);
				}
		}
	}
	static goal(aging, type) {
		switch(type) {
			case '%':
				return parseFloat(mydb.info.goal['a' + aging]);
				break;
			case 'rm':
				return this.target(aging) * (parseFloat(mydb.info.goal['a' + aging]) / 100);
				break;
			default:
				console.log('none');
		}
	}
	static collected(aging, type) {
		switch(type) {
			case '%':
				if (User.team === 'alpha') return 100 * (parseFloat(mydb.info.collected['a' + aging]) / this.target(aging));
				else return 100 * (CAInfo.collected(aging, 'rm') / this.target(aging));
				break;
			case 'rm':
				if (User.team === 'alpha') return parseFloat(mydb.info.collected['a' + aging]);
				else {
					return parseFloat(mydb.info.collected['a' + aging]);
					//if (aging === 'oa') return CMFile.all().reduce((a,b) => a + Math.abs(b.os.paid), 0);
					//else return CMFile.aging(aging, CMFile.all()).reduce((a,b) => a + Math.abs(b.os.paid), 0);
				}
				break;
			default:
				console.log('none');
		}
	}
	static short(aging, floated = false) {
		if (floated) {
			return this.short(aging) - this.float(aging, 'rm');
		}
		return this.goal(aging, 'rm') - this.collected(aging, 'rm');
	}
	static float(aging, type) {
		let records = CMFile.all();
		records = CMFile.filter(CMFilter.FLOAT, records);
		let sub;
		switch(aging) {
			case 'oa':
				sub = records;
				break;
			default:
				sub = CMFile.aging(aging, records);
		}
		switch(type) {
			case 'file':
				return sub.length;
				break;
			case 'rm':
				return sub.reduce((a,b) => a + b.float, 0);
				break;
			default:
				console.log('nooo');
		}
	}
	static perday(aging) {
		if (this.short(aging, true) < 0) return 0;
		let res = this.short(aging, true) / this.days();
		if (res <= 0) return 0;
		return res;
	}
	static update() {
		let agings = (User.team === 'alpha') ? [2,3,4,'oa'] : ['5a','5b','oa'];
		let data = mydb.data.info;
		agings.forEach((aging) => {
			data.goal['a' + aging] = (!!$('#tdinfogoalper' + aging).val()) ? $('#tdinfogoalper' + aging).val() : data.goal['a' + aging];
		});
		data.deadline = (!!$('#tdinfodeadline').val()) ? $('#tdinfodeadline').val() : data.deadline;
		mydb.data.info = data;
		mydb.persist();
		$('#tdinfolastupdate').text('as of ' + new Date(mydb.updated.toString()).toLocaleString());
		
		agings.forEach((aging) => {
			$('#tdinfottarget' + aging).text(CAInfo.target(aging).toLocaleString('en-US', {maximumFractionDigits:2}));
			$('#tdinfogoalper' + aging).val(CAInfo.goal(aging, '%'));
			if (isNaN(CAInfo.goal(aging, 'rm'))) $('#tdinfogoalrm' + aging).text('-');
			else $('#tdinfogoalrm' + aging).text(CAInfo.goal(aging, 'rm').toLocaleString('en-US', {maximumFractionDigits:2}));
			$('#tdinfocollectedper' + aging).text(CAInfo.collected(aging, '%').toLocaleString('en-US', {maximumFractionDigits:2}));
			$('#tdinfocollectedrm' + aging).text(CAInfo.collected(aging, 'rm').toLocaleString('en-US', {maximumFractionDigits:2}));
			if (isNaN(CAInfo.short(aging))) $('#tdinfoshort' + aging).text('-');
			else $('#tdinfoshort' + aging).text(CAInfo.short(aging).toLocaleString('en-US', {maximumFractionDigits:2}).replace('-', '+'));
			(CAInfo.short(aging) > 0) ? $('#tdinfoshort' + aging).css({'color':'indianred'}) : $('#tdinfoshort' + aging).css({'color':'green'});
			$('#tdinfofloatfile' + aging).text(CAInfo.float(aging, 'file'));
			$('#tdinfofloatrm' + aging).text(CAInfo.float(aging, 'rm').toLocaleString('en-US', {maximumFractionDigits:2}));

			if (isNaN(CAInfo.short(aging, true))) $('#tdinfoshortfloat' + aging).text('-');
			else $('#tdinfoshortfloat' + aging).text(CAInfo.short(aging, true).toLocaleString('en-US', {maximumFractionDigits:2}).replace('-', '+'));
			(CAInfo.short(aging, true) > 0) ? $('#tdinfoshortfloat' + aging).css({'color':'indianred'}) : $('#tdinfoshortfloat' + aging).css({'color':'green'});
			
			if (isNaN(CAInfo.perday(aging))) $('#tdinfoperday' + aging).text('-');
			else $('#tdinfoperday' + aging).text(CAInfo.perday(aging).toLocaleString('en-US', {maximumFractionDigits:2}));

			if (aging === 'oa') {}
			else $('#tdratelevel' + aging).text(CAInfo.ratelevel(aging, true));
			if (aging === 'oa') $('#tdraterm' + aging).text((isNaN(CAInfo.ratesum())) ? '-' : CAInfo.ratesum().toLocaleString('en-US', {maximumFractionDigits:2}));
			else $('#tdraterm' + aging).text(isNaN(CAInfo.rateamount(aging)) ? '-' : CAInfo.rateamount(aging).toLocaleString('en-US', {maximumFractionDigits:2}));
			$('#tdrateest').text('RM ' + (isNaN(CAInfo.ratesum()) ? '-' : CAInfo.ratesum().toLocaleString('en-US', {maximumFractionDigits:2})) );

			if (aging === 'oa') {}
			else $('#tdratelevelgoal' + aging).text(CAInfo.ratelevel(aging, true, true));
			if (aging === 'oa') $('#tdratermgoal' + aging).text(isNaN(CAInfo.ratesum(true)) ? '-' : CAInfo.ratesum(true).toLocaleString('en-US', {maximumFractionDigits:2}));
			else $('#tdratermgoal' + aging).text(isNaN(CAInfo.rateamount(aging, true)) ? '-' : CAInfo.rateamount(aging, true).toLocaleString('en-US', {maximumFractionDigits:2}));
			$('#tdrategoalest').text('RM ' + (isNaN(CAInfo.ratesum(true)) ? '-' : CAInfo.ratesum(true).toLocaleString('en-US', {maximumFractionDigits:2})) );
		});
	}
	static days() {
		return (new Date($('#tdinfodeadline').val()).getDate() - new Date().getDate());
	}
	static ratelevel(aging, display = false, goal = false) {
		let rate;
			

		if (display) {
			if (ratecheck('a')) rate = Setting.give('rates')['a'+aging]['a'].val + ' (A)';
			else if (ratecheck('b')) rate = Setting.give('rates')['a'+aging]['b'].val + ' (B)';
			else if (ratecheck('c')) rate = Setting.give('rates')['a'+aging]['c'].val + ' (C)';
			else if (ratecheck('d')) rate = Setting.give('rates')['a'+aging]['d'].val + ' (D)';
		} else {
			if (ratecheck('a')) rate = Setting.give('rates')['a'+aging]['a'].val;
			else if (ratecheck('b')) rate = Setting.give('rates')['a'+aging]['b'].val;
			else if (ratecheck('c')) rate = Setting.give('rates')['a'+aging]['c'].val;
			else if (ratecheck('d')) rate = Setting.give('rates')['a'+aging]['d'].val;
		}

		return rate;

		function ratecheck(level) {
			switch(Setting.give('rates')['a'+aging][level].op) {
				case 'gt':
					return (!goal ? CAInfo.collected(aging, '%') : CAInfo.goal(aging, '%')) >= Setting.give('rates')['a'+aging][level].fil;
					break;
				case 'lt':
					return (!goal ? CAInfo.collected(aging, '%') : CAInfo.goal(aging, '%')) < Setting.give('rates')['a'+aging][level].fil;
					break;
				default:
					console.log(Setting.give('rates'));
					console.log(Setting.give('rates')['a'+aging][level]);
					console.log(Setting.give('rates')['a'+aging][level].op);
					console.log('noon');
			}
			
		}			
	}
	static rateamount(aging, goal = false) {
		return (!goal ? this.collected(aging, 'rm') : this.goal(aging, 'rm')) * ((!goal ? this.ratelevel(aging) : this.ratelevel(aging, false, true)) / 100);
	}
	static ratesum(goal = false) {
		let sum = 0;
		let agings = (User.team === 'alpha') ? [2,3,4] : ['5a','5b'];
		agings.forEach((aging) => {
			sum += (!goal ? this.rateamount(aging) : this.rateamount(aging, true));
		});
		return sum;
	}
}

class TempNav {
	constructor() {}
	static prev(group) {
		tempnavPrev(group);
	}
	static next(group) {
		tempnavNext(group);
	}
}

class Misc {
	constructor() {}
	static copy(text) {
		navigator.clipboard.writeText(text);
	}
}

class Quick {
	constructor() {}
	static file(sid) {
		open();
		function open() {
			if (!Page.is('listing')) {
				Memory.put({
					page: 'listing', action: 'openfile', meta: sid
				});
				if (Setting.give('general').opennewtab) window.open(Page.url('listing'), '_blank');
				else location.href = Page.url('listing');
				return;
			}
			let input = document.getElementById("ctl00_Content_txtSalesNo");
			input.value = sid;
			document.getElementById("ctl00_Content_btnConfirmSearch_input").click();
			beginOpenFile(sid);
			return;

			function beginOpenFile(sid) {
				let table = document.getElementById("ctl00_Content_RadGrid_Sales_ctl00");
				let link = table.rows[1].cells[0].getElementsByTagName("input")[0];
				let cid;
				try {
					cid = table.rows[1].cells[2].innerText;
				}
				catch(err) {
					if (table.rows[1].cells[0].innerText === 'No target found.') {
						Snackbar.show(`File ${sid} not found...`);
						Memory.clear();
						return;
					}
					console.log(err);
					return;
				}

				if (cid === sid) {
					Memory.clear();
					link.click();
					return;
				} else {
					setTimeout(function() {
					    // ONCE loaded, c
					    beginOpenFile(sid);
					}, 1500);
					return;
				}
			}
		}
	}
	static os(nric) {
		open();
		function open() {
			if (!Page.is('oschecking')) {
				Memory.put({
					page: 'oschecking', action: 'checkos', meta: nric
				});
				if (Setting.give('general').opennewtab) window.open(Page.url('oschecking'), '_blank');
				else location.href = Page.url('oschecking');
				return;
			}
			document.getElementById('ctl00_Content_txtSearchNo').value = nric;
			document.getElementById('ctl00_Content_btnSearch_input').click();
			setTimeout(empOS, 1500);
			Memory.clear();

			function empOS() {
				let table = document.getElementById("ctl00_Content_RadGrid_Sales_ctl00");
				if (table.children[2].childElementCount > 0) {
					for (var i = 0; i < table.children[2].rows.length; i++) {
						let saleid = table.children[2].rows[i].cells[2].innerText;
						// check if order belong to current ca
						if (CMFile.exist('saleid', saleid)) {
							table.children[2].rows[i].style.background = "lightblue";
						}
					}
					return;
				}
			}
		}
	}
	static float(sid) {
		open();
		function open() {
			if (!Page.is('floatentry')) {
				Memory.put({
					page: 'floatentry', action: 'addfloat', meta: sid
				});
				if (Setting.give('general').opennewtab) window.open(Page.url('floatentry'), '_blank');
				else location.href = Page.url('floatentry');
				return;
			}
			let remark = 'ACC NAME HOLDER : ' + CMFile.give(sid).name;
			document.getElementById('ctl00_Content_txtSearchNo').value = sid;
			document.getElementById('ctl00_Content_txtRemark').value = remark;
			Memory.clear();
		}
	}
	static moto(sid) {
		open();
		function open() {
			if (!Page.is('motoentry')) {
				Memory.put({
					page: 'motoentry', action: 'reqmoto', meta: sid
				});
				if (Setting.give('general').opennewtab) window.open(Page.url('motoentry'), '_blank');
				else location.href = Page.url('motoentry');
				return;
			}
			document.getElementById('ctl00_Content_txtRefNo').value = sid;
			let record = CMFile.give(sid);
			let title = Parser.parse(record, Setting.give('template').moto.title);
			let remark = Parser.parse(record, Setting.give('template').moto.remark);
			Misc.copy(title);
			setTimeout(() => Misc.copy(remark), 1000);
			Memory.clear();
		}
	}
	static newcard(sid) {
		open();
		function open() {
			let to, cc1, cc2, body, subject;
			let record = CMFile.give(sid);
			to = Setting.give('template').newcard.to;
			cc1 = Setting.give('template').newcard.cc1;
			cc2 = Setting.give('template').newcard.cc2;
			body = Parser.parse(record, Setting.give('template').newcard.body);
			subject = Parser.parse(record, Setting.give('template').newcard.subject);
			Misc.copy(body);
			location.href = 'mailto:' + to + '?subject=' + subject + '&cc=' + cc1 + ';' + cc2;
		}
	}
	static wrongref(sid) {
		open();
		function open() {
			let to, cc1, cc2, body, subject;
			let record = CMFile.give(sid);
			to = Setting.give('template').wrongref.to;
			cc1 = Setting.give('template').wrongref.cc1;
			cc2 = Setting.give('template').wrongref.cc2;
			body = Parser.parse(record, Setting.give('template').wrongref.body);
			subject = Parser.parse(record, Setting.give('template').wrongref.subject);
			Misc.copy(body);
			location.href = 'mailto:' + to + '?subject=' + subject + '&cc=' + cc1 + ';' + cc2;
		}
	}
}

class CMFile {
	constructor() {}
	static all(prop = null) {
		return getCmfileAll(prop);
	}
	static give(saleid) {
		return this.where('saleid', saleid);
	}
	static where(key, value) {
		return getCmfileWhere(key, value);
	}
	static filter(filter, datas) {
		return datas.filter(filter);
	}
	static exist(key, value) {
		return getFileExist(key, value);
	}
	static update(id, data) {
		return cmfileUpdate(id, data);
	}
	static add(data) {
		return cmfileAdd(data);
	}
	static aging(aging, datas) {
		return getCmfileByAging(aging, datas);
	}
	static is(type, data) {
		switch(type) {
			case 'partial':
				return data.os.paid !== 0 && !FullPay.check(data.os.target, data.os.paid);
				break;
			case 'completed':
				return FullPay.check(data.os.target, data.os.paid);
				break;
			case 'floated':
				return data.float;
				break;
			default:
				console.log('nono');
		}
	}
	static isGroup(type, data) {
		switch(type) {
			case 'a':
				return data.aging.flat === 2;
				break;
			default:
				console.log('nonn');
		}
	}
	static remove(saleid) {
		return removeCmfile(saleid);
	}
}

class FullPay {
	constructor() {}
	static check(target, paid) {
		if ((target + paid) <= 0.00) return true;
		else return false;
	}
}

class FileWindow {
	constructor() {}
	static update(group, data) {
		filewindowUpdate(group, data);
	}
}

class FileNav {
	constructor() {
		this.datas = [];
		this.aging = [];
		// this.area = [];
		this.focus = [];
	}
	static prev() {
		let idx = parseInt($('#fileNavIdx').text());
		idx--;
		if (idx < 1) idx = myfilenav.focus.length;
		this.view(idx);
	}
	static next() {
		let idx = parseInt($('#fileNavIdx').text());
		idx++;
		if (idx > myfilenav.focus.length) idx = 1;
		this.view(idx);
	}
	static setAging(datas) {
		filenavSetAging(datas);
	}
	static setArea(aging) {
		return filenavSetArea(aging);
	}
	static setPtp(aging) {
		return filenavSetPTP(aging);
	}
	static setFocus(datas) {
		myfilenav.focus = datas;
	}
	static clear() {
		myfilenav.aging = [];
		myfilenav.focus = [];
		$('#myagbtn button').each(function() {
			$(this).removeClass('active');
		});
		$('#areasContainer').empty();
		$('#ptpsContainer').empty();
		$('#many-filewindow').hide();
		$('#file-mynavigator').hide();
		$('#filenotice-totaltocollect').hide();
		$('#filenotice-totalfloated').hide();
		$('#filenotice-totalptp').hide();
		$('#many-filewindow-noshow').show();

	}
	static view(idx = 1) {
		let data = myfilenav.focus[idx - 1];

		try {
			data = CMFile.give(data.saleid);
		}
		catch(err) {
			console.log(err);
			data = undefined;
		}
		myfilenav.focus[idx - 1] = data;

		$('#fileNavIdx').text(idx);
		try {
			$('#fileNavTitle').text(data.saleid);
		}
		catch(err) {
			console.log('Undefined sid');
			$('#file-mynavigator').hide();
			$('#many-filewindow').hide();
			$('#filenotice-totaltocollect').hide();
			$('#filenotice-totalfloated').hide();
			$('#filenotice-totalptp').hide();
			$('#many-filewindow-noshow').show();
			return;
		}
		$('#fileNavMax').text(myfilenav.focus.length);
		$('#file-mynavigator').show();
		$('#many-filewindow').show();
		let total;
		if (User.team === 'alpha') {
			total = myfilenav.focus.reduce((a,b) => a + b.os.total, 0);
		}
		else {
			total = myfilenav.focus.reduce((a,b) => a + b.os.total, 0);
		}
		(total < 0) ? $('#filenotice-totaltocollect').css({'color':'green'}) : $('#filenotice-totaltocollect').css({'color':''});
		(total < 0) ? $('#filenotice-totaltocollect').text('over: rm ' + total.toLocaleString('en-US', {maximumFractionDigits:2}).replace('-','+')) : $('#filenotice-totaltocollect').text('sum: rm ' + total.toLocaleString('en-US', {maximumFractionDigits:2}));
		let floated = CMFile.filter(CMFilter.FLOAT, myfilenav.focus);
		$('#filenotice-totalfloated').text(`t.float: ${floated.length} / ${myfilenav.focus.length} ${(floated.length) ? '(' + floated.reduce((a,b) => a + b.float, 0).toLocaleString('en-US', {maximumFractionDigits:2}) + ')' : ''}`);
		$('#filenotice-totalptp').text(`ptp: ${CMFile.filter(CMFilter.PTP, myfilenav.focus).length} / ${myfilenav.focus.length}`);
		$('#filenotice-totalfloated').show();
		$('#filenotice-totalptp').show();
		$('#filenotice-totaltocollect').show();
		$('#many-filewindow-noshow').hide();

		FileWindow.update('many', data);
	}
}
let myfilenav = new FileNav();

class CMFilter {
	constructor() {}
	
	static RECENT(val, idx, arr) {
		let now = new Date().getDate();
		if (now > 3) {
			let min = new Date();
			min.setDate(now - 3);
			min.setHours(0,0,0);
			return new Date(val.created.toString()) > min;
		}
		else return true;
	}
	static NP(val, idx, arr) {
		return val.os.paid === 0;
	}
	static PP(val, idx, arr) {
		return val.os.paid !== 0 && !FullPay.check(val.os.target, val.os.paid);
	}
	static COM(val, idx, arr) {
		return FullPay.check(val.os.target, val.os.paid);
	}
	static PTP(val, idx, arr) {
		return !!val.date.ptp && val.date.ptp !== '' && new Date(val.date.ptp).setHours(23,59,59) > new Date();
	}
	static FLOAT(val, idx, arr) {
		return val.float > 0;
	}
	static BROKEN(val, idx, arr) {
		return !!val.date.ptp && val.date.ptp !== '' && new Date(val.date.ptp).setHours(23,59,59) < new Date();
	}
	static VISIT(val, idx, arr) {
		return val.visit;
	}
	static REMOVED(val, idx, arr) {
		return val.removed;
	}
}


class Snackbar {
	constructor() {}
	static show(msg, time = 2500) {
		$('#mysnackbar').css({'background':''});
		showSnackbar(msg, time);
	}
	static showy(type, msg, time = 2500) {
		switch(type) {
			case 'yes':
				$('#mysnackbar').css({'background':'green'});
				break;
			case 'no':
				$('#mysnackbar').css({'background':'red'});
				break;
			default:
				console.log('neene');
		}
		showSnackbar(msg, time);
	}
}

class Vale {
	constructor() {}
	static vale(key = null) {
		return getVale(key);
	}
}

class Fetcher {
	constructor() {}
	static fetch() {
		getFileCountByAging();
	}
	static update() {
		gfcbau();
	}
}

class ProgBar {
	constructor() {}
	static show(msg = null, current = 0, total = 0) {
		showProgBar({
			msg: msg,
			current: current,
			total: total
		});
	}
}

class Memory {
	constructor() {
		this.filename = User.id + '_cxmemory';
		this.data = getMemoryData(this.filename);
	}
	persist() {
		saveMemory(this.filename, this.data);
	}
	static got() {
		if (!mymemory.data) return false;
		return true;
	}
	static fetch(key = null) {
		if (!key) return mymemory.data;
		return mymemory.data[key];
	}
	static put(memory) {
		mymemory.data = memory;
		mymemory.persist();
	}
	static clear() {
		mymemory.data = null;
		window.localStorage.removeItem(mymemory.filename);
	}
	static read() {
		readMemory();
	}
}
let mymemory = new Memory();

class Info {
	constructor() {}
	static reload() {
		reloadInfo();
	}
}

class Explore {
	constructor() {
		this.datas = [];
		this.aging = [];
		this.area = [];
		this.focus = [];
	}
	static boot(datas) {
		this.datas = datas;
	}
}
let myexplore = new Explore();

class App {
	constructor() {
		this.debug = Madebug.status;
		let start, end;
		if (this.debug) {
			start = performance.now();
		}
		
		if (Page.invalid) return;
		if (!User.id) return;
		View.make();
		if (Memory.got()) Memory.read();
		else $('#myprogressbar').hide();
		if (Vale.vale()) autocomplete(document.getElementById('findOrderInp'), CMFile.all());

		if (this.debug) {
			end = performance.now();
			console.log(`App took ${end - start} ms...`);
		}
	}
}
let myapp = new App();
if (!Memory.got()) $('#myprogressbar').hide();