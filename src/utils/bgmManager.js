// src/utils/bgmManager.js
let currentBGM = null;

export function playBGM(src) {
	if (currentBGM) {
		currentBGM.pause();
		currentBGM = null;
	}
	currentBGM = new Audio(src);
	currentBGM.loop = true;
	currentBGM.play().catch(error => {
		console.error('BGM playback failed:', error);
	});
}

export function stopBGM() {
	if (currentBGM) {
		currentBGM.pause();
		currentBGM = null;
	}
}
