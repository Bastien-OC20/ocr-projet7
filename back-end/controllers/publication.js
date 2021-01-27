'use strict';

const models = require('../models/index.js');


const userManager = require('../services/userManager');
const publicationManager = require('../services/publicationManager');
require('dotenv').config()

const jwt = require('jsonwebtoken');

exports.createPublication = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    return userManager
        .findOne({
            'id': userId
        })
        .then(user => {
            if (null == user) {
                return res.status(400).json({
                    'error': 'Utilisateur non trouvé.',
                    'userId': userId
                })
            }
            let data = {
                'UserId': userId,
                'title': req.body.title,
                'content': req.body.content,
                'likes': req.body.likes,
                'attachment': `${req.body.inputFile}`
            };
            return publicationManager
                .create(data)
                .then((newPost) => {
                    return res.status(200).json({
                        'user': user,
                        'newPost': newPost
                    })
                })
                .catch((error) => {
                    return res.status(400).json({
                        'error': error,
                        'user': user,
                        'data': data
                    })
                });
        })
        .catch(error => {
            return res.status(500).json({
                'error': error,
                'userId': userId
            })
        });
}

exports.getAllPublication = (req, res, next) => {
    models.Publication.findAll({
            order: sequelize.literal('updatedAt DESC'),
            include: {
                model: models.User,
                attributes: ['username']
            }
        })
        .then(publications => res.status(200).json(publications))
        .catch(error => res.status(400).json({
            error: "gettallpublication",
            error: error
        }));
};

exports.getOnePublication = (req, res, next) => {
    models.Publication.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: models.User,
                attributes: ['username']
            }
        })
        .then(publication => {
            res.status(200).json(publication);
        })
        .catch(error => res.status(400).json({
            error
        }));
};

exports.modifyPublication = async (req, res) => {
    try {
        await models.Publication.findOne({
            where: {
                id: (req.params.id)
            }
        });
        await models.Publication.update({
            title: req.body.title,
            content: req.body.content,
            attachment: req.body.attachment
        }, {
            where: {
                id: (req.params.id)
            }
        });
        return res.status(200).send({
            message: "Publication modifiée"
        })
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.deletePublication = async (req, res, next) => {
    try {
        await models.Publication.destroy({
            where: {
                id: (req.params.id)
            }
        });
        return res.status(200).send({
            message: "Publication supprimée"
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            err
        });
    }
}