type DeepCompare = <T extends object>(a: T, b: T) => boolean;
type IsObj = <T>(a: T) => boolean;
// #----------- 上: ts类型定义 ----------- 分割线 ----------- 下: JS代码 -----------

// 深比较实现
// 判断obj是否为对象
const isObj: IsObj = (obj) => {
	return typeof obj === 'object' && obj !== null;
};

const deepCompare: DeepCompare = (obj1, obj2) => {
	// 1.判断一个或者两个都不是对象
	if (!isObj(obj1) || !isObj(obj2)) {
		return obj1 === obj2;
	}

	// 2.同一个对象
	if (obj1 === obj2) {
		return true;
	}

	// 3.不是同一个对象
	// Object.keys(obj) 一个表示给定对象的所有可枚举属性的字符串数组
	// 先判断键的数量
	// 3.1不一样
	if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
	// 3.2一样
	for (let key in obj1) {
		const res = deepCompare(obj1[key] as object, obj2[key] as object);
		if (!res) return false;
	}

	return true;
};

export default deepCompare;
