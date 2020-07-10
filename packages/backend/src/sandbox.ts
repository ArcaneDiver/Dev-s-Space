new Promise((res, rej) => {
        rej(new Error("yee"));
})
        .then(m => console.log(m))
        .catch(e => console.log(e, e instanceof Error))
