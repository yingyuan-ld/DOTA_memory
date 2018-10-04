export function next_process(newdata) {//登录 (下一步)
    return {
        type: "NEXT_PROCESS",
        newdata:newdata
    };
}