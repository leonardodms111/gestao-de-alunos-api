import request from  "supertest";
import { expect } from "chai";
import 'dotenv/config';

describe("Login", () => {
    it("Retornar status 200 quando usuario e senha estiverem corretos", async () => {
        const LoginResposta = await request(process.env.BASE_URL)
            .post("/api/auth/login")
            .set('Content-Type', 'application/json')
            .send({
                email: process.env.ADMIN_USER,
                senha: process.env.ADMIN_PASSWORD
            });
        expect(LoginResposta.status).to.equal(200);
    }); 

     it("Retornar status 400 quando a senha não for informada", async () => {
        const LoginResposta = await request(process.env.BASE_URL)
            .post("/api/auth/login")
            .set('Content-Type', 'application/json')
            .send({
                email: process.env.ADMIN_USER,
                senha: ''
            });

         expect(LoginResposta.status).to.equal(400);
         expect(LoginResposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');     
    }); 

     it("Retornar status 401 quando a senha for incorreta", async () => {
        const LoginResposta = await request(process.env.BASE_URL)
            .post("/api/auth/login")
            .set('Content-Type', 'application/json')
            .send({
                email: process.env.ADMIN_USER,
                senha: '12435'
            });
        expect(LoginResposta.status).to.equal(401);
    }); 

});
