import { IItem } from "../types";
/*
function IsJsonString(jsonData) {
	if (/^[\],:{}\s]*$/
		.test(jsonData
			.replace(/\\["\\/bfnrtu]/g, '@')
				.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']')
					.replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
		//the json is ok
		return true;
	} else {
		//the json is not ok
		return false;
	}
}
*/
type TValueObj = {
	value: string
}

function isEmpty(str: string): boolean {
	return (!str || 0 === str.trim().length);
}

function isEmptyObj(obj) {
  return Object.keys(obj).length === 0;
}

function findItemByName (items: IItem[], itemName: TValueObj): IItem {
	const itemByName: IItem[] = items.filter(item => {
		return item.name === itemName.value;
	});

	if (itemByName.length === 0) {
		console.log('Не найден элемент с именем:' + itemName.value);
		throw new Error('Не найден элемент с именем:' + itemName.value);
	}
	if (itemByName.length > 1) {
		console.log('У элементов одинаковое имя:' + itemName.value);
		throw new Error('У элементов одинаковое имя:' + itemName.value);
	}
	return itemByName[0];
}

function scanDelimeter (delim: string, str: string, pos: number = 0): number {
	let ind: number = pos;
	if (str.charAt(ind) !== delim) {
		throw new Error('Missing delimiter \''+delim+'\' at pos:' + ind);
	}
	ind++;
	
	return ind;
}

function scanWord (word: TValueObj, str: string, pos: number = 0) {
	let ind: number = pos;
	while (str.charAt(ind).match(/[-a-z_0-9]+/i)) {
		ind++;
	}

	if (ind === pos) {
		throw new Error('Missing word at pos:' + ind);
	}

	word.value = str.slice(pos, ind);
	
	return ind;
}

function scanFields (fields: TValueObj, str: string, pos: number = 0) {
	let ind: number = pos;
	while (str.charAt(ind).match(/[-a-z_0-9.'"[\]]+/i)) {
		ind++;
	}

	if (ind === pos) {
		throw new Error('Missing fields at pos:' + ind);
	}

	fields.value = str.slice(pos, ind);
	
	return ind;
}

function substParam (str: string, item: IItem, items: IItem[]) {
	let pos: number;
	let itemField: TValueObj = {value: ""};
	let itemName: TValueObj = {value: ""};
	let objFields: TValueObj = {value: ""};
	let objFieldName: TValueObj = {value: ""};
	let objFieldValue: TValueObj = {value: ""};
	let itemByName: IItem;
	let itemFieldValue: TValueObj = {value: ""};

	pos = scanDelimeter('{', str);
	pos = scanWord(itemField, str, pos);

	if (str.charAt(pos) === '[') {
		pos = scanDelimeter('[', str, pos);
		pos = scanWord(itemName, str, pos);
		pos = scanDelimeter(']', str, pos);
	}

	if ((str.charAt(pos) === '.') ||
		(str.charAt(pos) === '[')) {
		pos = scanFields(objFields, str, pos);
	} else {
		throw new Error('Missing first char \'.[\' of list of fields');
	}

	pos = scanDelimeter('}', str, pos);

	if ((itemField.value === 'this') && (objFields.value === '.name')) {
		itemFieldValue[objFields.value.substr(1)] = item.name;
	} else if (((itemField.value === 'req') || (itemField.value === 'resp')) && !isEmptyObj(itemName)) {
		itemByName = findItemByName(items, itemName);
		if (!isEmptyObj(itemByName)) {
			if (itemField.value === 'resp') {
				if (isEmpty(itemByName.response)) {
					throw new Error(itemField.value+'['+itemName.value+'] - empty');			
				}
				itemFieldValue = JSON.parse(itemByName.response);
			} else if (itemField.value === 'req') {
				if (itemByName.httpMethod.localeCompare('json', undefined, { sensitivity: 'accent' }) === 0) {
					itemFieldValue = JSON.parse(itemByName.url);
				}
			}
		}
	} else {
		throw new Error("Undefined macro-param:" + str);
	}
/*
	console.log(
		'itemField:'+itemField.value+
		' itemName:'+itemName.value+
		' objFields:'+objFields.value
	);
*/	
	pos = 0;
	objFieldValue = itemFieldValue;
	while ((objFields.value.charAt(pos) === '.') ||
				(objFields.value.charAt(pos) === '[')) {
		if (objFields.value.charAt(pos) === '.') {
			pos = scanDelimeter('.', objFields.value, pos);
			pos = scanWord(objFieldName, objFields.value, pos);
		} else if (objFields.value.charAt(pos) === '[') {
			pos = scanDelimeter('[', objFields.value, pos);
			pos = scanWord(objFieldName, objFields.value, pos);
			pos = scanDelimeter(']', objFields.value, pos);
		}
		if (pos < objFields.value.length && typeof objFieldValue === 'object' && objFieldValue !== null) {
			objFieldValue = objFieldValue[objFieldName.value];
			if (objFieldValue === undefined) {
				throw new Error('Not exists object by name or index:'+objFieldName.value);
			}
		} else {
			objFieldValue.value = objFieldValue[objFieldName.value];
			if (objFieldValue.value === undefined) {
				throw new Error('Not exists fields by name:'+objFieldName.value);
			}
		}
	}

	console.log(str+'='+objFieldValue.value);

	return objFieldValue.value;
}

function substNestedParams (str: string, item: IItem, items: IItem[], pos: number = 0) {
	let res: string = str;
	if (!isEmpty(res) && (pos <= res.length)) {
		let param: string = '';
		let indCloseBrace: number = -1;
		let indOpenBrace: number = res.indexOf('{', pos);
		if (indOpenBrace !== -1) {
			indCloseBrace = res.indexOf('}', indOpenBrace);
			if (indCloseBrace === -1) {
				throw new Error('Missing macro-param\'s closed brace after pos:' + indOpenBrace);
			}

			res = substNestedParams(res, item, items, indOpenBrace + 1);
		}
		if (indOpenBrace !== -1) {
			indCloseBrace = res.indexOf('}', indOpenBrace);
			if (indCloseBrace === -1) {
				throw new Error('Missing macro-param\'s closed brace after pos:' + indOpenBrace);
			}
			param = res.slice(indOpenBrace, indCloseBrace + 1);
			param = substParam (param, item, items)
			res = res.slice(0, indOpenBrace) + (param === 'undefined' ? '' : param) + res.slice(indCloseBrace + 1);
		}
	}

	return res;
}

export default function substParams (item: IItem, items: IItem[], pos: number = 0) {
	let value: string = item.url;
	let indOpenBrace: number = value.indexOf('{', pos);
	while (indOpenBrace !== -1) {
		value = substNestedParams (value, item, items, pos);
		indOpenBrace = value.indexOf('{', pos);
	}

	return value;
}
