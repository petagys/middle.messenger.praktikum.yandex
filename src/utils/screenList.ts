import { BlockClass } from '../core';
import {
    Page404, Page500, ChangePass,
    Chat, LoginPage, Profile, Registration,
} from '../pages';

export enum Screens {
  Page404 = '404',
  LoginPage = 'login',
  Profile = 'profile',
  Page500 = '500',
  ChangePass = 'changePass',
  Registration = 'registration',
  Chat = 'chat',
}

const map: Record<Screens, BlockClass<any>> = {
    [Screens.Page404]: Page404,
    [Screens.Page500]: Page500,
    [Screens.Profile]: Profile,
    [Screens.ChangePass]: ChangePass,
    [Screens.Registration]: Registration,
    [Screens.LoginPage]: LoginPage,
    [Screens.Chat]: Chat,
};

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
    return map[screen];
};
