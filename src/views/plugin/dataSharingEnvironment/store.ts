const todosStore = {
	updateLocalStorage(key: string, value: string) {
		// 更新 localStorage
		localStorage.setItem(key, value);

		// 创建一个 StorageEvent 事件
		const event = new StorageEvent('storage', {
			key: key,
			newValue: value,
			oldValue: localStorage.getItem(key),
			url: window.location.href
		});

		// 手动触发事件
		window.dispatchEvent(event);
	},
	subscribe(listener: () => void) {
		window.addEventListener('storage', listener);
		return () => {
			window.removeEventListener('storage', listener);
		};
	},
	getSnapshot() {
		// return todos;
		return localStorage.getItem('position');
	},
	initialValue: { x: 0, y: 0 }
};

export default todosStore;
