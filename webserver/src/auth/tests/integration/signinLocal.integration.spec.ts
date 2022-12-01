import gql from 'graphql-tag';
import request from 'supertest-graphql';
import { User } from 'auth/entities';
import { IntegrationTestManager } from 'test/IntegrationTestManager';
import { testUser } from 'test/stubs/testUser.stub';
import { getGqlErrorStatus } from 'test/gqlStatus';

describe('signin local', () => {
  const integrationTestManager = new IntegrationTestManager();

  beforeAll(async () => {
    await integrationTestManager.beforeAll();
  });

  afterAll(async () => {
    await integrationTestManager.afterAll();
  });

  describe('given the user exists', () => {
    describe('when a signinLocal mutation is executed', () => {
      let signinUser: User;

      beforeAll(async () => {
        const response = await request<{ signinLocal: User }>(integrationTestManager.httpServer)
          .mutate(
            gql`
              mutation SigninLocal($data: SigninInput!) {
                signinLocal(data: $data) {
                  email
                  name
                }
              }
            `,
          )
          .variables({
            data: {
              email: testUser.email,
              password: testUser.password,
              token: testUser.token,
            },
          })
          .expectNoErrors();

        signinUser = response.data.signinLocal;
      });

      it('should return user entity', async () => {
        expect(signinUser).toMatchObject({
          name: testUser.name,
          email: testUser.email,
        });
      });
    });
  });

  describe('given the user wrong password', () => {
    describe('when a signinLocal mutation is executed', () => {
      let resStatus: number;

      beforeAll(async () => {
        const { response } = await request<{ signinLocal: User }>(integrationTestManager.httpServer)
          .mutate(
            gql`
              mutation SigninLocal($data: SigninInput!) {
                signinLocal(data: $data) {
                  email
                  name
                }
              }
            `,
          )
          .variables({
            data: {
              email: testUser.email,
              password: 'wrong password',
              token: testUser.token,
            },
          });

        resStatus = getGqlErrorStatus(response);
      });

      it('should return 403 status', async () => {
        expect(resStatus).toBe(403);
      });
    });
  });

  describe('given the user wrong email', () => {
    describe('when a signinLocal mutation is executed', () => {
      let resStatus: number;

      beforeAll(async () => {
        const { response } = await request<{ signinLocal: User }>(integrationTestManager.httpServer)
          .mutate(
            gql`
              mutation SigninLocal($data: SigninInput!) {
                signinLocal(data: $data) {
                  email
                  name
                }
              }
            `,
          )
          .variables({
            data: {
              email: 'wrong_email@test.com',
              password: testUser.password,
              token: testUser.token,
            },
          });

        resStatus = getGqlErrorStatus(response);
      });

      it('should return 403 status', async () => {
        expect(resStatus).toBe(403);
      });
    });
  });
});
