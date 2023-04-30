function getParsedText(data, template, isContact) {
	template = template.replace(/{saleid}/g, data.saleid);

	if (isContact && Setting.give('general').compactcmname) {
		template = template.replace(/{name}/g, compactContactName(data.name));
	} else {
		template = template.replace(/{name}/g, data.name);
	}

	template = template.replace(/{due}/g, data.date.due);
	template = template.replace(/{unbill}/g, data.unbill.aging);
	template = template.replace(/{email}/g, data.email);
	template = template.replace(/{nric}/g, data.nric);
	template = template.replace(/{os.month}/g, data.aging.raw);
	template = template.replace(/{os.total}/g, 'RM ' + data.os.total.toFixed(2));
	template = template.replace(/{os.paid}/g, 'RM ' + data.os.paid.toFixed(2));
	template = template.replace(/{emg}/g, data.emergency.name);
	template = template.replace(/{product}/g, data.product);
	template = template.replace(/{caname}/g, User.name);
	template = template.replace(/{catel}/g, User.tel);
	template = template.replace(/{rental}/g, 'RM ' + data.rental.toFixed(2));
	template = template.replace(/{scheme}/g, data.scheme);
	template = template.replace(/{aging}/g, data.aging.flat);
	template = template.replace(/{addr.mail}/g, data.addr.mail.replace(' MALAYSIA ', ''));
	template = template.replace(/{addr.inst}/g, data.addr.inst.replace(' MALAYSIA ', ''));

	template = template.replace(/{os.adv}/g, getAdvance());

	function getAdvance() {
		return 'RM ' + (data.os.total + data.rental).toFixed(2);
	}

	return template;
}
function compactContactName(name) {
	let n = name.toLowerCase();
	n = n.split(' ');
	if (n.includes('bin')) {
		n = n.slice(0, n.indexOf('bin'));
	} else if (n.includes('binti')) {
		n = n.slice(0, n.indexOf('binti'));
	} else if (n.includes('a/p')) {
		n = n.slice(0, n.indexOf('a/p'));
	} else if (n.includes('a/l')) {
		n = n.slice(0, n.indexOf('a/l'));
	}
	n = n.map((val, idx, arr) => {
		return val.capitalize();
	});
	n = n.join('');
	return n;
}