import { Notify, Loading } from 'quasar'

export function showSucessMessage(sucessMessage) {
    Loading.hide()
    Notify.create({
        title: 'Sucess',
        message: sucessMessage,
        type: 'positive',
        progress: true
        

    })

    

}