import { createStore } from "vuex"
import * as UTILS from "../utils"

interface State {
    isNegative: boolean
    history: any
    result: any
    queue: any[]
}

export default createStore<State>({
    state() {
        return {
            isNegative: false,
            history: {},
            result: '',
            queue: []
        }
    },
    mutations: {
        getInitialHistory(state) {
            if (!UTILS.getStorage('calcHistory')) {
                state.history = {
                    _calcinput: "",
                    _result: "",
                    calculatedAt: ""
                }
            }
            else {
                state.history = UTILS.getStorage('calcHistory')
            }
        },
        getInitialResult(state) {
            if (!UTILS.getStorage('result')) {
                state.result = ""
            }
            else {
                state.result = UTILS.getStorage('result')
            }
        },
        updateResult(_, data) {
            UTILS.saveStorage('calcHistory', data)
        },
        addKey(state, key) {
            state.result += key
        },
        clear(state) {
            state.result = ""
            UTILS.clearStorage()
        },
        setNegative(state) {

            state.isNegative = !state.isNegative

            if (state.isNegative && state.result) {
                state.result = '-' + state.result
            }

            else {
                state.result = state.result.replace('-', '')
            }
        },
        summarized(state, result) {
            state.result = result
            UTILS.saveStorage('result', result)
        }
    },
    actions: {
        sum(context) {
            const calculated = UTILS.calculateExp(context.state.result)
            const historyData = {
                _calcinput: context.state.result,
                _result: calculated,
                calculatedAt: new Date().toLocaleString()
            }
            UTILS.saveStorage('calcHistory', historyData)
            context.state.history = historyData
            context.commit('summarized', calculated)
            console.log(context.state.history)
        }
    }
})