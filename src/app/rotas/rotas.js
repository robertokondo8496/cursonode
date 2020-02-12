const LivroDao = require('../infra/livro-dao');
const db = require('../../config/database');

module.exports = (app) => {

    app.get('/', function(req,resp) {
        resp.send(
            `
                <html>
                    <head>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <h1> Curso de Node </h1>
                    </body>
                </html>
            `
        )
    })

    app.get('/livros', function(req,resp) {
        const livroDao = new LivroDao(db);

        livroDao.lista()
            .then(livros => resp.marko(
                require('../views/livros/listagem/listagem.marko'),
                {
                    livros: livros
                }
            ))
            .catch(erro => console.log(erro));
    });

    app.get('/livros/form', function(req,resp) {
        resp.marko(require('../views/livros/form/form.marko'));
    });

    app.post('/livros', function(req,resp) {
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.adiciona(req.body)
            .then(resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    });

    app.get('/livros/:id', (req,resp) => {
        const livroDao = new LivroDao(db);
        livroDao.buscaPorId(req.params.id)
            .then(resultados => resp.send(resultados))
            .catch(erro => console.log(erro));
    })

    app.get('/livros/:id/edita', (req,resp) => {
        resp.marko(require('../views/livros/update/update.marko'), {
            id: req.params.id
        })
    })

    app.post('/edita', (req,resp) =>{
        console.log(req.body);
        const livroDao = new LivroDao(db);
        livroDao.atualiza(req.body)
            .then(
                resp.redirect('/livros'))
            .catch(erro => console.log(erro));
    })

    app.get('/livros/:id/remove', (req,resp) => {
        const livroDao = new LivroDao(db);
        livroDao.remove(req.params.id)
            .then(resp.redirect('/livros'))
            .catch(err => console.log(erro));
    })

};