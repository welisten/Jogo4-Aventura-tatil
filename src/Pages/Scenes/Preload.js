// CLASS
import { Game } from "./Game.js";
// GAME DATA
import { gameData } from "../../Constants/gameData.js";

// ASSETS DATA
import { generalImgDtArr} from "../../Constants/ImagesData.js";
import { audioDataArr } from "../../Constants/songsData.js";

// CONSTANTS
import { colors } from "../../Constants/Colors.js";

let store;

class Preloader{
    constructor(){
        this.intro = null // aqui posteriormente irá entrar uma classe referente a uma introdução (instruçãoes por exemplo)
        this.phaserGame = null
        this.assetsControls = {}
        this.setPreloader()

        document.title = 'Carregando...'
        if(!gameData.isDarkMode) document.body.style.backgroundColor = `${colors.bg_light}`
    }

    setPreloader(){
        const gContainerWidth  = window.screen.width * 0.40      
        const gcontainerHeight  = window.screen.height * 0.613

        const parent = document.querySelector('#loading')
        parent.style.width = gContainerWidth
        parent.style.height = gcontainerHeight
        
        const config = {
            type: Phaser.AUTO,
            width: gContainerWidth,
            height: gcontainerHeight,
            parent: parent,
            transparent: true,
            scene: {
                preload: this.preload,
            }
        }
        const frogSound = document.querySelector('#frogCroaking')
        this.phaserGame = new Phaser.Game(config)               
    }
    preload(){
        const gameCanvas = this.sys.game.canvas

        gameCanvas.id                       = 'jogo4_canvas'
        gameCanvas.style.border             = `10px solid ${colors.green_logo__1}`;
        gameCanvas.style.borderRadius       = "20px"
        
        // os assets devem ser armazenado no navegador
        window.gameAssets = {}
        store = window.gameAssets

        const gContainerWidth  = window.screen.width * 0.40        
        const gcontainerHeight  = window.screen.height * 0.613

        const progressBar = this.add.graphics()
        const progressBox = this.add.graphics()
        
        const loadingContainer = document.querySelector('#loading')
        
        loadingContainer.classList.toggle('active')
        
        progressBox.fillStyle('0xffffff', 1)
        progressBox.fillRoundedRect((gContainerWidth - (gContainerWidth * .8)) / 2 , gcontainerHeight * .779, gContainerWidth * .8, 20, 5)
        progressBox.lineStyle(5, '0xffffff', 1)
        progressBox.strokeRoundedRect((gContainerWidth - (gContainerWidth * .8)) / 2 , gcontainerHeight * .779, gContainerWidth * .8, 20, 5)
        progressBox.setDepth(1)
        progressBar.setDepth(2)
        
        const getImage = (key) => { // retorna a url
            return this.textures.get(key).getSourceImage()
        }
        const getAudio = (key) => {// retorna audioBuffer
            return this.cache.audio.get(key)
        }

        const frog = document.querySelector('.frog')

        this.load.on('progress', value => {
            let x = frog.style.left
            
            progressBar.clear();
            progressBar.fillStyle(0xabed3f, 1);
            progressBar.fillRoundedRect((gContainerWidth - (gContainerWidth * .81)) / 2 + gContainerWidth * .01 , gcontainerHeight * .779 + 3.5, (gContainerWidth * .79) * value, 14, 2)

            frog.style.left = `calc(11% + ${76 * value}%)` 
        })
        
        function criarObjeto(object, key, callback){ // object pode ser retirado e substituido por store(global) internamente na função
            object[key] = callback
        }

        this.load.on('filecomplete', (key) => {
            console.log(`O arquivo "${key}" foi carregado`)
        })

        this.load.on('complete',  () => {
            audioDataArr.forEach( dataObj => criarObjeto(store, dataObj.name, getAudio(dataObj.name)))
            for(let dataObj of generalImgDtArr){
                criarObjeto(store, dataObj.name, getImage(dataObj.name))
            }

            this.time.delayedCall(1000, () => {
                progressBar.destroy()
                progressBox.destroy()

                loadingContainer.classList.toggle('active')
                loadingContainer.remove()
                gameCanvas.remove()
                
                gameData.mainClass = 'Game'
                console.clear()
                new Game()
            })
        })

        for(let dataObj of generalImgDtArr){
            this.load.image(dataObj.name, dataObj.src)
        }

        audioDataArr.forEach((dataObj) => {
            this.load.audio(dataObj.name, dataObj.src)
        })
        
    }

    getIntro(){//future
        if (this.intro) {
            console.log('Starting the game with intro:', this.intro)
        } else {
            console.log('Intro is not initialized yet')
        }
    }
}


export{
    Preloader
}


