import express from 'express'
import { setupExpress } from "../../helpers/setupExpress";
import request from 'supertest'
import { ApiRoutes } from '@smartesting/shared/src/routes';

describe(`POST ${ApiRoutes.alteration()}`,  () => {
    let server: express.Express

    beforeEach(() => {
        server  = setupExpress()    
    })

    it('returns 422 if the scenario content is empty', () => {
        request(server)
        .post(ApiRoutes.alteration())
        .send({scenario: '', fileName: 'myFile.sbs'})
    })
})