function createEl(prop) {
	let el = document.createElement(prop.el.toUpperCase());
	if (!(prop.styles === undefined)) {
		prop.styles = prop.styles.split('|');
		prop.styles.forEach((style) => {
			styler(style, el);
		});
	}
	if (!(prop.callback === undefined)) {
		el.addEventListener(prop.callback.type, prop.callback.handler);
	}
	if (!(prop.id === undefined)) {
		el.setAttribute('id', prop.id);
	}
	if (!(prop.group === undefined)) {
		el.setAttribute('group', prop.group);
	}
	if (!(prop.class === undefined)) {
		el.setAttribute('class', prop.class);
	}
	if (!(prop.name === undefined)) {
		el.setAttribute('name', prop.name);
	}
	if (!(prop.type === undefined)) {
		el.setAttribute('type', prop.type);
	}
	if (!(prop.min === undefined)) {
		el.setAttribute('min', prop.min);
	}
	if (!(prop.max === undefined)) {
		el.setAttribute('max', prop.max);
	}
	if (!(prop.step === undefined)) {
		el.setAttribute('step', prop.step);
	}
	if (!(prop.for === undefined)) {
		el.setAttribute('for', prop.for);
	}
	if (!(prop.colspan === undefined)) {
		el.setAttribute('colspan', prop.colspan);
	}
	if (!(prop.rowspan === undefined)) {
		el.setAttribute('rowspan', prop.rowspan);
	}
	if (!(prop.cols === undefined)) {
		el.setAttribute('cols', prop.cols);
	}
	if (!(prop.rows === undefined)) {
		el.setAttribute('rows', prop.rows);
	}
	if (!(prop.value === undefined)) {
		el.setAttribute('value', prop.value);
	}
	if (!(prop.checked === undefined)) {
		el.checked = prop.checked;
	}
	if (!(prop.placeholder === undefined)) {
		el.setAttribute('placeholder', prop.placeholder);
	}
	if (!(prop.innerHTML === undefined)) {
		el.innerHTML = prop.innerHTML;
	}
	return el;
}
function styler(style, target) {
	style = style.split(':');
	let data = {
		key: style[0],
		value: style[1]
	}
	target.style[data.key] = data.value;
}
function makeView() {
	makeSnackbar();
	makeModal();
	makeToolbar();
	buildView();
}
function makeSnackbar() {
	document.body.appendChild(createEl({el: 'div', id: 'mysnackbar', innerHTML: 'default msg'}));
}
function makeModal() {
	let modal = createEl({
		el: 'div',
		id: 'myModal',
		class: 'mymodal'
	});
	document.body.appendChild(modal);

	let content = createEl({
		el: 'div',
		id: 'myModalContent',
		class: 'mymodal-content'
	});
	modal.appendChild(content);

	window.onclick = function(e) {
		if (e.target === modal) {
			modal.style.display = 'none';
		}
	}
}

function makeToolbar() {
	let toolbar = createEl({
		el: 'div',
		class: getClassName(),
		id: 'toolbar'
	});
	function getClassName() {
		let text = 'toolbar';
		if (Setting.give('toolbar').placetoright) text += ' right';
		if (!Setting.give('toolbar').alwaysshow) text += ' noshow';
		return text;
	}
	document.body.appendChild(toolbar);

	let toggler = createEl({
		el: 'button',
		id: 'toolbarToggler',
		innerHTML: '+'
	});
	toolbar.appendChild(toggler);

	if (!Vale.vale()) toolbar.appendChild(tbVale());
	else {
		toolbar.appendChild(tbTeamSelect());
		toolbar.appendChild(tbSummaryTable());
		toolbar.appendChild(tbProgressBar());
		toolbar.appendChild(tbOrderFinder());
		toolbar.appendChild(tbActionButton());
		toolbar.appendChild(tbViewSetting());
	}
}
function tbVale() {
	let panel;
	panel = createEl({el: 'div', styles: 'position:relative'});
	panel.appendChild(createEl({
		el: 'input',
		styles: 'padding:8px|marginBottom:.5rem',
		type: 'text',
		id: 'codeinput',
		placeholder: 'Enter code'}));
	panel.appendChild(createEl({el: 'button', innerHTML: 'go', callback: {type: 'click', handler: () => {
		let val = $('#codeinput').val();
		if (Vale.vale(val)) {
			Snackbar.showy('yes','Code verified...');
			Setting.patch('key', val);
			Old.scan();
			setTimeout(() => {
				location.reload();
			}, 2500);
		}
		else {
			Snackbar.showy('no','Invalid code...');
			$('#codeinput').val('');
		}
	}}, styles: 'position:absolute|top:0|right:0|padding:8px|width:auto'}));
	panel.appendChild(createEl({el: 'button', innerHTML: 'get code', callback: {
		type: 'click',
		handler: () => {
			Modal.show();
		}
	}}));
	return panel;
}
function tbTeamSelect() {
	let panel, box, input, label;
	panel = createEl({
		el: 'div',
		class: 'teamSetting'
	});

	box = createEl({
		el: 'div'
	});
	input = createEl({
		el: 'input',
		type: 'radio',
		name: 'teamSelect',
		checked: (Setting.give('profile').team === 'alpha') ? true : false,
		id: 'alphaTeam',
		value: 'alpha'
	});
	label = createEl({
		el: 'label',
		for: 'alphaTeam',
		innerHTML: 'alpha'
	});
	box.appendChild(input);
	box.appendChild(label);
	panel.appendChild(box);

	box = createEl({
		el: 'div'
	});
	input = createEl({
		el: 'input',
		type: 'radio',
		name: 'teamSelect',
		checked: (Setting.give('profile').team === 'bravo') ? true : false,
		id: 'bravoTeam',
		value: 'bravo'
	});
	label = createEl({
		el: 'label',
		for: 'bravoTeam',
		innerHTML: 'bravo'
	});
	box.appendChild(input);
	box.appendChild(label);
	panel.appendChild(box);

	return panel;
}
function tbSummaryTable() {
	let table, tr, th, td;

	table = createEl({
		el: 'table'
	});

	let r2, r3, r4, r5a, rb5;
	let records = CMFile.all();

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: '#'}));
	tr.appendChild(createEl({el: 'th', innerHTML: 'all'}));
	tr.appendChild(createEl({el: 'th', innerHTML: 'np'}));
	tr.appendChild(createEl({el: 'th', innerHTML: 'pp'}));
	tr.appendChild(createEl({el: 'th', innerHTML: 'c'}));
	table.appendChild(tr);

	if (User.team === 'alpha') {
		r2 = CMFile.aging(2, records);
		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'a2'}));
		tr.appendChild(createEl({el: 'td', innerHTML: r2.length, class: 'all'}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.NP, r2).length}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.PP, r2).length, class: 'pp'}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.COM, r2).length, class: 'c'}));
		table.appendChild(tr);

		r3 = CMFile.aging(3, records);
		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'a3'}));
		tr.appendChild(createEl({el: 'td', innerHTML: r3.length, class: 'all'}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.NP, r3).length}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.PP, r3).length, class: 'pp'}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.COM, r3).length, class: 'c'}));
		table.appendChild(tr);

		r4 = CMFile.aging(4, records);
		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'a4'}));
		tr.appendChild(createEl({el: 'td', innerHTML: r4.length, class: 'all'}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.NP, r4).length}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.PP, r4).length, class: 'pp'}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.COM, r4).length, class: 'c'}));
		table.appendChild(tr);
	} else {
		r5a = CMFile.aging('5a', records);
		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'a5[a]'}));
		tr.appendChild(createEl({el: 'td', innerHTML: r5a.length, class: 'all'}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.NP, r5a).length}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.PP, r5a).length, class: 'pp'}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.COM, r5a).length, class: 'c'}));
		table.appendChild(tr);

		r5b = CMFile.aging('5b', records);
		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'a5[b]'}));
		tr.appendChild(createEl({el: 'td', innerHTML: r5b.length, class: 'all'}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.NP, r5b).length}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.PP, r5b).length, class: 'pp'}));
		tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.COM, r5b).length, class: 'c'}));
		table.appendChild(tr);
	}
	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: '='}));
	tr.appendChild(createEl({el: 'td', innerHTML: records.length, class: 'all'}));
	tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.NP, records).length}));
	tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.PP, records).length, class: 'pp'}));
	tr.appendChild(createEl({el: 'td', innerHTML: CMFile.filter(CMFilter.COM, records).length, class: 'c'}));
	table.appendChild(tr);

	return table;
}
function tbProgressBar() {
	let panel, text, progress, bar;

	panel = createEl({
		el: 'div',
		class: 'myprogressbar',
		id: 'myprogressbar'
	});

	panel.appendChild(createEl({
		el: 'p',
		class: 'text-center',
		innerHTML: '-',
		id: 'myprogresstext'
	}));
	progress = createEl({
		el: 'div',
		id: 'myprogress'
	});
	progress.appendChild(createEl({
		el: 'span',
		id: 'mybarText',
		innerHTML: '- %'
	}));
	progress.appendChild(createEl({
		el: 'div',
		id: 'mybar'
	}));
	panel.appendChild(progress);

	return panel;
}
function tbOrderFinder() {
	let panel, input;
	panel = createEl({el: 'div', styles: 'margin:.5rem 0'});
	input = createEl({el: 'input', class: 'caxkit', placeholder: 'Search', callback: {type: 'focus', handler: () => {
		Modal.show();
		document.getElementById('myMainView').style.display = 'none';
		document.getElementById('mySearchView').style.display = 'block';
		document.getElementById('single-filewindow-noshow').style.display = 'block';
		document.getElementById('single-filewindow').style.display = 'none';
		document.getElementById('findOrderInp').focus();
		document.getElementById('findOrderInp').value = '';
	}}});
	panel.appendChild(input);
	return panel;
}
function tbActionButton() {
	let panel = createEl({
		el: 'div'
	});
	if (Page.is('single')) {
		panel.appendChild(createEl({
			el: 'button',
			innerHTML: 'view',
			callback: {
				type: 'click',
				handler: () => {
					let csid = document.getElementById("ctl00_Content_lblBasic_Order").innerText.split(" ")[0];

					if (CMFile.exist('saleid', csid)) {
						document.getElementById('myMainView').style.display = 'none';
						document.getElementById('mySearchView').style.display = 'block';
						document.getElementById('single-filewindow-noshow').style.display = 'block';
						document.getElementById('single-filewindow').style.display = 'none';
						document.getElementById('findOrderInp').value = csid;

						FileWindow.update('single', CMFile.where('saleid', csid));
						$('#single-filewindow').show();
						$('#single-filewindow-noshow').hide();
						$('#findOrderInp').val(csid);

						Modal.show();
					}
					else {
						Snackbar.show('Please SYNC first...');
					}
				}
			}
		}));
	} else {
		panel.appendChild(createEl({
			el: 'button',
			innerHTML: 'sync',
			callback: {
				type: 'click',
				handler: () => {
					let records = CMFile.all();
					if (records.length < 1) {
						if (!confirm('No data found, fetch new files?')) return;
						if (Page.is('home')) Fetcher.fetch();
						else {
							console.log('need to go home');
							Memory.put({
								page: 'home',
								action: 'gfcba'
							});
							location.href = Page.url('home');
						}
					}
					else {
						// if (Memory.got() && Memory.fetch('action') === 'mso' && Memory.fetch('page') === 'listing') {
						// 	console.log('stuck? refresh...');
						// 	Snackbar.show('reloading...');
						// 	setTimeout(() => {
						// 		location.reload();
						// 	}, 1000);
						// 	return;
						// }
						if (!confirm('Update files?')) return;
						if (Page.is('home')) Fetcher.update();
						else {
							Memory.put({
								page: 'home',
								action: 'gufcba'
							});
							location.href = Page.url('home');
						}
					}
					// Modal.show();
					// document.getElementById('myMainView').style.display = 'none';
					// document.getElementById('mySearchView').style.display = 'block';
				}
			}
		}));
	}
		
	panel.appendChild(createEl({
		el: 'button',
		innerHTML: 'menu',
		callback: {
			type: 'click',
			handler: () => {
				Modal.show();
				document.getElementById('mySearchView').style.display = 'none';
				document.getElementById('myMainView').style.display = 'block';
			}
		}
	}));
	return panel;
}
function tbViewSetting() {
	let panel, box, input, label;
	panel = createEl({el: 'div', class: 'tbViewSetting'});

	box = createEl({el: 'div'});
	box.appendChild(createEl({el: 'input', type:'checkbox', id: 'vptr', checked: Setting.give('toolbar').placetoright ? true : false, callback: {type: 'click', handler: () => {
		console.log(this.value);
	}}}));
	box.appendChild(createEl({el: 'label', for: 'vptr', innerHTML: 'Place to right'}));
	panel.appendChild(box);

	box = createEl({el: 'div'});
	box.appendChild(createEl({el: 'input', type:'checkbox', id: 'vast', checked: Setting.give('toolbar').alwaysshow ? true : false}));
	box.appendChild(createEl({el: 'label', for: 'vast', innerHTML: 'Always show toolbar'}));
	panel.appendChild(box);

	return panel;
}

function buildView() {
	if (!Vale.vale()) Modal.add(getValeView());
	else {
		Modal.add(getSearchView());
		Modal.add(getMainView());
	}
}


function myAutoComplete() {
	let panel;

	panel = createEl({
		el: 'div',
		class: 'myautocomplete'
	});
	panel.appendChild(createEl({
		el: 'input',
		type: 'search',
		class: 'caxkit',
		placeholder: 'Search',
		id: 'findOrderInp'
	}));

	return panel;
}
function modalAddView(view, reset) {
	if (reset) { console.log('need to clear modal'); }
	document.getElementById('myModalContent').appendChild(view);
}
function getValeView() {
	let panel = createEl({el: 'div'});
	panel.appendChild(createEl({el: 'p', class: 'text-center', innerHTML: 'Please make a payment of <b>RM 50</b> to:'}));
	panel.appendChild(createEl({el: 'p', class: 'text-center', innerHTML: '<b>Maybank</b>'}));
	panel.appendChild(createEl({el: 'p', class: 'text-center', innerHTML: '<b>Badrul Munir Ibrahim</b>'}));
	panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: '157344085687', styles: 'color:red|background:lightgray|padding:1rem|borderRadius:1rem|cursor:pointer|fontWeight:bold', callback: {
		type: 'click',
		handler: () => {
			Misc.copy('157344085687');
			Snackbar.show('Bank acc. number copied...');
		}
	}}));
	panel.appendChild(createEl({el: 'p', class: 'text-center', innerHTML: 'and send <b>payment receipt</b> to:'}));
	panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: '+60176454826', styles: 'color:green|background:lightgray|padding:1rem|borderRadius:1rem|cursor:pointer|fontWeight:bold', callback: {
		type: 'click',
		handler: () => {
			let target = '60176454826';
			let url = `https://wa.me/${target}?text=Get code ${User.id}`;
			url = encodeURI(url);
			setTimeout(() => {
				window.open(url);
			}, 500);
			Snackbar.show('Requesting code...');
		}
	}}));
	panel.appendChild(createEl({el: 'p', class: 'text-center', innerHTML: '<b>Code will be given after payment have been verified</b> thru ws. Thank you...'}));
	return panel;
}
function getSearchView() {
	let panel = createEl({el: 'div', id: 'mySearchView'});
	panel.appendChild(myAutoComplete());
	panel.appendChild(getFileWindow('single'));
	panel.appendChild(createEl({el: 'div', id: 'single-filewindow-noshow', class: 'text-center', innerHTML: 'No data', styles: 'padding:24px'}));
	return panel;
}
function getMainView() {
	let panel = createEl({el: 'div', id: 'myMainView'});
	let mylist = [
		{id: 'info', text: 'info', view: getMenuInfoView()},
		{id: 'files', text: 'files', view: getMenuFilesView()},
		{id: 'setting', text: 'setting', view: getMenuSettingView()}
	]
	if (Madebug.status) mylist.push({id: 'madebug', text: 'debug', view: getMenuDebugView()});
	panel.appendChild(createTabs({
		group: 'menu',
		list: mylist
	}));
	return panel;
}

function createTabs(tabs) {
	let panel = createEl({el: 'div'});
	let mytab = createEl({el: 'div', class: 'tab myscrollbar'});

	// Create tabs button group
	tabs.list.forEach((tab) => {
		let btn = createEl({
			el: 'button',
			class: getcn(),
			innerHTML: tab.text,
			callback: {
				type: 'click',
				handler: function(e) {
					openTab(e, tab.id, tabs.group + 'tc', tabs.group + 'tl');
					if (tab.id === 'info') CAInfo.update();
				}
			}
		});
		mytab.appendChild(btn);
		function getcn() {
			let name = 'tablinks ' + tabs.group + 'tl';
			if (tab.id === 'files') return name + ' defaultOpen';
			else return name;
		}
	});
	panel.appendChild(mytab);

	// Create tabs content
	tabs.list.forEach((tab) => {
		let box = createEl({
			el: 'div',
			id: tab.id,
			class: 'tabcontent ' + tabs.group + 'tc'
		});
		box.appendChild(tab.view);
		panel.appendChild(box);
	});

	return panel;
}

function getMenuDebugView() {
	let panel = createEl({el: 'div'});
	panel.appendChild(createEl({el: 'h3', innerHTML: 'Debugger'}));
	panel.appendChild(getTextInput());
	panel.appendChild(getAllFile());

	return panel;

	function getTextInput() {
		let panel = createEl({el: 'div'});
		panel.appendChild(createEl({el: 'p', class: 'text-center', innerHTML: 'Data viewer'}));
		panel.appendChild(createEl({el: 'textarea', id: 'madebuginput', class: 'caxkit', cols: '30', rows: '16'}));
		panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'save', callback: {type: 'click', handler: () => {
			console.log('saving');
			let data;
			try {
				data = JSON.parse($('#madebuginput').val());
			}
			catch(err) {
				return;
			}
			if (!CMFile.exist('saleid', data.saleid)) {
				CMFile.add(data);
				Snackbar.show('data added...');
			}
			else Snackbar.show('data existed...');
		}}}));
		return panel;
	}
	function getAllFile() {
		let panel = createEl({el: 'div', styles: 'maxHeight:300px|overflowY:auto'});
		let records = CMFile.all();
		records.forEach((record,idx,arr) => {
			panel.appendChild(oneRecord(record,idx));
		});
		return panel;

		function oneRecord(record,idx) {
			let panel = createEl({el: 'div', styles: 'position:relative'});
			(idx % 2 === 0) ? panel.style.background = '#ccc' : panel.style.background = '';
			panel.appendChild(createEl({el: 'span', innerHTML: record.saleid}));
			panel.appendChild(createEl({el: 'p', innerHTML: record.name}));
			panel.appendChild(getAction());
			return panel;

			function getAction() {
				let panel = createEl({el: 'div', styles: 'position:absolute|top:0|right:0'});
				panel.appendChild(createEl({el: 'button', innerHTML: 'get', callback: {type: 'click', handler: () => {
					console.log(record.saleid);
					$('#madebuginput').val(JSON.stringify(record));
				}}}));
				panel.appendChild(createEl({el: 'button', innerHTML: 'del', callback: {type: 'click', handler: () => {
					if (confirm('Remove data?')) CMFile.remove(record.saleid);
				}}}));
				return panel;
			}
		}
	}
}

function getMenuInfoView() {
	let panel = createEl({el: 'div'});
	const d = new Date()
	let verification_code = localStorage.getItem('code');
	panel.appendChild(createEl({el: 'h3', innerHTML: 'Info - ' + User.id}));
	if (CMFile.all().length > 0) {
		if (User.team === 'alpha' && CMFile.aging(2, CMFile.all()).length < 1) {
			panel.appendChild(createEl({el: 'div', id: 'infoview-noshow', class: 'text-center', innerHTML: 'No data', styles: 'padding:24px'}));
			return panel;
		}
		if (User.team === 'bravo' && CMFile.aging('5a', CMFile.all()).length < 1) {
			panel.appendChild(createEl({el: 'div', id: 'infoview-noshow', class: 'text-center', innerHTML: 'No data', styles: 'padding:24px'}));
			return panel;
		}
		panel.appendChild(createEl({el: 'p', id: 'tdinfolastupdate', innerHTML: 'as of + db.lastup'}));
		panel.appendChild(getMenuInfoViewSummary());
		panel.appendChild(createEl({el: 'p', innerHTML: 'Est. current earning'}));
		panel.appendChild(createEl({el: 'h3', id: 'tdrateest', innerHTML: 'RM ' + CAInfo.ratesum().toLocaleString('en-US', {maximumFractionDigits:2})}));
		panel.appendChild(getMenuInfoViewRates());
		panel.appendChild(createEl({el: 'p', innerHTML: 'Est. goal earning'}));
		panel.appendChild(createEl({el: 'h3', id: 'tdrategoalest', innerHTML: CAInfo.ratesum(true)}));
		panel.appendChild(getMenuInfoViewRatesGoal());
	}
	else {
		panel.appendChild(createEl({el: 'div', id: 'infoview-noshow', class: 'text-center', innerHTML: 'No data', styles: 'padding:24px'}));
	}
	return panel;
}
function getMenuInfoViewSummary() {
	let panel, table, tr, td;

	panel = createEl({el: 'div', styles: 'overflowX:auto', class: 'myscrollbar'});
	table = createEl({el: 'table', class: 'mytable'});
	panel.appendChild(table);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th'}));
	tr.appendChild(createEl({el: 'th'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'th', innerHTML: 'a2'}));
		tr.appendChild(createEl({el: 'th', innerHTML: 'a3'}));
		tr.appendChild(createEl({el: 'th', innerHTML: 'a4'}));
	}
	else {
		tr.appendChild(createEl({el: 'th', innerHTML: 'a5[a]'}));
		tr.appendChild(createEl({el: 'th', innerHTML: 'a5[b]'}));
	}
	tr.appendChild(createEl({el: 'th', innerHTML: 'overall'}));
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: 't.target'}));
	tr.appendChild(createEl({el: 'th', innerHTML: '(rm)'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'td', id: 'tdinfottarget2', innerHTML: CAInfo.target(2)}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfottarget3', innerHTML: CAInfo.target(3)}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfottarget4', innerHTML: CAInfo.target(4)}));
	}
	else {
		tr.appendChild(createEl({el: 'td', id: 'tdinfottarget5a', innerHTML: CAInfo.target('5a')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfottarget5b', innerHTML: CAInfo.target('5b')}));
	}
	tr.appendChild(createEl({el: 'td', id: 'tdinfottargetoa', innerHTML: CAInfo.target()}));
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: 'goal [g]', rowspan: '2'}));
	tr.appendChild(createEl({el: 'th', innerHTML: '(%)'}));
	if (User.team === 'alpha') {
		td = createEl({el: 'td'});
		td.appendChild(createEl({el: 'input', id: 'tdinfogoalper2', type: 'number', callback: {type: 'change', handler: () => CAInfo.update()}, class: 'caxkit min-w-50px', value: CAInfo.goal(2, '%')}));
		tr.appendChild(td);
		td = createEl({el: 'td'});
		td.appendChild(createEl({el: 'input', id: 'tdinfogoalper3', type: 'number', callback: {type: 'change', handler: () => CAInfo.update()}, class: 'caxkit min-w-50px', value: CAInfo.goal(3, '%')}));
		tr.appendChild(td);
		td = createEl({el: 'td'});
		td.appendChild(createEl({el: 'input', id: 'tdinfogoalper4', type: 'number', callback: {type: 'change', handler: () => CAInfo.update()}, class: 'caxkit min-w-50px', value: CAInfo.goal(4, '%')}));
		tr.appendChild(td);
	}
	else {
		td = createEl({el: 'td'});
		td.appendChild(createEl({el: 'input', id: 'tdinfogoalper5a', type: 'number', callback: {type: 'change', handler: () => CAInfo.update()}, class: 'caxkit min-w-50px', value: CAInfo.goal('5a', '%')}));
		tr.appendChild(td);
		td = createEl({el: 'td'});
		td.appendChild(createEl({el: 'input', id: 'tdinfogoalper5b', type: 'number', callback: {type: 'change', handler: () => CAInfo.update()}, class: 'caxkit min-w-50px', value: CAInfo.goal('5b', '%')}));
		tr.appendChild(td);
	}
	td = createEl({el: 'td'});
	td.appendChild(createEl({el: 'input', id: 'tdinfogoalperoa', type: 'number', callback: {type: 'change', handler: () => CAInfo.update()}, class: 'caxkit min-w-50px', value: CAInfo.goal('oa', '%')}));
	tr.appendChild(td);
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: '(rm)', styles: 'textAlign:center'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'td', id: 'tdinfogoalrm2', innerHTML: CAInfo.goal(2, 'rm')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfogoalrm3', innerHTML: CAInfo.goal(3, 'rm')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfogoalrm4', innerHTML: CAInfo.goal(4, 'rm')}));
	}
	else {
		tr.appendChild(createEl({el: 'td', id: 'tdinfogoalrm5a', innerHTML: CAInfo.goal('5a', 'rm')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfogoalrm5b', innerHTML: CAInfo.goal('5b', 'rm')}));
	}
	tr.appendChild(createEl({el: 'td', id: 'tdinfogoalrmoa', innerHTML: CAInfo.goal('oa', 'rm')}));
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: 'collected [c]', rowspan: '2'}));
	tr.appendChild(createEl({el: 'th', innerHTML: '(%)'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'td', id: 'tdinfocollectedper2', innerHTML: CAInfo.collected(2, '%')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfocollectedper3', innerHTML: CAInfo.collected(3, '%')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfocollectedper4', innerHTML: CAInfo.collected(4, '%')}));
	}
	else {
		tr.appendChild(createEl({el: 'td', id: 'tdinfocollectedper5a', innerHTML: CAInfo.collected('5a', '%')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfocollectedper5b', innerHTML: CAInfo.collected('5b', '%')}));
	}
	tr.appendChild(createEl({el: 'td', id: 'tdinfocollectedperoa', innerHTML: CAInfo.collected('oa', '%')}));
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: '(rm)', styles: 'textAlign:center'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'td', id: 'tdinfocollectedrm2', innerHTML: CAInfo.collected(2, 'rm')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfocollectedrm3', innerHTML: CAInfo.collected(3, 'rm')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfocollectedrm4', innerHTML: CAInfo.collected(4, 'rm')}));
	}
	else {
		tr.appendChild(createEl({el: 'td', id: 'tdinfocollectedrm5a', innerHTML: CAInfo.collected('5a', 'rm')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfocollectedrm5b', innerHTML: CAInfo.collected('5b', 'rm')}));
	}
		
	tr.appendChild(createEl({el: 'td', id: 'tdinfocollectedrmoa', innerHTML: CAInfo.collected('oa', 'rm')}));
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: 'short [g-c]'}));
	tr.appendChild(createEl({el: 'th', innerHTML: '(rm)'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'td', id: 'tdinfoshort2', innerHTML: CAInfo.short(2)}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfoshort3', innerHTML: CAInfo.short(3)}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfoshort4', innerHTML: CAInfo.short(4)}));
	}
	else {
		tr.appendChild(createEl({el: 'td', id: 'tdinfoshort5a', innerHTML: CAInfo.short('5a')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfoshort5b', innerHTML: CAInfo.short('5b')}));
	}
	tr.appendChild(createEl({el: 'td', id: 'tdinfoshortoa', innerHTML: CAInfo.short('oa')}));
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: 'float', rowspan: '2'}));
	tr.appendChild(createEl({el: 'th', innerHTML: '(file)'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'td', id: 'tdinfofloatfile2', innerHTML: CAInfo.float(2, 'file')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfofloatfile3', innerHTML: CAInfo.float(3, 'file')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfofloatfile4', innerHTML: CAInfo.float(4, 'file')}));
	}
	else {
		tr.appendChild(createEl({el: 'td', id: 'tdinfofloatfile5a', innerHTML: CAInfo.float('5a', 'file')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfofloatfile5b', innerHTML: CAInfo.float('5b', 'file')}));	
	}
	tr.appendChild(createEl({el: 'td', id: 'tdinfofloatfileoa', innerHTML: CAInfo.float('oa', 'file')}));
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: '(rm)', styles: 'textAlign:center'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'td', id: 'tdinfofloatrm2', innerHTML: CAInfo.float(2, 'rm')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfofloatrm3', innerHTML: CAInfo.float(3, 'rm')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfofloatrm4', innerHTML: CAInfo.float(4, 'rm')}));
	}
	else {
		tr.appendChild(createEl({el: 'td', id: 'tdinfofloatrm5a', innerHTML: CAInfo.float('5a', 'rm')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfofloatrm5b', innerHTML: CAInfo.float('5b', 'rm')}));
	}
	tr.appendChild(createEl({el: 'td', id: 'tdinfofloatrmoa', innerHTML: CAInfo.float('oa', 'rm')}));
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: 'short - float'}));
	tr.appendChild(createEl({el: 'th', innerHTML: '(rm)'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'td', id: 'tdinfoshortfloat2', innerHTML: CAInfo.short(2, true)}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfoshortfloat3', innerHTML: CAInfo.short(3, true)}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfoshortfloat4', innerHTML: CAInfo.short(4, true)}));
	}
	else {
		tr.appendChild(createEl({el: 'td', id: 'tdinfoshortfloat5a', innerHTML: CAInfo.short('5a', true)}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfoshortfloat5b', innerHTML: CAInfo.short('5b', true)}));
	}
	tr.appendChild(createEl({el: 'td', id: 'tdinfoshortfloatoa', innerHTML: CAInfo.short('oa', true)}));
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: 'deadline', colspan: '2'}));
	td = createEl({el: 'td', colspan: (User.team === 'alpha') ? '4' : '3'});
	td.appendChild(createEl({el: 'input', id: 'tdinfodeadline', type: 'date', class: 'caxkit max-w-150px', value: mydb.data.info.deadline, callback: {type: 'change', handler: () => CAInfo.update()}}));
	tr.appendChild(td);
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: 'collect/day'}));
	tr.appendChild(createEl({el: 'th', innerHTML: '(rm)'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'td', id: 'tdinfoperday2', innerHTML: CAInfo.perday(2)}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfoperday3', innerHTML: CAInfo.perday(3)}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfoperday4', innerHTML: CAInfo.perday(4)}));
	}
	else {
		tr.appendChild(createEl({el: 'td', id: 'tdinfoperday5a', innerHTML: CAInfo.perday('5a')}));
		tr.appendChild(createEl({el: 'td', id: 'tdinfoperday5b', innerHTML: CAInfo.perday('5b')}));
	}
	tr.appendChild(createEl({el: 'td', id: 'tdinfoperdayoa', innerHTML: CAInfo.perday('oa')}));
	table.appendChild(tr);

	return panel;
}
function getMenuInfoViewRates() {
	let panel, table, tr;

	panel = createEl({el: 'div', styles: 'overflowX:auto', class: 'myscrollbar'});
	table = createEl({el: 'table', class: 'mytable'});
	panel.appendChild(table);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th'}));
	tr.appendChild(createEl({el: 'th'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'th', innerHTML: 'a2'}));
		tr.appendChild(createEl({el: 'th', innerHTML: 'a3'}));
		tr.appendChild(createEl({el: 'th', innerHTML: 'a4'}));
	}
	else {
		tr.appendChild(createEl({el: 'th', innerHTML: 'a5[a]'}));
		tr.appendChild(createEl({el: 'th', innerHTML: 'a5[b]'}));
	}
	tr.appendChild(createEl({el: 'th', innerHTML: 'overall'}));
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: 'rates level'}));
	tr.appendChild(createEl({el: 'th', innerHTML: '(%)'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'td', id: 'tdratelevel2', innerHTML: CAInfo.ratelevel(2, true)}));
		tr.appendChild(createEl({el: 'td', id: 'tdratelevel3', innerHTML: CAInfo.ratelevel(3, true)}));
		tr.appendChild(createEl({el: 'td', id: 'tdratelevel4', innerHTML: CAInfo.ratelevel(4, true)}));
	}
	else {
		tr.appendChild(createEl({el: 'td', id: 'tdratelevel5a', innerHTML: CAInfo.ratelevel('5a', true)}));
		tr.appendChild(createEl({el: 'td', id: 'tdratelevel5b', innerHTML: CAInfo.ratelevel('5b', true)}));
	}
	tr.appendChild(createEl({el: 'td', innerHTML: '-'}));
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: 'amount'}));
	tr.appendChild(createEl({el: 'th', innerHTML: '(rm)'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'td', id: 'tdraterm2', innerHTML: CAInfo.rateamount(2)}));
		tr.appendChild(createEl({el: 'td', id: 'tdraterm3', innerHTML: CAInfo.rateamount(3)}));
		tr.appendChild(createEl({el: 'td', id: 'tdraterm4', innerHTML: CAInfo.rateamount(4)}));
	}
	else {
		tr.appendChild(createEl({el: 'td', id: 'tdraterm5a', innerHTML: CAInfo.rateamount('5a')}));
		tr.appendChild(createEl({el: 'td', id: 'tdraterm5b', innerHTML: CAInfo.rateamount('5b')}));
	}
	tr.appendChild(createEl({el: 'td', id: 'tdratermoa', innerHTML: CAInfo.ratesum()}));
	table.appendChild(tr);

	return panel;
}
function getMenuInfoViewRatesGoal() {
	let panel, table, tr;

	panel = createEl({el: 'div', styles: 'overflowX:auto', class: 'myscrollbar'});
	table = createEl({el: 'table', class: 'mytable'});
	panel.appendChild(table);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th'}));
	tr.appendChild(createEl({el: 'th'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'th', innerHTML: 'a2'}));
		tr.appendChild(createEl({el: 'th', innerHTML: 'a3'}));
		tr.appendChild(createEl({el: 'th', innerHTML: 'a4'}));
	}
	else {
		tr.appendChild(createEl({el: 'th', innerHTML: 'a5[a]'}));
		tr.appendChild(createEl({el: 'th', innerHTML: 'a5[b]'}));
	}
	tr.appendChild(createEl({el: 'th', innerHTML: 'overall'}));
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: 'rates level'}));
	tr.appendChild(createEl({el: 'th', innerHTML: '(%)'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'td', id: 'tdratelevelgoal2', innerHTML: CAInfo.ratelevel(2, true, true)}));
		tr.appendChild(createEl({el: 'td', id: 'tdratelevelgoal3', innerHTML: CAInfo.ratelevel(3, true, true)}));
		tr.appendChild(createEl({el: 'td', id: 'tdratelevelgoal4', innerHTML: CAInfo.ratelevel(4, true, true)}));
	}
	else {
		tr.appendChild(createEl({el: 'td', id: 'tdratelevelgoal5a', innerHTML: CAInfo.ratelevel('5a', true, true)}));
		tr.appendChild(createEl({el: 'td', id: 'tdratelevelgoal5b', innerHTML: CAInfo.ratelevel('5b', true, true)}));
	}
	tr.appendChild(createEl({el: 'td', innerHTML: '-'}));
	table.appendChild(tr);

	tr = createEl({el: 'tr'});
	tr.appendChild(createEl({el: 'th', innerHTML: 'amount'}));
	tr.appendChild(createEl({el: 'th', innerHTML: '(rm)'}));
	if (User.team === 'alpha') {
		tr.appendChild(createEl({el: 'td', id: 'tdratermgoal2', innerHTML: CAInfo.rateamount(2, true)}));
		tr.appendChild(createEl({el: 'td', id: 'tdratermgoal3', innerHTML: CAInfo.rateamount(3, true)}));
		tr.appendChild(createEl({el: 'td', id: 'tdratermgoal4', innerHTML: CAInfo.rateamount(4, true)}));
	}
	else {
		tr.appendChild(createEl({el: 'td', id: 'tdratermgoal5a', innerHTML: CAInfo.rateamount('5a', true)}));
		tr.appendChild(createEl({el: 'td', id: 'tdratermgoal5b', innerHTML: CAInfo.rateamount('5b', true)}));
	}
	tr.appendChild(createEl({el: 'td', id: 'tdratermgoaloa', innerHTML: CAInfo.ratesum(true)}));
	table.appendChild(tr);

	return panel;
}

function getMenuFilesView() {
	let panel = createEl({el: 'div'});
	let records = CMFile.all();
	panel.appendChild(getButtonGroup('mycatbtn', [
			{ text: 'recent', callback: {type: 'click', handler: () => allHandler(CMFile.filter(CMFilter.RECENT, records))}, count: CMFile.filter(CMFilter.RECENT, records).length, color: 'peru' },
			{ text: 'all', callback: {type: 'click', handler: () => allHandler(records)}, count: records.length, color: 'lightblue' },
			{ text: 'np', callback: {type: 'click', handler: () => allHandler(CMFile.filter(CMFilter.NP, records))}, count: CMFile.filter(CMFilter.NP, records).length },
			{ text: 'pp', callback: {type: 'click', handler: () => allHandler(CMFile.filter(CMFilter.PP, records))}, count: CMFile.filter(CMFilter.PP, records).length, color: 'orange'},
			{ text: 'c', callback: {type: 'click', handler: () => allHandler(CMFile.filter(CMFilter.COM, records))}, count: CMFile.filter(CMFilter.COM, records).length, color: 'lightgreen' },
			{ text: 'float', cid: 'fcfloat', callback: {type: 'click', handler: () => allHandler(CMFile.filter(CMFilter.FLOAT, records))}, count: CMFile.filter(CMFilter.FLOAT, records).length, color: 'cyan' },
			{ text: 'ptp', cid: 'fcptp', callback: {type: 'click', handler: () => allHandler(CMFile.filter(CMFilter.PTP, records).sort((a,b) => {
				return new Date(a.date.ptp) - new Date(b.date.ptp);
			}))}, count: CMFile.filter(CMFilter.PTP, records).length, color: 'gold' },
			{ text: 'broken', callback: {type: 'click', handler: () => allHandler(CMFile.filter(CMFilter.BROKEN, records).sort((a,b) => {
				return new Date(a.date.ptp) - new Date(b.date.ptp);
			}))}, count: CMFile.filter(CMFilter.BROKEN, records).length, color: 'lightcoral' },
			{ text: 'visit', cid: 'fcvisit', callback: {type: 'click', handler: () => allHandler(CMFile.filter(CMFilter.VISIT, records))}, count: CMFile.filter(CMFilter.VISIT, records).length, color: 'lightblue' },
			{ text: 'removed', callback: {type: 'click', handler: () => allHandler(CMFile.filter(CMFilter.REMOVED, mydb.records))}, count: CMFile.filter(CMFilter.REMOVED, mydb.records).length, color: 'red' }
		]));
	$('#mycatbtn button').click(function() {
		console.log(this);
		$(this).addClass('active').siblings().removeClass('active');
	});
	panel.appendChild(getButtonGroup('myagbtn', getmyagbtnlist()));
	panel.appendChild(createEl({el: 'div', id: 'areasContainer'}));
	panel.appendChild(createEl({el: 'div', id: 'ptpsContainer'}));
	function getmyagbtnlist() {
		if (User.team === 'alpha') {
			return [
				{ text: 'a2', callback: {type: 'click', handler: () => agingHandler(2)}, cid: 'mya2btnc' },
				{ text: 'a3', callback: {type: 'click', handler: () => agingHandler(3)}, cid: 'mya3btnc' },
				{ text: 'a4', callback: {type: 'click', handler: () => agingHandler(4)}, cid: 'mya4btnc' }
			];
		}
		else {
			return [
				{ text: 'a5a', callback: {type: 'click', handler: () => agingHandler('5a')}, cid: 'mya5abtnc' },
				{ text: 'a5b', callback: {type: 'click', handler: () => agingHandler('5b')}, cid: 'mya5bbtnc' }
			];
		}
	}
	// panel.appendChild(getButtonGroup([
	// 		{ text: 'area', callback: {type: 'click', handler: console.log('Dummy area')} }
	// 	]));
	panel.appendChild(getTotalToCollect());

	panel.appendChild(getFileNavigator());

	panel.appendChild(getFileWindow('many'));

	panel.appendChild(createEl({el: 'div', id: 'many-filewindow-noshow', class: 'text-center', innerHTML: 'No data', styles: 'padding:24px'}));

	return panel;

	function getTotalToCollect() {
		let panel = createEl({el: 'div'});
		panel.appendChild(createEl({el: 'h1', class: 'filenotice text-center', innerHTML: '-', id: 'filenotice-totaltocollect', styles: 'color:darkred|margin:0'}));
		panel.appendChild(createEl({el: 'h1', class: 'filenotice text-center', innerHTML: '-', id: 'filenotice-totalfloated', styles: 'color:rebeccapurple|margin:0'}));
		panel.appendChild(createEl({el: 'h1', class: 'filenotice text-center', innerHTML: '-', id: 'filenotice-totalptp', styles: 'color:brown|margin:0|marginBottom:1rem'}));
		return panel;
	}
	function getFileNavigator() {
		let panel = createEl({el: 'div', class: 'mynavigator', id: 'file-mynavigator'});
		panel.appendChild(createEl({el: 'button', innerHTML: '←', callback: {type: 'click', handler: () => FileNav.prev()}}));

		let sub = createEl({el: 'div'});
		sub.appendChild(createEl({el: 'span', innerHTML: '1', id: 'fileNavIdx', styles: 'background:#404040|padding:2px|borderRadius:2px', callback: {type: 'click', handler: () => {
			let max = parseInt($('#fileNavMax').text());
			// console.log('jump to ' + );
			let idx = prompt('JUMP TO (MAX : ' + max + ')');
			if (idx === '' || !idx) idx = 0;
			idx = parseInt(idx);
			if (idx > max || idx < 1) {
				console.log('ur head');
				return;
			}
			FileNav.view(idx);
		}}}));
		sub.appendChild(createEl({el: 'span', innerHTML: 'title', id: 'fileNavTitle'}));
		sub.appendChild(createEl({el: 'span', innerHTML: '200', id: 'fileNavMax'}));
		panel.appendChild(sub);

		panel.appendChild(createEl({el: 'button', innerHTML: '→', callback: {type: 'click', handler: () => FileNav.next()}}));
		return panel;
	}
	function getButtonGroup(group, buttons) {
		let panel = createEl({el: 'div', id: group, class: 'btn-group myscrollbar'});
		buttons.forEach((button) => {
			let btn = createEl({el: 'button', innerHTML: button.text + ' ', callback: button.callback});
			btn.appendChild(createEl({el: 'span', innerHTML: button.count, styles: 'color:' + button.color, id: button.cid}));
			panel.appendChild(btn);
		});
		return panel;

	}

	function allHandler(datas) {
		FileNav.clear();
		FileNav.setAging(datas);
	}
	function agingHandler(aging) {
		if ($('#mycatbtn button.active').text().includes('ptp')) makePtpBtn(FileNav.setPtp(aging));
		else if ($('#mycatbtn button.active').text().includes('broken')) makePtpBtn(FileNav.setPtp(aging));
		else makeAreaBtn(FileNav.setArea(aging));
		FileNav.setFocus(myfilenav.aging);
		FileNav.view();
	}
	function makeAreaBtn(areas) {
		$('#areasContainer').empty();
		document.getElementById('areasContainer').appendChild(getButtonGroup('myareabtn', areas));
	}
	function makePtpBtn(ptps) {
		$('#ptpsContainer').empty();
		document.getElementById('ptpsContainer').appendChild(getButtonGroup('myptpbtn', ptps));
	}
}
function getFileWindow(group) {
	let panel, sub;

	panel = createEl({el: 'div', class: 'filewindow', id: group + '-filewindow'});
	panel.appendChild(createEl({el: 'h1', class: 'filenotice text-center', innerHTML: 'cancellation', id: group + '-filenotice-cancel'}));
	panel.appendChild(createEl({el: 'h1', class: 'filenotice text-center', innerHTML: 'ptp : 2021-29-11', id: group + '-filenotice-ptp'}));
	panel.appendChild(createEl({el: 'h1', class: 'filenotice text-center', innerHTML: 'float : RM 399.00', id: group + '-filenotice-float', styles: 'color:royalblue'}));
	panel.appendChild(createEl({el: 'p', innerHTML: '-', id: group + '-filecreatedon'}));

	sub = createEl({el: 'div', class: 'fa-group'});
	sub.appendChild(createEl({el: 'button', innerHTML: 'open', callback: {type: 'click', handler: () => {
		let sid = $('#' + group + '-tdsaleid').text();
		Quick.file(sid);
	}}}));
	sub.appendChild(createEl({el: 'button', innerHTML: 'check o/s', callback: {type: 'click', handler: () => {
		let nric = $('#' + group + '-tdnric').text();
		Quick.os(nric);
	}}}));
	sub.appendChild(createEl({el: 'button', innerHTML: 'float', callback: {type: 'click', handler: () => {
		let sid = $('#' + group + '-tdsaleid').text();
		Quick.float(sid);
	}}}));
	sub.appendChild(createEl({el: 'button', innerHTML: 'moto', callback: {type: 'click', handler: () => {
		let sid = $('#' + group + '-tdsaleid').text();
		Quick.moto(sid);
	}}}));
	sub.appendChild(createEl({el: 'button', innerHTML: 'new card', callback: {type: 'click', handler: () => {
		let sid = $('#' + group + '-tdsaleid').text();
		Quick.newcard(sid);
	}}}));
	sub.appendChild(createEl({el: 'button', innerHTML: 'wrong ref-1', callback: {type: 'click', handler: () => {
		let sid = $('#' + group + '-tdsaleid').text();
		Quick.wrongref(sid);
	}}}));

	panel.appendChild(sub);
	panel.appendChild(getMyFileTable(group));

	panel.appendChild(createEl({el: 'button', class: 'btn-block dark viewmorebtn', innerHTML: 'view more', group: group}));

	panel.appendChild(getFileAction([
			{ name: 'call', callback: {type: 'click', handler: () => {
				let sid = $('#' + group + '-tdsaleid').text();
				let data = CMFile.give(sid);
				location.href = 'tel:+' + $(`input[type=radio][name="${group}-contact"]:checked`).attr('value');
			}} },
			{ name: 'add contact', callback: {type: 'click', handler: () => {
				let sid = $('#' + group + '-tdsaleid').text();
				let data = CMFile.give(sid);
				let name = Parser.parse(data, Setting.give('general').cmnameformat, true);
				Misc.copy(name);
				location.href = 'tel:+' + $(`input[type=radio][name="${group}-contact"]:checked`).attr('value');
			}} }
		]));
	panel.appendChild(getFileAction([
			{ name: 'prev. ws', callback: {type: 'click', handler: () => {
				let res = getWs();
				alert(res);
			}} },
			{ name: 'copy ws', callback: {type: 'click', handler: () => {
				let res = getWs();
				Misc.copy(res);
				Snackbar.show('WS copied...');
			}} },
			{ name: 'send ws', callback: {type: 'click', handler: () => {
				sendWs();
			}} }
		]));
	function getWs() {
		let sid = $('#' + group + '-tdsaleid').text();
		let data = CMFile.give(sid);
		let res;
		if (CMFile.is('completed', data)) {
			res = Parser.parse(data, Setting.give('template').ws.completed);
		} else if (CMFile.is('partial', data)) {
			res = Parser.parse(data, Setting.give('template').ws.partial);
		} else {
			let stage = parseInt($('#' + group + '-tdstage').text());
			let mygroup = '';
			if (User.team === 'alpha') {
				switch(data.aging.flat) {
					case 2:
						mygroup = 'a';
						break;
					case 3:
						mygroup = 'b';
						break;
					case 4:
						mygroup = 'c';
						break;
					default:
						console.log('hof');
				}
			} else {
				if (data.aging.flat === 5 && data.unbill.aging <= 3) mygroup = 'b';
				else if (data.aging.flat === 5 && data.unbill.aging > 3) mygroup = 'c';
			}
			res = Parser.parse(data, Setting.give('template').ws.main[stage - 1][mygroup]);
		}
		return res;
	}
	function sendWs() {
		let target = $(`input[type=radio][name="${group}-contact"]:checked`).attr('value');
		// let url = 'https://wa.me/' + target;
		let url = 'whatsapp://send/?phone=' + target;
		url = encodeURI(url);
		
		Misc.copy(getWs());
		setTimeout(() => {
			window.open(url);
		}, 500);
		Snackbar.show('Sending ws...');
	}
	panel.appendChild(getFileAction([
			{ name: 'prev. sms', callback: {type: 'click', handler: () => {
				let res = getSms();
				alert(res);
			}} },
			{ name: 'copy sms', callback: {type: 'click', handler: () => {
				Misc.copy(getSms());
				Snackbar.show('SMS copied...');
			}} },
			{ name: 'send sms', callback: {type: 'click', handler: () => {
				sendSms();
			}} }
		]));
	function getSms() {
		let sid = $('#' + group + '-tdsaleid').text();
		let data = CMFile.give(sid);
		let res;
		if (CMFile.is('completed', data)) {
			res = Parser.parse(data, Setting.give('template').sms.completed);
		} else if (CMFile.is('partial', data)) {
			res = Parser.parse(data, Setting.give('template').sms.partial);
		} else {
			let stage = parseInt($('#' + group + '-tdstage').text());
			let mygroup = '';
			if (User.team === 'alpha') {
				switch(data.aging.flat) {
					case 2:
						mygroup = 'a';
						break;
					case 3:
						mygroup = 'b';
						break;
					case 4:
						mygroup = 'c';
						break;
					default:
						console.log('hof');
				}
			} else {
				if (data.aging.flat === 5 && data.unbill.aging <= 3) mygroup = 'b';
				else if (data.aging.flat === 5 && data.unbill.aging > 3) mygroup = 'c';
			}
			res = Parser.parse(data, Setting.give('template').sms.main[stage - 1][mygroup]);
		}
		return res;
	}
	function sendSms() {
		let target = $(`input[type=radio][name="${group}-contact"]:checked`).attr('value');
		let url = 'sms:+' + target;
		url = encodeURI(url);
		Misc.copy(getSms());
		setTimeout(() => {
			window.open(url);
		}, 500);
		Snackbar.show('Sending sms...');
	}
	panel.appendChild(getFileAction([
			{ name: 'preview email', callback: {type: 'click', handler: () => {
				alert(getEmail().body);
			}} },
			{ name: 'send email', callback: {type: 'click', handler: () => {
				sendEmail();
			}} }
		]));
	function getEmail() {
		let sid = $('#' + group + '-tdsaleid').text();
		let data = CMFile.give(sid);
		let res = {
			subject: Parser.parse(data, Setting.give('template').email.subject),
			body: Parser.parse(data, Setting.give('template').email.body)
		}
		return res;
	}
	function sendEmail() {
		let sid = $('#' + group + '-tdsaleid').text();
		let data = CMFile.give(sid);
		let email = getEmail();

		let url = 'mailto:' + data.email + '?subject=' + email.subject;
		url = encodeURI(url);
		Misc.copy(email.body);
		setTimeout(() => {
			location.href = url;
		}, 500);
		Snackbar.show('Sending email...');
	}

	panel.appendChild(createEl({el: 'hr'}));

	panel.appendChild(getFileCancel());

	return panel;

	function getFileCancel() {
		let panel = createEl({el: 'div', styles: 'display:flex|alignItems:center'});
		panel.appendChild(createEl({el: 'p', innerHTML: 'Cancellation file?'}));
		panel.appendChild(createEl({el: 'input', type: 'checkbox', styles: 'flexGrow:1', class: 'tdcancelfile', id: group + '-tdcancelfile', group: group}));
		return panel;
	}
	function getFileAction(actions) {
		let panel = createEl({el: 'div', class: 'fa-box'});
		actions.forEach((action) => {
			panel.appendChild(createEl({el: 'button', innerHTML: action.name, callback: action.callback}));
		});
		return panel;
	}
	function getMyFileTable(group) {
		let table, tr, td;

		table = createEl({el: 'table', class: 'myfiletable', id: group + '-myfiletable'});

		tr = createEl({el: 'tr', class: 'optional'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Aging'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdaging', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr', class: 'optional'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Unbill aging'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdunbill', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Order No.', styles: 'color:royalblue', callback: {type: 'click', handler: () => {
			let sid = $('#' + group + '-tdsaleid').text();
			Misc.copy(sid);
			Snackbar.show(sid + ' copied...');
		}}}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdsaleid', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Name', styles: 'color:royalblue', callback: {type: 'click', handler: () => {
			let name = $('#' + group + '-tdname').text();
			Misc.copy(name);
			Snackbar.show(name + ' copied...');
		}}}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdname', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'NRIC/Com No.', styles: 'color:royalblue', callback: {type: 'click', handler: () => {
			let nric = $('#' + group + '-tdnric').text();
			Misc.copy(nric);
			Snackbar.show(nric + ' copied...');
		}}}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdnric', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Notes'}));
		td = createEl({el: 'td', id: group + '-tdnote'});
		td.appendChild(getNotesViewer(group));
		tr.appendChild(td);
		table.appendChild(tr);

		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'O/S total'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdostotal', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr', class: 'optional'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'O/S target'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdostarget', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr', class: 'optional'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'O/S paid'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdospaid', innerHTML: '-'}));
		table.appendChild(tr);

		// tr = createEl({el: 'tr'});
		// tr.appendChild(createEl({el: 'th', innerHTML: 'Rental fee'}));
		// tr.appendChild(createEl({el: 'td', id: group + '-tdrental', innerHTML: '-'}));
		// table.appendChild(tr);
		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Rental fee'}));
		//tr.appendChild(createEl({el: 'td', id: group + '-tdrental', innerHTML: '-'}));
		td = createEl({el: 'td'});
		td.appendChild(createEl({el: 'input', id: group + '-tdrental', type: 'number', class: 'caxkit', min: '1.00', step: '1.00', callback: {type: 'change', handler: () => {
			let sid = $('#' + group + '-tdsaleid').text();
			let data = CMFile.give(sid);
			let val = parseFloat($('#' + group + '-tdrental').val());
			val = isNaN(val) ? 1 : val;
			data.rental = val;
			CMFile.update(sid, data);
			let idx = parseInt($('#fileNavIdx').text());
			(group === 'many') ? FileNav.view(idx) : FileWindow.update(group, data);
			Snackbar.show(`Rental fee updated to RM ${val} ...`);
		}}}));
		tr.appendChild(td);
		table.appendChild(tr);

		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Scheme'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdscheme', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr', class: 'optional'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Obg. Period'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdperiod', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Product'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdproduct', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Last service'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdlastservice', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr', class: 'optional'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Inst. date'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdinstdate', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr', class: 'optional'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Contract end'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdcontractend', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr', class: 'optional'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Emg name'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdemgname', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr', class: 'optional'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Emg relation'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdemgrel', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr', class: 'optional'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Inst. address', styles: 'color:royalblue', callback : {type: 'click', handler: () => {
			let addr = $('#' + group + '-tdinstaddr').text();
			Misc.copy(addr);
			Snackbar.show('Address copied...');
		}}}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdinstaddr', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr', class: 'optional'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Email'}));
		tr.appendChild(createEl({el: 'td', id: group + '-tdemail', innerHTML: '-'}));
		table.appendChild(tr);

		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Float'}));
		td = createEl({el: 'td'});
		td.appendChild(createEl({el: 'input', id: group + '-tdfloat', type: 'number', class: 'caxkit', min: '1.00', step: '1.00', callback: {type: 'change', handler: () => {
			let sid = $('#' + group + '-tdsaleid').text();
			let data = CMFile.give(sid);
			let val = parseFloat($('#' + group + '-tdfloat').val());
			val = isNaN(val) ? 0 : val;
			data.float = val;
			CMFile.update(sid, data);
			let idx = parseInt($('#fileNavIdx').text());
			(group === 'many') ? FileNav.view(idx) : FileWindow.update(group, data);
			if (val <= 0) {
				let count = CMFile.filter(CMFilter.FLOAT, CMFile.all());
				$('#fcfloat').text(count.length);
				Snackbar.show('Float removed...');
			}
			else {
				let count = CMFile.filter(CMFilter.FLOAT, CMFile.all());
				$('#fcfloat').text(count.length);
				Snackbar.show(`Float RM ${val} ...`);
			}
		}}}));
		tr.appendChild(td);
		table.appendChild(tr);

		// begin insert due date
		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Due'}));
		td = createEl({el: 'td'});
		td.appendChild(createEl({el: 'input', id: group + '-tddue', type: 'date', class: 'caxkit', callback: {type: 'change', handler: () => {
			let sid = $('#' + group + '-tdsaleid').text();
			let data = CMFile.give(sid);
			let val = $('#' + group + '-tddue').val();
			data.date.due = val;
			CMFile.update(sid, data);
			let idx = parseInt($('#fileNavIdx').text());
			(group === 'many') ? FileNav.view(idx) : FileWindow.update(group, data);
			(val === '') ? Snackbar.show('Due date removed...') : Snackbar.show(`Due date set to ${val}...`);
		}}}));
		tr.appendChild(td);
		table.appendChild(tr);
		// end insert due date

		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'PTP'}));
		td = createEl({el: 'td'});
		td.appendChild(createEl({el: 'input', id: group + '-tdptp', type: 'date', class: 'caxkit', callback: {type: 'change', handler: () => {
			let sid = $('#' + group + '-tdsaleid').text();
			let data = CMFile.give(sid);
			let val = $('#' + group + '-tdptp').val();
			data.date.ptp = val;
			CMFile.update(sid, data);
			let idx = parseInt($('#fileNavIdx').text());
			(group === 'many') ? FileNav.view(idx) : FileWindow.update(group, data);
			if (val === '') {
				let count = CMFile.filter(CMFilter.PTP, CMFile.all());
				$('#fcptp').text(count.length);
				Snackbar.show('PTP removed...');
			}
			else {
				let count = CMFile.filter(CMFilter.PTP, CMFile.all());
				$('#fcptp').text(count.length);
				Snackbar.show(`PTP set to ${val}...`);
			}
			// console.log(data);
		}}}));
		tr.appendChild(td);
		table.appendChild(tr);

		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Stage'}));
		td = createEl({el: 'td'});
		td.appendChild(getStageViewer(group));
		tr.appendChild(td);
		table.appendChild(tr);

		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'Contact'}));
		td = createEl({el: 'td'});
		td.appendChild(getContactViewer());
		tr.appendChild(td);
		table.appendChild(tr);

		tr = createEl({el: 'tr'});
		tr.appendChild(createEl({el: 'th', innerHTML: 'To visit'}));
		td = createEl({el: 'td'});
		td.appendChild(createEl({el: 'input', type: 'checkbox', id: group + '-tdvisit', callback: {type: 'change', handler: () => {
			let sid = $('#' + group + '-tdsaleid').text();
			let data = CMFile.give(sid);
			let val = document.getElementById(group + '-tdvisit').checked;
			data.visit = val;
			CMFile.update(sid, data);
			let idx = parseInt($('#fileNavIdx').text());
			(group === 'many') ? FileNav.view(idx) : FileWindow.update(group, data);
			if (!val) {
				let count = CMFile.filter(CMFilter.VISIT, CMFile.all());
				$('#fcvisit').text(count.length);
				Snackbar.show('Removed from visit list...');
			}
			else {
				let count = CMFile.filter(CMFilter.VISIT, CMFile.all());
				$('#fcvisit').text(count.length);
				Snackbar.show(`Added to visit list...`);
			}
		}}}));
		tr.appendChild(td);
		table.appendChild(tr);

		return table;

		function getNotesViewer(group) {
			let panel = createEl({el: 'div'});
			let head = createEl({el: 'div', class: 'noteshead'});
			head.appendChild(createEl({el: 'span', innerHTML: '0', id: group + '-notecount'}));
			head.appendChild(createEl({el: 'button', id: group + '-notetoggler', styles: 'flexGrow:4|background:lightslategrey', innerHTML: '↓', callback: {type: 'click', handler: () => {openNote(group);}}}));
			head.appendChild(createEl({el: 'button', styles: 'flexGrow:1|background:cornflowerblue', innerHTML: '+', callback: {type: 'click', handler: () => {
				let msg = prompt('NEW NOTE');
				if (!msg || msg === '') {
					console.log('Nothing it seems');
					console.log(msg);
					return;
				}
				let sid = $(`#${group}-tdsaleid`).text();
				let record = CMFile.give(sid);
				let note = {
					text: msg,
					created: new Date(),
					edited: null
				};
				let notes = record.notes;
				notes.push(note);
				record.notes = notes;
				CMFile.update(sid, record);
				Snackbar.show('Note added...');
				FileWindow.update(group, record);
			}}}));
			panel.appendChild(head);

			let body = createEl({el: 'div', class: 'notesbody', id: group + '-notebody'});
			body.appendChild(createEl({el: 'p', innerHTML: 'None'})); // If no note
			// getNotes(); // If got note
			panel.appendChild(body);

			return panel;
		}
		function getStageViewer(group) {
			let panel = createEl({el: 'div'});

			let sub = createEl({el: 'div', class: 'mystage'});
			sub.appendChild(createEl({el: 'span', innerHTML: '1', id: group + '-tdstage'}));
			sub.appendChild(createEl({el: 'button', innerHTML: '↑', callback: {type: 'click', handler: () => {
				let stage = parseInt($('#' + group + '-tdstage').text());
				stage++;
				if (stage > Setting.give('general').maxreminderstage) {
					Snackbar.show('Max stage reach!');
					return;
				}
				let sid = $('#' + group + '-tdsaleid').text();
				let data = CMFile.give(sid);
				data.stage.val = stage;
				data.stage.ts = new Date();
				data.stage.last = stage - 1;
				CMFile.update(sid, data);
				FileWindow.update(group, data);
				// Snackbar.show('Stage set!');
			}}}));
			sub.appendChild(createEl({el: 'button', innerHTML: '↓', callback: {type: 'click', handler: () => {
				let stage = parseInt($('#' + group + '-tdstage').text());
				stage--;
				if (stage < 1) {
					Snackbar.show('Min stage reach!');
					return;
				}
				let sid = $('#' + group + '-tdsaleid').text();
				let data = CMFile.give(sid);
				data.stage.val = stage;
				data.stage.ts = new Date();
				data.stage.last = stage + 1;
				CMFile.update(sid, data);
				FileWindow.update(group, data);
				// Snackbar.show('Stage set!');
			}}}));
			panel.appendChild(sub);

			panel.appendChild(createEl({el: 'span', id: group + '-tdstagelast'}));

			return panel;
		}
		function getContactViewer() {
			let panel = createEl({el: 'div', class: 'mycontact', id: group + '-tdcontact'});
			// getContacts(); // If got contact
			return panel;
		}
	}
}
function getContacts(prop) {
	prop.contacts.forEach((contact,idx,arr) => {
		getContact(contact, idx, prop.def);
	});

	function getContact(contact, idx, def) {
		let container = document.getElementById(prop.target);
		container.appendChild(createEl({el: 'p', innerHTML: contact.name}));
		container.appendChild(createEl({el: 'input', type: 'radio', name: prop.group + '-contact', id: prop.group + '-c' + idx, innerHTML: contact.name, checked: def === idx ? true : false, value: contact.tel, callback: {type: 'change', handler: () => {
			let sid = $('#' + prop.group + '-tdsaleid').text();
			let data = CMFile.give(sid);
			data.contact.default = idx;
			CMFile.update(sid, data);
			Snackbar.show(`default contact updated...`);
		}}}));
		container.appendChild(createEl({el: 'label', for: prop.group + '-c' + idx, innerHTML: contact.rawtel}));
		container.appendChild(createEl({el: 'button', innerHTML: 'copy', callback: {type: 'click', handler: () => copytel()}}));

		function copytel() {
			Misc.copy('+' + contact.tel);
			Snackbar.show(`+${contact.tel} copied...`);
		}
	}
}
function getNotes(prop) {
	prop.notes.forEach((note,idx,arr) => {
		document.getElementById(prop.target).appendChild(getNote(note, idx));
	});

	function getNote(note, idx) {
		let panel = createEl({el: 'div', class: 'note'});

		let sub = createEl({el: 'div', class: 'na-group'});
		sub.appendChild(createEl({el: 'button', id: prop.group + '-ntcancel' + idx, innerHTML: '❌', styles: 'display:none', callback: {type: 'click', handler: () => {
			// Cancel edit note
			$('#' + prop.group + '-nttext' + idx).attr('contenteditable', 'false');
			$('#' + prop.group + '-nttext' + idx).text(note.text);
			$('#' + prop.group + '-ntsave' + idx).hide();
			$('#' + prop.group + '-ntcancel' + idx).hide();
			$('#' + prop.group + '-ntedit' + idx).show();
		}}}));
		sub.appendChild(createEl({el: 'button', id: prop.group + '-ntsave' + idx, innerHTML: '✔', styles: 'display:none', callback: {type: 'click', handler: () => {
			// Save edit note
			$('#' + prop.group + '-nttext' + idx).attr('contenteditable', 'false');

			let sid = $('#' + prop.group + '-tdsaleid').text();
			let record = CMFile.give(sid);
			let notes = record.notes;
			notes[idx].text = $('#' + prop.group + '-nttext' + idx).text();
			record.notes = notes;

			$('#' + prop.group + '-ntcancel' + idx).hide();
			$('#' + prop.group + '-ntsave' + idx).hide();
			$('#' + prop.group + '-ntedit' + idx).show();

			CMFile.update(sid, record);
			Snackbar.show('note updated...');
			FileWindow.update(prop.group, record);
		}}}));
		sub.appendChild(createEl({el: 'button', id: prop.group + '-ntedit' + idx, innerHTML: 'edit', callback: {type: 'click', handler: () => {
			// Begin edit note
			$('#' + prop.group + '-ntedit' + idx).hide();
			$('#' + prop.group + '-ntcancel' + idx).show();
			$('#' + prop.group + '-ntsave' + idx).show();

			$('#' + prop.group + '-nttext' + idx).attr('contenteditable', 'true');
			let textInput = document.getElementById(prop.group + '-nttext' + idx);
			textInput.focus();
		}}}));
		panel.appendChild(sub);
		panel.appendChild(createEl({el: 'span', id: prop.group + '-ntdel' + idx, innerHTML: '✘', callback: {type: 'click', handler: () => {
			// Delete note
			if (!confirm('Delete note?')) return;
			console.log(`deleting note ${idx}...`);
			let sid = $('#' + prop.group + '-tdsaleid').text();
			let record = CMFile.give(sid);
			let notes = record.notes;
			notes.splice(idx, 1);
			record.notes = notes;
			CMFile.update(sid, record);
			Snackbar.show(`Note deleted...`);
			FileWindow.update(prop.group, record);
		}}}));
		panel.appendChild(createEl({el: 'span', id: prop.group + '-ntcreated' + idx, innerHTML: new Date(note.created.toString()).toLocaleString()}));
		panel.appendChild(createEl({el: 'p', id: prop.group + '-nttext' + idx, innerHTML: note.text}));

		return panel;
	}
}

function getMenuSettingView() {
	let panel = createEl({el: 'div'});

	panel.appendChild(createTabs({
		group: 'setting',
		list: [
			{ id: 'infoSetting', text: 'info', view: getMenuInfoSettingView() },
			{ id: 'generalSetting', text: 'general', view: getMenuGeneralSettingView() },
			{ id: 'profileSetting', text: 'profile', view: getMenuProfileSettingView() },
			{ id: 'templateSetting', text: 'template', view: getMenuTemplateSettingView() },
			{ id: 'dataSetting', text: 'options', view: getMenuDataSettingView() }
		]
	}));

	return panel;

	function getMenuInfoSettingView() {
		let panel = createEl({el: 'div'});

		panel.appendChild(createEl({el: 'h3', innerHTML: 'info setting'}));
		panel.appendChild(createEl({el: 'h4', innerHTML: 'commission rates'}));
		panel.appendChild(getRatesTable());

		return panel;

		function getRatesTable() {
			let panel = createEl({el: 'div', class: 'myscrollbar'});
			let table, tr, td;
			table = createEl({el: 'table', class: 'myfiletable'});

			tr = createEl({el: 'tr'});
			tr.appendChild(createEl({el: 'th', colspan: '2', innerHTML: 'Ageing / Data', styles: 'padding:1rem'}));
			tr.appendChild(createEl({el: 'th', innerHTML: 'Level 1 (D)'}));
			tr.appendChild(createEl({el: 'th', innerHTML: 'Level 2 (C)'}));
			tr.appendChild(createEl({el: 'th', innerHTML: 'Level 3 (B)'}));
			tr.appendChild(createEl({el: 'th', innerHTML: 'Level 4 (A)'}));
			table.appendChild(tr);

			getRateRow((User.team === 'alpha') ? [{text: 2}, {text: 3}, {text: 4}] : [{text: '5a'}, {text: '5b'}]);

			panel.appendChild(table);
			return panel;

			function getRateRow(agings) {
				agings.forEach((aging) => {
					tr = createEl({el: 'tr'});
					tr.appendChild(createEl({el: 'th', innerHTML: aging.text, rowspan: '2'}));
					tr.appendChild(createEl({el: 'th', innerHTML: 'cond.'}));
					td = createEl({el: 'td'});
					td.appendChild(getRateBox('d', aging.text, Setting.give('rates')['a' + aging.text].d));
					tr.appendChild(td);
					td = createEl({el: 'td'});
					td.appendChild(getRateBox('c', aging.text, Setting.give('rates')['a' + aging.text].c));
					tr.appendChild(td);
					td = createEl({el: 'td'});
					td.appendChild(getRateBox('b', aging.text, Setting.give('rates')['a' + aging.text].b));
					tr.appendChild(td);
					td = createEl({el: 'td'});
					td.appendChild(getRateBox('a', aging.text, Setting.give('rates')['a' + aging.text].a));
					tr.appendChild(td);
					table.appendChild(tr);
					// Continue
					tr = createEl({el: 'tr'});
					tr.appendChild(createEl({el: 'th', innerHTML: 'rate'}));
					td = createEl({el: 'td'});
					td.appendChild(createEl({el: 'input', id: 'valrba' + aging.text + 'ld', type: 'number', min: '0.1', max: '100', step: '0.1', value: Setting.give('rates')['a' + aging.text].d.val, class: 'caxkit', callback: {type: 'change', handler: () => MyRate.update()}}));
					tr.appendChild(td);
					td = createEl({el: 'td'});
					td.appendChild(createEl({el: 'input', id: 'valrba' + aging.text + 'lc', type: 'number', min: '0.1', max: '100', step: '0.1', value: Setting.give('rates')['a' + aging.text].c.val, class: 'caxkit', callback: {type: 'change', handler: () => MyRate.update()}}));
					tr.appendChild(td);
					td = createEl({el: 'td'});
					td.appendChild(createEl({el: 'input', id: 'valrba' + aging.text + 'lb', type: 'number', min: '0.1', max: '100', step: '0.1', value: Setting.give('rates')['a' + aging.text].b.val, class: 'caxkit', callback: {type: 'change', handler: () => MyRate.update()}}));
					tr.appendChild(td);
					td = createEl({el: 'td'});
					td.appendChild(createEl({el: 'input', id: 'valrba' + aging.text + 'la', type: 'number', min: '0.1', max: '100', step: '0.1', value: Setting.give('rates')['a' + aging.text].a.val, class: 'caxkit', callback: {type: 'change', handler: () => MyRate.update()}}));
					tr.appendChild(td);
					table.appendChild(tr);
				});					
			}

			function getRateBox(level, aging, data) {
				let panel = createEl({el: 'div', class: 'commrate'});

				let select = createEl({el: 'select', name: 'operator', id: 'oprba' + aging + 'l' + level, callback: {type: 'change', handler: () => MyRate.update()}});
				select.appendChild(createEl({el: 'option', value: 'lt', innerHTML: '<'}));
				select.appendChild(createEl({el: 'option', value: 'gt', innerHTML: '>'}));
				panel.appendChild(select);

				(Setting.give('rates')['a' + aging][level].op === 'lt') ? select.selectedIndex = 0 : select.selectedIndex = 1;

				panel.appendChild(createEl({el: 'input', type: 'number', min: '1', max: '100', step: '1.00', value: data.fil, id: 'filrba' + aging + 'l' + level, callback: {type: 'change', handler: () => MyRate.update()}}));
				return panel;
			}
		}
	}
	function getMenuGeneralSettingView() {
		let panel = createEl({el: 'div'});

		panel.appendChild(createEl({el: 'h3', innerHTML: 'general setting'}));
		panel.appendChild(getGeneralTable());
		panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'update', callback: {type: 'click', handler: () => update()}}));

		return panel;

		function update() {
			let general = Setting.give('general');
			let prevstage = general.maxreminderstage;
			general.cmnameformat = $('#tdcmnameformat').val();
			general.compactcmname = document.getElementById('tdcompactcmname').checked;
			general.maxreminderstage = parseInt($('#tdmaxreminderstage').val());
			general.opennewtab = document.getElementById('tdopennewtab').checked;
			if (general.maxreminderstage !== prevstage) {
				let template = Setting.give('template');
				if (general.maxreminderstage > template.ws.main.length) {
					do {
						template.ws.main.push({ a: 'def ws a ' + (template.ws.main.length + 1), b: 'def ws b ' + (template.ws.main.length + 1) });
						template.sms.main.push({ a: 'def sms a ' + (template.sms.main.length + 1), b: 'def sms b ' + (template.sms.main.length + 1) });
						console.log('adding seeded template...');
					}
					while(general.maxreminderstage > template.ws.main.length);
					Setting.patch('template', template);
				}
				else if (general.maxreminderstage < prevstage) {
					$('#wscidx').text(general.maxreminderstage);
					$('#smscidx').text(general.maxreminderstage);
					if (User.team === 'alpha') {
						
						$('#wsgroupa').val(template.ws.main[general.maxreminderstage - 1].a);
						$('#smsgroupa').val(template.sms.main[general.maxreminderstage - 1].a);

						$('#wsgroupb').val(template.ws.main[general.maxreminderstage - 1].b);
						$('#smsgroupb').val(template.sms.main[general.maxreminderstage - 1].b);
					}
					else {
						$('#wsgroupb').val(template.ws.main[general.maxreminderstage - 1].b);
						$('#smsgroupb').val(template.sms.main[general.maxreminderstage - 1].b);
					}
				}
				$('#wscidxmax').text(general.maxreminderstage);
				$('#smscidxmax').text(general.maxreminderstage);
			}
			Setting.patch('general', general);
			Snackbar.show('General setting updated...');
		}

		function getGeneralTable() {
			let panel = createEl({el: 'div', class: 'myscrollbar'});
			let table, tr, td;
			table = createEl({el: 'table', class: 'myfiletable'});

			tr = createEl({el: 'tr'});
			tr.appendChild(createEl({el: 'th', innerHTML: 'CM Name Format', class: 'helpref', callback: {type: 'click', handler: () => showRef(true)}}));
			td = createEl({el: 'td'});
			td.appendChild(createEl({el: 'input', id: 'tdcmnameformat', type: 'text', class: 'caxkit', value: Setting.give('general').cmnameformat}));
			tr.appendChild(td);
			table.appendChild(tr);

			tr = createEl({el: 'tr'});
			tr.appendChild(createEl({el: 'th', innerHTML: 'Compact CM Name'}));
			td = createEl({el: 'td'});
			td.appendChild(createEl({el: 'input', id: 'tdcompactcmname', type: 'checkbox', checked: Setting.give('general').compactcmname}));
			tr.appendChild(td);
			table.appendChild(tr);

			tr = createEl({el: 'tr'});
			tr.appendChild(createEl({el: 'th', innerHTML: 'Max WS/SMS Stage'}));
			td = createEl({el: 'td'});
			td.appendChild(createEl({el: 'input', id: 'tdmaxreminderstage', type: 'number', class: 'caxkit', value: Setting.give('general').maxreminderstage}));
			tr.appendChild(td);
			table.appendChild(tr);

			tr = createEl({el: 'tr'});
			tr.appendChild(createEl({el: 'th', innerHTML: 'Open utility in new tab'}));
			td = createEl({el: 'td'});
			td.appendChild(createEl({el: 'input', id: 'tdopennewtab', type: 'checkbox', checked: Setting.give('general').opennewtab}));
			tr.appendChild(td);
			table.appendChild(tr);

			panel.appendChild(table);
			return panel;
		}
	}
	function getMenuProfileSettingView() {
		let panel = createEl({el: 'div'});

		panel.appendChild(createEl({el: 'h3', innerHTML: 'profile setting'}));
		panel.appendChild(getProfileTable());
		panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'update', callback: {type: 'click', handler: () => update()}}));

		return panel;

		function update() {
			let profile = Setting.give('profile');
			profile.name = $('#tdcaname').val();
			profile.tel = $('#tdcatel').val();
			// profile.team
			Setting.patch('profile', profile);
			Snackbar.show('Profile setting updated...');
		}

		function getProfileTable() {
			let panel = createEl({el: 'div', class: 'myscrollbar'});
			let table, tr, td;
			table = createEl({el: 'table', class: 'myfiletable'});

			tr = createEl({el: 'tr'});
			tr.appendChild(createEl({el: 'th', innerHTML: 'ID'}));
			tr.appendChild(createEl({el: 'td', innerHTML: User.id}));
			table.appendChild(tr);

			tr = createEl({el: 'tr'});
			tr.appendChild(createEl({el: 'th', innerHTML: 'CA Name'}));
			td = createEl({el: 'td'});
			td.appendChild(createEl({el: 'input', id: 'tdcaname', type: 'text', class: 'caxkit', value: Setting.give('profile').name}));
			tr.appendChild(td);
			table.appendChild(tr);

			tr = createEl({el: 'tr'});
			tr.appendChild(createEl({el: 'th', innerHTML: 'CA Tel'}));
			td = createEl({el: 'td'});
			td.appendChild(createEl({el: 'input', id: 'tdcatel', type: 'text', class: 'caxkit', value: Setting.give('profile').tel}));
			tr.appendChild(td);
			table.appendChild(tr);

			panel.appendChild(table);
			return panel;
		}
	}
	function getMenuTemplateSettingView() {
		let panel = createEl({el: 'div'});

		panel.appendChild(createTabs({
			group: 'template',
			list: [
				{ id: 'wsSetting', text: 'whatsapp', view: getWsSettingView() },
				{ id: 'smsSetting', text: 'sms', view: getSmsSettingView() },
				{ id: 'emailSetting', text: 'email', view: getEmailSettingView() },
				{ id: 'newcardSetting', text: 'new bankcard', view: getNewcardSettingView() },
				{ id: 'wrongrefSetting', text: 'wrong ref-1', view: getWrongrefSettingView() },
				{ id: 'motoSetting', text: 'moto', view: getMotoSettingView() }
			]
		}));

		return panel;

		function getWsSettingView() {
			let panel = createEl({el: 'div'});

			panel.appendChild(createTabs({
				group: 'ws',
				list: [
					{ id: 'mainwsSetting', text: 'main', view: getMainwsSettingView() },
					{ id: 'partialwsSetting', text: 'partial', view: getPartialwsSettingView() },
					{ id: 'completedwsSetting', text: 'completed', view: getCompletedwsSettingView() }
				]
			}));

			return panel;

			function getMainwsSettingView() {
				let panel = createEl({el: 'div'});

				panel.appendChild(getWsMainNavigator());
				if (User.team === 'alpha') {
					panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Ageing 2', callback: {type: 'click', handler: () => showRef()}}));
					panel.appendChild(createEl({el: 'textarea', id: 'wsgroupa', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').ws.main[0].a}));
					panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Ageing 3', callback: {type: 'click', handler: () => showRef()}}));
					panel.appendChild(createEl({el: 'textarea', id: 'wsgroupb', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').ws.main[0].b}));

					panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Ageing 4', callback: {type: 'click', handler: () => showRef()}}));
					panel.appendChild(createEl({el: 'textarea', id: 'wsgroupc', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').ws.main[0].c}));
				}
				else {
					panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Ageing 5a', callback: {type: 'click', handler: () => showRef()}}));
					panel.appendChild(createEl({el: 'textarea', id: 'wsgroupb', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').ws.main[0].b}));
					panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Ageing 5b', callback: {type: 'click', handler: () => showRef()}}));
					panel.appendChild(createEl({el: 'textarea', id: 'wsgroupc', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').ws.main[0].c}));
				}
				panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'update', callback: {type: 'click', handler: () => update()}}));

				return panel;

				function update() {
					let idx = parseInt($('#wscidx').text());
					let template = Setting.give('template');
					template.ws.main[idx - 1] = getval();
					Setting.patch('template', template);
					Snackbar.show(`WS main [${idx}] template updated...`);

					function getval() {
						if (User.team === 'alpha') {
							return {
								a: $('#wsgroupa').val(),
								b: $('#wsgroupb').val(),
								c: $('#wsgroupc').val()
							}
						}
						else {
							return {
								a: template.ws.main[idx - 1].a,
								b: $('#wsgroupb').val(),
								c: $('#wsgroupc').val()
							}
						}
					}
				}

				function getWsMainNavigator() {
					let panel = createEl({el: 'div', class: 'mynavigator'});

					panel.appendChild(createEl({el: 'button', innerHTML: '←', callback: {type: 'click', handler: () => {TempNav.prev('ws');}}}));
					panel.appendChild(getHead());
					panel.appendChild(createEl({el: 'button', innerHTML: '→', callback: {type: 'click', handler: () => {TempNav.next('ws');}}}));

					return panel;

					function getHead() {
						let panel = createEl({el: 'div'});
						panel.appendChild(createEl({el: 'span', id: 'wscidx', innerHTML: '1'}));
						panel.appendChild(createEl({el: 'span', innerHTML: 'WS Stage'}));
						panel.appendChild(createEl({el: 'span', id: 'wscidxmax', innerHTML: Setting.give('general').maxreminderstage}));
						return panel;
					}
				}
			}
			function getPartialwsSettingView() {
				let panel = createEl({el: 'div'});

				panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'WS Partial', callback: {type: 'click', handler: () => showRef()}}));
				panel.appendChild(createEl({el: 'textarea', id: 'wspartial', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').ws.partial}));
				panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'update', callback: {type: 'click', handler: () => update()}}));

				return panel;

				function update() {
					let template = Setting.give('template');
					template.ws.partial = $('#wspartial').val();
					Setting.patch('template', template);
					Snackbar.show(`WS partial template updated...`);
				}
			}
			function getCompletedwsSettingView() {
				let panel = createEl({el: 'div'});

				panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'WS Completed', callback: {type: 'click', handler: () => showRef()}}));
				panel.appendChild(createEl({el: 'textarea', id: 'wscompleted', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').ws.completed}));
				panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'update', callback: {type: 'click', handler: () => update()}}));

				return panel;

				function update() {
					let template = Setting.give('template');
					template.ws.completed = $('#wscompleted').val();
					Setting.patch('template', template);
					Snackbar.show(`WS completed template updated...`);
				}
			}
		}
		function getSmsSettingView() {
			let panel = createEl({el: 'div'});

			panel.appendChild(createTabs({
				group: 'sms',
				list: [
					{ id: 'mainsmsSetting', text: 'main', view: getMainsmsSettingView() },
					{ id: 'partialsmsSetting', text: 'partial', view: getPartialsmsSettingView() },
					{ id: 'completedsmsSetting', text: 'completed', view: getCompletedsmsSettingView() }
				]
			}));

			return panel;

			function getMainsmsSettingView() {
				let panel = createEl({el: 'div'});

				panel.appendChild(getSmsMainNavigator());

				if (User.team === 'alpha') {
					panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Ageing 2', callback: {type: 'click', handler: () => showRef()}}));
					panel.appendChild(createEl({el: 'textarea', id: 'smsgroupa', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').sms.main[0].a}));
					panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Ageing 3 & 4', callback: {type: 'click', handler: () => showRef()}}));
					panel.appendChild(createEl({el: 'textarea', id: 'smsgroupb', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').sms.main[0].b}));

					panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Ageing 4', callback: {type: 'click', handler: () => showRef()}}));
					panel.appendChild(createEl({el: 'textarea', id: 'smsgroupc', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').sms.main[0].c}));
				}
				else {
					panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Ageing 5a', callback: {type: 'click', handler: () => showRef()}}));
					panel.appendChild(createEl({el: 'textarea', id: 'smsgroupb', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').sms.main[0].b}));

					panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Ageing 5b', callback: {type: 'click', handler: () => showRef()}}));
					panel.appendChild(createEl({el: 'textarea', id: 'smsgroupc', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').sms.main[0].c}));
				}
				panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'update', callback: {type: 'click', handler: () => update()}}));

				return panel;

				function update() {
					let idx = parseInt($('#smscidx').text());
					let template = Setting.give('template');
					template.sms.main[idx - 1] = getval();
					Setting.patch('template', template);
					Snackbar.show(`SMS main [${idx}] template updated...`);

					function getval() {
						if (User.team === 'alpha') {
							return {
								a: $('#smsgroupa').val(),
								b: $('#smsgroupb').val(),
								c: $('#smsgroupc').val()
							}
						}
						else {
							return {
								a: template.sms.main[idx - 1].a,
								b: $('#smsgroupb').val(),
								c: $('#smsgroupc').val()
							}
						}
					}
				}

				function getSmsMainNavigator() {
					let panel = createEl({el: 'div', class: 'mynavigator'});

					panel.appendChild(createEl({el: 'button', innerHTML: '←', callback: {type: 'click', handler: () => TempNav.prev('sms')}}));
					panel.appendChild(getHead());
					panel.appendChild(createEl({el: 'button', innerHTML: '→', callback: {type: 'click', handler: () => TempNav.next('sms')}}));

					return panel;

					function getHead() {
						let panel = createEl({el: 'div'});
						panel.appendChild(createEl({el: 'span', id: 'smscidx', innerHTML: '1'}));
						panel.appendChild(createEl({el: 'span', innerHTML: 'SMS Stage'}));
						panel.appendChild(createEl({el: 'span', id: 'smscidxmax', innerHTML: Setting.give('general').maxreminderstage}));
						return panel;
					}
				}
			}
			function getPartialsmsSettingView() {
				let panel = createEl({el: 'div'});

				panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'SMS Partial', callback: {type: 'click', handler: () => showRef()}}));
				panel.appendChild(createEl({el: 'textarea', id: 'smspartial', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').sms.partial}));
				panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'update', callback: {type: 'click', handler: () => update()}}));

				return panel;

				function update() {
					let template = Setting.give('template');
					template.sms.partial = $('#smspartial').val();
					Setting.patch('template', template);
					Snackbar.show(`SMS partial template updated...`);
				}
			}
			function getCompletedsmsSettingView() {
				let panel = createEl({el: 'div'});

				panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'SMS Completed', callback: {type: 'click', handler: () => showRef()}}));
				panel.appendChild(createEl({el: 'textarea', name: '', id: '', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').sms.completed}));
				panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'update', callback: {type: 'click', handler: () => update()}}));

				return panel;

				function update() {
					let template = Setting.give('template');
					template.sms.completed = $('#smscompleted').val();
					Setting.patch('template', template);
					Snackbar.show(`SMS completed template updated...`);
				}
			}
		}
		function getEmailSettingView() {
			let panel = createEl({el: 'div'});

			panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Subject', callback: {type: 'click', handler: () => showRef()}}));
			panel.appendChild(createEl({el: 'input', id: 'emailsubject', type: 'text', class: 'caxkit', value: Setting.give('template').email.subject}));
			panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Body', callback: {type: 'click', handler: () => showRef()}}));
			panel.appendChild(createEl({el: 'textarea', id: 'emailbody', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').email.body}));
			panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'update', callback: {type: 'click', handler: () => update()}}));

			return panel;

			function update() {
				let template = Setting.give('template');
				template.email = {
					subject: $('#emailsubject').val(),
					body: $('#emailbody').val()
				}
				Setting.patch('template', template);
				Snackbar.show(`Email template updated...`);
			}
		}
		function getNewcardSettingView() {
			let panel = createEl({el: 'div'});

			panel.appendChild(createEl({el: 'p', class: 'text-center', innerHTML: 'Newcard Email Template'}));
			panel.appendChild(createEl({el: 'input', id: 'newcardto', type: 'text', class: 'caxkit', styles: 'marginBottom:.5rem', placeholder: 'TO', value: Setting.give('template').newcard.to}));
			panel.appendChild(createEl({el: 'input', id: 'newcardcc1', type: 'text', class: 'caxkit', styles: 'marginBottom:.5rem', placeholder: 'CC1', value: Setting.give('template').newcard.cc1}));
			panel.appendChild(createEl({el: 'input', id: 'newcardcc2', type: 'text', class: 'caxkit', placeholder: 'CC2', value: Setting.give('template').newcard.cc2}));
			panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Subject', callback: {type: 'click', handler: () => showRef()}}));
			panel.appendChild(createEl({el: 'input', id: 'newcardsubject', type: 'text', class: 'caxkit', placeholder: 'SUBJECT', value: Setting.give('template').newcard.subject}));
			panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Body', callback: {type: 'click', handler: () => showRef()}}));
			panel.appendChild(createEl({el: 'textarea', id: 'newcardbody', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').newcard.body}));
			panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'update', callback: {type: 'click', handler: () => update()}}));

			return panel;

			function update() {
				let template = Setting.give('template');
				template.newcard = {
					to: $('#newcardto').val(),
					cc1: $('#newcardcc1').val(),
					cc2: $('#newcardcc2').val(),
					subject: $('#newcardsubject').val(),
					body: $('#newcardbody').val()
				}
				Setting.patch('template', template);
				Snackbar.show(`Newcard template updated...`);
			}
		}
		function getWrongrefSettingView() {
			let panel = createEl({el: 'div'});

			panel.appendChild(createEl({el: 'p', class: 'text-center', innerHTML: 'Wrongref-1 Email Template'}));
			panel.appendChild(createEl({el: 'input', id: 'wrongrefto', type: 'text', class: 'caxkit', styles: 'marginBottom:.5rem', placeholder: 'TO', value: Setting.give('template').wrongref.to}));
			panel.appendChild(createEl({el: 'input', id: 'wrongrefcc1', type: 'text', class: 'caxkit', styles: 'marginBottom:.5rem', placeholder: 'CC1', value: Setting.give('template').wrongref.cc1}));
			panel.appendChild(createEl({el: 'input', id: 'wrongrefcc2', type: 'text', class: 'caxkit', placeholder: 'CC2', value: Setting.give('template').wrongref.cc2}));
			panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Subject', callback: {type: 'click', handler: () => showRef()}}));
			panel.appendChild(createEl({el: 'input', id: 'wrongrefsubject', type: 'text', class: 'caxkit', placeholder: 'SUBJECT', value: Setting.give('template').wrongref.subject}));
			panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Body', callback: {type: 'click', handler: () => showRef()}}));
			panel.appendChild(createEl({el: 'textarea', id: 'wrongrefbody', class: 'caxkit', cols: '30', rows: '16', innerHTML: Setting.give('template').wrongref.body}));
			panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'update', callback: {type: 'click', handler: () => update()}}));

			return panel;

			function update() {
				let template = Setting.give('template');
				template.wrongref = {
					to: $('#wrongrefto').val(),
					cc1: $('#wrongrefcc1').val(),
					cc2: $('#wrongrefcc2').val(),
					subject: $('#wrongrefsubject').val(),
					body: $('#wrongrefbody').val()
				}
				Setting.patch('template', template);
				Snackbar.show(`Wrongref template updated...`);
			}
		}
		function getMotoSettingView() {
			let panel = createEl({el: 'div'});
			panel.appendChild(createEl({el: 'p', class: 'text-center', innerHTML: 'Title'}));
			panel.appendChild(createEl({el: 'input', id: 'mototitle', type: 'text', class: 'caxkit', placeholder: 'TITLE', value: Setting.give('template').moto.title}));
			panel.appendChild(createEl({el: 'p', class: 'text-center helpref', innerHTML: 'Remark', callback: {type: 'click', handler: () => showRef()}}));
			panel.appendChild(createEl({el: 'textarea', id: 'motoremark', cols: '30', rows: '16', class: 'caxkit', innerHTML: Setting.give('template').moto.remark}));
			panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'update', callback: {type: 'click', handler: () => update()}}));
			return panel;

			function update() {
				let template = Setting.give('template');
				template.moto = {
					title: $('#mototitle').val(),
					remark: $('#motoremark').val()
				}
				Setting.patch('template', template);
				Snackbar.show(`Moto template updated...`);
			}
		}
	}
	function getMenuDataSettingView() {
		let panel = createEl({el: 'div'});

		// panel.appendChild(createEl({el: 'h3', innerHTML: 'data setting'}));
		panel.appendChild(createEl({el: 'button', class: 'btn-block', styles: 'marginTop:2rem|backgroundColor:#008B8B', innerHTML: 'export contacts', callback: {type: 'click', handler: () => exportContacts()}}));
		panel.appendChild(createEl({el: 'hr', styles: 'margin:1rem 0'}));
		panel.appendChild(createEl({el: 'button', class: 'btn-block', innerHTML: 'clear memory', callback: {type: 'click', handler: () => clearMem()}}));
		panel.appendChild(createEl({el: 'button', class: 'btn-block', styles: 'background:darkred', innerHTML: 'remove data', callback: {type: 'click', handler: () => drop()}}));

		return panel;

		function clearMem() {
			if (!confirm('Clear memory?')) return;
			Memory.clear();
			Snackbar.show('Memory cleared...');
			setTimeout(() => location.reload(), 1000);
		}
		function drop() {
			if (!confirm('Remove all data?')) return;
			mydb.records = [];
			mydb.persist();
			Memory.clear();
			setTimeout(() => {
				location.reload();
			}, 1500);
			Snackbar.show('Data removed...');
		}
		function exportContacts() {
			if (!confirm('Download contacts?')) return;
			let records = CMFile.all();

			let header = ['Name', 'Given Name', 'Phone 1 - Value', '\n'];

			let contacts = records.map(item => {
				let name = Parser.parse(item, Setting.give('general').cmnameformat, true);
				return [
					name,
					name,
					join(item.contact.list),
					'\n'
				];
			});

			contacts.unshift(header);

			function join(contacts) {
				return contacts.map(item => '+' + item.tel).join(' ::: ');
			}

			let file = new Blob(contacts, {type: 'text/csv'});

			let a = document.createElement('a');
			let url = URL.createObjectURL(file);
			a.href = url;
			a.download = `${User.id} cCONTACTS ${Tarikh.mname.toUpperCase()} ${Tarikh.year}`;
			a.click();
			setTimeout(() => {
				window.URL.revokeObjectURL(url);
			}, 100);
		}
	}
}

function showRef(contact = false) {
	let text;
	if (contact) {
		text = 
`
{saleid} - Order No.
{name} - Cust. Name
{nric} - NRIC/Company No
{aging} - Aging
{unbill} - Unbill Aging
{scheme} - Rental Scheme
`;
	}
	else {
		text = 
`
{saleid} - Order No.
{name} - Cust. Name
{nric} - NRIC/Company 
{due} - Due Date
{os.month} - Target Aging
{aging} - Aging
{unbill} - Unbill Aging
{os.total} - Total Outstanding
{os.adv} - Total Os + 1 Month Adv.
{os.paid} - Total Paid
{emg} - Emergency Contact Name
{product} - Product Name
{caname} - Collector Name
{catel} - Collector Contact No.
{rental} - Monthly Rental Fee
{scheme} - Rental Scheme
{addr.mail} - Billing Address
{addr.inst} - Installation Address
{email} - Cust. Email
`;
	}

	alert(text);
}