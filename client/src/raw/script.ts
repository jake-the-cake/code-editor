

const out: HTMLElement | null = document.getElementById('output-area') as HTMLDivElement
const loader = document.getElementById('output-loader')
const update = document.getElementById('update-code')
const updateActive = document.getElementById('control-update')
const editActive = document.getElementById('control-edit')
const edit = document.getElementById('edit-code')
const display = document.getElementById('display')
const editor = document.getElementById('editor')
const input = document.getElementById('input-area')

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
        const code = (document.getElementById('input-area') as HTMLTextAreaElement)!.value
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