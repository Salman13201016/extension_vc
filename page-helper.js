function getPageList() {
	return [{
		name: 'login',
		url: 'https://ccms.cuckoo.com.my/login.aspx'
	}, {
		name: 'home',
		url: 'https://ccms.cuckoo.com.my/Home_CA.aspx'
	}, {
		name: 'listing',
		url: 'https://ccms.cuckoo.com.my/Collection/CollectionAdvisor/CA_CallingList.aspx'
	}, {
		name: 'single',
		url: 'https://ccms.cuckoo.com.my/Collection/CollectionAdvisor/CA_CallEntry'
	}, {
		name: 'ledger',
		url: 'https://ccms.cuckoo.com.my/Sales/LedgerView.aspx?SalesNo'
	}, {
		name: 'fileviewer',
		url: 'https://ccms.cuckoo.com.my/FileViewer.aspx?FilePath'
	}, {
		name: 'oschecking',
		url: 'https://ccms.cuckoo.com.my/Sales/OutstandingChecking_CA.aspx'
	}, {
		name: 'logout',
		url: 'https://ccms.cuckoo.com.my/Logout.aspx'
	}, {
		name: 'floatentry',
		url: 'https://ccms.cuckoo.com.my/Payment/FloatPayment/FloatPaymentEntry.aspx'
	}, {
		name: 'motoentry',
		url: 'https://ccms.cuckoo.com.my/Misc/Ticket/TicketEntry_CA.aspx'
	}];
}
function getPageName() {
	let list = getPageList();
	let url = window.location.href;
	let name = '';

	for (let i = 0; i < list.length; i++) {
		if (url.includes(list[i].url)) {
			name = list[i].name;
			break;
		}
	}

	if (!name) {
		if (!url.includes('https://ccms.cuckoo.com.my/')) name = 'no';
		else name = 'unlisted';
	}
	return name;
}
function getPageUrl(name) {
	if (name === 'unlisted') return window.location.href;
	return getPageList().filter((val,idx,arr) => {
		return val.name === name
	})[0].url;
}