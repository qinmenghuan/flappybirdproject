/**
 * ajax抽共通
 * Created by qinmenghuan on 2017/8/30.
 */

import axios from 'axios';
import {Toast} from 'mint-ui';
import constants from "./constants.js";

export default function httpRequest(paramsVal) {
	var baseUrl = constants.httpDomain;
	// 为空判断
	if (!paramsVal.params) {
		paramsVal.params = {};
	}
	var requestUrl = baseUrl + paramsVal.url;
	var authOptions = {
		method: 'POST',
		params: paramsVal.params,//get用此接收参数
		url: requestUrl,
		timeout: 60000,
		data: paramsVal.params,//post用此接收参数
		headers: {
			'Content-Type': 'application/json',
		},
		// withCredentials: constants.isProduct,
		json: true
	};
	// post请求
	axios(authOptions)
	.then(
		(response) => {
			// 完成事件
			if (paramsVal.complete) {
				paramsVal.complete();
			}
			// http请求状态码判断
			if (response.status == 200) {
				var reponsedata = response.data;
				if (reponsedata.responseCode == 200) {
					paramsVal.success(reponsedata);
				}else {
					Toast(reponsedata.responseMsg);
				}
			} else {
				Toast('网络请求不成功');
				paramsVal.error();
			}
		}
	)
	.catch(function (error) {
		Toast('网络请求不成功!');
		paramsVal.complete();
	});
}