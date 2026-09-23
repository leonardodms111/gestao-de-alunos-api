import request from "supertest";
import { expect } from "chai";
import "dotenv/config";
import login from "../fixtures/aluno.login.json" with { type: "json" };

describe("Login", () => {

    login.forEach((cenario) => {

        it(cenario.TestTitle, async () => {

            const LoginResposta = await request(process.env.BASE_URL)
                .post("/api/auth/login")
                .set("Content-Type", "application/json")
                .send({
                    email: cenario.dadosLogin.email === "ENV_USER"
                        ? process.env.USER
                        : cenario.dadosLogin.email,

                    senha: cenario.dadosLogin.senha === "ENV_PASS"
                        ? process.env.PASS
                        : cenario.dadosLogin.senha
                });

            console.log("Status:", LoginResposta.status);
            console.log("Body:", LoginResposta.body);

            expect(LoginResposta.status)
                .to.equal(cenario.expectedStatus);

            if (cenario.expectedResponse) {
                expect(LoginResposta.body.error)
                    .to.equal(cenario.expectedResponse.error);
            }
        });

    });

});