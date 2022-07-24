

const out: HTMLElement | null = document.getElementById('output-area') as HTMLDivElement
const loader = document.getElementById('output-loader')
const update = document.getElementById('update-code')

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
        loader?.classList.toggle('none')
        toggleOutputLoader()
        isLoading = true
        const code = (document.getElementById('input-area') as HTMLTextAreaElement)!.value
        out.innerHTML = code
        isWorking = false
    } else console.log('first')
}
update?.addEventListener('click', handleUpdateCode)