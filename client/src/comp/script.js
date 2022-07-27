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
input.value = '';
let htmlContent = '';
let cssContent = '';
let jsContent = '';
let currentContent;
const tabs = [
    [htmlTab, ''],
    [cssTab, ''],
    [jsTab, '']
];
let activeTab = tabs[0][0];
let isLoading = true;
let isWorking = false;
let isDisplayed = false;
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
        input.style.pointerEvents = 'none';
        selector.style.pointerEvents = 'none';
        editActive === null || editActive === void 0 ? void 0 : editActive.classList.toggle('none');
        updateActive === null || updateActive === void 0 ? void 0 : updateActive.classList.toggle('none');
        loader === null || loader === void 0 ? void 0 : loader.classList.toggle('none');
        switch (activeTab.id) {
            case 'html-tab':
                tabs[0][1] = input.value;
                break;
            case 'css-tab':
                tabs[1][1] = input.value;
                break;
            case 'js-tab':
                tabs[2][1] = input.value;
                break;
            default:
                break;
        }
        toggleOutputLoader();
        // const code = input!.value
        const code = `<style>${tabs[1][1]}</style>${tabs[0][1]}<script>${tabs[2][1]}</script>`;
        out.innerHTML = code;
        console.log(code);
        isLoading = true;
        isWorking = false;
        isDisplayed = true;
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
        input.style.pointerEvents = 'auto';
        selector.style.pointerEvents = 'auto';
        updateActive === null || updateActive === void 0 ? void 0 : updateActive.classList.toggle('none');
        display.style.flex = '1';
        editor.style.flex = '4';
        input === null || input === void 0 ? void 0 : input.focus();
        isWorking = false;
        isDisplayed = false;
    }
    else
        console.log('second');
};
edit === null || edit === void 0 ? void 0 : edit.addEventListener('click', handleEditCode);
/*  ::: Functionality of switching tabs */
//////////////////////////////////////////
const handleTabSwitch = (event) => {
    console.log(event);
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
                t[1] = input.value;
            }
        });
        activeTab = active;
        currentContent = tabs[idx][1];
    };
    let idx;
    switch (event.target) {
        case htmlTab:
            idx = 0;
            changeActiveTab(htmlTab);
            changeActiveContent(htmlTab, idx);
            break;
        case cssTab:
            idx = 1;
            changeActiveTab(cssTab);
            changeActiveContent(cssTab, idx);
            break;
        case jsTab:
            idx = 2;
            changeActiveTab(jsTab);
            changeActiveContent(jsTab, idx);
            break;
        default:
            break;
    }
    input.value = currentContent;
    input.focus();
};
selector === null || selector === void 0 ? void 0 : selector.addEventListener('click', handleTabSwitch);
editor === null || editor === void 0 ? void 0 : editor.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target;
    console.log(target);
    if (target !== update && isDisplayed === true) {
        handleEditCode(event);
        if (target === htmlTab || target === cssTab || target === jsTab) {
            handleTabSwitch({ target: target });
        }
    }
});
input.addEventListener('keypress', (event) => {
    event.preventDefault();
    input.value += event.key;
});
