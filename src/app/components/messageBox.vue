<template>
	<div class="block-over">
		<div class="wnd wnd-message-box">
			<div class="wnd-header">
				<div class="wnd-header-caption">
					Ошибка
				</div>
				<div
					class="wnd-header-cmd img-wnd-close"
					@click="closeWnd"
				></div>
			</div>

			<div class="wnd-content">
				<div class="wnd-content-img-part img-error"></div>
				<div class="wnd-content-work-area" v-html="text"></div>
			</div>

			<div class="wnd-footer">
				<div class="wnd-button" @click="closeWnd">Закрыть</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "MessageBox",
	props: ["mbtype", "caption", "text"],
	methods: {
		closeWnd() {
			this.$emit("close-msg");
		},
	},
};
</script>
