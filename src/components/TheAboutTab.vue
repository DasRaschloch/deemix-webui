<template>
	<div id="about_tab" class="main_tabcontent">
		<h2 class="page_heading">{{ $t('sidebar.about') }}</h2>
		<ul>
			<li>This app uses the <strong>deemix</strong> library, which you can use to make your own UI for deemix.</li>
			<!-- <li>
				Here's the <a href="https://codeberg.org/RemixDev/deemix" target="_blank">official repo</a> for the library.
			</li> -->
			<li>
				Thanks to <strong>rtonno</strong>, <strong>uhwot</strong> and <strong>lollilol</strong> for helping me with this
				project and to <strong>BasCurtiz</strong> and <strong>scarvimane</strong> for making the icon.
			</li>
			<li>
				Stay up to date with the updates by following the
				<a href="https://t.me/RemixDevNews" target="_blank">news channel</a> on Telegram.
			</li>
		</ul>

		<h2>Useful Links</h2>
		<ul class="no-dots">
			<li>
				<a href="https://deemix.app" target="_blank">🌍 Official Website</a>
			</li>
			<li>
				<a href="https://codeberg.org/RemixDev/deemix" target="_blank">🚀 Official Library Repository</a>
			</li>
			<li>
				<a href="https://codeberg.org/RemixDev/deemix-webui" target="_blank">💻 Official WebUI Repository</a>
			</li>
			<li>
				<a href="https://www.reddit.com/r/deemix" target="_blank">🤖 Official Subreddit</a>
			</li>
			<li>
				<a href="https://t.me/RemixDevNews" target="_blank">📰 News Channel</a>
			</li>
		</ul>

		<h2>
			Bug Reports
			<span class="subheading">
				Is there something that isn't working in deemix? Tell us!
			</span>
		</h2>
		<ul>
			<li>
				If you have questions or problems with the app, search for a solution in the
				<a href="https://www.reddit.com/r/deemix" target="_blank">subreddit</a> first and then, if you don't find
				anything you can make a post with your issue on the subreddit.
			</li>
			<li>
				Before reporting a bug make sure you're running the latest version of the app and that the thing you want to
				report is actually a bug and not something that's wrong only on your end.
			</li>
			<li>
				Make sure the bug is reproducible on another machines and also <strong>DO NOT</strong> report a bug if it's been
				already reported.
			</li>
			<li><strong>DO NOT</strong> open issues for asking questions, there is a subreddit for that.</li>
		</ul>

		<h2>
			Contributing
			<span class="subheading">
				You want to contribute to this project? You can do it in different ways!
			</span>
		</h2>
		<ul>
			<li>
				If you're fluent in python you could try to make a new UI for the app using the base library, or fix bugs in the
				library with a pull request on the <a href="https://codeberg.org/RemixDev/deemix" target="_blank">repo</a>.
			</li>
			<li>
				I accept features as well, but no complex things, as they can be implementend directly in the app and not the
				library.
			</li>
			<li>
				If you're fluent in another programming language you could try to port deemix into other programming languages!
			</li>
			<li>
				You need help understanding the code? Just hit RemixDev up on Telegram or Reddit.
			</li>
			<li>
				If you know Vue.js (JavaScript), HTML or CSS you could contribute to the
				<a href="https://codeberg.org/RemixDev/deemix-webui" target="_blank">webui</a>.
			</li>
			<li>
				If you find some bugs you can report them in the repo, just make sure your bug isn't something that only affects
				you and it can be reproducible by other users as well.
			</li>
			<li>
				Duplicate bug reports will be closed, so keep an eye out on that.
			</li>
		</ul>

		<h2>
			Donations
			<span class="subheading">
				You want to contribute monetarily? You could make a donation!
			</span>
		</h2>
		<ul>
			<li>
				If you can donate you can do it with this links.
			</li>
			<li>
				You shoud remember that <strong>this is a free project</strong> and
				<strong>you should support the artists you love</strong> before supporting the developers.
			</li>
			<li>
				Don't feel obligated to donate, I appreciate you anyway!
			</li>
		</ul>
		<ul>
			<li>
				<i v-html="paypal" />
				<strong>PayPal:</strong>
				<a href="https://paypal.me/RemixDev" target="_blank">PayPal.me/RemixDev</a>
			</li>
			<li>
				<i v-html="bitcoin" />
				<strong>Bitcoin:</strong> 1sdNymSJrMBWyHM4u2m9uco5nv6uV4Qs1
			</li>
			<li>
				<i v-html="ethereum" />
				<strong>Ethereum:</strong> 0x1d2aa67e671485CD4062289772B662e0A6Ff976c
			</li>
		</ul>

		<h2>License</h2>
		<p>
			<a rel="license" href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank">
				<img
					alt="GNU General Public License"
					style="border-width: 0;"
					src="https://www.gnu.org/graphics/gplv3-127x51.png"
				/>
			</a>
		</p>
		<p>
			This work is licensed under a
			<a rel="license" href="https://www.gnu.org/licenses/gpl-3.0.en.html" target="_blank"
				>GNU General Public License 3.0</a
			>.
		</p>
	</div>
</template>
<style lang="scss" scoped>
li,
p,
a {
	letter-spacing: 0.4px;
	font-size: 20px;
	line-height: 1.2;
}

i {
	vertical-align: middle;
}

i /deep/ svg {
	fill: white;
	width: 20px;
	// height: 20px;
}

:link {
	text-decoration: none;
}

#about_tab {
	margin-bottom: 40px;
}

h2 {
	text-transform: capitalize;

	&:not(.page_heading) {
		font-size: 2rem;
		border-bottom: 1px solid hsla(0, 0%, 20%, 0.25);
		padding: {
			top: 2rem;
			bottom: 1rem;
		}
	}

	.subheading {
		display: block;
		font-size: 0.5em;
		margin-top: 0.5em;
		font-weight: normal;
		opacity: 0.8;
		text-transform: none;
	}
}

p {
	margin: 0 !important;
}

ul {
	li {
		margin-bottom: 7px;
	}

	h2 + & {
		margin-top: 1rem;
	}

	ul + & {
		margin-top: 1.25rem;
	}

	&.no-dots {
		list-style-type: none;
	}

	&:not(.no-dots) {
		list-style-type: none;

		li {
			position: relative;

			&::before {
				content: '—';
				position: absolute;
				left: -30px;
				opacity: 0.25;
			}
		}
	}
}
</style>
<script>
import paypal from '@/assets/paypal.svg'
import bitcoin from '@/assets/bitcoin.svg'
import ethereum from '@/assets/ethereum.svg'

export default {
	data: () => ({
		paypal,
		ethereum,
		bitcoin
	})
}
</script>