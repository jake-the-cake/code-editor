

const out: HTMLElement | null = document.getElementById('output-area') as HTMLDivElement
const loader = document.getElementById('output-loader')
const update = document.getElementById('update-code')
const updateActive = document.getElementById('control-update')
const editActive = document.getElementById('control-edit')
const edit = document.getElementById('edit-code')
const display = document.getElementById('display')
const editor = document.getElementById('editor')
const input = document.getElementById('input-area') as HTMLTextAreaElement
const selector = document.getElementById('selector')
const htmlTab = document.getElementById('html-tab')
const cssTab = document.getElementById('css-tab')
const jsTab = document.getElementById('js-tab')


let htmlContent = ''
let cssContent = ''
let jsContent = ''
let currentContent: string | HTMLElement | null

const tabs = [
    [htmlTab, htmlContent],
    [cssTab, cssContent],
    [jsTab, jsContent]
]

let isLoading = true
let isWorking = false

/*  ::: Loading widget  */
//////////////////////////////////////////
const toggleOutputLoader = () => {
    loader?.classList.toggle('shrink')
    setTimeout(() => loader?.classList.toggle('hide'), 100)
    if (isLoading = true) setTimeout(() => {
        loader?.classList.toggle('none')
    }, 400)
    isLoading = false
}
window.addEventListener('load', () => setTimeout(toggleOutputLoader,800))

/*  ::: Update Code Button  */
//////////////////////////////////////////
const handleUpdateCode = (event: Event) => {
    if (isWorking === false) {
        event.preventDefault()
        isWorking = true
        display!.style.flex = '4'
        editor!.style.flex = '1'
        editActive?.classList.toggle('none')
        updateActive?.classList.toggle('none')
        loader?.classList.toggle('none')
        toggleOutputLoader()
        const code = input!.value
        out.innerHTML = code
        isLoading = true
        isWorking = false
    } else console.log('first')
}
update?.addEventListener('click', handleUpdateCode)

/*  ::: Edit Code Button  */
//////////////////////////////////////////
const handleEditCode = (event: Event) => {
    if (isWorking === false) {
        isWorking = true
        event.preventDefault()
        editActive?.classList.toggle('none')
        updateActive?.classList.toggle('none')
        display!.style.flex = '1'
        editor!.style.flex = '4'
        input?.focus()
        isWorking = false
    } else console.log('second')
}
edit?.addEventListener('click', handleEditCode)

/*  ::: Functionality of switching tabs */
//////////////////////////////////////////
const handleTabSwitch = (event: Event) => {
    let wasActive: HTMLElement | null
    const changeActiveTab = (active: HTMLElement | null) => {
        const inactive: any[] = tabs.filter(tab => tab[0] !== active)
        inactive.forEach((t: any[], i) => {
            if (t[0]?.classList.contains('active-tab')) {
                inactive[i][0]?.classList.remove('active-tab')
                wasActive = inactive[i][0]
            }
        })
        active?.classList.add('active-tab')
    }
    const changeActiveContent = (active: HTMLElement | null, idx: number) => {
        const inactive = tabs.filter(tab => tab[0] !== active)
        inactive.forEach((t,i) => {
            if (wasActive === t[0]) {
                tabs[idx][1] = input.value
            }
        })
    }
    switch (event.target) {
        case htmlTab:
            changeActiveTab(htmlTab)
            changeActiveContent(htmlTab, 0)
            currentContent = tabs[0][1]
            // currentContent = htmlContent
            break
        case cssTab:
            changeActiveTab(cssTab)
            changeActiveContent(cssTab, 1)
            // if (wasActive === htmlTab) {
            //     htmlContent = input.value
            // }
            // else if (wasActive === jsTab) {
            //     jsContent = input.value
            // }
            currentContent = tabs[1][1]
            break
        case jsTab:
            changeActiveTab(jsTab)
            changeActiveContent(jsTab, 2)
            // if (wasActive === htmlTab) {
            //     htmlContent = input.value
            // }
            // else if (wasActive === cssTab) {
            //     cssContent = input.value
            // }
            currentContent = tabs[2][1]
            // currentContent = jsContent
            break
        default:
            break
    }
    input.value = currentContent as string
}
selector?.addEventListener('click', handleTabSwitch)