module.exports = {
    //strings for user handler querys
    createUser: "INSERT INTO users (firstName, lastName, email, password,roles, avatar,createdAt) VALUE(?,?,?,?,?,?,now())",
    findUser: "SELECT * FROM users WHERE email = ?",
    findAllUsers: "SELECT * FROM users",
    findUserByPseudo : "SELET * FROM users WHERE pseudo = ?",
    findUserById: "SELECT * FROM users WHERE id = ?",
    findUserByEmail: "SELECT * FROM users WHERE email = ?", 
    deleteUser: "DELETE FROM users WHERE id = ?",
    UpdateUserInfoWithAvatar: "UPDATE users SET firstName = ?, lastName = ?, avatar= ?  WHERE id = ?",
    UpdateUserInfo: "UPDATE users SET firstName = ?, lastName = ? WHERE id = ?",
    
    //strings for post querys
    createPost: "INSERT INTO posts(title, image, description, type, UserId, createdAt,userPseudo) VALUE(?,?,?,?,?,now(),?)",
    getPost : `SELECT posts.*, users.avatar FROM posts,users WHERE posts.UserId = users.id ORDER BY updatedAt DESC`,
    getLastPostByUserId : "SELECT id, image FROM posts ORDER BY createdAt DESC LIMIT 5",
    getAllPostWithUserId: "SELECT posts.*, users.avatar FROM posts, users WHERE posts.UserId = users.id AND users.id = ?",
    getCountAllPostByUserId : "SELECT posts.*, users.avatar FROM posts, users WHERE posts.UserId = users.id AND users.id = ?",
    getPostById : "SELECT posts.*, users.avatar FROM posts, users WHERE posts.UserId = users.id AND posts.id = ?",
    getPostByIdForLocal : "SELECT * from posts WHERE  posts.id = ?",
    updatePostLikes: "UPDATE posts SET likes = ?,updatedAt = now() WHERE id = ?",
    updatePostComment : "UPDATE posts SET comments = ?,updatedAt = now() WHERE id = ?",
    deletePostById: "DELETE FROM posts WHERE id = ?",

    //strigns for comments querys
    createComment: "INSERT INTO comments(content, createdAt,updatedAt, UserId, PostId, CommentId) VALUE(?,now(),now(),?,?,?)",
    deleteComment: "DELETE FROM comments WHERE UserId = ? OR PostId = ?",
    getCommentById : "SELECT * FROM comments WHERE id = ?",
    getCommentById : "SELECT * FROM comments WHERE id = ? OR CommentId = ?",
    getCommentByPostId : "SELECT * FROM comments WHERE PostId = ? ORDER BY CommentId",
    getAllCommentByUserId: "SELECT * FROM comments WHERE UserId = ?",
    getCommentById : "SELECT * FROM comments WHERE id = ? OR CommentId = ?",
    addIdtoComment: "UPDATE comments SET CommentId = ? WHERE id = ?",
    deleteCommentByPostId: "DELETE FROM comments WHERE PostId = ?",
    deleteCommentById: "DELETE FROM comments WHERE id = ?",

    //strigns for likes querys
    createLike: "INSERT INTO likes(createdAt,updatedAt, UserId, PostId) VALUE(now(),now(),?,?)",
    deleteLike: "DELETE FROM likes WHERE UserId = ? AND PostId = ?",
    deleteLikeById: "DELETE FROM likes WHERE UserId = ? AND PostId = ?",
    getLikesByPostId : "SELECT * FROM likes WHERE PostId = ?",
    getAllLikesByPostId: "SELECT * FROM likes WHERE PostId = ?",
    getAllLikesByUserId: "SELECT * FROM likes WHERE UserId = ?",
    deleteLikeByUserId: "DELETE FROM likes WHERE UserId = ?",
}