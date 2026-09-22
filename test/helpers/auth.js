import request from 'supertest';

export async function getToken(emailUser, passwordUser) {
    const LoginResposta = await request('http://localhost:3000')
        .post("/api/auth/login")
        .set('Content-Type', 'application/json')
        .send({
            email: emailUser,
            senha: passwordUser
        });

    return LoginResposta.body.token;

    }

export async function getTokenAluno(emailUserAluno, passwordUserAluno) {
    const LoginResposta = await request('http://localhost:3000')
        .post("/api/auth/login")
        .set('Content-Type', 'application/json')
        .send({
            email: emailUserAluno,
            senha: passwordUserAluno
        });

    return LoginResposta.body.token;

    }
        