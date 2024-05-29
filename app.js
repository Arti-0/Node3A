const sqlite3 =  require('sqlite3')


let db = new  sqlite3.Database("boutique.db"  ,(err) => {
    if (err)
        throw err
    console.log("Connected to the database!")

}  )

db.close(err =>{
    if (err)
        throw err
    console.log('Database Closed')

})