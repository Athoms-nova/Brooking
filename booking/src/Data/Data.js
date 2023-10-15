



let hotels = [
    {
        id: 1,
        hotel : "la villa",
        ville : "Toulouse",
        adress : "40 chemin de l'eau",
        prix : 20,
        image : "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        nbChambre : 3,
        chambre : {}
    },
    {
        id: 2,
        hotel : "le village",
        ville : "Paris",
        adress : "49 coco d'eau",
        prix : 60,
        image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        nbChambre : 10,
        chambre : {}
    },
    {
        id: 3,
        hotel : "Calito",
        ville : "Toulouse",
        adress : "67 avenue du soleil",
        prix : 70,
        image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        nbChambre : 25,
        chambre : {}
    },
    {
        id: 4,
        hotel : "le Chogate",
        ville : "Mexique",
        adress : "40 terre du milieu",
        prix : 120,
        image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        nbChambre : 14,
        chambre : {}
    },
    {
        id: 5,
        hotel : "La Bolonie",
        ville : "Saint-Denis",
        adress : "34 chemin des Margouyas",
        prix : 200,
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        nbChambre : 10,
        chambre : {}
    },
    {
        id: 6,
        hotel : "Chips colo",
        ville : "Italie",
        adress : "78 tourette de la vache",
        prix : 34,
        image: "https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        nbChambre : 8,
        chambre : {}
    },
    {
        id: 7,
        hotel : "Pakito",
        ville : "Brazil",
        adress : "56 Bikini rouge",
        prix : 70,
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzF8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        nbChambre : 15,
        chambre : {}
    },
    {
        id: 8,
        hotel : "Le Cartel",
        ville : "Sainte-Clotilde",
        adress : "34 Chemin perdu",
        prix : 980,
        image: "https://images.unsplash.com/photo-1615460549969-36fa19521a4f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        nbChambre : 3,
        chambre : {}
    },
    {
        id: 9,
        hotel : "Le Palace",
        ville : "Paris",
        adress : "Rue de Paix",
        prix : 120,
        image: "https://images.unsplash.com/photo-1606402179428-a57976d71fa4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTF8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        nbChambre : 9,
        chambre : {}
    },
    {
        id: 10,
        hotel : "Hotel Super",
        ville : "Tour",
        adress : "Chemin des Anglais",
        prix : 27,
        image : "https://images.unsplash.com/photo-1598605272254-16f0c0ecdfa5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTZ8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        nbChambre : 19,
        chambre : {}
    },
    {
        id: 11,
        hotel : "la villa rouge",
        ville : "Réunion",
        adress : "Route du Chaudron",
        prix : 29,
        image : "https://images.unsplash.com/photo-1580977276076-ae4b8c219b8e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NzF8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        nbChambre : 25,
        chambre : {}
    },
    {
        id: 12,
        hotel : "hotel Sur",
        ville : "Berlin",
        adress : "Tableau de la fortune",
        prix : 56,
        image : "https://images.unsplash.com/photo-1561501878-aabd62634533?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        nbChambre : 10,
        chambre : {}
    },
    {
        id: 13,
        hotel : "Hotel du dragon",
        ville : "Toulouse",
        adress : "40 avenue de l'eau",
        prix : 79,
        image : "https://images.unsplash.com/photo-1600435335786-d74d2bb6de37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODJ8fGhvdGVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
        nbChambre : 13,
        chambre : {}
    }
]

hotels.map( element => {
    for(let i=1; i<=element.nbChambre; i++){
        element.chambre[i] = {'default' : false}
    }
})

export {hotels}