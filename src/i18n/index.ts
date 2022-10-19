import {createI18n} from 'vue-i18n'
import EN from './en'
import ZH from './zh'
const messages = {
    'en-US':{
        ...EN
    },
    'zh-CN':{
       ...ZH
    }
}

const getCurrentLanguage = ()=>{
    const UAlang = navigator.language //zh-CN en-US
    let langCode = UAlang.indexOf('zh-CN')!==-1?'zh-CN':'en-US';
    localStorage.setItem('lang',langCode);
    return langCode;
};

const i18n = createI18n({
    legacy:false,
    globalInjection:true,
    locale:getCurrentLanguage() || 'zh-CN',
    allowComposition: true,
    messages:messages
});

export default i18n;