import { initializeApp } from 'firebase-admin';

const app = initializeApp();
export const auth = app.auth();
