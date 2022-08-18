const express = require('express');
const router = express.Router();
const query = require('../utils/employee')
const pool = require('../config/db');
router.post('/create-employee', async(req,res) => {
    try {

        const getQuery = query.queryCreateEmploye(req.body)
        const result = await runQuery(getQuery)
        return res.status(200).json({status: 'success'})

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({status: 'failed',message: 'internal server error'})
    }
})

router.post('/add-employee-computer-department', async(req,res)  => {
    try {
        const getQuery = query.queryAddEmployeeComputerDepartment(req.body)

        const result = await runQuery(getQuery)
        if(result.rowCount > 0){
            const getquery = query.findByid(req.body.employee_id)
        const result = await pool.query(getquery)
        
        const obj = {
            id: req.body.employee_id,
            count_department: result.rows[0].count_department + 1
        }
            const updateEmployee = query.updateCountDepartment(obj)
            const updtateCountDepartment = await pool.query(updateEmployee)
            return res.status(200).json({status: 'success'})

        }else{
            return res.status(400).json({status: 'failed'})
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({status: 'failed',message: 'internal server error'})
    }
})

router.post('/add-employee-maintenance-department',async(req,res) => {
    try {
        const getQuery = query.queryAddEmployeeComputerDepartment(req.body)
        const result = await runQuery(getQuery)
        if(result.rowCount > 0){
            const getquery = query.findByid(req.body.employee_id)
        const result = await pool.query(getquery)

        const obj = {
            id: req.body.employee_id,
            count_department: result.rows[0].count_department + 1
        }
            const updateEmployee = query.updateCountDepartment(obj)

            const updtateCountDepartment = await pool.query(updateEmployee)
            return res.status(200).json({status: 'success'})

        }else{
            return res.status(400).json({status: 'failed'})
        }
    } catch (error) {
        return res.status(500).json({status: 'failed',message: 'internal server error'})
        
    }
})

router.get('/get-all-employee-details',async(req,res) => {
    try {
        const result = await pool.query(`SELECT *
        FROM employee e 
        INNER JOIN computer_department cd 
        ON e.employee_id  = cd.employee_id `)

        return res.status(200).json(result.rows)

    } catch (error) {
        return res.status(500).json({status: 'failed',message: 'internal server error'})
        
    }
})

router.get('/get-employee-details-byid',async(req,res) => {
    try {
        const getquery = query.findByid(req.query.id)
        const result = await pool.query(getquery)
        return res.status(200).json(result.rows)
    } catch (error) {
        return res.status(500).json({status: 'failed',message: 'internal server error'})
        
    }
})

router.get('/get-details-by-date-filter',async(req,res) => {
    try {
        const getQuery = query.searchEmployeeDetails(req.query.start_date,req.query.end_date)
        const result = await pool.query(getQuery)
        console.log(result)
        return res.status(200).json(result.rows)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({status: 'failed',message: 'internal server error'})
    }
})

function runQuery(query) {
    return new Promise(function (resolve, reject) {
        //console.log("query------------->>>>>>>.",query);

        pool.query(query).then(
            (version) => resolve(version)

        ).catch((err) => {
            reject(err)
            throw err
        })
            .finally(() => {
                console.log("Pool Release")
            });
    })
}
module.exports =router