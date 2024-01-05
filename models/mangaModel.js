
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Manga', {
        
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                msg: "Le nom est déjà pris."
            },
        },
        authors:{
            type: DataTypes.STRING,
        },
        genres: {

            type: DataTypes.STRING,
        },
        synopsis: {

            type: DataTypes.STRING,
        },
        imageUrl:{
            type: DataTypes.STRING,
        }        
        
        },{
        onDelete: 'CASCADE'
    }
    );
}