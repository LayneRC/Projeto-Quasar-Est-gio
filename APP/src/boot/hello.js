import hello from 'hellojs'

export default ({ Vue }) => {
    hello.init({
        facebook: '797855870771131'
    })
    Vue.prototype.$hello = hello
}