// Ce module définit le modèle de données Sequelize pour un manga.
// Il exporte une fonction prenant en paramètres l'instance Sequelize et le type de données Sequelize.

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Manga', { // Définition du modèle 'Manga'
        
        // Champ 'title' : chaîne de caractères non nulle et unique
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom est déjà pris."
            },
        },
        // Champ 'authors' : chaîne de caractères
        authors: {
            type: DataTypes.STRING,
        },
        
        genres: {
            type: DataTypes.STRING,
        },
        
        synopsis: {
            type: DataTypes.TEXT,
        },
        
        imageUrl: {
            type: DataTypes.STRING,
        }        
        
    }, { // Options du modèle
        onDelete: 'CASCADE' // Suppression en cascade si l'entité associée est supprimée
    });
}
