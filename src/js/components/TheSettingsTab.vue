<template>
	<div id="settings_tab" class="main_tabcontent fixed_footer">
		<h2 class="page_heading">Settings</h2>

		<div id="logged_in_info" ref="loggedInInfo">
			<img id="settings_picture" src="" alt="Profile Picture" ref="userpicture" class="circle" />
			<p>You are logged in as <strong id="settings_username" ref="username"></strong></p>
			<button id="settings_btn_logout" @click="logout">Logout</button>
			<select v-if="accounts.length" id="family_account" v-model="accountNum" @change="changeAccount">
				<option v-for="(account, i) in accounts" :value="i.toString()">{{ account.BLOG_NAME }}</option>
			</select>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">person</i>Login
			</h3>
			<div class="inline-flex">
				<input autocomplete="off" type="password" id="login_input_arl" ref="loginInput" placeholder="ARL" />
				<button id="settings_btn_copyArl" @click="copyARLtoClipboard">
					<i class="material-icons">assignment</i>
				</button>
			</div>
			<a href="https://notabug.org/RemixDevs/DeezloaderRemix/wiki/Login+via+userToken" target="_blank">
				How do I get my own ARL?
			</a>
			<button id="settings_btn_updateArl" @click="login" style="width:100%;">Update ARL</button>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">web</i>Appearance
			</h3>
			<label class="with_checkbox">
				<input type="checkbox" v-model="changeSlimDownloads" />
				<span class="checkbox_text">Slim download tab</span>
			</label>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">folder</i>Download Path
			</h3>
			<input type="text" v-model="settings.downloadLocation" />
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">font_download</i>Templates
			</h3>

			<p>Trackname template</p>
			<input type="text" v-model="settings.tracknameTemplate" />

			<p>Album track template</p>
			<input type="text" v-model="settings.albumTracknameTemplate" />

			<p>Playlist track template</p>
			<input type="text" v-model="settings.playlistTracknameTemplate" />
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">create_new_folder</i>Folders
			</h3>
			<div class="settings-container">
				<div class="settings-container__third">
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.createPlaylistFolder" />
						<span class="checkbox_text">Create folder for playlist</span>
					</label>
					<div class="input_group" v-if="settings.createPlaylistFolder">
						<p class="input_group_text">Playlist folder template</p>
						<input type="text" v-model="settings.playlistNameTemplate" />
					</div>
				</div>
				<div class="settings-container__third">
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.createArtistFolder" />
						<span class="checkbox_text">Create folder for artist</span>
					</label>

					<div class="input_group" v-if="settings.createArtistFolder">
						<p class="input_group_text">Artist folder template</p>
						<input type="text" v-model="settings.artistNameTemplate" />
					</div>
				</div>
				<div class="settings-container__third">
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.createAlbumFolder" />
						<span class="checkbox_text">Create folder for album</span>
					</label>

					<div class="input_group" v-if="settings.createAlbumFolder">
						<p class="input_group_text">Album folder template</p>
						<input type="text" v-model="settings.albumNameTemplate" />
					</div>
				</div>
			</div>

			<label class="with_checkbox">
				<input type="checkbox" v-model="settings.createCDFolder" />
				<span class="checkbox_text">Create folder for CDs</span>
			</label>

			<label class="with_checkbox">
				<input type="checkbox" v-model="settings.createStructurePlaylist" />
				<span class="checkbox_text">Create folder structure for playlists</span>
			</label>

			<label class="with_checkbox">
				<input type="checkbox" v-model="settings.createSingleFolder" />
				<span class="checkbox_text">Create folder structure for singles</span>
			</label>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">title</i>Track titles
			</h3>

			<div class="settings-container">
				<div class="settings-container__third settings-container__third--only-checkbox">
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.padTracks" />
						<span class="checkbox_text">Pad tracks</span>
					</label>
				</div>
				<div class="settings-container__third">
					<div class="input_group">
						<p class="input_group_text">Overwrite padding size</p>
						<input type="number" v-model="settings.paddingSize" />
					</div>
				</div>
				<div class="settings-container__third">
					<div class="input_group">
						<p class="input_group_text">Illegal Character replacer</p>
						<input type="text" v-model="settings.illegalCharacterReplacer" />
					</div>
				</div>
			</div>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">get_app</i>Downloads
			</h3>

			<div class="input_group">
				<p class="input_group_text">Concurrent Downloads</p>
				<input type="number" v-model.number="settings.queueConcurrency" />
			</div>

			<div class="input_group">
				<p class="input_group_text">Preferred Bitrate</p>
				<select v-model="settings.maxBitrate">
					<option value="9">FLAC 1411kbps</option>
					<option value="3">MP3 320kbps</option>
					<option value="1">MP3 128kbps</option>
				</select>
			</div>

			<div class="input_group">
				<p class="input_group_text">Should I overwrite the files?</p>
				<select v-model="settings.overwriteFile">
					<option value="y">Yes, overwrite the file</option>
					<option value="n">No, don't overwrite the file</option>
					<option value="t">Overwrite only the tags</option>
				</select>
			</div>

			<div class="settings-container">
				<div class="settings-container__third settings-container__third--only-checkbox">
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.fallbackBitrate" />
						<span class="checkbox_text">Bitrate fallback</span>
					</label>

					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.fallbackSearch" />
						<span class="checkbox_text">Search fallback</span>
					</label>
				</div>
				<div class="settings-container__third settings-container__third--only-checkbox">
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.logErrors" />
						<span class="checkbox_text">Create log file for errors</span>
					</label>

					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.logSearched" />
						<span class="checkbox_text">Create log file for searched tracks</span>
					</label>
				</div>
				<div class="settings-container__third settings-container__third--only-checkbox">
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.syncedLyrics" />
						<span class="checkbox_text">Create .lyr files (Sync Lyrics)</span>
					</label>

					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.createM3U8File" />
						<span class="checkbox_text">Create playlist file</span>
					</label>
				</div>
			</div>

			<div class="input_group" v-if="settings.createM3U8File">
				<p class="input_group_text">Playlist filename template</p>
				<input type="text" v-model="settings.playlistFilenameTemplate" />
			</div>

			<label class="with_checkbox">
				<input type="checkbox" v-model="settings.saveDownloadQueue" />
				<span class="checkbox_text">Save download queue when closing the app</span>
			</label>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">album</i>Album covers
			</h3>

			<label class="with_checkbox">
				<input type="checkbox" v-model="settings.saveArtwork" />
				<span class="checkbox_text">Save covers</span>
			</label>

			<div class="input_group" v-if="settings.saveArtwork">
				<p class="input_group_text">Cover name template</p>
				<input type="text" v-model="settings.coverImageTemplate" />
			</div>

			<label class="with_checkbox">
				<input type="checkbox" v-model="settings.saveArtworkArtist" />
				<span class="checkbox_text">Save artist image</span>
			</label>

			<div class="input_group" v-if="settings.saveArtworkArtist">
				<p class="input_group_text">Artist image name template</p>
				<input type="text" v-model="settings.artistImageTemplate" />
			</div>

			<div class="input_group">
				<p class="input_group_text">Local artwork size</p>
				<input type="number" min="100" max="1800" step="100" v-model.number="settings.localArtworkSize" />
			</div>

			<div class="input_group">
				<p class="input_group_text">Embedded artwork size</p>
				<input type="number" min="100" max="1800" step="100" v-model.number="settings.embeddedArtworkSize" />
			</div>

			<label class="with_checkbox">
				<input type="checkbox" v-model="settings.PNGcovers" />
				<span class="checkbox_text">Save images as png</span>
			</label>

			<div class="input_group">
				<p class="input_group_text">JPEG image quality</p>
				<input type="number" min="1" max="100" v-model.number="settings.jpegImageQuality" />
			</div>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons" style="width: 1em; height: 1em;">bookmarks</i>Which tags to save
			</h3>

			<div class="settings-container">
				<div class="settings-container__half">
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.title" />
						<span class="checkbox_text">Title</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.artist" />
						<span class="checkbox_text">Artists</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.album" />
						<span class="checkbox_text">Album</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.cover" />
						<span class="checkbox_text">Cover</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.trackNumber" />
						<span class="checkbox_text">Track Number</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.trackTotal" />
						<span class="checkbox_text">Track Total</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.discNumber" />
						<span class="checkbox_text">Disc Number</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.discTotal" />
						<span class="checkbox_text">Disc Total</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.albumArtist" />
						<span class="checkbox_text">Album Artist</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.genre" />
						<span class="checkbox_text">Genre</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.year" />
						<span class="checkbox_text">Year</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.date" />
						<span class="checkbox_text">Date</span>
					</label>
				</div>

				<div class="settings-container__half">
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.explicit" />
						<span class="checkbox_text">Explicit Lyrics</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.isrc" />
						<span class="checkbox_text">ISRC</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.length" />
						<span class="checkbox_text">Track Length</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.barcode" />
						<span class="checkbox_text">Album Barcode (UPC)</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.bpm" />
						<span class="checkbox_text">BPM</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.replayGain" />
						<span class="checkbox_text">Replay Gain</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.label" />
						<span class="checkbox_text">Album Label</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.lyrics" />
						<span class="checkbox_text">Unsynchronized Lyrics</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.copyright" />
						<span class="checkbox_text">Copyright</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.composer" />
						<span class="checkbox_text">Composer</span>
					</label>
					<label class="with_checkbox">
						<input type="checkbox" v-model="settings.tags.involvedPeople" />
						<span class="checkbox_text">Involved People</span>
					</label>
				</div>
			</div>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon"><i class="material-icons">list</i>Other</h3>

			<label class="with_checkbox">
				<input type="checkbox" v-model="settings.tags.savePlaylistAsCompilation" />
				<span class="checkbox_text">Save playlists as compilation</span>
			</label>

			<label class="with_checkbox">
				<input type="checkbox" v-model="settings.tags.useNullSeparator" />
				<span class="checkbox_text">Use null separator</span>
			</label>

			<label class="with_checkbox">
				<input type="checkbox" v-model="settings.tags.saveID3v1" />
				<span class="checkbox_text">Save ID3v1 as well</span>
			</label>

			<div class="input_group">
				<p class="input_group_text">How would you like to separate your artists?</p>
				<select v-model="settings.tags.multitagSeparator">
					<option value="default">Using standard specification</option>
					<option value="andFeat">Using & and feat.</option>
					<option value=" & ">Using " & "</option>
					<option value=",">Using ","</option>
					<option value=", ">Using ", "</option>
					<option value="/">Using "/"</option>
					<option value=" / ">Using "/ "</option>
					<option value=";">Using ";"</option>
					<option value="; ">Using "; "</option>
				</select>
			</div>

			<label class="with_checkbox">
				<input type="checkbox" v-model="settings.albumVariousArtists" />
				<span class="checkbox_text">Keep "Various Artists" in the Album Artists</span>
			</label>

			<label class="with_checkbox">
				<input type="checkbox" v-model="settings.removeAlbumVersion" />
				<span class="checkbox_text">Remove "album version" from track title</span>
			</label>

			<label class="with_checkbox">
				<input type="checkbox" v-model="settings.removeDuplicateArtists" />
				<span class="checkbox_text">Remove combinations of artists</span>
			</label>

			<div class="input_group">
				<p class="input_group_text">Date format for FLAC files</p>
				<select v-model="settings.dateFormat">
					<option value="Y-M-D">YYYY-MM-DD</option>
					<option value="Y-D-M">YYYY-DD-MM</option>
					<option value="D-M-Y">DD-MM-YYYY</option>
					<option value="M-D-Y">MM-DD-YYYY</option>
					<option value="Y">YYYY</option>
				</select>
			</div>

			<div class="input_group">
				<p class="input_group_text">What should I do with featured artists?</p>
				<select v-model="settings.featuredToTitle">
					<option value="0">Nothing</option>
					<option value="1">Remove it from the title</option>
					<option value="3">Remove it from the title and the album title</option>
					<option value="2">Move it to the title</option>
				</select>
			</div>

			<div class="input_group">
				<p class="input_group_text">Title casing</p>
				<select v-model="settings.titleCasing">
					<option value="nothing">Keep unchanged</option>
					<option value="lower">lowercase</option>
					<option value="upper">UPPERCASE</option>
					<option value="start">Start Of Each Word</option>
					<option value="sentence">Like a sentence</option>
				</select>
			</div>

			<div class="input_group">
				<p class="input_group_text">Artist casing</p>
				<select v-model="settings.artistCasing">
					<option value="nothing">Keep unchanged</option>
					<option value="lower">lowercase</option>
					<option value="upper">UPPERCASE</option>
					<option value="start">Start Of Each Word</option>
					<option value="sentence">Like a sentence</option>
				</select>
			</div>

			<div class="input_group">
				<p class="input_group_text">Preview Volume</p>
				<input
					type="range"
					@change="updateMaxVolume"
					min="0"
					max="100"
					step="1"
					class="slider"
					v-model.number="previewVolume.preview_max_volume"
				/>
				<span>{{ previewVolume.preview_max_volume }}%</span>
			</div>

			<div class="input_group">
				<p class="input_group_text">Command to execute after download</p>
				<p class="secondary-text">Leave blank for no action</p>
				<input type="text" v-model="settings.executeCommand" />
			</div>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<svg id="spotify_icon" enable-background="new 0 0 24 24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
					<path
						d="m12 24c6.624 0 12-5.376 12-12s-5.376-12-12-12-12 5.376-12 12 5.376 12 12 12zm4.872-6.344v.001c-.807 0-3.356-2.828-10.52-1.36-.189.049-.436.126-.576.126-.915 0-1.09-1.369-.106-1.578 3.963-.875 8.013-.798 11.467 1.268.824.526.474 1.543-.265 1.543zm1.303-3.173c-.113-.03-.08.069-.597-.203-3.025-1.79-7.533-2.512-11.545-1.423-.232.063-.358.126-.576.126-1.071 0-1.355-1.611-.188-1.94 4.716-1.325 9.775-.552 13.297 1.543.392.232.547.533.547.953-.005.522-.411.944-.938.944zm-13.627-7.485c4.523-1.324 11.368-.906 15.624 1.578 1.091.629.662 2.22-.498 2.22l-.001-.001c-.252 0-.407-.063-.625-.189-3.443-2.056-9.604-2.549-13.59-1.436-.175.048-.393.125-.625.125-.639 0-1.127-.499-1.127-1.142 0-.657.407-1.029.842-1.155z"
					/>
				</svg>
				Spotify Features
			</h3>

			<div class="input_group">
				<p class="input_group_text">Spotify clientID</p>
				<input type="text" v-model="spotifyFeatures.clientId" />
			</div>

			<div class="input_group">
				<p class="input_group_text">Spotify Client Secret</p>
				<input type="password" v-model="spotifyFeatures.clientSecret" />
			</div>

			<div class="input_group">
				<p class="input_group_text">Spotify username</p>
				<input type="text" v-model="spotifyUser" />
			</div>
		</div>

		<footer>
			<button @click="resetSettings">Reset to Default</button>
			<button @click="saveSettings">Save</button>
		</footer>
	</div>
</template>

<script>
import { toast } from '@/js/toasts.js'
import { socket } from '@/js/socket.js'
import EventBus from '@/js/EventBus'

export default {
	name: 'the-settings-tab',
	data: () => ({
		settings: { tags: {} },
		lastSettings: {},
		spotifyFeatures: {},
		lastCredentials: {},
		defaultSettings: {},
		lastUser: '',
		spotifyUser: '',
		slimDownloads: false,
		previewVolume: window.vol,
		accountNum: 0,
		accounts: []
	}),
	computed: {
		changeSlimDownloads: {
			get() {
				return this.slimDownloads
			},
			set(wantSlimDownloads) {
				this.slimDownloads = wantSlimDownloads
				document.getElementById('download_list').classList.toggle('slim', wantSlimDownloads)
				localStorage.setItem('slimDownloads', wantSlimDownloads)
			}
		}
	},
	methods: {
		revertSettings() {
			this.settings = { ...this.lastSettings }
		},
		revertCredentials() {
			this.spotifyCredentials = { ...this.lastCredentials }
			this.spotifyUser = (' ' + this.lastUser).slice(1)
		},
		copyARLtoClipboard() {
			let copyText = this.$refs.loginInput

			copyText.setAttribute('type', 'text')
			copyText.select()
			copyText.setSelectionRange(0, 99999)
			document.execCommand('copy')
			copyText.setAttribute('type', 'password')

			toast('ARL copied to clipboard', 'assignment')
		},
		updateMaxVolume() {
			localStorage.setItem('previewVolume', this.previewVolume.preview_max_volume)
		},
		saveSettings() {
			this.lastSettings = { ...this.settings }
			this.lastCredentials = { ...this.spotifyFeatures }
			let changed = false
			if (this.lastUser != this.spotifyUser) {
				// force cloning without linking
				this.lastUser = (' ' + this.spotifyUser).slice(1)
				localStorage.setItem('spotifyUser', this.lastUser)
				changed = true
			}

			socket.emit('saveSettings', this.lastSettings, this.lastCredentials, changed ? this.lastUser : false)
		},
		loadSettings(settings, spotifyCredentials, defaults = null) {
			if (defaults) {
				this.defaultSettings = { ...defaults }
			}

			this.lastSettings = { ...settings }
			this.lastCredentials = { ...spotifyCredentials }
			this.settings = settings
			this.spotifyFeatures = spotifyCredentials
		},
		login() {
			let arl = this.$refs.loginInput.value.trim()
			if (arl != '' && arl != localStorage.getItem('arl')) {
				socket.emit('login', arl, true, this.accountNum)
			}
		},
		changeAccount() {
			socket.emit('changeAccount', this.accountNum)
		},
		accountChanged(user, accountNum) {
			this.$refs.username.innerText = user.name
			this.$refs.userpicture.src = `https://e-cdns-images.dzcdn.net/images/user/${user.picture}/125x125-000000-80-0-0.jpg`
			this.accountNum = accountNum
			localStorage.setItem('accountNum', this.accountNum)
		},
		initAccounts(accounts) {
			this.accounts = accounts
		},
		logout() {
			socket.emit('logout')
		},
		initSettings(settings, credentials, defaults) {
			this.loadSettings(settings, credentials, defaults)
			toast('Settings loaded!', 'settings')
		},
		updateSettings(settings, credentials) {
			this.loadSettings(settings, credentials)
			toast('Settings updated!', 'settings')
		},
		resetSettings() {
			this.settings = { ...this.defaultSettings }
		}
	},
	mounted() {
		EventBus.$on('settingsTab:revertSettings', this.revertSettings)
		EventBus.$on('settingsTab:revertCredentials', this.revertCredentials)

		this.$refs.loggedInInfo.classList.add('hide')

		if (localStorage.getItem('arl')) {
			this.$refs.loginInput.value = localStorage.getItem('arl').trim()
		}
		if (localStorage.getItem('accountNum')) {
			this.accountNum = localStorage.getItem('accountNum')
		}

		let spotifyUser = localStorage.getItem('spotifyUser')

		if (spotifyUser) {
			this.lastUser = spotifyUser
			this.spotifyUser = spotifyUser
			socket.emit('update_userSpotifyPlaylists', spotifyUser)
		}

		this.changeSlimDownloads = 'true' === localStorage.getItem('slimDownloads')

		let volume = parseInt(localStorage.getItem('previewVolume'))
		if (isNaN(volume)) {
			volume = 80
			localStorage.setItem('previewVolume', volume)
		}
		window.vol.preview_max_volume = volume

		socket.on('init_settings', this.initSettings)
		socket.on('updateSettings', this.updateSettings)
		socket.on('accountChanged', this.accountChanged)
		socket.on('familyAccounts', this.initAccounts)
	}
}
</script>

<style>
</style>