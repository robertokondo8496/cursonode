class LivroDao {
    constructor(db) {
        this._db = db;
    }

    adiciona(livro) {
        return new Promise((resolve,reject) => {
            this._db.run(`
            INSERT INTO livros(
                    titulo,
                    preco,
                    descricao
                ) values (?,?,?) 
                `, [
                livro.titulo,
                livro.preco,
                livro.descricao
                ],
                function(err) {
                    if(err) {
                        console.log(err);
                        return reject('Nao foi possivel adicionar o livro!');
                    }
                    resolve();
                } 
            )
        })
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all(
                'SELECT * FROM livros',
                (erro,resultados) => {
                    if (erro) return reject('Nao foi possivel listar os livros');
                    return resolve(resultados);
                }
            )
        })
        // this._db.all(
        //     'SELECT * FROM livros',
        //     (erro,resultados) => 
        //         callback(erro,resultados)
        // )
    }

    buscaPorId(id){
        return new Promise((resolve,reject) => {
            this._db.all(`SELECT * FROM livros WHERE id=${id}`,
            (erro,resultados) => {
                if (erro) return reject('Nao foi possivel localizar o id')
                return resolve(resultados);
            })
        })
    };
    
    atualiza(livro){
        return new Promise((resolve,reject) => {
            this._db.run(`UPDATE livros SET titulo = ?, preco = ?, descricao = ? WHERE id = ? `,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ] ,
            (err) => {
                if(err) {
                    return reject('Nao foi possivel editar o livro!')
                }
                resolve();
            })
        })
    }

    remove(id){
        return new Promise((resolve,reject) => {
            this._db.run(`DELETE FROM livros WHERE id = ${id}`, (err) => {
                if (err) {
                    return reject('Nao foi possivel deletar o livro!')
                }
                resolve();
            })
        })
    }

}

module.exports = LivroDao;