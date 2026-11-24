import {defineConfig,devices} from '@playwright/test';
import base from './playwright.config';
export default defineConfig({...base,testMatch:'**/touch-selection.spec.ts',use:{...devices['iPhone 13'],baseURL:'http://127.0.0.1:3100',browserName:'webkit',trace:'retain-on-failure'}});
