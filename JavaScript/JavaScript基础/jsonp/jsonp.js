/**
 * 获取随机字符串,用于拼接
 * @param {string} prefix [前导名字]
 * @param {number} num  [字符串长度]
 */
function getRandomName (prefix, num) {
	return prefix + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, num)
}

/**
 * 创建script标签
 * @param {请求路径} url 
 */
function createScript (url) {
	const script = document.createElement('script')
	script.setAttribute('type', 'text/javascript')
	script.setAttribute('src', url)
	script.async = true
	return script
}

/**
 * 实现请求
 * @param {路径} url 
 */
function jsonp (url) {
	return new Promise((resolve, reject) => {
		const cbName = getRandomName('callback')
		window[cbName] = function (data) {
			resolve(data)
		}

		url += url.indexOf('?') > -1 ? '&' : '?'
		const script = createScript(`${url}callback=${cbName}`)
		
		// IE script.onreadystatechange
		script.onload = function () {
			script.onload = null
			if (script.parentNode) {
				script.parentNode.removeChild(script)
			}
			window[cbName] = null
		}

		script.onerror = function () {
			reject()
		}

		document.getElementsByTagName('head')[0].appendChild(script)
	})
}
