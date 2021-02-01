'use strict';

const models = require('../models/index.js');


const userManager = require('../services/userManager');
const postManager = require('../services/postManager');
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
            return postManager
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
    models.Post.findAll({
            order: sequelize.literal('updatedAt DESC'),
            include: {
                model: models.User,
                attributes: ['username']
            }
        })
        .then(post => res.status(200).json(post))
        .catch(error => res.status(400).json({
            error: "gettallpublication",
            error: error
        }));
};

exports.getOnePublication = (req, res, next) => {
    models.Post.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: models.User,
                attributes: ['username']
            }
        })
        .then(post => {
            res.status(200).json(post);
        })
        .catch(error => res.status(400).json({
            error
        }));
};

exports.modifyPublication = async (req, res) => {
    try {
        await models.Post.findOne({
            where: {
                id: (req.params.id)
            }
        });
        await models.Post.update({
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
        await models.Post.destroy({
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