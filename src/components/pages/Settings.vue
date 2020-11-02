<template>
	<div id="settings_tab" class="fixed-footer" ref="root">
		<h1 class="mb-8 text-5xl">{{ $t('settings.title') }}</h1>

		<div id="logged_in_info" v-if="isLoggedIn" ref="loggedInInfo">
			<img id="settings_picture" :src="pictureHref" alt="Profile Picture" ref="userpicture" class="circle" />

			<i18n path="settings.login.loggedIn" tag="p">
				<strong place="username" id="settings_username" ref="username">{{ user.name || 'not logged' }}</strong>
			</i18n>

			<button class="btn btn-primary" id="settings_btn_logout" @click="logout">
				{{ $t('settings.login.logout') }}
			</button>

			<select v-if="accounts.length" id="family_account" v-model="accountNum" @change="changeAccount">
				<option v-for="(account, i) in accounts" :key="account" :value="i.toString()">{{ account.BLOG_NAME }}</option>
			</select>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">person</i>{{ $t('settings.login.title') }}
			</h3>
			<div class="flex items-center">
				<input
					autocomplete="off"
					type="password"
					:value="arl"
					id="login_input_arl"
					ref="loginInput"
					placeholder="ARL"
				/>
				<button id="settings_btn_copyArl" class="ml-2 btn btn-primary btn-only-icon" @click="copyARLtoClipboard">
					<i class="material-icons">assignment</i>
				</button>
			</div>
			<a href="https://codeberg.org/RemixDev/deemix/wiki/Getting-your-own-ARL" target="_blank">
				{{ $t('settings.login.arl.question') }}
			</a>
			<a id="settings_btn_applogin" v-if="clientMode" href="#" @click="appLogin">
				{{ $t('settings.login.login') }}
			</a>
			<button class="btn btn-primary" id="settings_btn_updateArl" @click="login" style="width: 100%">
				{{ $t('settings.login.arl.update') }}
			</button>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">language</i>{{ $t('settings.languages') }}
			</h3>
			<div>
				<span
					v-for="locale in locales"
					:key="locale"
					class="locale-flag"
					:class="{ 'locale-flag--current': currentLocale === locale }"
					@click="changeLocale(locale)"
					v-html="flags[locale]"
					:title="locale"
				>
				</span>
			</div>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">web</i>{{ $t('settings.appearance.title') }}
			</h3>
			<label class="with-checkbox">
				<input type="checkbox" v-model="changeSlimDownloads" />
				<span class="checkbox_text">{{ $t('settings.appearance.slimDownloadTab') }}</span>
			</label>
			<label class="with-checkbox">
				<input type="checkbox" v-model="changeSlimSidebar" />
				<span class="checkbox_text">{{ $t('settings.appearance.slimSidebar') }}</span>
			</label>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">folder</i>{{ $t('settings.downloadPath.title') }}
			</h3>
			<div class="flex items-center">
				<input autocomplete="off" type="text" v-model="settings.downloadLocation" />
				<button
					id="select_downloads_folder"
					v-if="clientMode"
					class="ml-2 btn btn-primary btn-only-icon"
					@click="selectDownloadFolder"
				>
					<i class="material-icons">folder</i>
				</button>
			</div>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">font_download</i>{{ $t('settings.templates.title') }}
			</h3>

			<p>{{ $t('settings.templates.tracknameTemplate') }}</p>
			<input type="text" v-model="settings.tracknameTemplate" />

			<p>{{ $t('settings.templates.albumTracknameTemplate') }}</p>
			<input type="text" v-model="settings.albumTracknameTemplate" />

			<p>{{ $t('settings.templates.playlistTracknameTemplate') }}</p>
			<input type="text" v-model="settings.playlistTracknameTemplate" />
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">create_new_folder</i>{{ $t('settings.folders.title') }}
			</h3>
			<div class="settings-container">
				<div class="settings-container__third">
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.createPlaylistFolder" />
						<span class="checkbox_text">{{ $t('settings.folders.createPlaylistFolder') }}</span>
					</label>
					<div class="input_group" v-if="settings.createPlaylistFolder">
						<p class="input_group_text">{{ $t('settings.folders.playlistNameTemplate') }}</p>
						<input type="text" v-model="settings.playlistNameTemplate" />
					</div>
				</div>
				<div class="settings-container__third">
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.createArtistFolder" />
						<span class="checkbox_text">{{ $t('settings.folders.createArtistFolder') }}</span>
					</label>

					<div class="input_group" v-if="settings.createArtistFolder">
						<p class="input_group_text">{{ $t('settings.folders.artistNameTemplate') }}</p>
						<input type="text" v-model="settings.artistNameTemplate" />
					</div>
				</div>
				<div class="settings-container__third">
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.createAlbumFolder" />
						<span class="checkbox_text">{{ $t('settings.folders.createAlbumFolder') }}</span>
					</label>

					<div class="input_group" v-if="settings.createAlbumFolder">
						<p class="input_group_text">{{ $t('settings.folders.albumNameTemplate') }}</p>
						<input type="text" v-model="settings.albumNameTemplate" />
					</div>
				</div>
			</div>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.createCDFolder" />
				<span class="checkbox_text">{{ $t('settings.folders.createCDFolder') }}</span>
			</label>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.createStructurePlaylist" />
				<span class="checkbox_text">{{ $t('settings.folders.createStructurePlaylist') }}</span>
			</label>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.createSingleFolder" />
				<span class="checkbox_text">{{ $t('settings.folders.createSingleFolder') }}</span>
			</label>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">title</i>{{ $t('settings.trackTitles.title') }}
			</h3>

			<div class="settings-container">
				<div class="settings-container__third settings-container__third--only-checkbox">
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.padTracks" />
						<span class="checkbox_text">{{ $t('settings.trackTitles.padTracks') }}</span>
					</label>
				</div>
				<div class="settings-container__third">
					<div class="input_group">
						<p class="input_group_text">{{ $t('settings.trackTitles.paddingSize') }}</p>
						<input max="10" type="number" v-model="settings.paddingSize" />
					</div>
				</div>
				<div class="settings-container__third">
					<div class="input_group">
						<p class="input_group_text">{{ $t('settings.trackTitles.illegalCharacterReplacer') }}</p>
						<input type="text" v-model="settings.illegalCharacterReplacer" />
					</div>
				</div>
			</div>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">get_app</i>{{ $t('settings.downloads.title') }}
			</h3>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.downloads.queueConcurrency') }}</p>
				<input type="number" min="1" v-model.number="settings.queueConcurrency" />
			</div>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.downloads.maxBitrate.title') }}</p>
				<select v-model="settings.maxBitrate">
					<option value="9">{{ $t('settings.downloads.maxBitrate.9') }}</option>
					<option value="3">{{ $t('settings.downloads.maxBitrate.3') }}</option>
					<option value="1">{{ $t('settings.downloads.maxBitrate.1') }}</option>
				</select>
			</div>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.downloads.overwriteFile.title') }}</p>
				<select v-model="settings.overwriteFile">
					<option value="y">{{ $t('settings.downloads.overwriteFile.y') }}</option>
					<option value="n">{{ $t('settings.downloads.overwriteFile.n') }}</option>
					<option value="e">{{ $t('settings.downloads.overwriteFile.e') }}</option>
					<option value="b">{{ $t('settings.downloads.overwriteFile.b') }}</option>
					<option value="t">{{ $t('settings.downloads.overwriteFile.t') }}</option>
				</select>
			</div>

			<div class="settings-container">
				<div class="settings-container__third settings-container__third--only-checkbox">
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.fallbackBitrate" />
						<span class="checkbox_text">{{ $t('settings.downloads.fallbackBitrate') }}</span>
					</label>

					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.fallbackSearch" />
						<span class="checkbox_text">{{ $t('settings.downloads.fallbackSearch') }}</span>
					</label>
				</div>
				<div class="settings-container__third settings-container__third--only-checkbox">
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.logErrors" />
						<span class="checkbox_text">{{ $t('settings.downloads.logErrors') }}</span>
					</label>

					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.logSearched" />
						<span class="checkbox_text">{{ $t('settings.downloads.logSearched') }}</span>
					</label>
				</div>
				<div class="settings-container__third settings-container__third--only-checkbox">
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.syncedLyrics" />
						<span class="checkbox_text">{{ $t('settings.downloads.syncedLyrics') }}</span>
					</label>

					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.createM3U8File" />
						<span class="checkbox_text">{{ $t('settings.downloads.createM3U8File') }}</span>
					</label>
				</div>
			</div>

			<div class="input_group" v-if="settings.createM3U8File">
				<p class="input_group_text">{{ $t('settings.downloads.playlistFilenameTemplate') }}</p>
				<input type="text" v-model="settings.playlistFilenameTemplate" />
			</div>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.saveDownloadQueue" />
				<span class="checkbox_text">{{ $t('settings.downloads.saveDownloadQueue') }}</span>
			</label>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">album</i>{{ $t('settings.covers.title') }}
			</h3>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.saveArtwork" />
				<span class="checkbox_text">{{ $t('settings.covers.saveArtwork') }}</span>
			</label>

			<div class="input_group" v-if="settings.saveArtwork">
				<p class="input_group_text">{{ $t('settings.covers.coverImageTemplate') }}</p>
				<input type="text" v-model="settings.coverImageTemplate" />
			</div>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.saveArtworkArtist" />
				<span class="checkbox_text">{{ $t('settings.covers.saveArtworkArtist') }}</span>
			</label>

			<div class="input_group" v-if="settings.saveArtworkArtist">
				<p class="input_group_text">{{ $t('settings.covers.artistImageTemplate') }}</p>
				<input type="text" v-model="settings.artistImageTemplate" />
			</div>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.covers.localArtworkSize') }}</p>
				<input type="number" min="100" max="10000" step="100" v-model.number="settings.localArtworkSize" />
				<p v-if="settings.localArtworkSize > 1200" class="input_group_text" style="opacity: 0.75; color: #ffcc22">
					⚠️ {{ $t('settings.covers.imageSizeWarning') }}
				</p>
			</div>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.covers.embeddedArtworkSize') }}</p>
				<input type="number" min="100" max="10000" step="100" v-model.number="settings.embeddedArtworkSize" />
				<p v-if="settings.embeddedArtworkSize > 1200" class="input_group_text" style="opacity: 0.75; color: #ffcc22">
					⚠️ {{ $t('settings.covers.imageSizeWarning') }}
				</p>
			</div>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.covers.localArtworkFormat.title') }}</p>
				<select v-model="settings.localArtworkFormat">
					<option value="jpg">{{ $t('settings.covers.localArtworkFormat.jpg') }}</option>
					<option value="png">{{ $t('settings.covers.localArtworkFormat.png') }}</option>
					<option value="jpg,png">{{ $t('settings.covers.localArtworkFormat.both') }}</option>
				</select>
			</div>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.embeddedArtworkPNG" />
				<span class="checkbox_text">{{ $t('settings.covers.embeddedArtworkPNG') }}</span>
			</label>
			<p v-if="settings.embeddedArtworkPNG" style="opacity: 0.75; color: #ffcc22">
				⚠️ {{ $t('settings.covers.embeddedPNGWarning') }}
			</p>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.tags.coverDescriptionUTF8" />
				<span class="checkbox_text">{{ $t('settings.covers.coverDescriptionUTF8') }}</span>
			</label>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.covers.jpegImageQuality') }}</p>
				<input type="number" min="1" max="100" v-model.number="settings.jpegImageQuality" />
			</div>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons" style="width: 1em; height: 1em">bookmarks</i>{{ $t('settings.tags.head') }}
			</h3>

			<div class="settings-container">
				<div class="settings-container__half">
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.title" />
						<span class="checkbox_text">{{ $t('settings.tags.title') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.artist" />
						<span class="checkbox_text">{{ $t('settings.tags.artist') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.album" />
						<span class="checkbox_text">{{ $t('settings.tags.album') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.cover" />
						<span class="checkbox_text">{{ $t('settings.tags.cover') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.trackNumber" />
						<span class="checkbox_text">{{ $t('settings.tags.trackNumber') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.trackTotal" />
						<span class="checkbox_text">{{ $t('settings.tags.trackTotal') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.discNumber" />
						<span class="checkbox_text">{{ $t('settings.tags.discNumber') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.discTotal" />
						<span class="checkbox_text">{{ $t('settings.tags.discTotal') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.albumArtist" />
						<span class="checkbox_text">{{ $t('settings.tags.albumArtist') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.genre" />
						<span class="checkbox_text">{{ $t('settings.tags.genre') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.year" />
						<span class="checkbox_text">{{ $t('settings.tags.year') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.date" />
						<span class="checkbox_text">{{ $t('settings.tags.date') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.explicit" />
						<span class="checkbox_text">{{ $t('settings.tags.explicit') }}</span>
					</label>
				</div>

				<div class="settings-container__half">
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.isrc" />
						<span class="checkbox_text">{{ $t('settings.tags.isrc') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.length" />
						<span class="checkbox_text">{{ $t('settings.tags.length') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.barcode" />
						<span class="checkbox_text">{{ $t('settings.tags.barcode') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.bpm" />
						<span class="checkbox_text">{{ $t('settings.tags.bpm') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.replayGain" />
						<span class="checkbox_text">{{ $t('settings.tags.replayGain') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.label" />
						<span class="checkbox_text">{{ $t('settings.tags.label') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.lyrics" />
						<span class="checkbox_text">{{ $t('settings.tags.lyrics') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.syncedLyrics" />
						<span class="checkbox_text">{{ $t('settings.tags.syncedLyrics') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.copyright" />
						<span class="checkbox_text">{{ $t('settings.tags.copyright') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.composer" />
						<span class="checkbox_text">{{ $t('settings.tags.composer') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.involvedPeople" />
						<span class="checkbox_text">{{ $t('settings.tags.involvedPeople') }}</span>
					</label>
					<label class="with-checkbox">
						<input type="checkbox" v-model="settings.tags.source" />
						<span class="checkbox_text">{{ $t('settings.tags.source') }}</span>
					</label>
				</div>
			</div>
		</div>

		<div class="settings-group">
			<h3 class="settings-group__header settings-group__header--with-icon">
				<i class="material-icons">list</i>{{ $t('settings.other.title') }}
			</h3>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.tags.savePlaylistAsCompilation" />
				<span class="checkbox_text">{{ $t('settings.other.savePlaylistAsCompilation') }}</span>
			</label>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.tags.useNullSeparator" />
				<span class="checkbox_text">{{ $t('settings.other.useNullSeparator') }}</span>
			</label>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.tags.saveID3v1" />
				<span class="checkbox_text">{{ $t('settings.other.saveID3v1') }}</span>
			</label>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.other.multiArtistSeparator.title') }}</p>
				<select v-model="settings.tags.multiArtistSeparator">
					<option value="nothing">{{ $t('settings.other.multiArtistSeparator.nothing') }}</option>
					<option value="default">{{ $t('settings.other.multiArtistSeparator.default') }}</option>
					<option value="andFeat">{{ $t('settings.other.multiArtistSeparator.andFeat') }}</option>
					<option value=" & ">{{ $t('settings.other.multiArtistSeparator.using', { separator: ' & ' }) }}</option>
					<option value=",">{{ $t('settings.other.multiArtistSeparator.using', { separator: ',' }) }}</option>
					<option value=", ">{{ $t('settings.other.multiArtistSeparator.using', { separator: ', ' }) }}</option>
					<option value="/">{{ $t('settings.other.multiArtistSeparator.using', { separator: '/' }) }}</option>
					<option value=" / ">{{ $t('settings.other.multiArtistSeparator.using', { separator: ' / ' }) }}</option>
					<option value=";">{{ $t('settings.other.multiArtistSeparator.using', { separator: ';' }) }}</option>
					<option value="; ">{{ $t('settings.other.multiArtistSeparator.using', { separator: '; ' }) }}</option>
				</select>
			</div>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.tags.singleAlbumArtist" />
				<span class="checkbox_text">{{ $t('settings.other.singleAlbumArtist') }}</span>
			</label>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.albumVariousArtists" />
				<span class="checkbox_text">{{ $t('settings.other.albumVariousArtists') }}</span>
			</label>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.removeAlbumVersion" />
				<span class="checkbox_text">{{ $t('settings.other.removeAlbumVersion') }}</span>
			</label>

			<label class="with-checkbox">
				<input type="checkbox" v-model="settings.removeDuplicateArtists" />
				<span class="checkbox_text">{{ $t('settings.other.removeDuplicateArtists') }}</span>
			</label>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.other.dateFormat.title') }}</p>
				<select v-model="settings.dateFormat">
					<option value="Y-M-D">
						{{
							`${$t('settings.other.dateFormat.year')}-${$t('settings.other.dateFormat.month')}-${$t(
								'settings.other.dateFormat.day'
							)}`
						}}
					</option>
					<option value="Y-D-M">
						{{
							`${$t('settings.other.dateFormat.year')}-${$t('settings.other.dateFormat.day')}-${$t(
								'settings.other.dateFormat.month'
							)}`
						}}
					</option>
					<option value="D-M-Y">
						{{
							`${$t('settings.other.dateFormat.day')}-${$t('settings.other.dateFormat.month')}-${$t(
								'settings.other.dateFormat.year'
							)}`
						}}
					</option>
					<option value="M-D-Y">
						{{
							`${$t('settings.other.dateFormat.month')}-${$t('settings.other.dateFormat.day')}-${$t(
								'settings.other.dateFormat.year'
							)}`
						}}
					</option>
					<option value="Y">{{ $t('settings.other.dateFormat.year') }}</option>
				</select>
			</div>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.other.featuredToTitle.title') }}</p>
				<select v-model="settings.featuredToTitle">
					<option value="0">{{ $t('settings.other.featuredToTitle.0') }}</option>
					<option value="1">{{ $t('settings.other.featuredToTitle.1') }}</option>
					<option value="3">{{ $t('settings.other.featuredToTitle.3') }}</option>
					<option value="2">{{ $t('settings.other.featuredToTitle.2') }}</option>
				</select>
			</div>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.other.titleCasing') }}</p>
				<select v-model="settings.titleCasing">
					<option value="nothing">{{ $t('settings.other.casing.nothing') }}</option>
					<option value="lower">{{ $t('settings.other.casing.lower') }}</option>
					<option value="upper">{{ $t('settings.other.casing.upper') }}</option>
					<option value="start">{{ $t('settings.other.casing.start') }}</option>
					<option value="sentence">{{ $t('settings.other.casing.sentence') }}</option>
				</select>
			</div>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.other.artistCasing') }}</p>
				<select v-model="settings.artistCasing">
					<option value="nothing">{{ $t('settings.other.casing.nothing') }}</option>
					<option value="lower">{{ $t('settings.other.casing.lower') }}</option>
					<option value="upper">{{ $t('settings.other.casing.upper') }}</option>
					<option value="start">{{ $t('settings.other.casing.start') }}</option>
					<option value="sentence">{{ $t('settings.other.casing.sentence') }}</option>
				</select>
			</div>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.other.previewVolume') }}</p>
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
				<p class="input_group_text">{{ $t('settings.other.executeCommand.title') }}</p>
				<p class="secondary-text">{{ $t('settings.other.executeCommand.description') }}</p>
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
				{{ $t('settings.spotify.title') }}
			</h3>
			<a href="https://codeberg.org/RemixDev/deemix/wiki/Enabling-Spotify-Features" target="_blank">
				{{ $t('settings.spotify.question') }}
			</a>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.spotify.clientID') }}</p>
				<input type="text" v-model="spotifyFeatures.clientId" />
			</div>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.spotify.clientSecret') }}</p>
				<input type="password" v-model="spotifyFeatures.clientSecret" />
			</div>

			<div class="input_group">
				<p class="input_group_text">{{ $t('settings.spotify.username') }}</p>
				<input type="text" v-model="spotifyUser" />
			</div>
		</div>

		<footer class="bg-background-main">
			<button class="mr-2 btn btn-primary" @click="resetSettings">{{ $t('settings.reset') }}</button>
			<button class="btn btn-primary" @click="saveSettings">{{ $t('settings.save') }}</button>
		</footer>
	</div>
</template>

<style lang="scss">
#logged_in_info {
	height: 250px;
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
}

.locale-flag {
	width: 60px;
	display: flex items-center;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	&:not(:last-child) {
		margin-right: 10px;
	}

	&.locale-flag--current {
		svg {
			filter: brightness(1);
		}
	}

	svg {
		width: 40px !important;
		height: 40px !important;
		filter: brightness(0.5);
	}
}
</style>

<script>
import { mapActions, mapGetters } from 'vuex'

import { getSettingsData } from '@/data/settings'

import { toast } from '@/utils/toasts'
import { socket } from '@/utils/socket'
import { flags } from '@/utils/flags'

export default {
	data() {
		return {
			flags,
			currentLocale: this.$i18n.locale,
			locales: this.$i18n.availableLocales,
			settings: {
				tags: {}
			},
			lastSettings: {},
			spotifyFeatures: {},
			lastCredentials: {},
			defaultSettings: {},
			lastUser: '',
			spotifyUser: '',
			slimDownloads: false,
			slimSidebar: false,
			previewVolume: window.vol,
			accountNum: 0,
			accounts: []
		}
	},
	computed: {
		...mapGetters({
			arl: 'getARL',
			user: 'getUser',
			isLoggedIn: 'isLoggedIn',
			clientMode: 'getClientMode'
		}),
		needToWait() {
			return Object.keys(this.getSettings).length === 0
		},
		changeSlimDownloads: {
			get() {
				return this.slimDownloads
			},
			set(wantSlimDownloads) {
				this.slimDownloads = wantSlimDownloads
				document.getElementById('download_list').classList.toggle('slim', wantSlimDownloads)
				localStorage.setItem('slimDownloads', wantSlimDownloads)
			}
		},
		changeSlimSidebar: {
			get() {
				return this.slimSidebar
			},
			set(wantSlimSidebar) {
				this.slimSidebar = wantSlimSidebar
				document.getElementById('sidebar').classList.toggle('slim', wantSlimSidebar)
				localStorage.setItem('slimSidebar', wantSlimSidebar)
			}
		},
		pictureHref() {
			// Default image: https://e-cdns-images.dzcdn.net/images/user/125x125-000000-80-0-0.jpg
			return `https://e-cdns-images.dzcdn.net/images/user/${this.user.picture}/125x125-000000-80-0-0.jpg`
		}
	},
	async mounted() {
		const { settingsData, defaultSettingsData, spotifyCredentials } = await getSettingsData()

		this.defaultSettings = defaultSettingsData
		this.initSettings(settingsData, spotifyCredentials)

		let storedAccountNum = localStorage.getItem('accountNum')

		if (storedAccountNum) {
			this.accountNum = storedAccountNum
		}

		let spotifyUser = localStorage.getItem('spotifyUser')

		if (spotifyUser) {
			this.lastUser = spotifyUser
			this.spotifyUser = spotifyUser
			socket.emit('update_userSpotifyPlaylists', spotifyUser)
		}

		this.changeSlimDownloads = 'true' === localStorage.getItem('slimDownloads')
		this.changeSlimSidebar = 'true' === localStorage.getItem('slimSidebar')

		let volume = parseInt(localStorage.getItem('previewVolume'))

		if (isNaN(volume)) {
			volume = 80
			localStorage.setItem('previewVolume', volume)
		}

		window.vol.preview_max_volume = volume

		socket.on('updateSettings', this.updateSettings)
		socket.on('accountChanged', this.accountChanged)
		socket.on('familyAccounts', this.initAccounts)
		socket.on('downloadFolderSelected', this.downloadFolderSelected)
		socket.on('applogin_arl', this.loggedInViaDeezer)

		this.$on('hook:destroyed', () => {
			socket.off('updateSettings')
			socket.off('accountChanged')
			socket.off('familyAccounts')
			socket.off('downloadFolderSelected')
			socket.off('applogin_arl')
		})
	},
	methods: {
		...mapActions({
			dispatchARL: 'setARL'
		}),
		revertSettings() {
			this.settings = JSON.parse(JSON.stringify(this.lastSettings))
		},
		revertCredentials() {
			this.spotifyCredentials = JSON.parse(JSON.stringify(this.lastCredentials))
			this.spotifyUser = (' ' + this.lastUser).slice(1)
		},
		copyARLtoClipboard() {
			let copyText = this.$refs.loginInput

			copyText.setAttribute('type', 'text')
			copyText.select()
			copyText.setSelectionRange(0, 99999)
			document.execCommand('copy')
			copyText.setAttribute('type', 'password')

			toast(this.$t('settings.toasts.ARLcopied'), 'assignment')
		},
		changeLocale(newLocale) {
			this.$i18n.locale = newLocale
			this.currentLocale = newLocale
			localStorage.setItem('locale', newLocale)
		},
		updateMaxVolume() {
			localStorage.setItem('previewVolume', this.previewVolume.preview_max_volume)
		},
		saveSettings() {
			this.lastSettings = JSON.parse(JSON.stringify(this.settings))
			this.lastCredentials = JSON.parse(JSON.stringify(this.spotifyFeatures))

			let changed = false

			if (this.lastUser != this.spotifyUser) {
				// force cloning without linking
				this.lastUser = (' ' + this.spotifyUser).slice(1)
				localStorage.setItem('spotifyUser', this.lastUser)
				changed = true
			}

			socket.emit('saveSettings', this.lastSettings, this.lastCredentials, changed ? this.lastUser : false)
		},
		selectDownloadFolder() {
			socket.emit('selectDownloadFolder')
		},
		downloadFolderSelected(folder) {
			this.$set(this.settings, 'downloadLocation', folder)
		},
		loadSettings(data) {
			this.lastSettings = JSON.parse(JSON.stringify(data))
			this.settings = JSON.parse(JSON.stringify(data))
		},
		loadCredentials(credentials) {
			this.lastCredentials = JSON.parse(JSON.stringify(credentials))
			this.spotifyFeatures = JSON.parse(JSON.stringify(credentials))
		},
		loggedInViaDeezer(arl) {
			this.dispatchARL({ arl })
			socket.emit('login', arl, true, this.accountNum)
			// this.login()
		},
		login() {
			let newArl = this.$refs.loginInput.value.trim()

			if (newArl && newArl !== this.arl) {
				socket.emit('login', newArl, true, this.accountNum)
			}
		},
		appLogin(e) {
			socket.emit('applogin')
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
		initSettings(settings, credentials) {
			// this.loadDefaultSettings()
			this.loadSettings(settings)
			this.loadCredentials(credentials)

			toast(this.$t('settings.toasts.init'), 'settings')
		},
		updateSettings(newSettings, newCredentials) {
			this.loadSettings(newSettings)
			this.loadCredentials(newCredentials)

			toast(this.$t('settings.toasts.update'), 'settings')
		},
		resetSettings() {
			this.settings = JSON.parse(JSON.stringify(this.defaultSettings))
		}
	}
}
</script>
