import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";
import { Sights } from "./Sights.js";


class Game {
    constructor(){

        this.element = document.querySelector('#game_container')
        this.element.classList.add('j4-hm')
        this.events = []
       
        this.currentAudio = {
            default: {
                config:{startTime: 0, pausedAt: 0},
                audio: undefined,
                // context: new (window.AudioContext || window.webkitAudioContext)()

            },
        }
        this.auxAudioaAmt = 0
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()//rever propriedade do obj
        // this.gainNode = this.audioContext.createGain()
        this.frogTimer = undefined

        document.title = ' Vamos Explorar Guapimirim!'
        gameData.mainScene = 'Game'
        
        this.setSettingsControllers()
        this.start()
    }

    setSettingsControllers(){

        const muteBtn = document.querySelector('#muteBtn')
        const lightBtn = document.querySelector('#lightBtn')

        setIcons()

        muteBtn.addEventListener('click', () => {
            this.toggleVolume()
        })

        lightBtn.addEventListener('click', () => {
            this.toggleLightMode()
        })

        function setIcons(){
            if(gameData.isMute){
                muteBtn.children[0].setAttribute('class', 'fa-solid fa-volume-xmark')
            }else{
                muteBtn.children[0].setAttribute('class', 'fa-solid fa-volume-high')
            }

            if(gameData.isDarkMode){
                lightBtn.children[0].setAttribute('class', 'fa-regular fa-sun')
            } else {
                lightBtn.children[0].setAttribute('class', 'fa-regular fa-moon')
            }
        }
    }

    start(restart = false){
        this.buildContainer()
        if (!restart) this.buildBg()
        this.setContainersElms()

        this.playAudio(gameAssets['frog_croaking'], 'frog_croaking', .1)
        
        setTimeout(() =>{
            this.playAudio(gameAssets['theme_main'], 'theme_main', 0.05, true)
            this.frogTimer = setInterval(() => this.playAudio(gameAssets['frog_croaking'], 'frog_croaking', .1), 6000)
            gameData.isClickable = true
        }, 1000)
    }

    buildContainer(){
        this.setMainContainer()

        const main = document.querySelector('#main')

        const hmContainer = this.createNewElement('div', 'hm-container container')
        const hm_c_title = this.createNewElement('div', 'hm-c-title container')
        const hm_title = this.createNewElement('p')

        hm_title.innerHTML = 'Vamos Explorar'

        hm_c_title.appendChild(hm_title)
        hmContainer.appendChild(hm_c_title)


        const hmTable = this.createNewElement('table', 'hm-table')
        const hmThead = this.createNewElement('thead', 'hm-thead')
        const hmTh = this.createNewElement('th', 'hm-t')
        
        hmTh.innerHTML = 'escolha o local'
        hmThead.appendChild(hmTh)

        const hmTbody = this.createNewElement('tbody', 'hm-tbody')
        const hmTr1 = this.createNewElement('tr', 'hm-tr')
        const hmTd1 = this.createNewElement('td', 'hm-td')
        
        hmTd1.innerHTML = 'concordia'
        hmTr1.appendChild(hmTd1)

        const hmTr2 = this.createNewElement('tr', 'hm-tr')
        const hmTd2 = this.createNewElement('td', 'hm-td')
        
        hmTd2.innerHTML = 'apa'
        hmTr2.appendChild(hmTd2)

        hmTbody.append(hmTr1, hmTr2)
        hmTable.append(hmThead, hmTbody)
        
        hmContainer.appendChild(hmTable)
        main.appendChild(hmContainer)
        
        textFit(hm_title)
    }
    setContainersElms(){
        // CONFIGURAR OS BOTÕES DO MENU E QUALQUER OUTRO ELEMENTO DA TELA
        const cPointsArr = document.querySelectorAll('.hm-td')
        let txContent;

        cPointsArr.forEach( point => {
            point.addEventListener('click', (e) => {
                txContent = e.target.textContent 
                switch(txContent){
                    case 'concordia':

                        this.resetContainerToNewScene()
                        new Sights(this, 'concordia')
                        break;

                    case 'apa':

                        this.resetContainerToNewScene()
                        new Sights(this, 'apa')
                        break;

                    default:

                        console.log('fase inexistente')
                        break;
                }

            })
           
        })

        this.setBtns()
    }
    setMainContainer(){
        let  ruleW, gContainerWidth, gcontainerHeight  ;

        this.element.classList.remove('inactive')
        ruleW = window.screen.width > 2000 ? window.screen.width * 0.4  : window.screen.width > 1500 ? window.screen.width * 0.65 : window.screen.width * 0.6
        gContainerWidth  = window.screen.width * 0.40        
        gcontainerHeight  = window.screen.height * 0.613

        this.element.style.width = `${ruleW}px`
        this.element.style.height = `${gcontainerHeight}px`
    }
    resetContainerToNewScene(clss = ""){
        const main = document.querySelector('#main')

        main.innerHTML = " "
        this.element.className = clss;
        this.stopCurrentAudio()
        this.events.forEach(e => e.elem.removeEventListener(e.event, e.func))
    }

    playAudio(audioBuffer, audioName = undefined, volume = 1.0, loop = false ){   
            const src = this.audioContext.createBufferSource()
            const gainNode = this.audioContext.createGain()

            src.buffer = audioBuffer
            src.loop = loop
    
            const vl = gameData.isMute === true ? 0 : volume
            gainNode.gain.value = vl
            
            src.connect(gainNode)
            gainNode.connect(this.audioContext.destination)
            if(loop === false){
                src.start()
    
            } else {
                if(audioName in this.currentAudio){
                    src.start(0, this.currentAudio[audioName].config.startTime)
                    this.currentAudio[audioName].audio = src
                } else {
                    src.start(0, 0)
                    this.currentAudio[audioName] = {config:{startTime: 0, pausedAt: undefined, gainNode: gainNode}}
                    this.currentAudio[audioName].audio = src
                }


    
            }
            // Retorna o gainNode caso queira manipular o volume desse áudio no futuro
            return {source: src, gainNode: gainNode}
    }
    stopCurrentAudio(){
            for( let sound in this.currentAudio){
                this.currentAudio[sound].config.startTime = 0
                if(this.currentAudio[sound].audio){
                    let pausedAt = this.currentAudio[sound].audio.context.currentTime

                    this.currentAudio[sound].audio.stop()
                    this.currentAudio[sound].config.pausedAt = pausedAt
                }
                if(this.frogTimer) {
                    clearInterval(this.frogTimer)
                    this.frogTimer = undefined
                }
            }
    }

    toggleLightMode(){
        let btn = document.getElementById('lightBtn')

        if(gameData.isDarkMode){
            // transformar em light
            document.body.style.background = `#ddd`

        } else {
            // transformar em dark
            document.body.style.background = `${colors.bg_dark}`
        }
        btn.children[0].classList.toggle('fa-sun')
        btn.children[0].classList.toggle('fa-moon')
        gameData.isDarkMode = ! gameData.isDarkMode
    }
    toggleVolume(){
        this.gainNode.gain.value == 1 ? this.gainNode.gain.value = 0 : this.gainNode.gain.value = 1
        for(let audio in this.currentAudio){
            
           
           
            
            
            this.currentAudio[audio]
        }
            
            
        muteBtn.children[0].classList.toggle('fa-volume-xmark')
        muteBtn.children[0].classList.toggle('fa-volume-high')

        gameData.isMute = !gameData.isMute
    }

    getImage(key){
        return gameAssets[key]
    }
    createNewElement(el, cl = undefined, id = undefined, src = undefined){
        const element = document.createElement(el)

        if(cl){
            let clss = cl.split(' ')
            for(let i = 0; i < clss.length; i++){
                element.classList.add(clss[i])
            }
        } 
        if(id)  element.setAttribute('id', id);
        if(src) element.setAttribute('src', src);

        return element
    }
    popUpMessage(message, delay = 3500){   // EXIBE MENSAGEM NO POPUP VISÍVEL
        gameData.isClickable = false

        const popUp = document.getElementById('popUpMessage')
        const popupText = document.querySelector('.popupText')
        
        this.playAudio(gameAssets['deny'], 'deny')
        popUp.style.top = `0`
        popupText.children[0].textContent = message
    
        
        setTimeout(() => {
            popUp.style.top = `-33rem`
            setTimeout( () => popupText.children[0].textContent = '', 1000)
            gameData.isClickable = true

        }, delay)
    }
    buildBg(){
        const j4_bg = document.querySelector('#j4-bg')

        const bgEle = this.createNewElement('div', 'j4-bg-bg')

        const foreground = this.getImage('foreground')
        foreground.className = "foreground svg"
        foreground.setAttribute('alt', "floresta com arvores, troncos, planices")

        const monkeyLeft = this.getImage('monkey_left')
        monkeyLeft.className = "m_l monkey"
        monkeyLeft.setAttribute('alt', 'macaco pendurado no cipó')

        const monkeyRight = this.getImage('monkey_right')
        monkeyRight.className = "m_r monkey"
        monkeyRight.setAttribute('alt', 'macaco pendurado no galho')

        const homeGif = this.getImage('home_gif')
        homeGif.className = "homeGif"
        homeGif.setAttribute('alt', 'casa')

        const homeBtnEl = this.createNewElement('button', 'btn bg-homeBtn', 'homeBtn')
        homeBtnEl.appendChild(homeGif)

        homeBtnEl.addEventListener('click', () => {
            if(!gameData.isClickable && gameData.mainScene === 'Game') return
            this.resetContainerToNewScene('j4-hm')
            
            gameData.mainScene = 'Game'
            bgEle.style.backgroundImage = "url('./../Assets/imgs/general/hm_background.png')"

            this.start(true)
        })

        homeBtnEl.addEventListener('mouseenter', () => {
            this.playAudio(gameAssets['btn_select'], 'btn_select', .05)
        })

        j4_bg.append(bgEle, foreground, monkeyLeft, monkeyRight, homeBtnEl)
    }
    toggleBgDisplay(){
        const j4_bg = document.querySelector('#j4-bg')
        
        let bgDisplay = j4_bg.style.display

        if(bgDisplay === 'none'){
            j4_bg.style.display = 'block'
        } else {
             j4_bg.style.display = 'none'
        }
    }
    setBtns(element = document){
        let btns = element.querySelectorAll('.btn')
        let h_aux = false;
        btns.forEach((btn) => {
            btn.addEventListener('mouseenter', () => {
                if(!h_aux){
                    h_aux = !h_aux
                   if(element === document) this.playAudio(gameAssets['btn_select'], 'btn_select', .05)
                }
            })

            btn.addEventListener('mouseout', () => {
                h_aux = false
            })
        })
    }
}


export{
    Game
}