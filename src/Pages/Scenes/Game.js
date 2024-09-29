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
        // this.setContainersElms()

        this.playAudio(gameAssets['frog_croaking'], .5)
        let frogTimer;
        
        setTimeout(() =>{
            this.playAudio(gameAssets['theme_main'], 0.05, true)
            frogTimer = setInterval(() => this.playAudio(gameAssets['frog_croaking']), 6000)
            gameData.isClickable = true
        }, 1000)
    }

    buildContainer(){
        // CONSTRUIR HIERARQUIA E OS ELEMENTOS DA DOM REFERENTE A PAGINA HOME
      
        this.setMainContainer()
        // this.createNewElement()


    }
    setContainersElms(){
        // CONFIGURAR OS BOTÕES DO MENU E QUALQUER OUTRO ELEMENTO DA TELA

        this.setBtns()
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
    resetContainerToNewScene(classStr = ''){
        const access = document.querySelector('.access')
        this.element.innerHTML = " "
        this.element.appendChild(access)
        this.element.className = classStr
    }
    getImage(key){
        return gameAssets[key]
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
        const backgroudGifsEl = this.createNewElement('div', "container bg-gifs")
       
        const bg_cloud1 = this.getImage('clouds_gif1')
        bg_cloud1.setAttribute('src', './../../Assets/imgs/general/clouds_gif.gif')
        bg_cloud1.setAttribute('alt', 'nuvens')
        bg_cloud1.setAttribute('class', 'bg-gifs-clouds bg-c1')
        
        const bg_cloud2 = this.getImage('clouds_gif2')
        bg_cloud2.setAttribute('src', './../Assets/imgs/general/clouds_gif.gif')
        bg_cloud2.setAttribute('alt', 'nuvens')
        bg_cloud2.setAttribute('class', 'bg-gifs-clouds bg-c2')
       
        const bg_sun = this.getImage('sun_gif')  
        bg_sun.setAttribute('src','./../Assets/imgs/general/sun_gif.gif')
        bg_sun.setAttribute('alt','sol')
        bg_sun.setAttribute('class','bg-gifs-sun')

        const bg_home = this.getImage('home_gif')  
        bg_home.setAttribute('src','./../Assets/imgs/general/home_gif.gif')
        bg_home.setAttribute('alt','home')
        bg_home.setAttribute('class','bg-gifs-home')

        const homeBtnEl = this.createNewElement('button', 'btn bg-homeBtn', 'homeBtn')
        
        homeBtnEl.addEventListener('click', () => {
            if(!gameData.isClickable) return
            const accessBtn = document.querySelector('[vw-access-button]')
            
            let OR_rule = (gameData.mainScene === 'Words' || gameData.mainScene === 'Explore' )
            
            if( OR_rule && !accessBtn.classList.contains('active')){
                this.popUpMessage('aperte o "X" vermelho para fechar a aplicação', 2000)
                // função para indicar x
                return
            }
            this.stopCurrentAudio()
            this.resetContainerToNewScene('hm')
            gameData.mainScene = 'Game'

            this.start()
        })

        homeBtnEl.addEventListener('mouseenter', () => {
            this.playAudio(gameAssets['btn_select'])
        })

        homeBtnEl.appendChild(bg_home)
        backgroudGifsEl.appendChild(bg_cloud1)
        backgroudGifsEl.appendChild(bg_cloud2)
        backgroudGifsEl.appendChild(bg_sun)
        backgroudGifsEl.appendChild(homeBtnEl)

        document.getElementById('game_Container').appendChild(backgroudGifsEl)
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
    setMainContainer(){
        let gContainerWidth, gcontainerHeight  ;

        this.element.classList.remove('inactive')
        
        gContainerWidth  = window.screen.width * 0.40        
        gcontainerHeight  = window.screen.height * 0.613

        this.element.style.width = `${gContainerWidth}px`
        this.element.style.height = `${gcontainerHeight}px`
    }
}


export{
    Game
}