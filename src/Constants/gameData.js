const gameData = {
    isPreloadComplete: false,
    app: undefined, 
    isMute: false,
    isDarkMode: true,
    isLibrasActive: false,
    isPaused: false,
    isClickable: false,
    lastAccText: '',
    mainScene: 'Preload',
    wereVLibrasActived: false
} 

window.gameData = gameData // RETIRAR DEPOIS


export{
    gameData
}