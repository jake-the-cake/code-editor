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
const selector = document.getElementById('selector');
const htmlTab = document.getElementById('html-tab');
const cssTab = document.getElementById('css-tab');
const jsTab = document.getElementById('js-tab');
let htmlContent = '';
let cssContent = '';
let jsContent = '';
let currentContent;
const tabs = [
    [htmlTab, htmlContent],
    [cssTab, cssContent],
    [jsTab, jsContent]
];
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
        const code = input.value;
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
/*  ::: Functionality of switching tabs */
//////////////////////////////////////////
const handleTabSwitch = (event) => {
    let wasActive;
    const changeActiveTab = (active) => {
        const inactive = tabs.filter(tab => tab[0] !== active);
        inactive.forEach((t, i) => {
            var _a, _b;
            if ((_a = t[0]) === null || _a === void 0 ? void 0 : _a.classList.contains('active-tab')) {
                (_b = inactive[i][0]) === null || _b === void 0 ? void 0 : _b.classList.remove('active-tab');
                wasActive = inactive[i][0];
            }
        });
        active === null || active === void 0 ? void 0 : active.classList.add('active-tab');
    };
    const changeActiveContent = (active, idx) => {
        const inactive = tabs.filter(tab => tab[0] !== active);
        inactive.forEach((t, i) => {
            if (wasActive === t[0]) {
                tabs[idx][1] = input.value;
            }
        });
    };
    switch (event.target) {
        case htmlTab:
            changeActiveTab(htmlTab);
            changeActiveContent(htmlTab, 0);
            currentContent = tabs[0][1];
            // currentContent = htmlContent
            break;
        case cssTab:
            changeActiveTab(cssTab);
            changeActiveContent(cssTab, 1);
            // if (wasActive === htmlTab) {
            //     htmlContent = input.value
            // }
            // else if (wasActive === jsTab) {
            //     jsContent = input.value
            // }
            currentContent = tabs[1][1];
            break;
        case jsTab:
            changeActiveTab(jsTab);
            changeActiveContent(jsTab, 2);
            // if (wasActive === htmlTab) {
            //     htmlContent = input.value
            // }
            // else if (wasActive === cssTab) {
            //     cssContent = input.value
            // }
            currentContent = tabs[2][1];
            // currentContent = jsContent
            break;
        default:
            break;
    }
    input.value = currentContent;
};
selector === null || selector === void 0 ? void 0 : selector.addEventListener('click', handleTabSwitch);
