import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";


class Game {
    constructor(){

        this.element = document.querySelector('#game_Container')
        this.element.classList.add('j4-hm')
       
        this.currentAudio = {config:{startTime: 0, pausedAt: 0}}
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()//rever propriedade do obj
        // this.gainNode = this.audioContext.createGain()
        
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

    start(){
        this.buildContainer()
        this.buildBg()
        this.setContainersElms()

        this.playAudio(gameAssets['frog_croaking'], .1)
       
        let frogTimer; 
        setTimeout(() =>{
            this.playAudio(gameAssets['theme_main'], 0.05, true)
            frogTimer = setInterval(() => this.playAudio(gameAssets['frog_croaking']), 6000)
            gameData.isClickable = true
        }, 1000)
    }

    buildContainer(){
        this.setMainContainer()

        const main = document.querySelector('#main')

        const hmContainer = this.createNewElement('div', 'hm-container container')
        const hm_c_title = this.createNewElement('div', 'hm-c-title container')
        const hm_title = this.createNewElement('p')

        hm_title.innerHTML = 'Vamos Explorar !'

        hm_c_title.appendChild(hm_title)
        hmContainer.appendChild(hm_c_title)

        const hmTable = this.createNewElement('table', 'hm-table')
        const hmThead = this.createNewElement('thead', 'hm-thead')
        const hmTh = this.createNewElement('th', 'hm-t')
        
        hmTh.innerHTML = 'escolha o local :'
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
                        console.log('concordia é longe')
                        break;
                    case 'apa':
                        console.log('apa ?? nunca fui')
                        break;
                }

            })
           
        })
        this.setBtns()
    }
    setMainContainer(){
        let  ruleW, gContainerWidth, gcontainerHeight  ;

        this.element.classList.remove('inactive')
        ruleW = window.screen.width > 2000 ? window.screen.width * 0.4  : window.screen.width > 1500 ? window.screen.width * 0.6 : window.screen.width * 0.5
        gContainerWidth  = window.screen.width * 0.40        
        gcontainerHeight  = window.screen.height * 0.613

        this.element.style.width = `${ruleW}px`
        this.element.style.height = `${gcontainerHeight}px`
    }
    resetContainerToNewScene(clss = undefined){
        const main = document.querySelector('#main')

        main.innerHTML = " "
        if (clss)  this.element.className = clss;
    }

    playAudio(audioBuffer, volume = 1.0, loop = false){   
            const src = this.audioContext.createBufferSource()
            const gainNode = this.audioContext.createGain()

            src.buffer = audioBuffer
            src.loop = loop
    
            const vl = gameData.isMute === true ? 0 : volume
            gainNode.gain.value = vl
            
            src.connect(gainNode)
            gainNode.connect(this.audioContext.destination)
            if(loop !== true){
                src.start()
    
            } else {
                src.start(0, this.currentAudio.config.startTime)
                this.currentAudio.audio = src
            }
            // Retorna o gainNode caso queira manipular o volume desse áudio no futuro
            return {source: src, gainNode: gainNode}
    }
    stopCurrentAudio(){
        if(this.currentAudio.audio) {
            this.currentAudio.config.startTime = this.audioContext.currentTime
            this.currentAudio.audio.stop()
            this.currentAudio.audio = null
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
        //ajustar - talvez ter os sons com loop armazenados em um array
        this.gainNode.gain.value == 1 ? this.gainNode.gain.value = 0 : this.gainNode.gain.value = 1
            
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
        
        this.playAudio(gameAssets['deny'])
        popUp.style.top = `0`
        popupText.children[0].textContent = message
    
        
        setTimeout(() => {
            popUp.style.top = `-33rem`
            setTimeout( () => popupText.children[0].textContent = '', 1000)
            gameData.isClickable = true

        }, delay)
    }
    buildBg(){
        const bg = document.querySelector('#j4-bg')

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
            
            this.stopCurrentAudio()

            this.resetContainerToNewScene('j4-hm')
            gameData.mainScene = 'Game'
            this.start()
        })

        homeBtnEl.addEventListener('mouseenter', () => {
            this.playAudio(gameAssets['btn_select'])
        })

        bg.append(foreground, monkeyLeft, monkeyRight, homeBtnEl)
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
                   if(element === document) this.playAudio(gameAssets['btn_select'])
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