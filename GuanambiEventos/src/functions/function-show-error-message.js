import { Notify, Loading } from 'quasar'

export function showErrorMessage(errorMessage) {
    Loading.hide()
    Notify.create({
        title: 'Error',
        message: errorMessage,
        color: 'grey-9',
        textColor: 'white',
        icon: 'las la-exclamation-circle',
        position: 'top',
        progress: true
        

    })



}