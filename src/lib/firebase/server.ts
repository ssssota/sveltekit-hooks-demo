import { browser } from '$app/env';
import * as admin from 'firebase-admin';

const app = browser ? admin.initializeApp() : undefined;
export const auth = app?.auth();
