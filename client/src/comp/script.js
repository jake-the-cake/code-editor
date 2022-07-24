"use strict";
const out = document.getElementById('output-area');
const loader = document.getElementById('output-loader');
const update = document.getElementById('update-code');
let isLoading = true;
let isWorking = false;
/*  ::: Loading widget  */
//////////////////////////////////////////
const toggleOutputLoader = () => {
    loader === null || loader === void 0 ? void 0 : loader.classList.toggle('shrink');
    setTimeout(() => loader === null || loader === void 0 ? void 0 : loader.classList.toggle('hide'), 100);
    if (isLoading = true)
        setTimeout(() => {
            loader === null || loader === void 0 ? void 0 : loader.classList.toggle('none');
        }, 400);
    isLoading = false;
};
window.addEventListener('load', () => setTimeout(toggleOutputLoader, 800));
/*  ::: Update Code Button  */
//////////////////////////////////////////
const handleUpdateCode = (event) => {
    if (isWorking === false) {
        event.preventDefault();
        isWorking = true;
        loader === null || loader === void 0 ? void 0 : loader.classList.toggle('none');
        toggleOutputLoader();
        isLoading = true;
        const code = document.getElementById('input-area').value;
        out.innerHTML = code;
        isWorking = false;
    }
    else
        console.log('first');
};
update === null || update === void 0 ? void 0 : update.addEventListener('click', handleUpdateCode);
