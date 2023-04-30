function getSettingData(filename) {
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
			code: '',
			toolbar: {
				placetoright: false,
				alwaysshow: true
			},
			general: {
				cmnameformat: 'A{aging} {saleid} {name}',
				compactcmname: false,
				maxreminderstage: 9,
				opennewtab: true
			},
			profile: {
				name: 'Jon Do',
				tel: '0112223344',
				team: 'alpha'
			},
			template: {
				ws: {
					main: [],
					partial: 'default partial ws',
					completed: 'default completed ws'
				},
				sms: {
					main: [],
					partial: 'default partial sms',
					completed: 'default completed sms'
				},
				email: {
					subject: 'default subject {saleid}',
					body: 'default body {name}'
				},
				newcard: {
					to: '',
					cc1: '',
					cc2: '',
					subject: 'default newcard subject',
					body: 'default newcard body'
				},
				wrongref: {
					to: '',
					cc1: '',
					cc2: '',
					subject: 'default wrongref subject',
					body: 'default wrongref body'
				},
				moto: {
					title: 'Region (state) - Moto payment request',
					remark: 'sample remark'
				}
			},
			rates: {
				a2: {
					a: {
						op: 'gt',
						fil: 90,
						val: 11.0
					},
					b: {
						op: 'gt',
						fil: 85,
						val: 5.4
					},
					c: {
						op: 'gt',
						fil: 75,
						val: 3.4
					},
					d: {
						op: 'lt',
						fil: 75,
						val: 1.4
					}
				},
				a3: {
					a: {
						op: 'gt',
						fil: 90,
						val: 15.0
					},
					b: {
						op: 'gt',
						fil: 80,
						val: 11.0
					},
					c: {
						op: 'gt',
						fil: 70,
						val: 5.4
					},
					d: {
						op: 'lt',
						fil: 70,
						val: 1.4
					}
				},
				a4: {
					a: {
						op: 'gt',
						fil: 80,
						val: 15.0
					},
					b: {
						op: 'gt',
						fil: 60,
						val: 11.0
					},
					c: {
						op: 'gt',
						fil: 35,
						val: 5.4
					},
					d: {
						op: 'lt',
						fil: 35,
						val: 1.4
					}
				},
				a5a: {
					a: {
						op: 'gt',
						fil: 20,
						val: 20.0
					},
					b: {
						op: 'gt',
						fil: 15,
						val: 15.0
					},
					c: {
						op: 'gt',
						fil: 10,
						val: 10.0
					},
					d: {
						op: 'lt',
						fil: 10,
						val: 5.0
					}
				},
				a5b: {
					a: {
						op: 'gt',
						fil: 20,
						val: 25.0
					},
					b: {
						op: 'gt',
						fil: 15,
						val: 18.0
					},
					c: {
						op: 'gt',
						fil: 10,
						val: 13.0
					},
					d: {
						op: 'lt',
						fil: 10,
						val: 5.0
					}
				},
			}
				
		}
		for (let i = 0; i < data.general.maxreminderstage; i++) {
		    data.template.ws.main.push({
		        a: 'ws temp a {name} ' + (i + 1),
		        b: 'ws temp b {name} ' + (i + 1)
		    });
		    data.template.sms.main.push({
		        a: 'sms temp a {name} ' + (i + 1),
		        b: 'sms temp b {name} ' + (i + 1)
		    });
		}
	}
	return data;
}
function saveSetting(filename, data) {
	window.localStorage.setItem(filename, JSON.stringify(data));
}