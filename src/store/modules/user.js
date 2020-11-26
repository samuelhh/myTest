const state = {
    userName: "hanh",
    age:20
}
const actions = {

}
const mutations = {
    SET_USERNAME: (state, data) => {
        state.userName = data;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}