<template>
	<div class="fix-mobile-size">
		<div class="new-personal">
			<img width="90%" src="/image/headline (Mly) 1.webp">
		</div>
		<div class="language">
			<button class="btn" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
				<div class="icon">
					<svg style="color: white;" xmlns="http://www.w3.org/2000/svg" width="35" height="35"
						fill="currentColor" class="bi bi-translate" viewBox="0 0 16 16">
						<path
							d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286zm1.634-.736L5.5 3.956h-.049l-.679 2.022z" />
						<path
							d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm7.138 9.995q.289.451.63.846c-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6 6 0 0 1-.415-.492 2 2 0 0 1-.94.31" />
					</svg>
				</div>
			</button>
			<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
				<li><router-link to="/" class="dropdown-item">中文</router-link></li>
				<li><router-link to="/ms" class="dropdown-item">Malay</router-link></li>
			</ul>
		</div>
		<!--spin wheel area-->
		<div class="spinwheel">
			<div class="spinwheel-col">
				<SpinTheWheel style="width: 100%; max-width: 100%; " ref="wheelEl" type="image" :useWeight="true"
					:verify="canvasVerify" :prizeId="prizeId" :angleBase="-10" :prizes="prizesImage"
					:rotationDuration="500" @rotateStart="onImageRotateStart" @rotateEnd="onRotateEnd">
					<template #wheel>
						<img src="../assets/Group 15.webp" style="width: 100%;transform: rotateZ(30deg)" />
					</template>
					<template #button>
						<img src="/public/image/button (Mly) 1.webp"
							style="width: 80%; position: absolute; bottom: 0; transform: translate(-50%, 50%); z-index: 30; pointer-events: auto;"
							@click="handleButtonClick" />
					</template>
				</SpinTheWheel>
			</div>

			<div class="kk8">
				<img width="100%" src="/public/image/KK8.webp">
			</div>

			<div class="money-img">
				<img width="100%" src="/image/coin.webp">



			</div>
		</div>


		<div class="countdown-timer">
			<h3>
				Tertinggal
				<b class="time-bg">{{ minutesTens }}</b>
				<b class="time-bg">{{ minutesUnits }}</b>
				Min
				<b class="time-bg">{{ secondsTens }}</b>
				<b class="time-bg">{{ secondsUnits }}</b>
				Saat
			</h3>
			<br>
			<h2>Rebut Peluang Ini!</h2>
			<h2>Tawaran Istimewa Menanti Anda!</h2>

		</div>

		<div class="bg2">
			<img width="100%" src="/image/全网最大福利平台 (2).webp"
				style="padding-top: 100px;   padding-left: 45px; padding-bottom: 180px;">
			<div class="image-bonus">
				<img width="100%" src="/image/photo.webp">
			</div>
			<img width="100%" src="/image/image 14.webp">
			<img width="100%" src="/image/image 15.webp">
		</div>

	</div>

	<Popup :message="popupMessage" :show="showPopup" @close="showPopup = false" />

</template>




<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { SpinTheWheel } from 'vue-spin-the-wheel'
import Popup from '../components/popupMs.vue'
import { playBGM, stopBGM } from '@/utils/bgmManager.js';

const prizeId = ref(0)
const wheelEl = ref()
const canvasVerify = ref(false)
const showPopup = ref(false)
const popupMessage = ref('')
const bgm = ref(null)
const isBGMPlaying = ref(false);  // Track if BGM is playing

function playClickSound() {
	const clickSound = new Audio('/Music/Sfx/Button Click.mp3');
	clickSound.play();
}

function playSpinStartSound() {
	const spinStartSound = new Audio('/Music/Sfx/Spin wheel spinning.mp3');
	spinStartSound.play();
}

function playPopupSound() {
	const popupSound = new Audio('/Music/Sfx/Win.mp3');
	popupSound.play();
}

const hasBGMPlayed = ref(sessionStorage.getItem('hasBGMPlayed') === 'true'); // 使用 sessionStorage 检查 BGM 是否已播放

function handleButtonClick() {
	if (!hasBGMPlayed.value) {  // 如果 BGM 没有播放过
		const bgmAudio = new Audio('/Music/BGM/Pop Dance Party Logo v1.mp3');
		bgmAudio.loop = true;  // 设置BGM循环播放

		const clickSound = new Audio('/Music/Sfx/Button Click.mp3');

		// 尝试同时播放BGM和按钮点击声音
		Promise.all([bgmAudio.play(), clickSound.play()])
			.then(() => {
				hasBGMPlayed.value = true;  // 标记 BGM 已播放
				sessionStorage.setItem('hasBGMPlayed', 'true'); // 将标志保存到 sessionStorage 中
				bgm.value = bgmAudio;
			})
			.catch((e) => {
				console.error("播放被阻止：", e);
				clickSound.play(); // 即使播放被阻止，仍然播放按钮点击声音
			});
	} else {
		// 如果 BGM 已经播放过，只播放点击音效
		playClickSound();
	}
}



onBeforeUnmount(() => {
	// 当用户导航到下一页时停止BGM
	if (bgm.value) {
		bgm.value.pause();
		bgm.value.currentTime = 0;  // 可选：重置播放位置到开头
	}
});


const prizesCanvas = [
	{
		id: 1,
		name: '25%每日奖金',
		value: '25%每日奖金',
		bgColor: '#45ace9',
		color: '#ffffff',
		probability: 100
	},
	{
		id: 2,
		name: '免费RM10',
		value: '免费RM10',
		bgColor: '#dd3832',
		color: '#ffffff',
		probability: 0
	},
	{
		id: 3,
		name: '888%特别奖金',
		value: '888%特别奖金',
		bgColor: '#fef151',
		color: '#ffffff',
		probability: 0
	},
	{
		id: 4,
		name: '388%奖金',
		value: '388%奖金',
		bgColor: '#fef151',
		color: '#ffffff',
		probability: 0
	},
	{
		id: 5,
		name: '50%无限奖金',
		value: '50%无限奖金',
		bgColor: '#fef151',
		color: '#ffffff',
		probability: 0
	},
	{
		id: 6,
		name: '200%体育奖金',
		value: '200%体育奖金',
		bgColor: '#fef151',
		color: '#ffffff',
		probability: 0
	}
]

const prizesImage = [
	{
		id: 1,
		value: 'Blue\'s value',
		weight: 1
	},
	{
		id: 2,
		value: 'Red\'s value',
		weight: 0
	},
	{
		id: 3,
		value: 'Yellow\'s value',
		weight: 0
	},
	{
		id: 4,
		value: '3',
		weight: 0
	},
	{
		id: 5,
		value: '2',
		weight: 0
	},
	{
		id: 6,
		value: '1',
		weight: 0
	}
]

const prizeRes = computed(() => {
	return prizesCanvas.find(item => item.id === prizeId.value) || prizesCanvas[0]
})

const isSpinning = ref(false);

function onImageRotateStart() {
	if (isSpinning.value) return; // Prevent multiple spins
	isSpinning.value = true;
	playSpinStartSound(); // Play spin start sound
	wheelEl.value.startRotate(); // Start the spin
}

function onRotateEnd(prize) {
	popupMessage.value = `You won: ${prize.value}`;
	showPopup.value = true;
	isSpinning.value = false; // Re-enable the button after the spin ends
}

// Watcher to play sound when the popup appears
watch(showPopup, (newValue) => {
	if (newValue) {
		playPopupSound(); // Play sound when popup is shown
	}
});

const countdownTime = ref(600);

const minutesTens = computed(() => Math.floor(countdownTime.value / 60 / 10) % 10);
const minutesUnits = computed(() => Math.floor(countdownTime.value / 60) % 10);
const secondsTens = computed(() => Math.floor((countdownTime.value % 60) / 10));
const secondsUnits = computed(() => countdownTime.value % 10);

onMounted(() => {
	const interval = setInterval(() => {
		if (countdownTime.value > 0) {
			countdownTime.value--;
		} else {
			clearInterval(interval); // Stop timer when countdown ends
		}
	}, 1000); // Update every second

	// 尝试自动播放BGM，防止重复播放
	try {
		if (!hasBGMPlayed.value) {
			playBGM('/Music/BGM/Pop Dance Party Logo v1.mp3');
			isBGMPlaying.value = true;
		}
	} catch (e) {
		console.error("自动播放被阻止：", e);
	}
});
onBeforeUnmount(() => {
	// Stop BGM when navigating away from the page
	if (bgm.value) {
		bgm.value.pause();
		bgm.value.currentTime = 0;  // 可选：重置播放位置到开头
	}
});


</script>
<style scoped>
.fix-mobile-size {
	max-width: 540px;
	width: 100%;
	height: 100%;
	background-image: url('/image/bg 4 2.webp');
	background-size: cover;
	background-repeat: round;
	position: relative;
	margin: 0 auto;
	overflow: hidden;
}

/* .fix-mobile-size::before {
	content: '';
	background: rgba(48, 0, 98, 0.70);
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(5px);
} */
.new-personal {
	padding-top: 30px;
	text-align: center;
}

.spinwheel {
	position: relative;
	top: 0;
	background-image: url('/image/coin 1.webp');
	background-repeat: round;
	background-size: cover;
	margin-bottom: 150px;
	text-align: center;
}

.money-img {
	position: absolute;
	top: 0;
}

.coin2 {
	position: absolute;
	top: 0;
}

.spin-button {
	position: absolute;
	bottom: 0px;
	transform: translate(0, 50%);
}

.time-bg {
	background-image: url('/image/倒计时框 3.webp');
	background-repeat: round;
	background-size: cover;
	padding: 10px;
	color: #0E68FF;
	text-align: center;
	font-family: Montserrat;
	font-size: 31.778px;
	font-style: normal;
	font-weight: 700;
	line-height: 13px;
	/* 40.909% */
	text-transform: capitalize;
}

.countdown-timer {}

.countdown-timer h3 {
	color: #FFF;
	text-align: center;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
	font-family: Montserrat;
	font-size: 18px;
	font-style: normal;
	font-weight: 900;
	line-height: 18px;
	/* 75% */
	text-transform: capitalize;
}

.countdown-timer h2 {
	color: #FFF;
	text-align: center;
	text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
	font-family: Montserrat;
	font-size: 18px;
	font-style: normal;
	font-weight: 700;
	line-height: 16.028px;
	/* 66.784% */
	text-transform: capitalize;
}

@media screen and (min-width:425px) {
	.countdown-timer h3 {
		font-size: 20px;
	}

	.countdown-timer h2 {
		font-size: 20px;
	}
}

@media screen and (min-width: 548px) {
	.countdown-timer h3 {
		font-size: 24px;
	}

	.countdown-timer h2 {
		font-size: 24px;
		padding-left: 13px;
	}
}

.bg2 {
	background-image: url('/image/bg2.webp');
	background-size: cover;
	position: relative;
	width: 100%;
	height: 100%;
}

.bg3 {
	background-image: url('/image/image14.webp');
	background-repeat: round;
	background-size: cover;
}

.bonus-content {
	position: absolute;
	top: 0;
	transform: translate(0, 29%);
}

.kk8-button {
	position: absolute;
	top: 0;
	transform: translate(0, -5%);
}


.image-bonus {
	position: absolute;
	bottom: 0;
}

.spinwheel-col {
	position: relative;
	overflow: visible;
	text-align: -webkit-center;
}


.kk8 {
	position: absolute;
	top: 0px;
	transform: translate(0, -10%);
}

.language {
	position: absolute;
	top: 10px;
	right: 10px;
}

.btn {
	border: none;
	background-color: transparent;
}
</style>
