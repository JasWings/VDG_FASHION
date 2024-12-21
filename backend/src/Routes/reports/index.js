import express from 'express'
import { generateReport, getReports } from '../../Controllers/reports/index.js';


const reportrouter =express.Router();

reportrouter.post('/generate',generateReport)
reportrouter.get('/', getReports)

export default reportrouter;