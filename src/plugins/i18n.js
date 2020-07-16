import Vue from 'vue'
import VueI18n from 'vue-i18n'

// Languages
import it from '@/lang/it'
import en from '@/lang/en'

Vue.use(VueI18n)

const DEFAULT_LANG = 'en'

document.querySelector('html').setAttribute('lang', DEFAULT_LANG)

const locales = {
	it,
	en
}

const i18n = new VueI18n({
	locale: DEFAULT_LANG,
	fallbackLocale: DEFAULT_LANG,
	messages: locales
})

export default i18n
