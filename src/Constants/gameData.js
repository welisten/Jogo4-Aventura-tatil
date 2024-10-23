const gameData = {
    isPreloadComplete: false,
    app: undefined, 
    isMute: true,
    isDarkMode: true,
    isLibrasActive: false,
    isPaused: false,
    isAccess: true,
    isClickable: false,
    isPlayingSound: false,
    lastAccText: '',
    mainScene: 'Preload',
    wereVLibrasActived: false
} 

window.gameData = gameData // RETIRAR DEPOIS


export{
    gameData
}