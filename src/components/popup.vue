<template>
	<div class="fix-mobile-size">
		<div v-if="show" class="popup-overlay">

			<div class="popup-content">
				<img width="100%" src="/image/Popup message (Chi) (1).webp">

				<div class="close">
					<a @click="closePopup"><img width="45%" src="/image/button(Chi).webp"></a>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, watch } from 'vue'

const props = defineProps({
	message: String,
	show: Boolean
})

const emits = defineEmits(['close'])

function closePopup() {
	emits('close')
}

// Watch the show prop to disable/enable scrolling
watch(() => props.show, (newVal) => {
	if (newVal) {
		document.body.style.overflow = 'hidden'; // Disable scrolling
	} else {
		document.body.style.overflow = ''; // Re-enable scrolling
	}
});
</script>

<style scoped>
.popup-overlay {
	position: fixed;
	top: 0;

	background-color: rgba(0, 0, 0, 0.8);
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 540px;
	width: 100%;
	height: 100%;
	z-index: 30;
	overflow: hidden;
}

.popup-content {
	border-radius: 8px;
	text-align: center;
	display: grid;
	justify-items: center;
	position: relative;
}

.close {
	position: absolute;
	bottom: 0;
	transform: translate(0, -50%);
}
</style>
