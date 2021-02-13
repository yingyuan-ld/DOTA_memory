export function next_process(newdata) {// 登录 (下一步)
    return {
        type: "NEXT_PROCESS",
        newdata:newdata
    };
}
export function show_compop(newdata) {// 弹窗
    return {
        type: "SHOW_COMPOP",
        newdata:newdata
    };
}
export function hide_compop() {// 关闭
    return {
        type: "HIDE_COMPOP"
    };
}
export function set_state(newdata) {// 更新状态
    return {
        type: "SET_STATE",
        newdata:newdata
    };
}