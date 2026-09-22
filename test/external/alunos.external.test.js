import request from "supertest";
import { expect } from "chai";
import { getToken } from "../helpers/auth.js";
import "dotenv/config";
import alunos from "../fixtures/alunos.json" with { type: "json" };

describe("Alunos", () => {
    let token;

    beforeEach(async () => {
        token = await getToken(
            process.env.ADMIN_USER,
            process.env.ADMIN_PASSWORD
        );
    });

    alunos.forEach((cadastro) => {

        it(cadastro.TestTitle, async () => {

            const dadosAluno = {
                ...cadastro.dadosAluno,
                email: cadastro.dadosAluno.email === "ENV_USER"
                    ? process.env.USER
                    : cadastro.dadosAluno.email
            };

            const cadastroAlunoResposta = await request(process.env.BASE_URL)
                .post("/api/admin/alunos")
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .send(dadosAluno);

            console.log("Status:", cadastroAlunoResposta.status);
            console.log("Body:", cadastroAlunoResposta.body);

            expect(cadastroAlunoResposta.status)
                .to.equal(cadastro.expectedStatus);

            if (cadastro.expectedStatus === 201) {

                expect(cadastroAlunoResposta.body.nome)
                    .to.equal(cadastro.expectedResponse.nome);

                expect(cadastroAlunoResposta.body.email)
                    .to.equal(cadastro.expectedResponse.email);

                expect(cadastroAlunoResposta.body.matricula)
                    .to.equal(cadastro.expectedResponse.matricula);
            }

            if (cadastro.expectedStatus === 409) {

                expect(cadastroAlunoResposta.body.error)
                    .to.equal(cadastro.expectedResponse.error);
            }
        });
    });
});