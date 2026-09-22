import request from  "supertest";
import app from "../src/app.js";
import { expect } from "chai";

describe("Login", () => {
    it("Retornar status 200 quando usuario e senha estiverem corretos", async () => {
        const LoginResposta = await request(app)
            .post("/api/auth/login")
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com',
                senha: 'admin123'
            });
        expect(LoginResposta.status).to.equal(200);
    }); 

     it("Retornar status 400 quando a senha não for informada", async () => {
        const LoginResposta = await request(app)
            .post("/api/auth/login")
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com',
                senha: ''
            });

         expect(LoginResposta.status).to.equal(400);
         expect(LoginResposta.body.error).to.equal('Os campos "email" e "senha" são obrigatórios.');     
    }); 

     it("Retornar status 401 quando a senha for incorreta", async () => {
        const LoginResposta = await request(app)
            .post("/api/auth/login")
            .set('Content-Type', 'application/json')
            .send({
                email: 'admin@escola.com',
                senha: 'admin1234'
            });
        expect(LoginResposta.status).to.equal(401);
    }); 

});
