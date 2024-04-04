import AsyncStorage  from '@react-native-community/async-storage'


const LANGUAGE_PREF = "language_pref";
const USER_ID = "userId";
const LOGIN_DATA = "loginData";
const TRAINER_LOGIN = "trainerLogin";
const ACCOUNT_DATA = 'AccountData'

export const saveLanguagePref = async (language) => {
    await AsyncStorage.setItem(LANGUAGE_PREF, language);
}

export const getLanguagePref = async () => {
    const language = await AsyncStorage.getItem(LANGUAGE_PREF);
    if(language){
        return language;
    }else {
        return "en";
    }
}

export const saveUserProfileInfo = async (userInfo) => {
    await AsyncStorage.setItem(LOGIN_DATA, JSON.stringify(userInfo));
}

export const getUserProfileInfo = async () => {
    const userProfileInfo = await AsyncStorage.getItem(LOGIN_DATA);
    return JSON.parse(userProfileInfo);
}

export const saveAccountInfo = async (accountInfo) => {
    await AsyncStorage.setItem(ACCOUNT_DATA, JSON.stringify(accountInfo));
}

export const getAccountInfo = async () => {
    const userAccountInfo = await AsyncStorage.getItem(ACCOUNT_DATA);
    return JSON.parse(userAccountInfo);
}
