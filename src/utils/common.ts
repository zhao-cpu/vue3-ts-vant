import { showToast } from "vant";
import { Router } from "vue-router";

// 加载图片
export const getAssetsFile = (url: string) => {
	return new URL(`../assets/${url}`, import.meta.url).href;
};

// 复制
export const copyText = (str: string) => {
	var copyTextArea = document.createElement("textarea");
	copyTextArea.value = str;
	document.body.appendChild(copyTextArea);
	copyTextArea.select();
	try {
		var copyed = document.execCommand("copy");
		if (copyed) {
			document.body.removeChild(copyTextArea);
			showToast("复制成功");
		}
	} catch {
		showToast("失败");
	}
};

// 获取缓存
export const getLocalData = (key: string) => {
	return JSON.parse(window.localStorage.getItem(key) || "");
};

// 设置缓存
export const setLocalData = (key: string, data: any) => {
	window.localStorage.setItem(key, JSON.stringify(data));
};

// 清理缓存
export const removeLocalData = (key: string) => {
	window.localStorage.removeItem(key);
};

export const loadJs = (src: string) => {
	return new Promise((resolve, reject) => {
		let script = document.createElement("script");
		script.type = "text/javascript";
		script.src = src;
		document.body.appendChild(script);

		script.onload = () => {
			resolve(1);
		};
		script.onerror = () => {
			reject();
		};
	});
};

// 解析query
export const parseQuery = () => {
	const str = location.search || location.hash || "";
	const [hash, query] = str.split("?");
	const result: any = {};
	if (query) {
		const strs = query.split("&");
		for (let i = 0; i < strs.length; i++) {
			const [key, value] = strs[i].split("=");
			result[key] = value;
		}
	}
	return result;
};

// 组装新的URL
export const routerToUrl = (router: any) => {
	let url = window.location.protocol + "//" + window.location.host + router.path;
	let querys = [];
	for (let key in router.query) {
		querys.push(key + "=" + router.query[key]);
	}
	return url + "?" + querys.join("&");
};

// 生成随机字符串
export const randomString = (length: number) => {
	let str = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let result = "";
	for (let i = length; i > 0; --i) result += str[Math.floor(Math.random() * str.length)];
	return result;
};

//将base64转换为blob
export const dataURLtoBlob = (dataurl: string) => {
	var arr = dataurl.split(","),
		mime = arr[0]?.match(/:(.*?);/)?.[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], { type: mime });
};

//将blob转换为file
export const blobToFile = (theBlob: any, fileName: string) => {
	theBlob.lastModifiedDate = new Date();
	theBlob.name = fileName;
	return theBlob;
};

export const hasLogined = (router: Router, cb?: () => void, flag: boolean = true) => {
	const token = localStorage.getItem("token") ? true : false;
	const finishAt = localStorage.getItem("finishAt") ? true : false;
	if (!token || !finishAt) {
		if (flag) {
			showToast({
				message: "请先完成注册",
				duration: 1000,
			});

			setTimeout(() => {
				return router.push("/");
			}, 1000);
		} else {
			return router.push("/");
		}
	} else cb?.();
};

export const hasFirstLogin = () => {
	const finishAt = localStorage.getItem("finishAt") ? true : false;
	return finishAt;
};

export const getScrollTop = (): number => {
	var scrollPos: number = 0;
	if (window.pageYOffset) {
		scrollPos = window.pageYOffset;
	} else if (document.compatMode && document.compatMode != "BackCompat") {
		scrollPos = document.documentElement.scrollTop;
	} else if (document.body) {
		scrollPos = document.body.scrollTop;
	}
	return scrollPos;
};
