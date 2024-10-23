const sightData = {
    cotia:{
        animals:[
            {
                key: 'quero-quero', 
                nome: 'Quero-Quero', 
                descri: ' O quero-quero é uma ave que gosta de andar pelos campos, sempre atenta. Ele é conhecido por ser um excelente guardião, avisando todos quando percebe algum perigo se aproximando. Seu som é bem agudo e forte, como se estivesse dando um alerta. Ele tem penas acinzentadas e pretas, e você pode vê-lo correndo pela grama com suas longas pernas.', 
                sound: 'quero-quero-sound',
                alt: 'Quero quero e seu filhote'
            },
            {
                key: 'cavalo', 
                nome: 'Cavalo', 
                descri: 'O cavalo é um animal grande e forte, com pernas longas e uma crina que balança quando ele corre. Ele adora galopar, e o som dos seus cascos no chão é inconfundível. Os cavalos são muito inteligentes e conseguem entender os humanos muito bem, sendo amigos inseparáveis em muitas tarefas, como puxar carroças ou correr livremente pelos campos.', 
                sound: 'cavalo-sound',
                alt: 'Um Cavalo escuro a saltar'
            },
            {
                key: 'o-galo-e-a-galinha', 
                nome: 'O Galo e a Galinha', 
                descri: 'O galo e a galinha são os reis do galinheiro. O galo gosta de cantar de manhã, avisando que o dia já começou. Ele tem uma crista vermelha na cabeça e penas coloridas. A galinha, por sua vez, é mais calma e gosta de ciscar o chão em busca de comida. Ela também é a responsável por chocar os ovos e cuidar dos pintinhos.', 
                sound: 'o-galo-e-a-galinha-sound',
                alt: 'Um galo e um grupo de galinhas'
            },
            {
                key: 'cachorro', 
                nome: 'Cachorro', 
                descri: 'O cachorro é o melhor amigo do homem! Ele é leal, brincalhão e adora correr, brincar e proteger sua família. Quando ele late, pode estar chamando atenção, querendo brincar ou avisando sobre algo. Eles são de várias raças e tamanhos, mas todos têm uma coisa em comum: são companheiros para qualquer aventura.', 
                sound: 'cachorro-sound',
                alt: 'Grupo de cachorros vira-lata'
            },
            {
                key: 'cutia', 
                nome: 'Cutia', 
                descri: 'A cutia é um roedor que vive nas florestas e gosta de se alimentar de frutas e sementes. Ela é rápida e está sempre em alerta, correndo rapidamente para se esconder ao menor sinal de perigo. Apesar de ser pequena, ela é muito ágil e se move com muita rapidez entre as plantas.', 
                sound: 'cutia-sound',
                alt: 'Uma cutia pequena'
            },
            {
                key: 'a-vaca-e-o-boi', 
                nome: 'A Vaca e o Boi', 
                descri: 'A vaca e o boi são animais grandes e fortes que vivem em fazendas. A vaca é conhecida por nos dar leite, enquanto o boi ajuda no trabalho pesado do campo. Eles são tranquilos, pastando calmamente pela grama. Seu som é baixo e poderoso, um chamado típico do campo, que você pode ouvir à distância.', 
                sound: 'a-vaca-e-o-boi-sound',
                alt: 'Uma vaca deitada e umboi ao seu lado'
            }
        ],
        coordinates:[{x:79 ,y:12}, {x:19 ,y:24}, {x:38 ,y:31}, {x:80 ,y:45}, {x:56 ,y:41}, {x:20 ,y:51}], 
        background: 'cotiaBG.jpg',
        descri: 'Cotia é um bairro tranquilo em Guapimirim, cercado por muito verde e com poucas casas. Ele está localizado em uma área onde é possível ver as montanhas que cercam toda a cidade, criando uma vista muito bonita de qualquer lugar. Essas montanhas fazem parte da Serra dos Órgãos e estão cobertas pela mata atlântica, cheia de árvores, plantas e animais. No bairro de Cotia, o ar é fresco, e o clima é calmo, com muito espaço para brincar e explorar a natureza. As árvores grandes formam sombras refrescantes, e os jardins bem cuidados dão vida ao lugar, com flores e plantas coloridas por todo lado. Passarinhos cantam alegremente e podem ser ouvidos de longe, criando um ambiente cheio de sons da natureza. Cotia é um lugar perfeito para quem gosta de estar ao ar livre e apreciar a natureza de perto. Mesmo sendo um bairro pequeno e com poucas casas, ele é cheio de vida e tranquilidade, ideal para quem quer se conectar com o verde das árvores e com as montanhas que o cercam.'
    },
    apa:{
        animals:[
            {
                key: 'macaco-muriqui', 
                nome: 'Macaco Muriqui', 
                descri: 'O muriqui é um macaco grandão e muito calmo, considerado o maior macaco das Américas! Ele adora ficar nas árvores e usar seu rabo como uma mão extra para se segurar. O som do muriqui é suave, como se estivesse chamando os outros da sua família com um "uuu, uuu". Eles vivem em grupos, e passam muito tempo juntos, comendo folhas e frutas nas copas das árvores.', 
                sound: 'muriqui-sound',
                alt: 'Um macaco muriqui carregando seu filhote nas costas'
            },
            {
                key: 'perereca-verde', 
                nome: 'Perereca Verde', 
                descri: 'A perereca é um sapinho pequeno e liso. Se você tocasse nela, sentiria a pele úmida e um pouco fria. Ela faz um som alto e engraçado, como um "crii-crii" bem agudo, e gosta de ficar grudada nas folhas.', 
                sound: 'perereca-verde-sound',
                alt: 'Uma pereca verde'
            },
            {
                key: 'sabiá-laranjeira', 
                nome: 'Sabiá Laranjeira', 
                descri: 'O sabiá-laranjeira é um passarinho que canta bonito, como se estivesse contando uma história. Ele tem penas macias e, se você escutá-lo, parece que ele está fazendo um show, com notas alegres e rápidas.', 
                sound: 'sabia-laranjeira-sound',
                alt: 'Um sabiá laranjeira'
            },
            {
                key: 'boto-cinza', 
                nome: 'Boto Cinza', 
                descri: 'O boto-cinza é como um golfinho, mas vive nos rios! Ele é muito inteligente e adora nadar rápido e fazer acrobacias na água. O som que ele faz parece um assobio e uns cliques bem rápidos, como se estivesse contando segredos para os outros botos enquanto mergulha. Eles são brincalhões e às vezes saltam para fora da água.', 
                sound: 'boto-cinza-sound',
                alt: 'Um Boto cinza aparecendo na superficie'
            },
            {
                key: 'mico-estrela', 
                nome: 'Mico Estrela', 
                descri: 'Esse macaquinho é bem pequeno e tem pelinhos fofos, com mechas brancas nas orelhas que parecem estrelinhas! Ele é super ágil e vive pulando de galho em galho, adorando frutas e insetos.  O mico-estrela é um dos pequenos acrobatas da floresta, sempre atento e cheio de energia! vivem em grupos e estão sempre se comunicando com esses sons para avisar se há comida por perto ou se algum perigo está chegando. O mico-estrela faz sons rápidos e agudos.', 
                sound: 'mico-estrela-sound',
                alt: 'Um Mico estrela em um tronco'
            },
            {
                key: 'onça-parda', 
                nome: 'Onça Parda', 
                descri: 'A onça-parda é um felino grande e ágil, com pelos curtos e macios, que lembram o toque de um tecido bem liso. Ela é bem silenciosa e esperta, e seus passos quase não fazem barulho, como se estivesse andando em uma cama de algodão. Ela tem patas grandes com garras afiadas, que ajudam a subir em árvores e correr rápido', 
                sound: 'onca-parda-sound',
                alt: 'Uma Onça parda a observar'
            }
        ],
        coordinates:[{x:24,y:20}, {x:36 ,y:60}, {x:40 ,y:40}, {x:57 ,y:25}, {x:73 ,y:60}, {x:75 ,y:10}], 
        background: 'apaBG.jpg',
        descri: 'A APA de Guapimirim é uma área de proteção ambiental que faz parte de um grande ecossistema chamado Baía de Guanabara, no estado do Rio de Janeiro. Esse lugar é muito importante porque protege uma das maiores áreas de manguezais da região, que são como florestas especiais que crescem na água salgada ou misturada com água doce. Os manguezais são fundamentais porque servem de abrigo para muitos animais, além de ajudarem a filtrar a água e proteger a costa de enchentes e erosões. Ao longo dos anos, a APA tem sido crucial para a conservação desses ambientes naturais. Graças à sua proteção, muitos animais que estavam em risco, conseguiram aumentar sua população. A APA também é usada para estudos científicos sobre a biodiversidade e a importância dos manguezais para a natureza. Ela é um exemplo de como a natureza pode ser preservada, mas precisa da ajuda de todos para continuar linda e cheia de vida. Lá, atividades como passeios de barco e caminhadas nas trilhas ensinam as pessoas sobre a importância de cuidar do meio ambiente, sempre com muito cuidado para não poluir nem destruir os habitats.'
    },
    concordia:{
        animals: [
            {
                key: 'ben-te-vi', 
                nome: 'Ben-te-ví', 
                descri: 'O bem-te-vi é um passarinho muito conhecido pelo seu canto, que parece dizer "bem-te-vi"! Ele tem penas amarelas na barriga e um chapéu preto na cabeça. O som que ele faz é alto e claro, como um "bem-te-vi" bem alegre, e você pode ouvi-lo de longe, especialmente quando ele está no alto de uma árvore ou voando. É como se ele estivesse sempre dizendo "oi" para todo mundo ao redor.', 
                sound: 'bentevi-sound',
                alt: 'Um Ben-te-ví'
            }, 
            {   
                key: 'coruja-do-mato', 
                nome: 'Coruja do mato', 
                descri: 'A coruja-do-mato é um pássaro noturno, o que quer dizer que ela adora ficar acordada de noite, enquanto a maioria dos outros animais está dormindo. Ela tem olhos grandes que ajudam a enxergar no escuro. Quando ela "canta é como se estivesse chamando alguém na floresta de noite, bem baixinho e misterioso.', 
                sound: 'coruja-do-mato-sound',
                alt: 'Uma Coruja'
            }, 
            {
                key: 'rã-assobiadora', 
                nome: 'Rã Assobiadora', 
                descri: 'Essa rã tem um nome engraçado, porque ela faz um som parecido com um assobio! Você sabia que, à noite, perto de um lago ou um rio, dá pra ouvir muitas rãs e sapos? Mas essa rã é especial, porque seu som é bem fininho e suave, como um assobio de alguém te chamando lá longe.', 
                sound: 'ra-assobiadora-sound',
                alt: 'Uma Rã assobiadora'
            }, 
            {
                key: 'tucano-de-bico-preto', 
                nome: 'Tucano de bico preto', 
                descri: 'O tucano é um passarão muito colorido, mas esse tem o bico bem escuro, quase preto. Ele gosta de fazer barulhos que parecem uma risada ou um "grog, grog, grog". É engraçado porque, quando ele faz esses sons, parece que está brincando na floresta com os amigos.', 
                sound: 'tucano-de-bico-preto-sound',
                alt: 'Um Tucano de pico preto com uma semente no bico.'
            }, 
            {
                key: 'quati', 
                nome: 'Quati', 
                descri: ' O quati é um animal bem curioso, com um focinho longo e uma cauda grande e felpuda. Ele adora explorar e mexer nas coisas! Se ele estivesse por perto, você ouviria ele remexendo as folhas ou os galhos no chão, sempre procurando comida. Às vezes, eles fazem sons tipo: "rrrrrr", quando estão animados.', 
                sound: 'quati-sound',
                alt: 'Um quati'
            }, 
            {
                key: 'jacutinga', 
                nome: 'Jacutinga', 
                descri: 'A jacutinga é um pássaro que gosta de ficar no alto das árvores. Ela tem uma plumagem escura e faz sons parecidos com um "piu-piu-piu", só que mais forte. De manhã, quando tudo está bem calmo, você pode ouvir seu canto ecoando pela floresta, como se estivesse dando "bom dia" para todos os outros bichos.', 
                sound: 'jacutinga-sound',
                alt: 'Um casal de jacutinga em um galho'
            } 
        ],
        coordinates:[{x:14,y:15}, {x:13 ,y:64}, {x:29 ,y:78}, {x:55 ,y:55}, {x:72 ,y:86}, {x:74 ,y:20}], 
        background: 'concordiaBG.jpg',
        descri: "A Cachoeira da Concórdia é uma das cachoeiras mais bonitas de Guapimirim. Ela fica dentro da Serra dos Órgãos, uma área de montanhas com muita vegetação e rios. A cachoeira é especial porque tem quedas d'água que formam piscinas naturais, onde as pessoas podem tomar banho em águas limpas e refrescantes. Essa cachoeira está cercada por mata atlântica, uma floresta cheia de plantas e animais típicos de lá. Ao longo do caminho até a cachoeira, é possível ver muitas árvores grandes, flores coloridas e ouvir os sons de pássaros. Alguns animais que vivem por lá, podem até ser avistados pelos visitantes. A água da Cachoeira da Concórdia é cristalina, e as pedras ao redor das quedas d’água criam um cenário perfeito para quem gosta de natureza. Como está em uma área protegida, as pessoas que visitam são incentivadas a respeitar o ambiente, não deixando lixo e evitando poluir a água. Isso ajuda a manter a beleza natural do lugar. Além de ser um ótimo ponto de lazer, a cachoeira também é importante para o equilíbrio ambiental da região. Ela faz parte dos rios que abastecem áreas próximas e é fundamental para a preservação da mata atlântica e da fauna local. Essa é uma excelente opção para quem quer se conectar com a natureza, aprender sobre a mata e ainda aproveitar um banho de cachoeira em um cenário tranquilo e preservado."
    }
}

export{
    sightData
}