function filewindowUpdate(group, data) {
	if (CMFile.is('floated', data)) {
		$('#' + group + '-myfiletable').addClass('floated');
		$('#' + group + '-myfiletable').removeClass('completed');
		$('#' + group + '-myfiletable').removeClass('partial');
	}
	else if (CMFile.is('partial', data)) {
		$('#' + group + '-myfiletable').addClass('partial');
		$('#' + group + '-myfiletable').removeClass('completed');
		$('#' + group + '-myfiletable').removeClass('floated');
	}
	else if (CMFile.is('completed', data)) {
		$('#' + group + '-myfiletable').addClass('completed');
		$('#' + group + '-myfiletable').removeClass('partial');
		$('#' + group + '-myfiletable').removeClass('floated');
	}
	else {
		$('#' + group + '-myfiletable').removeClass('partial');
		$('#' + group + '-myfiletable').removeClass('completed');
		$('#' + group + '-myfiletable').removeClass('floated');
	}
	if (data.removed) {
		$('#' + group + '-filenotice-cancel').show();
	}
	else $('#' + group + '-filenotice-cancel').hide();
	if (data.date.ptp !== '') {
		$('#' + group + '-filenotice-ptp').show();
		$('#' + group + '-filenotice-ptp').text('ptp : ' + data.date.ptp);
	}
	else $('#' + group + '-filenotice-ptp').hide();
	if (data.float) {
		$('#' + group + '-filenotice-float').show();
		$('#' + group + '-filenotice-float').text('float : RM ' + data.float.toLocaleString('en-US', {maximumFractionDigits:2}));
	}
	else $('#' + group + '-filenotice-float').hide();

	$('#' + group + '-filecreatedon').text('created on ' + new Date(data.created.toString()).toLocaleString());
	$('#' + group + '-tdsaleid').text(data.saleid);
	$('#' + group + '-tdaging').text(data.aging.flat);
	$('#' + group + '-tdunbill').text(data.unbill.aging);
	$('#' + group + '-tdname').text(data.name);
	(data.blacklist) ? $('#' + group + '-tdname').css({'background':'#212121','color':'white'}) : $('#' + group + '-tdname').css({'background':'','color':''});
	$('#' + group + '-tdscheme').text(data.scheme);
	$('#' + group + '-tdperiod').text(data.obligation);
	$('#' + group + '-tdnric').text(data.nric);
	$('#' + group + '-tdostotal').text('RM ' + data.os.total.toLocaleString('en-US', {maximumFractionDigits:2}));
	(data.os.total > 0) ? $('#' + group + '-tdostotal').css({'color':'red'}) : $('#' + group + '-tdostotal').css({'color':''});
	$('#' + group + '-tdostarget').text('RM ' + data.os.target.toLocaleString('en-US', {maximumFractionDigits:2}));
	$('#' + group + '-tdospaid').text('RM ' + data.os.paid.toLocaleString('en-US', {maximumFractionDigits:2}));
	// $('#' + group + '-tdrental').text('RM ' + data.rental.toLocaleString('en-US', {maximumFractionDigits:2}));
	$('#' + group + '-tdrental').val(data.rental);
	$('#' + group + '-tdproduct').text(data.product);
	$('#' + group + '-tdlastservice').text(data.date.lastservice);
	$('#' + group + '-tdinstdate').text(data.date.install);
	$('#' + group + '-tdcontractend').text(data.date.end);
	$('#' + group + '-tdemgname').text(data.emergency.name);
	$('#' + group + '-tdemgrel').text(data.emergency.relation);
	$('#' + group + '-tdinstaddr').text(data.addr.inst);
	$('#' + group + '-tdemail').text(data.email);
	$('#' + group + '-tdfloat').val(data.float);
	$('#' + group + '-tdptp').val(data.date.ptp);
	$('#' + group + '-tddue').val(data.date.due);
	$('#' + group + '-tdstage').text(data.stage.val);
	if (data.stage.last) $('#' + group + '-tdstagelast').text('from ' + data.stage.last + ' on ' + new Date(data.stage.ts.toString()).toLocaleString());
	else $('#' + group + '-tdstagelast').text('');
	$('#' + group + '-notecount').text(data.notes.length);
	$('#' + group + '-notebody').empty();
	if (data.notes.length) {
		getNotes({target: group + '-notebody', notes: data.notes, group: group});
	}
	else {
		document.getElementById(group + '-notebody').appendChild(createEl({el: 'p', innerHTML: 'None'}));
	}
	let nbody = document.getElementById(group + '-notebody');
	if (!!nbody.style.maxHeight) nbody.style.maxHeight = nbody.scrollHeight + 'px';
	$('#' + group + '-tdcontact').empty();
	getContacts({target: group + '-tdcontact', contacts: data.contact.list, def: data.contact.default, group: group});
	document.getElementById(group + '-tdvisit').checked = data.visit;
	document.getElementById(group + '-tdcancelfile').checked = data.removed;
}