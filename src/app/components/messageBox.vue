<template>
	<div
		class="block-over"
		@keydown.esc="closeWnd"
		tabindex="-1"
	>
		<div class="wnd wnd-message-box">
			<div class="wnd-header">
				<div class="wnd-header-caption">
					{{ mbo.caption }}
				</div>
				<div
					class="wnd-header-cmd img-wnd-close"
					@click="closeWnd"
				></div>
			</div>

			<div class="wnd-content">
				<div :class="['wnd-content-img-part', 'img-'+mbo.mbtype]"></div>
				<div class="wnd-content-work-area" v-html="mbo.text"></div>
			</div>

			<div class="wnd-footer">
				<div
					class="wnd-button"
					v-show="mbo.yes"
					@click="yesClick"
				>{{ mbo.yes }}
				</div>

				<div
					class="wnd-button"
					@click="closeWnd"
				>{{ mbo.no }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'MessageBox',
	props: ['mbo'], // MessageBox Object
	methods: {
		yesClick() {
			this.$emit('yes-action');
			this.closeWnd();
		},
		closeWnd() {
			this.$emit('close-msg');
		}
	},
	watch: {
		mbo() { this.$el.focus(); }
	}
};
</script>
