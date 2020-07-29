import Vue from 'vue'
import VueI18n from 'vue-i18n'

// Languages
import it from '@/lang/it'
import en from '@/lang/en'
import es from '@/lang/es'
import de from '@/lang/de'
import fr from '@/lang/fr'

Vue.use(VueI18n)

const DEFAULT_LANG = 'en'

document.querySelector('html').setAttribute('lang', DEFAULT_LANG)

const locales = {
	it,
	en,
	es,
	de,
	fr
}

const i18n = new VueI18n({
	locale: DEFAULT_LANG,
	fallbackLocale: DEFAULT_LANG,
	messages: locales,
	pluralizationRules: {
    /**
     * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
     * @param choicesLength {number} an overall amount of available choices
     * @returns a final choice index to select plural word by
     */
    'ru': function(choice, choicesLength) {
      if (choice === 0) { return 0 }
			var n = Math.abs(choice) % 100
			var n1 = n % 10
	    if (n > 10 && n < 20) { return 3 }
	    if (n1 > 1 && n1 < 5) { return 2 }
	    if (n1 == 1) { return 1 }
	    return 3;
    }
  }
})

export default i18n
