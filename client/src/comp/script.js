"use strict";
const out = document.getElementById('output-area');
const loader = document.getElementById('output-loader');
const update = document.getElementById('update-code');
const updateActive = document.getElementById('control-update');
const editActive = document.getElementById('control-edit');
const edit = document.getElementById('edit-code');
const display = document.getElementById('display');
const editor = document.getElementById('editor');
const input = document.getElementById('input-area');
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
        display.style.flex = '4';
        editor.style.flex = '1';
        editActive === null || editActive === void 0 ? void 0 : editActive.classList.toggle('none');
        updateActive === null || updateActive === void 0 ? void 0 : updateActive.classList.toggle('none');
        loader === null || loader === void 0 ? void 0 : loader.classList.toggle('none');
        toggleOutputLoader();
        const code = document.getElementById('input-area').value;
        out.innerHTML = code;
        isLoading = true;
        isWorking = false;
    }
    else
        console.log('first');
};
update === null || update === void 0 ? void 0 : update.addEventListener('click', handleUpdateCode);
/*  ::: Edit Code Button  */
//////////////////////////////////////////
const handleEditCode = (event) => {
    if (isWorking === false) {
        isWorking = true;
        event.preventDefault();
        editActive === null || editActive === void 0 ? void 0 : editActive.classList.toggle('none');
        updateActive === null || updateActive === void 0 ? void 0 : updateActive.classList.toggle('none');
        display.style.flex = '1';
        editor.style.flex = '4';
        input === null || input === void 0 ? void 0 : input.focus();
        isWorking = false;
    }
    else
        console.log('second');
};
edit === null || edit === void 0 ? void 0 : edit.addEventListener('click', handleEditCode);
