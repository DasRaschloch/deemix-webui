<template>
	<div>
		<h1 class="mb-8 text-5xl">{{ $t('settings.spotify.question') }}</h1>
		<p class="mb-2 text-base">{{ $t('settings.spotify.howTo.prologue') }}</p>
		<p class="mb-2 text-base">{{ $t('settings.spotify.howTo.info') }}</p>

		<h2 class="mt-6 text-3xl">{{ $t('settings.spotify.howTo.questionOne.title') }}</h2>
		<p class="mb-2 text-base">
			{{ $t('settings.spotify.howTo.questionOne.stepOne.partOne') }}
			<a href="https://developer.spotify.com/dashboard" target="_blank">{{ $t('settings.spotify.howTo.questionOne.stepOne.partTwo') }}</a> {{ $t('settings.spotify.howTo.questionOne.stepOne.partThree') }}
		</p>
		<p class="mb-2 text-base">
			{{ $t('settings.spotify.howTo.questionOne.stepTwo') }}
			<img src="https://i.imgur.com/YFz7rHj.png" :alt="$t('settings.spotify.howTo.questionOne.stepTwoAlt')" />
		</p>
		<p class="mb-2 text-base">
			{{ $t('settings.spotify.howTo.questionOne.stepThree') }}
			<img src="https://i.imgur.com/A9cvDkK.png" :alt="$t('settings.spotify.howTo.questionOne.stepThreeAlt')" />
		</p>
		<p class="mb-2 text-base">
			{{ $t('settings.spotify.howTo.questionOne.stepFour') }}
			<img src="https://i.imgur.com/foEfIhO.png" :alt="$t('settings.spotify.howTo.questionOne.stepFourAlt')" />
		</p>
		<p class="mb-2 text-base">{{ $t('settings.spotify.howTo.questionOne.stepFive') }}</p>

		<h2 class="mt-6 text-3xl">{{ $t('settings.spotify.howTo.questionTwo.title') }}</h2>
		<p class="mb-2 text-base">
			{{ $t('settings.spotify.howTo.questionTwo.stepOne.partOne') }} <a href="https://www.spotify.com/it/account/overview/" target="_blank">{{ $t('settings.spotify.howTo.questionTwo.stepOne.partTwo') }}</a> {{ $t('settings.spotify.howTo.questionTwo.stepOne.partThree') }}.
		</p>
	</div>
</template>

<script>
export default {}
</script>

<style></style>
