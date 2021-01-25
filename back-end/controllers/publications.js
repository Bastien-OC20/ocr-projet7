const link = require('../models/Mysql');
const fs = require('fs');

exports.createPublications = (req, res, next) => {
    const publicationsObject = req.file ?
    {
        ...JSON.parse(req.body.post),
        publicationsMedia: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body.post,
        publicationsMedia: null
    };
    link.execute('INSERT INTO Posts VALUES (NULL, ?, ?, ?);', [publicationsObject.userId, publicationsObject.publicationsContent, publicationsObject.publicationsMedia], (err, rows, fields) => {
        if(err) return res.status(400).json({ err });
        res.status(201).json({ message: "Post with media created successfully." });
    });
};

exports.readAllPublications = (req, res, next) => {
    link.execute('SELECT p.*, u.userName FROM Publications p inner join Users u on p.userId = u.id;', (err, rows, fields) => {
        if(err) {
            return res.status(400).json({ err });
        };
        res.status(200).json(rows);
    });
};

exports.updatePublications = (req, res, next) => {
    const publicationsObject = req.file ?
    {
        ...JSON.parse(req.body.post),
        publicationsMedia: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...req.body.post,
        publicationsMedia: null 
    };
    link.execute('SELECT * FROM Posts WHERE id= ?;', [req.params.id], (selectErr, selectRows, selectFields) => {
        if(selectErr) return res.status(400).json({ selectErr });
        if(req.file = true && selectRows[0].publicationsMedia != null) {
            const filename = selectRows[0].publicationsMedia.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                conn.execute('UPDATE Publications SET publicationsContent= ?, publicationsMedia= ? WHERE id= ?;', [publicationsObject.publicationsContent, publicationsObject.publicationsMedia, req.params.id], (updateErr, updateRows, updateFields) => {
                    if(updateErr) return res.status(400).json({ updateErr });
                    res.status(200).json({ message: "Post successfully modified. Old media deleted." });
                });
            });
        } else {
            link.execute('UPDATE Publications SET publicationsContent= ?, publicationsMedia= ? WHERE id= ?;', [publicationsObject.publicationsContent, publicationsObject.publicationsMedia, req.params.id], (updateErr, updateRows, updateFields) => {
                if(updateErr) return res.status(400).json({ updateErr });
                res.status(200).json({ message: "Post successfully modified." });
            });
        };
    });
};

exports.deletePublications = (req, res, next) => {
    conn.execute('SELECT * FROM Publications WHERE id= ?;', [req.params.id], (selectErr, selectRows, selectFields) => {
        if(selectErr) return res.status(400).json({ selectErr });
        if(selectRows[0].publicationsMedia != null) {
            const filename = selectRows[0].publicationsMedia.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                conn.execute('DELETE FROM Posts WHERE id= ?;', [req.params.id], (deleteErr, deleteRows, deleteFields) => {
                    if(deleteErr) return res.status(400).json({ deleteErr });
                    res.status(200).json({ message: "Post and media successfully deleted." });
                });
            });
        } else {
            conn.execute('DELETE FROM Publications WHERE id= ?;', [req.params.id], (deleteErr, deleteRows, deleteFields) => {
                if(deleteErr) return res.status(400).json({ deleteErr });
                res.status(200).json({ message: "Post successfully deleted." });
            });
        };
    });
};