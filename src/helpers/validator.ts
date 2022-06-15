export enum Validator {
    login = 'login',
    password = 'password',
    email = 'email'
}

export function validateValue(rule: Validator, value: string) {
    if (rule === Validator.login) {
        if (value.length === 0) {
            return 'Login can not be empty';
        }
    }
    return '';
}