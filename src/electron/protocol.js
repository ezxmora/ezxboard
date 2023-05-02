// https://github.com/reZach/secure-electron-template/blob/master/app/electron/protocol.js
const fs = require('fs');
const path = require('path');
const DIST_PATH = path.join(__dirname, '../../dist/renderer');
const scheme = 'ezxboard';

const mimeTypes = {
	'.js': 'text/javascript',
	'.jsx': 'text/javascript',
	'.html': 'text/html',
	'.css': 'text/css',
	'.svg': 'image/svg+xml',
	'.ico': 'image/vnd.microsoft.icon',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.ttf': 'application/x-font-truetype',
};

const charset = (mimeExt) => {
	return ['.html', '.htm', '.js', '.mjs'].some((m) => m === mimeExt) ? 'utf-8' : null;
};

const mime = (filename) => {
	const mimeExt = path.extname(`${filename || ''}`).toLowerCase();
	const mimeType = mimeTypes[mimeExt];
	return mimeType ? { mimeExt, mimeType } : { mimeExt: null, mimeType: null };
};

const requestHandler = (req, next) => {
	const reqUrl = new URL(req.url);
	let reqPath = path.normalize(reqUrl.pathname);
	if (reqPath === '/') {
		reqPath = '/index.html';
	}
	const reqFilename = path.basename(reqPath);
	fs.readFile(path.join(DIST_PATH, reqPath), (err, data) => {
		const { mimeExt, mimeType } = mime(reqFilename);
		if (!err && mimeType !== null) {
			next({
				mimeType,
				charset: charset(mimeExt),
				data,
			});
		} else {
			console.error(err);
		}
	});
};

module.exports = {
	scheme,
	requestHandler,
};
