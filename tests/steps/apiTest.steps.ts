import { APIResponse, expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';

const { Given, When, Then } = createBdd();
let apiResponse: APIResponse, apiEndpoint: string;

Given('I have a valid endpoint for the OpenLibrary author API', async ({}) => {
    apiEndpoint = 'https://openlibrary.org/authors/';
});

When('I submit request to fetch user data from API for {string}', async ({ request }, username: string) => {
    apiResponse = await request.get(apiEndpoint + `${username}.json`);
});

Then('API response status is {int}, success', async ({}, statusCode) => {
    expect(apiResponse.ok()).toBeTruthy();
    expect(apiResponse.status()).toBe(statusCode);
});

Then('validate the response has personal name {string}', async ({}, personalName) => {
    const responseBody = await apiResponse.json();
    expect(responseBody.personal_name).toEqual(personalName);
});

Then('validate the response contains alternate name {string}', async ({}, alternateName) => {
    const responseBody = await apiResponse.json();
    expect(responseBody.alternate_names).toContain(alternateName);
});