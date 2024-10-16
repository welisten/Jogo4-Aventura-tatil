import { gameData } from "../../Constants/gameData.js";
import { colors } from "../../Constants/Colors.js";
import { sightData } from "../../Constants/sightsData.js";


class Sights{
    constructor(game, location ){
        this.game = game
        this.location = {name: location}
        this.location.animals = undefined

        this.element = document.querySelector('#game_container')
        this.element.classList.add('j4-sgt')
        this.element.classList.add('sights')

        this.start()
        
        const captalizeStr = (str) => {
            if(!str || typeof str !== 'string') return
            return str.charAt(0).toLocaleUpperCase() + str.slice(1).toLocaleLowerCase()
        }
        document.title = captalizeStr(location)
    }   
    start(){
        this.setAnimals() 
        this.buildContainer() 
        this.setContainerElements() 
    }
    setAnimals(){
        if(sightData[this.location.name]){
            this.location.animals = sightData[this.location.name].animals
        } else {
            throw new Error('location parameter is incorrect.')
        }
    }

    buildContainer(){
        const bg = document.querySelector('.j4-bg-bg')
        
        const mainC = this.element.querySelector('#main')
        const sightsContainer = this.game.createNewElement('div', 'sgt-container container')

        const cardsContainer = this.game.createNewElement('div', 'stg-card container', 'stg-card')
        const cardTitle = this.game.createNewElement('div', 'stg-card-title')
        const cardBody = this.game.createNewElement('div', 'stg-card-body')

        cardsContainer.append(cardTitle, cardBody)
        cardsContainer.style.display = 'none'

        
        bg.style.backgroundImage = `url(./../../Assets/imgs/general/${sightData[this.location.name].background})`

        if(this.location.animals){
            let spot, amount = this.location.animals.length;

            for(let i = 0; i < amount; i++){
                spot = this.game.createNewElement('div', 'spot btn')
                
                
                spot.style.left = `${sightData[this.location.name].coordinates[i].x}%`
                spot.style.bottom = `${sightData[this.location.name].coordinates[i].y}%`

                sightsContainer.appendChild(spot)
            }
        }
        sightsContainer.appendChild(cardsContainer)
        mainC.append(sightsContainer)

        this.game.playAudio(gameAssets['nature_ambience'], 'nature_ambience', .3, true)

    }

    setContainerElements(){
        const sights = document.querySelectorAll('.spot')
        const bg = document.querySelector('.j4-bg-bg')
        const cardsContainer = document.querySelector('.stg-card')
        const cardTitle = document.querySelector('.stg-card-title')
        const cardBody = document.querySelector('.stg-card-body')
        let cardImg, cardName, cardDescri, cardPlay, cardCloseBtn;


        sights.forEach((spot, i) => {
            console.log(i)
            spot.addEventListener('click', () => { 
                gameData.isClickable = false

                bg.classList.add('blur')
                sights.forEach(spot => spot.style.display = 'none')
                cardsContainer.style.display = 'flex'

                cardBody.innerHTML = ''
                cardTitle.innerHTML = ''
                
                cardImg = this.game.getImage(this.location.animals[i].nome)
                cardImg.setAttribute('class', 'cardImage')

                cardCloseBtn = this.game.createNewElement('button', 'card-close btn', 'cardCloseBtn')
                cardCloseBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>'
                
                cardName = this.game.createNewElement('p', 'card-name-text')
                let name = this.location.animals[i].nome
                cardName.innerHTML = name.replace(/-/g, ' ')
                
                cardDescri = this.game.createNewElement('p', 'card-descri-text')
                cardDescri.innerHTML = this.location.animals[i].descri
                
                cardPlay = this.game.createNewElement('button', 'card-play btn', 'cardBtn')
                cardPlay.innerHTML = `<i class="fa-solid fa-play"></i>`

                cardTitle.append(cardImg)
                cardBody.append(cardName, cardDescri, cardPlay)
                cardsContainer.appendChild( cardCloseBtn)
                
                textFit(cardDescri)
                textFit(cardName)

                for(let i = 0; i < 4; i++){
                    let cloud = this.game.getImage(`static-cloud-${i+1}`)
                    cloud.classList.add(`static-cloud`)
                    cloud.classList.add(`sc${i+1}`)
                    cardsContainer.appendChild(cloud)
                }

                this.game.playAudio(gameAssets['positiveBlipEffect'], undefined, .1)

                cardPlay.addEventListener('click', () => {
                    if(!gameData.isPlayingSound){ // PLAY
                        this.playAnimalSound(gameAssets[this.location.animals[i].sound], this.location.animals[i].sound)
                        
                        gameData.isPlayingSound = true
                        cardPlay.innerHTML = `<i class="fa-solid fa-pause"></i>`
                        //passar callback para final da reprodução

                    } else { // STOP
                        // pausar reprodução atual
                        gameData.isPlayingSound = false
                        cardPlay.innerHTML = `<i class="fa-solid fa-play"></i>`
                        this.stopAnimalSound(this.location.animals[i].sound)
                    }
                })

                cardCloseBtn.addEventListener('click', () => {
                    bg.classList.remove('blur')
                    sights.forEach(spot => spot.style.display = 'block')
                    cardsContainer.style.display = 'none'
                    
                    this.game.stopCurrentAudio()
                    gameData.isClickable = true
                    this.game.playAudio(gameAssets['nature_ambience'], 'nature_ambience', .3, true)

                })

                cardTitle.addEventListener('click', () => {
                    const mainC = this.element.querySelector('#main')
                    const cardsContainer = document.querySelector('#stg-card')

                    cardImg.classList.remove('cardImage')
                    cardImg.classList.add('cardImg')
                    bg.parentNode.classList.add('blur')
                    cardsContainer.classList.add('blur')

                    mainC.append(cardImg)

                    const scapeImage = (e) => {
                        let isBlur = cardsContainer.classList.contains('blur')
                        if(e.key === 'Escape' && isBlur){
                            setTimeout(() => {
                                cardImg.remove()
                                cardTitle.append(cardImg)
                               
                                bg.parentNode.classList.remove('blur')
                                cardsContainer.classList.remove('blur')
    
                                cardImg.classList.remove('cardImg')
                                cardImg.classList.add('cardImage')

                            }, 100)
                        }
                        return
                    }
                    document.addEventListener('keyup', scapeImage)
                    this.game.events.push({func: scapeImage, elem: document, event: 'click'})

                    document.addEventListener('mousedown', (e) => {
                        let isBlur = cardsContainer.classList.contains('blur')
                       
                        if(!isBlur){
                            return
                        } else {
                            if(!cardImg.contains(e.target)){
                                cardImg.remove()
                                cardTitle.append(cardImg)
                               
                                bg.parentNode.classList.remove('blur')
                                cardsContainer.classList.remove('blur')
    
                                cardImg.classList.remove('cardImg')
                                cardImg.classList.add('cardImage') 
                            } 
                        }
                    })
                })

                const scapeCardImage = (e) => {
                    let correctMoment, cardsContainerEl, sightsEl;
                    
                    correctMoment = bg.classList.contains('blur') && !bg.parentNode.classList.contains('blur')
                    cardsContainerEl = document.querySelector('#stg-card')
                    sightsEl = document.querySelectorAll('.spot')

                    if(e.key === 'Escape' && correctMoment){
                        bg.classList.remove('blur')
                        cardsContainerEl.style.display = 'none'
                        sightsEl.forEach(spot => spot.style.display = 'block')
                        
                        this.game.stopCurrentAudio()
                        gameData.isClickable = true
                        this.game.playAudio(gameAssets['nature_ambience'], 'nature_ambience', .3, true)
                    }
                }
                document.addEventListener('keyup', scapeCardImage) 
                this.game.events.push({func: scapeCardImage, elem: document, })
                

                spot.addEventListener('mouseover', () => {
                this.game.playAudio(gameAssets['btn_select'], '', .3)
                })
            })
        })  
    }


    playAnimalSound(audioBuffer, animalSoundName){
        let src, gainNode;
        
        if( animalSoundName in this.game.currentAudio){
            let pausedAt = this.game.currentAudio[animalSoundName].config.pausedAt || 0

            src = this.game.audioContext.createBufferSource()
            gainNode = this.game.currentAudio[animalSoundName].config.gainNode
            
            src.buffer = audioBuffer
            src.loop = true
    
            let vl = gameData.isMute === true ? 0 : 1
            gainNode.gain.value = vl
            
            src.connect(gainNode)
            gainNode.connect(this.game.audioContext.destination)
            
            src.start(0, pausedAt)
            this.game.currentAudio[animalSoundName] = {config:{startTime: 0, pausedAt: undefined, gainNode: gainNode}}
            this.game.currentAudio[animalSoundName].audio = src
        } else {

            src = this.game.audioContext.createBufferSource()
            gainNode = this.game.audioContext.createGain()

            src.buffer = audioBuffer
            src.loop = true
    
            let vl = gameData.isMute === true ? 0 : 1
            gainNode.gain.value = vl
            
            src.connect(gainNode)
            gainNode.connect(this.game.audioContext.destination)
            
            src.start(0, 0)
            this.game.currentAudio[animalSoundName] = {config:{startTime: 0, pausedAt: undefined, gainNode: gainNode}}
            this.game.currentAudio[animalSoundName].audio = src

        }

    // Retorna o gainNode caso queira manipular o volume desse áudio no futuro
    return {source: src, gainNode: gainNode}
    }

    stopAnimalSound(soundName){
        if(soundName in this.game.currentAudio){
            let pausedAt = this.game.currentAudio[soundName].audio.context.currentTime
            
            this.game.currentAudio[soundName].audio.stop()
            this.game.currentAudio[soundName].config.pausedAt = pausedAt
        } else {
            throw new Error('It is not possible to stop an inexisted audio')
        }

    }
}

export{
    Sights
}