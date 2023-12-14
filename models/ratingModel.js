module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Rating', {
        
        value: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: {
                    
                    args: [0]
                },
                max: {
                    
                    args: [5]
                }
            }
        }
    })
}