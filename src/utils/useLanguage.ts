import { computed } from "vue";
import { useI18n } from "vue-i18n";

export default function useLanguage(){
    const i18n = useI18n();
    const currentLocale = computed(()=>{
        return i18n.locale.value;
    })

    const changeLocale = (value: string)=>{
        i18n.locale.value = value;
        localStorage.setItem("lang",value);
    }
    return{
        i18n,
        currentLocale,
        changeLocale
    }
}