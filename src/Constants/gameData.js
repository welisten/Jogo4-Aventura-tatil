const gameData = {
    isPreloadComplete: false,
    app: undefined, 
    isMute: false,
    isDarkMode: true,
    isLibrasActive: false, // atenção aqui para adicionarmos depois
    isPaused: false,
    isAccess: false,
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