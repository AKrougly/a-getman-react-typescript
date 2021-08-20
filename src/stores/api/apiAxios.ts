import axios, { AxiosResponse, AxiosError } from "axios";

import {
	sendItemStarted,
	sendItemSuccess,
	sendItemFailure,
} from "../actions";
import { IItem } from "../types";
import substParams from "./apiUtils";

export function sendItem(item: IItem, items: IItem[]) {
	return dispatch => {
		try {
			console.log("item.url:" + item.url);
			dispatch(sendItemStarted(item));

			const req = substParams(item, items);
			console.log("request:" + req);
			axios
			.get(req)
			.then((res: AxiosResponse<string>) => {
				dispatch(sendItemSuccess(item, res));
				console.log("finish sendItemSuccess");
			})
			.catch((err: AxiosError) => {
				dispatch(sendItemFailure(item, err));
			});
		} catch (err) {
			dispatch(sendItemFailure(item, err));
		}
	};
}
