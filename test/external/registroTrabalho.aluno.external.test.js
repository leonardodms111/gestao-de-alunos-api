import request from "supertest";
import { expect } from "chai";
import { getTokenAluno } from "../helpers/auth.js";
import 'dotenv/config';
import trabalhos from "../fixtures/trabalhos.json" with { type: "json" };

describe("Login", () => {
    let tokenAluno;

    beforeEach(async () => {
        tokenAluno = await getTokenAluno(process.env.USER, process.env.PASS);
        
    });
        trabalhos.forEach((registrarTrabalho) => {
        it(registrarTrabalho.TestTitle, async () => {
            const cadastroAlunoResposta = await request(process.env.BASE_URL)
                .post(`/api/alunos/${process.env.ID_ALUNO}/trabalhos`)
                .set("Content-Type", "application/json")
                .set("Authorization", `Bearer ${tokenAluno}`)
                .send({
                    disciplinaId: registrarTrabalho.dadosTrabalho.disciplinaId,
                    dataEntrega: registrarTrabalho.dadosTrabalho.dataEntrega,
                    titulo: registrarTrabalho.dadosTrabalho.titulo,
                    descricao: registrarTrabalho.dadosTrabalho.descricao
                });


            expect(cadastroAlunoResposta.status).to.equal(registrarTrabalho.expectedStatus);
            expect(cadastroAlunoResposta.body.disciplinaId).to.equal(registrarTrabalho.dadosTrabalho.disciplinaId);
            expect(cadastroAlunoResposta.body.titulo).to.equal(registrarTrabalho.dadosTrabalho.titulo);
            expect(cadastroAlunoResposta.body.descricao).to.equal(registrarTrabalho.dadosTrabalho.descricao);
        });
    });

});

