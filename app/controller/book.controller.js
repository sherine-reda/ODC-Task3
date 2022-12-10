const dealHelper = require("../helper/dealWithJson.helper")
const dataHelper = require("../helper/data.helper")
const Gig = require('../../clientSide/views/single.hbs')
const Sequelize = require('sequelize');

const Op = Sequelize.Op;
class book{
    /*start get add*/
    static addBooks = (req, res)=>{
        res.render("addBooks", {pageTitle: "add Book"})
    }
    static addBookGetLogic = (req,res)=>{
        const book = {id:Date.now(),...req.query}
        const all = dealHelper.readFromJSON()
        all.push(book)
        dealHelper.writeToJSON(all)
        res.redirect("/")
    }
    /*end get add */
    /*add logic for both get and post*/
    static addMyLogic = (req, res)=>{
        let book
        if(req.method=="POST") book = {id:Date.now(), ...req.body}
        else  book = {id:Date.now(), ...req.query}
        const all = dealHelper.readFromJSON()
        all.push(book)
        dealHelper.writeToJSON(all)
        res.redirect("/")
    }
    /*end logic for both get and post*/
    static allBooks = (req, res)=>{
        const books = dealHelper.readFromJSON()
        res.render("allBooks", {
            pageTitle: "All Books", 
            books, 
            hasBooks: books.length
        })
    }
    static editBooks = (req, res)=>{
        const all = dealHelper.readFromJSON()
        const result = dataHelper.getId(all, "id", req.params.id)
        res.render("edit", {
            pageTitle: "edit page",
            result: all[result]
        })    
    }

    static editBooksLogic = (req,res)=>{
        const all = dealHelper.readFromJSON()
        const result = dataHelper.getId(all, "id", req.params.id)
        if(result==-1) return res.render("err404", {pageTitle:"invalid", err:"invalid id"})
        const newBook = {id: req.params.id,...req.body}
        all[result] = newBook
        dealHelper.writeToJSON(all)
        res.redirect(`/single/${req.params.id}`)
    }

    static single = (req, res)=>{
        // const id = req.params.id
        const all = dealHelper.readFromJSON()
        // const result = all.find(task=> task.id == id )
        // const result = (dealHelper.readFromJSON()).find(task=> task.id == req.params.id)
        const result = dataHelper.getId(all, "id", req.params.id)
        res.render("single", {
            pageTitle: "single page",
            result: all[result]
        })
    }
    static delBooks = (req, res)=>{
        const all = dealHelper.readFromJSON()
        // const data = all.filter(task=> task.id!=req.params.id)
        const bookIndex = dataHelper.getId(all, "id", req.params.id)
        if(bookIndex!=-1) all.splice(bookIndex, 1)
        dealHelper.writeToJSON(all)
        res.redirect("/")
    }
    
}
module.exports = book 