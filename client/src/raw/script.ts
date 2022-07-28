const out: HTMLElement | null = document.getElementById('output-area') as HTMLDivElement
const loader: HTMLElement | null = document.getElementById('output-loader')
const update: HTMLElement | null = document.getElementById('update-code')
const updateActive: HTMLElement | null = document.getElementById('control-update')
const editActive: HTMLElement | null = document.getElementById('control-edit')
const edit: HTMLElement | null = document.getElementById('edit-code')
const display: HTMLElement | null = document.getElementById('display')
const editor: HTMLElement | null = document.getElementById('editor')
const input: HTMLTextAreaElement | null = document.getElementById('input-area') as HTMLTextAreaElement
const selector: HTMLElement | null = document.getElementById('selector')
const htmlTab: HTMLElement | null = document.getElementById('html-tab')
const cssTab: HTMLElement | null = document.getElementById('css-tab')
const jsTab: HTMLElement | null = document.getElementById('js-tab')
const iframe: HTMLIFrameElement | null = document.getElementById('iframe') as HTMLIFrameElement

input.value = ''

let htmlContent = ''
let cssContent = ''
let jsContent = ''
let currentContent: string

const tabs = [
    [htmlTab, ''],
    [cssTab, ''],
    [jsTab, '']
]

let activeTab: HTMLElement | null = tabs[0][0] as HTMLElement

let isLoading: boolean = true
let isWorking: boolean = false
let isDisplayed: boolean = false

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
        input!.style.pointerEvents = 'none'
        input!.style.filter = 'blur(2px)'
        selector!.style.pointerEvents = 'none'
        selector!.style.filter = 'blur(2px)'
        editActive?.classList.toggle('none')
        updateActive?.classList.toggle('none')
        loader?.classList.toggle('none')
        switch (activeTab!.id) {
            case 'html-tab':
                tabs[0][1] = input.value
                break
            case 'css-tab':
                tabs[1][1] = input.value
                break
            case 'js-tab':
                tabs[2][1] = input.value
                break
            default:
                break
        }
        toggleOutputLoader()
        const code = `<html><head><style>${tabs[1][1]}</style></head><body>${tabs[0][1]}<script>${tabs[2][1]}</script></body></html>`
        iframe.srcdoc = code
        console.log(code)
        isLoading = true
        isWorking = false
        isDisplayed = true
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
        input!.style.pointerEvents = 'auto'
        input!.style.filter = 'none'
        selector!.style.filter = 'none'
        selector!.style.pointerEvents = 'auto'
        updateActive?.classList.toggle('none')
        display!.style.flex = '1'
        editor!.style.flex = '4'
        input?.focus()
        isWorking = false
        isDisplayed = false
    } else console.log('second')
}
edit?.addEventListener('click', handleEditCode)

/*  ::: Functionality of switching tabs */
//////////////////////////////////////////
const handleTabSwitch = (event: any) => {
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
                t[1] = input.value
            }
        })
        activeTab = active
        currentContent = tabs[idx][1] as string
    }
    let idx: number
    switch (event.target) {
        case htmlTab:
            idx = 0
            changeActiveTab(htmlTab)
            changeActiveContent(htmlTab, idx)
            break
        case cssTab:
            idx = 1
            changeActiveTab(cssTab)
            changeActiveContent(cssTab, idx)
            break
        case jsTab:
            idx = 2
            changeActiveTab(jsTab)
            changeActiveContent(jsTab, idx)
            break
        default:
            break
    }
    input.value = currentContent
    input.focus()
}
selector?.addEventListener('click', handleTabSwitch)

editor?.addEventListener('click', (event) => {
    event.preventDefault()
    const target = event.target as HTMLElement
    console.log(target)
    if (target !== update && isDisplayed === true) {
        handleEditCode(event)
        if (target === htmlTab || target === cssTab || target === jsTab) {
            handleTabSwitch({target: target})
        }
    }
})

input.addEventListener('keypress', (event) => {
    event.preventDefault()
    input.value += event.key
})